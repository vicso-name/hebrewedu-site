// Guardrail checks for docs/I18N.md's bilingual (en/fr) rules, run against the
// built site in dist/.
// Run: npm run check:i18n  (also runs in `postbuild`, so `npm run build` fails
// on a violation, and as its own CI step).
//
// Why postbuild and not prebuild like check:layout: every rule here reads the
// rendered HTML — <html lang>, canonical, hreflang reciprocity, JSON-LD,
// sitemap coverage. None of that exists before `astro build` runs.
//
// Policy, same as scripts/check-layout.mjs: every finding is either fixed in
// code, or added to an ALLOWLIST below with a one-line reason. Never silence a
// rule by deleting the check.

import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const distDir = resolve(root, 'dist');
const SITE = 'https://hebrewedu.com';
const NBSP = '\u00A0';

try {
  await stat(distDir);
} catch {
  console.error('check:i18n — dist/ not found. Run `npm run build` first (this check reads the built output).');
  process.exit(1);
}

// ───────────────────────────────────────────────────────────────────────────
// Page inventory
// ───────────────────────────────────────────────────────────────────────────

// Not site pages: synced game bundles have their own shell, and the search-console
// verification file is a bare token.
const SKIP_PREFIXES = ['/game-builds/', '/google'];
// Fullscreen game canvases intentionally bypass the marketing shell (same reason
// they're allowlisted in scripts/check-layout.mjs), so they carry no SEO head.
const SKIP_EXACT = new Set(['/play/alef-bet-rush/game/', '/play/hebrew-mahjong/game/', '/play/hebrew-word-search/game/']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const urlFor = (file) =>
  '/' + relative(distDir, file).split('\\').join('/').replace(/index\.html$/, '').replace(/\.html$/, '');

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};

/** Collapses HTML entities we emit in head/text to their characters. */
const decode = (s) => (s ?? '')
  .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, NBSP);

/** Visible text with tags removed and NO substituted whitespace, so an inline
 *  <bdi>/<em> boundary can't fabricate a space before punctuation. */
const visibleText = (html) => decode(
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<head[\s\S]*?<\/head>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, '')
);

const pages = [];
for (const file of (await walk(distDir)).sort()) {
  const url = urlFor(file);
  if (SKIP_PREFIXES.some((p) => url.startsWith(p)) || SKIP_EXACT.has(url)) continue;
  const html = await readFile(file, 'utf8');
  pages.push({
    url,
    file,
    html,
    locale: url.startsWith('/fr/') || url === '/fr' ? 'fr' : 'en',
    lang: pick(html, /<html[^>]*\slang="([^"]*)"/),
    canonical: pick(html, /rel="canonical"\s+href="([^"]*)"/),
    ogLocale: pick(html, /property="og:locale"\s+content="([^"]*)"/),
    title: decode(pick(html, /<title>([\s\S]*?)<\/title>/)),
    ogTitle: decode(pick(html, /property="og:title"\s+content="([^"]*)"/)),
    description: decode(pick(html, /name="description"\s+content="([^"]*)"/)),
    robots: pick(html, /name="robots"\s+content="([^"]*)"/) ?? 'index, follow',
    alternates: [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map((m) => ({ hreflang: m[1], href: m[2] })),
    h1s: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '').trim())),
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]),
  });
}

const byUrl = new Map(pages.map((p) => [p.url, p]));
const indexable = pages.filter((p) => !/noindex/.test(p.robots));

const findings = [];
function report(rule, page, detail) {
  findings.push({ rule, url: typeof page === 'string' ? page : page.url, detail });
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 1: <html lang> and og:locale match the locale the URL implies.
// ───────────────────────────────────────────────────────────────────────────

const OG_LOCALE = { en: 'en_US', fr: 'fr_FR' };

for (const page of pages) {
  if (page.lang !== page.locale) {
    report('html-lang', page, `<html lang="${page.lang}"> but the URL is ${page.locale} — Layout.astro's locale prop is wrong or missing on this route`);
  }
  if (page.ogLocale !== OG_LOCALE[page.locale]) {
    report('og-locale', page, `og:locale is "${page.ogLocale}", expected "${OG_LOCALE[page.locale]}"`);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 2: canonical is absolute, points at this page, and ends in a slash.
// ───────────────────────────────────────────────────────────────────────────

for (const page of pages) {
  const expected = `${SITE}${page.url}`;
  if (!page.canonical) report('canonical-missing', page, 'no <link rel="canonical">');
  else if (page.canonical !== expected) report('canonical-self', page, `canonical is "${page.canonical}", expected "${expected}" (absolute, self, trailing slash)`);
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 3: hreflang — a page that declares alternates must declare en, fr and
// x-default, as absolute URLs that exist in dist, and its counterpart must
// point back (reciprocity). Pages with no counterpart declare none.
// ───────────────────────────────────────────────────────────────────────────

for (const page of pages) {
  if (!page.alternates.length) {
    // Only FR pages and their EN counterparts are required to be bilingual.
    if (page.locale === 'fr') report('hreflang-missing', page, 'FR page declares no hreflang alternates');
    continue;
  }
  const map = new Map(page.alternates.map((a) => [a.hreflang, a.href]));
  for (const required of ['en', 'fr', 'x-default']) {
    if (!map.has(required)) report('hreflang-incomplete', page, `missing hreflang="${required}" (en, fr and x-default are all required)`);
  }
  for (const { hreflang, href } of page.alternates) {
    if (!href.startsWith(`${SITE}/`)) {
      report('hreflang-relative', page, `hreflang="${hreflang}" href "${href}" is not an absolute ${SITE} URL`);
      continue;
    }
    const target = href.slice(SITE.length);
    if (!byUrl.has(target)) report('hreflang-target-missing', page, `hreflang="${hreflang}" points at "${target}", which is not a built page`);
  }
  if (map.get('x-default') !== map.get('en')) {
    report('hreflang-x-default', page, `x-default ("${map.get('x-default')}") must match the en alternate ("${map.get('en')}")`);
  }
  // Reciprocity: whichever alternate is not this page must list this page back.
  const self = `${SITE}${page.url}`;
  for (const { hreflang, href } of page.alternates) {
    if (hreflang === 'x-default' || href === self) continue;
    const other = byUrl.get(href.slice(SITE.length));
    if (!other) continue; // already reported as a missing target
    if (!other.alternates.some((a) => a.href === self)) {
      report('hreflang-not-reciprocal', page, `declares hreflang="${hreflang}" → "${href}", but that page does not point back at "${self}"`);
    }
  }
}

for (const page of pages) {
  if (page.alternates.length || page.locale !== 'en') continue;
  // An EN page with a FR counterpart must say so; one without is listed above.
  const frTwin = pages.find((p) => p.locale === 'fr' && p.alternates.some((a) => a.href === `${SITE}${page.url}`));
  if (frTwin) {
    report('hreflang-missing', page, `${frTwin.url} points here as its en alternate, but this page declares no alternates`);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 4: title/description length, uniqueness, and no brand suffix in <title>
// (CLAUDE.md: the site name is carried by og:site_name / the WebSite schema).
// ───────────────────────────────────────────────────────────────────────────

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const BRAND_SUFFIX = /\s[|–—-]\s*HebrewEdu(\s+Blog)?\s*$/;

// Pre-existing EN pages outside this audit's scope (FR pages and their EN
// counterparts) whose titles still carry the brand suffix. Retargeting a
// ranking page's <title> is an SEO decision, not a lint fix — tracked for the
// owner, see docs/I18N.md.
//
// The blog-wide "… | HebrewEdu Blog" convention is gone (the FR-blog
// infrastructure step dropped it from the shared template, from the
// hand-written seoTitles and from the listing), so only the one post the owner
// held back is still listed here.
const BRAND_SUFFIX_ALLOWLIST = new Map([
  ['/blog/hebrew-alphabet-complete-guide/', 'owner decision: this post keeps the brand suffix until end of October 2026'],
  ['/play/', 'games hub — pre-existing, pending an owner SEO decision'],
  ['/play/alef-bet-rush/', 'game page — pre-existing, pending an owner SEO decision'],
]);

// Per-URL, not per-prefix: dropping the brand suffix brought every blog title
// but one under 60, and gave every post exactly one <h1>, so the blog now
// passes the h1 rule outright and needs no length exemption beyond these rows.
// A FR post gets no exemption at all — FR titles are written to the limit.
const TITLE_LENGTH_ALLOWLIST = new Map([
  ['/blog/hebrew-alphabet-complete-guide/', 'owner-held brand suffix (above) is what pushes it to 72; the title itself is 55'],
]);
// Meta descriptions a few characters over, from before this guardrail existed.
// Trimming a ranking post's description is an SEO edit, not a lint fix.
const DESCRIPTION_LENGTH_ALLOWLIST = new Map([
  ['/blog/how-to-read-hebrew-nikud/', 'pre-existing 159-char description, pending an owner SEO decision'],
  ['/blog/learn-hebrew-alphabet-7-days/', 'pre-existing 158-char description, pending an owner SEO decision'],
  ['/blog/meet-the-new-verb-directory/', 'pre-existing 159-char description, pending an owner SEO decision'],
  ['/blog/what-makes-a-language-learning-game-educational/', 'pre-existing 159-char description, pending an owner SEO decision'],
  ['/blog/why-hebrew-sounds-so-fast/', 'pre-existing 157-char description, pending an owner SEO decision'],
]);

const titleOwners = new Map();
for (const page of indexable) {
  if (!page.title) { report('title-missing', page, 'no <title>'); continue; }
  if (page.title.length > TITLE_MAX && !TITLE_LENGTH_ALLOWLIST.has(page.url)) report('title-length', page, `<title> is ${page.title.length} chars (max ${TITLE_MAX}): "${page.title}"`);
  if (BRAND_SUFFIX.test(page.title) && !BRAND_SUFFIX_ALLOWLIST.has(page.url)) {
    report('title-brand-suffix', page, `<title> ends in the brand suffix: "${page.title}" — the site name belongs to og:site_name / the WebSite schema`);
  }
  // og:title too: og:site_name already carries the brand, so repeating it there
  // just duplicates the name in every share card.
  if (page.ogTitle && BRAND_SUFFIX.test(page.ogTitle) && !BRAND_SUFFIX_ALLOWLIST.has(page.url)) {
    report('og-title-brand-suffix', page, `og:title ends in the brand suffix: "${page.ogTitle}" — og:site_name already carries it`);
  }
  if (titleOwners.has(page.title)) report('title-duplicate', page, `shares its <title> with ${titleOwners.get(page.title)}: "${page.title}"`);
  else titleOwners.set(page.title, page.url);

  if (!page.description) report('description-missing', page, 'no meta description');
  else if (page.description.length > DESCRIPTION_MAX && !DESCRIPTION_LENGTH_ALLOWLIST.has(page.url)) report('description-length', page, `meta description is ${page.description.length} chars (max ${DESCRIPTION_MAX})`);

  if (page.h1s.length !== 1) report('h1-count', page, `${page.h1s.length} <h1> elements, expected exactly 1`);
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 5: JSON-LD speaks the page's language and links to the page's locale.
// ───────────────────────────────────────────────────────────────────────────

for (const page of pages) {
  for (const raw of page.jsonLd) {
    let data;
    try { data = JSON.parse(raw); } catch { report('jsonld-invalid', page, 'JSON-LD block is not valid JSON'); continue; }
    const walkNode = (node) => {
      if (Array.isArray(node)) { node.forEach(walkNode); return; }
      if (!node || typeof node !== 'object') return;
      for (const [key, value] of Object.entries(node)) {
        if (key === 'inLanguage') {
          const langs = (Array.isArray(value) ? value : [value]).filter((l) => l !== 'he'); // embedded Hebrew is legitimate
          for (const lang of langs) {
            if (lang !== page.locale) report('jsonld-inlanguage', page, `JSON-LD inLanguage is "${lang}" on a ${page.locale} page`);
          }
        }
        // A shared, non-localized static asset (e.g. the one favicon every page
        // links as its Organization logo) isn't page content — same exemption
        // Rule 6 above gives these extensions for ordinary links.
        if (typeof value === 'string' && value.startsWith(`${SITE}/`) && !/\.(css|js|png|jpg|jpeg|webp|svg|ico)$/.test(value)) {
          const path = value.slice(SITE.length).replace(/#.*$/, '');
          const targetLocale = path.startsWith('/fr/') ? 'fr' : 'en';
          if (targetLocale !== page.locale) {
            report('jsonld-cross-locale-url', page, `JSON-LD "${key}" points at the ${targetLocale} URL "${path}" from a ${page.locale} page`);
          }
        }
        walkNode(value);
      }
    };
    walkNode(data);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 6: an FR page's links into English routes are marked "(en anglais)".
// The language switcher is exempt — switching language is its whole purpose.
// ───────────────────────────────────────────────────────────────────────────

// Either marker counts: "(en anglais)" tags a link whose destination happens to
// be English, while "version anglaise" is how the FR legal pages name the
// governing English text — both tell a French reader what they are clicking.
const EN_ONLY_MARKERS = ['(en anglais)', 'version anglaise'];

for (const page of pages.filter((p) => p.locale === 'fr')) {
  for (const m of page.html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const attrs = m[1];
    const href = (attrs.match(/href="([^"]*)"/) || [])[1];
    if (!href || !href.startsWith('/') || href.startsWith('/fr/')) continue;
    if (/\.(css|js|png|jpg|jpeg|webp|svg|xml|txt|ico|pdf)$/.test(href)) continue;
    if (/class="[^"]*lang-switch/.test(attrs)) continue; // the EN/FR switcher
    const label = decode(m[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    // The marker may sit inside the link's own label, or in the sentence right
    // after it (legal pages read "… la <a>Politique</a> (en anglais)").
    const trailing = decode(page.html.slice(m.index + m[0].length, m.index + m[0].length + 40));
    if (!EN_ONLY_MARKERS.some((marker) => label.includes(marker) || trailing.includes(marker))) {
      report('fr-unmarked-en-link', page, `links to the English route "${href}" with none of ${EN_ONLY_MARKERS.map((m2) => `"${m2}"`).join(' / ')}: "${label}"`);
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 7: store links carry the right locale.
// ───────────────────────────────────────────────────────────────────────────

for (const page of pages) {
  for (const m of page.html.matchAll(/https:\/\/play\.google\.com\/store\/apps\/details\?[^"'\s]*/g)) {
    const url = decode(m[0]);
    const hasFrHl = /[?&]hl=fr(\b|&|$)/.test(url);
    if (page.locale === 'fr' && !hasFrHl) report('store-play-locale', page, `Google Play link is missing hl=fr: ${url}`);
    if (page.locale === 'en' && hasFrHl) report('store-play-locale', page, `EN page links to the FR Google Play listing: ${url}`);
  }
  for (const m of page.html.matchAll(/https:\/\/apps\.apple\.com\/[^"'\s]*/g)) {
    if (/apps\.apple\.com\/[a-z]{2}\//.test(m[0])) {
      report('store-appstore-country', page, `App Store link is country-pinned (Apple localizes by account region): ${m[0]}`);
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 8: sitemap covers every indexable page and nothing noindex.
// ───────────────────────────────────────────────────────────────────────────

const sitemapXml = await readFile(resolve(distDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].slice(SITE.length)));

for (const page of indexable) {
  if (!sitemapUrls.has(page.url)) report('sitemap-missing', page, 'indexable page is not listed in sitemap.xml');
}
for (const page of pages) {
  if (/noindex/.test(page.robots) && sitemapUrls.has(page.url)) report('sitemap-noindex', page, 'page is noindex but listed in sitemap.xml');
}
for (const url of sitemapUrls) {
  if (!byUrl.has(url)) report('sitemap-stale', url, 'sitemap lists a URL that is not a built page');
}

const robotsTxt = await readFile(resolve(distDir, 'robots.txt'), 'utf8');
if (/^\s*Disallow:\s*\/fr/mi.test(robotsTxt)) report('robots-fr-blocked', '/robots.txt', 'robots.txt disallows /fr/');
if (!/^\s*Sitemap:\s*\S+/mi.test(robotsTxt)) report('robots-sitemap', '/robots.txt', 'robots.txt declares no Sitemap');

// ───────────────────────────────────────────────────────────────────────────
// Rule 9: no English UI chrome left on FR pages. This is a regression guard
// for the strings the i18n audit moved into src/i18n/fr.ts — each entry is a
// string that used to be hardcoded English and must stay translated.
// ───────────────────────────────────────────────────────────────────────────

const ENGLISH_UI_STRINGS = [
  'Skip to content', 'Skip to lesson', 'Skip to course',
  'Open menu', 'Close menu', 'Get the app',
  'Put it into practice', 'Choose an answer', 'Check answer', 'Retry this question',
  'Next question', 'See results', 'Source answer', 'True or false', 'Choose one answer',
  'Match each pair', 'Interactive checking needs JavaScript', 'Questions answered',
  'Your practice results', 'Review mistakes', 'Answer unanswered', 'Back to the course',
  'Overall score', 'available questions answered', 'Well done', 'Not quite',
  'Next: Examples', 'Next: Practice', 'Local preview',
];
// aria-label / alt values are chrome too: assistive tech reads them in the
// page's declared language.
const ENGLISH_ARIA_VALUES = ['Primary', 'Footer', 'Breadcrumb', 'Language', 'Analytics consent', 'HebrewEdu home', 'Lesson stages', 'Learner reviews', 'Questions answered'];

// A TRUE_FALSE exercise's option labels: normalize.mjs stores the canonical
// English 'True'/'False', so the rendered radio label must come from the
// dictionary (Practice.astro's optionLabel) and never leak through verbatim.
const BOOLEAN_OPTION_LABEL = /<span[^>]*>\s*(True|False)\s*<\/span>/;

for (const page of pages.filter((p) => p.locale === 'fr')) {
  const text = visibleText(page.html);
  for (const needle of ENGLISH_UI_STRINGS) {
    if (text.includes(needle)) report('fr-english-ui', page, `English UI string rendered on an FR page: "${needle}"`);
  }
  if (BOOLEAN_OPTION_LABEL.test(page.html)) {
    report('fr-english-ui', page, `a TRUE_FALSE option renders the canonical English label ("${page.html.match(BOOLEAN_OPTION_LABEL)[1]}") — it must go through Practice.astro's optionLabel/booleanLabels`);
  }
  for (const m of page.html.matchAll(/(?:aria-label|alt|title)="([^"]*)"/g)) {
    const value = decode(m[1]).trim();
    if (ENGLISH_ARIA_VALUES.includes(value)) report('fr-english-aria', page, `English accessible label on an FR page: "${value}"`);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 10: French high punctuation takes a no-break space (docs/I18N.md,
// docs/hebrew-alphabet-editorial-rules.fr.md).
// ───────────────────────────────────────────────────────────────────────────

// Every FR page passes: hand-authored copy carries the no-break space in source,
// and content this repo cannot edit at rest (FR lesson snapshots, the
// sign-off-pinned FR phrase copy) is corrected at render time by
// src/lib/fr-typography.mjs. Keep this empty — fix the source or the filter.
const TYPOGRAPHY_ALLOWLIST = new Map([]);

/** The same two rules, over one string. Returns human-readable hits. */
function typographyHits(raw) {
  const text = raw.replace(/[ \t]+/g, ' ');
  const hits = new Set();
  for (const m of text.matchAll(/\S ([:;?!»])/g)) hits.add(`a plain space before "${m[1]}" near "${text.slice(Math.max(0, m.index - 40), m.index + 10).trim()}"`);
  for (const m of text.matchAll(/« /g)) hits.add(`a plain space after "«" near "${text.slice(Math.max(0, m.index - 10), m.index + 40).trim()}"`);
  return hits;
}

for (const page of pages.filter((p) => p.locale === 'fr')) {
  if (TYPOGRAPHY_ALLOWLIST.has(page.url)) continue;
  // Body copy. visibleText() strips <head>, so the metadata below is checked
  // separately — a blog post's title and description come from its frontmatter,
  // which never reaches the page body and so would otherwise go unchecked.
  for (const hit of typographyHits(visibleText(page.html))) {
    report('fr-typography', page, `${hit} — French high punctuation takes a no-break space (\\u00A0)`);
  }
  for (const [field, value] of [['<title>', page.title], ['meta description', page.description], ['og:title', page.ogTitle]]) {
    if (!value) continue;
    for (const hit of typographyHits(value)) {
      report('fr-typography-head', page, `${field}: ${hit} — French high punctuation takes a no-break space (\\u00A0)`);
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 11: the SEO semantic core knows about every published FR page, and its
// recorded title/h1/meta match what the page actually renders (CLAUDE.md:
// docs/seo/core/*.csv is the single source of truth).
// ───────────────────────────────────────────────────────────────────────────

/** Minimal RFC-4180 reader — core CSVs quote fields containing commas. */
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false; }
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const header = rows.shift();
  return rows.filter((r) => r.length > 1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

// Legal pages are not keyword targets and are deliberately absent from the core
// in both locales (neither /terms/ nor /privacy/ has a row either).
const SEO_CORE_EXEMPT = new Set(['/fr/conditions/', '/fr/confidentialite/']);

/** Token coverage rather than substring: a French title legitimately inflects a
 *  keyword ("alphabet hébreu" → "lettre hébraïque") and reorders around
 *  punctuation. Every keyword token must appear in the title, allowing the
 *  documented FR synonym pairs below. */
const KEYWORD_SYNONYMS = [['hebreu', 'hebraique']];

// Empty: every FR letter page's primary keyword now uses the spelling the page
// itself uses, decided from French volume + SERP data in
// docs/seo/research/fr/LETTER_SPELLINGS_FR.md. Keep it empty — if a title and
// its keyword disagree, redo that research rather than allowlisting the gap.
const KEYWORD_TITLE_ALLOWLIST = new Map([]);
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, "'");

function titleCoversKeyword(title, keyword) {
  const haystack = fold(title);
  return fold(keyword).split(/[^a-z0-9']+/).filter(Boolean).every((token) => {
    if (haystack.includes(token)) return true;
    for (const group of KEYWORD_SYNONYMS) {
      if (group.includes(token) && group.some((alt) => haystack.includes(alt))) return true;
    }
    return false;
  });
}

const pagesCsv = parseCsv(await readFile(resolve(root, 'docs/seo/core/pages.csv'), 'utf8'));
const coreByUrl = new Map(pagesCsv.map((r) => [r.url.replace(SITE, ''), r]));

for (const page of indexable.filter((p) => p.locale === 'fr')) {
  if (SEO_CORE_EXEMPT.has(page.url)) continue;
  const row = coreByUrl.get(page.url);
  if (!row) { report('seo-core-missing', page, 'published FR page has no row in docs/seo/core/pages.csv'); continue; }
  if (row.locale !== 'fr') report('seo-core-locale', page, `pages.csv row has locale="${row.locale}", expected "fr"`);
  if (!row.primary_keyword.trim()) report('seo-core-keyword', page, 'pages.csv row has no primary_keyword');
  else if (!titleCoversKeyword(page.title, row.primary_keyword) && !KEYWORD_TITLE_ALLOWLIST.has(page.url)) {
    report('seo-core-keyword-not-in-title', page, `<title> does not cover the primary keyword "${row.primary_keyword}": "${page.title}"`);
  }
  if (row.title !== page.title) report('seo-core-title-drift', page, `pages.csv title does not match the rendered <title>\n      csv:  "${row.title}"\n      page: "${page.title}"`);
  if (row.meta_description !== page.description) report('seo-core-meta-drift', page, `pages.csv meta_description does not match the rendered meta description\n      csv:  "${row.meta_description}"\n      page: "${page.description}"`);
  if (page.h1s.length === 1 && row.h1 !== page.h1s[0]) report('seo-core-h1-drift', page, `pages.csv h1 does not match the rendered <h1>\n      csv:  "${row.h1}"\n      page: "${page.h1s[0]}"`);
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 12: an in-page anchor link (href="#...", e.g. a blog post's jump-nav or
// an FAQ answer linking back into its own article) must resolve to a real id
// on that same page. French heading slugs are generated from the rendered
// heading text (astro's own slugger), so an anchor hand-written against a
// guessed slug silently rots the moment the heading wording changes — this
// catches that at build time instead of leaving a dead in-page link live.
// ───────────────────────────────────────────────────────────────────────────

for (const page of pages) {
  const ids = new Set([...page.html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]));
  for (const m of page.html.matchAll(/<a\b[^>]*\shref="#([^"]*)"/g)) {
    const anchor = m[1];
    if (anchor && !ids.has(anchor)) {
      report('anchor-missing', page, `in-page link href="#${anchor}" has no matching id="${anchor}" on the page`);
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────

if (findings.length) {
  console.error(`check:i18n — ${findings.length} violation(s):\n`);
  for (const f of findings) console.error(`${f.url}  [${f.rule}]  ${f.detail}`);
  console.error('\nFix the code, or add a one-line-reason entry to the ALLOWLIST in scripts/check-i18n.mjs.');
  process.exit(1);
} else {
  const fr = pages.filter((p) => p.locale === 'fr').length;
  console.log(`check:i18n — ok (${pages.length} pages checked, ${fr} fr / ${pages.length - fr} en)`);
}
