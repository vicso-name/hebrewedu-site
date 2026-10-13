/** Offline source contract. Imported content is never publication approval. */
export const schemaVersion = 1;
export const pocStudyTypes = ['MAIN_TITLE', 'SIMPLE_TEXT', 'TEXT_IMAGE', 'BOLD_TEXT', 'SUBTITLE'];
export const pocExerciseTypes = ['TRUE_FALSE', 'MULTIPLE_CHOICE_COLUMN', 'MULTIPLE_CHOICE_GRID'];
export const studyTypes = [...pocStudyTypes, 'WORD_EXAMPLE', 'TITLE_IMAGE', 'STRIPED_BLOCK', 'ITEMS_LIST'];
export const exerciseTypes = [...pocExerciseTypes, 'MATCH_PAIRS'];
export const normalizeHebrew = value => value.replace(/[\uFB1D-\uFB4F]/gu, c => c.normalize('NFKC')).normalize('NFC');
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const tally = (items, key) => items.reduce((out, item) => { const name = String(item?.[key]); out[name] = (out[name] ?? 0) + 1; return out; }, {});
const clean = value => normalizeHebrew(value).replace(/\s+/gu, ' ').trim();

export function validateManifest(manifest) {
  const letters = manifest?.letters;
  if (manifest?.schema_version !== 1 || !Array.isArray(letters) || letters.length !== 22) throw new Error('Expected the versioned 22-letter owner manifest');
  const glyphs = [...'אבגדהוזחטיכלמנסעפצקרשת'];
  const slugs = new Set();
  letters.forEach((item, i) => {
    if (item.source_lesson_id !== i + 1 || item.order !== i + 1 || item.letter !== glyphs[i] || !/^[a-z]+$/.test(item.slug) || slugs.has(item.slug)) throw new Error(`Invalid explicit manifest mapping at ${i + 1}`);
    slugs.add(item.slug);
  });
  if (letters[3].slug !== 'dalet' || letters[3].identity_evidence !== 'product_owner_confirmed_2026-10-11') throw new Error('Owner-confirmed Dalet mapping must be retained');
  return letters;
}

export function validateList(list, manifest) {
  const letters = validateManifest(manifest);
  if (!Array.isArray(list) || list.length !== 22) throw new Error('List must be an unpaginated array of exactly 22 lessons; no automatic pagination');
  for (const key of ['id', 'order']) if (new Set(list.map(item => item?.[key])).size !== 22) throw new Error(`Expected 22 unique ${key} values`);
  for (const item of list) {
    const identity = letters.find(letter => letter.source_lesson_id === item.id);
    if (!identity || item.order !== identity.order || item.category !== 'alphabet-lc' || !nonempty(item.title) || !nonempty(item.description)) throw new Error(`Invalid list identity/fields for ${item?.id}`);
    for (const key of ['studyMaterialsCount', 'exercisesCount']) if (!Number.isInteger(item[key]) || item[key] < 1) throw new Error(`Invalid list ${key} for ${item.id}`);
    const unknown = Object.keys(item).filter(key => !['id','title','description','category','order','studyMaterialsCount','exercisesCount'].includes(key));
    if (unknown.length) throw new Error(`List schema changed: ${unknown.join(', ')}`);
  }
  return [...list].sort((a, b) => a.order - b.order);
}

export function auditLesson(raw, listing, identity) {
  const issues = [], unicode = [], media = [];
  const issue = (severity, code, path, message, evidence) => issues.push({ severity, code, path, message, ...(evidence === undefined ? {} : { evidence }) });
  const error = (code, path, message, evidence) => issue('error', code, path, message, evidence);
  const review = (code, path, message, evidence) => issue('review', code, path, message, evidence);
  function requiredText(value, path) { if (!nonempty(value)) error('EMPTY_REQUIRED_TEXT', path, 'Required nonempty text is missing'); }
  function fields(value, required, path) {
    if (!object(value)) { error('OBJECT_REQUIRED', path, 'Expected an object'); return false; }
    for (const key of required) if (!(key in value)) error('MISSING_FIELD', `${path}.${key}`, 'Required source field is absent');
    const unknown = Object.keys(value).filter(key => !required.includes(key));
    if (unknown.length) error('UNREVIEWED_FIELDS', path, 'Source fields require a reviewed schema before normalization', unknown);
    return true;
  }
  function strings(value, path = '$') {
    if (typeof value === 'string') {
      if (/\uFFFD|[\uD800-\uDFFF]/u.test(value)) error('INVALID_UNICODE', path, 'Replacement character or unpaired surrogate needs source review');
      const normalized = normalizeHebrew(value);
      if (normalized !== value) unicode.push({ path, original: value, normalized, presentationForms: /[\uFB1D-\uFB4F]/u.test(value) });
      if (/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/u.test(value)) review('BIDI_CONTROL', path, 'Embedded bidi controls require review; web output should isolate Hebrew runs', value);
      if (/[\u0400-\u04FF]/u.test(value)) review('NON_ENGLISH_SCRIPT', path, 'English API content includes Cyrillic text/transcription; editorial localization review required', value);
    } else if (Array.isArray(value)) value.forEach((item, i) => strings(item, `${path}[${i}]`));
    else if (object(value)) Object.entries(value).forEach(([key, item]) => { strings(key, `${path}.[key:${key}]`); strings(item, `${path}.${key}`); });
  }
  function mediaUrl(value, path, kind, descriptionPresent) {
    try {
      if (typeof value !== 'string') throw new Error('URL must be text');
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Unsafe media URL');
      const extension = decodeURIComponent(url.pathname).match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() ?? null;
      const tokenized = [...url.searchParams.keys()].some(key => /token|signature|credential|key/i.test(key));
      media.push({ path, kind, url: value, host: url.hostname, extension, descriptionPresent, tokenized, availability: 'not-fetched', mime: null, width: null, height: null, duration: null, license: null });
      if (tokenized) review('TOKENIZED_MEDIA_URL', path, 'Treat download tokens as access capabilities; do not copy directly into public assets');
      if (url.protocol !== 'https:') review('NON_HTTPS_MEDIA', path, 'Media requires approved HTTPS hosting');
      if (!(kind === 'image' ? ['png','jpg','jpeg','webp','gif','svg','avif'] : ['mp3','wav','m4a','ogg','opus','aac']).includes(extension)) review('UNUSUAL_MEDIA_EXTENSION', path, 'Media format is unknown from URL; verify actual MIME type');
    } catch { error('INVALID_MEDIA_URL', path, 'Valid HTTP(S) URL without credentials required'); }
  }
  strings(raw);
  if (!fields(raw, ['id','title','description','category','order','studyMaterials','exercises'], '$')) return { id: identity.source_lesson_id, identity, issues, unicode, media, studyTypes: {}, exerciseTypes: {}, studyCount: 0, exerciseCount: 0, structurallyValid: false, rendererCompatible: false };
  for (const key of ['id','order','category','title','description']) {
    if (raw[key] !== listing[key]) error('LIST_DETAIL_MISMATCH', `$.${key}`, 'Detail does not match this list snapshot', { list: listing[key], detail: raw[key] });
  }
  requiredText(raw.title, '$.title'); requiredText(raw.description, '$.description');
  const blocks = Array.isArray(raw.studyMaterials) ? raw.studyMaterials : [];
  const exercises = Array.isArray(raw.exercises) ? raw.exercises : [];
  if (!Array.isArray(raw.studyMaterials)) error('ARRAY_REQUIRED', '$.studyMaterials', 'Study materials must be an array');
  if (!Array.isArray(raw.exercises)) error('ARRAY_REQUIRED', '$.exercises', 'Exercises must be an array');
  for (const [name, items, count] of [['studyMaterials', blocks, listing.studyMaterialsCount], ['exercises', exercises, listing.exercisesCount]]) {
    if (items.length !== count) error('COUNT_MISMATCH', `$.${name}`, 'Detail count differs from list', { expected: count, observed: items.length });
  }
  const seenBlocks = new Map(), seenPrompts = new Map(), seenIds = new Set();
  const trueFalse = [], answerPositions = [];
  blocks.forEach((block, i) => {
    const path = `$.studyMaterials[${i}]`;
    if (!object(block) || !studyTypes.includes(block.type)) { error('UNSUPPORTED_STUDY_TYPE', path, 'Study type needs a reviewed source contract and web renderer', block?.type); return; }
    if (!pocStudyTypes.includes(block.type)) review('RENDERER_STUDY_TYPE_NOT_IMPLEMENTED', path, 'Recognized source type is not implemented in the Aleph renderer', block.type);
    const keys = block.type === 'MAIN_TITLE' ? ['type','title'] : block.type === 'TEXT_IMAGE' ? ['type','content','description','imageUrl'] : block.type === 'WORD_EXAMPLE' ? ['type','word','transcription','translation','audioUrl'] : ['type','content'];
    fields(block, keys, path);
    const text = block.type === 'MAIN_TITLE' ? block.title : block.type === 'WORD_EXAMPLE' ? block.word : block.content;
    if (block.type === 'TEXT_IMAGE' && typeof block.content === 'string' && !block.content.trim() && nonempty(block.description)) {
      review('EMPTY_IMAGE_BODY_WITH_CAPTION', `${path}.content`, 'Caption/media are present but body is empty; explicitly review the presentation mapping; no fallback or deletion applied');
    } else requiredText(text, `${path}.${block.type === 'MAIN_TITLE' ? 'title' : block.type === 'WORD_EXAMPLE' ? 'word' : 'content'}`);
    if (typeof text === 'string') {
      const key = `${block.type}:${clean(text)}`;
      if (seenBlocks.has(key)) review('DUPLICATE_STUDY_TEXT', path, 'Exact normalized study text repeated within lesson', { firstIndex: seenBlocks.get(key), text });
      else seenBlocks.set(key, i);
    }
    if (block.type === 'TEXT_IMAGE') {
      if (typeof block.description !== 'string') error('IMAGE_DESCRIPTION_TYPE', `${path}.description`, 'Image description must be a string');
      else if (!block.description.trim()) review('MISSING_IMAGE_DESCRIPTION', `${path}.description`, 'Image has no source textual description');
      mediaUrl(block.imageUrl, `${path}.imageUrl`, 'image', nonempty(block.description));
    }
    if (block.type === 'WORD_EXAMPLE') {
      for (const key of ['transcription','translation']) requiredText(block[key], `${path}.${key}`);
      mediaUrl(block.audioUrl, `${path}.audioUrl`, 'audio', nonempty(block.translation));
    }
  });
  exercises.forEach((exercise, i) => {
    const path = `$.exercises[${i}]`;
    if (!object(exercise) || !exerciseTypes.includes(exercise.type)) { error('UNSUPPORTED_EXERCISE_TYPE', path, 'Exercise type needs a reviewed source contract and renderer', exercise?.type); return; }
    if (!pocExerciseTypes.includes(exercise.type)) review('RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED', path, 'Recognized matching-pairs structure needs an accessible interaction and explicit grading model', exercise.type);
    fields(exercise, ['id','type','content','tip','score','additionalData'], path);
    for (const key of ['id','content','tip']) requiredText(exercise[key], `${path}.${key}`);
    if (seenIds.has(exercise.id)) error('DUPLICATE_EXERCISE_ID', `${path}.id`, 'Exercise IDs must be unique within each lesson', exercise.id);
    seenIds.add(exercise.id);
    if (typeof exercise.score !== 'number' || !Number.isFinite(exercise.score) || exercise.score < 0) error('INVALID_SCORE', `${path}.score`, 'Source score must be a finite nonnegative number');
    if (typeof exercise.content === 'string') {
      const prompt = clean(exercise.content);
      if (seenPrompts.has(prompt)) review('DUPLICATE_EXERCISE_PROMPT', `${path}.content`, 'Repeated normalized exercise prompt', { firstIndex: seenPrompts.get(prompt), text: exercise.content });
      else seenPrompts.set(prompt, i);
    }
    const data = exercise.additionalData;
    if (!fields(data, exercise.type === 'TRUE_FALSE' ? ['correctAnswer'] : exercise.type === 'MATCH_PAIRS' ? ['pairs'] : ['choices','correctAnswer'], `${path}.additionalData`)) return;
    if (exercise.type === 'TRUE_FALSE') {
      if (!['true','false'].includes(data.correctAnswer)) error('INVALID_BOOLEAN_ANSWER', `${path}.additionalData.correctAnswer`, 'Expected the explicit string true or false; never coerce truthiness', data.correctAnswer);
      else {
        trueFalse.push({ index: i, answer: data.correctAnswer });
        if ((data.correctAnswer === 'true' && /^\s*(?:false|incorrect|no[,!])/i.test(exercise.tip)) || (data.correctAnswer === 'false' && /^\s*(?:true|correct|yes[,!])/i.test(exercise.tip))) review('ANSWER_TIP_CONTRADICTION', path, 'Boolean key may contradict the explanation opening', { prompt: exercise.content, answer: data.correctAnswer, tip: exercise.tip });
      }
    } else if (exercise.type === 'MATCH_PAIRS') {
      if (!object(data.pairs) || Object.keys(data.pairs).length < 2 || Object.entries(data.pairs).some(([left, right]) => !nonempty(left) || !nonempty(right))) {
        error('INVALID_MATCH_PAIRS', `${path}.additionalData.pairs`, 'Expected at least two nonempty left/right pairs'); return;
      }
      const left = Object.keys(data.pairs).map(clean), right = Object.values(data.pairs).map(clean);
      if (new Set(left).size !== left.length || new Set(right).size !== right.length) error('AMBIGUOUS_MATCH_PAIRS', `${path}.additionalData.pairs`, 'One-to-one matching requires unique normalized sides', data.pairs);
    } else {
      const choices = data.choices;
      if (!Array.isArray(choices) || choices.length < 2 || choices.some(choice => !nonempty(choice))) { error('INVALID_CHOICES', `${path}.additionalData.choices`, 'Expected at least two nonempty string choices'); return; }
      const normalized = choices.map(normalizeHebrew);
      if (new Set(normalized.map(clean)).size !== choices.length) error('DUPLICATE_CHOICES', `${path}.additionalData.choices`, 'Choices become equivalent after Unicode/whitespace normalization', choices);
      requiredText(data.correctAnswer, `${path}.additionalData.correctAnswer`);
      const matches = typeof data.correctAnswer === 'string' ? normalized.reduce((out, choice, option) => choice === normalizeHebrew(data.correctAnswer) ? [...out, option] : out, []) : [];
      if (matches.length !== 1) error('ANSWER_NOT_UNIQUE_CHOICE', `${path}.additionalData.correctAnswer`, 'Answer must map to exactly one normalized choice', { answer: data.correctAnswer, choices });
      else answerPositions.push({ index: i, position: matches[0] + 1 });
      const expected = exercise.type === 'MULTIPLE_CHOICE_COLUMN' ? 3 : 4;
      if (choices.length !== expected) review('NON_POC_CHOICE_COUNT', path, 'Valid source choice count needs generalization beyond the fixed Aleph contract', { observed: choices.length, alephExpected: expected });
      // Check only explicit glyph-identification prompts; pronunciation is editorial, not auto-corrected.
      const marks = [['hataf patah', '\u05B2'], ['kamatz', '\u05B8'], ['patah', '\u05B7'], ['tsere', '\u05B5'], ['segol', '\u05B6'], ['kubutz', '\u05BB']];
      if (/which.*(?:marked|mark|with|contains)/i.test(exercise.content) && normalized.every(choice => /^[\u0590-\u05FF]+$/u.test(choice)) && matches.length === 1) {
        const mark = marks.find(([name]) => exercise.content.toLowerCase().includes(name));
        if (mark && !normalized[matches[0]].includes(mark[1])) review('GLYPH_ANSWER_MARK_MISMATCH', path, 'Selected glyph may lack the vowel mark named in the prompt', { prompt: exercise.content, answer: data.correctAnswer });
      }
    }
  });
  if (trueFalse.length >= 3 && new Set(trueFalse.map(item => item.answer)).size === 1) review('ONE_SIDED_TRUE_FALSE', '$.exercises', 'All true/false answers have the same key; review learning quality, not a proof of wrong answers', trueFalse);
  const positions = tally(answerPositions, 'position');
  if (answerPositions.length >= 5 && Math.max(...Object.values(positions)) / answerPositions.length >= .8) review('ANSWER_POSITION_BIAS', '$.exercises', 'At least 80% of choice answers occupy one position', positions);
  if (blocks[0]?.type !== 'MAIN_TITLE') review('NONSTANDARD_TITLE_POSITION', '$.studyMaterials[0]', 'Map heading hierarchy explicitly rather than assuming Aleph block positions');
  const rules = [
    ['VOWEL_LENGTH_OR_REDUCTION', /\b(?:long|short|ultra-short|reduced)\b.*(?:vowel|sound|\[[aeiou])/i, 'Approve vowel length/reduction claims and the pronunciation tradition'],
    ['SILENCE_OR_ABSOLUTE_CLAIM', /(?:completely|always|entirely|never|no inherent|without a sound|silent)/i, 'Review absolute sound/silence rules and exceptions'],
    ['ENGLISH_SOUND_ANALOGY', /(?:sofa|father|spa|like (?:the|in)|as in|english word)/i, 'Review English vowel/consonant analogies and dialect scope'],
    ['MARK_PLACEMENT', /(?:to the left|to the right|left side|right side)/i, 'Verify mark-placement descriptions against pointed Hebrew'],
    ['ARTICULATION_TRADITION', /(?:guttural|pharyngeal|uvular|rolled|roll|trill|throat|glottal|dagesh)/i, 'Approve articulation/dagesh rules and modern versus traditional pronunciation scope'],
  ];
  for (const [path, text] of [
    ['$.description', raw.description],
    ...blocks.flatMap((block, i) => ['title','content','description','transcription','translation'].filter(key => typeof block?.[key] === 'string').map(key => [`$.studyMaterials[${i}].${key}`, block[key]])),
    ...exercises.flatMap((exercise, i) => ['content','tip'].filter(key => typeof exercise?.[key] === 'string').map(key => [`$.exercises[${i}].${key}`, exercise[key]])),
  ]) for (const [code, regex, message] of rules) if (typeof text === 'string' && regex.test(text)) review(code, path, message, text);
  if (media.length) review('MEDIA_APPROVAL_AND_METADATA', '$.studyMaterials', 'Image/audio accuracy/reuse, metadata and delivery need approval; no assets fetched', { images: media.filter(item => item.kind === 'image').length, audio: media.filter(item => item.kind === 'audio').length, missingMetadata: ['mime','dimensions-or-duration','license','revision'] });
  // Do not infer audio from game assets or image captions.
  review('EDITORIAL_APPROVAL_PENDING', '$', 'Source import is not linguistic, pedagogical or public-reuse approval');
  const structurallyValid = !issues.some(item => item.severity === 'error');
  const rendererCompatible = structurallyValid && !issues.some(item => ['UNSUPPORTED_STUDY_TYPE','UNSUPPORTED_EXERCISE_TYPE','RENDERER_STUDY_TYPE_NOT_IMPLEMENTED','RENDERER_EXERCISE_TYPE_NOT_IMPLEMENTED','NON_POC_CHOICE_COUNT','EMPTY_IMAGE_BODY_WITH_CAPTION'].includes(item.code));
  return { id: identity.source_lesson_id, identity, studyCount: blocks.length, exerciseCount: exercises.length, studyTypes: tally(blocks, 'type'), exerciseTypes: tally(exercises, 'type'), issues, unicode, media, trueFalse, answerPositions: positions, structurallyValid, rendererCompatible };
}

export function privateNormalizedLesson(raw, identity, provenance) {
  // Publication/presentation decisions must be made separately; no Aleph-specific substitutions.
  return {
    sourceId: identity.source_lesson_id, order: identity.order, slug: identity.slug, glyph: identity.letter,
    publicationStatus: 'unpublished-import', editorialStatus: 'pending', provenance,
    title: normalizeHebrew(raw.title), description: normalizeHebrew(raw.description),
    blocks: raw.studyMaterials.map((block, index) => ({ id: `${identity.slug}-block-${index + 1}`, sourceIndex: index, type: block.type,
      ...(block.type === 'WORD_EXAMPLE' ? { word: normalizeHebrew(block.word), transcription: normalizeHebrew(block.transcription), translation: normalizeHebrew(block.translation), sourceMedia: { audioUrl: block.audioUrl, status: 'withheld-pending-review' } } : { text: normalizeHebrew(block.type === 'MAIN_TITLE' ? block.title : block.content) }),
      ...(block.type === 'TEXT_IMAGE' ? { sourceMedia: { imageUrl: block.imageUrl, description: normalizeHebrew(block.description), status: 'withheld-pending-review' } } : {}),
    })),
    exercises: raw.exercises.map((exercise, index) => {
      const id = `${identity.slug}-exercise-${index + 1}`;
      if (exercise.type === 'MATCH_PAIRS') return { id, sourceId: exercise.id, sourceIndex: index, type: exercise.type, prompt: normalizeHebrew(exercise.content), explanation: normalizeHebrew(exercise.tip), sourceScore: exercise.score,
        pairs: Object.entries(exercise.additionalData.pairs).map(([left,right],i) => ({ id: `${id}-pair-${i+1}`, left: normalizeHebrew(left), right: normalizeHebrew(right) })) };
      const labels = exercise.type === 'TRUE_FALSE' ? ['True','False'] : exercise.additionalData.choices.map(normalizeHebrew);
      const option = exercise.type === 'TRUE_FALSE' ? (exercise.additionalData.correctAnswer === 'true' ? 0 : 1) : labels.indexOf(normalizeHebrew(exercise.additionalData.correctAnswer));
      return { id, sourceId: exercise.id, sourceIndex: index, type: exercise.type, prompt: normalizeHebrew(exercise.content), explanation: normalizeHebrew(exercise.tip), sourceScore: exercise.score,
        options: labels.map((label, i) => ({ id: `${id}-option-${i + 1}`, label })), correctOptionId: `${id}-option-${option + 1}` };
    }),
  };
}

// Complete source-shaped text snapshot: preserve empty/invalid records and unknown fields.
// Every structural issue stays attached to its lesson; this is private review content only.
export function normalizeSourceText(value, key = '') {
  if (typeof value === 'string') return /(?:url|^id$|^type$)/i.test(key) ? value : normalizeHebrew(value);
  if (Array.isArray(value)) return value.map(item => normalizeSourceText(item, key));
  // Keep object keys byte-for-byte: normalizing colliding pair labels could erase a source pair.
  // Keys are audited separately; normalized matching candidates use arrays with stable pair IDs.
  if (object(value)) return Object.fromEntries(Object.entries(value).map(([name,item]) => [name, normalizeSourceText(item, name)]));
  return value;
}

export function validateReviewSnapshot(snapshot, manifest) {
  const identities = validateManifest(manifest);
  if (snapshot.schemaVersion !== 1 || snapshot.normalizationVersion !== 1 || snapshot.lessons?.length !== 22 || snapshot.publishedLessonIds?.length !== 0 || snapshot.courseHubImplemented !== false) throw new Error('Invalid private snapshot envelope or publication state');
  snapshot.lessons.forEach((record, index) => {
    const identity = identities[index];
    if (record.identity.source_lesson_id !== identity.source_lesson_id || record.identity.slug !== identity.slug || record.identity.letter !== identity.letter || record.publicationStatus !== 'unpublished-import') throw new Error('Snapshot mapping/publication state changed');
    if (!/^[a-f0-9]{64}$/.test(record.provenance.sha256) || typeof record.structurallyValid !== 'boolean' || !Array.isArray(record.blockingIssues) || !object(record.sourceNormalized)) throw new Error('Invalid record provenance/validation');
    if (record.structurallyValid !== (record.blockingIssues.length === 0)) throw new Error('Snapshot blockers and validity disagree');
    if (record.structurallyValid && (!record.normalizationCandidate || record.normalizationCandidate.blocks.length !== record.sourceNormalized.studyMaterials.length || record.normalizationCandidate.exercises.length !== record.sourceNormalized.exercises.length)) throw new Error('Normalization candidate must preserve source counts');
    if (!record.structurallyValid && record.normalizationCandidate !== null) throw new Error('Malformed source must not get an accepted candidate');
  });
  if (snapshot.allLessonContentValid !== snapshot.lessons.every(record => record.structurallyValid)) throw new Error('Snapshot must not claim malformed content is valid');
  return snapshot;
}
