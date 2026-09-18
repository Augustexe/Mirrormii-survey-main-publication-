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
import { RoutineTrack } from "./RoutineTrack.jsx";
import * as Survey from "../survey.js";
import * as Engine from "../engine.js";

const labelFor = (value, dimension) =>
  Survey.label?.(value, dimension) || value || "No repeated direction";
const titleFor = (q, state) =>
  Survey.safeTitle?.(q, state) ||
  Survey.interpolate?.(q?.title, state) ||
  q?.title ||
  "";
const optionFor = (q, id, state) => {
  if (id === "skip") return "Skipped";
  if (id === "no_example") return "No example";
  if (id === "other") return "Other";
  if (!id) return "Abstained";
  const option = q?.options?.find((item) => item.id === id);
  if (!option) return "Abstained";
  return Survey.optionText?.(option, state) || option.text || "Abstained";
};
const windowLabels = {
  past_month: "Past month",
  last_7_days: "Last 7 days",
  latest_instance_past_month: "Most recent time in the past month",
  scenario: "Imagined scenario",
};
const roleLabels = {
  actual_event: "Real life example",
  hypothetical: "Imagined scenario",
  self_report: "Self report",
  self_description: "Self description",
  context: "Context",
};
const receiptMeta = (row, hasQuestion) =>
  [
    roleLabels[row.role] || "Source",
    windowLabels[row.window] || "Window not recorded",
    !hasQuestion && (row.questionId || row.question)
      ? row.questionId || row.question
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

function fallbackPortrait(state) {
  const groups = Engine.profile?.(state.answers || {}) || [];
  return {
    title: "A provisional reading",
    summary: groups.length
      ? "A few directions repeated across your answers."
      : "Your answers stayed open and varied.",
    claims: groups
      .filter((g) => g.status === "Repeated pattern")
      .slice(0, 4)
      .map((g, i) => ({
        id: `legacy-${i}`,
        text: `${labelFor(g.top, g.d)} showed up more than once.`,
        confidence: g.status,
        dimension: g.d,
        target: g.target,
        evidenceIds: (g.rows || []).map((r) => r.question),
        observations: g.rows || [],
      })),
    domains: [],
    emotions: [],
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
  const allClaims = portrait.claims || [];
  const claims = allClaims.slice(0, 5);
  const sourceAnswers = state.locked?.training || state.answers || {};
  const evidenceGroups = Array.isArray(portrait.groups)
    ? portrait.groups
    : Engine.profile?.(sourceAnswers) || [];
  const domainOrder = [
    "sleep",
    "eating",
    "movement",
    "recovery",
    "hydration",
    "body",
    "skin",
  ];
  const domains = [...(portrait.domains || [])].sort(
    (a, b) => domainOrder.indexOf(a.id) - domainOrder.indexOf(b.id),
  );
  const emotions = portrait.emotions || [];
  const facts = portrait.facts || {};
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  const hasEvidence = claims.length > 0;
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
            {hasEvidence ? (
              <>
                A little more
                <br />
                <em>you, in focus.</em>
              </>
            ) : (
              <>
                Still a little
                <br />
                <em>mysterious.</em>
              </>
            )}
          </h1>
          <p className="completion-lede">
            {hasEvidence
              ? "The habits, feelings, and little plot twists that showed up in your answers. Take a look. Tell me what fits."
              : "Some things need another conversation. Here's what you shared, with room for everything we haven't met yet."}
          </p>
          <div className="completion-actions">
            <button
              type="button"
              className="button button--primary"
              onClick={onExport}
            >
              <Download size={17} /> Export my answers
            </button>
            <button
              type="button"
              className="button button--secondary"
              onClick={onReview}
            >
              Review your answers
            </button>
          </div>
        </div>
        <div className="completion-orb">
          <GeniiStage
            mood="curious"
            compact={false}
            bubble="“You brought the lore. I brought notes.”"
          />
        </div>
      </section>
      {domains.length > 0 && (
        <nav className="portrait-nav" aria-label="Explore your routines">
          {domains.map((domain) => (
            <a key={domain.id} href={`#rhythm-${domain.id}`}>
              <PortraitIcon kind={domain.id} small />
              <span>{domain.label || domain.id}</span>
            </a>
          ))}
        </nav>
      )}
      {domains.length > 0 && (
        <section className="domain-section result-domain-section">
          <div className="section-intro">
            <span className="eyebrow">The everyday you</span>
            <h2>Your everyday rhythm.</h2>
            <p>
              Your usual month, next to your actual week. Because one chaotic
              Tuesday doesn't get to define you.
            </p>
            <p className="rhythm-explainer">
              These bars describe routines, not a health score. Evidence
              coverage is shown separately.
            </p>
            <div className="domain-legend">
              <span>
                <i className="legend-dot legend-dot--usual" /> Usual · past
                month
              </span>
              <span>
                <i className="legend-dot legend-dot--recent" /> Recent · last 7
                days
              </span>
            </div>
          </div>
          <div className="domain-list result-domain-list">
            {domains.map((domain) => (
              <Domain
                key={domain.id}
                domain={domain}
                state={state}
                observations={Engine.observations?.(sourceAnswers) || []}
              />
            ))}
          </div>
        </section>
      )}
      <section className="portrait-section">
        <div className="section-intro">
          <span className="eyebrow">Your provisional portrait</span>
          <h2>
            A few things that
            <br />
            kept showing up.
          </h2>
          <p>
            Do these sound like you? True or False records your take on each
            interpretation. Your original reading stays here.
          </p>
        </div>
        <div className="claim-list">
          {claims.length ? (
            claims.map((claim) => (
              <Claim
                key={claim.id}
                claim={claim}
                state={state}
                portraitId={portrait.id}
                onReviewClaim={onReviewClaim}
              />
            ))
          ) : (
            <div className="empty-state">
              <h3>Still a little mysterious.</h3>
              <p>
                There is not enough repeated evidence for a strong pattern. That
                is a valid result too.
              </p>
            </div>
          )}
        </div>
      </section>
      {emotions.length > 0 && (
        <section className="emotion-section">
          <div className="section-intro">
            <span className="eyebrow">Inside voice, outside face</span>
            <h2>More than “I'm fine.”</h2>
            <p>
              What you felt, what you did, and how you recovered can tell
              different stories. Here are the pieces you shared.
            </p>
          </div>
          <div className="emotion-list">
            {emotions.map((emotion) => (
              <article className="emotion-item" key={emotion.family}>
                <h3>
                  <PortraitIcon kind={emotion.family} small />
                  {emotion.label || emotion.family}
                </h3>
                <div>
                  <EmotionLayer title="Feeling" rows={emotion.feeling} />
                  <EmotionLayer title="Response" rows={emotion.response} />
                  <EmotionLayer title="Recovery" rows={emotion.recovery} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {Object.keys(facts).length > 0 && (
        <section className="fact-section">
          <div className="section-intro">
            <h2>Facts you reported</h2>
            <p>These stay separate from interpretation.</p>
          </div>
          <div className="fact-list">
            {Object.entries(facts).map(([key, value]) => (
              <div key={key}>
                <b>{factLabel(key)}</b>
                <span>{factValue(value)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      {stats && (
        <section className="check-result">
          <div>
            <span className="eyebrow">The sealed checks</span>
            <h2>Did the reading meet you there?</h2>
            <p>
              Predictions were frozen before the final checks. This is an
              internal authored comparison, not independent validation.
            </p>
          </div>
          <div className="check-numbers">
            <div>
              <strong>
                {stats.hits} <small>/ {stats.predicted}</small>
              </strong>
              <span>matched predictions</span>
            </div>
            <div>
              <strong>{stats.abstained}</strong>
              <span>abstentions</span>
            </div>
            <div>
              <strong>{stats.skipped}</strong>
              <span>skipped</span>
            </div>
          </div>
          <p className="check-caption">
            Same answered subset baseline: {stats.baselineHits ?? 0} /{" "}
            {stats.predicted || 0} matched.{" "}
            {stats.predicted === 0
              ? "No match rate is calculated with zero predicted items."
              : `${stats.predicted} of ${stats.answered} answered checks had a prediction.`}
          </p>
          <details className="check-breakdown">
            <summary>
              See the eight checks <ChevronDown size={17} />
            </summary>
            <div>
              {(stats.trials || []).map((trial, i) => (
                <CheckRow
                  key={trial.question}
                  trial={trial}
                  state={state}
                  number={i + 1}
                />
              ))}
            </div>
          </details>
        </section>
      )}
      <section className="evidence-details">
        <details>
          <summary>
            <span>
              <b>Show every evidence group</b>
              <small>Thin, mixed, and repeated observations</small>
            </span>
            <ChevronDown size={19} />
          </summary>
          <div className="details-content">
            {evidenceGroups.length ? (
              evidenceGroups.map((group) => (
                <EvidenceGroup
                  key={`detail-${group.d}-${group.target}`}
                  group={group}
                  state={state}
                />
              ))
            ) : (
              <p>No behavioral evidence recorded.</p>
            )}
          </div>
        </details>
      </section>
      <section className="completion-footer">
        <p>
          Want to run it again? A new attempt is practice for questions you have
          already seen.
        </p>
        <button
          type="button"
          className="button button--quiet"
          onClick={onReset}
        >
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
        .find(
          (item) =>
            item.claimId === claim.id &&
            (!portraitId || item.resultId === portraitId),
        )?.value
    : state.feedback?.[claim.id];
  const rows = claim.observations || claim.rows || [];
  return (
    <article className="portrait-claim">
      <div className="claim-top">
        <div>
          <span className="eyebrow">{dimensionLabel(claim.dimension)}</span>
          <h3>{claim.text}</h3>
          <p>
            {claim.target ? targetLabel(claim.target) : "Across your answers"}
          </p>
        </div>
        <span className="claim-confidence">
          Evidence: {claim.confidence || "observed"}
        </span>
      </div>
      <div className="claim-actions">
        <button
          type="button"
          className={
            feedback === true ? "feedback feedback--selected" : "feedback"
          }
          aria-pressed={feedback === true}
          onClick={() => onReviewClaim?.(claim, true)}
        >
          <ThumbsUp size={15} /> True (fits me)
        </button>
        <button
          type="button"
          className={
            feedback === false ? "feedback feedback--selected" : "feedback"
          }
          aria-pressed={feedback === false}
          onClick={() => onReviewClaim?.(claim, false)}
        >
          <ThumbsDown size={15} /> False (not quite)
        </button>
        {feedback !== undefined && (
          <small className="feedback-saved">Saved to this portrait</small>
        )}
        {rows.length > 0 && (
          <button
            type="button"
            className="receipt-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? "Hide evidence" : "See evidence"}{" "}
            <ChevronDown size={15} className={open ? "rotated" : ""} />
          </button>
        )}
      </div>
      {open && (
        <div className="receipt-list">
          {rows.map((row, i) => {
            const q = Survey.QUESTIONS?.find(
              (item) => item.id === (row.questionId || row.question),
            );
            return (
              <div
                className="receipt"
                key={`${row.question || row.questionId}-${i}`}
              >
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

function EvidenceGroup({ group, state }) {
  const rows = group.rows || [];
  const repeated = group.status === "Repeated pattern" && group.top;
  const text = repeated
    ? `${labelFor(group.top, group.d)} in ${group.target}`
    : `${group.status || "Observed evidence"} in ${group.target}`;
  return (
    <article className="evidence-group">
      <div className="claim-top">
        <div>
          <span className="eyebrow">{dimensionLabel(group.d)}</span>
          <h3>{text}</h3>
          <p>
            {group.status || "Evidence coverage"}
            {group.target ? ` · ${targetLabel(group.target)}` : ""}
          </p>
        </div>
        <span className="claim-confidence">
          {rows.length} source{rows.length === 1 ? "" : "s"}
        </span>
      </div>
      {rows.length > 0 && (
        <div className="receipt-list">
          {rows.map((row, i) => {
            const q = Survey.QUESTIONS?.find(
              (item) => item.id === (row.questionId || row.question),
            );
            return (
              <div
                className="receipt"
                key={`${row.question || row.questionId}-${i}`}
              >
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

function Domain({ domain, state, observations = [] }) {
  return (
    <article
      className={`domain-item result-domain-item result-domain-item--${domain.id}`}
      id={`rhythm-${domain.id}`}
      tabIndex="-1"
    >
      <div className="domain-head">
        <PortraitIcon kind={domain.id} />
        <div>
          <h3>{domain.label || domain.id}</h3>
          {domain.description && domain.description !== domain.label && (
            <p>{domain.description}</p>
          )}
        </div>
        {domain.confidence && <span>Evidence: {domain.confidence}</span>}
      </div>
      <div className="axis-list">
        {(domain.axes || []).map((axis) => {
          const position = (record) => {
            const value = Number(record?.value);
            const min = Number(axis.min ?? 0);
            const max = Number(axis.max ?? 1);
            return Number.isFinite(value) && max > min
              ? `${Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))}%`
              : null;
          };
          const usual = position(axis.usual);
          const recent = position(axis.recent);
          const axisRows = observations.filter((row) =>
            axis.evidenceIds?.includes(row.id),
          );
          return (
            <div className="axis" key={axis.id}>
              <div className="axis-label">
                <b>{axis.label || axis.id}</b>
                <span className="axis-confidence">
                  Evidence: {axis.confidence || "not recorded"}
                </span>
              </div>
              <div className="axis-readings">
                <RoutineReading
                  period="Usual"
                  record={axis.usual}
                  position={usual}
                />
                <RoutineReading
                  period="Recent"
                  record={axis.recent}
                  position={recent}
                />
              </div>
              <div className="axis-endpoints">
                <span>{axis.low || "No lower endpoint"}</span>
                <span>{axis.high || "No upper endpoint"}</span>
              </div>
              {axis.unit && axis.unit !== "ordinal" && (
                <small>{axis.unit}</small>
              )}
              {axisRows.length > 0 && (
                <details className="axis-receipts">
                  <summary>See source scenes</summary>
                  <div>
                    {axisRows.map((row) => {
                      const q = Survey.QUESTIONS?.find(
                        (item) => item.id === row.questionId,
                      );
                      return (
                        <div className="axis-receipt" key={row.id}>
                          <b>{q ? titleFor(q, state) : row.questionId}</b>
                          <span>
                            {row.answer ||
                              row.measure?.label ||
                              row.signal?.label ||
                              "Recorded signal"}
                          </span>
                          <small>{receiptMeta(row, Boolean(q))}</small>
                        </div>
                      );
                    })}
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

function RoutineReading({ period, record, position }) {
  return (
    <div className={`routine-reading routine-reading--${period.toLowerCase()}`}>
      <span className="routine-period">{period}</span>
      <strong>{record?.label || "Not recorded"}</strong>
      <RoutineTrack period={period} position={position} />
    </div>
  );
}

function dimensionLabel(dimension) {
  return Survey.DIMS?.[dimension] || dimension || "Observed direction";
}
const factNames = {
  close: "Close person",
  household: "Household",
  bedtime: "Bedtime",
  takeaway: "Takeaway days",
  movement: "Movement days",
  healthContext: "Health context",
  wake: "Wake time",
  sleepDuration: "Sleep duration",
};
const factValues = {
  none: "No specific person",
  alone: "Lives alone",
  shared: "Shares a home",
  family: "Lives with family",
  unspecified: "Household left unspecified",
  "none-or-prefer-not-to-say": "None or prefer not to say",
  "before 23:00": "Before 11 pm",
  "23:00-01:00": "11 pm to 1 am",
  "after 01:00": "After 1 am",
  "variable-or-shifts": "Variable or shift work",
  "0 days / last 7": "0 days in the last 7",
  "1-2 days / last 7": "1 to 2 days in the last 7",
  "3-4 days / last 7": "3 to 4 days in the last 7",
  "5-7 days / last 7": "5 to 7 days in the last 7",
  "under-6-hours": "Under 6 hours",
  "6-to-under-7-hours": "6 to under 7 hours",
  "7-to-under-9-hours": "7 to under 9 hours",
  "9-hours-or-more": "9 hours or more",
};
function factLabel(key) {
  const raw = String(key)
    .replaceAll("_", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");
  return (
    factNames[key] || raw.replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}
function factValue(value) {
  return (
    factValues[value] ||
    String(value)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}
function targetLabel(target) {
  return String(target || "")
    .replace(/^chosen /, "")
    .replace(/^household \((.*)\)$/, "$1")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function EmotionLayer({ title, rows = [] }) {
  return (
    <div className="emotion-layer">
      <b>{title}</b>
      {rows.length ? (
        rows.map((row) => (
          <span key={`${row.questionId}-${row.value}`}>
            {row.label || row.value}
          </span>
        ))
      ) : (
        <small>Not recorded</small>
      )}
    </div>
  );
}

function CheckRow({ trial, state, number }) {
  const q = (Survey.QUESTIONS || []).find(
    (question) => question.id === trial.question,
  );
  const status = trial.skipped
    ? "Skipped"
    : trial.noExample
      ? "No example"
      : trial.other
        ? "Other"
        : trial.unresolved
          ? "Unresolved"
          : trial.option
            ? trial.hit
              ? "Matched"
              : "Missed"
            : "Abstained";
  const actualLabel = trial.skipped
    ? "Skipped"
    : trial.noExample
      ? "No example"
      : trial.other
        ? "Other"
        : optionFor(q, trial.actual, state);
  return (
    <div className="check-row">
      <div>
        <b>Check {number}</b>
        <span>{status}</span>
      </div>
      <p>
        <strong>Scenario:</strong> {q ? titleFor(q, state) : "Sealed scenario"}
        <br />
        <strong>Guess:</strong> {optionFor(q, trial.option, state)}
        <br />
        <strong>You:</strong> {actualLabel}
      </p>
      <small>
        {trial.reason || "No additional note"} · Sources:{" "}
        {trial.sources?.length ? trial.sources.join(", ") : "none"}
      </small>
    </div>
  );
}
