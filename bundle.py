#!/usr/bin/env python3
"""
Bundle Script: AI Local Crafters Presentation
=============================================
Empaqueta todos los recursos modulares (HTML, CSS, JS e imágenes locales)
en un único archivo HTML 100% autónomo y portable (Single-File Bundle).

Uso:
    python3 bundle.py
    python3 bundle.py -o dist/mi-presentacion.html
"""

import os
import re
import sys
import base64
import mimetypes
import argparse
from pathlib import Path

def get_base64_data_uri(file_path: Path) -> str:
    """Convierte un archivo de imagen en un Data URI en Base64."""
    mime_type, _ = mimetypes.guess_type(str(file_path))
    if not mime_type:
        ext = file_path.suffix.lower()
        if ext in ('.jpg', '.jpeg'):
            mime_type = 'image/jpeg'
        elif ext == '.png':
            mime_type = 'image/png'
        elif ext == '.webp':
            mime_type = 'image/webp'
        elif ext == '.svg':
            mime_type = 'image/svg+xml'
        else:
            mime_type = 'application/octet-stream'

    with open(file_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    
    return f"data:{mime_type};base64,{encoded}"

def bundle_presentation(entry_html: Path, output_file: Path):
    """Procesa el HTML de entrada e incrusta CSS, JS e imágenes en Base64."""
    base_dir = entry_html.parent
    
    if not entry_html.exists():
        print(f"❌ Error: No se encontró el archivo de entrada: {entry_html}")
        sys.exit(1)

    print(f"📦 Leyendo archivo base: {entry_html.name}")
    html_content = entry_html.read_text(encoding='utf-8')

    # 1. Incrustar hojas de estilo CSS locales (<link rel="stylesheet" href="...">)
    def replace_css_link(match):
        href = match.group(1)
        if href.startswith(('http://', 'https://', '//')):
            return match.group(0)  # Dejar fuentes externas como Google Fonts
        
        css_path = (base_dir / href).resolve()
        if css_path.exists():
            print(f"   ↳ 🎨 Incrustando CSS: {href}")
            css_content = css_path.read_text(encoding='utf-8')
            return f"<style>\n/* Inlined from {href} */\n{css_content}\n</style>"
        else:
            print(f"   ⚠️ Advertencia: No se encontró el archivo CSS: {css_path}")
            return match.group(0)

    html_content = re.sub(
        r'<link\s+[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\'][^>]*>',
        replace_css_link,
        html_content,
        flags=re.IGNORECASE
    )
    # Por si rel y href están en orden inverso
    html_content = re.sub(
        r'<link\s+[^>]*href=["\']([^"\']+\.css)["\'][^>]*rel=["\']stylesheet["\'][^>]*>',
        replace_css_link,
        html_content,
        flags=re.IGNORECASE
    )

    # 2. Incrustar scripts JS locales (<script src="..."></script>)
    def replace_js_script(match):
        src = match.group(1)
        if src.startswith(('http://', 'https://', '//')):
            return match.group(0)  # Dejar scripts externos si hubiera
        
        js_path = (base_dir / src).resolve()
        if js_path.exists():
            print(f"   ↳ ⚡ Incrustando JS: {src}")
            js_content = js_path.read_text(encoding='utf-8')
            return f"<script>\n/* Inlined from {src} */\n{js_content}\n</script>"
        else:
            print(f"   ⚠️ Advertencia: No se encontró el archivo JS: {js_path}")
            return match.group(0)

    html_content = re.sub(
        r'<script\s+[^>]*src=["\']([^"\']+)["\'][^>]*>\s*</script>',
        replace_js_script,
        html_content,
        flags=re.IGNORECASE
    )

    # 3. Incrustar imágenes locales (<img src="...">)
    def replace_img_src(match):
        full_tag = match.group(0)
        src = match.group(1)
        if src.startswith(('data:', 'http://', 'https://', '//')):
            return full_tag
        
        img_path = (base_dir / src).resolve()
        if img_path.exists():
            print(f"   ↳ 🖼️  Incrustando imagen Base64: {src}")
            data_uri = get_base64_data_uri(img_path)
            return full_tag.replace(src, data_uri)
        else:
            print(f"   ⚠️ Advertencia: No se encontró la imagen: {img_path}")
            return full_tag

    html_content = re.sub(
        r'<img\s+[^>]*src=["\']([^"\']+)["\'][^>]*>',
        replace_img_src,
        html_content,
        flags=re.IGNORECASE
    )

    # 4. Guardar archivo final empaquetado
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(html_content, encoding='utf-8')
    
    file_size_kb = output_file.stat().st_size / 1024
    file_size_mb = file_size_kb / 1024

    print("-" * 60)
    if file_size_mb >= 1.0:
        print(f"✨ ¡Paquete generado con éxito! ({file_size_mb:.2f} MB)")
    else:
        print(f"✨ ¡Paquete generado con éxito! ({file_size_kb:.1f} KB)")
    print(f"📁 Destino: {output_file.resolve()}")
    print("🚀 Este archivo es 100% independiente: puedes abrirlo sin servidor ni dependencias.")
    print("-" * 60)

def main():
    parser = argparse.ArgumentParser(description="Empaqueta la presentación en un único archivo HTML.")
    parser.add_argument(
        "-i", "--input",
        default="index.html",
        help="Archivo HTML de entrada (default: index.html)"
    )
    parser.add_argument(
        "-o", "--output",
        default="dist/charla-ai-local-crafters-standalone.html",
        help="Ruta del archivo de salida (default: dist/charla-ai-local-crafters-standalone.html)"
    )
    args = parser.parse_args()

    entry = Path(args.input)
    out = Path(args.output)

    bundle_presentation(entry, out)

if __name__ == "__main__":
    main()
