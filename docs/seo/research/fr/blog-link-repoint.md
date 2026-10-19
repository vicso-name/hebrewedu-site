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
the checklist for that half.

## Open (target not yet published in FR)

| EN target | Planned FR slug | Batch | Linked from |
|---|---|---|---|
| `/blog/learn-hebrew-alphabet-7-days/` | `apprendre-alphabet-hebreu-7-jours` | C | `lettres-hebraiques.md` ("Pour un exemple de plan d'étude hebdomadaire…"), `ecriture-hebraique.md` ("maîtriser l'alphabet imprimé de façon méthodique"), `voyelles-hebreu.md` ("Apprendre l'alphabet de façon méthodique…") |
| `/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/` | `lire-hebreu-sans-voyelles` | C | `lettres-hebraiques.md` ("pourquoi l'hébreu courant retire ces signes voyelles"), `ecriture-hebraique.md` ("la lecture de l'hébreu sans voyelles"), `voyelles-hebreu.md` ("pourquoi l'hébreu imprimé abandonne les voyelles") |
| `/blog/why-you-can-read-hebrew-but-still-understand-absolutely-nothing/` | `lire-sans-comprendre` | D | `voyelles-hebreu.md` ("L'expérience de lire couramment l'hébreu sans presque rien comprendre") |
| `/blog/story-behind-learn-hebrew-read-speak/` | `histoire-de-lapplication` | E | `lettres-hebraiques.md` ("pourquoi l'application a été conçue pour aller des lettres jusqu'à la compréhension"), `voyelles-hebreu.md` ("le créateur de l'application explique comment le nikoud…") |

## Never repointed (no FR counterpart planned)

| EN target | Why | Linked from |
|---|---|---|
| `/play/alef-bet-rush/` | `/play/**` is an English-only destination site-wide (`docs/I18N.md` §1) — stays `(en anglais)` forever | `lettres-hebraiques.md` ("Alef Bet Rush") |

## Closed this batch (batch 1)

| EN target | FR URL | Repointed in |
|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | `/fr/blog/lettres-hebraiques/` | `src/i18n/fr.ts` (`hub.resources`, `home.resources.items`); every other FR post already links to the FR slug directly, never the EN one |
| `/blog/how-to-read-hebrew-nikud/` | `/fr/blog/voyelles-hebreu/` | `src/i18n/fr.ts` (`hub.resources`, `home.resources.items`); every other FR post already links to the FR slug directly |
| `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/` | `/fr/blog/ecriture-hebraique/` | `lettres-hebraiques.md` links to it directly, no EN fallback ever existed |
