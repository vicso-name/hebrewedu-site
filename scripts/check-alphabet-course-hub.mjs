import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { resolve, relative, join } from 'node:path';
import assert from 'node:assert/strict';
import { curriculum, courseTitle, courseDescription } from '../src/lib/alphabet-course.mjs';

const root = resolve(new URL('..', import.meta.url).pathname);
const normal = resolve(root, 'dist');
const published = process.env.COURSE_PUBLISHED === '1';
const preview = process.env.COURSE_PREVIEW_DIST ?? (published ? normal : '/private/tmp/hebrewedu-alphabet-course-preview');
const dir = process.env.COURSE_CHECK_ARTIFACT_DIR ?? resolve(root, '.local/course-hub');
const base = process.env.COURSE_PREVIEW_URL ?? 'http://127.0.0.1:4326';
const route = 'learn/hebrew-alphabet/index.html';
const aleph = 'learn/hebrew-alphabet/aleph/index.html';
const hash = value => createHash('sha256').update(value).digest('hex');
const baselinePath = process.env.COURSE_BASELINE ?? resolve(root, '.local/course-hub/production-before.json');
const baseline = await readFile(baselinePath).then(bytes => JSON.parse(bytes)).catch(error => {
  if (error.code === 'ENOENT' && !process.env.COURSE_BASELINE) return {};
  throw error;
});
async function files(folder) {
  const out = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const p = join(folder, entry.name);
    if (entry.isDirectory()) out.push(...await files(p)); else out.push(p);
  }
  return out;
}
const main = html => html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
const seo = html => [...html.matchAll(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g)].map(x => x[0]);
const result = { url: `${base}/learn/hebrew-alphabet/`, regressions: [], widths: [], accessibility: [], links: [], errors: [], lessonApiOrMediaRequests: [] };
for (const [p, old] of Object.entries(baseline)) {
  if (old.html) {
    const current = await readFile(join(normal, p), 'utf8');
    assert.deepEqual(seo(current), seo(old.html), `SEO changed outside course: ${p}`);
    if (main(old.html)) assert.equal(main(current), main(old.html), `Page content changed: ${p}`);
    else assert.equal(hash(current), old.sha256, `Game/runtime HTML changed: ${p}`);
  } else if (!p.startsWith('_astro/') && !(published && p === 'sitemap.xml')) assert.equal(hash(await readFile(join(normal, p))), old.sha256, `Existing public asset changed: ${p}`);
}
result.regressions.push(Object.keys(baseline).length ? 'All original page metadata/canonicals/JSON-LD and main content unchanged; original public game/assets unchanged. Shared navigation/style asset hashes legitimately differ.' : 'No private regression baseline supplied; release metadata, exposure and browser checks still run.');
for (const p of [route, aleph]) assert.equal(await stat(join(normal, p)).then(()=>true).catch(()=>false), published, 'Production routes must match publication state');
const localHtml = await readFile(join(preview, route), 'utf8');
assert.equal((localHtml.match(/<h1\b/g) ?? []).length, 1);
assert.ok(localHtml.includes('https://hebrewedu.com/learn/hebrew-alphabet/'));
for (const folder of [normal, preview]) {
  const sitemap = await readFile(join(folder, 'sitemap.xml'), 'utf8');
  const courseUrls = [...sitemap.matchAll(/<loc>(https:\/\/hebrewedu\.com\/learn\/hebrew-alphabet\/[^<]*)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(courseUrls, published ? ['https://hebrewedu.com/learn/hebrew-alphabet/', 'https://hebrewedu.com/learn/hebrew-alphabet/aleph/'] : []);
  for (const p of await files(folder)) {
    const rel = relative(folder, p);
    assert.equal(/\.raw\.json|course-import\.snapshot|alphabet-course-imports|editorial-findings/.test(rel), false);
    if (/\.(html|js|json|xml|css)$/.test(p)) {
      const text = await readFile(p, 'utf8');
      assert.equal(/"correctAnswer"|"additionalData"|api\.hebrewedu\.com\/api\/lessons\/|firebasestorage\.googleapis\.com|backblazeb2\.com\/file\/alef-bet-media\/lessons\//.test(text), false, `Private/raw content leaked: ${p}`);
      for (const l of curriculum(true).slice(1)) {
        // Unavailable records deliberately have no href; derive identity from validated order.
        const slug = ['bet','gimel','dalet','he','vav','zayin','chet','tet','yod','kaf','lamed','mem','nun','samekh','ayin','pe','tsadi','qof','resh','shin','tav'][l.order-2];
        assert.equal(text.includes(`/learn/hebrew-alphabet/${slug}/`), false, `Unpublished link leaked: ${slug}`);
      }
      if (!published && folder === normal && p.endsWith('.html')) assert.equal(text.includes('/learn/hebrew-alphabet/'), false, 'Draft header link leaked');
    }
  }
}
result.regressions.push(published ? 'Only Hub and Aleph published and indexed; no lessons 2–22 links/routes, raw keys or unapproved media exposed.' : 'Draft Hub and Aleph absent from ordinary build, sitemap and public navigation; no lessons 2–22 links/routes, raw keys or unapproved media exposed.');

if (!process.env.PLAYWRIGHT_MODULE) throw new Error('Set PLAYWRIGHT_MODULE to existing local playwright/index.mjs');
const { chromium, webkit } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE));
await mkdir(join(dir, 'screenshots'), { recursive: true });
async function run(engine, label, widths) {
  const browser = await engine.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', e => result.errors.push(`${label}: ${e.message}`));
    page.on('request', request => { if (/api\.hebrewedu\.com|backblazeb2\.com.*lessons|firebasestorage/.test(request.url())) result.lessonApiOrMediaRequests.push(request.url()); });
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal((await page.goto(result.url, { waitUntil: 'networkidle' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.title(), courseTitle);
      assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), courseDescription);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://hebrewedu.com/learn/hebrew-alphabet/');
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), published ? 'index, follow' : 'noindex, nofollow, noarchive');
      const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
      if (published) {
        assert.equal(schema['@graph'].find(item => item['@type'] === 'Course').hasPart.length, 1);
        assert.equal(schema['@graph'].find(item => item['@type'] === 'ItemList').numberOfItems, 1);
      } else assert.equal(schema['@type'], 'WebPage');
      const cards = page.locator('.course-letter-card');
      assert.equal(await cards.count(), 22);
      assert.equal(await page.locator('.course-letter-card a').count(), 1);
      assert.equal(await page.locator('.course-letter-status', { hasText: 'Coming Soon' }).count(), 21);
      for (let i = 0; i < 22; i++) {
        const l = curriculum(true)[i];
        assert.equal(await cards.nth(i).getAttribute('data-course-order'), String(l.order));
        assert.equal(await cards.nth(i).locator('.course-hebrew').textContent(), l.letter);
        assert.equal(await cards.nth(i).locator('h3').textContent(), l.name);
        if (i) assert.equal(await cards.nth(i).locator('a, button, [tabindex], [role="button"]').count(), 0);
      }
      const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, font: getComputedStyle(document.querySelector('.course-hebrew')).fontFamily, letterSpacing: getComputedStyle(document.querySelector('.course-hebrew')).letterSpacing, loaded: document.fonts.check('400 32px "Lesson Rubik"', 'א'), background: getComputedStyle(document.querySelector('.course-hub')).backgroundColor }));
      assert.ok(layout.scrollWidth <= width, `Overflow ${label} ${width}`);
      assert.ok(layout.font.includes('Lesson Rubik') && layout.loaded);
      assert.equal(layout.letterSpacing, 'normal');
      assert.equal(layout.background, 'rgb(248, 248, 255)');
      await page.screenshot({ path: join(dir, `screenshots/hub-${label}-${width}.png`), fullPage: true });
      await page.screenshot({ path: join(dir, `screenshots/hub-top-${label}-${width}.png`) });
      await page.locator('#curriculum').screenshot({ path: join(dir, `screenshots/curriculum-${label}-${width}.png`) });
      if (width < 769) {
        await page.evaluate(() => window.scrollTo(0,0));
        await page.locator('#nav-burger').focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#nav-burger').getAttribute('aria-expanded'), 'true');
        const link = page.locator('#nav-mobile a', { hasText: 'Alphabet Course' });
        assert.equal(await link.isVisible(), true);
        assert.equal(await link.getAttribute('aria-current'), 'page');
        // WebKit on macOS uses Option+Tab for links when system full keyboard access is off.
        await page.keyboard.press(label === 'webkit' ? 'Alt+Tab' : 'Tab');
        assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '/play/');
        await link.focus();
        assert.notEqual(await link.evaluate(el => getComputedStyle(el).outlineStyle), 'none');
        await page.screenshot({ path: join(dir, `screenshots/header-${label}-${width}.png`) });
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#nav-mobile').isVisible(), false);
        assert.equal(await page.locator('#nav-burger').evaluate(el=>el===document.activeElement), true);
      } else {
        assert.equal(await page.locator('.nav-links a', { hasText: 'Alphabet Course' }).isVisible(), true);
        assert.equal(await page.locator('.nav-links a', { hasText: 'Alphabet Course' }).getAttribute('aria-current'), 'page');
      }
      result.widths.push({ engine: label, ...layout, curriculum: '22 ordered, 1 linked / 21 non-interactive' });
    }
    if (label === 'chromium') {
      await page.setViewportSize({ width: 1024, height: 1000 });
      await page.locator('#nav-burger').click();
      assert.equal(await page.locator('#nav-mobile').isVisible(),true);
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.waitForFunction(() => document.getElementById('nav-burger').getAttribute('aria-expanded') === 'false');
      assert.equal(await page.locator('#nav-mobile').isVisible(),false);
      assert.equal(await page.locator('#nav-burger').getAttribute('aria-expanded'),'false');
      for (const width of [320,375,390,1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(result.url, { waitUntil: 'networkidle' });
        await page.addStyleTag({ content: 'html { font-size: 200%; }' });
        await page.screenshot({ path: join(dir, `screenshots/hub-text-200-percent-${width}.png`), fullPage: true });
        const overflowing = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+.01 || (el.clientWidth>0 && el.scrollWidth>el.clientWidth+1)).map(el=>({ tag:el.tagName, className:el.className, right:el.getBoundingClientRect().right, scrollWidth:el.scrollWidth, clientWidth:el.clientWidth, text:el.textContent.slice(0,80) })));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `200% text enlargement overflow at ${width}: ${JSON.stringify(overflowing)}`);
        result.widths.push({ engine: label, width, textEnlargement: '200%', horizontalOverflow: false });
      }
      await page.goto(result.url, { waitUntil: 'networkidle' });
      result.accessibility.push('Chromium: tablet menu and desktop resize reset pass; all four requested widths at 200% text enlargement have no horizontal overflow.');
    }
    const internal = [...new Set(await page.locator('a[href^="/"]').evaluateAll(links => links.map(a=>a.getAttribute('href'))))];
    for (const href of internal) {
      const response = await context.request.get(`${base}${href.split('#')[0]}`);
      assert.equal(response.status(), 200, href);
      const fragment = href.split('#')[1];
      if (fragment) assert.ok((await response.text()).includes(`id="${fragment}"`), `Missing fragment ${href}`);
      result.links.push({ href, status: response.status() });
    }
    assert.deepEqual(await page.locator('.course-app .store-link').evaluateAll(links=>links.map(a=>a.href)), ['https://apps.apple.com/app/learn-hebrew-read-speak/id6813120842','https://play.google.com/store/apps/details?id=com.vicsothemes.hebrewforbeginners']);
    await page.locator('.course-start a').first().click();
    assert.ok(page.url().endsWith('/learn/hebrew-alphabet/aleph/'));
    assert.equal(await page.locator('[data-study-type]').count(), 11);
    assert.equal(await page.locator('[data-exercise-id]').count(), 14);
    assert.equal(await page.locator('[data-unavailable="true"]').count(), 0);
    await page.locator('[data-stage-target="examples"]').first().click();
    assert.equal(await page.locator('#stage-examples').isVisible(), true);
    for (const glyph of ['אַ','אָ','אֲ']) assert.ok((await page.locator('#stage-examples').textContent()).includes(glyph));
    const pointed = await page.locator('.mark-glyph .hebrew').first().evaluate(el => ({ font: getComputedStyle(el).fontFamily, dir: el.getAttribute('dir'), lang: el.getAttribute('lang') }));
    assert.ok(pointed.font.includes('Lesson Rubik'));
    assert.equal(pointed.dir,'rtl'); assert.equal(pointed.lang,'he');
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.locator('#stage-examples').screenshot({ path: join(dir, `screenshots/aleph-rubik-niqqud-${label}-390.png`) });
    result.accessibility.push(`${label}: keyboard menu opening, tab order, active link, visible focus and Escape restoration pass; Aleph stages/all 14 active questions/Rubik pointed forms pass.`);
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 1000 } });
    const staticPage = await nojs.newPage();
    await staticPage.goto(result.url);
    assert.equal(await staticPage.locator('.course-letter-card').count(),22);
    assert.equal(await staticPage.locator('.course-start a').first().getAttribute('href'),'/learn/hebrew-alphabet/aleph/');
    result.accessibility.push(`${label}: static curriculum, copy and start link available without JavaScript.`);
    await nojs.close(); await context.close();
  } finally { await browser.close(); }
}
await run(chromium, 'chromium', [320,375,390,1440]);
if (process.env.COURSE_WEBKIT === '1') await run(webkit, 'webkit', [390]);
assert.deepEqual(result.errors, []);
assert.deepEqual(result.lessonApiOrMediaRequests, []);
await writeFile(join(dir, 'validation.json'), `${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify(result,null,2));
