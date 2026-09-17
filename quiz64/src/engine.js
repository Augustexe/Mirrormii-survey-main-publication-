import {QUESTIONS, DIMS, VERSION} from './data.js';

export const KEY = 'genii.evidence64.v1';
const TRAINING = QUESTIONS.filter(q => !q.test);
const TESTS = QUESTIONS.filter(q => q.test);
const QUESTION_BY_ID = new Map(QUESTIONS.map(q => [q.id, q]));
const CLOSE_VALUES = new Set(['mother', 'father', 'partner', 'friend', 'none']);
const HOUSEHOLD_VALUES = new Set(['alone', 'shared', 'family', 'unspecified']);

export function fresh() {
  return {
    version: VERSION, answers: {}, notes: {}, cursor: 0, started: false,
    locked: null, reviewed: false, testSeen: false, bindings: {}
  };
}

export function selected(question, answers = {}) {
  if (!question || !answers || answers[question.id] === 'skip') return undefined;
  return question.options.find(option => option.id === answers[question.id]);
}

export function facts(answers = {}) {
  const output = {};
  for (const question of TRAINING) {
    const value = selected(question, answers)?.facts;
    if (value && typeof value === 'object') Object.assign(output, value);
  }
  return output;
}

export function targetName(target, fact = {}) {
  if (target === 'close') return `chosen ${fact.close || 'close person'}`;
  if (target === 'household') return `household (${fact.household || 'unspecified'})`;
  return target || 'general';
}

export function applicable(question, answers = {}) {
  if (!question) return false;
  const f = facts(answers);
  if (question.applicable === 'close') return CLOSE_VALUES.has(f.close) && f.close !== 'none';
  if (question.applicable === 'shared') return f.household === 'shared' || f.household === 'family';
  return true;
}

function contextKey(answers = {}) {
  const f = facts(answers);
  return {close: f.close || null, household: f.household || null};
}

function bindingFor(question, answers) {
  if (question.applicable === 'close') return {close: contextKey(answers).close};
  if (question.applicable === 'shared') return {household: contextKey(answers).household};
  return undefined;
}

function isValidValue(question, value) {
  return value === 'skip' || question.options.some(option => option.id === value);
}

function tagKey(t, f) {
  return `${t.d}|${targetName(t.target, f)}|${t.v}`;
}

export function evidence(answers = {}) {
  const f = facts(answers);
  const rows = [];
  for (const question of TRAINING) {
    if (!applicable(question, answers)) continue;
    const answer = selected(question, answers);
    if (!answer) continue;
    const seen = new Set();
    for (const t of answer.tags || []) {
      const key = tagKey(t, f);
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({
        d: t.d, v: t.v, target: targetName(t.target, f), question: question.id,
        questionTitle: question.title, answer: answer.text, why: answer.why,
        role: question.role
      });
    }
  }
  return rows;
}

export function profile(answers = {}) {
  const groups = new Map();
  for (const row of evidence(answers)) {
    const key = `${row.d}|${row.target}`;
    const group = groups.get(key) || {d: row.d, target: row.target, counts: {}, rows: []};
    group.counts[row.v] = (group.counts[row.v] || 0) + 1;
    group.rows.push(row);
    groups.set(key, group);
  }
  return [...groups.values()].map(group => {
    const ranked = Object.entries(group.counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const n = new Set(group.rows.map(row => row.question)).size;
    const total = group.rows.length;
    const top = ranked[0]?.[0] || null;
    const ratio = ranked[0] ? ranked[0][1] / total : 0;
    const contradictory = ranked.slice(1).map(([value, count]) => ({value, count}));
    let status = 'Missing evidence';
    if (n > 0 && n < 2) status = 'Thin evidence';
    else if (n >= 2 && ratio < 2 / 3) status = 'Mixed evidence';
    else if (n >= 2) status = 'Repeated pattern';
    return {
      d: group.d, target: group.target, counts: group.counts, rows: group.rows,
      n, top: status === 'Repeated pattern' ? top : null, ratio,
      contradictory, status
    };
  });
}

export function trainingAnswers(answers = {}) {
  const output = {};
  for (const question of TRAINING) {
    if (Object.hasOwn(answers, question.id) && isValidValue(question, answers[question.id])) {
      output[question.id] = answers[question.id];
    }
  }
  return output;
}

export function signature(answers = {}) {
  return JSON.stringify(TRAINING.map(question => [question.id, answers[question.id] ?? null]));
}

function authoredDomain(d) {
  return new Set(QUESTIONS.flatMap(question => question.options.flatMap(option =>
    (option.tags || []).filter(t => t.d === d).map(t => t.v))));
}

export function predict(question, answers = {}) {
  if (!question || !question.test) throw new Error('predict requires a heldout question');
  const rows = evidence(answers);
  const f = facts(answers);
  const scored = question.options.map(option => {
    const seen = new Set();
    const parts = [];
    for (const t of option.tags || []) {
      const resolved = targetName(t.target, f);
      const key = `${t.d}|${resolved}|${t.v}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const relevant = rows.filter(row => row.d === t.d && row.target === resolved);
      const matching = relevant.filter(row => row.v === t.v);
      const domainSize = Math.max(1, authoredDomain(t.d).size);
      // Laplace-style smoothing is a ranking heuristic, not a probability.
      const score = relevant.length ? (matching.length + 1) / (relevant.length + domainSize) : 0;
      parts.push({
        d: t.d, target: resolved, value: t.v, score,
        sources: [...new Set(matching.map(row => row.question))],
        relevantSources: [...new Set(relevant.map(row => row.question))]
      });
    }
    const score = parts.length ? parts.reduce((sum, part) => sum + part.score, 0) / parts.length : 0;
    return {id: option.id, score, parts};
  }).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const winner = scored[0];
  const runner = scored[1];
  const winnerSources = new Set(winner?.parts.flatMap(part => part.sources) || []);
  const tied = !!runner && Math.abs(winner.score - runner.score) < 0.025;
  const enough = winnerSources.size >= 2;
  const reason = !enough
    ? 'Too few distinct matching source questions supporting the leading option'
    : tied ? 'No clear lead between options' : 'Highest exact evidence match';
  return {
    question: question.id, option: enough && !tied ? winner.id : null, reason,
    sources: [...winnerSources], scores: scored, baseline: question.baseline,
    heuristic: 'Smoothed evidence ranking; scores are not probabilities.'
  };
}

function normalizedTraining(answers = {}) {
  const source = answers && answers.answers ? answers.answers : answers;
  if (!source || typeof source !== 'object' || Array.isArray(source)) throw new Error('Answers must be an object');
  const output = {};
  for (const question of TRAINING) {
    const value = source[question.id];
    if (value === undefined && !applicable(question, source)) {
      output[question.id] = 'skip';
      continue;
    }
    if (value === undefined) throw new Error(`Incomplete training answer: ${question.id}`);
    if (!isValidValue(question, value)) throw new Error(`Invalid answer: ${question.id}`);
    output[question.id] = applicable(question, source) ? value : 'skip';
  }
  return output;
}

export function freeze(answers) {
  const training = normalizedTraining(answers);
  return {
    version: VERSION, signature: signature(training), training,
    profile: profile(training), facts: facts(training),
    predictions: TESTS.map(question => predict(question, training))
  };
}

export function stats(state) {
  if (!state?.locked) return null;
  const trials = TESTS.map(question => {
    const prediction = state.locked.predictions.find(item => item.question === question.id) || predict(question, state.locked.training);
    const rawAnswer = state.answers?.[question.id];
    const answer = selected(question, state.answers);
    const usable = answer && applicable(question, state.answers);
    const skipped = rawAnswer === 'skip' || (rawAnswer !== undefined && !applicable(question, state.answers));
    return {
      ...prediction, actual: usable ? answer.id : null, skipped, unresolved: rawAnswer === undefined,
      hit: !!usable && prediction.option === answer.id,
      baselineHit: !!usable && prediction.baseline === answer.id
    };
  });
  const attempted = trials.filter(trial => !trial.skipped);
  const predicted = attempted.filter(trial => trial.option);
  return {
    trials, answered: attempted.length, skipped: trials.filter(trial => trial.skipped).length,
    unresolved: trials.filter(trial => trial.unresolved).length,
    predicted: predicted.length, abstained: attempted.length - predicted.length,
    hits: predicted.filter(trial => trial.hit).length,
    baselineHits: predicted.filter(trial => trial.baselineHit).length,
    baselineAll: attempted.filter(trial => trial.baselineHit).length
  };
}

function clearTests(state) {
  for (const question of TESTS) {
    delete state.answers[question.id];
    delete state.notes[question.id];
    delete state.bindings[question.id];
  }
  state.locked = null;
}

function clearDependents(state, kind) {
  for (const question of QUESTIONS) {
    if (question.applicable !== kind) continue;
    delete state.answers[question.id];
    delete state.notes[question.id];
    delete state.bindings[question.id];
  }
}

function preserveInapplicableSkips(state, kind) {
  for (const question of QUESTIONS) {
    if (question.applicable !== kind || state.answers[question.id] === undefined) continue;
    if (state.answers[question.id] === 'skip') {
      delete state.bindings[question.id];
    } else {
      delete state.answers[question.id];
      delete state.notes[question.id];
      delete state.bindings[question.id];
    }
  }
}

export function setAnswer(state, id, value) {
  if (!state || !state.answers || !state.notes || !state.bindings) throw new Error('Invalid state');
  const question = QUESTION_BY_ID.get(id);
  if (!question || !isValidValue(question, value)) throw new Error('Invalid answer');
  const prior = state.answers[id];
  const changed = prior !== value;
  if (question.applicable && !applicable(question, state.answers)) value = 'skip';
  if (question.test) {
    if (!state.locked) throw new Error('Predictions must be locked first');
    if (Object.hasOwn(state.answers, id)) throw new Error('Test answers are final for this attempt');
  }
  if (!question.test && changed) {
    if (state.testSeen) state.reviewed = true;
    clearTests(state);
    if (id === 'q01') clearDependents(state, 'close');
    if (id === 'q02') clearDependents(state, 'shared');
  }
  state.answers[id] = question.applicable && !applicable(question, state.answers) ? 'skip' : value;
  if (question.applicable) {
    const binding = bindingFor(question, state.answers);
    if (binding) state.bindings[id] = binding;
    else delete state.bindings[id];
  }
  const index = QUESTIONS.findIndex(item => item.id === id);
  if (index >= 0) state.cursor = Math.max(0, Math.min(64, index + 1));
  state.started = true;
  return state;
}

function validSnapshotObject(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.version !== VERSION) return false;
  if (raw.answers !== undefined && (typeof raw.answers !== 'object' || Array.isArray(raw.answers))) return false;
  for (const id of Object.keys(raw.answers || {})) {
    const question = QUESTION_BY_ID.get(id);
    if (!question || !isValidValue(question, raw.answers[id])) return false;
  }
  return true;
}

export function restore(raw) {
  let parsed;
  try { parsed = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return fresh(); }
  if (!validSnapshotObject(parsed)) return fresh();
  const state = fresh();
  state.started = parsed.started === true;
  state.cursor = Number.isInteger(parsed.cursor) ? Math.max(0, Math.min(64, parsed.cursor)) : 0;
  state.testSeen = parsed.testSeen === true;
  state.reviewed = parsed.reviewed === true;
  const rawAnswers = parsed.answers || {};
  for (const question of QUESTIONS) {
    if (Object.hasOwn(rawAnswers, question.id)) state.answers[question.id] = rawAnswers[question.id];
  }
  const rawBindings = parsed.bindings && typeof parsed.bindings === 'object' ? parsed.bindings : {};
  const f = facts(state.answers);
  for (const question of QUESTIONS) {
    if (!Object.hasOwn(state.answers, question.id)) continue;
    if (question.applicable && !applicable(question, state.answers)) {
      state.answers[question.id] = 'skip';
      continue;
    }
    if (question.applicable) {
      if (state.answers[question.id] === 'skip') {
        delete state.bindings[question.id];
        continue;
      }
      const expected = bindingFor(question, state.answers);
      const actual = rawBindings[question.id];
      // A binding from a prior close person/household is evidence that the answer
      // belongs to the old context. Drop it rather than silently relabelling it.
      if (!actual || actual.close !== expected?.close || actual.household !== expected?.household) {
        delete state.answers[question.id];
        delete state.notes[question.id];
        continue;
      }
      state.bindings[question.id] = expected;
    }
  }
  if (!CLOSE_VALUES.has(f.close) || f.close === 'none') preserveInapplicableSkips(state, 'close');
  if (f.household !== 'shared' && f.household !== 'family') preserveInapplicableSkips(state, 'shared');
  if (parsed.notes && typeof parsed.notes === 'object' && !Array.isArray(parsed.notes)) {
    for (const [id, note] of Object.entries(parsed.notes)) {
      if (Object.hasOwn(state.answers, id) && typeof note === 'string') state.notes[id] = note.slice(0, 1200);
    }
  }
  const complete = TRAINING.every(question => Object.hasOwn(state.answers, question.id));
  if (complete && parsed.locked && parsed.locked.signature === signature(state.answers)) {
    state.locked = freeze(state.answers);
    for (const question of TESTS) {
      if (Object.hasOwn(state.answers, question.id) && !applicable(question, state.answers)) state.answers[question.id] = 'skip';
    }
  } else {
    clearTests(state);
    state.cursor = Math.min(state.cursor, 56);
  }
  return state;
}

export function label(value, dimension) {
  const dimensionLabels = {
    D14a: {early: 'Earlier sleep rhythm', middle: 'Middle sleep rhythm', late: 'Later sleep rhythm', variable: 'Variable sleep rhythm', protect: 'Protect sleep', delay: 'Delay sleep', adjust: 'Adjust the sleep plan'},
    D14b: {home: 'Eat from home', occasional: 'Occasional takeaway', frequent: 'Frequent takeaway', default: 'Takeaway as the default', responsive: 'Respond to immediate hunger', planned: 'Follow the meal plan', bounded: 'Adapt within a food boundary', delay: 'Delay eating'},
    D14c: {none: 'No movement days', occasional: 'Occasional movement', regular: 'Regular movement', frequent: 'Frequent movement', planned: 'Planned movement', adjust: 'Adjust the movement plan', skip: 'Skip the movement plan'},
    D14d: {rest: 'Prioritize recovery', obligation: 'Prioritize obligations', connection: 'Recover through connection', distraction: 'Use distraction to recover', bounded: 'Make recovery manageable'}
  };
  if (dimensionLabels[dimension]?.[value]) return dimensionLabels[dimension][value];
  return ({
    plan: 'Plan before acting', improvise: 'Act, then adjust', security: 'Protect the budget',
    enjoyment: 'Pay for enjoyment', convenience: 'Pay for convenience', status: 'Value recognizable status',
    direct: 'Direct action', soften: 'A softer opening', avoid: 'Leave it unaddressed', pause: 'Explicit pause',
    hint: 'Unspoken dissatisfaction', support: 'Seek connection or support', private: 'Process privately',
    selective: 'Choose another support person', secure: 'Benign interpretation', worry: 'Seek reassurance',
    reassurance: 'Question the relationship or message', repair: 'Own it and discuss repair', explain: 'Apologize with context',
    action: 'Repair through action', exit: 'Leave the situation', proportional: 'Match contributions to costs',
    absorb: 'Carry the extra cost', limit: 'State a capacity limit', novel: 'Try something new',
    conditional: 'Investigate or add conditions', familiar: 'Choose the familiar', people: 'Attend to people first',
    task: 'Attend to the task first', self: 'Protect personal capacity', autonomy: 'Prioritize own choice',
    duty: 'Give weight to family expectations', noncompetitive: 'Connect despite comparison', comparison: 'Limit painful comparison',
    competitive: 'Turn comparison into action', recognition: 'Value recognition', act: 'Choose immediate relief',
    wait: 'Pause before acting', coordinate: 'Coordinate help', bounded: 'Offer bounded help', rest: 'Prioritize recovery',
    obligation: 'Prioritize obligations', connection: 'Recover through connection', distraction: 'Use distraction to recover',
    freedom: 'Protect freedom and time', consult: 'Consult before replanning', stop: 'Stop the plan', uncertain: 'Hold uncertainty',
    early: 'Earlier sleep rhythm', middle: 'Middle sleep rhythm', late: 'Later sleep rhythm', variable: 'Variable sleep rhythm',
    responsive: 'Respond to immediate hunger', home: 'Eat from home', occasional: 'Occasional takeaway', frequent: 'Frequent takeaway',
    default: 'Takeaway as the default', planned: 'Follow the meal plan', delay: 'Delay eating', none: 'No movement days',
    regular: 'Regular movement', brand: 'Brand-led spending'
  })[value] || value;
}

export function identity(groups = []) {
  const repeated = groups.filter(group => group.status === 'Repeated pattern');
  if (!repeated.length) return {title: 'Still getting to know you', line: 'There is not enough repeated evidence for a strong headline yet.'};
  const dimensions = [...new Set(repeated.map(group => group.d))];
  return {
    title: 'A pattern in progress',
    line: `Repeated evidence appears across ${dimensions.length} dimension${dimensions.length === 1 ? '' : 's'}; the context and contradictions stay visible.`
  };
}

export function exportAttempt(state) {
  const locked = state?.locked;
  const resolved = !!locked && TESTS.every(question => Object.hasOwn(state.answers || {}, question.id));
  const safeAnswers = Object.fromEntries(Object.entries(state?.answers || {}).filter(([id, value]) => QUESTION_BY_ID.has(id) && isValidValue(QUESTION_BY_ID.get(id), value)));
  const safeBindings = Object.fromEntries(Object.entries(state?.bindings || {}).filter(([id, binding]) => QUESTION_BY_ID.has(id) && binding && typeof binding === 'object').map(([id, binding]) => [id, {...binding}]));
  const base = {
    version: VERSION, engine: KEY, facts: locked?.facts || facts(state?.answers || {}),
    evidence: evidence(state?.answers || {}), profile: locked?.profile || profile(state?.answers || {}),
    answers: safeAnswers, trainingAnswers: trainingAnswers(safeAnswers), testAnswers: Object.fromEntries(TESTS.map(question => [question.id, safeAnswers[question.id] ?? null])),
    bindings: safeBindings, attempt: {started: state?.started === true, testSeen: state?.testSeen === true, reviewed: state?.reviewed === true},
    notes: Object.fromEntries(Object.entries(state?.notes || {}).filter(([, value]) => typeof value === 'string').map(([id, value]) => [id, value.slice(0, 1200)])),
    provenance: {source: 'local frozen training evidence', trainingQuestions: 56, heldoutQuestions: 8, scoring: 'exact dimension and resolved target; internal check'},
    disclaimer: 'This is a local survey evidence summary, not a diagnosis or a probability claim.'
  };
  if (!locked) return {...base, heldoutsResolved: false, predictions: null, unscoredNotes: ['Training is incomplete or has not been frozen.']};
  if (!resolved) {
    return {
      ...base, heldoutsResolved: false,
      predictions: TESTS.map(question => ({question: question.id, title: question.title, status: 'hidden until every heldout is answered or skipped'})),
      unscoredNotes: ['Heldout options and scores remain hidden until all eight terminal questions are resolved.']
    };
  }
  return {
    ...base, heldoutsResolved: true,
    predictions: locked.predictions.map(prediction => ({question: prediction.question, option: prediction.option, reason: prediction.reason, sources: prediction.sources, scores: prediction.scores})),
    stats: stats(state), unscoredNotes: ['The baseline is an internally authored comparison, not blind independent validation.']
  };
}
