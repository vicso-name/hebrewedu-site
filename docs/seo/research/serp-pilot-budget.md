# HebrewEdu Semantic Core Stage 2E — SERP Validation Pilot Plan

Prepared 2026-10-10. Planning only: **no paid Google Organic SERP request was made**. A free DataForSEO account-data lookup was used to verify the current balance; provider-reported cost was $0.00.

## Proposed pilot

The CSV contains **12 representative keywords**. It covers app discovery (2), alphabet study/reference (2), beginner learning (2), reading/Nikud (3), vocabulary (1), grammar (1), and browser games (1). All terms are from the approved Stage 2D shortlist. The row-level file records US volume or provider-null status, intent, URL, coverage/fit, GSC evidence, product evidence, decision value and representative-cluster status.

Use these fixed settings for each future check:

- Endpoint: `POST /v3/serp/google/organic/live/advanced`
- Search engine: Google
- Location: United States (`location_code: 2840`)
- Language: English (`language_code: "en"`)
- Device: `mobile`
- OS: `android` (fixed across every term; the documented default for mobile)
- Depth: `10` (top ten results; endpoint default)
- Paid extras: omit `load_async_ai_overview`, `calculate_rectangles`, operators and other cost-multiplying options.

DataForSEO’s Live SERP documentation says each Live SERP API call can contain **only one task**. Therefore, 12 keyword checks require 12 separate requests; a single request cannot batch all 12 tasks. Each task is one SERP with 10 results at the planned depth.

## Published tariff and budget

The current DataForSEO Google Organic SERP pricing page lists Live at **$0.002 per SERP of 10 results**. The pricing basis is SERPs requested (one unit per up-to-10-result page), not a separate charge per returned organic result. Depth above 10 can add chargeable SERP pages; the proposed depth 10 avoids that increment.

| Pilot size | Live cost per check | Estimated total | Balance after estimate at verified balance |
|---:|---:|---:|---:|
| 10 keywords | $0.002 | **$0.020** | $0.800 |
| 12 keywords (proposed) | $0.002 | **$0.024** | $0.796 |
| 15 keywords | $0.002 | **$0.030** | $0.790 |

Estimates exclude any future optional paid parameters and assume no account-balance change before execution. Current available balance returned by the free `GET /v3/appendix/user_data` call: **$0.82**; its `cost` field was **$0.00**. Thus the balance currently covers even the 15-query scenario at the base tariff. Re-check balance and published tariff immediately before execution because both can change.

No authorized spend amount was specified for executing the pilot. This is a cost plan only; execution still requires approval.

## Actual-cost recording plan

For every future paid SERP response, preserve the complete raw response and record the response-level `cost`, each task’s reported `cost`, status code, keyword, endpoint and retrieval timestamp. After a successful call, append the actual reported charge to the local DataForSEO cost ledger using the `dataforseo_costs.py log serp_google_organic_live_advanced <actual_cost>` workflow. Reconcile the sum against the provider response and account balance before reporting. Do not retry failed requests automatically; inspect and request approval before any retry or follow-up. During Stage 2E planning, the sandbox denied access to the local ledger lock under `~/.config/codex-seo/` during a read-only status command. Therefore, ledger logging may require filesystem approval at execution time. If that approval is unavailable, preserve the raw provider responses and report each returned cost explicitly; do not claim the local ledger was updated.

## Selection rationale and limitations

The pilot balances measured demand with target suitability, intent diversity and decision value rather than sorting only by volume. It includes exact app-discovery wording, both alphabet study and chart/reference intent, broad and article-specific beginner intent, general reading plus Nikud and vowel-system needs, a vocabulary method query, a broad grammar query with a known scope mismatch, and the existing browser-games proposition.

The saved Google Ads volumes are not organic difficulty, ranking evidence or a mobile-specific forecast. GSC evidence in the source files comes from aggregate Web exports and does not establish US/mobile query demand or query-to-URL ownership. SERP validation should assess dominant page type and feature layout, organic result overlap, app-store/comparison presence and candidate-to-target fit; it should not be treated as a difficulty score.

## Sources

- [DataForSEO Google Organic SERP API pricing](https://dataforseo.com/pricing/google-serp/google-organic-serp-api) — current Live base price and depth/parameter pricing.
- [DataForSEO SERP Live Advanced documentation](https://docs.dataforseo.com/v3/serp-se-type-live-advanced/) — request fields, one-task-per-Live-call rule, depth, device and OS.
- [DataForSEO User Data documentation](https://docs.dataforseo.com/v3/appendix-user-data/) — account balance fields and endpoint is not charged.

