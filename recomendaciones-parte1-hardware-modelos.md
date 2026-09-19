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

**Pendientes latentes (no de este paquete):** theme-dark completo de parte 2; print "32 slides" y warning `${e}` en bundle.py; CONTINUAR_AQUI.md desactualizada.
