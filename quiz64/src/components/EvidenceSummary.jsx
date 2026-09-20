import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfigContext, useReducedMotion } from "motion/react";
import {
  Check,
  ChevronDown,
  Download,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { PortraitIcon } from "./PortraitIcon.jsx";
import { GeniiStage } from "./GeniiStage.jsx";
import * as Survey from "../survey.js";
import * as Engine from "../engine.js";

const titleFor = (q, state) =>
  Survey.safeTitle?.(q, state) ||
  Survey.interpolate?.(q?.title, state) ||
  q?.title ||
  "";

const exitLabels = {
  skip: "Skipped",
  prefer_not: "Prefer not to answer",
  no_recent_example: "No recent example",
  no_example: "No example",
  other_unscored: "Other / depends",
  other: "Other",
  abstain: "Abstained",
  not_enough_experience: "Not enough experience",
};

const optionFor = (q, id, state) => {
  if (Array.isArray(id)) return id.map((value) => optionFor(q, value, state)).join(", ");
  if (exitLabels[id]) return exitLabels[id];
  if (!id) return "Unanswered";
  const option = q?.options?.find((item) => item.id === id);
  const exit = q?.exits?.find((item) => item.id === id);
  if (!option && !exit) return "Unanswered";
  return Survey.optionText?.(option || exit, state) || option?.text || exit?.text || "Unanswered";
};

const windowLabels = {
  current: "Current preference",
  latest_instance_past_month: "Recent recalled example",
  scenario: "Authored scenario",
  post_freeze_scenario: "Post-freeze sealed check",
};

const roleLabels = {
  actual_event: "Recalled example",
  hypothetical: "Authored scenario",
  self_report: "Direct self-report",
  self_description: "Self description",
  context: "Context",
  heldout: "Sealed check",
};

const receiptMeta = (row, hasQuestion) =>
  [
    roleLabels[row.role] || "Source",
    windowLabels[row.window] || "Recorded window",
    row.target ? `Target: ${row.target}` : null,
    row.time ? `Time: ${row.time}` : null,
    row.cost ? `Cost: ${row.cost}` : null,
    !hasQuestion && (row.questionId || row.question) ? row.questionId || row.question : null,
  ]
    .filter(Boolean)
    .join(" · ");

function fallbackPortrait(state) {
  const groups = Engine.profile?.(state.answers || {}) || [];
  return {
    id: "portrait:fallback",
    title: "Still Mysterious, With One Sharp Edge",
    titleLead: "Still Mysterious",
    titleEmphasis: "Unknown",
    summary: "You gave Genii a glint, not a whole museum.",
    thesis:
      "Skipped, prefer-not, no-example, and Other answers do not become secret trait evidence.",
    claims: [],
    sections: [],
    groups,
    receipts: [],
    unknowns: ["No safe portrait section has enough scored evidence yet."],
    clauseAudit: [],
    facts: Engine.facts?.(state.answers || {}) || {},
  };
}

export function EvidenceSummary({
  state,
  onExport,
  onReview,
  onReset,
  onReviewClaim,
  error = "",
}) {
  const heading = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { reducedMotion } = useContext(MotionConfigContext);
  const reduced = prefersReducedMotion || reducedMotion === "always";
  const portrait = useMemo(
    () => Engine.portrait?.(state) || fallbackPortrait(state),
    [state],
  );
  const stats = state._stats || Engine.stats?.(state);
  const claims = portrait.claims || [];
  const sourceAnswers = state.locked?.training || state.answers || {};
  const evidenceGroups = Array.isArray(portrait.groups)
    ? portrait.groups
    : Engine.profile?.(sourceAnswers) || [];
  const receipts = portrait.receipts || portrait.evidenceReceipts || [];
  const unknowns = portrait.unknowns || [];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <main
      className="completion-shell result-experience"
      data-result-motion={reduced ? "off" : "on"}
    >
      {error && (
        <p className="save-error" role="alert">
          {error}
        </p>
      )}
      <section className="completion-hero">
        <div className="completion-copy">
          <span className="eyebrow">
            <Check size={14} /> Your first portrait
          </span>
          <h1 ref={heading} tabIndex="-1">
            {portrait.titleLead || portrait.title || "Still Mysterious"}
            <br />
            <em>{portrait.titleEmphasis || portrait.strength || "Unknown"}</em>
          </h1>
          <p className="completion-lede">{portrait.summary}</p>
          <p className="completion-lede">{portrait.thesis}</p>
          <div className="completion-actions">
            <button type="button" className="button button--primary" onClick={onExport}>
              <Download size={17} /> Export private receipt bundle
            </button>
            <button type="button" className="button button--secondary" onClick={onReview}>
              Review your answers
            </button>
          </div>
        </div>
        <div className="completion-orb">
          <GeniiStage
            mood="curious"
            compact={false}
            bubble="“I said portrait, not prophecy. Receipts below.”"
          />
        </div>
      </section>

      {(portrait.sections || []).length > 0 ? (
        <section className="emotion-section">
          <div className="section-intro">
            <span className="eyebrow">Your tells</span>
            <h2>The read, in a few acts.</h2>
            <p>The first move, the inside/outside split, what you guard, how to handle you, and the lovingly bounded roast.</p>
          </div>
          <div className="emotion-list">
            {portrait.sections.map((section) => (
              <article className="emotion-item" key={section.id}>
                <h3>
                  <PortraitIcon kind={section.key || "spark"} small />
                  {section.title}
                </h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="portrait-section">
          <div className="empty-state">
            <h3>You escaped the mirror with style.</h3>
            <p>There was not enough behavioral sparkle for a fair roast, so Genii declined to invent lore.</p>
          </div>
        </section>
      )}

      {(portrait.shareCards || []).length > 0 && (
        <section className="fact-section">
          <div className="section-intro">
            <span className="eyebrow">Share cards</span>
            <h2>Small public-safe chaos.</h2>
            <p>The lines you can show people without handing them your private answer file.</p>
          </div>
          <div className="fact-list">
            {portrait.shareCards.map((card, index) => (
              <div key={`${card.title}-${index}`}>
                <b>{card.title}</b>
                <span>{card.line}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {(claims.length > 0 || unknowns.length > 0 || Object.keys(portrait.facts || {}).length > 0) && (
        <section className="evidence-details">
          <details>
            <summary>
              <span>
                <b>Fine print, boundaries, and corrections</b>
                <small>What stayed unknown, what was literal, and where you can tell Genii “not quite”</small>
              </span>
              <ChevronDown size={19} />
            </summary>
            <div className="details-content">
              {claims.length > 0 && (
                <div className="claim-list">
                  {claims.map((claim) => (
                    <Claim
                      key={claim.id}
                      claim={claim}
                      state={state}
                      portraitId={portrait.id}
                      onReviewClaim={onReviewClaim}
                    />
                  ))}
                </div>
              )}
              {unknowns.length > 0 && (
                <div className="fact-list">
                  {unknowns.map((unknown, index) => (
                    <div key={`${unknown}-${index}`}>
                      <b>Still unknown</b>
                      <span>{unknown}</span>
                    </div>
                  ))}
                </div>
              )}
              {Object.keys(portrait.facts || {}).length > 0 && (
                <div className="fact-list">
                  {Object.entries(portrait.facts || {}).map(([key, value]) => (
                    <div key={key}>
                      <b>{factLabel(key)}</b>
                      <span>{factValue(value)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </details>
        </section>
      )}

      {stats && (
        <section className="check-result">
          <div>
            <span className="eyebrow">Sealed checks</span>
            <h2>Plot twist: Genii guessed before peeking.</h2>
            <p>
              These guesses were locked before you answered the check scenes. Abstentions are honest “not enough signal” moments; the baseline is just a simple comparison, not a validation claim.
            </p>
          </div>
          <div className="check-numbers">
            <div>
              <strong>
                {stats.hits} <small>/ {stats.predicted}</small>
              </strong>
              <span>frozen guesses matched</span>
            </div>
            <div>
              <strong>{stats.answered}</strong>
              <span>checks you answered</span>
            </div>
            <div>
              <strong>{stats.predictionAbstentions}</strong>
              <span>Genii passed</span>
            </div>
          </div>
          <p className="check-caption">
            Baseline on the same attempted checks: {stats.baselineHits ?? 0} / {stats.predicted || 0}. Eligible checks: {stats.eligible}; unresolved: {stats.unresolved}; skipped/prefer-not: {stats.skipped}; prediction abstentions: {stats.predictionAbstentions}.
          </p>
          <details className="check-breakdown">
            <summary>
              See the sealed checks <ChevronDown size={17} />
            </summary>
            <div>
              {(stats.trials || []).map((trial, i) => (
                <CheckRow key={trial.question} trial={trial} state={state} number={i + 1} />
              ))}
            </div>
          </details>
        </section>
      )}

      <section className="evidence-details">
        <details>
          <summary>
            <span>
              <b>Show exact receipts</b>
              <small>Question, option, role, target, time, cost, and limits</small>
            </span>
            <ChevronDown size={19} />
          </summary>
          <div className="details-content">
            {receipts.length ? (
              receipts.map((row) => <Receipt key={row.evidenceId} row={row} state={state} />)
            ) : (
              <p>No scored receipts recorded.</p>
            )}
          </div>
        </details>
      </section>

      <section className="evidence-details">
        <details>
          <summary>
            <span>
              <b>Show evidence groups and clause audit</b>
              <small>Source fidelity guardrails</small>
            </span>
            <ChevronDown size={19} />
          </summary>
          <div className="details-content">
            {evidenceGroups.length ? (
              evidenceGroups.map((group) => (
                <EvidenceGroup key={`detail-${group.section}-${group.d}`} group={group} state={state} />
              ))
            ) : (
              <p>No behavioral evidence recorded.</p>
            )}
            {(portrait.clauseAudit || []).map((clause) => (
              <article className="evidence-group" key={clause.clauseId}>
                <div className="claim-top">
                  <div>
                    <span className="eyebrow">{clause.claimType} · {clause.verdict}</span>
                    <h3>{clause.renderedText}</h3>
                    <p>{clause.entailment}</p>
                  </div>
                  <span className="claim-confidence">{clause.evidenceIds.length} receipts</span>
                </div>
              </article>
            ))}
          </div>
        </details>
      </section>

      <section className="completion-footer">
        <p>
          <strong>Your next move:</strong> {portrait.cta || "Pick one claim worth testing against a future real scene."}
        </p>
        <button type="button" className="button button--quiet" onClick={onReset}>
          <RotateCcw size={16} /> Start again
        </button>
      </section>
    </main>
  );
}

function Claim({ claim, state, portraitId, onReviewClaim }) {
  const [open, setOpen] = useState(false);
  const feedback = Array.isArray(state.feedback)
    ? [...state.feedback]
        .reverse()
        .find((item) => item.claimId === claim.id && (!portraitId || item.resultId === portraitId))?.value
    : state.feedback?.[claim.id];
  const rows = claim.observations || claim.rows || [];
  return (
    <article className="portrait-claim">
      <div className="claim-top">
        <div>
          <span className="eyebrow">
            {claim.evidenceStatus || "bounded"} · {dimensionLabel(claim.dimension)}
          </span>
          <h3>{claim.text}</h3>
        </div>
        <span className="claim-confidence">Evidence: {claim.confidence || "observed"}</span>
      </div>
      <div className="claim-actions">
        <button
          type="button"
          className={feedback === true ? "feedback feedback--selected" : "feedback"}
          aria-pressed={feedback === true}
          onClick={() => onReviewClaim?.(claim, true)}
        >
          <ThumbsUp size={15} /> Fits
        </button>
        <button
          type="button"
          className={feedback === false ? "feedback feedback--selected" : "feedback"}
          aria-pressed={feedback === false}
          onClick={() => onReviewClaim?.(claim, false)}
        >
          <ThumbsDown size={15} /> Not quite
        </button>
        {feedback !== undefined && <small className="feedback-saved">Correction saved; original read unchanged</small>}
        {rows.length > 0 && (
          <button type="button" className="receipt-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? "Hide evidence" : "See evidence"} <ChevronDown size={15} className={open ? "rotated" : ""} />
          </button>
        )}
      </div>
      {open && (
        <div className="receipt-list">
          {claim.scope && (
            <div className="receipt">
              <b>Scope</b>
              <span>{claim.scope}</span>
              <small>{claim.evidenceStatus || "bounded interpretation"}</small>
            </div>
          )}
          {(claim.alternativeExplanations || []).map((alternative, index) => (
            <div className="receipt" key={`alternative-${index}`}>
              <b>Another explanation</b>
              <span>{alternative}</span>
              <small>Kept open, not silently scored away</small>
            </div>
          ))}
          {rows.map((row, i) => {
            const q = Survey.QUESTIONS?.find((item) => item.id === (row.questionId || row.question));
            return (
              <div className="receipt" key={`${row.question || row.questionId}-${i}`}>
                <b>{q ? titleFor(q, state) : row.question || row.questionId}</b>
                <span>{row.answer || row.label || row.value || ""}</span>
                <small>{receiptMeta(row, Boolean(q))}</small>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

function Receipt({ row, state }) {
  const q = Survey.QUESTIONS?.find((item) => item.id === row.questionId);
  return (
    <article className="evidence-group">
      <div className="claim-top">
        <div>
          <span className="eyebrow">{row.questionId} · {row.optionId}</span>
          <h3>{q ? titleFor(q, state) : row.questionText}</h3>
          <p>{row.optionText}</p>
        </div>
        <span className="claim-confidence">{row.mappingVersion}</span>
      </div>
      <div className="receipt-list">
        <div className="receipt">
          <b>Literal observation</b>
          <span>{row.literalObservation}</span>
          <small>{receiptMeta(row, Boolean(q))}</small>
        </div>
        <div className="receipt">
          <b>Does not support</b>
          <span>{(row.unsupportedInferences || []).join(", ") || "Unstated motive or whole-person certainty"}</span>
          <small>{row.claimLimit || "Question claim limit applies"}</small>
        </div>
      </div>
    </article>
  );
}

function EvidenceGroup({ group, state }) {
  const rows = group.rows || [];
  const text = group.top
    ? `${dimensionLabel(group.d)} · ${Engine.label?.(group.top, group.d) || group.top}`
    : `${group.status || "Observed evidence"} · ${dimensionLabel(group.d)}`;
  return (
    <article className="evidence-group">
      <div className="claim-top">
        <div>
          <span className="eyebrow">{group.section || "evidence"}</span>
          <h3>{text}</h3>
          <p>{group.status || "Evidence coverage"}</p>
        </div>
        <span className="claim-confidence">{group.n || rows.length} source unit{(group.n || rows.length) === 1 ? "" : "s"}</span>
      </div>
      {rows.length > 0 && (
        <div className="receipt-list">
          {rows.map((row, i) => {
            const q = Survey.QUESTIONS?.find((item) => item.id === (row.questionId || row.question));
            return (
              <div className="receipt" key={`${row.id || row.questionId}-${i}`}>
                <b>{q ? titleFor(q, state) : row.question || row.questionId}</b>
                <span>{row.answer || row.label || row.value || ""}</span>
                <small>{receiptMeta(row, Boolean(q))}</small>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

function CheckRow({ trial, state, number }) {
  const q = Survey.QUESTIONS?.find((item) => item.id === trial.question);
  return (
    <article className="check-row">
      <div>
        <span className="eyebrow">Check {number}</span>
        <h3>{q ? titleFor(q, state) : trial.question}</h3>
        <p>
          Frozen guess: <b>{optionFor(q, trial.option, state)}</b>
        </p>
        <small>{trial.reason}</small>
      </div>
      <div>
        <span>Actual: {optionFor(q, trial.actual, state)}</span>
        <span>Baseline: {optionFor(q, trial.baseline, state)}</span>
        <b>{trial.hit ? "Matched" : trial.actual ? "Missed" : trial.unscored ? "Unscored" : "Unanswered"}</b>
      </div>
    </article>
  );
}

function dimensionLabel(value) {
  if (!value) return "Evidence";
  return String(value).replaceAll("_", " ").replace(/^./, (char) => char.toUpperCase());
}

function factLabel(value) {
  return dimensionLabel(value);
}

function factValue(value) {
  if (Array.isArray(value)) return value.join(", ") || "None recorded";
  if (value && typeof value === "object") return JSON.stringify(value);
  return String(value ?? "None recorded").replaceAll("_", " ");
}
