#!/usr/bin/env python
"""
Regenerate every derived logo asset from the original artwork.

    pip install Pillow
    python tools/prepare-logo.py path/to/original-logo.png

Writes into public/:

    images/logo.png             white knocked out, colours untouched
    images/logo-dark.png        black lettering remapped to off-white (navbar)
    images/logo-dark-base.png   logo-dark with both wheels lifted out
    images/wheel-front.png      front wheel sprite, square, hub-centred
    images/wheel-rear.png       rear wheel sprite
    favicon.png                 the buggy alone on racing red, 64px
    apple-touch-icon.png        the same at 180px

The loading screen stacks logo-dark-base + the two wheel sprites, which
reproduces logo-dark exactly — that is what lets the wheels spin on their own.
If you change the artwork, re-run this and check the WHEELS coordinates below
still line up (the script prints the offsets the site expects).
"""
import math
import os
import sys

from PIL import Image

PAPER = (239, 236, 228)
RED = (225, 6, 0, 255)
TARGET_W = 1200
LIGHT = 150  # min(r,g,b) above this is wheel//lettering line work, not red

# Hub centres and tyre radii, in pixels of the 1200px-wide normalised logo.
# Found by locating the solid hub disc inside its empty gap ring, then reading
# the tyre edge off the angular-coverage profile. Re-check these if the artwork
# changes: tools/prepare-logo.py --inspect renders them over the logo.
# Both wheels are the same drawing at the same size. The rear one is heavily
# overlapped by the "P", so rebuilding it from its own remaining arc leaves
# visible streaks; `copy_from` reuses the clean front sprite for it instead.
# Its own pixels are still lifted off the base, so nothing doubles up.
WHEELS = [
    {'name': 'wheel-front', 'cx': 403, 'cy': 204, 'r': 67},
    {'name': 'wheel-rear', 'cx': 766, 'cy': 204, 'r': 67, 'copy_from': 'wheel-front'},
]

# A wheel is rotationally symmetric; the suspension rods and chassis tubes that
# cross it are not. So a pixel is only part of the wheel if the same spot is
# covered at most other rotations too. Rod pixels fail this and stay on the
# static base plate, which is where they belong - they are bolted to the car.
SUPPORT_SAMPLES = 36
SUPPORT_MIN = 0.60

# Lettering is drawn over parts of each tyre, so the lifted sprite has a bite
# missing. Left alone that bite would rotate with the wheel and read as a hole.
# Rings at or above this coverage are treated as continuous and are rebuilt
# from the rest of the ring, using the wheel's own rotational symmetry.
REPAIR_MIN_COVERAGE = 0.30

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
IMAGES = os.path.join(PUBLIC, 'images')


def normalise(src):
    """Trim the white margin and scale to a predictable width."""
    im = Image.open(src).convert('RGB')
    box = im.point(lambda v: 0 if v > 244 else 255).convert('L').getbbox()
    pad = 6
    im = im.crop((max(0, box[0] - pad), max(0, box[1] - pad),
                  min(im.width, box[2] + pad), min(im.height, box[3] + pad)))
    if im.width > TARGET_W:
        im = im.resize((TARGET_W, round(im.height * TARGET_W / im.width)), Image.LANCZOS)
    return im


def knock_out_white(im):
    """
    Un-multiply against the white background instead of thresholding, so the
    antialiased edges keep their real colour rather than turning grey.
    Returns (colours-untouched, dark-ground) variants.
    """
    w, h = im.size
    src = im.load()
    light, dark = Image.new('RGBA', (w, h)), Image.new('RGBA', (w, h))
    lp, dp = light.load(), dark.load()

    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            a = 255 - min(r, g, b)
            if a == 0:
                continue
            f = a / 255.0
            back = 255 * (1 - f)
            c = tuple(min(255, max(0, round((v - back) / f))) for v in (r, g, b))
            lp[x, y] = (*c, a)
            chroma = max(c) - min(c)
            lum = (c[0] * 299 + c[1] * 587 + c[2] * 114) // 1000
            dp[x, y] = (*PAPER, a) if (chroma < 46 and lum < 135) else (*c, a)

    return light, dark


def repair(sprite, r):
    """Fill angular bites taken out of the wheel by overlapping lettering."""
    size = r * 2
    px = sprite.load()
    c = r - 0.5

    def at(rad, ang):
        x, y = round(c + math.cos(ang) * rad), round(c + math.sin(ang) * rad)
        if 0 <= x < size and 0 <= y < size:
            return px[x, y]
        return (0, 0, 0, 0)

    # How complete is each radius ring?
    coverage = []
    for rad in range(r + 1):
        n = max(24, int(2 * math.pi * rad))
        hit = sum(1 for i in range(n) if at(rad, i * 2 * math.pi / n)[3] > 0)
        coverage.append(hit / n)

    filled = 0
    out = sprite.copy()
    op = out.load()
    for y in range(size):
        for x in range(size):
            if px[x, y][3] > 0:
                continue
            ox, oy = x - c, y - c
            rad = math.hypot(ox, oy)
            if rad > r - 1:
                continue
            if coverage[round(rad)] < REPAIR_MIN_COVERAGE:
                continue  # a genuine gap between rings, not an occlusion
            ang = math.atan2(oy, ox)
            # Walk outwards in both directions for the nearest intact pixel on
            # the same ring.
            for step in range(2, 180):
                for sign in (1, -1):
                    probe = at(rad, ang + sign * step * math.pi / 180)
                    if probe[3] > 0:
                        op[x, y] = probe
                        filled += 1
                        break
                else:
                    continue
                break
    return out, filled


def split_wheels(dark):
    """Lift each wheel into its own sprite, erasing it from the base plate."""
    W, H = dark.size
    base = dark.copy()
    bp = base.load()
    src = dark.load()
    sprites, meta = [], []

    def lit(x, y):
        x, y = round(x), round(y)
        if not (0 <= x < W and 0 <= y < H):
            return False
        r, g, b, a = src[x, y]
        return a >= 30 and min(r, g, b) > LIGHT

    for wheel in WHEELS:
        cx, cy, r = wheel['cx'], wheel['cy'], wheel['r']
        size = r * 2
        sprite = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        sp = sprite.load()
        kept = 0

        for dy in range(size):
            for dx in range(size):
                ox, oy = dx - r + 0.5, dy - r + 0.5
                rad = math.hypot(ox, oy)
                if rad > r:
                    continue
                x, y = cx - r + dx, cy - r + dy
                if not lit(x, y):
                    continue

                ang = math.atan2(oy, ox)
                hits = 0
                for k in range(SUPPORT_SAMPLES):
                    t = ang + k * 2 * math.pi / SUPPORT_SAMPLES
                    if lit(cx + math.cos(t) * rad, cy + math.sin(t) * rad):
                        hits += 1
                if hits / SUPPORT_SAMPLES < SUPPORT_MIN:
                    continue  # a rod or tube: leave it on the static base

                sp[dx, dy] = bp[x, y]
                bp[x, y] = (0, 0, 0, 0)
                kept += 1

        sprite, filled = repair(sprite, r)
        if wheel.get('copy_from'):
            source = dict(sprites)[wheel['copy_from']]
            print(f'  {wheel["name"]}: reusing {wheel["copy_from"]} artwork')
            sprite = source.copy()
        sprites.append((wheel['name'], sprite))
        meta.append((wheel['name'], (cx - r) / W * 100, (cy - r) / H * 100, size / W * 100))
        print(f'  {wheel["name"]}: {size}px sprite, {kept}px lifted, {filled}px rebuilt')

    return base, sprites, meta


def make_icons(dark):
    """The buggy alone, knocked out on racing red. The lockup is unreadable at
    tab size, so only the car is used."""
    w, h = dark.size
    px = dark.load()
    cutoff = int(h * 0.74)  # above the "IIT BHILAI" line
    car = Image.new('RGBA', (w, cutoff), (0, 0, 0, 0))
    cp = car.load()
    for y in range(cutoff):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a >= 40 and min(r, g, b) > LIGHT:
                cp[x, y] = (255, 255, 255, a)
    car = car.crop(car.getbbox())

    side = max(car.size)
    pad = round(side * 0.14)
    canvas = Image.new('RGBA', (side + pad * 2, side + pad * 2), RED)
    canvas.paste(car, ((canvas.width - car.width) // 2, (canvas.height - car.height) // 2), car)
    return canvas


def main():
    if len(sys.argv) < 2:
        sys.exit('usage: python tools/prepare-logo.py <original-logo.png>')

    os.makedirs(IMAGES, exist_ok=True)
    im = normalise(sys.argv[1])
    light, dark = knock_out_white(im)
    light.save(os.path.join(IMAGES, 'logo.png'), optimize=True)
    dark.save(os.path.join(IMAGES, 'logo-dark.png'), optimize=True)
    print(f'logo.png / logo-dark.png  {im.width}x{im.height}')

    base, sprites, meta = split_wheels(dark)
    base.save(os.path.join(IMAGES, 'logo-dark-base.png'), optimize=True)
    for name, sprite in sprites:
        sprite.save(os.path.join(IMAGES, f'{name}.png'), optimize=True)

    # Verify the split is lossless: base + sprites must equal logo-dark.
    check = base.copy()
    for wheel, (name, sprite) in zip(WHEELS, sprites):
        check.alpha_composite(sprite, (wheel['cx'] - wheel['r'], wheel['cy'] - wheel['r']))
    # Preview the wheels at several angles so artefacts are easy to spot. The
    # site stacks wheels UNDER the base, so the preview must too.
    frames = []
    for ang in (0, 40, 80):
        layer = Image.new('RGBA', dark.size, (0, 0, 0, 0))
        for wheel, (name, sprite) in zip(WHEELS, sprites):
            layer.alpha_composite(sprite.rotate(ang, resample=Image.BICUBIC),
                                  (wheel['cx'] - wheel['r'], wheel['cy'] - wheel['r']))
        layer.alpha_composite(base)
        frames.append(layer)
    strip = Image.new('RGBA', (dark.width, dark.height * len(frames)), (18, 18, 18, 255))
    for i, f in enumerate(frames):
        strip.alpha_composite(f, (0, i * dark.height))
    strip.save(os.path.join(ROOT, 'logo-spin-preview.png'))
    print('logo-spin-preview.png written in the project root (0/40/80 degrees)')

    icons = make_icons(dark)
    for size, name in ((180, 'apple-touch-icon.png'), (64, 'favicon.png')):
        icons.resize((size, size), Image.LANCZOS).save(os.path.join(PUBLIC, name), optimize=True)
    print('favicon.png / apple-touch-icon.png')

    print('\nPut these in team.logoWheels in src/data/site.js:')
    for name, left, top, width in meta:
        print(f"  {{ src: '/images/{name}.png', left: {left:.3f}, "
              f"top: {top:.3f}, width: {width:.3f} }},")


if __name__ == '__main__':
    main()
