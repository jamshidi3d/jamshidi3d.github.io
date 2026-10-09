#!/usr/bin/env python3
"""Builds the self-hosted, Latin-subset woff2 fonts in public/fonts from the Fontsource packages.

Usage:
  python -m venv venv && venv/Scripts/pip install fonttools brotli   (once)
  npm i --prefix <dir> @fontsource/oxanium @fontsource/sofia-sans-semi-condensed @fontsource/ubuntu \
        @fontsource/commit-mono @fontsource/red-hat-text
  python scripts/build-fonts.py <dir>/node_modules

Oxanium, Sofia Sans, Commit Mono and Red Hat Text are SIL OFL 1.1; Ubuntu is under the Ubuntu Font Licence 1.0 (see public/fonts/UFL-LICENSE.txt). The script also prints size-adjusted fallback metrics for the
@font-face fallback rules in src/styles/fonts.css.
"""
import io
import json
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

NM = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

# Basic Latin, Latin-1, and the punctuation/arrows the site uses.
UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x2190, 0x2191, 0x2192, 0x2193, 0x2197, 0x2212]
)
FEATURES = ["kern", "liga", "tnum", "ccmp", "locl", "mark", "mkmk"]

FONTS = [
    # out name, source file, instancer axes (or None), fallback font file, label
    ("oxanium-700", "@fontsource/oxanium/files/oxanium-latin-700-normal.woff2", None, "arialbd.ttf"),
    ("sofia-600", "@fontsource/sofia-sans-semi-condensed/files/sofia-sans-semi-condensed-latin-600-normal.woff2", None, "arialbd.ttf"),
    ("ubuntu-400", "@fontsource/ubuntu/files/ubuntu-latin-400-normal.woff2", None, "arial.ttf"),
    ("ubuntu-700", "@fontsource/ubuntu/files/ubuntu-latin-700-normal.woff2", None, "arialbd.ttf"),
    ("commitmono-400", "@fontsource/commit-mono/files/commit-mono-latin-400-normal.woff2", None, "cour.ttf"),
    ("redhattext-400", "@fontsource/red-hat-text/files/red-hat-text-latin-400-normal.woff2", None, "arial.ttf"),
    ("redhattext-400i", "@fontsource/red-hat-text/files/red-hat-text-latin-400-italic.woff2", None, "ariali.ttf"),
    ("redhattext-600", "@fontsource/red-hat-text/files/red-hat-text-latin-600-normal.woff2", None, "arialbd.ttf"),
]

SAMPLE = "the quick brown fox jumps over the lazy dog simulation rigging and tools from game animation to cosmology research"


def avg_width(font: TTFont) -> float:
    cmap, hmtx = font.getBestCmap(), font["hmtx"]
    widths = [hmtx[cmap[ord(c)]][0] for c in SAMPLE if ord(c) in cmap]
    return sum(widths) / len(widths) / font["head"].unitsPerEm


report = {}
total = 0
for name, src, axes, fb in FONTS:
    font = TTFont(NM / src)
    if axes:
        font = instancer.instantiateVariableFont(font, axes)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = FEATURES
    opts.name_IDs = [1, 2, 3, 4, 6]
    opts.notdef_outline = True
    opts.hinting = False
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=UNICODES)
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = "woff2"
    font.save(buf)
    (OUT / f"{name}.woff2").write_bytes(buf.getvalue())
    size = len(buf.getvalue())
    total += size

    # size-adjusted fallback metrics against the system font
    entry = {"bytes": size}
    fbpath = Path("C:/Windows/Fonts") / fb
    if fbpath.exists():
        f2 = TTFont(fbpath)
        adj = avg_width(font) / avg_width(f2)
        upm, hhea = font["head"].unitsPerEm, font["hhea"]
        entry.update(
            {
                "size_adjust": f"{adj * 100:.2f}%",
                "ascent_override": f"{hhea.ascent / upm / adj * 100:.2f}%",
                "descent_override": f"{abs(hhea.descent) / upm / adj * 100:.2f}%",
                "line_gap_override": f"{hhea.lineGap / upm / adj * 100:.2f}%",
                "fallback": fb,
            }
        )
    report[name] = entry
    print(f"{name:20s} {size:7d} B")

print(f"total {total} B")
print(json.dumps(report, indent=2))
