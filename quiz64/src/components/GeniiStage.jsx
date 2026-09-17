import React from "react";
import { Sparkles } from "lucide-react";
import { asset } from "../survey.js";

const moods = {
  attentive: asset("genii-attentive.png"),
  curious: asset("genii-curious-delivery.png"),
  skeptical: asset("genii-skeptical.png"),
};

export function GeniiStage({
  mood = "curious",
  compact = false,
  bubble = "Be yourself. I’ll make it weird.",
  chapter,
  progress,
}) {
  return (
    <div
      className={`genii-stage ${compact ? "genii-stage--compact" : ""}`}
      data-mood={mood}
    >
      {!compact && (
        <>
          <img
            className="stage-environment"
            src={asset("genii-glass-stage.webp")}
            width="1536"
            height="1024"
            fetchPriority="low"
            alt=""
            aria-hidden="true"
          />
        </>
      )}
      <div className="genii-bubble">
        <Sparkles size={14} strokeWidth={1.7} aria-hidden="true" />
        <span>{bubble}</span>
      </div>
      <img
        className="genii-sprite"
        src={moods[mood] || moods.curious}
        width="612"
        height="582"
        fetchPriority={compact ? "auto" : "high"}
        alt="Genii"
      />
      {chapter && (
        <div className="stage-caption">
          <span>Genii studio</span>
          <strong>Chapter {chapter}</strong>
          {progress != null && <i style={{ "--progress": `${progress}%` }} />}
        </div>
      )}
    </div>
  );
}
