import { QUESTIONS, CHAPTERS, DIMS, VERSION } from './data.js';
import { facts, applicable as isApplicable, selected, label } from './engine.js';

export const chapterFor = (q) => CHAPTERS.find((c) => c.id === q.chapter) || CHAPTERS[0];
export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;
export const questionIndex = (id) => QUESTIONS.findIndex((q) => q.id === id);
export const isResolved = (state, q) => Object.prototype.hasOwnProperty.call(state.answers || {}, q.id);
export const trainingQuestions = QUESTIONS.filter((q) => !q.test);
export const testQuestions = QUESTIONS.filter((q) => q.test);
export const resolvedTraining = (state) => trainingQuestions.filter((q) => isResolved(state, q)).length;
export const resolvedTests = (state) => testQuestions.filter((q) => isResolved(state, q)).length;
export const nextOpenIndex = (state, from = 0, includeTests = false) => {
  const bank = includeTests ? QUESTIONS : trainingQuestions;
  const open = bank.find((q) => !isResolved(state, q));
  return open ? questionIndex(open.id) : (includeTests ? QUESTIONS.length : trainingQuestions.length);
};
export const personLabel = (state) => {
  const close = facts(state.answers || {}).close;
  if (!close || close === 'none' || close === 'unspecified') return 'the person you have in mind';
  if (close === 'friend' || close === 'chosen friend') return 'your close friend';
  return `your ${close}`;
};
export const interpolate = (value, state) => String(value || '').replaceAll('{close}', personLabel(state));
export const applicable = (q, state) => {
  try { return isApplicable(q, state.answers || {}); } catch { return true; }
};
export const questionStatus = (q, state) => !applicable(q, state) ? 'inapplicable' : state.answers?.[q.id] === 'skip' ? 'skipped' : isResolved(state, q) ? 'answered' : 'open';
export const chapterCount = (state, chapterId) => {
  const qs = QUESTIONS.filter((q) => q.chapter === chapterId);
  return { resolved: qs.filter((q) => isResolved(state, q)).length, answered: qs.filter((q) => isResolved(state, q) && state.answers[q.id] !== 'skip').length, skipped: qs.filter((q) => state.answers?.[q.id] === 'skip').length, total: qs.length };
};
export const safeTitle = (q, state) => interpolate(q.title, state);
export const optionText = (option, state) => interpolate(option.text, state);
export { QUESTIONS, CHAPTERS, DIMS, VERSION, facts, selected, label };
