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

## 11. Slides Qwen 3.8 Flash Next — IMPLEMENTADAS (slides 15, 16 y 17 del deck)

El bloque Flash Next son TRES slides: s15 (el engram), s16 (anatomía) y s17 (el fit NVFP4). El deck queda en **33 slides**.

### s15 — «Qwen 3.8 Flash Next: *más cerebro, menos RAM*» (tag: Hardware Sizing • Caso Especial)

**Alcance decidido con Fernando**: la slide cuenta SOLO el concepto engram — la tabla n-gram (PLE) de 51B que se consulta, no computa, y por eso puede vivir fuera de la GPU. El fit en GB10 y las cuantizaciones remitido a la s17.

**Estado ronda 3** (feedback de Fernando: subtítulo doc "extraño" grande→pequeño, disquete→chip RAM, disco→HDD):
- **Iconos dibujados en el SVG**: chip de RAM (rect + pines, no emoji disquete) y disco duro (plato circular, no emoji). En light y dark legibles.
- **Subtítulo doc compacto**: la base `.subtitle` lleva `font-size: 1.8rem !important` (style.css:171) — TODA regla doc de subtítulo necesita `!important` propio y más especificidad. Fix en vigor para s15/s16/s17 (0.98rem): `body.deck-hardware-part1.mode-document #slide-15 .slide-content > .subtitle { font-size: 0.98rem !important; line-height: 1.42 !important }`. **La regla de s4 (línea 16409, 0.92rem) es INERTE por este mismo !important** — el subtítulo de s4 en doc sigue a 1.8rem (se aprobó visualmente así, pero no funciona como se creía).
- Pills telegráficas: «20M entradas × 2560 dim = 51B: se consulta, no se multiplica — vive en RAM host o disco.» / «125B con 10+1 expertos activos = 6B por token: 65–70 GB en GPU.» / «GPQA 91,7 · DeepSWE 58,7 vs 42,2 (27B): calidad de 176B.»
- Chips doc-only (grid 2×2 con borde): KV de chicle · Calidad medida · Otra historia (remite a s17) · **Expertos (fuente): Ficha oficial HF: 512, 10+1, dim 640**.

### s16 — «Por dentro: cinco piezas en 48 capas» (NUEVA, tras s15)

Tag: Qwen 3.8 Flash Next • Anatomía. Subtítulo: «48 capas = 12 × (3×(GDN→MoE) → 1×(QSA→MoE)): tres capas de memoria comprimida y una de atención precisa por grupo. Fuente: ficha oficial HF (Hidden Layout).»

5 tarjetas en grid 3+2 (`.anat-*`), cada una con mini-SVG visual + frase + chip mono + detalle doc-only:
1. **GDN — el cuaderno de campo** (3 de cada 4 capas condensan en estado fijo; sin KV cache) — burbujas→estado fijo; chip: «sin KV cache · estado fijo».
2. **QSA — busca solo lo importante** (1 de cada 4 capas; atención global que solo consulta bloques clave; indexer: 512 bloques ≈ 2048 tokens; KV 14,7 KB/token; ×7,6 prefill / ×4,9 decode @1M).
3. **MoE — 512 especialistas, 11 en turno** (10 ruteados + 1 compartido por token: 6B de los 125B; «la factura no escala con lo que sabe el modelo»; dim 640 — la causa del 640/128; TP≥4 exige expert parallel).
4. **Engram — la biblioteca de frases** (20M entradas × 2560 dim = 51B en la capa 2: se consulta por dirección, sin multiplicaciones; BF16 102 GB / NVFP4 ~26 GB / host RAM o disco).
5. **GR + MTP — fontanería y turbo** (residual en 4 carriles con gates; MTP predice varios tokens por paso: +57%, 2,25 tok/paso, 100–107 tok/s en 8×3090).

Los SVG usan gradientes `url(#egB)`, `url(#egG)` y marker `egArrow` definidos en el SVG de s15 (válido: todas las slides permanecen en el DOM).

### s17 — «Dos NVFP4: *uno cabe, el otro no*» (NUEVA)

Tag: Qwen 3.8 Flash Next • El fit en un nodo de 128 GB. Subtítulo: «El mismo formato NVFP4. La diferencia no está en el backbone: es si la biblioteca n-gram (PLE) se cuantiza también o queda en BF16. Fuentes: Inferact (PTQ) y local-inference-lab (QAD) en HF.»

Dos tarjetas comparadas (`.qad-*`) con SVG de barras 520×186:
- **PTQ (Inferact)** ✗: barra 81 GB pesos NVFP4 + 102 GB PLE BF16 (el tramo fuera del nodo atenuado con label «host RAM»); «falta 55 GB: no cabe en el nodo»; badge «183 GB > 128»; checkpoint: Inferact NVFP4 · 182,8 GB en disco.
- **QAD (local-inference-lab)** ✓: barra 105 GB pesos + biblioteca NVFP4 (+ hueco libre rayado); «+23 GB libres · KV + buffers · cabe entero»; badge «105 GB < 128»; checkpoint: local-inference-lab QAD · 98 GiB en disco.
- Pills de resumen (1.62rem en charla tras feedback: "tenemos espacio para texto grande"): «81 GB de pesos en GPU + la biblioteca de 102 GB en BF16 fuera: ni con offload cabe en los 128 unificados de un solo nodo.» / «La biblioteca también se cuantiza (102 → ~26 GB): todo dentro del nodo, con aire para KV — con o sin offload.»
- Detalles doc-only a 1.05rem (pedido de Fernando: más grandes en modo doc): RTX 6000 Pro vs GB10 (memoria unificada) y la destilación consciente (2.500+1.500 updates, 200M+104M tokens, GPQA 89,9, receta GB10).
- Cifras del SVG: escala 2,4 px/GB (nodo 128 GB = 307 px; 81 = 194; 102 = 245; 105 = 252).

**Referencia dedicada**: `ptq-vs-qad-qwen38-flash-next.md` — censo completo de checkpoints NVFP4 (base BF16 335,3 GiB, FP8 oficial 220,8 GiB, Inferact 182,8 GB, lesj0610 186,4 GB, mbehr90 170,2 GiB, nvidia ~124 GB con PLE en FP8, QAD 98 GiB) y de los tipos de destilado (PTQ / QAT / QAD / destilación clásica empero-ai 9B/4B), con todos los enlaces.

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
- https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4 — PTQ Model Optimizer: routed experts W4A4 NVFP4, atención/shared BF16, MTP FP8 128×128, **PLE en FP8 per-tensor**, ~2,7× menor que BF16, GPQA 91,5
- https://huggingface.co/lesj0610/Qwen3.8-Flash-Next-NVFP4 — PTQ con la receta oficial NVIDIA tal cual (nvfp4_experts_only + kv_fp8_cast), 186,4 GB, PLE 102,4 GB BF16, auditoría de integridad
- https://huggingface.co/mbehr90/Qwen3.8-Flash-Next-nvfp4 — NVFP4A16 weight-only sin calibrar, 170,2 GiB, verificado 4×H100 (Marlin), GSM8K 0,960 vs 0,950 BF16
- https://arxiv.org/abs/2601.20088 — «Quantization-Aware Distillation for NVFP4 Inference Accuracy Recovery» (NVIDIA; QAD con KL, robusto tras SFT/RL/merging)
- https://nvidia.github.io/Model-Optimizer/guides/quantization_aware_training.html — guía oficial QAT vs QAD (CE loss vs teacher KL)
- https://huggingface.co/empero-ai/Qwen3.8-9B-Distill y /empero-ai/Qwen3.8-4B-Distill — destilación clásica off-policy (teacher Qwen3.8 2.4T A95B → Qwen3.5-9B/4B, ~70k teacher traces, MMLU +0,205)
- **Censo completo con tabla comparativa**: `ptq-vs-qad-qwen38-flash-next.md` (creado a petición de Fernando)
- https://huggingface.co/api/models/unsloth/Qwen3.8-Flash-Next-GGUF/tree/main — tamaños GGUF (suma de shards)
- Receta YAML de Fernando (GB10 modo solo) — incluida en §5

---

## 13. Guion de ponente (s15, s16, s17)

Guion para explicar las tres slides en voz alta, con las preguntas que suelen saltar.

### s15 — «Qwen 3.8 Flash Next: más cerebro, menos RAM»

> "Este modelo tiene 176B de parámetros totales, pero por token solo piensa con 6B. ¿Cómo? La pieza clave es el *engram*: una biblioteca de 51B parámetros —20 millones de entradas de n-gramas de 2560 dimensiones— que **no computa, se consulta**. Como no participa en la multiplicación de matrices, no hace falta que viva en la GPU: puede estar en la RAM del host o incluso llegar en streaming desde el disco, en paralelo con el cómputo. La GPU carga solo lo que piensa —el backbone MoE de 125B, que con 10 de cada 512 expertos activos por token más uno compartido son unos 65–70 GB— y consulta la biblioteca cuando hace falta. Resultado: calidad de modelo de 176B (GPQA 91,7) con factura de 6B.

**Si preguntan**: "¿Y el 51B qué es?" — 20 millones de entradas × 2560 de dimensión = 51,2B parámetros. Es memoria de n-gramas (bigramas/trigramas), no pesos de capas: se direcciona, no se multiplica. "¿512 expertos?" — la ficha oficial de Hugging Face lo dice literal: *Number of Experts: 512, Number of Activated Experts: 10 Routed + 1 Shared, Expert Intermediate Dimension: 640*. (No confundir con los 512 bloques del indexer QSA.)

### s16 — «Por dentro: cinco piezas en 48 capas»

> "Por dentro son 48 capas, pero no todas iguales: grupos de 3 capas GDN más MoE, y cada cuarto grupo cambia GDN por QSA. GDN es el *cuaderno de campo*: condensa toda la conversación en un estado fijo —barato de mantener aunque el contexto crezca— y por eso no genera KV cache. QSA es la atención *con una lupa*: en lugar de mirar todo el contexto, un indexer ligero selecciona los bloques que importan (512 bloques de 2048 tokens) — la KV cae a 14,7 KB por token y el prefill se acelera ×7,6 con 1M de contexto. El MoE son 512 especialistas y por token solo despiertan 10 ruteados + 1 compartido: la factura no escala con lo que el modelo sabe. El engram ya lo vimos: la biblioteca de frases que se consulta. Y la fontanería: Gated Residual en 4 carriles para estabilizar el entrenamiento, y la capa MTP que predice varios tokens por paso — el +57% de throughput.

**Si preguntan**: "¿Por qué solo 12 capas cargan KV?" — porque solo las 12 QSA usan atención con KV; las 36 GDN viven de su estado. "¿El 640?" — la dimensión intermedia del experto: por eso el tensor fused gate_up es 640×2=1280... y por eso los GGUF estándar se rompen (el 640/128 de la slide 14). "¿MTP gratis?" — no: es una capa extra entrenada multi-step; en vLLM se activa con speculative config.

### s17 — «Dos NVFP4: uno cabe, el otro no»

> "Dos checkpoints, el mismo formato NVFP4, 128 GB de nodo. El de la izquierda es el PTQ habitual (Inferact): los pesos en NVFP4 (81 GB) pero la biblioteca n-gram **en BF16** porque la cuantización post-entrenamiento no se atreve con ella: 102 GB más — 183 GB total. Ni con offload cabe en el nodo. El de la derecha es el QAD (local-inference-lab): un *destilado consciente de la cuantización* — un teacher BF16 congelado entrena al estudiante cuantizado para que compense el error de cuantización. La biblioteca también se cuantiza (NVFP4, ~26 GB) y además se entrena: todo el modelo cabe en 105 GB, con 23 GB libres para KV y buffers. Y de propina, en GPQA marca 89,9, **mejor que el PTQ**, usando un 9% menos de tokens. La lección: cuando un componente es atípico —una tabla de consultas de 51B—, la cuantización agresiva no se hace con una receta genérica: se entrena para ella.

**Si preguntan**: "¿PTQ no es solo cuantizar?" — sí: post-training quantization, sin entrenamiento, a lo sumo calibrando escalas. QAT sería re-entrenar con cuantización simulada con la loss normal (cross-entropy); QAD es eso pero con un teacher BF16 marcando los objetivos (KL de logits). El paper de referencia es el de NVIDIA (arXiv 2601.20088). "¿Hay más destilados?" — hay de dos mundos: destilados de cuantización (QAD: el mismo modelo, más pequeño en bits) y destilados clásicos de conocimiento (empero-ai destiló el Qwen3.8 de 2.4T A95B —¡el teacher gordo, no el Flash Next!— en un 9B y un 4B dense con 70.000 trazas del teacher). Todo el censo con enlaces está en `ptq-vs-qad-qwen38-flash-next.md`. "¿Y el RTX 6000 Pro?" — el PTQ cabe ahí porque tiene 96 GB de VRAM y host RAM aparte para la PLE; en el GB10 la memoria es unificada: pesos + biblioteca + KV compiten en los mismos 128 GB.
