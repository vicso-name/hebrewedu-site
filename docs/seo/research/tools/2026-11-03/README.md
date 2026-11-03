# Tool demand research — 2026-11-03

Which free web tool do Hebrew learners search for, with confirmed demand and
weak competition? Owner-approved paid research: what was left of the binyanim
run's $1.00 cap ($0.56), spent **$0.50** (`spend.csv`), all YepAPI. Script:
`scripts/seo/tool-demand-research.mjs`. Raw responses are cached by request
hash in `../responses/` (gitignored).

| Step | Endpoint | Result |
|---|---|---|
| Volume + KD for 135 hypotheses in 10 tool groups (us/en) and 24 FR ones | `/v1/seo/keywords/overview` | $0.11 → `overview.json` (130 rows) |
| Ideas: hebrew transliteration, hebrew cursive, hebrew numbers, hebrew keyboard | `/v1/seo/keywords/ideas` | $0.20 → `ideas.json` (200 rows) |
| SERP top 10 for 19 queries (15 us, 4 fr) | `/v1/serp/google` | $0.19 → `serp.json` |

## Demand by group (US, monthly, KD)

| Tool | Head keyword | Volume | KD | SERP top 10 |
|---|---|---:|---:|---|
| Cursive (print → cursive, chart, practice) | hebrew cursive / cursive hebrew / hebrew in cursive | 2,400 | 0–7 | Pinterest, Scribd PDF, Etsy, YouTube, Quizlet, a Bing link, small blogs. **No interactive tool.** |
| | hebrew cursive alphabet (+14 variants, one group) | 1,300 | 0 | YouTube ×2, Quizlet, Scribd, Northwestern, mezzoguild |
| | hebrew cursive handwriting | 720 | 0 | Pinterest, Scribd, integraliah, hebrewworld, YouTube |
| | hebrew cursive font(s) | 260 | 0–6 | |
| | mazel tov / shalom in hebrew cursive, hebrew cursive generator | 170 / 40 / 30 | 0 | Pinterest, Shutterstock, chabad: people want *a word* in cursive |
| Numbers | hebrew numbers = numbers in hebrew (one group) | 6,600 | 15 | YouTube, hebrew4christians, graceintorah, hebrewpod101, stevemorse: articles, no converter |
| | hebrew letters as numbers (+ variants) | 1,000–1,300 | 7–17 | gematria / numerology intent |
| | hebrew numbers 1-10 / 1-100 | 590 / 210 | 0–5 | graceintorah, wikipedia, ivritalk, quizlet, preply |
| Transliteration | hebrew transliteration | 12,100 | 9 | Play app, Quora, prizmah, drmsh tool, itranslate, reddit |
| | english → hebrew transliteration (variants) | 9,900–12,100 | 0–29 | mylanguages converter, emma-learn name tool, translators |
| | hebrew → english transliteration | 2,900 | 7 | prizmah, drmsh, itsbaba |
| | bible / psalm / kaddish transliteration | 2,400 + long tail | 3–22 | interlinear sites |
| Keyboard | hebrew keyboard | 14,800 | 28 | lexilogos, gate2home, branah, hebrewkeyboard.org, openl, itsbaba: **six dedicated tools** |
| | clavier hébreu (FR) | 1,300 | 0 | lilmod, claviervirtuel, lexilogos, openl: crowded |
| Vowels | hebrew vowels / hebrew vowels chart | 2,900 / 590 | 0 | Scribd PDFs, hebrew4christians, quizlet (content intent) |
| Calendar | hebrew date converter / birthday calculator | 6,600 / 2,900 | 27 / 0 | hebcal, chabad ×3, torahcalc (religious, not learners) |
| Small | hebrew pronunciation 1,000; basic hebrew words 390; hebrew pronouns 320; hebrew flashcards 260; hebrew text to speech 260; hebrew reading practice 210 | | 0–4 | |

Caveats: Google Ads groups close variants, so “hebrew transliteration
english” at 74,000 is almost certainly merged with translation queries and is
not counted. `hebrew numbers` mixes counting with gematria intent.
`gematria calculator` (90,500) is numerology, not learners.

## Verdict

1. **Hebrew cursive tool** — best fit. ~4,500/mo across distinct, stable
   queries (head term 1,900–3,600 over 12 months), KD 0, and the top 10 is
   Pinterest, Scribd, Etsy and YouTube: nobody offers an interactive tool.
   Every learner past the alphabet must read and write cursive (ulpan,
   handwritten notes). Pairs with `/blog/why-hebrew-handwriting-looks-…/`
   and `/fr/blog/ecriture-hebraique/`. Font: Gveret Levin (AlefAlefAlef),
   a handwritten Hebrew cursive, SIL OFL 1.1, v2.00 (2025-10-29) released
   for Google Fonts (github.com/AlefAlefAlef/gveret-levin); check its
   nikud coverage before building.
2. **Hebrew number converter** (number → words, masculine/feminine, nikud,
   transliteration, audio, letter numerals) — 6,600 head term, KD 15, SERP
   is articles only. Pairs with `/play/hebrew-numbers-quest/`.
3. **Transliteration** — largest demand, weak SERP, but quality depends on
   vowelizing unpointed text, which a rule-based tool cannot do well.
   Feasible: pointed Hebrew → Latin, and English names → Hebrew.

Not worth it: keyboard (six dedicated tools in EN and FR top 10), date /
birthday converters (hebcal and chabad, religious intent).
