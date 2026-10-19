# FR localization audit (read-only)

Scope per `docs/seo/research/fr/FR_RESEARCH.md`: FR home, alphabet hub,
22 letter lessons, printable PDF page, cursive page. EN stays at current
URLs, unchanged, no redirects.

## 1. Routing & URLs

| Option | Shape | Fit here |
|---|---|---|
| Astro `i18n` config (`defaultLocale`/`locales`, `routing.prefixDefaultLocale: false`) | `en` unprefixed (unchanged), `fr` under `/fr/` | Matches "EN unchanged" requirement exactly |
| Manual `src/pages/fr/**` tree (no `i18n` config) | Hand-built parallel routes | More control over localized slugs than the built-in router gives today; no automatic locale-aware `getRelativeLocaleUrl` helpers |
| Single route + `[locale]` param | One dynamic tree for both | Breaks "EN URLs unchanged" — EN currently has no `/en/` prefix |

**Recommendation:** manual `src/pages/fr/**` tree, not `astro:i18n`. Reasons:
current routes (`learn/hebrew-alphabet/[lesson].astro`,
`learn/hebrew-alphabet/[...hub].astro`) already use custom `getStaticPaths`
+ a manifest-driven enable/preview gate (`src/lib/alphabet-course.mjs`) that
`astro:i18n`'s routing middleware doesn't know about. A parallel
`src/pages/fr/**` set that imports the *same* lesson-rendering logic with a
`locale` prop avoids fighting the i18n router's slug/locale assumptions.

| Current (EN) | Proposed FR | Localized slug |
|---|---|---|
| `/` | `/fr/` | — |
| `/learn/hebrew-alphabet/` (hub) | `/fr/apprendre/alphabet-hebreu/` | `alphabet-hebreu` |
| `/learn/hebrew-alphabet/<slug>/` (lesson) | `/fr/apprendre/alphabet-hebreu/<slug>/` | letter slugs stay Latin-transliterated (`aleph`, `bet`, …) — no French-spelling slug change needed, French *display* name differs from slug (research table: "Aleph (not Alef)" etc.) |
| none | `/fr/apprendre/alphabet-hebreu/cursif/` | new page, French-only for pilot |
| none | `/fr/apprendre/alphabet-hebreu/pdf-a-imprimer/` | new page, French-only for pilot |
| `/play/**` | *(unlinked, stays English — §6)* | n/a |

Each `src/pages/fr/...astro` file is a thin wrapper: import the same
content-collection lesson + the same Astro components as the EN route, pass
`locale="fr"` to `Layout`, pull copy from `src/i18n/fr.ts` instead of
hardcoded English. No duplicate business logic.

## 2. Hardcoded English inventory

| File | Area | Rough string count | Notes |
|---|---|---|---|
| `src/layouts/Layout.astro` | `<html lang="en" dir="ltr">`, `og:locale`, default title/description fallback | ~5 | locale must become a prop, not hardcoded |
| `src/components/Nav.astro` | nav labels, `aria-label="Primary"`, `"Open menu"` | ~8 | labels come from a `navLinks` data array (not found as hardcoded literals in the file itself — confirm its source file) |
| `src/components/Footer.astro` | footer link text, `"Privacy choices"` | ~10 | |
| `src/components/Faq.astro` | heading, no built-in copy found beyond prop-driven `a`/`q` — used per-page | ~2 (component-level) | content is passed by the page, not stored in the component |
| `src/components/ConsentBanner.astro` | `"Privacy policy"`, `"Decline"`, `"Accept"`, banner body text | ~6 | needs FR legal-accurate copy, not just translation (consent wording is regulated) |
| `src/pages/learn/hebrew-alphabet/[lesson].astro` | breadcrumb "Hebrew Alphabet", stage labels (Theory/Examples/Practice/Results), "Step N of 4", "Next: Examples", "Next: Practice", results panel ("Your practice results", "Overall score…", "Correct"/"Attempted"/"Incorrect"/"Unanswered", "Review mistakes", "Answer unanswered", "Try again", "Next lesson: …", "Back to the course"), noscript fallback, session note | ~20 | highest string count; all currently inline JSX text, not from a dictionary |
| `src/pages/learn/hebrew-alphabet/[...hub].astro` | stage descriptions, resource cards (title/tag/text ×4), hero copy | ~15 | |
| `src/components/ui/StoreButtons.astro` | none hardcoded — pulls `label` from `site.stores.*` | 0 (data-driven) | only `site.ts` labels need an FR variant |
| `src/pages/privacy.astro`, `terms.astro`, `website-privacy.astro` | full legal body text | large (full documents) | translation + legal review, not just UI strings; likely out of pilot scope — EN legal pages can stay the governing version with a note, or pilot ships without FR legal pages (flag as open decision) |
| 404 handling | **no `src/pages/404.astro` exists** | n/a | Astro emits no custom 404 today; add one only if in scope — not currently part of EN either |

**Proposed dictionary structure:**

```
src/i18n/
  en.ts        // typed dictionary, mirrors current hardcoded EN strings
  fr.ts        // same keys, French values
  index.ts     // getDictionary(locale) -> typed lookup, locale union type
```

Keyed by section, not flat: `nav.*`, `footer.*`, `consent.*`, `lesson.stage.*`,
`lesson.results.*`, `hub.*`. Each `.astro` file that currently inlines
English text takes a `locale` prop (default `'en'`) and does
`const t = getDictionary(locale)`, replacing literals with `t.lesson.results.heading`
etc. EN behavior is a pure no-op (same strings, now routed through the
dictionary instead of inlined) — **zero visual/content change to EN pages**,
pure refactor risk only.

## 3. Lesson pipeline — FR export spec

**Current EN snapshot shape** (from `docs/LESSON_PIPELINE.md` +
`.local/lesson-snapshots/`):

- Raw snapshot: `.local/alphabet-course-imports/v1/<importId>/raw/lesson-<N>.raw.json`
  — fetched by `scripts/import-alphabet-course.mjs` from
  `https://api.hebrewedu.com/api/lessons/<source_lesson_id>/?lang=en`
  (the `?lang=en` query param is the only locale signal in the whole
  pipeline today — confirm the API supports `?lang=fr` before anything else).
- Identity: `scripts/alphabet-course/owner-letter-map.v2.json` — slug,
  `source_lesson_id`, `order`, `letter` (glyph). Language-agnostic; the
  glyph and order are the same for FR.
- Schema factory: `src/lib/lessons/schema.mjs`'s `createLessonSchema` —
  cross-checks identity against the owner map, validates block/exercise
  shape. Language-agnostic structurally; doesn't validate string content
  by language.
- `normalize-lesson.mjs <slug>` — verifies raw snapshot SHA-256, checks
  unsupported-content holdouts, writes `src/content/lessons/<slug>.json`.
- Editorial data file `src/data/lessons/<slug>.json` — `title`,
  `description`, `editorialIssues`, `illustrations`, `blockFlags`,
  `exerciseFlags`, `contentOverrides`, `stageMap`, `copy` (theory/examples
  headings + intro + objectives), `holdOuts`, `source` (pinned snapshot
  path + SHA).

**What is language-specific vs. structural:**

| Element | EN | FR equivalent needed |
|---|---|---|
| Raw snapshot source | `?lang=en` API fetch | New raw snapshot per letter, `?lang=fr` (or separate import flow if the API has no FR locale) — **must pin into its own `.local/alphabet-course-imports/v1/<fr-importId>/`**, never overwrite the EN raw snapshot |
| `owner-letter-map.v2.json` identity (slug/order/glyph/sourceId) | shared | **Reused as-is** — same 22 letters, same glyphs, same `source_lesson_id` if the API's `?lang=fr` serves the same lesson IDs in French; confirm this assumption with the admin API before building |
| Schema (`schema.mjs`) | structural | **Reused as-is**, no change |
| `normalize-lesson.mjs` | structural | **Reused as-is**, but output path must differ: `src/content/lessons/<slug>.fr.json` (or a `locale` field + per-locale directory) — current code assumes one content file per slug, needs a small path-suffix change, which is in-scope code work, not covered by "reuse as-is" |
| Editorial data file `copy` fields | English theory/examples headings, intro, objectives | **Fully re-authored in French** — not translated by the pipeline automatically; a human/editorial step per letter, same as EN's own editorial review |
| `contentOverrides`/`holdOuts`/`blockFlags` | tied to raw `sourceIndex` of the *EN* raw snapshot | **Independent per FR raw snapshot** — if FR source content differs in block count/order from EN (likely, since it's a separate CMS entry), holdouts and overrides must be freshly derived from the FR raw snapshot's own indices, not copied from EN's data file |
| SEO title pattern | `"<Letter> Hebrew Letter (<glyph>): <topic>"`, ≤60 chars, no brand | FR pattern per research: `"<glyph> <Lettre française> hébreu : <sujet>"` or similar — needs its own ≤60-char, no-brand rule; use research's preferred French spellings table (Aleph not Alef, Beth not Bet, Guimel not Gimel, Heth not Het) |
| Transliteration/pronunciation guidance | English phonetic conventions | French phonetic conventions differ (e.g. "kh" vs French "r" sound mapping) — editorial rules doc needs an FR-specific companion or an added section, not a straight translation of `docs/hebrew-alphabet-editorial-rules.md` |

**FR export spec (what the admin must produce, precisely):**

1. One raw snapshot JSON per letter, fetched with the French-locale query
   param, saved under a FR-labeled import directory — same JSON shape as
   the EN raw snapshot (so the existing schema validates it unchanged).
2. Confirm `source_lesson_id` values match EN's `owner-letter-map.v2.json`
   (same 22 lessons, French variant) — if the API uses different lesson
   IDs for FR, identity.mjs needs a per-locale manifest, which is
   additional scope beyond "reuse as-is."
3. A separate editorial data file per letter with FR `copy`, FR
   `illustrations` labels, and holdouts/overrides derived from the FR raw
   snapshot's own `sourceIndex` values (not reused from EN).
4. Normalize script extended (small, mechanical change) to write to a
   locale-suffixed content path.
5. Everything else — schema, block/exercise renderers (`StudyBlock.astro`,
   `Practice.astro`), MATCH_PAIRS/TRUE_FALSE mechanics — reused unchanged.

## 4. SEO

| Area | Current | FR change |
|---|---|---|
| `docs/seo/core/*.csv` locale support | No locale column; implicitly all-EN (`market` column in `keywords.csv` is already `US/en`, suggesting the schema anticipated other markets) | Add explicit `locale` (or reuse `market`, e.g. `FR/fr`) column to `pages.csv` and `keywords.csv` rather than separate `pages-fr.csv` files — keeps `seo:build`'s single-source-of-truth model from `CLAUDE.md` intact |
| `scripts/seo/build-core.mjs` | Validates/builds one locale's worth of rows | Needs to either (a) filter/validate per-locale without code change if a locale column is added and validation doesn't assume `US/en`, or (b) small validation-logic update to not reject FR rows — check the script before assuming zero code change |
| Title rule | No brand suffix (`CLAUDE.md`) | Same rule applies to FR titles — carry forward, don't relax |
| hreflang | None present (`Layout.astro` head has no `hreflang` links today) | Add `<link rel="alternate" hreflang="en" href=".../en-url/">`, `hreflang="fr"`, and `hreflang="x-default"` (→ EN) on every page that has a counterpart; pages without a FR counterpart (most EN pages in the pilot) emit no alternate links |
| Canonical | `Layout.astro` computes `new URL(Astro.url.pathname, Astro.site)` | Works unchanged per-locale since each FR page is its own route — no change needed |
| Sitemap | Single `sitemap.xml.ts`, all EN `staticPages` + course entries | Add FR pages to the same sitemap (one sitemap, mixed locales, is standard) via a small addition, not a new file — `courseSitemapEntries()` would need a locale-aware variant or a second FR-specific entry list |
| `html lang` | Hardcoded `lang="en" dir="ltr"` in `Layout.astro` | Must become `lang={locale}` — FR has same `dir="ltr"` so no RTL concern (only the embedded Hebrew `<bdi lang="he" dir="rtl">` stays as-is) |
| Open Graph locale | Hardcoded `og:locale` = `en_US` | Must become `fr_FR` on FR pages — add `og:locale:alternate` pointing back to `en_US` on the FR pages (and vice versa optionally) |

## 5. Analytics & stores

| Area | Current | FR change |
|---|---|---|
| `track()` (`src/lib/analytics.ts`) | `track(event, params)`, no locale param | Add `locale` to the params object at call sites (not inside `track()` itself — it's a thin pass-through to `gtag`) so GA4 reports can segment by locale; alternatively set it once as a GA4 user/page property via `AnalyticsHead.astro` rather than threading it through every `track()` call — recommend the latter (one place, `AnalyticsHead.astro`, sets `page_locale` or similar as a custom dimension) |
| Google Play link | `site.stores.googlePlay.url` — no `&hl=` param | Append `&hl=fr` for the FR pages' store link (or make `StoreButtons.astro` locale-aware and append the param conditionally) |
| App Store | Single global URL, no locale variant in `site.ts` | Apple App Store FR localization is normally handled server-side by Apple from the device/region, not a URL param — confirm whether a `/fr/app/...` App Store URL variant is actually needed, or whether the existing URL already serves localized metadata to FR users. Likely no code change needed here, unlike Google Play. |
| Consent banner text | English, in `ConsentBanner.astro` | Needs FR translation reviewed for GDPR/French CNIL wording accuracy, not a casual translation — flag as needing a French-literate legal reviewer, not pure engineering |

## 6. Games (stay English for pilot)

- `/play/alef-bet-rush/`, `/play/hebrew-mahjong/`, `/play/hebrew-word-search/`
  stay English-only, unchanged.
- FR hub page and FR lesson pages that currently link/reference games
  (hub's `resources` array in `[...hub].astro`) should still link to the
  same `/play/**` URLs, but with a French *label* and a short note that the
  game is in English (e.g. "Jeu de reconnaissance des lettres (en anglais)")
  — label-only translation, no new game routes, no game UI changes.

## 7. Skill: `add-letter-lesson` locale support

| Change needed | Why |
|---|---|
| Accept a `locale` parameter (default `en`) when the user says e.g. "add Gimel in French" | Currently assumes EN and a single content path per slug |
| Step 1 (pick letter) must check a locale-aware published/weekly-limit source, not just `src/data/alphabet-course.json`'s global `published` flags | FR letters publish independently of EN letters |
| Step 2 (build) must read from the FR raw snapshot path (§3) and write to the locale-suffixed content path | Avoids silently overwriting EN content |
| Step 3 (editorial review) needs an FR-specific companion to `hebrew-alphabet-editorial-rules.md`, or an explicit "this rule is language-neutral / this rule is EN-specific" annotation per rule | Some rules (vowel-length claims, True/False balance) are language-neutral; others (specific wording fixes) are EN-text-specific and don't apply to FR copy |
| Step 4 (SEO) needs the FR title pattern (§3) and a locale-aware `docs/seo/core` row (§4) | |
| Step 5 (double check) grep for "no other letter's name" must run against the FR letter-name list (research table's preferred French spellings), not the EN letter names | |

**Weekly limit per locale or shared — recommendation: per-locale, independent counters.**
Rationale: FR publishing cadence is a separate editorial effort (translation
+ review, not just normalization) with its own bottleneck; tying it to the
same shared counter as EN would stall FR letters behind EN's publishing
pace for no technical reason, and the "3/week" cap exists to bound
editorial review load per language, which doesn't transfer across
languages.

## 8. Phased plan

| Stage | Scope | Risk | Effort | Shippable alone? |
|---|---|---|---|---|
| **A — i18n infra + dictionary** | `src/i18n/{en,fr}.ts`, refactor Nav/Footer/ConsentBanner/lesson route/hub route to read from dictionary with `locale='en'` default; `Layout.astro` takes a `locale` prop (default `en`); no FR pages exist yet, no routes added | Low (pure refactor; EN output must be byte-identical — verify via build diff) | Medium | Yes — ships with zero visible change |
| **B — FR hub + home** | `/fr/`, `/fr/apprendre/alphabet-hebreu/` pages; hreflang EN↔FR + x-default; sitemap entries; `docs/seo/core` locale rows for these 2 pages; `og:locale: fr_FR` | Medium (first real FR content, French copywriting needed, legal-adjacent consent banner text) | Medium–High | Yes — hub can retarget existing EN copy's French equivalent without needing lessons yet |
| **C — FR lessons via skill** | Extend `add-letter-lesson` per §7; FR raw snapshots per letter (confirm API `?lang=fr` support first — **blocking unknown**); 22 lesson pages, published incrementally under the per-locale weekly limit | High (depends on unverified API locale support; largest content-translation effort; editorial review doubles) | High | Yes, incrementally — each letter ships independently like EN did |
| **D — PDF + cursive pages** | New `/fr/apprendre/alphabet-hebreu/pdf-a-imprimer/` and `/fr/apprendre/alphabet-hebreu/cursif/` pages | Low-medium (net-new static content, no pipeline dependency) | Medium | Yes |

**What EN gets for free:** the cursive-script page (Stage D) targets a
real, unaddressed English-side gap too — nothing in the current EN site
covers cursive Hebrew script as its own page. Building the FR cursive page
first and porting the structure to an EN equivalent is cheap incremental
value, not required by this pilot but worth flagging to the owner as a
same-shape EN opportunity once D ships.

**Blocking unknown — resolved (2026-10-19).** Verified against the app admin:
`https://api.hebrewedu.com/api/lessons/<id>/?lang=fr` returns actual French
lesson content, under the same `source_lesson_id` as the EN snapshot and
the same raw JSON shape the schema already validates (confirmed for Aleph,
id 1). So Stage C is "reuse the existing import with `lang=fr`," not a new
content-authoring flow — `owner-letter-map.v2.json` identity (slug, order,
glyph, `source_lesson_id`) is reused unchanged per §3's identity row; only
the fetch URL's `lang` query param changes per locale.

One naming wrinkle this surfaces: the app's own lesson text spells the
letter **"Alef"**, but FR search demand (§ research) favors **"Aleph"**
(`alphabet hébreu` SERP table: "Aleph (not Alef)"). Per CLAUDE.md's SEO
rules, SEO-facing fields (title, meta description, H1, `pages.csv`/
`keywords.csv` rows) use the search spelling ("Aleph"); in-lesson body copy
stays whatever the FR raw snapshot's own editorial text uses. This is the
same kind of app-vs-SEO spelling split EN already has for other letters
(e.g. editorial review decides canonical in-body spelling per
`docs/hebrew-alphabet-editorial-rules.md`) — not a new category of problem,
just confirmed to recur in FR.
