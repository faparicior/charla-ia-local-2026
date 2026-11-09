#!/usr/bin/env python3
"""Exporta los decks de dist/ a PDF: una slide = una página, a sangre.

El diálogo Ctrl+P del navegador añade cabeceras/pies (URL, fecha, numeración) y
márgenes según cómo esté configurado el diálogo — y eso no se puede forzar por
CSS. Este script usa Chrome headless con --no-pdf-header-footer para que cada
página sea EXACTAMENTE la slide: el `@page { size: 1920px 1080px; margin: 0 }`
de style.css fija el papel y el print CSS de style.css hace el resto (steps en
estado final, HUD oculto, doc-only excluidas → solo salen las slides de Charla).

Uso:
  python3 script/export_pdf.py              # los 3 decks → dist/pdf/
  python3 script/export_pdf.py parte1       # solo uno (parte1 | parte2 | plantillas)
"""
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
OUT = DIST / "pdf"

DECKS = {
    "parte1": "charla-parte1-hardware-modelos.html",
    "parte2": "charla-parte2-ciclo-desarrollo.html",
    "plantillas": "plantillas-referencia.html",
}


def chrome_bin():
    for cand in ("google-chrome", "google-chrome-stable", "chromium", "chromium-browser"):
        if shutil.which(cand):
            return cand
    sys.exit("❌ No hay Chrome/Chromium en el PATH")


def export(key, fname):
    src = DIST / fname
    if not src.exists():
        print(f"⚠️  {src.name} no existe — ejecuta antes `python3 bundle.py`")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    dst = OUT / src.name.replace(".html", ".pdf")
    cmd = [
        chrome_bin(), "--headless=new", "--disable-gpu",
        "--no-pdf-header-footer", "--virtual-time-budget=30000",
        f"--print-to-pdf={dst}", src.as_uri(),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    pages = "?"
    if shutil.which("pdfinfo"):
        info = subprocess.run(["pdfinfo", str(dst)], capture_output=True, text=True).stdout
        for line in info.splitlines():
            if line.startswith("Pages:"):
                pages = line.split()[-1]
    print(f"✅ {dst.relative_to(ROOT)}  ·  {pages} páginas  ·  {dst.stat().st_size / 1e6:.1f} MB")


def main():
    keys = sys.argv[1:] or list(DECKS)
    for key in keys:
        if key not in DECKS:
            sys.exit(f"❌ Deck desconocido: {key} (usa: {', '.join(DECKS)})")
        export(key, DECKS[key])


if __name__ == "__main__":
    main()
