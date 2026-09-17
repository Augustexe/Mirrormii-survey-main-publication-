import React, { useState } from 'react';
import { ChevronDown, Download, RotateCcw, ShieldCheck } from 'lucide-react';
import { DIMS, QUESTIONS, facts, label, interpolate } from '../survey.js';

export function EvidenceSummary({ state, onExport, onReview, onReset }) {
  const groups = state.locked?.profile || [];
  const profile = groups.filter((g) => g.status === 'Repeated pattern');
  const f = state.locked?.facts || facts(state.answers || {});
  const stats = state._stats;
  return <main className="completion-shell">
    <section className="completion-hero"><div className="completion-copy"><span className="eyebrow"><ShieldCheck size={14} /> Conversation complete</span><h1>That was<br /><em>very you.</em></h1><p className="completion-lede">{profile.length ? 'A few patterns repeated across your answers. Genii kept the uncertain bits folded neatly into the margins.' : 'Nothing was forced into a pattern. Genii kept the uncertain bits folded neatly into the margins.'}</p><div className="completion-actions"><button type="button" className="button button--primary" onClick={onExport}><Download size={17} /> Export my answers</button><button type="button" className="button button--secondary" onClick={onReview}>Review your answers</button></div></div><div className="completion-orb"><img src={`${import.meta.env.BASE_URL}assets/genii-attentive.png`} alt="Genii looking attentive" /><span>“I have notes.”</span></div></section>
    {stats && <section className="check-result"><div><span className="eyebrow">The sealed checks</span><h2>Did the reading meet you there?</h2><p>Genii’s guesses were frozen before the final eight. This is an internal authored check, not independent validation.</p></div><div className="check-numbers"><div><strong>{stats.hits} <small>/ {stats.predicted}</small></strong><span>matched predictions</span></div><div><strong>{stats.abstained}</strong><span>abstentions</span></div><div><strong>{stats.skipped}</strong><span>skipped</span></div></div><p className="check-caption">Same answered subset baseline: {stats.baselineHits ?? 0} / {stats.predicted || 0} matched. {stats.predicted === 0 ? 'No match rate is calculated with zero predicted items.' : `${stats.predicted} of ${stats.answered} answered checks had a prediction.`}</p><details className="check-breakdown"><summary>See the eight checks <ChevronDown size={17} /></summary><div>{stats.trials.map((trial) => <CheckRow key={trial.question} trial={trial} />)}</div></details></section>}
    <section className="pattern-summary"><div className="section-intro"><span className="eyebrow">In these answers…</span><h2>What kept showing up</h2><p>Repeated choices can be a useful conversation starter. They are never a final type.</p></div><div className="pattern-list">{profile.length ? profile.slice(0, 4).map((g) => <Pattern key={`${g.d}-${g.target}`} group={g} state={state} />) : <div className="empty-state"><h3>Still a little mysterious.</h3><p>There was not enough repeated evidence for a strong pattern. That is a valid result too.</p></div>}</div></section>
    <section className="evidence-details"><details><summary><span><b>Show every evidence group</b><small>Thin, mixed, and repeated observations</small></span><ChevronDown size={19} /></summary><div className="details-content">{groups.length ? groups.map((g) => <Pattern key={`${g.d}-${g.target}-all`} group={g} state={state} />) : <p>No behavioral evidence recorded.</p>}</div></details><details><summary><span><b>What you told us directly</b><small>Facts stay separate from interpretation</small></span><ChevronDown size={19} /></summary><div className="details-content fact-list">{Object.entries(f).length ? Object.entries(f).map(([key, value]) => <div key={key}><b>{key}</b><span>{String(value)}</span></div>) : <p>No context facts supplied.</p>}<p className="detail-note">Facts are self-reported. They are not successful guesses.</p></div></details></section>
    <section className="completion-footer"><p>Want to run it again? A new attempt is practice for questions you have already seen.</p><button type="button" className="button button--quiet" onClick={onReset}><RotateCcw size={16} /> Start again</button></section>
  </main>;
}

function Pattern({ group, state }) {
  const [open, setOpen] = useState(false);
  const rows = group.rows || [];
  return <article className="pattern-item"><div className="pattern-item-top"><div><span className="eyebrow">{DIMS[group.d] || group.d}</span><h3>{group.top ? label(group.top, group.d) : 'Several directions'}</h3><p>{group.n || rows.length} distinct question{(group.n || rows.length) === 1 ? '' : 's'} · {group.target}</p></div><span className={`evidence-status evidence-status--${group.status === 'Repeated pattern' ? 'strong' : 'mixed'}`}>{group.status || 'Observed'}</span></div>{rows.length > 0 && <button type="button" className="receipt-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide receipts' : 'View receipts'} <ChevronDown size={15} className={open ? 'rotated' : ''} /></button>}{open && <div className="receipt-list">{rows.map((r, i) => <div className="receipt" key={`${r.question}-${i}`}><b>{r.question}</b><span>{interpolate(r.answer, state)}</span><small>{r.why}</small></div>)}</div>}</article>;
}

function CheckRow({ trial }) {
  const q = QUESTIONS.find((question) => question.id === trial.question);
  const option = (id) => q?.options.find((item) => item.id === id)?.text || (id ? id : 'Abstained');
  const status = trial.skipped ? 'Skipped' : trial.option ? (trial.hit ? 'Matched' : 'Missed') : 'Abstained';
  return <div className="check-row"><div><b>{trial.question}</b><span>{status}</span></div><p><strong>Guess:</strong> {option(trial.option)}<br /><strong>You:</strong> {trial.actual ? option(trial.actual) : 'Skipped'}</p><small>{trial.reason} · Sources: {trial.sources?.length ? trial.sources.join(', ') : 'none'}</small></div>;
}
