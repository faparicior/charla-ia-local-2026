# Benchmark y Rendimiento de Inferencia Local: Prefill vs. Decode (2026)

> **Dossier de Rendimiento (Julio – Octubre 2026):**  
> Datos reales de velocidad de procesamiento de prompt (**Prefill**) y velocidad de generación de tokens (**Decode / Generación**) para las tres grandes plataformas de memoria unificada de 128 GB+: **NVIDIA DGX Spark (Blackwell GB10)**, **Apple Mac (M4 Max / M5 Max / M5 Ultra)** y **AMD Strix Halo (Ryzen AI Max+ 395)**.  
> Fuentes contrastadas con hilos de **r/LocalLLaMA**, **r/StrixHalo** y mediciones de la comunidad.

---

## 1. Conceptos Clave: Por qué Prefill y Decode se comportan de forma opuesta

| Fase | Qué mide | Cuello de botella principal | Dónde brilla cada arquitectura |
| :--- | :--- | :--- | :--- |
| **Prefill (Prompt Processing / TTFT)** | Procesar todos los tokens del prompt de entrada en paralelo para construir la matriz de atención y la KV Cache. | **Cómputo puro (FLOPs)** y Tensor Cores. | **NVIDIA Blackwell (DGX Spark)** domina con diferencia gracias a sus Tensor Cores FP4/FP8. |
| **Decode (Token Generation)** | Generar tokens secuencialmente (uno a uno, autorregresivo). Cada token requiere leer todos los pesos del modelo de la memoria. | **Ancho de banda de memoria (GB/s)** (*Memory Bandwidth Bound*). | **Apple Silicon (M5 Ultra / M4 Max)** domina en *single-stream* gracias a sus buses de 546 GB/s a 1.200 GB/s. |

> **La ley matemática del Decode monousuario:**  
> $\text{Velocidad máxima teórica (tok/s)} \approx \frac{\text{Ancho de banda de memoria (GB/s)}}{\text{Tamaño del modelo en memoria (GB)}}$  
> Para un modelo denso de 70B cuantizado en 4-bit (~40 GB):  
> - En un bus de **256–273 GB/s** (DGX Spark / Strix Halo): Máximo teórico $\approx 273 / 40 \approx 6.8 \text{ tok/s}$.  
> - En un bus de **546 GB/s** (M4 Max): Máximo teórico $\approx 546 / 40 \approx 13.6 \text{ tok/s}$.  
> - En un bus de **1.200 GB/s** (M5 Ultra): Máximo teórico $\approx 1200 / 40 \approx 30.0 \text{ tok/s}$.

---

## 2. Tabla Comparativa de Rendimiento (Datos Reales 2026)

Mediciones recopiladas en benchmarks de los últimos 3 meses (agosto–octubre 2026) con backends optimizados (*vLLM*, *MLX*, *llama.cpp con Vulkan/MTP*, *Halogen*):

| Plataforma / Hardware | Ancho de Banda Memoria | Modelo Evaluado | Cuantización / Formato | Prefill (Prompt) | Decode (Generación) | Backend / Notas Técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NVIDIA DGX Spark**<br>*(Blackwell GB10, 128 GB)* | **273 GB/s**<br>(LPDDR5x unificada) | **Llama 3.1 8B**<br>**gpt-oss 20B**<br>**gpt-oss 120B (MoE)**<br>**Llama 3.3 70B (Denso)**<br>**Qwen 3.8 Flash-Next** | Q4_K_M<br>MXFP4<br>MXFP4<br>NVFP4 / Q4<br>QAD (98 GiB) | **~7.600 tok/s**<br>**~3.200 tok/s**<br>**~1.100 tok/s**<br>~2.100 tok/s<br>**~2.500 tok/s** | **~38 tok/s**<br>**~58 tok/s**<br>**~41 tok/s**<br>~3,5–5 tok/s<br>**~35–42 tok/s** | *vLLM (sm_121a)*.<br>Brutal en prefill. El decode monousuario en densos 70B choca con los 273 GB/s; MoE mitiga el impacto. En alta concurrencia (batching) satura y multiplica el throughput global. |
| **AMD Strix Halo**<br>*(Ryzen AI Max+ 395, 128 GB)* | **~256 GB/s**<br>(LPDDR5X-8000) | **Llama 3.1 8B**<br>**Qwen 2.5 / 3.8 27B-35B**<br>**Qwen 3.8 Flash-Next**<br>**Llama 3.3 70B**<br>**400B (2× Halo Clustered)** | Q4_K_M<br>Q4_K_M<br>GGUF Q4 (MTP)<br>Q4_K_M<br>Q4 | ~950 tok/s<br>~600 tok/s<br>**1.200–1.685 tok/s**<br>~420 tok/s<br>— | **~45–60 tok/s**<br>**~25–35 tok/s**<br>**~40–70 tok/s**<br>~5–7 tok/s<br>~7–18 tok/s | *Halogen / Gufo / llama.cpp Vulkan (RADV)*.<br>Multi-Token Prediction (MTP) duplica el decode en Qwen. El motor Halogen exprime el iGPU RDNA 3.5 (40 CUs) y descarga embeddings al NPU. |
| **Apple Mac Studio M4 Max**<br>*(128 GB unificada)* | **546 GB/s** | **Llama 3.1 8B**<br>**Qwen 2.5 32B**<br>**Llama 3.3 70B** | 4-bit / Q4<br>4-bit / Q4<br>4-bit / Q4 | ~850 tok/s<br>~450 tok/s<br>~250 tok/s | **~75–100+ tok/s**<br>**~20–28 tok/s**<br>**~12–15 tok/s** | *MLX / llama.cpp Metal*.<br>Doble de ancho de banda que DGX Spark y Strix Halo; excelente experiencia monousuario en modelos 70B interactivos. |
| **Apple Mac Studio M5 Ultra**<br>*(256 GB – 512 GB unificada)* | **1.200 GB/s (1.2 TB/s)** | **Llama 3.1 8B**<br>**Llama 3.3 70B**<br>**DeepSeek V4-Flash (284B)** | 4-bit / Q4<br>4-bit / Q4<br>Q4 | **>2.000 tok/s**<br>~1.100 tok/s<br>~800 tok/s | **>150+ tok/s**<br>**~25–30 tok/s**<br>**~60–68 tok/s** | *MLX con Neural Accelerators de GPU M5*.<br>El rey indiscutible del decode monousuario local. Capaz de mover modelos gigantescos a velocidad de lectura humana alta. |

---

## 3. Radiografía por Plataforma

### A. NVIDIA DGX Spark (Blackwell GB10)
* **Punto Fuerte (Prefill demoledor):** Los núcleos tensores Blackwell de 5ª generación y el soporte nativo de tipos numéricos microscópicos (FP4/MXFP4) permiten ingestar prompts masivos (32k–200k tokens) a velocidades de **miles de tokens por segundo**. El *Time-To-First-Token (TTFT)* es casi instantáneo.
* **El Cuello de Botella (Decode):** Al contar con un bus unificado de 256 bits LPDDR5x (273 GB/s), un modelo denso de 70B genera a apenas **3–5 tok/s** si se usa en mono-hilo. 
* **Cómo se soluciona en la práctica:**
  1. **Uso de modelos MoE (Mixture of Experts):** En un modelo MoE de 120B como `gpt-oss 120B` o `Qwen 3.8 Flash-Next`, solo se activan unos pocos miles de millones de parámetros por token (~6B a 11B), logrando **40+ tok/s** de decode porque no se lee la matriz entera en cada paso.
  2. **Batching concurrente:** En servicios multiusuario o flujos multiagente con *vLLM*, el clúster procesa 32–64 peticiones en paralelo manteniendo el mismo throughput agregado sin desperdiciar los Tensor Cores.

---

### B. AMD Strix Halo (Ryzen AI Max+ 395)
* **El fenómeno de software de 2026 (Halogen & Gufo):**
  - La comunidad descubrió en verano de 2026 que el `llama.cpp` estándar no aprovechaba más del 50% de la arquitectura gfx1151 de Strix Halo.
  - Motores optimizados como **Halogen Flash Server** y **Gufo** implementaron kernels específicos para las 40 CUs de RDNA 3.5 y descarga al NPU XDNA 2, alcanzando **1.200–1.685 tok/s de prefill**.
* **El papel de Multi-Token Prediction (MTP):**
  - Al utilizar modelos modernos con cabezales MTP (como la familia Qwen 3.8), el motor predice varios tokens de forma especulativa en un único paso de memoria, elevando la velocidad de decode de **~25 tok/s a picos de 60–70 tok/s**.
* **Backend:** En Linux, el driver **Vulkan (RADV)** ha demostrado ser más estable que ROCm para evitar cuellos de botella de fragmentación de memoria unificada en contextos largos (>128k tokens).

---

### C. Apple Silicon (M4 Max / M5 Ultra)
* **El rey de la experiencia monousuario en decode:**
  - Con **546 GB/s** en el M4 Max y **1.200 GB/s** en el M5 Ultra, Apple barre a DGX Spark y a Strix Halo en velocidad de generación pura de modelos densos como Llama 3.3 70B (12–15 tok/s en M4 Max frente a 4–5 tok/s en DGX Spark).
* **Limitaciones:**
  - El precio de la memoria es astronómico ($25 por GB adicional, llevando el Mac Studio M5 Max a $5.099 y el Ultra a $9.499).
  - La velocidad de prefill, aunque muy mejorada en la serie M5 con los aceleradores neuronales integrados en la GPU, sigue por detrás de los Tensor Cores de NVIDIA en ingesta masiva de tokens paralelos.
  - El ecosistema de servidores de inferencia para producción (concurrencia, continuous batching) sigue estando optimizado para CUDA/vLLM, mientras que en Mac el rey absoluto es **MLX** para uso local/desarrollo personal.

---

## 4. Comparativa de Hilos y Discusiones de la Comunidad (Julio – Octubre 2026)

Hilos específicos de Reddit donde los usuarios han publicado sus mediciones reproducibles:

1. **Strix Halo y optimizaciones de velocidad de inferencia (Octubre 2026):**  
   [For Strix Halo - Official llama.cpp isn't ideal and how to highest possible throughput (r/LocalLLaMA)](https://www.reddit.com/r/LocalLLaMA/comments/1wa9m61/for_strix_halo_official_llamacpp_isnt_ideal_and/)  
   *Análisis técnico de cómo exprimir 1.200–1.600 tok/s de prefill y hasta 60–70 tok/s de decode usando motores optimizados (Gufo / Halogen) y MTP en Strix Halo.*

2. **Halogen Flash Server y Qwen3.8 en Strix Halo (Septiembre 2026):**  
   [Halogen Flash Server Experience: Blazing Fast, But Any Downsides? (r/StrixHalo)](https://www.reddit.com/r/StrixHalo/comments/1w7gu6f/halogen_flash_server_experience_blazing_fast_but/)  
   *Resultados empíricos sobre modelos Qwen con ventanas de contexto masivas y descarga al NPU.*

3. **Trade-offs técnicos: M4 Max Studio vs. Ryzen AI Max+ 395 (Agosto 2026):**  
   [Understanding trade-offs between: m4 max studio vs AI Max+ 395 (r/LocalLLaMA)](https://www.reddit.com/r/LocalLLaMA/comments/1ltv847/understanding_tradeoffs_between_m4_max_studio_vs/)  
   *Comparativa directa entre el ancho de banda de memoria de Apple (546 GB/s) frente a los 256 GB/s de AMD y su impacto directo en tokens por segundo de decode.*

---

## 5. Resumen para la Charla (*Takeaways* Clave)

1. **Si tu prioridad es procesar documentos gigantes (RAG / agentes con mucho contexto):**  
   - Necesitas **velocidad de Prefill**. La **NVIDIA DGX Spark** es imbatible procesando miles de tokens de contexto por segundo gracias a los Tensor Cores Blackwell.
2. **Si tu prioridad es la fluidez de lectura en chat monousuario con modelos densos (70B):**  
   - Necesitas **ancho de banda de memoria**. Los **Mac Studio M4 Max / M5 Ultra** ofrecen el decode más rápido y suave sin configurar clústeres.
3. **Si buscas el equilibrio relación calidad/precio/cómputo unificado:**  
   - **AMD Strix Halo** ofrece 128 GB reales a una fracción del coste de Apple o NVIDIA, y con las nuevas técnicas de 2026 (**MTP** y motores como *Halogen/Gufo*), el decode en modelos MoE (como Qwen 3.8 Flash-Next) compite cara a cara con máquinas que cuestan el doble.
