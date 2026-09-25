#!/usr/bin/env python3
"""
Inserta la slide 25 "El Viaje del Token" (BF16 vs NVFP4, rutas animadas SVG)
después de la slide 24 del deck Parte 1 (index.html).

- Renumera las IDs de las slides 25..34 -> 26..35 (+1, descendente, sin colisiones),
  incluyendo los banners de comentarios.
- Desplaza TODOS los selectores CSS #slide-N (N entre 25 y 34) +2 en style.css
  (el bloque CSS de las slides 23/24 solo referencia 23/24, no se toca).
- Inserta la nueva sección con SVG (2 carriles: BF16 largo, NVFP4 4x más corto)
  animada con el motor de pasos (.step): 3 pasos.
- Añade el CSS asociado al final de style.css.

Uso:  python3 scratch/insert_token_slide.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
CSS = ROOT / "style.css"

# ---------------------------------------------------------------------------
# 1. Renumeración descendente de IDs y banners (25..34 -> 26..35)
# ---------------------------------------------------------------------------
html = INDEX.read_text(encoding="utf-8")
if "EL VIAJE DEL TOKEN" in html:
    raise SystemExit("ℹ️ La slide del viaje del token ya está insertada; nada que hacer.")

for n in range(34, 24, -1):
    old_id = f'id="slide-{n}"'
    assert html.count(old_id) == 1, f"ID no única o ausente: {old_id} ({html.count(old_id)})"
    html = html.replace(old_id, f'id="slide-{n + 1}"')

    old_banner = f"SLIDE {n}:"
    if old_banner in html:
        html = html.replace(old_banner, f"SLIDE {n + 1}:")

assert 'id="slide-24"' in html
assert 'id="slide-25"' not in html

# ---------------------------------------------------------------------------
# 2. Geometría SVG del viaje
#    viewBox 1044x612 · carril BF16 arriba (5 pasadas) · NVFP4 abajo (3 pasadas)
# ---------------------------------------------------------------------------
ROUTE1 = ("M158,76 H752 a16,16 0 0 1 0,32 H158 a16,16 0 0 0 0,32 "
          "H752 a16,16 0 0 1 0,32 H158 a16,16 0 0 0 0,32 H752")
ROUTE2 = "M168,312 H340 a26.5,26.5 0 0 1 0,53 H168 a26.5,26.5 0 0 0 0,53 H340"

# ---------------------------------------------------------------------------
# 3. Sección: SLIDE 25 — EL VIAJE DEL TOKEN (MEMORIA → SALIDA)
# ---------------------------------------------------------------------------
SLIDE_TOKEN = f"""    <!-- ====================================================================
         SLIDE 25: EL VIAJE DEL TOKEN — MEMORIA Y VELOCIDAD (BF16 vs NVFP4)
         ==================================================================== -->
    <section class="slide" id="slide-25">
      <div class="slide-content">
        <div class="tag">Rendimiento • El Viaje del Token — BF16 vs NVFP4</div>
        <h2>La Velocidad es Memoria: <span class="serif-italic" style="color: #15803d;">el Viaje del Token</span>
        </h2>
        <p class="subtitle doc-only" style="margin-top: -0.85rem;">
          Cada palabra generada debe leer de la VRAM los GB del modelo entero: la distancia del viaje marca el tiempo. NVFP4 acorta el viaje 4&times;.
        </p>

        <div class="hospital-story-grid">
          <!-- Columna Izquierda: SVG del viaje del token -->
          <div class="panel-visual-frame">
            <div class="panel-svg-viewport">
              <svg class="panel-svg" viewBox="0 0 1044 612" fill="none" xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="El token recorre los pesos: en BF16 lee 140 GB (ocupa 75% de la VRAM) y tarda 4t0; en NVFP4 lee 35 GB (19%) y tarda t0, 4 veces más tokens por segundo">
                <defs>
                  <marker id="vt-arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7"
                    orient="auto-start-reverse">
                    <path class="vt-arrowhead" d="M0,0 L10,5 L0,10 z" />
                  </marker>
                </defs>

                <!-- ================= CARRIL 1: BF16 (viaje largo) ================= -->
                <text class="vt-label" x="140" y="38">1&#65039;&#8419; SIN COMPRIMIR (BF16) — el token recorre los 140 GB</text>
                <text class="vt-occ1" x="990" y="38" text-anchor="end">ocupa &#8776;75% de la VRAM</text>

                <rect class="vt-block1" x="140" y="50" width="630" height="182" rx="16" />
                <text class="vt-blocklabel" x="155" y="68">📦 PESOS 70B · BF16 · 140 GB</text>

                <path class="vt-route1" d="{ROUTE1}" />

                <rect class="vt-spill" x="8" y="53" width="92" height="46" rx="10" />
                <text class="vt-spill-title" x="54" y="73" text-anchor="middle">💬 token</text>
                <text class="vt-spill-sub" x="54" y="90" text-anchor="middle">1 token</text>
                <line class="vt-lead" x1="106" y1="76" x2="146" y2="76" marker-end="url(#vt-arrow-a)" />

                <rect class="vt-exit-static vt-exit-static1" x="800" y="172" width="190" height="64" rx="12" />
                <text class="vt-exit-wait" x="895" y="210" text-anchor="middle">&#9201; —</text>
                <text class="vt-salida" x="895" y="164" text-anchor="middle">salida</text>
                <line class="vt-lead" x1="774" y1="204" x2="794" y2="204" marker-end="url(#vt-arrow-a)" />

                <!-- ================= CARRIL 2: NVFP4 (viaje 4x corto) ================= -->
                <text class="vt-label" x="140" y="272">2&#65039;&#8419; COMPRIMIDO (NVFP4 · 4&times;) — el mismo 70B en 35 GB</text>
                <text class="vt-occ2" x="990" y="272" text-anchor="end">ocupa &#8776;19% de la VRAM</text>

                <rect class="vt-block2" x="140" y="282" width="240" height="182" rx="16" />
                <text class="vt-blocklabel" x="155" y="300">📦 NVFP4 · 35 GB</text>

                <path class="vt-route2" d="{ROUTE2}" />

                <rect class="vt-spill" x="8" y="289" width="92" height="46" rx="10" />
                <text class="vt-spill-title" x="54" y="309" text-anchor="middle">💬 token</text>
                <text class="vt-spill-sub" x="54" y="326" text-anchor="middle">1 token</text>
                <line class="vt-lead" x1="106" y1="312" x2="162" y2="312" marker-end="url(#vt-arrow-a)" />

                <rect class="vt-exit-static vt-exit-static2" x="410" y="386" width="190" height="64" rx="12" />
                <text class="vt-exit-wait" x="505" y="424" text-anchor="middle">&#9201; —</text>
                <text class="vt-salida" x="505" y="378" text-anchor="middle">salida</text>
                <line class="vt-lead" x1="384" y1="418" x2="404" y2="418" marker-end="url(#vt-arrow-a)" />

                <!-- PASO 1: el token recorre el modelo BF16 completo (t = 4t0) -->
                <g class="vt-j1 step" data-step="1">
                  <g class="vt-token1">
                    <rect class="vt-token-chip" x="-16" y="-16" width="32" height="32" rx="8" />
                    <text class="vt-token-emoji" x="0" y="6" text-anchor="middle">💬</text>
                  </g>
                  <circle class="vt-arr1" cx="752" cy="204" r="5" />
                  <g class="vt-exit1">
                    <rect class="vt-exit-lit1" x="800" y="172" width="190" height="64" rx="12" />
                    <text class="vt-clock1" x="895" y="199" text-anchor="middle">&#9201; t = 4t&#8320;</text>
                    <text class="vt-tokps1" x="895" y="224" text-anchor="middle">1&times; tok/s</text>
                  </g>
                </g>

                <!-- PASO 2: el token recorre el modelo NVFP4 (t = t0, 4x tok/s) -->
                <g class="vt-j2 step" data-step="2">
                  <g class="vt-token2">
                    <rect class="vt-token-chip" x="-16" y="-16" width="32" height="32" rx="8" />
                    <text class="vt-token-emoji" x="0" y="6" text-anchor="middle">💬</text>
                  </g>
                  <circle class="vt-arr2" cx="340" cy="418" r="5" />
                  <g class="vt-exit2">
                    <rect class="vt-exit-lit2" x="410" y="386" width="190" height="64" rx="12" />
                    <text class="vt-clock2" x="505" y="413" text-anchor="middle">&#9201; t = t&#8320;</text>
                    <text class="vt-tokps2" x="505" y="438" text-anchor="middle">4&times; tok/s</text>
                  </g>
                </g>

                <!-- Estado en espera (se apaga con el veredicto) -->
                <rect class="vt-strip vt-strip-static" x="8" y="492" width="1028" height="100" rx="14" />
                <text class="vt-strip-wait" x="522" y="548" text-anchor="middle">ESTADO: EN ESPERA — PULSA SIGUIENTE ▶ (3 PASOS: VIAJE BF16 → VIAJE NVFP4 → VEREDICTO)</text>

                <!-- PASO 3: veredicto -->
                <g class="vt-verdict step" data-step="3">
                  <rect class="vt-strip-lit" x="8" y="492" width="1028" height="100" rx="14" />
                  <text class="vt-verdict-main" x="36" y="552">🏁 4&times; MENOS DISTANCIA = 4&times; MÁS TOK/S</text>
                  <text class="vt-strip-l1" x="1020" y="530" text-anchor="end">tok/s &#8776; ancho de banda &divide; GB le&iacute;dos por token</text>
                  <text class="vt-strip-l2" x="1020" y="558" text-anchor="end">comprimir pesos (FP8 · INT4 · NVFP4) = la palanca n&ordm;1 en local</text>
                </g>
              </svg>
            </div>
            <div class="hospital-caption-bar">
              <span style="color: #b45309;">🚀 El Viaje del Token — de la VRAM a la Salida</span>
              <span class="vt-cap-final" style="color: #059669;">BF16: 4t&#8320; · NVFP4: t&#8320; → 4&times; tok/s</span>
            </div>
          </div>

          <!-- Columna Derecha: Narrativa clave -->
          <div class="hospital-narrative-col">
            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🧵</span> El Token Lee Todos los Pesos</span>
                <span class="hospital-narrative-badge amber">BW-bound</span>
              </div>
              <p>
                Para generar <strong>una sola palabra</strong>, la GPU lee de VRAM los GB del modelo entero. El viaje
                del token es la factura de ancho de banda: <strong>modelo grande = viaje largo = menos tok/s</strong>.
              </p>
            </div>

            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>🗜️</span> NVFP4: 4&times; Menos Distancia</span>
                <span class="hospital-narrative-badge blue">4&times; tok/s</span>
              </div>
              <p>
                El mismo 70B: <strong>140 GB en BF16 → 35 GB en NVFP4</strong>. Mismo ancho de banda y 1/4 de
                lectura: el viaje pasa de 4t&#8320; a t&#8320;. <strong>Cuatro veces más tokens por segundo</strong>.
              </p>
            </div>

            <div class="hospital-narrative-card">
              <div class="hospital-narrative-header">
                <span class="hospital-narrative-title"><span>⚡</span> La Palanca N&ordm;1 en Local</span>
                <span class="hospital-narrative-badge" style="background: rgba(0,0,0,0.06); color: var(--text-main);">tok/s &#8776; BW &divide; GB</span>
              </div>
              <p>
                Sin cambiar de GPU: <strong>FP8, INT4 o NVFP4 acortan el viaje</strong> del token y liberan VRAM para
                contexto largo. <strong>Cuantizar es ganar velocidad</strong> con la misma sabiduría.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

"""

marker = "    <!-- ====================================================================\n         SLIDE 27:"
idx = html.find(marker)
assert idx != -1, "No se encontró el banner de la SLIDE 26 tras renumerar"
html = html[:idx] + SLIDE_TOKEN + html[idx:]

INDEX.write_text(html, encoding="utf-8")
print(f"✅ index.html: insertada slide 25 (total secciones: {html.count('<section class=')}")

# ---------------------------------------------------------------------------
# 4. Desplazar selectores CSS #slide-N (25..34 -> 26..35) en TODO style.css
# ---------------------------------------------------------------------------
css_text = CSS.read_text(encoding="utf-8")

def shift(m):
    n = int(m.group(1))
    return f"#slide-{n + 1}" if 25 <= n <= 34 else m.group(0)

css_text, count = re.subn(r"#slide-(\d+)", shift, css_text)
CSS.write_text(css_text, encoding="utf-8")
print(f"✅ style.css: {count} selectores #slide-N revisados (solo N 25..34 desplazados)")

# ---------------------------------------------------------------------------
# 5. CSS de la slide 25 (appended)
# ---------------------------------------------------------------------------
CSS_BLOCK = """

/* ================================================================
   SLIDE 25: EL VIAJE DEL TOKEN — BF16 (5 pasadas, t=4t0)
   vs NVFP4 (3 pasadas cortas, t=t0, 4x tok/s)
   Motion path CSS + motor de pasos (.step): 3 pasos.
   ================================================================ */

/* --- Tipografía estática del SVG --- */
#slide-25 .vt-label {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  fill: var(--text-muted);
  letter-spacing: 0.04em;
}

#slide-25 .vt-occ1 {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  fill: #b45309;
}

#slide-25 .vt-occ2 {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  fill: #0284c7;
}

#slide-25 .vt-block1,
#slide-25 .vt-block2 {
  fill: var(--bg-surface);
  stroke: var(--border-medium);
  stroke-width: 1.6;
  transition: stroke 0.45s ease, filter 0.45s ease;
}

#slide-25 .vt-block2 {
  fill: rgba(2, 132, 199, 0.05);
}

#slide-25 .vt-blocklabel {
  font-family: var(--font-mono);
  font-size: 12.5px;
  font-weight: 700;
  fill: var(--text-muted);
  letter-spacing: 0.03em;
}

#slide-25 .vt-spill {
  fill: rgba(245, 158, 11, 0.12);
  stroke: #f59e0b;
  stroke-width: 1.5;
}

#slide-25 .vt-spill-title {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 800;
  fill: #b45309;
}

#slide-25 .vt-spill-sub {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  fill: var(--text-muted);
}

#slide-25 .vt-lead {
  stroke: var(--text-muted);
  stroke-width: 2.2;
}

#slide-25 .vt-arrowhead {
  fill: var(--text-muted);
}

#slide-25 .vt-salida {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  fill: var(--text-dim);
  letter-spacing: 0.08em;
}

/* --- Rutas (recorridos serpiente) --- */
#slide-25 .vt-route1,
#slide-25 .vt-route2 {
  fill: none;
  stroke-width: 2.5;
  stroke-dasharray: 10 8;
  opacity: 0.55;
  transition: stroke 0.45s ease, opacity 0.45s ease;
}

#slide-25 .vt-route1 {
  stroke: rgba(217, 119, 6, 0.55);
}

#slide-25 .vt-route2 {
  stroke: rgba(2, 132, 199, 0.55);
}

#slide-25:has(.vt-j1.step-active) .vt-route1 {
  stroke: #d97706;
  opacity: 1;
}

#slide-25:has(.vt-j2.step-active) .vt-route2 {
  stroke: #0284c7;
  opacity: 1;
}

#slide-25:has(.vt-j2.step-active) .vt-block2 {
  stroke: #0284c7;
}

/* --- Salidas estáticas (marcador tenue) --- */
#slide-25 .vt-exit-static {
  fill: var(--bg-surface-elevated);
  stroke: var(--border-subtle);
  stroke-width: 1.4;
  stroke-dasharray: 6 5;
  transition: opacity 0.4s ease;
}

#slide-25 .vt-exit-wait {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  fill: var(--text-dim);
}

/* --- Tokens viajeros (motion path) --- */
#slide-25 .vt-token1,
#slide-25 .vt-token2 {
  opacity: 0;
  offset-rotate: 0deg;
}

#slide-25 .vt-token1 {
  offset-path: path("M158,76 H752 a16,16 0 0 1 0,32 H158 a16,16 0 0 0 0,32 H752 a16,16 0 0 1 0,32 H158 a16,16 0 0 0 0,32 H752");
}

#slide-25 .vt-token2 {
  offset-path: path("M168,312 H340 a26.5,26.5 0 0 1 0,53 H168 a26.5,26.5 0 0 0 0,53 H340");
}

#slide-25 .vt-token-chip {
  fill: rgba(245, 158, 11, 0.15);
  stroke: #f59e0b;
  stroke-width: 1.6;
  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.5));
}

#slide-25 .vt-token-emoji {
  font-size: 15px;
}

#slide-25 .vt-j1.step-active .vt-token1 {
  opacity: 1;
  animation: vtTravel1 1.6s linear forwards;
}

#slide-25 .vt-j2.step-active .vt-token2 {
  opacity: 1;
  animation: vtTravel2 0.4s linear forwards;
}

@keyframes vtTravel1 {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}

@keyframes vtTravel2 {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}

/* --- Punto de llegada + salida iluminada (aparecen al final del viaje) --- */
#slide-25 .vt-arr1,
#slide-25 .vt-arr2,
#slide-25 .vt-exit1,
#slide-25 .vt-exit2 {
  opacity: 0;
}

#slide-25 .vt-arr1 {
  fill: #d97706;
}

#slide-25 .vt-arr2 {
  fill: #0284c7;
}

#slide-25 .vt-j1.step-active .vt-arr1 {
  animation: vtPop 0.4s var(--ease-spring) 1.5s both;
}

#slide-25 .vt-j1.step-active .vt-exit1 {
  animation: vtFadeIn 0.45s ease 1.5s both;
}

#slide-25 .vt-j2.step-active .vt-arr2 {
  animation: vtPop 0.4s var(--ease-spring) 0.35s both;
}

#slide-25 .vt-j2.step-active .vt-exit2 {
  animation: vtFadeIn 0.45s ease 0.35s both;
}

@keyframes vtPop {
  0% { opacity: 0; r: 0; }
  60% { opacity: 1; r: 8; }
  100% { opacity: 1; r: 5; }
}

@keyframes vtFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* --- Salidas iluminadas --- */
#slide-25 .vt-exit-lit1 {
  fill: rgba(245, 158, 11, 0.1);
  stroke: #d97706;
  stroke-width: 1.6;
}

#slide-25 .vt-exit-lit2 {
  fill: rgba(2, 132, 199, 0.1);
  stroke: #0284c7;
  stroke-width: 1.6;
}

#slide-25 .vt-clock1 {
  font-family: var(--font-mono);
  font-size: 17px;
  font-weight: 800;
  fill: #b45309;
}

#slide-25 .vt-clock2 {
  font-family: var(--font-mono);
  font-size: 17px;
  font-weight: 800;
  fill: #0284c7;
}

#slide-25 .vt-tokps1 {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  fill: var(--text-muted);
}

#slide-25 .vt-tokps2 {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 800;
  fill: #059669;
}

/* --- Salida estática se apaga cuando llega el token --- */
#slide-25:has(.vt-j1.step-active) .vt-exit-static1 {
  opacity: 0.1;
}

#slide-25:has(.vt-j2.step-active) .vt-exit-static2 {
  opacity: 0.1;
}

/* --- Franja de espera y veredicto --- */
#slide-25 .vt-strip {
  fill: var(--bg-surface);
  stroke: var(--border-subtle);
  stroke-width: 1.5;
}

#slide-25 .vt-strip-static {
  stroke-dasharray: 7 6;
  transition: opacity 0.4s ease;
}

#slide-25 .vt-strip-wait {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  fill: var(--text-dim);
  letter-spacing: 0.06em;
  transition: opacity 0.4s ease;
}

#slide-25 .vt-verdict {
  opacity: 0;
  transition: opacity 0.5s ease 0.15s;
}

#slide-25 .vt-verdict.step-active {
  opacity: 1;
}

#slide-25 .vt-strip-lit {
  fill: rgba(16, 185, 129, 0.08);
  stroke: #059669;
  stroke-width: 1.6;
}

#slide-25 .vt-verdict-main {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 800;
  fill: #059669;
  letter-spacing: 0.02em;
}

#slide-25 .vt-strip-l1 {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 700;
  fill: var(--text-main);
}

#slide-25 .vt-strip-l2 {
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 600;
  fill: var(--text-muted);
}

#slide-25:has(.vt-verdict.step-active) .vt-strip-static,
#slide-25:has(.vt-verdict.step-active) .vt-strip-wait {
  opacity: 0;
}

#slide-25 .vt-cap-final {
  opacity: 0;
  transition: opacity 0.5s ease 0.3s;
}

#slide-25:has(.vt-verdict.step-active) .vt-cap-final {
  opacity: 1;
}

/* --- Paso activo clicable --- */
#slide-25 .step {
  cursor: pointer;
}

/* ================================================================
   SLIDE 25 — Overview e impresión: estado final (viajes completados)
   ================================================================ */
body.overview-mode #slide-25 .vt-token1,
body.overview-mode #slide-25 .vt-token2 {
  opacity: 1 !important;
  offset-distance: 100% !important;
  animation: none !important;
}

@media print {

  #slide-25 .vt-token1,
  #slide-25 .vt-token2 {
    opacity: 1 !important;
    offset-distance: 100% !important;
    animation: none !important;
  }
}

body.overview-mode #slide-25 .vt-arr1,
body.overview-mode #slide-25 .vt-arr2,
body.overview-mode #slide-25 .vt-exit1,
body.overview-mode #slide-25 .vt-exit2 {
  opacity: 1 !important;
  animation: none !important;
}

@media print {

  #slide-25 .vt-arr1,
  #slide-25 .vt-arr2,
  #slide-25 .vt-exit1,
  #slide-25 .vt-exit2 {
    opacity: 1 !important;
    animation: none !important;
  }
}

body.overview-mode #slide-25 .vt-exit-static,
body.overview-mode #slide-25 .vt-exit-wait,
body.overview-mode #slide-25 .vt-strip-static,
body.overview-mode #slide-25 .vt-strip-wait {
  opacity: 0 !important;
}

@media print {

  #slide-25 .vt-exit-static,
  #slide-25 .vt-exit-wait,
  #slide-25 .vt-strip-static,
  #slide-25 .vt-strip-wait {
    opacity: 0 !important;
  }
}

body.overview-mode #slide-25 .vt-route1,
body.overview-mode #slide-25 .vt-route2 {
  stroke: #d97706;
  opacity: 1 !important;
}

@media print {

  #slide-25 .vt-route1,
  #slide-25 .vt-route2 {
    stroke: #d97706;
    opacity: 1 !important;
  }
}

body.overview-mode #slide-25 .vt-cap-final {
  opacity: 1 !important;
}

@media print {

  #slide-25 .vt-cap-final {
    opacity: 1 !important;
  }
}
"""

css_text = CSS.read_text(encoding="utf-8")
if "SLIDE 25: EL VIAJE DEL TOKEN" not in css_text:
    CSS.write_text(css_text + CSS_BLOCK, encoding="utf-8")
    print("✅ style.css: bloque CSS añadido")
else:
    print("ℹ️ style.css: el bloque ya existía, no se duplica")

print("🎉 Listo. Ejecuta después: python3 bundle.py")
