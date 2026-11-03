import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cursiveLetters, lookAlikePairs, cursiveExamples, enLetterNames, letterName, lessonHref, cursiveSitemapEntries } from '../src/lib/hebrew-cursive.mjs';
import { frLetterNames } from '../src/i18n/fr-letters.ts';
import { en } from '../src/i18n/en.ts';
import { fr } from '../src/i18n/fr.ts';

test('the chart has the 22 letters and 5 final forms, in alphabet order', () => {
  assert.equal(cursiveLetters.length, 27);
  assert.equal(cursiveLetters.filter(l => l.final).map(l => l.he).join(''), 'ךםןףץ');
  assert.equal(cursiveLetters.map(l => l.he).join(''), 'אבגדהוזחטיכךלמםנןסעפףצץקרשת');
  assert.equal(new Set(cursiveLetters.map(l => l.id)).size, 27);
});

test('every letter has an EN and FR name, finals through the template', () => {
  for (const letter of cursiveLetters) {
    assert.ok(enLetterNames[letter.slug], letter.id);
    assert.ok(frLetterNames[letter.slug], letter.id);
  }
  const kafFinal = cursiveLetters.find(l => l.id === 'kaf-final');
  assert.equal(letterName(kafFinal, enLetterNames, en.cursive.finalTemplate), 'Final Kaf');
  assert.equal(letterName(kafFinal, frLetterNames, fr.cursive.finalTemplate), 'Kaf final');
});

test('look-alike pairs resolve and each has a tip in both locales', () => {
  for (const pair of lookAlikePairs) assert.ok(pair.every(Boolean));
  assert.equal(en.cursive.pairTips.length, lookAlikePairs.length);
  assert.equal(fr.cursive.pairTips.length, lookAlikePairs.length);
  // Each tip names its own two letters.
  lookAlikePairs.forEach(([a, b], i) => {
    for (const tips of [en.cursive.pairTips, fr.cursive.pairTips]) {
      assert.ok(tips[i].includes(a.he) && tips[i].includes(b.he), `pair ${i}`);
    }
  });
});

test('example words use only known letters and have a gloss in both locales', () => {
  const known = new Set(cursiveLetters.map(l => l.he));
  for (const word of cursiveExamples) for (const ch of word) assert.ok(ch === ' ' || known.has(ch), word);
  assert.equal(en.cursive.examples.length, cursiveExamples.length);
  assert.equal(fr.cursive.examples.length, cursiveExamples.length);
});

test('lesson links only point at published lessons, per locale', () => {
  const aleph = cursiveLetters[0];
  assert.equal(lessonHref(aleph, 'en'), '/learn/hebrew-alphabet/aleph/');
  assert.equal(lessonHref(aleph, 'fr'), '/fr/apprendre/alphabet-hebreu/aleph/');
  for (const letter of cursiveLetters) {
    const href = lessonHref(letter, 'en');
    if (href) assert.ok(href.endsWith(`/${letter.slug}/`));
  }
});

test('both locales are in the sitemap', () => {
  assert.deepEqual(cursiveSitemapEntries().map(e => e.url), ['/learn/hebrew-cursive/', '/fr/apprendre/hebreu-cursif/']);
});
