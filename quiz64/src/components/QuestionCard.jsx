import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, SkipForward } from 'lucide-react';
import { applicable, optionText, safeTitle, interpolate } from '../survey.js';

export function QuestionCard({ q, state, draft, setDraft, note, setNote, onContinue, onBack, onSkip, readOnly = false, saving = true }) {
  const heading = useRef(null);
  const qApplicable = applicable(q, state);
  const committed = state.answers?.[q.id];
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [q.id]);
  const actual = q.role === 'actual';
  const choose = (id) => { if (!readOnly && !(q.test && committed)) setDraft(id); };
  return <article className={`question-card ${readOnly ? 'question-card--readonly' : ''}`}>
    <div className="question-head">
      <div>
        <span className="eyebrow">{q.test ? 'Sealed check' : q.role === 'context' ? 'A little context' : actual ? 'A real-life check' : 'A hypothetical, probably'}</span>
        <h1 ref={heading} tabIndex="-1">{safeTitle(q, state)}</h1>
        {q.setup && <p className="question-setup">{interpolate(q.setup, state)}</p>}
      </div>
    </div>
    {qApplicable ? <fieldset className="answer-list" disabled={readOnly || (q.test && Boolean(committed))}>
      <legend className="sr-only">Choose one answer</legend>
      {q.options.map((o, i) => <label key={o.id} className={`answer-option ${draft === o.id ? 'answer-option--selected' : ''}`}>
        <input type="radio" name={q.id} value={o.id} checked={draft === o.id} onChange={() => choose(o.id)} />
        <span className="answer-token">{String.fromCharCode(65 + i)}</span>
        <span className="answer-copy">{optionText(o, state)}</span>
        <Check className="answer-check" size={18} strokeWidth={2.5} aria-hidden="true" />
      </label>)}
    </fieldset> : <div className="inapplicable-card"><span className="inapplicable-mark">—</span><div><strong>This one doesn’t fit your situation.</strong><p>Genii will leave it out of the evidence. You can move on without inventing an example.</p></div></div>}
    <details className="context-details">
      <summary><ChevronDown size={16} aria-hidden="true" /> Add context <span>Optional — saved with your answer, not scored</span></summary>
      <textarea value={note || ''} maxLength={1200} onChange={(e) => setNote(e.target.value)} disabled={readOnly || (q.test && Boolean(committed))} placeholder="A small footnote for future you…" aria-label="Optional context note" />
      <small>{(note || '').length}/1200</small>
    </details>
    {qApplicable && actual && !readOnly && <button type="button" className="none-fit" onClick={onSkip}>None fit / hasn’t happened <span>unscored</span></button>}
    <div className="question-actions">
      <button type="button" className="button button--quiet" onClick={onBack} disabled={!onBack}><ArrowLeft size={17} aria-hidden="true" /> Back</button>
      <div className="actions-right">
        {!readOnly && <button type="button" className="button button--quiet" onClick={onSkip}><SkipForward size={16} aria-hidden="true" /> Skip</button>}
        <button type="button" className="button button--primary" onClick={qApplicable ? onContinue : onSkip} disabled={qApplicable ? !draft : false}>{q.test && committed ? 'Next check' : 'Continue'} <ArrowRight size={17} aria-hidden="true" /></button>
      </div>
    </div>
    <p className="save-hint" role="status"><span className={`save-dot ${saving && committed ? 'save-dot--on' : ''}`} /> {!saving ? 'Saving unavailable' : committed ? 'Saved on this device' : 'Saves when you continue'} · {q.test ? 'This check is read-only after Continue.' : 'You can revisit this answer later.'}</p>
  </article>;
}
