# AI Local Crafters — Charlas (decks HTML interactivos)

Presentación técnica en diapositivas web interactivas (100% standalone, sin dependencias Node).
Cada deck es un HTML plano + `style.css` (global) + `slides.js` (motor). El empaquetado a
producción lo hace `bundle.py` hacia `dist/` (CSS/JS/imágenes inline en un único archivo portable).

## Los 3 decks

| Deck | Fuente | Contenido |
|---|---|---|
| `dist/charla-parte1-hardware-modelos.html` | `index.html` (`body.deck-hardware-part1`) | 53 slides: Hardware, Cuantización, VRAM, Modelos locales |
| `dist/charla-parte2-ciclo-desarrollo.html` | `parte2-ciclo-desarrollo.html` (`body.deck-sdlc-part2`) | 45 secciones · 17 visibles en charla: Ciclo de Desarrollo con IA |
| `dist/plantillas-referencia.html` | `templates.html` | 8 slides: Plantillas de referencia y prompt engineering |

## Convenciones del sistema de slides

- **id = posición**: `slide-1` es la primera, `slide-N` la N-ésima. El contador del HUD y la
  navegación por hash (`#slide-41`) dependen de esto. Nunca mover una slide sin renumerar.
- **Modos**: Charla (talk, por defecto) y Documento (`body.mode-document`). Lo marcado
  `doc-only` solo se ve en Documento (slides enteras, columnas de tablas, banners…).
- **Slides interactivas por pasos**: elementos `.step` que evolucionan con «siguiente».
  Todo es relativo a la slide activa (`.step-active`, `data-active-steps`, `data-step`), así
  que reordenar/renumerar no los rompe. Los estados por paso en CSS se anclan a
  `#slide-N:has(...)` / `#slide-N[data-active-steps="N"]` → el script los renumera.
- **Clases inmunes a renumeraciones**: los componentes nuevos deberían keyarse por clases
  (finale-*, press-grid, goldilocks-*, …) y no por id, para sobrevivir a futuros movimientos.

## Comandos y referencias rápidas

```bash
# Reempaquetar todo a producción (dist/)
python3 bundle.py

# Ver el orden actual de un deck (y detectar ids desalineados)
python3 script/reorder_slides.py index.html order

# Mover slides (SIEMPRE renumera a continuación: id = posición)
python3 script/reorder_slides.py index.html move 51 52 after 5
python3 script/reorder_slides.py index.html move 23 before 8
python3 script/reorder_slides.py index.html move 23 to 5     # por posición destino

# Solo renumerar en sitio (id = posición actual)
python3 script/reorder_slides.py index.html renumber

# Alinear banners de comentario `SLIDE N:` con la sección que les sigue
python3 script/reorder_slides.py index.html fix-banners

# Varias: --dry-run (solo plan) · --css style.css · --bundle (ejecuta bundle.py al final)
python3 script/reorder_slides.py index.html move 51 after 5 --dry-run --bundle
```

### Qué renumera `reorder_slides.py`

1. **El deck HTML**: ids `slide-N` (dos fases, sin cascadas) y banners `SLIDE N:`.
2. **`style.css`**: solo los selectores `#slide-N` del deck objetivo. Distingue decks por la
   clase del `<body>`; para selectores sin scope clasifica por evidencia de clases
   (¿existen esas clases dentro de la slide N de cada deck? y fallback global). Los dudosos
   se listan y **no se tocan** (report manual al final).
3. **Pasos e interactividad**: no requiere tratamiento especial — el motor es genérico y el
   CSS por pasos va anclado a `#slide-N`, que ya se renumera.

### Ficheros clave

- Diapositivas Parte 1: `index.html` · Parte 2: `parte2-ciclo-desarrollo.html` · Plantillas: `templates.html`
- Estilos globales: `style.css` · Motor: `slides.js` · Empaquetado: `bundle.py`
- Guion de la charla: `guion-discurso.md` (si mueves slides, revisa sus referencias a mano)
- Habilidades SDLC: `sdlc/skills/`

### Navegación directa en navegador

Abrir el deck de `dist/` y usar `#slide-41` (o `#41`) para saltar a una slide; `#last` para la última.
