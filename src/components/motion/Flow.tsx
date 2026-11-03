"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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
 * PROGRESSIVE ENHANCEMENT / REDUCED MOTION
 * The server and first hydration render keep this same native div visible with
 * no scroll-derived opacity or transform. After mount, current viewport
 * progress is seeded before the existing Motion mapping is applied. With
 * reduced motion, the wrapper stays static with no inline transform, and
 * content remains fully visible and reachable.
 */
function readViewportProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const range = viewportHeight + rect.height;

  if (range <= 0) return 0;

  // Matches offset ["start end", "end start"]: progress 0 when the
  // element's top reaches the viewport bottom, and 1 when its bottom leaves
  // the viewport top. This seeds restored/direct-load scroll positions before
  // a fade-enabled MotionValue is attached.
  return Math.max(0, Math.min(1, (viewportHeight - rect.top) / range));
}

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
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const element = ref.current;
    if (!element) return;

    // Wait one frame for layout and browser scroll restoration. The wrapper
    // remains visible during this wait; seed before attaching opacity so a
    // direct load mid-page does not start from Motion's default zero progress.
    const frame = window.requestAnimationFrame(() => {
      scrollYProgress.set(readViewportProgress(element));
      setMotionReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [reduced, scrollYProgress]);

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

  const animate = motionReady;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        animate
          ? scale
            ? { y, opacity: fade ? opacity : 1, scale: scaleValue }
            : { y, opacity: fade ? opacity : 1 }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}