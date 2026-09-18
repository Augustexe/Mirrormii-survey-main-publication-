import React, { useContext, useRef } from "react";
import { MotionConfigContext, useInView, useReducedMotion } from "motion/react";

/**
 * Decorative presentation for an already-computed routine reading.
 * The marker stays at its supplied final coordinate; only the rail reveal moves.
 */
export function RoutineTrack({ period, position }) {
  const trackRef = useRef(null);
  const inView = useInView(trackRef, { once: true, amount: 0.7 });
  const prefersReducedMotion = useReducedMotion();
  const { reducedMotion } = useContext(MotionConfigContext);
  const reduced = prefersReducedMotion || reducedMotion === "always";
  const hasPosition = position !== null && position !== undefined;
  const isRecent = period.toLowerCase() === "recent";

  return (
    <div
      ref={trackRef}
      className={`routine-track routine-track--enhanced routine-track--${isRecent ? "recent" : "usual"}${hasPosition ? "" : " routine-track--empty"}`}
      data-track-visible={reduced || inView ? "true" : "false"}
      data-motion={reduced ? "off" : "on"}
      aria-hidden="true"
    >
      {[0, 33.333, 66.667, 100].map((tick) => (
        <i key={tick} style={{ left: `${tick}%` }} />
      ))}
      {hasPosition && (
        <>
          <span className="routine-fill" style={{ width: position }} />
          <span className="routine-marker" style={{ left: position }} />
        </>
      )}
    </div>
  );
}
