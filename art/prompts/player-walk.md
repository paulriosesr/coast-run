# Prompt sheet — player_walk

**Status:** prompted (not finished art)  
**ID:** `player_walk`  
**Canvas:** 32×32 px per frame  
**Frames:** 4  
**Facing:** right (Engineer flips for left)  
**Foot-contact line:** Y=31  
**Background:** solid magenta `#FF00FF`  
**Colors allowed:** same as idle — palette.md only; primary `#D94F3D`, outline `#3A3A48`

## Character
Same silhouette and proportions as `player_idle`. Do not redesign. Walk cycle for a side-scroller: clear leg contact, readable stride at 32×32.

## Frame notes (classic 4-frame cycle)
| Frame | Pose |
|-------|------|
| 0 | Contact — front foot down, rear foot lifting |
| 1 | Passing — legs cross / mid stride |
| 2 | Contact opposite — other foot plant |
| 3 | Passing opposite — return toward frame 0 |

Keep torso height stable (±1–2 px). Feet touch Y=31 on contact frames. Same outfit/outline as idle.

## Generation prompt (paste)

```
Pixel art sprite sheet, exactly 4 frames in a horizontal strip, each frame exactly 32 by 32 pixels.
Same coastal runner character as the idle sheet: facing right, 1px outline #3A3A48, fill #D94F3D, accents only from #F2C14E #E8F0F5 #8B9BB4 if needed.
Walk cycle: frame0 right-foot plant, frame1 mid-pass, frame2 left-foot plant, frame3 mid-pass back. Clear leg motion, stable torso, feet on bottom edge on plant frames.
Solid flat magenta background #FF00FF in every frame.
True pixel art, 1:1 pixels, nearest-neighbor, no anti-aliasing, no blur, no gradients, no drop shadows, no glow.
Only palette hex colors plus #FF00FF. Match idle proportions exactly.
```

## Deliverable
Raw PNG: 128×32 (4×32) or four 32×32 files. Magenta pure `#FF00FF`. Picasso audits before Engineer wires.
