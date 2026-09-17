import React, { useEffect, useRef } from 'react';
import { Check, Lock, X, Map, Info, ArrowLeft, RotateCcw } from 'lucide-react';
import { CHAPTERS, QUESTIONS, chapterCount } from '../survey.js';

export function ChapterMap({ open, onClose, state, onVisit, onHow }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [open]);
  const close = () => { if (dialog.current?.open) dialog.current.close(); onClose(); };
  return <dialog ref={dialog} className="map-dialog" aria-labelledby="map-title" onCancel={(e) => { e.preventDefault(); close(); }} onClick={(e) => { if (e.target === dialog.current) close(); }}>
    <div className="dialog-top"><div><span className="eyebrow">Your route through the weird</span><h2 id="map-title">Chapter map</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Close chapter map"><X size={20} /></button></div>
    <p className="dialog-lede">Eight chapters, 56 getting-to-know-you questions, then eight sealed checks. Every stop is optional.</p>
    <div className="chapter-list">
      {CHAPTERS.map((chapter, i) => {
        const count = chapterCount(state, chapter.id); const future = i > 0 && !CHAPTERS.slice(0, i).every((c) => chapterCount(state, c.id).resolved === chapterCount(state, c.id).total);
        const qs = QUESTIONS.filter((q) => q.chapter === chapter.id && !q.test); const isGateway = chapter.id === 8; const current = state.cursor >= QUESTIONS.findIndex((q) => q.chapter === chapter.id) && state.cursor <= QUESTIONS.findIndex((q) => q.chapter === chapter.id) + 7;
        return <button key={chapter.id} type="button" className={`chapter-row ${future ? 'chapter-row--locked' : ''} ${current ? 'chapter-row--current' : ''}`} disabled={future || (!qs.length && !isGateway)} onClick={() => { onVisit(qs[0] || { chapter: 8, test: true }); close(); }}>
          <span className="chapter-emblem">{future ? <Lock size={16} /> : count.resolved === count.total ? <Check size={18} /> : <span>{String(chapter.id).padStart(2, '0')}</span>}</span>
          <span className="chapter-copy"><strong>{chapter.title}</strong><small>{chapter.subtitle}</small></span>
          <span className="chapter-count">{count.answered} answered · {count.skipped} skipped</span>
        </button>;
      })}
    </div>
    <button type="button" className="how-link" onClick={() => { close(); onHow(); }}><Info size={16} /> How the evidence works</button>
  </dialog>;
}

export function ReviewDialog({ open, onClose, state, onVisit }) {
  const dialog = useRef(null);
  useEffect(() => { if (open) dialog.current?.showModal(); else if (dialog.current?.open) dialog.current.close(); }, [open]);
  const close = () => { if (dialog.current?.open) dialog.current.close(); onClose(); };
  return <dialog ref={dialog} className="map-dialog review-dialog" aria-labelledby="review-title" onCancel={(e) => { e.preventDefault(); close(); }}>
    <div className="dialog-top"><div><span className="eyebrow">Private answer trail</span><h2 id="review-title">Review your answers</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Close review"><X size={20} /></button></div>
    <p className="dialog-lede">Read the choices you committed. Sealed checks show only their own answer state until all eight are resolved.</p>
    <div className="review-list">{QUESTIONS.map((q, i) => { const value = state.answers?.[q.id]; const status = value === 'skip' ? 'Skipped' : value ? 'Answered' : 'Open'; const locked = q.test && Boolean(state.locked); return <button type="button" key={q.id} className="review-row" onClick={() => { if (!value && q.test) return; onVisit(q); close(); }} disabled={!value && q.test}><span className="review-number">{String(i + 1).padStart(2, '0')}</span><span><strong>{q.title}</strong><small>{q.test ? 'Sealed check · ' : ''}{status}</small></span><span className={`review-status ${value ? 'is-done' : ''}`}>{locked && q.test && !value ? 'locked' : status.toLowerCase()}</span></button>; })}</div>
  </dialog>;
}

export function HowDialog({ open, onClose }) {
  const dialog = useRef(null);
  useEffect(() => { if (open) dialog.current?.showModal(); else if (dialog.current?.open) dialog.current.close(); }, [open]);
  const close = () => { if (dialog.current?.open) dialog.current.close(); onClose(); };
  return <dialog ref={dialog} className="map-dialog how-dialog" aria-labelledby="how-title" onCancel={(e) => { e.preventDefault(); close(); }}>
    <div className="dialog-top"><div><span className="eyebrow">Small print, in human language</span><h2 id="how-title">How this works</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Close how this works"><X size={20} /></button></div>
    <div className="how-copy"><p>Genii keeps this conversation in your browser. The answer bank is authored in advance and matches repeated choices in the same context. It is a playful local prototype, not a scientific personality assessment.</p><div className="how-grid"><div><b>56 + 8</b><span>56 training questions build the reading. Eight new checks test it afterward.</span></div><div><b>Rule-based</b><span>Every category comes from an actual choice. Thin or tied evidence abstains.</span></div><div><b>Unscored notes</b><span>Context can help you remember why you chose something. It never changes the reading.</span></div><div><b>Your device</b><span>No network calls, account, analytics, or PII collection in this prototype.</span></div></div><p className="how-boundary">A self-reported bedtime, meal frequency, or movement count stays a fact. It is not silently turned into a judgment.</p></div>
  </dialog>;
}

export function MoreDialog({ open, onClose, onHow, onReview, onExport, onMap, onSave, onReset }) {
  const dialog = useRef(null);
  useEffect(() => { if (open) dialog.current?.showModal(); else if (dialog.current?.open) dialog.current.close(); }, [open]);
  const close = () => { if (dialog.current?.open) dialog.current.close(); onClose(); };
  const action = (fn) => { close(); fn(); };
  return <dialog ref={dialog} className="map-dialog more-dialog" aria-labelledby="more-title" onCancel={(e) => { e.preventDefault(); close(); }}>
    <div className="dialog-top"><div><span className="eyebrow">Small useful drawer</span><h2 id="more-title">More</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Close menu"><X size={20} /></button></div>
    <div className="more-actions"><button type="button" onClick={() => action(onMap)}><Map size={17} /><span><b>Chapter map</b><small>See what is open and what is ahead</small></span></button><button type="button" onClick={() => action(onHow)}><Info size={17} /><span><b>How it works</b><small>Read the local-only evidence notes</small></span></button><button type="button" onClick={() => action(onReview)}><Check size={17} /><span><b>Review answers</b><small>Open the choices you have committed</small></span></button><button type="button" onClick={() => action(onExport)}><Map size={17} /><span><b>Export current answers</b><small>Download a private JSON copy</small></span></button><button type="button" onClick={() => action(onSave)}><ArrowLeft size={17} /><span><b>Save &amp; leave</b><small>Return home; this device keeps your place</small></span></button><button type="button" onClick={() => action(onReset)}><RotateCcw size={17} /><span><b>Start again</b><small>Clear this quiz after one last check</small></span></button></div>
  </dialog>;
}
