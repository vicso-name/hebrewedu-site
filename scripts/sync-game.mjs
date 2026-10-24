import { cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// One sync script for every game, replacing the per-game scripts that used
// to live at scripts/sync-<game>.mjs. See docs/GAME_PUBLISHING_RUNBOOK.md.
const GAME_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// alef-bet-rush is the only game whose sync additionally requires a
// 22-letter audio manifest (see docs/GAME_PUBLISHING_RUNBOOK.md: "Do not
// blindly duplicate game-specific validation").
const REQUIRES_LETTER_AUDIO_MANIFEST = new Set(['alef-bet-rush']);

const inside = (parent, child) => { const p = relative(parent, child); return p === '' || (!p.startsWith(`..${sep}`) && p !== '..' && !isAbsolute(p)); };

async function files(root, dir = root) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed: ${path}`);
    if (entry.isDirectory()) result.push(...await files(root, path));
    else if (entry.isFile()) result.push(path);
    else throw new Error(`Unsupported artifact entry: ${path}`);
  }
  return result;
}

async function validate(root, slug) {
  const all = await files(root);
  const html = await readFile(resolve(root, 'index.html'), 'utf8');
  if (!/<head\b[^>]*>/i.test(html) || !/<\/html>/i.test(html)) throw new Error('Incomplete index.html');
  if (!/<script\b[^>]*\bsrc\s*=/i.test(html)) throw new Error('Missing game runtime script');
  async function check(url, owner) {
    if (/^(?:data:|blob:|#)/i.test(url)) return;
    if (/^(?:[a-z]+:|\/\/|\/)/i.test(url)) throw new Error(`Artifact assets must use relative local paths: ${url}`);
    const path = resolve(dirname(owner), decodeURIComponent(url.split(/[?#]/)[0]));
    if (!inside(root, path)) throw new Error(`Asset escapes artifact: ${url}`);
    if (!(await stat(path)).isFile() || (await stat(path)).size === 0) throw new Error(`Missing/empty asset: ${url}`);
  }
  for (const path of all) {
    if ((await stat(path)).size === 0) throw new Error(`Empty artifact file: ${path}`);
    if (/\.html$/i.test(path)) {
      const content = await readFile(path, 'utf8');
      for (const match of content.matchAll(/<(?:script|link|img|audio|source)\b[^>]*\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) await check(match[1], path);
    }
    if (/\.(?:js|css)$/i.test(path)) {
      const content = await readFile(path, 'utf8');
      // A literal followed by `:` is an object key (e.g. Vite's import.meta.glob map of source paths), not a URL.
      for (const match of content.matchAll(/["'`](\.?\/?assets\/[A-Za-z0-9_./-]+)["'`](?!\s*:)/g)) await check(match[1], resolve(root, 'index.html'));
      for (const match of (/\.css$/i.test(path) ? content : "").matchAll(/url\(\s*["']?([^\s)'" ]+)/g)) await check(match[1], path);
    }
  }
  if (REQUIRES_LETTER_AUDIO_MANIFEST.has(slug)) {
    const manifest = JSON.parse(await readFile(resolve(root, 'letter-audio-manifest.json'), 'utf8'));
    if (!Array.isArray(manifest.items) || manifest.items.length !== 22 || new Set(manifest.items.map(item => item.id)).size !== 22) throw new Error('Incomplete letter audio manifest (expected 22 unique letters)');
    for (const item of manifest.items) {
      if (!item.bundlePath) throw new Error(`Missing audio path for ${item.id}`);
      await check(item.bundlePath, resolve(root, 'index.html'));
    }
  }
  return all;
}

let stage;
try {
  if (process.argv.length !== 4) throw new Error('Usage: node scripts/sync-game.mjs <game-slug> <production-build-directory>');
  const slug = process.argv[2];
  if (!GAME_SLUG.test(slug)) throw new Error(`Invalid game slug: ${slug}`);
  const destination = fileURLToPath(new URL(`../public/game-builds/${slug}/`, import.meta.url));
  const source = await realpath(resolve(process.argv[3]));
  if (!(await stat(source)).isDirectory()) throw new Error('Source must be a directory');
  if (inside(source, destination) || inside(destination, source)) throw new Error('Source and destination must not overlap');
  await validate(source, slug);
  await mkdir(dirname(destination), { recursive: true });
  stage = await mkdtemp(resolve(dirname(destination), `.${slug}-`));
  await cp(source, stage, { recursive: true });
  for (const path of await files(stage)) {
    if (!/\.html$/i.test(path)) continue;
    let html = await readFile(path, 'utf8');
    html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["'](?:robots|googlebot|bingbot)["'])[^>]*>/gi, '');
    html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
    html = html.replace(/<head\b[^>]*>/i, '$&\n    <meta name="robots" content="noindex, follow" />');
    if (!html.includes('<meta name="robots" content="noindex, follow" />')) throw new Error(`Cannot enforce noindex: ${path}`);
    await writeFile(path, html);
  }
  await validate(stage, slug);
  try { if ((await lstat(destination)).isSymbolicLink()) throw new Error('Destination must not be a symlink'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await rm(destination, { recursive: true, force: true });
  await rename(stage, destination);
  stage = undefined;
  const copied = await validate(destination, slug);
  for (const path of copied.filter(path => /\.html$/i.test(path))) {
    if (!(await readFile(path, 'utf8')).includes('<meta name="robots" content="noindex, follow" />')) throw new Error(`Copied HTML is not noindex: ${path}`);
  }
  const bytes = (await Promise.all(copied.map(path => stat(path)))).reduce((sum, info) => sum + info.size, 0);
  console.log(`Synced ${copied.length} files (${bytes} bytes) to public/game-builds/${slug}/; runtime HTML is noindex.`);
} catch (error) {
  console.error(`Game sync failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (stage) await rm(stage, { recursive: true, force: true });
}
