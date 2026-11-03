// Tool demand research (owner-approved paid YepAPI calls: what was left of the
// binyanim run's $1.00, i.e. a $0.56 cap). Which free web tool do Hebrew
// learners actually search for, with low competition?
//
//   node scripts/seo/tool-demand-research.mjs overview   # volume + KD for the hypothesis list
//   node scripts/seo/tool-demand-research.mjs ideas      # keyword ideas for the seeds in ideas-seeds.txt
//   node scripts/seo/tool-demand-research.mjs serp       # top-10 SERPs for serp-keywords.txt
//
// Every response is cached by a hash of its request body (responses/, gitignored:
// it may carry account identifiers), so re-running never pays twice. Every paid
// call is appended to spend.csv, and the client refuses a call past the cap.

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createCaller, overviewPricing, serpPricing } from './yepapi-client.mjs';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const OUT = resolve(ROOT, 'docs/seo/research/tools/2026-11-03');
const CACHE = resolve(ROOT, 'docs/seo/research/tools/responses');
const LEDGER = resolve(OUT, 'spend.csv');
const CAP_USD = 0.56;

// Hypotheses, grouped by the tool they would justify.
export const HYPOTHESES = {
  keyboard: ['hebrew keyboard', 'hebrew keyboard online', 'online hebrew keyboard', 'virtual hebrew keyboard', 'hebrew keyboard layout', 'hebrew phonetic keyboard', 'hebrew keyboard with vowels', 'type in hebrew', 'type hebrew online', 'hebrew typing', 'hebrew typing practice', 'learn hebrew typing', 'hebrew typing test', 'hebrew typing tutor'],
  nikud: ['add nikud to hebrew text', 'hebrew nikud online', 'nikud generator', 'nakdan', 'hebrew vowel pointing', 'hebrew text with vowels', 'remove nikud', 'hebrew vowels chart', 'nikud chart', 'hebrew vowels'],
  transliteration: ['hebrew transliteration', 'hebrew transliteration tool', 'hebrew to english transliteration', 'english to hebrew transliteration', 'transliterate hebrew', 'hebrew transliteration converter', 'english words in hebrew letters', 'my name in hebrew', 'english name in hebrew', 'name in hebrew letters', 'how to write my name in hebrew', 'write my name in hebrew', 'hebrew name translator', 'your name in hebrew'],
  numbers: ['hebrew numbers', 'numbers in hebrew', 'hebrew numbers 1-100', 'hebrew numbers 1-10', 'how to say numbers in hebrew', 'hebrew number converter', 'hebrew numbers translator', 'hebrew numbers masculine and feminine', 'hebrew numerals', 'hebrew numerals converter', 'gematria calculator', 'hebrew numbers chart', 'hebrew years converter'],
  time: ['hebrew date converter', 'hebrew birthday calculator', 'how to tell time in hebrew', 'hebrew months', 'days of the week in hebrew'],
  script: ['hebrew cursive', 'hebrew cursive alphabet', 'hebrew cursive writing practice', 'hebrew handwriting', 'hebrew handwriting practice', 'hebrew cursive worksheets', 'hebrew alphabet worksheets', 'hebrew letter tracing', 'hebrew cursive converter', 'hebrew cursive font', 'hebrew script', 'how to write hebrew letters', 'hebrew alphabet printable'],
  audio: ['hebrew pronunciation', 'hebrew text to speech', 'hebrew pronunciation guide', 'how to pronounce hebrew words', 'hebrew audio'],
  grammar: ['hebrew plural', 'hebrew plurals', 'hebrew noun gender', 'hebrew possessive suffixes', 'hebrew pronouns', 'hebrew pronouns chart', 'hebrew prepositions', 'hebrew prepositions with suffixes', 'hebrew adjectives', 'smichut', 'hebrew construct state', 'hebrew sentence structure', 'hebrew grammar', 'hebrew grammar chart', 'hebrew tenses'],
  vocabulary: ['most common hebrew words', '100 most common hebrew words', '1000 most common hebrew words', 'hebrew word frequency list', 'hebrew vocabulary list', 'hebrew flashcards', 'hebrew flashcards online', 'hebrew word of the day', 'hebrew root finder', 'hebrew root search', 'find hebrew root', 'hebrew dictionary', 'hebrew english dictionary', 'hebrew dictionary with nikud', 'basic hebrew words', 'hebrew words for beginners'],
  reading: ['hebrew reading practice', 'hebrew reading practice for beginners', 'easy hebrew texts', 'hebrew texts for beginners', 'hebrew text with translation', 'hebrew stories for beginners', 'hebrew alphabet quiz', 'hebrew letters quiz', 'hebrew vowels quiz', 'hebrew level test', 'hebrew placement test', 'hebrew proficiency test', 'hebrew test online', 'hebrew practice online', 'hebrew exercises', 'hebrew worksheets'],
};

export const HYPOTHESES_FR = ['clavier hébreu', 'clavier hébreu en ligne', 'clavier hébreu virtuel', 'chiffres en hébreu', 'nombres en hébreu', 'prénom en hébreu', 'écrire son prénom en hébreu', 'traduction prénom hébreu', 'translittération hébreu', 'alphabet hébreu à imprimer', 'écriture cursive hébraïque', 'hébreu cursif', 'voyelles hébraïques', 'nikoud', 'dictionnaire hébreu français', 'conjugaison hébreu', 'mots hébreux courants', 'test de niveau hébreu', 'exercices hébreu', 'lecture hébreu débutant', 'jours de la semaine en hébreu', 'mois hébreux', 'calendrier hébraïque convertisseur', 'guématrie calcul'];

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

const row = (k, extra) => ({
  ...extra, keyword: k.keyword, volume: k.volume ?? k.searchVolume ?? null, kd: k.difficulty ?? null,
  cpc: k.cpc ?? null, intent: k.intent ?? null, trend: (k.trend ?? []).map(t => t.volume),
});

async function overview() {
  const caller = yep();
  const group = new Map(Object.entries(HYPOTHESES).flatMap(([g, list]) => list.map(k => [k, g])));
  const out = [];
  for (const [market, keywords] of [['us', [...group.keys()]], ['fr', HYPOTHESES_FR]]) {
    const body = { keywords, location: market, language: market === 'fr' ? 'fr' : 'en' };
    const { data, cached } = await caller.call('/v1/seo/keywords/overview', body,
      { note: `tools overview ${market}`, paramsSummary: `overview ${keywords.length} keywords ${market}`, estimateCost: overviewPricing });
    console.log(`${cached ? 'cache' : 'paid '} overview ${market}: ${data.keywords?.length ?? 0}`);
    for (const k of data.keywords ?? []) out.push(row(k, { market, group: group.get(k.keyword) ?? 'fr' }));
  }
  await writeFile(resolve(OUT, 'overview.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`overview: ${out.length} rows, spent $${spent().toFixed(4)}`);
}

// `market seed` per line in ideas-seeds.txt, picked from overview.json.
async function ideas() {
  const caller = yep();
  const seeds = (await readFile(resolve(OUT, 'ideas-seeds.txt'), 'utf8')).trim().split('\n')
    .map(l => l.trim()).filter(Boolean).map(l => ({ location: l.slice(0, 2), seed: l.slice(3) }));
  const out = [];
  for (const { seed, location } of seeds) {
    const body = { keyword: seed, location, language: location === 'fr' ? 'fr' : 'en' };
    const { data, cached } = await caller.call('/v1/seo/keywords/ideas', body,
      { note: `tools ideas seed ${seed}`, paramsSummary: `ideas "${seed}" ${location}`, estimateCost: ideasPricing });
    console.log(`${cached ? 'cache' : 'paid '} ideas "${seed}" ${location}: ${data.keywords?.length ?? 0}`);
    for (const k of data.keywords ?? []) out.push(row(k, { market: location, seed }));
  }
  await writeFile(resolve(OUT, 'ideas.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`ideas: ${out.length} rows, spent $${spent().toFixed(4)}`);
}

// `market keyword` per line in serp-keywords.txt.
async function serp() {
  const caller = yep();
  const picks = (await readFile(resolve(OUT, 'serp-keywords.txt'), 'utf8')).trim().split('\n')
    .map(l => l.trim()).filter(Boolean).map(l => ({ location: l.slice(0, 2), query: l.slice(3) }));
  const out = [];
  for (const { location, query } of picks) {
    const body = { query, location, language: location === 'fr' ? 'fr' : 'en', depth: 10 };
    const { data, cached } = await caller.call('/v1/serp/google', body,
      { note: `tools serp ${query}`, paramsSummary: `serp "${query}" ${location} depth 10`, estimateCost: serpPricing(10) });
    console.log(`${cached ? 'cache' : 'paid '} serp "${query}" ${location}`);
    const results = data.results ?? [];
    out.push({
      market: location, keyword: query,
      features: [...new Set(results.map(r => r.type).filter(t => t !== 'organic'))],
      top: results.filter(r => r.type === 'organic').slice(0, 10).map((r, i) => ({ rank: i + 1, domain: r.domain, url: r.url, title: r.title })),
    });
  }
  await writeFile(resolve(OUT, 'serp.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`serp: ${out.length} queries, spent $${spent().toFixed(4)}`);
}

const mode = process.argv[2];
if (!existsSync(OUT)) await (await import('node:fs/promises')).mkdir(OUT, { recursive: true });
if (!existsSync(LEDGER)) await writeFile(LEDGER, 'timestamp,endpoint,params,cost_usd,note\n');
await ({ overview, ideas, serp }[mode] ?? (() => { throw new Error('mode: overview | ideas | serp'); }))();
