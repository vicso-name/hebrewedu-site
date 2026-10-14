# HebrewEdu Semantic Core Stage 2D — Demand Analysis and Keyword Shortlist

Offline analysis prepared 2026-10-10 from the permanent Stage 2A–2C files. Market: United States, Google, English; Mobile is the planned tracking target. No new API or live SERP calls.

## Data integrity

- 136 unique candidates retained in both input CSVs and 136 results in raw JSON; the shortlist has 36 representatives from that list.
- Numeric average monthly volume: 37 candidates. Provider-null: 99. Numeric zero: 0. Missing is not zero. These are Google Ads US/English values, not organic traffic or mobile-only demand.
- Supporting variants are contextual and never added to representatives. Similar terms may overlap or be grouped. “How to read hebrew” and “how to read hebrew words” both report 720; do not add them.
- CPC and competition are Google Ads metrics, not organic keyword difficulty. GSC evidence is from aggregate Web exports and does not prove US/mobile performance or URL ownership.

## Volume distribution across all candidates

| Topic | N | Numeric | Null | Zero | 1–10 | 11–50 | 51–100 | 101–500 | 501+ | Max |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Hebrew learning apps | 18 | 6 | 12 | 0 | 2 | 2 | 0 | 2 | 0 | 320 |
| Learning Hebrew for beginners | 14 | 4 | 10 | 0 | 1 | 0 | 0 | 2 | 1 | 880 |
| Hebrew alphabet and pronunciation | 22 | 10 | 12 | 0 | 3 | 1 | 0 | 2 | 4 | 3600 |
| Hebrew reading and Nikud | 25 | 9 | 16 | 0 | 3 | 1 | 1 | 1 | 3 | 720 |
| Hebrew vocabulary | 16 | 2 | 14 | 0 | 0 | 2 | 0 | 0 | 0 | 50 |
| Beginner Hebrew grammar | 24 | 4 | 20 | 0 | 3 | 0 | 0 | 1 | 0 | 260 |
| Interactive Hebrew alphabet games | 17 | 2 | 15 | 0 | 1 | 0 | 1 | 0 | 0 | 70 |
| **Total** | **136** | **37** | **99** | **0** | **13** | **6** | **2** | **8** | **8** | — |

## Highest-priority opportunity groups

- **App discovery:** “hebrew learning app” (320) is relevant but only partially answered by the homepage; “hebrew alphabet app” (30) has narrower GSC evidence, including the two app-to-learn-alphabet formulations. Both need mobile SERP review. The two “best app” candidates are comparison intent without an existing comparison page.
- **Alphabet:** “hebrew alphabet chart” (3,600), “how many letters are in the hebrew alphabet” (1,900), “learn hebrew alphabet” (590) align with the existing 22-letter guide. The chart candidate comes from existing-site-topic evidence, not a query-level GSC observation.
- **Pronunciation:** “hebrew alphabet pronunciation” (1,300) has potential, but current guide sound tables may not satisfy audio/phonetic intent.
- **Beginner:** “is hebrew hard to learn” (880) fits a dedicated article and has GSC wording “is hebrew easy to learn?”. “Learn Hebrew for beginners” (320) is broader than the homepage.
- **Reading/Nikud:** “how to read hebrew,” “how to read hebrew words,” “hebrew vowel chart” each 720. Existing pages cover reading and Nikud, but vowel-chart target fit is partial. Avoid double-counting related terms.
- **Unpointed reading:** “does hebrew have vowels” (260), “hebrew with and without vowels” (90), “how to read hebrew without vowels” (30) have close article targets and disclosed GSC wording; exports are not US/mobile query-level.
- **Browser games:** “hebrew alphabet quiz” (70), “hebrew alphabet games online” (10) match actual browser tools. Keep distinct from app-only lessons.
- **Product features with web gaps:** “hebrew vocabulary app” (10) and “hebrew reading app” (20) fit actual app features, but site pages do not host these tools.

## Topic-level reading
- **Hebrew learning apps:** 18 candidates; 6 positive numeric, 12 null; maximum 320.
- **Learning Hebrew for beginners:** 14 candidates; 4 positive numeric, 10 null; maximum 880.
- **Hebrew alphabet and pronunciation:** 22 candidates; 10 positive numeric, 12 null; maximum 3600.
- **Hebrew reading and Nikud:** 25 candidates; 9 positive numeric, 16 null; maximum 720.
- **Hebrew vocabulary:** 16 candidates; 2 positive numeric, 14 null; maximum 50.
- **Beginner Hebrew grammar:** 24 candidates; 4 positive numeric, 20 null; maximum 260.
- **Interactive Hebrew alphabet games:** 17 candidates; 2 positive numeric, 15 null; maximum 70.

Alphabet carries the clearest measurable demand, mostly informational. Reading/Nikud breaks into distinct decoding, vowel-mark, unpointed-reading and comprehension jobs. Vocabulary/grammar mostly have missing volumes and broad terms mapped to narrower articles. Verb lookup and practice are app-only. Browser games have genuine web targets and should be treated separately from mobile app learning.

## Major uncertainties and target mapping

1. Best-app comparison intent has no independent comparison page; hold for SERP validation.
2. App-only Reading Trainer, vocabulary drills, verb lookup and grammar decks do not become web coverage just because a page describes the feature; deck evidence does not prove iOS/Android parity.
3. “Learn Hebrew for beginners” exceeds homepage scope; “Hebrew grammar for beginners” exceeds a binyanim article; “most common Hebrew words” implies a word list the method article does not provide.
4. Letter-name audio does not guarantee pronunciation-instruction fit. Hebrew has no uppercase/lowercase case, so capitalization wording may be typographic. No generic phrase is assumed Biblical/religious.
5. GSC lacks US/mobile query-level data and query-to-page attribution. No rankings or organic difficulty are claimed.

## Proposed next paid research

No paid work in Stage 2D. After separate approval: (1) inspect US mobile SERPs for shortlisted representatives and overlap; (2) run organic difficulty checks only on the viable set after intent/target validation; (3) retrieve GSC US/mobile segment if sufficient data; (4) consider narrow volume follow-up for selected nulls, never coercing null to zero.

## Completion

Created `keyword-opportunities.csv` with 36 candidates and this report. No new candidates or metrics, API calls, site edits, publishing, commit or push.
