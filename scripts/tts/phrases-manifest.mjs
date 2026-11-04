// Builds scripts/tts/phrases-clips.json: every Hebrew line the phrases page
// (EN /learn/hebrew-phrases/ + FR /fr/apprendre/phrases-hebreu/) can play,
// with the voice that reads it (src/lib/phrases/voices.mjs). generate.py
// reads this list, synthesises the clips into public/audio/phrases/ and
// writes the index the page reads, src/data/phrase-audio.json.
//
//   node scripts/tts/phrases-manifest.mjs           # write the clip list
//   node scripts/tts/phrases-manifest.mjs --check   # fail if a line has no clip in the index

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { phrases, frExtraPhrases, phraseDialogues, phraseVariant, phraseVariantFr } from '../../src/data/hebrew-phrases.ts';
import { phraseVoice, dialogueVoice, spokenText, clipKey } from '../../src/lib/phrases/voices.mjs';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const MANIFEST = `${HERE}phrases-clips.json`;
const INDEX = fileURLToPath(new URL('../../src/data/phrase-audio.json', import.meta.url));

const clips = new Map();
function add(gender, hebrew, use) {
  const say = spokenText(hebrew);
  if (!/[א-ת]/.test(say)) throw new Error(`No Hebrew to read: ${hebrew} (${use})`);
  if (/[0-9/₪…]/.test(say)) throw new Error(`TTS text has digits or symbols: ${say} (${use})`);
  const key = clipKey(gender, hebrew);
  const clip = clips.get(key) ?? {
    file: `${gender[0]}-${createHash('sha256').update(`${gender}|${say}`).digest('hex').slice(0, 10)}.mp3`,
    gender, text: hebrew, say, uses: [],
  };
  clip.uses.push(use);
  clips.set(key, clip);
}

for (const phrase of phrases) {
  for (const variant of phrase.variants) add(phraseVoice(phrase.id, variant), variant.hebrew, `en.${phrase.id}.${variant.id}`);
}
for (const phrase of [...phrases, ...Object.values(frExtraPhrases).flat()]) {
  for (const variant of phrase.fr?.variants ?? []) add(phraseVoice(phrase.id, variant), variant.hebrew, `fr.${phrase.id}.${variant.id}`);
}
for (const dialogue of phraseDialogues) {
  dialogue.turns.forEach((turn, index) => {
    add(dialogueVoice(index), phraseVariant(turn.phraseId, turn.variantId).hebrew, `en.${dialogue.id}.${index + 1}`);
    add(dialogueVoice(index), phraseVariantFr(turn.phraseId, turn.variantId).hebrew, `fr.${dialogue.id}.${index + 1}`);
  });
}

const list = [...clips.values()];

if (process.argv.includes('--check')) {
  const index = existsSync(INDEX) ? JSON.parse(readFileSync(INDEX, 'utf8')).clips : {};
  const missing = list.filter((clip) => !index[clipKey(clip.gender, clip.text)]);
  if (missing.length) {
    console.error(`Phrase audio: ${missing.length} of ${list.length} lines have no clip:`);
    for (const clip of missing) console.error(`  ${clip.gender} ${clip.text} (${clip.uses.join(', ')})`);
    console.error('Run node scripts/tts/phrases-manifest.mjs, then scripts/tts/generate.py.');
    process.exit(1);
  }
  console.log(`Phrase audio: all ${list.length} lines have a clip.`);
  process.exit(0);
}

writeFileSync(MANIFEST, `${JSON.stringify({
  note: 'Hebrew lines of the phrases page, written by scripts/tts/phrases-manifest.mjs from src/data/hebrew-phrases.ts (do not edit by hand). `text` is the line as the page shows it (the lookup key with `gender`); `say` is what TTS reads. Voices are the ones approved for Shalom City.',
  voices: { male: 'he-IL-Wavenet-B', female: 'he-IL-Wavenet-C' },
  rate: 0.9,
  clips: list,
}, null, 1)}\n`);
const chars = list.reduce((n, clip) => n + clip.say.length, 0);
console.log(`Clips: ${list.length} (${list.filter((c) => c.gender === 'female').length} female, ${list.filter((c) => c.gender === 'male').length} male), ${chars} characters -> ${MANIFEST}`);
