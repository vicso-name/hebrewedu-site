# FR keyword research — STEP 2 plan (not executed)

## API findings carried into this plan

- Auth is `x-api-key: yep_sk_...` header (llms.txt + confirmed empirically),
  not Bearer as originally assumed — use `x-api-key` in STEP 2 tooling.
- `/v1/seo/keywords` (bulk, exact-match) returned `intent: "unknown"` and
  `difficulty: 0` for all 10 FR seeds — looks unreliable for KD/intent at
  this location/language. `/v1/seo/keywords/overview` and
  `/v1/seo/keywords/ideas` both returned real `difficulty` and `intent`
  values in testing. **STEP 2 should use `/keywords/overview` (not
  `/keywords`) for volume+KD+intent on an explicit candidate list.**
- `trend` history length varies by endpoint (12 months on `/keywords` and
  `/keywords/ideas`, much longer — back to 2018 — on `/keywords/overview`).
  Not a blocker, just note which endpoint a trend came from.
- No `cost` field in any response body; ledger costs are estimated from the
  published per-call/per-100 pricing, not read from the API.

## Seed list (grouped by theme)

1. **Alphabet / letters** — alphabet hébreu, lettres hébraïques, lettre
   hébraïque, + one seed per of the 22 letter names (aleph, beth, guimel,
   dalet, hé, vav, zayin, heth, teth, yod, kaf, lamed, mem, noun, samekh,
   ayin, pe, tsadi, qoph, resh, shin, tav) — French spelling variants
   per letter (e.g. "lettre aleph", "aleph hébreu").
2. **Learning to read / nikoud** — apprendre à lire l'hébreu, nikoud,
   points-voyelles hébreu, voyelles hébraïques.
3. **Beginners / adults** — hébreu débutant, cours d'hébreu pour adultes,
   hébreu pour les nuls.
4. **Children / bar-bat mitzvah** — alphabet hébreu pour enfants, hébreu
   bar mitzvah, hébreu bat mitzvah, apprendre l'hébreu enfant.
5. **Biblical Hebrew** — hébreu biblique, hébreu ancien, grammaire hébreu
   biblique.
6. **Modern Hebrew / oulpan / aliyah** — oulpan, hébreu moderne, hébreu
   pour aliyah, cours d'hébreu Israël.
7. **Apps / games / online** — application pour apprendre l'hébreu, jeu
   alphabet hébreu, apprendre l'hébreu en ligne, apprendre l'hébreu
   gratuit.
8. **Letter meaning / symbolism** — signification lettres hébraïques,
   valeur numérique lettres hébraïques, guématria. **Flag this theme's
   intent separately** — likely informational-but-spiritual/numerology,
   not learn-to-read; may map to a dedicated page, not the core lesson
   funnel, or may be excluded if off-mission.
9. Additional theme suggested by the test data: **format/reference intent**
   — "alphabet hébreu pdf", "alphabet hébreu à imprimer", "télécharger
   alphabet hébreu" showed up as a meaningful slice of ideas results with
   `transactional` intent. Worth its own small cluster (printable/PDF
   chart) rather than folding into the informational alphabet cluster.

## Endpoints, call counts, expected volumes, phase cost estimates

| Phase | Endpoint | Calls | Expected kw count | Est. cost |
|---|---|---|---|---|
| Expansion | `/v1/seo/keywords/ideas` | 1 call per seed theme head term, ~30 seeds (9 themes + 22 letters, some merged) | ~30 × up to 50 ideas ≈ 1,000–1,500 raw rows | 30 × ~$0.05 ≈ **$1.50** |
| Dedup + filter | (no API call — local processing) | — | → narrow to ~150–250 candidates | $0 |
| Volume/KD | `/v1/seo/keywords/overview` | ~2–3 calls (batches of ≤100 keywords) for ~200 candidates | 200 rows w/ volume, KD, intent, CPC, trend | 2–3 × ~$0.09 ≈ **$0.20–0.25** |
| SERP competitors | `/v1/serp/google` | ~30–50 calls, depth=10, for top candidates per cluster | top-10 results per query | 30–50 × $0.01 ≈ **$0.30–0.50** |
| **Total estimate** | | | | **≈ $2.00–2.25** |

(All estimates use published per-call/per-100 pricing from
`https://docs.yepapi.com/llms.txt`; actual billed amounts aren't visible in
responses, so the ledger will log the same published-price estimates and
flag if the account balance drops faster than expected.)

## Filtering rules

- **Relevance**: keyword must relate to Hebrew alphabet/letters/learning-
  to-read/Hebrew language learning for a French-speaking audience. Drop
  anything about unrelated "hebrew" senses (e.g. brand names, non-Hebrew
  "Hebrew Israelite" religious-movement queries unless genuinely about the
  alphabet).
- **Junk patterns to drop**: tattoo-intent ("tatouage hébreu", "tatouage
  lettre hébraïque"), name-translation/prénom intent ("prénom en hébreu",
  "mon prénom en hébreu", "traduire prénom hébreu"), jewelry/gift-shop
  queries, and any keyword whose top SERP results (once checked) are
  dominated by tattoo/jewelry sites rather than learning content.
- **Minimum volume**: ≥10 keep for clustering context, but only keywords
  with **volume ≥50** count toward the GO/NO-GO threshold below.
- **Intent labeling**: take the API's `intent` field as the default label;
  manually override to "symbolic/numerology" for the guématria/meaning
  theme and "reference/download" for pdf/imprimer/télécharger queries,
  since the API only distinguishes informational/transactional/
  navigational/commercial and collapses those nuances.

## Output files STEP 2 will produce

- `docs/seo/research/fr/keywords-fr.csv` — columns: `keyword`, `volume`,
  `kd`, `cpc`, `trend_12mo` (or pointer to raw response), `intent`,
  `cluster`, `mapped_page` (one of: alphabet hub / 22 letter lessons [which
  letter] / games / app / new page [name the candidate page]).
- `docs/seo/research/fr/FR_RESEARCH.md` — findings + GO/NO-GO verdict
  against:
  - **GO** if ≥30 keywords have volume ≥50 **and** KD ≤25.
  - **GO** if ≥5 clusters show weak top-10 SERP results (thin content,
    forums, no dedicated learning resource — determined from the SERP
    competitor calls).
  - Otherwise **NO-GO** / narrowed scope, with the specific numbers that
    fell short.

STEP 2 execution requires separate user approval before any call runs,
per CLAUDE.md's paid-API rule.
