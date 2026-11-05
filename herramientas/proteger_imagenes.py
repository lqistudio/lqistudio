#!/usr/bin/env python3
"""Reduce y marca tus dibujos antes de subirlos a la web.
Uso:  python proteger_imagenes.py carpeta_originales carpeta_salida
Requiere:  pip install pillow   (los originales nunca se suben)"""
import sys, pathlib
from PIL import Image, ImageDraw, ImageFont
src, dst = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]); dst.mkdir(exist_ok=True)
MAX, TXT = 1400, '© LQISTUDIO'
try: font = ImageFont.truetype('DejaVuSans-Bold.ttf', 28)
except Exception: font = ImageFont.load_default()
for f in sorted(src.iterdir()):
    if f.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp'): continue
    im = Image.open(f).convert('RGBA'); im.thumbnail((MAX, MAX))
    wm = Image.new('RGBA', (im.width * 2, im.height * 2), (0, 0, 0, 0)); d = ImageDraw.Draw(wm)
    for y in range(0, wm.height, 110):
        for x in range(0, wm.width, 300): d.text((x + (y // 110 % 2) * 150, y), TXT, font=font, fill=(255, 255, 255, 46))
    wm = wm.rotate(25).crop((im.width // 2, im.height // 2, im.width // 2 + im.width, im.height // 2 + im.height))
    Image.alpha_composite(im, wm).save(dst / (f.stem + '.webp'), quality=82)
    print('ok', f.name)
