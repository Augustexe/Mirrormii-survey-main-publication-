import React, { useContext } from "react";
import { motion, MotionConfigContext, useReducedMotion } from "motion/react";

export function ConversationProgress({ value, total }) {
  const osReduced = useReducedMotion();
  const config = useContext(MotionConfigContext);
  const reduced = osReduced || config.reducedMotion === "always";
  const percent = total ? (value / total) * 100 : 0;
  return (
    <div
      className="progress-rail progress-rail--luminous"
      role="progressbar"
      aria-label="Conversation progress"
      aria-valuemin="0"
      aria-valuemax={total || 64}
      aria-valuenow={value}
    >
      <span className="progress-rail__fill" style={{ width: `${percent}%` }}>
        {value > 0 && (
          <b className="progress-rail__light-wrap" aria-hidden="true">
            <motion.i
              key={value}
              className="progress-rail__light"
              initial={reduced ? false : { x: "-100%", opacity: 0 }}
              animate={
                reduced
                  ? { opacity: 0 }
                  : { x: ["-100%", "100%"], opacity: [0, 0.8, 0] }
              }
              transition={{ duration: 0.85, ease: "easeOut" }}
            />
          </b>
        )}
      </span>
      <i className="progress-rail__ticks" aria-hidden="true" />
    </div>
  );
}
