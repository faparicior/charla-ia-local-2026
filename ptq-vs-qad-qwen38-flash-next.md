# PTQ vs QAD en Qwen 3.8 Flash Next — censo de cuantizaciones y destilados

> Recopilación con enlaces y cifras verificadas (fechas de consulta: ronda de agosto 2026, post-lanzamiento del Flash Next).
> Complementa a `referencia-qwen38-flash-next-quantizaciones.md` (censo de fichas) y alimenta las slides 15–17 del deck.

---

## 1. El punto de partida: el modelo BF16 pesa como un coche eléctrico

| Checkpoint | Tamaño | Fuente |
|---|---|---|
| `Qwen/Qwen3.8-Flash-Next` (BF16, base) | **335,3 GiB = 360,0 GB** | medido por mbehr90 y lesj0610 |
| `Qwen/Qwen3.8-Flash-Next-FP8` (FP8 oficial) | **220,8 GiB** | medido por mbehr90 (GSM8K 0,965) |
| Tabla n-gram (PLE) en BF16 | **102,4 GB por sí sola** | lesj0610 |

- Ficha base: <https://huggingface.co/Qwen/Qwen3.8-Flash-Next>
- Ficha FP8 oficial: <https://huggingface.co/Qwen/Qwen3.8-Flash-Next-FP8>
- La PLE es la pieza que manda en el tamaño: en BF16 (102 GB) no cabe en un nodo de 128 GB junto con los pesos; en NVFP4 (~26 GB) sí.

---

## 2. PTQ vs QAD: qué es cada cosa (y por qué la diferencia no es trivial)

### 2.1 Los tres niveles de esfuerzo

| Técnica | Qué hace | Entrenamiento | Cuándo se usa |
|---|---|---|---|
| **PTQ** (post-training quantization) | Se cuantiza el checkpoint ya entrenado; a lo sumo se calibra con datos | **Ninguno** (solo calibración) | La vía rápida; pierde algo de calidad |
| **QAT** (quantization-aware training) | SFT estándar (loss cross-entropy) con cuantización simulada en el forward | Sí, con CE loss | Adaptar el modelo cuantizado a una tarea |
| **QAD** (quantization-aware distillation) | Teacher BF16 congelado guía al estudiante cuantizado (loss de logits KL + variantes) | Sí, contra el teacher | **Recuperar la precisión perdida** por una PTQ agresiva |

Fuente conceptual (guía oficial NVIDIA Model Optimizer):
- Guía QAT/QAD: <https://nvidia.github.io/Model-Optimizer/guides/quantization_aware_training.html>
- Repo examples/llm_qat (incluye walkthrough notebook QAT/QAD): <https://github.com/NVIDIA/Model-Optimizer/blob/main/examples/llm_qat/README.md>
- Repo examples/llm_qad: <https://github.com/NVIDIA/Model-Optimizer/tree/main/examples/llm_qad>

### 2.2 El paper que define QAD (NVIDIA, enero-marzo 2026)

**«Quantization-Aware Distillation for NVFP4 Inference Accuracy Recovery»** — <https://arxiv.org/abs/2601.20088> (v3, 3-mar-2026)

Citas clave del abstract:

> "QAD distills a full-precision teacher model into a quantized student model using a KL divergence loss."

> "It shows remarkable effectiveness and stability for models trained through multi-stage post-training pipelines, including supervised fine-tuning (SFT), reinforcement learning (RL), and model merging, where traditional quantization-aware training (QAT) suffers from engineering complexity and training instability."

> "It is robust to data quality and coverage, enabling accuracy recovery without full training data."

Evaluado en AceReason Nemotron, Nemotron 3 Nano, Nemotron Nano V2, Nano V2 VL (VLM) y Llama Nemotron Super v1 → recuperación "near-BF16".

Blog de fondo: *How Quantization-Aware Training Enables Low-Precision Accuracy Recovery* — <https://developer.nvidia.com/blog/how-quantization-aware-training-enables-low-precision-accuracy-recovery/>

Blog del workflow completo PTQ→QAD→export (Nemotron 3.5 Lightning NVFP4): <https://developer.nvidia.com/blog/developing-nemotron-3-5-lightning-nvfp4-with-qad-using-nvidia-model-optimizer/>

### 2.3 Lecturas sobre los formatos 4-bit (INT4 QAT vs MXFP4 vs NVFP4)

- *INT4 QAT vs MXFP4 vs NVFP4* (ai.rs): <https://ai.rs/ai-developer/int4-qat-mxfp4-nvfp4-quantization>
- *NVIDIA Blackwell NVFP4* (nota.ai): <https://blog.nota.ai/insights/nvidia-blackwell-nvfp4>
- Benchmark NVFP4 en consumibles (sch0tten): <https://github.com/sch0tten/nvfp4-benchmark> · <https://github.com/Rodder5/sm120-quant-bench>
- NVFP4 en RTX PRO 6000 (jarvislabs): <https://jarvislabs.ai/blog/nvfp4-rtxpro-6000>
- NVIDIA Model Optimizer (toolkit PTQ/QAT/QAD): <https://github.com/NVIDIA/Model-Optimizer>

---

## 3. Los checkpoints NVFP4 del Flash Next: cada uno cuenta una historia distinta

### 3.1 Inferact — PTQ clásico (el de la slide 17, rojo ✗)

- Ficha: <https://huggingface.co/Inferact/Qwen3.8-Flash-Next-NVFP4> · archivos: <https://huggingface.co/Inferact/Qwen3.8-Flash-Next-NVFP4/tree/main>
- **182,8 GB en disco**; PLE en BF16 (102 GB) fuera de la GPU («with PLE offload»).
- Es el **checkpoint de referencia** de la comunidad: mbehr90 verificó sus conversiones por correlación de filas (0,991 gate / 0,987 up).
- Su README es un clon del de la base (sin sección de cuantización propia) → la ficha no documenta el proceso; el dato de tamaño está en la propia ficha.

### 3.2 NVIDIA — PTQ con Model Optimizer (mixed precision, la PLE en FP8)

- Ficha: <https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4> (release HF 31-ago-2026)
- Cuantizado con **Model Optimizer v0.46.0** (<https://github.com/NVIDIA/Model-Optimizer>), calibración con `cnn_dailymail` + `Nemotron-Post-Training-Dataset-v2`.
- **Qué queda en qué** (cita de la ficha): "The routed MoE expert linear layers in the main language model use W4A4 NVFP4 with MSE-calibrated weight scales. Attention layers, shared experts, and other main-model layers remain in BF16. The MTP routed experts use 128x128 block-scaled FP8, and the PLE n-gram embedding uses per-tensor FP8."
- **Tamaño**: "approximately 2.7x smaller than the BF16 source checkpoint (about a 63% reduction in disk size)" → ~124 GB.
- **Sin fine-tuning**: "No fine-tuning was performed."
- **Calidad** (FP8 como baseline): GPQA 92,0 → 91,5; HLE 34,7 → 35,4; IFBench 80,5 → 81,0.
- **Hardware objetivo**: Blackwell B200/B300 (vLLM; commit mínimo `d4d703caf` y PR 55513 para MTP).
- Detalle valioso: "The complete MTP module and PLE n-gram embedding match Qwen/Qwen3.8-Flash-Next-FP8 byte-for-byte" — reutiliza el FP8 oficial como fuente de esos módulos.

### 3.3 local-inference-lab — QAD (el de la slide 17, verde ✓)

- Ficha: <https://huggingface.co/local-inference-lab/Qwen3.8-Flash-Next-NVFP4> · su yaml: <https://huggingface.co/local-inference-lab/Qwen3.8-Flash-Next-NVFP4/blob/main/lil.yaml>
- **"quantization-aware distillation (QAD). The student is trained against the original BF16 teacher with quantized weights in its forward pass, learning to compensate for quantization error rather than relying on post-training quantization alone."**
- **98 GiB en disco**; "particularly suited to run on a single RTX 6000 (with PLE offload), or a DGX Spark (with or without PLE offload)".

**Tabla completa de qué se cuantiza y qué se entrena** (tal cual la ficha):

| Componente | Formato | ¿Entrenado en la destilación? |
|---|---|---|
| Routed experts de texto (gate, up, down) | NVFP4 | Trained |
| Tabla n-gram (PLE) | NVFP4 | Trained |
| Shared experts de texto | MXFP8 | Trained |
| Atención (incl. indexadores QSA) | MXFP8 | **Frozen** |
| Routers, mezcla de residual, conv/proj de la PLE | BF16 | Trained |
| Token embeddings, LM head, normas, recurrentes | BF16 | **Frozen** |
| Vision encoder | MXFP8 + NVFP4 FC2 | Unchanged |
| MTP | NVFP4 routed + resto BF16 | Unchanged |

- Formatos: "NVFP4 stores 4-bit E2M1 values with FP8 block scales per 16 elements and an FP32 global scale. MXFP8 stores 8-bit E4M3 values with power-of-two block scales per 32 elements."
- **La destilación en detalle**: "The BF16 teacher generates responses and supplies token-level probability and hidden-state targets... The objective combines next-token probability matching using total variation, hidden-state matching, and separate losses for end-of-response and end-of-thinking behavior."
- **Trainer**: "Training uses the Quatrain distillation trainer: 2,500 trunk updates followed by 1,500 joint-refinement updates, which also train the n-gram embedding tables and simulate MXFP8 shared-expert weights."
- **Datos**: "200,004,844 prompt-and-response tokens across 53,573 documents, with sequences up to 8,192 tokens... Assistant responses are generated by the original BF16 Qwen teacher using its native chat template and thinking mode."
- **Calibración adicional**: 104M tokens de raw-text para las escalas de activación (sin gradientes).
- **Resultados**: GPQA Diamond **89,9** (mejor que el PTQ con 9% menos tokens de media, 15% en mediana, 26% en P99), AA-LCR 79,4, ToolEvalBench 91.

### 3.4 mbehr90 — NVFP4A16 weight-only, sin calibrar (la vía marlin)

- Ficha: <https://huggingface.co/mbehr90/Qwen3.8-Flash-Next-nvfp4>
- **NVFP4A16**: pesos fp4 + escalas fp8 grupo-16, **activaciones BF16** → sin calibración posible ni necesaria ("none — weight-only scheme").
- Solo los routed experts (241 de los 335 GiB del modelo) → **170,2 GiB**; PLE, atención, shared experts, MTP… en BF16.
- **Verificado en 4×H100 80 GB** (Marlin W4A16; en Hopper no hay kernels FP4, "vLLM has no FP4 tensor-core kernel for SM90").
- GSM8K (200 q): bf16 0,950 / FP8 0,965 / NVFP4 0,960 — "statistically indistinguishable" (SE ~1,5 pp).
- Detalle de ingeniería: transformers 5.14/5.15 no implementa `Qwen4ExpForConditionalGeneration` (solo el plugin out-of-tree de vLLM) → cuantizó los tensores shard a shard sin construir el modelo.
- `VLLM_PLE_CPU_OFFLOAD=1` mantiene la PLE (~95 GiB) en RAM del host.

### 3.5 lesj0610 — PTQ con la receta oficial de NVIDIA aplicada tal cual (la auditoría)

- Ficha: <https://huggingface.co/lesj0610/Qwen3.8-Flash-Next-NVFP4>
- **186,4 GB** (base 360,0 GB) — 296.347 tensores en 10 shards, integridad auditada.
- Usa la receta oficial **`nvfp4_experts_only_input_scale1-kv_fp8_cast.yaml`** de TensorRT Model Optimizer (`modelopt_recipes/general/ptq/`) "applied as published" — NVIDIA no había publicado receta específica para este modelo.
- Routed experts NVFP4 (bloque 16); **todo lo demás BF16** (atención, GDN, QSA indexer, shared experts, routers, hiper-conexiones, PLE); **KV cache FP8** (cast, escala implícita).
- Curiosidades técnicas: `constant_amax: 2688.0` = E2M1_MAX × E4M3_MAX (6 × 448) → fija el input_scale a 1,0 y **el cálculo del forward de calibración se elide** ("only weight calibration runs... No calibration dataset was used").
- Cuatro exclusiones añadidas para módulos nuevos del Qwen: `ple.ple_embedding`, `ple.conv1d`, `hyper_connection` (~0,6B), `self_attn.indexer` (~0,02B) — con razones.
- La PTQ entera corrió en **2×64 GB en 44 minutos** (la tabla n-gram, 102,4 GB, en disco vía offload de accelerate).
- Honestidad del readme: "No inference was run against these weights... Treat downstream task quality as unmeasured."

### 3.6 El resto del ecosistema (GGUF y W4A16)

- <https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF> (el censo completo por tamaños; doc con "Finetuned" en su tree)
- <https://huggingface.co/AtomicChat/Qwen3.8-Flash-Next-GGUF>
- <https://huggingface.co/qtum/Qwen3.8-Flash-Next-GGUF>
- <https://huggingface.co/Minachist/Qwen3.8-Flash-Next-INT4-Mixed-AutoRound>
- <https://huggingface.co/VnimanieAI/Qwen3.8-Flash-Next-W4A16> (verificar nombre exacto en `referencia-qwen38-flash-next-quantizaciones.md`)
- En total, el árbol del modelo base cuenta **253 repos "quantized"** derivados: <https://huggingface.co/models?other=base_model:quantized:Qwen/Qwen3.8-Flash-Next>

---

## 4. ¿Hay más tipos de destilados? Sí: la destilación clásica (otra arquitectura, otro tamaño)

**empero-ai/Qwen3.8-9B-Distill** y **empero-ai/Qwen3.8-4B-Distill** — <https://huggingface.co/empero-ai/Qwen3.8-9B-Distill> · <https://huggingface.co/empero-ai/Qwen3.8-4B-Distill>

No cuantización: **destilación de conocimiento clásica** (off-policy SFT sobre trazas del teacher):

> "**Qwen3.8-9B** is a full-parameter distillation of **Qwen3.8 2.4T A95B** into the Qwen3.5-9B architecture. The student was trained on **~70,000 curated teacher traces** from our internal Qwen3.8 distillation datasets — dense chain-of-thought spanning mathematics, code, general reasoning, instruction following, and tool use."

- Teacher: el gigante Qwen3.8 **2.4T A95B** (¡2,4 billones de parámetros, 95B activos!), no el Flash Next.
- Student: arquitectura Qwen3.5-9B (dense) → despliegue en una sola GPU.
- "Distilled chain-of-thought — every answer opens with a `</think>` block learned directly from Qwen3.8 2.4T A95B traces rather than synthetic self-generated reasoning."
- Resultados vs base Qwen3.5-9B: MMLU CoT flexible 0,546 → **0,751** (+0,205); strict 0,251 → **0,511** (+0,260); GSM8K CoT −0,015 (0,885 → 0,870).
- Full fine-tune ("every parameter updated; not an adapter"), TRL + Transformers, Apache-2.0.

**Los cuatro "tipos de destilados" que conviene distinguir en la charla:**

1. **Knowledge distillation clásica** (SFT off-policy sobre traces del teacher, otra arquitectura): empero-ai 9B/4B. Barata, estable, pierde capacidad del teacher a lo grande.
2. **QAT** (SFT con cuantización simulada + CE loss): adaptas el modelo cuantizado a una tarea.
3. **QAD** (teacher BF16 + loss de distribución de logits/estados, mismo modelo cuantizado): recupera lo perdido por la PTQ. El paper de NVIDIA lo recomienda justo para modelos con post-training multi-etapa (SFT+RL+merging).
4. **Destilación "a la venta" en APIs**: el teacher sirve vía API y el estudiante aprende de sus respuestas (lo que hace local-inference-lab con el corpus del teacher: "Assistant responses are generated by the original BF16 Qwen teacher using its native chat template").

---

## 5. Resumen para la slide (una línea por checkpoint)

| Checkpoint | Tamaño | Método | PLE | ¿Cabe en 128 GB? |
|---|---|---|---|---|
| Base BF16 | 335,3 GiB | — | BF16 102 GB | No (ni de broma) |
| FP8 oficial Qwen | 220,8 GiB | PTQ FP8 | BF16 | No |
| Inferact NVFP4 | 182,8 GB | PTQ (W4A4 + MSE) | BF16, fuera | **No** (81 + 102 = 183 > 128) |
| lesj0610 NVFP4 | 186,4 GB | PTQ receta oficial NVIDIA | BF16, fuera | **No** |
| mbehr90 NVFP4A16 | 170,2 GiB | PTQ weight-only sin calibrar | BF16, fuera | No (4×H100 sí) |
| nvidia NVFP4 | ~124 GB | PTQ ModelOpt (W4A4 + MSE) | **FP8** | Ajustado (sin KV en un 128) |
| **local-inference-lab QAD** | **98 GiB** | **QAD (Quatrain, 2.500+1.500 updates)** | **NVFP4 ~26 GB, dentro** | **Sí** (+23 GB libres) |

La moraleja de la slide 17 se sostiene: **mismo formato NVFP4, decisión distinta con la biblioteca n-gram** — cuantizarla también (y entrenarla para que lo soporte) es lo que baja 183 GB → 98 GiB y mete el modelo entero en un nodo de 128 GB.
