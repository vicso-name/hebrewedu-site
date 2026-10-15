// Pure validation/normalization for postMessage events sent by a game
// iframe on a /play/<game>/game/ player page. No DOM access here so this
// can be unit tested directly with plain Node; see
// scripts/test-game-messages.mjs. The DOM wiring (window listener, origin
// and iframe-source checks) lives in game-messages-listener.ts, which is
// only ever bundled by Astro, never run directly by Node.
// See docs/ANALYTICS.md ("Game events") for the wire format.

export const GAME_MESSAGE_SOURCE = 'hebrewedu-game';
export const GAME_MESSAGE_VERSION = 1;

export const ALLOWED_EVENTS = new Set([
  'game_start',
  'round_start',
  'round_complete',
  'game_over',
  'store_popup_shown',
  'store_click',
]);

const STORE_IDS = new Set(['google_play', 'app_store']);
const MAX_PARAM_KEYS = 10;

function sanitizeParams(params) {
  const out = {};
  if (params == null || typeof params !== 'object' || Array.isArray(params)) return out;
  for (const [key, value] of Object.entries(params)) {
    if (Object.keys(out).length >= MAX_PARAM_KEYS) break;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      out[key] = value;
    }
  }
  return out;
}

/**
 * Validates and normalizes a raw `postMessage` payload from a game iframe.
 * Returns null if the payload should be ignored (wrong shape, unversioned,
 * unknown/disallowed event, bad store id, etc). `store_click` is remapped
 * to `google_play_click` / `app_store_click` to match the existing store
 * CTA events (docs/ANALYTICS.md); every other allowed event passes through
 * under its own name.
 */
export function matchGameMessage(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  if (data.source !== GAME_MESSAGE_SOURCE) return null;
  if (data.v !== GAME_MESSAGE_VERSION) return null;
  if (typeof data.event !== 'string' || !ALLOWED_EVENTS.has(data.event)) return null;

  const params = sanitizeParams(data.params);

  if (data.event === 'store_click') {
    const storeId = params.store;
    if (typeof storeId !== 'string' || !STORE_IDS.has(storeId)) return null;
    const { store: _store, ...rest } = params;
    return { name: `${storeId}_click`, params: rest };
  }

  return { name: data.event, params };
}
