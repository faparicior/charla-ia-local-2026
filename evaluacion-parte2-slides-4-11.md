# Evaluación: slides 4-11 de `parte2-ciclo-desarrollo.html`

**Evaluadas contra:** `prompt-slides-html.md` (secciones 4-9: sistema de diseño, contenido, catálogo de layouts, diagramas/datos, motion, accesibilidad)
**Slides:** `#4` step1-boundaries · `#5` step2-tradeoffs · `#6` step3-personas · `#7` step4-empathy · `#8` step5-journeys · `#9` step6-brainstorming · `#10` step7-sequencing · `#11` step8-canvas
**Método:** captura 1920×1080 con Playwright (Chrome headless, todos los estados revelados) + análisis del HTML/CSS + medición con `getBoundingClientRect`/`getComputedStyle`.

---

## Puntuación global por slide

| # | Slide | Nota | Lo mejor | Lo peor |
|---|---|---|---|---|
| 4 | Paso 1: Matriz de Fronteras | **7/10** | Relación comparación→2×2 correcta; quote con stat (90%) | Badge pequeño en azul 3.8:1 (<4.5) |
| 5 | Paso 2: Tablero de Tradeoffs | **7/10** | Matriz ordinal "sliders" = layout perfecto para la relación | El mejor takeaway del deck ("Regla de Oro") oculto en modo charla |
| 6 | Paso 3: User Personas | **6/10** | Persona concreta y cuantificada (47a, $0, -70%) | Acento esmeralda **2.3:1 — suspende incluso texto grande** |
| 7 | Paso 4: Mapa de Empatía | **5.5/10** | Quadrant 2×2 SEES/SAYS/THINKS/DOES + pains/gains | Acento ámbar **2.0:1 — el peor del deck**; título entero ilegible desde atrás |
| 8 | Paso 5: User Journey Mapping | **6/10** | Secuencia temporal en tabla (4 filas, correcto ≤8) | Acento cian 2.2:1 suspende texto grande |

**Veredicto transversal:** la estructura de contenido y la elección de layout por relación son excelentes (9/10); el sistema de color y la accesibilidad del acento son el punto débil crítico; la repetición compositiva es la desviación más visible de las reglas.

---

## 1. 🔴 CRÍTICO — Contraste de acentos sobre fondo claro (sección 9 + 4)

Medido contra el fondo del deck (~`#f5f5f4`, luminancia 0.913):

| Slide | Acento | Ratio | WCAG | Fix exacto |
|---|---|---|---|---|
| 4 | Azul `#0284c7` | **3.8:1** | ✓ grande (≥3:1) / ✗ pequeño | Para badges usar `#0369a1` (4.8:1) |
| 5 | Violeta `#8b5cf6` | **3.9:1** | ✓ grande / ✗ pequeño | Badges: `#6d28d9` (5.6:1) |
| 6 | Esmeralda `#10b981` | **2.3:1** | ✗ **también grande** | Texto: `#047857` (5.0:1) |
| 7 | Ámbar `#f59e0b` | **2.0:1** | ✗✗ el peor | Texto: `#b45309` (4.6:1) |
| 8 | Cian `#06b6d4` | **2.2:1** | ✗ también grande | Texto: `#0e7490` (4.9:1) |

- **Dónde duele:** el span del `<h2>` (67px, texto grande → exige 3:1) suspende en slides 6, 7 y 8; los badges "FASE 1 · PASO N" (~10-11px mono) y los textos de tabla en el acento suspenden en TODAS (exigen 4.5:1).
- **Regla incumplida:** "Verifica contraste WCAG AA… los proyectores y salas iluminadas lavan el contraste" + "no uses grises/colores pálidos". En proyector real esto empeora ~20%.
- **Patrón de fix:** mantener los 500s para elementos gráficos (bordes, fills, subrayados decorativos) y usar los 600/700 para **texto sobre fondo claro**. Definir `--step-accent` y `--step-accent-text` en vez de inline styles.

## 2. 🟡 MISMA COMPOSICIÓN 8 SLIDES SEGUIDAS (sección 6) *(actualizado con 9-11)*

- Regla: "nunca 3 slides consecutivos con la misma composición" → el streak real es **4→11: 8 slides idénticas** (pasos 1-8 completos; la 12 rompe el patrón con la matriz greenfield/brownfield).
- Composición idéntica: back-bar + h2 + [quote hero + 3 points-card + pill] a la izquierda / terminal-doc oscura a la derecha.
- **Atenuante real:** es una serie pedagógica deliberada ("workshop console") con badge "Paso N de 8" y el color codifica el paso; el contenido de la terminal sí varía de arquetipo (2×2 → matriz sliders → perfil → quadrant → timeline-tabla).
- **Fix barato y efectivo:** alternar el lado de la terminal en pares/impares (regla Made Good: "alterna el lado de la imagen entre slides para dar ritmo"), o romper la serie con una divisoria full-bleed entre fases.

## 3. 🟡 TITULARES DESCRIPTIVOS, NO DE ACCIÓN (sección 5)

- "Paso 2: Tablero de Tradeoffs (Sliders)" nombra el tema; no enuncia la conclusión. Regla: "leyendo solo los títulos se entiende el argumento" — aquí no se puede.
- **Mitigación existente:** cada slide lleva una hero quote que SÍ es el insight ("Arbitrar a la IA exige fijar qué sacrificamos") — funciona como action-title de facto.
- **Pero:** el subtitle con la tesis (`doc-only`, ej. "Una sola prioridad por columna para forzar consenso…") está **oculto en modo charla** — la frase-insight explícita solo existe en modo documento.
- Fix: fusionar insight en el título ("Paso 2: Sliders — qué sacrificamos y por qué") o promocionar la regla de oro/subtítulo al hueco del quote.

## 4. 🟠 EL BANNER "Regla de Oro Crafter" NO SE VE EN MODO CHARLA (secciones 5 y 8)

- Diagnóstico confirmado: `body:not(.mode-document) .slide[id^="slide-step"] .chosen-synergy-banner { display:none !important }` (style.css ~13620, comentario "ganar aire y verticalidad").
- Consecuencia: el takeaway de cada paso (p. ej. "Sin tradeoffs explícitos, la IA opta por sobreingeniería") **solo existe en modo documento**. En la presentación, la diapositiva termina sin cierre.
- Además es markup muerto en charla (la maquetación le reserva espacio mental pero nunca aparece).
- Fix: mostrarlo como reveal final del slide (mecanismo `.step` ya existe en el deck) o mover su contenido al hero quote. La "Regla de Oro" es el mejor texto del deck y hoy es invisible en directo.

## 5. 🟠 DENSIDAD: 121-147 PALABRAS VISIBLES POR SLIDE (sección 5)

- Medido en modo charla: s4-8 ≈143 (s5), s9 **147**, s10 **130**, s11 **121** — banda estable ~120-150, sobre el objetivo ≤30 para slides tradicionales.
- **Justificación de género:** la columna derecha es un "screenshot anotado" (documento simulado con ~550-640 tokens reales), arquetipo de evidencia, no prose; la izquierda queda en ~60. El podado `doc-only` ya oculta filas de tabla en charla (7→4 filas en slide 5 ✓).
- Riesgo real: la tabla de la terminal tiene cuerpo a **16px** (por debajo del suelo de 18px del prompt; el resto escala bien: h2 67px, quote 30px, badges 10px). A 1080p fullscreen equivale a un screenshot; desde la última fila se lee con esfuerzo.
- Fix ligero: subir terminal-body a 17-18px en modo charla (la regla CSS ya existe con `!important`, solo cambiar el valor) y aceptar el tradeoff.

---

## Lo que SÍ cumple (para balance)

✅ **Relación→layout correcta en las 5** (sección 6): comparación→2×2 (s4), ordenación ordinal→matriz sliders (s5), ficha-definición→tabla (s6), quadrant 2×2 (s7), secuencia temporal→tabla ordenada con actores (s8). Un layout = una relación, sin gramáticas mezcladas, sin flechas sin causalidad.
✅ **Una idea por slide** — cada paso = un artefacto, perfectamente separable en una frase.
✅ **Límites de densidad**: 3 puntos-card por slide (≤6 ✓), tablas ≤4 filas visibles en charla (≤8 ✓), sin muros de bullets.
✅ **Sistema de diseño coherente**: dirección única "editorial claro + consolas dark", h2 67px y quote serif 30px con contraste de peso, jerarquía eyebrow(badge)→titular→quote→visual→footer, footer con paginación.
✅ **Datos con etiquetado directo**: contadores de tokens (~620, ~550…), ❌ en vez de texto, highlights por fila, without leyendas crípticas.
✅ **Motion correcto**: sin fragmentos en 4-8 (cero fatiga de clics), transiciones 0.35s ease-out coherentes; la coreografía está en la slide 3 (pipeline, 6 steps) que es donde aporta.
✅ **Robustez**: teclado ✓, `lang="es"` ✓, texto seleccionable ✓, alt en imágenes ✓, sin dependencia de hover ✓.
✅ **Ideas que superan al prompt**: el toggle charla/documento (slides como doc real + modo proyección podado) y el "context budgeting" con contadores de tokens son excelentes para una charla de IA local; el prompt no los contemplaba y son buena práctica para este género.

---

# Añadido: slides 9-11 (Pasos 6-8)

## Puntuación

| # | Slide | Nota | Lo mejor | Lo peor |
|---|---|---|---|---|
| 9 | Paso 6: Features Brainstorming | **7/10** | Fila "Stripe Rechazada" en rojo = storytelling excepcional (alucinación fulminada en vivo) | Índigo 4.1:1 ✓ grande pero ✗ badges; desc del semáforo ~2.5 líneas |
| 10 | Paso 7: Secuenciador de Olas | **7/10** | Metáfora cupcake/tarta memorable; poda doc-only elegante (4 col × 4 filas → 2×2 en charla) | Rosa 3.2:1 en el titular: pasa por 0.2:1 de margen; badge usa OTRO color que el h2 |
| 11 | Paso 8: Contrato MVP | **8/10** — la mejor de la serie | Acento **emerald-600 `#059669` = el fix exacto que recomiendo**: 3.5:1 en grande; pill "SCORE 9.4/10" = big-number moment; KPIs cuantificados (5 conf, >50 propuestas, $0) | Banner "Regla de Oro" oculto — y es LA tesis de toda la Parte 2 |

## Hallazgos nuevos (que se suman a los transversales)

- **✅ La slide 11 es la implementación de referencia**: badge Y h2 con shade 600 (`#059669`), demostrando que el sistema funciona. El fix global es copiar este patrón a las 4-10: `#0369a1`/`#6d28d9`/`#047857`/`#b45309`/`#0e7490`/`#db2777` para texto, manteniendo los 500s para bordes/fills. En texto grande todas las de 9-11 pasan (4.1/3.2/3.5 ≥ 3:1); solo 6-8 (500s brillantes) suspenden.
- **🟡 Inconsistencia menor slide 10**: es la única donde badge (`#db2777`, pink-600) y h2 (`#ec4899`, pink-500) usan colores distintos — todas las demás los igualan. Unificar con el 600 en ambos (mejor contraste y consistencia de golpe).
- **🟡 Deuda técnica CSS confirmada**: dos bloques `!important` contradictorios en style.css para `.sdlc-point-desc` en modo charla — 13826 los oculta ("ocultar textos largos no esenciales") y 13893 los muestra ("columna izquierda equilibrada: sin abismos vacíos"). Gana el segundo por orden de fuente → los descs con clase `doc-only` de las slides de pasos son **código muerto** (la clase no hace nada ahí), y el comportamiento real (visibles) es el correcto para la charla. En phase2/pillar sí se ocultan (sin override posterior) → **la densidad de la columna izquierda cambia entre secciones del deck** sin razón visible. Limpieza: borrar el bloque 13826 y los `doc-only` muertos de los descs.
- **🟠 El banner de la slide 11 es el más importante de todo el deck** y está oculto en modo charla: "El MVP Canvas es el sello de garantía: cuando la IA tiene el mapa completo y el contrato firmado, el desarrollo se vuelve determinista" — es la tesis que justifica los 8 pasos. Refuerza el fix #2.
- **✅ Poda doc-only inteligente**: s10 pasa de tabla 6col×4filas a 2col×2filas en charla (leyenda E/$$$/♥/TTT solo en documento ✓); s11 oculta la tabla 8.3 Wave1-vs-Diferido y la fila Calendario ✓. La matriz de scoring Caroli solo se ve en documento — en directo gana claridad, en handout gana profundidad: el dual-mode funciona como debe.
- **✅ Relación→layout**: s9 tabla comparativa con ganador/perdedor resaltados ✓, s10 tabla de diferido + parking lot con ❌ visuales ✓, s11 dashboard de KPIs con score pill ✓ (catálogo: "resaltar el ganador", "big number con baseline").

*Capturas adicionales: `/tmp/sdlc-parte2-slide{9,10,11}.png`. Medición con Playwright (steps: 0 en las tres; banner oculto en modo charla: las tres; palabras visibles: 147/130/121).*

---

# FIXES APLICADOS (verificados con Playwright post-cambio)

**Backups previos:** `/tmp/backup-parte2.html`, `/tmp/backup-style.css`

## 1. Contraste AA en acentos — texto sobre fondo claro

Regla aplicada: **badge (12px) ≥4.5:1 · h2 span (67px) ≥3:1 con margen para proyector**. Los 500s se reservan para gráficos/bordes oscuros.

| Slide | h2 span | badge | antes (h2/badge) |
|---|---|---|---|
| 4 | `#0284c7` (se mantiene, 3.8:1 ✓) | `#0284c7` → **`#0369a1`** (4.8:1) | 3.8/3.8 |
| 5 | `#8b5cf6` (se mantiene, 3.9:1 ✓) | → **`#6d28d9`** (6.5:1) | 3.9/3.9 |
| 6 | → **`#059669`** (3.5:1 ✓ antes 2.3 ✗) | → **`#047857`** (5.0:1) | 2.3/3.5 |
| 7 | → **`#b45309`** (4.6:1 ✓ antes 2.0 ✗✗) | → **`#b45309`** | 2.0/2.9 |
| 8 | → **`#0e7490`** (4.9:1 ✓ antes 2.2 ✗) | → **`#0e7490`** | 2.2/3.4 |
| 9 | `#6366f1` (se mantiene, 4.1:1 ✓) | → **`#4f46e5`** (5.8:1) | 4.1/4.1 |
| 10 | → **`#db2777`** (4.2:1 ✓ antes 3.2 límite) | → **`#be185d`** (5.5:1) | 3.2/4.2 |
| 11 | `#059669` (se mantiene ✓) | → **`#047857`** | 3.5/3.5 |

También en `style.css` (clases compartidas, beneficia a todo el deck): bordes hero-box y subrayados de quote de green/amber/cyan subidos a 600/700; texto de todos los skill-pills subido a shades AA (`#7c3aed`, `#047857`, `#b45309`, `#0e7490`, `#be185d`, `#0369a1`).

## 2. Banner "Regla de Oro" visible en Modo Charla

- Eliminado `slide-step` de la regla `display:none` (13620): el banner ahora aparece en las 8 slides de pasos en modo charla (Fase 2 y Pilares mantienen su ocultación).
- Estilo compacto en charla: padding 0.55rem, texto 0.9rem, icono 1.15rem → **37px de altura, una línea**.
- Sin overflow en ninguna slide (verificado: consola `flex:1` absorbe la altura; bottom del contenido en 967/1008 en las 8).
- La tesis de la Parte 2 ("el contrato firmado → desarrollo determinista", slide 11) ya es visible en directo.

## 3. Limpieza de `doc-only` muertos

- 18 clases `doc-only` muertas eliminadas de `.sdlc-point-desc`/`.boundaries-point-desc` en el HTML (la regla 13893 las re-mostraba en charla con `!important`).
- Bloque contradictorio 13826 recortado: ya no "oculta para luego mostrar" los descs de las slides de Paso (los hero-subs y phase2/pillar mantienen su comportamiento).
- Comportamiento visual: idéntico al previo (charla muestra descs, documento igual) — ahora con cascada limpia y clases honestas.

## Verificación post-fix

- 8/8 slides: banner `display:flex`, contenido hasta y=967 (límite 1008), sin clipping.
- Colores computados correctos en h2/badge de las 8 (ver tabla).
- Capturas regeneradas: `/tmp/sdlc-parte2-slide{4..11}.png`.

## Pendiente (no aprobado aún)

- Terminal body 16→18px en modo charla (fix #4 del top-5).
- Action-titles opcionales (fix #5).
- Ritmo: alternar lado de terminal o divisoria entre fases (fix #3 — mayor esfuerzo, requiere decisión de diseño).
- Slides fuera del alcance revisado (2, 12-36) tienen el mismo patrón de badges/acento: extender la regla si se quiere consistencia global.
