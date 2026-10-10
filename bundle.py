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

    # 4. Ajustar enlaces entre decks si es necesario para la versión dist/
    if entry_html.name == "index.html":
        html_content = html_content.replace('data-next-deck="parte2-ciclo-desarrollo.html"', 'data-next-deck="charla-parte2-ciclo-desarrollo.html"')
        html_content = html_content.replace('href="parte2-ciclo-desarrollo.html"', 'href="charla-parte2-ciclo-desarrollo.html"')
        html_content = html_content.replace('href="templates.html"', 'href="plantillas-referencia.html"')
    elif entry_html.name == "parte2-ciclo-desarrollo.html":
        html_content = html_content.replace('data-prev-deck="index.html#last"', 'data-prev-deck="charla-parte1-hardware-modelos.html#last"')
        html_content = html_content.replace('href="index.html#last"', 'href="charla-parte1-hardware-modelos.html#last"')
        html_content = html_content.replace('href="templates.html"', 'href="plantillas-referencia.html"')
    elif entry_html.name == "templates.html":
        html_content = html_content.replace('data-next-deck="index.html"', 'data-next-deck="charla-parte1-hardware-modelos.html"')
        html_content = html_content.replace('href="index.html"', 'href="charla-parte1-hardware-modelos.html"')
        html_content = html_content.replace('href="parte2-ciclo-desarrollo.html"', 'href="charla-parte2-ciclo-desarrollo.html"')

    # 5. Guardar archivo final empaquetado
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
    parser = argparse.ArgumentParser(description="Empaqueta la presentación en archivos HTML independientes.")
    parser.add_argument(
        "-i", "--input",
        default=None,
        help="Archivo HTML de entrada específico (opcional)"
    )
    parser.add_argument(
        "-o", "--output",
        default=None,
        help="Ruta del archivo de salida específico (opcional)"
    )
    args = parser.parse_args()

    if args.input:
        entry = Path(args.input)
        out = Path(args.output) if args.output else Path("dist") / f"{entry.stem}-standalone.html"
        bundle_presentation(entry, out)
    else:
        # Modo por defecto: Empaqueta los 3 decks del proyecto
        print("🚀 Empaquetando los 3 decks del proyecto AI Local Crafters...")
        print("=" * 60)

        # 1. Parte 1: Hardware y Modelos
        p1_out = Path("dist/charla-parte1-hardware-modelos.html")
        bundle_presentation(Path("index.html"), p1_out)
        
        # Copia de compatibilidad
        compat_out = Path("dist/charla-ai-local-crafters-standalone.html")
        compat_out.write_text(p1_out.read_text(encoding="utf-8"), encoding="utf-8")
        print(f"   ↳ 📋 Copia de compatibilidad actualizada: {compat_out.name}")

        # 2. Parte 2: Ciclo de Desarrollo
        p2_out = Path("dist/charla-parte2-ciclo-desarrollo.html")
        bundle_presentation(Path("parte2-ciclo-desarrollo.html"), p2_out)

        # 3. Catálogo de Plantillas
        tmpl_out = Path("dist/plantillas-referencia.html")
        bundle_presentation(Path("templates.html"), tmpl_out)

        print("\n🎉 ¡Todos los paquetes han sido generados en la carpeta dist/!")
        print("   1. dist/charla-parte1-hardware-modelos.html (Parte 1: 52 slides)")
        print("   2. dist/charla-parte2-ciclo-desarrollo.html (Parte 2: 44 secciones · charla: 16 visibles)")
        print("   3. dist/plantillas-referencia.html          (Plantillas: 8 slides)")

if __name__ == "__main__":
    main()
