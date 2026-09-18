# COAST RUN — Asset List

Sources of truth: sizes locked; colors from `palette.md` only.

## Status legend
`needed` · `prompted` · `audited` · `in-game`

## Player (32×32)
| ID | Name | Frames | Facing | Foot line | Status | Notes |
|----|------|--------|--------|-----------|--------|-------|
| `player_idle` | Player idle | 2 | right | 31 | prompted | `art/prompts/player-idle.md` |
| `player_walk` | Player walk | 4 | right + flip | 31 | prompted | `art/prompts/player-walk.md` |
| `player_jump` | Player jump | later | — | — | deferred | After idle+walk audited |

## Enemy (32×32)
| ID | Name | Frames | Status | Notes |
|----|------|--------|--------|-------|
| `enemy_walk` | Walking enemy | later | deferred | After player idle+walk audited |

## Tiles (16×16)
| ID | Name | Status | Notes |
|----|------|--------|-------|
| `tile_ground` | Ground / sand top | deferred | Engineer uses solid colored rects until art ready |
| `tile_ground_fill` | Ground fill | deferred | |
| `tile_pit` | Pit / empty | n/a | collision hole, may be no sprite |

## Pickups / props
| ID | Name | Size | Status | Notes |
|----|------|------|--------|-------|
| `coin` | Coin | TBD ≤16×16 or 16×16 | deferred | After player art |
| `flag` | Goal flag | TBD | deferred | After player art |

## Code placeholders (Engineer only, pre-art)
| ID | Description |
|----|-------------|
| `proto_player` | Colored rectangle 32×32 using palette player primary |
| `proto_enemy` | Colored rectangle 32×32 using outline/enemy body |
| `proto_tile` | 16×16 filled with sand colors |
| `proto_coin` | Small rect / circle approx with coin yellow |
| `proto_flag` | Thin rect with flag red |

## Sheets (dest)
Finished audited sheets → `/game/app/public/assets/` and logged in `/game/art/audit.md` (Picasso).
