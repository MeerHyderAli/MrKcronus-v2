"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { DRIFT } from "./vocabulary";
import { useCompactMotion } from "./motionEnv";

/**
 * DRIFT
 *
 * Scroll-linked parallax for a single object. Deliberate, not ambient.
 *
 * WHAT IT IS FOR
 * A garment or plate should feel like it sits at a different depth from the
 * type around it. One element travelling while another holds still is the
 * whole trick - a travelling element alone reads as a transition, two
 * separating at different rates read as depth. Drift is always paired with
 * static type; it is never the only thing moving in a composition.
 *
 * DETERMINISM
 * Every value is a pure function of scroll position. No React state is
 * written during scroll, no wheel or touch listener, no preventDefault, no
 * time-driven loop, no scroll-jacking. Forward and backward scrolling are
 * exact mirrors and any given scroll offset always resolves to the same
 * visual state.
 *
 * The passage measured is start-of-element-enters to end-of-element-leaves, so
 * the object drifts across its entire time in view. Nothing sticks.
 *
 * THERE IS NO STAGGER OF PARALLAX RATES HERE
 * Depth comes from choosing between slow, mid and fast - three declared
 * values - not from giving several elements slightly different multipliers.
 * Four depth planes read as gimmick. See vocabulary.ts.
 *
 * MOBILE
 * Travel is halved below lg rather than removed. A garment that stops moving
 * entirely on a phone reads as a broken page, not a restrained one.
 *
 * REDUCED MOTION
 * A plain div with the same class and children. Motion writes no inline
 * transform at all, so the object sits at its natural position and remains
 * fully visible.
 */
export default function Drift({
  travel = DRIFT.mid,
  scaleFrom,
  className = "",
  children,
}: {
  /** Max displacement each way, px. Pass DRIFT.slow / DRIFT.mid / DRIFT.fast. */
  travel?: number;
  /** Pass a number to ease the object toward the reader across its passage. */
  scaleFrom?: number;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const compact = useCompactMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const amount = compact ? travel * 0.5 : travel;
  const hasScale = typeof scaleFrom === "number";

  /* Called unconditionally to respect the rules of hooks, then discarded when
     no scale range was requested. */
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const scale = useTransform(scrollYProgress, [0, 1], [
    scaleFrom ?? 1,
    hasScale ? (scaleFrom as number) + 0.06 : 1,
  ]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={hasScale ? { y, scale } : { y }}
    >
      {children}
    </motion.div>
  );
}