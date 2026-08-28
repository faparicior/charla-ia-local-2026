const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newSlide32 = `    <!-- ====================================================================
         SLIDE 32: LA ANALOGÍA DEL IBAN BANCARIO (UN SOLO VECTOR, 3 ESCALAS)
         ==================================================================== -->
    <section class="slide" id="slide-32">
      <div class="slide-content">
        <div class="tag">Pedagogía Visual • Desmitificando los Vectores de Embedding</div>
        <h2>La Analogía del IBAN Bancario: <span class="serif-italic" style="color: #6366f1;">Un Solo Vector, 3 Escalas</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          No hay 3 vectores por token: hay UN SOLO vector de 4.096 dimensiones que empaqueta país, banco y cuenta.
        </p>

        <div class="rope-iban-deck">

          <div class="rope-iban-split-grid">

            <!-- Columna Izquierda: SVG del Desglose del IBAN y Vector de 4.096 Dims -->
            <div class="rope-iban-svg-card">
              <div class="yarn-card-header">
                <span class="yarn-card-title">💳 Anatomía de 1 Solo Vector (4.096 floats)</span>
                <span class="yarn-badge purple">Empaquetado IBAN</span>
              </div>

              <div class="rope-iban-svg-viewport">
                <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Bloque 1: El Código IBAN Bancario -->
                  <rect x="10" y="8" width="540" height="115" rx="10" fill="rgba(99, 102, 241, 0.05)" stroke="rgba(99, 102, 241, 0.25)" stroke-width="1.4" />
                  <text x="25" y="30" fill="var(--text-dim)" font-family="var(--font-mono)" font-size="11.5" font-weight="700">CÓDIGO IBAN BANCARIO (1 SOLA CADENA):</text>

                  <!-- Segmento ES21 -->
                  <rect x="25" y="42" width="110" height="48" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.4" />
                  <text x="80" y="65" text-anchor="middle" fill="#059669" font-family="var(--font-mono)" font-size="16" font-weight="800">ES21</text>
                  <text x="80" y="82" text-anchor="middle" fill="var(--text-dim)" font-family="var(--font-sans)" font-size="10">País (Macro)</text>

                  <!-- Segmento 0049 -->
                  <rect x="150" y="42" width="110" height="48" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.4" />
                  <text x="205" y="65" text-anchor="middle" fill="#d97706" font-family="var(--font-mono)" font-size="16" font-weight="800">0049</text>
                  <text x="205" y="82" text-anchor="middle" fill="var(--text-dim)" font-family="var(--font-sans)" font-size="10">Banco (Meso)</text>

                  <!-- Segmento Cuenta -->
                  <rect x="275" y="42" width="260" height="48" rx="6" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" stroke-width="1.4" />
                  <text x="405" y="65" text-anchor="middle" fill="#6366f1" font-family="var(--font-mono)" font-size="16" font-weight="800">1500 1234567890</text>
                  <text x="405" y="82" text-anchor="middle" fill="var(--text-dim)" font-family="var(--font-sans)" font-size="10">Cuenta Personal (Micro / Sintaxis)</text>

                  <text x="280" y="112" text-anchor="middle" fill="var(--text-muted)" font-family="var(--font-sans)" font-size="11.5">⬇️ Mapeo directo a las 4.096 casillas del Vector de Embedding ⬇️</text>

                  <!-- Bloque 2: Vector de 4.096 Dimensiones -->
                  <rect x="10" y="132" width="540" height="195" rx="10" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1.4" />
                  <text x="25" y="156" fill="var(--text-main)" font-family="var(--font-sans)" font-size="14.5" font-weight="800">📦 Vector de 1 Token en Qwen / LLaMA ($d = 4.096$)</text>

                  <!-- Tramo Micro: Dims 1..128 -->
                  <rect x="25" y="170" width="160" height="90" rx="7" fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" stroke-width="1.4" />
                  <text x="35" y="194" fill="#6366f1" font-family="var(--font-mono)" font-size="13" font-weight="800">Dims [1 .. 128]</text>
                  <text x="35" y="216" fill="var(--text-main)" font-family="var(--font-sans)" font-size="12" font-weight="700">⏱️ Segundero (Micro)</text>
                  <text x="35" y="236" fill="var(--text-muted)" font-family="var(--font-sans)" font-size="10.5">Sintaxis inmediata</text>
                  <text x="35" y="250" fill="#6366f1" font-family="var(--font-mono)" font-size="10" font-weight="700">🔒 s = 1.0 (Intacto)</text>

                  <!-- Tramo Meso: Dims 129..512 -->
                  <rect x="195" y="170" width="160" height="90" rx="7" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1.4" />
                  <text x="205" y="194" fill="#d97706" font-family="var(--font-mono)" font-size="13" font-weight="800">Dims [129 .. 512]</text>
                  <text x="205" y="216" fill="var(--text-main)" font-family="var(--font-sans)" font-size="12" font-weight="700">⏳ Minutero (Meso)</text>
                  <text x="205" y="236" fill="var(--text-muted)" font-family="var(--font-sans)" font-size="10.5">Párrafos y funciones</text>
                  <text x="205" y="250" fill="#d97706" font-family="var(--font-mono)" font-size="10" font-weight="700">📌 Rampa Spline γ(r)</text>

                  <!-- Tramo Macro: Dims 513..4096 -->
                  <rect x="365" y="170" width="170" height="90" rx="7" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.4" />
                  <text x="375" y="194" fill="#059669" font-family="var(--font-mono)" font-size="13" font-weight="800">Dims [513 .. 4096]</text>
                  <text x="375" y="216" fill="var(--text-main)" font-family="var(--font-sans)" font-size="12" font-weight="700">🕰️ Calendario (Macro)</text>
                  <text x="375" y="236" fill="var(--text-muted)" font-family="var(--font-sans)" font-size="10.5">Memoria de 1M tokens</text>
                  <text x="375" y="250" fill="#059669" font-family="var(--font-mono)" font-size="10" font-weight="700">🚀 YaRN s = 4.0×</text>

                  <rect x="25" y="275" width="510" height="38" rx="6" fill="rgba(0, 0, 0, 0.03)" stroke="var(--border-subtle)" />
                  <text x="40" y="299" fill="var(--text-main)" font-family="var(--font-mono)" font-size="12" font-weight="700">Vector Q = [ 0.84, -0.12, ... 128 micro | ... 512 meso | ... 4096 macro ]</text>

                  <!-- Bloque 3: Operación de Atención Matricial Única -->
                  <rect x="10" y="337" width="540" height="130" rx="10" fill="rgba(99, 102, 241, 0.06)" stroke="rgba(99, 102, 241, 0.25)" stroke-width="1.4" />
                  <text x="25" y="362" fill="#6366f1" font-family="var(--font-sans)" font-size="14.5" font-weight="800">⚡ 1 Sola Multiplicación: Q · Kᵀ (Producto Escalar)</text>
                  <text x="25" y="388" fill="var(--text-main)" font-family="var(--font-sans)" font-size="12.5" font-weight="700">• Si están pegadas ➔ Resuenan las dims micro (Atención gramatical inmediata).</text>
                  <text x="25" y="412" fill="var(--text-main)" font-family="var(--font-sans)" font-size="12.5" font-weight="700">• Si busca en la pág. 800 ➔ Resuenan las dims macro (Recupera API_KEY a 1M tokens).</text>
                  <text x="25" y="445" fill="#059669" font-family="var(--font-sans)" font-size="12" font-weight="800">👉 Conclusión: Todo ocurre en paralelo en un solo ciclo de los Tensor Cores.</text>
                </svg>
              </div>
            </div>

            <!-- Columna Derecha: 3 Tarjetas Explicativas Claras -->
            <div class="rope-iban-info-col">

              <!-- Card 1: Un solo vector -->
              <div class="rope-iban-card card-single-vector">
                <div class="rope-iban-title">
                  <span>💳 1. Un Solo Vector por Token</span>
                  <span class="rope-iban-badge purple">4.096 floats</span>
                </div>
                <p class="rope-iban-desc">
                  <strong>Cero dispersión:</strong> No hay 3 vectores ni capas flotantes. Cada palabra es una única lista continua de 4.096 números donde cada tramo tiene su rol posicional.
                </p>
              </div>

              <!-- Card 2: Multiplicación Única -->
              <div class="rope-iban-card card-dot-product">
                <div class="rope-iban-title">
                  <span>⚡ 2. Cálculo Simultáneo (Q · Kᵀ)</span>
                  <span class="rope-iban-badge amber">1 Pasada GPU</span>
                </div>
                <p class="rope-iban-desc">
                  <strong>Todo a la vez:</strong> La GPU calcula la afinidad entre tokens en una sola operación. Las dimensiones micro resuelven la gramática y las macro resuelven la memoria lejana.
                </p>
              </div>

              <!-- Card 3: Por qué YaRN solo estira el País -->
              <div class="rope-iban-card card-yarn-country">
                <div class="rope-iban-title">
                  <span>🚀 3. YaRN solo estira el "País"</span>
                  <span class="rope-iban-badge green">1M Tokens</span>
                </div>
                <p class="rope-iban-desc">
                  <strong>El gran truco:</strong> Para meter 1 millón de palabras, YaRN solo multiplica las dimensiones macro (4×), dejando el número de cuenta (gramática local) <strong>100% inalterado</strong>.
                </p>
              </div>

              <!-- Banner Inferior -->
              <div class="chosen-synergy-banner" style="margin-top: 0; padding: 0.95rem 1.4rem;">
                <div class="chosen-synergy-icon" style="font-size: 1.5rem;">💡</div>
                <div class="chosen-synergy-text" style="font-size: 1rem;">
                  <strong>Regla Crafter:</strong> El embedding es un IBAN: las primeras cifras garantizan la frase y las últimas navegan repositorios enteros.
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
`;

// First, renumber existing slides from 40 down to 32
for (let n = 40; n >= 32; n--) {
  const oldComment = new RegExp(`SLIDE ${n}:`, 'g');
  const newComment = `SLIDE ${n + 1}:`;
  html = html.replace(oldComment, newComment);

  const oldId = new RegExp(`id="slide-${n}"`, 'g');
  const newId = `id="slide-${n + 1}"`;
  html = html.replace(oldId, newId);
}

// Now insert newSlide32 right after slide-31
const slide31Match = html.indexOf('id="slide-31"');
if (slide31Match !== -1) {
  const sectionClose = html.indexOf('</section>', slide31Match);
  if (sectionClose !== -1) {
    const insertPos = sectionClose + '</section>'.length;
    html = html.slice(0, insertPos) + '\n\n' + newSlide32 + html.slice(insertPos);
  }
}

// Update slide-total in HUD to 41
html = html.replace(/<span id="slide-total">40<\/span>/g, '<span id="slide-total">41</span>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully inserted Slide 32 and updated total slides to 41!');
