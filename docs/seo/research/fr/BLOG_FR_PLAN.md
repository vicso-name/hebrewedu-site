# FR blog — scope, slugs and keywords per post

**Owner-decided scope (2026-10-19), which overrides the earlier research
recommendation in this file's history and in `FR_RESEARCH.md`:** translate all
17 EN posts 1:1 — no merges, no skips — except
`porting-android-app-to-ios-with-ai` (EN-specific dev story, out of scope).
Each FR post pairs 1:1 with its EN post via `translationKey`, so hreflang is
reciprocal on both sides.

SEO-adapted, not literal: FR titles and terms come from the French search data
in `keywords-fr.csv` / `FR_RESEARCH.md` — **voyelles** rather than *nikoud* in
titles, **conjugaison**, **binian/binianim** (never the EN "binyanim", which
has no French data in any spelling), **racine**, and the letter spellings in
`LETTER_SPELLINGS_FR.md`.

URL: `/fr/blog/` (final). FR slugs are French, not transliterated from the EN
id — the pairing lives in `translationKey`, not in the slug.

### Keyword ownership (owner rule, already applied to `docs/seo/core/`)

- **`alphabet hébreu` (6,600) belongs to the FR hub** `/fr/apprendre/alphabet-hebreu/`.
  It was sitting on a *planned* FR-guide row pointed at a page that did not
  exist; it now lives on `fr-alphabet-hub--alphabet-hebreu` as that cluster's
  primary, with `apprendre l'alphabet hébreu` (30) demoted to a secondary. The
  hub's rendered `<title>` — *"Apprendre l'alphabet hébreu : cours pour
  débutants"*, 50 chars, no brand — already carries the keyword, so no copy
  change was needed.
- **The FR alphabet guide is a blog post**, `/fr/blog/lettres-hebraiques/`,
  targeting `lettres hébraïques` (390) — deliberately not the head term.
- **The planned standalone `/fr/…/cursif` page is dropped.** The handwriting
  post takes that demand at `/fr/blog/ecriture-hebraique/`, with a new
  `fr-blog-ecriture--ecriture-hebraique` cluster.

## EN post → FR slug, primary keyword, title draft

Titles are ≤ 60 chars, no brand, `tu` register, French high punctuation with a
no-break space. "long tail" means no French query in the researched set carries
measurable volume for that topic: the post is still translated (owner scope),
but it is written for the body-copy long tail and for internal linking, not to
rank on a head term. Volumes are per `keywords-fr.csv`.

| # | EN post | FR slug | FR primary keyword | Vol | Title draft |
|---|---|---|---|---|---|
| 1 | hebrew-alphabet-complete-guide | `lettres-hebraiques` | lettres hébraïques | 390 | Les 22 lettres hébraïques : formes, noms et sons |
| 2 | why-hebrew-handwriting-…-printed-hebrew | `ecriture-hebraique` | écriture hébraïque | 720 | Écriture hébraïque : du texte imprimé au cursif |
| 3 | how-to-read-hebrew-nikud | `voyelles-hebreu` | voyelles en hébreu | 210 | Les voyelles en hébreu : lire le nikoud pas à pas |
| 4 | meet-the-new-verb-directory | `conjugaison-hebreu` | conjugaison hébreu | 140 | Conjugaison hébreu : 334 verbes classés par binian |
| 5 | how-to-learn-hebrew-vocabulary | `vocabulaire-hebreu` | vocabulaire hébreu | 90 | Vocabulaire hébreu : les mots à apprendre d'abord |
| 6 | why-hebrew-without-vowels-…-brain-adapts | `lire-hebreu-sans-voyelles` | lire l'hébreu sans voyelle | 10 | Lire l'hébreu sans voyelles, et pourquoi ça vient |
| 7 | hebrew-binyanim-explained | `binianim-hebreu` | grammaire hébreu moderne | 10 | Les 7 binianim : comprendre les verbes hébreux |
| 8 | how-the-hebrew-root-system-works | `racines-hebraiques` | racines hébraïques | 10 | Les racines hébraïques : une racine, dix mots |
| 9 | learn-hebrew-alphabet-7-days | `apprendre-alphabet-hebreu-7-jours` | long tail | — | L'alphabet hébreu en 7 jours : un plan réaliste |
| 10 | how-hard-is-hebrew-to-learn | `hebreu-difficile` | combien de temps pour apprendre l'hébreu | 10 | L'hébreu est-il difficile à apprendre ? |
| 11 | how-not-to-learn-hebrew-… | `erreurs-apprendre-hebreu` | apprendre l'hébreu seul | 10 | Comment ne pas apprendre l'hébreu : 10 erreurs |
| 12 | story-behind-learn-hebrew-read-speak | `histoire-de-lapplication` | meilleure application pour apprendre l'hébreu | 10 | Des lettres à la compréhension : notre histoire |
| 13 | what-makes-a-language-learning-game-educational | `jeux-educatifs-langues` | jeux pour apprendre l'hébreu | 0 | Qu'est-ce qui rend un jeu de langue éducatif ? |
| 14 | how-many-words-are-in-the-modern-hebrew-language | `combien-de-mots-hebreu` | long tail | — | Combien de mots compte l'hébreu moderne ? |
| 15 | why-hebrew-sounds-so-fast | `hebreu-parle-vite` | long tail | — | Pourquoi l'hébreu parlé semble si rapide |
| 16 | best-hebrew-listening-practice | `comprehension-orale-hebreu` | long tail | — | Compréhension orale en hébreu, niveau par niveau |
| 17 | why-you-can-read-hebrew-but-…-nothing | `lire-sans-comprendre` | long tail | — | Tu lis l'hébreu sans rien comprendre ? C'est normal |
| — | porting-android-app-to-ios-with-ai | *(out of scope)* | — | — | EN-specific dev story; no `translationKey`. |

Difficulty verdicts, secondary keywords, per-post SERP evidence and the FR-side
editorial notes (which examples to re-pick for French ears, which internal links
to use) are in `keywords-fr.csv` (clusters `blog-*`) and in `FR_RESEARCH.md`.
Headline evidence: `conjugaison hébreu`'s top-10 has **no** dedicated French
Hebrew-learning site (Scribd ×2, Amazon, Reddit, Reverso, Quizlet, Pinterest) —
the easiest win in the set; `lettres hébraïques` and `écriture hébraïque` are
**strong** (Wikipedia, Preply, unige.ch, essentiels.bnf.fr, lilmod-aleph-beth);
`voyelles en hébreu` is **moderate** and nobody there ranks a structured
beginner lesson with audio.

## Batches, ordered by value

Each batch is one session. Posts 1–5 carry essentially all of the measurable FR
volume, so they go first; the long-tail posts follow in descending order of
how much net-new French writing they need.

| Batch | Posts | Why this order | Model / effort |
|---|---|---|---|
| **A** | `lettres-hebraiques`, `ecriture-hebraique`, `voyelles-hebreu` | The three biggest volumes (390 / 720 / 210) and the three heaviest content lifts: a 22-letter table, a printed-vs-cursive comparison, a full vowel table. Start from the proofread draft `fr-guide-draft.md` for post 1 — do not re-translate the EN article. | Opus 5, high |
| **B** | `conjugaison-hebreu`, `binianim-hebreu`, `racines-hebraiques`, `vocabulaire-hebreu` | The verb/root/vocabulary block, written together so the three share one terminology set (racine, binian, modèle) and link to each other rather than overlap. Post 4 needs real conjugation tables, which have no EN source copy. | Opus 5, high |
| **C** | `apprendre-alphabet-hebreu-7-jours`, `lire-hebreu-sans-voyelles`, `hebreu-difficile`, `combien-de-mots-hebreu` | Long tail, but all four are close rewrites of their EN originals with FR-localized examples and figures. | Opus 5, medium |
| **D** | `hebreu-parle-vite`, `comprehension-orale-hebreu`, `lire-sans-comprendre` | The listening/comprehension trio — one voice, one set of audio recommendations, all three French-sourced. | Opus 5, medium |
| **E** | `erreurs-apprendre-hebreu`, `jeux-educatifs-langues`, `histoire-de-lapplication` | Register-heavy: satire (post 11) and first-person founder voice (post 12) are the hardest things to carry into French, and are worth least in search, so they go last. Post 13 must say `(en anglais)` on every `/play/**` link — the games are EN-only. | Opus 5, high |

**Per-post checklist** is `docs/I18N.md` §6 "A blog post". Each post needs a
`locale=fr` row in `docs/seo/core/pages.csv` + `npm run seo:build`; batch A's
first post must also add the row for `/fr/blog/` itself, which starts building
at that moment, and flip the FR Nav/Footer "Blog (en anglais)" labels to
`/fr/blog/`.

## Infrastructure: done (this step)

`src/content/blog/fr/` is wired and empty. Collections (`blogFr`, EN glob
narrowed to `*.md`), `translationKey`/`categoryKey`, the shared
`BlogIndexPage`/`BlogPostPage` templates, the FR routes, blog chrome in
`src/i18n/{en,fr}.ts`, sitemap, `check:i18n` coverage (including the new
`fr-typography-head` rule) and `docs/I18N.md` are all in place. The FR routes
build nothing until the first post lands — by design, so there is no empty FR
listing to index.

EN fixes shipped alongside: the `… | HebrewEdu Blog` suffix is gone from the
template, the hand-written `seoTitle`s and the listing (one post held back by
owner decision until end of October 2026), and
`meet-the-new-verb-directory.md`'s five body `# ` headings were demoted, so
every blog page now has exactly one `<h1>`. `pages.csv` titles were re-synced
to the rendered output. **Only one EN blog title is still over 60 chars:**
`/blog/hebrew-alphabet-complete-guide/` at 72 — entirely because of the brand
suffix it was allowed to keep (the title itself is 55). Five meta descriptions
remain 156–159 chars, and `porting-android-app-to-ios-with-ai` is still
`published` in `pages.csv` with an empty `primary_cluster`; both are reported,
not changed.
