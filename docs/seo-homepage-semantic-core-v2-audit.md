# HebrewEdu homepage audit against Semantic Core v2

Audit date: **2026-10-12**. Recommendation: **make targeted improvements**, while retaining the homepage's mobile-app discovery and store-conversion role.

The redesign already delivers most previously requested homepage improvements. No homepage indexing blocker or confirmed cannibalization was found in the inspected build. The clearest remaining opportunity is a controlled app-intent metadata test, supported by the existing alphabet-app query evidence. Adding a full alphabet course, chart, vowel tutorial or game catalogue to the homepage would dilute its role and duplicate stronger destinations.

## Scope, evidence and limitations

Read-only review of site source, existing research and saved measurement artifacts. The only repository file written for this task is this report. No website, research, Course Hub or Aleph changes; no keyword research, provider requests, commits, pushes or deployment.

- Source reviewed at HEAD `b7e360c5218d3820413321b0c86a8134058f6957`, including the existing working tree. Pre-existing untracked course documents/scripts/tests were left untouched.
- Ran `npm run build` in an isolated temporary copy, using installed dependencies. It passed and produced the homepage plus the released hub and Aleph routes. Inspected the fresh production-build `dist/index.html`, JSON-LD, image attributes, link destinations and sitemap. Temporary build: `/private/var/folders/fy/hr22zn8x577f1_hz80qg54vh0000gn/T/hebrewedu-homepage-audit-v2yugu8f/dist/`.
- This is a **current local production build**, not a fresh capture of the deployed website. The October 10 saved live crawl is historical evidence. Current HTTP headers, deployed-source parity, store availability by region, Google's selected canonical and present indexing status were not independently rechecked.
- Mobile/desktop assessment uses source, responsive CSS and built HTML. No new browser screenshots, interaction test, screen-reader test or field-performance measurement was performed. Content parity can be established from the shared markup; pixel layout, contrast and runtime behavior remain unverified.
- No relevant `.seo-cache/` was found. No cache or website configuration was written.

### Original research references

Research root: `/Users/kasutaja/Developer/seo-research/hebrewedu/`.

| ID | Original artifact | Use |
|---|---|---|
| R1 | [Semantic Core v1](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v1.csv) | Original 136 rows, metrics, editorial qualification and source references |
| R2 | [Semantic Core v2](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2.csv) | 309-row research edition; original v1 field values verified unchanged in its first 136 rows |
| R3 | [Keyword-to-URL map](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-to-url-map.md) | App, reference, reading and browser-game ownership |
| R4 | [SERP pilot analysis](/Users/kasutaja/Developer/seo-research/hebrewedu/serp-pilot-analysis.md) and [results](/Users/kasutaja/Developer/seo-research/hebrewedu/serp-pilot-results.csv) | October 10 US/English/mobile Android intent and observed rank |
| R5 | [Keyword difficulty](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-difficulty.csv) and [demand analysis](/Users/kasutaja/Developer/seo-research/hebrewedu/demand-analysis.md) | Measured organic difficulty versus Ads demand/competition |
| R6 | [V2 research report](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-research-report.md) and [overlap](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-alphabet-research/serp-overlap.csv) | Course/reference distinction; explicit preservation of homepage ownership |
| R7 | [Content audit v1](/Users/kasutaja/Developer/seo-research/hebrewedu/content-audit-v1.md) and [90-day roadmap](/Users/kasutaja/Developer/seo-research/hebrewedu/seo-roadmap-90-days.md) | Prior priorities and dependencies |
| R8 | [Rank Tracker complete baseline](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracker/reports/337cdd21-2385-43df-aafb-5b086da27385.md), [CSV](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracker/reports/337cdd21-2385-43df-aafb-5b086da27385.csv) and [original tracking assignments](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracking-keywords.csv) | First complete depth-20 run; distinct from historic depth-10 pilot |
| R9 | [Prior SEO audit](/private/tmp/hebrewedu-seo-audit-2026-10-10/SEO_AUDIT_RU.md), [page baseline](/private/tmp/hebrewedu-seo-audit-2026-10-10/page-baseline.csv), original [three-month GSC workbook](/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-performance-last-3-months.xlsx) and [28-day workbook](/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-performance-28-day-comparison.xlsx) | Previous homepage audit, planned changes, measured search performance; original workbook rows inspected offline |
| R10 | [Homepage UI audit](homepage-ui-audit.md) | October 2 redesign defects and component/platform recommendations; historical, not a description of today's page |

## 1. Homepage keyword ownership

**Primary:** `hebrew alphabet app`. **Conditional supporting:** `hebrew learning app`. Other app-feature phrases support truthful product copy; they are not automatically separate SEO objectives. R3 leaves `learn hebrew for beginners` without firm ownership despite the provisional homepage target retained in R1/R2 and the tracker.

The table includes **all 27 rows mapped to the homepage** in R2, not only the seven tracked queries. Each CSV line reference applies to both R1 and R2 because v1 rows are preserved. “Mapped” includes weak proposals and holds; it does not mean every phrase is approved as a primary target.

Volume = Google Ads US/English average monthly searches retrieved October 10, 2026, not visits or install potential. KD = DataForSEO organic difficulty, not Google Ads competition. Numeric KD **0** is a measured provider value. **Null** means the volume provider returned null; **unmeasured KD** means no exact difficulty value is recorded. Neither means zero demand/competition. V2 did not refresh the homepage's historical v1 volumes.

| Keyword | Research qualification / homepage responsibility | US monthly volume | Organic KD | October 10 depth-20 observation | Original reference |
|---|---|---:|---|---|---|
| `hebrew learning app` | Supporting — conditional broad app selection | 320 | 0 | Not found in returned rows | R1/R2 line 2 |
| `hebrew alphabet app` | Core — primary app-discovery owner | 30 | 4 | 7; exact homepage (18 rows) | R1/R2 line 3 |
| `best app to learn hebrew alphabet` | Explore — comparison intent; no validated comparison owner | 10 | Unmeasured | Not found in returned rows | R1/R2 line 4 |
| `best app to learn hebrew` | Explore — comparison intent; no validated comparison owner | 320 | Unmeasured | Not found in returned rows | R1/R2 line 5 |
| `hebrew learning app for iphone` | Supporting — feature/device support; weak fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 6 |
| `hebrew learning app for android` | Supporting — feature/device support; weak fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 7 |
| `offline hebrew learning app` | Explore — feature/device support; weak fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 8 |
| `hebrew learning app for english speakers` | Explore — feature/device support; unvalidated selection fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 9 |
| `hebrew app with structured lessons` | Supporting — feature/device support; weak fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 10 |
| `hebrew learning app with audio` | Supporting — feature/device support; weak fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 11 |
| `hebrew vocabulary app` | Supporting — feature/device support; weak fit | 10 | Unmeasured | Not found in returned rows | R1/R2 line 12 |
| `hebrew reading app` | Supporting — feature/device support; weak fit | 20 | Unmeasured | Not found in returned rows | R1/R2 line 13 |
| `hebrew learning app for self study` | Supporting — feature/device support; weak fit | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 16 |
| `hebrewedu` | Supporting — brand/product navigation | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 17 |
| `learn hebrew for beginners` | Supporting in CSV; provisional in map — no firm ownership | 320 | Unmeasured | Not found in returned rows | R1/R2 line 20 |
| `hebrew vowel reading exercises` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 68 |
| `hebrew reading practice for beginners` | Explore / weak — app-only feature hypothesis, not web answer ownership | 10 | Unmeasured | Not tracked / unmeasured | R1/R2 line 74 |
| `hebrew short stories with english translation` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 75 |
| `hebrew reading with audio` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 76 |
| `hebrew vocabulary pronunciation practice` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 94 |
| `hebrew food vocabulary for beginners` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 95 |
| `hebrew verb practice` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 115 |
| `hebrew demonstrative pronouns` | Explore / weak — app-only feature hypothesis, not web answer ownership | 10 | Unmeasured | Not tracked / unmeasured | R1/R2 line 116 |
| `ze vs zot in hebrew` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 117 |
| `how to say my and mine in hebrew` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 118 |
| `hine meaning in hebrew` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 119 |
| `hebrew sentence building exercises` | Explore / weak — app-only feature hypothesis, not web answer ownership | Null | Unmeasured | Not tracked / unmeasured | R1/R2 line 120 |

GSC aliases `app to learn hebrew alphabet` and `learn hebrew alphabet app` are consolidated under the core alphabet-app row. They have observed GSC data below, but no separate exact-query volume/KD claim is made. Do not add variant volumes together.

### Saved Search Console evidence

Original workbook filters are **Web / all countries and devices**, with “Last 3 months” and “Last 28 days.” The three-month chart spans July 7–October 6. The prior audit reconstructs the comparison as September 9–October 6 versus August 12–September 8; those calendar windows are inferred, not explicit workbook filter values.

| Homepage Pages row | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| Three months | 31 | 862 | 3.60% | 9.72 |
| Latest 28 days | 15 | 346 | 4.34% | 8.47 |
| Previous 28 days | 4 | 267 | 1.50% | 10.14 |

These are **homepage metrics**, distinct from the property's three-month 1,400 impressions and latest 28-day 541 impressions. All clicks in the saved Pages tables were on the homepage. The figures predate the new Course Hub and cannot measure its effect or establish the effect of the October 10 resource links.

| Disclosed Queries row | Three-month clicks / impressions / position | Latest 28-day clicks / impressions / position |
|---|---|---|
| hebrew alphabet app | 1 / 29 / 7.55 | 1 / 11 / 6.18 |
| app to learn hebrew alphabet | 0 / 23 / 8.04 | 0 / 8 / 6.25 |
| learn hebrew alphabet app | 0 / 8 / 8.62 | 0 / 6 / 9.50 |
| best app to learn hebrew alphabet | 0 / 3 / 19.00 | 0 / 1 / 16.00 |

The first three phrases total 60 three-month impressions; including the “best” query gives the prior audit's 63. These property-level query rows **do not establish query × homepage attribution**. Separate Pages, Queries, Countries and Devices tables cannot be joined to fabricate US/mobile/page-specific performance. Privacy-filtered/undisclosed queries remain unavailable.

### Rank Tracker baseline

R8 and the read-only SQLite run record establish a complete run starting **2026-10-10 20:44:02 UTC**, Google US `2840`, English, mobile Android, requested depth 20. It contains 36 attempted queries and no previous comparable complete run.

`hebrew alphabet app` observed the exact homepage at organic rank **7**, with 18 returned organic rows. It also appeared at rank 7 in the earlier October 10 13:10:55 UTC depth-10 pilot. These are two same-day observations, not a stable multi-day trend. The other six tracked homepage phrases were absent from their returned organic rows (16–18 rows depending on query). “Not found” does **not** establish rank >20, no indexing or no demand. The remaining 20 mapped phrases have no complete-run ranking observation.

## 2. Current metadata, hierarchy and indexability

Sources: [homepage entry](../src/pages/index.astro), [site data](../src/data/site.ts), [layout](../src/layouts/Layout.astro), [app schema](../src/data/schema.ts), home components and fresh built HTML.

| Element | Verified production-build value |
|---|---|
| Title | `Learn the Hebrew Alphabet & Read Hebrew | HebrewEdu` — 51 characters |
| Meta description | `Learn the Hebrew alphabet step by step, practise vocabulary and verbs, and start reading beginner Hebrew with audio and translation.` — 132 characters |
| H1 | `Learn Hebrew, starting with the alphabet.` — exactly one |
| Hero eyebrow | `A Hebrew learning app for beginners` |
| Hero lead | `Start with the Hebrew alphabet and pronunciation, then build vocabulary and grammar through lessons and exercises. Practise reading with audio and translation.` |
| Primary CTA | App Store and Google Play badges, directly linking to the stores |
| Canonical / og:url | `https://hebrewedu.com/` |
| Robots | `index, follow`; public robots.txt allows `/` and identifies the sitemap |
| Sitemap | Homepage included; editorial lastmod `2026-10-10` |
| Language / viewport | `lang="en"`, `dir="ltr"`; responsive viewport present |
| Social metadata | OG and Twitter title/description/image present; `summary_large_image`; `/og-image.png` exists in build |

Metadata communicates learning benefits but omits **app** and platforms. The nearby eyebrow and badges already resolve this for visitors. The title's reference-like wording creates a plausible search-snippet opportunity, not a proven ranking defect. A 132-character description is not inherently a defect and should not be padded to meet an arbitrary count.

### Heading hierarchy, in document order

| Level | Heading(s) |
|---|---|
| H1 | Learn Hebrew, starting with the alphabet. |
| H2 | Build a foundation in Hebrew |
| H3 | Learn the foundations; Practice what you learn; Remember what matters; Read real Hebrew |
| H2 | Build your Hebrew skills step by step |
| H3 | Start with the foundations; Turn knowledge into skill; Master verbs and binyanim; Build vocabulary that stays with you |
| H2 | A guide for your next step |
| H3 | Learn the Hebrew alphabet; A seven-day alphabet plan; Read Hebrew vowel marks; Free Hebrew learning games — linked resource headings |
| H2 | When you're ready, start reading real Hebrew. |
| H3 | Read with support, not guesswork |
| H2 | Built for consistent progress |
| H3 | Structured lessons; Review difficult material; Learn at your own pace |
| H2 | What learners say |
| H2 | Frequently asked questions |
| H2 | Ready to start learning Hebrew? |

No skipped heading levels. FAQ questions use native `<summary>` rather than extra headings. Journey panels are all in static HTML, although only the selected panel is visually exposed. There is no need to make every H2 repeat a keyword.

### Structured data

One parseable JSON-LD graph contains `WebSite`, `MobileApplication` and `FAQPage`. The application is named **Learn Hebrew – Read & Speak**, with HebrewEdu/Alef-Bet Tutor aliases, EducationApplication category, Android/iOS, both download URLs, author, screenshot and feature list. The referenced screenshot exists. Its free offer is a price-0 download offer; this does not establish that all learning content is free. Do not broaden the visible promise without product evidence.

All three schema FAQ questions/answers match the rendered FAQ through the shared [FAQ data](../src/data/faq.ts). No invented aggregate rating is emitted. Existing review stars are individual testimonial displays. JSON parsing and content correspondence are verified; rich-result eligibility, Google recognition and current platform feature parity are not established by this build. No new FAQ/schema expansion is needed for keyword coverage.

No homepage noindex, wrong canonical domain, missing sitemap entry or missing SEO-critical static text was found. The saved October 10 crawl recorded HTTP 200, matching canonical, index/follow and no blocking X-Robots-Tag. Current host headers and Google's chosen canonical remain unknown; HTML eligibility is not proof of indexing.

## 3. Search-intent alignment

**Alphabet-app discovery: strong.** Alphabet-first messaging, pronunciation/Nikud, actual product screenshots, beginner path, supporting reading/vocabulary/verb features and direct stores match R3/R4's app-discovery intent. The observed homepage rank and disclosed GSC wording support retaining this role. Exact `hebrew alphabet app` is not in the title/H1, but meaningful app/alphabet coverage exists; exact-match repetition is unnecessary.

**Broad Hebrew-app selection: partial but appropriate as supporting intent.** R4 mixes product/store pages, app carousels, roundups and discussion. The homepage explains one product's suitability, not alternatives or an independent comparison. Its feature coverage has improved, but that does not resolve all commercial comparison expectations. Do not add “best” claims or build a comparison section merely to absorb the two Explore terms.

**General beginner learning: intentionally narrower.** The homepage describes an app learning path, not a complete public course. The existing research's failed beginner SERP remains an intent-data gap; the depth-20 tracking absence supplies no page-format validation. The new Course Hub solves an alphabet-specific structured-learning task, not all beginner Hebrew, and should not automatically inherit `learn hebrew for beginners`.

**Reading/vocabulary/grammar: truthful product support.** Copy and screenshots explain app features. They do not provide a browser story library, language-definition answers or a general verb exercise tool. Weak app-only mappings are research hypotheses, not missing homepage sections. Offline capability and iOS/Android feature parity need product-specific confirmation before stronger claims; missing null-volume phrases do not justify expansion.

## 4. Internal linking and conversion

| Destination | Built homepage anchor / placement | Assessment |
|---|---|---|
| `/learn/hebrew-alphabet/` | Alphabet Course — desktop and mobile navigation | Released hub is discoverable; currently no contextual resource-row link |
| `/blog/hebrew-alphabet-complete-guide/` | Learn the Hebrew alphabet — resource section | Clear reference description: shapes, names, sounds, final forms |
| `/blog/learn-hebrew-alphabet-7-days/` | A seven-day alphabet plan — resource section | Distinct study-plan task |
| `/blog/how-to-read-hebrew-nikud/` | Read Hebrew vowel marks — resource section | Descriptive pointed-reading intent |
| `/play/` | Play — navigation/footer; Free Hebrew learning games — resources | Explicitly describes recognition/name recall in the browser |
| Individual games | No direct homepage link | Reachable through Play; not a homepage defect or orphan-page claim |
| `/#features`, `/#how-it-works`, `/#reviews`, `/#download` | Feature, journey, review and download navigation | All referenced homepage IDs exist |
| `/blog/`, `/terms/`, `/website-privacy/` | Navigation/footer | Valid local build destinations |

All homepage root-relative link destinations and homepage anchor IDs checked against the build resolve. New resource links already implement the prior compact learning-route proposal; the old “homepage only links to the blog index and Play” observation is obsolete.

Store destinations are centralized in site data and shared buttons:

- App Store: `https://apps.apple.com/app/learn-hebrew-read-speak/id6813120842`
- Google Play: `https://play.google.com/store/apps/details?id=com.vicsothemes.hebrewforbeginners`

Both appear in the hero and final download section; navigation “Get the app” goes to `/#download`. Badge alt text supplies meaningful accessible link names, intrinsic dimensions are present, and external links use `target="_blank"` / `rel="noopener"`. Platforms are identifiable through badges and schema, although a brief visible Android/iOS line could clarify availability further. Store links and IDs are verified in code/build, not as fresh live store responses or guaranteed regional availability.

The first screen offers immediate store access and a product visual. The rest supports consideration with an app progression, reading screenshots, sourced Google Play reviews, FAQ and a closing CTA. Six review records carry source/date; translated reviews are disclosed. Their source comments identify a Play Console export, but that original export was not independently verified in this task.

**Conversion measurement is incomplete.** `data-store` and `data-cta-location` are useful hooks, not an event collector. No homepage click-measurement handler or analytics client was found in the entry/layout/imported components. The website privacy page explicitly says the site currently has no Google Analytics. No measured store-click rate, install attribution or install uplift can be claimed. Browser-game instrumentation does not measure homepage conversion.

### Images, accessibility and responsive consistency

- All informative product screenshots have descriptive alt text. Store badges describe their action. Decorative rotating hero screens are in an `aria-hidden="true"` wrapper; the source passes empty alt, although the built fallback images omit the alt attribute. These are not missing informative image descriptions because that subtree is decorative and hidden from assistive technology; explicitly preserving `alt=""` would be optional markup polish.
- Screenshot `<picture>` output includes AVIF/WebP, JPG fallback, responsive sizes/srcsets and width/height. The main hero image is eager/high priority; remaining screenshots are lazy. No field LCP/INP/CLS or speed improvement is claimed from these attributes alone.
- Landmarks, one H1, native FAQ details, focus-visible styles, labelled mobile toggle, hidden closed menu, labelled review region and journey tab/panel associations are present. Source handles arrow/Home/End keys, focus pause and reduced motion. No homepage skip-to-main link is present; this is optional accessibility polish.
- The same learning copy, resource links, FAQ and store destinations serve mobile and desktop. At narrow widths the layout stacks and secondary phone visuals disappear; essential text and CTAs remain. Navigation switches to a toggle, including the course link, through 1100px when the extra course entry is enabled.
- Journey panels use `visibility:hidden` until selected on both viewport types. With scripting unavailable, only the initial panel is exposed visually, although every panel is in HTML and supporting sections repeat the key benefits. Do not call this mobile keyword removal. A non-script fallback and a clearer pause control would be usability enhancements, not demonstrated SEO blockers.

## 5. Cannibalization assessment

No query × page data establishes homepage cannibalization. Shared alphabet or reading vocabulary is expected across this product ecosystem. Keep self-canonicals and explicit page roles; do not use cross-canonicals to hide overlap.

| Page | Ownership and current evidence | Homepage overlap risk / decision |
|---|---|---|
| `/` | App discovery, especially alphabet app; store conversion. R3/R6 preserve this role. | Preserve. A title with “app” would clarify differentiation. |
| `/learn/hebrew-alphabet/` | Course outcomes, syllabus, progression and start. Current title: Hebrew Alphabet Course for Beginners; H1: Learn the Hebrew Alphabet Step by Step. Hub is published; Aleph is available, other lessons Coming Soon. | Moderate wording overlap with homepage title/“step by step” description, but distinct task and CTA. R6's course vs learn/chart snapshots had zero exact returned-URL overlap, supporting separation as a working hypothesis, not proof. Do not transfer broad guide queries or advertise 22 available lessons. |
| `/blog/hebrew-alphabet-complete-guide/` | Whole-alphabet reference: chart, names, sounds, count, final forms; v1 broad `learn hebrew alphabet` ownership explicitly retained by v2. | Shared alphabet language is necessary. Homepage reference link reinforces ownership. Avoid adding a full chart/22-letter reference to the homepage. |
| `/play/` | Browser-game directory; `hebrew alphabet games online`, `free hebrew learning games`. Baseline observes `/play/` at 9 for games online. | Low current risk: homepage links explicitly to browser practice and offers stores for app use. Do not retarget its hero to online/free-game intent. |
| `/play/alef-bet-rush/` and `/play/alef-bet-rush/game/` | Recognition/audio browser game; generic alphabet-quiz assignment remains with Rush landing page. | Low homepage risk. Course practice and generic game/quiz discovery remain different tasks. No reason to add quiz targeting to `/`. |
| `/play/hebrew-mahjong/` and `/play/hebrew-mahjong/game/` | Letter/name matching browser game; adults-game target is provisional. Tracker found `/play/` at 12 for `hebrew alphabet game for adults`, rather than assigned Mahjong. | This is a game-target mismatch worth recording, not homepage cannibalization or permission for a game audit. No homepage ownership change. |
| Nikud guide / without-vowels article | Vowel-system explanation versus unpointed reading. Existing research records mixed SERP intent and overlap between reading destinations. | Homepage Nikud/reading mentions are product benefits and the resource link points to the guide. Risk rises only if homepage becomes a general vowel/reading tutorial. Preserve specialist roles; applied Aleph practice does not replace general Nikud explanation. |

Comparison was limited to titles, headings, declared roles, nearby copy/links and existing research. Other pages were not audited in depth. R6 described course destinations as proposals at research time; the current release manifest and fresh build supersede that availability statement, **not** the preserved ownership decisions.

## 6. Prior work completion status

“Completed” below means implementation verified in source/current build, not proof that Google recrawled it or that installs increased.

| Prior item / reference | Status | Current evidence / remaining limit |
|---|---|---|
| Explain alphabet-first beginner app, progression and features — R7 | **Completed and verified** | Hero eyebrow/lead, journey, vocabulary/verbs/reading and screenshots clearly explain product scope |
| Both platforms and store paths; centralize URLs — R7/R10 | **Completed and verified** | Both hero/final store buttons and schema; shared site data. Independent capability parity verification remains outside this site review. |
| Compact homepage learning route to educational destinations — R9 | **Completed and verified** | Four contextual guide/plan/Nikud/Play links now in LearningResources |
| One small app-intent metadata test — R9 | **Partially completed** | Visible app intent is explicit; title/description still omit app. Prior suggested title remains a hypothesis, not a mandatory fix. |
| Canonical/robots/sitemap/title/H1/rendered-link verification — R7 | **Partially completed** | Fresh local build verified; saved live crawl corroborates October 10 state. Current deployed headers/Google canonical/inspection unverified. |
| GSC page × query baseline with country/device segmentation — R7/R9 | **Not implemented in available evidence** | Original independent aggregate tabs remain; no qualifying joined or page-filtered baseline found |
| Consistent representative rank baseline — R7 | **Completed and verified for first run** | Complete 36-query depth-20 baseline; ongoing comparable-run trend unavailable |
| Homepage store conversion instrumentation — R7/R9 | **Not implemented** | Data attributes exist; collector/attribution absent. R9 described GA4 as an optional separate task. |
| Visible FAQ matching schema; real image pipeline, hero visual, social asset, focus/reduced-motion improvements — R10 | **Completed and verified in source/build** | Current components/assets resolve historical defects; runtime accessibility/performance not certified |
| Meaningful homepage sitemap lastmod — R9 | **Completed and verified** | Page update map emits October 10; editorial accuracy of that date is not independently reconstructed |
| Make homepage satisfy complete alphabet curriculum / generic browser quiz / reference-chart expectations | **No longer necessary because of Course Hub and distinct existing owners** | Hub supplies course progression, guide supplies reference, Play supplies games. This is an obsolete inference about missing coverage, not an explicit unfulfilled homepage requirement in R7. Only Aleph is currently available. |
| Alphabet guide ↔ Nikud/7-day/game links, thematic related posts, indexing of games — R7/R9 | **Outside this homepage completion audit** | Homepage-side route improvement is verified; no claim that the wider link network or all indexing tasks are complete |

## 7. Prioritized recommendations

These are recommendations only; nothing was implemented. Expected benefits are qualitative hypotheses, not traffic/install forecasts.

### P0 — factual/indexability issues

**No confirmed homepage P0 defect found.** Do not invent a critical task from missing measurement. Deployment parity, HTTP headers, selected Google canonical/index state, original review provenance and current store/product facts remain verification limits. If later inspection finds a blocking header, wrong canonical or false capability statement, correct that confirmed issue before a metadata experiment. The previous reading-direction errors belong to other pages and are not assessed or reopened here.

### P1 — opportunities supported by existing evidence

| Recommendation | Current state | Proposed change | Target keyword / user intent | Supporting evidence | Expected benefit | Overlap risk |
|---|---|---|---|---|---|---|
| **1. Run one controlled app-intent title test after establishing the comparison window** | Benefits-focused title omits app; visible hero already says app | Candidate homepage title: `Hebrew Alphabet App & Reading Practice | HebrewEdu`. Keep the H1 and rest of the first screen stable. If a description test follows later, identify it as a beginner app without adding unverified capabilities. Apply as a homepage override rather than silently changing shared fallback metadata. | `hebrew alphabet app`; conditional `hebrew learning app`; app selection rather than reference/course | R1/R2: 30 volume, KD 4 for alphabet app; R4/R8: exact homepage rank 7; R9: direct disclosed wording and prior small-test recommendation. Current metadata does not state app. | Clearer search-result product identification and possibly better qualified clicks/store visits. Improvement is uncertain; baseline performance was already rising. | **Low / potentially reduces overlap** with course and reference titles. Preserve alphabet/reading value; no “best” claim. |
| **2. Establish homepage page-filtered measurement before interpreting a change** | GSC Pages/Queries are independent aggregates; single complete comparable tracker run | Future read-only GSC export filtered to exact homepage URL, with dated query/country/device definitions and privacy gaps preserved. Evaluate comparable windows after recrawl; use existing tracker configuration on its approved schedule. No new research or provider run requested by this audit. | Alphabet-app discovery; actual URL ownership; CTR and visibility | R7/R9 require this baseline; workbook filters and R8 confirm its present limits. | Enables a defensible retain/revert decision and distinguishes page-role overlap from keyword coincidence. Small samples still cannot provide reliable A/B causality. | **None**; prevents unsupported remapping. |

The title experiment is meaningful enough to consider but not urgent enough to justify simultaneous hero/H1/description rewrites. The measurement step is a dependency, not a claim that low CTR proves bad copy.

### P2 — optional polish

| Recommendation | Current state | Proposed change | Target keyword / user intent | Supporting evidence | Expected benefit | Overlap risk |
|---|---|---|---|---|---|---|
| **3. Add one contextual Course Hub resource link** | Hub appears in nav, while resource list offers guide/plan/Nikud/games | Add a distinct resource row such as “Start the Hebrew alphabet course,” explicitly saying Aleph is available and more lessons are coming. Retain the full-alphabet reference link. | Visitors choosing structured browser learning; course intent belongs to hub | R6 preserves course/reference split; current build publishes hub/Aleph; resource section has no course row | More informed route selection and an additional contextual crawl path; no measured demand/install gain claimed | **Low** if the link describes the hub's actual availability; avoid presenting the homepage itself as the course. |
| **4. Clarify platform availability in brief visible copy** | Both store badges and Android/iOS schema are present | Optional “Available on Android and iOS” adjacent to store choices, after product confirmation. Keep feature parity/offline claims limited to verified facts. | Device-specific app choice; iPhone/Android terms remain null-volume supporting hypotheses | Site constants, shared StoreButtons, R7 platform objective; R1 platform rows are weak/null-volume | Reduces device uncertainty; limited incremental value because badges already convey this | **Low**; no device-specific landing pages or artificial keyword expansion. |
| **5. Plan store-click measurement if conversion becomes a decision criterion** | Location/store attributes exist; no collector or install attribution | Separate future task: measure outbound clicks by store/location and distinguish them from installs. Choose instrumentation consistent with the site's published privacy commitments before implementation. | App-install funnel | Current source plus R7/R9 measurement recommendations; no historical conversion data available | Establishes click-conversion evidence; installs require separate attribution | **None**; no keyword or page-ownership changes. |
| **6. Accessibility and non-script resilience** | No skip link; inactive journey panels require JS; decorative fallback images omit alt inside hidden subtree | Add skip-to-main; consider a readable non-script journey fallback and explicit pause control; preserve decorative empty alt. Validate keyboard/mobile behavior when implementation is authorized. | Keyboard, reduced-motion and non-script product discovery | Source/build facts above; responsive copy is already shared | Easier access to essential product information; no demonstrated ranking effect | **None**; avoid adding redundant SEO copy. |

Do not prioritize new best-app comparisons, offline claims, full tutorials, chart assets, language-definition sections or direct links to every game on the homepage from this evidence. Null provider data and weak/app-only proposals do not warrant keyword-led expansion.

## Final recommendation

**Make targeted improvements.** Preserve the alphabet-first mobile-app positioning, existing H1, product copy, stores and educational links. Consider one evidence-backed app-focused title test with a usable measurement baseline; treat contextual course linking and platform/accessibility polish as optional. The completed redesign, improving saved GSC homepage metrics and retained v2 ownership give no justification for another redesign or a shift to course/reference/game SEO positioning.
