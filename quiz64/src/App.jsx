import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowRight, BookOpen, Download, Flower2, Map, Menu, Moon, RotateCcw, Sparkles, Sun, Volume2 } from 'lucide-react';
import { CHAPTERS, QUESTIONS, chapterFor, chapterCount, facts, nextOpenIndex, questionIndex, resolvedTests, resolvedTraining, asset } from './survey.js';
import { KEY, fresh, freeze, stats, setAnswer, restore, exportAttempt as makeExport } from './engine.js';
import { GeniiStage } from './components/GeniiStage.jsx';
import { QuestionCard } from './components/QuestionCard.jsx';
import { ChapterMap, HowDialog, ReviewDialog, MoreDialog } from './components/ChapterMap.jsx';
import { EvidenceSummary } from './components/EvidenceSummary.jsx';
import './styles.css';

const MOTION_KEY = 'genii.motion.v1';
const SEEN_KEY = 'genii.heldout-seen.v1';

export default function App() {
  const [state, setState] = useState(() => {
    try { return restore(localStorage.getItem(KEY)); } catch { return fresh(); }
  });
  const [screen, setScreen] = useState('landing');
  const [introChapter, setIntroChapter] = useState(1);
  const [draft, setDraft] = useState(null);
  const [note, setNote] = useState('');
  const [mapOpen, setMapOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [storageOK, setStorageOK] = useState(true);
  const [motionOn, setMotionOn] = useState(() => { try { return localStorage.getItem(MOTION_KEY) !== 'off'; } catch { return true; } });
  const previousScreen = useRef('landing');

  const currentQuestion = screen === 'quiz' ? QUESTIONS[state.cursor] : null;
  const currentChapter = currentQuestion ? chapterFor(currentQuestion) : CHAPTERS.find((c) => c.id === introChapter) || CHAPTERS[0];
  const trainingDone = resolvedTraining(state) === QUESTIONS.filter((q) => !q.test).length;
  const testDone = resolvedTests(state) === QUESTIONS.filter((q) => q.test).length;
  const save = (next) => {
    setState(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); setStorageOK(true); } catch { setStorageOK(false); }
  };
  const replaceState = (updater) => { const next = typeof updater === 'function' ? updater(state) : updater; save(next); };

  useEffect(() => { document.body.dataset.motion = motionOn ? 'on' : 'off'; try { localStorage.setItem(MOTION_KEY, motionOn ? 'on' : 'off'); } catch {} }, [motionOn]);
  useEffect(() => { if (state.started && state.cursor >= QUESTIONS.length && testDone) setScreen('complete'); }, [state.started, state.cursor, testDone]);
  useEffect(() => { if (screen === 'quiz' && currentQuestion) { setDraft(state.answers?.[currentQuestion.id] || null); setNote(state.notes?.[currentQuestion.id] || ''); } }, [screen, currentQuestion?.id]);

  const goHome = () => { previousScreen.current = screen; setScreen('landing'); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const firstOpen = (includeTests = false) => nextOpenIndex(state, 0, includeTests);
  const startFreshly = () => { setIntroChapter(1); setScreen('intro'); replaceState({ ...fresh(), started: true, testSeen: state.testSeen || (() => { try { return localStorage.getItem(SEEN_KEY) === 'seen'; } catch { return false; } })() }); };
  const resume = () => {
    const index = firstOpen(Boolean(state.locked));
    if (index >= QUESTIONS.length) { setScreen('complete'); return; }
    const q = QUESTIONS[index];
    if (q.test && !state.locked) { setScreen('gateway'); return; }
    setState({ ...state, cursor: index });
    if (q.chapter > 1 && !state.answers?.[QUESTIONS.find((x) => x.chapter === q.chapter)?.id]) { setIntroChapter(q.chapter); setScreen('intro'); } else setScreen('quiz');
  };
  const begin = () => { if (state.started && (resolvedTraining(state) > 0 || resolvedTests(state) > 0)) resume(); else startFreshly(); };
  const openChapter = (q) => {
    if (q?.chapter === 8) { if (!state.locked) { setScreen('gateway'); return; } const heldout = QUESTIONS.find((x) => x.test); if (heldout) { setState({ ...state, cursor: questionIndex(heldout.id) }); setScreen('quiz'); } return; }
    if (!q) return;
    const chapterQuestions = QUESTIONS.filter((x) => x.chapter === q.chapter && !x.test);
    const target = chapterQuestions.find((x) => !Object.prototype.hasOwnProperty.call(state.answers || {}, x.id)) || chapterQuestions[0];
    setState({ ...state, cursor: questionIndex(target.id) }); setDraft(state.answers?.[target.id] || null); setScreen('quiz');
  };
  const commit = (value) => {
    if (!currentQuestion) return;
    if (currentQuestion.test && !state.locked) { if (trainingDoneFor(state)) setScreen('gateway'); else { const repaired = { ...state, cursor: nextOpenIndex(state, 0, false) }; setState(repaired); setScreen('quiz'); } return; }
    const hadSealedTests = Boolean(state.locked) || resolvedTests(state) > 0;
    const contextClose = currentQuestion.id === 'q01' || currentQuestion.id === 'q1';
    const contextHousehold = currentQuestion.id === 'q02' || currentQuestion.id === 'q2';
    const dependentCount = (contextClose ? QUESTIONS.filter((q) => q.applicable === 'close') : contextHousehold ? QUESTIONS.filter((q) => q.applicable === 'shared') : []).filter((q) => Object.prototype.hasOwnProperty.call(state.answers || {}, q.id)).length;
    if (!currentQuestion.test && state.answers?.[currentQuestion.id] !== value) {
      const message = dependentCount ? `Changing this context clears ${dependentCount} earlier answer${dependentCount === 1 ? '' : 's'} that depend${dependentCount === 1 ? 's' : ''} on it${hadSealedTests ? ' and the sealed checks' : ''}. Continue?` : hadSealedTests ? 'Changing this training answer clears the sealed checks so the reading can be rebuilt. Continue?' : null;
      if (message && !window.confirm(message)) return;
    }
    const next = { ...state, answers: { ...(state.answers || {}) }, notes: { ...(state.notes || {}) } };
    if (note) next.notes[currentQuestion.id] = note; else delete next.notes[currentQuestion.id];
    try { setAnswer(next, currentQuestion.id, value); } catch { return; }
    const nextIndex = state.cursor + 1;
    const invalidated = (hadSealedTests || dependentCount > 0) && !currentQuestion.test && !next.locked;
    next.cursor = invalidated ? nextOpenIndex(next, 0, false) : nextIndex;
    if (currentQuestion.test && nextIndex >= QUESTIONS.length) { next.started = true; save(next); setScreen('complete'); return; }
    save(next);
    if (!currentQuestion.test && next.cursor >= QUESTIONS.findIndex((q) => q.test) && !trainingDoneFor(next)) { const repaired = { ...next, cursor: nextOpenIndex(next, 0, false) }; save(repaired); setScreen('quiz'); return; }
    if (!currentQuestion.test && next.cursor >= QUESTIONS.findIndex((q) => q.test) && trainingDoneFor(next)) { setScreen('gateway'); return; }
    const upcoming = QUESTIONS[nextIndex];
    if (upcoming && upcoming.chapter !== currentQuestion.chapter && !upcoming.test) { setIntroChapter(upcoming.chapter); setScreen('intro'); } else setScreen('quiz');
  };
  const skip = () => commit('skip');
  const advanceReadonly = () => {
    if (!currentQuestion?.test || !state.answers?.[currentQuestion.id]) return;
    const next = { ...state, cursor: state.cursor + 1 };
    save(next);
    if (next.cursor >= QUESTIONS.length) setScreen('complete'); else setScreen('quiz');
  };
  const back = () => {
    if (!currentQuestion || state.cursor <= 0) return;
    let i = state.cursor - 1;
    while (i > 0 && !state.answers?.[QUESTIONS[i].id]) i -= 1;
    setState({ ...state, cursor: i }); setScreen('quiz');
  };
  const seal = () => {
    if (!trainingDone) { resume(); return; }
    const next = { ...state, testSeen: true, cursor: QUESTIONS.findIndex((q) => q.test), started: true };
    try { next.locked = freeze(state.answers); } catch { setStorageOK(false); return; }
    next.testSeen = true; try { localStorage.setItem(SEEN_KEY, 'seen'); } catch {}
    save(next); setScreen('quiz');
  };
  const exportData = () => {
    try {
      const output = makeExport(state);
      const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'genii-private-attempt.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setStorageOK(false); }
  };
  const reset = () => { setResetOpen(false); let seen = state.testSeen; try { seen = seen || localStorage.getItem(SEEN_KEY) === 'seen'; } catch {} save({ ...fresh(), started: false, testSeen: seen }); setScreen('landing'); setIntroChapter(1); };
  const completionState = useMemo(() => ({ ...state, _stats: stats(state) }), [state]);

  return <MotionConfig reducedMotion={motionOn ? 'user' : 'always'}>
    <div className="app-shell">
      <Header state={state} screen={screen} onHome={goHome} onMap={() => setMapOpen(true)} onHow={() => setHowOpen(true)} onMore={() => setMoreOpen(true)} motionOn={motionOn} setMotionOn={setMotionOn} onReset={() => setResetOpen(true)} onReview={() => setReviewOpen(true)} onExport={exportData} />
      {!storageOK && <div className="storage-banner" role="status">Browser saving is unavailable. Keep this tab open or export your answers.</div>}
      <AnimatePresence mode="wait" initial={false}>
        {screen === 'landing' && <Landing key="landing" state={state} onBegin={begin} onHow={() => setHowOpen(true)} />}
        {screen === 'intro' && <Interlude key={`intro-${introChapter}`} chapter={CHAPTERS.find((c) => c.id === introChapter) || CHAPTERS[0]} state={state} onContinue={() => { const first = QUESTIONS.find((q) => q.chapter === introChapter && !Object.prototype.hasOwnProperty.call(state.answers || {}, q.id)); setState({ ...state, cursor: first ? questionIndex(first.id) : state.cursor }); setScreen('quiz'); }} onSave={goHome} />}
        {screen === 'gateway' && <Gateway key="gateway" state={state} onSeal={seal} onSave={goHome} onReview={() => setReviewOpen(true)} />}
        {screen === 'quiz' && currentQuestion && <QuizView key={currentQuestion.id} q={currentQuestion} chapter={currentChapter} state={state} draft={draft} setDraft={setDraft} note={note} setNote={setNote} onContinue={() => currentQuestion.test && state.answers?.[currentQuestion.id] ? advanceReadonly() : commit(draft)} onBack={state.cursor > 0 ? back : null} onSkip={skip} readOnly={Boolean(currentQuestion.test && state.answers?.[currentQuestion.id])} storageOK={storageOK} onReview={() => setReviewOpen(true)} onExport={exportData} onSave={goHome} />}
        {screen === 'complete' && <EvidenceSummary key="complete" state={completionState} onExport={exportData} onReview={() => setReviewOpen(true)} onReset={() => setResetOpen(true)} />}
      </AnimatePresence>
      <ChapterMap open={mapOpen} onClose={() => setMapOpen(false)} state={state} onVisit={openChapter} onHow={() => setHowOpen(true)} />
      <ReviewDialog open={reviewOpen} onClose={() => setReviewOpen(false)} state={state} onVisit={(q) => { if (q.test && !state.answers?.[q.id]) return; if (!q.test && questionIndex(q.id) >= QUESTIONS.findIndex((x) => x.test) && !state.locked) { setScreen(trainingDoneFor(state) ? 'gateway' : 'quiz'); if (!trainingDoneFor(state)) setState({ ...state, cursor: nextOpenIndex(state, 0, false) }); return; } const next = { ...state, cursor: questionIndex(q.id) }; setState(next); setScreen('quiz'); }} />
      <MoreDialog open={moreOpen} onClose={() => setMoreOpen(false)} onHow={() => setHowOpen(true)} onReview={() => setReviewOpen(true)} onExport={exportData} onMap={() => setMapOpen(true)} onSave={goHome} onReset={() => setResetOpen(true)} motionOn={motionOn} setMotionOn={setMotionOn} />
      <HowDialog open={howOpen} onClose={() => setHowOpen(false)} />
      <ResetDialog open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={reset} />
    </div>
  </MotionConfig>;
}

function Header({ state, screen, onHome, onMap, onHow, onMore, motionOn, setMotionOn }) {
  return <header className="site-header"><button type="button" className="brand-button" onClick={onHome} aria-label="Return to Genii home"><img src={asset('mirrormii-wordmark.svg')} alt="MirrorMii" /></button><div className="header-trail"><span className="genii-chip"><Sparkles size={13} /> Genii / 64</span>{state.started && <span className="header-saved">{resolvedTraining(state) + resolvedTests(state)} of 64 steps resolved</span>}</div><nav className="site-nav" aria-label="Survey navigation"><button type="button" className="nav-button" onClick={onMap}><Map size={16} /> <span>Chapter map</span></button><button type="button" className="nav-button" onClick={onHome}>Save &amp; leave</button><button type="button" className="motion-button" onClick={() => setMotionOn(!motionOn)} aria-pressed={motionOn} aria-label={motionOn ? 'Turn motion off' : 'Turn motion on'}>{motionOn ? <Sun size={16} /> : <Moon size={16} />} <span>{motionOn ? 'Motion on' : 'Motion off'}</span></button><button type="button" className="nav-button nav-button--more" onClick={onMore}><Menu size={16} /> <span>More</span></button></nav><button type="button" className="menu-button" aria-label="Open more menu" onClick={onMore}><Menu size={21} /></button></header>;
}

function trainingDoneFor(state) { return QUESTIONS.filter((q) => !q.test).every((q) => Object.prototype.hasOwnProperty.call(state.answers || {}, q.id)); }

function Landing({ state, onBegin, onHow }) {
  const hasProgress = state.started && (resolvedTraining(state) || resolvedTests(state));
  return <motion.main className="landing-page page-enter" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
    <section className="landing-hero"><div className="hero-copy"><span className="eyebrow">A personality side quest</span><h1>You have layers.<br /><em>Genii has questions.</em></h1><p className="hero-promise">A few oddly specific choices. A little friendly overthinking. Let’s see what makes you, you.</p><div className="hero-actions"><button type="button" className="button button--primary button--large" onClick={onBegin}>{hasProgress ? 'Resume my conversation' : 'Meet your Genii'} <ArrowRight size={19} /></button>{hasProgress && <span className="resume-count">{resolvedTraining(state) + resolvedTests(state)} of 64 resolved</span>}</div><div className="hero-meta"><span>64 questions</span><i /> <span>8 chapters</span><i /> <span>Save &amp; come back</span></div></div><div className="landing-stage"><GeniiStage mood="curious" bubble="Be yourself. I’ll make it weird." /><span className="stage-charm charm-heart"><img src={asset('badge-mood.png')} alt="" /></span><span className="stage-charm charm-spark"><img src={asset('badge-radiant.png')} alt="" /></span></div></section>
    <ChapterJourney state={state} />
    <section className="landing-foot"><button type="button" className="how-button" onClick={onHow}><span className="how-mark"><BookOpen size={17} /></span><span><strong>How this stays thoughtful</strong><small>Your answers stay on this device. Notes are never scored.</small></span><ArrowRight size={16} /></button><div className="lockup-wrap"><img src={asset('mirrormii-lockup.png')} alt="MirrorMii" /></div></section>
  </motion.main>;
}

function ChapterJourney({ state }) {
  return <section className="chapter-journey" aria-label="Eight chapter journey"><div className="journey-line" />{CHAPTERS.map((chapter) => { const count = chapterCount(state, chapter.id); return <div className={`journey-stop ${count.resolved ? 'journey-stop--visited' : ''}`} key={chapter.id}><span>{String(chapter.id).padStart(2, '0')}</span><strong>Chapter {chapter.id}</strong><small>{count.resolved ? `${count.resolved} resolved` : '8 questions'}</small></div>; })}</section>;
}

function Interlude({ chapter, state, onContinue, onSave }) {
  const count = chapterCount(state, chapter.id);
  return <motion.main className="interlude-page page-enter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}><div className="interlude-art"><div className="interlude-ring" /><GeniiStage mood={chapter.id % 2 ? 'attentive' : 'curious'} bubble={chapter.id === 1 ? 'I’m taking notes. Very tiny ones.' : 'The plot thickens politely.'} compact={false} /></div><div className="interlude-copy"><span className="chapter-kicker">Chapter {chapter.id} / 8</span><h1>{chapter.title}</h1><p>{chapter.subtitle}</p><div className="interlude-progress"><span><b>{count.resolved}</b> of 8 resolved here</span><div>{Array.from({ length: 8 }, (_, i) => <i className={i < count.resolved ? 'filled' : ''} key={i} />)}</div></div><div className="hero-actions"><button type="button" className="button button--primary button--large" onClick={onContinue}>Keep going <ArrowRight size={19} /></button><button type="button" className="button button--secondary" onClick={onSave}>Save &amp; leave</button></div></div></motion.main>;
}

function QuizView({ q, chapter, state, draft, setDraft, note, setNote, onContinue, onBack, onSkip, readOnly, storageOK }) {
  const resolved = QUESTIONS.filter((x) => Object.prototype.hasOwnProperty.call(state.answers || {}, x.id)).length; const number = QUESTIONS.findIndex((x) => x.id === q.id) + 1; const chapterProgress = chapterCount(state, chapter.id); const progress = chapterProgress.total ? (chapterProgress.resolved / chapterProgress.total) * 100 : 0;
  return <motion.main className="quiz-page page-enter" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .2 }}><div className="quiz-topline"><div><span className="eyebrow">Chapter {chapter.id} / 8</span><strong>{chapter.title}</strong></div><span className="quiz-count">Question {number} / 64</span></div><div className="progress-rail" role="progressbar" aria-label={`Question ${number} of 64`} aria-valuemin="1" aria-valuemax="64" aria-valuenow={number}><span style={{ width: `${(number / 64) * 100}%` }} /></div><div className="quiz-layout"><QuestionCard q={q} state={state} draft={draft} setDraft={setDraft} note={note} setNote={setNote} onContinue={onContinue} onBack={onBack} onSkip={onSkip} readOnly={readOnly} saving={storageOK} /><aside className="quiz-guide"><GeniiStage mood={q.test ? 'skeptical' : q.role === 'actual' ? 'attentive' : 'curious'} compact bubble={q.test ? 'No peeking. I sealed the envelope.' : 'One answer. Then we keep going.'} chapter={chapter.id} progress={progress} /><div className="guide-copy"><span className="eyebrow">The route</span><p><b>{resolved}</b> of 64 steps complete</p><small>{q.test ? 'Your prediction is already sealed.' : 'Skipped and inapplicable count as complete.'}</small></div></aside></div></motion.main>;
}

function Gateway({ state, onSeal, onSave, onReview }) {
  const resolved = resolvedTraining(state);
  const practice = state.testSeen;
  return <motion.main className="gateway-page page-enter" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .35 }}><div className="gateway-symbol"><span>08</span><div className="gateway-orbit" /></div><div className="gateway-copy"><span className="eyebrow">56 of 56 training slots resolved</span><h1>One last<br /><em>plot twist.</em></h1><p>{practice ? 'You’ve seen these checks before. This attempt is practice, with the same careful reading rules.' : 'Genii is sealing eight guesses now. You’ll meet eight new situations afterward, and the reading won’t change while you answer them.'}</p><div className="freeze-note"><b>What gets frozen?</b><span>Your evidence, context facts, and predictions. Test answers are read-only after Continue. Thin evidence can abstain.</span></div><div className="hero-actions"><button type="button" className="button button--primary button--large" onClick={onSeal}>Seal guesses &amp; continue <ArrowRight size={19} /></button><button type="button" className="button button--secondary" onClick={onReview}>Review training</button><button type="button" className="button button--quiet" onClick={onSave}>Save &amp; leave</button></div><small className="boundary-note">These are internally authored checks, not proof of scientific accuracy.</small></div></motion.main>;
}

function ResetDialog({ open, onClose, onConfirm }) {
  const dialog = useRef(null);
  useEffect(() => { if (open) dialog.current?.showModal(); else if (dialog.current?.open) dialog.current.close(); }, [open]);
  return <dialog className="reset-dialog" ref={dialog} aria-labelledby="reset-title" onCancel={(e) => { e.preventDefault(); onClose(); }}><span className="eyebrow">A clean page</span><h2 id="reset-title">Start another attempt?</h2><p>This clears only this quiz from this browser. Export first if you want to keep this attempt. Questions you’ve seen before will be practice on the next attempt.</p><div className="dialog-actions"><button type="button" className="button button--quiet" onClick={onClose}>Keep this attempt</button><button type="button" className="button button--primary" onClick={onConfirm}>Start again</button></div></dialog>;
}
