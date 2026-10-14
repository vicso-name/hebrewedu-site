# HebrewEdu eight-article research — Stage 1 owner review

Executed **2026-10-13**, Google US **2840**, English **en**. **One POST, one successful Live task, no retries. Actual charge: $0.02400; remaining project ceiling: $0.22600.** Only Stage 1 was authorized. No later research stage has been executed or authorized.

**Outcome: zero suitable new measured keyword candidates for the eight articles.** The 100 returned ideas are predominantly broad Hebrew, Biblical/religious, language-identity, lexical/reference and named-entity queries. Numeric demand or low KD does not correct a task/format mismatch. No higher-volume result passed the ownership/format screen either. This bounded combined response does not establish that useful long-tail demand is absent.

## Execution and cost

- Endpoint: `POST /v3/dataforseo_labs/google/keyword_ideas/live`, task **10131315-2762-0400-0000-bb153fc85dca**. Envelope and task status **20000 / Ok.**, `tasks_count: 1`, `tasks_error: 0`, `items_count: 100`.
- Eight seeds: `hebrew binyanim`, `hebrew roots`, `hebrew vocabulary size`, `hebrew learning mistakes`, `hebrew listening`, `spoken hebrew`, `hebrew handwriting`, `hebrew verb conjugation app`.
- Exact [request](request.json): `limit: 100`, `ignore_synonyms: true`, `include_clickstream_data: false`, US/English. No added filters, ordering, phrase-match settings or pagination. Tool `noAiMode: true` preserved the full schema. Returned `serp_info` fields are null; no SERP request was made.
- Public [Google Labs pricing](https://dataforseo.com/pricing/dataforseo-labs/dataforseo-google-api) and [endpoint documentation](https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live/) were checked before submission: **$0.012 base + 100 × $0.00012 = $0.024 maximum**, clickstream disabled. The installed helper's outdated $0.05 estimate was replaced **in memory only** with $0.024; its configuration and source were unchanged. The [guard](cost-guard.json) returned `approved`; prior daily local-ledger spend was $0.10260, daily remaining $9.89740. Strict read-only JSON inspection avoided the helper's permissive corrupt-ledger fallback and lock-file write.
- Tool dispatch **2026-10-13T13:14:35.834Z**; tool receipt **2026-10-13T13:15:32.826Z**. Provider envelope processing time **3.9214 seconds**, task time **3.8883 seconds**; those are distinct from the tool round-trip duration. [Timing](request-timing.json) separately records preservation time. Provider task data, status, ID, cost and result metadata are in [task metadata](task-metadata.json).
- Actual envelope and task cost both **$0.024** describe the **same charge**, recorded once in the [run ledger](cost-ledger.csv) and once in the ordinary [local cost log](local-cost-log.json). [Budget reconciliation](budget-reconciliation.json): new project cap **$0.25**, project spent **$0.024**, unused ceiling **$0.226**. Historical Phase 3B **$0.10260** is excluded from this new cap, consistent with the approved plan. The owner's $0.25 cap supersedes the plan's proposed $0.16 cap; it does not expand Stage 1 authorization.

## Deduplication and intent review

[Discovery review](discovery-review.csv) records **all 100 items**, their original wording, volume/KD states, provider volume/intent timestamps, monthly history, exact/alias checks, editorial decision and any considered owner warning. [Raw response](raw-response.json) retains the complete returned JSON text byte-for-byte against the text in [the tool envelope](tool-response.json), including all metric fields and timestamps. The raw SHA-256 is `8dca1f36d1a38ccab6442e25ae7a086d86737a29062fc972a6ec34c6e67d6d50`.

The existing-keyword index covers all **309 Semantic Core v2 rows**, the **197-row v2 candidate/control companion**, the **five Phase 3B addendum rows**, recorded GSC aliases, returned/provider keyword aliases and the other preserved research CSVs. [Source manifest](deduplication-sources.json) and [alias index](existing-alias-index.csv) retain provenance and hashes. Normalization uses Unicode NFKC, case folding, apostrophe removal, punctuation-to-space and collapsed whitespace. Manual task-equivalence/neighbor review follows the approved plan, semantic ownership audit and retained map.

There are **355 indexed normalized research phrases**, **zero exact/normalized matches** among the 100 returned items and **zero normalized duplicates within the response**. The spelling variants `what does nasa means in hebrew` and `what do nasa mean in hebrew` are manually flagged as the same translation task; neither is suitable. Broad script/chart variants also remain in the existing Guide/Nikud/letter neighborhood rather than becoming handwriting targets. Absence from the index does not make a result a distinct viable opportunity.

Provider volume is positive for **98** items and explicitly null for **2** (`biblical hebrew practice`, `hebrew roots debate`); there are **no numeric-zero average-volume rows**. Null is preserved as unknown. Returned KD values, including genuine numeric zeros, are stored as supplied; a KD-specific update timestamp is not returned and is marked accordingly. Advertising competition is retained in the raw response and is not used as organic KD. Monthly histories retain provider zeros; no histories are fabricated for null rows.

All four returned **10–40** US monthly-volume phrases fail intent/ownership review:

| Exact returned keyword | US monthly volume | Returned organic KD | Exclusion |
|---|---:|---:|---|
| hebrew roots vs messianic judaism | 20 | 0 | Religious Hebrew Roots movement, not morphological roots. |
| paisley the hebrew | 20 | 2 | Named-entity query; no eight-article learning task. |
| biblical hebrew vowel chart | 30 | 0 | Biblical chart intent and Nikud/reference neighbor, not any of the eight retained tasks. |
| reverso context hebrew | 30 | 0 | External translation-tool intent; not the Verb Directory article. |

Higher-volume near-topic results were considered and rejected, not silently discarded. For example, **`hebrew writing` 3,600 / KD 26** is too broad to assign to H's printed/handwritten comparison and overlaps the Guide's script reference; **`hebrew spoken language` 110 / KD 26** lacks speed/practice intent; **`hebrew language family` 90 / KD 23** asks language classification, not roots within words; **`hebrew words` 2,900 / KD 0** asks lexical/list information, not vocabulary size. [Eight rejected mappings](rejected-near-topic-mappings.csv) give full existing article URLs, low owner-fit confidence and ownership warnings. These are audit trails of rejected possible mappings, not new targets.

The provider reports a total potential pool of **637,673** items, but this run inspected only the authorized first **100**. No offset token was followed. Provider informational labels do not establish the correct article task or Google page format. No SERP evidence or confirmed cannibalization is claimed.

## Proposed exact next-stage lists — review only

**Discovery additions: none.** [Measured candidates](measured-candidates.csv) intentionally has zero data rows. No discovery keyword needs purchased volume or standalone KD. Reuse every recorded discovery metric, including null, if it later becomes relevant; do not buy duplicate metrics.

The approved plan has five **A / ready-for-bounded-research** unmeasured hypotheses. They were separately deduplicated against the existing index and this discovery response. They are **not measured discoveries**, and their topic-fit confidence is not competition confidence. The exact proposed next Volume list is:

| ID | Exact keyword | Proposed existing article | Topic-fit confidence | Ownership/content condition |
|---|---|---|---|---|
| N01 | how to identify hebrew binyanim | [Binyanim](https://hebrewedu.com/blog/hebrew-binyanim-explained/) | High | Reviewed form identification; R retains root structure. |
| N03 | hebrew root letters vs prefixes | [Root System](https://hebrewedu.com/blog/how-the-hebrew-root-system-works/) | High | Identification pitfall; preserve Nikud/Unpointed reading and Binyanim scope. |
| N08 | hebrew listening practice for intermediate learners | [Listening Practice](https://hebrewedu.com/blog/best-hebrew-listening-practice/) | High | Supporting learner-stage hypothesis; no additive audience claim or hosted library promise. |
| N13 | how to stay motivated learning hebrew | [Learning Mistakes](https://hebrewedu.com/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/) | High | Motivation/restart task; preserve Plan and Difficulty ownership. |
| N14 | why am i not making progress in hebrew | [Learning Mistakes](https://hebrewedu.com/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/) | Medium | Diagnostic plateau scope; hold promotion if time, reading or vocabulary-method intent dominates. |

[Exact Volume list](next-volume-exact-list.csv) and [machine-readable proposal](next-stage-proposal.json) preserve these five phrases, Google US/English, and proposed `search_partners: false`. All five volume and KD states are **not requested**. This is a proposal, not permission or an executable next-stage dispatch.

**Proposed KD list:** existing control **`hebrew root system`** (known US volume 10; KD unrecorded), plus **only selected positive-volume phrases from the exact five above after Volume review**. Maximum pool from this recommendation is six phrases; it is not a six-keyword quota. A final exact KD submission cannot be frozen before those volume results. Exclude all five Phase 3B KD records, including explicit nulls; no retries or null refreshes. There is no organic-easiness finding for these five unmeasured hypotheses.

The other **10 C / conditional** plan phrases remain held: `hebrew binyanim exercises`, `four letter hebrew roots`, `how many hebrew words do native speakers know`, `how many hebrew words to read a newspaper`, `hebrew listening practice with transcripts`, `how to understand fast spoken hebrew`, `spoken hebrew contractions`, `how to read hebrew handwriting`, `hebrew handwriting examples`, `hebrew verb conjugation app with root search`. [All 15 mapped hypotheses](next-stage-proposed-keywords.csv) record the exact existing article URL, confidence, required evidence and ownership conflicts. Their gates have not been cleared by discovery.

## Eight-article implications

| Article | Best retained evidence / proposed next action |
|---|---|
| B — Binyanim | No proven nonzero narrow primary. N01 is ready for proposed measurement; N02 exercises remains held. Do not target broad grammar or whole conjugation charts. |
| R — Root System | Reuse `hebrew root system` **10** from v2; strongest fitting retained opportunity. N03 is proposed; N04 remains held. Do not confuse religious Hebrew Roots with morphology. |
| W — Word Count | No measurable primary established. N05/N06 require sourced/qualified answers first. Generic Hebrew words/language results do not answer counts. |
| M — Learning Mistakes | N13/N14 are proposed diagnostic/habit hypotheses. Existing broad self-study volume 10 remains withheld as a primary because the article is only a partial answer. |
| L — Listening Practice | Reuse Phase 3B `hebrew listening practice` **10** and `hebrew comprehensible input` **10**, both KD-null. N08 is proposed; N07 transcript expectations remain held. Do not sum overlapping volume. |
| F — Sounds Fast | No measurable primary established; N09/N10 remain held for F/L ownership and reviewed connected-speech evidence. Generic spoken-language queries are unsuitable. |
| H — Handwriting | N11/N12 remain held for authentic visual teaching/format. `hebrew writing` is too broad; no automatic reassignment from Guide/letters. |
| V — Verb Directory | Branded support role remains reasonable without demonstrated demand. N15 root-search claim stays held; generic translators/charts are unsuitable. Home/Story keep app-discovery/brand ownership. |

Historical metrics above remain separate from Stage 1 and are sourced from the protected v2 and Phase 3B files named in the approved opportunity plan. No numerical fluency threshold, new format, feature claim, URL or ownership transfer has been approved.

## Preservation and completion boundary

This run lives in a **new subdirectory** under the requested date directory, preserving the pre-existing Phase 3B execution. [Verification](verification.json) confirms all **171 pre-existing research files** and **218 website files** in the preparation fingerprints remained byte-identical, including Semantic Core v1/v2 and all prior dated execution artifacts. The complete raw JSON text matches the tool envelope; the task charge has exactly one local-ledger entry. The artifact manifest includes hashes for the new files and analysis scripts.

Only the new Stage 1 research artifacts and ordinary actual-cost ledger entry were written. No Google Ads Search Volume, standalone KD, SERP, balance lookup, top-up, fallback request, retry, automatic Stage 2, Rank Tracker, website/article/metadata/title edit, commit, push or deployment occurred. Skill cache/navigation updates were omitted to respect the requested artifact-only scope. **Stop here for owner review.** The remaining budget is a ceiling for later explicitly authorized work, not permission to continue.
