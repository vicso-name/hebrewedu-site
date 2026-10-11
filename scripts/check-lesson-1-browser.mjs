import { pathToFileURL } from 'node:url';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { unavailableQuestions } from '../src/lib/lessons/presentation.mjs';
const modulePath = process.env.PLAYWRIGHT_MODULE;
if (!modulePath) throw new Error('Set PLAYWRIGHT_MODULE to your local playwright/index.mjs path.');
const { chromium, webkit } = await import(pathToFileURL(modulePath));
const base = process.env.LESSON_POC_URL ?? 'http://127.0.0.1:4325';
const url = `${base}/learn/hebrew-alphabet/aleph/`;
const published = process.env.LESSON_POC_PUBLISHED === '1';
const lesson = JSON.parse(await readFile(new URL('../src/content/lessons/aleph.json', import.meta.url)));
const dir = new URL(process.env.LESSON_POC_ARTIFACT_DIR ? pathToFileURL(`${process.env.LESSON_POC_ARTIFACT_DIR}/`) : new URL('../artifacts/lesson-1-poc/guided/', import.meta.url));
await mkdir(dir, { recursive: true });
assert.equal(lesson.exercises.length, 14);
assert.equal(unavailableQuestions.size, 0);
const q4 = lesson.exercises.find(q => q.sourceId === '1742106507820');
assert.equal(q4.options.find(o => o.id === q4.correctOptionId).label, 'True');
const result = { url, stages: [], questions: [], widths: [], accessibility: [], requests: [], errors: [] };
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => result.errors.push(error.message));
  page.on('request', request => result.requests.push(request.url()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
  const initialUrl = page.url();
  const documentToken = await page.evaluate(() => { window.__lessonDocumentToken = Math.random(); return window.__lessonDocumentToken; });
  const stage = async name => {
    await page.locator(`.stage-navigation [data-stage-target="${name}"]`).click();
    assert.equal(await page.locator('[data-stage]:visible').count(), 1);
    assert.equal(await page.locator(`#stage-${name}`).isVisible(), true);
    assert.equal(await page.locator(`#stage-${name} [data-stage-heading]`).evaluate(node => node === document.activeElement), true);
    assert.equal(page.url(), initialUrl);
    assert.equal(await page.evaluate(() => window.__lessonDocumentToken), documentToken);
  };
  assert.equal(await page.locator('[data-study-type]').count(), 11);
  assert.equal(await page.locator('[data-exercise-id]').count(), 14);
  assert.equal(await page.locator('#stage-theory').isVisible(), true);
  assert.equal(await page.locator('[data-stage]:visible').count(), 1);
  assert.equal(await page.locator('.review-note, .editorial-review, .illustration-status').count(), 0);
  assert.equal(await page.locator('a[href*="/bet/"], img[src*="backblaze"], audio').count(), 0);
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), published ? 'index, follow' : 'noindex, nofollow, noarchive');
  if (published) {
    assert.equal(await page.title(), 'Aleph Hebrew Letter Lesson | HebrewEdu');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://hebrewedu.com/learn/hebrew-alphabet/aleph/');
  }
  // Test explicit Next/Back stage controls before using the stage indicator.
  await page.locator('#stage-theory [data-stage-target="examples"]').click();
  assert.equal(await page.locator('#stage-examples').isVisible(), true);
  await page.locator('#stage-examples [data-stage-target="theory"]').click();
  assert.equal(await page.locator('#stage-theory').isVisible(), true);
  await stage('examples');
  assert.equal(await page.locator('.mark-glyph').count(), 3);
  await page.locator('#stage-examples [data-stage-target="practice"]').click();
  assert.equal(await page.locator('#stage-practice').isVisible(), true);
  await page.locator('[data-previous]').click();
  assert.equal(await page.locator('#stage-examples').isVisible(), true);
  await stage('practice');
  result.stages.push('Theory → Examples → Practice; Back/Next and stage indicator preserve one document/URL.');
  for (let i = 0; i < lesson.exercises.length; i++) {
    const question = lesson.exercises[i];
    const form = page.locator(`#${question.id}`);
    assert.equal(await form.isVisible(), true);
    if (unavailableQuestions.has(question.id)) {
      assert.equal(await form.locator('input, button[type="submit"]').count(), 0);
      assert.match(await form.innerText(), /not available/);
      result.questions.push({ number: i + 1, status: 'unavailable; original retained for approval' });
    } else {
      const wrong = question.options.find(option => option.id !== question.correctOptionId);
      await form.locator(`#${wrong.id}`).check();
      // A draft selection also survives switching away and back.
      await stage('theory'); await stage('practice');
      assert.equal(await form.locator(`#${wrong.id}`).isChecked(), true);
      await form.locator('button[type="submit"]').click();
      assert.match(await form.locator('[role="status"]').innerText(), /Not quite/);
      assert.equal(await form.locator('input:enabled').count(), 0);
      assert.equal(await form.locator('button[type="submit"]').isVisible(), false);
      assert.equal(await form.locator('[role="status"]').evaluate(node => node === document.activeElement), true);
      assert.equal(await form.locator('[data-explanation]').count(), 1);
      assert.equal(await form.locator('[data-explanation] p').last().innerText(), question.explanation);
      // Changing stages preserves submitted selection, feedback and locked controls.
      await stage('examples'); await stage('practice');
      assert.equal(await form.locator(`#${wrong.id}`).isChecked(), true);
      assert.equal(await form.locator('input:enabled').count(), 0);
      await form.locator('[data-retry]').click();
      assert.equal(await form.locator('input').first().evaluate(node => node === document.activeElement), true);
      await form.locator(`#${question.correctOptionId}`).check();
      await form.locator('button[type="submit"]').click();
      assert.match(await form.locator('[role="status"]').innerText(), /Correct/);
      assert.equal(await form.locator('[data-retry]').isVisible(), false);
      assert.equal(await form.locator('button[type="submit"]').isVisible(), false);
      result.questions.push({ number: i + 1, type: question.type, wrong: 'pass', retry: 'pass', correct: 'pass', statePreserved: 'pass' });
    }
    if (i > 0) {
      await page.locator('[data-previous]').click();
      assert.equal(await page.locator(`#${lesson.exercises[i - 1].id}`).isVisible(), true);
      await page.locator('[data-next]').click();
      assert.equal(await form.isVisible(), true);
    }
    await page.locator('[data-next]').click();
  }
  assert.equal(await page.locator('#stage-results').isVisible(), true);
  assert.equal(await page.locator('[data-result-correct]').innerText(), '14');
  assert.equal(await page.locator('[data-result-attempted]').innerText(), '14');
  assert.equal(await page.locator('[data-result-unanswered]').innerText(), '0');
  assert.equal(await page.locator('[data-result-percentage]').innerText(), '100%');
  assert.equal(await page.locator('[data-unavailable]').count(), 0);
  assert.equal(await page.locator('[data-unanswered-list]').innerText(), 'No questions were skipped.');
  assert.match(await page.locator('[data-percentage-label]').innerText(), /out of 14 available questions/);
  assert.equal(await page.locator('[data-review-mistakes]').isDisabled(), true);
  await page.screenshot({ path: new URL('results-complete-1440.png', dir).pathname, fullPage: true });
  // Mixed results: one correct, one incorrect, and twelve deliberately skipped.
  await page.locator('[data-retry-practice]').click();
  assert.equal(await page.locator('[data-progress]').innerText(), '0 of 14 available questions answered · 0 correct');
  const first = lesson.exercises[0], second = lesson.exercises[1];
  await page.locator(`#${first.correctOptionId}`).check();
  await page.locator(`#${first.id} button[type="submit"]`).click();
  await page.locator('[data-next]').click();
  const wrong = second.options.find(option => option.id !== second.correctOptionId);
  await page.locator(`#${wrong.id}`).check();
  await page.locator(`#${second.id} button[type="submit"]`).click();
  await stage('results');
  assert.equal(await page.locator('[data-result-correct]').innerText(), '1');
  assert.equal(await page.locator('[data-result-attempted]').innerText(), '2');
  assert.equal(await page.locator('[data-result-incorrect]').innerText(), '1');
  assert.equal(await page.locator('[data-result-unanswered]').innerText(), '12');
  assert.equal(await page.locator('[data-result-percentage]').innerText(), '7%');
  await page.screenshot({ path: new URL('results-mixed-1440.png', dir).pathname, fullPage: true });
  await page.locator('[data-review-mistakes]').click();
  assert.equal(await page.locator(`#${second.id}`).isVisible(), true);
  assert.equal(await page.locator(`#${second.id} input:enabled`).count(), 0);
  await page.locator(`#${second.id} [data-retry]`).click();
  await page.locator(`#${second.correctOptionId}`).check();
  await page.locator(`#${second.id} button[type="submit"]`).click();
  await page.locator('[data-next]').click();
  assert.equal(await page.locator('[data-result-correct]').innerText(), '2');
  await page.locator('[data-answer-unanswered]').click();
  assert.equal(await page.locator('#aleph-exercise-3').isVisible(), true);
  await page.locator('[data-next]').click();
  assert.equal(await page.locator('#aleph-exercise-4').isVisible(), true);
  await page.locator('[data-previous]').click();
  const third = lesson.exercises[2];
  await page.locator(`#${third.options.find(option => option.id !== third.correctOptionId).id}`).check();
  await page.locator(`#${third.id} button[type="submit"]`).click();
  await stage('results');
  assert.equal(await page.locator('[data-result-attempted]').innerText(), '3');
  assert.equal(await page.locator('[data-result-incorrect]').innerText(), '1');
  result.stages.push('Results: exact counts, overall percentage, scoring out of 14 and skipped questions, mistake review, unanswered review and reset pass.');

  for (const width of [320, 375, 390, 1440]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const name of ['theory', 'examples', 'practice', 'results']) {
      await stage(name);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${name} at ${width}`);
      if (name === 'results') assert.equal(await page.locator('.result-stats').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length), width === 1440 ? 4 : 2);
      await page.screenshot({ path: new URL(`${name}-${width}.png`, dir).pathname, fullPage: true });
    }
    result.widths.push({ width, stages: 'all four', overflow: false });
  }
  // Keyboard only: native radio operation, feedback focus and explicit retry.
  await stage('results'); await page.locator('[data-retry-practice]').click();
  for (const index of [0, 1, 2]) {
    const question = lesson.exercises[index];
    const form = page.locator(`#${question.id}`);
    await form.locator('legend').evaluate(node => { node.tabIndex = -1; node.focus(); });
    await page.keyboard.press('Tab');
    assert.equal(await form.locator('input').first().evaluate(node => node === document.activeElement), true);
    await page.keyboard.press('Space');
    for (let n = 0; n < question.options.findIndex(option => option.id === question.correctOptionId); n++) await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Tab');
    assert.equal(await form.locator('button[type="submit"]').evaluate(node => node === document.activeElement), true);
    assert.equal(await form.locator('button[type="submit"]').evaluate(node => getComputedStyle(node).outlineStyle), 'solid');
    await page.keyboard.press('Enter');
    assert.equal(await form.locator('[role="status"]').evaluate(node => node === document.activeElement), true);
    await page.locator('[data-next]').focus(); await page.keyboard.press('Enter');
  }
  result.accessibility.push('All three layouts: Tab/Space/arrows/Enter, visible focus, locked answers, feedback focus and question navigation pass.');
  for (const selector of ['[data-stage-announcement]', '[data-progress]', '[data-results-summary]']) assert.equal(await page.locator(selector).getAttribute('aria-live'), 'polite');
  assert.equal(await page.locator('bdi:not([lang="he"]), bdi:not([dir="rtl"])').count(), 0);
  for (const width of [320, 375, 390, 1440]) {
  await page.setViewportSize({ width, height: 844 });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  for (const name of ['theory', 'examples', 'practice', 'results']) {
    await stage(name);
    const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(n => { const r = n.getBoundingClientRect(); return r.width && r.right > innerWidth + 1; }).map(n => n.className).slice(0, 10));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `200% overflow at ${name}: ${JSON.stringify(overflow)}`);
    await page.screenshot({ path: new URL(`${name}-${width}-text-200-percent.png`, dir).pathname, fullPage: true });
  }
  }
  result.accessibility.push('All stages at 320/375/390/1440 px and 200% text size: no horizontal overflow.');
  await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
  // Browser zoom changes the layout viewport: emulate half-width CSS viewports
  // at DPR 2 rather than confusing pinch zoom with layout reflow.
  const zoomContext = await browser.newContext({ viewport: { width: 195, height: 422 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const zoomPage = await zoomContext.newPage();
  await zoomPage.goto(url, { waitUntil: 'networkidle' });
  await zoomPage.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
  for (const deviceWidth of [320, 375, 390, 1440]) {
    await zoomPage.setViewportSize({ width: Math.floor(deviceWidth / 2), height: 422 });
    for (const name of ['theory', 'examples', 'practice', 'results']) {
      await zoomPage.locator(`.stage-navigation [data-stage-target="${name}"]`).click();
      const overflow = await zoomPage.evaluate(() => [...document.querySelectorAll('body *')].filter(n => { const r = n.getBoundingClientRect(); return r.width && r.right > innerWidth + 1; }).map(n => ({ class: n.className, right: n.getBoundingClientRect().right })).slice(0, 10));
      assert.ok(await zoomPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Zoom reflow: ${name} at ${deviceWidth}/2 CSS px: ${JSON.stringify(overflow)}`);
    }
  }
  await zoomPage.setViewportSize({ width: 195, height: 422 });
  await zoomPage.locator('.stage-navigation [data-stage-target="examples"]').click();
  await zoomPage.screenshot({ path: new URL('examples-390-zoom-equivalent-200-percent.png', dir).pathname, fullPage: true });
  await zoomContext.close();
  result.accessibility.push('200% zoom-equivalent layout reflow: all four stages at half-width CSS viewports for 320/375/390/1440 px, DPR 2.');
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJs.newPage();
  await fallback.goto(url);
  assert.equal(await fallback.locator('[data-study-type]:visible').count(), 11);
  assert.equal(await fallback.locator('[data-exercise-id]:visible').count(), 14);
  assert.equal(await fallback.locator('.mark-glyph:visible').count(), 3);
  await fallback.locator('[data-fallback-answer]').first().locator('summary').click();
  assert.match(await fallback.locator('[data-fallback-answer]').first().innerText(), /Source answer: True/);
  const html = await fallback.content();
  for (const passage of ['sofa', 'long [a:]', 'completely silent', 'depends entirely', 'placed to the left']) assert.equal(html.includes(passage), false, `Disputed copy exposed: ${passage}`);
  result.accessibility.push('No JS: all teaching blocks/examples, all 14 available questions remain readable; disputed wording absent.');
  await noJs.close();
  for (const path of ['/.local/lesson-snapshots/lesson-1.raw.json', `/@fs${new URL('../.local/lesson-snapshots/lesson-1.raw.json', import.meta.url).pathname}`]) {
    const response = await context.request.get(`${base}${path}`);
    assert.ok([403, 404].includes(response.status()));
  }
  assert.equal(result.requests.some(u => /api\.hebrewedu|backblaze|lesson-1\.raw/.test(u)), false);
  assert.deepEqual(result.errors, []);
  await context.close();
} finally { await browser.close(); }
if (process.env.LESSON_POC_WEBKIT === '1') {
  const safari = await webkit.launch({ headless: true });
  try {
    const page = await safari.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('#stage-theory [data-stage-target="examples"]').click();
    await page.locator('#stage-examples [data-stage-target="practice"]').click();
    await page.locator(`#${lesson.exercises[0].correctOptionId}`).check();
    await page.locator('#aleph-exercise-1 button[type="submit"]').click();
    assert.match(await page.locator('#aleph-exercise-1 [role="status"]').innerText(), /Correct/);
    await page.locator('.stage-navigation [data-stage-target="results"]').click();
    assert.equal(await page.locator('[data-result-correct]').innerText(), '1');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= 390));
    await page.screenshot({ path: new URL('results-webkit-390.png', dir).pathname, fullPage: true });
    result.accessibility.push('Mobile WebKit: stage navigation, grading and results pass at 390 px.');
  } finally { await safari.close(); }
}
await writeFile(new URL('validation.json', dir), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ stages: result.stages, questionSlots: result.questions.length, availableGraded: result.questions.filter(q => q.correct === 'pass').length, widths: result.widths, accessibility: result.accessibility, errors: result.errors }, null, 2));
