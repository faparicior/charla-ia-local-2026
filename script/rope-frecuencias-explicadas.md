# ¿Qué son las Frecuencias en RoPE y por qué YaRN las trata distinto?

Este documento explica de forma intuitiva, física y matemática qué son las **frecuencias rotacionales** en **RoPE (Rotary Position Embeddings)**, por qué existen altas y bajas frecuencias, y cómo la técnica **NTK-by-parts de YaRN** resuelve el problema de extender el contexto sin destruir la sintaxis local.

---

## 1. El Fundamento de RoPE: Posición mediante Rotación

A diferencia de los embeddings posicionales antiguos (que sumaban un vector fijo a cada palabra), **RoPE hace girar (rotar)** el vector del token en un plano 2D para cada par de dimensiones $(2i, 2i+1)$:

$$\mathbf{R}_{\Theta, m} \mathbf{x} = \begin{pmatrix} \cos(m\theta_i) & -\sin(m\theta_i) \\ \sin(m\theta_i) & \cos(m\theta_i) \end{pmatrix} \begin{pmatrix} x_{2i} \\ x_{2i+1} \end{pmatrix}$$

Donde:
* $m$: Es la posición del token en el texto ($m = 0, 1, 2, \dots, 256.000$).
* $\theta_i = b^{-2i/d}$: Es la **velocidad angular o frecuencia** asignada a esa dimensión.
* La longitud de onda asociada a cada dimensión es $\lambda_i = \frac{2\pi}{\theta_i}$.

---

## 2. La Analogía Universal: El Reloj de 3 Manecillas

Imagina que para saber en qué momento exacto de una conversación de 1.000.000 de palabras te encuentras, tienes un reloj con **múltiples manecillas que giran a diferentes velocidades**:

```
 ⏱️ ALTAS FRECUENCIAS (Segundero)       ⏳ FRECUENCIAS MEDIAS (Minutero)       🕰️ BAJAS FRECUENCIAS (Horario/Días)
 ────────────────────────────────       ────────────────────────────────       ────────────────────────────────────
 • Gira muy rápido                      • Gira a velocidad intermedia           • Gira lentísimo
 • Da 1 vuelta cada 10-50 tokens        • Da 1 vuelta cada 1.000 tokens         • Tarda >100.000 tokens en 1 vuelta
 • Detecta sintaxis inmediata           • Detecta párrafos y secciones          • Detecta contexto global del libro
```

---

## 3. ¿Qué mide cada tipo de frecuencia?

### ⏱️ 1. Altas Frecuencias (Dimensiones Bajas de RoPE)
* **Comportamiento:** $\theta_i$ es grande $\rightarrow$ La longitud de onda $\lambda_i$ es muy corta (apenas unos pocos tokens).
* **Propósito:** Capturan la **sintaxis inmediata, concordancia gramatical y orden entre palabras contiguas**:
  * Distinguir *"el perro"* de *"perro el"*.
  * Saber si un punto y coma `;` cierra la sentencia anterior o la actual.
* **El Peligro de Interpolarlas:** Si reduces la velocidad del segundero, se vuelve borroso y el modelo empieza a sufrir de **amnesia sintáctica (*catastrophic local forgetting*)**, perdiendo la coherencia gramatical básica.

### 🕰️ 2. Bajas Frecuencias (Dimensiones Altas de RoPE)
* **Comportamiento:** $\theta_i$ es minúscula $\rightarrow$ La longitud de onda $\lambda_i$ es gigantesca (cientos de miles de tokens).
* **Propósito:** Miden la **posición global y la estructura macro del documento**:
  * Saber si un código pertenece al `import` del inicio del fichero o a la función `main()` al final de un archivo de 50.000 líneas.
  * Tienen tan poca curvatura local que estirarlas no afecta en absoluto a las palabras vecinas.

### ⏳ 3. Frecuencias Intermedias y la Rampa Spline $\gamma(r)$
* Son las dimensiones intermedias que están entre el comportamiento puramente local y el global.
* **Función:** Actúan como un puente elástico. YaRN aplica una función rampa suave $\gamma(r) = \frac{r - \alpha}{\beta - \alpha}$ para evitar un "escalón" brusco entre las frecuencias no escaladas ($s=1$) y las completamente escaladas ($s=4$), eliminando el ruido de fase en la atención.

---

## 4. ¿Por qué fracasó la interpolación clásica (PI) y por qué triunfa YaRN?

```
 MÉTODO                                   TRATAMIENTO DE FRECUENCIAS                     RESULTADO A 1M TOKENS
 ───────────────────────────────────────  ─────────────────────────────────────────────  ───────────────────────────────────
 ❌ Extrapolación Directa                 No escala nada (ángulos nunca vistos)          💥 Perplejidad infinita (Crash)
 ❌ Position Interpolation (PI de Meta)   Ralentiza TODAS las manecillas por igual       📉 Olvida gramática y sintaxis
 ✅ YaRN (NTK-by-parts)                   Segundero quieto + Horario ralentizado         🎯 100% de coherencia y Needle
```

1. **Position Interpolation (PI):** Dividía todas las posiciones por 4 ($m' = m/4$).
   * *El error:* Ralentizó también el segundero. El modelo podía ver textos más largos, pero se volvió "torpe" y redactaba con errores sintácticos.
2. **YaRN (NTK-by-parts):**
   * **Altas frecuencias ($s = 1.0$):** No se tocan. El modelo escribe con la misma perfección lingüística que en contexto corto.
   * **Bajas frecuencias ($s = 4.0\times$):** Se ralentizan exactamente lo necesario para abarcar 1.048.576 tokens.
   * **Temperatura ($\sqrt{t}$):** Afila la atención para que encontrar un dato en la página 800 sea tan fácil como en la página 1.
