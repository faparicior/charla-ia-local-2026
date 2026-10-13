# 🚀 AI Local Crafters — Estado del Proyecto y Hoja de Ruta

> **Fecha de actualización:** 8 de Octubre de 2026  
> **Propósito:** Documento de contexto para retomar el trabajo en un chat nuevo sin perder nada de contexto.

> ⚠️ **RENUMERACIÓN PARTE 2 (10 oct 2026 · noche):** insertada la **s38 «Estación del Mapa — Ecosistema Completo»** (checkpoint con los 9 pasos encendidos a la vez, visible en Charla, entre TDD Híbrido y el checkpoint Fase 5+). Desplazamiento +1 de todo lo posterior (38→44; 45 secciones · 17 visibles en Charla). Los checkpoints son clones runtime del panel de la s9 (`data-map-lit` / `data-map-here`) + badge por id en `style.css` (reglas `deck-sdlc-part2 #slide-N .map-step-counter::after`).
> ⚠️ **FORJA s12 + CENTRADO s14 (12 oct 2026):** la s12 «El Peaje de Comprimir» abre en Charla con la **forja de la cuantización** (`script/img/forja-cuantizacion-fp8-a-nvfp4-clara.jpg`) como primer `.step` (`forja-intro`, overlay absoluto): el primer avance la disuelve y revela la gráfica base; los 4 pulsos siguientes son los de siempre; atrás/overview/print la ocultan. **Charla y Documento idénticos (2ª pasada):** tabla doc-only eliminada (HTML + CSS `quant-loss-table-*`); en doc la forja es overlay con `top: 16rem` (subtítulo se conserva). Detalle en `guion-discurso.md` («Estado técnico actual»). **s14:** el `translate` inicial de la caja equilibrista estaba desfasado (quedaba ~175px a la izquierda del centro): corregido a `translate(542px, -90px)` medido con Playwright (centro 959.6 ≈ 960; reposo intacto). La equiparación Charla/Documento aplicada por error a la s14 se revirtió (conserva subtítulo + `comp-detail` doc-only y animación solo en Charla); la paridad pedida iba por la **s12**: tabla doc-only eliminada y forja/gráfica con la misma interacción en ambos modos.
> ⚠️ **INTERCAMBIO 23↔24 y 25↔26 (12 oct 2026):** en la Parte 1 cada panel visual precede a su teoría: **s23 = Panel Denso** (dp-*, antes s24) · **s24 = Junta Médica** (antes s23) · **s25 = Panel MoE** (mp-*, antes s26) · **s26 = Triaje** (antes s25). Secciones movidas + ids renumerados (id = posición) + banners SLIDE N; en `style.css` solo se desplazaron los selectores dp-*/mp-* (los `#slide-24/26` de deck-sdlc-part2 no se tocan). Tarjeta del panel denso ahora dice «junta médica de la slide siguiente». Verificado (Playwright): ids contiguos, títulos por posición, pasos de paneles, doc/overview.
> ⚠️ **LA 27 (VIAJE) DELANTE DE LA 23 (12 oct 2026, 3ª permuta):** **s23 = El Viaje del Token** (vt-*, antes 27) y el bloque Densos/MoE pasa a **24-27** (panel denso 24 · junta 25 · panel MoE 26 · triaje 27). Sección movida + ids renumerados (id = posición) + banners; 139 líneas de CSS renumeradas con placeholder (vt-*→23, dp-*→24, mp-*→26; deck-sdlc-part2 intacto). Verificado (Playwright): ids contiguos, títulos por posición, pasos de viaje/dp/mp, doc/overview.
> ⚠️ **s18 POR PASOS (2 pulsos) + s27 ALINEADA (12 oct 2026):** la s18 «El Secreto de la Memoria Estable» entra por pasos (clases `hb-*`): inicial = **16 barras azules IDÉNTICAS** (4 Attention + 12 fantasmas `hb-ghost`) + **curva roja del OOM ya visible** (antes de los deltas); en Charla SIN tarjetas conceptuales (son doc-only; en doc = handout completo con porcentajes «25% / 75% de las capas» y cinta siempre visibles). **Pulso 1**: crecen las 12 verdes **sustituyendo a las fantasmas** (colapso a base + fade) + bracket 3:1 + píldora + leyendas. **Pulso 2 (foto final)**: curvas de la diferencia (azul híbrido ~10 GB + verde O(1)) + **cinta del resultado práctico**. **SVGs rediseñados a 740×530** (en Charla las gráficas pasan de 322 a ~544px de alto; doc viewport 320px). Backward-entry/overview/print = completo. **s27**: carril NVFP4 oculto hasta el PASO 2 (`g.vt-lane2`, no es `.step`; 3 pulsos intactos) — mismo patrón «cómo está → la diferencia» alineado con la s18. Detalle en `guion-discurso.md`.
> ⚠️ **RENUMERACIÓN PARTE 1 (10 oct 2026 · tarde):** la Parte 1 quedó reorientada narrativamente («Dueño del modelo, no del silicio») con la tabla de precios como slide 4 y la escalera + cierre nuevos al final. Tras las operaciones del día (rediseño nube/nerfeo en *press grids* + **inserción de la s29 «Anatomía del Silicio» y retoque con metáfora de la gallina en s28 por la sesión paralela**), los ids están renumerados para que **id = posición = contador** (53 slides contiguas, `slide-1`..`slide-53`; 28 = gallina prefill/decode · 29 = anatomía del silicio · 30 = tabla de carreras NVIDIA vs Apple vs AMD (7 columnas: BW · prefill 32k/200k 70B · prefill 200k MoE · decode 70B · decode MoE, con medallas por carrera y datos MoE MLX) · 51 = espionaje · 52 = nerfeo · 53 = la frase, cierre motivacional). Los componentes clave usan **clases sin ids** (finale-*, win-medal, race-table, kicker-doc-only, pd-wrap bias) para ser inmunes a futuras renumeraciones. Equivalencias y detalles en `guion-discurso.md` (sección «Estado técnico actual»). Los mensajes históricos de este documento conservan la numeración de su fecha.

---

## 📌 1. Resumen Ejecutivo del Estado Actual

Estamos construyendo y refinando la presentación técnica en diapositivas web interactivas (100% standalone, portables y sin dependencias de Node.js). El empaquetado se realiza con `python3 bundle.py` hacia la carpeta `dist/`.

### Los 3 decks del proyecto:
1. `dist/charla-parte1-hardware-modelos.html` (35 slides: Hardware, Cuantización, VRAM, Modelos locales; 23-24 panel visual Denso vs MoE y 25 el viaje del token, animadas por pasos).
2. `dist/charla-parte2-ciclo-desarrollo.html` (**26 slides actualmente**: Ciclo de Desarrollo con IA, Incepción, Especificación, DDD, TDD y Living Docs).
3. `dist/plantillas-referencia.html` (8 slides: Plantillas de referencia y prompt engineering).

---

## ✅ 2. Lo que se completó hoy (Fase 2: Especificación Viva — `/create-flow-documentation`)

Se ha dejado la **Fase 2 cerrada con máximo rigor artesanal** en `parte2-ciclo-desarrollo.html`:

1. **Diagramas Mermaid del flujo (Slides 11, 12 y 13):**
   - **Slide 11 (`#slide-phase2-diagram1-sequence`):** Diagrama de Secuencia (*Happy Path* y contratos entre capas).
   - **Slide 12 (`#slide-phase2-diagram2-flowchart`):** Diagrama de Flujo (*Flowchart* con ramas alternativas, edge cases y fallbacks).
   - **Slide 13 (`#slide-phase2-diagram3-state`):** Diagrama de Estados (*State Diagram* para la FSM del Aggregate Root).
   - *Nota:* Se resolvieron los contrastes y renderizado nítido de Mermaid en `style.css` (eliminando dependencias temporales de Node y manteniendo `script/vendor/mermaid.min.js` empaquetado).

2. **Matriz Conceptual y Plantillas de Contratos (Slides 14, 15 y 16):**
   - **Slide 14 (`#slide-phase2-invariants`):** Matriz comparativa entre **Reglas de Negocio (`BR-XXX`)** e **Invariantes de Dominio (`INV-XXX`)**.
   - **Slide 15 (`#slide-phase2-br-template`):** Plantilla real de Regla de Negocio basada en `sdlc/skills/create-flow-documentation/templates/business-rules.md`.
   - **Slide 16 (`#slide-phase2-inv-template`):** Plantilla real de Invariante de Dominio basada en `sdlc/skills/create-flow-documentation/templates/invariants.md`.

3. **Sección Especial de los Tres Pilares (Slides 26 a 33):**
   - **Slide 26 (`#slide-pillar-intro`):** Los Tres Pilares del Código con IA (ADRs, Inception/USM, Tests).
   - **Slide 27 (`#slide-pillar-adr-friction`):** Pilar 1 - La Fricción: Tus ADRs vs. El Pre-entrenamiento del Modelo (Guardrail Tax).
   - **Slide 28 (`#slide-pillar-adr-case-nextjs`):** Pilar 1 - Caso Real "POF!": *This is NOT the Next.js you know* (estampa gigante inclinada con la inyección de Vercel en `next dev` y la moraleja para el artesano).
   - **Slide 29 (`#slide-pillar-adr-timeline`):** Pilar 1 - El Ciclo Canónico de un ADR (5 tarjetas horizontales de izquierda a derecha con iconos luminosos y viñetas).
   - **Slide 30 (`#slide-pillar-adr-decision-tree`):** Pilar 1 - Gobernanza en Acción (Matriz de 4 rutas: Nueva Decisión, Enmienda, Deprecación, Radar).
   - **Slide 31 (`#slide-pillar-sdlc-timeline`):** Pilar 2 - El Ciclo Canónico del SDLC (5 fases: Inception, Specs, Dominio, TDD, Living Docs).
   - **Slide 32 (`#slide-pillar-sdlc-decision-tree`):** Pilar 2 - Producto en Acción (Matriz de 4 rutas: Discovery, Flow Specs, Domain Model, Zero Drift).
   - **Slide 33 (`#slide-pillar-bridge-enlace`):** La Conexión: Cómo todo enlaza en el repositorio.

4. **Arquitectura limpia:**
   - Cero dependencias npm/node huérfanas en el repo.
   - Fondos opacos en `.slide` para evitar sangrado de texto/elementos durante el cambio de diapositivas.
   - Empaquetado 100% autónomo y offline en `dist/charla-parte2-ciclo-desarrollo.html`.

---

## 🎯 3. Punto Exacto de Inicio para Mañana

El pipeline general (Slide 2) define 5 fases:
```
[Fase 1: Incepción] ➔ [Fase 2: Especificación] ➔ [Fase 3: Dominio DDD] ➔ [Fase 4: TDD] ➔ [Fase 5+: Evolución & Drift]
    /inception           /create-flow-doc       /create-entity-lifecycle   /implement-flow     /modify-flow & /audit-docs
```

### Tarea inmediata para el nuevo chat:
Actualmente, tras la Slide 16 (Invariantes), la presentación salta a la **Slide 17** (Fases 4 y 5+: TDD Híbrido y Living Docs sin Drift). **Falta la slide dedicada a la Fase 3**:

1. **Crear la diapositiva de la Fase 3: Modelo DDD Rico (`/create-entity-lifecycle`):**
   - **Skill de referencia:** `sdlc/skills/create-entity-lifecycle/SKILL.md`
   - **Plantilla de referencia:** `sdlc/skills/create-entity-lifecycle/templates/entity-lifecycle.md`
   - **Contenido clave a plasmar:**
     - Columna izquierda: Por qué modelar entidades ricas en lugar de modelos anémicos con *getters/setters* vacíos; cómo la IA respeta el espacio cerrado de estados.
     - Columna derecha: Terminal Markdown con la plantilla de ciclo de vida de la entidad (Aggregate Root, Value Objects inmutables, matriz de transiciones de estado, métodos de dominio y publicación de *Domain Events*).
     - Consistencia visual: Mantener el mismo layout pulido de dos columnas (hero box + points a la izquierda, terminal markdown a la derecha) usado en las slides 14, 15 y 16.
2. **Revisar y afinar las Fases 4 y 5+:**
   - Pulir la slide de TDD Híbrido por capas (`/implement-flow`).
   - Pulir la slide de Living Docs, cambio guiado y prevención de drift (`/modify-flow` y `/audit-docs`).

---

## 🛠️ 4. Comandos y Referencias Rápidas

- **Reempaquetar todo a producción (`dist/`):**
  ```bash
  python3 bundle.py
  ```
- **Ficheros clave de edición:**
  - Diapositivas Parte 2: `parte2-ciclo-desarrollo.html`
  - Estilos globales: `style.css`
  - Motor de diapositivas: `slides.js`
  - Habilidades SDLC: carpeta `sdlc/skills/`
- **Navegación directa en navegador:**
  - Abrir `dist/charla-parte2-ciclo-desarrollo.html` y usar `#14`, `#15`, `#16` o `#17` para saltar directamente a la zona de trabajo.
