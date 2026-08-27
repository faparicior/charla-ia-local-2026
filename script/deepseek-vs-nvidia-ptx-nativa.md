# El "Hackeo" de DeepSeek al Silicio de NVIDIA y la Integración Nativa en TensorRT-LLM

## Resumen Ejecutivo

A principios de 2025 y a lo largo de 2026, **DeepSeek** transformó la industria de la inteligencia artificial. Tras el lanzamiento de **DeepSeek-V3** (26 de diciembre de 2024) y **DeepSeek-R1** (20 de enero de 2025), la compañía china demostró que un modelo de razonamiento abierto de 671B podía igualar a OpenAI o1 con un coste de entrenamiento un 95% menor (~6 millones de dólares).

El 27 de enero de 2025 estalló el bautizado como **"Momento Sputnik"**, provocando la mayor caída bursátil en un solo día del sector de semiconductores (más de 590.000 millones de dólares de valor de mercado borrados temporalmente en Wall Street).

Sin embargo, el verdadero terremoto técnico llegó con la **Open Source Week (24 al 28 de febrero de 2025)**: DeepSeek liberó 5 repositorios de bajo nivel que demostraban que las GPUs Hopper (H100/H800) de NVIDIA tenían entre un **30% y un 50% de rendimiento dormido** que los compiladores estándar (`nvcc`, `cuBLAS`) no estaban aprovechando. Para exprimir los chips, DeepSeek reescribió los kernels críticos en **ensamblador virtual PTX (*Parallel Thread Execution*)**.

Ante el riesgo de que la comunidad fragmentara el ecosistema con parches de ensamblador no oficiales, **NVIDIA reaccionó absorbiendo e integrando nativamente estas librerías en TensorRT-LLM y NVIDIA NIM**.

---

## 1. Cronología Oficial de los Hechos

| Fecha | Hito | Detalles Técnicos / Impacto |
|---|---|---|
| **26 Dic 2024** | **Lanzamiento DeepSeek-V3** | Modelo MoE de 671B (37B activos) con arquitectura **MLA (Multi-Head Latent Attention)** y entrenamiento FP8 sin pérdida. |
| **20 Ene 2025** | **Lanzamiento DeepSeek-R1** | Modelo de razonamiento puro (*RL reasoning*) que iguala a OpenAI o1 en matemáticas y código. |
| **27 Ene 2025** | **El "Momento Sputnik"** | Caída histórica en Wall Street. Pánico ante la posibilidad de que la fuerza bruta de miles de GPUs fuera innecesaria. |
| **24–28 Feb 2025** | **DeepSeek Open Source Week** | Liberación diaria de infraestructura de bajo nivel: FlashMLA, DeepEP, DeepGEMM (PTX), DualPipe y 3FS. |
| **Marzo 2025** | **Reacción de Jensen Huang** | El CEO de NVIDIA elogia públicamente a DeepSeek: *"Es un avance extraordinario en IA y el ejemplo perfecto de escalado en tiempo de inferencia"*. |
| **Abril 2025** | **Integración Nativa en TensorRT-LLM** | NVIDIA actualiza TensorRT-LLM y CUTLASS, permitiendo invocar los kernels de DeepSeek con `moe_config.backend = "DEEPGEMM"`. |
| **2026** | **DSpark y el Estándar DeepSpec** | Liberación de **DeepSpec (MIT)** con DSpark (decoding con filtro de confianza de Markov), adaptado universalmente a Qwen, Llama y vLLM. |

---

## 2. Los 5 Repositorios de la Open Source Week (24–28 Feb 2025)

1. **FlashMLA (Día 1 - 24 Feb 2025)**:
   - Kernel de decodificación para *Multi-Head Latent Attention* en Hopper (H100/H800).
   - Implementa *Paged KV Cache* (bloques de 64) y compresión de memoria, saturando el bus de memoria hasta **3.000 GB/s**.
2. **DeepEP (Día 2 - 25 Feb 2025)**:
   - Librería de comunicación para *Expert Parallelism* en modelos MoE.
   - Solapa comunicación GPU a GPU (vía NVLink y RDMA) con el cálculo computacional, eliminando tiempos muertos de red.
3. **DeepGEMM (Día 3 - 26 Feb 2025)**:
   - Multiplicación de matrices densas y MoE en FP8 escrita en **código ensamblador PTX a bajo nivel**.
   - Compilación JIT (*Just-In-Time*) que supera los **1.550+ TFLOPS** en Hopper con acumulación en dos niveles para preservar precisión.
4. **DualPipe (Día 4 - 27 Feb 2025)**:
   - Algoritmo de paralelismo de pipeline bidireccional que solapa pases hacia adelante (*forward*) y hacia atrás (*backward*) para reducir a casi cero las burbujas de inactividad de las GPUs durante el entrenamiento.
5. **3FS & EPLB (Día 5 - 28 Feb 2025)**:
   - Sistema de archivos distribuido de ultra-alta velocidad (Fire-Flyer File System) y balanceador de carga entre expertos MoE.

---

## 3. Por Qué Tuvieron que Usar Ensamblador PTX

En la pila clásica de NVIDIA:
```
PyTorch / Python ➔ CUDA C++ ➔ nvcc (Compilador) ➔ PTX Assembly ➔ SASS (Instrucciones Binarias)
```

El compilador oficial `nvcc` aplica optimizaciones genéricas y seguras. DeepSeek descubrió que para arquitecturas MoE extremas y atención latente:
- Las primitivas estándar forzaban sincronizaciones innecesarias entre *warps*.
- El movimiento de datos desde la memoria global a la memoria compartida (*SRAM*) sufría cuellos de botella evitables.
- Escribiendo **instrucciones PTX manuales**, DeepSeek logró gestionar los registros y el solapamiento de memoria con precisión quirúrgica, exprimiendo el silicio al límite teórico.

---

## 4. La Estrategia de NVIDIA: De Parches a Estándar Oficial

Para evitar que la comunidad y los centros de datos operaran con parches no oficiales y scripts de compilación inestables, NVIDIA reaccionó de inmediato:
- **TensorRT-LLM**: Se incorporó soporte oficial para `DEEPGEMM` y `FlashMLA`. En lugar de hackear código, los desarrolladores configuran:
  ```python
  moe_config.backend = "DEEPGEMM"
  ```
- **NVIDIA NIM & ModelOpt**: Lanzamiento de microservicios con DeepSeek-R1 y V4 optimizados para inferencia en Hopper y Blackwell con cuantización nativa FP8 y FP4.

---

## 5. Enlaces y Fuentes de Referencia

### Repositorios Oficiales (GitHub)
- [DeepSeek-AI / FlashMLA](https://github.com/deepseek-ai/FlashMLA)
- [DeepSeek-AI / DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)
- [DeepSeek-AI / DeepEP](https://github.com/deepseek-ai/DeepEP)
- [DeepSeek-AI / DualPipe](https://github.com/deepseek-ai/DualPipe)
- [DeepSeek-AI / 3FS](https://github.com/deepseek-ai/3FS)
- [DeepSeek-AI / DeepSpec](https://github.com/deepseek-ai/DeepSpec)
- [NVIDIA / TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)

### Documentación y Blogs Oficiales
- **NVIDIA Developer Blog**: *Accelerating DeepSeek-R1 and V3 on NVIDIA GPUs with TensorRT-LLM and NIM*.
- **NVIDIA Technical Documentation**: *MoE Backend Configuration and DeepGEMM Integration Guide*.
- **DeepSeek Technical Reports**: *DeepSeek-V3 Technical Report* & *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning*.

### Cobertura en Prensa Internacional
- **Reuters**: *Nvidia CEO Jensen Huang praises DeepSeek's AI breakthrough as evidence of inference scaling*.
- **Financial Times**: *How DeepSeek's open-source assault challenged the Silicon Valley compute narrative*.
- **Towards AI & Medium**: *DeepGEMM & PTX Kernels: How DeepSeek achieved 1550+ TFLOPS on standard Hopper GPUs*.
- **The Verge / TechCrunch**: *Open Source Week: DeepSeek releases five foundational infrastructure tools*.
