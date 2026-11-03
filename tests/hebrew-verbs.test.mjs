import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { verbs, freeVerbs, verbIndex, binyanim, rootPairs } from '../src/lib/hebrew-verbs.mjs';
import { foldSearch, matchVerbs } from '../src/lib/verbs/search.mjs';

// The verb tool (docs/VERBS.md) shows the app's verb dictionary in part. The
// line it must never cross: a locked verb's forms reaching the site.

test('only free verbs carry forms, and there are 30 of them', () => {
  assert.equal(freeVerbs.length, 30);
  for (const verb of verbs) {
    if (verb.free) assert.ok(Object.keys(verb.forms).length >= 23, verb.id);
    else assert.deepEqual(Object.keys(verb).sort(), ['binyan', 'he', 'id', 'root', 'tr'], verb.id);
  }
});

test('the client index is headwords only', () => {
  for (const locale of ['en', 'fr']) {
    for (const entry of verbIndex(locale)) {
      assert.ok(!('forms' in entry) && !('prep' in entry), entry.id);
      assert.ok(entry.tr, `${entry.id} has a ${locale} translation`);
    }
  }
});

test('the built pages contain no locked verb form', { skip: !existsSync('dist/learn/hebrew-verbs/index.html') && 'run npm run build first' }, () => {
  const html = readFileSync('dist/learn/hebrew-verbs/index.html', 'utf8') + readFileSync('dist/fr/apprendre/conjugaison-hebreu/index.html', 'utf8');
  const app = JSON.parse(readFileSync(new URL('../src/data/hebrew-verbs.json', import.meta.url)));
  assert.equal(app.verbs.filter(v => !v.free && v.forms).length, 0);
  // A locked verb's present form never appears unless a free verb shares it.
  const freeForms = new Set(freeVerbs.flatMap(v => Object.values(v.forms).map(f => f[0])));
  assert.ok(!app.free.includes('likro'), 'pick another locked probe verb');
  assert.ok(!html.includes('קוֹרֵא') || freeForms.has('קוֹרֵא'), 'לִקְרֹא present form leaked');
});

test('chart examples and hero pairs are free verbs', () => {
  const free = new Set(freeVerbs.map(v => v.id));
  for (const b of binyanim) assert.ok(free.has(b.example), b.example);
  for (const pair of rootPairs) for (const id of pair.ids) assert.ok(free.has(id), id);
  for (const v of freeVerbs) for (const [, en, fr] of Object.values(v.forms)) assert.match(`${en} ${fr}`, /^[a-z' ]+$/, v.id);
});

test('search ignores nikud, plene spelling and final letters', () => {
  assert.equal(foldSearch('לִכְתֹּב'), foldSearch('לכתוב'));
  const index = verbIndex('en');
  assert.equal(matchVerbs(index, 'לכתוב', '')[0].id, 'likhtov');
  assert.ok(matchVerbs(index, 'כתב', '').some(v => v.id === 'lehikatev'));
  assert.ok(matchVerbs(index, 'to write', '').some(v => v.id === 'likhtov'));
  assert.ok(matchVerbs(verbIndex('fr'), 'ecrire', '').some(v => v.id === 'likhtov'));
  assert.ok(matchVerbs(index, '', 'pual').every(v => v.b === 'pual'));
  const all = matchVerbs(index, '', '');
  assert.ok(all.findIndex(v => !v.free) > all.findLastIndex(v => v.free), 'free verbs first');
});
