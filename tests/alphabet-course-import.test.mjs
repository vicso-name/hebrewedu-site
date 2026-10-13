import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditLesson, normalizeHebrew, normalizeSourceText, privateNormalizedLesson, validateManifest, validateList, validateReviewSnapshot } from '../scripts/alphabet-course/validate.mjs';
import { parseJSONBytes } from '../scripts/alphabet-course/json.mjs';
const manifest = JSON.parse(await readFile(new URL('../scripts/alphabet-course/owner-letter-map.v2.json', import.meta.url)));
const clone = value => structuredClone(value);
const identity = manifest.letters[0];
const source = () => ({ id: 1, order: 1, category: 'alphabet-lc', title: 'Lesson 1', description: 'Fixture', studyMaterials: [{ type: 'MAIN_TITLE', title: 'Title' }], exercises: [{ id: 'fixture-1', type: 'TRUE_FALSE', content: 'Statement', tip: 'Explanation', score: 0, additionalData: { correctAnswer: 'false' } }] });
const listing = raw => ({ id: raw.id, order: raw.order, category: raw.category, title: raw.title, description: raw.description, studyMaterialsCount: raw.studyMaterials.length, exercisesCount: raw.exercises.length });
const audit = raw => auditLesson(raw, listing(raw), identity);
const hasError = (raw, code) => audit(raw).issues.some(issue => issue.severity === 'error' && issue.code === code);

test('strict JSON parsing rejects invalid UTF-8 and duplicate keys, including escaped keys', () => {
  assert.throws(()=>parseJSONBytes(Buffer.from('{"pairs":{"a":"x","a":"y"}}')),/Duplicate/);
  assert.throws(()=>parseJSONBytes(Buffer.from('{"a":1,"\\u0061":2}')),/Duplicate/);
  assert.throws(()=>parseJSONBytes(new Uint8Array([0xff])));
  const value={a:[{a:1},{a:2}],b:{quoted:'" : }, {'},c:'אב'};
  assert.deepEqual(parseJSONBytes(Buffer.from(JSON.stringify(value))),value);
});

test('explicit owner mapping, including Dalet, and exact list inventory fail closed', () => {
  assert.equal(validateManifest(manifest).length, 22);
  const wrong = clone(manifest); wrong.letters[3].slug = 'gimel';
  assert.throws(() => validateManifest(wrong));
  const list = manifest.letters.map(item => ({ id: item.source_lesson_id, order: item.order, category: 'alphabet-lc', title: `Lesson ${item.source_lesson_id}`, description: 'Fixture', studyMaterialsCount: 1, exercisesCount: 1 }));
  assert.equal(validateList(list, manifest).length, 22);
  for (const bad of [{ results: list }, list.slice(0,21), [...list.slice(0,21), list[0]]]) assert.throws(() => validateList(bad, manifest));
  const orders = clone(list); orders[21].order = 21; assert.throws(() => validateList(orders, manifest));
  const fields = clone(list); fields[0].accessToken = 'fixture'; assert.throws(() => validateList(fields, manifest));
});

test('unknown types/fields, mismatched counts and duplicate exercise IDs are rejected', () => {
  let raw = source(); raw.studyMaterials.push({ type: 'NEW_TYPE', content: 'x' }); assert.equal(hasError(raw,'UNSUPPORTED_STUDY_TYPE'),true);
  raw = source(); raw.exercises[0].type = 'NEW_TYPE'; assert.equal(hasError(raw,'UNSUPPORTED_EXERCISE_TYPE'),true);
  raw = source(); raw.userEmail = 'fixture'; assert.equal(hasError(raw,'UNREVIEWED_FIELDS'),true);
  raw = source(); raw.exercises.push(clone(raw.exercises[0])); assert.equal(hasError(raw,'DUPLICATE_EXERCISE_ID'),true);
  raw = source(); const row = listing(raw); row.studyMaterialsCount = 2;
  assert.equal(auditLesson(raw,row,identity).issues.some(i=>i.code==='COUNT_MISMATCH'),true);
});

test('boolean false is explicit and choice keys must match exactly one normalized option', () => {
  const raw = source(); assert.equal(audit(raw).structurallyValid,true);
  assert.equal(privateNormalizedLesson(raw,identity,{}).exercises[0].correctOptionId,'aleph-exercise-1-option-2');
  raw.exercises[0].additionalData.correctAnswer = false; assert.equal(hasError(raw,'INVALID_BOOLEAN_ANSWER'),true);
  raw.exercises[0] = { ...source().exercises[0], type:'MULTIPLE_CHOICE_GRID', additionalData:{ choices:['בּ','ג','א','ד'], correctAnswer:'בּ' } };
  assert.equal(audit(raw).structurallyValid,true);
  assert.equal(privateNormalizedLesson(raw,identity,{}).exercises[0].correctOptionId,'aleph-exercise-1-option-1');
  raw.exercises[0].additionalData.correctAnswer='ז'; assert.equal(hasError(raw,'ANSWER_NOT_UNIQUE_CHOICE'),true);
  raw.exercises[0].additionalData={ choices:['בּ','בּ','א','ד'], correctAnswer:'בּ' }; assert.equal(hasError(raw,'DUPLICATE_CHOICES'),true);
});

test('recognized additional types are valid source but require renderer development', () => {
  const raw = source();
  raw.studyMaterials.push({ type:'WORD_EXAMPLE', word:'בָּא', transcription:'ba', translation:'comes', audioUrl:'https://example.test/ba.mp3' });
  raw.exercises.push({ ...source().exercises[0], id:'fixture-2', type:'MATCH_PAIRS', additionalData:{ pairs:{ 'א':'a','ב':'b','ג':'g' } } });
  const result=audit(raw); assert.equal(result.structurallyValid,true); assert.equal(result.rendererCompatible,false);
  const normalized=privateNormalizedLesson(raw,identity,{});
  assert.equal(normalized.blocks.length,2); assert.equal(normalized.exercises[1].pairs.length,3);
  assert.equal(result.media[0].kind,'audio'); assert.equal(result.media[0].availability,'not-fetched');
});

test('ambiguous pair sides and Unicode collisions cannot silently erase pairs', () => {
  const raw=source(); raw.exercises[0]={...raw.exercises[0],type:'MATCH_PAIRS',additionalData:{pairs:{'בּ':'b','בּ':'v','ג':'g'}}};
  assert.equal(hasError(raw,'AMBIGUOUS_MATCH_PAIRS'),true);
  assert.equal(Object.keys(normalizeSourceText(raw).exercises[0].additionalData.pairs).length,3);
  raw.exercises[0].additionalData.pairs={'א':'x','ב':'x'}; assert.equal(hasError(raw,'AMBIGUOUS_MATCH_PAIRS'),true);
  raw.exercises[0].additionalData.pairs={'א':''}; assert.equal(hasError(raw,'INVALID_MATCH_PAIRS'),true);
});

test('empty placeholders block content; caption-only images are explicitly flagged and preserved', () => {
  for (const type of ['TITLE_IMAGE','ITEMS_LIST','SIMPLE_TEXT']) {
    const raw=source(); raw.studyMaterials.push({type,content:''}); assert.equal(hasError(raw,'EMPTY_REQUIRED_TEXT'),true);
    assert.equal(normalizeSourceText(raw).studyMaterials[1].content,'');
  }
  const raw=source();raw.studyMaterials.push({type:'TEXT_IMAGE',content:'',description:'Kaf Sofit',imageUrl:'https://example.test/kaf.png'});
  const result=audit(raw);assert.equal(result.structurallyValid,true);assert.equal(result.rendererCompatible,false);
  assert.equal(result.issues.some(i=>i.code==='EMPTY_IMAGE_BODY_WITH_CAPTION'),true);
  raw.studyMaterials[1].description='';assert.equal(hasError(raw,'EMPTY_REQUIRED_TEXT'),true);
});

test('variable grid counts are retained, not forced into Aleph four-choice schema', () => {
  const raw=source();raw.exercises[0]={...raw.exercises[0],type:'MULTIPLE_CHOICE_GRID',additionalData:{choices:['a','b','c'],correctAnswer:'b'}};
  const result=audit(raw);assert.equal(result.structurallyValid,true);assert.equal(result.rendererCompatible,false);
  assert.equal(privateNormalizedLesson(raw,identity,{}).exercises[0].options.length,3);
});

test('normalization preserves niqqud, source URLs and input; invalid Unicode is flagged', () => {
  const raw=source();raw.studyMaterials.push({type:'WORD_EXAMPLE',word:'שִׁ',transcription:'shi',translation:'fixture',audioUrl:'https://example.test/שׁ.mp3?token=fixture'});
  const before=clone(raw), normalized=normalizeSourceText(raw);
  assert.equal(normalized.studyMaterials[1].word,normalizeHebrew('שִׁ'));
  assert.equal(normalized.studyMaterials[1].audioUrl,raw.studyMaterials[1].audioUrl);assert.deepEqual(raw,before);
  assert.equal(audit(raw).issues.some(i=>i.code==='TOKENIZED_MEDIA_URL'),true);
  raw.studyMaterials[1].word='\uD800';assert.equal(hasError(raw,'INVALID_UNICODE'),true);
  raw.studyMaterials[1].audioUrl='https://user:password@example.test/a.mp3';assert.equal(hasError(raw,'INVALID_MEDIA_URL'),true);
});

test('private versioned envelopes reject publication, missing lessons or false validity claims', () => {
  const snapshot={schemaVersion:1,normalizationVersion:1,publishedLessonIds:[],courseHubImplemented:false,allLessonContentValid:false,lessons:manifest.letters.map(identity=>({identity,provenance:{sha256:'a'.repeat(64)},publicationStatus:'unpublished-import',structurallyValid:false,blockingIssues:[{code:'fixture'}],sourceNormalized:{},normalizationCandidate:null}))};
  assert.equal(validateReviewSnapshot(snapshot,manifest).lessons.length,22);
  const publish=clone(snapshot);publish.publishedLessonIds=[1];assert.throws(()=>validateReviewSnapshot(publish,manifest));
  const partial=clone(snapshot);partial.lessons.pop();assert.throws(()=>validateReviewSnapshot(partial,manifest));
  const falseApproval=clone(snapshot);falseApproval.allLessonContentValid=true;assert.throws(()=>validateReviewSnapshot(falseApproval,manifest));
});
