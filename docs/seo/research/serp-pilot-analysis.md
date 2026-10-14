# HebrewEdu Stage 2F — Google US Mobile SERP Pilot Analysis

Snapshot date: 2026-10-10. Endpoint: Google Organic SERP Live Advanced; United States, English, mobile Android, depth 10.

## Execution and cost reconciliation

Exactly 12 approved keywords were attempted in plan order, one task per request. No retries. Ten returned status 20000 and each task reported $0.002: **provider-confirmed successful-task cost $0.020**. “learn hebrew for beginners” and “is hebrew hard to learn” returned MCP transport error `fetch failed`, with no provider status, SERP result or charge; costs are unknown.

A free post-pilot account-data lookup cost $0 and returned balance $0.798, compared with the last verified pre-pilot balance $0.82. Net balance decrease: **$0.022**, leaving a $0.002 difference beyond the confirmed task costs. This may be an error-task charge or other account activity; the available responses cannot attribute it. Report both values separately; the observed balance delta remains below the $0.05 cap. The raw response archive contains all ten full provider responses and both transport failures.

Successful requests returned 6–8 organic result rows at requested depth 10. The CSV preserves every organic row returned; absence from those rows does not imply absence of rankings beyond them.

## Query-level assessment

| Keyword | Dominant intent and page formats | Proposed target assessment |
|---|---|---|
| hebrew learning app | App selection; apps/product pages, app carousel, reviews/forums, AI Overview/PAA/video | Homepage is relevant but partial. HebrewEdu was not in six returned organic rows. App listings/comparison content appear, so the homepage’s selection coverage is a question for review. |
| hebrew alphabet app | App discovery/download; app listing, app comparisons and forums | HebrewEdu homepage appears at rank 7. This is the clearest target match and supports homepage coverage for this specific wording. |
| learn hebrew alphabet | Alphabet instruction; guides, courses, lessons, books and videos | Complete alphabet guide is a strong topical match, though absent from returned rows. |
| hebrew alphabet chart | Chart/reference pages, tables, image results and broad alphabet explainers | Current guide includes a table but does not promise a downloadable chart. Paleo/Biblical chart results also appear; modern printed-letter scope should remain clear. |
| learn hebrew for beginners | No SERP observed | Request failed at transport; no evidence to assess target or intent. |
| is hebrew hard to learn | No SERP observed | Request failed at transport; no evidence to assess target or intent. |
| how to read hebrew | Beginner reading; alphabet references, lessons/practice pages and videos | Alphabet guide is plausible, but result formats suggest a dedicated reading lesson/practice page may fit better. |
| how to read hebrew nikud | Mixed Nikud and pointed/unpointed reading; forums, reading practice and vowel explanations | Leading results often say “without vowels” despite Nikud wording. Compare the Nikud guide with the unpointed-reading article before fixing the target. |
| does hebrew have vowels | Written orthography with historical/Torah/Biblical angles; explainers, forums and historical resources | Existing modern Hebrew article can answer written vowel-point usage; clarify that spoken Hebrew has vowels and avoid implying historic/religious coverage. |
| how to learn hebrew vocabulary | Vocabulary learning; lists, lessons/courses, videos and advice | Existing learning-method article is relevant but narrower than the word-list/course formats also present. |
| hebrew grammar for beginners | Beginner grammar/course; course pages, introductions, videos and Biblical resources | Binyanim article is too narrow for broad beginner grammar; current mapping is weak. |
| hebrew alphabet games online | Transactional browser games; game pages, quizzes, interactive tools | Existing `/play/` is a strong format match, although HebrewEdu is absent from eight returned organic rows. |

“Not returned” means not observed within the provider’s returned results for this query, location, device, time and requested depth. It is not proof the site does not rank elsewhere.

## URL overlap and tentative clusters

Exact repeated organic URLs:
- https://noamshebrew.com/learning-hebrew-with-apps-what-my-students-really-use-%F0%9F%93%B1/ — hebrew learning app; hebrew alphabet app
- https://zondervanacademic.com/blog/introduction-hebrew-alphabet — learn hebrew alphabet; hebrew alphabet chart
- https://www.chabad.org/library/article_cdo/aid/4069287/jewish/The-Hebrew-Alphabet.htm — hebrew alphabet chart; how to read hebrew
- https://kojiilanguages.com/hebrew-reading-practice/ — how to read hebrew; how to read hebrew nikud

This supports a tentative combined alphabet guide cluster for study/chart queries while preserving their different user needs. “How to read Hebrew” and Nikud wording share a reading-practice URL, but Nikud results also lean toward unpointed reading, so target assignment remains uncertain. The two app queries share an app-roundup result but differ in breadth. These are hypotheses from URL overlap, not proof of identical SERPs.

Recurring domains by count among returned organic results: www.youtube.com (14), www.hebrewpod101.com (5), www.reddit.com (4), www.facebook.com (4), www.chabad.org (4), www.tinytap.com (3), noamshebrew.com (2), zondervanacademic.com (2). YouTube, Chabad, HebrewPod101, Reddit and others recur across education and app queries.

## SERP features and visibility

Per-query SERP feature types are recorded in the CSV and full raw archive. Returned types include AI Overview, People Also Ask, app, video, images, discussions/forums and people-also-search, depending on query.

HebrewEdu.com appeared in returned organic results only for “hebrew alphabet app” (rank 7). It was not observed in returned rows for other successful queries. The two failed beginner queries provide no visibility evidence. This limited snapshot says nothing about rankings beyond the returned rows, other device/location settings, or other dates.

## Strategic hypotheses for review

Keep the homepage for alphabet-app intent; evaluate whether broad app discovery needs clearer comparison/selection information; retain the alphabet guide but review chart/download expectations; reassess Nikud versus unpointed-reading URL ownership; avoid mapping broad beginner grammar to the binyanim article; retain `/play/` for browser games. These are analysis hypotheses, not implemented changes.

No website files were changed; nothing was published, committed or pushed.