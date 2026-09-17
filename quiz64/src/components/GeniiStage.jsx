import React, { useContext, useEffect } from "react";
import {
  motion,
  MotionConfigContext,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Sparkles } from "lucide-react";
import { asset } from "../survey.js";

const moods = {
  attentive: asset("genii-attentive.png"),
  curious: asset("genii-alert-delivery.png"),
  skeptical: asset("genii-curious-delivery.png"),
};

/** Motion changes the stage's pose, never the character artwork or answer layout. */
export function GeniiStage({
  mood = "curious",
  compact = false,
  bubble = "Be yourself. I’ll make it weird.",
  chapter,
  progress,
  reactionKey,
}) {
  const prefersReducedMotion = useReducedMotion();
  const config = useContext(MotionConfigContext);
  const reduced = prefersReducedMotion || config.reducedMotion === "always";
  const pointerX = useSpring(0, { stiffness: 110, damping: 22 });
  const pointerY = useSpring(0, { stiffness: 110, damping: 22 });
  const rotate = useTransform(pointerX, [-1, 1], [-5, 5]);
  const x = useTransform(pointerX, [-1, 1], [-9, 9]);
  const y = useTransform(pointerY, [-1, 1], [-7, 7]);
  const settle = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
  useEffect(() => {
    if (reduced) {
      pointerX.jump(0);
      pointerY.jump(0);
    }
  }, [reduced, pointerX, pointerY]);
  const follow = (event) => {
    if (reduced || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    pointerY.set(((event.clientY - box.top) / box.height - 0.5) * 2);
  };
  return (
    <div
      className={`genii-stage ${compact ? "genii-stage--compact" : ""}`}
      data-mood={mood}
      data-stage-motion={reduced ? "off" : "on"}
      onPointerMove={follow}
      onPointerLeave={settle}
    >
      <div className="stage-artwork" aria-hidden="true">
        <img
          className="stage-environment"
          fetchpriority={compact ? "auto" : "high"}
          src={asset("genii-ribbon-stage.webp")}
          width="1536"
          height="1024"
          alt=""
        />
        <div className="stage-contact-shadow" />
      </div>
      <motion.div className="genii-pose" style={{ rotate, x, y }}>
        <motion.div
          key={reactionKey || "resting"}
          className="genii-reaction"
          initial={!reduced && reactionKey ? { y: 0, rotate: 0 } : false}
          animate={
            !reduced && reactionKey
              ? { y: [0, -13, 0], rotate: [0, 3, -2, 0] }
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img
            className="genii-sprite"
            src={moods[mood] || moods.curious}
            width="612"
            height="582"
            fetchpriority={compact ? "auto" : "high"}
            alt="Genii"
          />
        </motion.div>
      </motion.div>
      <div className="genii-bubble">
        <Sparkles size={14} strokeWidth={1.7} aria-hidden="true" />
        <span>{bubble}</span>
      </div>
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
