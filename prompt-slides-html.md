# Prompt para generar slides HTML de una presentación de producto y tecnología

> Copia el bloque de abajo y rellena los campos entre `[CORCHETES]` antes de dárselo a tu agente
> (Claude Code, Codex, Cursor, Gemini CLI, pi, etc.).

---

## EL PROMPT

Eres un diseñador experto de presentaciones y front-end senior. Tu tarea es generar una
presentación de **producto y tecnología** como slides HTML de calidad profesional.

### 1. Brief (lo que debes respetar)

- **Producto / tema:** [NOMBRE Y DESCRIPCIÓN DEL PRODUCTO]
- **Audiencia:** [p. ej. ingenieros senior, ejecutivos, inversores, clientes técnicos] — ajusta el nivel técnico y el tono a este perfil.
- **Objetivo:** [p. ej. que prueben el SDK, que aprueben el budget, que entiendan la arquitectura]
- **Duración / nº de slides:** [p. ej. 12 slides para 10 min]
- **Tono:** [p. ej. confiado, seco, sin marketing; cálido y didáctico; sobrio corporativo]
- **Datos reales a incluir:** [métricas de tracción, features, precios, arquitectura, equipo… — pega aquí tu contenido real; no inventes cifras]
- **Marca:** [logo, colores corporativos si existen, o "libre"]

### 2. Estructura narrativa sugerida (adaptación del framework de pitch de 12 slides)

Construye el deck como un argumento que avanza, no como una lista de temas. Orden por defecto
(adáptalo al objetivo y elimina lo que no aplique):

1. **Portada** — nombre + one-liner que capture la propuesta de valor en ≤10 palabras.
2. **Problema** — dolor específico y cuantificado ("los equipos X pierden Y horas/semana en Z"), nunca abstracto.
3. **Solución** — qué hace el producto, beneficio clave, screenshot o demo visual.
4. **Cómo funciona (tecnología)** — arquitectura o flujo como diagrama real, no bullets.
5. **Producto en detalle** — features clave como 3 tarjetas o split antes/después.
6. **Diferenciación / competencia** — matriz 2×2 o tabla comparativa.
7. **Métricas / tracción** — gráfico de trayectoria (línea/barras SVG), no números sueltos.
8. **Roadmap o estado técnico** — timeline simple.
9. **Equipo** (si aplica) — nombres + credibilidad relevante.
10. **Modelo / pricing** (si aplica) — 3 columnas de planes.
11. **CTA / próximos pasos** — una acción concreta, un link real.
12. **Backup / anexos** — detalles técnicos para preguntas.

Usa slides **divisoria** (full-bleed con una frase grande) para separar "Producto" de "Tecnología" si el deck supera 10 slides.

### 3. Entrega técnica (requisitos duros)

- **Un único archivo HTML autocontenido** (`deck.html`): todo el CSS y JS inline, fuentes vía Google Fonts `@import` (o web-safe como fallback), imágenes como SVG inline o placeholders claros marcados. Sin frameworks JS, sin build, sin dependencias externas de JS. Debe abrirse con doble clic.
- **Formato fijo 16:9 (1920×1080)**: cada slide es una `<section class="slide">` de 1920×1080 con `box-sizing: border-box` y padding generoso (≥120px). Navegación con flechas ←/→, Space, Home/End y swipe básico en móvil.
- **CSS custom properties en `:root`** para toda la paleta, escala tipográfica y espaciado — el deck debe poder re-tematizarse cambiando 5 variables.
- **Texto real y seleccionable** (nada de texto "cocinado" en imágenes), `lang="es"`, título del deck en `<title>`.
- **Notas del orador**: incluye un `<aside class="notes">` (oculto en pantalla) por slide, o un bloque `deck.notes` al final, con lo que el presentador debe decir.
- **Exportable a PDF**: documéntame en 2 líneas cómo imprimirlo a PDF desde el navegador (p. ej. `?print-pdf` o CSS `@media print` con una slide por página).

### 4. Sistema de diseño (una sola dirección estética)

- Elige **una dirección visual coherente** antes de escribir código (p. ej. dark-tech minimal, editorial claro, terminal/dev) y decláramela en una frase al inicio de tu respuesta, justificada por el contenido y la audiencia. No mezcles estilos.
- **Paleta de 3-4 colores**: un fondo dominante, un color de texto principal, UN acento saturado para énfasis/CTA/datos clave, y un tono muted para secundarios. El mismo color debe significar lo mismo en todo el deck. Verifica contraste WCAG AA (evita mid-tone sobre mid-tone).
- **Tipografía**: una familia display para títulos y una para cuerpo (o dos pesos de la misma). Escala coherente y generosa para pantalla: título de slide 64-120px, heading 40-56px, cuerpo 28-36px, captions 18-22px (a 1920×1080). Nada por debajo de 18px. Line-height 1.1-1.2 en títulos, 1.4-1.5 en cuerpo, máx. ~58ch de ancho de línea.
- **Jerarquía clara en cada slide**: eyebrow/kicker (sección, pequeño, mayúsculas con tracking) → titular (la idea, grande) → visual o cuerpo → footer con nº de slide y título del deck.
- **Atmósfera, no plano**: fondos con gradiente sutil, textura o viñeteado ligero coherentes con la dirección estética; paneles con borde, radio y sombra suave cuando agrupen contenido.

### 5. Reglas de contenido por slide

- **Titulares de acción, nunca descriptivos.** El título enuncia la conclusión, no el tema: "El segmento enterprise impulsó el 67% del crecimiento" y no "Análisis Q3". Test: leyendo SOLO los títulos de todas las slides se debe entender el argumento completo.
- **Una idea por slide.** Si un slide necesita dos mensajes, son dos slides. Test: cada slide debe resumirse en una frase; si el título lleva "y", probablemente son dos slides.
- **Máximo ~30 palabras de texto visible** por slide (salvo tablas/código). Bullets cortos (≤2 líneas), nunca párrafos: el slide es ancla, no transcripción.
- **Límites de densidad**: máx. 5-6 bullets; máx. 8-10 nodos por diagrama; máx. ~8 filas por tabla; máx. ~10 líneas de código; citas solo si son cortas. Si algo no cabe, divide en dos slides — nunca reduzcas la fuente.
- **Tipografía grande o nada**: si el texto no entra a tamaño legible, corta contenido, no tamaño.

### 6. Catálogo de layouts probados — elige por RELACIÓN, no por gusto

Regla de oro: el layout sigue a la **relación** que la audiencia debe entender (comparar, secuenciar, jerarquizar, probar). Antes de maquetar cada slide pregúntate: ¿esta información es una conclusión única, una comparación, una secuencia, una colección de iguales o evidencia cuantitativa? Y elige:

| Contenido | Layout | Especificación |
|---|---|---|
| Conclusión única / frase clave | **Hero statement** | Una frase grande (centrada o alineada a la izquierda), whitespace abundante: el vacío ES el diseño |
| Un número que impresiona | **Big number** | Cifra a tamaño display (≥180px), etiqueta corta debajo, y la línea de contexto/baseline al lado para que no se lea fuera de contexto |
| Dos alternativas / antes-después | **Split 50/50** | Columnas paralelas: mismas categorías, mismo orden, misma profundidad en ambos lados; línea divisoria fina |
| Texto + visual | **Split imagen/texto** | 50/50 o 60/40; **alterna el lado de la imagen entre slides** para dar ritmo (es el layout de contenido más versátil que existe) |
| 3-6 ideas de igual peso | **Card grid** | Tarjetas idénticas (mismo alto): heading corto + 1 explicación + icono. El espaciado agrupa, no los bordes. >6 items: promociona el top 3 o divide en dos slides |
| 3 pilares / features / beneficios | **Tres columnas** | Icono + heading + 1 línea, estructura idéntica para que lean como un set |
| Pasos / método / fases | **Proceso (flechas o icon row)** | Strip horizontal de 4-6 iconos con etiquetas. El eje es ORDEN, no tiempo |
| Hitos / roadmap | **Timeline** | Línea horizontal, tiempo fluye izq→der, espaciado PROPORCIONAL al tiempo real, marcar "hoy" con línea vertical |
| Trabajos que se solapan | **Gantt** | Barras = duración, apilado vertical = concurrencia. Úsalo en cuanto dos workstreams corren a la vez |
| Comparativa de opciones | **Tabla comparativa** | ≤5 columnas × ≤7 filas; ✓/✗ o codificación de color en vez de texto; resaltar la opción ganadora; números alineados a la derecha |
| Dos variables | **Matriz 2×2 (quadrant)** | Ejes nombrados, continuos e independientes, con unidades reales; colocar los items con honestidad (también en el cuadrante desfavorable) |
| Proceso que se repite | **Ciclo** | SOLO si el último paso realmente vuelve al primero. Un bucle cerrado promete repetición |
| Cantidad que se estrecha | **Funnel** | Anchura de banda ∝ cantidad real. Si las etapas no se estrechan, es un proceso, no un funnel |
| Tendencia / patrón en datos | **Chart + takeaway** | Un gráfico a un lado + la conclusión en una frase de lenguaje llano al otro. Sin gridlines ni leyendas; el punto clave en el color de acento |
| Evidencia exacta citable | **Tabla** | Solo si la audiencia citará/discutirá los números exactos |
| Producto / pantalla | **Screenshot anotado** | Callouts con flechas a partes concretas; atenuar o desenfocar todo lo que no se esté comentando |
| Cita / prueba social | **Quote** | ≤30 palabras, comillas reales, atribución completa (nombre, cargo, empresa), márgenes generosos |
| Ecosistema / plataforma | **Hub & spoke** | Solo si las ramas son iguales e independientes; si unas alimentan a otras, es causal y va como mapa/flujo |

Reglas de uso del catálogo:

- **Un layout = una relación.** Si un slide mezcla comparación + timeline + tabla, son tres slides disfrazados de uno: divídelos.
- Flechas y conectores solo si hay dirección o causalidad real; si nadie puede explicar por qué existe una flecha, se elimina.
- **Máx. 6-7 layouts distintos en todo el deck**, reutilizados con consistencia: la repetición de una librería pequeña es lo que hace que el deck parezca "diseñado" y no "armado".
- Test del diagrama: léelo en voz alta como frase ("primero A, luego B, luego C y vuelta a A"); si suena raro, la forma es incorrecta.
- **Cuando dudes: hero statement + un visual de apoyo.** Es el layout más difícil de estropear; un fishbone con problema mal definido es peor que una lista.

Anti-patrones de "deck generado por IA" — prohibidos:

- Mismo estilo de tarjeta (borde + fondo + radio) en todas las slides.
- Grids icono-título-descripción idénticos en 3+ slides seguidos.
- Centrarlo todo; todos los headings al mismo tamaño y peso.
- Acento morado/índigo por defecto sin relación con la marca; contraste apagado y bajo en todas partes; espaciado idéntico en todas las slides.

Ritmo y momentos hero:

- **Alterna densidad**: slide denso (datos) seguido de slide aireado (quote/hero) crea contraste y respiro.
- Incluye **1-2 "hero moments"**: tipografía sobredimensionada, un bloque de color pleno, un número gigante o un layout que rompe la retícula.
- **Test inolvidable**: ¿qué recordará alguien que vea el deck 10 segundos? Si no hay respuesta concreta, falta un hero moment.
- Asimetría con intención: splits 60/40, elementos que cruzan límites de sección, whitespace generoso en slides con poco contenido (escala la composición, no la dejes vacía).
- **Nunca 3 slides consecutivos con la misma composición** ni el mismo tratamiento visual.

### 7. Diagramas, código y datos (crítico para la parte de tecnología)

- **Arquitectura / flujos**: diagramas como **SVG inline estilizado con la paleta del deck** (cajas + flechas, etiquetas legibles ≥20px) o step-cards CSS para pipelines lineales simples. Nada de arte ASCII ni diagramas minúsculos en el centro de un slide vacío.
- **Código**: bloques con fuente monospace, resaltado de sintaxis simple hecho con spans + colores del deck, máximo ~10 líneas, y anota o resalta las 1-2 líneas que importan. Para comparativas, split antes/después (código viejo a la izquierda, nuevo a la derecha).
- **Datos**: gráficos SVG inline simples (barras/línea/donut) con **etiquetado directo** (valores junto a los puntos/barras, sin leyendas crípticas) y el número clave destacado como stat grande. Un gráfico, un mensaje.
- Placeholder de screenshots/producto: rectángulo con borde punteado y etiqueta `[SCREENSHOT: …]` para reemplazo fácil.

### 8. Motion (coreografía, no decoración)

- Como máximo: una secuencia de entrada significativa por slide (fade-up escalonado de 2-3 elementos) y transición global suave y uniforme entre slides.
- Nada de animaciones decorativas, rebotes, ni autoplay. El deck debe funcionar igual con animaciones desactivadas.

### 9. Accesibilidad y robustez

- Contraste alto texto/fondo en TODO el deck; no uses grises pálidos sobre blanco.
- Debe verse bien proyectado en sala iluminada y legible reducido a tamaño móvil (test mental: ¿se lee cada slide a 1/4 del tamaño?).
- Sin depende de hover para revelar contenido esencial; navegable 100% con teclado.

### 10. Workflow y QA (haz esto antes de darme el resultado)

1. Escribe primero la **dirección estética + outline de slides** (título y arquetipo de cada una) y muéstramelo para validar ANTES de generar el HTML completo.
2. Genera la **plantilla** (portada + una slide de contenido) y luego el resto del deck siguiéndola.
3. Al terminar, ejecuta este **checklist de 30 segundos** y declara el resultado: dirección estética explícita y consistente; jerarquía tipográfica clara; paleta con dominante + acento; al menos un motivo visual memorable + 1-2 hero moments; densidad controlada (sin muros de texto); variedad compositiva (sin 3 slides iguales seguidos, sin anti-patrones de IA); cada layout corresponde a la relación correcta (comparar→split, secuencia→timeline, conclusión→hero); todos los títulos son de acción y por sí solos cuentan el argumento; contraste verificado; navegación por teclado probada; cobertura del brief (ningún dato del brief quedó fuera); consola sin errores.
4. Entrega: `deck.html` (único archivo) + lista de slides generada + instrucciones de export a PDF. Si falta algún dato del brief, usa un placeholder marcado `[POR COMPLETAR: …]` y avísame — no inventes cifras ni features.

---

## Fuentes que alimentan este prompt

- **reveal.js slide skills** (smallpower/slides-revealjs, bluedusk/html-slides): tokens CSS, arquetipos de slide, límites de densidad, variedad compositiva, checklist QA, Mermaid/SVG para arquitectura.
- **Variant — "Use Codex to Generate Editable Presentation Decks"**: HTML como formato fuente, brief con audiencia+restricciones, plantilla→batches, texto real y CSS variables, export HTML/PDF/PPTX.
- **Made Good — Slide Design Principles**: una idea por slide, tipografía grande (títulos 36-44pt+, cuerpo ≥24pt), texto mínimo, alto contraste, plantilla consistente, 16:9.
- **Deckary — 12-slide pitch framework** (Y Combinator / Sequoia): orden narrativo problema→solución→tracción→ask; problema cuantificado; traction con gráfico; ≤30 palabras por slide.
- **htmlslides.com**: tips para prompts (nº de slides explícito, nombrar componentes, audiencia, contenido real).
- **Tosea — 14 patrones de layout** (relación→layout): comparación→columnas, secuencia→timeline/proceso, 3-6 iguales→card grid, conclusión→hero/big number, reglas timeline vs proceso vs ciclo vs Gantt, columnas paralelas, errores comunes de diagramas.
- **Made Good — 15 slide layout ideas**: split 50/50 imagen/texto como layout más versátil (alternar lado), hero number, chart+takeaway, screenshot anotado, divisoria, cierre, librería de 6-7 layouts reutilizados.
- **Deckary — 15 slide types profesionales**: titulares de acción vs descriptivos (+40% retención), regla 3 segundos, tabla ≤5col×7filas, timeline con "hoy", cierre con CTA específico, screenshot anotado.
- **Promptslide — slide design guide**: densidad por tipo de slide, anti-patrones de decks generados por IA, hero moments, ritmo denso/aireado, test inolvidable de 10 segundos.
