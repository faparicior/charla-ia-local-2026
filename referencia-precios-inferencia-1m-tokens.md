# Referencia: precios de inferencia por 1M de tokens (slide 8, parte 1)

> **Uso:** verificación de los valores de la tabla «Costes de Inferencia por 1M de Tokens» y colección de enlaces fuente por si la slide necesita citas (`press-footer-link`).
> **Última verificación:** 19 sep 2026.
> **Criterio:** precios comerciales estándar (lista oficial, sin promos ni picos). Conversión usada en la charla: **1 USD = 0,92 €**.

## 1. Valores en la tabla (tras la revisión)

| Proveedor | Modelo | Entrada ($ / €) | Entrada con caché | Tipo |
|---|---|---|---|---|
| OpenAI | GPT-5.6 Sol / o3 | $4.00 / 3,68 € | $0.40 / 0,37 € | Frontier Flagship |
| Anthropic | Claude Sonnet 5 | $3.00 / 2,76 € | $0.30 / 0,28 € | Gama Media / Agentes |
| Google | Gemini 3.6 Flash | $0.75 / 0,69 € | $0.075 / 0,07 € | Equilibrado Cloud |
| DeepSeek | V4 Flash / R1 | $0.14 – $0.66 | $0.003 / 0,003 € | Open-Weight MoE |
| Alibaba Qwen | Qwen 3.8 (27B / 72B) | $0.08 – $0.40 | Hasta 90% desc. | Open-Weight Eficiente |
| Alibaba Qwen | Qwen 3.8 Flash Next | $0.15 / 0,14 € | $0.075 / 0,07 € | Open-Weight MoE Ligero |
| Zhipu (Z.ai) | GLM 5.3 Flash | $0.15 / 0,14 € | $0.03 / 0,03 € | Open-Weight Agéntico |
| AI Local Crafters | Hardware Propio (GGUF / vLLM) | 0,00 € / token | Ilimitado | 100% Privado & Autónomo |

## 2. Qué cambió y por qué (verificación 19 sep 2026)

| Fila | Antes | Ahora | Motivo (fuente oficial) |
|---|---|---|---|
| GPT-5.6 Sol | $5.00 / caché $0.50 | **$4.00 / caché $0.40** | OpenAI rebajó un 20% input / 33% output el 30 jul 2026 (≈3 semanas tras el lanzamiento del 9 jul). Precio corto-contexto oficial actual. |
| Claude Sonnet 5 | $2.00 / caché $0.20 | **$3.00 / caché $0.30** | El precio introductorio ($2/$10) expiró el 31 ago 2026; desde 1 sep rige el estándar $3/$15. Caché hit = 10% del input ($0.30). |
| Gemini 3.6 Flash | $1.50 / caché $0.15 | **$0.75 / caché $0.075** | Esquema con fecha de Google: $0.75/$3.75/$0.075 vigente hasta 31 dic 2026 (duplica el 1 ene 2027 a $1.50/$7.50/$0.15 — la tabla tenía el precio de 2027). |
| DeepSeek V4 Flash/R1 | $0.14 – $0.55 | **$0.14 – $0.66** | V4-Flash $0.14 ✓ sin cambios; V4-Pro subió en la subida del 16 ago 2026 (~$0.435 → $0.66+). Caché hit V4-Flash $0.0028 ≈ $0.003 ✓. |
| Qwen 3.8 (27B/72B) | $0.08 – $0.40 | sin cambios | Hosting comercial de terceros para tamaños abiertos pequeños, en rango. |
| **Qwen 3.8 Flash Next** | (nueva) | **$0.15 / caché $0.075** | Qwen3-Next-80B-A3B: oficial internacional $0.15/$1.20 (vigente desde 30 abr 2026); DeepInfra $0.09/$1.10; caché read ~$0.075. |
| **GLM 5.3 Flash** | (nueva) | **$0.15 / caché $0.03** | Lista oficial Z.ai (docs.z.ai): $0.15 input / $0.03 caché / $0.50 output. La promo de lanzamiento (50%: $0.075/$0.015/$0.25) terminó el 9 sep 2026. |

## 3. Enlaces fuente (listos para `press-footer-link`)

| Modelo | Fuente | URL |
|---|---|---|
| GPT-5.6 Sol | OpenAI — Pricing (API) | https://developers.openai.com/api/docs/pricing |
| GPT-5.6 Sol | OpenAI — página del modelo | https://developers.openai.com/api/docs/models/gpt-5.6-sol |
| Claude Sonnet 5 | Anthropic — Model pricing | https://platform.claude.com/docs/en/about-claude/pricing |
| Claude Sonnet 5 | Anthropic — Sonnet 5 overview | https://platform.claude.com/docs/en/models/sonnet-5/overview |
| Claude Sonnet 5 | eesel AI — calendario intro→estándar | https://www.eesel.ai/blog/claude-sonnet-5-pricing |
| Gemini 3.6 Flash | Google — Gemini API pricing | https://ai.google.dev/gemini-api/docs/pricing |
| DeepSeek V4 | DeepSeek — Models & Pricing | https://api-docs.deepseek.com/quick_start/pricing |
| DeepSeek V4 | deepseek.ai/pricing (verificación independiente) | https://deepseek.ai/pricing |
| Qwen 3.8 | Alibaba Model Studio — precios | https://docs.modelstudio.console.alibabacloud.com/en/model-studio/qwen3-next-80b-a3b-instruct.md |
| Qwen 3.8 | Mercatus — todos los hosts Qwen3.8 | https://www.mercatus-ai.com/blog/qwen-api-pricing |
| Qwen 3.8 Flash Next | OpenRouter — qwen3-next-80b-a3b-instruct | https://openrouter.ai/qwen/qwen3-next-80b-a3b-instruct |
| GLM 5.3 Flash | Z.ai — Developer pricing | https://docs.z.ai/ |
| GLM 5.3 Flash | TokenCost — GLM-5.3-Flash | https://tokencost.app/models/glm-5-3-flash |
| GLM 5.3 Flash | eesel AI — promo y lista | https://www.eesel.ai/blog/glm-5-3-flash-pricing |

## 4. Fechas que hay que vigilar (los precios caducan)

- **31 dic 2026** → Gemini 3.6 Flash duplica ($0.75→$1.50; caché $0.075→$0.15).
- **GPT-5.6 Sol** «promo pricing available at least through…» — revisar si vence la rebaja del 30 jul.
- Contexto largo (>272K) en GPT-5.6 factura **2× input / 1.5× output**.
- DeepSeek: precios con recargos hora punta/fuera de punta; V4-Pro en rampa de precios desde el 16 ago.
- Nota: la tabla compara **entrada** (lo que domina en agentes con prompt caching); los outputs van 3–5× por encima en los flagships ($20–$50).
