# HebrewEdu — Lesson 1 POC: Guided Learning UX

Updated 2026-10-11. **Local, unpublished review only.** The existing Aleph POC now follows **Theory → Examples → Practice → Results**. No SEO research, API reads, other lesson imports, deployments, commits or pushes were performed.

[Open the development preview](http://127.0.0.1:4325/learn/hebrew-alphabet/aleph/).
[Open the compiled static preview](http://127.0.0.1:4324/learn/hebrew-alphabet/aleph/).

## Latest revision — calmer color hierarchy

Completed 2026-10-11. **Visual-only refinement:** the approved layout, mobile vertical/desktop horizontal navigation, Rubik typography and lesson behavior remain unchanged. Primary actions retain purple, as do selected-answer states and keyboard focus. Hebrew glyphs and examples use `--ink`; decorative labels use `--ink-light`; secondary navigation uses `--ink-mid`. Active-stage labels are dark and bold, with a thin neutral number outline. Earlier-step numbers have a soft neutral fill; upcoming numbers retain their neutral outline. These presentation cues continue to use the existing stage attribute and do not introduce completion tracking.

The lesson's supporting panels and Hebrew tiles use a single scoped `--lesson-soft` surface, derived from existing `--border` and `--white` tokens using `color-mix`. Callout lines use `--border-dark`. Progress labels, progress fill and Results typography are neutral. Existing semantic correct/incorrect feedback colors are preserved. No new hardcoded hex colors were introduced. The slightly lavender page background and white instructional cards are unchanged.

**Files changed in this revision:**

- `src/styles/lesson-poc.css`: the scoped color hierarchy described above; active number outline reduced from 2 px to the requested restrained 1 px.
- `docs/hebrew-alphabet-lesson-1-poc.md`: this report and screenshot comparisons.

All other source files and the raw snapshot are byte-identical to their state before this revision, including the Rubik asset/license, font declarations, lesson markup, content, grading/state logic, tests, route guard, shared styles and configuration. All 11 blocks, 14 source exercise records and the holds on questions 4, 11 and 14 are preserved.

Before/after **Examples** screenshots, captured from the same local compiled route at matching viewport sizes:

| Width | Before | After |
|---|---|---|
| Mobile, 320 px | [Before](../artifacts/lesson-1-poc/color-hierarchy/before-examples-320.png) | [After](../artifacts/lesson-1-poc/color-hierarchy/after-examples-320.png) |
| Mobile, 390 px | [Before](../artifacts/lesson-1-poc/color-hierarchy/before-examples-390.png) | [After](../artifacts/lesson-1-poc/color-hierarchy/after-examples-390.png) |
| Desktop, 1440 px | [Before](../artifacts/lesson-1-poc/color-hierarchy/before-examples-1440.png) | [After](../artifacts/lesson-1-poc/color-hierarchy/after-examples-1440.png) |

Additional local captures cover all four stages at 320, 390 and 1440 px under `artifacts/lesson-1-poc/color-hierarchy/`, including a [selected-answer state](../artifacts/lesson-1-poc/color-hierarchy/after-selected-answer-390.png). Screenshots and verification JSON remain ignored review artifacts outside deployment assets.

| Validation | Result |
|---|---|
| Appearance/reflow | All four stages checked at 320, 390 and 1440 px without horizontal overflow; Examples screenshots inspected on mobile and desktop. Layout, Rubik and niqqud remain intact. |
| Lesson text contrast | All visible enabled lesson text checked across the four stages at the requested widths. Minimum measured ratio: **4.57256:1**. White primary-button text: **6.28753:1**. |
| Essential non-text contrast | Active-number outline passes 3:1. Purple focus versus page/white/neutral surfaces: **5.94688:1 or higher**; selected-answer border versus its light surface: **5.62293:1**. Neutral progress value versus track: **8.32520:1**. |
| Feedback contrast | Existing correct feedback text: **7.29408:1**; incorrect feedback: **8.74845:1**. |
| Keyboard focus | Primary Next and stage buttons retain visible 3 px purple focus outlines. Tab/Shift+Tab/Enter navigation and Space selection pass; selected radio choices retain purple borders and visible focus. |
| Node tests | All seven existing tests pass, including all 14 source answer mappings. |
| Browser regression | Existing Chromium/WebKit suite passes: all 14 positions, 11 available questions, correct/incorrect/retry/skip behavior, state preservation, scoring and keyboard feedback. All stages pass at 320/375/390/1440 px, enlarged text, zoom-equivalent reflow and without JavaScript. No runtime errors. |
| Build/regression | Normal and opt-in local builds pass. All 215 original production artifacts remain byte-identical; the normal build excludes the lesson. No sitemap/public links or raw/unapproved media exposure. |

Contrast checks use computed browser foreground/background colors and the WCAG relative-luminance formula. Thresholds are **4.5:1 for normal text**, from [W3C SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), and **3:1 for essential component/state visuals**, from [W3C SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Decorative card/tile/divider boundaries are not essential controls. These are focused checks of the lesson palette and keyboard focus, not a claim of complete WCAG conformance or physical-device/screen-reader testing.

Evidence: [color/contrast/focus checks](../artifacts/lesson-1-poc/color-hierarchy/after-validation.json), [before capture checks](../artifacts/lesson-1-poc/color-hierarchy/before-validation.json), [browser regression](../artifacts/lesson-1-poc/guided/validation.json), [build regression](../artifacts/lesson-1-poc/build-validation.json), [source-change comparison](../artifacts/lesson-1-poc/color-hierarchy/source-change-validation.json). The extra visual/contrast checks ran from a temporary local script; no dependencies or permanent tests were added.

Outstanding content approvals remain in the [unchanged editorial report](hebrew-alphabet-lesson-1-editorial-review.md). **Stopped for review.** No lesson API reads, SEO research, deployment, commits or pushes were performed.

## Previous revision — visual polish

Completed 2026-10-11. This revision changes only lesson presentation and font assets. Stage navigation is vertical at widths up to 580 px and remains horizontal on desktop. Mobile rows fill the container, with aligned number/label pairs and consistent spacing. The active number has an unfilled 2 px purple outline and purple text; the row retains a subtle highlight. Earlier-stage numbers have a light tint and upcoming numbers retain their neutral outline. These are visual sequence cues using the existing `aria-current` attribute; no completion tracking or navigation behavior was added.

Hebrew now uses a self-hosted **Rubik Hebrew-only variable WOFF2**, covering weights 400–700 in one **9,352-byte** asset. Only Hebrew spans select this font; the site's Latin fonts are unchanged. RTL isolation, NFC normalization, normal letter spacing and the original Unicode characters are preserved. The existing `#F8F8FF` page background and white cards remain unchanged.

Files changed **for this visual revision**:

- `src/styles/lesson-poc.css`: mobile navigation layout, active-number outline, earlier-step tint and scoped Rubik font face.
- `src/assets/fonts/rubik-hebrew-variable.woff2`: new Hebrew subset font asset.
- `src/assets/fonts/Rubik-OFL.txt`: new original SIL Open Font License and copyright notice.
- `docs/hebrew-alphabet-lesson-1-poc.md`: this report and current screenshot links.

No lesson data, source snapshot, Astro markup, interaction/grading code, tests, shared styles, configuration or other pages changed in this revision. All 11 blocks and 14 source exercise records remain intact, with questions 4, 11 and 14 held as before. Outstanding editorial issues remain in the [unchanged editorial report](hebrew-alphabet-lesson-1-editorial-review.md).

| Validation | Result |
|---|---|
| Existing Node tests | All seven pass; all 14 original answer mappings preserved. |
| Existing browser suite | Pass: all four stages and 14 positions; all 11 available questions tested with incorrect/correct answers and retry; state, results, skips and keyboard feedback preserved. |
| Requested widths | All four stages pass at 320, 375, 390 and 1440 px without horizontal overflow. Additional visual checks verify stacked full-width rows on mobile and a horizontal desktop row. |
| Rubik coverage | Chromium's rendered-font inspection verifies 127 Hebrew runs across headers, theory, examples and available exercise choices. All use the custom Rubik font; no fallback font is used. The font's internal variable-family name is `Rubik Light`. |
| Pointed Hebrew | All 16 distinct learner-facing runs render in Rubik, including אַ, אָ, אֲ, צֵ, גַ, מֻ, פַּ, שׂ and טְ. Screenshot inspection found no missing glyphs, clipped marks or detached niqqud. WebKit also loads Rubik and displays the three Aleph examples correctly at 390 px. |
| Accessibility/reflow | Existing keyboard, visible-focus, feedback/live-region and no-JavaScript checks pass. All stages also pass 200% text-size and zoom-equivalent layout-reflow checks. Physical-device zoom and native screen-reader testing are not claimed. |
| Builds/protection | Normal and opt-in local builds pass. Normal build excludes the lesson; sitemap/public links remain unchanged. No raw snapshot or unapproved media is exposed. All 215 original production artifacts are byte-identical. |

Astro also emits the unused generic lesson CSS, interaction script and new font asset in the normal build, as it previously emitted the generic lesson CSS/script. No lesson page or grading payload is included in that build, and existing production pages do not load these lesson assets.

Current visual evidence:

| Screenshot | Link |
|---|---|
| Mobile vertical navigation, Theory active | [320 px](../artifacts/lesson-1-poc/ui-polish/theory-320.png), [375 px](../artifacts/lesson-1-poc/ui-polish/theory-375.png), [390 px](../artifacts/lesson-1-poc/ui-polish/theory-390.png) |
| Mobile vertical navigation, Practice active | [320 px](../artifacts/lesson-1-poc/ui-polish/practice-320.png), [375 px](../artifacts/lesson-1-poc/ui-polish/practice-375.png), [390 px](../artifacts/lesson-1-poc/ui-polish/practice-390.png) |
| Desktop horizontal navigation | [Theory at 1440 px](../artifacts/lesson-1-poc/ui-polish/theory-1440.png) |
| Rubik Hebrew vowel examples | [320 px](../artifacts/lesson-1-poc/ui-polish/examples-320.png), [390 px](../artifacts/lesson-1-poc/ui-polish/examples-390.png), [WebKit at 390 px](../artifacts/lesson-1-poc/ui-polish/webkit-examples-390.png) |
| Rubik pointed exercise choices | [320 px](../artifacts/lesson-1-poc/ui-polish/pointed-exercise-320.png), [390 px](../artifacts/lesson-1-poc/ui-polish/pointed-exercise-390.png) |

Evidence: [visual/font verification](../artifacts/lesson-1-poc/ui-polish/validation.json), [rerun existing browser suite](../artifacts/lesson-1-poc/guided/validation.json), [build regression comparison](../artifacts/lesson-1-poc/build-validation.json). Screenshots and verification outputs remain ignored local review artifacts outside deployment assets. The additional font/layout inspection was run with a temporary local script; no dependency or test-suite change was added.

Font provenance: [Google Fonts Hebrew WOFF2, Rubik v31](https://fonts.gstatic.com/s/rubik/v31/iJWKBXyIfDnIV7nDrXyw023e1Ik.woff2), [original license](https://raw.githubusercontent.com/google/fonts/main/ofl/rubik/OFL.txt). Font SHA-256: `e59af50ac91644907bc91d5a94bfa3be3ec32eac618fa4f841862507b21586ae`. Only this Hebrew subset was downloaded into the project; no Latin Rubik asset or extra weight file was added.

**Stopped for review.** No educational content, API integration, SEO metadata, site navigation or other pages were modified. No lesson API reads, SEO research, paid requests, deployment, commits or pushes were performed.

## Learning flow

The compact header shows Aleph and **Lesson 1 of 22**, with four numbered stage controls. Next/Back and stage controls switch panels without changing the URL or reloading the document. Focus moves to the stage heading, and a polite status announces the new stage. Theory and Examples are rendered completely in the initial static HTML; JavaScript progressively hides inactive panels. No step URLs, course hub or new lesson system were added.

| Stage | Behavior |
|---|---|
| Theory | Introduces Aleph, learning objectives, niqqud and guttural-letter context. Source blocks 1, 2 and 8 appear here. Next: Examples advances the flow. |
| Examples | Shows אַ, אָ and אֲ with written descriptions and Unicode illustrations. Source blocks 3, 4, 5, 6, 7, 9, 10 and 11 appear here. Back: Theory and Next: Practice controls are provided. |
| Practice | Preserves the 14 source question positions and all three exercise types; one position is visible at a time. Available questions support native radio selection, checking, feedback, explanation and next-question navigation. Skipping is explicit. |
| Results | Shows correct, attempted, incorrect and unanswered counts, plus an overall percentage. Review mistakes, Answer unanswered, Retry practice and Back: Practice are provided. There is no link to an unbuilt Bet lesson. |

The block arrays and provenance remain unchanged. Grouping between stages intentionally differs from the original single article; within each group the original relative order is retained. All 11 source block IDs and five block types remain represented.

## Withheld content and unavailable questions

The owner chose to **withhold disputed wording from learner copy**, preserving it unchanged in a separate editorial report. No disputed passages are shown as quotations or verified pronunciation facts, and no editorial-review notices appear in the learner interface.

[Editorial report: exact withheld wording, source IDs and outstanding decisions](hebrew-alphabet-lesson-1-editorial-review.md).

- Study blocks 6 and 9 show their pointed form/name rather than the disputed sound comparison. Block 7 omits the disputed left/right dot-placement sentence.
- Question 3's long-vowel explanation is withheld. Its learner explanation reuses exact source block 5 describing the T-shaped mark.
- Question 10's short-vowel explanation is withheld. Its learner explanation reuses exact source block 4's Patah explanation, without a new vowel-length claim.
- **Questions 4, 11 and 14 are unavailable until replacement prompts/explanations are approved.** They remain unchanged in the validated inventory and editorial report. Their learner slots show a neutral availability message, and their answer keys are excluded from the learner grading payload.

There are **11 available questions and three unavailable positions**. The overall score is rounded `correct / 11 × 100`. Attempted means a submitted answer, not merely a selected radio choice. Unanswered means an available question without a submitted answer, including skips. Unavailable questions are listed separately and are not scored. This avoids penalizing learners for content they cannot answer.

All 14 original answer mappings are preserved and tested at the source-contract level. Browser grading validates the 11 available questions across all three exercise types; it deliberately cannot validate learner grading of the three held questions. Restoring those questions requires approved replacement wording and another focused browser check.

## State and accessibility

Practice state is kept in the current browser document's memory. Draft selections, submitted answers, explanations and the current question survive stage changes and previous-question navigation. No authentication, server storage, localStorage or mobile/cloud synchronization is added. Reloading the page resets the session.

Submission disables the question's radio controls and removes Check answer from view. After a correct response, Next question is the primary action and the question-level retry is hidden. After an incorrect response, an explicit secondary Retry this question action unlocks it. Retry practice resets all available answers from Results. Review mistakes filters incorrect submissions; Answer unanswered filters available unsubmitted questions, excluding unavailable positions.

Native labelled radio groups, legends, required selection, visible keyboard focus and polite live feedback support keyboard and screen-reader use. Focus moves to answer feedback after submission, to the first option after retry, and to the next question after question navigation. The answered-question meter has an accessible label and counts available questions.

The English document remains LTR. Hebrew uses `bdi`, `lang="he"`, `dir="rtl"`, NFC normalization and the self-hosted Rubik Hebrew font described above. No original images or audio are included. Without JavaScript, all teaching blocks, examples, available questions and unavailable positions are readable together; expandable source answers and safe explanations support checking work. Interactive Results explains that JavaScript is needed.

## Source preservation and local-only protection

- No new API request was made. The existing snapshot remains `.local/lesson-snapshots/lesson-1.raw.json`, outside deployment assets and client imports.
- Source SHA-256: `0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7`.
- Normalized JSON SHA-256, unchanged: `3cda76ed4fff40a211f59b029b6076d4d19bf11f95526ceb66c087bf55078ec3`.
- Strict source/normalized schemas, atomic offline normalization and stable answer IDs are preserved. Presentation decisions live separately in `presentation.mjs`.
- Normal production builds still emit no Aleph route. Only development or explicit `HEBREWEDU_LOCAL_LESSON_POC=1` builds include it.
- The local route retains `noindex, nofollow, noarchive`. No indexed step URLs, public internal links, sitemap entries or navigation links were added.
- Raw paths remain denied through development URLs and Vite `/@fs`; neither static build exposes the raw snapshot or original lesson media.
- All 215 original production artifacts remain byte-identical, including homepage, blog, sitemap and games. Astro emits unused generic lesson CSS/interaction assets in the normal build, but no lesson page, content payload or answer keys.

The compiled prototype is deliberately built outside normal `dist/`, at `/private/tmp/hebrewedu-lesson-1-poc-dist`, for local review. It must remain unpublished.

Static grading remains ordinary self-assessment: available answer keys and grading logic can be inspected or modified in the browser. Results are not authoritative or confidential assessment scores.

## Validation results

| Check | Result |
|---|---|
| Four stages | Pass: explicit Next/Back and stage controls; same document and URL; focused headings and stage announcements. |
| Source inventory | Pass: all 11 blocks, five block types, 14 exercise records and three exercise types preserved. Seven Node tests pass. |
| Source grading | Pass: all 14 original mappings tested for correct/incorrect answers, explicit false parsing, option reordering and NFC. |
| Available-question browser grading | Pass: all 11 available questions tested with incorrect answer, retry and correct answer; all three exercise layouts covered. |
| Unavailable positions | Pass: 4/11/14 retain question positions but expose no disputed prompts, options, grading keys or explanations to learners. |
| State preservation | Pass: draft and submitted answers survive stage changes; previous-question navigation retains answers and locks. |
| Results | Pass: all available questions correct → 11 attempted, 11 correct, 0 unanswered, 100%; mixed answers/skips produce exact counts and rounded percentage. Unavailable questions are separate and unscored. |
| Review/reset | Pass: mistake review, unanswered review, explicit retry, full reset and return to Results. |
| Keyboard/feedback | Pass: Tab, Space, arrows and Enter across all three layouts; visible focus; submitted choices locked; readable feedback focus and live status/progress semantics. |
| Widths | Pass: Theory, Examples, Practice and Results at 320, 375, 390 and 1440 px, without horizontal overflow. |
| Enlarged text/zoom reflow | Pass: all stages at 390 px with 200% root text size; all stages at half-width CSS viewports/DPR 2 corresponding to 200% layout zoom on 320/375/390/1440 screens. Hebrew marks remain visible. |
| Mobile WebKit | Pass: four-stage navigation, first-question grading and Results at 390 px. |
| No JavaScript | Pass: all teaching blocks/examples and 14 positions readable; answer disclosures work for available questions; disputed wording absent. |
| Static build | Pass: normal build excludes POC; opt-in compiled build renders it and passes browser checks. |
| Regression/isolation | Pass: all 215 original artifacts unchanged; no raw source or unapproved media exposed; no public course links/sitemap entries. |
| Runtime | Pass: no browser page exceptions; no lesson API or source-media requests. |

Evidence: [compiled browser results](../artifacts/lesson-1-poc/guided/validation.json), [development results](../artifacts/lesson-1-poc/guided/dev-validation.json), [build comparison](../artifacts/lesson-1-poc/build-validation.json).

The zoom checks emulate layout reflow; they are not a claim of physical-device browser zoom testing. Actual-device VoiceOver/TalkBack and linguistic approval remain pending.

## Screenshots

Final screenshots are local files outside deployment assets. The four-stage screenshot matrix includes the mixed-results state and practice feedback.

| Width | Theory | Examples | Practice | Results |
|---|---|---|---|---|
| 320 | [Theory](../artifacts/lesson-1-poc/guided/theory-320.png) | [Examples](../artifacts/lesson-1-poc/guided/examples-320.png) | [Practice](../artifacts/lesson-1-poc/guided/practice-320.png) | [Results](../artifacts/lesson-1-poc/guided/results-320.png) |
| 375 | [Theory](../artifacts/lesson-1-poc/guided/theory-375.png) | [Examples](../artifacts/lesson-1-poc/guided/examples-375.png) | [Practice](../artifacts/lesson-1-poc/guided/practice-375.png) | [Results](../artifacts/lesson-1-poc/guided/results-375.png) |
| 390 | [Theory](../artifacts/lesson-1-poc/guided/theory-390.png) | [Examples](../artifacts/lesson-1-poc/guided/examples-390.png) | [Practice](../artifacts/lesson-1-poc/guided/practice-390.png) | [Results](../artifacts/lesson-1-poc/guided/results-390.png) |
| 1440 | [Theory](../artifacts/lesson-1-poc/guided/theory-1440.png) | [Examples](../artifacts/lesson-1-poc/guided/examples-1440.png) | [Practice](../artifacts/lesson-1-poc/guided/practice-1440.png) | [Results](../artifacts/lesson-1-poc/guided/results-1440.png) |

Additional evidence: [100% completion](../artifacts/lesson-1-poc/guided/results-complete-1440.png), [mixed correct/incorrect/skipped](../artifacts/lesson-1-poc/guided/results-mixed-1440.png), [200% zoom-equivalent examples](../artifacts/lesson-1-poc/guided/examples-390-zoom-equivalent-200-percent.png), [mobile WebKit results](../artifacts/lesson-1-poc/guided/results-webkit-390.png). All four stages also have `*-390-text-200-percent.png` captures.

## Files changed for this revision

Modified:

- `src/pages/learn/hebrew-alphabet/[lesson].astro`: compact context, four static stages, accessible navigation and Results; existing route guard retained.
- `src/components/lessons/StudyBlock.astro`: separates learner presentation from preserved source text; removes editorial notices.
- `src/components/lessons/Practice.astro`: submitted-state actions, availability handling, safe explanations and practice progress.
- `src/lib/lessons/practice-client.ts`: stage navigation, preserved state, locked answers, scoring, review queues and reset.
- `src/styles/lesson-poc.css`: scoped mobile-first stage presentation, compact header, typography and zoom reflow.
- `scripts/check-lesson-1-browser.mjs`: four-stage browser checks, availability/state/scoring cases and screenshots.
- `scripts/check-lesson-1-artifacts.mjs`: additionally checks withheld-copy exclusion and initial static Theory/Examples.
- `tests/lesson-1.test.mjs`: verifies presentation decisions while source data stays unchanged.
- `docs/hebrew-alphabet-lesson-1-poc.md`: this updated report.

Added:

- `src/lib/lessons/presentation.mjs`: explicit display-only withholding and safe-source reuse decisions.
- `docs/hebrew-alphabet-lesson-1-editorial-review.md`: exact withheld original wording and remaining approvals.

Removed: unused `src/components/lessons/ReviewNote.astro`.

Local ignored artifacts: screenshots/results under `artifacts/lesson-1-poc/guided/`; build caches regenerated. The normalized lesson, raw snapshot, schemas, normalizer, shared homepage/blog/game files, Astro route protections, package files and Semantic Core v2 remain unchanged from the previous POC.

## Reproduce

```bash
node --test tests/lesson-1.test.mjs
npm run build
HEBREWEDU_LOCAL_LESSON_POC=1 npm run build -- --outDir /private/tmp/hebrewedu-lesson-1-poc-dist
node scripts/check-lesson-1-artifacts.mjs
npm run dev -- --host 127.0.0.1
```

Use the server's reported port; the current development preview is 4325. The current compiled preview uses the existing loopback server on 4324. If needed: `python3 -m http.server 4324 --bind 127.0.0.1 --directory /private/tmp/hebrewedu-lesson-1-poc-dist`.

```bash
LESSON_POC_URL=http://127.0.0.1:4325 \
LESSON_POC_WEBKIT=1 \
PLAYWRIGHT_MODULE=/Users/kasutaja/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs \
node scripts/check-lesson-1-browser.mjs
```

Use 4324 for compiled browser checks. Playwright is already installed locally; no dependency was installed or added to the website.

**Stopped at the revised local POC for review.** Remaining content approvals are listed separately; no other lessons or public rollout work have been started.
