# Verb tool keyword research — 2026-11-03

Owner-approved paid research, cap $1.50, spent **$0.39** (`spend.csv`), all
YepAPI. Script: `scripts/seo/verbs-keyword-research.mjs`. Raw responses are
cached by request hash in `../responses/` (gitignored).

| Step | Endpoint | Result |
|---|---|---|
| Ideas: 4 EN seeds (us/en), 3 FR seeds (fr/fr) | `/v1/seo/keywords/ideas` | $0.28 → `ideas.json` (160 rows, 137 unique); `verbes hébreux` and `binyanim hébreu` returned nothing |
| SERP top 10, 8 EN + 3 FR keywords (`serp-keywords.txt`) | `/v1/serp/google` | $0.11 → `serp.json` |

## Demand (monthly, KD)

**EN, US.** Google Ads groups close variants, so these are three groups, not a sum:

| Group | Volume | KD |
|---|---:|---:|
| hebrew verb conjugation = hebrew conjugation = hebrew verbs = verbs in hebrew (same CPC 3.51) | 720 | 0–5 |
| hebrew verb conjugation chart = hebrew conjugation table = hebrew verbs chart | 260 | 0–2 |
| binyanim (140), hebrew binyanim / binyanim hebrew (110) | 250 | 0–2 |

Long tail: hebrew binyanim chart 40, hebrew verbs list 30, how to conjugate
hebrew verbs 20, binyanim chart 20, per-verb queries (“to be hebrew
conjugation”, “to want …”) 10–50 each, many PDF/biblical variants.

**FR, France.** conjugaison hébreu 140, conjugaison en hébreu 140 (likely the
same group), tableau de conjugaison hébreu 70, tableau conjugaison hébreu 10.

## SERP (top 10 organic; HebrewEdu absent everywhere — page not yet live)

- **hebrew verb conjugation**: pealim #1, reddit, fsi-language-courses (“20
  essential verbs”), YouTube, integraliah (beginner guide), reverso, hebrewpod101,
  itsbaba. Tool + guide intent; positions 3–8 are small sites.
- **hebrew verbs / hebrew conjugation**: mixed — biblical grammar, PDFs, YouTube
  lessons, talkpal, thekefar, pealim.
- **chart / table**: pealim, PDF charts (pbcc), pinterest, Gefen's book, preply,
  quizlet. Printable demand.
- **binyanim / hebrew binyanim**: guides (transparent blog, talkpal, preply,
  itsbaba), an App Store app, a university PDF. Guide intent → the binyanim post.
- **FR conjugaison hébreu / en hébreu**: reverso conjugator #1, beivrit PDF,
  ophrys book, Wikipedia, lilmod verb list, hebreu.mobi (app). Tool intent.
- **FR tableau de conjugaison hébreu**: wikiversity (biblical), scribd PDFs,
  courshebreu, etsy worksheets.

## Decisions

- `/learn/hebrew-verbs/`: primary **hebrew verb conjugation** (720), chart/table
  group as secondary. Title “Hebrew Verb Conjugation Chart: 7 Binyanim and 21
  Verbs” covers both groups; a “How Hebrew verb conjugation works” section and a
  “How do you conjugate a Hebrew verb?” FAQ answer the guide half of the SERP.
- FR tool moved to **`/fr/apprendre/conjugaison-hebreu/`** (owner decision) with
  primary **conjugaison hébreu**; `/fr/blog/conjugaison-hebreu/` retitled to the
  app verb directory (“Répertoire de verbes hébreux…”) so the two stop competing.
- `binyanim` / `hebrew binyanim` (250) mapped to `/blog/hebrew-binyanim-explained/`,
  whose title already says “Hebrew Binyanim”.

## Not done (ideas)

- A printable PDF chart: “… chart pdf” / “… table pdf” queries (40–50 each) and
  PDFs ranking in every chart SERP.
- Per-verb pages (“to be hebrew conjugation” 50, to want/drink/live/go/come/read
  10 each) — only worth it for free verbs, and would need their own design.
- ~~The EN binyanim post's primary is still `hebrew grammar for beginners`~~ —
  done 2026-11-03, `binyanim` is now its primary (`../../binyanim/2026-11-03/`).
