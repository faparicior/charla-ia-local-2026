const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newSlide31 = `    <!-- ====================================================================
         SLIDE 31: LOS 3 NIVELES DE ATENCIÓN (JUNTAS, PRÓXIMAS Y ALEJADAS)
         ==================================================================== -->
    <section class="slide" id="slide-31">
      <div class="slide-content">
        <div class="tag">Pedagogía Visual • Cómo Conecta y Recuerda el LLM</div>
        <h2>Los 3 Niveles de Atención: <span class="serif-italic" style="color: #10b981;">Juntas, Próximas y Alejadas</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          Un LLM resuelve la gramática inmediata sin perder la capacidad de recordar datos a 1 millón de palabras de distancia.
        </p>

        <div class="rope-levels-deck">

          <!-- Rejilla Principal: SVG a la izquierda, 3 Tarjetas Pedagógicas a la derecha -->
          <div class="rope-levels-split-grid">

            <!-- Columna Izquierda: Gráfico SVG de los 3 Niveles Multiescala -->
            <div class="rope-levels-svg-card">
              <div class="yarn-card-header">
                <span class="yarn-card-title">🔭 Telescopio Multiescala de Atención</span>
                <span class="yarn-badge green">3 Zooms Simultáneos</span>
              </div>

              <div class="rope-levels-svg-viewport">
                <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Nivel 1: Palabras Juntas (Micro-Sintaxis) -->
                  <rect x="10" y="8" width="540" height="142" rx="10" fill="rgba(99, 102, 241, 0.06)" stroke="rgba(99, 102, 241, 0.25)" stroke-width="1.4" />
                  <text x="25" y="32" fill="#6366f1" font-family="var(--font-sans)" font-size="14.5" font-weight="800">🧩 1. JUNTAS (Inmediatas • Segundero)</text>
                  
                  <rect x="25" y="44" width="220" height="52" rx="7" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.2" />
                  <text x="38" y="66" fill="var(--text-main)" font-family="var(--font-sans)" font-size="13" font-weight="800">Token 1: <tspan fill="#6366f1">"machine"</tspan></text>
                  <text x="38" y="86" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="11">[ Día 1 | H 1 | <tspan fill="#6366f1" font-weight="800">Seg 12</tspan> ]</text>

                  <rect x="315" y="44" width="220" height="52" rx="7" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.2" />
                  <text x="328" y="66" fill="var(--text-main)" font-family="var(--font-sans)" font-size="13" font-weight="800">Token 2: <tspan fill="#6366f1">"learning"</tspan></text>
                  <text x="328" y="86" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="11">[ Día 1 | H 1 | <tspan fill="#6366f1" font-weight="800">Seg 13</tspan> ]</text>

                  <path d="M 245 70 L 315 70" stroke="#6366f1" stroke-width="2.5" stroke-dasharray="4 4" />
                  <circle cx="280" cy="70" r="12" fill="#6366f1" />
                  <text x="280" y="74" text-anchor="middle" fill="#fff" font-family="var(--font-mono)" font-size="9.5" font-weight="800">Δ1</text>

                  <rect x="25" y="105" width="510" height="34" rx="6" fill="rgba(99, 102, 241, 0.12)" />
                  <text x="38" y="127" fill="#6366f1" font-family="var(--font-sans)" font-size="11.5" font-weight="700">👉 Giro de 90° ➔ Atención máxima obligatoria (Gramática perfecta e inmutable).</text>


                  <!-- Nivel 2: Palabras Próximas (Meso-Estructura) -->
                  <rect x="10" y="162" width="540" height="142" rx="10" fill="rgba(245, 158, 11, 0.06)" stroke="rgba(245, 158, 11, 0.25)" stroke-width="1.4" />
                  <text x="25" y="186" fill="#d97706" font-family="var(--font-sans)" font-size="14.5" font-weight="800">⏳ 2. PRÓXIMAS (Párrafo / Código • Minutero)</text>
                  
                  <rect x="25" y="198" width="220" height="52" rx="7" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.2" />
                  <text x="38" y="220" fill="var(--text-main)" font-family="var(--font-sans)" font-size="13" font-weight="800">Inicio: <tspan fill="#d97706">"def compute():"</tspan></text>
                  <text x="38" y="240" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="11">[ Día 1 | <tspan fill="#d97706" font-weight="800">H 1</tspan> | Seg 05 ]</text>

                  <rect x="315" y="198" width="220" height="52" rx="7" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.2" />
                  <text x="328" y="220" fill="var(--text-main)" font-family="var(--font-sans)" font-size="13" font-weight="800">Cierre: <tspan fill="#d97706">"return total"</tspan></text>
                  <text x="328" y="240" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="11">[ Día 1 | <tspan fill="#d97706" font-weight="800">H 2</tspan> | Seg 40 ]</text>

                  <path d="M 245 224 L 315 224" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4 4" />
                  <circle cx="280" cy="224" r="12" fill="#f59e0b" />
                  <text x="280" y="228" text-anchor="middle" fill="#fff" font-family="var(--font-mono)" font-size="9.5" font-weight="800">ΔH</text>

                  <rect x="25" y="259" width="510" height="34" rx="6" fill="rgba(245, 158, 11, 0.12)" />
                  <text x="38" y="281" fill="#d97706" font-family="var(--font-sans)" font-size="11.5" font-weight="700">👉 Rampa Spline ➔ Conecta variables y funciones sin rupturas en el flujo.</text>


                  <!-- Nivel 3: Palabras Alejadas (Macro-Memoria 1M) -->
                  <rect x="10" y="316" width="540" height="152" rx="10" fill="rgba(16, 185, 129, 0.06)" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1.4" />
                  <text x="25" y="340" fill="#059669" font-family="var(--font-sans)" font-size="14.5" font-weight="800">🕰️ 3. ALEJADAS (Memoria 1 Millón • Horario / Días)</text>
                  
                  <rect x="25" y="352" width="220" height="52" rx="7" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.2" />
                  <text x="38" y="374" fill="var(--text-main)" font-family="var(--font-sans)" font-size="13" font-weight="800">Token 5: <tspan fill="#059669">"API_KEY=..."</tspan></text>
                  <text x="38" y="394" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="11">[ <tspan fill="#059669" font-weight="800">Día 1</tspan> | H 1 | Seg 05 ]</text>

                  <rect x="315" y="352" width="220" height="52" rx="7" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.2" />
                  <text x="328" y="374" fill="var(--text-main)" font-family="var(--font-sans)" font-size="13" font-weight="800">Token 800K: <tspan fill="#059669">"fetch(key)"</tspan></text>
                  <text x="328" y="394" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="11">[ <tspan fill="#059669" font-weight="800">Día 850</tspan> | H 14 | Seg 20 ]</text>

                  <path d="M 245 378 L 315 378" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4 4" />
                  <circle cx="280" cy="378" r="12" fill="#10b981" />
                  <text x="280" y="382" text-anchor="middle" fill="#fff" font-family="var(--font-mono)" font-size="9" font-weight="800">Δ849D</text>

                  <rect x="25" y="414" width="510" height="42" rx="6" fill="rgba(16, 185, 129, 0.12)" />
                  <text x="38" y="433" fill="#059669" font-family="var(--font-sans)" font-size="11.2" font-weight="700">👉 Búsqueda Semántica ➔ Localiza datos exactos en repos enteros sin importar</text>
                  <text x="38" y="449" fill="#059669" font-family="var(--font-sans)" font-size="11.2" font-weight="700">la distancia (Needle-in-a-Haystack al 100% de precisión).</text>
                </svg>
              </div>
            </div>

            <!-- Columna Derecha: 3 Tarjetas Explicativas Directas -->
            <div class="rope-levels-info-col">

              <!-- Card 1: Juntas -->
              <div class="rope-level-card card-juntas">
                <div class="rope-level-title">
                  <span>🧩 1. Juntas (Micro-Sintaxis)</span>
                  <span class="rope-level-badge purple">Inmutable (s=1.0)</span>
                </div>
                <p class="rope-level-desc">
                  <strong>¿Por qué habla perfecto?</strong> El segundero gira 90° entre palabras vecinas. Si dices <em>"base"</em>, la atención sabe de forma tajante que la siguiente es <em>"de datos"</em>.
                </p>
              </div>

              <!-- Card 2: Próximas -->
              <div class="rope-level-card card-proximas">
                <div class="rope-level-title">
                  <span>⏳ 2. Próximas (Meso-Estructura)</span>
                  <span class="rope-level-badge amber">Spline Elástico</span>
                </div>
                <p class="rope-level-desc">
                  <strong>¿Por qué no pierde el hilo?</strong> El minutero conecta la cabecera de una función con su retorno 50 líneas más abajo sin saltos bruscos.
                </p>
              </div>

              <!-- Card 3: Alejadas -->
              <div class="rope-level-card card-alejadas">
                <div class="rope-level-title">
                  <span>🕰️ 3. Alejadas (Macro-Memoria 1M)</span>
                  <span class="rope-level-badge green">YaRN 4.0×</span>
                </div>
                <p class="rope-level-desc">
                  <strong>¿Cómo busca a 1 millón de palabras?</strong> La relación no es gramatical: es una <strong>búsqueda de archivo</strong>. El calendario de días localiza el token exacto en el pasado sin confusiones.
                </p>
              </div>

              <!-- Banner Inferior de Síntesis -->
              <div class="chosen-synergy-banner" style="margin-top: 0; padding: 0.95rem 1.4rem;">
                <div class="chosen-synergy-icon" style="font-size: 1.5rem;">💡</div>
                <div class="chosen-synergy-text" style="font-size: 1rem;">
                  <strong>Regla Crafter:</strong> Cada manecilla atiende a una distancia diferente. Nunca se estorban porque el modelo lee todo el sello a la vez.
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
`;

// First, renumber existing slides from 39 down to 31
for (let n = 39; n >= 31; n--) {
  const oldComment = new RegExp(`SLIDE ${n}:`, 'g');
  const newComment = `SLIDE ${n + 1}:`;
  html = html.replace(oldComment, newComment);

  const oldId = new RegExp(`id="slide-${n}"`, 'g');
  const newId = `id="slide-${n + 1}"`;
  html = html.replace(oldId, newId);
}

// Now insert newSlide31 right after slide-30
const slide30End = '</section>\n\n    <!-- ====================================================================\n         SLIDE 32:';
const slide30EndMatch = html.indexOf('id="slide-30"');
if (slide30EndMatch !== -1) {
  const sectionClose = html.indexOf('</section>', slide30EndMatch);
  if (sectionClose !== -1) {
    const insertPos = sectionClose + '</section>'.length;
    html = html.slice(0, insertPos) + '\n\n' + newSlide31 + html.slice(insertPos);
  }
}

// Update slide-total in HUD
html = html.replace(/<span id="slide-total">39<\/span>/g, '<span id="slide-total">40</span>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully inserted Slide 31 and updated total slides to 40!');
