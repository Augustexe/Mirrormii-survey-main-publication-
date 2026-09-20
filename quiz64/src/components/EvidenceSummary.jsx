import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfigContext, useReducedMotion } from "motion/react";
import { Check, ChevronDown, Download, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { PortraitIcon } from "./PortraitIcon.jsx";
import { GeniiStage } from "./GeniiStage.jsx";
import * as Survey from "../survey.js";
import * as Engine from "../engine.js";
import {
  SOURCE_LABELS, SECTION_LABELS, receiptMeta, receiptContext,
  receiptExplanation, receiptLimit, literalPreferences,
} from "../result-language.js";

const titleFor = (q, state) => Survey.safeTitle(q, state);
const questionFor = (row) => Survey.QUESTIONS.find((q) => q.id === (row.questionId || row.question));
const optionFor = (q, id, state) => {
  if (Array.isArray(id)) return id.map((value) => optionFor(q, value, state)).join(", ");
  if (!id) return "No answer chosen";
  const option = [...(q?.options || []), ...(q?.exits || [])].find((item) => item.id === id);
  return option ? Survey.optionText(option, state) : id === "skip" ? "Skipped" : "No answer chosen";
};

export function EvidenceSummary({ state, onExport, onReview, onReset, onReviewClaim, error = "" }) {
  const heading = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { reducedMotion } = useContext(MotionConfigContext);
  const reduced = prefersReducedMotion || reducedMotion === "always";
  const portrait = useMemo(() => Engine.portrait(state), [state]);
  const stats = portrait.heldoutStats;
  const claims = portrait.claims;
  const sourceAnswers = state.locked?.training || state.answers || {};
  const evidenceGroups = portrait.groups;
  const receipts = portrait.receipts;
  const unknowns = portrait.unknowns;
  const preferences = literalPreferences(sourceAnswers);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);

  return (
    <main className="completion-shell result-experience" data-result-motion={reduced ? "off" : "on"}>
      {error && <p className="save-error" role="alert">{error}</p>}
      <section className="completion-hero">
        <div className="completion-copy">
          <span className="eyebrow"><Check size={14} /> Your first portrait</span>
          <h1 ref={heading} tabIndex="-1">
            {portrait.titleLead}<br /><em>{portrait.titleEmphasis}</em>
          </h1>
          <p className="completion-lede">{portrait.summary}</p>
          <p className="completion-lede">{portrait.thesis}</p>
          <div className="completion-actions">
            <button type="button" className="button button--primary" onClick={onExport}>
              <Download size={17} /> Download your answers and result
            </button>
            <button type="button" className="button button--secondary" onClick={onReview}>Review your answers</button>
          </div>
        </div>
        <div className="completion-orb">
          <GeniiStage mood="curious" compact={false} bubble="“You can check every part against what you actually said.”" />
        </div>
      </section>

      {portrait.sections.length > 0 ? (
        <section className="emotion-section">
          <div className="section-intro">
            <span className="eyebrow">A closer look</span>
            <h2>Here is what stood out.</h2>
            <p>A few examples, what they might mean, and the preferences you want respected.</p>
          </div>
          <div className="emotion-list">
            {portrait.sections.map((section) => (
              <article className="emotion-item" key={section.id}>
                <h3><PortraitIcon kind={section.key || "spark"} small />{section.title}</h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="portrait-section">
          <div className="empty-state">
            <h3>Not enough to go on yet.</h3>
            <p>There are not enough answers for a fair interpretation or roast. That is okay.</p>
          </div>
        </section>
      )}

      {portrait.shareCards.length > 0 && (
        <section className="fact-section">
          <div className="section-intro">
            <span className="eyebrow">Your highlights</span>
            <h2>A few lines to keep.</h2>
            <p>These may include your private answers. Only share them if you are comfortable with others reading them.</p>
          </div>
          <div className="fact-list">
            {portrait.shareCards.map((card, index) => (
              <div key={`${card.title}-${index}`}><b>{card.title}</b><span>{card.line}</span></div>
            ))}
          </div>
        </section>
      )}

      {(claims.length > 0 || unknowns.length > 0 || preferences.length > 0) && (
        <section className="evidence-details">
          <details>
            <summary>
              <span><b>What this does and does not tell us</b><small>Check an interpretation, see what is unknown, or revisit your preferences</small></span>
              <ChevronDown size={19} />
            </summary>
            <div className="details-content">
              {claims.length > 0 && <div className="claim-list">
                {claims.map((claim) => <Claim key={claim.id} claim={claim} state={state} portraitId={portrait.id} onReviewClaim={onReviewClaim} />)}
              </div>}
              {unknowns.length > 0 && <div className="fact-list">
                {unknowns.map((unknown, index) => <div key={index}><b>Still unknown</b><span>{unknown}</span></div>)}
              </div>}
              {preferences.length > 0 && <div className="fact-list">
                {preferences.map(({ title, text }) => <div key={title}><b>{title}</b><span>{text}</span></div>)}
              </div>}
            </div>
          </details>
        </section>
      )}

      {stats && (
        <section className="check-result">
          <div>
            <span className="eyebrow">The final checks</span>
            <h2>How did the guesses compare?</h2>
            <p>Genii saved these guesses before you saw the questions. When there was not enough to go on, it passed. For comparison, we also counted how often a fixed answer chosen without your profile matched. Neither score proves that the portrait is accurate.</p>
          </div>
          <div className="check-numbers">
            <div><strong>{stats.hits} <small>/ {stats.predicted}</small></strong><span>guesses matched your answers</span></div>
            <div><strong>{stats.answered}</strong><span>checks you answered</span></div>
            <div><strong>{stats.predictionAbstentions}</strong><span>Genii passed</span></div>
          </div>
          <p className="check-caption">
            The fixed-answer comparison matched {stats.baselineHits ?? 0} of the same {stats.predicted || 0} checks.
            There were {stats.eligible} checks in total: you chose an answer for {stats.answered}, skipped {stats.skipped}, and could not choose on {stats.abstained}.
            Still unanswered: {stats.unresolved}. Of the checks you answered, Genii passed on {stats.predictionAbstentions}.
          </p>
          <details className="check-breakdown">
            <summary>See each guess and answer <ChevronDown size={17} /></summary>
            <div>{stats.trials.map((trial, i) => <CheckRow key={trial.question} trial={trial} state={state} number={i + 1} />)}</div>
          </details>
        </section>
      )}

      <section className="evidence-details">
        <details>
          <summary>
            <span><b>See the answers behind your result</b><small>Your exact questions and choices, their circumstances, and what we cannot conclude</small></span>
            <ChevronDown size={19} />
          </summary>
          <div className="details-content">
            {receipts.length ? receipts.map((row) => <Receipt key={row.evidenceId} row={row} state={state} />) : <p>No answers were available to use in the result.</p>}
          </div>
        </details>
      </section>

      <section className="evidence-details">
        <details>
          <summary>
            <span><b>How the pieces fit together</b><small>Related answers and a check that each part points back to them</small></span>
            <ChevronDown size={19} />
          </summary>
          <div className="details-content">
            {evidenceGroups.length ? evidenceGroups.map((group) => <EvidenceGroup key={`${group.section}-${group.d}`} group={group} state={state} />) : <p>No answers about your responses are available yet.</p>}
            {portrait.clauseAudit.map((clause) => (
              <article className="evidence-group" key={clause.clauseId}>
                <div className="claim-top">
                  <div>
                    <span className="eyebrow">{clause.claimType === "unknown" ? "What we do not know" : clause.claimType === "joke" ? "A playful line" : "A line from your result"}</span>
                    <h3>{clause.renderedText}</h3>
                    <p>{clause.verdict === "block" ? "This line needs a closer review. Do not rely on it yet." : clause.claimType === "unknown" ? "We have left this open rather than guessed." : "The answers for this line were found. That does not by itself prove the interpretation is right."}</p>
                  </div>
                  <span className="claim-confidence">{new Set(clause.citedOptions.map((option) => option.questionId)).size} linked answers</span>
                </div>
              </article>
            ))}
          </div>
        </details>
      </section>

      <section className="completion-footer">
        <p><strong>Your next move:</strong> {portrait.cta}</p>
        <button type="button" className="button button--quiet" onClick={onReset}><RotateCcw size={16} /> Start again</button>
      </section>
    </main>
  );
}

function Claim({ claim, state, portraitId, onReviewClaim }) {
  const [open, setOpen] = useState(false);
  const feedback = Array.isArray(state.feedback)
    ? [...state.feedback].reverse().find((item) => item.claimId === claim.id && item.resultId === portraitId)?.value
    : state.feedback?.[claim.id];
  const rows = claim.observations || [];
  return (
    <article className="portrait-claim">
      <div className="claim-top">
        <div>
          <span className="eyebrow">{SOURCE_LABELS[claim.evidenceStatus] || "Based on your answers"} · {SECTION_LABELS[claim.dimension] || "Your result"}</span>
          <h3>{claim.text}</h3>
        </div>
        <span className="claim-confidence">{claim.confidence === "medium" ? "Several examples; still tentative" : "A limited first impression"}</span>
      </div>
      <div className="claim-actions">
        <button type="button" className={feedback === true ? "feedback feedback--selected" : "feedback"} aria-pressed={feedback === true} onClick={() => onReviewClaim?.(claim, true)}><ThumbsUp size={15} /> Fits</button>
        <button type="button" className={feedback === false ? "feedback feedback--selected" : "feedback"} aria-pressed={feedback === false} onClick={() => onReviewClaim?.(claim, false)}><ThumbsDown size={15} /> Not quite</button>
        {feedback !== undefined && <small className="feedback-saved">Feedback saved. Your original result stays unchanged.</small>}
        {rows.length > 0 && <button type="button" className="receipt-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? "Hide explanation" : "See why"} <ChevronDown size={15} className={open ? "rotated" : ""} /></button>}
      </div>
      {open && (
        <div className="receipt-list">
          <div className="receipt"><b>What this covers</b><span>{claim.scope}</span><small>{claim.lesson}</small></div>
          {claim.alternativeExplanations.map((alternative, index) => <div className="receipt" key={index}><b>Another explanation</b><span>{alternative}</span><small>We cannot rule this out from these answers.</small></div>)}
          <div className="receipt"><b>Something to notice next</b><span>{claim.nextValidation}</span></div>
          {rows.map((row, i) => <AnswerRow key={i} row={row} state={state} />)}
        </div>
      )}
    </article>
  );
}

function AnswerRow({ row, state }) {
  const q = questionFor(row);
  return <div className="receipt"><b>{q ? titleFor(q, state) : "An earlier question"}</b><span>{row.answer}</span><small>{receiptMeta(row)} {receiptContext(row)}</small></div>;
}

function Receipt({ row, state }) {
  const q = questionFor(row);
  return (
    <article className="evidence-group">
      <div className="claim-top">
        <div><span className="eyebrow">{receiptMeta(row)}</span><h3>{q ? titleFor(q, state) : row.questionText}</h3><p>{row.optionText}</p></div>
        <span className="claim-confidence">Your exact answer</span>
      </div>
      <div className="receipt-list">
        <div className="receipt"><b>How we used it</b><span>{receiptExplanation(row)}</span><small>{q?.setup} {receiptContext(row)}</small></div>
        <div className="receipt"><b>What we cannot conclude</b><span>{receiptLimit(row)}</span><small>One answer is not a complete picture of you.</small></div>
      </div>
    </article>
  );
}

function EvidenceGroup({ group, state }) {
  return (
    <article className="evidence-group">
      <div className="claim-top">
        <div>
          <span className="eyebrow">Answers considered together</span>
          <h3>{SECTION_LABELS[group.section] || "Related answers"}</h3>
          <p>{group.section === "context" || group.section === "support" ? "These are preferences you stated, not personality clues." : group.n === 1 ? "These answers describe one situation, including any follow-ups." : "These answers cover more than one situation. Similar choices may be worth exploring, but do not establish a fixed trait."}</p>
        </div>
        <span className="claim-confidence">{group.n} separate situation{group.n === 1 ? "" : "s"}</span>
      </div>
      {group.rows.length > 0 && <div className="receipt-list">{group.rows.map((row, i) => <AnswerRow key={i} row={row} state={state} />)}</div>}
    </article>
  );
}

function CheckRow({ trial, state, number }) {
  const q = questionFor(trial);
  return (
    <article className="check-row">
      <div>
        <span className="eyebrow">Check {number}</span>
        <h3>{q ? titleFor(q, state) : "A final check"}</h3>
        <p>Genii’s earlier guess: <b>{trial.option ? optionFor(q, trial.option, state) : "Genii passed"}</b></p>
        <small>{trial.reason}</small>
      </div>
      <div>
        <span>Your answer: {optionFor(q, trial.actual || state.answers?.[trial.question], state)}</span>
        <span>Fixed-answer comparison: {optionFor(q, trial.baseline, state)}</span>
        <b>{trial.unresolved ? "Not answered yet" : trial.unscored ? "Not counted" : !trial.option ? "Genii did not guess" : trial.hit ? "Matched" : "Did not match"}</b>
      </div>
    </article>
  );
}
