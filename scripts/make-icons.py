#!/usr/bin/env python3
"""Regenerates the favicons, touch icon, tiles and the header logo mask in the accent colour.

The source is the signature artwork (scripts/signature-source.png: one colour on transparent).
Every output uses the flat accent #00E5FF; small sizes get slightly bolder strokes so the fine
detail survives. Needs: pip install pillow numpy
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = Image.open(ROOT / "scripts" / "signature-source.png").convert("RGBA")
OUT = ROOT / "public" / "favicons"
ACCENT = (0, 229, 255)
GROUND = (13, 17, 23)  # --bg, behind the opaque icons


def alpha_of(size, bolder=0.0, grow=0):
    a = SRC.getchannel("A").resize((size, size), Image.LANCZOS)
    if grow:
        a = a.filter(ImageFilter.MaxFilter(grow))
    arr = np.asarray(a, dtype=np.float32) / 255.0
    if bolder:
        arr = arr ** (1.0 - bolder)  # lifts partial alpha: thinner strokes read stronger
    return Image.fromarray((arr * 255).astype(np.uint8))


def logo(size, **kw):
    img = Image.new("RGBA", (size, size), ACCENT + (0,))
    img.putalpha(alpha_of(size, **kw))
    return img


def on_ground(size, scale=0.86, **kw):
    img = Image.new("RGBA", (size, size), GROUND + (255,))
    inner = int(size * scale)
    lg = logo(inner, **kw)
    img.alpha_composite(lg, ((size - inner) // 2, (size - inner) // 2))
    return img


logo(128, bolder=0.25).save(OUT / "logo-mask.png", optimize=True)
logo(16, bolder=0.45).save(OUT / "favicon-16x16.png", optimize=True)
logo(32, bolder=0.6).save(OUT / "favicon-32x32.png", optimize=True)
logo(48, bolder=0.35).save(OUT / "favicon-48x48.png", optimize=True)
ico_sizes = [(16, 16), (32, 32), (48, 48)]
logo(256, bolder=0.2).save(OUT / "favicon.ico", sizes=ico_sizes)
on_ground(180, bolder=0.2).convert("RGB").save(OUT / "apple-touch-icon.png", optimize=True)
on_ground(192, bolder=0.2).save(OUT / "android-chrome-192x192.png", optimize=True)
on_ground(512, bolder=0.1).save(OUT / "android-chrome-512x512.png", optimize=True)
on_ground(270, scale=0.7, bolder=0.15).save(OUT / "mstile-150x150.png", optimize=True)
print("icons written to", OUT)
