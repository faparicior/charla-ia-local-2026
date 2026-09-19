# QA barrido — parte 1 con slide especial (31 slides)

Fecha de la última pasada tras insertar la **slide 15** (Qwen 3.8 Flash Next — el engram) y renumerar 15–30 → 16–31.

## Cambios de esta ronda
- **s15 NUEVA**: «Qwen 3.8 Flash Next: *más cerebro, menos RAM*» — concepto engram (51B n-gram que se consulta, no computa; vive en RAM host o disco). SVG de dos cajas (GPU 65–70 GB ↔ Engram 102 GB BF16 / ~26 GB NVFP4) + 3 pilares + notas doc-only. El fit GB10 / PTQ vs QAD queda remitido («otra slide») para no sobrecargar.
- **Renumerado**: ids slide-15..30 → slide-16..31 (descendente, sin colisiones); comentarios HTML ajustados; CSS `#slide-24` → `#slide-25` (única referencia ≥15).
- **s14/s16 restos intactos**; p2 sin cambios de contenido.

## Resultados del barrido
- **Charla (31/31)**: overflow ninguno, banner oculto ninguno, contraste <4.5 ninguno. s15: lowest 967, sin steps.
- **Documento (31/31)**: overflow ninguno, lowest 967.
- **p2 (36/36)**: sin cambios de contenido; barrido de control limpio (última: nvidia-hack lowest 929).

> NOTA: tras esta ronda el deck creció a **33 slides** (s16 anatomía y s17 fit NVFP4 nuevas; ver dossier §11). Los barridos r14 (charla 33/33, doc 33/33, p2 36/36) confirman: overflow ninguno, lowest 967. Capturas revisadas de s15/s16/s17 en charla, doc y dark.

## Iteraciones de la s15 (para la cosecha de lecciones)
1. 1ª versión doc: 3 pilares con analogía + pill + 3 extras en cajas → solapes internos (el sweep no los ve). 
2. Recortes de texto (pills telegráficas, analogías a una línea) → aún solapaban.
3. **Causa raíz cazada con dep de geometría**: `.memory-pillar-card` base tiene `min-height: 170px`; 3 cards × 170 + extras + gaps = 678 > columna 588 → las tarjetas se tapaban (el `scrollHeight`/`clientHeight` lo delató: clientH 170 en TODAS). Fix: `body.mode-document .engram-right .memory-pillar-card { min-height: auto }`.
4. Extras convertidos de cajas-grid a notas planas en línea (strong mono + texto, display block) → columnas con aire de sobra.
5. Capturas finales revisadas: charla (pills 1.62rem con aire), doc (todo dentro), dark (banda y engram legibles).

### Ronda 14 (33 slides) — lecciones nuevas
- **`.subtitle` base con `font-size: 1.8rem !important`** (style.css:171): la regla doc de s4 (0.92rem, sin !important) es INERTE y el subtítulo sigue grande. Fix con `!important` + especificidad para s15/s16/s17 (0.98rem ✓ verificado 15,68px con getComputedStyle).
- **`<div>` dentro de `<svg>`** rompe el foreign content: el SVG se compacta sin error de sintaxis. Insertar siempre FUERA del cierre del svg.
- **`replace(..., 1)` global con ancla genérica** (`</svg></div>`) insertó los checkpoints en el PRIMER svg del deck, no en la s17 — anclar con texto único del bloque y verificar con grep -B de contexto.
- Checkpoints del SVG a 14px (×1.6 = 22px render) y pills a 1.62rem tras feedback de Fernando ("texto grande que se pueda leer").
- Censo PTQ/QAD completo en `ptq-vs-qad-qwen38-flash-next.md` (base BF16 335,3 GiB → QAD 98 GiB; tipos de destilado: PTQ/QAT/QAD/clásica).
