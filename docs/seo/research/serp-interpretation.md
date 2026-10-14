# HebrewEdu Stage 2G — SERP Interpretation and Target Validation

Offline synthesis of the 2026-10-10 Google US mobile Android snapshots. No API calls were made in this stage.

## Evidence and limits

- Ten SERP responses succeeded and two did not return provider results. The failed keywords are **“learn hebrew for beginners”** and **“is hebrew hard to learn”**; both remain unverified, not zero-result SERPs.
- Successful snapshots returned 6–8 organic URLs each at requested depth 10. Overlap uses the returned exact URLs only. It does not imply full Top 10 completeness where fewer than ten URLs were returned.
- HebrewEdu’s observed position 7 for **“hebrew alphabet app”** is a dated 2026-10-10 US mobile Android observation only. Absence from returned rows on other queries does not prove absence of ranking beyond those rows.
- Page-format/intention labels summarize the observed organic titles/URLs. SERP features are recorded separately in the target-validation CSV; they are not organic result types.

## Query-to-URL validation

| Keyword | SERP conclusion | Recommended target | Assessment |
|---|---|---|---|
| hebrew learning app | App/product pages; app carousel; roundup/review; forum | https://hebrewedu.com/ | Conditional |
| hebrew alphabet app | App listings; app roundup; forum; product homepage | https://hebrewedu.com/ | Strong |
| learn hebrew alphabet | Alphabet guides; course/lesson pages; books; video lessons | https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | Strong topical fit; visibility gap |
| hebrew alphabet chart | Alphabet tables/charts; image results; general references | https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | Conditional: format validation |
| learn hebrew for beginners | Unverified | https://hebrewedu.com/ | Unverified |
| is hebrew hard to learn | Unverified | https://hebrewedu.com/blog/how-hard-is-hebrew-to-learn/ | Unverified |
| how to read hebrew | Alphabet reference; step-by-step reading lessons; reading practice; video | https://hebrewedu.com/blog/hebrew-alphabet-complete-guide/ | Conditional: broad instruction format |
| how to read hebrew nikud | Community discussions; reading practice; without-vowels guides; vowel/Nikud explainer; video | https://hebrewedu.com/blog/how-to-read-hebrew-nikud/ | Weak/conditional: intent mismatch signal |
| does hebrew have vowels | Orthographic explainers; forums/Q&A; historical and Torah-focused pages | https://hebrewedu.com/blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/ | Conditional: scope qualification |
| how to learn hebrew vocabulary | Beginner word lists; course pages; vocabulary lessons/video; learning advice | https://hebrewedu.com/blog/how-to-learn-hebrew-vocabulary/ | Weak/conditional: page-format mismatch |
| hebrew grammar for beginners | Course homepages; grammar introductions; textbook/PDF; videos/forums | No current target recommended | Weak: scope mismatch |
| hebrew alphabet games online | Browser games; quizzes; interactive letter-learning activities | https://hebrewedu.com/play/ | Strong format fit; visibility gap |

Interpretation: app-discovery formats include app listings, app/product pages, roundups and community recommendations. Alphabet terms favor instructional guides, letter references, charts and video. Reading terms mix alphabet explainers with courses/practice, while Nikud wording unexpectedly surfaces many “without vowels” resources. Vocabulary SERPs mix advice with word lists/courses. Broad grammar results include course introductions and Biblical grammar resources. Game intent favors browser-playable quizzes/tools.

## Target decisions

- **Strong / retain:** `hebrew alphabet app` → homepage (rank 7 observed); `learn hebrew alphabet` → complete alphabet guide; `hebrew alphabet games online` → `/play/`. The last two have matching page formats but no HebrewEdu appearance in the returned rows.
- **Conditional:** `hebrew learning app` → homepage remains the best existing destination, but it only partially satisfies comparison/selection intent; `hebrew alphabet chart` → complete guide provisionally, with chart/download format validation; `how to read hebrew` → alphabet guide provisionally, but compare against the existing Nikud reading guide; `does hebrew have vowels` → modern without-vowels article, provided it clarifies written vowel points versus spoken vowels.
- **Weak:** `how to read hebrew nikud` → do not fix canonical target yet; compare Nikud guide and unpointed-reading article because top results often discuss reading without vowel marks. `how to learn hebrew vocabulary` → method article is narrower than recurring list/course formats. `hebrew grammar for beginners` → binyanim article is not a broad beginner grammar resource; no current URL is recommended for that whole query.
- **Unverified:** `learn hebrew for beginners` and `is hebrew hard to learn` → retain only the pre-existing proposed homepage/difficulty-article mappings; no conclusions about SERP intent, page format or rankings can be drawn from transport failures.

## Exact-URL overlap and clusters

Overlap was calculated only for query pairs with at least six returned organic URLs each and sufficiently related intent/page types. The intersection is exact URL matching; overlap coefficient = intersection / smaller result set; Jaccard = intersection / union.

| Query pair | Available results | Exact intersection | Overlap coefficient | Jaccard | Shared URL(s) |
|---|---:|---:|---:|---:|---|
| hebrew learning app ↔ hebrew alphabet app | 6 / 8 | 1 | 0.1667 | 0.0769 | https://noamshebrew.com/learning-hebrew-with-apps-what-my-students-really-use-%F0%9F%93%B1/ |
| learn hebrew alphabet ↔ hebrew alphabet chart | 7 / 8 | 1 | 0.1429 | 0.0714 | https://zondervanacademic.com/blog/introduction-hebrew-alphabet |
| learn hebrew alphabet ↔ how to read hebrew | 7 / 8 | 0 | 0.0000 | 0.0000 |  |
| how to read hebrew ↔ how to read hebrew nikud | 8 / 8 | 1 | 0.1250 | 0.0667 | https://kojiilanguages.com/hebrew-reading-practice/ |

Exact-URL overlaps support four tentative clusters: app selection (`hebrew learning app` / `hebrew alphabet app`); alphabet instruction/reference (`learn hebrew alphabet` / `hebrew alphabet chart`); alphabet reference and reading (`hebrew alphabet chart` / `how to read hebrew`); and beginner reading (`how to read hebrew` / `how to read hebrew nikud`). Each overlap is exactly one URL, so overlap is low; retain the intent distinctions. The additional comparable pair `learn hebrew alphabet` / `how to read hebrew` has 0 shared URLs (7 and 8 results available), so it is not supported as a URL-overlap cluster. Other pairs are not assigned zero overlap because they were not sufficiently comparable for this pilot.

## Recurring competitors

Domain counts across the 10 successful snapshots (77 returned organic rows): `www.youtube.com` (14), `www.hebrewpod101.com` (5), `www.reddit.com` (4), `www.facebook.com` (4), `www.chabad.org` (4), `www.tinytap.com` (3), `noamshebrew.com` (2), `zondervanacademic.com` (2), `www.teachmehebrew.com` (2), `hebrew4christians.com` (2), `kojiilanguages.com` (2), `www.learnhebrewpod.com` (2), `www.easylearnhebrew.com` (2), `www.pimsleur.com` (1), `www.gusonthego.com` (1), `languagedrops.com` (1), `hebrew-alphabet-hebrew-letters-writing.soft112.com` (1), `www.itsbaba.com` (1), `learn-hebrew-yuly-pisinberg.en.aptoide.com` (1), `hebrewedu.com` (1), `hebrew-alphabet-writing.soft112.com` (1), `www.myjewishlearning.com` (1), `mena-languages.northwestern.edu` (1), `www.fathersalphabet.com` (1), `www.ancient-hebrew.org` (1), `www.pinterest.com` (1), `hebrewresources.com` (1), `en.wikipedia.org` (1), `integraliah.com` (1), `youtube.com` (1), `www.cfmcorner.com` (1), `www.quora.com` (1), `library.biblicalarchaeology.org` (1), `www.nehemiaswall.com` (1), `www.avivbertele.com` (1), `preply.com` (1), `www.thehebrewcafe.com` (1), `fbcclassroom.com` (1), `hebrew-language.com` (1), `www.sporcle.com` (1), `njop.org` (1), `jsilvalabs.github.io` (1). This frequency indicates repeated visibility in this small pilot, not domain-wide market share. HebrewPod101 appears across app, alphabet, Nikud and vocabulary intents; YouTube appears across instructional queries; Chabad recurs for alphabet/reading, written vowels and vocabulary.

## Organic difficulty testing shortlist

After resolving the noted format questions, the strongest candidates for a separate organic-difficulty check are:

1. `hebrew alphabet app` — homepage fit and rank 7 observation make the target decision concrete.
2. `learn hebrew alphabet` — strong existing guide match and an instructional result set.
3. `hebrew alphabet chart` — high-demand existing guide candidate, after chart/visual-format expectation review.
4. `how to read hebrew` — existing script-reading target is plausible; compare alphabet versus Nikud guide ownership first.
5. `hebrew alphabet games online` — clear browser-game format and existing `/play/` target.
6. `hebrew learning app` — commercially relevant but homepage selection coverage is partial; include if HebrewEdu is willing to compete with app roundups/listings.
7. `does hebrew have vowels` — existing topical match, contingent on modern orthography scope and the observed historical/Torah result mix.

Do not prioritize the broad grammar or vocabulary terms for difficulty testing until the target/page-format mismatch is addressed. The two failed beginner queries need a fresh SERP check before difficulty measurement; this stage does not retry them.

## Additional SERP validation

- Recheck the two failed queries in a later approved request; they are unknown, not zero-result.
- Inspect related phrasing around “Nikud” versus “without vowels” before deciding which existing article should own the former.
- Confirm chart/printable expectations and whether app-selection SERPs remain app-store/review-led.
- If these decisions will drive target changes, repeat a small mobile SERP sample later to assess snapshot variability.

## Artifacts and completion

`serp-target-validation.csv` contains all 12 planned queries and keeps failure rows explicitly unverified. `serp-overlap.csv` contains only four eligible pair comparisons with exact URL intersections and result-set counts. No website files, candidate datasets or code were changed; no paid API calls, commits or pushes were made.
