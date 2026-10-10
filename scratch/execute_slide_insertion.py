#!/usr/bin/env python3
import re
import shutil
from pathlib import Path

# 1. Backups
shutil.copy('index.html', 'scratch/index.html.bak')
shutil.copy('style.css', 'scratch/style.css.bak')
print("✅ Backups creados en scratch/")

# 2. Leer index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Contenido de la nueva Slide 29 (Opción B)
new_slide_29 = '''<!-- ====================================================================
         SLIDE 29: ANATOMÍA DEL SILICIO — CÓMPUTO VS BUS DE MEMORIA
         ==================================================================== -->
    <section class="slide" id="slide-29">
      <div class="slide-content">
        <div class="tag">Rendimiento · Anatomía del Silicio</div>
        <h2>Prefill vs. Decode: <span class="serif-italic" style="color: #ea580c;">el cuello de botella en el silicio</span></h2>
        <p class="subtitle" style="margin-top: -0.7rem;">
          Por qué el mismo chip gana en el prompt y pierde en la respuesta: cómputo matricial paralelo vs. ancho de banda de memoria.
        </p>

        <div class="silicon-duel-grid">
          <!-- Panel Izquierdo: PREFILL (Compute-bound) -->
          <div class="silicon-panel silicon-prefill">
            <div class="silicon-panel-header">
              <div class="silicon-badge prefill-badge">⚙️ FASE 1: PREFILL</div>
              <span class="silicon-phase-label">Ingesta del Prompt · TTFT</span>
            </div>

            <div class="silicon-diagram">
              <svg viewBox="0 0 460 210" class="silicon-svg" aria-label="Diagrama de cómputo paralelo masivo en Prefill">
                <defs>
                  <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ea580c"/>
                    <stop offset="100%" stop-color="#f97316"/>
                  </linearGradient>
                </defs>
                <!-- Prompt entrante en paralelo -->
                <rect x="20" y="15" width="420" height="34" rx="8" fill="rgba(234, 88, 12, 0.08)" stroke="#ea580c" stroke-width="1.5"/>
                <text x="230" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="#c2410c" font-family="var(--font-mono)">32.000 TOKENS DE PROMPT (ENTRADA PARALELA)</text>
                
                <!-- Flechas paralelas cayendo -->
                <path d="M 60 52 L 60 76 M 145 52 L 145 76 M 230 52 L 230 76 M 315 52 L 315 76 M 400 52 L 400 76" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="3,3"/>
                <polygon points="60,82 56,74 64,74" fill="#ea580c"/>
                <polygon points="145,82 141,74 149,74" fill="#ea580c"/>
                <polygon points="230,82 226,74 234,74" fill="#ea580c"/>
                <polygon points="315,82 311,74 319,74" fill="#ea580c"/>
                <polygon points="400,82 396,74 404,74" fill="#ea580c"/>

                <!-- Bloque Tensor Cores -->
                <rect x="20" y="85" width="420" height="58" rx="10" fill="url(#pGrad)"/>
                <text x="230" y="110" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">⚡ MULTIPLICACIÓN MATRICIAL MASIVA</text>
                <text x="230" y="130" text-anchor="middle" font-size="12" font-weight="700" fill="rgba(255,255,255,0.9)" font-family="var(--font-mono)">Tensor Cores FP4 / FP8 · Millones de Operaciones / s</text>

                <!-- Flecha hacia KV Cache -->
                <path d="M 230 145 L 230 162" stroke="#ea580c" stroke-width="2.5"/>
                <polygon points="230,168 226,160 234,160" fill="#ea580c"/>

                <!-- Salida: KV Cache lista -->
                <rect x="70" y="170" width="320" height="30" rx="6" fill="rgba(234, 88, 12, 0.12)" stroke="#ea580c" stroke-width="1.5"/>
                <text x="230" y="190" text-anchor="middle" font-size="12" font-weight="800" fill="#c2410c" font-family="var(--font-mono)">💾 KV CACHE CONSTRUIDA EN MEMORIA</text>
              </svg>
            </div>

            <div class="silicon-metrics">
              <div class="silicon-metric-row">
                <span class="metric-key">Naturaleza:</span>
                <span class="metric-val"><strong>Compute-Bound</strong> (limitado por cómputo)</span>
              </div>
              <div class="silicon-metric-row">
                <span class="metric-key">Cuello de botella:</span>
                <span class="metric-val highlight-orange">TFLOPs brutos de los Tensor Cores</span>
              </div>
              <div class="silicon-metric-row">
                <span class="metric-key">Quién domina:</span>
                <span class="metric-val">👑 <strong>NVIDIA Blackwell</strong> (~7.600 tok/s en 8B)</span>
              </div>
            </div>
          </div>

          <!-- Panel Derecho: DECODE (Memory-bound) -->
          <div class="silicon-panel silicon-decode">
            <div class="silicon-panel-header">
              <div class="silicon-badge decode-badge">🌊 FASE 2: DECODE</div>
              <span class="silicon-phase-label">Generación de la Respuesta · tok/s</span>
            </div>

            <div class="silicon-diagram">
              <svg viewBox="0 0 460 210" class="silicon-svg" aria-label="Diagrama de cuello de botella de memoria en Decode">
                <defs>
                  <linearGradient id="dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7"/>
                    <stop offset="100%" stop-color="#2563eb"/>
                  </linearGradient>
                </defs>
                <!-- Silo de Pesos en RAM -->
                <rect x="20" y="15" width="420" height="34" rx="8" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7" stroke-width="1.5"/>
                <text x="230" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="#0369a1" font-family="var(--font-mono)">40 GB DE PESOS DEL MODELO EN RAM (70B Q4)</text>

                <!-- Tubería de ancho de banda -->
                <path d="M 120 52 L 120 72 L 200 82 M 340 52 L 340 72 L 260 82" stroke="#0284c7" stroke-width="2" stroke-dasharray="3,3"/>
                <rect x="170" y="85" width="120" height="42" rx="8" fill="url(#dGrad)"/>
                <text x="230" y="104" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff" font-family="var(--font-mono)">BUS DE MEMORIA</text>
                <text x="230" y="118" text-anchor="middle" font-size="12" font-weight="900" fill="#bae6fd">GB/s</text>

                <!-- Goteo token a token -->
                <path d="M 230 130 L 230 148" stroke="#0284c7" stroke-width="2.5"/>
                <polygon points="230,154 226,146 234,146" fill="#0284c7"/>

                <!-- Cinta transportadora de tokens secuenciales -->
                <rect x="30" y="160" width="400" height="40" rx="8" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7" stroke-width="1.5"/>
                <g transform="translate(60, 168)">
                  <rect x="0" y="0" width="60" height="24" rx="5" fill="#0284c7"/>
                  <text x="30" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff" font-family="var(--font-mono)">Token 1</text>
                </g>
                <text x="145" y="184" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">→</text>
                <g transform="translate(170, 168)">
                  <rect x="0" y="0" width="60" height="24" rx="5" fill="#0284c7"/>
                  <text x="30" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff" font-family="var(--font-mono)">Token 2</text>
                </g>
                <text x="255" y="184" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">→</text>
                <g transform="translate(280, 168)">
                  <rect x="0" y="0" width="60" height="24" rx="5" fill="#0284c7"/>
                  <text x="30" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#ffffff" font-family="var(--font-mono)">Token 3</text>
                </g>
                <text x="365" y="184" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">...</text>
              </svg>
            </div>

            <div class="silicon-metrics">
              <div class="silicon-metric-row">
                <span class="metric-key">Naturaleza:</span>
                <span class="metric-val"><strong>Memory-Bound</strong> (limitado por memoria)</span>
              </div>
              <div class="silicon-metric-row">
                <span class="metric-key">Cuello de botella:</span>
                <span class="metric-val highlight-blue">Ancho de banda del bus (GB/s)</span>
              </div>
              <div class="silicon-metric-row">
                <span class="metric-key">Quién domina:</span>
                <span class="metric-val">👑 <strong>Apple Silicon</strong> (546 GB/s → 1,2 TB/s)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Barra Inferior Común: La Ley Física de la Memoria -->
        <div class="silicon-law-bar">
          <div class="silicon-law-formula">
            <code>Velocidad máxima (tok/s) ≈ Ancho de banda de memoria (GB/s) ÷ Tamaño del modelo (GB)</code>
          </div>
          <div class="silicon-law-cases">
            <span>70B en 4-bit (~40 GB):</span>
            <span class="case-item">273 GB/s (Spark) → <strong>~6,8 tok/s</strong></span>
            <span class="case-divider">·</span>
            <span class="case-item">546 GB/s (M4 Max) → <strong>~13,6 tok/s</strong></span>
            <span class="case-divider">·</span>
            <span class="case-item">1,2 TB/s (M5 Ultra) → <strong>~30 tok/s</strong></span>
          </div>
        </div>
      </div>
    </section>

'''

# Dividir por slides existentes
# Encontrar la posición donde termina slide-28
s28_end = html.find('</section>', html.find('id="slide-28"')) + len('</section>')

# Separar: antes de slide-29 y desde slide-29
part_before = html[:s28_end]
part_after = html[s28_end:]

# En part_after, reenumerar los ids de slide-29 a slide-52 -> slide-30 a slide-53
# Lo hacemos de mayor a menor para evitar colisiones
for num in range(52, 28, -1):
    old_id = f'id="slide-{num}"'
    new_id = f'id="slide-{num+1}"'
    part_after = part_after.replace(old_id, new_id)
    
    # También actualizar los comentarios <!-- SLIDE N: ... --> si existen
    # Notar que algunos comentarios tenían números desfasados, así que buscamos patrones específicos
    old_comm_pat = rf'<!--\s*=+\s*\n\s*SLIDE\s+{num}:'
    # Solo reemplazar si coincide
    def replace_comm(m, new_n=num+1):
        return m.group(0).replace(f'SLIDE {num}:', f'SLIDE {new_n}:')
    part_after = re.sub(rf'(<!--\s*=+\s*\n\s*SLIDE\s+){num}(:)', rf'\g<1>{num+1}\g<2>', part_after)

# Actualizar el contador del HUD de 52 a 53
part_after = part_after.replace('<span id="slide-total">52</span>', '<span id="slide-total">53</span>')

# Reconstruir html
new_html = part_before + '\n\n' + new_slide_29 + part_after

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("✅ index.html actualizado con la nueva slide-29 y reenumeración 30..53")

# 3. Actualizar style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Desplazar selectores de deck-hardware-part1 de mayor a menor
shifts = [
    (49, 50),
    (48, 49),
    (47, 48),
    (46, 47),
    (43, 44),
    (39, 40),
    (37, 38),
    (36, 37),
    (29, 30),
]

for old_n, new_n in shifts:
    # Usar un marcador temporal para evitar colisiones entre pasos
    marker = f'__SLIDE_SHIFT_{new_n}__'
    # Solo reemplazar en líneas que no sean de deck-sdlc-part2
    lines = css.split('\n')
    new_lines = []
    for line in lines:
        if 'deck-sdlc-part2' in line:
            new_lines.append(line)
        else:
            new_lines.append(line.replace(f'#slide-{old_n}', marker))
    css = '\n'.join(new_lines)

# Reemplazar marcadores por los valores finales
for old_n, new_n in shifts:
    marker = f'__SLIDE_SHIFT_{new_n}__'
    css = css.replace(marker, f'#slide-{new_n}')

# Agregar el CSS de la nueva slide 29 al final de style.css
slide29_css = '''
/* ==========================================================================
   SLIDE 29: ANATOMÍA DEL SILICIO (PREFILL VS DECODE EN EL SILICIO)
   ========================================================================== */
body.deck-hardware-part1 #slide-29 .silicon-duel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  width: 100%;
  margin-top: 0.5rem;
}

body.deck-hardware-part1 #slide-29 .silicon-panel {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

body.deck-hardware-part1 #slide-29 .silicon-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(234, 88, 12, 0.25);
}

body.deck-hardware-part1 #slide-29 .silicon-panel.silicon-decode .silicon-panel-header {
  border-bottom-color: rgba(2, 132, 199, 0.25);
}

body.deck-hardware-part1 #slide-29 .silicon-badge {
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: 800;
  padding: 0.35rem 0.8rem;
  border-radius: 8px;
  letter-spacing: 0.5px;
}

body.deck-hardware-part1 #slide-29 .prefill-badge {
  background: rgba(234, 88, 12, 0.1);
  color: #c2410c;
  border: 1px solid rgba(234, 88, 12, 0.3);
}

body.deck-hardware-part1 #slide-29 .decode-badge {
  background: rgba(2, 132, 199, 0.1);
  color: #0369a1;
  border: 1px solid rgba(2, 132, 199, 0.3);
}

body.deck-hardware-part1 #slide-29 .silicon-phase-label {
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--text-muted);
}

body.deck-hardware-part1 #slide-29 .silicon-diagram {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 0.5rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

body.deck-hardware-part1 #slide-29 .silicon-svg {
  width: 100%;
  height: 195px;
  display: block;
}

body.deck-hardware-part1 #slide-29 .silicon-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

body.deck-hardware-part1 #slide-29 .silicon-metric-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 1.12rem;
  line-height: 1.35;
  color: var(--text-main);
  padding: 0.25rem 0;
  border-bottom: 1px dashed var(--border-subtle);
}

body.deck-hardware-part1 #slide-29 .silicon-metric-row:last-child {
  border-bottom: none;
}

body.deck-hardware-part1 #slide-29 .metric-key {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 1.02rem;
}

body.deck-hardware-part1 #slide-29 .metric-val {
  font-weight: 600;
}

body.deck-hardware-part1 #slide-29 .highlight-orange {
  color: #c2410c;
  font-weight: 700;
}

body.deck-hardware-part1 #slide-29 .highlight-blue {
  color: #0369a1;
  font-weight: 700;
}

body.deck-hardware-part1 #slide-29 .silicon-law-bar {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 0.8rem 1.3rem;
  text-align: center;
  margin-top: 0.9rem;
}

body.deck-hardware-part1 #slide-29 .silicon-law-formula code {
  font-family: var(--font-mono);
  font-size: 1.22rem;
  font-weight: 700;
  color: var(--text-main);
}

body.deck-hardware-part1 #slide-29 .silicon-law-cases {
  margin-top: 0.4rem;
  font-size: 1.08rem;
  color: var(--text-muted);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}

body.deck-hardware-part1 #slide-29 .case-item strong {
  color: var(--text-main);
}

body.deck-hardware-part1 #slide-29 .case-divider {
  color: var(--text-dim);
}
'''

css += slide29_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("✅ style.css actualizado con selectores reenumerados y estilos de slide-29")
