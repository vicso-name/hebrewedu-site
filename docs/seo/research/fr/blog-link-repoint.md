# FR blog — links to repoint once their target is published

Tracks every `(en anglais)`-labelled link inside an already-published FR blog
post whose target is itself an EN post still awaiting its own FR
counterpart (per the batch order in `BLOG_FR_PLAN.md`). When that target's FR
post lands, repoint the link(s) below from the EN URL to the new FR URL and
drop the `(en anglais)` label — then delete that row here. Update this file
in the same change as every batch, in both directions: strike rows whose
target just landed, and add new rows for any `(en anglais)` link the new
batch's own posts introduce.

`npm run check:i18n`'s `fr-unmarked-en-link` rule will catch a label you
forgot to drop; it won't catch a link you forgot to repoint, so this file is
the checklist for that half. It also won't catch a stray EN-destination link
living outside `src/content/blog/fr/**` (a dictionary resource list, a
lesson's `copy.*` field, a phrases-page legend entry) — batch 1 missed one of
those (see "Closed this batch" below); when adding a post, also grep
`src/` (not just the blog posts) for the EN post's filename before calling a
batch done.

## Open (target not yet published in FR)

| EN target | Planned FR slug | Batch | Linked from |
|---|---|---|---|
| `/blog/learn-hebrew-alphabet-7-days/` | `apprendre-alphabet-hebreu-7-jours` | C | `lettres-hebraiques.md` ("Pour un exemple de plan d'étude hebdomadaire…"), `ecriture-hebraique.md` ("maîtriser l'alphabet imprimé de façon méthodique"), `voyelles-hebreu.md` ("Apprendre l'alphabet de façon méthodique…") |
| `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/` | `lire-hebreu-sans-voyelles` | C | `lettres-hebraiques.md` ("pourquoi l'hébreu courant retire ces signes voyelles"), `ecriture-hebraique.md` ("la lecture de l'hébreu sans voyelles"), `voyelles-hebreu.md` ("pourquoi l'hébreu imprimé abandonne les voyelles"), `racines-hebraiques.md` ("Lire l'hébreu non vocalisé"), `vocabulaire-hebreu.md` ("une approche progressive de la lecture de l'hébreu") |
| `/blog/how-many-words-are-in-the-modern-hebrew-language/` | `combien-de-mots-hebreu` | C | `conjugaison-hebreu.md` ("le nombre de mots hébreux dont tu as vraiment besoin"), `binianim-hebreu.md` ("le vocabulaire de verbes dont tu as besoin"), `racines-hebraiques.md` ("le nombre de mots dont tu as vraiment besoin"), `vocabulaire-hebreu.md` ("vers lesquels tu avances réellement à chaque étape de l'aisance en hébreu") |
| `/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/` | `lire-sans-comprendre` | D | `voyelles-hebreu.md` ("L'expérience de lire couramment l'hébreu sans presque rien comprendre"), `conjugaison-hebreu.md` ("dépasser le stade où tu arrives à lire l'hébreu mais à comprendre très peu"), `racines-hebraiques.md` ("passer du déchiffrage mécanique de l'hébreu à sa compréhension réelle"), `vocabulaire-hebreu.md` ("Lire l'hébreu à voix haute sans le comprendre") |
| `/blog/story-behind-learn-hebrew-read-speak/` | `histoire-de-lapplication` | E | `lettres-hebraiques.md` ("pourquoi l'application a été conçue pour aller des lettres jusqu'à la compréhension"), `voyelles-hebreu.md` ("le créateur de l'application explique comment le nikoud…"), `conjugaison-hebreu.md` ("comment Learn Hebrew – Read & Speak est passé d'un simple entraîneur d'alphabet…") |
| `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` | `erreurs-apprendre-hebreu` | E | `conjugaison-hebreu.md` ("un guide de toutes les erreurs courantes des débutants"), `binianim-hebreu.md` ("erreurs de grammaire qui ralentissent systématiquement les débutants"), `vocabulaire-hebreu.md` ("Les habitudes d'étude qui retardent systématiquement la progression en hébreu") |

## Never repointed (no FR counterpart planned)

| EN target | Why | Linked from |
|---|---|---|
| `/play/alef-bet-rush/` | `/play/**` is an English-only destination site-wide (`docs/I18N.md` §1) — stays `(en anglais)` forever | `lettres-hebraiques.md` ("Alef Bet Rush") |

## Closed this batch (batch 2)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | `/fr/blog/lettres-hebraiques/` | `conjugaison-hebreu.md` links to it directly, no EN fallback ever existed |
| `/blog/meet-the-new-verb-directory/` | `/fr/blog/conjugaison-hebreu/` | `binianim-hebreu.md`, `racines-hebraiques.md`, `vocabulaire-hebreu.md` all link to it directly |
| `/blog/hebrew-binyanim-explained/` | `/fr/blog/binianim-hebreu/` | `vocabulaire-hebreu.md` links to it directly |
| `/blog/how-the-hebrew-root-system-works/` | `/fr/blog/racines-hebraiques/` | `binianim-hebreu.md`, `vocabulaire-hebreu.md` link to it directly |
| `/blog/how-to-read-hebrew-nikud/` | `/fr/blog/voyelles-hebreu/` | Batch-1 gap found this batch: `src/components/phrases/PhrasesPage.astro`'s nikoud legend entry still linked `(en anglais)` to the EN post after batch 1 published its FR counterpart — repointed and the label dropped. Missed in batch 1 because that batch's grep only covered `src/content/blog/fr/**` and `src/i18n/fr.ts`, not the whole `src/` tree. |

## Closed in batch 1 (for reference)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | `/fr/blog/lettres-hebraiques/` | `src/i18n/fr.ts` (`hub.resources`, `home.resources.items`) |
| `/blog/how-to-read-hebrew-nikud/` | `/fr/blog/voyelles-hebreu/` | `src/i18n/fr.ts` (`hub.resources`, `home.resources.items`) |
| `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/` | `/fr/blog/ecriture-hebraique/` | `lettres-hebraiques.md` links to it directly, no EN fallback ever existed |
