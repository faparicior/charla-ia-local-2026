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
