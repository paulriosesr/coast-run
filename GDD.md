# COAST RUN — Game Design Document (v1)

## Pitch
A short browser pixel side-scroller. Run the coast, clear pits, dodge one walker, grab a coin, reach the flag.

## Tech
- Phaser 3 + TypeScript
- Integer pixel camera, nearest-neighbor only, no anti-aliasing
- Arcade physics
- Tilemap from JSON; sprites from packed sheets in `/game/app/public/assets/`
- Ship target: GitHub Pages or Cloudflare Pages

## Locked sizes
| Element | Size |
|---------|------|
| Tile | 16×16 |
| Player canvas | 32×32 |
| Enemy canvas | 32×32 |
| Pixel grid | integer only |

## Controls
See `controls.md`. Arrows / WASD + Space.

## v1 Level (single screen stretch)
- Flat ground (16×16 tiles)
- 2 pits (kill / fall reset)
- 1 walking enemy (patrols a short span)
- 1 coin (collect once)
- 1 flag (win / end)

## Player
- Move left/right, jump
- Dies on pit fall or enemy contact
- Respawn at start on death
- Win on flag touch — **v1 win = reach flag** (coin is score/optional pickup)

## Camera
- Follow player on X, integer snap
- No sub-pixel camera positions

## Art pipeline
- Palette: `palette.md` only (user approves before sprite gen)
- Magenta `#FF00FF` on every raw frame (chroma key)
- Picasso owns style-guide, prompts, sheets; Scotty never invents art sizes/colors

## Out of scope for v1
- Multiple levels, HUD polish, sound, power-ups, flying enemies, slopes

## Acceptance (QA checklist)
- [ ] Jump height feels consistent; no floor sink
- [ ] No camera jitter on tile edges
- [ ] Collisions not off-by-one
- [ ] Sprites snap to pixel grid
- [ ] No console errors; playable FPS
- [ ] Pit / enemy / coin / flag all behave as above
