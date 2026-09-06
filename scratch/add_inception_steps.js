const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const scbcnHeader = `        <!-- Header Institucional Software Crafters Barcelona -->
        <div class="scbcn-header-bar">
          <div class="scbcn-brand-lockup">
            <svg class="scbcn-unicorn-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="48,8 35,32 52,28" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="48,8 52,28 60,34" fill="#06b6d4" fill-opacity="0.3" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="35,32 52,28 45,46" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="52,28 68,36 60,48" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="52,28 60,34 68,36" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="68,36 78,22 75,40" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="35,32 45,46 25,52" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="25,52 45,46 38,62" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="25,52 38,62 18,66" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="45,46 60,48 52,65" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="45,46 38,62 52,65" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="38,62 52,65 42,78" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="18,66 38,62 30,76" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="30,76 42,78 35,90" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="68,36 75,40 82,50" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="60,48 75,40 68,60" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="75,40 82,50 78,62" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="68,60 78,62 82,75" fill="#06b6d4" fill-opacity="0.25" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="52,65 68,60 62,80" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="52,65 42,78 55,88" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="42,78 55,88 48,94" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="68,60 62,80 76,86" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="62,80 76,86 70,94" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
            </svg>
            <div class="scbcn-brand-text">
              <div class="scbcn-brand-title">Software Crafters Barcelona</div>
              <div class="scbcn-brand-meta">
                <span class="scbcn-edition-pill">XIII EDITION</span>
                <span class="scbcn-hashtag">#SCBCN26</span>
              </div>
            </div>
          </div>
        </div>`;

const inceptionSlides = `
    <!-- ====================================================================
         SLIDE 43: INCEPTION PASO 1 - VISIÓN DEL PRODUCTO & FRONTERAS
         ==================================================================== -->
    <section class="slide" id="slide-43">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">1. Visión &amp; Fronteras: Delimitar el Territorio</h2>
        <div class="scbcn-subtitle">Paso 1 de 8 • Definir qué ES, qué NO ES, qué HACE y qué NO HACE</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto & Reglas -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>Elevator Pitch Canónico:</strong> <em>Para [cliente], que tiene [problema], el [producto] es un [tipo] que [beneficio], a diferencia de [alternativas].</em></span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>La Regla de Oro de las 4 Fronteras:</strong> Mínimo 4 ítems obligatorios en cada uno de los 4 cuadrantes.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Fronteras Negativas:</strong> Definir qué <em>NO ES</em> y qué <em>NO HACE</em> es más importante que lo positivo.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Por qué para la IA:</strong> Evita que el LLM delire añadiendo paneles, integraciones secundarias o complejidades fuera de alcance.</span>
            </div>
          </div>

          <!-- Columna Derecha: Artefacto Visual Real -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">🗺️ Matriz de Fronteras del Producto</span>
              <span class="inception-file-badge">1-product-vision-and-boundaries.md</span>
            </div>
            <div class="inception-boundary-grid">
              <div class="inception-boundary-box is">
                <span class="inception-box-title">✅ ES</span>
                <ul class="inception-box-list">
                  <li>Un motor de inferencia local autónomo</li>
                  <li>Un copiloto guiado por TDD estricto</li>
                  <li>Una herramienta de artesanía de software</li>
                  <li>Un orquestador de modelos open-weights</li>
                </ul>
              </div>
              <div class="inception-boundary-box is-not">
                <span class="inception-box-title">❌ NO ES</span>
                <ul class="inception-box-list">
                  <li>Un generador ciego de código spaghetti</li>
                  <li>Un servicio SaaS en la nube ajena</li>
                  <li>Un chatbot genérico de soporte</li>
                  <li>Un reemplazo del juicio del ingeniero</li>
                </ul>
              </div>
              <div class="inception-boundary-box does">
                <span class="inception-box-title">⚡ HACE</span>
                <ul class="inception-box-list">
                  <li>Ejecuta modelos cuantizados en tu GPU/Mac</li>
                  <li>Valida cada capa contra tests unitarios</li>
                  <li>Genera documentación viva con Mermaid</li>
                  <li>Audita derivas de código vs. specs</li>
                </ul>
              </div>
              <div class="inception-boundary-box does-not">
                <span class="inception-box-title">🚫 NO HACE</span>
                <ul class="inception-box-list">
                  <li>Enviar telemetría ni código a internet</li>
                  <li>Modificar ficheros sin propuesta previa</li>
                  <li>Compilar sin verificación de tipos</li>
                  <li>Ignorar invariantes de arquitectura</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 44: INCEPTION PASO 2 - TABLERO DE TRADEOFFS & DEBATE ASISTIDO
         ==================================================================== -->
    <section class="slide" id="slide-44">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">2. Tablero de Tradeoffs: Si Todo es Prioridad, Nada lo Es</h2>
        <div class="scbcn-subtitle">Paso 2 de 8 • Simulación de debate socrático entre 4 roles y consenso estricto</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>El Debate de los 4 Roles:</strong> La IA simula la tensión creativa de un equipo multidisciplinar:</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Product Owner:</strong> Presiona por time-to-market y volumen de funcionalidades.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Tech Lead:</strong> Defiende la mantenibilidad, robustez y contención de deuda técnica.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>User Advocate:</strong> Exige mínima fricción y consistencia ergonómica.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Agile Coach:</strong> Protege la cadencia sostenible y el alcance realista del MVP.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Regla de Oro Inquebrantable:</strong> <em>Exactamente una X por columna de prioridad</em>. Si hay 7 dimensiones, solo una puede ser prioridad #1.</span>
            </div>
          </div>

          <!-- Columna Derecha: Tablero Real -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">⚖️ Tablero de Tradeoffs Consensuado</span>
              <span class="inception-file-badge">2-tradeoffs.md</span>
            </div>
            <table class="inception-tradeoff-table">
              <thead>
                <tr>
                  <th>Dimensión</th>
                  <th>P1 (Máx)</th>
                  <th>P2</th>
                  <th>P3</th>
                  <th>P4</th>
                  <th>P5</th>
                  <th>P6 (Mín)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🔒 Privacidad &amp; Control Local</td>
                  <td><span class="tradeoff-check">✕</span></td>
                  <td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                  <td>⚡ Latencia de Inferencia</td>
                  <td></td>
                  <td><span class="tradeoff-check">✕</span></td>
                  <td></td><td></td><td></td><td></td>
                </tr>
                <tr>
                  <td>🛡️ Calidad Arquitectónica</td>
                  <td></td><td></td>
                  <td><span class="tradeoff-check">✕</span></td>
                  <td></td><td></td><td></td>
                </tr>
                <tr>
                  <td>🧩 Ergonomía &amp; DX</td>
                  <td></td><td></td><td></td>
                  <td><span class="tradeoff-check">✕</span></td>
                  <td></td><td></td>
                </tr>
                <tr>
                  <td>💰 Coste de Hardware</td>
                  <td></td><td></td><td></td><td></td>
                  <td><span class="tradeoff-check">✕</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td>📦 Volumen de Features</td>
                  <td></td><td></td><td></td><td></td><td></td>
                  <td><span class="tradeoff-check">✕</span></td>
                </tr>
              </tbody>
            </table>
            <div style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.35; margin-top: 0.4rem;">
              👉 <strong>Consenso:</strong> Sacrificamos volumen de features en favor de privacidad innegociable y latencia inmediata.
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 45: INCEPTION PASO 3 - USER PERSONAS
         ==================================================================== -->
    <section class="slide" id="slide-45">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">3. Personas de Usuario: Poner Rostro al Problema</h2>
        <div class="scbcn-subtitle">Paso 3 de 8 • Arquetipos reales, objetivos concretos y dolores cotidianos</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>El Peligro del "Usuario Genérico":</strong> La IA tiende a diseñar para un ente abstracto, produciendo soluciones sobre-complejas e impersonales.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Arquetipos con Tensión Real:</strong> Se define el rol, el contexto de uso, las presiones organizativas y el nivel de tolerancia a fallos.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Metas vs. Obstáculos:</strong> Qué intenta conseguir en su día a día y qué herramientas rotas se lo impiden actualmente.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Anclaje Semántico:</strong> Toda user story futura comenzará con <em>"Como [Persona] quiero..."</em> citando a este arquetipo real.</span>
            </div>
          </div>

          <!-- Columna Derecha: Ficha de Persona -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">👤 Ficha de Persona Primaria</span>
              <span class="inception-file-badge">3-personas/elena-tech-lead.md</span>
            </div>
            <div class="inception-persona-box">
              <div class="inception-persona-header">
                <div class="inception-persona-avatar">ET</div>
                <div class="inception-persona-meta">
                  <div class="inception-persona-name">Elena Torres (36 años)</div>
                  <div class="inception-persona-role">Tech Lead &amp; Software Crafter en FinTech</div>
                </div>
              </div>
              <div class="inception-persona-quote">
                “No puedo permitir que un copiloto mande nuestro código contable a servidores externos, ni tolero tener que refactorizar 500 líneas de código generado sin tests.”
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.78rem;">
                <div style="background: rgba(16, 185, 129, 0.08); padding: 0.5rem; border-radius: 6px;">
                  <strong style="color: #059669;">🎯 Objetivos:</strong>
                  <ul style="margin: 0.2rem 0 0 0; padding-left: 0.8rem; color: var(--text-muted);">
                    <li>Inferencia 100% en local sin leaks</li>
                    <li>TDD estricto antes de cada commit</li>
                  </ul>
                </div>
                <div style="background: rgba(239, 68, 68, 0.08); padding: 0.5rem; border-radius: 6px;">
                  <strong style="color: #dc2626;">💥 Dolores:</strong>
                  <ul style="margin: 0.2rem 0 0 0; padding-left: 0.8rem; color: var(--text-muted);">
                    <li>Facturas imprevistas de APIs cloud</li>
                    <li>Alucinaciones en DDD y estados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 46: INCEPTION PASO 4 - MAPA DE EMPATÍA
         ==================================================================== -->
    <section class="slide" id="slide-46">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">4. Mapa de Empatía: Sumergirse en la Mente del Usuario</h2>
        <div class="scbcn-subtitle">Paso 4 de 8 • Conectar emociones, percepciones sensoriales y fricciones profundas</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>Más Allá de los Requisitos Funcionales:</strong> El software fracasa cuando no resuelve la ansiedad o frustración real de la persona.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Las 4 Percepciones Sensoriales:</strong> Qué piensa/siente (lo íntimo), qué oye (lo social), qué ve (su entorno) y qué dice/hace (lo público).</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Contraste Pains vs. Gains:</strong> Identificar qué fricciones drenan la energía del equipo y qué victorias rápidas disparan el entusiasmo.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Alineación del Modelo:</strong> Le da a la IA el barómetro emocional para redactar explicaciones y documentar errores con empatía.</span>
            </div>
          </div>

          <!-- Columna Derecha: Mapa de Empatía -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">🧭 Brújula de Empatía</span>
              <span class="inception-file-badge">4-empathy-map.md</span>
            </div>
            <div class="inception-empathy-grid">
              <div class="inception-empathy-box">
                <div class="inception-empathy-title">🧠 ¿Qué piensa y siente?</div>
                <div style="color: var(--text-muted); font-size: 0.74rem;">"La IA es el futuro, pero si la adopto sin rigor ensucio el repositorio y pierdo el control."</div>
              </div>
              <div class="inception-empathy-box">
                <div class="inception-empathy-title">👂 ¿Qué oye en su entorno?</div>
                <div style="color: var(--text-muted); font-size: 0.74rem;">"El management exige métricas de adopción; los crafters advierten de la pérdida de habilidades."</div>
              </div>
              <div class="inception-empathy-box">
                <div class="inception-empathy-title">👀 ¿Qué ve en el mercado?</div>
                <div style="color: var(--text-muted); font-size: 0.74rem;">Herramientas cloud que cobran por token y suben precios arbitrariamente cada trimestre.</div>
              </div>
              <div class="inception-empathy-box">
                <div class="inception-empathy-title">🗣️ ¿Qué dice y hace?</div>
                <div style="color: var(--text-muted); font-size: 0.74rem;">Prueba modelos locales por las tardes en Ollama y busca flujos reproducibles para su equipo.</div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.3rem;">
              <div style="flex: 1; background: rgba(239, 68, 68, 0.08); padding: 0.45rem 0.6rem; border-radius: 6px; font-size: 0.74rem;">
                <strong style="color: #dc2626;">💔 Pains:</strong> Pérdida de privacidad, dependencias cloud opacas.
              </div>
              <div style="flex: 1; background: rgba(16, 185, 129, 0.08); padding: 0.45rem 0.6rem; border-radius: 6px; font-size: 0.74rem;">
                <strong style="color: #059669;">✨ Gains:</strong> Autonomía de cómputo, código testeado en local.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 47: INCEPTION PASO 5 - BRAINSTORMING DE FEATURES
         ==================================================================== -->
    <section class="slide" id="slide-47">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">5. Brainstorming de Features: Ideas Ancladas en Valor</h2>
        <div class="scbcn-subtitle">Paso 5 de 8 • Divergencia de funcionalidades orientadas a resolver dolores concretos</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>Divergencia Controlada:</strong> En este paso se generan libremente propuestas de funcionalidades, pero con una restricción férrea:</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Justificación de Existencia:</strong> Ninguna feature entra en la pizarra sin declarar a qué Persona (Paso 3) y qué Dolor (Paso 4) resuelve.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Clasificación por Objetivos:</strong> Se categorizan según los ejes estratégicos del producto (Núcleo, DX, Auditoría).</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Cero Bloatware:</strong> La IA propone decenas de ideas, pero el filtro de las 4 fronteras del Paso 1 descarta inmediatamente lo accesorio.</span>
            </div>
          </div>

          <!-- Columna Derecha: Pizarra de Features -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">💡 Pizarra de Ideas Categorizadas</span>
              <span class="inception-file-badge">5-brainstorming.md</span>
            </div>
            <div class="inception-brainstorm-grid">
              <div class="inception-postit yellow">
                <span class="postit-tag">Núcleo Local</span>
                <strong>Inferencia Ollama/vLLM</strong>
                <span>Cliente HTTP asíncrono con fallback automático entre Qwen 3.5 y 2.5 Coder.</span>
              </div>
              <div class="inception-postit blue">
                <span class="postit-tag">TDD &amp; DDD</span>
                <strong>Generador de Test E2E</strong>
                <span>Plantillas que fuerzan la especificación del escenario antes de la implementación.</span>
              </div>
              <div class="inception-postit purple">
                <span class="postit-tag">Living Docs</span>
                <strong>Mermaid Sync Automático</strong>
                <span>Actualización bidireccional de diagramas de secuencia con cada commit.</span>
              </div>
              <div class="inception-postit yellow">
                <span class="postit-tag">Núcleo Local</span>
                <strong>KV Cache Monitor</strong>
                <span>Alertas en tiempo real si el contexto supera los 32K tokens en VRAM.</span>
              </div>
              <div class="inception-postit blue">
                <span class="postit-tag">TDD &amp; DDD</span>
                <strong>Guards Validator</strong>
                <span>Verificación de precondiciones booleanas en máquinas de estado de dominio.</span>
              </div>
              <div class="inception-postit purple">
                <span class="postit-tag">Living Docs</span>
                <strong>Audit Drift Detector</strong>
                <span>Barrido estático que compara clases del código con ficheros markdown.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 48: INCEPTION PASO 6 - USER JOURNEY MAPPING
         ==================================================================== -->
    <section class="slide" id="slide-48">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">6. User Journey Mapping: El Puente hacia la Ingeniería</h2>
        <div class="scbcn-subtitle">Paso 6 de 8 • La secuencia cronológica que alimentará directamente los flujos técnicos</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>El Eslabón Decisivo del SDLC:</strong> Aquí las ideas sueltas del brainstorming se convierten en una historia cronológica interactiva.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Trigger Inicial:</strong> El evento desencadenante que pone en marcha la interacción.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Paso a Paso Interactivo:</strong> Acciones del usuario, respuestas del sistema y decisiones en bifurcación.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Momento Wow:</strong> El punto culminante donde el usuario percibe el valor diferencial del producto.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Entrada Directa a Fase 2:</strong> Cada journey terminado alimenta al comando <code>/create-flow-documentation</code> para escribir specs y tests.</span>
            </div>
          </div>

          <!-- Columna Derecha: User Journey Trail -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">🚶 Journey: Implementar Flujo en Local</span>
              <span class="inception-file-badge">6-user-journeys/journey-01-local-dev.md</span>
            </div>
            <div class="inception-journey-trail">
              <div class="journey-step-node">
                <span class="journey-step-num">01</span>
                <div class="journey-step-desc">Elena ejecuta <code>/implement-flow</code> en su IDE con la spec lista.</div>
                <span class="journey-step-emotion">😐</span>
              </div>
              <div class="journey-step-node">
                <span class="journey-step-num">02</span>
                <div class="journey-step-desc">El LLM genera el test E2E rojo en su suite local sin salir a la red.</div>
                <span class="journey-step-emotion">🙂</span>
              </div>
              <div class="journey-step-node">
                <span class="journey-step-num">03</span>
                <div class="journey-step-desc">Crea capa por capa: Dominio ➔ Casos de uso ➔ Adaptadores.</div>
                <span class="journey-step-emotion">⚡</span>
              </div>
              <div class="journey-step-node">
                <span class="journey-step-num">04</span>
                <div class="journey-step-desc">Ejecución automática de <code>mvn test</code>: ¡Todo en verde en 12s!</div>
                <span class="journey-step-emotion">🤩</span>
              </div>
            </div>
            <div style="font-size: 0.74rem; color: #059669; font-weight: 700; margin-top: 0.3rem;">
              ➔ Salida lista: Transforma automáticamente este camino en un flow-spec con diagramas Mermaid.
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 49: INCEPTION PASO 7 - SECUENCIACIÓN & OLAS DE ENTREGA
         ==================================================================== -->
    <section class="slide" id="slide-49">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">7. Secuenciación en Olas: Separar el Trigo de la Paja</h2>
        <div class="scbcn-subtitle">Paso 7 de 8 • Agrupar por valor y esfuerzo: qué entra en el MVP y qué se pospone</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>El Error de Construir Todo a la Vez:</strong> Un proyecto de IA fracasa si intenta resolver todos los casos de uso en la primera versión.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Ola 1 (El MVP Indispensable):</strong> Solo las piezas necesarias para validar el valor técnico central sin dependencias accesorias.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Ola 2 (Primer Incremento):</strong> Automatizaciones avanzadas, mayor soporte de modelos y telemetría interna.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Ola 3 (Futuro y Escala):</strong> Optimizaciones de compresión extrema y agentes multi-repo.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>Compromiso del Equipo:</strong> Todo lo que no esté en la Ola 1 queda estrictamente bloqueado para no dispersar el foco.</span>
            </div>
          </div>

          <!-- Columna Derecha: Olas de Entrega -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">🌊 Secuenciador de Entregas</span>
              <span class="inception-file-badge">7-features-and-sequencing.md</span>
            </div>
            <div class="inception-waves-stack">
              <div class="inception-wave-card wave-1">
                <div class="wave-card-header">
                  <span class="wave-title">🚀 OLA 1 — MVP (Foco Absoluto)</span>
                  <span class="sdlc-phase-badge green">Prioridad Inmediata</span>
                </div>
                <div style="font-size: 0.76rem; color: var(--text-main); font-weight: 600;">
                  • Inferencia Ollama/vLLM en local<br>
                  • Flujo TDD capa por capa para 1 caso de uso<br>
                  • Validación de invariantes en memoria
                </div>
              </div>
              <div class="inception-wave-card wave-2">
                <div class="wave-card-header">
                  <span class="wave-title">📈 OLA 2 — Incremento Funcional</span>
                  <span class="sdlc-phase-badge blue">Siguiente Iteración</span>
                </div>
                <div style="font-size: 0.76rem; color: var(--text-main); font-weight: 600;">
                  • Auditoría periódica de deriva de documentación<br>
                  • Integración con consumidores de eventos Kafka
                </div>
              </div>
              <div class="inception-wave-card wave-3">
                <div class="wave-card-header">
                  <span class="wave-title">🔮 OLA 3 — Madurez &amp; Escala</span>
                  <span class="sdlc-phase-badge rose">Roadmap Futuro</span>
                </div>
                <div style="font-size: 0.76rem; color: var(--text-dim);">
                  • Cuantización automática en NVFP4/AutoRound<br>
                  • Orquestación multi-agente distribuida
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 50: INCEPTION PASO 8 - MVP CANVAS DEFINITIVO
         ==================================================================== -->
    <section class="slide" id="slide-50">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">8. MVP Canvas: El Contrato Definitivo de Producto</h2>
        <div class="scbcn-subtitle">Paso 8 de 8 • El lienzo que unifica visión, alcance, métricas y coste antes de escribir código</div>

        <div class="scbcn-split-grid">
          <!-- Columna Izquierda: Concepto -->
          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span><strong>El Producto en una Sola Página:</strong> Toda la investigación de los 7 pasos anteriores se consolida en un contrato vinculante.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Los 7 Bloques Esenciales:</strong> Propuesta de valor, personas atendidas, journeys cubiertos, features de la Ola 1, resultado esperado, métricas y coste.</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span><strong>Criterio de Aprobación Crafter:</strong> El paso requiere una puntuación de validación formal >= 8/10 para ser aprobado.</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span><strong>¡Listos para Picar Código!:</strong> Con este artefacto, el desarrollador y el LLM tienen un marco inequívoco. Se acabaron las alucinaciones.</span>
            </div>
          </div>

          <!-- Columna Derecha: MVP Canvas Matrix -->
          <div class="inception-artifact-card">
            <div class="inception-artifact-header">
              <span class="inception-artifact-title">📋 Lienzo MVP Canvas Final</span>
              <span class="inception-file-badge">8-mvp-canvas.md</span>
            </div>
            <div class="inception-canvas-grid">
              <div class="inception-canvas-block">
                <span class="canvas-block-label">1. Propuesta de Valor</span>
                <span>Desarrollo con IA privada, rápida y guiada por TDD en hardware local.</span>
              </div>
              <div class="inception-canvas-block">
                <span class="canvas-block-label">2. Personas</span>
                <span>Tech Leads, Arquitectos y Crafters con exigencias de privacidad.</span>
              </div>
              <div class="inception-canvas-block">
                <span class="canvas-block-label">3. Journeys</span>
                <span>Creación y modificación de flujos DDD con suite de tests.</span>
              </div>
              <div class="inception-canvas-block">
                <span class="canvas-block-label">4. Features MVP</span>
                <span>Ollama Client + Generador TDD + Parser Mermaid.</span>
              </div>
              <div class="inception-canvas-block">
                <span class="canvas-block-label">5. Resultado</span>
                <span>Cero fugas de datos y código 100% testeado en local.</span>
              </div>
              <div class="inception-canvas-block">
                <span class="canvas-block-label">6. Métricas Éxito</span>
                <span>Latencia &lt; 30s/test y 0 incidentes de fuga de datos.</span>
              </div>
            </div>
            <div class="canvas-stamp">
              <span>✅ INCEPTION VALIDADA: Score 9.4 / 10</span>
              <span style="font-size: 0.72rem; text-transform: uppercase;">Ready for Dev</span>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// 1. Renumber slides from 52 down to 43 by adding 8 (52 becomes 60, ..., 43 becomes 51)
for (let n = 52; n >= 43; n--) {
  const oldComment = new RegExp(`SLIDE ${n}:`, 'g');
  const newComment = `SLIDE ${n + 8}:`;
  html = html.replace(oldComment, newComment);

  const oldId = new RegExp(`id="slide-${n}"`, 'g');
  const newId = `id="slide-${n + 8}"`;
  html = html.replace(oldId, newId);
}

// 2. Insert the 8 inception slides right after slide-42
const slide42Pos = html.indexOf('id="slide-42"');
if (slide42Pos === -1) {
  console.error('Could not find id="slide-42"');
  process.exit(1);
}

const sectionClose = html.indexOf('</section>', slide42Pos);
if (sectionClose === -1) {
  console.error('Could not find </section> for slide-42');
  process.exit(1);
}

const insertPos = sectionClose + '</section>'.length;
html = html.slice(0, insertPos) + '\n\n' + inceptionSlides + html.slice(insertPos);

// 3. Update the TDD card link in Slide 2 from #43 to #51
html = html.replace(/<a class="template-card" href="#43">/g, '<a class="template-card" href="#51">');

// 4. Update HUD total to 60
html = html.replace(/<span id="slide-total">\d+<\/span>/g, '<span id="slide-total">60</span>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully inserted 8 Inception steps and updated total slides to 60!');
