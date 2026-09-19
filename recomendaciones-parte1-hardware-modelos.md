# Parte 1 — Hardware, Modelos y Cuantización (`index.html`, 30 slides)
## Revisión visual + plan de recomendaciones (sin implementar, pendiente de OK)

Comparativa contra el estándar alcanzado en parte 2 (des-clutter, ritmo vertical,
contraste AA, tipografías de charla). **No se ha tocado ningún archivo.**

---

## 1. Veredicto global

**Contenido: sobresaliente.** El nivel de guion, humor y pedagogía está a la altura
de la parte 2 (recortes de prensa, el gato «calculasiones», el meme de la mujer que
grita, la ecuación alquimia, el IBAN). El sistema de acentos por color funciona y
la identidad "periódico/recorte" es coherente.

**Ejecución visual: suspende en 3 áreas sistémicas** (mismo defecto repetido en
~15 slides, arreglables con reglas CSS centralizadas + 5 toques puntuales):

1. **Vacíos verticales enormes** — el defecto dominante.
2. **5 títulos con acento de color por debajo de AA** (2.25–2.92:1).
3. **Notación LaTeX cruda sin renderizar** (5 apariciones, 2 slides).

---

## 2. Hallazgos sistémicos

### 2.1 Vacíos verticales (el gordo)
- **Causa raíz localizada**: en `style.css` (~línea 14472) la sección de parte 1
  fuerza `.deck-hardware-part1 .slide:not(.slide-hero) .slide-content`
  → `justify-content: flex-start !important; height: 100% !important; gap: 0.95rem`.
  Los contenedores interiores ya se expanden (`flex: 1`) pero su **contenido
  interno queda empaquetado arriba**, dejando la panza abajo.
- Vacíos medidos en capturas (aprox.): **s17/s18 ~460px**, **s16 ~430px**,
  **s15 ~380px**, **s8 ~370px**, s2 ~320px, s27 ~270px, s20 ~280px, s7 ~230px,
  s14 ~210px, s24 ~215px, s10 ~200px, s25 ~180px, s11/s12/s23 ~120-150px.
- Caso especial **s9**: las 4 tarjetas de niveles H200 se estiran hasta abajo pero
  su contenido termina a ⅔ de altura → ~300px de panza **dentro** de cada tarjeta.
- **Propuesta (paquete A)**: igual que en parte 2 — repartir el espacio con
  `justify-content`/`align-content` según plantilla: cabecera arriba, bloque
  central centrado o espaciado, banner anclado abajo. Ganancia: cada slide usa
  los ~960px útiles en vez de ~550-700.

### 2.2 Contraste AA en acentos de título (5 slides)
| Slide | Acento | Actual | Ratio | Propuesto |
|---|---|---|---|---|
| s12 | «La Junta Médica Completa» | `#d97706` | 2.82 | `#b45309` (3.9) |
| s14 | «La Zona Ricitos de Oro» | `#16a34a` | 2.92 | `#15803d` (3.9) |
| s27 | «¿Dónde vive la memoria?» | `#10b981` | 2.25 | `#047857` (4.7) |
| s28 | «Contexto Masivo en Local» | `#10b981` | 2.25 | `#047857` |
| s29 | «Juntas, Próximas y Alejadas» | `#10b981` | 2.25 | `#047857` |

(s18 ya usa `#15803d` y pasa; los azules/naranjas/indigo del resto pasan.)

### 2.3 LaTeX crudo (feo en proyector)
- **s27**: subtítulo «($O(N)$)… ($O(1)$)» y tarjetas «vectores $K$ y $V$»,
  «matriz asociativa $S_t$ fija».
- **s30**: título del vector «($d = 4.096$)» dentro del SVG.
- Propuesta: quitar los `$` y componer con cursiva (`O(N)`, *K* y *V*,
  *S*<sub>t</sub>, *d* = 4.096 en `tspan` itálica). Los `$2.00`, `€` etc. de
  precios de s2-s5 son dólares reales → **no tocar**.

### 2.4 Textos y datos diminutos (comparado con terminal 18px de parte2)
- Tablas y specs a ~13px: s14 (matriz de pesos), s15 (benchmarks), s25 (specs),
  s27 (tabla memoria). Etiquetas de ejes/gráficos a ~10-11px: s7 (radar),
  s10 (vértices del trilema), s24 (chips de velocidad).
- Celdas apagadas en gris claro con **datos reales** (s14 filas/celdas muted,
  s15 deltas «(−0.2%)», s24 chips grises): ~2.8-3:1 → para datos informativos
  conviene `#475569`/`#52525b` (≥4.5) manteniendo la jerarquía por tamaño.
- **Propuesta (paquete B)**: subir en modo charla las cifras clave a ≥15-16px
  (filas de tabla, chips de tokens/seg, etiquetas de eje ~12-13px) y oscurecer
  los grises con datos.

---

## 3. Notas por slide (lo que no cae en lo sistémico)

| Slide | Nota |
|---|---|
| s1 | Hero limpia ✓ |
| s2 | Precios buenos pero «€» huérfano en línea propia en los price-tags (wrap feo) + vacío 320px |
| s3 | Recortes con cinta ✓ (huecos internos ~90px tolerables) |
| s5/s6 | Comparativas sólidas, «0,00 €» español correcto ✓ |
| s7 | Radar ok pero etiquetas de ejes ~10px y vacío 230px |
| s9 | Panza vacía dentro de las 4 tarjetas (~300px c/u) |
| s10 | Trilema bonito; etiquetas mono de vértices ~11px; flancos vacíos (inherente al triángulo) |
| s11 | Barra VRAM + analogías: excelente ✓ (vacío leve) |
| s13 | Triaje hospitalario ✓ |
| s16 | Contenido brillante amontonado arriba, vacío 430px |
| s17/s18 | Flujo 3 pasos + banner «En 10 segundos/Conclusión clave»: mismo vacío 460px |
| s19/s22 | Slides de humor (gato, meme) ✓ — vacío aceptable |
| s21 | Drama Blackwell en recortes: bien montada ✓ |
| s23 | Hackers Eugr/Braun ✓ (vacío leve) |
| s24 | Bar-chart de modelos bien; chips ~13px; vacío 215px |
| s25 | 2 modelos escogidos: muy buena ✓ |
| s26 | DeltaNet vs Attention: bien ✓ |
| s30 | IBAN: excelente cierre con CTA a parte 2 ✓ |

---

## 4. Decisiones de diseño para ti (antes del paquete C)

1. **Banners**: en parte 1 cada banner lleva el color del tema del slide
   (teal s17, verde s18, azul s28…). En parte 2 unificamos a oro. ¿Mantengo la
   paleta por tema de parte 1 (identidad "recorte de prensa") o unifico a oro
   como parte 2? *(mi recomendación: mantener colores por tema — le da identidad
   propia a la parte 1 — pero dejándolo a tu gusto)*
2. **Densidad de tablas**: subir tamaños arriba de lo mínimo AA hará que las
   tablas de s14/s15/s25 respiren más (reparto vertical las ensancha). ¿Ok?
3. **s14**: filas apagadas (0.8B/4B/9B «No optimizado») — las dejo apagadas
   pero subo el gris a nivel AA (`#52525b`), ¿correcto?

## 5. Plan de ejecución propuesto (cuando des el OK)

- **Paquete A — ritmo vertical**: reglas CSS scope `body.deck-hardware-part1`
  (añadidas al final de `style.css`, doc-mode intacto) por plantilla:
  reparto del bloque central + banner anclado abajo + s9 tarjetas con contenido
  distribuido. Re-captura de las ~15 slides afectadas para verificar.
- **Paquete B — contraste + tamaños**: 5 colores h2 (tabla 2.2), LaTeX (2.3),
  grises de datos AA, tamaños de tablas/chips/ejes en charla.
- **Paquete C — detalle**: «€» huérfano s2, etiquetas radar s7, revisión de
  banner «Regla de Oro»-equivalente donde falte.
- Re-bundle `python3 bundle.py` + verificación final + **commit lo haces tú**
  tras revisar.

---

## Implementación aplicada (post-informe) — PENDIENTE DE COMMIT DEL USUARIO

**HTML (`index.html`):** 5 h2 a tonos AA (s12 `#b45309`, s14 `#15803d`, s27/28/29 `#047857`); LaTeX crudo eliminado en s27 (O(N), O(1), K y V, S<sub>t</sub>) y s30 (SVG `d = 4.096`); precio s2 atómico con `&nbsp;` ("200 $ – 275 € / mes + Credits" ya no se parte).

**CSS (`style.css`, bloque scoped `body.deck-hardware-part1` al final, ~500 líneas):**
- **Banners oro unificados** (decisión del usuario): goldilocks-banner, symptoms-banner, chosen-synergy-banner ×5, nvfp4/autoround summary-ribbons → misma receta que parte 2 (bg ámbar 8%, borde izq. 4px `#b45309`, strongs `#92400e`, badges/pills tinte oro); anclados abajo con `margin-top:auto`. La caja de transición de s30 se queda indigo (es CTA de navegación).
- **Ritmo vertical:** decks verticales estiran a `flex:1` + reparto interno; tarjetas de tabla/ancho completo llenan la altura; banners siempre abajo. Casos especiales: s2 grid natural centrado; s8 tabla centrada en tarjeta-panel; s10 escenario 480→610px; s11 tarjetas pilares repartidas; s15 tracks centrados; s16 filas dominó `1fr` + lienzos acotados (200px); s17/s18 lienzos de diagrama acotados (250px) con contenido agrandado (chips 0.95rem, flujos 1.05rem); s19/s22 memes centrados verticalmente; s23 logros hacker repartidos; s24 filas `space-evenly` (flex); s25 tabla specs anclada abajo; s29 columna derecha reparte 3 tarjetas + regla.
- **Contraste/tamaños AA:** tablas s14 (16px, filas muted con color AA y jerarquía por peso), s15 deltas `#6b7280` (4.83:1), s24/s25/s27/s28 tamaños subidos; variante theme-dark incluida.

**Verificación:** re-bundle OK (5.99 MB); barrido Playwright de las 30 slides: 0 overflow, 0 banners ocultos, 0 contrastes <AA; revisión visual slide a slide completa (capturas /tmp/sweep-p1-s*.png).

**Enlaces fuente en prensa (iteración posterior):** los 8 recortes de s3/s4 llevan ahora su URL al pie (`.press-footer-link`, patrón de parte 2, fuentes mapeadas desde `script/index.md` líneas 15-22 y 44-49); titulares restaurados a 2.05rem, desc 1.28rem, aire interior repartido con `space-between` (footer sin `margin-top:auto`). s21 (mismo formato) sin URLs: no existen en los markdowns del repo.

**s8 (Costes de inferencia) verificada y ampliada:** precios revisados contra fuentes oficiales a 19 sep 2026 (GPT-5.6 Sol $4.00/0,40 tras la rebaja del 30 jul; Claude Sonnet 5 $3.00/0,30 estándar desde 1 sep; Gemini 3.6 Flash $0.75/0,075 promo hasta 31 dic; DeepSeek rango $0.14–$0.66) + 2 filas nuevas (Qwen 3.8 Flash Next $0.15/0,075, GLM 5.3 Flash $0.15/0,03) → 8 filas que llenan la caja blanca (filas 69px, respiración simétrica ~60px, aire bajo el título). Referencia con links: `referencia-precios-inferencia-1m-tokens.md`. Grupos marcados con tinte suave: azul para comerciales (OpenAI/Anthropic/Google), verde para open-weight (DeepSeek/Qwen/Zhipu) con la etiqueta de categoría coloreada en cada grupo; la fila local mantiene su naranja; cada grupo lleva además una barra vertical de color fuerte a la izquierda (azul #0284c7 / verde #059669 / naranja #ea580c). +1 fila nueva: xAI Grok 4.6 ($2.00/1,84 €, caché $0.50/0,46 — docs.x.ai oficial, <200K). Meta evaluada y descartada (Llama 4 Scout de abr 2025 es vieja; la API propia de Meta hoy es Muse Spark, comercial y cerrada — queda anotada en la referencia por si se quiere recuperar). Qwen 3.8 pasa a precio real sin «Hasta 90% desc.» ($0.10–$0.45, caché ≈$0.05). 9 filas a 64px llenando la caja.

**s8 + s9: sello de fecha de referencia** (`src-stamp`, mono, arriba-derecha alineado con el tag, posición absoluta sin afectar al layout): s8 «Precios verificados el 19 sep 2026 · 1 USD ≈ 0,92 €»; s9 «Tarifas H200 verificadas el 19 sep 2026 · DeepInfra · Vast.ai · Latitude.sh».

**s9 etiquetas en lenguaje llano** (feedback de Fernando: NVLink/SXM5/DGX no se entendían) y badge de nivel más grande:
- N1: «4,8 TB/s por GPU» (antes «4,8 TB/s HBM3e»)
- N2: «282 GB VRAM» + «NVLink une las 2 GPUs» (antes «282 GB (NVLink)» / «NVLink 900 GB/s»)
- N3: «564 GB VRAM» + «NVLink: 4 GPUs fusionadas» (antes «564 GB (SXM5)» / «NVLink 4× 900 GB/s»)
- N4: «1.128 GB VRAM» + «NVSwitch conecta las 8» (antes «1.128 GB (DGX)» / «NVSwitch 8× 900 GB/s»)
- `.gpu-tier` subido de 1.15rem a 1.35rem.

**s10 (Trilema) rediseñada por completo** (feedback: «visualmente muy pobre, todo muy pequeño, abajo ilegible»). Hallazgo técnico: el viewer escala TODAS las slides a 0.86 sobre lienzo 1920×1080 (`slides.js --slide-scale`); el diseño antiguo de s10 usaba coordenadas post-escala → todo quedaba 14% menor y descentrado, y además desbordaba (~1012px) lo que forzaba aún más la compresión. Rediseño en unidades reales del lienzo (`.tri2-*`):
- Stage 1760×600: triángulo ancho (esquinas 210/880/1550) con relleno suave, contorno discontinuo y 3 líneas gruesas de color (morado/azul/naranja) de cada vértice al centro.
- Tarjetas de vértice 420px con barra de color a la izquierda (patrón s8): nombre 1.3rem + pregunta 1.02rem + pill mono del palanca (FP8→INT4, KV cache, MoE vs densos).
- Hub central «Sweet Spot» (480px, anillo azul): Qwen 122B MoE en 128 GB · >40 tok/s · 98.4% precisión.
- 3 tarjetas inferiores con chip numerado coloreado (38px), título 1.08rem y texto 1rem (antes ~11-13px) — legibles desde el fondo de la sala.
- El viejo `tri-minimal` queda sin uso (CSS muerto inofensivo).

**s3/s4 (parte 1): tipografía de prensa agrandada** (feedback: «se ve más pequeño que la s29 de parte 2»). Medición: los tamaños eran IDÉNTICOS en ambos decks (headline 32.8px, body 20.48px); la percepción venía de la menor masa de texto por tarjeta. Subido en p1 s3/s4: headline 32.8→36.8px (2.3rem), body 20.5→23px (1.44rem), source/date 0.98rem, footer-link 0.9rem — quedan un 12% por encima de s29. Sin overflow (cards terminan en 973/978).

**s9 (Alquilar GPUs) llena:** cada tarjeta lleva ahora un visual de las H200s del nivel (chips oscuros estilo aceleradora con línea NVIDIA-green: 1 barra / 2 / 4 / grid 4×2), título 2.6rem, specs agrupadas (VRAM + banda: 4,8 TB/s HBM3e / NVLink 900 GB/s / NVLink 4× / NVSwitch 8×, specs públicas de NVIDIA) y el precio en caja naranja protagonista 1.85rem en una línea (formato "3,22 – 4,22 €/h"); usecase 1.22rem al pie. Variantes dark para el nuevo contenido. Ajustes de énfasis: negritas (800) en modelos/formatos del usecase («70B–72B», «FP16/FP8», «MoE o densos», «DeepSeek», «Qwen 3.8», «FP8», «230B–405B», «DeepSeek V3/V4»), VRAM agrandada a 1.35rem. Verificación de los precios de la slide contra el mercado UE on-demand en `referencia-precios-alquiler-h200-europa.md` (válido: banda media-alta RunPod/Nebius/Verda/Lium; 8× clavado a $28.72–$36.00). Segunda pasada: alineación por bloques de altura fija (visual 120px en las 4 tarjetas — N1 barra ancha / N2 par / N3 cuatro paneles / N4 grid 4×2 —, specs apiladas en 2 filas, precio en caja de línea única), todo con `space-between` → NIVEL 1.15rem, título 3rem, desc 1.35rem al pie: cada fila de elementos está a la misma altura en las 4 tarjetas y el aire queda repartido uniforme.

**Parte 2 homogeneizada (s20 + s29):** la slide 20 (`slide-pillar-adr-case-nextjs`, 4 recortes Next.js) y la 29 (`slide-nvidia-hack`, 4 recortes DeepSeek/NVIDIA) adoptan la misma receta prensa que s3/s4 de parte 1: titular grande 2.05rem, desc 1.25-1.28rem, aire interior repartido con `space-between` y link al pie con línea punteada (s29 llevaba 4 enlaces nuevos: FlashMLA, Nikkei/FT-Jensen, TensorRT-LLM, DeepSpec). Nota: en parte 2 la back-bar roba ~30px, así que s20 usa padding 1.25/2rem para encajar (979, sin overflow).

**Pendientes latentes (no de este paquete):** theme-dark completo de parte 2; print "32 slides" y warning `${e}` en bundle.py; CONTINUAR_AQUI.md desactualizada.

---

## Modo charla / documento en parte 1 (29 sep 2026)

### Qué se aplicó
Mismo mecanismo de parte 2 (`body.mode-document` + `.doc-only`, persistencia en `localStorage['deck-doc-mode']`, botón ⚡ del HUD):

1. **25 subtítulos** (slides 4–23 y 25–30) → `class="subtitle doc-only"`. El de la portada (s1) se queda: es la descripción de la charla. Todos los marcados eran contexto para leer, no mensaje central.
2. **4 textos `gpu-usecase` de s9** (qué modelos caben en cada nivel de H200) → `doc-only`. Las tarjetas quedan escénicas en presentación (título, visual de GPUs, specs y precio).
3. **9 notas `col-note` de s14** (todo en slide-14, bajo la matriz Goldilocks) → `doc-only`. En presentación la tabla sube el padding de fila a 1.05rem para llenar la caja (`body.deck-hardware-part1:not(.mode-document) #slide-14 .goldilocks-table td`) — sin este ajuste quedaban ~130 px de vacío dentro de la caja.
4. **No tocado** (siempre visibles): enlaces de prensa s3/s4, sellos de fecha s8/s9, banner de conclusión de s14 y resto de contenido central.

### Hallazgos técnicos
- **s10 (Trilema)**: la fusión del rediseño — imagen editorial del prisma + tarjetas `tri2-card` — dejó un **duplicado en cascada**: la versión pequeña de mis tarjetas (chip 38px) iba después de la agrandada del deck (48px) y la pisaba. Eliminado el duplicado; el bloque oscuro se depuró de reglas huérfanas (`.tri2-node/.tri2-hub/.tri2-pill/…` ya no existen en el HTML).
- **p1 no tenía el botón ⚡**: el icono 📄 del HUD de parte 1 es `btn-pdf` (exportar). Añadido `<button id="btn-dual-mode">⚡</button>` en la misma posición que parte 2 (antes de 🌓). `slides.js` lo ata solo (`getElementById` tolera ausencia).
- **Sincronización p1↔p2**: bajo `file://` Chrome da a cada archivo su propio `localStorage` (p2 no hereda el modo de p1 y viceversa). Bajo HTTP sí comparte origen y funciona en los dos sentidos (verificado con `http.server`): p1 on → p2 on; p2 off → p1 off. Servido en producción (http), el modo viaja bien entre partes.
- **Barrido doble 30/30**: modo charla y modo documento sin overflow, sin banner oculto, contraste OK. Capturas: `/tmp/sweep-p1-sN.png` (charla) y `/tmp/sweep-p1-docmode-sN.png` (documento).

### Espaciado en modo charla (feedback Fernando, igual que parte 2)
- **Comportamiento copiado de p2 (s18/s19)**: en charla el subtítulo es `display:none` SIN reservar hueco, y el aire pequeño entre título y contenido viene de `h2 margin-bottom: 0.85rem` (antes era 0 en p1) + gap flex 0.95rem (~27 px en total). En modo documento el subtítulo **aparece de golpe y empuja el contenido** hacia abajo.
- Se probó antes una variante con `visibility:hidden` (subtítulo invisible que reservaba SIEMPRE su hueco completo): descartada — Fernando quiere hueco pequeño en charla, no el hueco del subtítulo esperando siempre.
- **s4 en documento**: el subtítulo (2 líneas) empujaba la parrilla de prensa ~23 px fuera del lienzo (cards a 990 > límite 967). Comprimido solo en ese caso: subtítulo 0.92rem/lh 1.3, `press-grid` margin-top -0.75rem y gap 0.6rem en `body.mode-document #slide-4`.
- **s10 en modo charla**: los 3 párrafos secundarios de las tarjetas (límite físico, lógica intacta, fluidez) son `doc-only` — solo se ven en modo documento. En charla las tarjetas muestran solo el título, agrandado a 1.62rem con chip 54px (gana legibilidad a distancia).
- Barrido doble tras los cambios: 30/30 sin overflow, sin banner oculto, contraste OK en ambos modos.

### Ajustes de equilibrio en modo charla (feedback Fernando)
- **s5 y s6**: tipografía agrandada SOLO en modo charla para aprovechar el aire vertical de las tarjetas (items pros/contras 1.28→1.52rem con line-height 1.6 y gap de lista 0.75→1.15rem, línea de proveedores 1.15→1.32rem, títulos de sección 0.92rem con más aire). En documento no se aplican (el contenido ya llena).
- **s9**: cada tarjeta lleva ahora una línea breve de modelos (`gpu-usecase-brief`, visible solo en charla): «Caben: Qwen 72B · Llama 70B en FP16», «Caben: DeepSeek V3 · Qwen 3.8 en FP8», «Caben: modelos frontera 230B–405B», «Caben: DeepSeek V3/V4 a precisión nativa». En documento se ocultan y aparece el texto completo `gpu-usecase`.
- **s7** y **s10–s30**: sin cambios (buenas en charla, según revisión de Fernando).

### Verificación del flujo completo
- Click en ⚡ → `mode-document` + `localStorage['deck-doc-mode']='true'`, subtítulos visibles.
- Recarga → el modo se restaura.
- Salto p1→p2 (HTTP) hereda el modo en ambos sentidos.

## Slide 11 — «¿En qué se gasta la Memoria?» rediseñada como tanque vertical (29 sep 2026)
Fernando pidió una visualización más grande para el reparto de la VRAM y descripciones con más presencia. Se eligió el **tanque de VRAM vertical** entre tres opciones (tanque / barra editorial gruesa / anillo).

### Qué se hizo
- **Tanque de VRAM (SVG inline, proporciones reales)** a la izquierda en una tarjeta propia: bloque azul sólido de **Pesos 15.2 GB (63%)** abajo («la base fija»), **KV Cache 7.3 GB (31%)** como líquido naranja con superficie ondulada encima, **Buffer 1.5 GB** rayado arriba, **regla graduada 0–24 GB** al lado y flechas naranjas con la etiqueta rotada «crece con el chat y usuarios». Los números GB van en grande dentro de cada segmento (40px).
- **Derecha**: las dos tarjetas (Pesos / KV Cache) con **ilustraciones SVG dibujadas para la analogía** — estantería de biblioteca con libros y pie «🔒 1.000 lecturas · mismo sitio» para los pesos; bloc de notas con espiral, páginas apiladas que crecen y pie «+ tokens = + hojas gastadas» para el KV cache — y debajo, en fila, los tres escenarios (Chat breve, Contexto largo, FP8), que antes flotaban a todo lo ancho.
- **Modo charla vs documento**: en charla se ocultan los textos de analogía (`doc-only`) y mandan las propiedades «Inmutable»/«Multiplicativa» a 1.38rem junto a la ilustración; en documento reaparecen las analogías con texto completo (1.32rem) y pill.
- **Limpieza**: eliminados el gauge horizontal viejo (`vram-gauge-card`, `vram-bar-container`, `vram-segment-*`, leyenda `vram-legend-*`) y la rejilla `memory-pillars-grid` del CSS, ya sin uso.
- Título del tanque a 0.9rem (`nowrap`) y badge reducido a «24 GB VRAM» para que la cabecera quede en una línea.

### Verificación
- Barrido 30/30 limpio en charla y en documento (overflow: ninguno, banner oculto: ninguno, contraste <4.5: ninguno).
- Revisado en captura: charla, documento y modo oscuro (los SVG conservan colores vivos; marco del tanque pasa a blanco translúcido en oscuro).
