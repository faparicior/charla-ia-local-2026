# 🚀 AI Local Crafters — Estado del Proyecto y Hoja de Ruta

> **Fecha de actualización:** 8 de Octubre de 2026  
> **Propósito:** Documento de contexto para retomar el trabajo en un chat nuevo sin perder nada de contexto.

> ⚠️ **RENUMERACIÓN PARTE 1 (8 oct 2026):** tras insertar la slide 4 («El choque de precios II: la caja se disparó»), los ids de `index.html` están renumerados para que **id = posición = contador** (48 slides contiguas, `slide-1`..`slide-48`). Equivalencias y detalles en `guion-discurso.md` (sección «Estado técnico actual»). Los mensajes históricos de este documento conservan la numeración de su fecha.

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
