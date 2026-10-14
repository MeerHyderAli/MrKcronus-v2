"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCompactMotion } from "./motionEnv";

/**
 * FLOW — ONE CONTINUOUS TIMELINE
 *
 * The single most important addition in Build 13 Phase 5. Everything before it
 * gave each section its own independent motion, which is why the page read as a
 * series of demonstrations rather than one film: a section finished animating,
 * the next one restarted, and there was a visible seam at every boundary.
 *
 * Flow gives a section a continuous position in one shared timeline. It maps
 * the section's WHOLE passage through the viewport - offset ["start end",
 * "end start"] - to a single normalised progress, and derives both a
 * translation and an opacity from it.
 *
 * WHY THE SECTION ITSELF IS THE MEASUREMENT
 * Because every section measures itself against the same viewport and the same
 * easing, one section is still leaving while the next is arriving. The overlap
 * is structural rather than choreographed, so it cannot drift out of sync the
 * way per-section triggers do.
 *
 * THE SHAPE OF THE CURVE
 *
 *   0.00 ...................................... 1.00
 *   |         |            |                  |
 *   rise in  settled       still      drift out
 *   0 -> 0.5                0.5 -> 1
 *
 * Opacity is flat at 1 across the middle third of the window, so a section is
 * never dimmed while the reader is actually looking at it. It only dims in the
 * narrow approach and departure zones. This is what stops continuous motion
 * from turning into constant motion, which AGENTS.md rules out.
 *
 * DEPTH THROUGH COUNTER-MOVEMENT
 * Pass a negative `rise` to the background layer of a composition and a positive
 * one to the foreground and the two separate as the section passes. That
 * counter-drift is what reads as fluid depth rather than as a slide.
 *
 * DETERMINISM
 * Every value is a pure function of scroll position. No React state is written
 * during scroll, no scroll or touch listener of our own, no preventDefault, no
 * scroll-jacking. Backwards scrolling is an exact mirror. All input ranges lie
 * inside [0, 1] and are non-decreasing, because Motion consumes them directly
 * as WAAPI keyframe offsets.
 *
 * REDUCED MOTION
 * A plain div with the same class and children. Motion writes no inline
 * transform at all, so content sits at its natural position and stays fully
 * visible and reachable.
 */
export default function Flow({
  children,
  className = "",
  rise = 18,
  fade = true,
  scale,
}: {
  children?: ReactNode;
  className?: string;
  /** Total travel across the whole passage, px. Negative counter-moves. */
  rise?: number;
  /** Fade in and out at the edges. Off for elements that must stay visible. */
  fade?: boolean;
  /** Optional scale range across the passage, e.g. [1.04, 1]. */
  scale?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const compact = useCompactMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = compact ? rise * 0.5 : rise;

  /* Arrives across the first half, holds, then drifts away. The asymmetry is
     deliberate: entering should decelerate into place, leaving should not
     compete with whatever comes next. */
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [travel * 2, 0, -travel]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.26, 0.74, 1],
    [0, 1, 1, 0],
  );

  const scaleValue = useTransform(scrollYProgress, [0, 1], [
    scale ? scale[0] : 1,
    scale ? scale[1] : 1,
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
      style={
        scale
          ? { y, opacity: fade ? opacity : 1, scale: scaleValue }
          : { y, opacity: fade ? opacity : 1 }
      }
    >
      {children}
    </motion.div>
  );
}