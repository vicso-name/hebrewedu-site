import { test } from 'node:test';
import assert from 'node:assert/strict';
import { en } from '../src/i18n/en.ts';
import { fr } from '../src/i18n/fr.ts';

// TypeScript's `Dictionary` interface (src/i18n/index.ts) already makes a
// missing/extra key a compile-time error for en.ts/fr.ts. This test is the
// runtime backstop: it catches the same drift for anyone editing the
// dictionaries without a type-check step (e.g. a quick JS-only edit), and
// documents the exact rule — same key set, same leaf shape, at every level.
function keyPaths(value, prefix = '') {
  if (Array.isArray(value) || typeof value !== 'object' || value === null) {
    return [prefix];
  }
  return Object.keys(value).flatMap((key) =>
    keyPaths(value[key], prefix ? `${prefix}.${key}` : key)
  );
}

test('fr dictionary has exactly the same keys as en, at every level', () => {
  const enPaths = new Set(keyPaths(en));
  const frPaths = new Set(keyPaths(fr));

  const missingInFr = [...enPaths].filter((p) => !frPaths.has(p));
  const extraInFr = [...frPaths].filter((p) => !enPaths.has(p));

  assert.deepEqual(missingInFr, [], `fr.ts is missing: ${missingInFr.join(', ')}`);
  assert.deepEqual(extraInFr, [], `fr.ts has extra keys not in en.ts: ${extraInFr.join(', ')}`);
});

test('leaf value types match between en and fr (string vs function vs array)', () => {
  function leafType(value) {
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }
  function check(a, b, prefix = '') {
    if (typeof a !== 'object' || a === null || Array.isArray(a)) {
      assert.equal(leafType(b), leafType(a), `type mismatch at "${prefix}"`);
      return;
    }
    for (const key of Object.keys(a)) {
      check(a[key], b[key], prefix ? `${prefix}.${key}` : key);
    }
  }
  check(en, fr);
});
