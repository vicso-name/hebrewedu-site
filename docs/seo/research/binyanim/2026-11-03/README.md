# Binyanim post keyword research — 2026-11-03

Owner-approved paid research, cap $1.00, spent **$0.44** (`spend.csv`), all
YepAPI. Script: `scripts/seo/binyanim-keyword-research.mjs`. Raw responses are
cached by request hash in `../responses/` (gitignored). Builds on
`docs/seo/research/verbs/2026-11-03/`, which already had `binyanim` (140) and
`hebrew binyanim` (110) with their SERPs.

| Step | Endpoint | Result |
|---|---|---|
| Ideas: 7 EN seeds (us/en), 2 FR seeds (fr/fr) | `/v1/seo/keywords/ideas` | $0.39 → `ideas.json` (189 rows) |
| SERP top 10: nifal, hitpael, hifil hebrew, hebrew word roots (us), binyanim (fr) | `/v1/serp/google` | $0.05 → `serp.json` |

## Demand (US, monthly, KD)

| Keyword | Volume | KD | Note |
|---|---:|---:|---|
| binyanim | 140 | 2 | guide intent (verbs research SERP) |
| hebrew binyanim = binyanim hebrew = binyanim in hebrew = hebrew verbs binyanim | 110 | 0 | one group |
| nifal | 70 | 22 | |
| hitpael | 40 | 0 | |
| hifil hebrew / hifil | 30 / 30 | 0 / 22 | |
| hifil verbs | 20 | 0 | |
| piel verbs hebrew, paal verbs hebrew, hebrew binyanim explained, how to learn the binyanim, hebrew binyanim made easy | 10 each | | |
| **hebrew word roots** = roots in hebrew = roots of hebrew words | **260** | 0 | language intent → root-system post |

Noise: bare `piel` is Spanish (skin, 6,600), bare `paal` is mostly Tamil food,
a baby crib and a surname, `hebrew roots` (720) / `hebrew roots movement`
(1,000) are the religious movement. `hebrew verb patterns` 10.

**FR**: `grammaire hébraïque` 10 (KD 51), `racine hébraïque` 10. No real French
demand beyond what the core already has.

## SERP

- **nifal / hitpael / hifil hebrew**: biblical grammar dominates (Gesenius on
  wikisource, blueletterbible, hebrewsyntax.org, unfoldingWord), plus reddit,
  quizlet, YouTube. Modern Hebrew only from elon.io and hemy-hebrew.com. A
  modern-Hebrew section per binyan, with everyday verbs, is a real gap.
- **hebrew word roots**: rosenhebrewschool, akhlah, wiktionary, UW Jewish
  studies; AI overview and People Also Ask.
- **FR binyanim**: hebrewedu.com already #1, but with `/fr/blog/conjugaison-hebreu/`
  (the verb directory post), not the binyanim post.

## Decisions

- `/blog/hebrew-binyanim-explained/`: primary **binyanim**, secondaries
  hebrew binyanim, the binyan names and the long tail. Title “Hebrew Binyanim
  Explained: The 7 Verb Patterns With Examples”. Added: a definition up front,
  a 7-binyan table whose examples link to the tool's tables, a section per
  remaining binyan (Nif'al, Hif'il, Hitpa'el, Pu'al/Huf'al), a “how to tell
  which binyan” table, and a 5-question FAQ.
- `/fr/blog/binyanim-hebreu/`: same structure, title “Binyanim : les 7
  modèles de verbes hébreux, avec exemples”.
- Chart queries (`hebrew binyanim chart`, `binyanim chart`) stay with
  `/learn/hebrew-verbs/`.
- `/blog/how-the-hebrew-root-system-works/`: primary **hebrew word roots**
  (260, KD 0); `hebrew root system` stays a secondary. Title “Hebrew Word
  Roots: How Shorashim Work, With a Root List”. Added: a definition with
  figures from `src/data/hebrew-verbs.json` (333 verbs, 254 roots, 64 of them
  in 2+ binyanim, 10 four-letter roots), an 18-root list with word families
  (free verbs link to the tool), a four-step root-finding method with worked
  examples, a weak / four-letter roots section, and a 5-question FAQ.
- `/fr/blog/racines-hebraiques/`: same structure, title “Racines
  hébraïques : 18 racines clés et comment les repérer”.
