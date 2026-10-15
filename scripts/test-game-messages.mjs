import assert from 'node:assert/strict';
import { matchGameMessage } from '../src/lib/game-messages.mjs';

// Allowed events pass through with sanitized params.
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'game_start', params: { level: 1 } }), {
  name: 'game_start',
  params: { level: 1 },
});
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'round_start' }), { name: 'round_start', params: {} });
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'round_complete', params: { score: 10, won: true } }), {
  name: 'round_complete',
  params: { score: 10, won: true },
});
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'game_over' }), { name: 'game_over', params: {} });
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'store_popup_shown', params: { reason: 'level_up' } }), {
  name: 'store_popup_shown',
  params: { reason: 'level_up' },
});

// store_click remaps to the existing store CTA event names and drops the store id from params.
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'store_click', params: { store: 'google_play', slot: 'end_screen' } }), {
  name: 'google_play_click',
  params: { slot: 'end_screen' },
});
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'store_click', params: { store: 'app_store' } }), {
  name: 'app_store_click',
  params: {},
});

// store_click with a missing/unknown store id is dropped entirely.
assert.equal(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'store_click', params: {} }), null);
assert.equal(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'store_click', params: { store: 'amazon' } }), null);

// Wrong/missing source, version, or an event outside the allowlist is dropped.
assert.equal(matchGameMessage({ source: 'other', v: 1, event: 'game_start' }), null);
assert.equal(matchGameMessage({ v: 1, event: 'game_start' }), null);
assert.equal(matchGameMessage({ source: 'hebrewedu-game', v: 2, event: 'game_start' }), null);
assert.equal(matchGameMessage({ source: 'hebrewedu-game', event: 'game_start' }), null);
assert.equal(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'eval' }), null);
assert.equal(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: '__proto__' }), null);
assert.equal(matchGameMessage({ source: 'hebrewedu-game', v: 1 }), null);

// Non-object, null, and array payloads are dropped.
assert.equal(matchGameMessage(null), null);
assert.equal(matchGameMessage('game_start'), null);
assert.equal(matchGameMessage(42), null);
assert.equal(matchGameMessage(['hebrewedu-game']), null);

// Params are sanitized: only scalars survive, and at most 10 keys.
assert.deepEqual(
  matchGameMessage({
    source: 'hebrewedu-game',
    v: 1,
    event: 'game_start',
    params: { a: 1, nested: { x: 1 }, list: [1, 2], fn: () => 1, ok: 'yes', nil: null, undef: undefined },
  }),
  { name: 'game_start', params: { a: 1, ok: 'yes' } },
);
const manyKeys = Object.fromEntries(Array.from({ length: 15 }, (_, i) => [`k${i}`, i]));
const capped = matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'game_start', params: manyKeys });
assert.equal(Object.keys(capped.params).length, 10);

// A non-object params value sanitizes to an empty object rather than throwing.
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'game_start', params: 'nope' }), {
  name: 'game_start',
  params: {},
});
assert.deepEqual(matchGameMessage({ source: 'hebrewedu-game', v: 1, event: 'game_start', params: [1, 2, 3] }), {
  name: 'game_start',
  params: {},
});

console.log('game-messages: all assertions passed');
