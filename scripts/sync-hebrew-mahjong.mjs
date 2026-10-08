import { cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const destination = fileURLToPath(new URL('../public/game-builds/hebrew-mahjong/', import.meta.url));
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
async function validate(root) {
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
      for (const match of content.matchAll(/["'`](\.?\/?assets\/[A-Za-z0-9_./-]+)["'`]/g)) await check(match[1], resolve(root, 'index.html'));
      for (const match of (/\.css$/i.test(path) ? content : "").matchAll(/url\(\s*["']?([^\s)'" ]+)/g)) await check(match[1], path);
    }
  }
  return all;
}
let stage;
try {
  if (process.argv.length !== 3) throw new Error('Usage: npm run sync:hebrew-mahjong -- <production-build-directory>');
  const source = await realpath(resolve(process.argv[2]));
  if (!(await stat(source)).isDirectory()) throw new Error('Source must be a directory');
  if (inside(source, destination) || inside(destination, source)) throw new Error('Source and destination must not overlap');
  await validate(source);
  await mkdir(dirname(destination), { recursive: true });
  stage = await mkdtemp(resolve(dirname(destination), '.hebrew-mahjong-'));
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
  await validate(stage);
  try { if ((await lstat(destination)).isSymbolicLink()) throw new Error('Destination must not be a symlink'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await rm(destination, { recursive: true, force: true });
  await rename(stage, destination);
  stage = undefined;
  const copied = await validate(destination);
  for (const path of copied.filter(path => /\.html$/i.test(path))) {
    if (!(await readFile(path, 'utf8')).includes('<meta name="robots" content="noindex, follow" />')) throw new Error(`Copied HTML is not noindex: ${path}`);
  }
  const bytes = (await Promise.all(copied.map(path => stat(path)))).reduce((sum, info) => sum + info.size, 0);
  console.log(`Synced ${copied.length} files (${bytes} bytes) to public/game-builds/hebrew-mahjong/; runtime HTML is noindex.`);
} catch (error) {
  console.error(`Hebrew Mahjong sync failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  if (stage) await rm(stage, { recursive: true, force: true });
}
