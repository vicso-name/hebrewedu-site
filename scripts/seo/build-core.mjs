#!/usr/bin/env node
// Builds docs/seo/core/{keywords,pages,clusters}.csv and docs/seo/semantic-core.xlsx
// from existing SEO research files. Never calls a paid API — reads only what is
// already on disk under docs/seo/research/ and the production build in dist/.
//
// Run: npm run seo:build  (requires `npm run build` to have produced dist/ first
// for pages.csv / page metadata; the script will warn and skip page rows if dist/
// is missing rather than inventing page content).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";
import { loadCSV, stringifyCSV } from "./csv.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const RESEARCH = path.join(ROOT, "docs/seo/research");
const CORE = path.join(ROOT, "docs/seo/core");
const DIST = path.join(ROOT, "dist");

const TODAY = "2026-10-14";

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function urlSlug(url) {
  if (!url) return "none";
  if (url === "https://hebrewedu.com/") return "home";
  const path = url.replace(/^https?:\/\/hebrewedu\.com\//, "").replace(/\/$/, "");
  const segs = path.split("/").filter(Boolean);
  return slug(segs[segs.length - 1] || "home");
}

function decodeEntities(s) {
  return String(s || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function num(v) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  if (s === "" || s.toUpperCase() === "N/A") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// ---------------------------------------------------------------------------
// 1. Load source CSVs
// ---------------------------------------------------------------------------

const v2 = loadCSV(path.join(RESEARCH, "semantic-core-v2.csv"), fs);
const expansion = loadCSV(
  path.join(RESEARCH, "semantic-core-v2-alphabet-expansion-candidates.csv"),
  fs
);
const v3 = loadCSV(
  path.join(RESEARCH, "semantic-core-v3-blog-candidates/2026-10-13/candidate-addendum.csv"),
  fs
);
const gscKeywordMap = loadCSV(
  path.join(RESEARCH, "search-console/exports/2026-10-10/keyword-map.csv"),
  fs
);
const gscPageBaseline = loadCSV(
  path.join(RESEARCH, "search-console/exports/2026-10-10/page-baseline.csv"),
  fs
);
const rankBaseline = loadCSV(
  path.join(RESEARCH, "rank-tracker/reports/337cdd21-2385-43df-aafb-5b086da27385.csv"),
  fs
);
const alphabetCourse = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/alphabet-course.json"), "utf8")
);

// ---------------------------------------------------------------------------
// 2. Build lookup tables
// ---------------------------------------------------------------------------

// GSC query -> {impr_3m, pos_3m}
const gscByKeyword = new Map();
for (const r of gscKeywordMap.data) {
  const kw = r[gscKeywordMap.idx.query].trim().toLowerCase();
  gscByKeyword.set(kw, {
    cluster: r[gscKeywordMap.idx.cluster],
    targetUrl: r[gscKeywordMap.idx.proposed_target_NOT_observed_ranking_URL],
    impr3m: num(r[gscKeywordMap.idx.impressions_3mo]),
    pos3m: num(r[gscKeywordMap.idx.position_3mo]),
  });
}

// rank tracker keyword -> observed organic rank
const rankByKeyword = new Map();
for (const r of rankBaseline.data) {
  const kw = r[rankBaseline.idx.keyword].trim().toLowerCase();
  const rank = num(r[rankBaseline.idx.organic_rank]);
  rankByKeyword.set(kw, rank);
}

// Published vs. planned letter-lesson URLs, from the live publication manifest
// (course-letter-map-v2.json's publication_status field is stale per the audit;
// alphabet-course.json is the live source of truth).
const letterLessonUrls = new Map(); // url -> published boolean
for (const lesson of alphabetCourse.lessons) {
  const url = `https://hebrewedu.com/learn/hebrew-alphabet/${lesson.slug}/`;
  letterLessonUrls.set(url, Boolean(lesson.published));
}
const hubPublished = Boolean(alphabetCourse.hub.published);

// ---------------------------------------------------------------------------
// 3. Live site inventory, read from dist/ (built by `npm run build`)
// ---------------------------------------------------------------------------

function walkIndexHtml(dir, base = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkIndexHtml(full, base + "/" + entry.name));
    else if (entry.name === "index.html") out.push(base || "/");
  }
  return out;
}

const distAvailable = fs.existsSync(DIST);
const livePages = [];
if (distAvailable) {
  for (const p of walkIndexHtml(DIST).sort()) {
    const file = path.join(DIST, p === "/" ? "" : p, "index.html");
    const html = fs.readFileSync(file, "utf8");
    const robots =
      (html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i) || [])[1] || "";
    if (/noindex/i.test(robots)) continue;
    const title = decodeEntities((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "");
    const desc = decodeEntities(
      (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] ||
        ""
    );
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = decodeEntities(h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "");
    livePages.push({ path: p, url: `https://hebrewedu.com${p}/`.replace("//", "/").replace(":/", "://"), title, h1, desc });
  }
}
// Fix url construction for root
for (const p of livePages) {
  p.url = p.path === "/" ? "https://hebrewedu.com/" : `https://hebrewedu.com${p.path}/`;
}
const livePageUrls = new Set(livePages.map((p) => p.url));

// GSC page baseline, keyed by URL (3mo/28d stats)
const gscPageByUrl = new Map();
for (const r of gscPageBaseline.data) {
  const url = r[gscPageBaseline.idx.url];
  gscPageByUrl.set(url, {
    clicks3m: num(r[gscPageBaseline.idx.clicks_3mo]),
    impr3m: num(r[gscPageBaseline.idx.impressions_3mo]),
    pos3m: num(r[gscPageBaseline.idx.position_3mo]),
    clicks28d: num(r[gscPageBaseline.idx.clicks_28d]),
    impr28d: num(r[gscPageBaseline.idx.impressions_28d]),
    pos28d: num(r[gscPageBaseline.idx.position_28d]),
  });
}

// ---------------------------------------------------------------------------
// 4. Priority score formula (documented in docs/seo/README.md)
// ---------------------------------------------------------------------------

function intentWeight(intent) {
  if (!intent) return null;
  const s = intent.toLowerCase();
  if (s.includes("commercial") || s.includes("transactional")) return 15;
  if (s.includes("navigational")) return 10;
  if (s.includes("informational")) return 8;
  return 5;
}

function computePriorityScore({ volume, kd, intent, gscImpr3m, gscPos3m }) {
  const volumeComponent = volume === null ? null : Math.min(volume, 2000) / 2000 * 50;
  const kdPenalty = kd === null ? null : (kd / 100) * 20;
  const intentComponent = intentWeight(intent);
  const quickWin =
    gscPos3m !== null && gscPos3m >= 8 && gscPos3m <= 20 && (gscImpr3m || 0) > 0;
  const quickWinBonus = quickWin ? 15 : 0;

  if (volumeComponent === null && intentComponent === null && !quickWin) {
    return { score: "", confidence: "none" };
  }
  const score =
    (volumeComponent || 0) + (intentComponent || 0) + quickWinBonus - (kdPenalty || 0);
  const confidence =
    volumeComponent !== null && kdPenalty !== null
      ? "full"
      : volumeComponent !== null || quickWin
      ? "partial"
      : "low";
  return { score: Math.round(Math.max(score, 0) * 10) / 10, confidence, quickWin };
}

// ---------------------------------------------------------------------------
// 5. Assemble keyword rows
// ---------------------------------------------------------------------------

const keywordRows = [];
const notesFor = new Map(); // keyword(lower) -> extra note array, used for the dedup flag

// 5a. v2.csv (309 rows: 136 preserved_v1 + 173 alphabet_extension)
const expansionKeywords = new Set(
  expansion.data.map((r) => r[expansion.idx.keyword].trim().toLowerCase())
);

for (const r of v2.data) {
  const get = (col) => r[v2.idx[col]];
  const keyword = get("keyword").trim();
  const origin = get("v2_origin");
  const volume = num(get("us_avg_monthly_search_volume_provider"));
  const volumeDate = get("volume_retrieved_at_utc") || "";
  const kdRaw = get("organic_difficulty_provider");
  const kd = kdRaw === "" ? null : num(kdRaw);
  const kdSource = get("difficulty_provider_name") || "";
  const intent = get("intent_editorial") || "";
  const clusterName = get("thematic_cluster_editorial") || "Uncategorized";
  const targetUrl =
    get("validated_or_proposed_target_url_editorial") || get("proposed_target_url_editorial") || "";
  const priorityClass = get("priority_class_editorial");
  const serpStatus = get("serp_response_status");
  const serpValidated = /^(success|succeeded)$/i.test(serpStatus || "") ? "yes" : "no";

  const notes = [];
  if (origin === "preserved_v1" && expansionKeywords.has(keyword.toLowerCase())) {
    notes.push(
      "Also proposed independently in semantic-core-v2-alphabet-expansion-candidates.csv; kept as the single v1-origin row, not duplicated as an alphabet_extension row (resolves the audit's '24 rows missing from v2' question — they were merged, not dropped)."
    );
  }
  if (volume === null) notes.push("no provider search volume (provider_null or not requested)");
  if (kd === null) notes.push("no keyword-difficulty data");

  keywordRows.push({
    keyword,
    volume,
    volumeDate,
    kd,
    kdSource,
    intent,
    clusterName,
    targetUrl,
    priorityClass,
    serpValidated,
    sourceFile:
      origin === "alphabet_extension"
        ? "semantic-core-v2-alphabet-expansion-candidates.csv (via semantic-core-v2.csv)"
        : "semantic-core-v1.csv (via semantic-core-v2.csv)",
    notes,
  });
}

// 5b. v3 addendum (5 rows) — candidate, not yet authorized for promotion
for (const r of v3.data) {
  const get = (col) => r[v3.idx[col]];
  const keyword = get("keyword").trim();
  const volume = num(get("us_avg_monthly_search_volume"));
  const volumeDate = (get("volume_response_preserved_at_utc") || "").slice(0, 10);
  const kd = num(get("organic_keyword_difficulty"));
  const kdSource = get("difficulty_provider") || "";
  const intent = get("intent_editorial") || "";
  const targetUrl = get("proposed_target_url_editorial") || "";
  const serpStatus = get("serp_status");
  const serpValidated = serpStatus && serpStatus !== "not_requested" ? "yes" : "no";

  const notes = [
    "v3 addendum: explicitly 'not authorized to promote without owner review' — status forced to candidate regardless of volume/KD evidence.",
    get("editorial_assessment") || "",
  ].filter(Boolean);
  if (volume === null) notes.push("no provider search volume");
  if (kd === null) notes.push("no keyword-difficulty data");

  keywordRows.push({
    keyword,
    volume,
    volumeDate,
    kd,
    kdSource,
    intent,
    clusterName: `${deriveV3ClusterName(targetUrl)} (v3 candidate)`,
    targetUrl,
    priorityClass: "Supporting",
    serpValidated,
    sourceFile: "semantic-core-v3-blog-candidates/2026-10-13/candidate-addendum.csv",
    notes,
    forceCandidate: true,
  });
}

function deriveV3ClusterName(url) {
  if (url.includes("best-hebrew-listening-practice")) return "Listening practice";
  if (url.includes("hebrew-binyanim-explained")) return "Roots and verb patterns";
  if (url.includes("how-many-words-are-in-the-modern-hebrew-language")) return "Vocabulary learning and retention";
  if (url.includes("meet-the-new-verb-directory")) return "Verb reference and beginner practice";
  return "Uncategorized";
}

// 5c. GSC queries not already covered, excluding typo/noise/non-English rows
const NOISE_CLUSTERS = new Set(["unassigned_low_evidence", "non_english_defer"]);
const coreKeywordSet = new Set(keywordRows.map((r) => r.keyword.toLowerCase()));

const gscClusterNameMap = {
  alphabet_app: "App selection",
  alphabet_learning: "Alphabet reference and recognition",
  alphabet_games: "Browser games and active recognition",
  grammar_roots: "Roots and verb patterns",
  reading_vowels: "Reading progression and comprehension",
  writing: "Alphabet reference and recognition",
  difficulty: "Getting started and study habits",
  general_app: "App selection",
  beginner_texts: "Beginner reading texts (unvalidated)",
};

let gscExcludedNoise = 0;
for (const r of gscKeywordMap.data) {
  const keyword = r[gscKeywordMap.idx.query].trim();
  const keywordLower = keyword.toLowerCase();
  const clusterCode = r[gscKeywordMap.idx.cluster];
  if (NOISE_CLUSTERS.has(clusterCode)) {
    gscExcludedNoise++;
    continue;
  }
  if (coreKeywordSet.has(keywordLower)) continue; // already in v2/v3

  const targetUrlRaw = r[gscKeywordMap.idx.proposed_target_NOT_observed_ranking_URL];
  const targetUrl = /^https?:\/\//.test(targetUrlRaw) ? targetUrlRaw : "";
  const evidenceNote = r[gscKeywordMap.idx.evidence_note];
  const impr3m = num(r[gscKeywordMap.idx.impressions_3mo]);
  const pos3m = num(r[gscKeywordMap.idx.position_3mo]);

  keywordRows.push({
    keyword,
    volume: null,
    volumeDate: "",
    kd: null,
    kdSource: "",
    intent: "",
    clusterName: gscClusterNameMap[clusterCode] || clusterCode,
    targetUrl,
    priorityClass: "Explore",
    serpValidated: "no",
    sourceFile: "search-console/exports/2026-10-10/keyword-map.csv",
    notes: [
      "Disclosed GSC query not present in Semantic Core v1/v2/v3; added as a candidate.",
      evidenceNote,
      "no provider search volume or KD — needs DataForSEO lookup before promotion",
    ].filter(Boolean),
    forceCandidate: true,
    gscImpr3mOverride: impr3m,
    gscPos3mOverride: pos3m,
    coreKeywordSetSource: "gsc",
  });
  coreKeywordSet.add(keywordLower);
}

// 5d. Seed keywords for the two pages with zero keyword-research coverage
const seedKeywords = [
  {
    keyword: "hebrew phrases for beginners",
    targetUrl: "https://hebrewedu.com/learn/hebrew-phrases/",
    clusterName: "Hebrew phrases for beginners (provisional)",
  },
  {
    keyword: "useful hebrew phrases",
    targetUrl: "https://hebrewedu.com/learn/hebrew-phrases/",
    clusterName: "Hebrew phrases for beginners (provisional)",
  },
  {
    keyword: "common hebrew phrases",
    targetUrl: "https://hebrewedu.com/learn/hebrew-phrases/",
    clusterName: "Hebrew phrases for beginners (provisional)",
  },
  {
    keyword: "hebrew word search game",
    targetUrl: "https://hebrewedu.com/play/hebrew-word-search/",
    clusterName: "Hebrew word search game (provisional)",
  },
  {
    keyword: "hebrew word search online",
    targetUrl: "https://hebrewedu.com/play/hebrew-word-search/",
    clusterName: "Hebrew word search game (provisional)",
  },
  {
    keyword: "hebrew vocabulary game",
    targetUrl: "https://hebrewedu.com/play/hebrew-word-search/",
    clusterName: "Hebrew word search game (provisional)",
  },
];
for (const seed of seedKeywords) {
  if (coreKeywordSet.has(seed.keyword)) continue;
  keywordRows.push({
    keyword: seed.keyword,
    volume: null,
    volumeDate: "",
    kd: null,
    kdSource: "",
    intent: "informational / navigational",
    clusterName: seed.clusterName,
    targetUrl: seed.targetUrl,
    priorityClass: "Explore",
    serpValidated: "no",
    sourceFile: "editorial-seed (no prior research file; page post-dates every semantic-core edition)",
    notes: ["needs volume — editorial seed keyword, zero provider or GSC evidence yet"],
    forceCandidate: true,
  });
  coreKeywordSet.add(seed.keyword);
}

// ---------------------------------------------------------------------------
// 6. Cluster IDs: one cluster_id -> exactly one target_url, by construction.
//    If an editorial cluster name spans >1 target URL, split it into one
//    cluster_id per (name, url) pair so the CSV never silently merges two
//    URLs under one id; true semantic overlap across *different* cluster_ids
//    is handled separately in the Cannibalization tab.
// ---------------------------------------------------------------------------

const urlsByClusterName = new Map();
for (const row of keywordRows) {
  if (!urlsByClusterName.has(row.clusterName)) urlsByClusterName.set(row.clusterName, new Set());
  urlsByClusterName.get(row.clusterName).add(row.targetUrl || "");
}

for (const row of keywordRows) {
  const distinctUrls = urlsByClusterName.get(row.clusterName);
  const base = slug(row.clusterName);
  row.clusterId = distinctUrls.size > 1 ? `${base}--${urlSlug(row.targetUrl)}` : base;
}

// ---------------------------------------------------------------------------
// 7. Per-row status, serp_validated already set, GSC join, rank join, score
// ---------------------------------------------------------------------------

function pageStatusForUrl(url) {
  if (!url) return "candidate";
  if (letterLessonUrls.has(url)) return letterLessonUrls.get(url) ? "published" : "planned";
  if (url === "https://hebrewedu.com/learn/hebrew-alphabet/") return hubPublished ? "published" : "planned";
  if (livePageUrls.has(url)) return "published";
  if (distAvailable) return "candidate"; // real URL shape but not found live
  return "candidate";
}

for (const row of keywordRows) {
  const kwLower = row.keyword.toLowerCase();
  const gsc = row.gscImpr3mOverride !== undefined ? { impr3m: row.gscImpr3mOverride, pos3m: row.gscPos3mOverride } : gscByKeyword.get(kwLower);
  row.gscImpr3m = gsc ? gsc.impr3m : null;
  row.gscPos3m = gsc ? gsc.pos3m : null;
  row.rankBaselinePos = rankByKeyword.has(kwLower) ? rankByKeyword.get(kwLower) : null;

  row.status = row.forceCandidate ? "candidate" : pageStatusForUrl(row.targetUrl);
  row.pageRole = row.priorityClass === "Core" ? "primary" : "secondary";

  const { score, confidence, quickWin } = computePriorityScore({
    volume: row.volume,
    kd: row.kd,
    intent: row.intent,
    gscImpr3m: row.gscImpr3m,
    gscPos3m: row.gscPos3m,
  });
  row.priorityScore = score;
  if (quickWin) row.notes.push("quick-win bonus applied: GSC position 8-20 with impressions in the last 3 months");
  if (confidence !== "full") row.notes.unshift(`priority_score confidence: ${confidence}`);
}

// is_cluster_primary: the cluster's head/canonical term — highest search volume
// (not highest priority_score, which rewards long-tail quick wins instead of
// identifying the representative keyword), tie-broken by editorial priority
// class then alphabetically.
const byCluster = new Map();
for (const row of keywordRows) {
  if (!byCluster.has(row.clusterId)) byCluster.set(row.clusterId, []);
  byCluster.get(row.clusterId).push(row);
}
const classRank = { Core: 2, Supporting: 1, Explore: 0 };
for (const rows of byCluster.values()) {
  let best = rows[0];
  for (const r of rows.slice(1)) {
    const rVol = r.volume ?? -1;
    const bestVol = best.volume ?? -1;
    if (
      rVol > bestVol ||
      (rVol === bestVol && (classRank[r.priorityClass] || 0) > (classRank[best.priorityClass] || 0)) ||
      (rVol === bestVol &&
        (classRank[r.priorityClass] || 0) === (classRank[best.priorityClass] || 0) &&
        r.keyword < best.keyword)
    ) {
      best = r;
    }
  }
  for (const r of rows) r.isClusterPrimary = r === best ? "yes" : "no";
}

// ---------------------------------------------------------------------------
// 8. Write keywords.csv
// ---------------------------------------------------------------------------

const keywordColumns = [
  "keyword",
  "market",
  "volume",
  "volume_date",
  "kd",
  "kd_source",
  "intent",
  "cluster_id",
  "is_cluster_primary",
  "target_url",
  "page_role",
  "status",
  "serp_validated",
  "gsc_impr_3m",
  "gsc_pos_3m",
  "rank_baseline_pos",
  "priority_score",
  "source_file",
  "notes",
];

const keywordCsvRows = keywordRows.map((r) => ({
  keyword: r.keyword,
  market: "US/en",
  volume: r.volume ?? "",
  volume_date: r.volumeDate || "",
  kd: r.kd ?? "",
  kd_source: r.kdSource || "",
  intent: r.intent || "",
  cluster_id: r.clusterId,
  is_cluster_primary: r.isClusterPrimary,
  target_url: r.targetUrl || "",
  page_role: r.pageRole,
  status: r.status,
  serp_validated: r.serpValidated,
  gsc_impr_3m: r.gscImpr3m ?? "",
  gsc_pos_3m: r.gscPos3m ?? "",
  rank_baseline_pos: r.rankBaselinePos ?? "",
  priority_score: r.priorityScore,
  source_file: r.sourceFile,
  notes: r.notes.join(" | "),
}));

fs.mkdirSync(CORE, { recursive: true });
fs.writeFileSync(path.join(CORE, "keywords.csv"), stringifyCSV(keywordColumns, keywordCsvRows));

// ---------------------------------------------------------------------------
// 9. clusters.csv
// ---------------------------------------------------------------------------

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

const clusterRows = [];
for (const [clusterId, rows] of byCluster) {
  const primary = rows.find((r) => r.isClusterPrimary === "yes");
  const volumes = rows.map((r) => r.volume).filter((v) => v !== null);
  const kds = rows.map((r) => r.kd).filter((v) => v !== null);
  clusterRows.push({
    cluster_id: clusterId,
    name: primary.clusterName,
    primary_keyword: primary.keyword,
    total_volume: volumes.length ? volumes.reduce((a, b) => a + b, 0) : "",
    median_kd: kds.length ? median(kds) : "",
    target_url: primary.targetUrl || "",
    status: primary.status,
    serp_validated: rows.some((r) => r.serpValidated === "yes") ? "yes" : "no",
  });
}
clusterRows.sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0));

const clusterColumns = [
  "cluster_id",
  "name",
  "primary_keyword",
  "total_volume",
  "median_kd",
  "target_url",
  "status",
  "serp_validated",
];
fs.writeFileSync(path.join(CORE, "clusters.csv"), stringifyCSV(clusterColumns, clusterRows));

// ---------------------------------------------------------------------------
// 10. pages.csv — one row per indexable URL from the live build
// ---------------------------------------------------------------------------

const keywordsByTargetUrl = new Map();
for (const row of keywordRows) {
  if (!row.targetUrl) continue;
  if (!keywordsByTargetUrl.has(row.targetUrl)) keywordsByTargetUrl.set(row.targetUrl, []);
  keywordsByTargetUrl.get(row.targetUrl).push(row);
}

const pageRows = [];
for (const page of livePages) {
  const mapped = (keywordsByTargetUrl.get(page.url) || []).slice();
  mapped.sort((a, b) => (typeof b.priorityScore === "number" ? b.priorityScore : -1) - (typeof a.priorityScore === "number" ? a.priorityScore : -1));
  const primary = mapped[0];
  const secondary = mapped.slice(1).map((r) => r.keyword);
  const gsc = gscPageByUrl.get(page.url);

  pageRows.push({
    url: page.url,
    title: page.title,
    h1: page.h1,
    meta_description: page.desc,
    primary_cluster: primary ? primary.clusterId : "",
    primary_keyword: primary ? primary.keyword : "",
    secondary_keywords: secondary.join("; "),
    gsc_clicks_3m: gsc ? gsc.clicks3m ?? "" : "",
    gsc_impr_3m: gsc ? gsc.impr3m ?? "" : "",
    gsc_pos_3m: gsc ? gsc.pos3m ?? "" : "",
    gsc_clicks_28d: gsc ? gsc.clicks28d ?? "" : "",
    gsc_impr_28d: gsc ? gsc.impr28d ?? "" : "",
    gsc_pos_28d: gsc ? gsc.pos28d ?? "" : "",
    gsc_date: gsc ? "2026-10-10 export (page-baseline.csv)" : "no export covers this page yet",
    status: "published",
  });
}

const pageColumns = [
  "url",
  "title",
  "h1",
  "meta_description",
  "primary_cluster",
  "primary_keyword",
  "secondary_keywords",
  "gsc_clicks_3m",
  "gsc_impr_3m",
  "gsc_pos_3m",
  "gsc_clicks_28d",
  "gsc_impr_28d",
  "gsc_pos_28d",
  "gsc_date",
  "status",
];
fs.writeFileSync(path.join(CORE, "pages.csv"), stringifyCSV(pageColumns, pageRows));

// ---------------------------------------------------------------------------
// 11. Cannibalization — qualitative risk list (from AUDIT-2026-10-14.md §5)
//     plus an automated exact-duplicate-keyword/conflicting-target check.
// ---------------------------------------------------------------------------

const cannibalization = [
  {
    topic: "Alphabet learning/reference",
    cluster_ids: "alphabet-reference-and-recognition; hebrew-letters-individual-lessons--*; hebrew-alphabet-course-progression",
    target_urls:
      "/blog/hebrew-alphabet-complete-guide/; /learn/hebrew-alphabet/; /learn/hebrew-alphabet/aleph/ (and 21 planned letter lessons)",
    risk_level: "medium — flagged, not confirmed",
    note:
      "The guide owns whole-alphabet reference/chart queries; the course hub/lessons target letter-identification queries. AUDIT-2026-10-14.md calls this 'not confirmed cannibalization' — no post-launch SERP/GSC check exists yet since the course pages only recently went live.",
  },
  {
    topic: "Reading progression (how to read Hebrew)",
    cluster_ids: "reading-progression-and-comprehension; nikud-and-vowel-marks",
    target_urls:
      "/blog/hebrew-alphabet-complete-guide/; /blog/how-to-read-hebrew-nikud/; /blog/why-hebrew-without-vowels-looks-impossible-until-your-brain-adapts/",
    risk_level: "low-medium — monitored, not resolved",
    note:
      "keyword-to-url-map.md flags this as a monitored conflict: query-text overlap across three articles answering related 'how do I read Hebrew' variants, even though direct URL overlap is low in SERP pilot sampling.",
  },
  {
    topic: "App discovery",
    cluster_ids: "app-selection",
    target_urls: "https://hebrewedu.com/ (single target; intentional umbrella)",
    risk_level: "low",
    note:
      "All app-discovery keywords map to the homepage by design. SERP pilot showed only 1 shared result URL across these queries, i.e. distinct SERPs rather than true cannibalization.",
  },
  {
    topic: "Vocabulary vs. verb reference",
    cluster_ids: "vocabulary-learning-and-retention; verb-reference-and-beginner-practice",
    target_urls: "/blog/how-to-learn-hebrew-vocabulary/; /blog/meet-the-new-verb-directory/",
    risk_level: "low-medium",
    note:
      "Both touch vocabulary/verb terms. /blog/meet-the-new-verb-directory/ is also the proposed (unvalidated) target for v3's 'alef bet tutor verb directory' candidate.",
  },
];

// Automated check: same keyword text, different non-empty target_url
const byKeywordExact = new Map();
for (const r of keywordRows) {
  const k = r.keyword.toLowerCase();
  if (!byKeywordExact.has(k)) byKeywordExact.set(k, new Set());
  if (r.targetUrl) byKeywordExact.get(k).add(r.targetUrl);
}
for (const [k, urls] of byKeywordExact) {
  if (urls.size > 1) {
    cannibalization.push({
      topic: `Exact-keyword conflict: "${k}"`,
      cluster_ids: "(auto-detected)",
      target_urls: [...urls].join("; "),
      risk_level: "high — same keyword string assigned to 2+ URLs",
      note: "Automated check found this exact keyword mapped to more than one target_url across source files. Needs a single-owner decision.",
    });
  }
}

// ---------------------------------------------------------------------------
// 12. Content plan — clusters with no published page, by priority
// ---------------------------------------------------------------------------

const contentPlan = clusterRows
  .filter((c) => c.status !== "published")
  .map((c) => {
    const rows = byCluster.get(c.cluster_id);
    const maxScore = Math.max(
      ...rows.map((r) => (typeof r.priorityScore === "number" ? r.priorityScore : -1))
    );
    return { ...c, max_priority_score: maxScore === -1 ? "" : maxScore };
  })
  .sort((a, b) => (b.max_priority_score || 0) - (a.max_priority_score || 0));

// ---------------------------------------------------------------------------
// 13. Gaps
// ---------------------------------------------------------------------------

const gaps = [
  `GSC query→keyword join is by exact text match only against the one available export (2026-10-10, aggregate Web/all-device/all-country) — not US/mobile-specific, no page×query joint attribution.`,
  `rank_baseline_pos comes from a single depth-20 run (337cdd21...) on 2026-10-10; most keywords outside the original app-discovery set have never been rank-checked (empty column).`,
  `No DataForSEO volume/KD exists for the 6 editorial seed keywords added for /learn/hebrew-phrases/ and /play/hebrew-word-search/ — both pages post-date every semantic-core edition. priority_score for these rows has confidence "low".`,
  `v3 addendum (5 keywords) is explicitly "not authorized to promote without owner review" — carried here as status=candidate, not folded into v2's accepted set.`,
  `The audit's "24 rows missing from v2" turned out, on inspection, to be a false alarm: all 24 alphabet-expansion-candidate keywords that match a v1 keyword were merged into the existing v1 row (v2_origin=preserved_v1), not dropped. No keyword was actually rejected between v1 and v2 — the keywords.csv "rejected" status is defined but currently unused.`,
  `${gscExcludedNoise} GSC queries were excluded entirely (typo/noise/non-English, per keyword-map.csv's own "unassigned_low_evidence"/"non_english_defer" cluster labels) rather than added as candidates.`,
  `meta_description in pages.csv is scraped from the live dist/ build's <meta name="description"> tag, not from a separate editorial source — if a page lacks one, the cell is empty rather than guessed.`,
  `course-letter-map-v2.json's publication_status field is stale (says every letter "planned_not_implemented"); this build reads src/data/alphabet-course.json instead, which correctly shows Hub + Aleph published.`,
];

// ---------------------------------------------------------------------------
// 14. Workbook
// ---------------------------------------------------------------------------

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.created = new Date(`${TODAY}T00:00:00Z`);

  const readme = wb.addWorksheet("README");
  readme.columns = [{ width: 100 }];
  const readmeLines = [
    "HebrewEdu Semantic Core — generated view",
    `Generated: ${TODAY} by scripts/seo/build-core.mjs (npm run seo:build)`,
    "",
    "Source of truth for editing: docs/seo/core/keywords.csv, pages.csv, clusters.csv.",
    "This workbook is a READ-ONLY generated view. Do not hand-edit it — edit the CSVs and re-run `npm run seo:build`.",
    "",
    "priority_score formula (0 pts floor, no ceiling beyond component caps):",
    "  volume_component = min(volume, 2000) / 2000 * 50        (0 if volume unknown — never scored as 0 volume)",
    "  intent_component = 15 commercial/transactional, 10 navigational, 8 informational, 5 other/unknown",
    "  quick_win_bonus  = +15 if gsc_pos_3m is between 8 and 20 AND gsc_impr_3m > 0",
    "  kd_penalty       = (kd / 100) * 20                        (0 if KD unknown)",
    "  priority_score   = volume_component + intent_component + quick_win_bonus - kd_penalty",
    "Rows with neither volume, intent, nor a quick-win signal get an EMPTY priority_score (confidence: none) rather than a numeric 0 — null data lowers confidence, it never counts as zero demand.",
    "",
    "Tabs: Clusters, Keywords, Pages, Content plan (unpublished clusters by priority), Cannibalization, Gaps.",
  ];
  readmeLines.forEach((l) => readme.addRow([l]));

  function addTable(name, columns, rows) {
    const ws = wb.addWorksheet(name);
    ws.columns = columns.map((c) => ({ header: c, key: c, width: Math.max(14, Math.min(40, c.length + 4)) }));
    ws.addRows(rows);
    ws.getRow(1).font = { bold: true };
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } };
  }

  addTable("Clusters", clusterColumns, clusterRows);
  addTable("Keywords", keywordColumns, keywordCsvRows);
  addTable("Pages", pageColumns, pageRows);
  addTable(
    "Content plan",
    ["cluster_id", "name", "primary_keyword", "target_url", "status", "max_priority_score", "serp_validated"],
    contentPlan
  );
  addTable(
    "Cannibalization",
    ["topic", "cluster_ids", "target_urls", "risk_level", "note"],
    cannibalization
  );
  const gapsWs = wb.addWorksheet("Gaps");
  gapsWs.columns = [{ width: 110 }];
  gaps.forEach((g) => gapsWs.addRow([g]));

  await wb.xlsx.writeFile(path.join(ROOT, "docs/seo/semantic-core.xlsx"));
}

await buildWorkbook();

// ---------------------------------------------------------------------------
// 15. Console summary
// ---------------------------------------------------------------------------

console.log(`keywords.csv: ${keywordCsvRows.length} rows`);
console.log(`clusters.csv: ${clusterRows.length} clusters`);
console.log(`pages.csv: ${pageRows.length} rows (dist available: ${distAvailable})`);
console.log(`cannibalization entries: ${cannibalization.length}`);
console.log(`content plan entries: ${contentPlan.length}`);
console.log("docs/seo/semantic-core.xlsx written");
