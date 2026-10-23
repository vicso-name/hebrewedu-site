# Alphabet course import and recovery

These are explicit, private import tools. They are not connected to Astro collections,
route generation, `npm run build`, or publication. The owner mapping is a byte-for-byte
copy of the existing Semantic Core v2 planning manifest; its historical planning status
does not grant publication approval. Lesson 4 is confirmed Dalet.

## Current publication state

The Course Hub and Aleph are published. Aleph has **14 active exercises**, results
score out of 14, and Q4's correct answer is **True**. Lessons 2–22 remain unpublished.
Use the [current release procedure](../../docs/hebrew-alphabet-release.md) and
[project knowledge index](../../docs/PROJECT-KNOWLEDGE-INDEX.md) for publication gates.
The original import checkpoint below predates the accepted Aleph release source;
its editorial findings describe its saved source versions, not current Aleph holds.

## Preserved import checkpoint

Run: `2026-10-11T12-04-00-552Z-a1dbcc` under `.local/alphabet-course-imports/v1/`.
Latest audit: `audit-v1-595de65ea735/`.
Recovery: `recovery-2026-10-11T12-46-55-453Z/`.
See [the course audit](../../docs/hebrew-alphabet-course-content-audit.md).

All 21 remaining details were fetched once, plus one list request. Aleph was reused.
Do not run `--fetch` to recover this checkpoint. Recovery is entirely offline:

```sh
node scripts/alphabet-course/recover.mjs 2026-10-11T12-04-00-552Z-a1dbcc
```

Recovery checks all raw checksums, parsing, identities/counts/schema against the saved
validation, version hashes, complete review snapshot and candidate mappings. It writes
a new timestamped recovery directory and leaves raw files and audit snapshots untouched.
Exit 0 means the checkpoint is intact; it does **not** mean content is publication-ready.

## Explicit new import and offline audit

Only use the following fetch command when a new import is authorized. It creates a new
versioned run, never replaces existing snapshots, and uses anonymous read-only GETs:

```sh
node scripts/import-alphabet-course.mjs --fetch
```

The fixed allowlist permits the alphabet list and details 2–22 only. There are no
credentials, writes, automatic retries, media downloads or Lesson 1 refetches. It
requires the pinned approved Aleph snapshot. Pagination, redirects, invalid UTF-8,
duplicate JSON keys, unexpected types/fields, identity changes and size/time limits
stop processing rather than guessing. Raw bytes are preserved with SHA-256 provenance.
Incomplete runs are retained and cannot be promoted as complete.

Re-auditing after an intentional validator/editorial change is offline:

```sh
node scripts/import-alphabet-course.mjs --audit 2026-10-11T12-04-00-552Z-a1dbcc
```

An audit version is derived from importer, validator, JSON parser and editorial registry
hashes. A changed implementation produces a new audit folder. Re-running the same audit
rewrites that version's derived files; use **recover.mjs** for non-overwriting recovery.
Exit 2 is expected when source-schema blockers remain; exit 1 indicates an execution,
transport, parsing or integrity failure. Exit 0 means all source schemas passed, still
without publication approval. This checkpoint intentionally exits 2 for 11 empty records.

## Snapshot contract and safeguards

- `.local/` is ignored and denied by the existing development-server filesystem rules;
  it is outside `public/`, `src/`, and deployable output. Runs use private directory/file
  permissions. Raw snapshots and provenance must remain together.
- `course-import.snapshot.v1.json` is the validated **review envelope** for all 22 lessons.
  It retains every source block and exercise, including malformed records. Its
  `allLessonContentValid: false` must not be ignored. Sixteen structurally valid lessons
  have private normalization candidates; six have `null` candidates and blocking issues.
- A fully valid `course-content.snapshot.v1.json` is deliberately absent while any source
  schema fails. That absence is not corruption. Neither snapshot is an Astro collection.
- Hebrew presentation forms are compatibility-normalized selectively, then text values
  are NFC-normalized; source spelling, vowels and wording are never corrected. Raw bytes
  remain authoritative. Object keys are retained to prevent destructive pair collisions;
  normalized matching labels are validated separately and converted to stable pair IDs.
- Unknown structures are retained and rejected, not silently skipped. The 11 genuinely
  empty placeholders are classified separately from nine usable image/caption blocks.
  No source records have been omitted. A future learner transform must record any
  classified-placeholder omission explicitly and preserve source indexes/counts.
- The manual editorial registry is checksum-bound to source versions. It records issues
  and source excerpts, not approved replacement copy. Answer mappings remain private
  here, although eventual ordinary client self-assessment answers are not confidential.
- Firebase capability URLs, raw answer objects and editorial excerpts must never be copied
  into public assets. Media existence, MIME, pronunciation accuracy and reuse rights
  remain unverified; no URL was fetched during this audit.
- Builds cannot import newly saved lessons automatically. Publication requires a separate
  reviewed normalization, explicit route allowlist and editorial/media approvals. Enforce
  the product limit of five new lessons per week at that later release gate.

## Import tests and current publication validation

```sh
node --test tests/alphabet-course-import.test.mjs tests/lesson-1.test.mjs
```

For current publication validation, run from the repository root:

```sh
node --test tests/alphabet-course-hub.test.mjs tests/lesson-1.test.mjs
npm run build
node scripts/check-alphabet-release.mjs
```

The [current artifact checker](../check-alphabet-release.mjs) reads the production
build in `dist` (or `COURSE_RELEASE_DIST`). It checks exactly the Hub and Aleph routes,
indexable metadata/canonicals and sitemap entries, 11 study blocks, all 14 active
exercise keys, Q4 True, the absence of lessons 2–22 routes/links, private-content
exclusions and the distributed Rubik license. It is scoped to the current first
release; publication of additional lessons needs a separately reviewed validation update.
Optional `COURSE_BASELINE` and `COURSE_BASELINE_SITEMAP` enable regression comparisons;
without them it does not prove existing pages/assets are unchanged. Choose a baseline
appropriate to the change being checked: the later approved homepage title differs
from the pre-title release baseline. Preserve historical baselines unchanged.
`COURSE_RELEASE_REPORT`, if set, writes a report to that explicit path.

**Obsolete for current publication validation:**
[check-lesson-1-artifacts.mjs](../check-lesson-1-artifacts.mjs) is the historical POC
checker. It requires Aleph to be absent from the normal build, no course sitemap
entries or incoming public Aleph links, and a noindex preview; it also writes a POC
validation artifact. Those assumptions conflict with the published course. Retain
the script and its dated results as historical evidence; do not use it as a current
release gate. The original recovery regression record's checks against normal and
opt-in outputs remain historical evidence of that import run.
