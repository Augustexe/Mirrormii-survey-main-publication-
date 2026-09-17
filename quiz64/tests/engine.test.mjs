import test from 'node:test';
import assert from 'node:assert/strict';
import {QUESTIONS, DIMS, VERSION, CHAPTERS} from '../src/data.js';
import {
  KEY, fresh, selected, facts, applicable, evidence, profile, trainingAnswers,
  signature, predict, freeze, stats, setAnswer, restore, exportAttempt
} from '../src/engine.js';

const training = QUESTIONS.filter(q => !q.test);
const heldouts = QUESTIONS.filter(q => q.test);
function filled(close = 'c', household = 'b') {
  const state = fresh();
  setAnswer(state, 'q01', close);
  setAnswer(state, 'q02', household);
  for (const q of training) if (!Object.hasOwn(state.answers, q.id)) setAnswer(state, q.id, q.options[0].id);
  return state;
}

test('bank has 64 valid questions, chapters, roles, tags and facts', () => {
  assert.equal(VERSION, 'genii-64.v1');
  assert.equal(QUESTIONS.length, 64);
  assert.equal(new Set(QUESTIONS.map(q => q.id)).size, 64);
  assert.deepEqual(QUESTIONS.slice(0, 56).map(q => q.test), Array(56).fill(false));
  assert.deepEqual(QUESTIONS.slice(56).map(q => q.test), Array(8).fill(true));
  assert.deepEqual(CHAPTERS.map(c => c.id), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(QUESTIONS.slice(0, 56).map(q => q.chapter), [...Array(7)].flatMap((_, i) => Array(8).fill(i + 1)));
  for (const q of QUESTIONS) {
    assert.ok(q.id && q.title && q.setup);
    assert.ok(['context', 'hypothetical', 'actual', 'holdout'].includes(q.role));
    assert.equal(q.options.length >= 4, true);
    q.options.forEach((o, i) => {
      assert.equal(o.id, String.fromCharCode(97 + i));
      assert.ok(o.text && typeof o.why === 'string');
      for (const tag of o.tags) assert.ok(DIMS[tag.d], `${q.id} has unknown ${tag.d}`);
    });
    if (q.test) assert.ok(q.baseline && q.options.some(o => o.id === q.baseline));
  }
});

test('each dimension has two independent training questions and selected-close coverage', () => {
  for (const d of Object.keys(DIMS)) {
    const ids = new Set(training.flatMap(q => q.options.flatMap(o => o.tags.filter(t => t.d === d).map(() => q.id))));
    assert.ok(ids.size >= 2, `${d} has ${ids.size} opportunities`);
  }
  const closeCounts = Object.fromEntries(['D5', 'D6', 'D7', 'D8'].map(d => [d, 0]));
  for (const q of training) for (const o of q.options) for (const t of o.tags) if (t.target === 'close' && closeCounts[t.d] !== undefined) closeCounts[t.d]++;
  for (const [d, count] of Object.entries(closeCounts)) assert.ok(count >= 2, `${d} selected close has ${count}`);
  assert.equal(new Set(training.filter(q => q.chapter === 1 && q.role === 'actual').map(q => q.id)).size >= 1, true);
  for (let chapter = 1; chapter <= 7; chapter++) assert.ok(training.some(q => q.chapter === chapter && q.role === 'actual'));
});

test('facts and applicability keep contexts separate', () => {
  const s = filled('a', 'a');
  assert.equal(facts(s.answers).close, 'mother');
  assert.equal(facts(s.answers).household, 'alone');
  assert.equal(applicable(QUESTIONS.find(q => q.id === 'q18'), s.answers), true);
  assert.equal(applicable(QUESTIONS.find(q => q.id === 'q15'), s.answers), false);
  setAnswer(s, 'q18', 'a');
  assert.equal(evidence(s.answers).some(r => r.question === 'q18'), true);
  assert.equal(evidence(s.answers).some(r => r.target === 'household (alone)'), false);
  assert.equal(evidence(s.answers).some(r => r.target === 'chosen mother'), true);
});

test('skips are missing evidence and actual never happened is not inferred', () => {
  const s = fresh();
  setAnswer(s, 'q01', 'e');
  setAnswer(s, 'q02', 'd');
  for (const q of training) if (!Object.hasOwn(s.answers, q.id)) setAnswer(s, q.id, 'skip');
  assert.deepEqual(evidence(s.answers), []);
  assert.ok(profile(s.answers).every(g => g.status !== 'Repeated pattern'));
  assert.throws(() => freeze({q01: 'e', q02: 'd'}), /Incomplete/);
});

test('matching-source threshold rejects smoothing and accepts two exact source questions', () => {
  const q57 = QUESTIONS.find(q => q.id === 'q57');
  const one = predict(q57, {q01: 'c', q02: 'b', q04: 'a'});
  assert.equal(one.option, null);
  const two = predict(q57, {q01: 'c', q02: 'b', q04: 'a', q12: 'a'});
  assert.equal(two.option, 'a');
  assert.ok(two.sources.length >= 2);
  assert.ok(two.scores.every(score => score.parts.every(part => part.sources.every(id => id !== 'q57'))));
});

test('target separation prevents group-friend evidence from supporting selected close', () => {
  const s = filled('d', 'b');
  const rows = evidence(s.answers);
  assert.ok(rows.some(r => r.target === 'chosen friend'));
  assert.ok(rows.some(r => r.target === 'friend'));
  const q58 = QUESTIONS.find(q => q.id === 'q58');
  const p = predict(q58, s.answers);
  assert.ok(!p.sources.includes('q07'));
});

test('freeze requires all training slots, reconstructs predictions, and tests are immutable', () => {
  const s = filled();
  s.locked = freeze(s.answers);
  assert.equal(s.locked.predictions.length, 8);
  const before = JSON.stringify(s.locked);
  setAnswer(s, 'q57', 'skip');
  assert.equal(JSON.stringify(s.locked), before);
  assert.throws(() => setAnswer(s, 'q57', 'a'));
  assert.equal(stats(s).skipped, 1);
  assert.equal(stats(s).unresolved, 7);
});

test('training edits clear heldouts and frozen snapshot while preserving practice review flags', () => {
  const s = filled();
  s.locked = freeze(s.answers);
  setAnswer(s, 'q57', 'skip');
  s.testSeen = true;
  setAnswer(s, 'q03', 'b');
  assert.equal(s.locked, null);
  assert.equal(s.answers.q57, undefined);
  assert.equal(s.reviewed, true);
  assert.equal(s.testSeen, true);
});

test('context changes clear dependent answers and notes, including away and back', () => {
  const s = filled('c', 'b');
  setAnswer(s, 'q18', 'a'); s.notes.q18 = 'safe note';
  setAnswer(s, 'q15', 'a'); s.notes.q15 = 'house note';
  setAnswer(s, 'q01', 'e');
  setAnswer(s, 'q02', 'a');
  assert.equal(s.answers.q18, undefined); assert.equal(s.notes.q18, undefined);
  assert.equal(s.answers.q15, undefined); assert.equal(s.notes.q15, undefined);
  setAnswer(s, 'q01', 'c'); setAnswer(s, 'q02', 'b');
  assert.equal(s.answers.q18, undefined); assert.equal(s.answers.q15, undefined);
});

test('restore rejects tampering and drops mismatched context bindings', () => {
  const s = filled();
  setAnswer(s, 'q18', 'a');
  s.locked = freeze(s.answers);
  const tampered = JSON.parse(JSON.stringify(s));
  tampered.locked.predictions[0].option = 'fake';
  const restored = restore(tampered);
  assert.notEqual(restored.locked.predictions[0].option, 'fake');
  const changed = JSON.parse(JSON.stringify(s));
  changed.answers.q01 = 'a';
  assert.equal(restore(changed).answers.q18, undefined);
  assert.deepEqual(restore({...changed, answers: {...changed.answers, q18: 'wat'}}), fresh());
  assert.deepEqual(restore('broken'), fresh());
});

test('none and solo completed attempts preserve normalized inapplicable skips through restore', () => {
  const s = filled('e', 'a');
  s.locked = freeze(s.answers);
  for (const q of heldouts) setAnswer(s, q.id, 'skip');
  const r = restore(JSON.stringify(s));
  assert.equal(r.answers.q18, 'skip');
  assert.equal(r.answers.q15, 'skip');
  assert.ok(r.locked);
  assert.equal(stats(r).skipped, 8);
});

test('stats separates skips, abstentions and same-subset baseline', () => {
  const s = filled(); s.locked = freeze(s.answers);
  for (const q of heldouts) setAnswer(s, q.id, 'skip');
  const zero = stats(s);
  assert.equal(zero.answered, 0); assert.equal(zero.skipped, 8); assert.equal(zero.predicted, 0);
  assert.equal(zero.hits, 0); assert.equal(zero.baselineAll, 0);
});

test('export includes private answers/evidence and hides all prediction scores until terminal', () => {
  const s = filled(); s.locked = freeze(s.answers);
  setAnswer(s, 'q57', 'skip');
  const partial = exportAttempt(s);
  assert.equal(partial.heldoutsResolved, false);
  assert.equal(partial.predictions[0].option, undefined);
  assert.equal(partial.predictions[0].scores, undefined);
  assert.ok(partial.answers.q01 && partial.trainingAnswers.q01);
  for (const q of heldouts.slice(1)) setAnswer(s, q.id, 'skip');
  const full = exportAttempt(s);
  assert.equal(full.heldoutsResolved, true);
  assert.ok('scores' in full.predictions[0]);
  assert.equal(full.provenance.heldoutQuestions, 8);
});
