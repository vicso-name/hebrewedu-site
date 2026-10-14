# Hebrew Phrases — final SEO and implementation brief

**Prepared 2026-10-13. Implementation handoff:** build a standalone beginner Modern Hebrew learning landing page at **`/learn/hebrew-phrases/`**, with 30 useful phrases, situational examples, one short practice exercise and two relevant app-conversion placements. Research is complete for this scope; proceed to content verification and implementation, without another discovery cycle. This brief does not implement or publish the page.

## 1. Keyword cluster and ownership

Primary intent: **learn and use everyday Hebrew phrases**. The saved October 13 Google US/English mobile Android SERP returned six practical phrase collections and one beginner video. Its leading results are a basic phrase list and a words/phrases table. A useful public phrase resource fits this evidence; installation must remain optional.

| Role | Selected wording / topic | Evidence and ownership decision |
|---|---|---|
| **Primary** | `hebrew phrases` | **880 US average monthly searches; organic KD 0**, saved Stage 1 measurement. Assign the new landing page this primary in the implementation plan. KD 0 does not establish easy rankings. |
| Secondary | `basic hebrew phrases`, `hebrew phrases for beginners`, `common hebrew phrases`, `useful hebrew phrases` | **Unmeasured supporting hypotheses**, selected from wording/tasks in the saved result titles and PAA. Use naturally across the introduction and situational sections; no independent pages or numeric metrics. |
| Long-tail questions | “Which Hebrew phrases should I learn first?”, “Can I use these phrases before I can read Hebrew?”, “When do I need a different gender form?” | **Unmeasured editorial questions**, answered on this page. They are content decisions, not new keyword discoveries or independently validated search targets. |
| Situational subtopics | Greetings/introductions; politeness/replies; food/drink; shopping/payment; directions/help | Teaching organization supported by the practical phrase intent. No measured demand or KD is assigned to these headings. |
| Related word-list intent | `hebrew words` **2,900 / KD 0**; `hebrew words for beginners` **50 / KD unrecorded**; `most common hebrew words` **40 / KD unrecorded** | Keep outside this page's target cluster. The latter two retain v2's conditional Vocabulary assignments; this landing page supplies usable expressions, not a word/frequency list. No core reassignment. |
| Related meanings/register | `father in hebrew` **2,900 / KD 1**; `love in hebrew` **2,900 / KD 6**; `hebrew curse words` **720 / KD 0** | Measured Stage 1 terms, but not targets for this launch. Word lookup, romance, profanity and religious/symbolic expressions require different scope. Do not add sections to capture their volume. |

**Final boundary:** the new page owns practical phrase reference and a small applied exercise. `/blog/how-to-learn-hebrew-vocabulary/` retains selection, memorization and review methods; Word Count retains vocabulary-size questions. Alphabet Guide/Nikud/course pages retain script and decoding instruction. The homepage retains general app discovery; this page offers a contextual route into the app. Reading passages, dictionaries, grammar curricula, Biblical meanings and audio-library intent remain separate. Potential overlap is an editorial concern, not confirmed cannibalization. Semantic Core v1/v2 remain unchanged.

Evidence: [Stage 1 classification](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas/keyword-ideas-content-classification.csv), [future-content review](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas/future-content-opportunities.md), [phrase SERP metadata](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-3-serp-intent/02-task-metadata.json), [Stage 3 ownership review](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-3-serp-intent/content-ownership-and-backlog.md), [v2](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2.csv) and [retained map](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-to-url-map.md). Phrase SERP task: `10131400-2762-0139-0000-be914adf484c`, **2026-10-13 14:00:26 UTC**. Phrase metrics are Labs estimates retrieved October 13; the vocabulary-list volumes are older Google Ads observations. Do not sum them or interpret them as visits. No supporting hypothesis needs another measurement before this implementation.

## 2. SEO metadata and section structure

- **SEO Title / social title:** `Hebrew Phrases for Beginners: 30 Useful Phrases | HebrewEdu`
- **H1:** `Useful Hebrew Phrases for Beginners`
- **Meta Description:** `Learn 30 everyday Hebrew phrases with English meanings, transliteration and beginner-friendly usage notes. Try a short practice exercise, then keep learning.`
- **Canonical:** `https://hebrewedu.com/learn/hebrew-phrases/`; trailing slash, self-canonical, `index, follow` for the approved production page; Open Graph type `website`.

| Order / heading | Content and behavior |
|---|---|
| Hero: H1 above | Short Modern Hebrew scope/value statement. Primary anchor “Explore the phrases” → `#phrases`; secondary “Try a quick practice” → `#practice`. Keep the hero compact enough that useful phrase content appears early. |
| H2: **How to use this phrase guide** | Briefly explain English meaning, transliteration, vowel marks and gender labels. Transliteration helps beginners approximate pronunciation; no claim that it replaces listening. Link the Nikud guide without recreating it. |
| H2: **Everyday Hebrew phrases** (`#phrases`) | Wrapping jump links and five H3 groups below. All 30 phrase records are rendered in the initial HTML, visible without JavaScript; no tabs, pagination or installation gate. |
| H3: **Greetings and introductions** | Six phrase functions: hello, good morning, good evening, goodbye, introducing your name, asking someone's name. |
| H3: **Politeness and everyday replies** | Six: thank you, please/you're welcome, excuse me/sorry, yes, no, a brief polite response to “How are you?”. Note context-dependent meanings. |
| H3: **Ordering food and drink** | Six: asking for water, ordering coffee, requesting a menu, asking for the bill, requesting something without an ingredient, thanking the server. Use complete expressions rather than six isolated food nouns. |
| H3: **Shopping and paying** | Six: asking the price, asking whether an item is available, requesting a size, asking to pay by card, asking to pay in cash, politely declining. |
| H3: **Directions and asking for help** | Six: asking where a place is, asking for help, saying you do not understand, asking someone to repeat, asking for slower speech, asking whether someone speaks English. |
| H2: **Try a quick phrase practice** (`#practice`) | One three-question situational exercise described below. After it, show the main app CTA independently of score or completion. |
| H2: **Beginner questions** | Three H3 questions from the long-tail row above; concise answers with appropriate gender and pronunciation caveats. |
| H2: **Keep learning Hebrew** | Links to Vocabulary methods, Alphabet Guide and the published alphabet course. Small editorial credit and actual review date. |

Place a compact inline app invitation after the first two phrase groups, inside the phrase-resource section: an `<aside>` with a bold paragraph label and store buttons, without an intervening H2. The main app panel immediately after practice has H2 **Continue learning with HebrewEdu**. All five phrase groups therefore remain H3 children of **Everyday Hebrew phrases**. Treat six functions per group as a commissioning list: compose distinct natural expressions, with a context-specific expression for thanking a server rather than duplicating the generic thank-you record. Count **30 canonical entries**; gender variants and repeated dialogue uses do not inflate the count.

**Schema:** a small page-specific `WebPage` plus `BreadcrumbList` graph through `Layout.schema`; page URL/name/description must match visible metadata. Show the same two-item breadcrumb, **Home → Hebrew Phrases**, above the H1; do not invent a `/learn/` parent route. Set page languages to English/Hebrew. No Article, Course, FAQPage, review/rating, audio or duplicated MobileApplication schema. Use the existing default social image initially; there is no asset-generation requirement.

## 3. Educational content and verification

Each phrase card needs a stable ID, situation, Hebrew with carefully reviewed nikud, readable transliteration, accurate English meaning, and one short “Use it when…” note. Store gender variants explicitly: **speaker** versus **person addressed**, male/female where applicable; use “same form” only when verified. Add register/context notes only where useful. Use one consistent learner transliteration convention (`sh`, `kh`, `ts`; explain these briefly) and consistent stress guidance where necessary. Do not imply a statistically ranked “most common” list.

These are **draft seed examples for the editor**, not completed linguistic sign-off:

| Hebrew draft | Transliteration draft | English / usage requirement |
|---|---|---|
| שָׁלוֹם | shalom | Hello / goodbye; select the meaning that fits each situation. |
| בֹּקֶר טוֹב | boker tov | Good morning; greeting context. |
| תּוֹדָה | toda | Thank you. |
| בְּבַקָּשָׁה | bevakasha | Please / you're welcome; contrast a request with a reply to thanks. |
| סְלִיחָה | slikha | Excuse me / sorry; distinguish getting attention from apologizing. |
| אֲנִי רוֹצֶה / אֲנִי רוֹצָה | ani rotse / ani rotsa | I want; label male/female **speaker**, respectively, and review polite request context. |

Write **two original two-turn micro-dialogues**, each with Hebrew, transliteration, English and a stated setting: a greeting exchange and a café order. A café seed is `אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה` / `ani rotse kafe, bevakasha` / “I want coffee, please”; supply the female-speaker variant and have the reviewer confirm naturalness and the server's reply. Reuse approved phrase records so examples and exercise options stay consistent. Do not copy competitor lists or use the saved AI Overview as a linguistic authority.

**Release verification:** a named native Modern Hebrew speaker or qualified Hebrew editor checks all 30 entries, every variant, both dialogues, transliteration/stress, translations, register and every exercise key/distractor. Record reviewer, actual review date and reference/correction notes in the content data; display the reviewer name only with permission. Review nikud against a trustworthy Modern Hebrew reference during content preparation, not through another SEO cycle. Implementation may start with draft data, but unreviewed teaching content stays out of the public release. No page audio, TTS, listening controls or promised recording assets in this scope.

**One mini exercise:** three multiple-choice situations using phrases already taught: greet someone in the morning, thank someone, request water politely. Three approved options per question; English situation and visible transliteration make Hebrew literacy optional. Use native radio inputs, fieldset/legend, explicit “Check answer”, feedback explaining the correct context and “Try again”. No timer, penalty, fluency score or account requirement. Keep all questions on the page; a simple count of correctly checked answers is sufficient. With JavaScript disabled or initialization failing, questions plus a native `<details>` answer/explanation remain usable. App CTAs stay visible regardless of answers. Keep interaction state in memory; no cookies, storage, backend or new libraries.

## 4. Conversion and internal links

**Journey:** Google → useful free phrase cards → short situational practice → relevant app invitation.

- **After 12 phrase entries:** compact “Build a regular Hebrew practice habit” panel; one sentence about vocabulary review and lessons, with `StoreButtons location="hebrew_phrases_mid"`.
- **After practice:** “Continue learning with HebrewEdu”; copy: “Build on these phrases with vocabulary review, structured lessons and beginner reading with audio and translation.” Use `StoreButtons location="hebrew_phrases_after_practice"`. Both panels render during SSR, including without JavaScript.
- **Store destinations:** consume `site.stores` through the existing component: [Google Play](https://play.google.com/store/apps/details?id=com.vicsothemes.hebrewforbeginners) and [App Store](https://apps.apple.com/app/learn-hebrew-read-speak/id6813120842). These links/capabilities are verified against existing site source, without a new external check. Do not promise this exact phrase set, synced web progress, a phrase-pack feature or a lesson deep link in the app.
- **Outbound learning links:** `/blog/how-to-learn-hebrew-vocabulary/` (“Remember the phrases you learn”), `/blog/how-to-read-hebrew-nikud/` (“Understand Hebrew vowel marks”), `/blog/hebrew-alphabet-complete-guide/` (“Look up Hebrew letters”), `/learn/hebrew-alphabet/` (“Start with the alphabet”). Keep homepage navigation's existing app destination unchanged.
- **Inbound links in implementation:** add a phrase resource to homepage `LearningResources`, a “Hebrew Phrases” footer link and one contextual link from Vocabulary's phrase-learning advice. Do not retitle or retarget those pages, or expand the crowded primary navigation.

**Tracking:** `StoreButtons` already emits `data-store` and `data-cta-location`; preserve those hooks. No analytics listener/provider is installed, and the website privacy page states that website analytics is absent. Therefore this scope adds **no tracking receiver, event transmission, UTM rewrite or install-attribution claim**. The two location labels support future instrumentation; they do not currently measure conversions. Do not add `trackAlso` or exercise events without an existing receiver.

## 5. Astro implementation handoff

| Suggested file change | Responsibility / reuse |
|---|---|
| New `src/pages/learn/hebrew-phrases/index.astro` | Static landing route; reuse `Layout`, `Nav`, `Footer`, `Section`, `CtaPanel`, `StoreButtons`; SSR metadata/schema, content and anchor links. No blog collection entry or alphabet-manifest dependency. |
| New `src/data/hebrew-phrases.ts` | Typed phrase groups/variants, dialogues, exercise IDs/keys and editorial review metadata. One source for cards, examples and grading; reviewed records only in the production data. |
| New `src/components/phrases/PhraseCard.astro` and `PhrasePractice.astro` | Reuse `lessons/HebrewText.astro` for mixed Hebrew runs. Adapt the existing practice fieldset, feedback and no-JS answer patterns. Prefer semantic lists/cards to a wide scrolling table. |
| New `src/lib/phrases/practice-client.ts` | Small, container-scoped progressive enhancement; reuse pure `gradeAnswer` from `src/lib/lessons/grading.mjs`. Do not import the current lesson `Practice` or `initPractice` directly: they assume lesson blocks, stages/results and 14-question markup. Keep Aleph unchanged. |
| New `src/styles/hebrew-phrases.css` | Scope to `.phrases-page`; reuse global brand/type/spacing/radius tokens and the course's calm learning-card pattern. Provide the `--home-*` surface/spacing/radius aliases required by `Section`, `CtaPanel` and store badges; use global heading/lead classes. Do not import whole homepage/course CSS to obtain these variables. Reuse the existing local Rubik Hebrew font asset with a scoped font declaration and `font-display: swap`. |
| Edit `src/pages/sitemap.xml.ts` and `src/data/page-updates.ts` | Explicit static sitemap entry for the new canonical route, monthly frequency/priority 0.8; actual publication/content date, never a guessed or future lastmod. Update affected homepage date when its resource link changes. |
| Edit `src/components/home/LearningResources.astro`, `src/components/Footer.astro`, `src/content/blog/how-to-learn-hebrew-vocabulary.md` | Implement only the specified incoming links; set the article's actual `updatedDate` when its body changes. |
| New `tests/hebrew-phrases.test.mjs` | Focused content/build-output verification: 30 unique reviewed records, valid variants, exercise keys/options tied to taught phrases, SSR phrase content, canonical/schema and one sitemap entry. Avoid assertions that freeze cosmetic wording. |

**Responsive/accessibility:** one-column cards below 768px, at most two columns above; no horizontal scroll at 320px. Hebrew text at least 1.5rem with generous line height and no letter spacing; English/transliteration at least 1rem. Render Hebrew as real text in `bdi lang="he" dir="rtl"`, Latin text LTR, and wrap complete Hebrew lines to preserve punctuation direction. All anchor/control targets at least 44px, clear focus, underlined text links, sufficient contrast and feedback conveyed with text as well as color. Add a skip link and ~88px anchor scroll margin for the sticky navigation. Phrase jump links wrap; avoid a second sticky toolbar. Check 200% text enlargement and 400% zoom reflow. Override smooth scrolling/animated transitions under reduced-motion preferences. Announce checking feedback politely, keep focus predictable and contain selectors within the exercise component. Initialize checking before exposing JS-only controls; retain the fallback if initialization fails.

## 6. Implementation acceptance checklist

- [ ] All 30 distinct phrases, gender/addressee labels, two dialogues and three exercise questions have recorded editorial sign-off; visible translations/transliterations match the same records. No placeholder review credits or publication dates.
- [ ] Free cards/examples are complete in source HTML and readable without JavaScript. Check, incorrect feedback, correction, retry and no-selection behavior work by keyboard and touch; no accidental form navigation; no-JS/failure answers remain accessible.
- [ ] At 320, 375/390, 768 and 1280px, Hebrew/nikud and badges do not clip, anchors clear the header, labels reflow and practice/CTAs remain reachable. Check reduced motion, keyboard focus and screen-reader announcements.
- [ ] `npm run build` and the focused content/output tests pass; check generated `dist/learn/hebrew-phrases/index.html` and `dist/sitemap.xml`. Existing homepage, blog, Hub/Aleph routes and lesson behavior remain intact.
- [ ] Exactly one H1, the proposed title/description, `og:type=website`, matching canonical/OG URL and valid page/breadcrumb JSON-LD; both visible breadcrumb destinations resolve. One sitemap entry with honest lastmod; no new robots exclusion, duplicate blog route or unavailable lesson link. Local preview returns the page successfully.
- [ ] All four learning links and three planned inbound placements resolve to the correct trailing-slash routes. Existing keyword owners remain intact; no v1/v2 modification.
- [ ] Both app placements use current `site.stores`, correct badge labels, external-link protection and distinct CTA-location hooks. No invented app feature, audio asset, tracking request or installation gate.

Only this brief is created in the planning step. No API calls, new SERP/discovery work, implementation, core edits, commits, pushes or deployment. The next work is the defined implementation with linguistic review as a content-quality gate, not another SEO investigation.

## Release note (2026-10-14)

The page was published without the native-speaker/qualified-editor sign-off
described in "Release verification" above. The user (product owner) explicitly
approved release without that external review, accepting the residual risk on
translation/nikud naturalness for the 30 entries, two dialogues and exercises.
Recorded in `src/data/hebrew-phrases.ts` (`phraseReview`): `reviewer: 'Viktor
(product owner)'`, `qualification` notes the missing native-speaker check,
`editorialApproved: true`, `published: true`, `publishedAt: '2026-10-14'`.
