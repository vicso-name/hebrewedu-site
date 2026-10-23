# Games keyword research — 2026-10-23

Owner-approved paid research, cap $1.00, spent **$0.09** (`spend.csv`).
Script: `scripts/seo/games-keyword-research.mjs`. Raw responses are cached by
request hash in `../responses/` (gitignored).

## What ran

| Step | Endpoint | Result |
|---|---|---|
| Volume, 45 keywords, US/en | Google Ads Search Volume (live) | done, $0.09 → `volume.json` |
| Suggestions for `hebrew game`, `hebrew games`, `aleph bet game` | DataForSEO Labs keyword suggestions | **not run**: 40200 Payment Required, account balance below zero after the volume call ($0, not cached) |
| SERP top 10 by volume | SERP organic live advanced | **not run**: same balance |

To finish: top up DataForSEO, then `node scripts/seo/games-keyword-research.mjs suggest`
and `... serp`. The volume call is cached and will not be paid again.

## Volumes (US/en, monthly)

| Volume | Keyword | Mapped to |
|---:|---|---|
| 390 | hebrew wordle | ideas backlog |
| 320 | hebrew games | `/play/` (new cluster primary) |
| 320 | hebrew game | `/play/` |
| 260 | hebrew flashcards | ideas backlog (HIGH competition) |
| 210 | hebrew reading practice | ideas backlog (not a game query) |
| 170 | nikud | nikud guide |
| 170 | hebrew crossword | ideas backlog |
| 90 | hebrew word search | Word Search (new cluster primary) |
| 70 | hebrew alphabet game / games | Alef Bet Rush |
| 70 | hebrew letters game / letter games | Hebrew Mahjong |
| 50 | aleph bet games / alef bet game | `/play/` |
| 40 | hebrew games online | `/play/` |
| 40 | hebrew quiz | Alef Bet Rush |
| 30 | letter hey in hebrew | He lesson |
| 30 | hebrew learning games / learn hebrew games | `/play/` |
| 20 | free hebrew games | `/play/` |
| 10 | free hebrew games online, hebrew hangman, memory, matching, bingo, typing game, vocabulary quiz, puzzle, word search printable | various |
| — | hebrew spelling game, word scramble, word builder, word game(s), mahjong, vocabulary game, nikud game, vowels game, reading game, games for adults/kids, numbers/colors game | no data (<10/mo) |

## Findings

- `/play/` was targeting `hebrew alphabet games online` (10/mo). The real head
  terms are `hebrew games` + `hebrew game` (640/mo combined), and GSC already
  shows `/play/` winning clicks on them. Its title/H1 should target them.
- Word Search's primary was `hebrew vocabulary game` (no volume);
  `hebrew word search` has 90/mo and is now its primary.
- Word Builder's own queries have no measurable volume: it will earn traffic
  through `/play/` and the `hebrew games` head terms, not by name.
- Biggest game-shaped demand with no page: `hebrew wordle` (390),
  `hebrew crossword` (170). Wordle is a specific trademarked game, so a page
  for that query needs an original daily-word mechanic, not a copy.
