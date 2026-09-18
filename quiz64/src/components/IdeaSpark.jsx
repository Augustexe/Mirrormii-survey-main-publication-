import React from "react";
import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";

/** A brief acknowledgment of a selection, never a correctness signal. */
export function IdeaSpark({ trigger, reduced = false }) {
  if (!trigger) return null;
  return (
    <motion.div
      key={trigger}
      className="genii-idea"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.6, y: 10, rotate: -14 }}
      animate={
        reduced
          ? { opacity: 1 }
          : {
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1.1, 1, 0.95],
              y: [10, -3, 0, -5],
              rotate: [-14, 7, 0, 0],
            }
      }
      transition={{
        duration: reduced ? 0 : 2.2,
        times: [0, 0.18, 0.78, 1],
        ease: "easeOut",
      }}
    >
      <span className="genii-idea__halo" />
      <span className="genii-idea__jewel">
        <Lightbulb size={22} strokeWidth={1.65} />
      </span>
      <i className="genii-idea__ray genii-idea__ray--one" />
      <i className="genii-idea__ray genii-idea__ray--two" />
      <i className="genii-idea__ray genii-idea__ray--three" />
    </motion.div>
  );
}
