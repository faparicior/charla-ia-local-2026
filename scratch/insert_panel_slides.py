#!/usr/bin/env python3
"""
Inserta las slides 23 (Modelo Denso como panel de luces) y 24 (Modelo MoE con router)
después de la slide 22 del deck Parte 1 (index.html).

- Renumera las IDs de las slides 23..32 -> 25..34 (descendente, sin colisiones).
- Renombra los banners de comentarios SLIDE N: -> SLIDE N+2:.
- Inserta las dos secciones nuevas con SVG puro (panel de 48 cajitas).
- Añade el CSS asociado al final de style.css.

Uso:  python3 scratch/insert_panel_slides.py
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
CSS = ROOT / "style.css"

# ---------------------------------------------------------------------------
# 1. Renumeración descendente de IDs y banners (23..32 -> 25..34)
# ---------------------------------------------------------------------------
html = INDEX.read_text(encoding="utf-8")
if "PANEL VISUAL — Densos" in html:
    raise SystemExit("ℹ️ Las slides 23/24 ya están insertadas; nada que hacer.")

for n in range(32, 22, -1):
    old_id = f'id="slide-{n}"'
    assert html.count(old_id) == 1, f"ID no única o ausente: {old_id} ({html.count(old_id)})"
    html = html.replace(old_id, f'id="slide-{n + 2}"')

    old_banner = f"SLIDE {n}:"
    if old_banner in html:
        html = html.replace(old_banner, f"SLIDE {n + 2}:")

assert 'id="slide-22"' in html
assert 'id="slide-23"' not in html  # libres para las nuevas

# ---------------------------------------------------------------------------
# 1b. Desplazar selectores #slide-N (N>=23) de style.css que apuntaban a las
#     slides ANTES de la inserción (quedaron obsoletos al renumerar +2).
#     Se excluye el bloque CSS nuevo de las slides 23/24 (se añade después).
# ---------------------------------------------------------------------------
import re
css_head_marker = "SLIDES 23 & 24: PANEL VISUAL"
css_text = CSS.read_text(encoding="utf-8")
if css_head_marker in css_text:
    head, tail = css_text.split(css_head_marker, 1)

    def _shift(m):
        n = int(m.group(1))
        return f"#slide-{n + 2}" if 23 <= n <= 32 else m.group(0)

    head = re.sub(r"#slide-(\d+)", _shift, head)

    # Ajuste posterior: s26/s27 (antes 24/25) no deben llevar subtitulo compacto
    head = head.replace(
        "body.deck-hardware-part1.mode-document #slide-26 .slide-content > .subtitle,\n"
        "body.deck-hardware-part1.mode-document #slide-27 .slide-content > .subtitle,\n"
        "body.deck-hardware-part1.mode-document #slide-12 .slide-content > .subtitle {",
        "body.deck-hardware-part1.mode-document #slide-12 .slide-content > .subtitle {",
    )
    CSS.write_text(head + css_head_marker + tail, encoding="utf-8")
    print("✅ style.css: selectores #slide-N>=23 desplazados +2")
else:
    print("ℹ️ style.css: sin bloque nuevo aún, no hay selectores que desplazar")

# ---------------------------------------------------------------------------
# 2. Generadores SVG del panel de 48 cajitas (8 col x 6 filas)
# ---------------------------------------------------------------------------
CELL_W, CELL_H = 84, 54
PITCH_X, PITCH_Y = 94, 62


def cells_svg(prefix: str, y0: int, delays: list[int], lit: set[int]) -> str:
    """Genera las 48 cajitas. delays[i] en ms; lit = índices que se encienden."""
    rows = []
    for i in range(48):
        r, c = divmod(i, 8)
        x = 236 + c * PITCH_X
        y = y0 + r * PITCH_Y
        cls = f"{prefix}-cell mp-on" if i in lit else f"{prefix}-cell"
        rows.append(
            f'<rect class="{cls}" x="{x}" y="{y}" width="{CELL_W}" height="{CELL_H}" '
            f'rx="9" style="--d:{delays[i]}ms"/>'
        )
        if c == 7 and r < 5:
            rows.append("\n          ")
    return "".join(rows)


# Slide 23 (denso): onda diagonal 0..47 -> 0,14,28...658 ms
dense_delays = [i * 14 for i in range(48)]
dense_cells = cells_svg("dp", 124, dense_delays, set())

# Slide 24 (MoE): 5 expertos encendidos escalonados 140 ms; resto sin retardo
MOE_LIT = [4, 9, 22, 34, 45]          # (col,row): (4,0) (1,1) (6,2) (2,4) (5,5)
moe_delays = [0] * 48
for k, idx in enumerate(MOE_LIT):
    moe_delays[idx] = k * 140
moe_cells = cells_svg("mp", 128, moe_delays, set(MOE_LIT))


# Extremos superiores (top-center) de las cajitas encendidas del MoE
def cell_top_center(idx: int) -> tuple[int, int]:
    r, c = divmod(idx, 8)
    return 236 + c * PITCH_X + 42, 128 + r * PITCH_Y


FAN = [(607, 72) + cell_top_center(idx) for idx in MOE_LIT]
fan_lines = []
for k, (x1, y1, x2, y2) in enumerate(FAN):
    fan_lines.append(
        f'<line class="mp-fanline" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" style="--d:{k * 140}ms"/>'
    )
    fan_lines.append(
        f'<circle class="mp-fandot" cx="{x2}" cy="{y2}" r="4" style="--d:{k * 140 + 90}ms"/>'
    )
fan_svg = "\n          ".join(fan_lines)

# ---------------------------------------------------------------------------
# 3. Sección: SLIDE 23 — MODELO DENSO COMO PANEL DE LUZ
# ---------------------------------------------------------------------------
SLIDE_DENSE = f"""    <!-- ====================================================================
         SLIDE 23: MODELO DENSO COMO PANEL DE LUZ (TODAS LAS CAJITAS SE ENCIENDEN)
         ==================================================================== -->
    <section class="slide" id="slide-23">
      <div class="slide-content">
        <div class="tag">Arquitectura de Modelos • Panel Visual — Densos</div>
        <h2>Modelos Densos: <span class="serif-italic" style="color: #b45309;">Una Petición Enciende las 48 Luces</span>
        </h2>
        <p class="subtitle doc-only" style="margin-top: -0.85rem;">
          El modelo como un panel de 48 bloques: sin router ni filtro previo, cada token activa el 100% de las cajitas.
        </p>

        <div class="hospital-story-grid">
          <!-- Columna Izquierda: Panel SVG del modelo denso -->
          <div class="panel-visual-frame">
            <div class="panel-svg-viewport">
              <svg class="panel-svg" viewBox="0 0 1044 654" fill="none" xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Panel de un modelo denso: 48 bloques de parámetros; al llegar una petición se encienden los 48 a la vez, el 100% del cómputo en cada token">
                <defs>
                  <marker id="dp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7"
                    orient="auto-start-reverse">
                    <path class="dp-arrowhead" d="M0,0 L10,5 L0,10 z" />
                  </marker>
                </defs>

                <!-- Etiqueta y caja del modelo -->
                <text class="dp-label" x="210" y="86">📦 MODELO DENSO — 48 BLOQUES DE PARÁMETROS (70B)</text>
                <rect class="dp-panel" x="210" y="100" width="794" height="412" rx="18" />

                <!-- Zona izquierda: sin router -->
                <text class="dp-mini" x="88" y="262" text-anchor="middle">SIN ROUTER · SIN FILTRO</text>

                <!-- Las 48 cajitas (todas apagadas al llegar) -->
                <g>
                  {dense_cells}
                </g>

                <!-- PASO 1: la petición llega al panel -->
                <g class="dp-request step" data-step="1">
                  <rect class="dp-pill" x="8" y="276" width="160" height="60" rx="12" />
                  <text class="dp-pill-title" x="88" y="303" text-anchor="middle">💬 PETICIÓN</text>
                  <text class="dp-pill-sub" x="88" y="323" text-anchor="middle">1 token de entrada</text>
                  <line class="dp-arrow" x1="174" y1="306" x2="202" y2="306" marker-end="url(#dp-arrow)" />
                </g>

                <!-- Estado en espera (se apaga al encender las luces) -->
                <rect class="dp-strip dp-strip-static" x="8" y="548" width="996" height="80" rx="14" />
                <text class="dp-strip-wait" x="506" y="596" text-anchor="middle">ESTADO: EN ESPERA — PULSA SIGUIENTE ▶ PARA VER QUÉ CAJITAS SE ENCIENDEN</text>

                <!-- PASO 2: se encienden TODAS las cajitas -->
                <g class="dp-lights step" data-step="2">
                  <rect class="dp-glow" x="210" y="100" width="794" height="412" rx="18" />
                  <rect class="dp-strip-lit" x="8" y="548" width="996" height="80" rx="14" />
                  <text class="dp-count" x="36" y="598">⚡ 48/48 ACTIVAS</text>
                  <text class="dp-strip-l1" x="990" y="582" text-anchor="end">70B parámetros multiplicados en CADA token</text>
                  <text class="dp-strip-l2" x="990" y="608" text-anchor="end">coste: VRAM al límite · energía · calor</text>
                </g>
              </svg>
            </div>
            <div class="hospital-caption-bar">
              <span style="color: #b45309;">🟠 Modelo Denso — Panel de 48 Bloques</span>
              <span class="dp-cap-final" style="color: #d97706;">48/48 encendidas · 100% cómputo</span>
            </div>
          </div>

          <!-- Columna Derecha: Narrativa clave -->
          <div class="hospital-narrative-col">
            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🟠</span> Sin Gatekeeper: se Encienden Todas</span>
                <span class="hospital-narrative-badge amber">48/48 · 100%</span>
              </div>
              <p>
                La petición entra y <strong>no existe filtro previo</strong>: los 48 bloques que forman el modelo
                participan en el cálculo de esa palabra. Es la junta médica completa de la slide anterior, vista como
                un panel eléctrico.
              </p>
            </div>

            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>⚡</span> El Peaje: Fuerza Bruta Constante</span>
                <span class="hospital-narrative-badge amber">70B ops/token</span>
              </div>
              <p>
                La GPU <strong>multiplica los 70B parámetros en cada token</strong>, aunque la pregunta sea trivial.
                VRAM llena, calor y consumo al máximo: el precio de la consistencia total.
              </p>
            </div>

            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🧱</span> Cuándo Brillan los Densos</span>
                <span class="hospital-narrative-badge" style="background: rgba(0,0,0,0.06); color: var(--text-main);">8B–32B locales</span>
              </div>
              <p>
                <strong>LLaMA 3 y Qwen densos</strong>: predecibles, robustos y perfectos para fine-tuning
                especializado. En tamaños pequeños y medianos siguen siendo la opción sólida por defecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

"""

# ---------------------------------------------------------------------------
# 4. Sección: SLIDE 24 — MODELO MoE: EL ROUTER ENCIENDE SOLO 5
# ---------------------------------------------------------------------------
SLIDE_MOE = f"""    <!-- ====================================================================
         SLIDE 24: MODELO MOE COMO PANEL DE LUZ (EL ROUTER ENCIENDE SOLO 4-5)
         ==================================================================== -->
    <section class="slide" id="slide-24">
      <div class="slide-content">
        <div class="tag">Arquitectura de Modelos • Panel Visual — Mixture of Experts</div>
        <h2>Modelos MoE: <span class="serif-italic" style="color: #0284c7;">El Router Enciende solo 5 de 48 Luces</span>
        </h2>
        <p class="subtitle doc-only" style="margin-top: -0.85rem;">
          El mismo panel de 48 cajitas, pero con triaje: el router puntúa a todos los expertos y despierta únicamente a los 5 mejores.
        </p>

        <div class="hospital-story-grid">
          <!-- Columna Izquierda: Panel SVG del modelo MoE -->
          <div class="panel-visual-frame">
            <div class="panel-svg-viewport">
              <svg class="panel-svg" viewBox="0 0 1044 654" fill="none" xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Panel de un modelo MoE: el router puntúa 48 expertos y enciende solo 5, en torno al 10% del cómputo; el resto permanece apagado">
                <defs>
                  <marker id="mp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7"
                    orient="auto-start-reverse">
                    <path class="mp-arrowhead" d="M0,0 L10,5 L0,10 z" />
                  </marker>
                </defs>

                <!-- Router (estático: existe desde el inicio) -->
                <rect class="mp-router" x="507" y="20" width="200" height="52" rx="12" />
                <text class="mp-router-title" x="607" y="41" text-anchor="middle">🔀 ROUTER · TRIAJE</text>
                <text class="mp-router-sub" x="607" y="60" text-anchor="middle">puntúa los 48 → elige 5</text>

                <!-- Etiqueta y caja del modelo -->
                <text class="mp-label" x="210" y="94">📦 MODELO MoE — 48 EXPERTOS (122B EN VRAM)</text>
                <rect class="mp-panel" x="210" y="104" width="794" height="412" rx="18" />

                <!-- Zona izquierda -->
                <text class="mp-mini" x="88" y="262" text-anchor="middle">EL TOKEN ENTRA AL ROUTER</text>

                <!-- Conexiones router -> expertos encendidos (aparecen en el paso 2) -->
                <g class="mp-fan">
                  {fan_svg}
                </g>

                <!-- Las 48 cajitas (todas apagadas al llegar) -->
                <g>
                  {moe_cells}
                </g>

                <!-- PASO 1: la petición llega al router -->
                <g class="mp-request step" data-step="1">
                  <rect class="mp-pill" x="8" y="276" width="160" height="60" rx="12" />
                  <text class="mp-pill-title" x="88" y="303" text-anchor="middle">💬 PETICIÓN</text>
                  <text class="mp-pill-sub" x="88" y="323" text-anchor="middle">1 token de entrada</text>
                  <line class="mp-arrow" x1="174" y1="300" x2="497" y2="50" marker-end="url(#mp-arrow)" />
                </g>

                <!-- Estado en espera (se apaga al encender las luces) -->
                <rect class="mp-strip mp-strip-static" x="8" y="548" width="996" height="80" rx="14" />
                <text class="mp-strip-wait" x="506" y="596" text-anchor="middle">ESTADO: EN ESPERA — PULSA SIGUIENTE ▶ PARA VER QUÉ CAJITAS SE ENCIENDEN</text>

                <!-- PASO 2: el router decide y enciende 5 expertos -->
                <g class="mp-lights step" data-step="2">
                  <rect class="mp-router-lit" x="507" y="20" width="200" height="52" rx="12" />
                  <rect class="mp-strip-lit" x="8" y="548" width="996" height="80" rx="14" />
                  <text class="mp-count" x="36" y="598">🎯 5/48 ACTIVAS · ~10%</text>
                  <text class="mp-strip-l1" x="990" y="582" text-anchor="end">122B en VRAM · solo ~10B en cómputo por token</text>
                  <text class="mp-strip-l2" x="990" y="608" text-anchor="end">los 43 expertos dormidos no se calculan: velocidad + hueco para contexto</text>
                </g>
              </svg>
            </div>
            <div class="hospital-caption-bar">
              <span style="color: #0284c7;">🟢 Modelo MoE — Router + 48 Expertos</span>
              <span class="mp-cap-final" style="color: #059669;">5/48 encendidas · ~10% cómputo</span>
            </div>
          </div>

          <!-- Columna Derecha: Narrativa clave -->
          <div class="hospital-narrative-col">
            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🎯</span> El Router Hace el Triaje</span>
                <span class="hospital-narrative-badge blue">Top-K = 5</span>
              </div>
              <p>
                Un <strong>gatekeeper ultrarrápido puntúa a los 48 expertos</strong> en milisegundos y despierta solo
                a los 5 más afines al token. Los otros 43 ni se inmutan: <strong>su cálculo simplemente no ocurre</strong>.
              </p>
            </div>

            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🚀</span> VRAM Llena, Cuenta Ligera</span>
                <span class="hospital-narrative-badge blue">122B / 10B</span>
              </div>
              <p>
                En memoria guardas <strong>la enciclopedia completa (122B)</strong>, pero por token solo se mueve
                <strong>~10B de cómputo</strong>: velocidad relámpago y hueco libre para contexto largo en 128 GB.
              </p>
            </div>

            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🌟</span> El Estándar de la Nueva Era</span>
                <span class="hospital-narrative-badge" style="background: rgba(2, 132, 199, 0.1); color: #0284c7;">Qwen · DeepSeek · Mixtral</span>
              </div>
              <p>
                <strong>Qwen 3.5/3.8 MoE, DeepSeek V3/R1, Mixtral</strong>: la frontera corre en estaciones locales.
                El panel con 5 luces encendidas de 48 es hoy la arquitectura dominante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

"""

# ---------------------------------------------------------------------------
# 5. Inserción antes del banner de la (ahora) SLIDE 25
# ---------------------------------------------------------------------------
marker = "    <!-- ====================================================================\n         SLIDE 25:"
idx = html.find(marker)
assert idx != -1, "No se encontró el banner de la SLIDE 25 tras renumerar"
html = html[:idx] + SLIDE_DENSE + SLIDE_MOE + html[idx:]

INDEX.write_text(html, encoding="utf-8")
print(f"✅ index.html: insertadas slides 23 y 24 (total secciones: {html.count('<section class=')}")

# ---------------------------------------------------------------------------
# 6. CSS para las nuevas slides (appended a style.css)
# ---------------------------------------------------------------------------
CSS_BLOCK = """

/* ================================================================
   SLIDES 23 & 24: PANEL VISUAL — DENSO (48/48) vs MoE (ROUTER + 5)
   Panel SVG de 48 cajitas animado con el motor de pasos (.step).
   Paso 1: la petición llega · Paso 2: se encienden las cajitas.
   ================================================================ */

/* --- Marco visual compartido (espejo de .hospital-visual-frame) --- */
.panel-visual-frame {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid var(--border-medium);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
  background: var(--bg-surface);
  display: flex;
  flex-direction: column;
  height: 710px;
}

.panel-svg-viewport {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1rem 0.5rem;
}

.panel-svg {
  width: 100%;
  height: 100%;
  display: block;
}

#slide-23 .step,
#slide-24 .step {
  cursor: pointer;
}

/* --- Tipografía y colores estáticos del SVG --- */
#slide-23 .dp-label,
#slide-24 .mp-label {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  fill: var(--text-muted);
  letter-spacing: 0.05em;
}

#slide-23 .dp-panel,
#slide-24 .mp-panel {
  fill: var(--bg-surface);
  stroke: var(--border-medium);
  stroke-width: 1.6;
  transition: stroke 0.5s ease;
}

#slide-23 .dp-mini,
#slide-24 .mp-mini {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  fill: var(--text-dim);
  letter-spacing: 0.08em;
}

#slide-23 .dp-pill-title,
#slide-24 .mp-pill-title {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 800;
  fill: #b45309;
}

#slide-23 .dp-pill-sub,
#slide-24 .mp-pill-sub {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  fill: var(--text-muted);
}

/* --- Cajitas apagadas (estado inicial) --- */
#slide-23 .dp-cell,
#slide-24 .mp-cell {
  fill: var(--bg-surface-elevated);
  stroke: var(--border-medium);
  stroke-width: 1.4;
  transition: fill 0.45s ease, stroke 0.45s ease, opacity 0.45s ease,
    filter 0.45s ease, stroke-width 0.45s ease;
  transition-delay: var(--d, 0ms);
}

/* --- Franja inferior en espera --- */
#slide-23 .dp-strip,
#slide-24 .mp-strip {
  fill: var(--bg-surface);
  stroke: var(--border-subtle);
  stroke-width: 1.5;
}

#slide-23 .dp-strip-static,
#slide-24 .mp-strip-static {
  stroke-dasharray: 7 6;
  transition: opacity 0.4s ease;
}

#slide-23 .dp-strip-wait,
#slide-24 .mp-strip-wait {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  fill: var(--text-dim);
  letter-spacing: 0.06em;
  transition: opacity 0.4s ease;
}

/* --- Router estático (MoE) --- */
#slide-24 .mp-router {
  fill: var(--bg-surface);
  stroke: #0284c7;
  stroke-width: 1.6;
  transition: fill 0.45s ease, stroke 0.45s ease, filter 0.45s ease;
}

#slide-24 .mp-router-title {
  font-family: var(--font-mono);
  font-size: 14.5px;
  font-weight: 800;
  fill: #0284c7;
}

#slide-24 .mp-router-sub {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 600;
  fill: var(--text-muted);
}

/* --- PASO 1: la petición (oculta hasta activarse) --- */
#slide-23 .dp-request,
#slide-24 .mp-request {
  opacity: 0;
  transform: translateX(-46px);
  transition: opacity 0.45s var(--ease-spring), transform 0.45s var(--ease-spring);
}

#slide-23 .dp-request.step-active,
#slide-24 .mp-request.step-active {
  opacity: 1;
  transform: translateX(0);
}

#slide-23 .dp-pill,
#slide-24 .mp-pill {
  fill: rgba(245, 158, 11, 0.12);
  stroke: #f59e0b;
  stroke-width: 1.6;
}

#slide-23 .dp-arrow,
#slide-24 .mp-arrow {
  stroke: var(--text-muted);
  stroke-width: 2.4;
}

#slide-23 .dp-arrowhead,
#slide-24 .mp-arrowhead {
  fill: var(--text-muted);
}

/* --- PASO 2: superposición luminosa (oculta hasta activarse) --- */
#slide-23 .dp-lights,
#slide-24 .mp-lights {
  opacity: 0;
  transition: opacity 0.5s ease 0.15s;
}

#slide-23 .dp-lights.step-active,
#slide-24 .mp-lights.step-active {
  opacity: 1;
}

/* --- Franja inferior iluminada --- */
#slide-23 .dp-strip-lit {
  fill: rgba(245, 158, 11, 0.09);
  stroke: #d97706;
  stroke-width: 1.6;
}

#slide-24 .mp-strip-lit {
  fill: rgba(16, 185, 129, 0.09);
  stroke: #059669;
  stroke-width: 1.6;
}

#slide-23 .dp-count {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 800;
  fill: #b45309;
  letter-spacing: 0.03em;
}

#slide-24 .mp-count {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 800;
  fill: #059669;
  letter-spacing: 0.03em;
}

#slide-23 .dp-strip-l1,
#slide-24 .mp-strip-l1 {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  fill: var(--text-main);
}

#slide-23 .dp-strip-l2,
#slide-24 .mp-strip-l2 {
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 600;
  fill: var(--text-muted);
}

/* ================================================================
   SLIDE 23 — DENSO: al activar el paso 2 se encienden las 48
   ================================================================ */
#slide-23:has(.dp-lights.step-active) .dp-cell {
  fill: rgba(245, 158, 11, 0.2);
  stroke: #d97706;
  stroke-width: 1.8;
  filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.45));
}

#slide-23:has(.dp-lights.step-active) .dp-panel {
  stroke: #d97706;
}

#slide-23:has(.dp-lights.step-active) .dp-strip-static,
#slide-23:has(.dp-lights.step-active) .dp-strip-wait {
  opacity: 0;
}

#slide-23 .dp-glow {
  fill: rgba(245, 158, 11, 0.05);
  stroke: #d97706;
  stroke-width: 2.5;
  filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.5));
}

#slide-23 .dp-cap-final {
  opacity: 0;
  transition: opacity 0.5s ease 0.3s;
}

#slide-23:has(.dp-lights.step-active) .dp-cap-final {
  opacity: 1;
}

/* ================================================================
   SLIDE 24 — MoE: el router se activa y enciende 5 de 48
   ================================================================ */
#slide-24:has(.mp-lights.step-active) .mp-cell {
  opacity: 0.42;
}

#slide-24:has(.mp-lights.step-active) .mp-cell.mp-on {
  opacity: 1;
  fill: rgba(16, 185, 129, 0.18);
  stroke: #059669;
  stroke-width: 1.8;
  filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.5));
}

#slide-24:has(.mp-lights.step-active) .mp-router {
  fill: rgba(2, 132, 199, 0.14);
  stroke-width: 2.2;
  filter: drop-shadow(0 0 8px rgba(2, 132, 199, 0.5));
}

#slide-24 .mp-fanline {
  stroke: #059669;
  stroke-width: 2;
  stroke-dasharray: 7 6;
  opacity: 0;
  transition: opacity 0.4s ease;
  transition-delay: var(--d, 0ms);
}

#slide-24 .mp-fandot {
  fill: #059669;
  opacity: 0;
  transition: opacity 0.4s ease;
  transition-delay: var(--d, 0ms);
}

#slide-24:has(.mp-lights.step-active) .mp-fanline {
  opacity: 0.7;
}

#slide-24:has(.mp-lights.step-active) .mp-fandot {
  opacity: 0.9;
}

#slide-24:has(.mp-lights.step-active) .mp-strip-static,
#slide-24:has(.mp-lights.step-active) .mp-strip-wait {
  opacity: 0;
}

#slide-24 .mp-cap-final {
  opacity: 0;
  transition: opacity 0.5s ease 0.3s;
}

#slide-24:has(.mp-lights.step-active) .mp-cap-final {
  opacity: 1;
}

/* ================================================================
   SLIDES 23 & 24 — Overview e impresión: estado final encendido
   ================================================================ */
body.overview-mode #slide-23 .dp-request,
body.overview-mode #slide-24 .mp-request {
  opacity: 1 !important;
  transform: none !important;
}

@media print {

  #slide-23 .dp-request,
  #slide-24 .mp-request {
    opacity: 1 !important;
    transform: none !important;
  }
}

body.overview-mode #slide-23 .dp-lights,
body.overview-mode #slide-24 .mp-lights {
  opacity: 1 !important;
}

@media print {

  #slide-23 .dp-lights,
  #slide-24 .mp-lights {
    opacity: 1 !important;
  }
}

body.overview-mode #slide-23 .dp-cell {
  fill: rgba(245, 158, 11, 0.2) !important;
  stroke: #d97706 !important;
  filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.45)) !important;
}

@media print {

  #slide-23 .dp-cell {
    fill: rgba(245, 158, 11, 0.2) !important;
    stroke: #d97706 !important;
    filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.45)) !important;
  }
}

body.overview-mode #slide-24 .mp-cell.mp-on {
  fill: rgba(16, 185, 129, 0.18) !important;
  stroke: #059669 !important;
  filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.5)) !important;
}

@media print {

  #slide-24 .mp-cell.mp-on {
    fill: rgba(16, 185, 129, 0.18) !important;
    stroke: #059669 !important;
    filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.5)) !important;
  }
}

body.overview-mode #slide-23 .dp-strip-static,
body.overview-mode #slide-23 .dp-strip-wait,
body.overview-mode #slide-24 .mp-strip-static,
body.overview-mode #slide-24 .mp-strip-wait {
  opacity: 0 !important;
}

@media print {

  #slide-23 .dp-strip-static,
  #slide-23 .dp-strip-wait,
  #slide-24 .mp-strip-static,
  #slide-24 .mp-strip-wait {
    opacity: 0 !important;
  }
}

body.overview-mode #slide-23 .dp-cap-final,
body.overview-mode #slide-24 .mp-cap-final {
  opacity: 1 !important;
}

@media print {

  #slide-23 .dp-cap-final,
  #slide-24 .mp-cap-final {
    opacity: 1 !important;
  }
}
"""

css_text = CSS.read_text(encoding="utf-8")
if "SLIDES 23 & 24: PANEL VISUAL" not in css_text:
    CSS.write_text(css_text + CSS_BLOCK, encoding="utf-8")
    print("✅ style.css: bloque CSS añadido")
else:
    print("ℹ️ style.css: el bloque ya existía, no se duplica")

print("🎉 Listo. Ejecuta después: python3 bundle.py")
