# Aleph review addendum — owner retains Q4 True

Reviewed 2026-10-11 against the saved candidate `.local/lesson-snapshots/lesson-1.20261011T161534695940Z.raw.json`, SHA-256 `5755df728c0c8d9b6e900385857c50787e869ad4a1ed19f7153f60d74534ac79`. No fresh API request was made. These findings describe that snapshot, not an independently verified current API response.

This addendum is the current editorial validation criteria. It supersedes the Q4 False requirement in the [source-edit checklist](hebrew-alphabet-lesson-1-source-edit-checklist.md), [initial synchronization review](hebrew-alphabet-lesson-1-source-sync-review.md) and private validation record. Those files remain unchanged as historical evidence. No earlier manifest or verifier requiring a False key should be used as the current acceptance gate.

## Updated criteria

1. Q4, source ID `1742106507820`, must retain the literal answer `"true"`, as explicitly decided by the owner. Validate the statement and explanation together; reject an absolute claim that Aleph is always silent, not a True key itself. Equivalent accurate wording is acceptable.
2. Judge the pronunciation teaching in its beginner Modern Hebrew context. Do not require verbatim replacement text or treat an unchanged field alone as a factual failure. Do not require long/short/ultra-short vowel timing distinctions.
3. Require a correct written-mark description in B7 and a brief Theory explanation of Aleph's possible consonantal role before Practice. These are the remaining source corrections.
4. Retain the earlier integrity requirements: Lesson 1 identity/category/order, 11 blocks/14 exercises, preserved exercise IDs and types, unambiguous keys, nonempty required fields, and valid Hebrew/niqqud. They passed for this saved candidate; any later candidate must be checked again.
5. All five True/False answers being True is an optional question-design consideration, not an answer-integrity failure or a reason to override the owner. Original images remain withheld.

## Q4 reassessment

Exact source question:

> In everyday Modern Hebrew, the letter Aleph (א) is usually silent, while niqqud marks can indicate its vowel sound.

Exact source explanation:

> That’s right! Aleph usually has no audible consonant sound in everyday speech. Niqqud marks can show which vowel to pronounce with it, as in אַ, אָ or אֲ.

Answer: `"true"`. **Pass for beginner Modern Hebrew, with the missing Theory clarification supplied before Practice.** The qualifiers “everyday” and “usually” avoid an absolute silence rule. The explanation distinguishes an audible consonant from the accompanying vowel. “Its vowel sound” is a teaching shorthand; saying “the vowel pronounced with it” would be clearer, but is not a key/question mismatch.

The assessment is consistent with Bolozky's discussion of teaching Aleph to beginners: a silent-letter simplification can be useful while acknowledging its consonantal background and possible realization. [Bolozky, *On the Teaching of Modern Hebrew Aleph* (1991)](https://www.researchgate.net/publication/380345514_Bolozky_1991_Teaching_modern_Hebrew_aleph_Bulletin_of_Hebrew_Higher_Education_4).

Owner-proposed wording, **pending owner review; not applied or asserted to be in the source**:

> In the beginner Modern Hebrew examples taught in this lesson, Aleph (א) can carry vowel marks without adding a separately pronounced consonant sound.

This is compatible with True and more tightly limits the claim to the lesson examples. Adopting it is optional; no source key change or website substitution is needed.

## Previously passing corrections

| Item | Reassessment of saved candidate |
| --- | --- |
| Q11, `1742106507827` | **Pass**: recognizes Hataf Patah by line/dots and reduced-[a] terminology; no super-quick or ultra-short timing instruction; key Hataf Patah. |
| Q14, `1742106507830` | **Pass**: [a] key agrees with the question; updated explanation explicitly removes exact-length requirements in Modern Hebrew. The unchanged neutral question is semantically acceptable. |
| B9 | **Pass**: removes the sofa analogy and separates traditional brief-vowel terminology from beginner Modern Hebrew requirements. |
| Q3 tip | **Pass**: identifies the T-shaped mark and [a], explicitly without a Modern Hebrew long/short contrast; key אָ. |
| Q10 tip | **Pass**: identifies [a] and explicitly rejects required short/long contrast; key [a]. |

These are semantic review results, not claims that every source field uses the earlier checklist verbatim. Modern Hebrew vowel length is not phonemically contrastive; that does not mean real vowel durations never vary. [Asherov and Cohen (2019), §4](https://www.researchgate.net/profile/Evan-Cohen-5/publication/334161223_A_phonetic_description_of_Modern_Hebrew_consonants_and_vowels/links/5e2ad71c4585150ee77e831e/A-phonetic-description-of-Modern-Hebrew-consonants-and-vowels.pdf).

## Outstanding wording: mandatory versus optional

### Block 6 — optional editorial refinement

Exact source text:

> When Aleph is paired with a Kamatz Gadol, it shares the exact same [a] sound—like the "a" in "father."

The unclear reference in “it shares,” the categorical “exact same,” and the dialect-dependent English analogy are wording weaknesses. The text does not itself specify Modern Hebrew, but B9/B11 and the corrected tips establish that context. The Kamatz Gadol/Patah [a] comparison is acceptable here; this is **not a mandatory factual correction**. The earlier finding based on B6 remaining unchanged is downgraded to an optional refinement.

Optional source wording already proposed in the checklist: “In the Modern Hebrew pronunciation taught here, Kamatz Gadol in אָ indicates an ‘a’ vowel, like Patah in אַ. This lesson does not distinguish long and short ‘a’ vowels.” No website change was made.

### Block 7 — mandatory factual correction

Exact incorrect sentence:

> It appears as two vertical dots placed to the left of the horizontal line.

The standard Hataf Patah glyph has its dot component to the right of the horizontal line. This is a visual mark-placement issue, independent of RTL reading direction; compare U+05B2 in the [Unicode Hebrew chart](https://www.unicode.org/charts/PDF/U0590.pdf).

Minimal change: remove that sentence, or replace it with a correct description. The earlier approved source wording avoids directional ambiguity: “Hataf Patah appears below the letter. Its shape combines a horizontal line with two vertically arranged dots beside it, as shown in אֲ.” Keep the original image withheld.

### Theory / Block 2 — mandatory factual clarification

The saved B2 explains consonant letters, vowel-indicating letters, niqqud placement and three [a] marks with Aleph. Neither it nor another study block explains Aleph's possible glottal-stop role. This is an omission, not a false sentence in the revised niqqud introduction.

Minimal addition within existing B2, before Q4: “Aleph (א) can represent a glottal stop—a brief catch in the throat—but it is often not pronounced in everyday Modern Hebrew.” This retains the earlier approved clarification and is compatible with True. No extra study block, phonemic-status debate or enforced glottal-stop production is required. Modern Hebrew research documents variable glottal-stop realization. [Asherov and Cohen (2019), §3.1.4](https://www.researchgate.net/profile/Evan-Cohen-5/publication/334161223_A_phonetic_description_of_Modern_Hebrew_consonants_and_vowels/links/5e2ad71c4585150ee77e831e/A-phonetic-description-of-Modern-Hebrew-consonants-and-vowels.pdf).

## Minimal activation prerequisite and preservation

**Only two source fields require linguistic changes for this correction gate:** B7 content at `/studyMaterials/6/content`, and B2 content at `/studyMaterials/1/content`. Q4 retains True; its proposed narrower wording and B6 polishing are optional. The remaining corrected Q11/Q14/B9/Q3/Q10 passages need no further change for this gate.

After those source changes, a separately authorized synchronization must save a fresh snapshot, revalidate integrity and semantic agreement, normalize the accepted source, restore all 14 exercises, and test scoring out of 14 with Q4 True. The earlier 11-question browser evidence cannot certify that future flow. Other optional pedagogy improvements do not become mandatory through automatic flags; unapproved media can continue to be withheld.

This task adds only this report. All existing website code, snapshots, correction packages, reports and validation evidence are preserved. No tests/builds/browser artifacts were regenerated, no API writes or other lesson imports occurred, and no publish/deploy/commit/push action was taken. The website remains at 11 active questions, with production routes disabled. This addendum authorizes no website activation.
