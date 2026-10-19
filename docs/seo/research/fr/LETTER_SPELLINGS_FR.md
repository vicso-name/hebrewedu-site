# FR letter-name spellings — search-validated

Which French spelling of each Hebrew letter name this site targets, decided from
French (location `fr`, language `fr`) search data. Source of truth for
`src/i18n/fr-letters.ts`, the `docs/seo/core` rows of the FR letter pages, and
the spelling table in `docs/hebrew-alphabet-editorial-rules.fr.md`.

Raw data: `letter-spellings-volumes.json` (208 candidates),
`letter-spellings-serp.json` (12 tie-break SERPs),
`letter-spellings-decisions.json`. Spend: `spend.csv`.

## Method

22 letters x 52 spelling variants x 4 query shapes
(`<name>`, `<name> hébreu`, `lettre <name>`, `lettre hébraïque <name>`) =
208 candidates, priced in one `/v1/seo/keywords/overview` batch. 12 letters then
got a `/v1/serp/google` top-10 tie-break.

**Decision rule** (owner's): highest volume wins; tie or both <=10 -> the
spelling dominant in FR SERP titles; still tied -> fr.wikipedia's spelling.

### The bare-name pattern is excluded from scoring

A letter name on its own measures its homographs, not Hebrew-letter demand. In
France: `youd` 301,000 · `pe` 22,200 · `fé` 22,200 · `bet` 18,100 (betting) ·
`sin` 9,900 · `tau` 8,100 (Greek) · `mem` 6,600 · `noun` 3,600 (the English
word) · `tet` 14,800. None of that is somebody looking for a Hebrew letter. The
bare-name figures stay in the raw JSON for the record, but only the three
Hebrew-qualified shapes decide anything.

The same contamination reaches `lettre <name>` for one letter — see Tav below.

### SERP tie-breaks use a Hebrew-scoped query

Step 3 was specified as a SERP on the bare name. A bare-name SERP is worthless
here for exactly the reason above: searching `pe` or `tau` in France returns
nothing about Hebrew, so no spelling of the Hebrew letter could appear in the
titles either way. Each tie-break therefore ran on `<leading variant> hébreu`
and counted **every** candidate spelling in that one Hebrew-scoped result set,
which is what the rule is actually asking.

## Decisions

| # | Letter | Chosen | Primary keyword | Vol | Runner-up | Basis | Reason |
|---|---|---|---|---|---|---|---|
| 1 | `aleph` | **Aleph** | `lettre aleph` | 70 | Alef (30) | volume | Highest qualified volume: "lettre aleph" 70 vs Alef 30. |
| 2 | `bet` | **Beth** | `lettre beth` | 40 | Bet (0) | volume | Highest qualified volume: "lettre beth" 40 vs Bet 0. |
| 3 | `gimel` | **Guimel** | `lettre guimel` | 30 | Gimel (0) | volume | Highest qualified volume: "lettre guimel" 30 vs Gimel 0. |
| 4 | `dalet` | **Dalet** | `dalet hébreu` | 10 | Daleth (10) | SERP titles | Volumes tied or <=10 (Daleth 10, Dalet 10); FR SERP for "daleth hébreu" shows Daleth 1, Dalet 3 in top-10 titles. |
| 5 | `he` | **Hé** | `lettre hé` | 30 | He (0) | volume | Highest qualified volume: "lettre hé" 30 vs He 0. |
| 6 | `vav` | **Vav** | `lettre vav` | 40 | Waw (30) | volume | Highest qualified volume: "lettre vav" 40 vs Waw 30. |
| 7 | `zayin` | **Zayin** | `lettre zayin` | 20 | Zain (0) | volume | Highest qualified volume: "lettre zayin" 20 vs Zain 0. |
| 8 | `chet` | **Heth** | `heth hébreu` | 0 | Het (0) | SERP titles | Volumes tied or <=10 (Heth 0, Het 0, Hhet 0); FR SERP for "heth hébreu" shows Heth 3, Het 2, Hhet 0 in top-10 titles. |
| 9 | `tet` | **Teth** | `teth hébreu` | 0 | Tet (0) | SERP titles | Volumes tied or <=10 (Teth 0, Tet 0); FR SERP for "teth hébreu" shows Teth 2, Tet 0 in top-10 titles. |
| 10 | `yod` | **Yod** | `yod hébreu` | 50 | Youd (0) | volume | Highest qualified volume: "yod hébreu" 50 vs Youd 0. |
| 11 | `kaf` | **Kaf** | `lettre kaf` | 210 | Kaph (10) | volume | Highest qualified volume: "lettre kaf" 210 vs Kaph 10. |
| 12 | `lamed` | **Lamed** | `lettre lamed` | 40 | Lamedh (0) | volume | Highest qualified volume: "lettre lamed" 40 vs Lamedh 0. |
| 13 | `mem` | **Mem** | `lettre hébraïque mem` | 90 | — | only spelling | No competing French spelling in use; volume 90 on "lettre hébraïque mem". |
| 14 | `nun` | **Noun** | `lettre noun` | 70 | Nun (20) | volume | Highest qualified volume: "lettre noun" 70 vs Nun 20. |
| 15 | `samekh` | **Samekh** | `samekh hébreu` | 0 | Samech (0) | SERP titles | Volumes tied or <=10 (Samekh 0, Samech 0); FR SERP for "samekh hébreu" shows Samekh 5, Samech 0 in top-10 titles. |
| 16 | `ayin` | **Ayin** | `ayin hébreu` | 10 | Aïn (0) | SERP titles | Volumes tied or <=10 (Ayin 10, Aïn 0); FR SERP for "ayin hébreu" shows Ayin 6, Aïn 0 in top-10 titles. |
| 17 | `pe` | **Pe** | `pe hébreu` | 0 | Pé (0) | SERP titles | Volumes tied or <=10 (Pé 0, Pe 0, Fé 0); FR SERP for "pé hébreu" shows Pé 1, Pe 2, Fé 0 in top-10 titles. |
| 18 | `tsadi` | **Tsadi** | `tsadi hébreu` | 0 | Tsadé (10) | SERP titles | Volumes tied or <=10 (Tsadé 10, Tsadi 0, Tsadik 0); FR SERP for "tsadé hébreu" shows Tsadé 0, Tsadi 1, Tsadik 0 in top-10 titles. |
| 19 | `qof` | **Qof** | `lettre qof` | 10 | Kof (0) | SERP titles | Volumes tied or <=10 (Qof 10, Kof 0, Koph 0); FR SERP for "qof hébreu" shows Qof 8, Kof 0, Koph 0 in top-10 titles. |
| 20 | `resh` | **Resh** | `resh hébreu` | 0 | Rech (0) | SERP titles | Volumes tied or <=10 (Resh 0, Rech 0); FR SERP for "resh hébreu" shows Resh 6, Rech 0 in top-10 titles. |
| 21 | `shin` | **Shin** | `lettre shin` | 90 | Sin (40) | volume | Highest qualified volume: "lettre shin" 90 vs Sin 40. |
| 22 | `tav` | **Tav** | `tav hébreu` | 50 | Tau (210) | relevance override | "lettre tau" (210) and every "Tau" title on the FR SERP are the Greek letter τ, the Tau cross or a dictionary entry — the one Hebrew-letter result ("127- La lettre Tav") uses Tav, and fr.wikipedia's article is Tav. The raw volume leader measures Greek demand, not this letter. |

## Volumes per variant (Hebrew-qualified best, bare name for contrast)

| Letter | Variants (qualified / bare) |
|---|---|
| `aleph` | Aleph 70 / 5400 · Alef 30 / 4400 |
| `bet` | Beth 40 / 1300 · Bet 0 / 18100 · Beit 0 / 170 |
| `gimel` | Guimel 30 / 170 · Gimel 0 / 1600 · Ghimel 0 / 20 |
| `dalet` | Daleth 10 / 140 · Dalet 10 / 480 |
| `he` | Hé 30 / 2400 · He 0 / 0 |
| `vav` | Vav 40 / 1300 · Waw 30 / 1900 |
| `zayin` | Zayin 20 / 110 · Zain 0 / 2400 |
| `chet` | Heth 0 / 2400 · Het 0 / 2900 · Hhet 0 / 0 |
| `tet` | Teth 0 / 320 · Tet 0 / 14800 |
| `yod` | Yod 50 / 1900 · Youd 0 / 301000 |
| `kaf` | Kaf 210 / 1300 · Kaph 10 / 50 · Khaf 0 / 260 |
| `lamed` | Lamed 40 / 480 · Lamedh 0 / 10 |
| `mem` | Mem 90 / 6600 |
| `nun` | Noun 70 / 3600 · Nun 20 / 2900 |
| `samekh` | Samekh 0 / 50 · Samech 0 / 30 |
| `ayin` | Ayin 10 / 320 · Aïn 0 / 0 |
| `pe` | Pé 0 / 880 · Pe 0 / 22200 · Fé 0 / 22200 |
| `tsadi` | Tsadé 10 / 30 · Tsadi 0 / 20 · Tsadik 0 / 320 |
| `qof` | Qof 10 / 90 · Kof 0 / 1000 · Koph 0 / 0 |
| `resh` | Resh 0 / 210 · Rech 0 / 1900 |
| `shin` | Shin 90 / 8100 · Sin 40 / 9900 · Chin 0 / 3600 |
| `tav` | Tau 210 / 8100 · Tav 50 / 2400 · Thav 0 / 0 |

## Divergences from what the site renders today

| Letter | Rendered today | Chosen | Published? | Action |
|---|---|---|---|---|
| `dalet` | Dalet | **Dalet** | **yes** | applied — title, meta, H1, breadcrumb, body copy and `pages.csv` row all now read Dalet |
| `pe` | Pé | **Pe** | no | `fr-letters.ts` updated |

### Published pages whose title/H1 still uses the old spelling

None. `dalet` was the only one, and it has since been renamed to **Dalet**
throughout — title, meta description, H1, breadcrumb, in-lesson copy and its
`docs/seo/core` row. The app body already said "Dalet", so the two spellings
now coincide and the first-mention parenthetical ("Daleth (Dalet)") was dropped
per `docs/hebrew-alphabet-editorial-rules.fr.md`.

## Notes on individual letters

- **Noun vs Nun** — `lettre noun` 70 and `lettre hébraïque noun` 10 beat
  `lettre nun` 20, so the volume rule picks **Noun**, which is also what French
  Hebrew-teaching sites use (`Nun` would read "nune" in French). fr.wikipedia's
  article is `Nun`; the rule only reaches Wikipedia on a tie, so Noun stands.
- **Tav vs Tau** — the one documented override; see the table.
- **Heth vs Het** — every qualified pattern is 0 for both. FR SERP titles for
  `heth hébreu` run Heth 3 / Het 2, so Heth keeps it, narrowly.
- **Pe vs Pé** — all qualified patterns 0; SERP titles Pe 2 / Pé 1 and
  fr.wikipedia's `Pe (lettre)` agree on **Pe**, so the accent goes.
- **Mem** has no competing French spelling at all.
