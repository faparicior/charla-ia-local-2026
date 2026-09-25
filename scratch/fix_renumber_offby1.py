#!/usr/bin/env python3
"""
Normaliza la numeración tras insertar UNA slide en la posición 25:
los IDs/banners/selectores quedaron desplazados +2 (deben ser +1).
- index.html: id="slide-{n}" y banners "SLIDE {n}:" para n en 27..36 -> n-1 (ascendente).
- style.css: selectores #slide-{n} para n en 27..36 -> n-1 (una sola pasada).

Uso:  python3 scratch/fix_renumber_offby1.py
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
CSS = ROOT / "style.css"

# ---------------------------------------------------------------------------
# 1. index.html: IDs y banners (ascendente, sin colisiones)
# ---------------------------------------------------------------------------
html = INDEX.read_text(encoding="utf-8")
for n in range(27, 37):
    old_id = f'id="slide-{n}"'
    assert html.count(old_id) == 1, f"ID no única o ausente: {old_id} ({html.count(old_id)})"
    html = html.replace(old_id, f'id="slide-{n - 1}"')
    html = html.replace(f"SLIDE {n}:", f"SLIDE {n - 1}:")
INDEX.write_text(html, encoding="utf-8")
print("✅ index.html: IDs y banners normalizados (27..36 -> 26..35)")

# ---------------------------------------------------------------------------
# 2. style.css: selectores #slide-N (27..36 -> 26..35), una sola pasada
# ---------------------------------------------------------------------------
css = CSS.read_text(encoding="utf-8")
css, count = re.subn(
    r"#slide-(\d+)",
    lambda m: f"#slide-{int(m.group(1)) - 1}" if 27 <= int(m.group(1)) <= 36 else m.group(0),
    css,
)
CSS.write_text(css, encoding="utf-8")
print(f"✅ style.css: {count} selectores revisados (N 27..36 desplazados -1)")

# ---------------------------------------------------------------------------
# 3. Verificación: id == posición
# ---------------------------------------------------------------------------
html = INDEX.read_text(encoding="utf-8")
ok = True
for i, m in enumerate(re.finditer(r'<section class="slide[^"]*" id="(slide-[\w-]+)"', html), 1):
    want = f"slide-{i}"
    if m.group(1) != want:
        print(f"⚠️ posición {i} tiene id {m.group(1)} (esperado {want})")
        ok = False
print("✅ Todas las IDs coinciden con su posición" if ok else "⚠️ Revisar desalineación")
