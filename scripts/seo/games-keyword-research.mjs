// Games keyword research (owner-approved paid DataForSEO calls, $1.00 cap).
//
//   node scripts/seo/games-keyword-research.mjs volume    # one Google Ads volume batch
//   node scripts/seo/games-keyword-research.mjs suggest   # Labs suggestions for 3 seeds
//   node scripts/seo/games-keyword-research.mjs serp      # top-10 SERPs by volume
//
// Every response is cached by a hash of its request body (responses/, gitignored:
// it may carry account identifiers), so re-running never pays twice. Every paid
// call is appended to spend.csv before the next one is allowed.

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const OUT = resolve(ROOT, 'docs/seo/research/games/2026-10-23');
const CACHE = resolve(ROOT, 'docs/seo/research/games/responses');
const LEDGER = resolve(OUT, 'spend.csv');
const CAP_USD = 1.0;
const API = 'https://api.dataforseo.com';
const MARKET = { location_code: 2840, language_code: 'en' }; // US/en, same as the core

export const CANDIDATES = [
  // GSC queries with clicks/impressions that the core does not carry yet
  'hebrew games', 'hebrew games online', 'hebrew game', 'nikud', 'letter hey in hebrew',
  // general
  'hebrew learning games', 'free hebrew games', 'learn hebrew games', 'hebrew games for adults',
  'hebrew games for kids', 'free hebrew games online', 'hebrew educational games',
  // mechanics
  'hebrew word game', 'hebrew word games', 'hebrew crossword', 'hebrew wordle', 'hebrew hangman',
  'hebrew memory game', 'hebrew matching game', 'hebrew bingo', 'hebrew typing game', 'hebrew quiz',
  'hebrew vocabulary quiz', 'hebrew flashcards', 'hebrew puzzle',
  // our games
  'hebrew spelling game', 'hebrew word scramble', 'hebrew word builder', 'hebrew word search',
  'hebrew mahjong', 'hebrew vocabulary game', 'hebrew alphabet game', 'hebrew alphabet games',
  'aleph bet games', 'alef bet game', 'hebrew letters game', 'hebrew letter games',
  // future games
  'nikud game', 'hebrew vowels game', 'hebrew reading game', 'hebrew reading practice',
  'hebrew alphabet games for kids', 'hebrew word search printable', 'hebrew numbers game',
  'hebrew colors game',
];
export const SEEDS = ['hebrew game', 'hebrew games', 'aleph bet game'];

function creds() {
  const p = resolve(homedir(), '.config/codex-seo/dataforseo/credentials.json');
  const { DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD } = JSON.parse(readFileSync(p, 'utf8'));
  return 'Basic ' + Buffer.from(`${DATAFORSEO_LOGIN}:${DATAFORSEO_PASSWORD}`).toString('base64');
}

function spent() {
  if (!existsSync(LEDGER)) return 0;
  return readFileSync(LEDGER, 'utf8').trim().split('\n').slice(1)
    .reduce((sum, line) => sum + Number(line.split(',').at(-2) || 0), 0);
}

async function call(endpoint, body, { estimate, summary }) {
  const payload = JSON.stringify(body);
  const hash = createHash('sha256').update(endpoint + payload).digest('hex').slice(0, 16);
  const cached = resolve(CACHE, `${hash}.json`);
  if (existsSync(cached)) return JSON.parse(await readFile(cached, 'utf8'));
  if (spent() + estimate > CAP_USD) {
    throw new Error(`spend cap: ${spent().toFixed(4)} spent + ${estimate} estimated > ${CAP_USD}`);
  }
  const res = await fetch(API + endpoint, {
    method: 'POST', headers: { Authorization: creds(), 'Content-Type': 'application/json' }, body: payload,
  });
  const json = await res.json();
  // The envelope can be 20000 while the task itself failed (e.g. 40200 Payment
  // Required): only a successful task is cached, so a retry makes a real call.
  const task = json.tasks?.[0];
  const ok = json.status_code === 20000 && task?.status_code === 20000;
  if (ok) {
    await mkdir(CACHE, { recursive: true });
    await writeFile(cached, JSON.stringify(json));
  }
  if (!existsSync(LEDGER)) await writeFile(LEDGER, 'timestamp,endpoint,params_summary,cost_usd,cache_file\n');
  await appendFile(LEDGER, `${new Date().toISOString()},${endpoint},${summary},${json.cost ?? 0},${ok ? `${hash}.json` : `failed ${task?.status_code ?? json.status_code}`}\n`);
  if (!ok) throw new Error(`${endpoint}: ${task?.status_code ?? json.status_code} ${task?.status_message ?? json.status_message}`);
  return json;
}

async function volume() {
  const json = await call('/v3/keywords_data/google_ads/search_volume/live',
    [{ keywords: CANDIDATES, ...MARKET }],
    { estimate: 0.09, summary: `${CANDIDATES.length} keywords US/en` });
  const rows = json.tasks[0].result ?? [];
  await writeFile(resolve(OUT, 'volume.json'), JSON.stringify(rows.map((r) => ({
    keyword: r.keyword, volume: r.search_volume, competition: r.competition, cpc: r.cpc,
  })), null, 2) + '\n');
  console.log(`volume: ${rows.length} rows, spent ${spent().toFixed(4)}`);
}

async function suggest() {
  const out = [];
  for (const seed of SEEDS) {
    const json = await call('/v3/dataforseo_labs/google/keyword_suggestions/live',
      [{ keyword: seed, ...MARKET, limit: 100, include_seed_keyword: true }],
      { estimate: 0.03, summary: `suggestions "${seed}" limit 100 US/en` });
    for (const it of json.tasks[0].result?.[0]?.items ?? []) {
      out.push({ seed, keyword: it.keyword, volume: it.keyword_info?.search_volume ?? null, kd: it.keyword_properties?.keyword_difficulty ?? null });
    }
  }
  await writeFile(resolve(OUT, 'suggestions.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`suggest: ${out.length} rows, spent ${spent().toFixed(4)}`);
}

async function serp() {
  const vol = JSON.parse(await readFile(resolve(OUT, 'volume.json'), 'utf8'));
  const top = vol.filter((r) => r.volume).sort((a, b) => b.volume - a.volume).slice(0, 10);
  const out = [];
  for (const { keyword, volume: v } of top) {
    const json = await call('/v3/serp/google/organic/live/advanced',
      [{ keyword, ...MARKET, device: 'mobile', os: 'android', depth: 10 }],
      { estimate: 0.003, summary: `serp "${keyword}" US/en mobile top10` });
    const items = (json.tasks[0].result?.[0]?.items ?? []).filter((i) => i.type === 'organic');
    out.push({
      keyword, volume: v,
      hebrewedu: items.find((i) => i.domain?.includes('hebrewedu.com'))?.rank_group ?? null,
      top: items.slice(0, 10).map((i) => ({ rank: i.rank_group, domain: i.domain, title: i.title })),
    });
  }
  await writeFile(resolve(OUT, 'serp.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`serp: ${out.length} keywords, spent ${spent().toFixed(4)}`);
}

const cmd = process.argv[2];
await mkdir(OUT, { recursive: true });
if (cmd === 'volume') await volume();
else if (cmd === 'suggest') await suggest();
else if (cmd === 'serp') await serp();
else { console.error('usage: volume | suggest | serp'); process.exit(1); }
