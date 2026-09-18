# COAST RUN — Style Guide

**Palette:** approved (`palette.md` only). Magenta `#FF00FF` = raw-frame chroma key only.

## Pixel rules
- Nearest-neighbor, 1:1 pixels, no AA, no gradients, no drop shadows
- Integer grid; outlines 1px with `#3A3A48`
- Player fill: `#D94F3D`; accents from palette only

## Canvases
| Asset | Canvas | Foot-contact line (Y) | Default facing |
|-------|--------|------------------------|----------------|
| Player idle / walk | 32×32 | 31 (bottom row) | right |

## Pipeline
1. Prompt sheet → generate raw frames (magenta bg)
2. Picasso audits grid + palette drift
3. Slice / pack → `/workspace/game/app/public/assets/`
4. Log in `art/audit.md` — only then Engineer wires frames

## Current focus
Player idle (2) + walk (4). No tileset / HUD / extras until those are audited.
