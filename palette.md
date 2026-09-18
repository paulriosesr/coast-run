# COAST RUN — Palette (12 colors)

**Status:** approved by user — Picasso may prompt; no new hex values.
**Rule:** use only these hex values (plus chroma key `#FF00FF` on raw frames, never in final sheets).

| Hex | Role |
|-----|------|
| `#0B1E2D` | Deep sea / night sky background |
| `#1A6B8A` | Ocean mid / water fill |
| `#4EC3D9` | Sky / shallow water highlight |
| `#F4E2C0` | Sand / light ground |
| `#C4A574` | Sand shadow / dune mid |
| `#5C7A3A` | Coastal scrub / grass |
| `#2F4A28` | Scrub shadow / dark foliage |
| `#E8F0F5` | Foam / cloud / white accent |
| `#D94F3D` | Player primary / flag cloth |
| `#F2C14E` | Coin / warm accent |
| `#3A3A48` | Outline / rock / enemy body |
| `#8B9BB4` | Metal / UI secondary / wet rock |

## Notes
- Prefer `#3A3A48` for 1px outlines on characters.
- Player silhouette: `#D94F3D` fill + outline; keep readable at 32×32.
- Ground tiles: sand pair `#F4E2C0` / `#C4A574` with scrub accents.
- Magenta `#FF00FF` is pipeline-only (raw frame background), not a gameplay color.
