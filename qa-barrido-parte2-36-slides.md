# QA — Barrido completo Parte 2 (36 slides, Modo Charla)

> **Fecha:** 19 sep, tras aplicar fixes de contraste/banner a slides 4-11 (commit `d2b1299`).
> **Método:** Playwright + Chrome headless, 1920×1080, steps revelados (`.step-active`), una captura por slide (`/tmp/sweep-p2-s1..36.png`). Sondeo automático: elemento más bajo (overflow), banner, contraste real (WCAG con bg compuesto) de primer badge, h2 y pill por slide.
> **Verificación extra:** modo documento intacto en s5/s17/s24 tras el cleanup de `doc-only` (banners + descs + hero-subs visibles ✓).

## Resultado global

| Check | Resultado |
|---|---|
| **Overflow (y>1012)** | **0 de 36 slides** ✓ |
| Banner "Regla de Oro" visible en charla | 8/8 slides de pasos ✓ + s3, s12, s27 |
| Banner oculto (deliberado phase2/pillar) | 9: s13-18, s22, s24, s26 — ver hallazgo 2 |
| Modo documento tras cleanup | intacto ✓ |

## Hallazgo 1 — CRÍTICO: contraste roto en Pilares y cierre (slides 19-27)

Las slides fuera del alcance revisado nunca recibieron la pasada de 600/700. Aquí el problema es **mayor que en 4-11**: h2s con 1.9-2.4:1.

| Slide | id | h2 span | ratio | badge | ratio |
|---|---|---|---|---|---|
| 19 | adr-friction | `#f59e0b` | **1.90** ✗✗ | `#0284c7` | 3.63 ✗ |
| 20 | adr-case-nextjs | `#8b5cf6` | 3.75 ✓(large) | `#8b5cf6` | 3.75 ✗ |
| 21 | adr-case-file | `#8b5cf6` | 3.75 ✓ | `#8b5cf6` | 3.75 ✗ |
| 22 | adr-timeline | `#f59e0b` | **1.90** ✗✗ | `#f59e0b` | **1.90** ✗✗ |
| 23 | adr-decision-tree | `#f59e0b` | **1.90** ✗✗ | `#f59e0b` | **1.90** ✗✗ |
| 24 | sdlc-timeline | `#10b981` | **2.25** ✗✗ | `#10b981` | **2.25** ✗✗ |
| 25 | sdlc-decision-tree | `#10b981` | **2.25** ✗✗ | `#10b981` | **2.25** ✗✗ |
| 26 | bridge-enlace | `#a78bfa` | **2.41** ✗✗ | `#a78bfa` | **2.41** ✗✗ |
| 27 | tdd-hybrid | `#d97706` | **2.82** ✗ | — | — |
| 1, 3 | slide-1, pipeline | `#6366f1` | 3.95 ✓ | `#6366f1` | 3.95 ✗ |
| 2 | pillar-intro | `#0284c7` | 3.63 ✓ | `#0284c7` | 3.63 ✗ |
| 12 | greenfield | `#0284c7` | 3.63 ✓ | `#0284c7` | 3.63 ✗ |
| 17 | br-template | `#3b82f6` | 3.26 ✓(large) | `#3b82f6` | 3.26 ✗ |
| 18 | inv-template | `#ef4444` | 3.33 ✓ | `#ef4444` | 3.33 ✗ |

Verificado visualmente: s19 y s24 (h2 ámbar/esmeralda casi invisibles en proyección), s12 (correcta: densa pero organizada, banner visible, 466 palabras OK como slide de referencia), s13 (mermaid enorme y denso — el diagrama interno ~9px es ilegible desde el fondo de sala; es slide "señalar", no "leer").

**Fixes propuestos (misma receta que 4-11):** h2 grande ≥3:1 con margen; badge pequeño ≥4.5:1.
- h2: `#f59e0b`→`#b45309`, `#10b981`→`#059669`, `#a78bfa`→`#7c3aed`, `#d97706`→`#b45309` (19, 22-27)
- badges: `#0284c7`→`#0369a1`, `#8b5cf6`→`#6d28d9`, `#f59e0b`→`#92400e` (ámbar-800: sobre tinte del propio badge `#b45309` da 4.45, margen insuficiente), `#10b981`→`#047857`, `#a78bfa`→`#6d28d9`, `#3b82f6`→`#1d4ed8`, `#ef4444`→`#b91c1c`, `#6366f1`→`#4f46e5` (base `.deck-part-badge` en CSS, afecta a s1/s3 y a parte 1/plantillas: mejora global)
- s7 badge y pill ámbar (`#b45309`→4.45 sobre tinte, margen corto) → `#92400e` también

## Hallazgo 2 — Banners ocultos en phase2/pillar: decisión pendiente de diseño

`s13-15` (mermaid): **mantener oculto** — el diagrama ya llena la slide (413/372/342 palabras visibles).
`s16-18`, `s22`, `s24`, `s26`: banner oculto pero **tienen hueco** (244-277 palabras, similar a las de pasos que ya lo muestran). Si la regla de oro de ADR/SDLC es el takeaway de esas secciones, mostrarlas sería consistente con 4-11. Coste: 10 min + re-verificación.

## Hallazgo 3 — Segunda capa de mini-badges sin auditar

Dentro de tarjetas hay badges pequeños (~10px) con colores 500 no capturados por el sondeo del primer badge: s19 ("1. Inercia" violeta, "2. Guardrail Tax" ámbar, "3. Solución Crafter" verde), s24 (DISCOVERY/FLOW SPECS/DOMAIN MODEL/TDD HÍBRIDO/LIVING DOCS + 5 pills de color), s12 (IMPRESINDIBLE/SWAP/DIFERIDO/OPCIONAL/CONTRATO). La pasada de extensión debería sondear *todos* los elementos <14px con color de acento, no solo el primero.

## Hallazgo 4 — Menores

- `bundle.py` líneas 198-199: "32 slides" hardcodeado en los prints (el deck tiene 36). Cosmético.
- Terminal body sigue en 16px en charla (pendiente, fix #4 del top-5 original).
- s34 (local-inference-client, 71 palabras) y s35 (editorial quote, 25): estructura intencional, sin issues.

## Archivos

- Capturas: `/tmp/sweep-p2-s1.png … s36.png` (temporales; regenerables con `/tmp/sweep.js`)
- Script reutilizable: `/tmp/sweep.js` (métricas + captura; incluye cálculo WCAG con bg compuesto)
- Fix ya propagado a `dist/` vía `python3 bundle.py` (sep 19, 00:15)

---

# FIXES APLICADOS (segunda pasada, verificados con 3 sondeos WCAG)

**Scripts:** `/tmp/fix_contrast2.py` (107 ediciones) + `/tmp/fix_contrast3.py` (14 ediciones de corrección de dirección). Ambos con asserts: abortan sin escribir si un patrón no encaja.

**Resultado:** los 3 sondeos (≤14.5px ≥4.5:1 · 14.6-18.5px ≥4.5:1 · grande ≥3:1) salen **limpios en las 36 slides** (solo quedan falsos positivos del texto interno de `<style>` de mermaid, no renderizado). Overflow: 0. Contraste del primer badge/h2/pill por slide: ninguno <4.5.

## Qué se cambió

**HTML (parte2):** 13 badges de slide (s2, s7, s12, s17-26), 15 tags/chip, 7 h2-spans, 3 punchlines de s3, 8 títulos de puntos (phase2/pilar, 400s→600s), RUTA 4 inline, 10 STRONGs + 4 títulos/fechas de s28-31 (600s sobre tarjetas blancas), 9 líneas de acentos inline en s25 (CODEs de las 5 rutas).

**CSS (style.css):** press-source/date/links (naranja→`#c2410c`, gris→`#4b5563`), dflash role-badges (fondo `#c2410c`/`#15803d`), bridge-pill (`#c2410c`), sample-tokens (`#9a3412`/`#166534`), mtp-badge bg (`#b45309`), dspark-badge bg (`#0369a1`), scenario-tab activo (`#0369a1` + sombra), order-pill swap-alert (`#b45309`), adr-step node-badge/state-tag (`#92400e`/border `#b45309`), skill-chip (`#0369a1`), bullet-item borders (amber/sky/emerald), lane-badges blue/amber/red/green → 700s, lane-radar border, `code-content .comment` (`#94a3b8`), agents-github-footer link (`#7c3aed`), chip violeta, variantes rect-date-year, **font-size del CODE de los pills 1.1→1.2rem** (19.2px bold = texto grande → sus 3.7-4.45 sobre tinte pasan el umbral 3:1) y **bloque nuevo con scope `body.deck-sdlc-part2`**: `--text-dim: #4b5563` y `.deck-part-badge { color: #4f46e5 }` — sin tocar los valores globales que comparten parte1/plantillas.

## Lección de dirección de color

Los STRONGs de s28-31 están sobre **tarjetas blancas dentro de la slide** (el ratio 16.97 del h2 era texto casi-negro sobre crema, no "blanco sobre oscuro"). Primera pasada aplicó 400s (dirección de fondo oscuro) y empeoró; fix3 revirtió a 700s. Los sondeos reportan ratio y fondo real por elemento — siempre verificar el bg antes de elegir dirección.

## Pendiente

- Banners de s16-18, s22, s24, s26: ocultos por diseño, tienen hueco (244-277 palabras). Decisión de diseño pendiente.
- Terminal 16→18px en charla (requiere re-verificación de fit; S5 la crítica).
- theme-dark de todo lo anterior (badges, tabs, pills): skin alternativo, sin auditar.
- `bundle.py` prints "32 slides" hardcodeado (cosmético).
