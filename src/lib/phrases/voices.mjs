// Who reads each Hebrew line on the phrases page (/learn/hebrew-phrases/ and
// /fr/apprendre/phrases-hebreu/). One rule set, used by both the page
// components (to find a line's clip) and scripts/tts/phrases-manifest.mjs
// (to list the clips to synthesise), so the two can never disagree.
//
// - A form that follows the speaker ("Male speaker" / "Female speaker")
//   is read by that voice.
// - Any other phrase (same form for everyone, or a form that follows the
//   addressee) gets one voice for all its forms, alternating female/male
//   down the page so both voices are heard. Both addressee forms keep the
//   same voice, so the only difference a learner hears is the ending.
// - Dialogue turns alternate female/male (turn 1 female, turn 2 male):
//   the café dialogue is a female customer and a male server.
//
// Voices are the ones the owner approved for Shalom City (2026-11-03):
// he-IL-Wavenet-C (female) and he-IL-Wavenet-B (male) — see
// scripts/tts/phrases-clips.json.

import { phrases, frExtraPhrases } from '../../data/hebrew-phrases.ts';

const order = [...phrases, ...Object.values(frExtraPhrases).flat()].map((phrase) => phrase.id);

/** @returns {'female' | 'male'} */
export function phraseVoice(phraseId, variant) {
  if (variant.label === 'Male speaker') return 'male';
  if (variant.label === 'Female speaker') return 'female';
  const index = order.indexOf(phraseId);
  return index % 2 === 1 ? 'male' : 'female';
}

/** @returns {'female' | 'male'} */
export function dialogueVoice(turnIndex) {
  return turnIndex % 2 === 0 ? 'female' : 'male';
}

/** What TTS reads: the displayed Hebrew without the "…" placeholder for a name. */
export function spokenText(hebrew) {
  return hebrew.replace(/…/g, '').trim();
}

/** Key of a clip in src/data/phrase-audio.json. */
export function clipKey(gender, hebrew) {
  return `${gender}|${hebrew}`;
}
