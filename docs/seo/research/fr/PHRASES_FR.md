# FR Hebrew-phrases page — keyword research

Research for the FR counterpart of `/learn/hebrew-phrases/` (EN primary
intent: "Hebrew phrases for beginners"). YepAPI, location=fr, language=fr.
Spend: see `spend.csv` (this step's rows, 2026-10-19). Cap was $1.00; actual
spend $0.49.

## Recommended primary + secondary head terms

| Keyword | Volume | KD | Why |
|---|---|---|---|
| **phrases en hébreu** (primary) | 30 | 0 | Only query whose top-10 is genuinely competing phrasebook pages (rosenhebrewschool, preply, nemoapps, oulpanlavi, morim, polyglotclub) — intent match, near-zero difficulty. |
| expressions en hébreu (secondary) | 30 | 0 | Same SERP shape (mondly, ivritwithaviv/fr/hebrew-phrases, scribd) — pair it into the title/H1 for coverage. |
| parler hébreu / parler en hébreu (do **not** target as primary) | 70 each | 0–1 | Higher volume but SERP is "learn Hebrew" course content (Duolingo, Preply, acoursdhebreu, Wikipedia) — intent mismatch for a phrasebook page. Fine as incidental internal-link anchor text, not the target. |

**Title** (48 chars, no brand): `Phrases et expressions en hébreu pour débutants`
**H1** (tu register): `Apprends les phrases en hébreu du quotidien`
**Meta** (152 chars, tu): `Apprends les phrases en hébreu essentielles : salutations, politesse, repas, achats et directions, avec transcription phonétique et dialogues.`
**Slug**: `/fr/apprendre/phrases-hebreu/` (matches the existing `/fr/apprendre/alphabet-hebreu/` pattern)

## Card heading format: "Merci" vs "Merci en hébreu"

**Use the bare transliterated/Hebrew term as the heading** (e.g. "Boker tov",
subtitle "Bonjour"), not "Merci en hébreu". Evidence: direct phrase-name
queries dwarf composed "`<mot>` en hébreu" queries — `boker tov` = 2,900/mo,
`toda raba` = 720/mo, vs. every "X en hébreu" composed query topping out at
10/mo. People search the Hebrew term itself (to check meaning/pronunciation),
not "the French word translated into Hebrew." Caveat: `boker tov`'s volume is
partly diluted by an unrelated Paris/Ghent restaurant chain of the same name
(3 of 7 SERP slots) — real learning-intent volume is lower than 2,900 but
still far above the composed-query pattern. `toda raba`'s SERP is clean
(oulpanlavi, pollylingu.al, integraliah, reverso — all learning/dictionary
content).

## Our phrase → best FR query → volume

| Our phrase (id) | Best FR query tested | Volume |
|---|---|---|
| good-morning (boker tov) | **boker tov** | 2,900 |
| thank-you-very-much (toda raba) | **toda raba** | 720 |
| hello / goodbye / thank-you / yes | bonjour / au revoir / merci / oui en hébreu | 10 each |
| good-evening, my-name, your-name, please, excuse-me, no, im-fine, bill-please, how-much, where-bathroom, dont-understand, speak-english | `<phrase> en hébreu` | 0 / no data |
| water/coffee/menu/without-milk/size/pay-by-card/pay-cash/no-thank-you/help-please/repeat-please/more-slowly | — | not tested (budget) |

Takeaway: outside `boker tov` and `toda raba`, none of the composed "X en
hébreu" phrase queries carry real standalone volume in FR — the page's SEO
value rides on the primary/secondary head terms and the two breakout phrase
names, not on 30 individual phrase-level landing hooks.

## Gaps (phrases we don't have)

| Candidate | Volume | Verdict |
|---|---|---|
| je t'aime / bonne année en hébreu | 10 each | Below the ≥50 bar — real but small |
| mazel tov signification | 10 | Below the ≥50 bar (already surfaces inside the `boker tov` SERP) |
| bonne nuit / bon anniversaire / joyeux anniversaire / chana tova signification | 0 / no data | No measurable demand |

**None clear the ≥50-volume threshold** — no case to add any of these to
the EN+FR pages on SEO grounds right now.

## FAQ candidates (from real FR questions seen in SERPs)

1. Comment dit-on bonjour en hébreu ?
2. Que signifie « boker tov » ?
3. Comment dit-on merci en hébreu ? (et la différence avec « toda raba »)
4. Que signifie « mazel tov » ?
5. Comment dit-on « au revoir » en hébreu ?
6. Par où commencer pour apprendre l'hébreu ? (real Reddit r/hebrew question surfaced under "parler hébreu")

## Competitor notes — "phrases en hébreu"

- **preply.com/fr/blog/mots-hebreux-essentiels** — "370 termes essentiels", high-DA blog, the toughest competitor; no audio, no gendered-form handling.
- **nemoapps.com/fr/phrasebooks/hebrew** — "100 phrases essentielles... avec audio" — the only competitor with audio; a real differentiator to match.
- **rosenhebrewschool.com** (listicle), **oulpanlavi.com** (10 expressions), **morim.com/expressions.htm** (thin old-HTML list) — low-effort pages, easy to outrank on content depth.
- **polyglotclub.com** — wiki/community translations with exercises.
- **Gap across all of them**: none handle Hebrew's speaker/addressee gender agreement (our EN page's "male/female" variant pattern) or pair phrases into dialogues — both are differentiators our page already has in EN and should carry into FR.

## Method notes

10 ideas calls ($0.34, 6 seeds returned 0 results) → 1 overview batch of 52
candidates ($0.05, only 12 rows came back — the endpoint silently drops
no-data keywords instead of returning zeros, as already noted in
`FR_RESEARCH.md` for STEP 2) → 10 SERP calls, depth=10, on the top 5
primary-pool + top 5 secondary candidates by volume ($0.10).
