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
| `/blog/story-behind-learn-hebrew-read-speak/` | `histoire-de-lapplication` | E | `lettres-hebraiques.md` ("pourquoi l'application a été conçue pour aller des lettres jusqu'à la compréhension"), `voyelles-hebreu.md` ("le créateur de l'application explique comment le nikoud…"), `conjugaison-hebreu.md` ("comment Learn Hebrew – Read & Speak est passé d'un simple entraîneur d'alphabet…") |
| `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` | `erreurs-apprendre-hebreu` | E | `conjugaison-hebreu.md` ("un guide de toutes les erreurs courantes des débutants"), `binyanim-hebreu.md` ("erreurs de grammaire qui ralentissent systématiquement les débutants"), `vocabulaire-hebreu.md` ("Les habitudes d'étude qui retardent systématiquement la progression en hébreu"), `combien-de-temps-apprendre-hebreu.md` ("un guide des erreurs courantes qui ralentissent la progression"), `combien-de-mots-hebreu.md` ("un guide de toutes les erreurs courantes des apprenants"), `hebreu-parle-vite.md` ("habitudes d'apprentissage de l'hébreu qui retardent la progression") |

## Never repointed (no FR counterpart planned)

| EN target | Why | Linked from |
|---|---|---|
| `/play/alef-bet-rush/` | `/play/**` is an English-only destination site-wide (`docs/I18N.md` §1) — stays `(en anglais)` forever | `lettres-hebraiques.md` ("Alef Bet Rush") |

## Closed this batch (batch 4)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/` | `/fr/blog/lire-sans-comprendre/` | `voyelles-hebreu.md`, `conjugaison-hebreu.md`, `racines-hebraiques.md`, `vocabulaire-hebreu.md`, `apprendre-alphabet-hebreu-7-jours.md`, `lire-hebreu-sans-voyelles.md`, `combien-de-mots-hebreu.md` |
| `/blog/why-hebrew-sounds-so-fast/` | `/fr/blog/hebreu-parle-vite/` | `combien-de-temps-apprendre-hebreu.md` |

No new `(en anglais)` links introduced this batch, except one: `hebreu-parle-vite.md` links to `how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/` (batch E) — added to that target's existing "Linked from" list above rather than a new row. `best-hebrew-listening-practice`'s FR counterpart (`comprehension-orale-hebreu`) had no prior inbound `(en anglais)` links to repoint — confirmed by grepping `src/` (not just `src/content/blog/fr/`) for all three EN filenames before closing this batch.

## Closed this batch (batch 3)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/learn-hebrew-alphabet-7-days/` | `/fr/blog/apprendre-alphabet-hebreu-7-jours/` | `lettres-hebraiques.md`, `ecriture-hebraique.md`, `voyelles-hebreu.md`, `src/i18n/fr.ts` (`home.resources.items`) |
| `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/` | `/fr/blog/lire-hebreu-sans-voyelles/` | `lettres-hebraiques.md`, `ecriture-hebraique.md`, `voyelles-hebreu.md`, `racines-hebraiques.md`, `vocabulaire-hebreu.md` |
| `/blog/how-many-words-are-in-the-modern-hebrew-language/` | `/fr/blog/combien-de-mots-hebreu/` | `conjugaison-hebreu.md`, `binyanim-hebreu.md`, `racines-hebraiques.md`, `vocabulaire-hebreu.md` |

## Closed in batch 2 (for reference)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | `/fr/blog/lettres-hebraiques/` | `conjugaison-hebreu.md` links to it directly, no EN fallback ever existed |
| `/blog/meet-the-new-verb-directory/` | `/fr/blog/conjugaison-hebreu/` | `binyanim-hebreu.md`, `racines-hebraiques.md`, `vocabulaire-hebreu.md` all link to it directly |
| `/blog/hebrew-binyanim-explained/` | `/fr/blog/binyanim-hebreu/` | `vocabulaire-hebreu.md` links to it directly |
| `/blog/how-the-hebrew-root-system-works/` | `/fr/blog/racines-hebraiques/` | `binyanim-hebreu.md`, `vocabulaire-hebreu.md` link to it directly |
| `/blog/how-to-read-hebrew-nikud/` | `/fr/blog/voyelles-hebreu/` | Batch-1 gap found this batch: `src/components/phrases/PhrasesPage.astro`'s nikoud legend entry still linked `(en anglais)` to the EN post after batch 1 published its FR counterpart — repointed and the label dropped. Missed in batch 1 because that batch's grep only covered `src/content/blog/fr/**` and `src/i18n/fr.ts`, not the whole `src/` tree. |

## Closed in batch 1 (for reference)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | `/fr/blog/lettres-hebraiques/` | `src/i18n/fr.ts` (`hub.resources`, `home.resources.items`) |
| `/blog/how-to-read-hebrew-nikud/` | `/fr/blog/voyelles-hebreu/` | `src/i18n/fr.ts` (`hub.resources`, `home.resources.items`) |
| `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/` | `/fr/blog/ecriture-hebraique/` | `lettres-hebraiques.md` links to it directly, no EN fallback ever existed |
