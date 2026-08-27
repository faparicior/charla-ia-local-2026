# Modelos Densos vs. Mixture of Experts (MoE): Guía Técnica y Conceptual
### Arquitectura, Funcionamiento del Router, Comparativa de Cómputo vs. VRAM y Referencias

---

## 1. Concepto Fundamental: La Junta Médica Total vs. El Triaje de Urgencias

En la arquitectura de los Grandes Modelos de Lenguaje (LLMs), existen dos filosofías fundamentales para organizar las redes neuronales:

```
MODELO DENSO (Junta Médica Completa)        MODELO MoE (Triaje + Especialistas)
Para CADA síntoma entran los 100 médicos:   El Triaje (Router) envía solo al especialista:

       [ Palabra / Síntoma ]                        [ Palabra / Síntoma ]
                │                                            │
                ▼                                            ▼
      ┌──────────────────┐                               ┌────────┐
      │  TODOS LOS 100   │                               │ Triaje │ (Router Top-2)
      │  MÉDICOS ACTIVOS │                               └───┬─┬──┘
      │      (70B)       │                                   │ │
      └──────────────────┘                           ┌───────┘ └───────┐
                │                                    ▼                 ▼
                ▼                              ┌──────────┐      ┌──────────┐
       [ Diagnóstico /    ]                    │ Traumató-│      │ Radió-   │ (3B c/u)
       [  Palabra Salida  ]                    │   logo   │      │   logo   │
                                               └────┬─────┘      └────┬─────┘
                                                    └────────┬────────┘
                                                             ▼
                                                    [ Diagnóstico / Palabra Salida ]
```

### A. Modelo Denso (Dense Model)
* **¿Cómo funciona?** Cada token procesado pasa obligatoriamente por **todos y cada uno de los parámetros** del modelo.
* **Ejemplos:** LLaMA 3 (8B, 70B, 405B), Qwen 2.5 (7B, 14B, 27B, 32B, 72B), GPT-3 (175B).
* **Analogía Médica:** Entras al hospital por un dolor leve y **se reúne todo el cuadro médico del centro** (cardiología, neurocirugía, traumatología...) para deliberar sobre una simple tos: colapso, lentitud extrema y gasto desmesurado de energía.

### B. Modelo MoE (Mixture of Experts / Mezcla de Expertos)
* **¿Cómo funciona?** Las capas de procesamiento (*Feed-Forward Networks* o FFN) se dividen en $N$ sub-redes independientes llamadas **"expertos"**. Una red ligera llamada **Router (el Servicio de Triaje)** analiza el token y despierta únicamente a las $K$ especialidades más adecuadas (típicamente Top-1, Top-2 o Top-8).
* **Ejemplos:**
  * **Mixtral 8x7B:** 46.7B parámetros totales / **12.9B activos** por token (Top-2 de 8 expertos).
  * **Qwen 3.5 - 122B:** 122B parámetros totales / **10B activos** por token (Top-K de expertos finos).
  * **DeepSeek-V3 / DeepSeek-R1:** 671B parámetros totales / **37B activos** por token (64 expertos finos + 1 compartido).
* **Analogía Médica:** Llegas a urgencias con dolor de rodilla. El **servicio de triaje (*Router*)** evalúa el síntoma en 1 segundo y deriva la consulta **exclusivamente a las especialidades necesarias** (ej. traumatología y radiología). El resto del centro permanece libre: atención instantánea con máxima especialización.

---

## 2. Anatomía Interna de un Modelo MoE

En un Transformer estándar, la capa de auto-atención (*Self-Attention*) se encarga de entender las relaciones entre palabras, mientras que la capa **Feed-Forward (FFN)** almacena el conocimiento y los hechos (*factual knowledge*).

En un MoE, la auto-atención sigue siendo compartida, pero la capa FFN se sustituye por:

1. **Conjunto de Expertos:** $E_1, E_2, \dots, E_N$ (cada uno es una mini-red neuronal FFN).
2. **Red de Enrutamiento (Router):** Una capa lineal parametrizada por $W_r$ que calcula una distribución de probabilidad sobre los expertos para el vector de entrada $x$:
   $$H(x) = x \cdot W_r$$
   $$G(x) = \text{Softmax}(\text{TopK}(H(x)))$$
3. **Salida Ponderada:** La salida final de la capa es la suma ponderada de las respuestas de los expertos seleccionados:
   $$y = \sum_{i \in \text{Top-}K} G(x)_i \cdot E_i(x)$$

---

## 3. La Gran Paradoja: Cómputo (FLOPs) vs. Memoria (VRAM)

Comprender la diferencia entre parámetros totales y activos es fundamental para entender el hardware local:

| Métrica | Modelo Denso (ej. 70B) | Modelo MoE (ej. Qwen 122B / Activo 10B) | ¿Por qué ocurre? |
| :--- | :---: | :---: | :--- |
| **Parámetros en VRAM** | 70B | **122B** | ⚠️ **En memoria hay que cargar a TODOS los expertos**, porque no sabes cuál se necesitará en la siguiente palabra. |
| **Cómputo por Token (FLOPs)** | 70B | **10B** | ⚡ Solo se ejecutan los transistores de los expertos elegidos. |
| **Velocidad de Inferencia (Tokens/s)** | Lenta (~1x) | **Ultrarrápida (~5x – 7x)** | La GPU solo realiza las multiplicaciones de un modelo de 10B. |
| **Capacidad de Razonamiento** | Nivel 70B | **Nivel Frontera (~120B+)** | Tiene 122B de conocimiento enciclopédico distribuido. |
| **Huella en INT4** | ~38 GB | **~69 GB** | El MoE requiere más VRAM pero genera tokens a velocidad de vértigo. |

---

## 4. ¿Por qué MoE + Cuantización (AutoRound / NVFP4) es la "Combinación Perfecta"?

El gran talón de Aquiles histórico de los modelos MoE ha sido la **VRAM**:
* Un modelo de 122B en FP16 necesita **244 GB de memoria**, lo que obligaba a usar clústeres de servidores carísimos solo para almacenar los pesos.
* **La Revolución 2025–2026:**
  1. Al aplicar **AutoRound INT4** o **NVFP4**, los 122B se comprimen a **~65–69 GB**.
  2. Esto permite que el modelo **quepa en una única máquina de 128 GB** (como un Mac Studio o una estación con DGX Spark / GB10).
  3. Como solo activa **10B por token**, la generación de texto vuela a más de **50–80 tokens por segundo** con calidad de modelo frontera.

---

## 5. Cuadro Comparativo: Ventajas y Desventajas

```
┌──────────────────────────────────────┬──────────────────────────────────────┐
│        MODELOS DENSOS                │        MODELOS MoE (SPARSE)          │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ PROS:                                │ PROS:                                │
│ • Menor huella de VRAM para un       │ • Velocidad de inferencia brutal     │
│   tamaño nominal dado.               │   (coste de cómputo de modelo chico).│
│ • Más fáciles de servir y cuantizar  │ • Mucha mayor capacidad de memoria y │
│   sin descalibrar compuertas.        │   especialización temática.          │
│ • Comportamiento de latencia plano.  │ • Escalado a cientos de miles de     │
│                                      │   millones de parámetros (DeepSeek). │
│ CONTRAS:                             │ CONTRAS:                             │
│ • Lentitud: para hacer un modelo más │ • Requieren mucha VRAM para alojar a │
│   inteligente, la inferencia se      │   todos los expertos inactivos.      │
│   vuelve linealmente más pesada.     │ • Si el Router se descalibra por mala│
│ • Techo de eficiencia energética.    │   cuantización, el modelo colapsa.   │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 6. Referencias Científicas y Artículos Consultados

1. **El Paper Fundacional de MoE (Google Brain):**
   * *Shazeer, N., Mirhoseini, A., Maziarz, K., Davis, A., Le, Q., Hinton, G., & Dean, J. (2017).* **"Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer."** *ICLR 2017 / arXiv:1701.06538.*
   * [arXiv:1701.06538](https://arxiv.org/abs/1701.06538)

2. **Switch Transformers (Google Research):**
   * *Fedus, W., Zoph, B., & Shazeer, N. (2022).* **"Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity."** *Journal of Machine Learning Research (JMLR) / arXiv:2101.03961.*
   * [arXiv:2101.03961](https://arxiv.org/abs/2101.03961)

3. **Mixtral of Experts (Mistral AI):**
   * *Jiang, A. Q., et al. (2024).* **"Mixtral of Experts."** *arXiv preprint arXiv:2401.04088.*
   * [arXiv:2401.04088](https://arxiv.org/abs/2401.04088)

4. **DeepSeek-V3 / DeepSeek-R1 Architecture (DeepSeek AI):**
   * *DeepSeek-AI Team (2024–2025).* **"DeepSeek-V3 Technical Report: Multi-head Latent Attention and Fine-Grained Sparse Experts."**
   * [DeepSeek GitHub & Whitepaper](https://github.com/deepseek-ai/DeepSeek-V3)

5. **Qwen MoE Technical Report (Alibaba Cloud):**
   * *Qwen Team.* **"Qwen2.5 / Qwen3.5 MoE Architectural Overview."**
   * [Hugging Face Qwen Hub](https://huggingface.co/Qwen)
