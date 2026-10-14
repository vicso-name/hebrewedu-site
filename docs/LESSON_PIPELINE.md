# Adding a letter lesson

The schema/normalize/route layer is generic across all 22 letters. Adding a
letter is a data change, not a code change (unless its source uses a block or
exercise type the renderers don't support yet — see step 4).

## 1. Identity

Every letter's `id`/`slug`, `sourceId`, `order` and `glyph` already exist in
`scripts/alphabet-course/owner-letter-map.v2.json` (the 22-letter
owner-approved manifest). `src/lib/lessons/identity.mjs` reads it; nothing
else needs to be told a letter's identity.

## 2. Fetch and audit the raw source

Unchanged, already generic: `scripts/import-alphabet-course.mjs` fetches the
raw lesson, `scripts/alphabet-course/validate.mjs`'s `auditLesson` reviews it.
See `scripts/alphabet-course/README.md`.

## 3. Dry run

Before any editorial decision, see what the letter's raw source actually
contains:

```
node scripts/normalize-lesson.mjs <slug> --dry-run
```

With no `src/data/lessons/<slug>.json` yet, this auto-discovers the newest
raw snapshot under `.local/alphabet-course-imports/` for that letter's
source id and reports: block/exercise counts, any study block or exercise
type the renderers (`StudyBlock.astro`/`Practice.astro`) don't support, and a
heuristic proposed theory/examples stage map. Nothing is written and the
letter is not enabled by this step.

## 4. Editorial data file

Once the title, description (if overridden), editorial issues, illustration
captions, review flags, stage map, and any holdouts are decided, write
`src/data/lessons/<slug>.json`:

```json
{
  "slug": "<slug>",
  "title": "…",
  "description": "… (optional; omit to use the raw source's description)",
  "editorialIssues": [{ "id": "…", "summary": "…", "detail": "…" }],
  "illustrations": { "<sourceIndex>": { "glyph": "…", "label": "…", "equivalent": "…" } },
  "blockFlags": { "<sourceIndex>": ["<editorialIssueId>"] },
  "exerciseFlags": { "<sourceIndex + 1>": ["<editorialIssueId>"] },
  "stageMap": { "theory": [0, 1], "examples": [2, 3] },
  "copy": {
    "theory": {
      "heading": "…",
      "intro": "… (may contain inline HTML, e.g. a link — rendered with set:html)",
      "objectivesHeading": "…",
      "objectives": ["… (may contain inline HTML, e.g. a bdi-wrapped glyph — rendered with set:html)", "…", "…"],
      "secondSectionHeading": "…",
      "thirdSectionHeading": "…"
    },
    "examples": { "heading": "…", "intro": "…" }
  },
  "holdOuts": {
    "blocks": [{ "sourceIndex": 5, "reason": "duplicate WORD_EXAMPLE, see Bet's data file" }],
    "exercises": [{ "sourceIndex": 12, "reason": "editorial: ambiguous phonetic distractor" }]
  },
  "source": { "rawSnapshotPath": ".local/…/lesson-N.raw.json", "sha256": "…", "responseDate": "…" }
}
```

See `src/data/lessons/aleph.json` for a complete, real example.

`copy` holds the letter-specific route copy `[lesson].astro` renders for the
theory/examples stage headings, the theory intro, the learning-objectives
list, and the two in-theory section headings — every per-letter string in
that template comes from this field, not from a hardcoded literal in the
route. `intro` and each `objectives` entry may contain trusted inline HTML
(e.g. a link or a `<bdi>`-wrapped glyph) — the route renders them with
`set:html`, the same pattern `Faq.astro`'s `a` field uses. `copy` is
mandatory for every enabled-or-preview letter; until editorial copy exists,
fill each field with a placeholder literally prefixed `TODO-EDITORIAL:`
(see `src/data/lessons/bet.json`) rather than leaving the letter unbuilt.

**Holdouts are mandatory for unsupported content.** If the raw source has a
study block or exercise type `StudyBlock.astro`/`Practice.astro` can't
render (currently anything other than `MAIN_TITLE`/`SIMPLE_TEXT`/
`TEXT_IMAGE`/`BOLD_TEXT`/`SUBTITLE`/`WORD_EXAMPLE` blocks or `TRUE_FALSE`/
`MULTIPLE_CHOICE_COLUMN`/`MULTIPLE_CHOICE_GRID`/`MATCH_PAIRS` exercises — see
`BLOCKS.md` for the `WORD_EXAMPLE` → `PhraseCard` mapping and the
`MATCH_PAIRS` interaction) and it isn't listed in `holdOuts` with a reason,
normalization fails closed with a list of what's unsupported. Holding an
item out drops it from the published lesson entirely — it does not appear,
even as "unavailable". A holdout isn't limited to unsupported types: any
block/exercise index can be held out for an editorial reason (e.g. a
duplicate `WORD_EXAMPLE` with a tokenized source audio URL) — `holdOuts`
always wins, regardless of whether its type has a renderer. Building a new
renderer for a type is separate work, not part of this pipeline.

Stage-map (`stageMap.theory`/`stageMap.examples`) and holdout entries key
off a block/exercise's raw `sourceIndex`, not its position in the
normalized `blocks`/`exercises` array — the two only coincide when nothing
is held out for that letter. `[lesson].astro` looks blocks up by
`sourceIndex` for this reason.

## 5. Normalize and validate

```
node scripts/normalize-lesson.mjs <slug>
```

This verifies the pinned raw snapshot's SHA-256, fails closed on any
unsupported-and-not-held-out content, checks the normalized block/exercise
counts against the raw source (minus holdouts), validates against that
letter's schema (`src/lib/lessons/schema.mjs`'s `createLessonSchema`, which
cross-checks identity against the owner letter map), and writes
`src/content/lessons/<slug>.json`.

## 6. Enable the route

Nothing route-specific to change:

- `supportedLessonRoutes` (`src/lib/alphabet-course.mjs`) is derived from the
  files present in `src/content/lessons/` — it picks up the new file
  automatically.
- `[lesson].astro`'s `getStaticPaths` iterates every lesson in
  `src/data/alphabet-course.json` and builds a route for each one that's
  `lessonEnabled` (`webImplemented` + `published`, or `previewAvailable` in
  local preview).
- Prev/next navigation on every lesson page is automatic: it links to the
  adjacent lesson by `order` if that lesson is enabled, or back to the hub
  otherwise.

So the only remaining step is flipping that letter's `webImplemented`,
`previewAvailable`, `editorialApproved`, `published` and `publishedAt`
flags in `src/data/alphabet-course.json` once editorial sign-off exists —
exactly as documented for Aleph in `docs/hebrew-alphabet-aleph-release-readiness.md`.
The hub (`/learn/hebrew-alphabet/`) and sitemap already read that same
manifest generically and need no change.

## Removed

`scripts/normalize-lesson-1.mjs` (the Aleph-only, hardcoded one-off script)
is removed. Its replacement is `scripts/normalize-lesson.mjs <slug>` above.
