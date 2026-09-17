import React, { useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  SkipForward,
} from "lucide-react";
import { applicable, optionText, safeTitle, interpolate } from "../survey.js";

export function QuestionCard({
  q,
  state,
  draft,
  setDraft,
  note,
  setNote,
  otherText = "",
  setOtherText,
  onContinue,
  onBack,
  onSkip,
  readOnly = false,
  saving = true,
  error = "",
}) {
  const heading = useRef(null);
  const qApplicable = applicable(q, state);
  const committed = state.answers?.[q.id];
  const committedOther = state.other?.[q.id] || "";
  const committedNote = state.notes?.[q.id] || "";
  const hasUnsaved =
    draft !== (committed || null) ||
    (note || "") !== committedNote ||
    (otherText || "") !== committedOther;
  const actual = q.role === "actual";
  const selectedOption = useMemo(
    () => q.options?.find((option) => option.id === draft),
    [q.options, draft],
  );

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [q.id]);

  const choose = (id) => {
    if (!readOnly && !(q.test && committed)) setDraft(id);
  };
  const continueWith = () => {
    if (readOnly) return onContinue();
    onContinue(draft, {
      otherText: draft === "other" ? String(otherText || "").trim() : undefined,
      note: note || "",
    });
  };
  const responseOptions = [
    ...(q.options || []),
    { id: "other", text: "Something else. I would put it in my own words." },
  ];

  return (
    <article
      className={`question-card ${readOnly ? "question-card--readonly" : ""}`}
    >
      <div className="question-head">
        <div>
          <span className="eyebrow">
            {q.test
              ? "Sealed check"
              : q.meta?.evidence === "self_report" || q.role === "context"
                ? "A direct check-in"
                : q.meta?.evidence === "actual_event" || actual
                  ? "A real-life check"
                  : "Imagine this"}
          </span>
          <h1 ref={heading} tabIndex="-1">
            {safeTitle(q, state)}
          </h1>
          {q.setup && (
            <p className="question-setup">{interpolate(q.setup, state)}</p>
          )}
        </div>
      </div>
      <fieldset
        className="answer-list"
        disabled={readOnly || (q.test && Boolean(committed))}
      >
        <legend className="sr-only">Choose one answer</legend>
        {responseOptions.map((o, i) => (
          <label
            key={o.id}
            className={`answer-option ${draft === o.id ? "answer-option--selected" : ""}`}
          >
            <input
              type="radio"
              name={q.id}
              value={o.id}
              checked={draft === o.id}
              onChange={() => choose(o.id)}
            />
            <span className="answer-token">
              {o.id === "other" ? "✦" : String.fromCharCode(65 + i)}
            </span>
            <span className="answer-copy">{optionText(o, state)}</span>
            <Check
              className="answer-check"
              size={18}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </label>
        ))}
      </fieldset>
      {draft === "other" && qApplicable && !readOnly && (
        <div className="other-field">
          <label htmlFor={`other-${q.id}`}>
            <MessageCircle size={15} aria-hidden="true" /> In your own words
          </label>
          <textarea
            id={`other-${q.id}`}
            value={otherText}
            maxLength={1200}
            onChange={(e) => setOtherText?.(e.target.value)}
            placeholder="A short answer is perfect."
          />
          <small>{(otherText || "").length}/1200. Saved unscored.</small>
        </div>
      )}
      {selectedOption?.reaction && draft !== "other" && (
        <div className="host-reaction" role="status">
          <MessageCircle size={15} aria-hidden="true" />
          <span>{interpolate(selectedOption.reaction, state)}</span>
        </div>
      )}
      <details className="context-details">
        <summary>
          <ChevronDown size={16} aria-hidden="true" /> Add context{" "}
          <span>Optional. Saved with your answer, never scored.</span>
        </summary>
        <textarea
          value={note || ""}
          maxLength={1200}
          onChange={(e) => setNote(e.target.value)}
          disabled={readOnly || (q.test && Boolean(committed))}
          placeholder="A small footnote for future you..."
          aria-label="Optional context note"
        />
        <small>{(note || "").length}/1200</small>
      </details>
      {qApplicable && actual && !readOnly && (
        <button
          type="button"
          className="none-fit"
          onClick={() => onContinue("no_example", { note: note || "" })}
        >
          No example to use <span>unscored</span>
        </button>
      )}
      <div className="question-actions">
        <button
          type="button"
          className="button button--quiet"
          onClick={onBack}
          disabled={!onBack}
        >
          <ArrowLeft size={17} aria-hidden="true" /> Back
        </button>
        <div className="actions-right">
          {!readOnly && (
            <button
              type="button"
              className="button button--quiet"
              onClick={() => onSkip("skip", { note: note || "" })}
            >
              <SkipForward size={16} aria-hidden="true" /> Skip
            </button>
          )}
          <button
            type="button"
            className="button button--primary"
            onClick={continueWith}
            disabled={readOnly ? false : qApplicable ? !draft : false}
          >
            {q.test && committed ? "Next check" : "Continue"}{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="save-hint" role="status">
        <span
          className={`save-dot ${saving && committed && !hasUnsaved ? "save-dot--on" : ""}`}
        />{" "}
        {!saving
          ? "Saving unavailable"
          : hasUnsaved
            ? "Unsaved changes. Continue to save"
            : committed
              ? "Saved on this device"
              : "Saves when you continue"}{" "}
        {q.test
          ? ". This check is read-only after Continue."
          : ". You can revisit this answer later."}
      </p>
      {error && (
        <p className="save-error" role="alert">
          {error}
        </p>
      )}
    </article>
  );
}
