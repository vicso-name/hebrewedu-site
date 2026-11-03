// Binyanim post keyword research (owner-approved paid YepAPI calls, $1.00 cap) for
// /blog/hebrew-binyanim-explained/ and /fr/blog/binyanim-hebreu/. Builds on the
// verbs research (docs/seo/research/verbs/), which already covers binyanim / hebrew binyanim.
//
//   node scripts/seo/binyanim-keyword-research.mjs ideas   # keyword ideas, EN (us/en) + FR (fr/fr) seeds
//   node scripts/seo/binyanim-keyword-research.mjs serp    # top-10 SERPs for the picked keywords
//
// Every response is cached by a hash of its request body (responses/, gitignored:
// it may carry account identifiers), so re-running never pays twice. Every paid
// call is appended to spend.csv, and the client refuses a call past the cap.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createCaller, serpPricing } from './yepapi-client.mjs';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const OUT = resolve(ROOT, 'docs/seo/research/binyanim/2026-11-03');
const CACHE = resolve(ROOT, 'docs/seo/research/binyanim/responses');
const LEDGER = resolve(OUT, 'spend.csv');
const CAP_USD = 1;

// The binyan names one by one, the neighbouring topics, and FR seeds (the verbs
// run's `binyanim hébreu` / `verbes hébreux` returned nothing).
const SEEDS = [
  { seed: 'piel', location: 'us', language: 'en' },
  { seed: 'hifil', location: 'us', language: 'en' },
  { seed: 'hitpael', location: 'us', language: 'en' },
  { seed: 'nifal', location: 'us', language: 'en' },
  { seed: 'paal', location: 'us', language: 'en' },
  { seed: 'hebrew verb patterns', location: 'us', language: 'en' },
  { seed: 'hebrew roots', location: 'us', language: 'en' },
  { seed: 'grammaire hébraïque', location: 'fr', language: 'fr' },
  { seed: 'racine hébraïque', location: 'fr', language: 'fr' },
];

function spent() {
  if (!existsSync(LEDGER)) return 0;
  return readFileSync(LEDGER, 'utf8').trim().split('\n').slice(1)
    .reduce((sum, line) => sum + Number(line.split(',').at(-2) || 0), 0);
}

// $0.03 per call + $0.03 per 100 ideas returned, rounded up to the cent.
const ideasPricing = {
  worstCase: 0.1,
  price: (data) => Math.ceil((0.03 + 0.03 * ((data.keywords?.length ?? 0) / 100)) * 100) / 100,
};
const yep = () => createCaller({ capUsd: CAP_USD, cacheDir: CACHE, ledger: LEDGER, spentUsd: spent() });

async function ideas() {
  const caller = yep();
  const out = [];
  for (const { seed, location, language } of SEEDS) {
    const body = { keyword: seed, location, language };
    const { data, cached } = await caller.call('/v1/seo/keywords/ideas', body,
      { note: `binyanim ideas seed ${seed}`, paramsSummary: `ideas "${seed}" ${location}/${language}`, estimateCost: ideasPricing });
    console.log(`${cached ? 'cache' : 'paid '} ideas "${seed}" ${location}: ${data.keywords?.length ?? 0}`);
    for (const k of data.keywords ?? []) {
      out.push({ market: location, seed, keyword: k.keyword, volume: k.volume ?? k.searchVolume ?? null, kd: k.difficulty ?? null, cpc: k.cpc ?? null, intent: k.intent ?? null });
    }
  }
  await writeFile(resolve(OUT, 'ideas.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`ideas: ${out.length} rows, spent $${spent().toFixed(4)}`);
}

// Picked by hand from ideas.json: `market keyword` per line in serp-keywords.txt.
async function serp() {
  const caller = yep();
  const picks = (await readFile(resolve(OUT, 'serp-keywords.txt'), 'utf8')).trim().split('\n')
    .map(line => line.trim()).filter(Boolean).map(line => ({ location: line.slice(0, 2), query: line.slice(3) }));
  const out = [];
  for (const { location, query } of picks) {
    const body = { query, location, language: location === 'fr' ? 'fr' : 'en', depth: 10 };
    const { data, cached } = await caller.call('/v1/serp/google', body,
      { note: `binyanim serp ${query}`, paramsSummary: `serp "${query}" ${location} depth 10`, estimateCost: serpPricing(10) });
    console.log(`${cached ? 'cache' : 'paid '} serp "${query}" ${location}`);
    const results = data.results ?? [];
    const organic = results.filter(r => r.type === 'organic');
    out.push({
      market: location, keyword: query,
      features: [...new Set(results.map(r => r.type))],
      hebrewedu: organic.findIndex(r => r.domain?.includes('hebrewedu.com')) + 1 || null,
      top: organic.slice(0, 10).map((r, i) => ({ rank: i + 1, domain: r.domain, url: r.url, title: r.title })),
    });
  }
  await writeFile(resolve(OUT, 'serp.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`serp: ${out.length} keywords, spent $${spent().toFixed(4)}`);
}

const cmd = process.argv[2];
await mkdir(OUT, { recursive: true });
if (!existsSync(LEDGER)) writeFileSync(LEDGER, 'timestamp,endpoint,params,cost_usd,note\n');
if (cmd === 'ideas') await ideas();
else if (cmd === 'serp') await serp();
else { console.error('usage: ideas | serp'); process.exit(1); }
