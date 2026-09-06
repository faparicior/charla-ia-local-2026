#!/usr/bin/env python3
import re
from pathlib import Path

def main():
    src_file = Path("index.html")
    lines = src_file.read_text(encoding="utf-8").splitlines(keepends=True)

    idx_slide_1 = -1
    idx_slide_2 = -1
    idx_slide_10 = -1
    idx_slide_41 = -1
    idx_deck_end = -1

    for i, line in enumerate(lines):
        if 'id="slide-1"' in line and idx_slide_1 == -1:
            idx_slide_1 = i
        elif 'id="slide-2"' in line and idx_slide_2 == -1:
            idx_slide_2 = i
        elif 'id="slide-10"' in line and idx_slide_10 == -1:
            idx_slide_10 = i
        elif 'id="slide-41"' in line and idx_slide_41 == -1:
            idx_slide_41 = i
        elif '</main>' in line and idx_deck_end == -1:
            idx_deck_end = i

    print(f"Indices: slide-1={idx_slide_1}, slide-2={idx_slide_2}, slide-10={idx_slide_10}, slide-41={idx_slide_41}, deck_end={idx_deck_end}")

    def backtrack_comment(idx):
        cur = idx - 1
        while cur >= 0 and (lines[cur].strip().startswith("<!--") or lines[cur].strip().startswith("==") or lines[cur].strip().startswith("SLIDE") or lines[cur].strip() == "" or lines[cur].strip().endswith("-->")):
            cur -= 1
        return cur + 1

    start_slide_1 = backtrack_comment(idx_slide_1)
    start_templates = backtrack_comment(idx_slide_2)
    start_part1_body = backtrack_comment(idx_slide_10)
    start_part2 = backtrack_comment(idx_slide_41)

    print(f"Blocks:")
    print(f"  Header: 0 to {start_slide_1}")
    print(f"  Slide 1: {start_slide_1} to {start_templates}")
    print(f"  Templates: {start_templates} to {start_part1_body}")
    print(f"  Part 1 rest: {start_part1_body} to {start_part2}")
    print(f"  Part 2: {start_part2} to {idx_deck_end}")
    print(f"  Footer: {idx_deck_end} to end")

    header_raw = "".join(lines[:start_slide_1])
    slide1_raw = "".join(lines[start_slide_1:start_templates])
    templates_raw = "".join(lines[start_templates:start_part1_body])
    part1_body_raw = "".join(lines[start_part1_body:start_part2])
    part2_raw = "".join(lines[start_part2:idx_deck_end])
    footer_raw = "".join(lines[idx_deck_end:])

    # -------------------------------------------------------------
    # 1. BUILD TEMPLATES.HTML
    # -------------------------------------------------------------
    tmpl_header = header_raw.replace(
        "<title>AI Local Crafters | Por qué estamos hablando de esto</title>",
        "<title>AI Local Crafters | Catálogo de Plantillas & Design System</title>"
    ).replace(
        "<body>",
        '<body data-next-deck="index.html">'
    )

    tmpl_content = templates_raw
    deck_bar_tmpl = """        <div class="deck-back-bar">
          <a href="index.html" class="deck-back-btn">← Volver a Parte 1: Hardware &amp; Modelos</a>
          <a href="parte2-ciclo-desarrollo.html" class="deck-back-btn">Ir a Parte 2: Ciclo de Desarrollo →</a>
        </div>\n"""
    tmpl_content = re.sub(
        r'(<div class="tag">Design System • Plantillas &amp; Layouts</div>)',
        deck_bar_tmpl + r'\1',
        tmpl_content,
        count=1
    )

    tmpl_content = tmpl_content.replace('href="#3"', 'href="#2"')
    tmpl_content = tmpl_content.replace('href="#4"', 'href="#3"')
    tmpl_content = tmpl_content.replace('href="#5"', 'href="#4"')
    tmpl_content = tmpl_content.replace('href="#6"', 'href="#5"')
    tmpl_content = tmpl_content.replace('href="#7"', 'href="#6"')
    tmpl_content = tmpl_content.replace('href="#8"', 'href="#7"')
    tmpl_content = tmpl_content.replace('href="#9"', 'href="#8"')

    for old_n, new_n in [(2, 1), (3, 2), (4, 3), (5, 4), (6, 5), (7, 6), (8, 7), (9, 8)]:
        tmpl_content = re.sub(
            rf'id="slide-{old_n}"',
            f'id="slide-{new_n}"',
            tmpl_content
        )
        tmpl_content = re.sub(
            rf'SLIDE {old_n}:',
            f'SLIDE {new_n} (PLANTILLA):',
            tmpl_content
        )

    templates_html = tmpl_header + tmpl_content + footer_raw
    Path("templates.html").write_text(templates_html, encoding="utf-8")
    print("✅ Creado templates.html")

    # -------------------------------------------------------------
    # 2. BUILD INDEX.HTML (PARTE 1)
    # -------------------------------------------------------------
    p1_header = header_raw.replace(
        "<title>AI Local Crafters | Por qué estamos hablando de esto</title>",
        "<title>AI Local Crafters | Parte 1: Hardware, Modelos y Cuantización</title>"
    ).replace(
        "<body>",
        '<body data-next-deck="parte2-ciclo-desarrollo.html">'
    )

    p1_body = part1_body_raw
    transition_box = """
        <!-- Transición a Parte 2 -->
        <div class="deck-transition-box">
          <div class="deck-transition-text">
            Fin de la Parte 1 • <strong>Hardware, Modelos y Cuantización</strong>
          </div>
          <a href="parte2-ciclo-desarrollo.html" class="deck-transition-btn">
            <span>Continuar a Parte 2: El Ciclo de Desarrollo con IA</span>
            <span class="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>"""

    p1_body_parts = p1_body.rsplit("</div>\n      </div>\n    </section>", 1)
    if len(p1_body_parts) == 2:
        p1_body = p1_body_parts[0] + "</div>" + transition_box + p1_body_parts[1]
    else:
        p1_body = re.sub(
            r'(\s*</div>\s*</div>\s*</section>\s*)$',
            r'\1'.replace('</div>\n    </section>', transition_box),
            p1_body
        )

    for old_id in range(10, 41):
        new_id = old_id - 8
        p1_body = re.sub(
            rf'id="slide-{old_id}"',
            f'id="slide-{new_id}"',
            p1_body
        )
        p1_body = re.sub(
            rf'SLIDE {old_id}:',
            f'SLIDE {new_id}:',
            p1_body
        )

    p1_footer = footer_raw.replace(
        '<button class="hud-btn" id="btn-theme"',
        '<a href="templates.html" class="hud-btn" title="Ver Plantillas Crafter" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">🎨</a>\n      <button class="hud-btn" id="btn-theme"'
    )

    part1_html = p1_header + slide1_raw + p1_body + p1_footer
    Path("index.html").write_text(part1_html, encoding="utf-8")
    print("✅ Actualizado index.html (Parte 1: 32 slides)")

    # -------------------------------------------------------------
    # 3. BUILD PARTE2-CICLO-DESARROLLO.HTML (PARTE 2)
    # -------------------------------------------------------------
    p2_header = header_raw.replace(
        "<title>AI Local Crafters | Por qué estamos hablando de esto</title>",
        "<title>AI Local Crafters | Parte 2: El Ciclo de Desarrollo con IA</title>"
    ).replace(
        "<body>",
        '<body data-prev-deck="index.html#last">'
    )

    p2_body = part2_raw
    deck_bar_p2 = """        <div class="deck-back-bar">
          <a href="index.html#last" class="deck-back-btn">← Volver a Parte 1: Hardware &amp; Modelos</a>
          <span class="deck-part-badge">Parte 2 • Ciclo de Desarrollo</span>
        </div>\n"""

    p2_body = re.sub(
        r'(<div class="tag">Artesanía de Software • Del Descubrimiento a la Producción</div>)',
        deck_bar_p2 + r'\1',
        p2_body,
        count=1
    )

    p2_body = p2_body.replace('href="#44"', 'href="#4"')
    p2_body = p2_body.replace('href="#46"', 'href="#6"')
    p2_body = p2_body.replace('href="#49"', 'href="#9"')
    p2_body = p2_body.replace('href="#57"', 'href="#17"')
    p2_body = p2_body.replace('(Slides 44 - 45)', '(Slides 4 - 5)')
    p2_body = p2_body.replace('(Slides 46 - 48)', '(Slides 6 - 8)')
    p2_body = p2_body.replace('(Slides 49 - 56)', '(Slides 9 - 16)')
    p2_body = p2_body.replace('(Slides 57 - 60)', '(Slides 17 - 20)')

    for old_id in range(41, 71):
        new_id = old_id - 40
        p2_body = re.sub(
            rf'id="slide-{old_id}"',
            f'id="slide-{new_id}"',
            p2_body
        )
        p2_body = re.sub(
            rf'SLIDE {old_id}:',
            f'SLIDE {new_id}:',
            p2_body
        )

    p2_footer = footer_raw.replace(
        '<button class="hud-btn" id="btn-theme"',
        '<a href="templates.html" class="hud-btn" title="Ver Plantillas Crafter" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">🎨</a>\n      <button class="hud-btn" id="btn-theme"'
    )

    part2_html = p2_header + p2_body + p2_footer
    Path("parte2-ciclo-desarrollo.html").write_text(part2_html, encoding="utf-8")
    print("✅ Creado parte2-ciclo-desarrollo.html (Parte 2: 30 slides)")

if __name__ == "__main__":
    main()
