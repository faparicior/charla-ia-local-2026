# 🎤 Guion de Discurso — AI Local Crafters

> Charla en dos partes · Decks HTML 1920×1080
> Parte 1: `index.html` (44 secciones · contador 45, hardware & modelos) · Parte 2: `parte2-ciclo-desarrollo.html` (**38 slides — incluye 3 checkpoints del mapa**)
> Presentar desde `dist/` (`python3 bundle.py` reempaqueta). Recarga forzada (Ctrl+Shift+R) si acabas de editar.

**Teclas de modo** (idénticas en ambas partes):
- `←/→` o clic: navegar · contador arriba a la izquierda
- `d`: **Modo Documento** (todo el detalle) ↔ Modo Charla (lo esencial para proyectar)
- `t`: tema claro/oscuro · `o`: overview
- Regla del deck: **en Charla se proyecta lo esencial; el detalle vive en Documento**.

---

# PARTE 2 — El Ciclo de Desarrollo con IA (38 slides)

El hilo en una frase: *«el embudo convierte caos en certeza; las 5 fases lo convierten en software; la gobernanza impide que la IA lo destruya»*.

**El recurso de las estaciones**: la slide 6 presenta el mapa interactivo (9 pasos, clic a clic). Tres **checkpoints** (16, 21, 26) re-clavan el mapa entre bloques con la fase actual brillando y la etiqueta 📍 *"Estamos aquí"* — el público nunca pierde el hilo de dónde está. Ocultos en Documento.

## Bloque A — Apertura (1-6): el porqué y el marco

| # | Slide | Qué contar |
|---|-------|-----------|
| 1 | **El Embudo del SDLC: Del Caos a la Certeza** | Hook: variabilidad de la IA → reducirla con proceso. |
| 2 | **Paradigma Cloud** | API token, fuerza bruta: potencia a cambio de control y coste. |
| 3 | **Paradigma Local** | Tracción, control, coste cero. |
| 4 | **Los Tres Pilares** | Marco: proceso + gobernanza + ergonomía (AX). |
| 5 | **Pipeline: 5 Fases Disciplinadas** | El esqueleto: Inception → Especificación → Dominio → Construcción → Evolución. |
| 6 | **El Mapa Real del SDLC** 🖱️ | Mapa interactivo: 9 pasos clic a clic, silueta completa siempre visible. *La promesa de la charla hecha imagen.* |

**Puente A→B (6→7):** *"Entramos en la Fase 1: el taller de Inception, paso a paso."*

## Bloque B — Fase 1: Inception Workshop (7-15)

| # | Slide | Qué contar |
|---|-------|-----------|
| 7 | **Paso 1: Matriz de Fronteras (IS/IS NOT)** | Anclar qué es y qué NO es el producto. |
| 8 | **Paso 2: Tablero de Tradeoffs** | Prioridades relativas pactadas antes de descubrir (Regla de Oro 1-7). |
| 9 | **Paso 3: User Personas** | ¿Para qué artesano diseñamos? |
| 10 | **Paso 4: Mapa de Empatía** | Dolores y alegrías antes de diseñar la experiencia. |
| 11 | **Paso 5: User Journey Mapping** | El recorrido E2E: los gaps guían la solución. |
| 12 | **Paso 6: Feature Brainstorming** | Las features brotan de los gaps del journey, no del vacío. |
| 13 | **Paso 7: Secuenciador de Olas** | Wave 1/2/3 por valor, esfuerzo y dependencias. |
| 14 | **Paso 8: Contrato MVP** | El "system prompt supremo": hipótesis, alcance, falsación. |
| 15 | **Greenfield vs. Brownfield** | Charla = franja de flujo: 🌱 1→8 vs 🏭 desde el código 1→3→**6⇄5**→7 (swap 6⇄5; 2·4 diferidos). Documento = tabla 8v8 interactiva. |

**Puente B→C (15→16→17):** *"El taller da el mapa... y la estación del mapa (16) lo re-clava: **estamos aquí — Fase 2**. La especificación viva lo ejecuta."*

## Bloque C — Fases 2, 2b y 3: de la especificación al dominio (17-25)

| # | Slide | Qué contar |
|---|-------|-----------|
| 17 | **Fase 2 · 1. Diagrama de Secuencia** | El flujo como secuencia con bloques `rect` por método. |
| 18 | **Fase 2 · 2. Flowchart de Decisiones** | La lógica ramificada y los outcomes. |
| 19 | **Fase 2 · 3. Ciclo de Vida (FSM)** | El `stateDiagram-v2` de la entidad. ⚠️ *Este diagrama ES el artefacto de la Fase 3.* |
| 20 | **Fase 2b: Features (Slicing Vertical)** | `/create-features`: cada feature = un ciclo TDD completo (contrato de errores HTTP + checklist). |
| **21** | **📍 Checkpoint del mapa: Fase 3** | Estación: todo lo anterior encendido, **Dominio brillando**. *"Con las features listas, blindamos el dominio."* |
| 22 | **Fase 3: Ciclo de Vida de la Entidad** | Del FSM (19) al contrato formal: FSM + matriz de transiciones. |
| 23 | **Fase 3: Reglas vs. Invariantes** | BR (orquestación, flexible) vs INV (cero tolerancia, rollback). |
| 24 | **Fase 3: Plantilla de Regla (BR)** | Anatomía de una BR real (BR-004 free tier). |
| 25 | **Fase 3: Plantilla de Invariante (INV)** | Anatomía de una INV real. |

**Puente C→D (25→26→27):** *"El dominio está blindado... la estación (26) ilumina la banda ADR: **¿quién garantiza que se respeta?**"*

## Bloque D — Gobernanza: ADRs y ciclos canónicos (27-33)

| # | Slide | Qué contar |
|---|-------|-----------|
| 27 | **La Fricción: ADRs vs. Pre-entrenamiento** | El conocimiento del repo compite con el pre-entrenado. |
| 28 | **Guardrail Tax (Next.js 16.3+)** | Caso real: "This is NOT the Next.js you know". |
| 29 | **El Artefacto Inyectado (AGENTS.md)** | Cómo se materializa el guardrail. |
| 30 | **El Ciclo Canónico de un ADR** | De la duda a la ley. |
| 31 | **Gobernanza en Acción (Decision Tree ADR)** | De la intención a la ruta óptima. |
| 32 | **El Ciclo Canónico del SDLC** | *Puente: "el mapa de la 6, ahora como pilar canónico".* |
| 33 | **Producto en Acción (Decision Tree)** | De la necesidad al artefacto. |

**Puente D→E (33→34):** *"Ya tenemos ciclo y gobernanza. ¿Dónde viven los artefactos? → El repositorio."*

## Bloque E — Cierre técnico (34-38)

| # | Slide | Qué contar |
|---|-------|-----------|
| 34 | **La Conexión** | El repo como sistema nervioso: `docs/adr/` → `docs/product/` → `packages/`. (Estático.) |
| 35 | **El Viaje de una Petición E2E** 🖱️ | Capstone dinámico: Usuario → Controlador → Caso de Uso (BR) → Dominio (INV) → Persistencia → retorno 201. **Filtro de audiencia**: 👔 / 🛠️ / 🌐. |
| 36 | **Evolución sin Drift: TDD Híbrido** | Fases 4-5: `/implement-flow` (TDD) + `/modify-flow` (cambio) + `/audit-docs` (cero drift). *"Las fases 1-3 en detalle; 4-5 son esta slide".* |
| 37 | **Frase de Cierre** | "La verdadera maestría artesanal consiste en entender y controlar las herramientas que moldean nuestro código." — pausa. |
| 38 | **Preguntas & Debate** | Cierre. Back-bar "← Frase de Cierre". |

## Cheat-sheet de puentes hablados (Parte 2)

1. 6→7: *"del mapa al taller"* · 15→16: *"el taller da el mapa; la estación lo re-clava"*
2. 19→20: *"el FSM dice DÓNDE; el slicing dice en qué ORDEN"* · 20→21: *"features listas → estación: el dominio"*
3. 25→26: *"¿quién blinda esto? → la banda ADR"* (el salto temático grande, ahora visualizado)
4. 31→32: *"el ADR gobierna decisiones; el índice gobierna el flujo"*
5. 33→34: *"¿dónde viven? → el repo"* · 34→35: *"los enlaces son estáticos; veamos una petición viva"*
6. 35→36: *"y el sistema sigue vivo: TDD + cambio sin drift"* → 37: pausa → quote

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
2. **Bloque G como mini-arco** (26→35): *el problema* (viaje del token) → *el estado del arte* (timeline 2026 + técnicas MTP/DFlash/DSpark/DFlash 2) → *el colofón* (caso DeepSeek: cronología y hackeo) → *la conclusión* (tabla "¿cuándo usar qué?"). Anunciar el arco en la 26.
3. **Slide 44 (contador)**: verbalizar los badges "OBSOLETO" (registro de descartes) y cerrar con el puente a parte 2 (el CTA ya existe).
4. **Ritmo**: ~30 min; el bloque D es el candidato a resumirse en vivo (*"4 bits bastan si se compensa"*).

## Propuesta de ocultación en Modo Charla (solo propuesta — sin aplicar en los decks)

Criterio: lo que es **anatomía interna, investigación de frontera o caso histórico detallado** se oculta del modo presentación y queda vivo en Documento para **formación profunda**.

### Parte 1 — candidatas a ocultar

| Pos | Slide | Por qué |
|-----|-------|---------|
| 13 | El Equilibrista de la Inferencia (AutoRound) | Mecanismo interno de compensación |
| 14 | GSQ + RCO (abismo 2-3 bits) | Investigación de frontera, la más densa |
| 17 | DeltaNet vs. Attention | Arquitectura interna; la Pizarra/Archivador (18) sostiene la idea |
| 19 | Escalando a 1 Mega con YaRN | Técnica muy específica |
| 28-31 | MTP · DFlash · DSpark · DFlash 2 | Las 4 técnicas en detalle; el timeline (27) ya las pinta a alto nivel |
| 32-33 | Caso DeepSeek (cronología + hackeo) | El caso histórico completo — tú ya la marcaste |
| 38 | Por dentro: cinco piezas en 48 capas | Anatomía interna |

**A decidir en el ensayo:** 8 (GPUs de terceros), 20 (3 Niveles de Atención — la IBAN (21) se explica sola pero pierde el detalle).

**Se quedan sí o sí:** 15 NVFP4 y 16 AutoRound INT4 (punchlines), 18 Pizarra/Archivador, 21 IBAN, 22-25 (densos vs MoE), 26 (viaje del token), 27 (timeline), **34 (resumen de aceleración)**, 35 (matriz ricitos), 36-37 y 39-44 (elección, aparato, handoff).

### Parte 2 — candidatas a ocultar

| Pos | Slide | Por qué |
|-----|-------|---------|
| 24-25 | Plantillas BR e INV | Anatomía; la 23 ya fija el concepto BR vs INV |
| 32 | El Ciclo Canónico del SDLC | Repite el ciclo de las 5-6; puente directo 31→33 |

**Candidata:** 18 (Flowchart de decisiones) si el tiempo aprieta.

**Se quedan:** mapa (6), checkpoints (16/21/26 — ya ocultos en Documento por diseño), franja G/B (15), 20-23, capstone E2E (35), TDD (36), quote (37).

### Cómo ocultar cuando apruebes la lista (mecanismo pendiente)

Atributo `data-charla-hidden` en la `<section>` + `slides.js` lo salta en Modo Charla (flechas, contador y overview), visible en Documento (`d`) y en export/PDF. Un solo fichero, dos formatos.

---

# Estado técnico actual

- **Parte 1: 44 secciones (contador 45)** — caso DeepSeek movido al final del bloque de aceleración (32-33) y **nueva slide 34 "Las Cuatro Vías de Aceleración: ¿Cuándo usar qué?"** (id `slide-27b`, clon del sistema goldilocks: tabla con ganancias reales ×3 / ~3× / +60-85% / ~3.4× + banner "La Regla Práctica").
- **Parte 2: 38 slides** — 3 **checkpoints del mapa** (16, 21, 26): clon runtime del panel del mapa (sin tocar slides.js: el clon pierde la clase `step` para que el motor no interfiera; el CSS del mapa se copió re-scoped a `.map-ckpt-host`); contador del mapa repurposed como etiqueta 📍 "Estamos aquí"; ocultos en Documento. El Viaje E2E (35) como capstone, TDD (36), Quote (37), Q&A (38). Cliente local eliminado.
- Coherencia: back-bars encadenados slide a slide en ambos decks; banners `SLIDE N` renumerados a posición real.
