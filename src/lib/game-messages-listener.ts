// DOM wiring for the game-iframe message receiver on a /play/<game>/game/
// player page. Validation/normalization logic lives in game-messages.mjs
// (kept DOM-free so it's directly unit-testable from plain Node). See
// docs/ANALYTICS.md ("Game events").
import { matchGameMessage } from './game-messages.mjs';
import { track } from './analytics';

/**
 * Wires the window `message` listener for one player page. Only accepts
 * messages whose origin is our own and whose source is the exact iframe
 * window passed in — everything else, including same-origin messages from
 * any other source, is ignored before the payload is even inspected.
 */
export function attachGameMessageListener(iframe: HTMLIFrameElement, gameId: string): () => void {
  function handleMessage(event: MessageEvent) {
    if (event.origin !== window.location.origin) return;
    if (!iframe.contentWindow || event.source !== iframe.contentWindow) return;
    const match = matchGameMessage(event.data);
    if (!match) return;
    const params: Record<string, unknown> = { ...match.params, game_id: gameId };
    if (match.name === 'google_play_click' || match.name === 'app_store_click') params.source = 'game';
    track(match.name, params);
  }
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}
