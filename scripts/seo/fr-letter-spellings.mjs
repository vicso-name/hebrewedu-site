// FR letter-name spelling research (owner-approved paid YepAPI calls, $0.50 cap).
//
//   node scripts/seo/fr-letter-spellings.mjs overview   # one batch volume call
//   node scripts/seo/fr-letter-spellings.mjs serp       # tie-break SERP calls
//   node scripts/seo/fr-letter-spellings.mjs report     # decide + write the md
//
// Decision rule (owner's): highest volume wins; tie or both <=10 -> the spelling
// dominant in FR SERP titles; still tied -> fr.wikipedia's spelling.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createCaller, overviewPricing, serpPricing, balanceUsd, SpendCapExceeded } from './yepapi-client.mjs';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const OUT = resolve(ROOT, 'docs/seo/research/fr');
const CAP_USD = 0.50;
const TIE_THRESHOLD = 10; // "both <=10" per the owner's rule

// Slug -> French spelling variants actually used in French sources, most
// commonly-cited first. Slugs are the repo's canonical EN ones
// (scripts/alphabet-course/owner-letter-map.v2.json); spelling is display-only.
export const VARIANTS = {
  aleph: ['Aleph', 'Alef'],
  bet: ['Beth', 'Bet', 'Beit'],
  gimel: ['Guimel', 'Gimel', 'Ghimel'],
  dalet: ['Daleth', 'Dalet'],
  he: ['Hé', 'He'],
  vav: ['Vav', 'Waw'],
  zayin: ['Zayin', 'Zain'],
  chet: ['Heth', 'Het', 'Hhet'],
  tet: ['Teth', 'Tet'],
  yod: ['Yod', 'Youd'],
  kaf: ['Kaf', 'Kaph', 'Khaf'],
  lamed: ['Lamed', 'Lamedh'],
  mem: ['Mem'],
  nun: ['Noun', 'Nun'],
  samekh: ['Samekh', 'Samech'],
  ayin: ['Ayin', 'Aïn'],
  pe: ['Pé', 'Pe', 'Fé'],
  tsadi: ['Tsadi', 'Tsadé', 'Tsadik'],
  qof: ['Qof', 'Kof', 'Koph'],
  resh: ['Resh', 'Rech'],
  shin: ['Shin', 'Chin', 'Sin'],
  tav: ['Tav', 'Tau', 'Thav'],
};

/** The four query shapes the owner asked for, per variant. */
export const patterns = (name) => [
  name.toLowerCase(),
  `${name.toLowerCase()} hébreu`,
  `lettre ${name.toLowerCase()}`,
  `lettre hébraïque ${name.toLowerCase()}`,
];

export function allCandidates() {
  const out = [];
  for (const [slug, variants] of Object.entries(VARIANTS)) {
    for (const name of variants) for (const kw of patterns(name)) out.push({ slug, name, keyword: kw });
  }
  // Dedupe close variants that collapse to the same string (e.g. "Het"/"Heth"
  // stay distinct, but a repeated variant would not be paid for twice).
  const seen = new Set();
  return out.filter((c) => (seen.has(c.keyword) ? false : seen.add(c.keyword)));
}

const overviewPath = resolve(OUT, 'letter-spellings-volumes.json');
const serpPath = resolve(OUT, 'letter-spellings-serp.json');

async function readJson(p, fallback) {
  try { return JSON.parse(await readFile(p, 'utf8')); } catch { return fallback; }
}

const log = (endpoint, cost, spent) =>
  console.log(`  paid ${endpoint} $${cost.toFixed(4)} (session $${spent.toFixed(4)} / $${CAP_USD.toFixed(2)})`);

// ───────────────────────────── overview ─────────────────────────────

async function runOverview() {
  const candidates = allCandidates();
  const keywords = candidates.map((c) => c.keyword);
  console.log(`overview: ${keywords.length} keywords, ${Object.keys(VARIANTS).length} letters, location=fr language=fr`);

  const caller = createCaller({ capUsd: CAP_USD, onSpend: log });
  const { data, cached, cost } = await caller.call(
    '/v1/seo/keywords/overview',
    { keywords, location: 'fr', language: 'fr' },
    {
      note: `FR letter-name spelling research: ${keywords.length} candidates (22 letters x variants x 4 patterns)`,
      paramsSummary: `${keywords.length} keywords, location=fr, language=fr`,
      estimateCost: overviewPricing,
    },
  );
  console.log(cached ? '  (cache hit, $0.00)' : `  returned ${data.keywords.length} rows, $${cost.toFixed(4)}`);

  const byKeyword = new Map(data.keywords.map((k) => [k.keyword.toLowerCase(), k]));
  // A keyword the provider omits has no volume data at all — treat as 0, not unknown.
  const rows = candidates.map((c) => {
    const hit = byKeyword.get(c.keyword.toLowerCase());
    return {
      ...c,
      volume: hit?.volume ?? 0,
      difficulty: hit?.difficulty ?? null,
      cpc: hit?.cpc ?? null,
      intent: hit?.intent ?? null,
      hasData: Boolean(hit),
      trend12m: hit?.trend?.map((t) => t.volume) ?? null,
    };
  });
  await writeFile(overviewPath, JSON.stringify(rows, null, 1));
  console.log(`  wrote ${rows.length} rows -> ${overviewPath.replace(ROOT + '/', '')}`);
  console.log(`  with data: ${rows.filter((r) => r.hasData).length}, volume>0: ${rows.filter((r) => r.volume > 0).length}`);
}

// ─────────────────────────── variant scoring ───────────────────────────

/** The bare-name pattern measures homographs, not Hebrew-letter demand: in
 *  France "youd" is 301k, "bet" 18.1k (betting), "noun" 3.6k (the English
 *  word), "tet", "sin", "tau", "pe" and "fé" likewise. It is kept in the data
 *  for the record but excluded from scoring — only the Hebrew-qualified
 *  patterns ("<name> hébreu", "lettre <name>", "lettre hébraïque <name>")
 *  measure what we are choosing between. */
const isBareName = (row) => !/hébreu|hébraïque|lettre/.test(row.keyword);

/** A variant's score is its best volume across the Hebrew-qualified patterns. */
export function variantScores(rows) {
  const per = new Map(); // slug -> [{name, best, byPattern}]
  for (const [slug, variants] of Object.entries(VARIANTS)) {
    per.set(slug, variants.map((name) => {
      const mine = rows.filter((r) => r.slug === slug && r.name === name && !isBareName(r));
      const best = mine.reduce((m, r) => (r.volume > m.volume ? r : m), mine[0]);
      return { name, best: best.volume, bestKeyword: best.keyword, byPattern: mine };
    }).sort((a, b) => b.best - a.best));
  }
  return per;
}

/** A leading variant that is also a common French/English/Greek word, so even a
 *  clear volume gap may be measuring the homograph rather than the letter. */
const HOMOGRAPH_RISK = new Set(['nun', 'shin', 'tav']);

/** Letters whose top two variants are tied, both at or below the threshold, or
 *  whose leader is a homograph — all of them get a SERP tie-break. */
export function needsSerp(scores) {
  const out = [];
  for (const [slug, variants] of scores) {
    if (variants.length < 2) continue;
    const [a, b] = variants;
    if (a.best === b.best || (a.best <= TIE_THRESHOLD && b.best <= TIE_THRESHOLD) || HOMOGRAPH_RISK.has(slug)) out.push(slug);
  }
  return out;
}

// ─────────────────────────────── serp ───────────────────────────────

async function runSerp() {
  const rows = await readJson(overviewPath, null);
  if (!rows) throw new Error('run `overview` first');
  const scores = variantScores(rows);
  const todo = needsSerp(scores);
  console.log(`serp: ${todo.length} letter(s) need a tie-break: ${todo.join(', ')}`);

  const caller = createCaller({ capUsd: CAP_USD, onSpend: log });
  const results = await readJson(serpPath, {});
  const skipped = [];

  for (const slug of todo) {
    const [a, b] = scores.get(slug);
    // One SERP per letter, on the leading variant qualified with "hébreu".
    // A bare-name SERP would be worthless here — "pe", "tau" and "youd" return
    // nothing about Hebrew in France (see isBareName above) — and counting every
    // candidate spelling in one Hebrew-scoped result set is what decides it, so a
    // second call per letter would buy nothing.
    const query = `${a.name.toLowerCase()} hébreu`;
    if (results[slug]?.query === query) { console.log(`  ${slug}: cached`); continue; }
    try {
      const { data, cached, cost } = await caller.call(
        '/v1/serp/google',
        { query, location: 'fr', language: 'fr', depth: 10 },
        {
          note: `FR letter spelling tie-break: ${slug} (${a.name} vs ${b.name})`,
          paramsSummary: JSON.stringify({ query, location: 'fr', language: 'fr', depth: 10 }),
          estimateCost: serpPricing(10),
        },
      );
      const organic = (data.results ?? []).filter((r) => r.type === 'organic');
      const titles = organic.map((r) => ({ title: r.title ?? '', url: r.url ?? '', domain: r.domain ?? '' }));
      const count = (name) => {
        const re = new RegExp(`(?<![\\p{L}])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'iu');
        return titles.filter((t) => re.test(t.title)).length;
      };
      const wiki = titles.find((t) => t.domain.endsWith('fr.wikipedia.org'));
      results[slug] = {
        query,
        candidates: scores.get(slug).map((v) => v.name),
        titleCounts: Object.fromEntries(scores.get(slug).map((v) => [v.name, count(v.name)])),
        wikipediaTitle: wiki?.title ?? null,
        wikipediaUrl: wiki?.url ?? null,
        titles,
        cached,
      };
      console.log(`  ${slug}: "${query}" -> ${JSON.stringify(results[slug].titleCounts)}${wiki ? ` | fr.wikipedia: ${wiki.title}` : ''}${cached ? ' (cached)' : ` $${cost.toFixed(4)}`}`);
    } catch (error) {
      if (error instanceof SpendCapExceeded) { skipped.push(slug); console.log(`  ${slug}: SKIPPED — ${error.message}`); continue; }
      throw error;
    }
  }
  await writeFile(serpPath, JSON.stringify(results, null, 1));
  if (skipped.length) console.log(`\n  cap reached; ${skipped.length} letter(s) fall back to the fr.wikipedia rule: ${skipped.join(', ')}`);
}

// ────────────────────────────── commands ──────────────────────────────

const cmd = process.argv[2];
const before = await balanceUsd();
console.log(`balance before: $${before.toFixed(4)}\n`);
if (cmd === 'overview') await runOverview();
else if (cmd === 'serp') await runSerp();
else throw new Error('usage: fr-letter-spellings.mjs <overview|serp>');
const after = await balanceUsd();
console.log(`\nbalance after:  $${after.toFixed(4)}  (actual spend this run: $${(before - after).toFixed(4)})`);
