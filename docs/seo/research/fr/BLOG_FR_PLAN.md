# FR blog — semantic core per article + localization plan (STEP 1)

Research only; no site or content change. Decisions for the French counterparts of the 18 EN posts in
`src/content/blog/`. Reuses `FR_RESEARCH.md`, `PHRASES_FR.md`, `LETTER_SPELLINGS_FR.md` and `keywords-fr.csv`;
new rows appended to `keywords-fr.csv` (clusters `blog-*`). Raw data in `responses/` (gitignored), spend in
`spend.csv`.

## Headline

**FR demand for these topics is 10–70× thinner than EN and skews biblical Hebrew. Only 4 of 18 posts have a
French query to target.** French learners do not search the words the EN posts are built on: `nikoud` → they
search **voyelles**; `binyanim` → **zero data in any spelling**, they search **conjugaison**. "Is Hebrew hard",
"why Hebrew sounds fast", "listening practice" and "how many words" return **0/mo on every formulation tested**
— no French market, not a translation problem.

**1 TRANSLATE · 3 ADAPT · 6 MERGE · 8 SKIP. Build 4 FR posts, not 18.**

## Summary table

| EN post | Decision | FR primary | Vol/mo | Difficulty | Prio |
|---|---|---|---|---|---|
| how-to-read-hebrew-nikud | **ADAPT** | voyelles en hébreu | **210** (grp ~280) | moderate | **1** |
| meet-the-new-verb-directory | **ADAPT** | conjugaison hébreu | **140** (grp ~230) | **weak** | **1** |
| how-to-learn-hebrew-vocabulary | **ADAPT** | vocabulaire hébreu | **90** (grp ~150) | moderate | 2 |
| hebrew-alphabet-complete-guide | **TRANSLATE** | lettres hébraïques | **390** (+70, +50) | strong | 2 |
| hebrew-binyanim-explained | MERGE → conjugaison-hebreu | — | — | — | — |
| how-the-hebrew-root-system-works | MERGE → conjugaison-hebreu | — | — | — | — |
| how-many-words-are-in-the-modern-hebrew-language | MERGE → vocabulaire-hebreu | — | — | — | — |
| why-hebrew-without-vowels-…-brain-adapts | MERGE → voyelles-hebreu | — | — | — | — |
| why-hebrew-handwriting-…-printed-hebrew | MERGE → planned `/fr/…/cursif` page | — | — | — | — |
| learn-hebrew-alphabet-7-days | MERGE → lettres-hebraiques (§ plan 7 jours) | — | — | — | — |
| how-hard-is-hebrew-to-learn | SKIP — 0 vol; fold the timeline Q into the FR hub FAQ | — | 0 | — | — |
| why-hebrew-sounds-so-fast | SKIP — 0 vol on all 6 formulations | — | 0 | — | — |
| best-hebrew-listening-practice | SKIP — 0 vol on all 7 formulations | — | 0 | — | — |
| why-you-can-read-hebrew-but-…-nothing | SKIP — 0 vol | — | 0 | — | — |
| how-not-to-learn-hebrew-… | SKIP — 0 vol; satire register travels badly | — | 0 | — | — |
| what-makes-a-language-learning-game-educational | SKIP — `jeux pour apprendre l'hébreu` 0; `/play/**` is EN-only | — | 0 | — | — |
| story-behind-learn-hebrew-read-speak | SKIP — app SERP is stores + listicles, unwinnable | — | 40 | strong | — |
| porting-android-app-to-ios-with-ai | SKIP — EN-specific dev story, not in `docs/seo/core` | — | — | — | — |

Two variant groups confirmed by the STEP-3 rule (identical volume **and** identical 12-month trend):
`conjugaison hébreu` = `conjugaison en hébreu` (one concept at 140, not 280) and `vocabulaire hébreu` =
`hébreu vocabulaire` (one at 90). Counted once in the group totals.

---

## 1. ADAPT — `/fr/blog/voyelles-hebreu/` · prio 1
Absorbs **how-to-read-hebrew-nikud** + **why-hebrew-without-vowels-…**

- **Primary** `voyelles en hébreu` 210 · kd 0 · informational
- **Secondary** `les voyelles en hébreu` 30 · `alphabet hébreu voyelles` 20 (csv) · `nikoud` 10 · `texte en hébreu avec voyelles` 10 · `les voyelles en hébreu pdf` 10 · `comment lire l'hébreu` 10
- **Difficulty: moderate, winnable.** Top-10: lilmod-aleph-beth.fr and freehebrew.online (two real competitors), then unige.ch + persee.fr (academic), fr.wikipedia (diacritics reference), fr.scribd (PDF dump). Nobody ranks a structured beginner nikoud lesson with audio.
- **Title** (48) `Les voyelles en hébreu : lire le nikoud pas à pas` · **H1** `Apprends à lire les voyelles de l'hébreu`
- **Meta** (138) `Les voyelles en hébreu s'écrivent avec le nikoud : à quoi sert chaque point, comment le lire, et pourquoi les textes courants s'en passent.`
- **How FR differs.** Lead on **voyelles**, not nikoud: `nikoud`'s own SERP is Facebook/Instagram/StackOverflow and almost entirely *English-language* — an orphan term in France. Keep `nikoud` as the in-body technical term (FR spelling, never "nikud"). **Add** a voweled practice-text section (the `texte en hébreu avec voyelles` intent) and a printable vowel table (the `pdf` sub-intent). **Fold in** the EN "without vowels" post as the closing section — in FR it is the same query space, and splitting it would cannibalize.
- **Supersedes** the planned FR pilot page *"Lire l'hébreu avec les voyelles"* (`FR_RESEARCH.md`, reading-nikoud 30/mo). Build this post instead, not both.
- **Links** `/fr/apprendre/alphabet-hebreu/`; the Vav and Yod lessons where they act as vowel letters; `/fr/apprendre/phrases-hebreu/`.
- `lire l'hébreu` (40, kd 16) has a **strong**, biblical-skewed SERP (bibliques.com, oulpanlavi, hebreu-biblique.e-monsite, acoursdhebreu) — use it as internal anchor text, not as a target.

## 2. ADAPT — `/fr/blog/conjugaison-hebreu/` · prio 1 (best winnability)
Absorbs **meet-the-new-verb-directory** + **hebrew-binyanim-explained** + **how-the-hebrew-root-system-works**

- **Primary** `conjugaison hébreu` 140 · kd 0 (= `conjugaison en hébreu`)
- **Secondary** `tableau de conjugaison hébreu` 70 · `verbes hébreu` 10 · `tableau conjugaison hébreu` 10 · `conjugaison hébreu pdf` 10 · `racines hébraïques` 10 · `grammaire hébreu moderne` 10
- **Difficulty: weak — the clearest opening in the set.** `conjugaison hébreu`'s top-10 has **no dedicated French Hebrew-learning site at all**: Scribd ×2, Amazon (a book), Reddit, Reverso (a conjugator tool), Quizlet, Pinterest, Images. `tableau de conjugaison hébreu` adds only morim.com.
- **Title** (49) `Conjugaison hébreu : les verbes et les 7 binianim` · **H1** `Comprends la conjugaison hébraïque, binian par binian`
- **Meta** (136) `Comprends la conjugaison hébraïque : racine, 7 binianim et tableaux des verbes hébreux les plus courants au présent, au passé et au futur.`
- **How FR differs — a rewrite, not a translation.** The EN original is a *product announcement*; FR intent is pure reference. **Drop** the launch framing (the app becomes the closing CTA only). **Add** real conjugation tables (present/past/future × person) — Images and Pinterest in the top-10 prove searchers want a visual table, and a print/PDF variant covers `conjugaison hébreu pdf`. **Merge in** the binyanim explainer and the root system as the two opening sections: morim.com's #1 result for `tableau de conjugaison hébreu` is literally *"La racine et le modèle"*, so French searchers already meet roots inside the conjugation topic.
- **Spelling.** FR sources use **binian / binianim** (and **binyan**), never the EN "binyanim" — `binyanim hébreu` returned **zero ideas**. Say **racine** for shoresh; keep `chorech` only as a parenthetical.
- **Do not target** `grammaire hébraïque` (10, kd 51): its SERP is biblical grammar (Joüon, Verheij, unige.ch, archive.org) — strong *and* wrong intent. Same for `conjugueur hébreu` (tool intent, Reverso owns it) and `racine(s) hébraïque(s)` as a primary: in France that phrase returns an antiquarian dictionary, CNRS/HAL linguistics theses and the "Hebrew Roots" religious movement — polluted intent at 10/mo.
- **Links** `/fr/apprendre/alphabet-hebreu/`, `/fr/blog/voyelles-hebreu/` (verb tables are voweled), `/fr/` (app CTA).
- **Dependency:** no EN source copy exists for the conjugation tables — they must come from the app's verb data, not from translation.

## 3. ADAPT — `/fr/blog/vocabulaire-hebreu/` · prio 2
Absorbs **how-to-learn-hebrew-vocabulary** + **how-many-words-…**

- **Primary** `vocabulaire hébreu` 90 · kd 0 (= `hébreu vocabulaire`)
- **Secondary** `vocabulaire hébreu pdf` 50 · `fiche vocabulaire hébreu` 10 · the `mots hébreu` rows in the csv
- **Difficulty: moderate.** `vocabulaire hébreu`: oulpanlavi, rosenhebrewschool, unige.ch (biblical word list), data.bnf, YouTube. The `hébreu vocabulaire` spelling is **strong** (flashcardo, acoursdhebreu, loecsen, gardetonhebreu) — same concept, tougher SERP, so win the easier spelling first.
- **Title** (48) `Vocabulaire hébreu : les mots à apprendre d'abord` · **H1** `Le vocabulaire hébreu que tu utiliseras vraiment`
- **Meta** (150) `Le vocabulaire hébreu essentiel par thème, avec nikoud et transcription : combien de mots il te faut, lesquels apprendre d'abord et comment les retenir.`
- **How FR differs.** FR intent is *"give me the list"*, not *"give me a retention method"*. **Add** a thematic word list (nikoud + French transcription) as the page's spine; **compress** the EN spaced-repetition / active-recall theory into one section. **Merge in** the "how many words" figures as a `Combien de mots te faut-il ?` section — every French formulation of that question is 0/mo and cannot carry a page alone. Route the `pdf` sub-intent to the printable-reference page instead of duplicating a download here.
- **Links** `/fr/apprendre/phrases-hebreu/`, `/fr/blog/conjugaison-hebreu/` (verbs are the other half of vocabulary), `/fr/apprendre/alphabet-hebreu/`.

## 4. TRANSLATE — `/fr/blog/lettres-hebraiques/` · prio 2
Absorbs **learn-hebrew-alphabet-7-days** as a `plan en 7 jours` section

- **Primary** `lettres hébraïques` 390 · kd 0 — **not** `alphabet hébreu` (6,600). That head term stays with the FR hub `/fr/apprendre/alphabet-hebreu/` per `FR_RESEARCH.md`; giving it to a blog post would cannibalize the hub. Mirrors the EN split (hub = course entry, guide = full reference).
- **Secondary** `les 22 lettres hébraïques` 70 · `les lettres hébraïques` 70 · `alphabet hébreu prononciation` 50 · `alphabet hébreu et prononciation` 50 · `lettre alphabet hébreu` 70 (weak)
- **Difficulty: strong** — fr.wikipedia, preply, unige.ch, essentiels.bnf.fr, lilmod-aleph-beth.fr, oulpanlavi (see the `FR_RESEARCH.md` competitor audit). None is a structured per-letter course; our edge is depth + interactivity, and `lettre alphabet hébreu` (70) is **weak** — a usable side door.
- **Title** (47) `Les 22 lettres hébraïques : formes, noms et sons` · **H1** `Les 22 lettres hébraïques, une par une`
- **Meta** (148) `Les 22 lettres hébraïques en détail : nom, forme imprimée, son, valeur numérique et les 5 formes finales, avec un plan pour les apprendre en 7 jours.`
- **FR specifics.** Start from the existing proofread draft `fr-guide-draft.md` — do not re-translate the EN post. Letter spellings come from **`LETTER_SPELLINGS_FR.md`** / `src/i18n/fr-letters.ts`: Aleph, Beth, Guimel, **Dalet**, Hé, Vav, Zayin, Heth, Teth, Yod, Kaf, Lamed, Mem, Noun, Samekh, Ayin, **Pé**, Tsadi, Qof, Resh, Shin, Tav. ⚠️ `FR_RESEARCH.md`'s per-letter table still says "Daleth (not Dalet)" — **stale**; the spelling research and the shipped `fr-letters.ts` both say Dalet.
- **Localize examples.** EN example words were picked for English-speaker phonetics; re-pick for French ears (no "ch as in Bach" crutch — French has no such reference; compare Resh to the French `r` grasseyé instead). `sofit` → *forme finale*, kept in « guillemets » on first use.
- **Links** `/fr/apprendre/alphabet-hebreu/` (primary CTA), all 22 lesson pages, `/fr/blog/voyelles-hebreu/`.

---

## Execution plan

### Step 0 — bilingual-blog infrastructure (one session, before any FR post)

The blog is **EN-only by design**: `docs/I18N.md` §1 lists `/blog/**` as an English-only destination and
`src/pages/blog/{index,[slug]}.astro` are standalone pages, not shared templates. All net-new work:

1. **Collection.** Add `blogFr` to `src/content.config.ts` (same schema, `base: './src/content/blog/fr'`), per the `lessonsFr` precedent. ⚠️ The EN `blog` loader uses `pattern: '**/*.md'` and **would swallow** `blog/fr/*.md` — narrow EN to `'*.md'` in the same change, as EN lessons do with `'*.json'`.
2. **Shared templates.** Extract `components/blog/BlogIndexPage.astro` and `BlogPostPage.astro`, register both in `LAYOUT_WRAPPERS` (`scripts/check-layout.mjs`), then add `src/pages/fr/blog/index.astro` and `[slug].astro` as thin `locale="fr"` wrappers.
3. **Dictionary.** Move blog chrome into `src/i18n/{en,fr}.ts`: the "Blog" eyebrow, "Hebrew learning resources", "Latest articles", "Coming soon", the FAQ heading (`[slug].astro:107`), author / reading-time / category labels, CTA. `readingTime` is free-text frontmatter — FR needs `9 min de lecture`; add a `categoryKey` so the EN/FR category taxonomies cannot drift.
4. **hreflang pairing.** FR slugs are French *and* three FR posts merge several EN posts, so the shared-slug trick used for letters is impossible. Add an optional `translationKey` to the blog schema and pair 1:1: `voyelles-hebreu`↔`how-to-read-hebrew-nikud`, `conjugaison-hebreu`↔`meet-the-new-verb-directory`, `vocabulaire-hebreu`↔`how-to-learn-hebrew-vocabulary`, `lettres-hebraiques`↔`hebrew-alphabet-complete-guide`. Every other EN post declares **no** alternates (hreflang is reciprocal or absent, §3.3).
5. **Checks + sitemap.** Teach `scripts/check-i18n.mjs` about FR posts (parity, hreflang reciprocity, `(en anglais)` labelling, French high punctuation in frontmatter *and* body), add FR blog URLs to `src/pages/sitemap.xml.ts`, and update the `docs/I18N.md` §1 URL table.
6. **Brand suffix.** Fix `src/pages/blog/[slug].astro:61` in the same pass (see below) so the FR route cannot inherit it.

*Opus 5, high effort* — guardrail-dense: layout wrappers, two checkers, the collection globs and the
`Dictionary` interface all at once.

### Content batches

- **Batch 1 — prio 1: `voyelles-hebreu`, `conjugaison-hebreu`.** Highest (volume × winnability), and the most net-new French writing: neither the vowel table nor the conjugation tables have EN source copy. *Opus 5, high effort* — nikoud accuracy, `tu` register, French high punctuation.
- **Batch 2 — prio 2: `vocabulaire-hebreu`, `lettres-hebraiques`.** Both lean on existing assets (the phrases research; `fr-guide-draft.md`). *Opus 5, high* for `lettres-hebraiques` (22-letter table, spelling consistency); *Opus 5, medium* for `vocabulaire-hebreu`.
- **After publishing:** add the 4 pages to `pages.csv` + `clusters.csv`, map the `blog-*` clusters into `keywords.csv`, run `npm run seo:build`. No `core/` rows yet — the pages do not exist.

### Open questions

1. **`/fr/blog/` vs `/fr/articles/`** — every other FR segment is localized (`apprendre`, `conditions`, `confidentialite`). "Blog" is a normal French word, so `/fr/blog/` is defensible, but it is an owner call and must be made **before** step 0 ships (no redirects).
2. **The 8 SKIPs rest on one provider's 0-volume verdict**, and this provider already returned nothing for FR kids-intent (`FR_RESEARCH.md` open Q 2). Re-check in Search Console once the 4 FR posts are indexed before concluding France truly has no "is Hebrew hard" or listening demand.
3. **Handwriting → cursive.** That MERGE assumes the planned `/fr/…/cursif` pilot page still gets built. If it is dropped, `alphabet hébreu cursif` (390) + `écriture hébraïque` (720) become the largest unclaimed FR volume here and the handwriting post should be reopened as an ADAPT.

---

## EN-side issues seen while reading (report only — FR must not inherit them)

1. **Brand suffix on 17 of 18 posts**, against the `CLAUDE.md` rule *"Title tags never include the brand suffix"*. Two causes: `src/pages/blog/[slug].astro:61` hard-codes `` `${title} | HebrewEdu Blog` `` for the 11 posts with no `seoTitle`, and 6 of the 7 `seoTitle` values append `| HebrewEdu` by hand. `src/pages/blog/index.astro:14` does it too. Only `story-behind-learn-hebrew-read-speak` is clean.
2. **11 rendered titles exceed 60 characters**, worst first: why-hebrew-handwriting 75 · meet-the-new-verb-directory 74 · hebrew-alphabet-complete-guide 72 · hebrew-binyanim-explained 71 · how-the-hebrew-root-system-works 70 · how-to-read-hebrew-nikud 70 · learn-hebrew-alphabet-7-days 70 · how-not-to-learn-hebrew 69 · why-hebrew-sounds-so-fast 68 · best-hebrew-listening-practice 67 · how-many-words 66. Dropping the suffix fixes 9 of the 11 outright.
3. **Six H1s on one page:** `meet-the-new-verb-directory.md` uses `# ` five times in the body (lines 12, 49, 67, 150, 171) on top of the layout's `<h1 class="article-title">` (`[slug].astro:90`). Should be `##`/`###`.
4. **`docs/seo/core/pages.csv` records the brand-suffixed titles** as the published `title`, so the semantic core currently documents the violation as intended state. Fix both together.
5. `porting-android-app-to-ios-with-ai` is `status: published` with an **empty `primary_cluster`** and no primary keyword in `pages.csv`.

## Spend

**11 ideas calls** — 4 returned zero rows (`nikoud hébreu`, `binyanim hébreu`, `comprendre l'hébreu parlé`,
`écouter de l'hébreu`), itself a demand signal — **2 overview batches** (86 candidates sent, **only 8 returned a
row**: the provider has no data for 78 hand-built French long-tail formulations) and **18 SERP calls** at depth
10. Ledger estimate **$0.81**; **actually billed $0.66** per the free balance endpoint ($2.95 → $2.29), against
the **$1.50** cap. Rows in `spend.csv`.
