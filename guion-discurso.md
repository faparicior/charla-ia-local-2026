# 🎤 Guion de Discurso — AI Local Crafters

> Charla en dos partes · Decks HTML 1920×1080
> Parte 1: `index.html` (48 secciones · contador dinámico, hardware & modelos) · Parte 2: `parte2-ciclo-desarrollo.html` (**40 slides — incluye 4 checkpoints del mapa y la síntesis E2E interactiva**)
> Presentar desde `dist/` (`python3 bundle.py` reempaqueta). Recarga forzada (Ctrl+Shift+R) si acabas de editar.

**Teclas de modo** (idénticas en ambas partes):
- `←/→` o clic: navegar · contador arriba a la izquierda
- `d`: **Modo Documento** (todo el detalle) ↔ Modo Charla (lo esencial para proyectar)
- `t`: tema claro/oscuro · `o`: overview
- Regla del deck: **en Charla se proyecta lo esencial; el detalle vive en Documento**.

---

# PARTE 2 — El Ciclo de Desarrollo con IA (43 slides · Charla usa la 5 esquemática; la 4 interactiva queda solo en Documento)

El hilo en una frase: *«el embudo convierte caos en certeza; las 5 fases lo convierten en software; la gobernanza impide que la IA lo destruya»*.

**El recurso de las estaciones**: la slide 9: **tablero estático en Modo Charla** (solo Lean Inception + User Story Mapping encendidas, como en la estación 19; → salta directo al taller) y **recorrido paso a paso (9 clics) reservado al Modo Documento**, donde se ve el mapa completo. Seis **checkpoints** (19, 23, 25, 30, 36 y 38) re-clavan el mapa entre bloques con la fase actual brillando y la etiqueta 📍 *"Estamos aquí"* — el público nunca pierde el hilo de dónde está. Visibles también en Modo Documento.

## Bloque A — Apertura (1-9): el porqué, el destino y el marco

| # | Slide | Qué contar |
|---|-------|-----------|
| 1 | **El Embudo del SDLC: Del Caos a la Certeza** | Hook: variabilidad de la IA → reducirla con proceso. |
| 2 | **Paradigma Cloud** | API token, fuerza bruta: potencia a cambio de control y coste. |
| 3 | **Paradigma Local** | Tracción, control, coste cero. |
| **4** | **El Embudo del Dominio** 🖱️ | **SOLO DOCUMENTO** (doc-only). Síntesis E2E interactiva: usuario + 3 Journeys → barreras BR/INV → entidades & máquina de estado → respuesta/notificación. Pills de visión (completa/reservar/cuota/ilegal). |
| **5** | **El Embudo del Dominio — Versión Esquemática** 🖱️ | **LA SÍNTESIS DE CHARLA**: corredor único, 4 pasos que evolucionan **cuota ⚠️ (frena BR) → ilegal 🛑 (frena INV) → reserva ✅ (lo consigue) → veredicto 🏁** — se va parando hasta que consigue su objetivo. Sin JS propio. |
| **6** | **El Viaje de una Petición E2E** 🖱️ | INTRO del destino: Usuario → Controlador → Caso de Uso (BR) → Dominio (INV) → Persistencia. *Filtro de audiencia*: 👔 negocio / 🛠️ técnica / 🌐 compartida. *"El código sirve al negocio; aquí colaboran las dos visiones."* |
| 7 | **Los Tres Pilares** | Marco: proceso + gobernanza + ergonomía (AX). |
| 8 | **Pipeline: 5 Fases Disciplinadas** | El esqueleto: Inception → Especificación → Dominio → Construcción → Evolución. |
| 9 | **El Mapa Real del SDLC** 🖱️ | Mapa interactivo: 9 pasos clic a clic, silueta completa siempre visible. *La promesa de la charla hecha imagen.* |

**Puente A→B (9→10):** *"Entramos en la Fase 1: el taller de Inception, paso a paso."*

## Bloque B — Fase 1: Inception Workshop (10-18)

| # | Slide | Qué contar |
|---|-------|-----------|
| 10 | **Paso 1: Matriz de Fronteras (IS/IS NOT)** | Anclar qué es y qué NO es el producto. |
| 11 | **Paso 2: Tablero de Tradeoffs** | Prioridades relativas pactadas antes de descubrir (Regla de Oro 1-7). |
| 12 | **Paso 3: User Personas** | ¿Para qué artesano diseñamos? |
| 13 | **Paso 4: Mapa de Empatía** | Dolores y alegrías antes de diseñar la experiencia. |
| 14 | **Paso 5: User Journey Mapping** | El recorrido E2E: los gaps guían la solución. |
| 15 | **Paso 6: Feature Brainstorming** | Las features brotan de los gaps del journey, no del vacío. |
| 16 | **Paso 7: Secuenciador de Olas** | Wave 1/2/3 por valor, esfuerzo y dependencias. |
| 17 | **Paso 8: Contrato MVP** | El "system prompt supremo": hipótesis, alcance, falsación. |
| 18 | **Greenfield vs. Brownfield** | Charla = franja de flujo: 🌱 1→8 vs 🏭 desde el código 1→3→**6⇄5**→7 (swap 6⇄5; 2·4 diferidos). Documento = tabla 8v8 interactiva. |

**Puente B→C (18→19→20):** *"El taller da el mapa... y la estación del mapa (18) lo re-clava: **estamos aquí — Fase 2**. La especificación viva lo ejecuta."*

## Bloque C — Fases 2, 2b y 3: de la especificación al dominio (20-29)

| # | Slide | Qué contar |
|---|-------|-----------|
| 20 | **Fase 2 · 1. Diagrama de Secuencia** | El flujo como secuencia con bloques `rect` por método. |
| 21 | **Fase 2 · 2. Flowchart de Decisiones** | La lógica ramificada y los outcomes. |
| 22 | **Fase 2 · 3. Ciclo de Vida (FSM)** | El `stateDiagram-v2` de la entidad. ⚠️ *Este diagrama ES el artefacto de la Fase 3.* |
| **23** | **📍 Checkpoint del mapa: Fase 2b** | Estación: Specs ya encendida + **Features brillando** (fucsia). *"La especificación ya fluye; ahora la troceamos: cada feature cruza toda la tubería."* |
| 24 | **Fase 2b: Features (Slicing Vertical)** | `/create-features`: cada feature = un ciclo TDD completo (contrato de errores HTTP + checklist). |
| **25** | **📍 Checkpoint del mapa: Fase 3** | Estación: todo lo anterior encendido, **Dominio brillando**. *"Con las features listas, blindamos el dominio."* |
| 26 | **Fase 3: Ciclo de Vida de la Entidad** | Del FSM (22) al contrato formal: FSM + matriz de transiciones. |
| 27 | **Fase 3: Reglas vs. Invariantes** | BR (orquestación, flexible) vs INV (cero tolerancia, rollback). |
| 28 | **Fase 3: Plantilla de Regla (BR)** | Anatomía de una BR real (BR-004 free tier). |
| 29 | **Fase 3: Plantilla de Invariante (INV)** | Anatomía de una INV real. |

**Puente C→D (29→30→31):** *"El dominio está blindado... ¿quién garantiza que se respeta? → Los ADRs (30-35) y la estación de la 36 lo clavan."*

## Bloque D — Gobernanza y Fases 4-5 (31-40)

| # | Slide | Qué contar |
|---|-------|-----------|
| 31 | **La Fricción: ADRs vs. Pre-entrenamiento** | El conocimiento del repo compite con el pre-entrenado. |
| 32 | **Guardrail Tax (Next.js 16.3+)** | Caso real: "This is NOT the Next.js you know". |
| 33 | **El Artefacto Inyectado (AGENTS.md)** | Cómo se materializa el guardrail. |
| 34 | **El Ciclo Canónico de un ADR** | De la duda a la ley. |
| 35 | **Gobernanza en Acción (Decision Tree ADR)** | De la intención a la ruta óptima. |
| **36** | **📍 Checkpoint del mapa: Fase 4** | Estación: banda ADR ya encendida + **Construcción TDD brillando** (ámbar). *"¿Quién garantiza que se respeta? → Estamos en Fase 4: a construir."* |
| 37 | **Evolución sin Drift: TDD Híbrido** | Fases 4-5: `/implement-flow` (TDD) + `/modify-flow` (cambio) + `/audit-docs` (cero drift). |
| **38** | **📍 Checkpoint del mapa: Fase 5+** | Estación: TDD ya encendida + **Cambio Guiado brillando** (carmesí). *"El ciclo no acaba al desplegar: cuando algo cambie, /modify-flow te devuelve al mapa — cero drift."* |
| 39 | **El Ciclo Canónico del SDLC** | *Puente: "el pipeline de la 8, ahora como pilar canónico".* |
| 40 | **Producto en Acción (Decision Tree)** | De la necesidad al artefacto. |

**Puente D→E (40→41):** *"Ya tenemos gobernanza y ciclo. ¿Dónde viven los artefactos? → El repositorio."*

## Bloque E — Cierre técnico (41-43)

| # | Slide | Qué contar |
|---|-------|-----------|
| 41 | **La Conexión** | El repo como sistema nervioso: `docs/adr/` → `docs/product/` → `packages/`. (Estático.) |
| 42 | **Frase de Cierre** | "La verdadera maestría artesanal consiste en entender y controlar las herramientas que moldean nuestro código." — pausa. |
| 43 | **Preguntas & Debate** | Cierre. Back-bar "← Frase de Cierre". |

## Cheat-sheet de puentes hablados (Parte 2)

1. 9→10: *"el mapa ya está señalando el Inception: entramos al taller"* · 18→19: *"el taller da el mapa; la estación lo re-clava"*
2. 22→23: *"la FSM dice DÓNDE; la estación 2b lo clava: a trocear"* · 24→25: *"features listas → estación: el dominio"*
3. 29→30: *"¿quién blinda esto? → la banda ADR"* (el salto temático grande, ahora visualizado)
4. 35→36: *"el ADR gobierna; la estación clava la Fase 4"* · 36→37: *"a construir: TDD + cambio sin drift"*
5. 37→39: *"todo ese trabajo se ordena en el ciclo canónico"* · 39→40: *"el índice gobierna el flujo"*
6. 40→41: *"¿dónde viven los artefactos? → el repo"* (la petición viva ya se vio en la síntesis de la 4) · 41→42: pausa → quote

---

# PARTE 1 — Hardware & Modelos (48 secciones · contador dinámico) · Evaluación

> ℹ️ **Numeración**: tras la renumeración, en ambas partes el ID de la slide == el contador en pantalla == las posiciones de estas tablas (en Parte 2 el prólogo es la 0). Ej.: la Matriz de Pesos = slide-36 = contador 36.

El hilo en una frase: *«el bufé cloud se acabó → el local es viable si entiendes memoria, arquitectura y velocidad → elegimos modelos → sobrevivimos al hardware»*.

## Estructura por bloques

| Bloque | Slides | Juicio |
|--------|--------|--------|
| A. Crisis cloud (1-4) | Fin del bufé → choque de precios → Copilot refunds → cloud occidental/asiático | ✅ Hook fuerte |
| B. Infraestructura (5-8) | GPUs cloud vs local → radar 4 alternativas → costes 1M tokens → GPUs de terceros | ✅ Decisión económica |
| C. Trilema & memoria (9-11) | Trilema → pesos vs KV cache → peaje de comprimir | ✅ Fundamenta lo que viene |
| D. Cuantización avanzada (12-17) | Benchmark dominó → equilibrista AutoRound → GSQ+RCO → NVFP4 → AutoRound INT4 MoE | ⚠️ El bloque más denso; HUD ya pulido; puentes hablados abajo |
| E. Atención & memoria (18-22) | DeltaNet → pizarra/archivador → YaRN 1M → 3 niveles → analogía IBAN | ✅ La IBAN es oro pedagógico |
| F. Densos vs MoE (23-26) | Junta médica → 48 luces → triaje → router 5/48 | ✅ Contraste perfecto |
| G. Velocidad (27-35) | Viaje del token → timeline 2026 → MTP → DFlash → DSpark → DFlash 2 → **caso DeepSeek (cronología + hackeo)** → **resumen "¿Cuándo usar qué?" (35, nueva)** | ✅ Reordenado + resumen nuevo |
| H. La elección (36-40) | Matriz ricitos de oro → escogiendo modelos → Qwen 3.8 Flash → por dentro 48 capas → la decisión | ✅ Funnel bien resuelto |
| I. El aparato (41-44) | ¡Llegó el aparato! → Drama Blackwell GB10 ×2 → Hackeando el hierro | ✅ Saga de cierre |
| J. Handoff (45) | Los 2 Modelos Escogidos → link a Parte 2 | ✅ Puente entre partes |

## Ajustes sugeridos para la Parte 1

1. **Puente D→E (18→19)**, hoy implícito: *"ya sabemos comprimir el modelo; ¿dónde vive esa memoria comprimida?"*
2. **Bloque G como mini-arco** (26→35): *el problema* (viaje del token, slide 27) → *el estado del arte* (timeline 2026 + técnicas MTP/DFlash/DSpark/DFlash 2) → *el colofón* (caso DeepSeek: cronología y hackeo, 33-34) → *la conclusión* (tabla "¿cuándo usar qué?", slide 35). Anunciar el arco en la 26.
3. **Slide 45**: verbalizar los badges "OBSOLETO" (registro de descartes) y cerrar con el puente a parte 2 (el CTA ya existe).
4. **Ritmo**: ~30 min; el bloque D es el candidato a resumirse en vivo (*"4 bits bastan si se compensa"*).

## Ocultación en Modo Charla — APLICADA en Parte 1 (Parte 2 pendiente de decidir)

Criterio: lo que es **anatomía interna, investigación de frontera o caso histórico detallado** se oculta del modo presentación y queda vivo en Documento para **formación profunda**.

### Parte 1 — ocultas en Modo Charla (aplicado)

| Pos | Slide | Por qué |
|-----|-------|---------|
| 15 | GSQ + RCO (abismo 2-3 bits) | Investigación de frontera, la más densa |
| 16 | NVIDIA NVFP4: El Secreto de los 4 Bits | Decisión de ensayo: se narra verbal, se consulta en Documento |
| 17 | AutoRound INT4: El Secreto en MoE | Ídem |
| 19 | La Pizarra vs. el Archivador | Metáfora de física de memoria; la sostiene DeltaNet (18) |
| 20 | Escalando a 1 Mega con YaRN | Técnica muy específica |
| 21 | Los 3 Niveles de Atención | Pedagogía visual |
| 22 | La Analogía del IBAN | Pedagogía visual |
| 29-32 | MTP · DFlash · DSpark · DFlash 2 | Las 4 técnicas en detalle; el timeline (28) las pinta a alto nivel |
| 33-34 | Caso DeepSeek (cronología + hackeo) | El caso histórico completo |
| 39 | Por dentro: cinco piezas en 48 capas | Anatomía interna |

**14 ocultas → la charla recorre 31 slides** (contador global intacto: salta 13→14→18→23→28→35→40; el número de abajo siempre coincide con el ID y con este guion).

**Se quedan en la charla sí o sí:** 14 (El Equilibrista), 18 (DeltaNet), 23-28 (densos/MoE, viaje del token, timeline), 35 (Cuatro Vías), 36-39 (ricitos, escogiendo, Qwen 3.8 Flash Next), 41-45 (decisión, aparato, drama GB10, hackers, dupla final). La 8 (GPUs de terceros) también se queda.

### Parte 2 — ocultas en Modo Charla (aplicado) y candidatas

| Pos | Slide | Por qué |
|-----|-------|---------|
| 28-29 | Plantillas BR e INV | Anatomía; la 26 ya fija el concepto BR vs INV |
| **4** | El Embudo del Dominio (interactivo) | OCULTA en Charla: la síntesis se cuenta con la 5 esquemática; la 4 queda para la lectura en Documento |
| 39 | El Ciclo Canónico del SDLC | Repite el ciclo de las 7-9; puente directo 35→37 |
| 40 | Producto en Acción (Decision Tree) | Cima del refrito: re-enruta lo que el mapa (9) ya enseña; hoy se atraviesa rápido verbalmente |

**Candidata:** 21 (Flowchart de decisiones) si el tiempo aprieta.

**Se quedan:** síntesis Embudo (**5** esquemática — la 4 interactiva queda oculta, solo Documento), intro E2E (6 — el filtro de audiencia como dispositivo de colaboración), mapa (9), checkpoints (19/23/25/30/36/38 — visibles también en Modo Documento), franja G/B (18), 24-27, TDD (37), quote (42).

### Mecanismo aplicado

Clase `doc-only` en la `<section>` (reutiliza el CSS existente de Modo Charla/Documento) + `slides.js` la salta en Modo Charla: flechas, swipe y deep-links (con snap a la visible más cercana, respetando la dirección); visible en Documento (`d`) y en export/PDF hecho en Documento. El contador sigue siendo el número global de slide (coincide con el ID y con el guion). Un solo fichero, dos formatos.

---

# Estado técnico actual

- **REORIENTACIÓN NARRATIVA (8 oct 2026) — «Dueño del modelo, no del silicio»:** tras la escalada de precios del hardware 128 GB+ (ver `referencia-precios-hardware-128gb.md`), la Parte 1 se reencuadra: la idea (pesos abiertos + privacidad + control) sobrevive, pero el runtime pasa a ser fungible. Tres slides nuevas:
  - **slide-4 · «El choque de precios II: la caja se disparó»** (tras la s3, posición 4; id renumerado desde `slide-3b`): tabla `editorial-table` con el mercado Oct 2026 (Framework $1.999→$3.449 agotada; DGX Spark +74% → $6.950 agotado + recorte 64 GB a $4.999; Bosgame/Minisforum $3.099–3.799; GMKtec agotado; Mac Studio M5 Max $5.099 (+$1.600 por 64 GB, $25/GB); M5 Ultra 256 GB $9.499; Gorgon Halo 192 GB $6.799) + remate: el ticket de entrada pasó de $2.000 a $5.000–7.000. Fila DGX destacada con `highlight-row`.
  - **slide-47 · «¿Y si no puedes comprártelo? La escalera de 2026»** (tras la s46): 3 peldaños (equipo que ya tienes · GPU alquilada por horas ~1–3,5 €/h H200 · caja propia cuando baje el pico) + matiz honesto (el alquiler también puede subir, pero pagas por uso). Componente `ladder-*` nuevo en `style.css`.
  - **slide-48 · «Dueño del modelo, no del silicio»** (cierre): 3 tarjetas tesis (el software llegó · el silicio se desató · los pesos te salvan) + quote-box («Yo llegué a tiempo — vosotros podéis empezar por el peldaño que toque») + `deck-transition-box` (movida desde la s46).
  - **Reencuadre de slides existentes (2ª tanda, hecho):** s1 portada en castellano («Crear Software en la **Era de los Pesos Abiertos**», subtítulo con el lema «Dueño del modelo, no del silicio»); s7 retitulada «Tu Infraestructura: Alquilar o Poseer»; s10 elevada a pivote («El Pivote de 2026 · La salida honesta: alquilar GPUs para pesos abiertos»); s42 reframada como caso personal («¡Llegó el Aparato! (llegué a tiempo)» con la confesión del ticket actual en el subtítulo de Documento).
  - **RENUMERACIÓN (8 oct 2026): ids alineados con el contador** — con la inserción de la slide 4, los ids quedaban desfasados. Nueva convención restaurada: **id = posición = contador**. Equivalencias: `slide-3b→slide-4`; ids 4–45 desplazados +1 (p. ej. Copilot s4→s5, «Alquilar o Poseer» s6→s7, pivote alquiler s9→s10, «calculasiones» s40→s41, «¡Llegó el Aparato!» s41→s42, «Los 2 Modelos Escogidos» s45→s46); escalera 46→47 y cierre 47→48. Los selectores `#slide-N` de `style.css` se desplazaron solo para la Parte 1 (scoped `deck-hardware-part1` + bare verificados empíricamente contra ambos decks); los de Parte 2 y plantillas no se tocan. Verificado con diff de estilos computados: 0 diferencias en Parte 1 (3.044 elementos) y Parte 2 (2.928). Las referencias históricas de secciones anteriores conservan la numeración de su fecha.

### Puentes verbales del reenfoque (Modo Charla, a decir — no están en las slides)

- **s2 → s4 (del bufé libre al silicio):** «Y cuando el mercado vio que las suscripciones ilimitadas se acababan, corrió hacia la salida que yo os contaba hace un año: la caja local. Ese pánico de compra es la mitad de la tabla que viene ahora — cada GPU que encendía un datacenter era una caja que no llegaba a vuestra mesa.»
- **s46 → s47 (del stack escogido a la escalera):** «Esta es mi estación de trabajo, sí — porque llegué a tiempo. Pero la pregunta de esta charla nunca fue *¿compras o no?* Es: *¿dónde ejecutas tus pesos?* Y esa pregunta tiene escalera.»
- **s47 → s48 (remate):** «Mirad la tabla otra vez con estos ojos: quien depende de una caja — o de un único proveedor — se come la subida. Quien tiene los pesos, migra. La idea de septiembre sobrevive al año más caro del silicio.»
- **Parte 1: 48 slides (contador dinámico)**, IDs renumerados para coincidir con el contador (era `slide-27b`, ahora `slide-35`) — caso DeepSeek al final del bloque de aceleración (33-34) y **slide 35 "Las Cuatro Vías de Aceleración: ¿Cuándo usar qué?"** (clon del sistema goldilocks: tabla con ganancias reales ×3 / ~3× / +60-85% / ~3.4× + banner "La Regla Práctica"). **14 slides ocultas en Modo Charla** (clase `doc-only` en la sección; la charla recorre 34), visibles en Documento y en el PDF exportado en Documento.
- **Parte 2: 43 slides (Charla = la 5 esquemática; la 4 interactiva solo en Documento), IDs renumerados slide-0..slide-43 == contador (mismo criterio que Parte 1); CSS de componentes prefijado por deck (`body.deck-hardware-part1` / `body.deck-sdlc-part2`) para aislar los estilos entre decks** — 6 **checkpoints del mapa** (19 · 23 · 25 · 30 · **36 Fase 4** · **38 Fase 5+**: TDD encendida + Cambio Guiado brillando): banda ADR ya encendida + Construcción TDD brillando; **23 Fase 2b**: Specs encendida + Features brillando en fucsia): clon runtime del panel del mapa (sin tocar slides.js: el clon pierde la clase `step` para que el motor no interfiera; el CSS del mapa se copió re-scoped a `.map-ckpt-host`); contador del mapa repurposed como etiqueta 📍 "Estamos aquí"; visibles también en Documento. El Viaje E2E **tras la síntesis (6)**: el puente negocio ↔ técnica tras los paradigmas; el cierre verbal recupera la imagen ("ahora la leéis entera"). CK4 (36) + TDD (37) van ANTES del Ciclo Canónico (39) y Producto (40); luego Conexión (41), Quote (42), Q&A (43). Cliente local eliminado.
- **Slides 4 y 5 — la síntesis E2E "El Embudo del Dominio"** (DECIDIDO: **la 5 es la de Charla**; la 4 queda solo en Documento):
  - **La 5 — "Versión Esquemática"**: corredor único con el lenguaje de la 27 de la Parte 1 (el Viaje del Token) — chip viajero por CSS Motion Path, **4 pasos que evolucionan: cuota ⚠️ (frena BR) → ilegal 🛑 (frena INV) → reserva ✅ (lo consigue: 201 + 📬 + 💻) → veredicto 🏁** — se va parando hasta que consigue su objetivo; dos barreras simbólicas (⭐ BR / 🛡️ INV), trio FSM, avisos elegantes 402/409; **sin JS propio** (pura coreografía CSS sobre el motor `.step`; pasos excluyentes; el veredicto restaura el escenario).
  - **La 4 — la interactiva** (`slide-domain-funnel`; nació al final tras Q&A y se reubicó tras el paradigma local): SVG con el sistema flow-* de la slide journey — 1 usuario con 3 Journeys cuyos flujos cruzan las 2 barreras de validación (**BR** en Caso de Uso, **INV** en Dominio), llegan a **entidades & máquina de estado** (borrador→activa→cerrada + transición ilegal reaservar()✗) y acaban en **respuesta o notificación** (201+email/UI · 402 aviso elegante · 409 estado intacto). Pills de vista (all/j1/j2/j3) + estaciones clicables con takeaway; `doc-only` desde hoy.
- Coherencia: back-bars encadenados slide a slide en ambos decks; banners `SLIDE N` renumerados a posición real.
