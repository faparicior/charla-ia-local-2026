# Arquitectura Híbrida: Gated DeltaNet vs. Gated Attention

Este documento detalla los fundamentos matemáticos, estructurales y de gestión de memoria de la arquitectura híbrida empleada en la familia **Qwen 3.5** y **Qwen 3.6**, explicando por qué las capas **Gated DeltaNet** mantienen un consumo de memoria constante ($O(1)$) mientras que las capas de **Atención Clásica (Gated Attention)** requieren un **KV Cache** acumulativo que crece de forma lineal ($O(N)$) con la longitud del contexto.

---

## 1. El Problema del KV Cache en Modelos de Contexto Largo

En los modelos Transformer estándar (como LLaMA o GPT), la capa de auto-atención (*Softmax Attention*) requiere que cada nuevo token generado preste atención a **todos los tokens previos** de la secuencia:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right) V$$

Para evitar recalcular las proyecciones de claves ($K$) y valores ($V$) de los tokens anteriores en cada paso autoregresivo, el motor de inferencia (vLLM, SGLang, Ollama) almacena estas matrices en la memoria VRAM. Esto se conoce como **KV Cache**:

* **Consumo de memoria por capa:** $\text{Memoria} = 2 \times L \times n_{\text{kv\_heads}} \times d_{\text{head}} \times \text{bytes\_per\_elem}$
* **Crecimiento:** **Lineal estricto ($O(N)$)** con el número de tokens $N$.
* **Impacto en 256K tokens:** En un modelo de 48 capas con atención pura, el KV Cache para un solo usuario en FP16 superaría los **30–50 GB de VRAM**, saturando cualquier estación de trabajo local y dejando cero margen para batching o agentes concurrentes.

---

## 2. Gated DeltaNet: Memoria Recurrente de Tamaño Fijo ($O(1)$)

### 2.1. Concepto y Regla Delta (*Delta Rule*)
**Gated DeltaNet (GDN)** pertenece a la familia de las arquitecturas de **atención lineal recurrente** (*Linear Recurrent Attention*). En lugar de almacenar un historial creciente de vectores $K$ y $V$, DeltaNet comprime toda la información histórica en un **estado matricial de tamaño fijo** $S_t \in \mathbb{R}^{d_v \times d_k}$.

La clave matemática de DeltaNet es la **Regla Delta** (*Delta Rule*): antes de escribir nueva información en la memoria, el modelo recupera lo que ya sabe sobre la clave actual ($S_{t-1} k_t$), calcula el error/residuo frente al nuevo valor ($v_t$), y actualiza la matriz solo con la diferencia:

$$S_t = \alpha_t S_{t-1} + \beta_t \left(v_t - S_{t-1} k_t\right) k_t^\top$$

Donde:
* **$S_t$**: Estado recurrente en el paso de tiempo $t$ (tamaño fijo, p. ej. $128 \times 128$ por cabezal).
* **$\alpha_t \in (0, 1)$**: Puerta de decaimiento o borrado (*data-dependent decay gate*). Permite olvidar información obsoleta.
* **$\beta_t$**: Tasa de aprendizaje o paso de actualización (*step size*).
* **$\left(v_t - S_{t-1} k_t\right)$**: Error asociativo. Si la asociación clave-valor ya existía en memoria, el cambio es nulo (no contamina el estado).

### 2.2. Por qué DeltaNet no hace crecer la memoria VRAM
1. **Dimensión invariante al tiempo:** Da igual si el prompt tiene 10 tokens o 262.144 tokens: la matriz de estado $S_t$ ocupa exactamente los mismos bytes desde el primer token hasta el último.
2. **Sin historial de tokens:** No almacena tensores $K$ y $V$ por posición temporal.
3. **Costo de actualización:** $O(1)$ en memoria y $O(1)$ en cómputo por token durante la decodificación autoregresiva.

---

## 3. Gated Attention: El Rescate de la Recuperación Global

A pesar de su eficiencia, las redes puramente recurrentes o lineales sufren de **amnesia de recuperación exacta** (*associative recall bottleneck*): al comprimir infinitos tokens en una matriz fija $S$, detalles sintácticos o referencias cruzadas distantes pueden degradarse levemente.

Para solucionar esto, Qwen incorpora capas de **Gated Attention** (atención completa Softmax con modulación de compuertas):
* Mantienen la precisión quirúrgica para problemas de aguja en un pajar (*Needle-in-a-Haystack*), consultas exactas de código y dependencias de variables a 100.000 tokens de distancia.
* **Son las únicas capas que acumulan KV Cache**.

---

## 4. El Patrón Híbrido 3:1: La Distribución en Bloques

En lugar de usar 100% atención o 100% recurrencia, Qwen organiza las capas en **bloques cuádruples repetitivos con relación 3:1**:

```
[ Bloque Híbrido (4 Capas) ]
 ├── Capa 1: Gated DeltaNet (Recurrente O(1)) ──> MoE
 ├── Capa 2: Gated DeltaNet (Recurrente O(1)) ──> MoE
 ├── Capa 3: Gated DeltaNet (Recurrente O(1)) ──> MoE
 └── Capa 4: Gated Attention (Softmax KV O(N)) ──> MoE
```

### 4.1. Desglose en los Modelos Seleccionados

#### 🧠 Qwen 3.5 - 122B A10B (48 Capas Totales)
* **12 bloques híbridos** $\times 4$ capas.
* **36 capas de Gated DeltaNet** ($75\%$ de las capas): **0 bytes de KV Cache creciente**.
* **12 capas de Gated Attention** ($25\%$ de las capas): Únicas que almacenan KV Cache.
* **Efecto:** Reducción del **75% (4x)** en la tasa de crecimiento del KV Cache frente a un modelo de 48 capas convencional.

#### ⚡ Qwen 3.6 - 35B A3B (40 Capas Totales)
* **10 bloques híbridos** $\times 4$ capas.
* **30 capas de Gated DeltaNet** ($75\%$ de las capas).
* **10 capas de Gated Attention** ($25\%$ de las capas).
* **Efecto:** Permite manejar ventanas de 256K en estaciones de 128 GB ocupando apenas ~8-12 GB de KV Cache en lugar de los >40 GB que requeriría una arquitectura pura.

---

## 5. ¿Dónde Reside la Memoria de DeltaNet y Cómo se Usa?

### 5.1. Ubicación y Tamaño Físico
A diferencia de los modelos que "no usan memoria", DeltaNet **sí utiliza memoria**, pero de forma radicalmente distinta a un KV Cache:
* **Matriz de Estado Oculto $S_t$:** Para cada capa y cada cabeza (*head*), existe una matriz de tamaño fijo $S_t \in \mathbb{R}^{d_v \times d_k}$ (típicamente $128 \times 128$ floats).
* **Consumo total en VRAM:** Para las 36 capas DeltaNet del modelo 122B combinadas, esta matriz ocupa **entre 50 MB y 150 MB en total**.
* **Residencia física:** Vive en los registros rápidos y buffers de activación de la GPU (SRAM / HBM).
* **Sobreescritura *in-place*:** Cada nuevo token actualiza los números dentro de esa misma matriz mediante la Regla Delta. **No se añade una nueva entrada de memoria temporal; se sobreescribe el estado.**

### 5.2. La Analogía: El Archivador vs. La Pizarra

1. **Gated Attention (El Archivador de Carpetas):**
   * Cada token nuevo se imprime en un folio (vectores $K$ y $V$) y se guarda en una carpeta en la estantería.
   * A los **10.000 tokens**, tienes **10.000 folios**.
   * A los **256.000 tokens**, necesitas **una nave industrial entera (>40 GB de VRAM)** para almacenar las carpetas.
   * *Ventaja:* Puedes ir a buscar exactamente el folio #4.521 sin perder una sola letra.

2. **Gated DeltaNet (La Pizarra Contable):**
   * Tienes una pizarra de $1 \times 1$ metros ($S_t$).
   * Cada vez que entra un token, lees la pizarra, calculas qué cambia, y **borras y reescribes los números de la pizarra**.
   * Hayas procesado 5 tokens o 256.000 tokens, **la pizarra siempre mide exactamente $1 \times 1$ metros (~100 MB de VRAM)**.

---

## 6. Progresión de Memoria en Inferencia Real (256K Tokens)

| Longitud de Contexto | 🟢 Gated DeltaNet ($O(1)$) | 🔵 Gated Attention ($O(N)$) | Arquitectura Híbrida 3:1 (Qwen) |
| :--- | :--- | :--- | :--- |
| **Token 1** | ~100 MB (Estado $S_1$ fijo) | ~0.15 MB (1 token en caché) | ~100 MB |
| **Token 10.000 (10K)** | **~100 MB (Mismo estado)** | ~1.5 GB | **~0.4 GB** |
| **Token 64.000 (64K)** | **~100 MB (Mismo estado)** | ~10.2 GB | **~2.6 GB** |
| **Token 256.000 (256K)** | **~100 MB (Mismo estado)** | **>40.0 GB (Saturación/OOM)** | **~10.1 GB (Espacio holgado en 128 GB)** |

---

## 7. Tabla Comparativa de Comportamiento de Memoria

| Dimensión | Gated DeltaNet (3 de cada 4 capas) | Gated Attention (1 de cada 4 capas) |
| :--- | :--- | :--- |
| **Mecanismo** | Recurrencia Lineal asociativa con Regla Delta | Auto-Atención Softmax Cuadrática |
| **Complejidad de Cómputo** | $O(N)$ global / $O(1)$ por token | $O(N^2)$ global / $O(N)$ por token |
| **Comportamiento de Memoria** | **Constante $O(1)$** (Estado $S_t$ fijo) | **Lineal $O(N)$** (Acumula tokens pasados) |
| **Impacto en VRAM a 256K** | **Plano (0 GB de incremento)** | **Crece token a token** |
| **Propósito Principal** | Fluidez, procesamiento masivo y velocidad | Recuperación quirúrgica y razonamiento global |
| **Presencia en Arquitectura** | **75% de las capas** (36 en 122B / 30 en 35B) | **25% de las capas** (12 en 122B / 10 en 35B) |

---

## 8. Conclusión para el Hardware Local (128 GB)

Gracias a esta relación 3:1:
1. El modelo puede cargar pesos masivos (**69 GB** en INT4 para el 122B o **19 GB** en NVFP4 para el 35B).
2. Quedan **más de 50 GB de memoria unificada completamente libres** en la máquina.
3. El KV Cache crece **4 veces más despacio**, lo que permite chats con repositorios completos (100K–256K tokens) o múltiples agentes concurrentes sin riesgo de *Out of Memory* (OOM).
