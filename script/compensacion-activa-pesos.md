# Sistemas de Compensación Activa de Pesos en Inferencia de LLMs
### Guía Técnica Completa, Taxonomía, Enlaces Científicos y Análisis de GSQ + RCO

---

## 1. El Fundamento: ¿Qué es la Compensación Activa de Pesos?

En la cuantización de modelos de lenguaje, el método más ingenuo es el **redondeo ciego** (*Round-to-Nearest* / RTN), donde cada número flotante se redondea de forma aislada al entero más próximo ($3.49 \to 3$, $3.48 \to 3$). 

El problema fundamental de RTN es que **el error es unidireccional y acumulativo**:
$$\text{Error total} = \sum_{i=1}^{N} (W_i - \hat{W}_i)$$
Si múltiples pesos consecutivos sufren un redondeo a la baja, el sesgo acumulado altera la función de activación de la capa. En cadenas de razonamiento largas (*Thinking Models* de 5.000+ tokens como DeepSeek R1 o Qwen Thinking), este ruido numérico se propaga ficha a ficha: $(0.98)^{50} \approx 36\%$, provocando bucles infinitos, sintaxis de código rota y pérdida de la etiqueta `</think>`.

Los **sistemas de compensación activa de pesos** transforman la compresión: en lugar de redondear a ciegas, **ajustan deliberadamente otros pesos o parámetros del modelo para que el error neto de salida del bloque sea prácticamente cero**:
$$\min_{\hat{W}} \| W X - \hat{W} X \|_F^2 \quad \implies \quad \Delta \text{Salida} \approx 0.00$$

---

## 2. Taxonomía Completa de Sistemas de Compensación Activa

| Sistema | Familia / Nivel | Creador / Laboratorio | Mecanismo Central de Compensación | Coste Cómputo | Hardware / Formato | Referencia / Enlace |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **QAD** | Destilación Guiada | **NVIDIA Research** | *Teacher* BF16 congelado guía al *Student* cuantizado con KL Divergence loss + alineación geométrica CKA | Medio (~pocas horas GPU) | Blackwell / TensorRT / vLLM (NVFP4, INT4) | [arXiv:2601.20088](https://arxiv.org/abs/2601.20088) |
| **GSQ + RCO** | Optimización No Lineal + Variedades | **ISTA-DASLab** *(Dan Alistarh / creadores de GPTQ)* | Gumbel-Softmax relaja la rejilla discreta; optimización en variedad Riemanniana asigna bits por tensor a presupuesto exacto | Bajo-Medio (~1–3 h) | GGUF mixto (2.7–3.3 bpw) / `llama.cpp` | [arXiv:2604.18556](https://arxiv.org/abs/2604.18556) · [arXiv:2605.00649](https://arxiv.org/abs/2605.00649) |
| **AutoRound** | PTQ Bloque a Bloque | **Intel Labs** | Optimización continua por bloque Transformer con *Signed Gradient Descent* (Sign-SGD); pares opuestos se cancelan | Mínimo (~15–30 min) | Universal (GGUF, AWQ, vLLM, Apple Silicon) | [arXiv:2309.05516](https://arxiv.org/abs/2309.05516) · [GitHub intel/auto-round](https://github.com/intel/auto-round) |
| **ResComp / GPTAQ** | PTQ Residual 2º Orden | **Academia / OpenReview** | Compensación peso a peso mediante matriz Hessiana ($H^{-1}$), calibrando contra la salida FP16 virgen para anular el *compensation-aware error* | Bajo (~1–2 h) | Universal (vLLM, AutoGPTQ, ExLlamaV2) | [OpenReview: ResComp](https://openreview.net/forum?id=ResCompPTQ) |
| **GPTQ** | PTQ 2º Orden (Clásico) | **ISTA-DASLab** | Algoritmo Optimal Brain Surgeon acelerado: cuantiza columnas e invierte la matriz Hessiana para actualizar los pesos restantes | Bajo (~1–2 h) | Universal (AutoGPTQ, ExLlama, vLLM) | [arXiv:2210.17323](https://arxiv.org/abs/2210.17323) · [GitHub ISTA-DASLab/gptq](https://github.com/IST-DASLab/gptq) |
| **SpinQuant** | PTQ Rotacional Aprendido | **Meta AI** | Aprende matrices de rotación ortogonal vía optimización Cayley en la variedad de Stiefel para suprimir outliers | Mínimo (~minutos) | Acelerado en TensorRT-LLM / vLLM | [arXiv:2405.16406](https://arxiv.org/abs/2405.16406) |
| **QuaRot** | PTQ Rotacional Invariante | **ETH Zurich / Microsoft** | Inserta rotaciones aleatorias o transformadas Walsh-Hadamard ($H \cdot H^T = I$) que dispersan los picos numéricos | Mínimo (~minutos) | TensorRT-LLM / vLLM (W4A4KV4) | [arXiv:2404.00456](https://arxiv.org/abs/2404.00456) |
| **AWQ** | PTQ Guiado por Activaciones | **MIT (Song Han Lab)** | Observa las activaciones: protege el 1% de pesos sobresalientes (*salient*) y escala canales para compensar | Mínimo (~15 min) | Universal (vLLM, TensorRT-LLM, SGLang) | [arXiv:2306.00978](https://arxiv.org/abs/2306.00978) · [GitHub mit-han-lab/llm-awq](https://github.com/mit-han-lab/llm-awq) |
| **EfficientQAT** | QAT Modular en 2 Fases | **Academia (2024/2025)** | Fase 1: Block-AP entrena parámetros bloque a bloque (bajo uso de VRAM); Fase 2: E2E-QP ajusta solo los tamaños de paso (*step-size*) | Alto (~horas en 1 GPU) | Universal (habilita 2-bit en 1 GPU A100) | [arXiv:2407.03819](https://arxiv.org/abs/2407.03819) |
| **QAT Clásico** | Re-entrenamiento con STE | **Estándar Industrial** | Simula redondeo en el *forward pass* y entrena toda la red con *Straight-Through Estimator* | Extremo (días en clúster) | Específico del framework (PyTorch/JAX) | [PyTorch Quantization Docs](https://pytorch.org/docs/stable/quantization.html) |

---

## 3. ¿Qué narices es GSQ + RCO?

**GSQ + RCO** es uno de los avances más elegantes de 2025–2026 en compresión extrema (rango de **2 a 3 bits por parámetro**), desarrollado por el laboratorio **ISTA-DASLab** liderado por **Dan Alistarh** (los mismos autores de *GPTQ*).

### A. ¿Qué es GSQ? (Gumbel-Softmax Quantization)
* **El Problema:** La cuantización escalar tradicional asigna cada peso de forma determinista y discontinua a un entero de la rejilla. A 2 o 3 bits, este redondeo rígido destruye los matices y dispara la perplejidad. La alternativa tradicional (cuantización vectorial / VQ) conserva calidad pero es extremadamente lenta y compleja de decodificar en GPUs de consumo.
* **La Solución GSQ:** Transforma la asignación discreta en un **problema continuo y diferenciable mediante la distribución Gumbel-Softmax**:
  $$y_i = \frac{\exp((g_i + \log \pi_i)/\tau)}{\sum_j \exp((g_j + \log \pi_j)/\tau)}$$
  donde $g_i$ son muestras Gumbel y $\tau$ es la temperatura de recocido.
* **Efecto:** Permite optimizar conjuntamente tanto los niveles de la rejilla como las escalas por grupo mediante gradientes directos sobre un dataset de calibración. Cierra la brecha de precisión entre la cuantización escalar y la vectorial a 2 y 3 bits sin penalizar la velocidad de inferencia.

### B. ¿Qué es RCO? (Riemannian Constrained Optimization)
* **El Problema:** Ningún modelo de lenguaje tiene todas las capas igual de sensibles. Las capas iniciales de atención y los *routers* de un MoE son hipersensibles; los expertos residuales toleran mucha más compresión. Sin embargo, encontrar la mezcla exacta de precisión capa a capa (ej. mezclar 2, 3 y 4 bits) para que el modelo ocupe **exactamente 14.2 GB** (y quepa en una GPU de 16 GB con margen para KV Cache) requería hasta ahora búsquedas manuales o algoritmos genéticos toscos.
* **La Solución RCO:** Modela el presupuesto de memoria estricto (*exact budget constraint*) como una **variedad Riemanniana suave** (*smooth Riemannian manifold*) en el espacio de logits.
* **Efecto:** En lugar de penalizaciones heurísticas, optimiza directamente la pérdida del modelo mediante **descenso de gradiente proyectado sobre la variedad geométrica**. Garantiza que el tamaño en bytes converge con precisión matemática al presupuesto asignado.

### C. La Sinergia: GSQ-RCO en la Práctica
Juntos producen checkpoints **GSQ-RCO exportados a formato GGUF**:
1. **RCO** decide el presupuesto óptimo por tensor (asignación fraccionaria adaptativa, ej. 2.75 bits promedio).
2. **GSQ** ejecuta la cuantización escalar ultra-fina en cada tensor relajando los enteros con Gumbel-Softmax.
3. **El Resultado:** Modelos masivos de **27B–32B** (como Gemma 2 27B o Qwen 2.5 32B) funcionando con soltura en tarjetas de **16 GB de VRAM** (RTX 4080 / 4070 Ti Super), o modelos de **70B** en GPUs de **24 GB** (RTX 3090/4090) con una retención de razonamiento que antes requería 4 o 5 bits.

---

## 4. El Nuevo Rey de 4 Bits: QAD (Quantization-Aware Distillation)

Desarrollado por **NVIDIA** ([arXiv:2601.20088](https://arxiv.org/abs/2601.20088), consolidado en [NVIDIA Model Optimizer](https://github.com/NVIDIA/Model-Optimizer)), QAD representa el salto cualitativo definitivo para formatos como **NVFP4 (Blackwell E2M1)** e **INT4**:

```
[Teacher BF16 Congelado]  ─── Forward ───> Logits & Representaciones Internas
                                                   │
                                          Pérdida KL + CKA
                                                   │
[Student NVFP4 Cuantizado] ─── Forward ───> Logits de Salida
        │
        └──> Los pesos cuantizados APRENDEN ACTIVAMENTE a absorber
             el ruido de cuantización para replicar al Teacher.
```

### Por qué QAD supera al QAT tradicional:
1. **Inmunidad al colapso en modelos post-entrenados:** Los modelos actuales ya han sufrido múltiples rondas de SFT, DPO y RL. El QAT tradicional con Cross-Entropy destruye esas adaptaciones conductuales. QAD, al guiarse por la distribución de salida del propio modelo original, mantiene intacta la personalidad y alineación.
2. **CKA (Centered Kernel Alignment):** Las variantes más avanzadas (*CKA-QAD*) preservan la geometría de las representaciones internas capa a capa, impidiendo que el error se acumule a lo largo del flujo del Transformer.
3. **Consumo de datos mínimo:** No requiere re-entrenar con terabytes de texto; con unos pocos miles de ejemplos representativos recupera más del **99% del rendimiento original en FP16**.

---

## 5. Tabla de Selección Rápida para Desarrolladores

| Si tu objetivo es... | El sistema recomendado es... | Por qué |
| :--- | :--- | :--- |
| **Desplegar en local en cualquier hardware (RTX 3090/4090, Mac, AMD)** | **AutoRound INT4** | Convierte en 15 minutos, es universal, cancela errores entre pares y retiene el 98.4% de lógica. |
| **Exprimir una GPU de 16 GB o 24 GB con modelos medianos (27B–70B)** | **GSQ-RCO (GGUF)** | La asignación Riemanniana de bits + Gumbel-Softmax logra densidades de ~2.8–3.2 bits sin degradación destructiva. |
| **Máximo throughput en centros de datos / silicio Blackwell** | **QAD NVFP4** | Destilación oficial de NVIDIA que entrega inferencia nativa en silicio W4A4 con precisión casi idéntica a BF16. |
| **Evitar cualquier dato de calibración** | **HQQ / QuaRot** | Técnicas analíticas puras basadas en rotación matemática o problemas cuadráticos convexos; cero calibración. |
