# Gap report: /blog/hebrew-alphabet-complete-guide/ vs. top-10 SERP (2026-10-14 batch)

Analysis only — nothing in this file has been implemented on the page.

## Data used

`docs/seo/research/` has no SERP pull for the exact query **"hebrew
alphabet"** in any batch. The latest batch
(`docs/seo/research/semantic-core-v4-dataforseo/2026-10-14/`) is used as
the closest available evidence: its three alphabet-cluster keywords,
each SERP-validated top-10 organic (US/en, mobile Android, depth 10) on
2026-10-14 and already mapped to this exact guide URL as `target_url` in
`docs/seo/core/clusters.csv`:

- `hebrew alphabet chart` (`serp_raw/00-hebrew-alphabet-chart.json`)
- `hebrew alphabet course` (`serp_raw/01-hebrew-alphabet-course.json`)
- `hebrew alphabet pronunciation` (`serp_raw/10-hebrew-alphabet-pronunciation.json`)

These are proxies, not the query itself — treat conclusions below as
directional, strongest where multiple proxy SERPs agree.

## What the guide already has

Checked against the task's list: the guide (`src/content/blog/hebrew-alphabet-complete-guide.md`)
already has a **letter chart/table** (22-row table with name, sound,
notes), **sounds** (per-letter + a dedicated two-sound-letters section),
and **final letters** (a dedicated section with all five sofit pairs).
These are not gaps.

## Gaps, ordered by expected impact

### 1. FAQ content + `FAQPage` schema — highest impact

Two of the three proxy SERPs returned People Also Ask boxes directly
on-topic for this page:

- *"What is the order of Hebrew letters?"* (`hebrew alphabet chart`)
- *"How do you pronounce the Hebrew letter 'Aleph'?"* (`hebrew alphabet chart`)
- *"Do Yiddish and Hebrew use the same alphabet?"* (`hebrew alphabet chart`)
- *"What are the 22 Hebrew letters in order?"* (`hebrew alphabet pronunciation`)
- *"Do Hebrew and Yiddish use the same alphabet?"* (`hebrew alphabet pronunciation`)

The guide answers most of these in prose already (letter order is
implicit in the chart; Aleph's sound is in the chart) but has no `## FAQ`
section and emits no `FAQPage` JSON-LD — only the page's existing
`BlogPosting` schema (`src/pages/blog/[slug].astro`). The site already
has a reusable, schema-emitting component for exactly this
(`src/components/Faq.astro`, `schema` prop defaults to `true`) used
elsewhere on the site. Adding a short FAQ block with these PAA questions
is the single change most likely to win PAA/rich-result visibility for
this query, and is low-risk (additive, no change to existing text/H1).

### 2. Audio — medium-high impact

The guide's own text argues audio matters ("Always learn with audio
from the start") but the page has no embedded letter-sound audio.
`learnhebrewalphabet.com/sounds` ranks in the `hebrew alphabet
pronunciation` top 10 specifically by offering "Listen to Hebrew
alphabet pronunciation for all 22 letters." Dictionary.co.il's ranking
page is built around the same pronunciation-table-with-audio format.
Pronunciation/sound is clearly a format Google rewards for this cluster;
the guide currently covers sound only as IPA/text description. Adding
per-letter audio playback to the existing chart (no new page, no URL
change) would close this gap without touching the protected title/H1/text.

### 3. Numeric values (gematria) — low-confidence, low impact here

Not mentioned by name in any of the three proxy SERPs' titles or
descriptions pulled in this batch — none of the 21 organic snippets
returned surfaced gematria/numeric-value content. This may still be
worth adding for topical completeness (it's a standard alphabet-guide
subtopic generally), but there's no SERP evidence in this batch that it
is costing the guide rank for this cluster. Flagging it as a candidate,
not a priority, pending a direct "hebrew alphabet" or "hebrew gematria"
SERP pull.

## Update 2026-10-14: real "hebrew alphabet" SERP pulled

A direct SERP pull for the literal query now exists
(`research/semantic-core-v5-alphabet-faq/2026-10-14/`, $0.002,
owner-approved $0.01 cap). It changes the picture above:

- **Organic is thin and non-authoritative for this guide's format.**
  Only 6 of 10 depth slots are organic (AI Overview, Images, a
  Knowledge Graph panel and People Also Ask all outrank the first
  organic result). The 6 organic results are 3 YouTube videos, a stock
  photo search page, a chart page (hebrew4christians.com) and a PDF
  chart (chabad.org) — no guide-style competitor, and no HebrewEdu URL
  present.
- **PAA and the Knowledge Graph panel are the real signal**, not
  organic. The PAA box returned 4 questions (letter order, Hebrew vs.
  Aramaic history, Hebrew punctuation, "hello" in Hebrew — the last is
  off-topic for this guide). The Knowledge Graph panel returned 5
  on-topic question items (alphabetical order, styles, letter count,
  pronunciation, numerical values/gematria) — confirming gap #3 below
  (gematria) as a real, named gap on this exact query, not just a
  general-completeness guess.
- This resolves gap #1 (FAQ) with real question data and upgrades gap
  #3 (numeric values) from "low-confidence" to **confirmed**: the
  Knowledge Graph panel names "Numerical Values" directly for this
  exact query.

**Action taken:** a 6-question FAQ section was added to the guide
(`Faq.astro`, `FAQPage` schema) using a mix of the real PAA box and the
Knowledge Graph panel's questions — see
`research/semantic-core-v5-alphabet-faq/2026-10-14/serp_parsed.md` for
the full list and which questions were used vs. skipped. Gap #2 (audio)
remains open — see the Alef Bet Rush audio-asset check logged
separately for this task.

## Superseded: proxy-based analysis (pre-2026-10-14 direct pull)

The three-proxy-SERP analysis above was written before a direct pull
for "hebrew alphabet" existed; the real pull doesn't contradict it
(FAQ/audio were already identified as the top two gaps) but gap #3 is
now confirmed rather than speculative, per the update above.
