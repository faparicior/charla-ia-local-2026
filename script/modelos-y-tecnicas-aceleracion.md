| Modelo / Hardware | Fecha oficial de lanzamiento | Tipo / Arquitectura / Memoria |
| --- | --- | --- |
| **Qwen 3.5 122B** (*Qwen3.5-122B-A10B*) | **23 de febrero de 2026** | MoE multimodal (10B activos) |
| **Qwen 3.5 35B** (*Qwen3.5-35B-A3B*) | **24 de febrero de 2026** | MoE multimodal (3B activos) |
| **NVIDIA DGX Spark / ASUS Ascent GX10** (*GB10*) | **Marzo de 2026** | Estación Blackwell SM 12.1a con 128 GB LPDDR5x unificados |
| **Qwen 3.6 35B** (*Qwen3.6-35B-A3B*) | **16 de abril de 2026** | MoE multimodal optimizado |
| **Qwen 3.8 27B** | **14 de agosto de 2026** | Dense multimodal / híbrido (DeltaNet + Attention) |


| Hardware / Modelo | Técnica / Drafter | Fecha de integración en repositorios de `eugr` | Contexto de la receta / implementación |
| --- | --- | --- | --- |
| **NVIDIA DGX Spark / GB10** | **vLLM / SM 12.1a** | **Marzo – Abril de 2026** | Primeras estaciones locales con 128 GB unificados; base de despliegue para recetas MTP comunitarias (`eugr`) y cuantización NVFP4/INT4. |
| **Qwen 3.5 122B** (*A10B*) | **MTP** | **Principios de abril de 2026** | Integración con `num_speculative_tokens: 2` sobre checkpoints AutoRound INT4 y FP8 híbrido. |
|  | **DFlash** | **Finales de junio de 2026** (~24 de junio) | Receta con *block drafting* paralelo (~12 tokens por forward) para tráfico agentic/código. |
| **Qwen 3.5 35B** (*A3B*) | **MTP** | **Marzo – principios de abril de 2026** | Recetas iniciales vLLM; limitado a 1 token especulativo por saturación de ancho de banda. |
|  | **DFlash** | **Junio de 2026** | Soporte de *block diffusion* adaptado al footprint del MoE liviano. |
| **Qwen 3.6 35B** (*A3B*) | **MTP** | **Finales de abril de 2026** | Recetas lanzadas poco después de la publicación oficial del modelo. |
|  | **DFlash** | **Julio – principios de agosto de 2026** | Integración formal de la receta con `z-lab/Qwen3.6-35B-A3B-DFlash` (`num_speculative_tokens: 15`). |
| **Qwen 3.8 27B** | **MTP** | **16 – 18 de agosto de 2026** | Soporte nativo inmediato post-lanzamiento (`--speculative-config.method mtp`, 2 a 5 tokens). |
|  | **DFlash 2** | **20 – 22 de agosto de 2026** | Configuración para `z-lab/Qwen3.8-27B-DFlash2` con bloque selector de 8 tokens tras la salida del framework. |


**MTP (Multi-Token Prediction)**

* **Principio:** Entrena cabezales adicionales (*prediction heads* o capas ligeras conectadas al *trunk* del modelo) para predecir no solo el siguiente token ($t+1$), sino también posiciones futuras ($t+2$, $t+3$, etc.) en un único paso de entrenamiento.
* **Uso en inferencia (*Self-Speculative Decoding*):** Estos cabezales actúan como un *drafter* interno sin requerir un modelo auxiliar externo. Proponen una secuencia corta de tokens que el modelo base verifica en una sola pasada causal paralela.
* **Ventajas y límites:** Overhead de memoria mínimo y latencia de *drafting* casi nula. Sin embargo, la tasa de aceptación decae rápidamente a partir de 2–4 tokens hacia adelante al perder contexto autoregresivo profundo.

---

**DFlash (*Block Diffusion Speculative Decoding*)**

* **Principio:** Sustituye el *drafter* autoregresivo tradicional por un modelo ligero basado en **difusión por bloques** (*block diffusion*).
* **Mecanismo:** En lugar de generar tokens de borrador uno a uno de forma secuencial, DFlash predice un bloque completo (p. ej., 8 a 15 tokens) en un **único forward pass**, condicionado por los *context features* del modelo base.
* **Ventajas:** Elimina el cuello de botella secuencial del *drafting*. Proporciona aceleraciones de 2x a 3x en inferencia sin alterar la distribución original de salida (*lossless*).

---

**DFlash 2**

* **Principio:** Evolución de DFlash orientada a mitigar la pérdida de precisión en los últimos tokens del bloque (*tail decay*).
* **Mecanismo (*Multi-Candidate + Path Selector*):** Mantiene múltiples candidatos viables (hasta 16) por cada posición del bloque. Un selector ligero puntúa y traza la trayectoria más coherente a través del grafo de candidatos antes de enviar el bloque al modelo base para verificación.
* **Ventajas:** Aumenta notablemente la longitud media de aceptación (*acceptance rate/run*) frente a DFlash v1 y MTP en modelos densos/híbridos (como Qwen 3.8 27B), logrando hasta ~3.4x de aceleración a baja concurrencia.

---

| Característica | MTP | DFlash | DFlash 2 |
| --- | --- | --- | --- |
| **Tipo de Drafter** | Cabezales internos / autoregresivo ligero | Modelo externo de difusión por bloques | Difusión por bloques + Selector de caminos |
| **Generación de borrador** | Secuencial / heads paralelos fijos | 1 *forward pass* paralelo | 1 *forward pass* paralelo + selección multi-candidato |
| **Tokens típicos por bloque** | 1 – 3 tokens | 8 – 16 tokens | 8 tokens (con candidatos por slot) |
| **Impacto en VRAM** | Prácticamente nulo | Bajo (modelo auxiliar compacto) | Bajo (modelo auxiliar + micro-selector) |
| **Garantía de salida** | *Lossless* (verificado por el base) | *Lossless* | *Lossless* |