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
