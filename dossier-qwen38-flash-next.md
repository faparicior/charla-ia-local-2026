# Dossier: Qwen 3.8 Flash Next — el modelo que rompe la regla

*Material completo para diseñar una slide especial (solo para este modelo). Toda cifra citada de fuente verificada — sin extrapolaciones. Actualizado: 29 sep 2026.*

---

## 1. El mensaje central (para la slide)

Todos los modelos de la matriz siguen la misma física: **más parámetros ⇒ más memoria**. El Flash Next la rompe por partida doble:

1. **Solo 6B se activan por token** (125B de backbone MoE) — el cómputo es de un modelo pequeño.
2. **Los 51B de la tabla n-gram (PLE) no computan y no tienen que vivir en GPU**: es una tabla de consulta con acceso aleatorio que se descarga a la RAM del host (con prefetch en paralelo con el cómputo) o se streamea desde el disco.

Resultado práctico: **calidad de modelo de ~176B con ~65–70 GB residentes en GPU** — cabe en un nodo de 128 GB unificados (DGX Spark / GB10). Es el único modelo de la tabla cuya memoria real de GPU es más pequeña que su checkpoint.

---

## 2. Anatomía del modelo (material para el diagrama)

Fuente: ficha oficial de Hugging Face (`Qwen/Qwen3.8-Flash-Next`).

- **Backbone MoE**: 125B — 512 expertos por capa, 10 ruteados + 1 compartido, dim intermedia 640 → **6B activos**
- **N-gram Embedding (PLE)**: 51B — **20 millones de bigramas/trigramas** (aplicada en la capa 2), dim 2560 → 51,2B parámetros ≈ **102,4 GB en BF16**
- **MTP**: 4B — módulo de predicción multi-token (1 capa); acelera el decode ~+57% single-stream (aceptación medida 2,25 tokens/paso; 4,06 en greedy full-precision según el tech report)
- **Vision tower**: ~0,84 GB (multimodal)
- **Atención híbrida**: 48 capas = **12 × (3× Gated DeltaNet+MoE → 1× QSA+MoE)** — solo **12 de 48 capas llevan KV cache**
- **QSA (Qwen Sparse Attention)**: novedad de esta generación — opera a nivel de micro-bloques (presupuesto 512 bloques / 2048 tokens), recorta la latencia de contexto largo
- **GDN (Gated DeltaNet)**: estado recurrente **fijo** — las 36 capas lineales no generan KV creciente
- **Gated Residual**: 4 ramas con read gate dependiente de datos + write gate escalar por rama
- **Contexto**: 262K nativo, 1M con YaRN (factor 4)

---

## 3. El truco del engram (por qué cabe en 128 GB)

- La tabla n-gram **se consulta, no se multiplica** → no necesita el ancho de banda de la GPU
- **Offload a RAM del host** (vLLM `VLLM_PLE_CPU_OFFLOAD=1`, prefetch en paralelo con el cómputo) — requiere ≥110 GB de RAM del host **libre para las tablas PLE** (¡no confundir ese 110 con KV cache!)
- **Streaming desde disco** (`VLLM_PLE_TABLE_MEMORY: "disk"` — la receta real de GB10 usa esto; la build parcheada de Minachist lo hace igual)
- **GPU-resident verificado**: 65,05 GiB (AutoRound) / ~66 GiB (W4A16) → el rango «65–70 GB en GPU» de la slide 14
- **Por qué los checkpoints PTQ "engordan"**: los builds de terceros dejan la PLE en **BF16 dentro del checkpoint** (102 GB) — por eso sus INT4/NVFP4 pesan 168–183 GB aunque solo 65–70 GB residan en GPU. Los GGUF de Unsloth sí la cuantizan (por eso Q8 188 → Q5 158 → Q4 111 bajan normal)

---

## 4. Checkpoints reales (medidos, no extrapolados)

| Checkpoint | Tamaño | PLE dentro | Quién lo sirve | Nota |
|---|---|---|---|---|
| BF16 safetensors oficial | 360,0 GB (131 shards) | BF16 (102 GB) | Qwen | Referencia |
| FP8 oficial | 185,5 GB | BF16 (102 GB) | Qwen | Hopper+/Blackwell |
| **NVFP4 QAD (local-inference-lab)** | **98 GiB** | **NVFP4 (~26 GB)** | local-inference-lab | **El de la receta GB10 — cabe entero en 128 GB** |
| NVFP4 PTQ (Inferact) | 182,8 GB | BF16 (102 GB) | Inferact | PTQ sin destilar; SM100+ |
| W4A16 (VnimanieAI) | 168 GB | BF16 (102 GB) | VnimanieAI | Ampere (Marlin); ~66 GiB GPU |
| INT4 Mixed AutoRound | ~166 GiB ≈ 178 GB | BF16 (95,37 GiB) | Minachist | 4,21 bpw mixto; PLE desde disco |
| GGUF BF16 (Unsloth) | 354,0 GB | cuantizable | Unsloth | llama.cpp |
| GGUF Q8_0 / Q5_K_XL / Q4_K_XL | 188,2 / 158,3 / 111,3 GB | cuantizada | Unsloth | Progresión normal (PLE incluida) |

### El checkpoint QAD de 98 GiB (el especial de los especiales)
- **Destilación consciente de cuantización (QAD)**: el estudiante NVFP4 se entrena contra el maestro BF16 con los pesos cuantizados en el forward (2.500 updates de trunk + 1.500 de refinamiento conjunto; corpus de 200M tokens prompt-respuesta + 104M de calibración)
- Cuantiza **también la PLE** a NVFP4 (~26 GB) → por eso el checkpoint completo pesa 98 GiB y **cabe entero en los 128 GB unificados** («suitable for a single RTX 6000 (with PLE offload), or a DGX Spark (with or without PLE offload)»)
- Calidad: **GPQA Diamond 89,9** — mejor que el PTQ NVFP4 consumiendo 9% menos tokens de media (26% menos en P99)
- Desglose: expertos NVFP4 + PLE NVFP4 (destilados); shared experts MXFP8; atención/QSA MXFP8 (congelados); routers/residual BF16; vision y MTP sin tocar

---

## 5. La receta real en GB10 (modo solo, TP1)

Stack `vllm-node-b12x` (build `--exp-b12x`, arch `sm_121a`), solo_only — la que Fernando carga en su DGX Spark:

- `local-inference-lab/Qwen3.8-Flash-Next-NVFP4` con `--quantization modelopt_mixed --load-format b12x`
- `VLLM_PLE_TABLE_MEMORY: "disk"` — la tabla n-gram streamea desde el SSD
- `--dtype bfloat16 --kv-cache-dtype fp8 --mamba-cache-mode align` — KV en FP8
- `--max-model-len 262144 --max-num-seqs 8 --max-num-batched-tokens 4096`
- MTP: `num_speculative_tokens: 4`
- `--gpu-memory-utilization 0.8` → ~102 GB de presupuesto: 98 GiB de pesos + KV FP8 + buffers (apurado — de ahí el max_num_seqs 8)
- Kernels b12x para GDN/MoE decode + AOT precompilado

---

## 6. KV cache diminuta (contraste con el resto del deck)

- Solo **12 de 48 capas** llevan KV (el resto es GDN con estado fijo) y con **2 cabezas KV** × 256 dim
- Medido: **~14,7 KB/token/GPU** → un pool de 8,2 GB guarda ~600k tokens ≈ 2–3 sesiones completas a contexto nativo
- La mayor parte del "contexto" vive en el **estado GDN fijo** — no crece con el chat (al revés de lo que enseña la slide 11 del tanque: aquí el líquido casi no sube)

---

## 7. Rendimiento verificado (8×RTX 3090, W4A16, vLLM + MTP)

- Decode prose: **100–107 tok/s**; código 108–114; sin MTP: 67
- Agregado: 395 tok/s a 8 streams; 526 a 16
- TTFT corto: 0,27–0,32 s; prefill 32k/90k/200k: 11,7/33/81 s; decode a 200k de contexto: 97,5 tok/s (sin degradación)
- Detalle crítico: con inductor activado el server cuelga (9 tok/s); con CUDA graphs decode-only: 105 tok/s (7×)
- **GB10 (TP1 + b12x): ~30–40 tok/s reportados por la comunidad** — plausible para un nodo solo, no verificado en fuentes públicas

---

## 8. Benchmarks oficiales (card de Qwen, 256K de contexto)

| Benchmark | Flash-Next (125B/6B) | 3.8-27B denso | 3.7-Plus (397B/17B) |
|---|---|---|---|
| DeepSWE 1.1 (agentic) | **58,7** | 42,2 | 16,5 |
| SWE-bench Pro | **62,5** | 61,7 | 55,8 |
| SWE-bench Multilingual | **81,0** | 73,8 | 75,8 |
| NL2Repo-Bench | 48,1 | 42,3 | **54,2** |
| CoWorkBench | **73,9** | 70,7 | 65,1 |
| JobBench | **55,7** | 33,4 | 41,3 |
| Agents' Last Exam | **51,2** | 42,9 | 33,6 |
| Toolathlon Verified | **73,5** | 67,1 | 50,6 |
| IFBench | **81,3** | 79,5 | 79,1 |
| GPQA Diamond | **91,7** | 89,2 | 90,8 |
| HLE | 35,9 | 30,8 | 34,7 |
| LiveCodeBench v6 | **91,9** | 90,3 | 89,6 |
| OSWorld 2.0 (binary/partial) | 19,4/**52,3** | 19,4/48,0 | 2,8/21,0 |
| AndroidWorld | **84,5** | 81,9 | 81,0 |

El patrón: **gana al 27B denso y al 397B A17B en casi todo lo agéntico** con 6B activos por token.

---

## 9. Rutas de hardware (FP8, validadas por Qwen)

- GB300 (288 GB): TP2 mínimo · **8× H200: TEP8** (TP8 simple incompatible con los bloques FP8 128×128 — el problema 640/128) · 4× MI355X (ROCm) · 4× RTX PRO 6000 Blackwell (384 GB agregados)
- **Sin ruta validada**: RTX 4090/5090, 2× A100 (fallo de carga FP8, issue #54219), H100, TP1 single-GPU en builds estándar (deadlock GB10, issue #53960 — **el stack b12x de la receta lo resuelve**), Apple Silicon (vLLM no lo soporta)
- El problema 640/128: la dim intermedia de los expertos (640) no se reparte en grupos de 128 a TP≥4 → **experts parallelism obligatorio** (`--enable-expert-parallel`)

---

## 10. La disertación de Fernando (fuente narrativa, con correcciones)

Texto original de Fernando para la charla/blog, con las verificaciones marcadas:

> No pasan ni dos semanas del revuelo con el Qwen 3.8 Denso y la comunidad se vuelve a agitar…

✓ Correcto. El esquema 3.5/3.6 (denso 27B para memoria ajustada; MoE 35B A3B rápido; MoE 122B A10B para nodos de 128 GB) encaja con la matriz de la slide 14.

> …incluye **56B en parámetros de N-gram embeddings**. Es decir, unos **176B totales** para cargar.

❌ **56B → son 51B** (ficha oficial + cuenta interna: 20M n-grams × 2560 dim = 51,2B). El **176B totales** sí es correcto **con el 51** (125+51=176; con 56 serían 181). *Corrección aplicada al texto.*

> A primera vista, inviable para un solo nodo de 128 GB en NVFP4… hasta que entras al detalle técnico.

✓ Correcto para el NVFP4 PTQ (182,8 GB). Y con matiz aún mejor: el **checkpoint QAD de 98 GiB cabe entero** en los 128 GB (ver §4).

> Esos 56B de N-grams apenas consumen cómputo y pueden desacoplarse a memoria secundaria. La comunidad… mapear y servir esos embeddings directamente desde el disco.

✓ Concepto correcto (con 51B). El «desde el disco» es literal: la receta GB10 usa `VLLM_PLE_TABLE_MEMORY: "disk"` y Minachist streamea la PLE.

> El resultado práctico: unos **134 GB de pesos distribuidos en ~84 GB de RAM (+ KV Cache hasta ~110 GB) y ~50 GB en disco**.

❌ No cuadra con ninguna medición verificada. Lo más cercano real: **checkpoint QAD 98 GiB** (o bien 65–70 GiB en GPU + 95–102 GB de PLE en host/disco con los PTQ). El **«+110 GB» es un malentendido**: en la ficha W4A16 son «≥110 GB de RAM del host libre para las tablas PLE», no KV; el KV real es ~14,7 KB/token (ver §6). *Sustituir en el texto por los datos de §3–§6.*

> Todo corriendo a 30–40 tokens/s en un único nodo, nada mal.

⚠️ Plausible para GB10 TP1+b12x, pero no verificado en fuentes públicas (en 8×3090 miden 100–107 tok/s). Citar como reporte de community.

> …aplica una especie de mutation testing mental… modifica mentalmente fragmentos de código para comprobar si la suite de tests atraparía el error… Explora los límites de cobertura del test antes de dar por buena su propia implementación.

✓ Observación cualitativa de Fernando (no verificable por fuentes, pero coherente con el perfil agéntico del modelo: DeepSWE 58,7, SWE-bench Pro 62,5). Buen material para la narrativa de la parte 2 (ciclo de desarrollo).

> ¿Sacarán finalmente un MoE intermedio de 35B para quien priorice velocidad pura en local?

Pregunta abierta — buena gancho para cerrar la slide.

---

## 11. Slide especial — IMPLEMENTADA (slide 15 del deck, tras la matriz s14)

**Título real**: «Qwen 3.8 Flash Next: *más cerebro, menos RAM*» (tag: Hardware Sizing • Caso Especial).

**Alcance decidido con Fernando**: la slide cuenta SOLO el concepto engram — la tabla n-gram (PLE) de 51B que se consulta, no computa, y por eso puede vivir fuera de la GPU. El fit en GB10 y las cuantizaciones (PTQ 183 GB vs QAD 98 GiB) es OTRA historia (remitido en una nota doc-only: «otra slide»). Así la slide no se sobrecarga.

**Estructura real** (patrón s11, clases `.engram-*`):
- **Izquierda — SVG «Dónde vive cada cosa (176B totales)»**: caja GPU azul (Backbone MoE 125B, 512 expertos · 10+1 activos = 6B por token, 65–70 GB residentes) ↔ caja Engram verde con estantería de fichas (tabla n-gram · 51B, BF16: 102 GB / NVFP4: ~26 GB, 20M bigramas/trigramas, 💾 RAM del host o desde disco), unidas por flechas naranjas bidireccionales «prefetch ⟷ consulta · en paralelo»; banda inferior: «La GPU carga lo que piensa; el engram se consulta cuando hace falta». Badge «6B activos».
- **Derecha — 3 tarjetas pilares** (numeradas, con pill protagonista):
  1. 📚 El engram: se consulta, no se multiplica — «20M n-grams al vuelo: no computa — viven en RAM host o disco.» (analogía doc-only: apuntes en la pared del taller)
  2. 🖥️ La GPU solo guarda lo que piensa — «125B con 10+1 expertos activos = 6B por token: 65–70 GB en GPU.» (analogía doc-only: obrador/despensa)
  3. 🎯 El resultado — «GPQA 91,7 · DeepSWE 58,7 vs 42,2 (27B): calidad de 176B.»
- **Pie doc-only — 3 notas planas**: KV de chicle (14,7 KB/token · 8,2 GB ≈ 600k tokens) · Calidad medida (SWE-bench Pro 62,5 · LCB 91,9) · Otra historia (Fit GB10 y cuantizaciones: otra slide).
- Subtítulo doc-only: «176B parámetros, 6B activos por token: la tabla n-gram (el engram) no computa — se consulta. Y lo que se consulta puede vivir fuera de la GPU: en la RAM del host o streameado desde disco.»

**Verificado**: barrido charla + doc 31/31 sin overflow; capturas charla/doc/dark revisadas. Gotcha clave que mordió: `.memory-pillar-card` base tiene `min-height: 170px` — con 3 tarjetas + extras en la columna derecha del modo doc desbordaba (578+170×3 > 588px) y las tarjetas se tapaban; fix: `body.mode-document .engram-right .memory-pillar-card { min-height: auto }`. La slide especial del fit GB10/cuantizaciones queda como siguiente candidata (una sola historia por slide).

---

## 12. Fuentes

- https://huggingface.co/Qwen/Qwen3.8-Flash-Next — ficha oficial (arquitectura, 51B n-gram, benchmarks, validaciones)
- https://www.alibabacloud.com/blog/qwen-3-8-flash-next-a-new-architecture-towards-ultimate-cost-efficiency_603501 — blog de arquitectura (PLE offload, GDN estado fijo)
- https://kingy.ai/blog/qwen3-8-flash-next-hardware-requirements-vram-vllm/ — pesos medidos (BF16 360, FP8 185,5) + rutas vLLM
- https://huggingface.co/local-inference-lab/Qwen3.8-Flash-Next-NVFP4 — **QAD 98 GiB, PLE NVFP4, GPQA 89,9** (el de la receta GB10)
- https://huggingface.co/VnimanieAI/Qwen3.8-Flash-Next-W4A16 — 168 GB, ~66 GiB GPU + 102 GB host; KV 14,7 KB/token; benchmarks 8×3090; problema 640/128
- https://huggingface.co/Minachist/Qwen3.8-Flash-Next-INT4-Mixed-AutoRound — 4,21 bpw mixto; PLE 95,37 GiB streameada
- https://huggingface.co/Inferact/Qwen3.8-Flash-Next-NVFP4 — PTQ NVFP4, 182,8 GB
- https://huggingface.co/api/models/unsloth/Qwen3.8-Flash-Next-GGUF/tree/main — tamaños GGUF (suma de shards)
- Receta YAML de Fernando (GB10 modo solo) — incluida en §5
