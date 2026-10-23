# Games keyword research — 2026-10-23

Owner-approved paid research, cap $1.00, spent **$0.33** (`spend.csv`): $0.09
DataForSEO + $0.24 YepAPI.
Script: `scripts/seo/games-keyword-research.mjs`. Raw responses are cached by
request hash in `../responses/` (gitignored).

## What ran

| Step | Endpoint | Result |
|---|---|---|
| Volume, 45 keywords, US/en | Google Ads Search Volume (live) | done, $0.09 → `volume.json` |
| Suggestions for `hebrew game`, `hebrew games`, `aleph bet game` | DataForSEO Labs keyword suggestions | failed: 40200 Payment Required, DataForSEO balance below zero after the volume call ($0, not cached) |
| Ideas for the same 3 seeds | YepAPI `/v1/seo/keywords/ideas` | done, $0.14 → `ideas.json` (93 unique) |
| SERP top 10 by volume (US/en) | YepAPI `/v1/serp/google` | done, $0.10 → `serp.json` |

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

## Ideas expansion (YepAPI)

New game queries with volume, KD 0–8 unless noted: `hebrew language games`
(320), `hebrew board games` (210, physical board games), `online hebrew games` /
`hebrew online games` / `learning hebrew games` / `hebrew language learning
games` (40 each), `learn hebrew game` (30), several alphabet variants (20).
`game in hebrew` / `games in hebrew` (320) are translation queries, not game
searches, and are left out of the core.

## SERP (YepAPI, US/en, top 10 organic)

- `hebrew games`: HebrewEdu **#9**; `hebrew alphabet games`: **#8**. Everything
  else: not in the top 10.
- `hebrew games` / `hebrew game` top 10: small learning sites (learnhebrewforchristians,
  hebrewbasics, hebrewhelps), YouTube, Pinterest, TpT, Sporcle. Beatable.
- `hebrew wordle`: the whole top 10 is wordle.global in Hebrew. These searchers
  are Hebrew speakers who want Wordle itself, not learners: low fit, deprioritised.
- `hebrew word search`, `hebrew crossword`: mostly printables (PDF) and worksheet
  sites; few browser games.

## Changes made from this research

- `/play/` retargeted to `hebrew games`: title "Free Hebrew Games Online: Learn
  Hebrew by Playing", H1 "Free Hebrew Games for Beginners", new description and
  lead covering all four games, links to Word Search and Word Builder.
