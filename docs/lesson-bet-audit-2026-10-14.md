# Bet lesson publication audit (read-only)

Prepared 2026-10-14. No files changed, no API calls made, no subagents used. This
audits what it would take to publish `/learn/hebrew-alphabet/bet/` the way Aleph
was published, based on the current repo state only.

## 1. Pipeline, step by step

| Step | What it does | Reusable for any letter? |
| --- | --- | --- |
| 1. Fetch | `scripts/import-alphabet-course.mjs --fetch` anonymously GETs `https://api.hebrewedu.com/api/lessons/?category=alphabet-lc&lang=en` (list) and `.../lessons/<id>/?lang=en` for IDs 2–22, with a fixed allowlist regex, 20s timeout, 2MB cap, and saves raw bytes + provenance under `.local/alphabet-course-imports/v1/<run>/raw/`. | **Reusable.** ID 1 is special-cased to reuse the already-approved `.local/lesson-snapshots/lesson-1.raw.json` snapshot by SHA-256 (`alephHash` constant) instead of refetching; IDs 2–22 go through the generic fetch path. |
| 2. Audit | `--audit <run-name>` loads `scripts/alphabet-course/validate.mjs` (`auditLesson`, `validateList`, `validateManifest`) against `scripts/alphabet-course/owner-letter-map.v2.json` (22-letter identity manifest) and `editorial-findings.v1.json`, and writes `audit-v…/validation.json` + `course-import.snapshot.v1.json` (private review envelope, never publication) + `course-content.snapshot.v1.json` only if **all 22** lessons are structurally valid. | **Reusable / generic.** `validate.mjs` takes `(raw, listItem, identity)` and works per-letter; nothing in it is Aleph-specific. It is also covered by generic tests in `tests/alphabet-course-import.test.mjs`, which use a `source()` fixture, not real Aleph data. |
| 3. Normalize | `scripts/normalize-lesson-1.mjs` reads **one hardcoded raw snapshot path** (`.local/lesson-snapshots/lesson-1.20261011T193043064573Z.raw.json`), checks its SHA-256 against a literal constant, calls `normalizeLesson()`, and writes to the hardcoded destination `src/content/lessons/aleph.json`. | **Not reusable — Aleph-only, one-off script.** Hardcodes: file name, destination path, expected SHA-256, and the `source` URL passed to `normalizeLesson`. There is no `normalize-lesson-2.mjs` / generic `normalize-lesson.mjs` CLI. |
| 4. Normalize logic | `src/lib/lessons/normalize.mjs`'s `normalizeLesson(rawInput, provenance)` hardcodes `id: 'aleph'`, `sourceId: 1`, `order: 1`, `glyph: 'א'`, the lesson title/description override, a fixed `editorialIssues` array (3 Aleph-specific issues), an `illustrations` map keyed by block index 2/4/6 with Aleph vowel-mark glyphs, and `blockFlags`/`exerciseFlags` maps keyed by Aleph's own block/exercise indices. | **Not reusable as-is.** Every literal in this function is Aleph content. A Bet version needs its own id/glyph/order/editorial-issues/illustration-map/flags — either a parallel function or a generalized one taking those as parameters. |
| 5. Schema validation | `src/lib/lessons/schema.mjs` defines `rawLessonSchema` (`id: z.literal(1)`, `order: z.literal(1)`, `studyMaterials` length **11**, `exercises` length **14**) and `lessonSchema` (`id: z.literal('aleph')`, `sourceId: z.literal(1)`, `order: z.literal(1)`, `glyph: z.literal('א')`, `blocks` length **11**, `exercises` length **14**, provenance `source: z.literal('https://api.hebrewedu.com/api/lessons/1/?lang=en')`, and an invariant requiring block IDs to be exactly `aleph-block-${n}`). | **Not reusable — hard-blocks any other letter.** This is the single biggest generalization item: as written the schema can validate *only* lesson 1/Aleph with exactly 11 study blocks and 14 exercises. Bet has **20** study blocks and **13** exercises (see §2) — structurally incompatible with this schema without rewriting it to take the letter/counts as parameters. |
| 6. Content collection | `src/content/lessons/aleph.json` is the one file in `src/content/lessons/`; `[lesson].astro`'s `getStaticPaths` calls `getEntry('lessons', 'aleph')` with the slug hardcoded, not derived from params. | **Partially reusable.** Adding `bet.json` to the content dir is the documented/intended mechanism (CLAUDE.md: "new lesson is a new JSON file… never a new route"), but `[lesson].astro` as it stands only ever requests the `'aleph'` entry — it does not loop over `courseManifest.lessons` or use `params.lesson`. It needs to generalize to read `Astro.params.lesson` (or iterate enabled lessons) before a second file does anything. |
| 7. Route body | The rest of `[lesson].astro` (theory/examples/practice) hardcodes `theoryIndices = [0,1,7]`, `exampleIndices = [2,3,4,5,6,8,9,10]`, the Aleph glyph/name in markup (`Lesson 1 of 22`, `Aleph א`), and `"Meet Aleph"` heading text. | **Not reusable.** These indices map to Aleph's 11-block structure; Bet's 20-block structure needs its own staging logic, and the hardcoded letter/number-of-22 text needs to be parameterized. |
| 8. Review gates / publish flag | `src/data/alphabet-course.json` (per-lesson `sourceImported`/`webImplemented`/`previewAvailable`/`editorialApproved`/`published`/`publishedAt`) validated by `src/lib/alphabet-course.mjs`'s `validatePublicationManifest`. Gating: `webImplemented`/`previewAvailable` require `supportedLessonRoutes.has(slug)`, and that constant is **hardcoded to `new Set(['aleph'])`**. | **Config is reusable; the route-support check is not, yet.** Flipping Bet's `webImplemented`/flags in the JSON alone is not sufficient — `supportedLessonRoutes` in `alphabet-course.mjs` must add `'bet'` once a Bet route actually exists, or `validatePublicationManifest` throws `No implemented route for bet`. |
| 9. Sitemap / links | `courseSitemapEntries()`/`courseSchema()` in `alphabet-course.mjs` iterate `config.lessons.filter(item => item.published)` generically — no hardcoding. `src/pages/sitemap.xml.ts` presumably consumes `courseSitemapEntries()`. | **Reusable.** Once a lesson's `published: true` and it passes `validatePublicationManifest`, it is included automatically. |
| 10. Release-rate limit | `validateWeeklyReleaseLimit` enforces ≤3 new lessons per ISO week (Mon–Sun), already generic. | **Reusable.** |

**Net:** the import/audit/validate layer (steps 1–2, 9–10) is generic per-letter already. The **normalization → schema → route render** chain (steps 3–7) is entirely Aleph-specific today and is one-off, not a template; `supportedLessonRoutes` (step 8) is a one-line gate but still blocks Bet until a route exists.

## 2. Bet source: does it exist, what's in it, known issues

Confirmed present: `.local/alphabet-course-imports/v1/2026-10-11T12-04-00-552Z-a1dbcc/raw/lesson-2.raw.json` (+ `.provenance.json`), fetched 2026-10-11 as part of the same run that reused the Aleph snapshot. `src/data/alphabet-course.json` already marks Bet `sourceImported: true` (all 22 are).

Per `docs/hebrew-alphabet-course-content-audit.md` (row for ID 2 / bet) and `docs/hebrew-alphabet-course-review-register.md` ("Lesson 2 — bet"):

| Field | Aleph (published) | Bet |
| --- | --- | --- |
| Study blocks | 11 | **20** |
| Exercises | 14 | **13** |
| Images / audio in source | 3 / 0 | **2 / 4** |
| Source schema validity | Pass | **Pass** |
| Readiness flags | T, E | **R, E** (Requires renderer development, Requires editorial review — not "Technically compatible") |

Known content issues for Bet specifically (from the review register / content audit, none corrected — these are raw-source observations, not errors introduced by import):
- **3 recognized-but-unimplemented study-block types** (`RENDERER_STUDY_TYPE_NOT_IMPLEMENTED` at B6, B13, B15, B17) that the current Aleph renderer (`StudyBlock.astro`) doesn't handle — these are presumably `WORD_EXAMPLE`/similar types the Aleph lesson never uses.
- **1 matching-pairs exercise** (Q13, `RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED`) needing a new interaction/grading model the `Practice` component doesn't have.
- A **duplicate study text** (B6/B15, repeated בָּא example) and a **tokenized audio URL** on B15 that must not be copied directly into public assets.
- Two missing image descriptions (B5, B9).
- All true/false answers share one key (`ONE_SIDED_TRUE_FALSE`) — same category of flag Aleph had.
- A cluster of `ARTICULATION_TRADITION` / `ENGLISH_SOUND_ANALOGY` / `SILENCE_OR_ABSOLUTE_CLAIM` flags concentrated on dagesh/בּ-vs-ב pronunciation wording (B4/B5/B7/B8/B9/B11/B16 and most exercises) — a specific editorial theme for Bet because the letter's whole lesson is about the dagesh [b]/[v] distinction, parallel to (but larger in volume than) Aleph's niqqud-focused flags.
- The content audit's manual-findings table (separate from the automatic register) adds: B7/B16 use inconsistent vowel-mark names for the same printed mark in בָּא (Kamatz vs. Patah), and the "Bet-at-word-start/end" absolute phonetic rule plus Q7/Q9 need an exception review.

No editorial sign-off exists for Bet; `content_status` in the owner manifest shows `detail_not_fetched`→ now fetched but unreviewed, same unapproved state Aleph was in before its dedicated editorial-review doc.

## 3. Course order and linking

- Bet is `order: 2`, `sourceId: 2` in both the owner manifest and `src/data/alphabet-course.json` — it is lesson 2 as expected.
- **Hub** (`/learn/hebrew-alphabet/`): renders all 22 cards from `curriculum()`; only cards where `lessonEnabled()` is true get an `href` — today that's Aleph alone. Bet shows as a non-interactive "Coming Soon" card, no link, no route (per `course-hub.md`).
- **Aleph → next lesson**: `[lesson].astro`'s rendered stage/markup for Aleph does not contain a "next lesson" link at all today (not found in the reviewed portion of the file, and `hub.md`/`release.md` describe only a Hub "Start Learning" link and the Hub's own 22 cards — no lesson-to-lesson prev/next nav exists yet for a single-lesson course).
- **What changes when Bet is published:** (a) `supportedLessonRoutes` in `alphabet-course.mjs` must include `'bet'`; (b) `src/data/alphabet-course.json`'s Bet entry needs `webImplemented`, `editorialApproved`, `published: true`, and a real `publishedAt`; (c) the Hub's Bet card becomes a live link automatically via `lessonEnabled`/`curriculum()` (no hub code change needed); (d) if prev/next lesson navigation is introduced, both Aleph's and Bet's pages need it added — currently neither has it, so this is new work, not a change to an existing Aleph-only feature.

## 4. Audio

- **Schema:** `src/lib/lessons/schema.mjs`'s `block`/`exercise` schemas have **no audio field at all** — `illustration` only carries `glyph`/`label`/`equivalent`/`mediaStatus` (text equivalents, not audio). The raw `rawBlock`/`rawExercise` schemas likewise don't model an `audioUrl` field (the generic `validate.mjs` used by the importer does recognize `audioUrl` on `WORD_EXAMPLE`-type blocks, per the test file, but the publication-facing `lessonSchema` does not carry it through).
- **To use Alef Bet Rush audio for Aleph/Bet:** the files exist and are already named by letter — `/Users/kasutaja/Desktop/playable-debug/games/alef-bet-rush/src/assets/audio/letter-names/alef.mp3` and `bet.mp3` (plus all 22 letters), each ~30KB. Note the path in the task (`../playable-debug/...` relative to the site root) resolves to `/Users/kasutaja/Developer/web/playable-debug/...`, which **does not exist**; the actual files live at `/Users/kasutaja/Desktop/playable-debug/games/alef-bet-rush/...`. These are a separate standalone game's assets, outside this repo (the repo only has a copied/built game bundle under `public/game-builds/alef-bet-rush/`, synced via `scripts/sync-alef-bet-rush.mjs` from a built game directory with its own `letter-audio-manifest.json`, not from this source tree).
- **What's needed to use them for lessons:**
  1. Decide a licensing/reuse story for pulling game audio into lesson pages (not currently documented as approved — Aleph's `release.md` explicitly says *"No audio capability is claimed"*).
  2. Copy (not symlink, per `sync-alef-bet-rush.mjs`'s own symlink ban pattern) the two letter-name MP3s into a repo-tracked public asset location (e.g. `public/audio/letter-names/` or similar — doesn't exist yet).
  3. Extend `lessonSchema`/`rawLessonSchema` (or a new field) to carry an audio reference, and extend `normalizeLesson`/the future generalized normalizer to populate it.
  4. Add playback UI to `StudyBlock.astro` or the lesson header — no audio-playing component currently exists in `src/components/lessons/`.
  This is new scope beyond "generalize the schema for Bet" — it touches schema, normalize, and a new UI component, for both letters, not just Bet.

## 5. SEO

### Bet keywords (`docs/seo/core/keywords.csv`, cluster `hebrew-letters-individual-lessons--bet`)

| Keyword | Volume | KD | Intent | SERP validated | Status | Priority score |
| --- | --- | --- | --- | --- | --- | --- |
| bet hebrew letter | 720 | 1 | informational/educational | yes | planned | 25.8 |
| vet hebrew letter | 70 | 8 | informational/educational | no | planned | 8.2 |
| hebrew bet pronunciation | — | — | informational/educational | no | planned | 8 |
| hebrew letter bet sound | — | — | informational/educational | no | planned | 8 |
| learn hebrew letter bet | — | — | informational/educational | no | planned | 8 |
| bet hebrew letter exercises | — | — | informational/educational | no | planned | 8 |
| bet with dagesh | — | — | informational/educational | no | planned | 8 |

Cluster row (`clusters.csv`): `hebrew-letters-individual-lessons--bet`, primary keyword **"bet hebrew letter"**, volume 790, KD 1, target `https://hebrewedu.com/learn/hebrew-alphabet/bet/`, status **planned**, `is_cluster_primary: yes`.

For comparison, Aleph's cluster: primary "aleph hebrew letter", volume 530, KD 15, status **published**. Bet's cluster has **higher volume and much lower KD** than Aleph's — i.e. an easier, higher-opportunity target, consistent with the existing "bet hebrew letter" KD=1/volume=720 row having the highest priority_score (25.8) of the whole Bet cluster.

### Overlap with the alphabet guide / Hub

- The alphabet guide (`/blog/hebrew-alphabet-complete-guide/`) targets broad terms including **"bet vs vet pronunciation"** in its secondary-keyword list — this directly overlaps the Bet lesson cluster's "vet hebrew letter" / "hebrew bet pronunciation" terms. No cannibalization flag exists yet in the CSVs; publishing Bet should either (a) keep the guide's mention generic/comparative and let the lesson page own the dedicated bet/vet pronunciation explanation, or (b) add an internal link from the guide's "bet vs vet pronunciation" mention to the new Bet lesson page once published (mirroring what `source-sync-review.md`/`hub.md` describe as the existing practice of guide↔hub internal linking for Aleph).
- The Hub (`/learn/hebrew-alphabet/`) targets "hebrew alphabet course" terms, not letter-specific terms — no direct keyword overlap with Bet, same relationship it has with Aleph today.
- No other row in `keywords.csv`/`pages.csv` targets the Bet URL besides the 7 rows above.

### Proposed Bet page metadata (mirroring how Aleph was done)

Aleph's pattern (from `pages.csv` row 23 and `release-readiness.md`): `<title>` = `{Lesson title} | HebrewEdu`, meta description = the lesson's `description` field, H1 = "Exploring {Letter} ({glyph}) and Hebrew Diacritical Marks"-style, primary keyword = the cluster's top term.

Proposed for Bet (content/editorial-review pending — these are proposals only, same caveat `release-readiness.md` applied to Aleph before owner sign-off):
- **Primary keyword:** `bet hebrew letter` (matches cluster primary, highest priority_score, SERP-validated).
- **Title tag:** `Bet: the dagesh letter | HebrewEdu` (parallel to Aleph's `Aleph: three vowel marks | HebrewEdu`, substituting Bet's defining feature — the dagesh [b]/[v] distinction — for Aleph's vowel-mark focus).
- **Meta description:** `Learn the Hebrew letter Bet (ב) and the dagesh dot that changes its sound from [v] to [b], through beginner explanations, examples and interactive practice.` (parallel structure to Aleph's description, substituting Bet's actual topic and omitting Aleph's "14 interactive practice questions" count since Bet has 13 exercises and the renderer-support gaps in §2 may reduce that further).
- **URL/canonical:** `https://hebrewedu.com/learn/hebrew-alphabet/bet/` (already reserved in `clusters.csv`/`keywords.csv`, matching `owner-letter-map.v2.json`'s `proposed_url`).

## What must be generalized before Bet (blocking)

1. `src/lib/lessons/schema.mjs` — hardcoded to `id: 1`, `order: 1`, `studyMaterials.length === 11`, `exercises.length === 14`, `glyph: 'א'`, `id: 'aleph'`, fixed source URL, and `aleph-block-${n}` ID pattern. Bet has 20 blocks / 13 exercises — needs a parameterized schema (by letter identity) or a per-letter schema factory.
2. `src/lib/lessons/normalize.mjs` — `normalizeLesson()` hardcodes Aleph's id/glyph/order/title/description-override/editorialIssues/illustrations/blockFlags/exerciseFlags. Needs the same generalization, or a parallel Bet-specific normalizer plus a real content decision on which of Bet's 20 blocks become theory/examples blocks (Aleph's `theoryIndices`/`exampleIndices` split, hardcoded in `[lesson].astro`, has no Bet equivalent yet).
3. `scripts/normalize-lesson-1.mjs` — one-off script pinned to one raw snapshot path, one output path, one SHA-256. Needs a Bet counterpart (or a generic `normalize-lesson.mjs <letter>` CLI).
4. `src/pages/learn/hebrew-alphabet/[lesson].astro` — `getStaticPaths` only ever fetches the `'aleph'` content entry; stage indices/markup/copy are Aleph-specific. Needs to iterate `courseManifest.lessons` (or read `params.lesson`) and externalize per-letter copy/indices.
5. `src/lib/alphabet-course.mjs`'s `supportedLessonRoutes = new Set(['aleph'])` — must add `'bet'` once the route exists, or publication validation throws.
6. Two unimplemented source block types (B6/B13/B15/B17-class) and one unimplemented exercise type (matching pairs, Q13) in Bet's content — `StudyBlock.astro`/`Practice` components need new renderers, or those records stay editorially held out like Aleph's images were.
7. Editorial review and owner sign-off on Bet's dagesh/pronunciation wording flags (see §2) — no `hebrew-alphabet-lesson-2-editorial-review.md` exists yet, unlike Aleph's.
8. Audio: no audio field in schema/normalize, no audio UI component, no approved licensing story for reusing Alef Bet Rush assets, and the actual asset path differs from the one named in the task (see §4).

## What can be done now (non-blocking / parallelizable)

1. SEO: `keywords.csv`/`clusters.csv` rows for Bet already exist and need no new paid lookups; the title/description/primary-keyword proposal in §5 can be drafted and reviewed now.
2. The generic import/audit layer (steps 1–2, 9–10 in §1) needs no changes — Bet's raw source is already fetched and auditable today.
3. `src/data/alphabet-course.json`'s Bet row already has correct identity fields (`sourceId`, `order`, `letter`, `slug`, `name`); only the `webImplemented`/`editorialApproved`/`published`/`publishedAt` flags change at actual release time, exactly as documented for Aleph in `release-readiness.md`'s "Exact future publication changes" table.
4. Sourcing/placing the two Alef Bet Rush letter-name MP3s into a repo asset location can be scoped and drafted independently of the schema work, pending the licensing decision in §4.1.
