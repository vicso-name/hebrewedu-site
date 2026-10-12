# HebrewEdu knowledge structure proposal

Prepared **2026-10-12**. Phase 1 only: no existing files changed, moved, renamed or deleted. The proposed `docs/PROJECT-KNOWLEDGE-INDEX.md` has **not** been created. The complete file-by-file inventory, hashes, dependencies and dispositions are in [knowledge-inventory-2026-10-12.md](knowledge-inventory-2026-10-12.md).

## 1. Recommended structure

Use one starting index with several category-specific authorities. Keep research measurements in the research project, website implementation knowledge with the website, and private acquisition/QA evidence outside deployable content. Avoid copying datasets into website docs just to make an index self-contained.

Prefer **indexing and status clarification before physical reorganization**. Most existing paths already have useful consumers. A comprehensive move would break research links, importer checksums, run-relative recovery and historical evidence without improving their authority.

### SEO research authority

Root: `/Users/kasutaja/Developer/seo-research/hebrewedu/`.

| Category | Existing authority | Proposed treatment |
|---|---|---|
| Current semantic edition | [semantic-core-v2.csv](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2.csv), [v2 report](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-research-report.md), [expansion companion](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-alphabet-expansion-candidates.csv) | KEEP at existing paths initially; label current research edition, including holds and unverified hypotheses |
| Preserved foundation | [semantic-core-v1.csv](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v1.csv), candidate/qualified/volume stage tables | KEEP original editions and intermediate provenance; do not flatten or delete them because v2 exists |
| Keyword-to-URL ownership | [keyword-to-url-map.md](/Users/kasutaja/Developer/seo-research/hebrewedu/keyword-to-url-map.md) plus v2 row-level targets/report | Treat as a combined authority chain: v1 app/guide/game ownership retained, v2 adds course-specific assignments. Clarify source-filename versus public-URL notation in a reviewed current summary |
| Demand, difficulty, SERP evidence | Root provider raw responses and dated result tables; [v2 alphabet research directory](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v2-alphabet-research/) | KEEP raw requests/responses, result interpretation and cost/status provenance together; root pilot and v2 pilot are separate observations |
| Methodology | [candidate-methodology.md](/Users/kasutaja/Developer/seo-research/hebrewedu/candidate-methodology.md), demand/KD/SERP interpretation reports | Keep chronology and source definitions; an index identifies stage completion rather than changing dated reports to present tense |
| Search Console | Original exports currently under `/private/tmp/hebrewedu-seo-audit-2026-10-10/` | Highest durability priority: later approved checksum-verified copy into private research `search-console/exports/2026-10-10/`; preserve originals until verification/retention decision |
| Rank Tracker | [rank-tracker/README.md](/Users/kasutaja/Developer/seo-research/hebrewedu/rank-tracker/README.md), queue/hash, SQLite and original response archive | KEEP current layout. Paths and pinned queue matter to the tool; never rebuild historic DB or rewrite reports as cleanup |
| Strategy/task planning | [seo-roadmap-90-days.md](/Users/kasutaja/Developer/seo-research/hebrewedu/seo-roadmap-90-days.md), [content audit](/Users/kasutaja/Developer/seo-research/hebrewedu/content-audit-v1.md) | Preserve original plans; later derive a reviewed dated status ledger linked from the index |

The research directory is outside a detected Git repository. A later owner decision should select durable private backup/versioning appropriate for provider responses and exports. This proposal does not authorize uploading research or credentials anywhere.

### Website implementation authority

Root: `/Users/kasutaja/Developer/web/hebrewedu-site/`.

| Category | Existing authority | Proposed treatment |
|---|---|---|
| Current SEO output | [homepage entry](../src/pages/index.astro), [layout](../src/layouts/Layout.astro), [site data](../src/data/site.ts) | Code governs present metadata; index records approved change and commit without replacing old audit measurements |
| Current course release | [hebrew-alphabet-release.md](hebrew-alphabet-release.md), [release manifest](../src/data/alphabet-course.json), [course library](../src/lib/alphabet-course.mjs) | Primary current release/availability references |
| Course architecture and learner behavior | [hub document](hebrew-alphabet-course-hub.md), [POC document](hebrew-alphabet-lesson-1-poc.md), current components/lib/styles | CONSOLIDATE reusable architecture/UX into a later current workflow document; retain preview-stage reports as history |
| Editorial decisions | [final readiness](hebrew-alphabet-aleph-release-readiness.md), [owner override](hebrew-alphabet-lesson-1-owner-override-review.md), [release document](hebrew-alphabet-release.md) | Preserve chronological decisions. Final accepted source and released normalized model supersede earlier Q4 False/11-question gates |
| Course-wide import quality | [content audit](hebrew-alphabet-course-content-audit.md), [review register](hebrew-alphabet-course-review-register.md), [importer README](../scripts/alphabet-course/README.md) | Keep current pointers to original import/audit version; clarify that original Aleph import predates the later accepted Aleph release source |
| Publication/QA procedures | [release checker](../scripts/check-alphabet-release.mjs), hub/browser checks and [release documentation](hebrew-alphabet-release.md) | Current checks selected explicitly; historical POC checker archived/labeled before future sessions use it |
| Games | [GAME_PUBLISHING_RUNBOOK.md](GAME_PUBLISHING_RUNBOOK.md) | Keep as canonical workflow; [Rush release](alef-bet-rush-release.md) remains historical, with its existing successor link |
| Homepage investigation | [October 12 audit](seo-homepage-semantic-core-v2-audit.md) | KEEP dated audit and intent assessment; index marks title recommendation completed under actual owner-approved string |
| Historical homepage design | [homepage-ui-audit.md](homepage-ui-audit.md) | ARCHIVE/index as October 2 pre-redesign evidence, not current stack/component guidance |

### Private evidence authority

Keep the existing private layout initially:

- `.local/lesson-snapshots/`: original and timestamped Aleph source snapshots. Normalizer pins the final source hash; source-fidelity tests use historical versions conditionally. Do not retarget the original alias to the newest source.
- `.local/alphabet-course-imports/v1/`: acquisition state, raw/provenance pairs, run-local owner map, audit pointer and versioned review envelopes. The latest audit is `audit-v1-595de65ea735`; older audits preserve validator evolution. A deliberately absent fully valid `course-content.snapshot.v1.json` is not corruption.
- `.local/source-corrections/aleph/v1/`: immutable original, proposed changes and verifier for that historical package. Preserve even though its acceptance criteria are superseded.
- `.local/aleph-release-readiness/`, `.local/course-hub/`, `.local/alphabet-release/`: dated checks, browser captures and deployment evidence. ARCHIVE means index historical role and retain bundles; no immediate move is required.
- `artifacts/lesson-1-poc/`: historical private POC evidence. Preserve links from POC documents; any later private relocation must update active consumers while leaving frozen evidence untouched.

`.local/` and POC artifacts are Git-ignored, denied by development-server rules and outside deployment inputs. Research, snapshots, source answer objects, capability URLs and internal review excerpts must not be migrated into `public/` or Astro content collections. Only approved normalized learner content belongs in `src/content/lessons/`.

## 2. Proposed directory organization

This is a **future organization**, not a move list. Names marked “proposed” do not exist yet. Existing dependency-bound files remain in place until separately reviewed.

```text
seo-research/hebrewedu/
  semantic-core-v1.csv                         # existing protected edition
  semantic-core-v2.csv                         # existing current research edition
  semantic-core-v2-research-report.md           # existing interpretation
  semantic-core-v2-alphabet-expansion-candidates.csv
  keyword-to-url-map.md                        # existing retained ownership
  candidate-methodology.md                     # existing provenance method
  [existing dated stage CSV/JSON/MD files]      # stable paths initially
  semantic-core-v2-alphabet-research/          # existing request/response/results
  rank-tracker/                               # existing tool + append-only history
  search-console/                             # proposed durable private category
    exports/2026-10-10/                        # proposed exact workbook copies
    observations/                             # proposed dated filtered observations
  archive/                                    # optional later; avoid bulk moves

web/hebrewedu-site/
  docs/
    PROJECT-KNOWLEDGE-INDEX.md                  # proposed starting point; not created
    hebrew-alphabet-release.md                 # current release procedure/state
    GAME_PUBLISHING_RUNBOOK.md                  # current game procedure
    [current implementation/audit documents]   # retain paths initially
    archive/                                   # optional later, with link migration
    knowledge-inventory-2026-10-12.md           # this phase's frozen inventory
    knowledge-structure-proposal.md            # this phase's approval proposal
  scripts/                                    # implementation and portable QA
  src/data/alphabet-course.json                # authoritative release gates
  src/content/lessons/aleph.json               # approved normalized content
  .local/                                     # protected private sources/evidence
  artifacts/lesson-1-poc/                      # historical evidence; not deployable
```

An archive folder should contain retained histories, not become a reason to move every dated dataset. Versioned datasets can stay beside current data when tools consume those paths. A final index can mark something historical without moving it.

Do not introduce a second root-level copy of every research report or a separately editable website keyword map. The website index should link to research, and implementation docs should describe how existing targets are realized. If an exporter someday generates a map view, label it derived and include its original edition/checksum.

## 3. Outline for the future PROJECT-KNOWLEDGE-INDEX.md

The eventual index should be short enough to read at the beginning of a Codex session. Detailed evidence stays in its existing documents. This is an outline with references, not the final index.

1. **Project and roots.** Explain the Astro app-discovery site, blog, browser games and course. Name both absolute roots and point to implementation/research owners. State that pushing main triggers production and that research/private evidence must stay outside deployable directories.
2. **Current state, verified date and commit.** Record homepage title **Hebrew Alphabet App & Reading Practice**, title release **579ef938**, course release **b7e360c**, Hub/Aleph live, **14 active Aleph exercises**, lessons **2–22 unpublished**, Semantic Core **v2 current research edition**, and homepage audit completed **October 12, 2026**. Link to current source/manifest, [release note](hebrew-alphabet-release.md) and [audit](seo-homepage-semantic-core-v2-audit.md). Separate current code facts from historical live observations.
3. **Start here by task.** SEO ownership → v2 CSV/report + existing keyword map. Course publication → release document/manifest/checker. Imported content review → content audit/register/importer README. Game updates → runbook. Homepage history → October 12 audit and October 2 historical UI audit. Rank measurements → tracker README and dated run.
4. **Authority and precedence.** Research is authoritative for dated measurements/intent assignments. Code/release manifest is authoritative for published behavior. A raw snapshot is authoritative for its acquisition bytes, not automatically for approved learner presentation. Later explicit owner decisions supersede earlier acceptance gates, with links to both.
5. **Completed SEO/implementation work.** Mark the homepage investigation and owner-approved title deployment completed. Link to `bd26f07` for the earlier SEO discovery/positioning work; audit verifies store links, resource links, canonical/indexability markup and schema correspondence. Record first complete rank baseline and Hub/Aleph release. Do not infer that all roadmap tasks are completed from these commits.
6. **Remaining work and evidence gaps.** Post-title comparable observation and recrawl/selected-canonical evidence; exact filtered GSC export preservation and adequate page × query segmentation; optional store-click/install measurement; lesson 2–22 source/editorial/renderer/media gates. Remaining article/game tasks require their own review; no blanket audit, paid research or mass publication implied.
7. **Measurement ledger pointers.** Keep October 10 workbook observations, owner-supplied 17/356/4.8%/8.8 homepage baseline, depth-10 pilot and depth-20 tracker run separate. Record source, filter/date window, device/country/depth and whether metrics are supplied versus file-backed. Do not invent calendar dates for “last 28 days.”
8. **Current versus historical register.** Small table of current release/runbook/research documents and historical POC/editorial/title snapshots with successor links. Include explicit warning that `check-lesson-1-artifacts.mjs` has unpublished-POC assumptions; use current release checker for published state.
9. **Evidence locations and handling.** Explain protected private snapshots/import runs/baselines, external GSC temporary-storage gap, Git-untracked local knowledge and durable backup responsibility. Provide run-specific pointers without copying secrets/source content into the index.
10. **Before writing another report.** Search this index and inventory by task/page/edition; reuse the existing authority. Update current workflow/status documents only when authorized; create a dated report only for a distinct new investigation or release, with explicit scope and predecessor/successor. Never rewrite a dated measurement to make it look current.

All authority links above resolve to existing files. The final index filename and proposed new subdirectories are intentionally identified as future deliverables.

## 4. Resolve the conflicts explicitly

| Conflict | Winning authority for current use | What to preserve |
|---|---|---|
| Old homepage title versus new approved title | Homepage `seoTitle`, commit `579ef938` | Audit's old metadata as the October 12 pre-change observation; owner-approved exact no-brand string as release state |
| Local/unpublished hub/POC/readiness versus released Hub/Aleph | Release manifest/code, commit `b7e360c`, release note | Preview/QA evidence, intermediate approval gates and validation boundaries |
| Q4 False/11 available versus Q4 True/14 active | Final accepted source/normalizer hash, empty hold sets, normalized model and release note | Source-edit package, blocked sync and owner override as chronological evidence; never execute old verifier as present acceptance gate |
| Original 307-row proposal versus 309-row v2 | V2 CSV/report/run summary for research edition | Original proposal and its unmeasured-candidate scope |
| Research plan says later sources uninspected | Complete original import/audit for acquisition, later released Aleph for current teaching | Research cache/plan as its dated scope, not current course availability |
| Research owner map versus website publication manifest | Research map for verified ID/order/slug planning; website manifest for actual release eligibility | Pinned importer/run-local copies with hash checks; do not use either category to overwrite the other |
| Original-import Aleph flags versus later reviewed Aleph | Released normalized content/provenance and final owner decisions | All-source audit/register still applies to its original 22-source acquisition; no silent rebaseline |
| Historical POC checker versus current release checks | `scripts/check-alphabet-release.mjs` and portable release tests | Old script as archived executable history, plus original production baseline and referenced QA artifacts |
| Two `.md`-named public routes and handwriting route in keyword prose | Current Astro extensionless trailing-slash destinations | Original v1 wording/targets; correct source-vs-route notation in later reviewed current navigation summary without changing semantic datasets |

## 5. Safe migration plan for a separately approved Phase 2

### Step 1 — Agree on scope and preserve the evidence

Use this inventory as the before-manifest. Confirm owners for research, implementation and private evidence. Select approved rows or document groups, not a blanket cleanup of 147 duplicate groups. Capture a fresh Git status and hashes only for files being migrated. Protect all source snapshots, provider responses, historical baselines, SQLite records, licenses and game distribution assets.

Establish a durable private backup strategy before moving anything untracked/ignored. Existing raw snapshots and source/provenance pairs remain byte-identical. Do not run importer, normalizer, recovery or Rank Tracker merely to prepare documentation; they can write new state even when offline.

### Step 2 — Create the starting index without moving dependencies

Author the final `docs/PROJECT-KNOWLEDGE-INDEX.md` using the outline and existing file links. Verify the current title/release facts and mark old audit/POC states historical. Keep the index's current-state summary small and cite code/commits rather than copying datasets. Owner-review the precedence and remaining-task ledger.

At this step, no physical archive is needed. A document-role table can immediately prevent use of stale acceptance gates while existing paths still resolve.

### Step 3 — Preserve the GSC originals in durable research storage

After explicit approval, **copy**, rather than move/delete, original October 10 exports and essential audit/baseline provenance into proposed private research storage. Preserve workbook bytes, hashes, filter definitions and observed windows. Include the indexing export and data handoff as separate source artifacts; a successful sitemap submission is not an indexing guarantee.

Validate destination hashes against the originals and the existing methodology manifest. Only then update current navigation pointers. Leave historical reports and their original absolute provenance references intact, or add a separately reviewed relocation registry that records old path → verified new copy/hash. Do not rewrite original GSC history or manufacture a filtered page × query export from independent tabs.

The owner-supplied later homepage baseline needs its own dated/filter-labelled record and, if available, actual export. Never merge it into the October 10 workbook as a replacement value. No new GSC/API request is part of the present phase.

### Step 4 — Consolidate current instructions, retain dated decisions

Review the five CONSOLIDATE files identified in the inventory: website README, hub doc, POC doc, research course implementation roadmap and research 90-day SEO roadmap. Extract reusable architecture, publication gates and completed/remaining status into current implementation guidance/index pointers. Keep measured strategy evidence in research.

Add explicit historical/successor labels only when owner-approved. Preserve original editorial/research stages as dated reports. Do not combine Q4 False, Q4 True and final accepted-source gates into a single supposedly contemporaneous decision.

Review importer README test commands and source-snapshot README claims. Replace current instructions pointing to the unpublished POC checker with the appropriate release checks only after assessing their intended workflow. Keep old checker/baseline as historical evidence. Do not change code, source models, hashes or publication gates under a documentation-only cleanup authorization.

### Step 5 — Decide whether any physical archive is useful

If moving documents improves navigation, update all active Markdown/script/test references and relative evidence links in the same reviewed change. Paths in snapshot inventories, run-state pointers, validator hashes and private frozen copies are reasons to archive **in place**. Frozen `.local/alphabet-release/.../working-tree-before/` documents retain their original-root reference context; do not repair or rewrite those copies.

Do not move pinned importer maps, audit-version envelopes, database/raw responses or snapshot files just to make directory names uniform. Research stage datasets can remain at existing paths under historical labels. Before any move, check incoming/outgoing IDs, dynamic consumers and Git-history notes in the inventory.

### Step 6 — Limit deletion to demonstrably regenerable artifacts

Only consider the **15 DELETE CANDIDATE** entries after approval: three `.DS_Store` files, one `.pyc` and eleven ignored generated `.astro/` cache/support/log files. Confirm no active process is using them and current generation paths are understood. Two tracked `.astro/` support files require separate repository/build review.

Do not delete duplicate QA/release captures, before-copies, raw import sources, correction packages, baselines, font licenses or packaged game audio. The five legacy public screenshots and apparently unimported ProductPlaceholder remain REVIEW: local reference absence does not rule out external public-URL consumers or intended reuse.

### Step 7 — Validate the approved migration and review the final diff

Check file-link resolution in active docs and the final index, source/reference path availability, private/public separation, and original-byte hashes. Confirm that no Semantic Core edition/provider observation, original GSC export, tracker database/history, private snapshot or released learner file changed. Re-run only checks justified by the actual approved change; a docs-only index/link edit does not justify paid tracking, importer writes or a production deployment.

If executable paths are changed in an explicitly expanded approval, run their appropriate offline portable tests and inspect generated publication states. Do not fix failures by overwriting historical baseline files. Review the complete Git diff and stage only approved documentation/tool changes; unrelated untracked local files remain excluded. A future commit/push requires its own authorized scope; this phase grants neither.

### Step 8 — Close with an explicit authority handoff

Record the approved migration date, new index location, surviving legacy paths and any unresolved REVIEW decisions. Preserve the before-inventory as a historical manifest; produce a new inventory only if needed to evidence an actual changed layout. Ownership and acceptance gates should be clear enough that a future Codex session can start from the index without re-auditing or recreating Semantic Core v2.

## 6. Approval recommendation

Approve an **index-first documentation pass**, durable preservation of external GSC evidence, reviewed consolidation of current README/course instructions, and explicit historical labels for obsolete POC/editorial gates. Defer physical moves and evidence deduplication. This addresses the main risks—unclear starting point, temporary originals and conflicting project-state claims—while preserving working dependencies and dated research.

No migration or cleanup has been performed. Owner approval should identify the specific Phase 2 actions before work begins.
