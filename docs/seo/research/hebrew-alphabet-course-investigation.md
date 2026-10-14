# HebrewEdu Alphabet Course Investigation — Semantic Core v2 Extension

Prepared **2026-10-11 (Europe/Tallinn)**. Research workspace: `/Users/kasutaja/Developer/seo-research/hebrewedu/`. Website reviewed: `/Users/kasutaja/Developer/web/hebrewedu-site/`.

> **Owner update, 2026-10-11:** Lesson 4 is confirmed Dalet (ד). Do not re-investigate the incorrect description. The original investigation below documents its dated API snapshot; current keyword measurements and implementation sequencing are in `semantic-core-v2-research-report.md` and `hebrew-alphabet-course-implementation-roadmap.md`. The candidate CSV now includes measured follow-up results and two additional qualified-query hypotheses. Website code remains unchanged.

## Original investigation decision and scope

**Conditional Go for a later, local Lesson 1 proof of concept; No-go for a full 22-lesson publication at present.** The Astro architecture can support an additive course. The inventory contains 22 unique lesson IDs. Lesson 4 is now confirmed by the product owner as Dalet (ד), completing the intended base-letter mapping; the source description correction is pending and is not a rollout blocker. Lesson 1 has reusable text, images, and multiple-choice exercises, but needs pronunciation review. It supplies no audio and no access-entitlement metadata. Full rollout also depends on content rights, validation of the remaining details, distinctive page value, and approved keyword/SERP research.

This is an extension of **Semantic Core v1**, not a replacement SEO project. The original 136 keyword rows, their source metrics, URL assignments, rank-tracking file, and prior research remain unchanged. The candidate companion proposes **171 additional, unmeasured keywords**: 165 letter candidates and six hub candidates. It also includes 24 existing-v1 comparison/control queries with their current targets retained, for **195 distinct research rows** in total. This is a research queue, not a completed Semantic Core v2. A later approved merge would contain 136 + 171 = **307 unique keywords before further qualification**, not 23 keywords for 23 URLs.

Initial investigation boundaries observed (before the subsequently authorized v2 research):

- Two successful anonymous API GETs only: the list and Lesson 1; no other lesson detail fetched. An initial sandboxed DNS failure returned no list response; the successful read used approved network access.
- No cookies, authorization headers, credentials, administrator access, OPTIONS probes, or API write calls used.
- No full export, media downloads, paid DataForSEO requests, live ranking checks, page creation, redirects, publication, website edits, commits, or pushes.
- Official documentation was read for implementation and SEO recommendations. Existing SERP evidence is dated 2026-10-10; no new SERP evidence or new demand metrics were generated.
- API JSON and response headers were inspected in temporary storage. This permanent report contains the inventory and selected schema examples, not a distributable raw answer-key export.

## 1. Verified lesson inventory

### List response and pagination

Source: [anonymous alphabet lesson list](https://api.hebrewedu.com/api/lessons/?category=alphabet-lc&lang=en).

Observed HTTP status: **200**. Content type: `application/json`. The response is a **top-level array**, containing 22 items. It is not a `{count, next, previous, results}` wrapper; no pagination fields are present, and the observed response headers contain no `Link` pagination header. There are **22 unique integer IDs**, exactly 1–22, and **22 unique order values**, exactly 1–22. Returned array order matches the explicit ascending `order` field. Every item has category `alphabet-lc`.

The list is complete as returned for this query. The API's underlying database total, future pagination contract, unpublished lessons, and other language/category inventories were not queried. A future importer must validate shape again rather than assume the absence of pagination is permanent.

List fields are `id`, `title`, `description`, `category`, `order`, `studyMaterialsCount`, and `exercisesCount`. Titles are generic `Lesson 1` through `Lesson 22`; letter identification comes from descriptions rather than a dedicated letter code. List-reported totals are **362 study-material blocks and 319 exercises**. Only Lesson 1's 11/14 counts were corroborated against detail arrays. Totals are inventory metadata, not a verified full-content export.

| Order / ID | API title | API description (verbatim) | Study blocks* | Exercises* | Mapping assessment |
|---:|---|---|---:|---:|---|
| 1 / 1 | Lesson 1 | Exploring Aleph: The Foundation of the Hebrew Alphabet | 11 | 14 | Verified Aleph detail |
| 2 / 2 | Lesson 2 | Exploring Bet: The Foundation of the Hebrew Alphabet | 20 | 13 | List suggests ב / bet; detail uninspected |
| 3 / 3 | Lesson 3 | Exploring Gimel: The Foundation of the Hebrew Alphabet | 9 | 12 | List suggests ג / gimel; detail uninspected |
| 4 / 4 | Lesson 4 | Exploring Gimel: A Key Building Block of the Hebrew Alphabet | 10 | 13 | Dalet (ד) confirmed by product owner on 2026-10-11; old description retained as dated API evidence |
| 5 / 5 | Lesson 5 | Exploring Hey: The Foundation of the Hebrew Alphabet | 18 | 14 | List suggests ה / he; detail uninspected |
| 6 / 6 | Lesson 6 | Mastering Vav (ו): Strengthening Your Hebrew Alphabet Skills | 16 | 13 | List suggests ו / vav; detail uninspected |
| 7 / 7 | Lesson 7 | Mastering Zayin (ז): Strengthening Your Hebrew Alphabet Skills | 11 | 14 | List suggests ז / zayin; detail uninspected |
| 8 / 8 | Lesson 8 | Exploring Chet: The Foundation of the Hebrew Alphabet | 10 | 15 | List suggests ח / chet; detail uninspected |
| 9 / 9 | Lesson 9 | Mastering Tet (ט): Strengthening Your Hebrew Alphabet Skills | 10 | 12 | List suggests ט / tet; detail uninspected |
| 10 / 10 | Lesson 10 | Exploring Yud (י): Its Pronunciation, Usage, and Role in Hebrew | 10 | 16 | List suggests י / yod; detail uninspected |
| 11 / 11 | Lesson 11 | Exploring Kaf (כ): Understanding Its Forms, Pronunciation, and Usage in Hebrew | 16 | 16 | List suggests כ / kaf; detail uninspected |
| 12 / 12 | Lesson 12 | Exploring Lamed (ל): Pronunciation, Meaning, and Usage in Hebrew | 17 | 16 | List suggests ל / lamed; detail uninspected |
| 13 / 13 | Lesson 13 | Exploring Mem (מ): Writing, Sound, and Common Hebrew Words | 14 | 16 | List suggests מ / mem; detail uninspected |
| 14 / 14 | Lesson 14 | Exploring Nun (נ): Writing, Sound, and Common Hebrew Words | 26 | 15 | List suggests נ / nun; detail uninspected |
| 15 / 15 | Lesson 15 | Mastering Samekh (ס): Understanding Its Sound and Usage | 19 | 14 | List suggests ס / samekh; detail uninspected |
| 16 / 16 | Lesson 16 | Ayin (ע) in Hebrew: A Letter Without a Sound but With Meaning | 19 | 16 | List suggests ע / ayin; detail uninspected |
| 17 / 17 | Lesson 17 | Mastering Pey (פ): Understanding Its Two Pronunciations and Forms | 23 | 16 | List suggests פ / pe; detail uninspected |
| 18 / 18 | Lesson 18 | Mastering Tsadi (צ): Understanding Its Forms and Pronunciation | 21 | 15 | List suggests צ / tsadi; detail uninspected |
| 19 / 19 | Lesson 19 | Discovering Qof – Unveiling the Nineteenth Letter of the Hebrew Alphabet | 19 | 13 | List suggests ק / qof; detail uninspected |
| 20 / 20 | Lesson 20 | Mastering Resh (ר): The Distinctive Roll in the Hebrew Alphabet | 19 | 16 | List suggests ר / resh; detail uninspected |
| 21 / 21 | Lesson 21 | Exploring Shin (ש): The Spark of the Hebrew Alphabet | 24 | 15 | List suggests ש / shin; detail uninspected |
| 22 / 22 | Lesson 22 | Exploring Tav: The Final Step in Your Hebrew Alphabet Journey | 20 | 15 | List suggests ת / tav; detail uninspected |

\* Counts are list-reported, except Lesson 1 also verified against its detail response.

### One-to-one mapping conclusion

The product owner confirmed on 2026-10-11 that Lesson 4 is Dalet (ד). Use ID 4 → `dalet` in the course mapping. Its earlier API description is a source metadata error that the owner will correct. Identity is settled: no additional investigation or API fetch is needed for this discrepancy. Together with the other list descriptions, all 22 intended base-letter identities are accounted for; review of uninspected lesson content remains separate.

Lesson 1 detail verifies an Aleph-centered lesson, but it also introduces niqqud and uses other letters in explanations and questions. Therefore, “one letter per lesson” should mean a reviewed central teaching objective, not exclusive use of one Hebrew character. Review prerequisite expectations: beginners encounter Pe, Ayin, and other shapes before those letters' nominal lessons.

No separate list entries are named Vet, Chaf, Fe, Sin, or the five final forms. Those are candidates for coverage within a base-letter lesson, not proof that all such content is currently taught.

## 2. Representative Lesson 1 structure

Source: [anonymous Lesson 1 detail](https://api.hebrewedu.com/api/lessons/1/?lang=en). Observed HTTP status: **200**.

Top-level fields:

```json
{
  "id": 1,
  "title": "Lesson 1",
  "description": "Exploring Aleph: The Foundation of the Hebrew Alphabet",
  "category": "alphabet-lc",
  "order": 1,
  "studyMaterials": [],
  "exercises": []
}
```

The arrays above are abbreviated placeholders. Actual lengths are 11 and 14. There is no source slug, letter code, language field, duration, author, revision, update timestamp, audio field, entitlement, license, or progress object in this response.

### Study-material types actually observed

| Discriminator | Count | Actual fields besides `type` | Proposed rendering |
|---|---:|---|---|
| `MAIN_TITLE` | 1 | `title` | Semantic heading; coordinate with the page H1 |
| `SIMPLE_TEXT` | 3 | `content` | Paragraphs with English copy and isolated Hebrew spans |
| `TEXT_IMAGE` | 3 | `content`, `description`, `imageUrl` | Explanatory figure with reviewed text equivalent |
| `BOLD_TEXT` | 3 | `content` | Emphasis within an instructional paragraph |
| `SUBTITLE` | 1 | `content` | Subheading, here “Conclusions” |

The internal heading is **“Exploring Aleph (א) and Hebrew Diacritical Marks.”** The lesson introduces niqqud, then Aleph with **Patah**, **Kamatz Gadol**, and **Hataf Patah**, followed by a conclusion. Verified combinations support the Aleph-specific candidates `aleph with patah`, `aleph with kamatz`, and `aleph with hataf patah`. The general niqqud system remains the responsibility of the existing Nikud guide.

All three `TEXT_IMAGE.description` values are empty strings. They cannot serve as sufficient alternative text without editorial work. Blocks have no IDs or explicit order fields; their array order must be preserved. Do not infer headings from `content` alone because `MAIN_TITLE` uses `title` instead.

### Exercises and answer structures actually observed

All 14 exercises have `id`, `type`, `content`, `tip`, `score`, and `additionalData`. Exercise IDs are strings, and all 14 are unique. Every returned `score` is numeric **0**. With no documented scoring/progress semantics, this is not evidence of a learner score, weight, mastery threshold, or assessment total.

| Type | Count | `additionalData` | Grading implications |
|---|---:|---|---|
| `TRUE_FALSE` | 5 | `correctAnswer`: string `"true"`; no choices array | Explicitly parse valid `"true"` / `"false"` strings. Do not use JavaScript truthiness. |
| `MULTIPLE_CHOICE_COLUMN` | 3 | `choices`: array of three strings; `correctAnswer`: exact choice string | Single selected answer; column is a layout distinction. |
| `MULTIPLE_CHOICE_GRID` | 6 | `choices`: array of four strings; `correctAnswer`: exact choice string | Single selected answer; grid includes Hebrew and phonetic strings. |

All nine multiple-choice answer strings match a supplied choice exactly in the raw response. There is no answer index, stable option ID, multiple-answer flag, accepted-answer list, fill-in-the-blank input, pairing structure, audio prompt, or speaking-assessment structure in this sample. Other lessons could introduce different types; their global type inventory remains unknown.

Abbreviated source-shaped examples:

```json
{"type":"TRUE_FALSE","additionalData":{"correctAnswer":"true"}}
{"type":"MULTIPLE_CHOICE_COLUMN","additionalData":{"choices":["Kamatz Gadol","Patah","Segol"],"correctAnswer":"Kamatz Gadol"}}
{"type":"MULTIPLE_CHOICE_GRID","additionalData":{"choices":["צֵ","גַ","מֻ","אָ"],"correctAnswer":"אָ"}}
```

All five true/false questions currently have the answer `"true"`. This limits assessment variety and should be reviewed as pedagogy, not silently altered by an importer. Some distractors involve letters and vowels not introduced in Lesson 1; a novice should have enough instruction to answer from the niqqud shape alone.

### Media and access

Three unique HTTPS PNG URLs are supplied:

- [Aleph with Patah image](https://f005.backblazeb2.com/file/alef-bet-media/lessons/lesson_one/alef_patah.png)
- [Kamatz Gadol image](https://f005.backblazeb2.com/file/alef-bet-media/lessons/lesson_one/kamatz_gadol.png)
- [Hataf Patah image](https://f005.backblazeb2.com/file/alef-bet-media/lessons/lesson_one/hataf_patah.png)

Their presence in JSON is verified; file responses, dimensions, visual accuracy, MIME type, playback, cross-origin delivery, hotlink policy, and reuse rights were **not** checked. No media asset was fetched. There are **no audio URLs or audio study/exercise types in Lesson 1**. The list has no media fields, so course-wide audio availability cannot be established from it.

Separate repository evidence: `public/game-builds/alef-bet-rush/letter-audio-manifest.json` has 22 items with unique IDs, `nameAudio`, and `bundlePath`. All referenced local bundle files exist and are nonempty, including Alef. These are **letter-name recordings**, not verified readings of אַ / אָ / אֲ. Audio quality and rights were not audited. Reuse may be feasible after review, but should use a course-owned stable asset manifest rather than hardcode a game's hashed bundle paths.

Neither fetched API response exposes `isFree`, `premium`, subscription tier, lesson unlock state, pricing, login requirement, or access restrictions. Anonymous readability confirms this sample is retrievable without credentials; it does **not** establish the intended commercial or redistribution policy for the course. Avoid deriving a “free course” promise or `isAccessibleForFree` value solely from API accessibility.

### Editorial issues requiring review

1. The source mixes `Aleph` and `Alef`, as well as transliteration variants for niqqud. Choose a primary editorial spelling and preserve useful search aliases.
2. The material equates Patah and Kamatz Gadol with `[a]`, while one exercise tip introduces a long `[a:]` contrast. Decide and document the pronunciation tradition; do not import inconsistent length claims into a Modern Hebrew course.
3. Hataf Patah is described as `[a]` with the English example “sofa,” which risks a different vowel interpretation for an English-speaking learner. Confirm the explanation with a qualified Hebrew reviewer and suitable recordings.
4. A true/false statement claims Alef's pronunciation depends entirely on niqqud; its tip calls Alef completely silent, then acknowledges dialect/position variation. Review that absolute framing and distinguish a letter's consonantal role from the vowel carried by a pointed form.
5. The list's Ayin description similarly says it has no sound, while the Resh description promises a roll. Both need pronunciation-tradition review when their detail is later inspected.
6. The existing alphabet guide contains broad claims about silent letters and an oversimplified Kaf/Kuf sound equivalence despite its own table showing Kaf/Chaf variation. Preserve its URL and assignments, but schedule a separate editorial accuracy review before presenting guide and course explanations side by side.

These are review flags derived from source wording, not an authorized rewrite or a completed linguistic audit.

## 3. API export risks and recommended safeguards

### Fields unsuitable for indiscriminate public redistribution

| Exposed field / observation | Public-use concern | Recommended handling |
|---|---|---|
| `additionalData.correctAnswer` | Raw answer keys are already anonymously readable in Lesson 1. A full public dump would redistribute them wholesale. | Treat the fetched JSON as internal research. Publish only approved exercise content and the deliberately chosen grading model. |
| `tip` | Many tips state the correct answer; removing `correctAnswer` alone does not remove spoilers. | Review for public use; display after submission/reveal rather than in initial visible prompts. Confidential assessments require server-side explanations too. |
| `score: 0` | Undefined semantics could be misrepresented as user state or grading weight. | Exclude from the public normalized payload until the API owner documents it; compute local practice progress separately. |
| Image URLs and instructional copy | Public retrieval does not prove permission to embed, mirror, adapt, or redistribute every asset. | Obtain an explicit owner decision covering content, images, audio, and any premium material before publication. |
| Technical IDs | Useful for synchronization, but not meaningful learner-facing content. | Retain internally as stable source identifiers; avoid exposing them in headings or SEO titles. |
| Empty image descriptions / no revision metadata | Missing accessibility content and weak update provenance. | Add reviewed alt text, source hashes, and editorial revision dates in the normalized layer. |

No secrets, authorization tokens, personal identifiers, user records, or administrator fields were observed in the two JSON bodies. This finding applies only to these responses. It is not proof that future detail responses will be safe to redistribute.

The Lesson 1 response advertises `Allow: DELETE, GET, OPTIONS`, while the list advertises `GET, OPTIONS`. No DELETE or OPTIONS request was made. The header does not establish anonymous deletion permission. Keep any future export tool constrained to GET and the approved list/detail path patterns; do not probe the advertised method.

### Future export process, only after separate authorization

The supplied shell approach fits today's top-level list array, but it is not a sufficient publication pipeline. `set -eo pipefail` and `curl -f` catch some failures; they do not verify complete inventory, correct mapping, schema, rights, answer semantics, or useful content. `jq -c '.'` also permits any valid JSON shape, including an unexpected success-status error object.

Recommended safeguards:

1. Fetch the list anonymously; assert array shape, unique IDs/orders, category, required fields, and a reviewed expected inventory. If pagination appears, review the new contract and follow only bounded same-origin pagination with duplicate/loop checks.
2. Fetch only explicitly approved lesson IDs, at low concurrency, with finite timeouts, response-size limits, and bounded retry policy for transient read failures. Do not attach session cookies or credentials; stop on login/permission changes rather than elevate access.
3. Restrict redirects and request hosts; do not forward authorization to another host. Media-fetch jobs must use an approved HTTPS host/path allowlist, avoid local/private network destinations, and validate content size and MIME type.
4. Validate each response against a versioned raw schema and inventory identity. Assert unique exercise IDs, supported discriminators, nonempty required strings, choice/answer consistency, and actual array counts against the list. Unknown block or exercise types stop that lesson's publication; never silently drop them.
5. Maintain an explicit reviewed ID → letter → slug map. ID/order 4 is explicitly mapped to Dalet following owner confirmation; do not quarantine it or re-investigate the earlier description. The order is navigation metadata, not a slug generator.
6. Stage raw responses outside the deployable site artifact. Transform through a field allowlist into normalized public content. Keep keys/tips in a separate internal layer when the chosen grading model requires confidentiality.
7. Record source endpoint, retrieval time, content hashes, list metadata, normalization version, media provenance, and editorial decisions. Diff revisions and require review for answer, pronunciation, access, letter identity, or media changes.
8. Use an atomic snapshot replacement after all required checks pass. Preserve the previous approved snapshot for rollback. A failed/partial sync must not remove good pages or publish half of a course.
9. Verify the final HTML, client bundles, public JSON, and source maps against the intended public-content policy. Do not place raw snapshots or secrets in `public/` or expose secrets through `PUBLIC_*` variables.

No importer or full export was created or run in this investigation.

## 4. Proposed Semantic Core v2 expansion

### Existing foundation inspected

Read `semantic-core-v1.csv` (136 rows / 136 distinct keywords), `keyword-to-url-map.md`, `content-audit-v1.md`, `rank-tracking-keywords.csv` (36 rows), the three 136-row candidate datasets, `serp-pilot-budget.md`, and `serp-interpretation.md`. The v1 core has 14 thematic clusters. Alphabet reference/recognition has 11 rows; letter sounds/pronunciation has 11; Nikud/vowel marks has 13. The new **“Hebrew Letters — Individual Lessons”** cluster expands these neighborhoods without deleting them.

The existing records contain US Google Ads volumes, organic difficulty for selected queries, and 2026-10-10 Google US English mobile Android SERP observations. Ten pilot SERPs succeeded; two failed. Their returned samples had 6–8 organic URLs, so overlap was based on returned rows rather than guaranteed complete top tens. These findings are usable context but do not validate individual-letter demand or establish traffic forecasts.

In v1, `learn hebrew alphabet` is assigned to the existing guide and is SERP-supported. Alphabet chart, letter names, final letters, and general pronunciation are also assigned there. Bet/Vet, Kaf/Chaf, Shin/Sin and several sound-role queries already exist; Pe/Fe is mapped to the Nikud article. These assignments must stay intact until a later evidenced mapping revision, not change automatically because lesson URLs are proposed.

### Candidate coverage for all 22 letters

For **each** letter below, the companion explicitly includes these five query intents, substituting its primary spelling:

- `{letter} hebrew letter` — identification / primary candidate.
- `hebrew {letter} pronunciation` — pronunciation.
- `hebrew letter {letter} sound` — sound explanation.
- `learn hebrew letter {letter}` — guided beginner learning.
- `{letter} hebrew letter exercises` — practice tied to that letter.

The table adds transliteration aliases and individual educational questions. These are candidate hypotheses, not measured demand, guaranteed terms to target, or proof that the corresponding API detail teaches them. Generic identification can be answered briefly in the guide; a lesson earns its own target through richer instruction, examples, feedback, and practice. All non-Aleph-specific API content gates remain open.

| Letter / proposed slug | Primary identification candidate | Aliases to test on the same URL | Additional educational candidates / gates |
|---|---|---|---|
| א / `aleph` | aleph hebrew letter | alef | aleph with patah; aleph with kamatz; aleph with hataf patah; is aleph silent. Verified Lesson 1 combinations; review wording. |
| ב / `bet` | bet hebrew letter | vet | bet vs vet pronunciation; bet with dagesh. Conditional on detail/content review. |
| ג / `gimel` | gimel hebrew letter | gimmel | how to recognize gimel. Conditional on detail/content review. |
| ד / `dalet` | dalet hebrew letter | daleth | dalet vs resh hebrew letters. Identity confirmed by product owner; actual teaching content still requires review. |
| ה / `he` | he hebrew letter | hey | he vs chet hebrew letters; he at end of hebrew word. Conditional on detail/content review. |
| ו / `vav` | vav hebrew letter | waw | vav vowel and consonant sounds; vav with holam; vav with shuruk. Conditional on detail/content review. |
| ז / `zayin` | zayin hebrew letter | zain | how to recognize zayin. Conditional on detail/content review. |
| ח / `chet` | chet hebrew letter | het | how to pronounce chet in hebrew; chet vs he hebrew letters. Conditional on detail/content review. |
| ט / `tet` | tet hebrew letter | teth | tet vs tav hebrew pronunciation. Conditional on detail/content review. |
| י / `yod` | yod hebrew letter | yud | yod vowel and consonant sounds; yod with hiriq; yod vs vav hebrew letters. Conditional on detail/content review. |
| כ / `kaf` | kaf hebrew letter | chaf | kaf vs chaf pronunciation; kaf sofit; final kaf pronunciation. Conditional on detail/content review. |
| ל / `lamed` | lamed hebrew letter | lamedh | how to recognize lamed. Conditional on detail/content review. |
| מ / `mem` | mem hebrew letter | None prioritized | mem sofit; final mem hebrew letter. Conditional on detail/content review. |
| נ / `nun` | nun hebrew letter | None prioritized | nun sofit; final nun hebrew letter. Conditional on detail/content review. |
| ס / `samekh` | samekh hebrew letter | samech | samekh vs sin hebrew letters. Conditional on detail/content review. |
| ע / `ayin` | ayin hebrew letter | None prioritized | alef and ayin sounds; ayin vs aleph pronunciation. Conditional on detail/content review. |
| פ / `pe` | pe hebrew letter | pey,fe | pe vs fe pronunciation; pe sofit; final pe pronunciation. Conditional on detail/content review. |
| צ / `tsadi` | tsadi hebrew letter | tzadi,tsade,tzaddi | tsadi sofit; final tsadi hebrew letter. Conditional on detail/content review. |
| ק / `qof` | qof hebrew letter | kuf,kof | qof vs kaf hebrew pronunciation. Conditional on detail/content review. |
| ר / `resh` | resh hebrew letter | None prioritized | how to pronounce resh in hebrew; resh vs dalet hebrew letters. Conditional on detail/content review. |
| ש / `shin` | shin hebrew letter | sin | shin vs sin pronunciation; shin dot right or left. Conditional on detail/content review. |
| ת / `tav` | tav hebrew letter | taw | tav vs tet hebrew pronunciation. Conditional on detail/content review. |

Final-form coverage is proposed within **Kaf ך, Mem ם, Nun ן, Pe ף, and Tsadi ץ**. These do not become five extra lesson URLs. Likewise Bet/Vet, Kaf/Chaf, Pe/Fe, and Shin/Sin should share their base-letter page if supported by actual content. Do not apply every vowel combination to every letter as a keyword-generation template. Aleph's three combinations are verified; Vav with Holam/Shuruk and Yod with Hiriq are conditional candidates until their lessons are reviewed.

The companion `semantic-core-v2-alphabet-expansion-candidates.csv` contains **174 letter-oriented rows**, of which 165 are new and nine exactly match v1; **six new course-hub rows**; and **15 additional existing-v1 controls**. Existing matches retain their current URLs. New volume/difficulty cells are blank, and research/SERP status is `not_requested`; a blank is not zero. All rows record content gates, target proposals, and the fixed future US/English/mobile settings.

### Ambiguity and exclusions

Qualify candidate wording with `Hebrew`, `letter`, or a teaching modifier. Review result meaning rather than aggregate a bare name's demand:

| Name / alias | Non-course interpretations to exclude from letter demand |
|---|---|
| Bet | Betting/gambling, brands, and unrelated phrases |
| He / Hey | English pronoun, greeting, music titles, brands |
| Nun | Religious vocation, names, organizations |
| Shin / Sin | Body part/injury, moral/religious doctrine, unrelated media |
| Mem | Computing/memory abbreviations, names/brands; do not fold in “meme” demand |
| Tet | Holiday, organizations, acronyms |
| Pe / Fe | Acronyms, physical education, professional qualifications, chemistry |
| Aleph / Alef | Brands, literature, mathematics and other named entities |
| Tav / Qof / Kuf / Resh and other aliases | Names, products and acronyms; inspect actual SERP meanings |

Do not treat symbolic/mystical meaning, gematria, Biblical-only pronunciation, calligraphy, or handwriting as automatically in scope. Add them only when the actual curriculum and result intent warrant it. Bare-letter searches may be diagnostic ambiguity probes in a later small approved batch, but are not included in the demand research queue as course targets.

### DataForSEO research batch plan — not executed

Keep exact v1 keyword identity and provenance. Deduplicate only exact normalized phrases (case/whitespace); spelling variants remain independently inspectable. Use a separate expansion dataset and retain match-back fields for v1. Do not sum closely related variant volumes into a claimed total demand. Provider grouping/spelling correction must be preserved in outputs.

| Stage | Proposed work | Scope / resulting decision |
|---|---|---|
| V2-A: Volume | Google Ads Search Volume Live, US `2840`, English `en`, Google search partners excluded | 171 new phrases, staged as one task/request initially. Preserve provider-null separately from explicit zero. Existing v1 volume records remain historical. |
| V2-B: Primary SERP pilot | Google Organic Live Advanced, US/English, mobile Android, depth 10 | **32 exact queries**: 22 primary letter candidates + first four hub candidates + three verified Aleph vowel candidates + three existing reference/game controls listed below. Assess target format, ambiguity, overlap, and primary intent. |
| V2-C: Secondary SERPs | Same fixed configuration | After V2-A/B, choose only secondary queries whose result intent could change a URL/content decision, including final forms and sound variations. Review known v1 assignments before any reassignment. |
| V2-D: Difficulty | Google Labs Bulk Keyword Difficulty, US/English | A separately selected shortlist after relevance and page-format qualification. Organic difficulty is a provider estimate, not Google Ads competition or a mobile-only metric. |
| V2-E: Versioned merge | Offline, after qualification | Copy v1 intact to a new v2 artifact and append approved new rows; record every justified target-map revision separately. Keep v1 archived and byte-identical. Extend rank tracking only after actual pages/targets are confirmed. |

The four hub pilot phrases are `hebrew alphabet course`, `hebrew alphabet lessons online`, `interactive hebrew alphabet course`, and `hebrew alphabet course for beginners`. Aleph pilot modifiers are `aleph with patah`, `aleph with kamatz`, and `aleph with hataf patah`. The three v1 controls are `learn hebrew alphabet`, `hebrew alphabet chart`, and `hebrew alphabet quiz`. Together with the 22 table primary candidates, this defines the complete 32-query SERP pilot without relying on a missing external selection file.

Later secondary research should compare course-vs-reference controls with equivalent educational queries and inspect `bet vs vet pronunciation`, `shin vs sin pronunciation`, `kaf vs chaf pronunciation`, `pe vs fe pronunciation`, `vav vowel and consonant sounds`, `yod vowel and consonant sounds`, `alef and ayin sounds`, plus five final-form groups. Existing terms are comparison controls, not new additions.

Payload example for **one future task only**; this is documentation, not an executed request:

```json
[
  {
    "keyword": "aleph hebrew letter",
    "location_code": 2840,
    "language_code": "en",
    "device": "mobile",
    "os": "android",
    "depth": 10
  }
]
```

Target endpoint: `POST /v3/serp/google/organic/live/advanced`. Live SERP supports **one task per call**, so the logical 32-query batch requires 32 requests, not one multi-keyword Live SERP call. Keep depth 10 and omit paid extras. [DataForSEO Live Advanced documentation](https://docs.dataforseo.com/v3/serp-se-type-live-advanced/).

Volume endpoint: `POST /v3/keywords_data/google_ads/search_volume/live`; the documentation permits up to 1,000 keywords in one task. This data is not device-specific. Close variants may have grouped volumes, so additional split requests would be a separately planned research step. [Google Ads Search Volume Live](https://docs.dataforseo.com/v3/keywords_data-google_ads-search_volume-live/).

Difficulty endpoint: `POST /v3/dataforseo_labs/google/bulk_keyword_difficulty/live`; up to 1,000 keywords in one task. [Bulk Keyword Difficulty documentation](https://docs.dataforseo.com/v3/dataforseo_labs-google-bulk_keyword_difficulty-live/).

Before any future spend: recheck the tariff, define a request count and maximum spend, and obtain the required separate authorization. The old budget/account balance is dated and is not assumed current. Preserve task/request costs, status, keyword, endpoint, exact settings, timestamps, and raw results; reconcile the cost ledger. No automatic paid retries. For SERPs, record organic URLs/ranks, page types, meanings, features, and returned result count; calculate overlap only from comparable successful samples. Absence of HebrewEdu from a returned sample is not proof of zero rankings. No current tariff, balance, or demand forecast is claimed here.

## 5. Course Hub versus Alphabet Guide SEO responsibilities

| Page | Primary responsibility | Query examples / boundary | Distinctive user value |
|---|---|---|---|
| `/blog/hebrew-alphabet-complete-guide/` | Whole-alphabet reference | Chart, names, letter count, general final forms, overview of sounds; retain v1's `learn hebrew alphabet` assignment pending new evidence | Scan the full alphabet and answer broad reference questions quickly. |
| `/learn/hebrew-alphabet/` | Guided course entry and progression | Course, lessons online, interactive learning path, beginner exercises | Outcomes, reviewed syllabus, actual start/resume action, lesson links, prerequisites, truthful access/audio expectations. |
| `/learn/hebrew-alphabet/{letter}/` | One letter's instructional lesson | Qualified letter identification with detailed teaching; letter-specific pronunciation, taught combinations, final forms and exercises | Learn a specific skill, practise it, receive feedback, and continue through the sequence. |
| `/blog/how-to-read-hebrew-nikud/` | Niqqud reference/explanation | General vowel chart and mark definitions; keep existing assignments | Explain the system across letters; link to Aleph for applied practice. |
| `/play/` and current game landing pages | Browser-game discovery and game-specific practice | Retain games online, alphabet quiz, general letter-recognition and matching-game targets | Play actual games; course practice is contextual reinforcement. |
| `/` | Mobile-app discovery and product proposition | Retain alphabet-app and app-selection targets | App features, platform choice and downloads. |

**Highest cannibalization risk:** a new hub titled “Learn Hebrew Alphabet” and a copied alphabet-table guide both chasing the same broad v1 query. Differentiate the hub's title/H1 around a course with lessons and practice, while retaining the guide's comprehensive-reference promise. A sensible later hub title is “Hebrew Alphabet Course: 22 Letter Lessons and Practice | HebrewEdu,” but only after all 22 identities and the public experience are validated. Do not advertise completion, audio, or free access prematurely.

**Individual-letter risk:** the guide already supplies each letter's name and sound. A letter lesson that simply repeats one table row plus generic prose does not add sufficient search value. Lesson 1 has a potentially distinct applied-niqqud learning task; other details must be audited before their indexability is assumed. General “Patah versus Kamatz” belongs to the existing mark explanation; Aleph-specific application can be taught in the lesson and linked back.

Distinct pages about the same alphabet are not automatically harmful. The research question is whether the same intent is receiving competing, interchangeable URLs. Use dated SERPs and later page/query GSC evidence to distinguish reference, course and lesson audiences. Record changes to v1 URL ownership explicitly; no reassignment, canonical consolidation, or redirects are authorized in this investigation.

## 6. Proposed URL architecture and indexability

```text
/                                          existing mobile-app homepage
/blog/hebrew-alphabet-complete-guide/       existing reference guide
/blog/how-to-read-hebrew-nikud/             existing niqqud explanation
/learn/hebrew-alphabet/                    proposed course hub
/learn/hebrew-alphabet/{letter}/           up to 22 proposed lessons
/play/                                    existing game directory
/play/alef-bet-rush/                        existing game landing page
/play/hebrew-mahjong/                       existing game landing page
```

The 22 proposed slugs are the values in the candidate table: `aleph`, `bet`, `gimel`, `dalet`, `he`, `vav`, `zayin`, `chet`, `tet`, `yod`, `kaf`, `lamed`, `mem`, `nun`, `samekh`, `ayin`, `pe`, `tsadi`, `qof`, `resh`, `shin`, `tav`. Stable ASCII slugs fit the English site. Aliases belong in readable copy/metadata and keyword research, not duplicate pages. Confirm the spelling convention before implementation; do not generate redirect rules now. No additional `/learn/` index page is necessary for this proposal, and breadcrumbs must not link to a nonexistent `/learn/` route.

### Individual-lesson indexing gate

Index a lesson only when all of the following hold:

- Its source identity is verified and its reviewed central objective is distinct. Dalet identity is confirmed by the product owner; its uninspected content still needs the ordinary review applied to other lessons.
- It contains useful static instructional content: letter shape/name, accurate sound explanation, actually taught forms/combinations, examples or meaningful diagrams, and practice context. A generic API title and repeated boilerplate are insufficient.
- The educational explanation is available in initial HTML without login, client API fetch, game iframe, or completing an exercise. Interactivity enhances the lesson rather than being its only content.
- Rights/access policy is approved; no confidential or inadvertently premium fields are published. Media and non-audio equivalents work.
- It has a unique title/H1/description, reviewed accessibility, canonical URL, real internal links, and consistent JSON-LD describing the visible experience.
- It serves a plausible distinct educational need, checked against its parent guide and adjacent lessons. A small or unknown keyword volume does not by itself make a useful lesson thin; duplication and insufficient content are the decisive risks.

Do not force 22 indexed detail pages for a numerical goal. An educationally useful but short lesson may remain a course section or a crawlable `noindex` page, outside the XML sitemap, until it meets the gate. Drafts and the proof of concept should remain local/private. `noindex` is not access control; never rely on it to protect confidential data. Google must be able to crawl a public `noindex` page to read that directive. [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

### Canonicals and state URLs

Use self-referencing absolute HTTPS canonicals for the guide, hub and each independently valuable lesson. Do not canonicalize every lesson to the hub, or the hub to the guide: they have different content and intended search responsibilities. Canonical signals concern duplicate/similar versions, not a cure for poorly differentiated intent. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Prefer local state and fragments for exercise number, progress, reveal, and resume. Do not create separate indexed URLs for each answer or exercise. Parameter variations of the same lesson should resolve to its clean canonical; avoid generating crawlable parameter permutations. Keep a single English route without `?lang=en`. Do not add alternate-language/hreflang claims until real translated web pages exist.

### Internal links and navigation

- Hub → every available, reviewed lesson using ordinary anchors in verified teaching order; show letter names, glyphs, and truthful status. Unpublished lessons should not be live links to 404s.
- Lesson → hub, previous lesson, next available lesson, and an accessible course contents list. Sequence derives from a validated mapping manifest, not lexicographic slugs.
- Guide → hub with a course-start invitation; relevant table/paragraph entries may link to deeper lessons without duplicating their exercise content.
- Lesson → guide for the whole chart and to the Nikud guide for system-wide definitions. Add focused links between genuinely confusable letters where the explanation exists.
- Seven-day study plan → appropriate course milestones after the sequence is validated; preserve its study-plan search role.
- Course/lesson → games as optional recognition review; game pages → relevant course entry. Do not imply game progression knows which course lesson the visitor completed unless integration actually exists.

Use labels such as “Previous lesson: Aleph” and “Next lesson: Bet.” Keep English navigation LTR and Hebrew samples locally RTL; avoid relying on arrow direction alone. Progress must not prevent crawlers or users from visiting later lessons. A syllabus remains readable without JavaScript.

### Sitemap and structured data

Add only public, indexable, canonical hub/lesson URLs that passed the gate to the existing custom sitemap. Exclude drafts, `noindex` practice-only pages, raw exports, parameter states, and game runtimes. Derive `lastmod` from reviewed meaningful content changes, not every sync/build. Existing sitemap entries and real update dates stay intact. Google ignores `priority` and `changefreq`; use the current site's format without treating those fields as ranking controls. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Recommended later JSON-LD:

- Hub: `WebPage` with `Course` as its main educational entity, provider, real description/outcomes, language, and `hasPart` links to available lessons. An ordered `ItemList` can describe the visible syllabus.
- Lesson: `WebPage` with `LearningResource`, `learningResourceType: "lesson"`, `educationalLevel: "Beginner"`, `teaches`, and `isPartOf` the course; `BreadcrumbList` for Home → Hebrew Alphabet Course → Aleph.
- Guide: retain its existing `BlogPosting` responsibility; no need to relabel it as the course.
- Describe only actual media, access, instructors and outcomes. Do not invent duration, rating, certificate, roster, offers or `isAccessibleForFree` from missing API fields.

Schema.org supports these course/learning relationships, but semantic markup does not promise a Google enhancement. Google’s documented **course-list** rich result requires at least three courses and additional course criteria. This proposal is one course with 22 lessons; do not label lessons as 22 standalone courses to satisfy that requirement. [Schema.org Course](https://schema.org/Course), [LearningResource](https://schema.org/LearningResource), [Google course-list requirements](https://developers.google.com/search/docs/appearance/structured-data/course).

### Mobile-app conversion paths

Let the web lesson deliver its promised learning task before presenting an app CTA. Reuse the site's existing App Store/Google Play links through `StoreButtons`, with contextual placement after useful instruction or an exercise summary. Offer “Continue practising in the app” only with an accurate explanation of what the app adds. Without verified deep links, do not promise automatic lesson-position transfer or shared progress; the current app links are store destinations.

Track course start, lesson viewed, practice completed, next-lesson navigation, game click and store click only through an approved analytics setup. Reuse `data-store` / `data-cta-location` hooks; confirm event delivery before claiming metrics. Distinguish clicks from app installations. Avoid collecting free-text answers or personal information just to measure engagement. Preserve homepage/app and existing `/play/` conversion paths.

## 7. Astro feasibility and recommended content pipeline

### Repository facts

| Existing component | Verified implementation | Implication for the course |
|---|---|---|
| `package.json`, `package-lock.json` | Astro dependency `^7.3.5`, locked version `7.3.5`; Node requirement `>=22.12.0`; no separate React/Vue/Svelte dependency | Plain Astro and small client scripts can handle the observed exercise types. Verify locked-version API compatibility during the later POC. |
| `astro.config.mjs` | `output: 'static'`, site `https://hebrewedu.com`, `trailingSlash: 'always'` | Build local approved snapshots into static routes; no visitor-time API dependency needed. |
| `src/content.config.ts` | Existing blog collection uses `glob` and Zod via `astro/zod` | Add a separate normalized lesson collection; preserve the blog schema and loader. |
| `src/pages/blog/[slug].astro` | `getStaticPaths()`, rendered Markdown, `BlogPosting`, shared navigation/footer and store CTA | Retain this route and blog rendering. Course lessons should use their own route/template. |
| `src/layouts/Layout.astro` | English/LTR document; path-based canonical; optional JSON-LD; hardcoded `index, follow` | Reuse shell, but a later lesson/draft implementation needs a reviewed way to override robots metadata. Current layout cannot safely mark a draft `noindex` without a change. |
| `src/pages/sitemap.xml.ts`, `src/data/page-updates.ts` | Explicit static pages plus blog collection; meaningful-date validation | Add eligible course entries from the validated manifest rather than a separate inconsistent sitemap. |
| `public/robots.txt` | Allows crawling; links to current sitemap | No current course-specific crawl policy. Do not block lesson content needed for indexing. |
| `/play/` routes | SEO landing pages separate from `noindex` iframe player routes; runtimes also protected by sync rules | Leave the games' landing/runtime separation intact. A native lesson page should expose its teaching content directly in HTML. |
| `StoreButtons`, `site.ts` | Both store destinations and CTA tracking attributes already centralized | Reuse destinations and UI rather than create competing app-download architecture. |

No website build, dependency installation, runtime modification, or code test was needed for this read-only feasibility review. Feasibility is based on source inspection, not a running course prototype or measured performance.

### Proposed static pipeline

```text
Read-only API list + explicitly approved detail reads
  → staged raw snapshot outside public artifacts
  → raw schema validation + explicit identity mapping
  → reviewed normalization / public-field allowlist
  → approved JSON + stable media manifest + editorial metadata
  → separate Astro lesson content collection
  → static hub + eligible static letter pages
  → optional client-side practice and local progress
```

Separate fetching from `astro build`: an ordinary site build should consume the last reviewed local snapshot, not make 22 network calls or change lesson content implicitly. An explicit future synchronization command can prepare updates for review. Missing/corrupt approved content should fail the build rather than render empty placeholders. Offline builds then remain reproducible and preserve the last accepted content when the API is unavailable.

Astro documents local JSON through `file()` and JSON glob collections with schema validation. A normalized array with stable unique string `id`s can use `file()`, or one JSON file per lesson can use `glob()`. The choice should be checked against this repository's locked version when the later POC is built. [Astro content collections](https://docs.astro.build/en/guides/content-collections/).

Proposed normalized schema responsibilities:

| Layer | Required validation / fields |
|---|---|
| Raw lesson | Integer source ID/order, exact category, strings, `studyMaterials` and `exercises` arrays; discriminated unions matching actual type fields. |
| Lesson identity | String collection ID, immutable slug, Hebrew glyph, aliases, source ID, verified sequence, reviewed public title/description, distinct objective. |
| Study blocks | Discriminator-specific fields; preserve source array order; reviewed semantic heading mapping; text escaped by default. Unknown types rejected. |
| Exercises | String source IDs; explicit boolean conversion for true/false; single-choice options with generated stable option IDs; answer mapping validated before removing or deliberately publishing keys. |
| Media | Approved URL/local path, MIME/type, dimensions or duration after verification, alt text/transcript, ownership status, checksum. No fabricated metadata. |
| Publication | `draft` / `ready` / `indexable` decisions, rights/access status, reviewer, genuine editorial update date, source timestamp/hash and normalization version. |

This is a schema plan, not a claim that those metadata fields already exist in the API. Raw schemas should surface unexpected fields for review; public schemas should emit only allowed fields. Blocks lack persistent IDs, so a snapshot can use stable internal positions while updates receive a human-readable diff. Do not invent durable API block identities from mutable text hashes.

### RTL, niqqud and grading

Keep the English page document `lang="en" dir="ltr"`. Mark Hebrew text runs with `lang="he" dir="rtl"`, using directional isolation for mixed inline copy. Use CSS logical spacing properties and avoid letter-spacing styles on pointed Hebrew. Provide a Hebrew-capable font with tested niqqud placement; the site's Latin-first global font choices should not be assumed sufficient. At narrow widths and zoom, marks must remain visible without clipping.

The raw choices contain Hebrew presentation forms: **`פּ` (U+FB44)** and **`שׂ` (U+FB2B)**. Locally inspected Unicode normalization maps them under NFC to base Hebrew letters plus combining marks. Preserve the original snapshot, normalize the teaching/grading representation consistently, and map source answers to option IDs **before any shuffle**. In these examples NFC is sufficient; do not strip vowel points or shin/sin dots, because that destroys the tested distinction. Do not apply NFKC indiscriminately to every content string. Unicode defines the differences between canonical and compatibility normalization. [Unicode normalization standard](https://www.unicode.org/reports/tr15/).

Use stable option IDs rather than rendered-string equality in the browser. Validate that normalization does not make two distinct options equivalent. If typed answers are added later, specify accepted orthography/niqqud rules separately; typed response grading is not part of the observed API contract. `Boolean("false")` is true in JavaScript and must not be used for true/false answer conversion.

### Images, audio, accessibility and mobile behavior

Use reviewed local assets or approved remote paths with reserved image dimensions. Add meaningful alt text describing the letter/mark relationship rather than filenames. Show actual Hebrew text and an explanatory caption alongside diagrams so essential teaching is not image-only. After permission and validation, caching/mirroring can reduce reliance on remote media availability; no such download has occurred here.

Audio should be user-triggered, with labelled play/replay controls, no autoplay, a textual pronunciation equivalent, and a useful failure state. Letter-name recordings cannot substitute for every syllable example. Keep original images/audio lazy or on-demand where appropriate and avoid shipping every course asset on the hub.

Render exercises as semantic forms with fieldsets, legends and labelled radio choices. Provide explicit submit/retry/reveal actions, keyboard operation, visible focus, feedback announced through a polite live region, and correctness information beyond color. Keep DOM reading order meaningful when column/grid presentation changes. Do not require speed or a mouse to learn. A no-JavaScript version should retain explanations and practice prompts with an intentional fallback for checking answers.

Use a single readable column on small screens, large pointed glyphs, generous tap targets, and a compact but accessible course-navigation menu. Test 320/375/390-pixel widths, 200% zoom, mixed RTL/LTR text, and at least one mobile screen reader. Progress can initially be device-local, versioned and resettable. It is not app-synced progress, and future content revisions must not silently misapply old completions to changed lessons.

### Answer keys and credentials: architectural choice

For ordinary public self-assessment, a static site can deliberately ship grading logic, options, approved correct answers and post-answer explanations. Users can inspect the browser bundle. Obfuscation, hiding a JSON file, or suppressing visible tips cannot keep such answers secret. This model is acceptable only after an explicit public-use decision; it must not be presented as confidential testing.

If protected premium exercises, confidential answer keys or authoritative scores are required, this all-static grading model is **No-go**. A separately scoped server-side grading/access service would be necessary, with keys/tips excluded from client payloads and credentials stored server-side. No administrator credentials should be used for content synchronization. Server endpoints, entitlements and protected grading are future architecture work, not part of this investigation or the recommended first POC.

### Synchronization and preservation

No source revision timestamps are exposed, so use retrieval provenance plus semantic content hashes and editorial approval. Do not rewrite `lastmod` merely because bytes were fetched again. Review source/content diffs and allowlist changes before replacing snapshots; compare source counts but tolerate additions only after mapping review. A disappeared lesson should trigger a decision rather than automatically deleting a published URL.

Future work should be additive: a separate lesson collection, course components/styles, and `/learn/hebrew-alphabet/` routes. Keep `src/pages/index.astro`, the blog's loader/content routes, existing schemas and game runtime behavior intact. Reuse the shell/design tokens/store links, and later make only the minimal reviewed navigation/sitemap/robots-prop additions necessary. No modifications were made now.

## 8. Recommended Lesson 1 proof of concept

**Scope for a later implementation:** one local, unpublished Aleph lesson backed only by the reviewed Lesson 1 snapshot. A course-hub mockup may show the mapped syllabus with content-review statuses, but must not claim a complete playable course. Do not fetch the other 21 details as part of this POC.

Suggested local URL: `/learn/hebrew-alphabet/aleph/`. Suggested H1: **“Aleph (א): Patah, Kamatz Gadol and Hataf Patah.”** Intended outcome: identify Aleph and distinguish its three taught vowel-mark combinations in the selected pronunciation tradition. Add a reviewed explanation of letter name versus pointed sound; do not silently repeat the source's absolute “silent” statement.

The POC should exercise all five observed study block types and all three observed exercise types. Use the 11 blocks and 14 questions as reviewed source material, preserving source references and documenting corrections. Designate simple completion/accuracy feedback explicitly rather than treating all-zero API scores as a grading rubric. The three images can be used only after reuse/accuracy/accessibility verification; otherwise, use reviewed textual Hebrew examples while the media decision is pending.

Audio is a separate POC gate: review reuse of the existing Alef name recording; obtain approved pointed-form audio if the page promises listen-and-repeat or audio pronunciation practice. A visual reading/exercise POC can proceed without new audio if its copy accurately states its limited functionality. The broader “course with audio” candidate stays held.

Acceptance checks for a later POC:

1. Static HTML includes useful teaching copy, marked Hebrew text, canonical metadata and visible navigable context without client API requests.
2. All supported blocks render; no unknown field/type is silently skipped. Image alt text and mark placement receive human review.
3. One correct and one incorrect answer behave as intended for each exercise type. Parsing `"false"` works even though the sample happens to use only `"true"`; supplied Hebrew presentation forms match normalized equivalents without losing niqqud.
4. Option shuffling preserves correct grading through IDs. Tips appear at the intended point, and feedback is usable via keyboard and screen reader.
5. Narrow-screen and zoom checks preserve vowel marks and reading order. Audio controls/fallbacks are checked only if audio has been approved and added.
6. The build/deploy artifact matches the public-field decision: no raw export, secrets or confidential key/tip leakage. Local/public self-assessment answer inspection is understood where deliberately chosen.
7. Existing homepage, 18 blog routes, game pages, canonicals and sitemap entries pass an appropriate regression comparison. No app-progress/deep-link capability is claimed without verification.

Do not publish this POC, include it in the sitemap, submit it for indexing, or create redirects as part of the investigation. A future local POC and a future public launch are separate actions.

## 9. Phased implementation plan and Go / No-go criteria

These phases originated as recommendations. The owner subsequently authorized research and roadmap updates; those outcomes are recorded in `semantic-core-v2-research-report.md`. Website implementation remains out of scope, as clarified by the user.

| Phase | Work | Exit evidence / decision |
|---|---|---|
| 0 — Investigation (completed) | Preserve v1; inspect list + Lesson 1; prepare candidates, architecture and feasibility report | Report and candidate companion saved; unresolved findings explicit. |
| 1 — Resolve content/public-use policy | Lesson 4 identity is settled by owner confirmation; confirm teaching tradition, rights, access and static answer-key model | Reviewed ID map, documented reuse decision and pronunciation corrections; no unsupported free/audio claims. |
| 2 — Approved SEO research | Execute only the separately approved bounded DataForSEO volume/SERP/KD plan; compare guide/course/letter responsibilities | Costs and provider statuses recorded; relevant candidates qualified; versioned mapping proposals, v1 preserved. |
| 3 — Local Lesson 1 POC | Build validated local schema, normalization, static content and small exercise renderer | Acceptance checks above passed; no public deployment. The POC may proceed before paid research if framed as educational/technical feasibility only. |
| 4 — Separately approved full read export and content audit | Inspect/export the other details with safeguards; enumerate all real types and rights/media/access issues; review prerequisites and unique objectives | 22 correctly mapped lessons or a documented smaller valid curriculum; every new type supported or publication held. |
| 5 — Reviewed publication batch | Prepare hub and eligible lessons; meaningful links, canonical/robots/sitemap/schema checks; homepage/blog regression comparison | Concrete reviewable launch artifact. Obtain separate launch authorization; begin with a small eligible cohort if useful. |
| 6 — Monitor and expand | Check indexing, page/query GSC behavior and actual learning/conversion events; expand only eligible content | Different reference/course/lesson query ownership, useful learner progression and reliable assets; revise content/targets when evidence supports it. |

### Rollout gates

| Gate | Current status | Go criterion / No-go trigger |
|---|---|---|
| Base-letter identity mapping | **Accounted for; Dalet owner-confirmed** | Use ID 4 → Dalet. No mismatch investigation remains. Review each lesson’s central teaching objective during the ordinary future content audit. |
| Lesson content/type inventory | **Partial** | Validate every detail and all types before that lesson is published. Stop unknown types or empty/generic content. |
| Linguistic quality | **Review required** | Qualified review resolves Aleph vowel examples, length/silence claims, dialect scope and consistency with reference pages. |
| Rights and access | **Unknown** | Confirm permitted web use, premium policy and media reuse. Stop unauthorized redistribution or entitlement bypass. |
| Answer-key model | **Decision required** | Deliberate public self-assessment can use static grading. Confidential grading/premium protection requires a separate service; do not ship protected keys/tips. |
| Audio/media | **Partial evidence** | Verify usable permitted files, alt text and audio equivalents for every advertised capability. No audio-led claims based only on name recordings. |
| SEO differentiation | **Hypothesis** | Course, guide, games and eligible letters have distinct useful tasks; paid research and later GSC review support mapping decisions. No forced 23-page index target. |
| Static implementation | **Feasible, unbuilt** | POC demonstrates rendering, grading, RTL, accessibility and artifact control; relevant regressions pass. |
| Operational updates | **Planned** | Atomic snapshots, diffs, approved media manifest, rollback and real editorial dates work. Stop partial/undocumented syncs. |
| Publication authorization | **Absent by design** | A later reviewed launch is explicitly authorized. This investigation ends with research artifacts only. |

No numerical organic traffic, course completion or installation target can be justified from this investigation. Establish per-page/query impressions and clicks, index coverage, course starts, practice completion, next-lesson clicks, game visits and store-click baselines when an authorized pilot exists. Course/game UI events measure interaction, not necessarily learning mastery or app installs. Monitor cannibalization through query-to-page patterns and combined useful acquisition/conversion, rather than treating two ranking URLs alone as a failure.

## Initial investigation evidence provenance and preservation

API response `Date` headers recorded:

- List: `Sun, 11 Oct 2026 05:02:36 GMT` (08:02:36 Europe/Tallinn).
- Lesson 1: `Sun, 11 Oct 2026 05:02:58 GMT` (08:02:58 Europe/Tallinn).

SHA-256 of temporary raw bodies:

```text
list:     c4061d706ea93ebea480917bfb9f1ab8039733455a89dc8dc1d7f2ee84d76188
lesson 1: 0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7
```

Website facts are based on the working-tree files named in section 7, the alphabet guide Markdown, shared navigation/resources/styles, store component, Alef Bet Rush audio manifest, and its sync script. No deployed HTML, Core Web Vitals, media playback, Search Console property, or app entitlement behavior was audited. No DataForSEO API endpoint was called.

Preservation check: the original seven foundation/candidate files below were hashed before and after drafting and remained byte-identical. The rest of the pre-existing research workspace was also used read-only; this investigation adds only this report and its candidate companion. Website `git status --short` was empty before the work and remained empty afterward.

| Original file | SHA-256 (unchanged) |
|---|---|
| `semantic-core-v1.csv` | `6db9afe17f4413b6d6dff44fff7c02829e7e88dbeb8f92e8fcfb264fb5e6ccd6` |
| `keyword-to-url-map.md` | `693f9062ce8325b3a77c02429d569905613e1d9af801c8a32363bf4a9f720a6d` |
| `content-audit-v1.md` | `dba300a445be20490627eebe16efa606b0756feed681f3e6362ee18623fdf89a` |
| `rank-tracking-keywords.csv` | `e8082c3bf1e0d3072b74bfa1cf0bd40659256c289757a1bd907c45b1f30ad1a3` |
| `keyword-candidates.csv` | `c5fe8931f014fc117aaed4adfc94492ecfb90488752c697cdbf5571c1628b79d` |
| `keyword-candidates-qualified.csv` | `4521fc8729ae7de068137106dcbc5b3738bc16ec0e2b59def4c1cfca9288edfc` |
| `keyword-candidates-with-volume.csv` | `b795bc03d90724e6a1fe25631f2050ac84a968a1209aa80ee86985c3310a37e9` |

The companion is intentionally separate from `semantic-core-v1.csv`, `rank-tracking-keywords.csv`, and all existing measurement artifacts. It does not overwrite a completed core, measurement table, target map, or tracker.
