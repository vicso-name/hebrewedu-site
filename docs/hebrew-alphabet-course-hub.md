# Hebrew Alphabet Course Hub — local implementation and recovery

Completed 2026-10-11. Existing work was resumed and preserved. Nothing was deployed,
committed or pushed. No API import, paid SEO request or additional keyword research ran.

**Local preview:** [http://127.0.0.1:4326/learn/hebrew-alphabet/](http://127.0.0.1:4326/learn/hebrew-alphabet/).
The loopback server serves the opt-in compiled preview at
`/private/tmp/hebrewedu-alphabet-course-preview`. Start Learning opens the existing
Aleph POC at `/learn/hebrew-alphabet/aleph/`.

## Result

The hub uses the existing lavender page background, white cards, neutral glyph surfaces,
restrained purple CTA/focus colors and the existing Hebrew Rubik subset. Latin typography
and the approved Aleph lesson styles/content are unchanged.

The initial static HTML contains the beginner course proposition, all 22 ordered curriculum
cards, Theory → Examples → Practice → Results explanation, contextual guide/game links,
and the existing StoreButtons component. The 21 unavailable cards contain no anchors,
buttons or tab stops. No image/audio capability, certificate, completion time or app-progress
sync claim was introduced. Curriculum identities match the verified owner manifest, including
the settled ID 4 → Dalet → `dalet` mapping.

The header's **Alphabet Course** entry follows the existing desktop and mobile conventions.
It has `aria-current="page"` on the hub and `aria-current="location"` within the lesson area.
Keyboard opening, link navigation, visible focus, Escape focus restoration and responsive
menu reset are tested. The additional link uses the mobile menu through 1100px to avoid
compressing tablet navigation; the existing 768px breakpoint remains for normal builds
where the draft course entry is absent.

## Responsive issue recovered and fixed

The interrupted check identified `.nav-burger` extending to **391.375px** in a 390px viewport
with the root text size enlarged to 200%. The existing header's rem-based spacing expanded
along with the wordmark. The fix is limited to `alphabet-course.css` under `.course-hub`:

- Allow header links to wrap and the header to grow above its usual 68px minimum when
  enlarged desktop text needs another line. At ordinary text size its usual height remains.
- Use a small mobile header gap and viewport-bounded gutters, leaving room for the enlarged
  wordmark and menu button at 320px as well as 390px.
- Allow the first-lesson card's paragraphs to wrap long words in their narrow column when
  text is enlarged. No source text was edited.

No global `overflow-x: hidden`, clipped teaching text or reduced learning-text zoom was used.
All four requested widths now have no horizontal overflow at both normal and 200% text size.
The enlargement check changes the root font size; it is not a physical-device zoom claim.

## Publication configuration and sitemap

`src/data/alphabet-course.json` is an explicit, separately maintained release configuration.
It distinguishes verified identity/order/slug, source import availability, implemented web
route, preview availability, editorial approval, published status and real publication date.
All 22 sources are marked imported; **all 22 lessons and the hub remain unpublished and
editorially unapproved**. Only Aleph has an implemented/allowlisted preview route.

Two contexts are deliberately separate:

| Context | Hub / header | Clickable lessons | Indexing / sitemap |
| --- | --- | --- | --- |
| Ordinary production build with current configuration | Hub route and course header entry absent | No course lessons | Hub and all lessons absent from sitemap |
| Development or explicit local preview | Hub and course header entry visible | One preview lesson: Aleph | Both draft routes use noindex; sitemap still excludes them |
| Later, independently approved release | Requires hub approval and an approved published Aleph route | Only explicitly approved, implemented, published lessons | Only approved public hub/lesson URLs, with recorded release dates |

Thus the one clickable lesson in the **local preview** is not a declaration of publication.
The public curriculum helper returns zero available lessons today. Importing files, changing
source import availability or enabling a preview flag cannot add public links/sitemap entries.
The hub refuses a launch with a broken Start link. Unimplemented lesson publication fails
validation; lessons 2–22 have no generated pages or public links.

`src/lib/alphabet-course.mjs` is shared by route gating, navigation, curriculum and sitemap
integration. A lesson cannot publish without source availability, implemented route and
independent editorial approval. Release-date validation enforces at most **three new lessons
per Monday–Sunday ISO week**, including weeks crossing a year boundary. Future releases
must maintain accurate publication records and explicitly implement/allowlist each new route.
No imported JSON snapshot is consulted by this release gate.

The hub uses a rest-route file, `[...hub].astro`, whose only generated path is the hub index.
An ordinary static index file would render even while draft; this approach permits zero
generated paths until approval. The existing Aleph route guard now uses the same explicit
configuration. Its current local UX, metadata, noindex status and editorial holds are retained;
public title/canonical/indexing are prepared conditionally without enabling that mode.

## Metadata and structured data

Based on the existing Semantic Core v2 course intent and keyword-to-URL responsibilities:

| Element | Value / decision |
| --- | --- |
| H1 | Learn the Hebrew Alphabet Step by Step |
| Title | Hebrew Alphabet Course for Beginners \| HebrewEdu |
| Description | Learn the Hebrew alphabet step by step with beginner explanations, examples and interactive practice. Start with Aleph and explore the 22-letter learning path. |
| Canonical | `https://hebrewedu.com/learn/hebrew-alphabet/` |
| Current robots | `noindex, nofollow, noarchive` |
| Draft JSON-LD | WebPage with absolute URL, unique name/description and English language |
| Prepared release JSON-LD | WebPage + Course + ItemList; Course parts/list entries include only actual approved published lessons |

There are zero published lessons today, so draft JSON-LD does **not** advertise a published
22-module course. The future approved-launch branch is tested with a single published Aleph
fixture: one LearningResource and one ItemList entry. It adds no ratings, instructor,
audio, certificate, duration or CourseInstance claims, and makes no rich-result guarantee.

The Alphabet Guide retains its chart/names/count/final-form reference intent and canonical.
The hub owns the structured learning path and start action. The Nikud Guide retains general
vowel-system reference intent. Both games retain their existing recognition/matching roles.
Existing blog copy, keyword mappings, guide canonicals and Semantic Core v1/v2 files were
not edited. No guide backlink was added automatically.

## Validation

| Check | Result |
| --- | --- |
| Node tests | **22 passed, zero failed**: five course/publication tests, ten importer tests, seven existing Aleph tests |
| Ordinary production build | Pass: **28 Astro pages**, 31 HTML files including game assets; Hub and Aleph excluded |
| Opt-in course preview build | Pass: **30 Astro pages**, including Hub and Aleph only |
| Build API isolation | Both builds ran with a lesson-API request guard; no lesson fetch/import occurred |
| Chromium layout | Pass: 320, 375, 390 and 1440px; also each width at 200% text enlargement |
| WebKit layout | Pass: 390px, navigation, static teaching links and Rubik/RTL glyph checks |
| Curriculum | All 22 identities/order values match; exactly one linked preview card, 21 non-interactive Coming Soon cards |
| Header | Desktop/mobile active entry, keyboard Enter, tab order, visible focus, Escape and tablet-to-desktop reset pass |
| Teaching without JavaScript | Hub copy, all curriculum cards and Aleph start anchor remain static HTML |
| Links | Every distinct internal hub/header/footer link and fragment checked returns 200 / resolves locally |
| Store destinations | Match the original official App Store and Google Play URLs in `src/data/site.ts`; badges render; no remote store fetch was needed |
| Hebrew | Existing Rubik Hebrew asset loads, RTL isolation remains, letter spacing is normal; pointed Aleph forms אַ / אָ / אֲ still render in the lesson |
| Contrast | Main text tokens meet AA: minimum **4.57:1**; white primary-button text **6.29:1**; nav focus/page **4.22:1** |
| Aleph browser regressions | Existing full suite passes: all 14 source positions, all three exercise types, correct/incorrect/retry/skips, stage state, results, three editorial holds, mobile/no-JS/zoom-equivalent/WebKit checks |
| Existing production pages | All pre-hub main content, page metadata, canonicals and JSON-LD match; original public game/assets unchanged; shared navigation/CSS bundle hashes legitimately differ |
| Sitemap | Original sitemap bytes unchanged in the current ordinary build; preview flags never add course entries |
| Exposure | No lessons 2–22 routes/links, raw snapshot, raw answer objects, editorial registry or unapproved source media exposed in either build |
| Browser runtime | No page exceptions or lesson API/source-media requests |

Evidence: [hub/browser/build regression results](../.local/course-hub/validation.json),
[unit tests](../.local/course-hub/unit-validation.log),
[contrast checks](../.local/course-hub/contrast-validation.json),
[existing Aleph browser suite](../artifacts/lesson-1-poc/guided/validation.json).
Build logs and the pre-change production baseline are retained under `.local/course-hub/`.

The original POC artifact checker assumes no incoming course links and byte-identical
shared-header bundles. Those historical assertions are intentionally superseded for this
authorized hub/header addition by `check-alphabet-course-hub.mjs`; no baseline was reset to
conceal changed page content. The new checker compares original main content and SEO fields
while allowing the approved shared-navigation change, and retains draft/exposure/count checks.
Token contrast and automated keyboard checks are not a full assistive-technology audit;
physical-device VoiceOver/TalkBack review remains available to the owner.

## Screenshots

All screenshots are local review artifacts outside deployment assets.

| View | Screenshot |
| --- | --- |
| Desktop hub, full page | [1440px](../.local/course-hub/screenshots/hub-chromium-1440.png) |
| Desktop hero and header | [1440px](../.local/course-hub/screenshots/hub-top-chromium-1440.png) |
| Mobile hub, full page | [390px](../.local/course-hub/screenshots/hub-chromium-390.png) |
| Mobile hero and header | [320px](../.local/course-hub/screenshots/hub-top-chromium-320.png), [375px](../.local/course-hub/screenshots/hub-top-chromium-375.png), [390px](../.local/course-hub/screenshots/hub-top-chromium-390.png) |
| Curriculum cards | [Desktop](../.local/course-hub/screenshots/curriculum-chromium-1440.png), [mobile](../.local/course-hub/screenshots/curriculum-chromium-390.png) |
| Open mobile navigation and keyboard focus | [390px](../.local/course-hub/screenshots/header-chromium-390.png) |
| 200% enlarged text | [320px](../.local/course-hub/screenshots/hub-text-200-percent-320.png), [375px](../.local/course-hub/screenshots/hub-text-200-percent-375.png), [390px](../.local/course-hub/screenshots/hub-text-200-percent-390.png), [1440px](../.local/course-hub/screenshots/hub-text-200-percent-1440.png) |
| WebKit mobile | [Hub](../.local/course-hub/screenshots/hub-webkit-390.png), [header](../.local/course-hub/screenshots/header-webkit-390.png) |
| Existing pointed Hebrew in Rubik | [Chromium](../.local/course-hub/screenshots/aleph-rubik-niqqud-chromium-390.png), [WebKit](../.local/course-hub/screenshots/aleph-rubik-niqqud-webkit-390.png) |

## Files changed for the hub task

Added:

- `src/data/alphabet-course.json` — explicit identity/import/editorial/publication configuration.
- `src/lib/alphabet-course.mjs` — validated release gates, preview allowlist, curriculum,
  publication-limited schema and sitemap entries.
- `src/pages/learn/hebrew-alphabet/[...hub].astro` — static, gated hub implementation.
- `src/styles/alphabet-course.css` — scoped layout, Hebrew font reuse and enlargement fix.
- `tests/alphabet-course-hub.test.mjs` — identity, preview/publication isolation, approval,
  structured-data and weekly release-limit tests.
- `scripts/check-alphabet-course-hub.mjs` — original-page regression checks, exposure checks,
  responsive/keyboard/metadata/link/font validation and screenshots.
- `docs/hebrew-alphabet-course-hub.md` — this review report.

Modified:

- `src/components/Nav.astro` — gated course entry, current-location indication and tablet fit.
- `src/layouts/Layout.astro` — optional robots override; existing pages retain their default.
- `src/pages/sitemap.xml.ts` — approved-only course entries; none emitted today.
- `src/pages/learn/hebrew-alphabet/[lesson].astro` — shared explicit route/publication gate and
  conditional public metadata; current Aleph learner content/layout unchanged.

Existing uncommitted import/POC changes, including `.gitignore`, Astro configuration, content
collection, Aleph styles/content and editorial findings, were preserved. Private snapshots
were not overwritten. Generated screenshots/builds/test records are ignored local artifacts.

## Remaining owner decisions before publication

1. Review and approve the hub copy/design and the exact Aleph learner edition to release.
2. Resolve or explicitly approve the retained Aleph editorial holds: Q4 `1742106507820`,
   Q11 `1742106507827`, Q14 `1742106507830`, plus withheld pronunciation wording and the
   reviewed Unicode/text equivalents. No replacement prompt or pronunciation decision
   was invented. See [the Aleph editorial report](hebrew-alphabet-lesson-1-editorial-review.md).
3. Record independent editorial/publication approvals and real release dates in the explicit
   manifest before enabling indexable routes. Media remains withheld unless independently
   approved. Deployment still requires a subsequent instruction.

There is no remaining responsive/build blocker. The broader course audit's renderer,
localization, malformed-placeholder, answer and media issues still apply to lessons 2–22;
they do not authorize or trigger their publication. See [the course audit](hebrew-alphabet-course-content-audit.md).

## Reproduce

```sh
node --test tests/*.test.mjs
npm run build
HEBREWEDU_LOCAL_COURSE_PREVIEW=1 npm run build -- --outDir /private/tmp/hebrewedu-alphabet-course-preview
python3 -m http.server 4326 --bind 127.0.0.1 --directory /private/tmp/hebrewedu-alphabet-course-preview
```

In another terminal, use the already installed Playwright module:

```sh
PLAYWRIGHT_MODULE=/Users/kasutaja/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs \
COURSE_WEBKIT=1 node scripts/check-alphabet-course-hub.mjs
PLAYWRIGHT_MODULE=/Users/kasutaja/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs \
LESSON_POC_URL=http://127.0.0.1:4326 LESSON_POC_WEBKIT=1 node scripts/check-lesson-1-browser.mjs
```

The hub regression checker uses the retained pre-change `.local/course-hub/production-before.json`.
Do not replace that baseline to suppress a failure. `HEBREWEDU_LOCAL_LESSON_POC=1` remains
compatible with the course preview. Ordinary builds require neither preview flag and never
fetch lesson content.

Stopped for owner review. **No public release is enabled.**
