# El Reloj de la Memoria: ¿Por qué hablamos de Frecuencias en RoPE y YaRN?

Este documento combina una **explicación 100% intuitiva y visual** (la metáfora del reloj de 3 manecillas) con la **fundamentación matemática rigurosa** (matrices de rotación, descomposición espectral de RoPE y modulación NTK-by-parts de YaRN), permitiendo entender tanto el concepto a alto nivel como los detalles de implementación para alcanzar **1.048.576 tokens (1M)**.

---

## 1. El Problema Intuitivo: Un LLM no lee como un humano

Un modelo de lenguaje no lee palabra a palabra; procesa todas las palabras de un texto simultáneamente en una matriz de tensores. Para saber qué palabra va antes y cuál después, necesita codificar la posición relativa entre cualquier par de tokens:

* **La solución de RoPE (Rotary Position Embedding):** En lugar de sumar un número o vector fijo a cada palabra, le asigna a cada token un **sello de tiempo único (DNI posicional)** compuesto por varias frecuencias que giran a diferentes velocidades.

---

## 2. El DNI de la Palabra: No son "capas", es un Sello Digital `[Día : Hora : Segundo]`

Una duda muy común es pensar que las frecuencias son "capas de diferentes tamaños". **No son capas:**
* Cada palabra del texto se convierte en una lista de números (un vector).
* Dentro de esa **misma lista de números**, RoPE estampa un **sello de tiempo con 3 casillas simultáneas**:

$$\text{"gato"} \longrightarrow \Big[ \; \overbrace{\text{Día 12}}^{\text{Bajas Frecuencias (Global)}}, \quad \overbrace{\text{Hora 14}}^{\text{Frecuencia Media (Párrafos)}}, \quad \overbrace{\text{Segundo 35}}^{\text{Altas Frecuencias (Sintaxis)}} \; \Big]$$

### ¿Cómo mantiene la coherencia el modelo?
El modelo **lee todas las casillas a la vez**, por lo que nunca hay choque ni desalineación:
1. **Para saber si dos palabras van pegadas (Gramática):** Compara los **segundos**.
   * Palabra 1 (*"el"*): `[Día 1, Hora 1, Segundo 34]`
   * Palabra 2 (*"gato"*): `[Día 1, Hora 1, Segundo 35]`
   * $\Delta = 1$ segundo $\rightarrow$ **¡Están pegadas en la frase!** El modelo sabe con certeza el orden sintáctico (*"el gato"* vs *"gato el"*).
2. **Para saber la distancia en textos gigantes (Contexto 1M):** Compara los **días**.
   * Inicio del repositorio (*"import main"*): `[Día 1, Hora 2, Segundo 10]`
   * Final del archivo (*"export app"*): `[Día 850, Hora 18, Segundo 45]`
   * $\Delta = 849$ días $\rightarrow$ Sabe que están a **800.000 palabras de distancia**, sin importar qué segundo tengan.

---

## 2.1. Los 3 Niveles de Atención: Juntas, Próximas y Alejadas

¿Cómo interactúan las palabras según su distancia sin estorbarse entre sí?

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             LOS 3 NIVELES DE CONEXIÓN DEL LLM                                    │
├────────────────────────────────┬────────────────────────────────┬───────────────────────────────┤
│ 🧩 1. JUNTAS (Inmediatas)      │ ⏳ 2. PRÓXIMAS (Párrafo)       │ 📖 3. ALEJADAS (1M Tokens)    │
├────────────────────────────────┼────────────────────────────────┼───────────────────────────────┤
│ • Distancia: 1 a 10 tokens     │ • Distancia: 50 a 2.000 tokens │ • Distancia: 100K a 1M tokens │
│ • Manecilla: Segundero         │ • Manecilla: Minutero (Spline) │ • Manecilla: Horario / Días   │
│ • Giro: 90° por palabra        │ • Giro: Velocidad media        │ • Giro: Casi imperceptible    │
│ • Misión: Sintaxis y gramática │ • Misión: Coherencia de función│ • Misión: Memoria y búsqueda  │
│   ("machine" + "learning")     │   (Línea 1 a Línea 25)         │   (Needle-in-a-Haystack 100%) │
└────────────────────────────────┴────────────────────────────────┴───────────────────────────────┘
```

### ¿Por qué las palabras "alejadas" no pierden relación?
No es que las palabras alejadas no tengan relación: **sí la tienen, pero su relación es semántica y de búsqueda, no gramatical**.
* **Ejemplo en Código:**
  * En la **Línea 1 (Día 1, token 5)** defines: `API_KEY = "sk-live-999"`.
  * En la **Línea 80.000 (Día 850, token 800.000)** el usuario pregunta: *«¿Qué API Key definimos al principio?»*.
  * Gracias a la manecilla de los **Días**, el modelo sabe con precisión matemática dónde está esa definición en el pasado sin confundirla con ninguna variable intermedia, permitiendo recuperar información a 1 millón de tokens de distancia con 100% de precisión.

---

## 3. La Metáfora del Reloj de 3 Manecillas

```
 ⏱️ EL SEGUNDERO (Altas Frecuencias)     ⏳ EL MINUTERO (Rampa Spline)          🕰️ EL HORARIO / DÍAS (Bajas Frec.)
 ─────────────────────────────────────── ────────────────────────────────────── ──────────────────────────────────────
 • Gira a toda pastilla.                 • Gira a velocidad intermedia.         • Gira lentísimo.
 • 1 vuelta cada 2–10 palabras.          • Conecta oraciones y párrafos.        • 1 vuelta cada 256.000 palabras.
 • Misión: Sintaxis y palabras pegadas   • Misión: Puente suave y elástico.     • Misión: Saber si estás en la página
   ("base" y "datos").                     Evita saltos bruscos.                  1 o en la página 800 (Global).
 • En YaRN: ¡NO SE TOCA! (s = 1.0)       • En YaRN: Transición progresiva       • En YaRN: SE ESTIRA 4× (s = 4.0×)
```

---

## 3. ¿Por qué falló Meta (*Position Interpolation*) y qué descubrió YaRN?

```
 MÉTODO                                   TRATAMIENTO DE FRECUENCIAS                     RESULTADO A 1M TOKENS
 ───────────────────────────────────────  ─────────────────────────────────────────────  ───────────────────────────────────
 ❌ Extrapolación Directa                 No escala nada (ángulos nunca vistos)          💥 Perplejidad infinita (Crash)
 ❌ Position Interpolation (PI de Meta)   Ralentiza TODAS las manecillas por igual       📉 Olvida gramática y sintaxis
 ✅ YaRN (NTK-by-parts)                   Segundero quieto + Horario ralentizado         🎯 100% de coherencia y Needle
```

### ❌ El Error de Meta (Position Interpolation):
Meta quiso meter 4 veces más texto ($4\times$) y dividió todas las posiciones por 4 ($m' = m/4$).
* **El fallo:** Al ralentizar el segundero, el giro entre dos palabras vecinas pasó de 90° a solo 22.5°. La diferencia se volvió borrosa.
* **El resultado:** El modelo sufrió **amnesia sintáctica (*catastrophic local forgetting*)**, cometiendo faltas de concordancia y desordenando frases.

### ✅ La Solución de YaRN (NTK-by-parts):
* **1. No toques el segundero ($s=1.0$):** Las palabras contiguas siguen girando a 90°. La red redacta con la misma perfección lingüística original.
* **2. Solo estira el horario ($s=4.0\times$):** Ralentiza únicamente las manecillas lentas para que la vuelta completa abarque **1.048.576 tokens**.
* **3. Corrección de Temperatura ($\sqrt{t}$):** Afila la atención para que encontrar un dato en la página 800 sea tan fácil como en la página 1 (*100% Needle-in-a-Haystack*).

---

## 4. ¿Qué mide cada tipo de frecuencia?

### ⏱️ 1. Altas Frecuencias (Dimensiones Bajas del Vector)
* **Comportamiento:** La velocidad angular $\theta_i$ es grande $\rightarrow$ La longitud de onda $\lambda_i$ es muy corta (2 a 50 tokens).
* **Propósito:** Capturan la **sintaxis inmediata, concordancia gramatical y orden entre palabras contiguas**:
  * Distinguir *"el perro"* de *"perro el"*.
  * Saber si un punto y coma `;` cierra la sentencia anterior o la actual.
* **Por qué no se tocan:** Si se comprimen, el modelo pierde la agudeza local y sufre amnesia gramatical.

### 🕰️ 2. Bajas Frecuencias (Dimensiones Altas del Vector)
* **Comportamiento:** La velocidad angular $\theta_i$ es minúscula $\rightarrow$ La longitud de onda $\lambda_i$ es gigantesca (cientos de miles de tokens).
* **Propósito:** Miden la **posición global y la estructura macro del documento**:
  * Saber si un código pertenece al `import` del inicio del fichero o a la función `main()` al final de un archivo de 50.000 líneas.
  * Tienen tan poca curvatura local que estirarlas $4\times$ no afecta en absoluto a las palabras vecinas.

### ⏳ 3. Frecuencias Intermedias y la Rampa Spline $\gamma(r)$
* Son las dimensiones intermedias situadas entre el comportamiento puramente local y el global.
* **Función:** Actúan como un puente elástico. YaRN aplica una función rampa suave para evitar un "escalón" brusco entre las frecuencias no escaladas ($s=1$) y las completamente escaladas ($s=4$), eliminando el ruido de fase en la atención.

---

## 5. Fundamentación Matemática Rigurosa

### 5.1. Formulación Canónica de RoPE
Para cada par de dimensiones $(2i, 2i+1)$ de un vector de consulta o clave $\mathbf{x} \in \mathbb{R}^d$ en la posición $m$, RoPE aplica la matriz ortogonal 2D:

$$\mathbf{R}_{\Theta, m}^{d} \mathbf{x} = \begin{pmatrix} \cos(m\theta_i) & -\sin(m\theta_i) \\ \sin(m\theta_i) & \cos(m\theta_i) \end{pmatrix} \begin{pmatrix} x_{2i} \\ x_{2i+1} \end{pmatrix}$$

Donde la frecuencia rotacional se define por la base $b = 10.000$ (o $1.000.000$ en modelos recientes):

$$\theta_i = b^{-2(i-1)/d}, \quad i \in \left[1, \frac{d}{2}\right]$$

La **longitud de onda rotacional** $\lambda_i$ correspondiente es:

$$\lambda_i = \frac{2\pi}{\theta_i} = 2\pi \cdot b^{2(i-1)/d}$$

* Cuando $i=1$: $\lambda_1 = 2\pi \approx 6.28$ tokens (el segundero, rotación ultrarrápida).
* Cuando $i=d/2$: $\lambda_{d/2} = 2\pi \cdot b \gg 100.000$ tokens (el horario, rotación casi estática).

---

### 5.2. Definición por Partes de YaRN (NTK-by-parts)

YaRN define el ratio $r_i = \frac{L_{\text{train}}}{\lambda_i}$ para cada par de dimensiones y aplica un multiplicador de frecuencia $h(\theta_i)$:

$$h(\theta_i) = (1 - \gamma(r_i)) \cdot \frac{\theta_i}{s} + \gamma(r_i) \cdot \theta_i$$

Donde la función de rampa suave $\gamma(r)$ se define a trozos:

$$\gamma(r) = \begin{cases} 0 & \text{si } r < \alpha \\ 1 & \text{si } r > \beta \\ \frac{r - \alpha}{\beta - \alpha} & \text{si } \alpha \le r \le \beta \end{cases}$$

Con parámetros empíricos óptimos $\alpha = 1$ y $\beta = 32$.

---

### 5.3. Escalado de Temperatura de Atención (Attention Logits Temperature)

Al procesar $N = 1.048.576$ tokens, el producto escalar $Q K^\top$ acumula mayor varianza, incrementando la entropía de la distribución Softmax y dispersando la atención.

YaRN reescala los logits antes del Softmax aplicando un factor de temperatura $\sqrt{t}$:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^\top}{\sqrt{t} \cdot \sqrt{d_k}}\right) V$$

Donde el factor de escala de temperatura se aproxima analíticamente como:

$$\sqrt{t} \approx 0.1 \cdot \ln(s) + 1$$

Para un factor de extensión $s = 4.0\times$ (256K $\rightarrow$ 1M tokens):
$$\sqrt{t} \approx 0.1 \cdot \ln(4.0) + 1 \approx 0.1 \cdot 1.386 + 1 = 1.1386$$

Este ligero aumento en el denominador "afila" la distribución de probabilidades, garantizando que el modelo mantenga **100% de precisión en recuperación de agujas en un pajar (*Needle-in-a-Haystack*)** a 1 Millón de tokens.

---

## 6. Referencias Científicas

* **Paper YaRN:** *YaRN: Efficient Context Window Extension of Large Language Models*, Bowen Peng, Jeffrey Quesnelle, Honglu Fan, Enrico Shippole (ICLR 2024 / [arXiv:2309.00071](https://arxiv.org/abs/2309.00071)).
* **Paper RoPE Original:** *RoFormer: Enhanced Transformer with Rotary Position Embedding*, Jianlin Su et al. (2021 / [arXiv:2104.09864](https://arxiv.org/abs/2104.09864)).
* **Código Fuente:** [github.com/jquesnelle/yarn](https://github.com/jquesnelle/yarn).

