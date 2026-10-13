import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { phraseGroups, phrases, phraseVariant, phraseDialogues, phraseExercises, phraseQuestions, phraseReferences, phraseReview } from '../src/data/hebrew-phrases.ts';
import { phraseContentSha256, phrasesPath, phrasesPublished, phrasesEnabled, phrasesSitemapEntries, phrasesSchema, localPhrasesPreview } from '../src/lib/hebrew-phrases.mjs';
import { gradeAnswer } from '../src/lib/lessons/grading.mjs';

const approvedFixture = () => ({
  ...phraseReview, editorialApproved: true, reviewer: 'Test fixture reviewer', qualification: 'Native-speaker test fixture',
  reviewedAt: '2026-01-01', approvedContentSha256: phraseContentSha256, published: true, publishedAt: '2026-01-02',
});

test('five groups contain six distinct phrase entries each, with readable forms and reference provenance', () => {
  assert.equal(phraseGroups.length, 5);
  assert.equal(phrases.length, 30);
  assert.equal(new Set(phrases.map(phrase => phrase.id)).size, 30);
  const normalizedHebrew = new Set();
  for (const group of phraseGroups) {
    assert.equal(group.phrases.length, 6);
    assert.ok(group.title && group.description);
    for (const phrase of group.phrases) {
      assert.ok(phrase.meaning && phrase.usage && phrase.genderNote && phrase.referenceNote);
      assert.ok(phrase.references.length);
      assert.ok(phrase.references.every(id => phraseReferences[id]?.url.startsWith('https://')));
      assert.ok(phrase.variants.length === 1 || phrase.variants.length === 2);
      assert.equal(new Set(phrase.variants.map(variant => variant.id)).size, phrase.variants.length);
      for (const variant of phrase.variants) {
        assert.ok(variant.label && variant.transliteration);
        assert.match(variant.hebrew, /[\u05B0-\u05BB\u05C7]/u, 'Nikud must remain in Hebrew text');
        assert.doesNotMatch(variant.transliteration, /[\u0590-\u05FF]/u);
        assert.doesNotMatch(variant.transliteration, /[[\]?.!,]/u, 'Transliteration must not contain brackets or sentence punctuation (apostrophes are allowed)');
        assert.deepEqual(phraseVariant(phrase.id, variant.id), variant);
      }
      const key = phrase.variants[0].hebrew.normalize('NFD').replace(/[\u0591-\u05C7\s.,?!…]/gu, '');
      assert.ok(!normalizedHebrew.has(key), `Duplicate phrase: ${phrase.id}`);
      normalizedHebrew.add(key);
      if (phrase.variants.length === 2) {
        assert.ok(phrase.variants.every(variant => /(?:speaker|addressee)/.test(variant.label)));
        assert.notEqual(phrase.variants[0].transliteration, phrase.variants[1].transliteration);
      }
    }
  }
  assert.throws(() => phraseVariant('not-a-phrase'), /Unknown phrase/);
});

test('dialogues and all three exercise choices use taught records and stable grading keys', () => {
  assert.equal(phraseDialogues.length, 2);
  assert.equal(phraseExercises.length, 3);
  assert.equal(phraseQuestions.length, 3);
  for (const dialogue of phraseDialogues) {
    assert.equal(dialogue.turns.length, 2);
    assert.ok(dialogue.setting);
    dialogue.turns.forEach(turn => assert.ok(phraseVariant(turn.phraseId, turn.variantId) && turn.translation));
  }
  const optionIds = new Set();
  for (const question of phraseExercises) {
    assert.ok(question.prompt && question.explanation);
    assert.equal(question.options.length, 3);
    assert.equal(question.options.filter(option => option.id === question.correctOptionId).length, 1);
    for (const option of question.options) {
      assert.ok(!optionIds.has(option.id));
      optionIds.add(option.id);
      assert.ok(phraseVariant(option.phraseId, option.variantId));
      assert.equal(gradeAnswer(question, option.id).status, option.id === question.correctOptionId ? 'correct' : 'incorrect');
    }
    assert.equal(gradeAnswer(question, undefined).status, 'unanswered');
    assert.equal(gradeAnswer({ ...question, options: [...question.options].reverse() }, question.correctOptionId).status, 'correct');
  }
});

test('draft gate omits publication, sitemap and production routes, regardless of the old environment override', () => {
  assert.equal(phraseReview.editorialApproved, false);
  assert.equal(phraseReview.published, false);
  assert.equal(phrasesPublished(), false);
  assert.equal(phrasesEnabled(), false);
  assert.deepEqual(phrasesSitemapEntries(), []);
  assert.equal(localPhrasesPreview(true), true);
  assert.equal(localPhrasesPreview(false, { HEBREWEDU_LOCAL_PHRASES_PREVIEW: '1' }), false);
  assert.equal(phrasesEnabled(localPhrasesPreview(false)), false);
  assert.equal(phrasesEnabled(localPhrasesPreview(true)), true);
});

test('release fails closed without named, dated approval matching the exact teaching content', () => {
  const approved = approvedFixture();
  assert.equal(phrasesPublished(approved), true);
  assert.deepEqual(phrasesSitemapEntries(approved), [{ url: phrasesPath, lastmod: '2026-01-02', priority: '0.8', changefreq: 'monthly' }]);
  for (const change of [
    { editorialApproved: false }, { reviewer: null }, { reviewer: ' ' }, { qualification: null },
    { reviewedAt: null }, { reviewedAt: '2026-02-30' }, { reviewedAt: '2999-01-01' },
    { approvedContentSha256: '0'.repeat(64) }, { publishedAt: null }, { publishedAt: '2025-12-31' },
  ]) assert.throws(() => phrasesPublished({ ...approved, ...change }), /release requires/);
  assert.throws(() => phrasesPublished(approved, 'changed-content'), /exact current content/);
  assert.throws(() => phrasesPublished({ ...phraseReview, publishedAt: '2026-01-02' }), /Draft/);
});

test('metadata describes only the resource and real Home / Phrases breadcrumb', () => {
  const schema = phrasesSchema();
  assert.deepEqual(schema['@graph'].map(item => item['@type']), ['WebPage', 'BreadcrumbList']);
  const [page, breadcrumb] = schema['@graph'];
  assert.equal(page.url, `https://hebrewedu.com${phrasesPath}`);
  assert.deepEqual(page.inLanguage, ['en', 'he']);
  assert.deepEqual(breadcrumb.itemListElement.map(item => item.item), ['https://hebrewedu.com/', page.url]);
});

// Run after the ordinary production build. No preview flag or approval mutation is used.
test('production output contains no draft route, sitemap URL or live incoming link', async () => {
  const dist = new URL('../dist/', import.meta.url);
  assert.ok((await stat(dist)).isDirectory(), 'Run npm run build before this output check');
  const htmlFiles = [];
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, dir);
      if (entry.isDirectory()) await visit(path);
      else if (entry.name.endsWith('.html')) htmlFiles.push(path);
    }
  }
  await visit(dist);
  assert.ok(htmlFiles.length);
  assert.ok(!htmlFiles.some(path => path.pathname.endsWith('/learn/hebrew-phrases/index.html')));
  assert.ok(!(await readFile(new URL('sitemap.xml', dist), 'utf8')).includes(`https://hebrewedu.com${phrasesPath}`));
  for (const path of htmlFiles) {
    assert.doesNotMatch(await readFile(path, 'utf8'), /href=["'](?:https:\/\/hebrewedu\.com)?\/learn\/hebrew-phrases\//);
  }
});
