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

> Investigación web en dos rondas: (1) generación técnica de slides HTML y prompting para agentes, (2) catálogo de layouts y qué contenido va en cada uno. Debajo de cada fuente se indica qué reglas concretas del prompt salen de ella.

### Ronda 1 — formato técnico, prompting y estructura narrativa

1. **smallpower / slides-revealjs SKILL.md** — skill open source para agentes que generan decks
   https://github.com/jeasonstudio/smallpower/blob/main/skills/slides-revealjs/SKILL.md
   → Tokens CSS en `:root`, dirección estética única declarada antes de codificar, paleta dominante+acento, arquetipos de slide, límites de densidad (5-6 bullets, ~10 líneas de código, 8-10 nodos por diagrama, ~8 filas por tabla), variedad compositiva (nunca 3 slides iguales seguidos), tipografía display+cuerpo con Google Fonts, atmósfera con gradientes/paneles, motion como coreografía, Mermaid/SVG para arquitectura, checklist QA de 30 segundos, export PDF, reglas de cobertura del contenido fuente.

2. **Variant — "Use Codex to Generate Editable Presentation Decks"**
   https://www.variant.art/blog/use-codex-to-generate-editable-presentation-decks
   → HTML como formato fuente (no binarios tipo PPTX), brief de 6 líneas (audiencia, objetivo, secciones, tono, look, restricciones 16:9/single-file), workflow plantilla→batches, CSS custom properties para re-tematizar, texto real seleccionable, revisar en navegador a pantalla completa, editar sin regenerar, export HTML/PDF/PPTX, patrón eyebrow+titular+dek+footer.

3. **HTMLSlides — "How to Generate HTML Slides with AI"** (+ skill open source `html-slides` de bluedusk)
   https://htmlslides.com/blog/how-to-generate-html-slides-with-ai/
   https://github.com/bluedusk/html-slides
   → Tips de prompting (nº de slides explícito, nombrar componentes concretos como stats cards/timeline/tabla comparativa, describir audiencia, incluir contenido y datos reales en el prompt), archivo único autocontenido, notas del orador, navegación con teclado, export a PDF y deploy.

4. **Made Good — "Slide Design Principles That Work"**
   https://madegooddesigns.com/slide-design-principles/
   → Una idea por slide (test: resumible en una frase), cuerpo ≥24pt y titulares 36-44pt+, texto mínimo, alto contraste (los proyectores lavan los colores), plantilla consistente, 16:9 estándar, jerarquía visual clara, errores comunes (párrafos, encoger fuente, fondos ruidosos, fuentes inconsistentes).

5. **Deckary — "Pitch Deck Template: The 12-Slide Framework"** (sintetiza guías de Y Combinator y Sequoia)
   https://deckary.com/blog/pitch-deck-template
   → Orden narrativo portada→problema→solución→mercado→modelo→tracción→competencia→equipo→financials→ask, problema cuantificado y no abstracto (ejemplo Airbnb), tracción con gráfico de trayectoria y métricas por etapa (pre-revenue/early/scaling), ask específico atado a hitos (ejemplo Uber), ≤30 palabras por slide, 3-4 colores, alineación a la izquierda, test de lectura en móvil, 15-35 s de atención por slide (DocSend).

### Ronda 2 — catálogo de layouts y qué contenido va en cada uno

6. **Tosea — "How to Choose a PowerPoint Layout: 14 Patterns That Cover 90% of Slides"**
   https://tosea.ai/blog/powerpoint-layout-patterns-complete-guide
   → Tabla relación→layout (comparación→columnas, secuencia→proceso/timeline, 3-6 iguales→card grid, conclusión→hero/big number, estrechamiento→funnel, solapamiento→Gantt, 2 variables→quadrant, ramas iguales→hub&spoke), gramática de diagramas (flecha=causalidad real, ciclo solo si vuelve al inicio, timeline espaciado proporcional al tiempo, Gantt para concurrencia), columnas de comparación paralelas, títulos de insight, card grid de 3-6 items, errores comunes de layout, default "hero + visual" cuando hay dudas, contraste W3C 4.5:1/3:1, "encoger la fuente nunca es la solución".

7. **Made Good — "15 Slide Layout Ideas for Clean Presentations"**
   https://madegooddesigns.com/slide-layout-ideas/
   → Split 50/50 imagen/texto como layout de contenido más versátil (alternando el lado de la imagen entre slides), hero number (el 92% a 200pt pega más que el mismo número en un gráfico), one big statement, quote corta, divisoria de sección, tres columnas idénticas, icon row, timeline horizontal, chart+takeaway (nunca hacer interpretar los datos), chart full-width sin gridlines/leyendas con el punto clave en el acento, screenshot anotado con callouts y resto atenuado, slide de pausa, cierre deliberado, librería de 6-7 layouts reutilizados, "consistencia > variedad".

8. **Deckary — "Presentation Design: The Complete Guide to Professional Slide Types"** (15 tipos)
   https://deckary.com/blog/pillar-slide-types-guide
   → Titulares de acción vs descriptivos (+40% de retención; estudio assertion-evidence de Penn State), regla de los 3 segundos, regla 6x6, tabla ≤5 col × ≤7 filas con ganador resaltado y números alineados a la derecha, timeline con "hoy" marcado y flujo izq→der, case study liderado por resultado cuantificado, testimonial con atribución completa y ≤2-3 frases, cierre con next steps específicos (acción+propietario+fecha, nunca "Thank you" genérico), anexos numerados, whitespace y carga cognitiva, jerarquía visual (título 28-32pt, cuerpo 14-16pt en su escala).

9. **Promptslide — "Slide Design Guide"** — skill open source, referencia interna para agentes
   https://github.com/prompticeu/promptslide/blob/HEAD/skills/promptslide/references/slide-design-guide.md
   → Densidad por tipo de slide (título: heading+subtítulo ≤10 palabras; contenido: 4-6 bullets o 2 párrafos o 2-4 tarjetas; datos: 1 gráfico/tabla, ≤6 filas, ≤4 puntos comparados; quote ≤30 palabras), "el contenido moldea el layout", ritmo denso/aireado, 1-2 hero moments por deck, anti-patrones de deck generado por IA (misma tarjeta en todas las slides, grids icono-título-descripción repetidos, todo centrado, acento morado/índigo por defecto, contraste apagado), contraste de pesos 800-900 vs 400, splits asimétricos 60/40, bloques de color deliberados, "test inolvidable de 10 segundos".

### Fuentes secundarias (citadas dentro de las anteriores, no consultadas directamente)

- Penn State, estudio assertion-evidence (títulos-conclusión y comprensión): https://writing.engr.psu.edu/ae_comprehension.pdf
- Microsoft, guía SmartArt (gramática de diagramas: qué implica cada forma): https://support.microsoft.com/en-us/office/choose-a-smartart-graphic-13846dd8-4d55-46b9-9a25-8fce2864d592
- W3C WCAG 2.1, contraste mínimo (4.5:1 texto normal, 3:1 texto grande): https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- Y Combinator, "How to Build Your Seed Round Pitch Deck": https://www.ycombinator.com/library/2u-how-to-build-your-seed-round-pitch-deck
- DocSend, datos de atención por slide (~3 min 44 s por deck): citado en deckary.com vía seedblink.com

## Lección nueva (slide especial engram, s15)
- **Clases base con min-height fijo + columnas con N tarjetas**: si reutilizas `.memory-pillar-card` (min-height 170px) en una columna que ahora lleva 3 tarjetas + extras, el total desborda y las tarjetas se tapan entre sí (el sweep NO detecta solapes internos). Diagnóstico: `scrollHeight`/`clientHeight` del elemento (clientH = min-height del base es la firma). Fix: `min-height: auto` con scope del modo/contenedor nuevo.
- **Los extras/pies de columna en modo doc**: mejor notas planas en línea (strong mono + texto, display block, sin caja) que mini-tarjetas en grid: 3 notas ≈ 127px en vez de ~200.
- **Pills de una idea**: los textos telegráficos («20M n-grams al vuelo: no computa — viven en RAM host o disco») funcionan a 1.62rem en charla Y a 1.02rem en doc sin reescribir. Si una pill necesita 2 frases, son 2 ideas.
- **Una historia por slide**: el concepto (engram) va en una slide; su consecuencia de hardware (fit GB10, PTQ vs QAD) pide OTRA slide, aunque solo sea una remisión doc-only.
- **Base con `!important` = reglas especializadas inertes**: `.subtitle { font-size: 1.8rem !important }` hace que CUALQUIER override sin !important sea decorativo (la regla de s4 con 0.92rem nunca aplicó). Si una regla "no aplica" sin error, dep con getComputedStyle (el valor final no miente) y sospechar de !important de bases antiguas.
- **Nodos HTML dentro de `<svg>`**: un `<div>` insertado antes del `</svg>` rompe el foreign content — el parser cierra el SVG implícitamente y el gráfico se compacta. Al mover texto SVG a HTML, insertar DESPUÉS del cierre del svg y verificar con getBoundingClientRect.
- **Los markers (`url(#id)`) NO cruzan `<svg>` en Chromium** (los gradientes sí): si un SVG referencia `marker-end="url(#egArrow)"` definido en OTRO `<svg>` (p.ej. el de la slide anterior), la cabeza no pinta (el `d`/geometría de la línea existe — el bug es del RESOLVER del marker). Fix: `<defs>` con marker de id único (`an1Arrow`) dentro del propio SVG. Detectado por Fernando ("las flechas salen un segundo y desaparecen, solo quedan las líneas").
