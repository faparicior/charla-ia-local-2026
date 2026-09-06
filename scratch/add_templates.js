const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The SCBCN Header snippet with the low-poly unicorn SVG and typography
const scbcnHeader = `        <!-- Header Institucional Software Crafters Barcelona -->
        <div class="scbcn-header-bar">
          <div class="scbcn-brand-lockup">
            <svg class="scbcn-unicorn-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Horn -->
              <polygon points="48,8 35,32 52,28" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="48,8 52,28 60,34" fill="#06b6d4" fill-opacity="0.3" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Forehead / Face -->
              <polygon points="35,32 52,28 45,46" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="52,28 68,36 60,48" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="52,28 60,34 68,36" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Ear -->
              <polygon points="68,36 78,22 75,40" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Snout -->
              <polygon points="35,32 45,46 25,52" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="25,52 45,46 38,62" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="25,52 38,62 18,66" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Jaw & Cheek -->
              <polygon points="45,46 60,48 52,65" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="45,46 38,62 52,65" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="38,62 52,65 42,78" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="18,66 38,62 30,76" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="30,76 42,78 35,90" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Crest & Mane -->
              <polygon points="68,36 75,40 82,50" fill="#06b6d4" fill-opacity="0.2" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="60,48 75,40 68,60" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="75,40 82,50 78,62" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
              <polygon points="68,60 78,62 82,75" fill="#06b6d4" fill-opacity="0.25" stroke="#06b6d4" stroke-width="1.8" stroke-linejoin="round"/>
              <!-- Neck -->
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

// 9-Level bullet list snippet
const scbcnBullets = `          <div class="scbcn-bullet-tree">
            <div class="scbcn-level scbcn-level-1">
              <span class="scbcn-marker">●</span>
              <span>First level</span>
            </div>
            <div class="scbcn-level scbcn-level-2">
              <span class="scbcn-marker">○</span>
              <span>Second level</span>
            </div>
            <div class="scbcn-level scbcn-level-3">
              <span class="scbcn-marker">■</span>
              <span>Third level</span>
            </div>
            <div class="scbcn-level scbcn-level-4">
              <span class="scbcn-marker">●</span>
              <span>Fourth level</span>
            </div>
            <div class="scbcn-level scbcn-level-5">
              <span class="scbcn-marker">○</span>
              <span>Fifth level</span>
            </div>
            <div class="scbcn-level scbcn-level-6">
              <span class="scbcn-marker">■</span>
              <span>Sixth level</span>
            </div>
            <div class="scbcn-level scbcn-level-7">
              <span class="scbcn-marker">●</span>
              <span>Seventh level</span>
            </div>
            <div class="scbcn-level scbcn-level-8">
              <span class="scbcn-marker">○</span>
              <span>Eighth level</span>
            </div>
            <div class="scbcn-level scbcn-level-9">
              <span class="scbcn-marker">■</span>
              <span>Ninth level</span>
            </div>
          </div>`;

// Image Placeholder Frame snippet
const scbcnImageFrame = `          <div class="scbcn-image-frame">
            <svg class="scbcn-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <div class="scbcn-placeholder-label">Marco de Imagen (Placeholder)</div>
          </div>`;

// 8 New Slides to insert
const newSlides = `
    <!-- ====================================================================
         SLIDE 2: CATÁLOGO DE PLANTILLAS (REPERTORIO VISUAL CRAFTER & SCBCN)
         ==================================================================== -->
    <section class="slide" id="slide-2">
      <div class="slide-content">
        <div class="tag">Design System • Plantillas &amp; Layouts</div>
        <h2>Catálogo de Plantillas: <span class="serif-italic" style="color: #ea580c;">Repertorio Visual Crafter</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          Guía de estilos y estructuras modulares disponibles para la presentación, optimizadas para contraste, legibilidad y adaptabilidad.
        </p>

        <div class="template-catalog-grid">

          <!-- 1. SCBCN A -->
          <a class="template-card" href="#3">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(0, 119, 145, 0.12); color: #007791;">SCBCN 26</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#3</span>
            </div>
            <div class="template-card-title">🖼️ Texto + Imagen (Der)</div>
            <div class="template-card-desc">Layout oficial SCBCN: título teal, subtítulo ámbar, lista jerárquica a 9 niveles e imagen a la derecha.</div>
            <div class="template-card-mini-preview">[ Texto / Bullets ➔ | 🖼️ Imagen ]</div>
          </a>

          <!-- 2. SCBCN B -->
          <a class="template-card" href="#4">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(0, 119, 145, 0.12); color: #007791;">SCBCN 26</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#4</span>
            </div>
            <div class="template-card-title">🖼️ Imagen (Izq) + Texto</div>
            <div class="template-card-desc">Variante simétrica invertida para destacar diagramas o fotos en el lado izquierdo con viñetas a la derecha.</div>
            <div class="template-card-mini-preview">[ 🖼️ Imagen | ➔ Texto / Bullets ]</div>
          </a>

          <!-- 3. Split Grid Crafter -->
          <a class="template-card" href="#5">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(99, 102, 241, 0.12); color: #6366f1;">Cards &amp; Grid</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#5</span>
            </div>
            <div class="template-card-title">🃏 Split Grid &amp; Sinergia</div>
            <div class="template-card-desc">Tarjetas modulares comparativas con badges, especificaciones clave y banner inferior de conclusión crafter.</div>
            <div class="template-card-mini-preview">[ Card 1 ] [ Card 2 ] + [ 💡 Banner ]</div>
          </a>

          <!-- 4. Code Window -->
          <a class="template-card" href="#6">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(16, 185, 129, 0.12); color: #059669;">Terminal</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#6</span>
            </div>
            <div class="template-card-title">💻 Ventana de Código</div>
            <div class="template-card-desc">Editor estilo macOS con semáforo de ventana, barra de título, resaltado de sintaxis y tipografía monoespaciada.</div>
            <div class="template-card-mini-preview">[ 🔴🟡🟢 editor.py | código... ]</div>
          </a>

          <!-- 5. Pipeline SDLC -->
          <a class="template-card" href="#7">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(245, 158, 11, 0.12); color: #d97706;">Proceso</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#7</span>
            </div>
            <div class="template-card-title">🚀 Pipeline de Fases</div>
            <div class="template-card-desc">Secuencia de 5 pasos horizontales con tarjetas de color, outputs destacados y fila de herramientas transversales.</div>
            <div class="template-card-mini-preview">[ 1 ] ➔ [ 2 ] ➔ [ 3 ] ➔ [ 4 ] ➔ [ 5 ]</div>
          </a>

          <!-- 6. Rect Timeline -->
          <a class="template-card" href="#8">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(2, 132, 199, 0.12); color: #0284c7;">Cronología</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#8</span>
            </div>
            <div class="template-card-title">⏳ Timeline Alternante</div>
            <div class="template-card-desc">Línea de tiempo con barra rectangular continua y tarjetas que alternan entre arriba y abajo con pines conectados.</div>
            <div class="template-card-mini-preview">[ Card ] --- ⬤ --- [ Card ]</div>
          </a>

          <!-- 7. TDD Híbrido -->
          <a class="template-card" href="#43">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(244, 63, 94, 0.12); color: #e11d48;">Arquitectura</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#43</span>
            </div>
            <div class="template-card-title">🧪 TDD &amp; Capas DDD</div>
            <div class="template-card-desc">Desglose de estados rojo/verde por capa hexagonal con panel de gestión de cambios y semáforo de living docs.</div>
            <div class="template-card-mini-preview">[ 🔴 E2E ➔ 🟢 Domain ➔ 🟢 App ]</div>
          </a>

          <!-- 8. Editorial Quote -->
          <a class="template-card" href="#9">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="template-card-badge" style="background: rgba(147, 51, 234, 0.12); color: #9333ea;">Cierre</span>
              <span style="font-size: 0.8rem; color: var(--text-dim);">#9</span>
            </div>
            <div class="template-card-title">✍️ Cita &amp; Alto Impacto</div>
            <div class="template-card-desc">Bloque tipográfico editorial centrado en serif itálica con autor y firma para pausas de reflexión o conclusiones.</div>
            <div class="template-card-mini-preview">“Frase memorable...” — Autor</div>
          </a>

        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 3: PLANTILLA SCBCN A (TEXTO A LA IZQUIERDA + IMAGEN A LA DERECHA)
         ==================================================================== -->
    <section class="slide" id="slide-3">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">Click to edit theme title style</h2>
        <div class="scbcn-subtitle">Click to edit theme subtitle style</div>

        <div class="scbcn-split-grid">
` + scbcnBullets + `
` + scbcnImageFrame + `
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 4: PLANTILLA SCBCN B (IMAGEN A LA IZQUIERDA + TEXTO A LA DERECHA)
         ==================================================================== -->
    <section class="slide" id="slide-4">
      <div class="slide-content">
` + scbcnHeader + `
        <h2 class="scbcn-title">Click to edit theme title style</h2>
        <div class="scbcn-subtitle">Click to edit theme subtitle style</div>

        <div class="scbcn-split-grid reverse">
` + scbcnImageFrame + `
` + scbcnBullets + `
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 5: PLANTILLA CRAFTER C (SPLIT GRID & TARJETAS COMPARATIVAS)
         ==================================================================== -->
    <section class="slide" id="slide-5">
      <div class="slide-content">
        <div class="tag">Plantilla Crafter • Comparación Modular</div>
        <h2>Estructura Split Grid: <span class="serif-italic" style="color: #6366f1;">Métricas &amp; Sinergia</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          Estructura de tarjetas dobles con badges de rol, especificaciones en tabla y banner inferior de conclusión.
        </p>

        <div class="chosen-models-deck">
          <div class="chosen-models-grid">

            <!-- Card A -->
            <div class="chosen-card card-brain">
              <div class="chosen-card-header">
                <div class="chosen-badge-row">
                  <span class="chosen-role-badge brain">🧠 Opción / Enfoque A</span>
                  <span class="chosen-quant-badge green">Badge Estado</span>
                </div>
                <div class="chosen-model-title">Componente Principal A</div>
                <div class="chosen-hf-link">
                  <span>📌</span>
                  <code>namespace / identificador-a</code>
                </div>
              </div>
              <div class="chosen-role-desc">
                <strong>Descripción del Enfoque:</strong> Espacio reservado para argumentar las fortalezas, trade-offs y rol dentro de la arquitectura técnica del sistema.
              </div>
              <div class="chosen-spec-table">
                <div class="chosen-spec-row">
                  <span class="spec-label">Métrica Clave 1</span>
                  <span class="spec-value"><strong>Valor 1</strong> <small>(Detalle)</small></span>
                </div>
                <div class="chosen-spec-row">
                  <span class="spec-label">Métrica Clave 2</span>
                  <span class="spec-value"><strong>Valor 2</strong> <small>(Detalle)</small></span>
                </div>
              </div>
            </div>

            <!-- Card B -->
            <div class="chosen-card card-speed">
              <div class="chosen-card-header">
                <div class="chosen-badge-row">
                  <span class="chosen-role-badge speed">⚡ Opción / Enfoque B</span>
                  <span class="chosen-quant-badge amber">Badge Estado</span>
                </div>
                <div class="chosen-model-title">Componente Secundario B</div>
                <div class="chosen-hf-link">
                  <span>📌</span>
                  <code>namespace / identificador-b</code>
                </div>
              </div>
              <div class="chosen-role-desc">
                <strong>Complementariedad Técnica:</strong> Espacio para contrastar la alternativa rápida, especializada o ligera frente a la opción principal.
              </div>
              <div class="chosen-spec-table">
                <div class="chosen-spec-row">
                  <span class="spec-label">Métrica Clave 1</span>
                  <span class="spec-value"><strong>Valor 1</strong> <small>(Detalle)</small></span>
                </div>
                <div class="chosen-spec-row">
                  <span class="spec-label">Métrica Clave 2</span>
                  <span class="spec-value"><strong>Valor 2</strong> <small>(Detalle)</small></span>
                </div>
              </div>
            </div>

          </div>

          <!-- Banner Inferior de Sinergia -->
          <div class="chosen-synergy-banner" style="margin-top: 0; padding: 1rem 1.4rem;">
            <div class="chosen-synergy-icon" style="font-size: 1.5rem;">💡</div>
            <div class="chosen-synergy-text" style="font-size: 1rem;">
              <strong>Regla Crafter de Sinergia:</strong> El banner inferior sintetiza la regla de oro o el aprendizaje clave que une ambas opciones en una única solución coherente.
            </div>
            <div class="chosen-synergy-badge">Sinergia Crafter</div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 6: PLANTILLA CRAFTER D (VENTANA DE CÓDIGO & TERMINAL MAC)
         ==================================================================== -->
    <section class="slide" id="slide-6">
      <div class="slide-content">
        <div class="tag">Plantilla Crafter • Código &amp; Consola</div>
        <h2>Ventana de Código: <span class="serif-italic" style="color: #10b981;">Sintaxis &amp; Ejecución</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          Módulo de consola con controles estilo macOS, título de fichero, sintaxis coloreada y soporte para explicaciones técnicas.
        </p>

        <div class="code-window">
          <div class="code-header">
            <div class="code-dots">
              <div class="code-dot red"></div>
              <div class="code-dot yellow"></div>
              <div class="code-dot green"></div>
            </div>
            <div class="code-title">crafter_example_service.py</div>
            <div></div>
          </div>
          <pre class="code-content"><code><span class="comment"># Plantilla de código ejecutable con llamada asíncrona</span>
<span class="keyword">from</span> domain.models <span class="keyword">import</span> SoftwareArtifact
<span class="keyword">from</span> infrastructure.client <span class="keyword">import</span> LocalLLMClient

<span class="func">async def</span> <span class="func">execute_clean_pipeline</span>(spec_id: <span class="keyword">str</span>) -> SoftwareArtifact:
    <span class="string">"""Ejecuta una transformación limpia guiada por contratos de dominio."""</span>
    client = LocalLLMClient(base_url=<span class="string">"http://localhost:11434"</span>)
    result = <span class="keyword">await</span> client.generate(
        model=<span class="string">"qwen2.5-coder:32b"</span>,
        prompt=f<span class="string">"Refactor according to DDD invariants: {spec_id}"</span>
    )
    <span class="keyword">return</span> SoftwareArtifact.from_response(result)</code></pre>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 7: PLANTILLA CRAFTER E (PIPELINE DE FASES & PROCESO)
         ==================================================================== -->
    <section class="slide" id="slide-7">
      <div class="slide-content">
        <div class="tag">Plantilla Crafter • Proceso Secuencial</div>
        <h2>Pipeline de Fases: <span class="serif-italic" style="color: #d97706;">Flujo &amp; Transversalidad</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          Estructura de 5 pasos correlativos superiores complementados con un bloque inferior de herramientas continuas.
        </p>

        <div class="sdlc-pipeline-deck">
          <div class="sdlc-pipeline-steps">

            <div class="sdlc-step-card c-blue">
              <div class="sdlc-step-header">
                <span class="sdlc-phase-num">Paso 1</span>
                <span class="sdlc-phase-badge blue">Incepción</span>
              </div>
              <div class="sdlc-skill-cmd">Fase Inicial</div>
              <div class="sdlc-step-question">¿Qué queremos?</div>
              <ul class="sdlc-step-list">
                <li>Definición de objetivos</li>
                <li>Mapeo de restricciones</li>
              </ul>
              <div class="sdlc-step-output">📄 output-1.md</div>
            </div>

            <div class="sdlc-step-card c-purple">
              <div class="sdlc-step-header">
                <span class="sdlc-phase-num">Paso 2</span>
                <span class="sdlc-phase-badge purple">Diseño</span>
              </div>
              <div class="sdlc-skill-cmd">Especificación</div>
              <div class="sdlc-step-question">¿Cómo interactúa?</div>
              <ul class="sdlc-step-list">
                <li>Diagramas de secuencia</li>
                <li>Contratos de API</li>
              </ul>
              <div class="sdlc-step-output">📄 output-2.md</div>
            </div>

            <div class="sdlc-step-card c-green">
              <div class="sdlc-step-header">
                <span class="sdlc-phase-num">Paso 3</span>
                <span class="sdlc-phase-badge green">Dominio</span>
              </div>
              <div class="sdlc-skill-cmd">Modelado</div>
              <div class="sdlc-step-question">¿Cuáles son las reglas?</div>
              <ul class="sdlc-step-list">
                <li>Invariantes de negocio</li>
                <li>Máquina de estados</li>
              </ul>
              <div class="sdlc-step-output">📄 output-3.md</div>
            </div>

            <div class="sdlc-step-card c-amber">
              <div class="sdlc-step-header">
                <span class="sdlc-phase-num">Paso 4</span>
                <span class="sdlc-phase-badge amber">Construcción</span>
              </div>
              <div class="sdlc-skill-cmd">Implementación</div>
              <div class="sdlc-step-question">¿Cómo se valida?</div>
              <ul class="sdlc-step-list">
                <li>Ciclos TDD en capas</li>
                <li>Tests que pasan a verde</li>
              </ul>
              <div class="sdlc-step-output">💻 Código + Tests</div>
            </div>

            <div class="sdlc-step-card c-rose">
              <div class="sdlc-step-header">
                <span class="sdlc-phase-num">Paso 5</span>
                <span class="sdlc-phase-badge rose">Evolución</span>
              </div>
              <div class="sdlc-skill-cmd">Mantenimiento</div>
              <div class="sdlc-step-question">¿Cómo se audita?</div>
              <ul class="sdlc-step-list">
                <li>Propuesta de cambio</li>
                <li>Living docs al día</li>
              </ul>
              <div class="sdlc-step-output">📝 docs-updated.md</div>
            </div>

          </div>

          <!-- Fila Inferior Transversal -->
          <div class="sdlc-transversal-row">
            <div class="sdlc-transversal-card">
              <div class="sdlc-transversal-header">
                <div class="sdlc-transversal-title">
                  <span>🧭</span>
                  <code>/explore</code>
                  <span>Comprensión del Sistema</span>
                </div>
                <span class="yarn-badge purple">Transversal</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">
                Capacidad de consultar el estado del proyecto en cualquier momento sin modificar ficheros.
              </div>
            </div>

            <div class="sdlc-transversal-card">
              <div class="sdlc-transversal-header">
                <div class="sdlc-transversal-title">
                  <span>🛡️</span>
                  <code>/audit</code>
                  <span>Salud &amp; Deriva</span>
                </div>
                <span class="yarn-badge green">Calidad Continua</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">
                Verificación sistemática de que la documentación viva coincide con la realidad del código fuente.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 8: PLANTILLA CRAFTER F (LÍNEA TEMPORAL ALTERNANTE / TIMELINE)
         ==================================================================== -->
    <section class="slide" id="slide-8">
      <div class="slide-content">
        <div class="tag">Plantilla Crafter • Línea de Tiempo</div>
        <h2>Línea de Tiempo Rectangular: <span class="serif-italic" style="color: #0284c7;">Hitos Alternantes</span></h2>
        <p class="subtitle" style="margin-top: -1rem;">
          Estructura de eventos cronológicos con barra continua y tarjetas conectadas por pines arriba y abajo.
        </p>

        <div class="rect-timeline-deck">
          <div class="rect-timeline-wrapper">
            <div class="rect-timeline-bar-bg">
              <div class="rect-bar-cap left"></div>
              <div class="rect-bar-segments cols-5">
                <div class="rect-bar-segment c1"></div>
                <div class="rect-bar-segment c2"></div>
                <div class="rect-bar-segment c6"></div>
                <div class="rect-bar-segment c5"></div>
                <div class="rect-bar-segment c4"></div>
              </div>
              <div class="rect-bar-cap right"></div>
            </div>

            <div class="rect-timeline-grid cols-5">

              <!-- Columna 1 (Card Arriba) -->
              <div class="rect-col c-blue">
                <div class="rect-top-slot">
                  <div class="rect-card">
                    <div class="rect-card-header">
                      <div class="rect-card-title">Hito 1: Lanzamiento</div>
                      <span class="rect-card-tag">Mes 1</span>
                    </div>
                    <div class="rect-card-desc">Descripción sintética del primer evento relevante en el timeline.</div>
                    <div class="rect-card-footer">
                      <span style="color: var(--text-dim);">Impacto</span>
                      <strong style="color: #0284c7;">Alto</strong>
                    </div>
                  </div>
                </div>
                <div class="rect-center-pin"><div class="rect-donut"></div></div>
                <div class="rect-bottom-slot">
                  <div class="rect-pin-stem"></div>
                  <div class="rect-pin-node-dot"></div>
                  <div class="rect-date-block" style="margin-top: 0.5rem;">
                    <div class="rect-date-year">FASE INICIAL</div>
                    <div class="rect-date-label">Punto de partida</div>
                  </div>
                </div>
              </div>

              <!-- Columna 2 (Card Abajo) -->
              <div class="rect-col c-amber">
                <div class="rect-top-slot">
                  <div class="rect-date-block" style="margin-bottom: 0.5rem;">
                    <div class="rect-date-year">FASE INTERMEDIA</div>
                    <div class="rect-date-label">Evolución</div>
                  </div>
                </div>
                <div class="rect-center-pin"><div class="rect-donut"></div></div>
                <div class="rect-bottom-slot">
                  <div class="rect-pin-stem top"></div>
                  <div class="rect-pin-node-dot top"></div>
                  <div class="rect-card" style="margin-top: 0.5rem;">
                    <div class="rect-card-header">
                      <div class="rect-card-title">Hito 2: Punto de Inflexión</div>
                      <span class="rect-card-tag">Mes 3</span>
                    </div>
                    <div class="rect-card-desc">Cambio de paradigma, optimización clave o publicación de resultados.</div>
                    <div class="rect-card-footer">
                      <span style="color: var(--text-dim);">Resultado</span>
                      <strong style="color: #d97706;">+50% Rendimiento</strong>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Columna 3 (Card Arriba) -->
              <div class="rect-col c-green">
                <div class="rect-top-slot">
                  <div class="rect-card">
                    <div class="rect-card-header">
                      <div class="rect-card-title">Hito 3: Madurez</div>
                      <span class="rect-card-tag">Mes 6</span>
                    </div>
                    <div class="rect-card-desc">Consolidación de la solución y despliegue generalizado en el equipo.</div>
                    <div class="rect-card-footer">
                      <span style="color: var(--text-dim);">Estado</span>
                      <strong style="color: #059669;">Producción</strong>
                    </div>
                  </div>
                </div>
                <div class="rect-center-pin"><div class="rect-donut"></div></div>
                <div class="rect-bottom-slot">
                  <div class="rect-pin-stem"></div>
                  <div class="rect-pin-node-dot"></div>
                  <div class="rect-date-block" style="margin-top: 0.5rem;">
                    <div class="rect-date-year">MADUREZ</div>
                    <div class="rect-date-label">Estabilidad</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- ====================================================================
         SLIDE 9: PLANTILLA CRAFTER G (CITA EDITORIAL & REFLEXIÓN)
         ==================================================================== -->
    <section class="slide" id="slide-9">
      <div class="slide-content">
        <div class="quote-box">
          <div class="quote-text">
            “La verdadera maestría artesanal consiste en dominar y controlar las herramientas que moldean nuestro código.”
          </div>
          <div class="quote-author">
            — Artesanía de Software en la Era de la Inteligencia Artificial
          </div>
        </div>
      </div>
    </section>
`;

// 1. Renumber existing slides from 44 down to 2 by adding 8 (so 44 becomes 52, 2 becomes 10)
for (let n = 44; n >= 2; n--) {
  const oldComment = new RegExp(`SLIDE ${n}:`, 'g');
  const newComment = `SLIDE ${n + 8}:`;
  html = html.replace(oldComment, newComment);

  const oldId = new RegExp(`id="slide-${n}"`, 'g');
  const newId = `id="slide-${n + 8}"`;
  html = html.replace(oldId, newId);
}

// 2. Insert the 8 new slides right after slide-1
const slide1Pos = html.indexOf('id="slide-1"');
if (slide1Pos === -1) {
  console.error('Could not find id="slide-1" in index.html');
  process.exit(1);
}

const sectionClose = html.indexOf('</section>', slide1Pos);
if (sectionClose === -1) {
  console.error('Could not find </section> for slide-1');
  process.exit(1);
}

const insertPos = sectionClose + '</section>'.length;
html = html.slice(0, insertPos) + '\n\n' + newSlides + html.slice(insertPos);

// 3. Update HUD total to 52
html = html.replace(/<span id="slide-total">\d+<\/span>/g, '<span id="slide-total">52</span>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully inserted 8 template slides and updated index.html! Total slides: 52.');
