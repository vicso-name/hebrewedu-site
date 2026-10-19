import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { phraseGroups, phrases, phraseVariantFr, phraseDialogues, frPhraseExercises, frPhraseQuestions, phraseReviewFr } from '../src/data/hebrew-phrases.ts';
import { frPhraseContentSha256, phrasesPathFr, phrasesPublishedFr, phrasesEnabledFr, phrasesSitemapEntriesFr, phrasesSchemaFr } from '../src/lib/hebrew-phrases.mjs';
import { gradeAnswer } from '../src/lib/lessons/grading.mjs';

test('every phrase has FR content: heading, meaning, usage, gender note, and one FR variant per EN variant', () => {
  for (const group of phraseGroups) {
    assert.ok(group.frTitle && group.frDescription, `group ${group.id} is missing FR title/description`);
    for (const phrase of group.phrases) {
      assert.ok(phrase.fr, `phrase ${phrase.id} is missing FR content`);
      const fr = phrase.fr;
      assert.ok(fr.heading.includes(' — '), `phrase ${phrase.id} FR heading should be "<Latin spelling> — <French meaning>"`);
      assert.ok(fr.meaning && fr.usage && fr.genderNote);
      assert.equal(fr.variants.length, phrase.variants.length);
      for (const [index, variant] of fr.variants.entries()) {
        assert.ok(variant.hebrew && variant.transliteration);
        assert.doesNotMatch(variant.transliteration, /[֐-׿]/u);
        assert.doesNotMatch(variant.transliteration, /[[\]?.!,]/u, 'FR transliteration must not contain brackets or sentence punctuation (apostrophes allowed)');
        assert.doesNotMatch(variant.transliteration, /sh/u, 'FR transliteration should use "ch", not "sh"');
        assert.equal(phraseVariantFr(phrase.id, variant.id).transliteration, variant.transliteration);
        if (phrase.id !== 'speak-english') {
          // Hebrew + nikud stay identical to the EN variant, only speak-english/speak-french is localized.
          assert.equal(variant.hebrew, phrase.variants[index].hebrew);
        }
      }
    }
  }
  // Localized, not translated: FR asks about French, with its own Hebrew (צרפתית, not אנגלית).
  const speakEnglish = phrases.find(p => p.id === 'speak-english');
  assert.ok(speakEnglish.fr.variants.every(v => v.hebrew.includes('צָרְפָתִית')));
  assert.ok(speakEnglish.variants.every(v => v.hebrew.includes('אַנְגְּלִית')));
});

test('dialogues carry FR title/setting/role/translation for both exchanges', () => {
  for (const dialogue of phraseDialogues) {
    assert.ok(dialogue.frTitle && dialogue.frSetting);
    for (const turn of dialogue.turns) {
      assert.ok(turn.frRole && turn.frTranslation);
      assert.ok(phraseVariantFr(turn.phraseId, turn.variantId));
    }
  }
});

test('FR FAQ has 3-6 items and FR practice quiz mirrors the EN quiz shape', () => {
  assert.ok(frPhraseQuestions.length >= 3 && frPhraseQuestions.length <= 6);
  for (const item of frPhraseQuestions) assert.ok(item.question && item.answer);

  assert.equal(frPhraseExercises.length, 3);
  const optionIds = new Set();
  for (const question of frPhraseExercises) {
    assert.ok(question.prompt && question.explanation);
    assert.equal(question.options.length, 3);
    assert.equal(question.options.filter(o => o.id === question.correctOptionId).length, 1);
    for (const option of question.options) {
      assert.ok(!optionIds.has(option.id));
      optionIds.add(option.id);
      assert.ok(phraseVariantFr(option.phraseId, option.variantId));
      assert.equal(gradeAnswer(question, option.id).status, option.id === question.correctOptionId ? 'correct' : 'incorrect');
    }
    assert.equal(gradeAnswer(question, undefined).status, 'unanswered');
  }
});

test('FR release is recorded with its own named, dated approval matching the exact current content', () => {
  assert.equal(phraseReviewFr.editorialApproved, true);
  assert.ok(phraseReviewFr.reviewer?.trim());
  assert.ok(phraseReviewFr.qualification?.trim());
  assert.equal(phraseReviewFr.approvedContentSha256, frPhraseContentSha256);
  assert.equal(phraseReviewFr.published, true);
  assert.equal(phrasesPublishedFr(), true);
  assert.equal(phrasesEnabledFr(), true);
  assert.deepEqual(phrasesSitemapEntriesFr(), [{ url: phrasesPathFr, lastmod: phraseReviewFr.publishedAt, priority: '0.8', changefreq: 'weekly' }]);
});

test('FR release fails closed without named, dated approval matching the exact current content', () => {
  const draft = { editorialApproved: false, reviewer: null, qualification: null, reviewedAt: null, approvedContentSha256: null, published: false, publishedAt: null };
  assert.equal(phrasesPublishedFr(draft), false);
  assert.deepEqual(phrasesSitemapEntriesFr(draft), []);
  assert.throws(() => phrasesPublishedFr({ ...phraseReviewFr, approvedContentSha256: '0'.repeat(64) }), /release requires/);
});

test('FR metadata describes only the FR resource and a real Accueil / Phrases breadcrumb', () => {
  const schema = phrasesSchemaFr();
  assert.deepEqual(schema['@graph'].map(item => item['@type']), ['WebPage', 'BreadcrumbList']);
  const [page, breadcrumb] = schema['@graph'];
  assert.equal(page.url, `https://hebrewedu.com${phrasesPathFr}`);
  assert.deepEqual(page.inLanguage, ['fr', 'he']);
  assert.deepEqual(breadcrumb.itemListElement.map(item => item.item), ['https://hebrewedu.com/fr/', page.url]);
});

// Run after the ordinary production build.
test('production output contains the published FR route, sitemap URL and a live incoming link from FR nav', async () => {
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
  assert.ok(htmlFiles.some(path => path.pathname.endsWith('/fr/apprendre/phrases-hebreu/index.html')));
  assert.ok((await readFile(new URL('sitemap.xml', dist), 'utf8')).includes(`https://hebrewedu.com${phrasesPathFr}`));
  let hasLiveInboundLink = false;
  for (const path of htmlFiles) {
    if (/href=["'](?:https:\/\/hebrewedu\.com)?\/fr\/apprendre\/phrases-hebreu\//.test(await readFile(path, 'utf8'))) {
      hasLiveInboundLink = true;
      break;
    }
  }
  assert.ok(hasLiveInboundLink, 'Expected at least one page (the FR nav) to link to the published FR phrases page');
});
