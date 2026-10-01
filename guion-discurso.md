# 🎤 Guion de Discurso — AI Local Crafters

> Charla en dos partes · Decks HTML 1920×1080
> Parte 1: `index.html` (44 secciones · contador 45, hardware & modelos) · Parte 2: `parte2-ciclo-desarrollo.html` (**39 slides — incluye 4 checkpoints del mapa**)
> Presentar desde `dist/` (`python3 bundle.py` reempaqueta). Recarga forzada (Ctrl+Shift+R) si acabas de editar.

**Teclas de modo** (idénticas en ambas partes):
- `←/→` o clic: navegar · contador arriba a la izquierda
- `d`: **Modo Documento** (todo el detalle) ↔ Modo Charla (lo esencial para proyectar)
- `t`: tema claro/oscuro · `o`: overview
- Regla del deck: **en Charla se proyecta lo esencial; el detalle vive en Documento**.

---

# PARTE 2 — El Ciclo de Desarrollo con IA (38 slides)

El hilo en una frase: *«el embudo convierte caos en certeza; las 5 fases lo convierten en software; la gobernanza impide que la IA lo destruya»*.

**El recurso de las estaciones**: la slide 7 presenta el mapa interactivo (9 pasos, clic a clic). Cuatro **checkpoints** (17, 22, 27 y 36) re-clavan el mapa entre bloques con la fase actual brillando y la etiqueta 📍 *"Estamos aquí"* — el público nunca pierde el hilo de dónde está. Ocultos en Documento.

## Bloque A — Apertura (1-7): el porqué, el destino y el marco

| # | Slide | Qué contar |
|---|-------|-----------|
| 1 | **El Embudo del SDLC: Del Caos a la Certeza** | Hook: variabilidad de la IA → reducirla con proceso. |
| 2 | **Paradigma Cloud** | API token, fuerza bruta: potencia a cambio de control y coste. |
| 3 | **Paradigma Local** | Tracción, control, coste cero. |
| **4** | **El Viaje de una Petición E2E** 🖱️ | INTRO del destino: Usuario → Controlador → Caso de Uso (BR) → Dominio (INV) → Persistencia. *Filtro de audiencia*: 👔 negocio / 🛠️ técnica / 🌐 compartida. *"El código sirve al negocio; aquí colaboran las dos visiones."* |
| 5 | **Los Tres Pilares** | Marco: proceso + gobernanza + ergonomía (AX). |
| 6 | **Pipeline: 5 Fases Disciplinadas** | El esqueleto: Inception → Especificación → Dominio → Construcción → Evolución. |
| 7 | **El Mapa Real del SDLC** 🖱️ | Mapa interactivo: 9 pasos clic a clic, silueta completa siempre visible. *La promesa de la charla hecha imagen.* |

**Puente A→B (7→8):** *"Entramos en la Fase 1: el taller de Inception, paso a paso."*

## Bloque B — Fase 1: Inception Workshop (8-16)

| # | Slide | Qué contar |
|---|-------|-----------|
| 8 | **Paso 1: Matriz de Fronteras (IS/IS NOT)** | Anclar qué es y qué NO es el producto. |
| 9 | **Paso 2: Tablero de Tradeoffs** | Prioridades relativas pactadas antes de descubrir (Regla de Oro 1-7). |
| 10 | **Paso 3: User Personas** | ¿Para qué artesano diseñamos? |
| 11 | **Paso 4: Mapa de Empatía** | Dolores y alegrías antes de diseñar la experiencia. |
| 12 | **Paso 5: User Journey Mapping** | El recorrido E2E: los gaps guían la solución. |
| 13 | **Paso 6: Feature Brainstorming** | Las features brotan de los gaps del journey, no del vacío. |
| 14 | **Paso 7: Secuenciador de Olas** | Wave 1/2/3 por valor, esfuerzo y dependencias. |
| 15 | **Paso 8: Contrato MVP** | El "system prompt supremo": hipótesis, alcance, falsación. |
| 16 | **Greenfield vs. Brownfield** | Charla = franja de flujo: 🌱 1→8 vs 🏭 desde el código 1→3→**6⇄5**→7 (swap 6⇄5; 2·4 diferidos). Documento = tabla 8v8 interactiva. |

**Puente B→C (16→17→18):** *"El taller da el mapa... y la estación del mapa (16) lo re-clava: **estamos aquí — Fase 2**. La especificación viva lo ejecuta."*

## Bloque C — Fases 2, 2b y 3: de la especificación al dominio (18-26)

| # | Slide | Qué contar |
|---|-------|-----------|
| 18 | **Fase 2 · 1. Diagrama de Secuencia** | El flujo como secuencia con bloques `rect` por método. |
| 19 | **Fase 2 · 2. Flowchart de Decisiones** | La lógica ramificada y los outcomes. |
| 20 | **Fase 2 · 3. Ciclo de Vida (FSM)** | El `stateDiagram-v2` de la entidad. ⚠️ *Este diagrama ES el artefacto de la Fase 3.* |
| 21 | **Fase 2b: Features (Slicing Vertical)** | `/create-features`: cada feature = un ciclo TDD completo (contrato de errores HTTP + checklist). |
| **22** | **📍 Checkpoint del mapa: Fase 3** | Estación: todo lo anterior encendido, **Dominio brillando**. *"Con las features listas, blindamos el dominio."* |
| 23 | **Fase 3: Ciclo de Vida de la Entidad** | Del FSM (19) al contrato formal: FSM + matriz de transiciones. |
| 24 | **Fase 3: Reglas vs. Invariantes** | BR (orquestación, flexible) vs INV (cero tolerancia, rollback). |
| 25 | **Fase 3: Plantilla de Regla (BR)** | Anatomía de una BR real (BR-004 free tier). |
| 26 | **Fase 3: Plantilla de Invariante (INV)** | Anatomía de una INV real. |

**Puente C→D (26→27→28):** *"El dominio está blindado... la estación (26) ilumina la banda ADR: **¿quién garantiza que se respeta?**"*

## Bloque D — Gobernanza: ADRs y ciclos canónicos (28-34)

| # | Slide | Qué contar |
|---|-------|-----------|
| 28 | **La Fricción: ADRs vs. Pre-entrenamiento** | El conocimiento del repo compite con el pre-entrenado. |
| 29 | **Guardrail Tax (Next.js 16.3+)** | Caso real: "This is NOT the Next.js you know". |
| 30 | **El Artefacto Inyectado (AGENTS.md)** | Cómo se materializa el guardrail. |
| 31 | **El Ciclo Canónico de un ADR** | De la duda a la ley. |
| 32 | **Gobernanza en Acción (Decision Tree ADR)** | De la intención a la ruta óptima. |
| 33 | **El Ciclo Canónico del SDLC** | *Puente: "el mapa de la 6, ahora como pilar canónico".* |
| 34 | **Producto en Acción (Decision Tree)** | De la necesidad al artefacto. |

**Puente D→E (34→35):** *"Ya tenemos ciclo y gobernanza. ¿Dónde viven los artefactos? → El repositorio."*

## Bloque E — Cierre técnico (35-39)

| # | Slide | Qué contar |
|---|-------|-----------|
| 35 | **La Conexión** | El repo como sistema nervioso: `docs/adr/` → `docs/product/` → `packages/`. (Estático.) |
| **36** | **📍 Checkpoint del mapa: Fase 4** | Estación: banda ADR ya encendida + **Construcción TDD brillando** (ámbar). *"La petición ya viaja; ahora construimos — cada feature (2b) es un ciclo TDD completo. Y cuando algo cambie: Fase 5 (/modify-flow), columna 7, te devuelve al mapa."* |
| 37 | **Evolución sin Drift: TDD Híbrido** | Fases 4-5: `/implement-flow` (TDD) + `/modify-flow` (cambio) + `/audit-docs` (cero drift). *"Las fases 1-3 en detalle; 4-5 son esta slide".* |
| 38 | **Frase de Cierre** | "La verdadera maestría artesanal consiste en entender y controlar las herramientas que moldean nuestro código." — pausa. |
| 39 | **Preguntas & Debate** | Cierre. Back-bar "← Frase de Cierre". |

## Cheat-sheet de puentes hablados (Parte 2)

1. 7→8: *"del mapa al taller"* · 16→17: *"el taller da el mapa; la estación lo re-clava"*
2. 20→21: *"el FSM dice DÓNDE; el slicing dice en qué ORDEN"* · 21→22: *"features listas → estación: el dominio"*
3. 26→27: *"¿quién blinda esto? → la banda ADR"* (el salto temático grande, ahora visualizado)
4. 32→33: *"el ADR gobierna decisiones; el índice gobierna el flujo"*
5. 34→35: *"¿dónde viven? → el repo"* (la petición viva ya se vio de intro en la 4)
6. 34→35: *"los enlaces son estáticos; veamos una petición viva"* · 35→36: *"petición → estación Fase 4: a construir"* · 36→37: *"y el sistema sigue vivo: TDD + cambio sin drift"* → 38: pausa → quote

---

# PARTE 1 — Hardware & Modelos (44 secciones · contador 45) · Evaluación

> ⚠️ **Numeración**: en Parte 1 el contador en pantalla va **+1** respecto a las posiciones de estas tablas (la portada no lleva id numérico). Ej.: la Matriz de Pesos = pos 34 aquí = **contador 35**.

El hilo en una frase: *«el bufé cloud se acabó → el local es viable si entiendes memoria, arquitectura y velocidad → elegimos modelos → sobrevivimos al hardware»*.

## Estructura por bloques

| Bloque | Slides | Juicio |
|--------|--------|--------|
| A. Crisis cloud (1-4) | Fin del bufé → choque de precios → Copilot refunds → cloud occidental/asiático | ✅ Hook fuerte |
| B. Infraestructura (5-8) | GPUs cloud vs local → radar 4 alternativas → costes 1M tokens → GPUs de terceros | ✅ Decisión económica |
| C. Trilema & memoria (9-11) | Trilema → pesos vs KV cache → peaje de comprimir | ✅ Fundamenta lo que viene |
| D. Cuantización avanzada (12-16) | Benchmark dominó → equilibrista AutoRound → GSQ+RCO → NVFP4 → AutoRound INT4 MoE | ⚠️ El bloque más denso; HUD ya pulido; puentes hablados abajo |
| E. Atención & memoria (17-21) | DeltaNet → pizarra/archivador → YaRN 1M → 3 niveles → analogía IBAN | ✅ La IBAN es oro pedagógico |
| F. Densos vs MoE (22-25) | Junta médica → 48 luces → triaje → router 5/48 | ✅ Contraste perfecto |
| G. Velocidad (26-34) | Viaje del token → timeline 2026 → MTP → DFlash → DSpark → DFlash 2 → **caso DeepSeek (cronología + hackeo)** → **resumen "¿Cuándo usar qué?" (34, nueva)** | ✅ Reordenado + resumen nuevo |
| H. La elección (35-39) | Matriz ricitos de oro → escogiendo modelos → Qwen 3.8 Flash → por dentro 48 capas → la decisión | ✅ Funnel bien resuelto |
| I. El aparato (40-43) | ¡Llegó el aparato! → Drama Blackwell GB10 ×2 → Hackeando el hierro | ✅ Saga de cierre |
| J. Handoff (44) | Los 2 Modelos Escogidos → link a Parte 2 | ✅ Puente entre partes |

## Ajustes sugeridos para la Parte 1

1. **Puente D→E (16→17)**, hoy implícito: *"ya sabemos comprimir el modelo; ¿dónde vive esa memoria comprimida?"*
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

**Se quedan en la charla sí o sí:** 14 (El Equilibrista), 18 (DeltaNet), 23-28 (densos/MoE, viaje del token, timeline), 35 (Cuatro Vías), 36-38 (ricitos, escogiendo, Qwen 3.8 Flash Next), 40-45 (decisión, aparato, drama GB10, hackers, dupla final). La 8 (GPUs de terceros) también se queda.

### Parte 2 — candidatas a ocultar (PENDIENTE de decidir)

| Pos | Slide | Por qué |
|-----|-------|---------|
| 25-26 | Plantillas BR e INV | Anatomía; la 23 ya fija el concepto BR vs INV |
| 33 | El Ciclo Canónico del SDLC | Repite el ciclo de las 5-7; puente directo 32→34 |
| 34 | Producto en Acción (Decision Tree) | Cima del refrito: re-enruta lo que el mapa (6) ya enseña; hoy se atraviesa rápido verbalmente |

**Candidata:** 19 (Flowchart de decisiones) si el tiempo aprieta.

**Se quedan:** intro E2E (4 — el filtro de audiencia como dispositivo de colaboración), mapa (7), checkpoints (17/22/27/36 — ocultos en Documento por diseño), franja G/B (16), 21-24, TDD (37), quote (38).

### Mecanismo aplicado

Clase `doc-only` en la `<section>` (reutiliza el CSS existente de Modo Charla/Documento) + `slides.js` la salta en Modo Charla: flechas, swipe y deep-links (con snap a la visible más cercana, respetando la dirección); visible en Documento (`d`) y en export/PDF hecho en Documento. El contador sigue siendo el número global de slide (coincide con el ID y con el guion). Un solo fichero, dos formatos.

---

# Estado técnico actual

- **Parte 1: 45 slides (contador 45)**, IDs renumerados para coincidir con el contador (era `slide-27b`, ahora `slide-35`) — caso DeepSeek al final del bloque de aceleración (33-34) y **slide 35 "Las Cuatro Vías de Aceleración: ¿Cuándo usar qué?"** (clon del sistema goldilocks: tabla con ganancias reales ×3 / ~3× / +60-85% / ~3.4× + banner "La Regla Práctica"). **14 slides ocultas en Modo Charla** (clase `doc-only` en la sección; la charla recorre 31), visibles en Documento y en el PDF exportado en Documento.
- **Parte 2: 39 slides** — 4 **checkpoints del mapa** (17 · 22 · 27 · **36 Fase 4**: banda ADR ya encendida + Construcción TDD brillando): clon runtime del panel del mapa (sin tocar slides.js: el clon pierde la clase `step` para que el motor no interfiera; el CSS del mapa se copió re-scoped a `.map-ckpt-host`); contador del mapa repurposed como etiqueta 📍 "Estamos aquí"; ocultos en Documento. El Viaje E2E **movido a intro (4)**: el puente negocio ↔ técnica tras los paradigmas; el cierre verbal recupera la imagen ("ahora la leéis entera"). Conexión (35), CK4 (36), TDD (37), Quote (38), Q&A (39). Cliente local eliminado.
- Coherencia: back-bars encadenados slide a slide en ambos decks; banners `SLIDE N` renumerados a posición real.
