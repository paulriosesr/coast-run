# Prompt sheet — player_idle

**Status:** prompted (not finished art)  
**ID:** `player_idle`  
**Canvas:** 32×32 px per frame  
**Frames:** 2  
**Facing:** right  
**Foot-contact line:** Y=31 (bottom pixel row stands on ground)  
**Background:** solid magenta `#FF00FF` (chroma key — must be exact, no dither into it)  
**Colors allowed:** only from `/workspace/game/palette.md`  
  Primary fill `#D94F3D`, outline `#3A3A48`, optional small accents `#F2C14E` / `#E8F0F5` / `#8B9BB4` if needed for readability. No other hex.

## Character
Coastal runner silhouette, readable at 32×32. Compact body, clear head, arms at sides. Soft red jersey / shorts vibe using player primary. 1px dark outline. Idle = almost still: tiny breath or weight shift between frames — not a dance.

## Frame notes
| Frame | Pose |
|-------|------|
| 0 | Neutral stand, weight even, facing right |
| 1 | Same pose, 1–2 px vertical bob or shoulder settle (keep feet planted on Y=31) |

## Generation prompt (paste)

```
Pixel art sprite sheet, exactly 2 frames side by side, each frame exactly 32 by 32 pixels.
Character: small coastal side-scroller runner facing right, solid 1px outline #3A3A48, fill #D94F3D, optional tiny accents only from palette #F2C14E #E8F0F5 #8B9BB4.
Idle animation: frame 0 neutral stand, frame 1 subtle breathe/bob, feet glued to bottom edge.
Solid flat magenta background #FF00FF behind and around the character in every frame.
True pixel art, 1:1 pixels, nearest-neighbor, no anti-aliasing, no blur, no gradients, no drop shadows, no glow.
Only these hex colors plus #FF00FF background. No other colors.
```

## Deliverable
Raw PNG: 64×32 (2×32 side by side) or two 32×32 files. Magenta must be pure `#FF00FF`. Hand to Picasso for grid + palette audit before packing.
