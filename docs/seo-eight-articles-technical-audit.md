# HebrewEdu: eight-article technical and internal-link audit

**Observed:** 2026-10-13. **Source revision:** `b3de862` (working tree had no tracked changes). **Verdict:** no local indexing blocker and no orphan among the eight supplied URLs. Internal-link improvements are useful, but no mandatory technical repair was established before semantic/content work.

## Scope and verification

Read [project conventions](PROJECT-KNOWLEDGE-INDEX.md), the blog loader/templates, shared metadata, robots and sitemap source. `npm run build` succeeded; inspected its generated HTML and ran `npm run preview -- --host 127.0.0.1 --port 4322`. Astro assigned port **4324**; the final HTTP checks used `http://127.0.0.1:4324`. HTTP GET bodies for all eight articles, robots.txt and sitemap.xml matched the built files byte-for-byte. Checked each article's slashless variant separately.

For inbound counts, parsed ordinary `<a href>` elements in the 33 deployable HTML files, including 18 articles, homepage, course and Play pages. This was a bounded build-artifact inventory, not a browser crawl or repository-wide content audit. Excluded self-links, XML entries, metadata, scripts and external links. Every counted inbound anchor is present in initial HTML, has no `nofollow`, and is outside hidden containers. Counts distinguish anchor occurrences from unique source pages.

GSC's “Discovered — currently not indexed,” absent crawl records, and Binyanim's successful Live URL Test are **owner-supplied context**, not independently refreshed measurements. The Binyanim Live Test was not repeated. Local results do not establish current production headers, hosting redirects, Google-selected canonical or actual crawl history. No cache existed; fresh local evidence was used. No paid calls, SERP/keyword research, Rank Tracker runs or Semantic Core edits were made.

## Comparison

For each URL's `<slug>`, the verified source is `src/content/blog/<slug>.md` and generated route is `dist/blog/<slug>/index.html`, via `src/content.config.ts` and `src/pages/blog/[slug].astro:12`.

**Index pass** means: robots allows crawling; exactly one canonical equal to `https://hebrewedu.com` + the listed URL; exactly one `robots` meta with `index, follow`; no additional Googlebot meta, meta refresh or local `X-Robots-Tag`. Each sitemap entry occurs exactly once. “Position / depth” means position among all 18 blog-index articles / shortest HTML-link depth from `/`.

| URL | Source / generated | GET / redirects | Indexability | Sitemap lastmod | Inbound links / sources (body links) | Blog position / home depth |
|---|---|---|---|---|---|---|
| `/blog/best-hebrew-listening-practice/` | Yes / yes | 200 / none | Pass | 2026-05-25 | 2 / 2 (1) | 5 / 2 |
| `/blog/hebrew-binyanim-explained/` | Yes / yes | 200 / none | Pass | 2026-05-23 | 3 / 3 (2) | 6 / 2 |
| `/blog/how-many-words-are-in-the-modern-hebrew-language/` | Yes / yes | 200 / none | Pass | 2026-05-15 | 10 / 10 (9) | 14 / 2 |
| `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` | Yes / yes | 200 / none | Pass | 2026-05-13 | 7 / 7 (6) | 15 / 2 |
| `/blog/how-the-hebrew-root-system-works/` | Yes / yes | 200 / none | Pass | 2026-05-19 | 5 / 5 (4) | 9 / 2 |
| `/blog/meet-the-new-verb-directory/` | Yes / yes | 200 / none | Pass | 2026-05-17 | 6 / 6 (5) | 12 / 2 |
| `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/` | Yes / yes | 200 / none | Pass | 2026-05-22 | 4 / 4 (3) | 7 / 2 |
| `/blog/why-hebrew-sounds-so-fast/` | Yes / yes | 200 / none | Pass | 2026-05-12 | 4 / 4 (3) | 16 / 2 |

All eight slashless requests returned **404, without a redirect**, in Astro production preview. The supplied trailing-slash URLs all returned **200 without HTTP or HTML redirects**. All observed inbound links and sitemap/canonical URLs use the working trailing-slash form.

## Verified technical findings

- **No blocking defect found:** all sources exist, all routes build, and all supplied URLs serve actual article HTML. No accidental noindex, wrong canonical, robots exclusion or sitemap omission was observed.
- `public/robots.txt:1` produces a 200 response containing `User-agent: *`, `Allow: /`, and the correct sitemap URL. `src/pages/sitemap.xml.ts:80` includes every blog collection entry; the generated sitemap is valid XML and serves 200. The eight lastmod values above match their source publication dates; none has an `updatedDate` override.
- Canonicals and robots directives are emitted in initial HTML by `src/layouts/Layout.astro:26`, `:29`, `:38` and `:44`; JavaScript is unnecessary for the audit targets' metadata, article content or inbound links.
- **Variant handling observation:** slashless 404s are reproducible locally with `astro.config.mjs:6` (`trailingSlash: 'always'`). This is a URL-normalization limitation of the tested preview, not a demonstrated defect affecting the eight GSC URLs. Production is published through `.github/workflows/deploy.yml` to GitHub Pages; that host's redirect behavior was not tested. Do not change route policy based on the preview alone.

## Reachability and internal-link gaps

**No orphaning or pagination barrier:** `/blog/` contains one title anchor for each of the eight, in initial HTML. `src/pages/blog/index.astro:11` selects one featured post and `:48` renders all remaining posts; there is no pagination, load-more gate, client-side filter or truncated article list. Every audited route has the path `/` → `/blog/` → article. Homepage navigation and footer link to `/blog/` with “Blog” (`src/components/Nav.astro:12`, `src/components/Footer.astro:8`); the footer remains available without opening the mobile menu.

**Observed architecture gaps, not indexing blockers:**

- Listening practice has just **one contextual inbound link**, and Binyanim has **two**. The other six have three to nine. There is no evidence for a required link-count threshold; these are relative opportunities within this set.
- All eight have **zero inbound links from “Continue learning.”** `src/pages/blog/[slug].astro:49` excludes the current article and takes the newest three from `src/lib/blog.ts:5`, without topical selection. On all eight audited articles those cards point to the iOS-porting, educational-game and app-story posts. Older learning guides get no support from this shared module.
- Direct reciprocal paths are missing where the articles already discuss the corresponding topic: Sounds Fast → Listening Practice; Root System → Binyanim; Verb Directory → Binyanim and Root System. Existing links run in the opposite direction. This is a verified missing-link opportunity, not a requirement that every relationship be reciprocal.
- Homepage, course hub/Aleph and Play pages have no direct anchors to any of the eight. They can lead through the blog index; direct links from every important page are unnecessary. Handwriting also receives contextual links from both alphabet guides highlighted on the homepage (`src/components/home/LearningResources.astro:7` and `:12`), giving it an additional three-step learning-resource path.

## Exact inbound HTML inventory

Each bullet records **source URL → anchor text** for the target heading. Counts include the single `/blog/` title link. This is the complete observed inventory; all links are ordinary HTML anchors, with no duplicated inbound anchors from the same source page.

### `/blog/best-hebrew-listening-practice/` — 2 links / 2 sources

- `/blog/` → “The Best Hebrew Listening Practice for Every Level”
- `/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/` → “Beginner Hebrew listening practice”

### `/blog/hebrew-binyanim-explained/` — 3 links / 3 sources

- `/blog/` → “What Are Hebrew Binyanim? A Practical Beginner's Guide”
- `/blog/how-to-learn-hebrew-vocabulary/` → “Understanding Hebrew verb patterns, or binyanim”
- `/blog/story-behind-learn-hebrew-read-speak/` → “introduction to Hebrew binyanim”

### `/blog/how-many-words-are-in-the-modern-hebrew-language/` — 10 links / 10 sources

- `/blog/` → “How Many Words Are in the Modern Hebrew Language?”
- `/blog/best-hebrew-listening-practice/` → “The vocabulary threshold for comfortable comprehension”
- `/blog/hebrew-binyanim-explained/` → “verb vocabulary you need”
- `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` → “a realistic look at Hebrew vocabulary numbers”
- `/blog/how-the-hebrew-root-system-works/` → “how many words you actually need”
- `/blog/how-to-learn-hebrew-vocabulary/` → “you’re actually working toward at each stage of Hebrew fluency”
- `/blog/meet-the-new-verb-directory/` → “how many Hebrew words you actually need”
- `/blog/why-hebrew-sounds-so-fast/` → “how many words you actually need at each stage”
- `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/` → “Understanding how large Modern Hebrew vocabulary actually is”
- `/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/` → “How many Hebrew words you actually need”

### `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` — 7 links / 7 sources

- `/blog/` → “How Not to Learn Hebrew: A Complete Guide to Failing”
- `/blog/hebrew-binyanim-explained/` → “grammar mistakes that consistently slow beginners down”
- `/blog/how-hard-is-hebrew-to-learn/` → “common mistakes that slow progress”
- `/blog/how-many-words-are-in-the-modern-hebrew-language/` → “a guide to every common Hebrew learning mistake”
- `/blog/how-to-learn-hebrew-vocabulary/` → “The study habits that consistently delay Hebrew progress”
- `/blog/meet-the-new-verb-directory/` → “a guide to every common mistake beginners make”
- `/blog/why-hebrew-sounds-so-fast/` → “common Hebrew learning habits that delay progress”

### `/blog/how-the-hebrew-root-system-works/` — 5 links / 5 sources

- `/blog/` → “How the Hebrew Root System Works: Shorashim Explained”
- `/blog/hebrew-binyanim-explained/` → “the Hebrew root system”
- `/blog/how-hard-is-hebrew-to-learn/` → “Understanding how Hebrew roots work”
- `/blog/how-to-learn-hebrew-vocabulary/` → “Learning root families instead of isolated words”
- `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/` → “Learning how the Hebrew root system works”

### `/blog/meet-the-new-verb-directory/` — 6 links / 6 sources

- `/blog/` → “Alef-Bet Tutor Verb Directory: 334 Essential Hebrew Verbs”
- `/blog/hebrew-binyanim-explained/` → “334 Hebrew verbs organized by Binyan”
- `/blog/how-many-words-are-in-the-modern-hebrew-language/` → “Alef-Bet Tutor Verb Directory”
- `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` → “Alef-Bet Tutor Verb Directory”
- `/blog/how-the-hebrew-root-system-works/` → “Alef-Bet Tutor Verb Directory organizes Hebrew verbs by root and Binyan”
- `/blog/how-to-learn-hebrew-vocabulary/` → “Alef-Bet Tutor Verb Directory organizes 334 high-frequency verbs by root and Binyan”

### `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/` — 4 links / 4 sources

- `/blog/` → “Why Hebrew Handwriting Looks Different From Printed Hebrew”
- `/blog/hebrew-alphabet-complete-guide/` → “Hebrew handwriting looks completely different from the printed forms”
- `/blog/learn-hebrew-alphabet-7-days/` → “Hebrew handwriting looks almost nothing like the printed forms you just learned”
- `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/` → “Hebrew handwriting”

### `/blog/why-hebrew-sounds-so-fast/` — 4 links / 4 sources

- `/blog/` → “Why Hebrew Sounds So Fast (And What to Do About It)”
- `/blog/best-hebrew-listening-practice/` → “why Hebrew sounds so fast at first”
- `/blog/how-hard-is-hebrew-to-learn/` → “why Hebrew sounds so fast to learners”
- `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` → “why Hebrew sounds so fast to learners”

## Prioritized fixes for review

1. **Medium — add the most obvious contextual paths.** In `src/content/blog/why-hebrew-sounds-so-fast.md:187` (“What Actually Helps”), link to `/blog/best-hebrew-listening-practice/` with an anchor such as “Hebrew listening practice for your level.” In `src/content/blog/how-the-hebrew-root-system-works.md:132`, link its Binyanim explanation to `/blog/hebrew-binyanim-explained/`. In `src/content/blog/meet-the-new-verb-directory.md:85` and `:106`, link the existing Binyanim/root references to those two explanatory articles. These would improve learner navigation and strengthen the two least-supported targets without changing intent ownership.
2. **Medium — make “Continue learning” relevant and less dependent on recency.** Replace the newest-only selection at `src/pages/blog/[slug].astro:49` with curated relationships or deterministic selection using existing tags/category, with a recency fallback. If factored into a helper, its location is `src/lib/blog.ts:5`; keep the rendered anchors in `src/components/blog/RelatedPosts.astro` / `BlogCard.astro`. Preserve current-page exclusion and ordinary server-rendered title links. This addresses a shared architecture gap; it is not a prerequisite for indexing or a guarantee of a Google crawl.
3. **Low / conditional — investigate slashless normalization only if production evidence warrants it.** The relevant configuration is `astro.config.mjs:6`; deployment/hosting context is `.github/workflows/deploy.yml`. Verify the host before proposing a redirect solution. No change is currently justified for the supplied trailing-slash URLs, and no slug migration is recommended.

**Recommendation before semantic/content work:** proceed with the existing routes, canonicals, robots and sitemap. No mandatory technical change was found. Consider items 1–2 as a small internal-linking improvement alongside the next authorized editorial pass. Preserve the full HTML blog listing. The reason Google has not crawled these URLs remains unproven: link distribution is an observed gap, while its effect on Google's scheduling is a hypothesis. This audit provides no evidence that content quality caused the reported status.

**Review boundary:** only this report was added; source/articles, Semantic Core editions and unrelated untracked files were untouched. Build/preview generated local ignored artifacts; no commit, push or deployment was performed. Stop for owner review before implementation.
