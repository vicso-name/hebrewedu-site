# Original October 10 GSC evidence — preservation manifest

Preserved and SHA-256 verified on **2026-10-12** (Phase 2B). Source date: **2026-10-10**, from the dated audit/handoff and original export bundle; this is not a performance-window boundary or an inferred export-generation timestamp.

Original root: `/private/tmp/hebrewedu-seo-audit-2026-10-10/`. Preserved root: `/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/`.

All eight originals existed before copying. Source hashes matched the [October 12 inventory](/Users/kasutaja/Developer/web/hebrewedu-site/docs/knowledge-inventory-2026-10-12.md); the seven applicable files also matched the existing [methodology evidence manifest](../../../candidate-methodology.md). Copies retain exact filenames and bytes. Source and destination SHA-256 values below are identical; temporary originals remain untouched. No existing evidence was overwritten.

| Original path | Preserved path | SHA-256 (source = destination) | Source date |
|---|---|---|---|
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-performance-last-3-months.xlsx` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/gsc-performance-last-3-months.xlsx](gsc-performance-last-3-months.xlsx) | `7d7a6e700f49400d3e5f89983af5cc122ba703c70e507058e11bd29735813e5f` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-performance-28-day-comparison.xlsx` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/gsc-performance-28-day-comparison.xlsx](gsc-performance-28-day-comparison.xlsx) | `2d9a6dcda474edc3190d37e2e1a1f247c42f5b527cae3f9f281eacc5ce57c23f` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/gsc-page-indexing.xlsx` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/gsc-page-indexing.xlsx](gsc-page-indexing.xlsx) | `1b964cdbe19c5d35f318eb20f5210c571cc528d78b3f4189acd77c0d21232fa9` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/SEO_AGENT_HANDOFF.md` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/SEO_AGENT_HANDOFF.md](SEO_AGENT_HANDOFF.md) | `6075e3d0e4b097116948ba768b6a6a5fc695b7e9f144edd1c5fbd77c0c075f66` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/SEO_AUDIT_RU.md` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/SEO_AUDIT_RU.md](SEO_AUDIT_RU.md) | `eda9e5e17f0509dd7d3f1a868cc7eb2fc1861d1cd86982f8a6e33e111226a585` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/page-baseline.csv` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/page-baseline.csv](page-baseline.csv) | `d93db7bcf55699f4b7c5b9ee43710d70c0a5ad9c1a2c44d09a91a3b35ed9c4de` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/keyword-map.csv` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/keyword-map.csv](keyword-map.csv) | `1ede728d7eccc869660763748e59e71f2f65c1cab261e529eb79b3d785aced6b` | 2026-10-10 |
| `/private/tmp/hebrewedu-seo-audit-2026-10-10/sitemap.xml` | [/Users/kasutaja/Developer/seo-research/hebrewedu/search-console/exports/2026-10-10/sitemap.xml](sitemap.xml) | `8528bb5120e5f25555e33777dbc58557d5b2b1d86b516c4b2e8863c2b29dfca7` | 2026-10-10 |

## Known filters and provenance

- [gsc-performance-last-3-months.xlsx](gsc-performance-last-3-months.xlsx): Filters sheet: Search type = Web; Date = Last 3 months. No page, query, country or device restriction listed (aggregate/all countries/all devices). Chart dates explicitly run 2026-07-07 through 2026-10-06.
- [gsc-performance-28-day-comparison.xlsx](gsc-performance-28-day-comparison.xlsx): Filters sheet: Search type = Web; Date = Last 28 days. Handoff and comparison columns: last 28 days versus previous 28 days. No page, query, country or device restriction listed (aggregate/all countries/all devices). Prior audit infers 2026-09-09 through 2026-10-06 versus 2026-08-12 through 2026-09-08; these are inferred, not explicit exported Filters dates.
- [gsc-page-indexing.xlsx](gsc-page-indexing.xlsx): Metadata sheet: Sitemap = All known pages. No Filters sheet. Chart dates explicitly run 2026-07-12 through 2026-10-04. Page-indexing evidence, not a Web performance export.
- [SEO_AGENT_HANDOFF.md](SEO_AGENT_HANDOFF.md): Dated source handoff: URL-prefix property https://hebrewedu.com/, Web performance exports, comparison settings, page-indexing and URL-inspection caveats.
- [SEO_AUDIT_RU.md](SEO_AUDIT_RU.md): Derived dated audit of the supplied exports and site. Contains inferred comparison windows; preserve its historical interpretation and limitations.
- [page-baseline.csv](page-baseline.csv): Derived page-level audit baseline: aggregate three-month, last-28-day and previous-28-day GSC Pages values plus dated site/inspection context; no joined page-query-country-device attribution.
- [keyword-map.csv](keyword-map.csv): Derived disclosed-query audit mapping/editorial proposals from aggregate exports; not measured query-to-page attribution or a Semantic Core edition.
- [sitemap.xml](sitemap.xml): Site sitemap downloaded October 10 according to handoff; no GSC performance filters. Actual XML contains 26 URLs; handoff narrative says 24. Preserve discrepancy; sitemap presence/submission is not indexing proof.

Queries, Pages, Countries and Devices are independent aggregate tabs; they cannot establish page × query × US/mobile attribution. Homepage Pages observations in these older exports remain 31 clicks / 862 impressions / 3.60% CTR / 9.72 position (three months) and 15 / 346 / 4.34% / 8.47 (latest comparison period).

## Separate October 12 homepage observation

Owner-supplied pre-title observation: **17 clicks, 356 impressions, 4.8% CTR, average position 8.8**; exact homepage page filter `https://hebrewedu.com/`, **Web, last 28 days**. No matching original export or exact calendar window was located locally. This note records the supplied observation, not an original export; it is distinct from every October 10 file and no workbook values were changed. See the [October 12 homepage audit](/Users/kasutaja/Developer/web/hebrewedu-site/docs/seo-homepage-semantic-core-v2-audit.md).
