# FR SEO research — STEP 2: collect, enrich, analyze

Research only. No site pages or `docs/seo/core/*` changed. Raw responses cached
in `responses/` (gitignored); spend logged in `spend.csv`.

## GO / NO-GO verdict: **GO**

- **Criterion 1** (≥30 keywords, volume ≥50 and KD ≤25): **52 keywords** meet
  this literally. Caveat: KD is `0` ("unknown", see below) for 45 of those 52
  — only **7** have an actually-measured nonzero KD ≤25. The volume side of
  the criterion is solid regardless (head cluster alone carries ~30k/mo).
- **Criterion 2** (≥5 clusters with weak top-10 SERP results): **8 distinct
  clusters** had at least one `weak` SERP verdict in the 40-query sample:
  `alphabet-hub`, `cursive-script`, `symbolism-gematria`, `biblical-hebrew`,
  `printable-reference`, `letter-mem`, `letter-shin`, plus one `misc` query
  (free-learning intent). Clears the threshold comfortably.

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

## Cluster table (total volume, median known-KD, mapped page)

| Cluster | n | Total vol/mo | Median KD (known only) | Mapped page |
|---|---|---|---|---|
| alphabet-hub | 67 | 29,800 | 46 (12/67 known) | alphabet hub |
| misc (incl. "apprendre l'hébreu") | 37 | 1,790 | 44 (9/37) | none — see open Q |
| oulpan-modern | 52 | 1,640 | 52 (8/52) | none (off-mission) |
| biblical-hebrew | 47 | 1,030 | 46 (6/47) | none (open Q) |
| printable-reference | 26 | 930 | 52 (7/26) | new: Alphabet hébreu à imprimer (PDF) |
| symbolism-gematria | 11 | 910 | 52 (4/11) | new: Signification et guématria |
| cursive-script | 5 | 860 | 52 (1/5) | new: Écriture cursive hébraïque |
| app | 5 | 100 | — (0/5) | app |
| translation-tool | 4 | 60 | 10 (1/4) | none (dictionary intent, off-mission) |
| reading-nikoud | 2 | 30 | 17 (1/2) | new: Lire l'hébreu avec les voyelles |
| kids | 1 | 0 | — | games (weak signal — see open Q) |
| 22 × letter-\<name\> | 1–3 each | see per-letter table below | mostly unknown | lesson:\<Letter\> |

## Top opportunities (volume ÷ max(KD,1)) — top 15 of 30, see CSV for rest

| keyword | vol | KD | intent | cluster | SERP |
|---|---|---|---|---|---|
| alphabet hebreu / hébreu alphabet / alphabet hébraïque | 6,600 | 0 | informational | alphabet-hub | strong/moderate |
| apprendre l'hébreu | 720 | 0 | informational | misc | strong |
| écriture hébraïque | 720 | 0 | informational | alphabet-hub | strong |
| alphabet hébreu cursif / cursive | 390 | 0 | informational | cursive-script | strong/weak |
| guématria | 390 | 0 | informational | symbolism-gematria | **weak** |
| lettres hébraïques | 390 | 0 | informational | alphabet-hub | moderate |
| oulpan lavi | 390 | 0 | informational | oulpan-modern | moderate |
| alphabet hébreu français(-) | 320 | 0 | informational | alphabet-hub | moderate/strong |
| apprendre l'hébreu gratuitement | 260 | 1 | transactional | misc | moderate |
| les 22 lettres hébraïques pdf | 260 | 0 | informational | printable-reference | strong |
| oulpan | 260 | 0 | informational | oulpan-modern | moderate |
| apprendre l'hébreu gratuit | 210 | 1 | transactional | misc | **weak** |
| guérir avec les lettres hébraïques pdf | 170 | 0 | informational | symbolism-gematria | **weak** |
| alphabet hébreu biblique | 110 | 0 | informational | biblical-hebrew | **weak** |
| hébreu biblique | 140 | 2 | informational | biblical-hebrew | moderate |

Full ranked list with all 291 rows (incl. remaining 15 of top 30): `keywords-fr.csv`.

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
`lilmod-aleph-beth.fr` is the one real structured-course competitor and
should be studied directly before committing to final page scope (not done
here — budget/scope reasons, see Open questions). Across the wider 40-query
SERP sample, **fr.scribd.com** (22 appearances) and **youtube.com** (20) are
the most common thin/low-intent-match results — document dumps and videos,
not dedicated written lessons — which is the main evidence behind the
"weak top-10" clusters above.

## Proposed FR page list

| Page | Primary keyword | Title draft (≤60 chars, no brand) | Slug |
|---|---|---|---|
| Alphabet hub (existing — retarget copy) | alphabet hébreu | Alphabet hébreu : les 22 lettres expliquées | /alphabet-hebreu |
| New: cursive script | alphabet hébreu cursif | L'alphabet hébreu cursif, lettre par lettre | /alphabet-hebreu/cursif |
| New: printable chart | les 22 lettres hébraïques pdf | Alphabet hébreu à imprimer, PDF gratuit | /alphabet-hebreu/pdf-a-imprimer |
| New: meaning/gematria (flagged intent) | guématria | Guématria : la signification des lettres hébraïques | /guematria-lettres-hebraiques |
| 22 existing letter lessons (keyword/meta touch-up only, no new pages) | \<letter\> hébreu | (no title change needed — low standalone volume) | — |

Printable/PDF and cursive-script candidates are drawn from real demand
(930 + 860 vol/mo respectively) that the current alphabet hub does not
address explicitly — these are the two clearest net-new page opportunities
with weak-to-moderate competition.

## Intent notes

- **Reading/learning** (alphabet-hub, cursive-script, printable-reference,
  reading-nikoud, app): core mission-aligned demand, ~32,500 vol/mo
  combined, mostly informational, light competition per the SERP sample.
- **Symbolism/numerology** (guématria, tarot, "pouvoir/vertus des lettres",
  "guérir avec les lettres"): distinct, sizeable (~910 vol/mo) but
  off-mission-adjacent — flagged per the ≥200-volume rule. One dedicated
  page, not blended into the alphabet hub — the audience/framing
  (spiritual/divinatory) differs from "learn to read."
- **Printable/download** ("pdf", "imprimer", "télécharger"): a real,
  separate behavioral cluster (930 vol/mo) — these searchers want an
  artifact, not a lesson page.
- **Biblical Hebrew** (1,030 vol/mo, 47 keywords) and **oulpan/modern
  Hebrew** (1,640 vol/mo, 52 keywords) are adjacent-but-different products
  (full language courses / religious-text study) — recommend out of scope
  for now; flagged, not actioned.

## Open questions

1. **"apprendre l'hébreu"** (720 vol/mo, informational, strong competitors)
   is broader than "learn the alphabet" — alphabet-hub entry point, or a
   separate "learn Hebrew" landing page above the course? Not resolved.
2. **Kids-intent looks like a provider data gap, not zero demand.**
   "hébreu pour enfants", "apprendre l'hébreu aux enfants", "hébreu bar
   mitsva" and the STEP-1 seed "alphabet hébreu pour enfants" all returned
   zero rows/volume — unlikely given real-world bar/bat-mitzvah-prep
   demand in France. Treat as unverified, not deprioritized; worth a
   second provider or GSC data if this becomes a priority.
3. **Zayin and Tsadi** returned no data at all (any spelling).
4. **`lilmod-aleph-beth.fr`** is the one real structured-course competitor
   — worth a manual content audit (structure, per-letter coverage,
   pricing) before finalizing printable/cursive page scope; not done here.
5. KD is unreliable for ~97% of candidates (see caveat) — lean on SERP
   verdicts in `keywords-fr.csv`, not the `kd` column, for prioritization.

## Spend

STEP 2 total: **$1.21** (12 ideas calls $0.60, 4 overview batches $0.2139,
40 SERP calls $0.40). Combined with STEP 1 ($0.23): **$1.44** of the
$3.00 STEP-2 cap / cumulative. Full ledger in `spend.csv`.
