"""Regenerate public/ brand assets (og.png, icon.png, apple-icon.png, favicon.ico)
in the lab-notebook identity: graph paper, ink, ultramarine pen, red margin rule.

Requires Pillow and the three brand fonts as static TTFs:

    pip install Pillow
    cd /tmp && for url in \
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@144,800" \
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600" \
      "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500"; do
        curl -s "$url" | grep -o 'https://[^)]*\\.ttf' | head -1
    done
    # download each printed URL as fraunces.ttf / plexmono.ttf / instrument.ttf

Run from the repo root:  python3 scripts/generate-brand-assets.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PAPER = (247, 248, 245)
INK = (22, 24, 29)
INK_MUTED = (79, 85, 96)
INK_FAINT = (133, 140, 152)
ACCENT = (0, 47, 167)
GRID = (58, 110, 200)
RED = (201, 58, 29)

FONT_DIR = Path("/tmp")
FRAUNCES = str(FONT_DIR / "fraunces.ttf")
PLEX = str(FONT_DIR / "plexmono.ttf")
INSTRUMENT = str(FONT_DIR / "instrument.ttf")

PUBLIC = Path(__file__).resolve().parent.parent / "public"


def paper_sheet(w: int, h: int, grid_step: int, grid_alpha: int = 23) -> Image.Image:
    img = Image.new("RGBA", (w, h), PAPER + (255,))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for x in range(grid_step, w, grid_step):
        d.line([(x, 0), (x, h)], fill=GRID + (grid_alpha,), width=1)
    for y in range(grid_step, h, grid_step):
        d.line([(0, y), (w, y)], fill=GRID + (grid_alpha,), width=1)
    img.alpha_composite(overlay)
    return img


def margin_rule(img: Image.Image, x: int, width: int = 2, alpha: int = 110) -> None:
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rectangle([x, 0, x + width - 1, img.height], fill=RED + (alpha,))
    img.alpha_composite(overlay)


def draw_tracked(d: ImageDraw.ImageDraw, pos, text, font, fill, tracking=0.0):
    """Letter-spaced text (PIL has no native tracking)."""
    x, y = pos
    extra = font.size * tracking
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + extra
    return x


def make_og() -> Image.Image:
    img = paper_sheet(1200, 630, grid_step=28)
    margin_rule(img, x=96)
    d = ImageDraw.Draw(img)
    x0 = 150

    kicker_font = ImageFont.truetype(PLEX, 25)
    draw_tracked(d, (x0, 132), "BUKUNMI AKINYEMI · SOFTWARE", kicker_font, ACCENT, tracking=0.18)

    headline_font = ImageFont.truetype(FRAUNCES, 118)
    headline = "I model systems"
    d.text((x0 - 4, 196), headline, font=headline_font, fill=INK)
    w = d.textlength(headline, font=headline_font)
    d.text((x0 - 4 + w, 196), ".", font=headline_font, fill=ACCENT)

    body_font = ImageFont.truetype(INSTRUMENT, 35)
    d.text((x0, 392), "I map patterns and deviations in complex systems", font=body_font, fill=INK_MUTED)
    d.text((x0, 442), "and turn them into tools with measurable value.", font=body_font, fill=INK_MUTED)

    foot_font = ImageFont.truetype(PLEX, 22)
    draw_tracked(d, (x0, 540), "BUKUNMI-PORTFOLIO.VERCEL.APP", foot_font, INK_FAINT, tracking=0.12)

    return img.convert("RGB")


def make_mark(size: int, grid_step: int, rule: bool = True) -> Image.Image:
    """The 'b.' mark on graph paper."""
    img = paper_sheet(size, size, grid_step=grid_step)
    if rule:
        margin_rule(img, x=round(size * 0.16), width=max(2, round(size * 0.012)))
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(FRAUNCES, round(size * 0.62))
    text_w = d.textlength("b", font=font) + d.textlength(".", font=font)
    ascent, descent = font.getmetrics()
    x = (size - text_w) / 2 + size * 0.03  # nudge right of the margin rule
    y = (size - (ascent + descent)) / 2
    d.text((x, y), "b", font=font, fill=INK)
    d.text((x + d.textlength("b", font=font), y), ".", font=font, fill=ACCENT)
    return img


if __name__ == "__main__":
    make_og().save(PUBLIC / "og.png")

    icon512 = make_mark(512, grid_step=56)
    icon512.convert("RGBA").save(PUBLIC / "icon.png")
    icon512.resize((180, 180), Image.LANCZOS).convert("RGBA").save(PUBLIC / "apple-icon.png")

    # Favicon: no grid/rule so the mark stays legible at 16px.
    fav = make_mark(256, grid_step=64, rule=False)
    fav.convert("RGB").save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    print(f"assets written to {PUBLIC}")
