# BLOOD NEON: LAST WATCH — Style Guide

**Palette:** approved — `/workspace/game/palette.md` only.  
**Chroma:** `#FF00FF` on every raw frame (not in finished sheets).

## Look
Dark void, neon magenta/cyan, rust, wet asphalt, sickly UV. No AA, no gradients, no soft drop shadows. Readable at couch distance.

## Locked canvases
| Asset | Canvas | Foot Y | Facing |
|-------|--------|--------|--------|
| Hunters | 48×48 | 47 | right (flip in engine) |
| Ghoul / Street vamp | 40×40 | 39 | right |
| Scout wolf | 48×32 | 31 | right |
| Barricade Captain | 48×48 | 47 | right |
| Pale Broker | 64×64 | 63 | right |

## Hunter anims (v1)
idle 4 · walk 6 · dash 3 · attack 5 · hurt 2 · ko 3 · OD tell = recolor/FX on same canvases (no extra size)

## Pipeline
Prompt → raw (magenta) → Picasso grid+palette audit → `app/public/assets/` + `art/audit.md` → Scotty wires.
