# BLOOD NEON: LAST WATCH — GDD (Level 1 slice)

**Status:** active. COAST RUN shelved → `/workspace/game/archive/coast-run/`.
**Scope:** Playable vertical slice through Level 1 only. No Levels 2–8 content.

## Pitch
Fast pixel side-scrolling beat ’em up. Couch 1–4 local co-op (solo = AI partners or empty slots). Arcade-pulp neon rain, rust, blood. Snappy: dash, dash-cancel into attack, short hop, juggle, team tag finisher.

## Stack
Extend existing Phaser 3 + TypeScript template under `/workspace/game/app/`. Do not rip architecture.

## World (locked)
~2147. Helix Dynamics fused vampire plague + lunar lycanthropy. Last major Sunzone: Haven. UV grid dying. Broadcast: “Final Harvest” / Eclipse Engine. Playable hunters: the Last Watch.

## Hunters (all four in code + select)
| ID | Name | Kit | Overdrive |
|----|------|-----|-----------|
| `rex` | Rex “Bulwark” Harlan | Heavy hammer, armor-break, wide arcs | Exo-frame slam |
| `nova` | Nova “Flicker” Solano | Dual batons, dash-cancel, air strings | Afterimage clones |
| `silas` | Silas “Fang” Moreau | Claws, lunges, juggles; chip if OD held | Partial wolf form |
| `vesper` | Vesper “Crimson” Vale | Blood-lances, drain heal on hit | Crimson Veil HP steal dash |

Distinct color silhouettes; frames: idle / walk / dash / attack / hurt / ko + OD visual change.

## Co-op (slice)
- Shared camera; soft pull / off-screen arrow if lagging
- Revive: stand near downed + hold interact
- Team finisher: 2+ players hit same elite/boss in window → canned smash + bonus dmg
- Overdrive meter: combos + Essence canisters

## Story (implement now)
1. Cold open (10–20s, skippable) → title
2. Pre-L1 briefing + 4 portraits
3. In-level barks (Rex / Nova / Silas / Vesper — see Paul brief)
4. Clear: Broker drops Helix data-spike → epilogue countdown + Vein Markets pin → “LEVEL 2 LOCKED — SLICE COMPLETE”

## Level 1 — Haven’s Edge
Flow: tutorial alley → wave street → barricade hold (elite) → checkpoint PA → Broker plaza → boss.

### Enemies (L1 only)
- Ghoul, Street vampire, Scout wolf (2–3 packs)
- Elite: Barricade Captain (shield; Rex breaks faster)
- Boss: Pale Broker — P1 cane/blade + ghouls; P2 (50%) faster dashes, blood-mist chip, UV blackouts

## Systems
Title / 4-portrait select · 1–4 local (kb + pad) · HP / OD / lives-continue / combo · smashables · pause / retry / return to select

## Art tone
Dark void, neon magenta/cyan, rust, wet asphalt, sickly UV white. Readable at couch distance.

## Acceptance (QA)
- [ ] Any of 4 hunters finish L1 solo
- [ ] 2–4 join, share stage, revive, kill Broker
- [ ] Overdrive per kit with visible change (not just damage mult)
- [ ] Open, briefing, Broker PA, data-spike ending in
- [ ] Nothing past L1 playable except Vein Markets lock tease

## Build order
data (chars, enemies, level script) → controllers → L1 encounters → boss → UI/story → juice (hit-stop, afterimage, canister burst)

## Out of scope
L2–8 stages · lore novels · walking sim · new engine structure
