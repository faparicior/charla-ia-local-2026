#!/usr/bin/env python3
"""
reorder_slides.py — Mover slides de un deck y renumerarlo TODO de forma determinista.

Las slides se identifican por <section class="slide" id="slide-N">. La regla del
proyecto es: **id = posición** (slide-1 es la primera, etc.). Este script mueve
bloques de slides y renumera en cascada:

  1. El propio deck HTML: ids `slide-N`, banners de comentario `SLIDE N:`.
  2. `style.css`: solo los selectores `#slide-N` que pertenecen a ESTE deck.
     Los decks se distinguen por su clase de <body> (p. ej. deck-hardware-part1,
     deck-sdlc-part2). Para selectores sin scope, clasifica por evidencia de
     clases (¿esas clases existen dentro de la slide N de cada deck?) y deja
     listados los casos dudosos SIN tocar (report manual).

Uso:
  python3 script/reorder_slides.py <deck.html> order
  python3 script/reorder_slides.py <deck.html> renumber
  python3 script/reorder_slides.py <deck.html> move 51 52 after 5
  python3 script/reorder_slides.py <deck.html> move 51 52 before 8
  python3 script/reorder_slides.py <deck.html> move 23 to 5

Opciones:
  --dry-run     muestra el plan y el mapeo sin escribir nada
  --css PATH    hoja de estilos a renumerar (default: style.css junto al deck)
  --bundle      ejecuta `python3 bundle.py` al terminar

El movimiento SIEMPRE renumera a continuación (id = posición). Para mover sin
renumerar no: eso rompe la convención del proyecto.
"""

import argparse
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

# --------------------------------------------------------------------------
# Parseo del deck
# --------------------------------------------------------------------------

SECTION_RE = re.compile(r'<section\b[^>]*\bid="(slide-\d+)"[^>]*>')

# Clases "genéricas" del sistema de slides presentes en todos los decks:
# no sirven como evidencia por sí solas, pero el clasificador ya las pondera
# vía contención por slide, así que no hace falta lista negra.


class DeckInfo:
    """Clases por slide y globales de un deck HTML."""

    def __init__(self, path: Path):
        self.path = path
        text = path.read_text(encoding="utf-8")
        self.text = text
        m = re.search(r"<body[^>]*\bclass=\"([^\"]*)\"", text)
        self.body_classes = set(m.group(1).split()) if m else set()
        self.ids = []          # ids numéricos en orden de posición
        self.slide_classes = {}  # 'slide-12' -> set(clases dentro)
        self.all_classes = set()
        self._collect(text)

    def _collect(self, text: str):
        class Collector(HTMLParser):
            def __init__(self):
                super().__init__()
                self.stack = []
                self.cur = None
                self.ids = []
                self.slide_classes = {}
                self.all_classes = set()

            def handle_starttag(self, tag, attrs):
                d = dict(attrs)
                cls = set((d.get("class") or "").split())
                self.all_classes |= cls
                if tag == "section" and (d.get("id") or "").startswith("slide-"):
                    self.cur = d["id"]
                    self.slide_classes[self.cur] = set()
                    self.ids.append(d["id"])
                if self.cur:
                    self.slide_classes[self.cur] |= cls
                self.stack.append(tag)

            def handle_endtag(self, tag):
                while self.stack:
                    t = self.stack.pop()
                    if t == "section":
                        self.cur = None
                        break
                    if t == tag:
                        break

        c = Collector()
        c.feed(text)
        self.ids = [i for i in c.ids if re.fullmatch(r"slide-\d+", i)]
        self.slide_classes = c.slide_classes
        self.all_classes = c.all_classes

    def slide_num(self, slide_id: str):
        m = re.fullmatch(r"slide-(\d+)", slide_id)
        return int(m.group(1)) if m else None


def find_blocks(text: str):
    """Devuelve [(id, start, end)] de cada <section> con su cierre </section>."""
    blocks = []
    for m in SECTION_RE.finditer(text):
        end = text.find("</section>", m.end())
        if end == -1:
            raise SystemExit(f"ERROR: </section> no encontrado para {m.group(0)}")
        blocks.append((m.group(1), m.start(), end + len("</section>")))
    return blocks


def extend_block_start(text: str, start: int) -> int:
    """Retrocede incluyendo comentarios y espacios contiguos (banners SLIDE N)."""
    i = start
    while True:
        j = i
        while j > 0 and text[j - 1] in " \t\r\n":
            j -= 1
        if j >= 3 and text[j - 3 : j] == "-->":
            k = text.rindex("<!--", 0, j)
            i = k
            continue
        return i


# --------------------------------------------------------------------------
# Renumeración
# --------------------------------------------------------------------------

def make_token_renumber(mapping: dict):
    """Devuelve (fn_fase1, re_fase2) para renombrar slide-N sin cascadas."""
    def phase1(m):
        n = int(m.group(1))
        if n in mapping:
            return f"slide-#{n}#"
        return m.group(0)

    def phase2(m):
        return f"slide-{mapping[int(m.group(1))]}"

    return phase1, re.compile(r"slide-#(\d+)#")


def renumber_deck_text(text: str, mapping: dict):
    """Renombra ids slide-N y banners `SLIDE N:` en el HTML del deck."""
    p1, p2 = make_token_renumber(mapping)
    text = re.sub(r"\bslide-(\d+)\b", p1, text)
    text = p2.sub(phase2_repl(mapping), text)
    # Banners de comentario: SLIDE 51: -> SLIDE 6:
    def banner1(m):
        n = int(m.group(1))
        return f"SLIDE #{n}#:" if n in mapping else m.group(0)

    def banner2(m):
        return f"SLIDE {mapping[int(m.group(1))]}:"

    text = re.sub(r"\bSLIDE (\d+):", banner1, text)
    text = re.sub(r"SLIDE #(\d+)#:", banner2, text)
    return text


def phase2_repl(mapping: dict):
    def repl(m):
        return f"slide-{mapping[int(m.group(1))]}"
    return repl


# --------------------------------------------------------------------------
# Clasificador de selectores CSS por deck
# --------------------------------------------------------------------------

def css_depth_map(css: str):
    """Profundidad acumulada de (), [], {} por posición (para acotar selectores)."""
    depth = [0] * (len(css) + 1)
    d = 0
    for i, ch in enumerate(css):
        if ch in "([{":
            d += 1
        elif ch in ")]}":
            d = max(0, d - 1)
        depth[i + 1] = d
    return depth


def enclosing_selector(css: str, depth, pos: int) -> str:
    def is_boundary(i):
        return css[i] in ",;{}" and depth[i] == 0

    i = pos - 1
    while i >= 0 and not is_boundary(i):
        i -= 1
    start = i + 1
    i = pos
    while i < len(css) and not is_boundary(i):
        i += 1
    return css[start:i]


def classify_selector(sel: str, target: DeckInfo, others: list) -> str:
    """'target' | 'other' | 'manual' — ¿a qué deck pertenece un selector CSS?"""
    if any(c in sel for c in others_classes(others)):
        return "other"
    if any(c in sel for c in target.body_classes):
        return "target"
    classes = set(re.findall(r"\.([A-Za-z0-9_-]+)", sel))
    if not classes:
        return "manual"
    num = re.search(r"#slide-(\d+)", sel).group(1)
    sid = f"slide-{num}"
    in_target = any(c in target.slide_classes.get(sid, set()) for c in classes)
    in_other = any(
        any(c in o.slide_classes.get(sid, set()) for c in classes) for o in others
    )
    if in_target and not in_other:
        return "target"
    if in_other and not in_target:
        return "other"
    only_target = classes - set().union(*[o.all_classes for o in others]) if others else classes
    only_others = classes - target.all_classes
    if only_target and not only_others:
        return "target"
    if only_others and not only_target:
        return "other"
    return "manual"


def others_classes(others: list):
    return [c for o in others for c in o.body_classes]


def renumber_css(css: str, mapping: dict, target: DeckInfo, others: list):
    """Renombra #slide-N de los selectores del deck objetivo. Devuelve (css, renombrados, manuales)."""
    depth = css_depth_map(css)
    spans = []   # (start, end, new_num)
    manual = []
    for m in re.finditer(r"#slide-(\d+)", css):
        n = int(m.group(1))
        if n not in mapping:
            continue
        sel = enclosing_selector(css, depth, m.start())
        verdict = classify_selector(sel, target, others)
        if verdict == "target":
            spans.append((m.start(), m.end(), mapping[n]))
        elif verdict == "manual":
            manual.append(sel.strip()[:100])
    # Reemplazo por spans (dos fases para evitar colisiones)
    out = css
    for start, end, new in sorted(spans, reverse=True):
        out = out[:start] + f"#slide-{new}" + out[end:]
    # Doble pasada de seguridad: re-ejecutar el mapeo sobre lo renombrado sería
    # incorrecto; los spans ya son finales porque se aplican de atrás hacia delante.
    return out, len(spans), sorted(set(manual))


# --------------------------------------------------------------------------
# Comandos
# --------------------------------------------------------------------------

def titles_of(text: str):
    """Título aproximado de cada slide para el reporte."""
    return text


def slide_title(block: str) -> str:
    m = re.search(r"<h2[^>]*>(.*?)</h2>", block, re.S)
    if not m:
        return ""
    t = re.sub(r"<[^>]+>", "", m.group(1))
    return re.sub(r"\s+", " ", t).strip()[:60]


def cmd_order(deck: DeckInfo, blocks):
    start_num = 0 if blocks and blocks[0][0] == "slide-0" else 1
    print(f"Deck: {deck.path}  (body: {' '.join(sorted(deck.body_classes)) or '—'})")
    for pos, (sid, s, e) in enumerate(blocks, start_num):
        title = slide_title(deck.text[s:e])
        marker = "" if sid == f"slide-{pos}" else "  ← id desalineado"
        print(f"  {pos:>3}: {sid:<12} {title}{marker}")


def do_move(deck_path: Path, args):
    text = deck_path.read_text(encoding="utf-8")
    blocks = find_blocks(text)
    cmd_order(DeckInfo(deck_path), blocks)

    ids = [f"slide-{i}" for i in args.ids]
    ref = f"slide-{args.ref}"
    by_id = {b[0]: b for b in blocks}
    for x in ids + [ref]:
        if x not in by_id:
            raise SystemExit(f"ERROR: {x} no existe en {deck_path.name}")
    if ref in ids:
        raise SystemExit("ERROR: el ref no puede estar también en la lista a mover")

    moved = [by_id[i] for i in ids]
    rest = [b for b in blocks if b[0] not in ids]
    ref_idx = next(i for i, b in enumerate(rest) if b[0] == ref)
    if args.where == "after":
        insert_at = ref_idx + 1
    else:
        insert_at = ref_idx
    new_blocks = rest[:insert_at] + moved + rest[insert_at:]

    # Reconstrucción limpia respetando los bloques originales y comentarios
    first_start = extend_block_start(text, blocks[0][1])
    header = text[:first_start]
    footer = text[blocks[-1][2]:]
    block_chunks = {b[0]: text[extend_block_start(text, b[1]):b[2]] for b in blocks}
    new_text = header + "\n\n    ".join(block_chunks[b[0]].strip() for b in new_blocks) + "\n\n" + footer.lstrip()

    # Renumeración: id = posición final (respetando base 0 si el deck empieza en slide-0)
    start_num = 0 if blocks and blocks[0][0] == "slide-0" else 1
    final_ids = [b[0] for b in new_blocks]
    mapping = {int(sid.split("-")[1]): pos for pos, sid in enumerate(final_ids, start_num)}
    mapping = {k: v for k, v in mapping.items() if k != v}
    if not mapping:
        print("Orden ya alineado; nada que renumerar.")
        return

    print("\nMapeo de renumeración (id = posición):")
    for old in sorted(mapping):
        print(f"  slide-{old} -> slide-{mapping[old]}")

    if args.dry_run:
        print("\n(dry-run: no se ha escrito nada)")
        return

    new_text = renumber_deck_text(new_text, mapping)

    css_path = args.css or deck_path.parent / "style.css"
    css_renamed, css_manual = 0, []
    if css_path and Path(css_path).exists():
        target = DeckInfo(deck_path)
        others = [
            DeckInfo(p)
            for p in sorted(deck_path.parent.glob("*.html"))
            if p != deck_path and p.suffix == ".html"
        ]
        css = Path(css_path).read_text(encoding="utf-8")
        css, css_renamed, css_manual = renumber_css(css, mapping, target, others)
        Path(css_path).write_text(css, encoding="utf-8")

    deck_path.write_text(new_text, encoding="utf-8")
    print(f"\n✔ Deck renumerado: {deck_path}")
    if css_path:
        print(f"✔ CSS renumerado: {css_path} ({css_renamed} selectores)")
    if css_manual:
        print("\n⚠ Selectores CSS sin clasificar (NO tocados, revisar a mano):")
        for s in css_manual:
            print(f"   - {s}")
    if args.bundle:
        subprocess.run([sys.executable, "bundle.py"], cwd=deck_path.parent, check=True)
    else:
        print("\nRecuerda: python3 bundle.py para regenerar dist/")


def do_renumber(deck_path: Path, args):
    """Solo renumerar: id = posición actual."""
    deck = DeckInfo(deck_path)
    blocks = find_blocks(deck.text)
    cmd_order(deck, blocks)
    start_num = 0 if blocks and blocks[0][0] == "slide-0" else 1
    mapping = {}
    for pos, (sid, s, e) in enumerate(blocks, start_num):
        n = deck.slide_num(sid)
        if n != pos:
            mapping[n] = pos
    if not mapping:
        print("\n✔ Ya está alineado (id = posición). Nada que hacer.")
        return
    print("\nMapeo de renumeración (id = posición):")
    for old in sorted(mapping):
        print(f"  slide-{old} -> slide-{mapping[old]}")
    if args.dry_run:
        print("\n(dry-run: no se ha escrito nada)")
        return

    new_text = renumber_deck_text(deck.text, mapping)
    css_path = args.css or deck_path.parent / "style.css"
    css_renamed, css_manual = 0, []
    if css_path and Path(css_path).exists():
        others = [
            DeckInfo(p)
            for p in sorted(deck_path.parent.glob("*.html"))
            if p != deck_path and p.suffix == ".html"
        ]
        css = Path(css_path).read_text(encoding="utf-8")
        css, css_renamed, css_manual = renumber_css(css, mapping, deck, others)
        Path(css_path).write_text(css, encoding="utf-8")

    deck_path.write_text(new_text, encoding="utf-8")
    print(f"\n✔ Deck renumerado: {deck_path}")
    if css_path:
        print(f"✔ CSS renumerado: {css_path} ({css_renamed} selectores)")
    if css_manual:
        print("\n⚠ Selectores CSS sin clasificar (NO tocados, revisar a mano):")
        for s in css_manual:
            print(f"   - {s}")
    if args.bundle:
        subprocess.run([sys.executable, "bundle.py"], cwd=deck_path.parent, check=True)
    else:
        print("\nRecuerda: python3 bundle.py para regenerar dist/")


def do_fix_banners(deck_path: Path, args):
    """Alinea cada banner `SLIDE N:' con el id de la sección que le sigue."""
    text = deck_path.read_text(encoding="utf-8")
    fixed = 0
    out = list(text)
    # Recorremos de atrás hacia delante para que los offsets sean estables
    matches = list(re.finditer(r"SLIDE\s+(\d+)([^:]*:)", text))
    for m in reversed(matches):
        nxt = re.search(r'id="slide-(\d+)"', text[m.end():m.end() + 250])
        if not nxt:
            continue
        target_num = nxt.group(1)
        if m.group(1) == target_num and m.group(2).strip() == ":":
            continue
        old_span = m.span(1)
        suffix_span = m.span(2)
        out[old_span[0] : suffix_span[1]] = f"{target_num}:"
        fixed += 1
        print(f"  banner SLIDE {m.group(1)}{m.group(2)} -> SLIDE {target_num}:")
    if not fixed:
        print("Todos los banners están alineados con su sección.")
        return
    if args.dry_run:
        print("(dry-run: no se ha escrito nada)")
        return
    deck_path.write_text("".join(out), encoding="utf-8")
    print(f"✔ {fixed} banners corregidos en {deck_path}")


def main():
    ap = argparse.ArgumentParser(description="Mueve slides y renumera ids + CSS.")
    ap.add_argument("deck", help="HTML del deck (p. ej. index.html)")
    ap.add_argument("command", choices=["order", "move", "renumber", "fix-banners"])
    ap.add_argument("rest", nargs="*", help="argumentos del comando")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--css", default=None)
    ap.add_argument("--bundle", action="store_true", help="ejecutar bundle.py al final")
    args = ap.parse_args()

    deck_path = Path(args.deck)
    if not deck_path.exists():
        raise SystemExit(f"ERROR: no existe {deck_path}")

    if args.command == "order":
        blocks = find_blocks(deck_path.read_text(encoding="utf-8"))
        cmd_order(DeckInfo(deck_path), blocks)
        return

    if args.command == "move":
        # move <ids...> after|before <ref>   |   move <id> to <pos>
        rest = args.rest
        if len(rest) >= 3 and rest[-2] in ("after", "before"):
            args.ids = [int(x) for x in rest[:-2]]
            args.where = rest[-2]
            args.ref = int(rest[-1])
        elif len(rest) == 3 and rest[-2] == "to":
            args.ids = [int(rest[0])]
            args.where = None
            args.ref = int(rest[-1])
            # 'to N' se traduce a before/after según el destino final
            blocks = find_blocks(deck_path.read_text(encoding="utf-8"))
            order_now = [int(b[0].split("-")[1]) for b in blocks]
            order_now = [x for x in order_now if x != args.ids[0]]
            if args.ref <= len(order_now) + 1:
                # posición destino 1-indexada sobre la lista sin el movido
                if args.ref == len(order_now) + 1:
                    args.where, args.ref = "after", order_now[-1]
                else:
                    args.where, args.ref = "before", order_now[args.ref - 1]
        else:
            raise SystemExit("Uso: move <ids...> after|before <id>  |  move <id> to <pos>")
        do_move(deck_path, args)
        return

    if args.command == "renumber":
        do_renumber(deck_path, args)
        return

    if args.command == "fix-banners":
        do_fix_banners(deck_path, args)
        return


if __name__ == "__main__":
    main()
