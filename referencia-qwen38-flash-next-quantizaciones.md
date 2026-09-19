# Referencia: Qwen 3.8 Flash Next — tamaños por cuantización

*Verificación 29 sep 2026. Fuentes listadas al pie; cifras medidas sobre los checkpoints reales, no extrapoladas.*

## Arquitectura (ficha oficial Hugging Face)
- Backbone MoE: **125B parámetros** (512 expertos/capa, top-10) → **6B activos** por token
- **51B N-gram Embedding (PLE)**: tabla indexada por n-grams, **descargable a RAM del host** y prefetcheada en paralelo con el cómputo — no entra en la multiplicación por token
- **4B MTP** (multi-token prediction) + vision tower (~0.84 GB) — multimodal
- Contexto nativo 262K (1M con override YaRN); las capas GDN comprimen el estado histórico en un estado de tamaño fijo (no KV cache creciente pura)

## Cifras medidas (checkpoints reales)
| Cuantización | Tamaño | Fuente |
|---|---|---|
| BF16 / FP16 (safetensors oficiales) | **360,0 GB** (131 shards) | kingy.ai, safetensors reales |
| FP8 (oficial) | **185,5 GB** | kingy.ai, safetensors reales |
| GGUF BF16 (Unsloth) | 354,0 GB | API HF, suma de 8 shards |
| GGUF Q8_0 | 188,2 GB | API HF, suma de shards |
| GGUF UD-Q6_K_XL | 169,2 GB | API HF |
| GGUF UD-Q5_K_XL | **158,3 GB** | API HF |
| GGUF UD-Q4_K_XL | 111,3 GB | API HF |
| GGUF UD-IQ4_XS | 93,7 GB | API HF |
| GGUF UD-Q3_K_XL | 90,0 GB | API HF |
| GGUF UD-Q2_K_XL | 78,9 GB | API HF |
| GGUF UD-IQ1_M (1-bit) | 74,5 GB | API HF |
| W4A16 INT4 (terceros, VnimanieAI) | **168 GB** en disco | ficha del repo |
| INT4 Mixed AutoRound 4,21 bpw (terceros, Minachist) | **~166 GiB ≈ 178 GB** | ficha del repo |
| NVFP4 (terceros, Inferact) | **182,8 GB** (experts NVFP4 + resto BF16/FP8) | `usedStorage` del repo |

## El truco del modelo: GPU-resident pequeño
- En los checkpoints INT4 de terceros los **pesos residentes en GPU son solo 65–70 GiB** (expertos MoE en INT4: 58–65 GiB + resto INT6/INT8); la **tabla n-gram (95–102 GB) vive en RAM del host** o **se streamea desde disco** (build parcheada de Minachist)
- En DGX Spark / GB10 (128 GB unificados): GPU 65–70 GiB + n-gram streameado desde SSD ⇒ **cabe**, con ~58 GB libres para KV/concurrencia
- AWQ pura no existe: `llm-compressor` no linearizó el checkpoint de 335 GiB BF16 en 256 GB de RAM del host; los terceros usaron RTN sin datos de calibración

## Rutas de hardware validadas por Qwen (FP8)
- GB300 (288 GB): TP2 mínimo; **8× H200**: TEP8 con Triton MoE (TP8 simple incompatible con bloques FP8 128×128); 4× MI355X (ROCm); 4× RTX PRO 6000 Blackwell (384 GB agregados, "verified" con concurrencia reducida)
- **Sin ruta validada**: RTX 4090 (24 GB), RTX 5090 (32 GB), 2× A100 (fallo de carga FP8, issue #54219), H100, single-GPU TP1 (deadlock GB10, issue #53960), Apple Silicon (vLLM no lo soporta; sin ruta Metal/MLX)
- RAM del host: suelo PLE-CPU-offload ≥ 51 GB + holgura; 128 GB de RAM del sistema como suelo de planificación

## Fila puesta en la slide 14 (matriz Goldilocks)
`★ Qwen 3.8 Flash Next | 125B + 51B / 6B (MoE híbrido) | ~360.0 | ~185.5 | ~158.0 (pill, GGUF Q5) | ~168.0 | ~178.0 | ~183.0 | "Frontera en 128 GB: solo 65–70 GB en GPU; el n-gram (102 GB) vive en RAM del host"`

## Fuentes
- https://huggingface.co/Qwen/Qwen3.8-Flash-Next (ficha oficial)
- https://kingy.ai/blog/qwen3-8-flash-next-hardware-requirements-vram-vllm/ (pesos medidos + rutas vLLM)
- https://www.alibabacloud.com/blog/qwen-3-8-flash-next-a-new-architecture-towards-ultimate-cost-efficiency_603501 (arquitectura n-gram/PLE)
- https://huggingface.co/VnimanieAI/Qwen3.8-Flash-Next-W4A16 (INT4 GPU + PLE host)
- https://huggingface.co/Minachist/Qwen3.8-Flash-Next-INT4-Mixed-AutoRound (4,21 bpw mixto, PLE desde disco)
- https://huggingface.co/Inferact/Qwen3.8-Flash-Next-NVFP4 (usedStorage 182,8 GB)
- https://huggingface.co/api/models/unsloth/Qwen3.8-Flash-Next-GGUF/tree/main (sumas de shards GGUF)

## ACTUALIZACIÓN (debate con Fernando): checkpoint NVFP4 QAD de 98 GiB
La receta real de GB10/DGX Spark (modo solo, TP1) usa `local-inference-lab/Qwen3.8-Flash-Next-NVFP4`, un checkpoint **destilado con distilación consciente de cuantización (QAD)** — no un PTQ:

- **98 GiB en disco** (frente a 182,8 GB del NVFP4 PTQ de Inferact). La PLE también va cuantizada a NVFP4 (~26 GB), por eso es mucho más ligero.
- Cuantización: expertos ruta NVFP4 + PLE NVFP4 (destilados); shared experts MXFP8; atención/QSA MXFP8 (congelados); routers/mixing BF16.
- Calidad: GPQA Diamond 89.9 (mejor que el PTQ NVFP4 con 9% menos tokens).
- Ficha: «suitable for a single RTX 6000 (with PLE offload), or a DGX Spark (with or without PLE offload)» — **cabe entero en los 128 GB unificados**.
- Receta GB10 (Fernando): `vllm serve ... --quantization modelopt_mixed --load-format b12x --dtype bfloat16 --kv-cache-dtype fp8 --mamba-cache-mode align` + `VLLM_PLE_TABLE_MEMORY: "disk"` + MTP depth 4 + `--gpu-memory-utilization 0.8` + max_len 262144 + max_num_seqs 8. Stack `vllm-node-b12x` (sm_121a), solo_only.

## Aclaraciones del debate (cifras del Diagnóstico s14)
- **65–70 GB en GPU**: correcto y doblemente verificado (W4A16 ~66 GiB; AutoRound 65,05 GiB) — son los pesos residentes (expertos MoE INT4 + resto).
- **102 GB de n-gram en host**: correcto — 20M n-grams × 2560 dim = 51,2B params × 2 bytes BF16 = 102,4 GB (AutoRound mide 95,37 GiB de la misma tabla). En el QAD la PLE va en NVFP4 (~26 GB), de ahí el 98 GiB total.
- **El «≥110 GB»** de la ficha W4A16 es *RAM del host libre requerida por el PLE*, no KV cache. KV real: solo 12/48 capas lo llevan (GDN tiene estado fijo), ~14,7 KB/token/GPU → 8,2 GB de pool ≈ 600k tokens.
- **96B/56B vs 51B**: la cifra correcta es 51B (card oficial + cuenta interna 20M × 2560). 125+51 = 176B totales (sin MTP).
- **30–40 tok/s en GB10**: no verificado en fuentes públicas (en 8×RTX 3090 miden 100–107 tok/s decode con MTP; en GB10 TP1+b12x es plausible que baje a ~30–40).
- **Celda NVFP4 de s14**: se mantiene en ~183,0 GB (checkpoint PTQ global, criterio homogéneo de la tabla). El QAD de 98 GiB es material para la futura sección especial del modelo (n-gram/engram).

## Versión FINAL de la fila s14 (pensada para el nodo GB10)
`★ Qwen 3.8 Flash Next | 125B + 51B / 6B (MoE híbrido) | ~360.0 | ~185.5 | ~158.0 | ~168.0 | ~178.0 | ~105.0 (pill, NVFP4 QAD) | nota: «Cabe entero en 128 GB (QAD): PLE a disco deja aire para KV»`
- La celda NVFP4 ya no es el PTQ de Inferact (182,8 GB) sino el **QAD de 98 GiB (~105 GB decimales)**, el checkpoint real que carga un solo nodo DGX Spark/GB10 (98/128 GiB < 0,8 de utilización).
- La pill se queda en NVFP4 y recupera el patrón de las otras filas escogidas: pill = celda menor de la fila (105 < 158 < 168 < 178 < 185,5 < 360).
- El detalle 65–70 GB en GPU / PLE 102 GB host / QAD / engram: material de la **slide especial** futura (dossier-qwen38-flash-next.md), no de la matriz.
