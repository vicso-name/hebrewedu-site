# FR SEO research — STEP 2–3: collect, enrich, analyze, dedupe

Research only. No site pages or `docs/seo/core/*` changed. Raw responses cached
in `responses/` (gitignored); spend logged in `spend.csv`. STEP 3 made no paid
API calls — it only deduped variant spellings, fixed a cluster
misclassification, and ran a free competitor audit via WebFetch.

## Verdict: **PARTIAL — proceed with a scoped FR pilot**

- **Criterion 1** (≥30 keywords, volume ≥50, KD ≤25): **unverified**. 45
  deduped keyword-groups meet this *literally*, but KD is unknown (`0`) for
  38 of those 45 — only **7 groups** have an actually-measured nonzero KD.
  The provider doesn't compute real difficulty for ~97% of this candidate
  set (confirmed via a US/English control call in STEP 1 and at scale here),
  so this criterion can't be honestly called met or failed on KD alone.
- **Criterion 2** (≥5 clusters with weak top-10 SERP results): **met**. 8
  distinct clusters had at least one `weak` SERP verdict in the 40-query
  sample: `alphabet-hub`, `cursive-script`, `symbolism-gematria`,
  `biblical-hebrew`, `printable-reference`, `letter-mem`, `letter-shin`,
  plus one `misc` query (free-learning intent).
- **Decision:** the volume side alone (deduped alphabet-hub ≈ 9,070/mo,
  reading/learning intent ≈ 11,600/mo combined) and the weak-SERP evidence
  justify a **scoped pilot**, not a blanket GO on the full candidate set.

**FR pilot scope:** alphabet hub (retarget existing page), the 22 letter
lessons (keyword/meta touch-up, no new pages), a new printable-PDF page, a
new cursive-script page, and FR-home targeting of "apprendre l'hébreu" as
the broad entry term.

**Deferred** (real demand, but needs separate validation before building):
symbolism/guématria, biblical Hebrew, oulpan/modern Hebrew, kids-intent.
Verify via Google Search Console once the pilot pages are live and indexed,
rather than committing more paid-API spend now.

## KD data-quality caveat (carried from STEP 1, confirmed at scale)

`/v1/seo/keywords/overview` returned `difficulty: 0` for **284/291** FR
candidates (incl. every head term — "alphabet hébreu" 6,600/mo still shows
`kd=0`), vs. real nonzero values on a US/English control call in STEP 1.
Treat `kd=0` as **"not computed for this market/term"**, not "zero
competition" — this dataset leans on the SERP sample (Phase 3) for actual
competitiveness, not the KD field. Only 7 keywords in the whole candidate set
have a trustworthy KD value.

## Collection summary

- Phase 1 (ideas expansion): 12 seed calls → 271 raw rows → 260 unique → 246
  "clean" (junk ratio **0.4%**: one query, "oulpan lavi avis"). A 13-row
  symbolism/esoteric slice (guématria, tarot, "pouvoir des lettres") was kept
  and flagged per volume ≥200 rule (guématria alone = 390/mo).
  Two seeds ("hébreu pour enfants", "voyelles hébraïques") returned **0**
  ideas — see Open questions.
- Phase 2 (overview): 313 candidates submitted (clean ideas + step-1 seeds +
  accent/spelling variants + 48 letter-name variants + kids + vowels) → 291
  returned rows in 4 batches. 22 candidates returned nothing at all
  (including both Zayin and Tsadi spellings, and all three kids-phrase
  variants beyond "jeux pour apprendre l'hébreu") — provider has no
  recognized volume for those exact strings.
- Phase 3 (SERP): 40 queries (top-opportunity list + the 2 required head
  terms), depth 10. Verdict mix: 14 strong, 13 moderate, 13 weak (heuristic:
  weak = top-10 majority thin sources — Scribd document dumps, YouTube,
  Reddit, Pinterest, Amazon, dictionaries; strong = ≥2 dedicated Hebrew-
  learning competitors in top 10).

## Dedup methodology (STEP 3)

`keywords-fr.csv` gained a `variant_group` column. Rows with volume ≥50 were
union-found into one group when two keywords share identical volume *and*
their 12-month trend arrays agree on every overlapping month (≥8 months
overlap, to avoid false merges). Below vol 50 the trend field is too coarse
(many unrelated low-volume keywords collide on an identical rounded trend
shape) to merge safely, so those stay singleton groups. This found 5 real
variant clusters, the largest being `alphabet hebreu` / `alphabet hébreu` /
`alphabet hébraïque` / `hébreu alphabet` (all 6,600/mo — one search concept,
four spellings). Cluster totals below count each `variant_group` once.

Also fixed: rows matching "signification" / "valeur numérique" were moved
out of `alphabet-hub` into `symbolism-gematria` — they're meaning/numerology
queries, not plain alphabet-learning queries, and were previously inflating
the hub's volume and diluting its intent profile.

## Cluster table (deduped volume, median known-KD, mapped page)

| Cluster | n rows | n groups | Total vol/mo (deduped) | Median KD (known only) | Mapped page |
|---|---|---|---|---|---|
| alphabet-hub | 58 | 53 | **9,070** | 46 (12/58 known) | alphabet hub |
| oulpan-modern | 52 | 52 | 1,640 | 52 (8/52) | none (off-mission) |
| misc (incl. "apprendre l'hébreu") | 37 | 37 | 1,790 | 44 (9/37) | none — see open Q |
| symbolism-gematria | 20 | 20 | 1,470 | 51 (6/20) | new: Signification et guématria des lettres hébraïques |
| biblical-hebrew | 47 | 46 | 960 | 46 (6/47) | none (open Q) |
| printable-reference | 26 | 26 | 930 | 52 (7/26) | new: Alphabet hébreu à imprimer (PDF) |
| cursive-script | 5 | 4 | 470 | 52 (1/5) | new: Écriture cursive hébraïque |
| app | 5 | 5 | 100 | — (0/5) | app |
| translation-tool | 4 | 4 | 60 | 10 (1/4) | none (dictionary intent, off-mission) |
| reading-nikoud | 2 | 2 | 30 | 17 (1/2) | new: Lire l'hébreu avec les voyelles |
| kids | 1 | 1 | 0 | — | games (weak signal — see open Q) |
| 22 × letter-\<name\> | 1–3 each | — | see per-letter table below | mostly unknown | lesson:\<Letter\> |

`alphabet-hub` dropped from a (wrong) 29,800 to **9,070** once variant
spellings were merged and symbolism rows were removed — the previous figure
quadruple-counted the head term and mixed in off-intent volume.

## Top opportunities (volume ÷ max(KD,1), one row per variant_group) — top 15 of 30, see CSV for rest

| keyword | vol | KD | intent | cluster | SERP |
|---|---|---|---|---|---|
| alphabet hébreu (4 spellings merged) | 6,600 | 0 | informational | alphabet-hub | strong/moderate |
| apprendre l'hébreu | 720 | 0 | informational | misc | strong |
| écriture hébraïque | 720 | 0 | informational | alphabet-hub | strong |
| alphabet hébreu cursif (incl. cursive) | 390 | 0 | informational | cursive-script | strong/weak |
| guématria | 390 | 0 | informational | symbolism-gematria | **weak** |
| lettres hébraïques | 390 | 0 | informational | alphabet-hub | moderate |
| oulpan lavi | 390 | 0 | informational | oulpan-modern | moderate |
| alphabet hébreu français (incl. hyphenated) | 320 | 0 | informational | alphabet-hub | moderate/strong |
| apprendre l'hébreu gratuitement | 260 | 1 | transactional | misc | moderate |
| les 22 lettres hébraïques pdf | 260 | 0 | informational | printable-reference | strong |
| les 22 lettres hébraïques signification | 260 | 0 | informational | symbolism-gematria | moderate |
| oulpan | 260 | 0 | informational | oulpan-modern | moderate |
| apprendre l'hébreu gratuit | 210 | 1 | transactional | misc | **weak** |
| guérir avec les lettres hébraïques pdf | 170 | 0 | informational | symbolism-gematria | **weak** |
| hébreu biblique | 140 | 2 | informational | biblical-hebrew | moderate |

Full ranked list, one row per keyword (291 rows, 284 variant groups), with
all remaining top-30 entries: `keywords-fr.csv`.

## Per-letter table (best FR keyword, volume, preferred spelling)

| Letter (preferred FR spelling) | Best keyword | Vol/mo |
|---|---|---|
| Mem | lettre hébraïque mem | 90 |
| Shin | shin hébreu | 70 |
| Tav | tav hébreu | 50 |
| Yod | yod hébreu | 50 |
| Aleph (not Alef) | aleph hébreu | 40 |
| Beth (not Bet) | beth hébreu | 30 |
| Vav | vav hébreu | 30 |
| Hé | lettre hébraïque hé | 20 |
| Ayin | ayin hébreu | 10 |
| Daleth | lettre hébraïque daleth | 10 |
| Lamed | lettre hébraïque lamed | 10 |
| Noun | lettre hébraïque noun | 10 |
| Guimel (not Gimel) | gimel hébreu | 0 |
| Heth (not Het) | heth hébreu | 0 |
| Kaf | kaf hébreu | 0 |
| Pé | lettre hébraïque pé | 0 |
| Qof | lettre hébraïque qof | 0 |
| Resh | lettre hébraïque resh | 0 |
| Samekh | lettre hébraïque samekh | 0 |
| Teth | lettre hébraïque teth | 0 |
| Zayin | *no data* — provider returned no row for either spelling | — |
| Tsadi | *no data* — provider returned no row for either spelling | — |

Individually, letters carry little standalone volume — their SEO value is
almost entirely the alphabet-hub umbrella term, not letter-name search.
Keep the 22 lesson pages for UX/pedagogy, but don't expect them to rank on
`<letter> hébreu` alone.

## Competitor overview — "alphabet hébreu" (and variant spellings)

Organic top 8, consistent across "alphabet hebreu" / "alphabet hébreu" /
"hébreu alphabet": **fr.wikipedia.org** (reference, not a learning tool) ·
**preply.com** (tutoring marketplace blog post) · **unige.ch** (academic
PDF, static/dated) · **essentiels.bnf.fr** (national-library cultural
article, strong authority, not a lesson funnel) · **lilmod-aleph-beth.fr**
(direct competitor — dedicated French Hebrew-alphabet learning site) ·
**rcf.fr** (Catholic radio site, tangential) · **oulpanlavi.com** (oulpan
platform blog) · **fr.vikidia.org** (kids' wiki).

What they lack: no result in the top 8 is a structured, interactive,
per-letter lesson course — it's reference articles, one PDF, and blog posts.
Across the wider 40-query SERP sample, **fr.scribd.com** (22 appearances)
and **youtube.com** (20) are the most common thin/low-intent-match results —
document dumps and videos, not dedicated written lessons — which is the
main evidence behind the "weak top-10" clusters above.

### Competitor audit: lilmod-aleph-beth.fr (free, via WebFetch)

**Structure:** one long single-page article, not per-letter pages — covers
all 22 letters + 5 final (*sofit*) forms in one scrolling page with a
comparison table (name, phonetic transcription, numerical value), linking
to separate articles for vowels, cursive writing, and reading practice.

**Interactivity:** none — no quizzes, flashcards, or writing practice.
Three embedded YouTube videos substitute for interactivity.

**Audio:** none detected — no pronunciation clips.

**Pricing/paywall:** free content, one affiliate book link on Amazon. No
login, no paid tier for the web content.

**Broader site:** full French-Hebrew curriculum beyond the alphabet —
reading (incl. biblical texts), grammar, verb conjugation (7 binyanim),
vocabulary, an online Hebrew keyboard tool. A comprehensive free course,
not just an alphabet guide.

**Our edge:** interactive practice/quizzes and discrete per-letter lessons
— lilmod has neither. We have no audio either (gap to close before
claiming that edge). Their topical breadth beyond the alphabet exceeds our
scope, so expect them to keep ranking for "apprendre l'hébreu" broadly;
our differentiation is depth and interactivity on the alphabet
specifically, not language-course breadth.

## Proposed FR page list — pilot scope

| Page | Primary keyword | Title draft (≤60 chars, no brand) | Slug |
|---|---|---|---|
| Alphabet hub (existing — retarget copy) | alphabet hébreu | Alphabet hébreu : les 22 lettres expliquées | /alphabet-hebreu |
| FR home (existing — target broad entry term, no new page) | apprendre l'hébreu | (existing home title, confirm it covers this term) | / |
| New: cursive script | alphabet hébreu cursif | L'alphabet hébreu cursif, lettre par lettre | /alphabet-hebreu/cursif |
| New: printable chart | les 22 lettres hébraïques pdf | Alphabet hébreu à imprimer, PDF gratuit | /alphabet-hebreu/pdf-a-imprimer |
| 22 existing letter lessons (keyword/meta touch-up only, no new pages) | \<letter\> hébreu | (no title change needed — low standalone volume) | — |

**Deferred, not in this pilot:** symbolism/guématria (new page idea stays
on file — "Signification et guématria des lettres hébraïques" — but needs
GSC-verified demand first), biblical Hebrew, oulpan/modern Hebrew, kids
pages. Printable/PDF and cursive-script are the two clearest net-new page
opportunities already in scope: real demand (930 + 470 vol/mo respectively)
the alphabet hub doesn't address, weak-to-moderate competition.

## Intent notes

- **Reading/learning** (alphabet-hub, cursive-script, printable-reference,
  reading-nikoud, app): core mission-aligned demand, ~10,600 vol/mo
  combined (deduped), mostly informational, light competition per SERP.
- **Symbolism/numerology** (guématria, tarot, "signification",
  "valeur numérique", "guérir avec les lettres"): distinct, sizeable
  (~1,470 vol/mo after reclassifying the "signification"/numeric-value
  rows out of alphabet-hub) but off-mission-adjacent — flagged per the
  ≥200-volume rule, **deferred** pending GSC validation.
- **Printable/download** ("pdf", "imprimer", "télécharger"): a real,
  separate behavioral cluster (930 vol/mo) — these searchers want an
  artifact, not a lesson page. **In pilot scope.**
- **Biblical Hebrew** (960 vol/mo, 47 keywords) and **oulpan/modern Hebrew**
  (1,640 vol/mo, 52 keywords) are adjacent-but-different products (full
  language courses / religious-text study) — **deferred**, not actioned.

## Open questions

1. **"apprendre l'hébreu"** (720 vol/mo, informational, strong competitors)
   is broader than "learn the alphabet" — resolved for the pilot as a FR-home
   targeting decision rather than a new page; revisit if GSC shows it's
   better served by a dedicated landing page.
2. **Kids-intent looks like a provider data gap, not zero demand.**
   "hébreu pour enfants", "apprendre l'hébreu aux enfants", "hébreu bar
   mitsva" and the STEP-1 seed "alphabet hébreu pour enfants" all returned
   zero rows/volume — unlikely given real-world bar/bat-mitzvah-prep
   demand in France. Deferred; verify via GSC or a second provider before
   prioritizing.
3. **Zayin and Tsadi** returned no data at all (any spelling) — can't
   confirm or deny standalone search volume for these two letters.
4. KD is unreliable for ~97% of candidates (see caveat) — lean on SERP
   verdicts in `keywords-fr.csv`, not the `kd` column, for prioritization.
   Re-check via GSC once the pilot pages are indexed.

## Spend

STEP 2: $1.21 (12 ideas calls $0.60, 4 overview batches $0.2139, 40 SERP
calls $0.40). STEP 3 made **zero** paid API calls (dedup + free WebFetch
audit only). Combined cumulative (STEP 1+2+3): **$1.44** of the $3.00
STEP-2 cap. Full ledger in `spend.csv`.
