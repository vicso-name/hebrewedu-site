# Aleph source synchronization review

Reviewed 2026-10-11. **Synchronization blocked: required editorial corrections are incomplete in the fetched source.** The accepted raw snapshot, normalized lesson, presentation rules, answer keys and publication settings remain unchanged. No source wording was repaired in Astro.

## Snapshot comparison

An anonymous GET of `https://api.hebrewedu.com/api/lessons/1/?lang=en` returned HTTP 200. No credentials or API writes were used. The exact response bytes were saved separately before parsing or validation.

| Snapshot | Private path | SHA-256 |
| --- | --- | --- |
| Accepted original | `.local/lesson-snapshots/lesson-1.raw.json` | `0306e249dc168efd7d49e886553f7aa61733cb6ca26307c7cc0a07215b5999a7` |
| Candidate fetched 2026-10-11 19:15:34 Europe/Tallinn (16:15:34 UTC) | `.local/lesson-snapshots/lesson-1.20261011T161534695940Z.raw.json` | `5755df728c0c8d9b6e900385857c50787e869ad4a1ed19f7153f60d74534ac79` |

The candidate is 8,337 bytes versus 8,065 bytes originally. Twelve fields changed across three study blocks and seven exercises: B2 content, B9 content, B11 content, Q1 tip, Q3 tip, Q4 content/tip, Q8 tip, Q10 tip, Q11 content/tip, and Q14 tip. Metadata, types, order, option arrays, media URLs and **all answer keys** are unchanged. No intentional count change was observed.

The existing [editorial review](hebrew-alphabet-lesson-1-editorial-review.md) and [course review register](hebrew-alphabet-course-review-register.md) describe the accepted original source. They remain historical evidence; the findings below apply to the new candidate. Automatic keyword flags were reviewed semantically and were not treated as proof of errors.

## Required corrections

| Requirement | Result | Evidence and consequence |
| --- | --- | --- |
| Q4, `1742106507820`: corrected wording, False key and explanation | **Fail** | New prompt: “In everyday Modern Hebrew, the letter Aleph (א) is usually silent, while niqqud marks can indicate its vowel sound.” Its key is still `"true"`. The explanation says Aleph usually has no audible consonant sound and shows אַ, אָ and אֲ. This scoped statement is consistent with its current True key, but it is a different revision from the required False question; changing the key alone would make this statement incorrectly graded. It does not explain the possible glottal stop. |
| Q11, `1742106507827`: Hataf Patah question/explanation | **Pass** | Prompt asks for the mark representing a reduced [a] vowel with a horizontal line beside two vertical dots. Explanation combines the Patah-like line with Sheva dots, especially under gutturals. The ultra-short/super-quick timing instructions are removed. Key remains Hataf Patah. |
| Q14, `1742106507830`: Modern Hebrew vowel question/explanation | **Pass semantically** | The unchanged question asks the sound of אֲ, with [a] as its key. The new explanation explicitly scopes teaching to Modern Hebrew, calls it a reduced [a] vowel, and says exact vowel length need not be distinguished. The neutral existing prompt is equivalent in this context; an exact prompt replacement is unnecessary. |
| B6: corrected pronunciation explanation | **Unmet / unconfirmed** | Text is byte-for-byte unchanged: “When Aleph is paired with a Kamatz Gadol, it shares the exact same [a] sound—like the \"a\" in \"father.\"” It remains unscoped locally. The new B11 conclusion adds beginner Modern Hebrew scope, but the requested B6 correction itself is absent. This finding does not assert that [a] is incorrect in Modern Hebrew. |
| B7: corrected written-mark explanation | **Fail** | Still says “two vertical dots placed to the left of the horizontal line.” The erroneous left-position description from the earlier editorial review remains. |
| B9: corrected pronunciation explanation | **Pass** | Replaces the sofa analogy with reduced [a]; distinguishes traditional brief-vowel terminology from beginner Modern Hebrew, without requiring timing distinctions. |
| Q3 tip: no misleading long/short timing claim | **Pass** | Removes long [a:] and explicitly says Modern Hebrew does not require a long-versus-short [a] distinction here. |
| Q10 tip: no misleading long/short timing claim | **Pass** | Removes the short [a] instruction and explicitly says there is no required short-versus-long [a] contrast in Modern Hebrew. |
| Theory: Aleph's possible glottal-stop role | **Fail** | No study block introduces a glottal stop or equivalent description. B2 now explains niqqud and letters helping indicate vowels; that change does not teach the missing consonantal role. |

Additional source improvements: B11 summarizes the three marks in beginner Modern Hebrew; Q1 acknowledges vowel-indicating letters; Q8 explicitly identifies Pey with dagesh and Patah. These were recorded, without updating the web lesson.

## Integrity and answer review

- Strict UTF-8/JSON parsing, duplicate-key checks, the existing Aleph raw schema and existing course structural auditor pass. Identity remains ID `1`, category `alphabet-lc`, order `1`.
- All 11 study blocks and 14 exercises remain in the original order. All 14 exercise IDs are preserved, with no duplicates. Source study blocks have no IDs; their positional web IDs can be retained.
- All five study types and three exercise types remain supported. A normalization candidate passes the existing normalized schema **in memory only**.
- All required teaching/prompt/tip/choice/answer fields are nonempty and valid. B3/B5/B7 still have empty optional image descriptions; those remain media-review flags. Original images remain withheld and were not fetched.
- No invalid UTF-8, replacement characters, unpaired surrogates or embedded bidi controls were found. Existing Q8 presentation forms normalize to `פַּ` and `שׂ`, preserving Patah, dagesh and the sin dot. Q8's new tip also needs harmless NFC combining-mark ordering. Hebrew runs continue to use `bdi`, `lang="he"` and `dir="rtl"` in the unchanged renderer.
- Each key was reviewed against its actual candidate prompt and explanation, then tested with its correct option and **every** incorrect option: 14 correct and 29 incorrect selections pass. This verifies current source consistency; it does not approve the missing Q4 False revision.

| Question | Current candidate answer | Question | Current candidate answer |
| --- | --- | --- | --- |
| 1 | True | 8 | פַּ |
| 2 | Kamatz Gadol | 9 | True |
| 3 | אָ | 10 | [a] |
| 4 | **True — required False revision absent** | 11 | Hataf Patah |
| 5 | [a] | 12 | עֲ |
| 6 | Patah | 13 | True |
| 7 | True | 14 | [a] |

All five True/False questions still have True keys. The existing question-balance review therefore remains open. Beginner distractor/prerequisite and illustration/reuse review requirements also remain open.

Detailed field-level differences, Unicode normalization observations, automatic flags and grading checks are in `.local/lesson-snapshots/lesson-1.20261011T161534695940Z.validation.json`. This private record is outside deployable assets.

## Web state and validation

No web content changes were authorized by the failed editorial gate. The normalized Aleph SHA-256 is still `3cda76ed4fff40a211f59b029b6076d4d19bf11f95526ceb66c087bf55078ec3`; the accepted raw hash above is also unchanged. Existing Theory → Examples → Practice → Results, Rubik Hebrew, accent palette and layouts are preserved.

**Active interactive exercises: 11 of 14.** Q4/Q11/Q14 remain withheld. The scoring denominator remains 11. Restoration and scoring out of 14, including testing the corrected Q4 False key in the browser, are pending a source that passes every required editorial check.

| Check | Result and scope |
| --- | --- |
| `node --test tests/*.test.mjs` | **22/22 pass** against the retained accepted content and publication guards. Includes correct/incorrect grading for all 14 stored source records, explicit False parsing, Unicode preservation and fail-closed schemas. |
| Candidate integrity/grading | **Pass** offline, without accepting or writing normalized web content; details above. |
| `npm run build` | **Pass**, 28 Astro pages / 31 HTML files including game assets. No Course Hub or Aleph production route. |
| Opt-in course preview build | **Pass**, 30 Astro pages / 33 HTML files, in `/private/tmp/hebrewedu-aleph-sync-review`. This preview uses the retained accepted source. |
| Production/preview asset inspection | **Pass**: no raw snapshot files or contents, raw API answer objects, unapproved lesson image URLs or detected API credentials. Both sitemaps exclude `/learn/`. |
| Browser regression | **Pass** in Chromium and mobile WebKit against the retained lesson: all 14 slots, 11 active exercises with correct/incorrect answers, answer locking, retry, mistake/unanswered review, reset, results out of 11, navigation and selection/submission state preservation. Keyboard Tab/Space/arrows/Enter, visible focus, feedback focus, live regions, Hebrew RTL isolation and no-JS fallback pass. Visual inspection of the 390 px Examples screenshot confirms readable Aleph glyphs with Patah, Kamatz and Hataf Patah. All four stages fit at 320/375/390/1440 px, 390 px with 200% text, and 200% zoom-equivalent widths. No JS errors or source API/media requests. The corrected Q4 False key and results out of 14 cannot be tested until the source passes the editorial gate. |

Build-check evidence is `.local/lesson-snapshots/lesson-1.20261011T161534695940Z.build-validation.json`. Browser evidence and screenshots are under `artifacts/lesson-1-poc/guided/`, including `validation.json`. Hub and Aleph `published` settings remain false; their approval settings were not changed.

## Files and release blockers

Authored in this attempt: this report; the separate candidate raw snapshot; its private comparison/validation JSON; and private build-validation JSON. Build outputs and browser evidence are regenerated local artifacts. No application source, tests, normalization scripts, accepted snapshot, course manifest, other lesson or Semantic Core v2 file was edited.

The source must provide the required Q4 False question with a matching explanation, correct B7's mark-placement wording, establish the approved B6 pronunciation correction/scope, and introduce Aleph's possible glottal-stop role in Theory. Then the source must be fetched and validated again before replacing the accepted snapshot, restoring all 14 questions and running the complete 14-question browser/scoring regression.

Media approval and any remaining pedagogical review must be resolved for release, or the existing withholding decisions explicitly retained. Production publication requires a separate release decision; this task does not enable production routes. No deployment, commit, push, paid SEO request, API mutation or other lesson import was performed.
