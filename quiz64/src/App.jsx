import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Download,
  Info,
  Menu,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
} from "lucide-react";
import * as Survey from "./survey.js";
import * as Engine from "./engine.js";
import { GeniiStage } from "./components/GeniiStage.jsx";
import { QuestionCard } from "./components/QuestionCard.jsx";
import {
  ChapterMap,
  HowDialog,
  ReviewDialog,
  MoreDialog,
} from "./components/ChapterMap.jsx";
import { EvidenceSummary } from "./components/EvidenceSummary.jsx";
import { useDialogFocus } from "./components/useDialogFocus.js";
import "./styles.css";

const MOTION_KEY = "genii.motion.v1";
const SEEN_KEY = "genii.heldout-seen.v1";
const allQuestions = () => Survey.QUESTIONS || [];
const has = (state, id) =>
  Object.prototype.hasOwnProperty.call(state.answers || {}, id);
const isTraining = (q) => !q?.test;
const questionTitle = (q, state) =>
  Survey.safeTitle?.(q, state) ||
  Survey.interpolate?.(q.title, state) ||
  q.title;

function routeFor(state) {
  const raw =
    Survey.routeQuestionsFor?.(state) || Engine.routeQuestions?.(state);
  const source = Array.isArray(raw)
    ? raw
    : raw?.questions || raw?.route || null;
  const bank = allQuestions();
  if (source)
    return source
      .map((item) =>
        typeof item === "string" ? bank.find((q) => q.id === item) : item,
      )
      .filter(Boolean);
  return bank.filter((q) =>
    q.test
      ? Boolean(state.locked)
      : Survey.applicable
        ? Survey.applicable(q, state)
        : true,
  );
}
function routeIndex(route, id) {
  return route.findIndex((q) => q.id === id);
}
function resolved(route, state) {
  return route.filter((q) => has(state, q.id)).length;
}
function firstOpen(route, state, from = 0, tests = true) {
  return route.findIndex(
    (q, i) => i >= from && (tests || !q.test) && !has(state, q.id),
  );
}

export default function App() {
  const [state, setState] = useState(() => {
    try {
      return Engine.restore(localStorage.getItem(Engine.KEY));
    } catch {
      return Engine.fresh();
    }
  });
  const [screen, setScreen] = useState("landing");
  const [introChapter, setIntroChapter] = useState(1);
  const [draft, setDraft] = useState(null);
  const [note, setNote] = useState("");
  const [otherText, setOtherText] = useState("");
  const [mapOpen, setMapOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [storageOK, setStorageOK] = useState(true);
  const [saveError, setSaveError] = useState("");
  const [motionOn, setMotionOn] = useState(() => {
    try {
      return localStorage.getItem(MOTION_KEY) !== "off";
    } catch {
      return true;
    }
  });
  const route = useMemo(() => routeFor(state), [state]);
  const currentQuestion = screen === "quiz" ? route[state.cursor] : null;
  const currentChapter = currentQuestion
    ? Survey.chapterFor?.(currentQuestion) ||
      (Survey.CHAPTERS || []).find((c) => c.id === currentQuestion.chapter)
    : (Survey.CHAPTERS || []).find((c) => c.id === introChapter);
  const trainingRoute = route.filter(isTraining);
  const trainingDone =
    trainingRoute.length > 0 && trainingRoute.every((q) => has(state, q.id));
  const testDone = route.filter((q) => q.test).every((q) => has(state, q.id));

  const save = (next) => {
    setState(next);
    try {
      localStorage.setItem(Engine.KEY, JSON.stringify(next));
      setStorageOK(true);
    } catch {
      setStorageOK(false);
    }
  };
  const begin = () => {
    if (state.started && resolved(route, state) > 0) return resume();
    const seen =
      state.testSeen ||
      (() => {
        try {
          return localStorage.getItem(SEEN_KEY) === "seen";
        } catch {
          return false;
        }
      })();
    save({ ...Engine.fresh(), started: true, testSeen: seen });
    setIntroChapter(1);
    setScreen("intro");
  };
  const resume = () => {
    const nextIndex = firstOpen(route, state, 0, Boolean(state.locked));
    if (nextIndex < 0) {
      setScreen(state.locked && testDone ? "complete" : "gateway");
      return;
    }
    const q = route[nextIndex];
    if (q.test && !state.locked) {
      setScreen("gateway");
      return;
    }
    setState({ ...state, cursor: nextIndex });
    const firstChapter = route.find(
      (item) => item.chapter === q.chapter && isTraining(item),
    );
    if (q.chapter > 1 && firstChapter && !has(state, firstChapter.id)) {
      setIntroChapter(q.chapter);
      setScreen("intro");
    } else setScreen("quiz");
  };
  const goHome = () => {
    setScreen("landing");
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const openChapter = (q) => {
    if (!q) return;
    if (q.test && !state.locked) {
      setScreen("gateway");
      return;
    }
    const pos = routeIndex(route, q.id);
    if (pos < 0) return;
    setState({ ...state, cursor: pos });
    setScreen("quiz");
  };
  const commit = (value, meta = {}) => {
    if (!currentQuestion) return;
    setSaveError("");
    if (currentQuestion.test && state.answers?.[currentQuestion.id]) {
      const next = { ...state, cursor: state.cursor + 1 };
      save(next);
      if (next.cursor >= route.length || route[next.cursor]?.test === false)
        setScreen(testDone ? "complete" : "quiz");
      else setScreen("quiz");
      return;
    }
    if (currentQuestion.test && !state.locked) {
      setScreen(trainingDone ? "gateway" : "quiz");
      return;
    }
    const before = state.answers?.[currentQuestion.id];
    const context =
      currentQuestion.id === "q01" ||
      currentQuestion.id === "q1" ||
      currentQuestion.id === "q02" ||
      currentQuestion.id === "q2";
    const dependent = context
      ? allQuestions().filter(
          (q) =>
            q.applicable &&
            (q.applicable === "close" || q.applicable === "shared") &&
            has(state, q.id),
        ).length
      : 0;
    const changed =
      before !== value ||
      (meta.note || "") !== (state.notes?.[currentQuestion.id] || "") ||
      (meta.otherText || "") !== (state.other?.[currentQuestion.id] || "");
    if (
      context &&
      changed &&
      dependent &&
      !window.confirm(
        `Changing this context clears ${dependent} dependent answers and any sealed checks. Continue?`,
      )
    )
      return;
    const cloneList = (items) =>
      Array.isArray(items)
        ? items.map((item) => {
            try {
              return structuredClone(item);
            } catch {
              return item;
            }
          })
        : [];
    const next = {
      ...state,
      answers: { ...(state.answers || {}) },
      notes: { ...(state.notes || {}) },
      other: { ...(state.other || {}) },
      bindings: { ...(state.bindings || {}) },
      feedback: cloneList(state.feedback),
      resultHistory: cloneList(state.resultHistory),
    };
    try {
      const result = Engine.setAnswer(next, currentQuestion.id, value, {
        otherText: meta.otherText,
        note: meta.note,
      });
      if (result && typeof result === "object") Object.assign(next, result);
    } catch {
      setSaveError(
        "That answer could not be saved. Please choose again or try exporting your current answers.",
      );
      return;
    }
    if (!currentQuestion.test && state.locked && changed) {
      next.locked = null;
      next.cursor = 0;
    }
    const nextRoute = routeFor(next);
    const currentPos = routeIndex(nextRoute, currentQuestion.id);
    const afterPos = firstOpen(
      nextRoute,
      next,
      Math.max(0, currentPos + 1),
      true,
    );
    const trainingComplete = nextRoute
      .filter(isTraining)
      .every((q) => has(next, q.id));
    if (currentQuestion.test && afterPos < 0) {
      next.started = true;
      save(next);
      setScreen("complete");
      return;
    }
    if (!currentQuestion.test && trainingComplete && !next.locked) {
      next.cursor = nextRoute.findIndex((q) => q.test);
      save(next);
      setScreen("gateway");
      return;
    }
    const targetPos =
      afterPos >= 0 ? afterPos : firstOpen(nextRoute, next, 0, !next.locked);
    if (targetPos < 0) {
      save(next);
      setScreen(next.locked ? "complete" : "gateway");
      return;
    }
    next.cursor = targetPos;
    save(next);
    const upcoming = nextRoute[targetPos];
    if (!upcoming.test && upcoming.chapter !== currentQuestion.chapter) {
      setIntroChapter(upcoming.chapter);
      setScreen("intro");
    } else setScreen("quiz");
  };
  const back = () => {
    if (!currentQuestion) return;
    let pos = Math.max(0, state.cursor - 1);
    while (pos > 0 && !has(state, route[pos].id)) pos -= 1;
    setState({ ...state, cursor: pos });
    setScreen("quiz");
  };
  const seal = () => {
    if (!trainingDone) return resume();
    const next = {
      ...state,
      started: true,
      priorExposure: Boolean(state.testSeen),
      testSeen: true,
    };
    try {
      next.locked = Engine.freeze(next);
    } catch {
      setSaveError(
        "The reading could not be sealed yet. Please finish every scene and try again.",
      );
      return;
    }
    next.cursor = routeFor(next).findIndex((q) => q.test);
    try {
      localStorage.setItem(SEEN_KEY, "seen");
    } catch {}
    save(next);
    setScreen("quiz");
  };
  const reviewClaim = (claim, answer) => {
    let next;
    try {
      next = structuredClone(state);
    } catch {
      next = {
        ...state,
        feedback: Array.isArray(state.feedback) ? [...state.feedback] : [],
      };
    }
    try {
      const result = Engine.reviewClaim?.(next, claim.id, answer);
      if (result) save(result);
      else save(next);
    } catch {
      setSaveError(
        "This review could not be recorded. Your portrait is unchanged.",
      );
    }
  };
  const exportData = () => {
    try {
      const output = Engine.exportAttempt(state);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(
        new Blob([JSON.stringify(output, null, 2)], {
          type: "application/json",
        }),
      );
      link.download = "genii-private-attempt.json";
      link.click();
    } catch {
      setSaveError("Your answers could not be exported yet. Please try again.");
    }
  };
  const reset = () => {
    const seen = Boolean(state.testSeen);
    setResetOpen(false);
    save({ ...Engine.fresh(), testSeen: seen });
    setScreen("landing");
    setIntroChapter(1);
  };

  useEffect(() => {
    document.body.dataset.motion = motionOn ? "on" : "off";
    try {
      localStorage.setItem(MOTION_KEY, motionOn ? "on" : "off");
    } catch {}
  }, [motionOn]);
  useEffect(() => {
    if (screen === "quiz" && currentQuestion) {
      setDraft(state.answers?.[currentQuestion.id] || null);
      setNote(state.notes?.[currentQuestion.id] || "");
      setOtherText(state.other?.[currentQuestion.id] || "");
    }
  }, [screen, currentQuestion?.id]);

  return (
    <MotionConfig reducedMotion={motionOn ? "user" : "always"}>
      <div className="app-shell">
        <Header
          state={state}
          storageOK={storageOK}
          onHome={goHome}
          onMap={() => setMapOpen(true)}
          onMore={() => setMoreOpen(true)}
          motionOn={motionOn}
          setMotionOn={setMotionOn}
        />
        {!storageOK && (
          <div className="storage-banner" role="status">
            Saving unavailable. Keep this tab open or export your answers.
          </div>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {screen === "landing" && (
            <Landing
              key="landing"
              state={state}
              onBegin={begin}
              onHow={() => setHowOpen(true)}
            />
          )}
          {screen === "intro" && currentChapter && (
            <Interlude
              key={`intro-${currentChapter.id}`}
              chapter={currentChapter}
              state={state}
              route={route}
              onContinue={() => {
                const pos = firstOpen(route, state, 0, false);
                setState({ ...state, cursor: pos >= 0 ? pos : state.cursor });
                setScreen("quiz");
              }}
              onSave={goHome}
            />
          )}
          {screen === "gateway" && (
            <Gateway
              key="gateway"
              state={state}
              trainingDone={trainingDone}
              onSeal={seal}
              onSave={goHome}
              onReview={() => setReviewOpen(true)}
              error={saveError}
            />
          )}
          {screen === "quiz" && currentQuestion && (
            <QuizView
              key={currentQuestion.id}
              q={currentQuestion}
              chapter={currentChapter}
              state={state}
              route={route}
              draft={draft}
              setDraft={setDraft}
              note={note}
              setNote={setNote}
              otherText={otherText}
              setOtherText={setOtherText}
              onContinue={commit}
              onBack={state.cursor > 0 ? back : null}
              onSkip={commit}
              readOnly={Boolean(
                currentQuestion.test && state.answers?.[currentQuestion.id],
              )}
              storageOK={storageOK}
              error={saveError}
            />
          )}
          {screen === "complete" && (
            <EvidenceSummary
              key="complete"
              state={{ ...state, _stats: Engine.stats?.(state) }}
              onExport={exportData}
              onReview={() => setReviewOpen(true)}
              onReset={() => setResetOpen(true)}
              onReviewClaim={reviewClaim}
              error={saveError}
            />
          )}
        </AnimatePresence>
        <ChapterMap
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          state={state}
          route={route}
          onVisit={openChapter}
          onHow={() => setHowOpen(true)}
        />
        <ReviewDialog
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          state={state}
          route={route}
          onVisit={openChapter}
        />
        <MoreDialog
          open={moreOpen}
          onClose={() => setMoreOpen(false)}
          onHow={() => setHowOpen(true)}
          onReview={() => setReviewOpen(true)}
          onExport={exportData}
          onMap={() => setMapOpen(true)}
          onSave={goHome}
          onReset={() => setResetOpen(true)}
          motionOn={motionOn}
          setMotionOn={setMotionOn}
        />
        <HowDialog open={howOpen} onClose={() => setHowOpen(false)} />
        <ResetDialog
          open={resetOpen}
          onClose={() => setResetOpen(false)}
          onConfirm={reset}
        />
      </div>
    </MotionConfig>
  );
}

function Header({
  state,
  storageOK,
  onHome,
  onMap,
  onMore,
  motionOn,
  setMotionOn,
}) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="brand-button"
        onClick={onHome}
        aria-label="Return to Genii home"
      >
        <img
          src={Survey.asset?.("mirrormii-wordmark.svg")}
          width="265"
          height="43"
          alt="MirrorMii"
        />
      </button>
      <div className="header-trail">
        <span className="genii-chip">
          <Sparkles size={13} /> Genii
        </span>
        {state.started && storageOK && (
          <span className="header-saved">
            {Object.keys(state.answers || {}).length} responses saved
          </span>
        )}
      </div>
      <nav className="site-nav" aria-label="Survey navigation">
        <button type="button" className="nav-button" onClick={onMap}>
          Chapter map
        </button>
        <button type="button" className="nav-button" onClick={onHome}>
          Save and leave
        </button>
        <button
          type="button"
          className="motion-button"
          onClick={() => setMotionOn(!motionOn)}
          aria-pressed={motionOn}
        >
          {motionOn ? <Sun size={16} /> : <Moon size={16} />}{" "}
          <span>{motionOn ? "Motion on" : "Motion off"}</span>
        </button>
        <button
          type="button"
          className="nav-button nav-button--more"
          onClick={onMore}
        >
          <Menu size={16} /> More
        </button>
      </nav>
      <button
        type="button"
        className="menu-button"
        aria-label="Open more menu"
        onClick={onMore}
      >
        <Menu size={21} />
      </button>
    </header>
  );
}

function Landing({ state, onBegin, onHow }) {
  const hasProgress =
    state.started && Object.keys(state.answers || {}).length > 0;
  return (
    <motion.main
      className="landing-page page-enter"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="landing-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            A conversation with oddly specific questions
          </span>
          <h1>
            Let’s get
            <br />
            <em>oddly specific.</em>
          </h1>
          <p className="hero-promise">
            A playful reading of your patterns, feelings, and routines. You
            choose what fits.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="button button--primary button--large"
              onClick={onBegin}
            >
              {hasProgress ? "Resume conversation" : "Meet Genii"}{" "}
              <ArrowRight size={19} />
            </button>
            {hasProgress && (
              <span className="resume-count">Your place is saved here</span>
            )}
          </div>
        </div>
        <div className="landing-stage">
          <GeniiStage
            mood="curious"
            bubble="Be yourself. I’ll make it specific."
          />
          <span className="stage-charm charm-heart">
            <img
              src={Survey.asset?.("badge-mood.png")}
              width="240"
              height="240"
              alt=""
            />
          </span>
          <span className="stage-charm charm-spark">
            <img
              src={Survey.asset?.("badge-radiant.png")}
              width="240"
              height="240"
              alt=""
            />
          </span>
        </div>
      </section>
      <ChapterJourney />
      <section className="landing-foot">
        <button type="button" className="how-button" onClick={onHow}>
          <span className="how-mark">
            <BookOpen size={17} />
          </span>
          <span>
            <strong>How this stays thoughtful</strong>
            <small>
              Your answers stay on this device. Notes are never scored.
            </small>
          </span>
          <ArrowRight size={16} />
        </button>
      </section>
    </motion.main>
  );
}
function ChapterJourney() {
  return (
    <section className="chapter-journey" aria-label="Conversation details">
      <div className="journey-intro">
        <strong>Bring the real version of you.</strong>
        <small>
          Patterns, feelings, and routines get room to be complicated.
        </small>
      </div>
      <div className="journey-fact">
        <b>64</b>
        <span>specific scenes</span>
      </div>
      <div className="journey-fact">
        <b>8</b>
        <span>chapters to wander through</span>
      </div>
      <div className="journey-fact">
        <b>Other or Skip</b>
        <span>keeps the answer honest</span>
      </div>
      <div className="journey-fact">
        <b>Save</b>
        <span>then resume whenever you like</span>
      </div>
    </section>
  );
}
function Interlude({ chapter, state, route, onContinue, onSave }) {
  const heading = useRef(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [chapter.id]);
  const count = Survey.chapterCount?.(state, chapter.id) || {};
  const dots =
    count.total || route.filter((q) => q.chapter === chapter.id).length;
  return (
    <motion.main
      className="interlude-page page-enter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="interlude-art">
        <div className="interlude-ring" />
        <GeniiStage
          mood={chapter.id % 2 ? "attentive" : "curious"}
          bubble="I’m taking notes. Tiny ones."
        />
      </div>
      <div className="interlude-copy">
        <span className="chapter-kicker">
          {chapter.kicker || chapter.title}
        </span>
        <h1 ref={heading} tabIndex="-1">
          {chapter.title}
        </h1>
        <p>{chapter.subtitle}</p>
        <div className="interlude-progress">
          <span>
            <b>{count.resolved || 0}</b> scenes resolved in this chapter
          </span>
          <div>
            {Array.from({ length: dots }, (_, i) => (
              <i
                className={i < (count.resolved || 0) ? "filled" : ""}
                key={i}
              />
            ))}
          </div>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary button--large"
            onClick={onContinue}
          >
            Keep going <ArrowRight size={19} />
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onSave}
          >
            Save and leave
          </button>
        </div>
      </div>
    </motion.main>
  );
}
function QuizView({
  q,
  chapter,
  state,
  route,
  draft,
  setDraft,
  note,
  setNote,
  otherText,
  setOtherText,
  onContinue,
  onBack,
  onSkip,
  readOnly,
  storageOK,
  error,
}) {
  const chapterQs = route.filter((item) => item.chapter === chapter?.id);
  const chapterResolved = resolved(chapterQs, state);
  const totalResolved = resolved(route, state);
  const sceneNumber = Math.max(
    1,
    chapterQs.findIndex((item) => item.id === q.id) + 1,
  );
  return (
    <motion.main
      className="quiz-page page-enter"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="quiz-topline">
        <div>
          <span className="eyebrow">{chapter?.title || "Your route"}</span>
          <strong>
            {q.test
              ? "A sealed check"
              : `Scene ${sceneNumber} of ${chapterQs.length || 8}`}
          </strong>
        </div>
        <span className="quiz-count">{totalResolved} resolved</span>
      </div>
      <div
        className="progress-rail"
        role="progressbar"
        aria-label="Conversation progress"
        aria-valuemin="0"
        aria-valuemax={route.length || 64}
        aria-valuenow={totalResolved}
      >
        <span
          style={{
            width: `${route.length ? (totalResolved / route.length) * 100 : 0}%`,
          }}
        />
      </div>
      <div className="quiz-layout">
        <QuestionCard
          q={q}
          state={state}
          draft={draft}
          setDraft={setDraft}
          note={note}
          setNote={setNote}
          otherText={otherText}
          setOtherText={setOtherText}
          onContinue={onContinue}
          onBack={onBack}
          onSkip={onSkip}
          readOnly={readOnly}
          saving={storageOK}
          error={error}
        />
        <aside className="quiz-guide">
          <GeniiStage
            mood={
              q.test
                ? "skeptical"
                : q.role === "actual" || q.meta?.evidence === "actual_event"
                  ? "attentive"
                  : "curious"
            }
            compact
            bubble={
              q.test
                ? "No peeking. I sealed the envelope."
                : "One answer. Then we keep going."
            }
            chapter={chapter?.id}
            progress={
              chapterQs.length ? (chapterResolved / chapterQs.length) * 100 : 0
            }
          />
          <div className="guide-copy">
            <span className="eyebrow">The route</span>
            <p>
              <b>{totalResolved}</b> responses resolved
            </p>
            <small>Each scene on this route adds a little more context.</small>
          </div>
        </aside>
      </div>
    </motion.main>
  );
}
function Gateway({ state, trainingDone, onSeal, onSave, onReview, error }) {
  const heading = useRef(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  const practice = state.testSeen;
  return (
    <motion.main
      className="gateway-page page-enter"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="gateway-symbol">
        <span>08</span>
        <div className="gateway-orbit" />
      </div>
      <div className="gateway-copy">
        <span className="eyebrow">The first reading is ready</span>
        <h1 ref={heading} tabIndex="-1">
          One last
          <br />
          <em>plot twist.</em>
        </h1>
        <p>
          {practice
            ? "You have seen these checks before. This attempt is practice, with the same careful reading rules."
            : "Genii will seal eight guesses now. You will meet new situations afterward, and the reading will stay frozen while you answer."}
        </p>
        <div className="freeze-note">
          <b>What gets frozen?</b>
          <span>
            Your evidence, context facts, and predictions. Test answers are
            read-only after Continue. Thin evidence can abstain.
          </span>
        </div>
        {error && (
          <p className="save-error" role="alert">
            {error}
          </p>
        )}
        <div className="hero-actions">
          <button
            type="button"
            className="button button--primary button--large"
            onClick={onSeal}
            disabled={!trainingDone}
          >
            Seal guesses and continue <ArrowRight size={19} />
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={onReview}
          >
            Review answers
          </button>
          <button
            type="button"
            className="button button--quiet"
            onClick={onSave}
          >
            Save and leave
          </button>
        </div>
        <small className="boundary-note">
          These are internally authored checks, not proof of scientific
          accuracy.
        </small>
      </div>
    </motion.main>
  );
}
function ResetDialog({ open, onClose, onConfirm }) {
  const dialog = useRef(null);
  useDialogFocus(dialog, open);
  return (
    <dialog
      className="reset-dialog"
      ref={dialog}
      aria-labelledby="reset-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <span className="eyebrow">A clean page</span>
      <h2 id="reset-title">Start another attempt?</h2>
      <p>
        This clears only this quiz from this browser. Export first if you want
        to keep this attempt.
      </p>
      <div className="dialog-actions">
        <button
          type="button"
          className="button button--quiet"
          onClick={onClose}
        >
          Keep this attempt
        </button>
        <button
          type="button"
          className="button button--primary"
          onClick={onConfirm}
        >
          Start again
        </button>
      </div>
    </dialog>
  );
}
