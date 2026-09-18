# COAST RUN — Playtest

**URL:** `http://localhost:5173/`  
**Date:** 2026-09-17 ~18:40 CT  
**Build:** proto (colored rect player, sand tiles, 2 pits, jump)  
**Session:** ~60s real keyboard (D/A/Right, Space, W)

## GDD checklist

| Check | Result |
|-------|--------|
| Jump height consistent; no floor sink | **PASS** |
| No camera jitter on tile edges | **PASS** (no obvious jitter in session) |
| Collisions not off-by-one | **FAIL** — see BUG-001 |
| Sprites snap to pixel grid | **PASS** (proto rect; sharp NN edges) |
| No console errors; playable FPS | **PASS*** (see note) |
| Pit / enemy / coin / flag behave per GDD | **FAIL** — pits OK; enemy/coin/flag missing |

\*Console: `favicon.ico` 404 only. RAF ~60 FPS during sampling. No on-screen errors.

## Bugs

### BUG-001 — Pit edge straddle / bridge
- **Owner:** Scotty
- **What I did:** Walked across a pit so the 32×32 player overlapped both lip tiles.
- **What happened:** Player stood bridging the gap without falling (pit ≈ player width).
- **Screenshot:** `/workspace/game/art/qa-play-end.png`
- **Expected:** Falling into a 2-tile pit (or clear kill), not resting across both edges.

### BUG-002 — Walking enemy missing
- **Owner:** Scotty
- **What I did:** Ran full stretch looking for the patrol walker.
- **What happened:** No enemy present.
- **Screenshot:** `/workspace/game/art/qa-play-mid.png`
- **Expected:** 1 walking enemy per GDD v1.

### BUG-003 — Coin missing
- **Owner:** Scotty
- **What I did:** Scanned level for collectible.
- **What happened:** No coin.
- **Screenshot:** `/workspace/game/art/qa-play-end.png`
- **Expected:** 1 coin pickup per GDD v1.

### BUG-004 — Flag / win missing
- **Owner:** Scotty
- **What I did:** Ran toward level end.
- **What happened:** No flag; no win state.
- **Screenshot:** `/workspace/game/art/qa-play-end.png`
- **Expected:** Flag touch ends level (v1 win).

## Controls smoke

| Action | Result |
|--------|--------|
| Move L/R (A/D, arrows) | OK |
| Jump Space / W | OK |
| No double-jump | OK |
| Pit fall → respawn at start | OK |

## Screenshots

| Path | Note |
|------|------|
| `/workspace/game/art/qa-spawn.png` | Spawn / floor flush |
| `/workspace/game/art/qa-play-mid.png` | Mid-run near pit |
| `/workspace/game/art/qa-play-pitfall.png` | At pit edge |
| `/workspace/game/art/qa-play-respawn.png` | After pit death respawn |
| `/workspace/game/art/qa-play-end.png` | BUG-001 straddle |

## Verdict

**Proto movement/jump/pits: playable.**  
**GDD v1 acceptance: FAIL** until enemy, coin, flag land and BUG-001 is fixed or pits widened.

## Engineer resolution (Scotty) — 2026-09-17

| Bug | Fix |
|-----|-----|
| BUG-001 | Player arcade body narrowed to 14×28 (centered in 32×32). 2-tile pits no longer straddled. |
| BUG-002 | `proto_enemy` 32×32 patrol between cols 15–20; overlap → respawn. |
| BUG-003 | `proto_coin` 12×12; overlap disables body. |
| BUG-004 | `proto_flag` 16×32 at col 36; overlap → CLEAR. |

Colors from `palette.md` only. Retest: `http://localhost:5173/`

## Retest — 2026-09-17 ~18:55 CT

**URL:** `http://localhost:5173/`  
**Session:** ~60s keyboard retest after Engineer fixes

| Bug | Result | Evidence |
|-----|--------|----------|
| BUG-001 pit straddle | **PASS** | Fell into pit — `/workspace/game/art/qa2-pit-fall.png` |
| BUG-002 enemy contact → respawn | **FAIL** | Enemy visible on patrol, contact→respawn **not confirmed** — `/workspace/game/art/qa2-enemy.png` |
| BUG-003 coin collect | **PASS** | Coin disappeared on collect — `/workspace/game/art/qa2-coin.png` |
| BUG-004 flag → CLEAR | **PASS** | CLEAR on flag touch — `/workspace/game/art/qa2-clear.png` |

Other: no floor sink, no obvious camera jitter, pixel edges crisp, no on-screen errors.

### Open
- **BUG-002** still open — @Scotty: confirm overlap kills/respawns (or document intentional behavior). Owner: Scotty.

**Verdict:** GDD v1 still **FAIL** on enemy contact only. Pit/coin/flag OK.

### Engineer follow-up (BUG-002) — 2026-09-17 ~18:56 CT
Overlap **was** wired (`physics.add.overlap` → respawn). Both bodies were 14px wide, so visual contact often missed.
**Fix:** enemy damage body widened to 28×28; player stays 14×28 for pits. Touch should reliably respawn.
Retest: walk into the dark rect between the pits.
