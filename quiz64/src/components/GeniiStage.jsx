import React from 'react';
import { Sparkles } from 'lucide-react';
import { asset } from '../survey.js';

const moods = { attentive: asset('genii-attentive.png'), curious: asset('genii-curious.png'), skeptical: asset('genii-skeptical.png') };

export function GeniiStage({ mood = 'curious', compact = false, bubble = 'Be yourself. I’ll make it weird.', chapter, progress }) {
  return <div className={`genii-stage ${compact ? 'genii-stage--compact' : ''}`}>
    {!compact && <><img className="portal-scene" src={asset('halo-scene.png')} alt="" aria-hidden="true" /><div className="portal-ambient" /><div className="portal-ring portal-ring--back" /><div className="portal-ring portal-ring--front" /><div className="portal-floor" /></>}
    <div className="genii-bubble"><Sparkles size={14} strokeWidth={1.7} aria-hidden="true" /><span>{bubble}</span></div>
    <img className="genii-sprite" src={moods[mood] || moods.curious} alt="Genii" />
    {chapter && <div className="stage-caption"><span>Genii studio</span><strong>Chapter {chapter}</strong>{progress != null && <i style={{ '--progress': `${progress}%` }} />}</div>}
  </div>;
}
