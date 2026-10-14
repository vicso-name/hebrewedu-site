# Bet (Lesson 2) — Editorial Review

Prepared 2026-10-14, read-only against the current repo state. No corrections
applied to `src/data/lessons/bet.json`, `src/content/lessons/bet.json` or
`src/data/alphabet-course.json`; no API calls made; no subagents used. This
mirrors `docs/hebrew-alphabet-lesson-1-editorial-review.md`'s structure for
Aleph and the flag categories in `docs/hebrew-alphabet-course-content-audit.md`
/ `docs/hebrew-alphabet-course-review-register.md`'s automatic register for
Bet (`ARTICULATION_TRADITION`, `ENGLISH_SOUND_ANALOGY`,
`SILENCE_OR_ABSOLUTE_CLAIM`, `ONE_SIDED_TRUE_FALSE`, missing image
descriptions).

Block/exercise numbers below (`B#`/`Q#`) are 1-based positions in the raw
`studyMaterials`/`exercises` arrays, matching the content audit and review
register. The normalized `src/content/lessons/bet.json` IDs are
`bet-block-<B#>` / `bet-exercise-<Q#>`; `sourceIndex` is `B# - 1` / the
exercise's position minus 1. B15 (the duplicate בָּא `WORD_EXAMPLE`,
`sourceIndex: 14`) is already held out in `src/data/lessons/bet.json` for a
separate reason (duplicate content + tokenized Firebase audio URL) and is not
re-litigated here.

## 1. Flagged blocks and exercises

### B4 — "some letters can be pronounced in two different ways"

> In modern Hebrew, some letters can be pronounced in two different ways,
> depending on whether they contain a small dot called a "dagesh." This dot
> significantly affects pronunciation. One such letter is Bet (בּ).

**Problem:** `ARTICULATION_TRADITION`. "Some letters" is vague and, read on
its own, could imply the dagesh-driven [b]/[v]-type alternation is common
across the alphabet. In Modern Hebrew it is audible for Bet, Kaf and Pe only
(Gimel/Dalet/Tav historically alternated too but don't audibly in Modern
pronunciation).

**Proposed correction:** "In modern Hebrew, three letters — Bet, Kaf and Pe —
can be pronounced in two different ways, depending on whether they contain a
small dot called a 'dagesh.' One of them is Bet (בּ)."

**Confidence:** Needs native review (scope of "two different ways" across the
begadkefat letters is a judgment call for a beginner lesson).

### B5 — Bet with dagesh, missing image description

> When Bet has a dagesh, it is pronounced [b] — a strong plosive sound like
> the "b" in "book."

Raw source `description` field for this `TEXT_IMAGE` block is `""` (empty).

**Problem:** Missing image description (flagged in the content audit).
`[b]`/"book" is an accurate, low-risk English analogy — no wording issue
here, only the missing alt text.

**Proposed correction:** Fill the description with the text already drafted
in `src/data/lessons/bet.json`'s `illustrations["4"].equivalent`: "Bet with a
dot (dagesh) in its center, pronounced [b]." (`sourceIndex` 4 in that file is
this block.)

**Confidence:** High — restates existing, already-approved illustration text;
no new pronunciation claim.

### B7 vs. B16 — Kamatz/Patah naming inconsistency for the same mark in בָּא

> B7: The Hebrew word 'בָּא' [ba] means 'comes' in English. The first letter,
> Bet (בּ), has a dagesh and **a kamatz gadol** (ָ) underneath, resulting in
> the [ba] sound. Aleph (א) is silent in this case...

> B16: The Hebrew word 'בָּא' [ba] consists of Bet (בּ) and Aleph (א). The Bet
> has a dagesh, indicating a strong [b] sound. **A patach** (ַ) beneath it
> gives the [ba] sound. The Aleph does not have a vowel and remains silent.

**Problem:** Same printed word, same mark (ָ, the T-shaped Kamatz), named
correctly in B7 ("kamatz gadol") and incorrectly in B16 ("patach" — a
different mark, the horizontal line ַ). This is the naming inconsistency the
content audit's manual-findings table calls out. Unlike the Aleph
Kamatz-vs-Patah vowel-length question (a pedagogical/tradition choice), this
is a factual labeling error: B16 names the wrong symbol.

**Proposed correction:** In B16, replace "A patach (ַ) beneath it gives the
[ba] sound" with "A kamatz (ָ) beneath it gives the [ba] sound," matching B7
and the actual niqqud shown in the word.

**Confidence:** High — B7's naming is internally consistent with the glyph
ָ and with B11/B14's use of "kamatz"/"kamatz gadol" for the same mark; B16 is
the outlier.

### B8 — "always written with a dagesh" at word start

> **Important Note:** When Bet appears at the beginning of a word, it is
> always written with a dagesh and pronounced as [b].

**Problem:** `SILENCE_OR_ABSOLUTE_CLAIM` / word-start absolute rule. Directly
contradicted by this lesson's own Q7, whose explanation says "exceptions
exist in certain grammatical contexts." A beginner reading B8 alone has no
reason to expect Q7's caveat.

**Proposed correction:** "Important Note: Bet at the beginning of a word is
almost always written with a dagesh and pronounced [b] — later lessons cover
the small set of grammatical exceptions."

**Confidence:** Needs native review for how (or whether) to name the specific
exceptions at this level; the contradiction with Q7 itself is high
confidence.

### B9 — Bet without dagesh, missing image description

> Without a dagesh, Bet is pronounced [v] — a soft sound like the "v" in
> "video."

Raw source `description` field for this `TEXT_IMAGE` block is also `""`.

**Problem:** Missing image description, same as B5. The [v]/"video" analogy
itself is fine.

**Proposed correction:** Use `illustrations["8"].equivalent` from
`src/data/lessons/bet.json`: "Bet without a dot (dagesh), pronounced [v]."

**Confidence:** High, same basis as B5.

### B11 — אֲבָל, vowel-length terminology

> The Bet (ב) without a dagesh, combined with a kamatz gadol (ָ), results in
> [va].

**Problem:** `ARTICULATION_TRADITION`. "Kamatz gadol" (long vs. short kamatz)
is a Masoretic/traditional-grammar distinction not realized as a length
difference in Modern Hebrew pronunciation — the same open issue
`hebrew-alphabet-lesson-1-editorial-review.md` left outstanding for Aleph
("Vowel length needs review"). Secondary, minor clarity point: the sentence
credits the vowel+no-dagesh combination together for "[va]," which is
accurate but could be split out for a beginner.

**Proposed correction:** No wording change proposed until the Aleph
vowel-length decision is made (should apply consistently to both lessons);
flag for the same native-review pass.

**Confidence:** Needs native review — tied to the still-open Aleph
vowel-length decision, not resolvable independently for Bet.

### B14 — אַבָּא, "a kamatz... produces [ba]"

> A patach (ַ) under the first Aleph gives the [a] sound, and a kamatz (ָ)
> under the Bet produces [ba].

**Problem:** Minor imprecision — it is the dagesh (not the kamatz alone) that
supplies the [b] onset; the kamatz alone gives [a]. Same conflated phrasing
pattern as B7, so not a new inconsistency, just worth tightening if B7/B16
are touched anyway.

**Proposed correction:** "...and a dagesh with a kamatz (ָ) under the Bet
produce [ba]."

**Confidence:** Medium — a style/clarity nit, not a factual error or a
blocker.

## 2. True/False exercises (Q2, Q4, Q7, Q9)

| # | Prompt (abridged) | Answer | Flag |
|---|---|---|---|
| Q2 | Bet with dagesh sounds like [b] in "boat" | True | `ENGLISH_SOUND_ANALOGY` (fine) |
| Q4 | Bet without dagesh sounds like [v] in "vase" | True | `ENGLISH_SOUND_ANALOGY` (fine) |
| Q7 | Bet at word start always has dagesh and [b] | True | word-start absolute rule / exception |
| Q9 | Bet at word end loses dagesh, [v] sound | True | word-end absolute rule / exception |

**Problem (balance):** `ONE_SIDED_TRUE_FALSE` — all four of Bet's true/false
questions are keyed True, same category of flag Aleph had (all five of its
true/false statements were also True). Carried here as a cross-cutting
finding, not block-specific.

**Problem (Q7):** Self-contradictory as written — the prompt asserts
"always," but the explanation admits "exceptions exist in certain
grammatical contexts," so a strict reading of "always" should be False, not
True. This is the same absolute-claim pattern as B8 (same underlying rule,
restated as a question).

**Proposed correction (Q7):** Reword the prompt to drop "always" — "When the
letter Bet (ב) appears at the beginning of a word, does it usually have a
dot (Dagesh) and sound like [b]?" — keeping the answer True and the existing
explanation. Alternative: keep "always" and flip the answer to False with an
explanation naming the exceptions; rewording the prompt is the gentler,
more beginner-appropriate fix and matches the B8 correction above.

**Confidence:** Needs native review for which grammatical exceptions (if
any) are worth naming at this level; the prompt/explanation contradiction
itself is high confidence.

**Problem (Q9):** "In traditional Hebrew, Bet does not have a Dagesh at the
end of a word, so it is pronounced as [v]" is stated as an unqualified rule.
Word-final Bet without a dagesh is the default outcome of post-vocalic
spirantization, but (as with Q7) beginner-level "always" framing invites the
same kind of exception a native reviewer may want to flag (e.g. doubled/
geminate forms, loanwords).

**Proposed correction:** Soften to "In traditional Hebrew, word-final Bet is
almost always written without a dagesh, so it is pronounced [v]." or confirm
no exception is pedagogically relevant at this level and leave as-is.

**Confidence:** Needs native review.

**Problem (Q11, Q12 compatibility with earlier flags):** Q11 ("Hataf Patah
... short, reduced [a] sound") and Q12 ("Kamatz Gadol appears as a small
'T'-like symbol") restate the same traditional vowel-length terminology and
unintroduced-mark distractors (Q12's options צֵ, מֻ use marks not taught in
this lesson) that Aleph's Q3 carried under `vowel-length` /
`unintroduced-letters`. No new decision needed beyond what the Aleph review
already opened; flagging for consistency so both lessons resolve together.

**Confidence:** Needs native review (tied to the same open Aleph decisions).

## 3. Proposed `copy` for the `TODO-EDITORIAL` fields in `src/data/lessons/bet.json`

Proposal only — **not applied**. Mirrors `src/data/lessons/aleph.json`'s
`copy` shape and tone. `stageMap.theory` is `[0, 1, 2]` (B1 `MAIN_TITLE`, B2
`SIMPLE_TEXT` general pronunciation intro, B3 `SUBTITLE` "Double Letters"),
so `secondSectionHeading` precedes B2 and `thirdSectionHeading` precedes B3,
the same way Aleph's precede its theory blocks 1 and 2.

```json
"copy": {
  "theory": {
    "heading": "Meet Bet",
    "intro": "The second letter of the <a href=\"/blog/hebrew-alphabet-complete-guide/\">Hebrew alphabet</a>. Bet is one of a few letters that can make two different sounds.",
    "objectivesHeading": "What you’ll learn",
    "objectives": [
      "Recognize Bet: <bdi class=\"hebrew\" lang=\"he\" dir=\"rtl\">ב</bdi>.",
      "Tell Bet with a dagesh (<bdi class=\"hebrew\" lang=\"he\" dir=\"rtl\">בּ</bdi>, [b]) apart from Bet without one (<bdi class=\"hebrew\" lang=\"he\" dir=\"rtl\">ב</bdi>, [v]).",
      "Read the dagesh in real words like <bdi class=\"hebrew\" lang=\"he\" dir=\"rtl\">אַבָּא</bdi> (father)."
    ],
    "secondSectionHeading": "How Bet sounds",
    "thirdSectionHeading": "One letter, two sounds"
  },
  "examples": {
    "heading": "Bet with and without the dagesh",
    "intro": "Compare Bet with the dagesh dot and without it, then see both forms in real Hebrew words."
  }
}
```

**Confidence:** Medium — tone/structure match Aleph's approved copy, but
wording is a content proposal pending owner/editorial sign-off, same caveat
`hebrew-alphabet-aleph-release-readiness.md` applied to Aleph's copy before
it was approved.

## 4. SEO proposals

### 4.1 Bet (`/learn/hebrew-alphabet/bet/`)

Primary keyword (per `docs/seo/core/clusters.csv` row
`hebrew-letters-individual-lessons--bet` and `keywords.csv` row 148): **"bet
hebrew letter"** (volume 720, KD 1, SERP-validated, highest priority_score
in the cluster at 25.8). No conflicts found — this is the cluster's own
`is_cluster_primary: yes` row, no other `pages.csv`/`keywords.csv` row
targets this URL.

- **Title tag:** `Bet Hebrew Letter (ב): Sound, Dagesh & Practice | HebrewEdu`
  (63 chars before " | HebrewEdu"; keyword-first, names the lesson's actual
  topic — the dagesh — unlike the current `lesson.title`-derived tag,
  "Mastering Bet/Vet (ב/בּ) and Understanding Dual Pronunciations |
  HebrewEdu," which omits "hebrew letter" and runs long for a SERP title).
- **Meta description:** `Learn the Hebrew letter Bet (ב): how the dagesh dot
  changes its sound between [b] and [v], with beginner explanations,
  example words and interactive practice.` (keyword near the front; avoids
  committing to an exercise count given the Q13 `MATCH_PAIRS` holdout
  history and B15 holdout noted in §0).
- **H1 / on-page heading:** `Bet Hebrew Letter (ב): Dagesh, Sound & Practice`
  (parallel structure to the title tag, as Aleph's H1 "Exploring Aleph (א)
  and Hebrew Diacritical Marks" parallels its own title tag).
- **Secondary keywords already reserved for this URL** (`keywords.csv` rows
  148–153): `vet hebrew letter`, `hebrew bet pronunciation`, `hebrew letter
  bet sound`, `learn hebrew letter bet`, `bet hebrew letter exercises`, `bet
  with dagesh` — no change needed, these already target
  `/learn/hebrew-alphabet/bet/`.

### 4.2 Aleph (`/learn/hebrew-alphabet/aleph/`) — retitle to include its primary keyword

Current title, `Aleph: three vowel marks | HebrewEdu`, does not contain
"aleph hebrew letter," the page's own documented primary keyword
(`clusters.csv` row `hebrew-letters-individual-lessons--aleph`, `volume 530,
KD 15`). Proposed, parallel to the Bet treatment above:

- **Title tag:** `Aleph Hebrew Letter (א): Vowel Marks & Practice | HebrewEdu`
- **Meta description:** keep the existing `Exploring Aleph: The Foundation
  of the Hebrew Alphabet` (already live in `pages.csv` row 23 and serving as
  `lesson.description`) unless the owner also wants the keyword pulled into
  the description; if so: `Learn the Hebrew letter Aleph (א) and its three
  vowel marks — Patah, Kamatz Gadol and Hataf Patah — with beginner
  explanations and interactive practice.`
- **H1 / on-page heading:** `Aleph Hebrew Letter (א): Vowel Marks & Practice`
  (current: `Exploring Aleph (א) and Hebrew Diacritical Marks`)

**Risk check:** Aleph is `published` with live GSC impressions
(`pages.csv` notes "hebrew alphabet query, GSC last 28 days pulled
2026-10-14"); a title/H1 change is a live-page edit; mirrors (but is
separate from) the Bet release and should be sequenced as its own
`keywords.csv`/`pages.csv` update once approved, not bundled silently into
the Bet release.

### 4.3 Alphabet guide overlap ("bet vs vet")

`src/content/blog/hebrew-alphabet-complete-guide.md`'s `## Two-Sound
Letters: Bet/Vet and Shin/Sin` section (anchor
`#two-sound-letters-betvet-and-shinsin`, line 157) already covers the Bet/Vet
dagesh distinction in brief, and `keywords.csv` row 47 ("bet vs vet
pronunciation") targets that guide page, not the Bet lesson. This overlaps
the Bet lesson cluster's `vet hebrew letter` / `hebrew bet pronunciation`
rows (148–153) without a `cannibalization_note` in `clusters.csv` today.

**Proposed correction:** Add one link from the guide's existing **ב
(Bet/Vet)** bullet (line 161) to the Bet lesson once published — e.g. append
"→ [Practice Bet/Vet in the Hebrew Alphabet Course](/learn/hebrew-alphabet/bet/)"
— rather than rewording the guide's brief mention. This keeps the guide
generic/comparative and lets the lesson page own the detailed explanation,
the same relationship the guide already has with the published Aleph lesson
elsewhere in that file.

**Confidence:** High on the linking mechanism (mirrors existing guide→course
links in the same file); the exact link text is a style call, not a content
risk.

## 5. Release checklist for Bet

Flags to flip in `src/data/alphabet-course.json`'s Bet entry (`sourceId: 2`),
once editorial sign-off exists for §1/§2 above:

- `editorialApproved`: `false` → `true`
- `published`: `false` → `true`
- `publishedAt`: `null` → an explicit date string

Already correctly set and needing **no** change: `sourceImported: true`,
`webImplemented: true`, `previewAvailable: true` (the generic
`[lesson].astro`/`normalize-lesson.mjs <slug>` pipeline landed since
`docs/lesson-bet-audit-2026-10-14.md` was written — Bet already has a real
route, unlike that audit's "Not reusable yet" state).

**Validation gate:** `validatePublicationManifest` in
`src/lib/alphabet-course.mjs` requires `supportedLessonRoutes.has('bet')`
(satisfied — it's derived from `readdirSync(src/content/lessons/)`, and
`bet.json` is already there) and re-runs
`validateWeeklyReleaseLimit` across every `published` lesson's
`publishedAt`. Aleph published `2026-10-11`; picking a `publishedAt` for Bet
in the same ISO week as any other third lesson would trip the ≤3-per-week
cap — check the current week's other `published: true` dates in
`alphabet-course.json` before choosing Bet's date.

**Hub effect:** `/learn/hebrew-alphabet/` reads `curriculum()`/
`lessonEnabled()` generically — Bet's card becomes a live link automatically
once `published: true`; no hub code or copy change needed.

**Sitemap effect:** `courseSitemapEntries()`/`courseSchema()` in
`alphabet-course.mjs` already filter `config.lessons.filter(item =>
item.published)` generically — Bet is included in `sitemap.xml` and the
course `LearningResource` schema automatically once published, no code
change.

**Prev/next links:** `[lesson].astro` already computes `previousNav`/
`nextNav` generically from `lessonMeta.order ± 1` and `lessonEnabled()`.
Once Bet is `published`, Aleph's page will automatically show a working
"Next: Bet ב →" link (today it falls back to "Back to all lessons" since
Bet isn't enabled for `published` yet), and Bet's page will show "← Previous:
Aleph א." No template change needed — only the publication flags above.

**Alphabet guide link:** apply §4.3's one-line addition to the guide's
Bet/Vet bullet at (or after) Bet's publish, not before — linking to an
unpublished/`noindex` route would be a dead/soft-404 link in the interim.

**`keywords.csv`/`pages.csv` updates**, once Bet publishes:
- `keywords.csv` rows 148–153 (`status` column): `planned` → `published` for
  the six Bet-targeting rows.
- `clusters.csv` row `hebrew-letters-individual-lessons--bet`: `status`
  `planned` → `published`.
- Add a `pages.csv` row for `https://hebrewedu.com/learn/hebrew-alphabet/bet/`
  mirroring row 23 (Aleph's), using §4.1's title/H1/meta description
  proposals and `status: published`.
- If the Aleph retitle in §4.2 is also approved, update `pages.csv` row 23's
  `title`/`h1`/`meta_description` columns in the same pass and re-run
  `npm run seo:build` once, after both edits, not twice.

**Weekly release limit:** confirmed generic/no code change
(`validateWeeklyReleaseLimit`, ≤3 new lessons per ISO week, Mon–Sun) —
only a scheduling constraint on the `publishedAt` date chosen above.

## 6. Owner approval

Reviewed by the owner 2026-10-14. Mirrors the Aleph owner override
(`docs/hebrew-alphabet-lesson-1-owner-override-review.md`): native review
can follow later; this is the current acceptance gate for Bet's release.

Decisions, applied via `src/data/lessons/bet.json`'s `contentOverrides`
(never by editing the pinned raw snapshot — see `docs/LESSON_PIPELINE.md`):

- **B4, B5, B9, B14, B16**: the §1 proposed corrections, accepted as
  written. B5/B9 were already satisfied by the existing `illustrations`
  overrides (the raw `description` field is never carried through
  normalization; the illustration `equivalent` text is the actual alt
  text). B4, B14, B16 are now `contentOverrides.blocks` entries.
- **B8**: owner-authored replacement (not §1's proposed wording): "At the
  start of a word, Bet has a dagesh and is pronounced [b]. When a prefix
  such as ו (and) is attached, it can change to [v], as in וּבָנִים
  [u-vanim]."
- **Q7**: prompt reworded "always" → "usually"; answer stays True; kept
  the existing explanation and appended the וּבָנִים example.
- **Q9**: flipped to a False statement — "At the end of a word, Bet
  usually sounds like [b]." / False / "Word-final Bet is almost always
  pronounced [v], as in לֵב [lev]." This also satisfies the course-wide
  True/False-balance rule (`docs/hebrew-alphabet-editorial-rules.md`):
  Bet's four True/False exercises are no longer all True.
  `contentOverrides.exercises["8"].correctAnswer` flips the answer key
  alongside the prompt/explanation.
- **Vowel length** (B11, Q11, Q12, and Aleph's equivalent open items):
  keep the mark names, remove length claims, all pronounced [a] in
  Modern Hebrew — applied consistently to both lessons.
  - Bet B11 (block, sourceIndex 10) names "kamatz gadol" but makes no
    length claim; no change needed.
  - Bet Q11: removed "short," from the explanation, keeping "It
    represents a reduced [a] sound."
  - Bet Q12: not a length issue — its distractors (צֵ, מֻ) use marks not
    taught in this lesson, the same `unintroduced-letters` category
    Aleph's Q3/Q8/Q12 carry. Flagged (`exerciseFlags["12"]`), not
    reworded, mirroring Aleph's treatment.
  - Judgment call beyond the enumerated list: Bet Q13's explanation also
    had a length claim ("Hataf Patah is a much shorter [a]"), in the same
    `MATCH_PAIRS` exercise reviewed above — reworded to "Hataf Patah is a
    reduced [a]" for internal consistency with Q11 and the new
    course-wide rule. Flag if this should have stayed in scope.
  - Aleph: B9 (sourceIndex 8) was the only block that actually stated a
    length claim ("traditionally described as a very brief vowel... you
    do not need to distinguish vowel lengths"); reworded to "In Modern
    Hebrew, it is pronounced [a], the same as Patah and Kamatz Gadol."
    Every other Aleph passage either uses "reduced [a]" as a category
    label or explicitly disclaims a length distinction — both acceptable
    per the new rule — so no further Aleph change was made.
- **Bet copy**: §3's proposed `copy` block applied as written, replacing
  the `TODO-EDITORIAL` placeholders.

SEO (§4, no brand suffix — `CLAUDE.md`/`AGENTS.md` now state this rule for
lesson pages; `[lesson].astro` no longer appends " | HebrewEdu"):
- Bet: title "Bet Hebrew Letter (ב): Sound & Dagesh", meta description per
  §4.1, H1 "Bet Hebrew Letter (ב): Dagesh, Sound & Practice" (the H1 is a
  `contentOverrides.blocks["0"]` override of the `MAIN_TITLE` block, since
  the lesson-level `title` only feeds `<title>`/`og:title`).
- Aleph: retitled per §4.2's keyword version — title "Aleph Hebrew Letter
  (א): Vowel Marks", meta description "Learn the Hebrew letter Aleph (א)
  and its three vowel marks — Patah, Kamatz Gadol and Hataf Patah — with
  beginner explanations and interactive practice.", H1 "Aleph Hebrew
  Letter (א): Vowel Marks & Practice". This is a live-page edit to an
  already-published, GSC-indexed page, approved by the owner alongside
  Bet's release rather than sequenced separately.
- §4.3: added a link from the alphabet guide's Bet/Vet bullet to
  `/learn/hebrew-alphabet/bet/`, added at publish time (not before, per
  §5's note on not linking to an unpublished route).

**Publication**: `src/data/alphabet-course.json`'s Bet entry —
`editorialApproved: true`, `published: true`, `publishedAt: "2026-10-14"`.
Aleph published `2026-10-11` (ISO week of 2026-10-05); Bet publishes
`2026-10-14` (ISO week of 2026-10-12) — different weeks, so the
three-per-week cap isn't at issue either way.
