# 🎤 Guion de Discurso — AI Local Crafters

> Charla en dos partes · Decks HTML 1920×1080
> Parte 1: `index.html` (44 secciones · contador 45, hardware & modelos) · Parte 2: `parte2-ciclo-desarrollo.html` (35 slides, el ciclo de desarrollo)
> Presentar desde `dist/` (`python3 bundle.py` reempaqueta). Recarga forzada (Ctrl+Shift+R) si acabas de editar.

**Teclas de modo** (idénticas en ambas partes):
- `←/→` o clic: navegar · número del contador arriba a la izquierda
- `d`: **Modo Documento** (todo el detalle: descripciones, plantillas completas, tablas interactivas) ↔ Modo Charla (lo esencial para proyectar)
- `t`: tema claro/oscuro · `o`: overview de todas las slides
- La regla del deck: **en Charla se proyecta lo esencial; el detalle vivo está en Documento** (así lo hacen las slides de plantillas y comparativas).

---

# PARTE 2 — El Ciclo de Desarrollo con IA (35 slides)

El hilo en una frase: *«el embudo convierte caos en certeza; las 5 fases lo convierten en software; la gobernanza impide que la IA lo destruya»*.

## Bloque A — Apertura (1-6): el porqué y el marco

| # | Slide | Qué contar |
|---|-------|-----------|
| 1 | **El Embudo del SDLC: Del Caos a la Certeza** | Hook: variabilidad de la IA → reducirla con proceso. El embudo define la charla entera. |
| 2 | **Paradigma Cloud** | API token, fuerza bruta: potencia a cambio de control y coste. |
| 3 | **Paradigma Local** | Tracción, control, coste cero: los modelos de parte 1 en tu mesa. |
| 4 | **Los Tres Pilares** | El marco: código de calidad con IA = proceso + gobernanza + ergonomía (AX). |
| 5 | **Pipeline: 5 Fases Disciplinadas** | El esqueleto: Inception → Especificación → Dominio → Construcción → Evolución. |
| 6 | **El Mapa Real del SDLC** 🖱️ | El mapa interactivo (9 pasos, clic fase a fase, contador 0→9). *Dedicarle tiempo: es la promesa de la charla hecha imagen.* |

**Puente A→B (6→7):** *"Entramos en la Fase 1: el taller de Inception, paso a paso."*

## Bloque B — Fase 1: Inception Workshop (7-15)

| # | Slide | Qué contar |
|---|-------|-----------|
| 7 | **Paso 1: Matriz de Fronteras (IS/IS NOT)** | Anclar qué es y qué NO es el producto. |
| 8 | **Paso 2: Tablero de Tradeoffs** | Prioridades relativas pactadas ANTES de descubrir (Regla de Oro 1-7). |
| 9 | **Paso 3: User Personas** | ¿Para qué artesano diseñamos? |
| 10 | **Paso 4: Mapa de Empatía** | Dolores y alegrías antes de diseñar la experiencia. |
| 11 | **Paso 5: User Journey Mapping** | El recorrido E2E: los gaps guían la solución. |
| 12 | **Paso 6: Feature Brainstorming** | Las features brotan de los gaps del journey, no del vacío. |
| 13 | **Paso 7: Secuenciador de Olas** | Wave 1/2/3 por valor, esfuerzo y dependencias. |
| 14 | **Paso 8: Contrato MVP** | El "system prompt supremo": hipótesis, alcance, falsación. |
| 15 | **Greenfield vs. Brownfield** | Charla = franja de flujo: 🌱 1→8 canónico vs 🏭 desde el código 1→3→**6⇄5**→7 (swap del inventario inverso antes del journey; 2·4 diferidos). Documento = tabla 8v8 interactiva con tabs (all/core/swap). |

**Puente B→C (15→16):** *"El taller da el mapa. La Fase 2 lo convierte en especificación viva."*

## Bloque C — Fases 2, 2b y 3: de la especificación al dominio (16-23)

| # | Slide | Qué contar |
|---|-------|-----------|
| 16 | **Fase 2 · 1. Diagrama de Secuencia** | El flujo como secuencia con bloques `rect` por método. |
| 17 | **Fase 2 · 2. Flowchart de Decisiones** | La lógica ramificada y los outcomes. |
| 18 | **Fase 2 · 3. Ciclo de Vida (FSM)** | El `stateDiagram-v2` de la entidad. ⚠️ *Este diagrama ES el artefacto de la Fase 3: la skill lo genera y valida contra la matriz.* |
| 19 | **Fase 2b: Features (Slicing Vertical)** | `/create-features` trocea el flow en features numeradas: cada feature = un ciclo TDD completo (contrato de errores HTTP 201/409/403/400 + checklist). |
| 20 | **Fase 3: Ciclo de Vida de la Entidad** | Del diagrama FSM (18) al contrato formal: FSM + matriz de transiciones. *Decir: "lo que ven en la plantilla es exactamente el diagrama de la 18".* |
| 21 | **Fase 3: Reglas vs. Invariantes** | BR (orquestación, flexible) vs INV (cero tolerancia, rollback). |
| 22 | **Fase 3: Plantilla de Regla (BR)** | Anatomía de una BR real (BR-004 free tier). |
| 23 | **Fase 3: Plantilla de Invariante (INV)** | Anatomía de una INV real. |

**🔴 Puente crítico C→D (23→24):** *"¿Y quién garantiza que todo esto se respeta cuando la IA escribe el código? → Gobernanza."*

## Bloque D — Gobernanza: ADRs y ciclos canónicos (24-30)

| # | Slide | Qué contar |
|---|-------|-----------|
| 24 | **La Fricción: ADRs vs. Pre-entrenamiento** | El conocimiento del repo compite con el pre-entrenado del modelo. |
| 25 | **Guardrail Tax (Next.js 16.3+)** | Caso real: "This is NOT the Next.js you know". |
| 26 | **El Artefacto Inyectado (AGENTS.md)** | Cómo se materializa el guardrail. |
| 27 | **El Ciclo Canónico de un ADR** | De la duda a la ley (flujo secuencial). |
| 28 | **Gobernanza en Acción (Decision Tree ADR)** | De la intención a la ruta óptima. |
| 29 | **El Ciclo Canónico del SDLC** | *Puente: "el mapa de la slide 6, ahora como pilar canónico de la skill".* |
| 30 | **Producto en Acción (Decision Tree)** | De la necesidad al artefacto. |

**Puente D→E (30→31):** *"Ya tenemos el ciclo y la gobernanza. ¿Dónde viven los artefactos? → El repositorio."*

## Bloque E — Cierre técnico (31-35)

| # | Slide | Qué contar |
|---|-------|-----------|
| 31 | **La Conexión** | El repo como sistema nervioso: `docs/adr/` → `docs/product/` → `packages/`. (Estático.) |
| 32 | **El Viaje de una Petición E2E** 🖱️ | Capstone dinámico: Usuario → Controlador → Caso de Uso (BR) → Dominio (INV) → Persistencia → retorno 201. **Filtro de audiencia**: 👔 negocio / 🛠️ técnica / 🌐 compartida — *útil para re-anclar según el público.* |
| 33 | **Evolución sin Drift: TDD Híbrido** | Las fases 4-5: `/implement-flow` (TDD capa a capa) + `/modify-flow` (protocolo de cambio) + `/audit-docs` (cero drift). *Decir: "las fases 1-3 en detalle; 4-5 son esta slide".* |
| 34 | **Frase de Cierre** | "La verdadera maestría artesanal consiste en entender y controlar las herramientas que moldean nuestro código." — pausa y silencio. |
| 35 | **Preguntas & Debate** | Cierre. Back-bar "← Frase de Cierre". |

## Resumen de puentes hablados (cheat-sheet)

1. 6→7: *"del mapa al taller"* · 15→16: *"del taller al contrato"*
2. 18→19: *"el FSM dice DÓNDE; el slicing dice en qué ORDEN"*
3. 19→20: *"la feature es la unidad de trabajo; la Fase 3 blinda el modelo"*
4. **23→24: "¿quién blinda esto? → gobernanza"** (el salto temático más grande de la charla)
5. 28→29: *"el ADR gobierna decisiones; el índice gobierna el flujo"*
6. 30→31: *"¿dónde viven? → el repo"* · 31→32: *"los enlaces son estáticos; veamos una petición viva"*
7. 32→33: *"y el sistema sigue vivo: TDD + cambio sin drift"* · 33→34: pausa → quote

---

# PARTE 1 — Hardware & Modelos (44 secciones · contador 45) · Evaluación

> ⚠️ **Numeración**: en Parte 1 el contador en pantalla va **+1** respecto a las posiciones de estas tablas (la portada no lleva id numérico; los banners/ids llevan su propia serie). Ej.: la Matriz de Pesos = pos 34 aquí = **contador 35**. "La 28 y la 29" del usuario = Cronología DeepSeek + Hackeo NVIDIA.

El hilo en una frase: *«el bufé cloud se acabó → el local es viable si entiendes memoria, arquitectura y velocidad → elegimos modelos → sobrevivimos al hardware»*.

## Estructura por bloques (evaluación)

| Bloque | Slides | Juicio |
|--------|--------|--------|
| A. Crisis cloud (1-4) | Fin del bufé → choque de precios → Copilot refunds → cloud occidental/asiático | ✅ Hook fuerte, arco "por qué" impecable |
| B. Infraestructura (5-8) | GPUs cloud vs local → radar 4 alternativas → costes 1M tokens → GPUs de terceros | ✅ Suelta la decisión económica |
| C. Trilema & memoria (9-11) | Trilema → pesos vs KV cache → peaje de comprimir | ✅ Fundamenta lo que viene |
| D. Cuantización avanzada (12-16) | Benchmark dominó → equilibrista AutoRound → GSQ+RCO → NVFP4 → AutoRound INT4 MoE | ⚠️ El bloque más denso: 5 slides de cuantización seguidas. Visualmente ya corregidas (HUD 16/17). **Necesita puentes hablados**, ver abajo |
| E. Atención & memoria (17-21) | DeltaNet → pizarra/archivador → YaRN 1M → 3 niveles de atención → analogía IBAN | ✅ Muy bien hilado (la IBAN es oro pedagógico) |
| F. Densos vs MoE (22-25) | Junta médica → 48 luces → triaje → router 5/48 | ✅ Contraste perfecto |
| G. Velocidad (26-34) | Viaje del token → timeline 2026 → MTP → DFlash → DSpark → DFlash 2 → **caso DeepSeek (cronología + hackeo)** → **resumen de aceleración (nueva 34, estilo "ricitos de oro")** | ✅ Reordenado + resumen nuevo: técnicas → caso → tabla ¿cuándo usar qué? |
| H. La elección (35-39) | Matriz ricitos de oro → escogiendo modelos → Qwen 3.8 Flash → por dentro 48 capas → la decisión | ✅ Funnel bien resuelto |
| I. El aparato (40-43) | ¡Llegó el aparato! → Drama Blackwell GB10 ×2 → Hackeando el hierro | ✅ Saga narrativa potente de cierre |
| J. Handoff (44) | Los 2 Modelos Escogidos → link a Parte 2 | ✅ Puente natural entre partes |

## Ajustes sugeridos para la Parte 1

1. **Títulos duplicados (40/41)**: las dos slides "El Drama de Blackwell GB10: La odisea en los foros" tienen exactamente el mismo h2. Sugerencia: diferenciar — *"El Drama de Blackwell GB10 — I. La Cronología"* (timeline foros) y *"— II. La Promesa Incumplida"* (el diálogo NVFP4 "me dijiste que podría… / no dije cuándo").
2. **Puente D→E (16→17)**, hoy implícito: *"ya sabemos comprimir el modelo; ahora ¿dónde vive esa memoria comprimida?"* — convierte 5 slides técnicas en dos preguntas seguidas.
3. **Bloque G como mini-arco** (26→34): narrarlo en 3 actos — *el problema* (la velocidad es memoria: viaje del token), *el estado del arte* (timeline 2026 y las técnicas: MTP, DFlash, DSpark, DFlash 2), *el colofón* (el caso DeepSeek: cronología y hackeo a NVIDIA) y *la conclusión* (la nueva tabla "¿cuándo usar qué?"). Anunciar el arco en la 26 evita la sensación de "muchas slides parecidas".
4. **Slide 44 (contador)**: los badges "OBSOLETO" del histórico de selección conviene verbalizarlos ("esto es el registro de lo que descartamos y por qué") para que no se lean como error. Y cerrar con el puente a la parte 2: *"con estos dos modelos: ¿qué construimos y CÓMO? → Parte 2"* (el CTA de navegación ya existe).
5. **Ritmo**: la parte 1 aguanta ~30 min; el bloque D es donde el público no técnico se puede ir — es el candidato a resumirse en vivo ("en la slide está el detalle; la conclusión es: 4 bits son suficientes si se compensa").

## Propuesta de ocultación en Modo Charla (solo propuesta — sin aplicar en los decks)

Criterio: en Charla se proyecta lo que sostiene el discurso; lo que es **anatomía interna, investigación de frontera o caso histórico detallado** se oculta del modo presentación y queda vivo en Documento para **formación profunda** (workshops, masterclass de hardware).

### Parte 1 — candidatas a ocultar

| Pos | Slide | Por qué ocultar |
|-----|-------|-----------------|
| 13 | El Equilibrista de la Inferencia (AutoRound) | Mecanismo interno de compensación; el "peaje de comprimir" (11) ya plantea el problema |
| 14 | GSQ + RCO (abismo 2-3 bits) | Investigación de frontera, la más densa del deck |
| 17 | DeltaNet vs. Attention | Arquitectura interna; la analogía Pizarra/Archivador (18) sostiene la idea sin ella |
| 19 | Escalando a 1 Mega con YaRN | Técnica de extensión de contexto, muy específica |
| 28-31 | MTP · DFlash · DSpark · DFlash 2 | Las 4 técnicas en detalle: el timeline de aceleradores (27) ya las presenta a alto nivel |
| 32-33 | Caso DeepSeek (cronología + hackeo NVIDIA) | El caso histórico completo — tú ya la marcaste como candidata |
| 38 | Por dentro: cinco piezas en 48 capas | Anatomía interna del modelo escogido |

**Candidatas a decidir en el ensayo:** 8 (Alquilar GPUs a terceros — puede vivirse con la 7), 20 (3 Niveles de Atención — si se oculta, la IBAN (21) se explica sola pero pierde el detalle previo).

**Se quedan sí o sí (columna vertebral en vivo):** 15 NVFP4 y 16 AutoRound INT4 (los punchlines, ya pulidas), 18 Pizarra/Archivador, 21 IBAN, 22-25 (densos vs MoE), 26 (viaje del token), 27 (timeline 2026), **34 (resumen de aceleración, nueva)**, 35 (matriz ricitos de oro), 36-37 y 39-44 (elección, aparato, handoff).

### Parte 2 — candidatas a ocultar

| Pos | Slide | Por qué ocultar |
|-----|-------|-----------------|
| 22-23 | Plantillas BR e INV | Anatomía de plantillas; la 21 ya fija el concepto BR vs INV, y quedan simplificadas para quien quiera verlas |
| 29 | El Ciclo Canónico del SDLC | Repite el ciclo ya visto en 5-6; si se oculta, puente directo 28→30 |

**Candidata:** 17 (Flowchart de decisiones) si el tiempo aprieta — la secuencia (16) y el FSM (18) cubren la idea.

**Se quedan:** mapa (6), franja G/B (15), 19-21, capstone E2E (32), TDD (33), quote (34).

### Cómo ocultar cuando apruebes la lista (mecanismo pendiente)

Plan técnico propuesto: atributo `data-charla-hidden` en la `<section>` + `slides.js` lo salta en Modo Charla (flechas, contador y overview no lo cuentan), pero permanece **visible en Modo Documento (`d`)** y en export/PDF. Así el deck sirve a los dos formatos sin duplicar ficheros.

## Coherencia entre partes (chequeo hecho)

- Back-bar de la slide 1 de parte 2 → `index.html#last` (última de parte 1) ✔ · CTA de la 43 de parte 1 → `parte2-ciclo-desarrollo.html` ✔
- Cadena de back-bars de parte 2 verificada slide a slide (todas apuntan a su anterior lógico; la Q&A apunta a la frase de cierre) ✔
- Comentarios `SLIDE N` renumerados según posición (35 slides) ✔

---

# Estado técnico actual

- **Parte 1: 44 secciones (contador 45)** — caso DeepSeek (cronología + hackeo) **movido al final del bloque de aceleración** (posiciones 32-33, tras DFlash 2) y **nueva slide 34 "Las Cuatro Vías de Aceleración: ¿Cuándo usar qué?"** (id `slide-27b`, clon del sistema goldilocks de la Matriz de Pesos: tabla MTP/DFlash/DSpark/DFlash 2 con ganancias reales ×3 / ~3× / +60-85% / ~3.4× + banner "La Regla Práctica").
- **Parte 2: 35 slides** tras la cirugía del hilo: eliminada la slide del cliente local (era un inciso técnico perdido), **El Viaje de una Petición E2E movida a capstone** (tras La Conexión), TDD Híbrido cerrando contenido, Quote → Q&A.
- Slides de plantillas (17-23 de parte 2): Charla simple / Documento completo (sin cajas en Charla, banner compacto).
- Slide 15: franja de flujo Greenfield/Brownfield en Charla (swap 6⇄5 resaltado con pulso) / tabla 8v8 interactiva en Documento.
- Mapa SDLC (6): clic por fases, 9 pasos, silueta completa siempre visible.
- CSS muerto residual: las reglas de `.slide[id="slide-local-inference-client"]` en `style.css` (líneas ~14867) quedan huérfanas tras borrar la slide — inofensivas, se pueden limpiar otro día.
