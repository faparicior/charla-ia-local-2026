# Extensión de Contexto a 1 Millón de Tokens (1M) con YaRN

Este documento recopila la documentación técnica, referencias científicas originales, fórmulas y configuraciones de producción para extender la ventana de contexto de modelos basados en RoPE (como la familia **Qwen**) desde su ventana nativa de **256K tokens hasta 1.000.000 de tokens (1M / 1 Mega)** utilizando **YaRN (Yet another RoPE extensioN)**.

---

## 1. Documento Original y Referencia Científica

* **Título:** *YaRN: Efficient Context Window Extension of Large Language Models*
* **Autores:** Bowen Peng, Jeffrey Quesnelle, Honglu Fan, Enrico Shippole (Nous Research & EleutherAI)
* **Publicación:** ICLR 2024 / arXiv (Septiembre 2023)
* **Identificador arXiv:** [arXiv:2309.00071](https://arxiv.org/abs/2309.00071)
* **Código Fuente Oficial:** [github.com/jquesnelle/yarn](https://github.com/jquesnelle/yarn)
* **Implementación en vLLM / HuggingFace:** Nativa vía `rope_scaling` en `config.json`.

---

## 2. El Problema del Escalado RoPE Clásico

Los modelos de lenguaje modernos codifican la posición de los tokens usando **Rotary Position Embeddings (RoPE)**:

$$\mathbf{R}_{\Theta, m}^{d} \mathbf{x} = \mathbf{x} \odot \cos(m\Theta) + \tilde{\mathbf{x}} \odot \sin(m\Theta)$$

Donde $\Theta = \{\theta_i = b^{-2(i-1)/d}, i \in [1, d/2]\}$ son las frecuencias rotacionales para cada par de dimensiones.

### ¿Por qué fallan los métodos tradicionales al pasar de 256K a 1M?
1. **Extrapolación directa:** Alimentar posiciones $m > L_{\text{train}}$ rompe la atención porque la red nunca ha visto esos ángulos rotacionales, produciendo colapso total de coherencia (*perplexity explosion*).
2. **Interpolación Lineal de Posiciones (PI - Position Interpolation):** Divide todas las posiciones por un factor de escala $s$ ($m' = m/s$).
   * *Problema:* Al comprimir todas las frecuencias por igual, las **altas frecuencias** (responsables de distinguir palabras contiguas y sintaxis inmediata) se vuelven borrosas (*catastrophic local forgetting*).
3. **NTK-Aware RoPE original:** Escala la base $b' = b \cdot s^{d/(d-2)}$. Mejora la interpolación pero introduce distorsión en dimensiones intermedias.

---

## 3. La Solución YaRN: 3 Pilares Fundamentales

YaRN resuelve la degradación del contexto combinando tres innovaciones matemáticas:

### 3.1. Interpolación NTK por Partes (*NTK-by-parts*)
En lugar de tratar todas las dimensiones de RoPE por igual, YaRN divide el espacio dimensional $d$ en tres bandas según la longitud de onda rotacional $\lambda_i = \frac{2\pi}{\theta_i}$:

```
     Bajas Dimensiones (Altas Frecuencias)        Banda Intermedia          Altas Dimensiones (Bajas Frecuencias)
  ├─────────────────────────────────────────┼────────────────────────────┼────────────────────────────────────────┤
            Sin Interpolación (s = 1)               Rampa Lineal γ(r)           Interpolación Completa (s = Factor)
             [Preserva Sintaxis Local]          [Transición Suave Spline]             [Extiende Contexto Global]
```

* **Altas frecuencias ($\lambda_i < L_{\text{train}}$):** No se interpolan ($\text{scale} = 1$). El modelo conserva el 100% de su agudeza gramatical y semántica local.
* **Bajas frecuencias ($\lambda_i > L_{\text{train}}$):** Se interpolan completamente con el factor de escala $s = L_{\text{target}} / L_{\text{train}}$.
* **Frecuencias intermedias:** Se aplica una función de interpolación suave (*ramp*):
  $$\gamma(r) = \frac{r - \alpha}{\beta - \alpha} \quad \text{con } r = \frac{L_{\text{train}}}{\lambda_i}$$

### 3.2. Escalado de Temperatura en Softmax (*Attention Entropy Correction*)
Al pasar de 256K a 1.000.000 de tokens, el número de elementos sobre los que se calcula la distribución Softmax aumenta drásticamente. Esto incrementa la entropía de la atención y "aplana" la distribución, haciendo que el modelo pierda concentración.

YaRN introduce un factor de temperatura $t$ en los *logits* de atención:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^\top}{\sqrt{t} \cdot \sqrt{d_k}}\right) V$$

Donde $\sqrt{t} \approx 0.1 \ln(s) + 1$. Este factor "afila" la atención, manteniendo la misma entropía y agudeza que en la longitud de entrenamiento original.

### 3.3. Eficiencia sin Reentrenamiento Masivo (Zero-Shot / Few-Shot)
* **Zero-Shot:** Puede aplicarse directamente en tiempo de inferencia sin entrenar ni un solo parámetro.
* **Fine-Tuning ligero:** Con apenas 0.1% de datos de preentrenamiento y ~200 pasos de ajuste, el modelo recupera el 100% de precisión en *Needle-in-a-Haystack* a 1M tokens.

---

## 4. Viabilidad en Hardware Local (128 GB): El Efecto Multiplicador 3:1

El verdadero cuello de botella de 1 Millón de tokens **no es el algoritmo de RoPE, sino la memoria del KV Cache**:

| Arquitectura | Capas que guardan KV Cache a 1M | VRAM KV Cache a 1M tokens (FP8/INT4) | ¿Cabe en 128 GB con pesos 122B/35B? |
| :--- | :--- | :--- | :--- |
| **Transformer Clásico (100% Attn)** | **48 de 48 capas** | **>160 GB VRAM** | ❌ **Imposible (OOM masivo)** |
| **Híbrido Qwen 3.5 (3:1)** | **12 de 48 capas (25%)** | **~38 – 42 GB VRAM** | ✅ **SÍ (Pesos 69 GB + KV 40 GB = 109 GB)** |
| **Híbrido Qwen 3.6 (3:1)** | **10 de 40 capas (25%)** | **~24 – 28 GB VRAM** | ✅ **SÍ (Pesos 19 GB + KV 26 GB = 45 GB)** |

### ¿Por qué funciona?
* El **75% de las capas (Gated DeltaNet)** mantienen su consumo en **~100 MB fijos**, sin importar que estemos en el token 1.000.000.
* YaRN solo tiene que escalar las **capas de Gated Attention (25%)**.

---

## 5. Configuración Práctica en Motores de Inferencia

### 5.1. Configuración HuggingFace / Transformers (`config.json`)
```json
{
  "rope_scaling": {
    "type": "yarn",
    "factor": 4.0,
    "original_max_position_embeddings": 262144,
    "max_position_embeddings": 1048576,
    "beta_fast": 32.0,
    "beta_slow": 1.0,
    "mscale": 1.0,
    "mscale_all_dim": 1.0
  }
}
```

### 5.2. Despliegue en vLLM (CLI / Docker)
```bash
vllm serve Qwen/Qwen3.5-122B-A10B-Instruct \
  --max-model-len 1048576 \
  --kv-cache-dtype fp8 \
  --hf-overrides '{"rope_scaling": {"type": "yarn", "factor": 4.0, "original_max_position_embeddings": 262144}}'
```

### 5.3. Despliegue en llama.cpp
```bash
./llama-cli -m qwen3.5-122b-instruct-q4_k_m.gguf \
  -c 1048576 \
  --rope-scaling yarn \
  --rope-scale 4.0 \
  --yarn-orig-ctx 262144
```

---

## 6. Conclusión y Valor para el Crafter Local

1. **1 Mega de Contexto Real:** Permite cargar bibliotecas completas, documentación técnica masiva de un framework entero o el historial completo de commits de un año en una única consulta.
2. **YaRN evita el olvido:** La combinación de *NTK-by-parts* y corrección de temperatura garantiza que el modelo encuentre detalles exactos en el token 900.000 igual que en el token 500.
3. **El Silicio Local manda:** Gracias al patrón híbrido 3:1 de DeltaNet, 1M de tokens deja de ser una quimera reservada a clusters de 8xH100 y se convierte en una capacidad viable en una máquina local de 128 GB.
