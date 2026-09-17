import React, { useRef } from "react";
import {
  ArrowLeft,
  Check,
  Info,
  Lock,
  Map,
  Moon,
  RotateCcw,
  Sun,
  X,
} from "lucide-react";
import * as Survey from "../survey.js";
import { useDialogFocus } from "./useDialogFocus.js";

const chapterFor = (id) =>
  (Survey.CHAPTERS || []).find((chapter) => chapter.id === id);
const statusFor = (q, state) =>
  Survey.questionStatus?.(q, state) ||
  (state.answers?.[q.id]
    ? state.answers[q.id] === "skip"
      ? "Skipped"
      : "Answered"
    : "Open");
const titleFor = (q, state) =>
  Survey.safeTitle?.(q, state) ||
  Survey.interpolate?.(q.title, state) ||
  q.title;

export function ChapterMap({
  open,
  onClose,
  state,
  route = [],
  onVisit,
  onHow,
}) {
  const dialog = useRef(null);
  const close = () => {
    if (dialog.current?.open) dialog.current.close();
    onClose();
  };
  useDialogFocus(dialog, open);
  const training = route.filter((q) => !q.test);
  const chapters = Survey.CHAPTERS || [];
  return (
    <dialog
      ref={dialog}
      className="map-dialog"
      aria-labelledby="map-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <div className="dialog-top">
        <div>
          <span className="eyebrow">Your route through the weird</span>
          <h2 id="map-title">Chapter map</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={close}
          aria-label="Close chapter map"
        >
          <X size={20} />
        </button>
      </div>
      <p className="dialog-lede">
        A few chapters of specific scenes, then eight sealed checks. Context
        changes which scenes belong on your route.
      </p>
      <div className="chapter-list">
        {chapters.map((chapter) => {
          const qs = route.filter(
            (q) => q.chapter === chapter.id && (!q.test || state.locked),
          );
          const resolved = qs.filter(
            (q) => state.answers?.[q.id] !== undefined,
          ).length;
          const locked = !qs.length;
          return (
            <button
              key={chapter.id}
              type="button"
              className={`chapter-row ${locked ? "chapter-row--locked" : ""}`}
              disabled={locked}
              onClick={() => {
                onVisit(qs.find((q) => !state.answers?.[q.id]) || qs[0]);
                close();
              }}
            >
              <span className="chapter-emblem">
                {locked ? (
                  <Lock size={16} />
                ) : resolved === qs.length ? (
                  <Check size={18} />
                ) : (
                  <Map size={15} />
                )}
              </span>
              <span className="chapter-copy">
                <strong>{chapter.title}</strong>
                <small>{chapter.subtitle}</small>
              </span>
              <span className="chapter-count">
                {resolved} of {qs.length} resolved
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="how-link"
        onClick={() => {
          close();
          onHow();
        }}
      >
        <Info size={16} /> How the evidence works
      </button>
    </dialog>
  );
}

export function ReviewDialog({ open, onClose, state, route = [], onVisit }) {
  const dialog = useRef(null);
  const close = () => {
    if (dialog.current?.open) dialog.current.close();
    onClose();
  };
  useDialogFocus(dialog, open);
  return (
    <dialog
      ref={dialog}
      className="map-dialog review-dialog"
      aria-labelledby="review-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div className="dialog-top">
        <div>
          <span className="eyebrow">Private answer trail</span>
          <h2 id="review-title">Review your answers</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={close}
          aria-label="Close review"
        >
          <X size={20} />
        </button>
      </div>
      <p className="dialog-lede">
        Only eligible scenes on this attempt appear here. Sealed checks stay
        read-only after you continue.
      </p>
      <div className="review-list">
        {route.map((q, i) => {
          const value = state.answers?.[q.id];
          const status = statusFor(q, state);
          const readOnly = Boolean(q.test && value);
          return (
            <button
              type="button"
              key={q.id}
              className="review-row"
              onClick={() => {
                if (!value || (q.test && !state.locked)) return;
                onVisit(q);
                close();
              }}
              disabled={!value || (q.test && !state.locked)}
            >
              <span className="review-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>
                  {q.test && !value
                    ? `Sealed check ${i + 1}`
                    : titleFor(q, state)}
                </strong>
                <small>
                  {q.test ? "Sealed check. " : ""}
                  {status}
                </small>
              </span>
              <span className={`review-status ${value ? "is-done" : ""}`}>
                {readOnly ? "read-only" : status.toLowerCase()}
              </span>
            </button>
          );
        })}
      </div>
    </dialog>
  );
}

export function HowDialog({ open, onClose }) {
  const dialog = useRef(null);
  const close = () => {
    if (dialog.current?.open) dialog.current.close();
    onClose();
  };
  useDialogFocus(dialog, open);
  return (
    <dialog
      ref={dialog}
      className="map-dialog how-dialog"
      aria-labelledby="how-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div className="dialog-top">
        <div>
          <span className="eyebrow">Small print, in human language</span>
          <h2 id="how-title">How this works</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={close}
          aria-label="Close how this works"
        >
          <X size={20} />
        </button>
      </div>
      <div className="how-copy">
        <p>
          Answers stay on this device. No account or analytics is required. This
          is a playful local prototype, not a scientific personality assessment.
        </p>
        <div className="how-grid">
          <div>
            <b>56 + 8</b>
            <span>
              Training scenes build a provisional reading. Eight sealed checks
              follow.
            </span>
          </div>
          <div>
            <b>Rule-based</b>
            <span>
              Every category comes from an authored choice. Thin or tied
              evidence abstains.
            </span>
          </div>
          <div>
            <b>Unscored notes</b>
            <span>
              Your optional context helps you remember why you chose something.
              It never changes the reading.
            </span>
          </div>
          <div>
            <b>Context aware</b>
            <span>
              Known irrelevant scenes are left out instead of asking you to
              invent an answer.
            </span>
          </div>
        </div>
        <p className="how-boundary">
          A self-reported bedtime, meal frequency, or movement count stays a
          fact. It is not silently turned into a judgment.
        </p>
      </div>
    </dialog>
  );
}

export function MoreDialog({
  open,
  onClose,
  onHow,
  onReview,
  onExport,
  onMap,
  onSave,
  onReset,
  motionOn,
  setMotionOn,
}) {
  const dialog = useRef(null);
  const close = () => {
    if (dialog.current?.open) dialog.current.close();
    onClose();
  };
  useDialogFocus(dialog, open);
  const action = (fn) => {
    close();
    fn();
  };
  return (
    <dialog
      ref={dialog}
      className="map-dialog more-dialog"
      aria-labelledby="more-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div className="dialog-top">
        <div>
          <span className="eyebrow">Small useful drawer</span>
          <h2 id="more-title">More</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          onClick={close}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>
      <div className="more-actions">
        <button type="button" onClick={() => action(onMap)}>
          <Map size={17} />
          <span>
            <b>Chapter map</b>
            <small>See the eligible scenes on your route</small>
          </span>
        </button>
        <button type="button" onClick={() => action(onHow)}>
          <Info size={17} />
          <span>
            <b>How it works</b>
            <small>Read the local evidence notes</small>
          </span>
        </button>
        <button type="button" onClick={() => action(onReview)}>
          <Check size={17} />
          <span>
            <b>Review answers</b>
            <small>Open choices already committed</small>
          </span>
        </button>
        <button type="button" onClick={() => action(onExport)}>
          <Map size={17} />
          <span>
            <b>Export current answers</b>
            <small>Download a private JSON copy</small>
          </span>
        </button>
        <button type="button" onClick={() => action(onSave)}>
          <ArrowLeft size={17} />
          <span>
            <b>Save and leave</b>
            <small>Return home with this device keeping your place</small>
          </span>
        </button>
        <button type="button" onClick={() => action(onReset)}>
          <RotateCcw size={17} />
          <span>
            <b>Start again</b>
            <small>Clear this attempt after one last check</small>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMotionOn(!motionOn);
            close();
          }}
        >
          <span className="more-icon">
            {motionOn ? <Sun size={17} /> : <Moon size={17} />}
          </span>
          <span>
            <b>{motionOn ? "Motion on" : "Motion off"}</b>
            <small>
              {motionOn
                ? "Turn ambient movement off"
                : "Turn ambient movement on"}
            </small>
          </span>
        </button>
      </div>
    </dialog>
  );
}
