# Verb conjugation tool

`/learn/hebrew-verbs/` and `/fr/apprendre/conjugaison-hebreu/`: a binyan chart, a
lookup over the app's whole verb dictionary, and full conjugation tables for
**30 free verbs**. Every other verb is a headword with a locked card that
sends the reader to the app, where full tables are limited to 5 a day for free
users (`FREE_LIMIT` in the Android `VerbExplorerViewModel.kt`).

## The rule

A locked verb's forms never reach the site. `src/data/hebrew-verbs.json` holds
forms only for the free verbs, the page's client index (`verbIndex()`) holds
headwords only, and `tests/hebrew-verbs.test.mjs` fails if either changes. Do
not "fake" a lock in CSS or JS over real data: the page source is public.

## Files

| File | Owns |
|---|---|
| `scripts/import-app-verbs.mjs` | Import from the app JSON: the `FREE` list, data corrections (`OVERRIDES`, `FIXERS`), transliteration clean-up |
| `src/data/hebrew-verbs.json` | Generated. Never hand-edit; change the script and re-run it |
| `src/lib/hebrew-verbs.mjs` | Paths, binyan order/colors/chart examples, hero root pairs and popular verbs, tense row order, pronouns, sitemap, schema |
| `src/components/verbs/VerbsPage.astro` | Shared EN/FR template |
| `src/components/verbs/VerbTable.astro` | One free verb's full table |
| `src/lib/verbs/explorer-client.ts`, `search.mjs` | Lookup: search, binyan filter, selection, locked card; the hero search box (live suggestions, opens the first match) |
| `src/styles/hebrew-verbs.css` | Page styles |
| `src/i18n/{en,fr}.ts` → `verbs` | Every visible string |

## Re-importing

```bash
node scripts/import-app-verbs.mjs   # defaults to the Android repo's assets JSON
node --test tests/hebrew-verbs.test.mjs
```

The script refuses a free verb with a missing translation, a form without
nikud, or a transliteration with anything but `a-z`, `'` and spaces. It maps
the Cyrillic look-alikes the app data carries (`katvа`, `melamед`) to Latin
and drops the stress marks (`ˈ`), which are often misplaced in the source.

Changing the free set: edit `FREE` (source indexes), keep chart examples
(`binyanim[].example`) and `rootPairs` pointing at free verbs, and update the
"30" in the `verbs` dictionary copy, the blog links and the SEO rows if the count changes.

## Data issues found in the app (2026-11-03)

Fixed on the site via `OVERRIDES`/`FIXERS`; the app still ships them.

- Cyrillic letters inside Latin transliterations in many entries (`katvа`,
  `melamед`, `hitkhалti`, `mit'amenет`, `teshuну`).
- Stress marks inside syllables throughout (`hitkashˈer`, `nikhtˈav`, `lehikkatˈev`).
- לְשַׁלֵּם: vocal shva dropped in every form (`lshalem`, `mshalem`, `tshalmi`).
- הֻחְלַט: past tense wrong (`hukhlateti`, `hukhlatenu`, `hukhlatat`, `hukhleteu`), `mukhlétet`.
- שֻׁנָּה: past 1p `shuleynu` (→ `shuneynu`). הִכָּנֵס: future 3mp `tikansu` (→ `yikansu`).
- הִתְאַמֵּן: `mit'amenim`, `hit'amena`… (→ `mit'amnim`, `hit'amna`). הָלַךְ: `halekha` (→ `halkha`).
- דֻּבַּר: `dubera`, `duberu` (→ `dubra`, `dubru`).
- English glosses: נִפְגַּשׁ "met" (→ "meet"), נִכְתַּב "written" (→ "be written").
- רָצָה: past 3fs `ratta` (→ `ratsta`), `rtsitem`/`rtse` (→ `retsitem`/`retse`). קִבֵּל: `kibhalten` (→ `kibalten`).
- הִסְתַּכֵּל: future 2fs/2mp carry the imperative's `histakli`/`histaklu` (→ `tistakli`/`tistaklu`).
- נִשְׁאַר: every dagesh form doubles the shin (`esh'she'er`, `lehish'she'er` → `esha'er`, `lehisha'er`).
- הִגִּיעַ: present fs and past 3fs read like the masculine (`magia` → `magi'a`, `higia` → `higi'a`).
- 17 Pu'al/Huf'al entries have no nikud at all; one Huf'al entry (הוצלח) has no translation and is left out of the site list.

## Analytics

`verb_view` (`verb`, `binyan`, `locked`) fires when a reader opens a verb; the
locked card's store buttons report `cta_location: hebrew_verbs_locked`, the
closing CTA `hebrew_verbs_cta`. See `docs/ANALYTICS.md`.
