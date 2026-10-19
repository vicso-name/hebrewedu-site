// Guardrail checks for docs/LAYOUT.md's layout-consistency rules.
// Run: npm run check:layout
//
// Policy: every finding is either fixed in code, or added to an ALLOWLIST
// below with a one-line reason. Never silence a rule by deleting the check.

import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative, join, extname } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const srcDir = resolve(root, 'src');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const allFiles = await walk(srcDir);
const relPath = (p) => relative(root, p).split('\\').join('/');
const cssLike = (p) => extname(p) === '.css' || extname(p) === '.astro';

const findings = [];
function report(rule, file, line, detail) {
  findings.push({ rule, file: relPath(file), line, detail });
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 1: every page in src/pages uses Layout.astro, directly or through a
// documented wrapper component that itself renders Layout.
// ───────────────────────────────────────────────────────────────────────────

const PAGE_ALLOWLIST = new Map([
  ['src/pages/sitemap.xml.ts', 'non-HTML route (XML sitemap), no page shell applies'],
  ['src/pages/play/alef-bet-rush/game/index.astro', 'fullscreen game canvas — intentionally bypasses the marketing Nav/Footer shell for an immersive player'],
  ['src/pages/play/hebrew-mahjong/game/index.astro', 'fullscreen game canvas — intentionally bypasses the marketing Nav/Footer shell for an immersive player'],
  ['src/pages/play/hebrew-word-search/game/index.astro', 'fullscreen game canvas — intentionally bypasses the marketing Nav/Footer shell for an immersive player'],
]);

// Components that render Layout.astro internally; a page importing one of
// these counts as using Layout.
const LAYOUT_WRAPPERS = [
  'components/legal/LegalPage.astro',
  // Stage B: the shared home-page template (src/pages/index.astro and
  // src/pages/fr/index.astro both render through it) — renders Layout.astro
  // internally, same pattern as LegalPage.astro above.
  'components/home/HomePage.astro',
  // Stage B: the shared alphabet-hub template (src/pages/learn/hebrew-alphabet/[...hub].astro
  // and src/pages/fr/alphabet-hebreu/index.astro both render through it).
  'components/hub/AlphabetHubPage.astro',
];

const pagesDir = resolve(srcDir, 'pages');
const pageFiles = allFiles.filter((p) => p.startsWith(pagesDir) && extname(p) === '.astro');

for (const file of pageFiles) {
  const rel = relPath(file);
  if (PAGE_ALLOWLIST.has(rel)) continue;
  const text = await readFile(file, 'utf8');
  const usesLayoutDirectly = /from\s+['"][^'"]*Layout\.astro['"]/.test(text);
  const usesWrapper = LAYOUT_WRAPPERS.some((w) => text.includes(w));
  if (!usesLayoutDirectly && !usesWrapper) {
    report('layout-astro', file, 1, 'page does not import Layout.astro (directly or via a documented wrapper) — add it to the ALLOWLIST with a reason only if it truly needs its own shell');
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Shared setup for CSS-ish rules below: every .css file plus <style> blocks
// inside .astro files, outside global.css.
// ───────────────────────────────────────────────────────────────────────────

const GLOBAL_CSS = resolve(srcDir, 'styles/global.css');
const cssSources = [];
for (const file of allFiles.filter(cssLike)) {
  if (file === GLOBAL_CSS) continue;
  const text = await readFile(file, 'utf8');
  if (extname(file) === '.css') {
    cssSources.push({ file, text, lineOffset: 0 });
  } else {
    // pull out <style>...</style> blocks, tracking line offset for accurate reporting
    const re = /<style[^>]*>([\s\S]*?)<\/style>/g;
    let m;
    while ((m = re.exec(text))) {
      const before = text.slice(0, m.index + m[0].indexOf(m[1]));
      const lineOffset = before.split('\n').length - 1;
      cssSources.push({ file, text: m[1], lineOffset });
    }
  }
}

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

// Blank out comment bodies (keep newlines, so line numbers stay correct) so
// that a rule name or class mentioned in prose never looks like a selector.
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}
for (const source of cssSources) source.text = stripComments(source.text);

// ───────────────────────────────────────────────────────────────────────────
// Rule 2: .container redefined outside global.css.
// ───────────────────────────────────────────────────────────────────────────

const CONTAINER_ALLOWLIST = new Set([
  'src/styles/alphabet-course.css:79',
]);
// src/styles/alphabet-course.css:87 — `.course-hub .nav-inner.container` at a single
// mobile breakpoint only tightens gap/padding-inline so the enlarged course-hub
// wordmark + burger menu both fit; it does not touch background, border or height,
// so the header still reads as the same shape as every other page's.

for (const { file, text, lineOffset } of cssSources) {
  const re = /([^{}]*\.container\b[^{}]*)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(text))) {
    const selector = m[1].trim();
    if (!selector) continue; // whitespace only — no real selector on this match
    const line = lineOffset + lineAt(text, m.index + m[1].length);
    const key = `${relPath(file)}:${line}`;
    if (CONTAINER_ALLOWLIST.has(key)) continue;
    report('container-redefined', file, line, `selector "${selector}" redeclares .container outside global.css`);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 3: literal max-width in px/rem, in the page-container size range,
// outside global.css's token definitions. var(--w-*) and component-internal
// sizes (cards, panels, icons) below the threshold are allowed; anything at
// or above page-container scale must use a --w-* token or be allowlisted.
// ───────────────────────────────────────────────────────────────────────────

const MAX_WIDTH_PX_THRESHOLD = 900; // 56rem
const MAX_WIDTH_ALLOWLIST = new Set([
  'src/components/home/ReadingShowcase.astro:68',
]);
// src/components/home/ReadingShowcase.astro:68 (line shifted by the Stage B
// locale-prop addition above it; same exception as before) — `.reading-stage`
// is an inner presentation panel sized on its own terms inside the page's
// standard .container; it is not a second page-width container.

for (const { file, text, lineOffset } of cssSources) {
  const re = /max-width\s*:\s*([0-9.]+)(px|rem)\s*;/g;
  let m;
  while ((m = re.exec(text))) {
    const value = parseFloat(m[1]);
    const px = m[2] === 'rem' ? value * 16 : value;
    if (px < MAX_WIDTH_PX_THRESHOLD) continue;
    const line = lineOffset + lineAt(text, m.index);
    const key = `${relPath(file)}:${line}`;
    if (MAX_WIDTH_ALLOWLIST.has(key)) continue;
    report('max-width-literal', file, line, `max-width: ${m[1]}${m[2]} is page-container scale (>= ${MAX_WIDTH_PX_THRESHOLD}px) — use var(--w-content|--w-medium|--w-narrow) or allowlist with a reason`);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 4: "section" padding resets (padding: 0 / padding-block: 0) on
// selectors that include the literal word "section".
// ───────────────────────────────────────────────────────────────────────────

const SECTION_PADDING_ALLOWLIST = new Set([
  'src/styles/legal.css:88',
]);
// src/styles/legal.css:92 — `.legal-content section` resets the global bare
// `section { padding-block }` default because these are prose subsections
// inside one Section.astro-rendered block, not page-rhythm sections of their
// own; the surrounding `.legal-content section + section` margin supplies
// the actual spacing instead.

for (const { file, text, lineOffset } of cssSources) {
  const lines = text.split('\n');
  lines.forEach((lineText, i) => {
    if (!/\bsection\b/.test(lineText.split('{')[0] ?? '')) return;
    if (!/padding(-block)?\s*:\s*0\b/.test(lineText)) return;
    const line = lineOffset + i + 1;
    const key = `${relPath(file)}:${line}`;
    if (SECTION_PADDING_ALLOWLIST.has(key)) return;
    report('section-padding-reset', file, line, 'resets padding on a "section" selector — confirm this section-shaped block renders through Section.astro and doesn\'t need the shared rhythm, or allowlist with a reason');
  });
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 5: !important anywhere in src/.
// ───────────────────────────────────────────────────────────────────────────

const IMPORTANT_ALLOWLIST = new Set([
  'src/styles/home.css:112',
  'src/styles/home.css:113',
  'src/styles/home.css:114',
  'src/styles/lesson-poc.css:5',
  'src/styles/lesson-poc.css:162',
  'src/styles/blog.css:722',
]);
// [hidden] display overrides (home.css, lesson-poc.css) and the
// prefers-reduced-motion blocks (home.css, lesson-poc.css, blog.css) are
// functional overrides, not layout/spacing escapes — see LAYOUT.md.

for (const file of allFiles.filter(cssLike)) {
  const text = await readFile(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((lineText, i) => {
    if (!lineText.includes('!important')) return;
    const line = i + 1;
    const key = `${relPath(file)}:${line}`;
    if (IMPORTANT_ALLOWLIST.has(key)) return;
    report('important', file, line, '!important found — remove it, or allowlist with a reason (e.g. [hidden] or prefers-reduced-motion)');
  });
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 6: overrides of body/html background, or Nav/Footer's own selectors,
// outside their own components and global.css.
// ───────────────────────────────────────────────────────────────────────────

const NAV_FOOTER_SELECTORS = ['nav-inner', 'nav-links', 'nav-link', 'nav-logo', 'nav-cta', 'nav-burger', 'nav-mobile', 'footer-inner', 'footer-links', 'footer-logo'];
const NAV_FOOTER_ALLOWLIST = new Set([
  'src/styles/alphabet-course.css:10',
  'src/styles/alphabet-course.css:11',
  'src/styles/alphabet-course.css:79',
]);
// The course hub adds an extra nav entry, so `.nav-inner`/`.nav-links` are
// allowed to grow (height: auto / flex-wrap) instead of clipping at the
// fixed 68px row; it does not touch background, border, or the link/logo/cta
// styling itself. Tracked as debt to fold into Nav.astro's own responsive
// rules instead of a per-page override.

const NAV_OWN = resolve(srcDir, 'components/Nav.astro');
const FOOTER_OWN = resolve(srcDir, 'components/Footer.astro');

for (const { file, text, lineOffset } of cssSources) {
  if (file === NAV_OWN || file === FOOTER_OWN) continue;
  const selRe = new RegExp(`([^{}]*\\.(?:${NAV_FOOTER_SELECTORS.join('|')})\\b[^{}]*)(\\{[^{}]*\\})`, 'g');
  let m;
  while ((m = selRe.exec(text))) {
    const selector = m[1].trim();
    if (!selector) continue;
    const line = lineOffset + lineAt(text, m.index + m[1].length);
    const key = `${relPath(file)}:${line}`;
    if (NAV_FOOTER_ALLOWLIST.has(key)) continue;
    report('nav-footer-override', file, line, `redeclares a Nav/Footer selector outside Nav.astro/Footer.astro: "${selector} ${m[2].trim()}"`);
  }

  const htmlBodyRe = /\b(html|body)\s*\{([^{}]*)\}/g;
  while ((m = htmlBodyRe.exec(text))) {
    if (!/background/.test(m[2])) continue;
    const line = lineOffset + lineAt(text, m.index);
    report('body-background-override', file, line, `"${m[1]}" selector sets background outside global.css`);
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Rule 7: font tokens (--font-*) and @font-face may only be defined in
// global.css (or the shared font file it imports).
// ───────────────────────────────────────────────────────────────────────────

for (const { file, text, lineOffset } of cssSources) {
  const re = /(@font-face\s*\{|--font-[a-z-]+\s*:)/g;
  let m;
  while ((m = re.exec(text))) {
    const line = lineOffset + lineAt(text, m.index);
    report('font-definition-outside-global', file, line, `"${m[1].trim()}" defines a font token/face outside global.css — fonts must be defined once in global.css and referenced via var(--font-*)`);
  }
}

// ───────────────────────────────────────────────────────────────────────────

if (findings.length) {
  console.error(`check:layout — ${findings.length} violation(s):\n`);
  for (const f of findings) {
    console.error(`${f.file}:${f.line}  [${f.rule}]  ${f.detail}`);
  }
  console.error('\nFix the code, or add a one-line-reason entry to the ALLOWLIST in scripts/check-layout.mjs.');
  process.exit(1);
} else {
  console.log(`check:layout — ok (${pageFiles.length} pages, ${cssSources.length} style blocks checked)`);
}
