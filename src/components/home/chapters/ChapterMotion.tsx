"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import LightPool from "@/components/home/LightPool";

/**
 * CHAPTER MOTION
 *
 * One shared fluid-motion wrapper for the animated archive chapters. Built in
 * Build 11C, replacing useChapterReveal's one-shot enter animation with a
 * continuous, scroll-derived camera move.
 *
 * WHY A WRAPPER RATHER THAN A CLIENT CHAPTER
 * Each chapter file stays a Server Component. Only this file carries "use
 * client", so giving six chapters fluid motion added exactly ONE client
 * component to the bundle instead of three. The markup, alt text and plate
 * data are still server-rendered.
 *
 * THE FLUID MODEL
 * Progress is measured across the whole passage of the chapter through the
 * viewport - offset ["start end", "end start"] - so the movement is continuous
 * and reversible rather than a one-shot reveal that fires once and is done.
 * Two things move AGAINST each other:
 *
 *   the plate    travels +parallax -> -parallax, and eases toward the reader
 *   the metadata travels +counter  -> -counter,  the OPPOSITE way
 *
 * With the default parallax 90 and counter -26 the plate crosses its whole
 * travel while the metadata crosses the other way at under a third the
 * amplitude, so the gap between them only ever widens and they can never
 * collide at any scroll position.
 *
 * That counter-movement is what reads as fluid. One element sliding past reads
 * as a transition; two elements separating at different rates reads as depth.
 * A light field between them drifts on the same progress, so the space around
 * the plate travels with the object.
 *
 * The metadata resolves slightly earlier than the plate, so the filing record
 * is readable while the artwork is still settling in.
 *
 * NOTHING STICKS. offset is "start end" to "end start" with no sticky parent,
 * so the chapter travels normally with the page and never traps the scroll.
 * The page keeps exactly one pinned track, the locked Hero.
 *
 * DETERMINISM
 * Every value is a pure function of scroll progress: no React state is written
 * during scroll, no wheel or touch listener, no preventDefault, no
 * time-driven animation, no scroll-jacking. Forward and backward scrolling are
 * exact mirrors, and any given scroll offset always resolves to the same
 * visual state.
 *
 * REDUCED MOTION
 * When prefers-reduced-motion is set, every Motion component receives no
 * animation props at all. Plate and metadata then render at their natural
 * positions, scale and opacity - visible, static, no transform - and the light
 * field is omitted rather than left stranded at a stale mid-value. Identical
 * markup either way.
 */
export default function ChapterMotion({
  plate,
  meta,
  gridClassName = "",
  plateClassName = "",
  metaClassName = "",
  parallax = 90,
  scaleFrom = 0.94,
  counter = -26,
  poolPeak,
  poolClassName = "h-[112%] w-[132%]",
  children,
}: {
  /** The plate, built by the server chapter. */
  plate: ReactNode;
  /** The filing metadata, built by the server chapter. */
  meta: ReactNode;
  /** Classes for the positioning grid. `relative` is added automatically. */
  gridClassName?: string;
  /** Grid placement of the plate, e.g. "lg:col-span-8 lg:col-start-3". */
  plateClassName?: string;
  /** Grid placement of the metadata. */
  metaClassName?: string;
  /** Plate travel, px, in each direction. */
  parallax?: number;
  /** Plate scale at the start of the passage; approaches 1.06 at the end. */
  scaleFrom?: number;
  /** Metadata counter-travel, px. Negative moves opposite to the plate. */
  counter?: number;
  /** Peak alpha for the travelling light field. Omit, or pass null, for none. */
  poolPeak?: number | null;
  /** Size of the light field relative to its container. */
  poolClassName?: string;
  /** Anything else that belongs inside the grid but outside the animated pair. */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const animate = !reduced;

  /* ---- The plate: travels and eases toward the reader ------------------ */
  const plateOpacity = useTransform(scrollYProgress, [0, 0.14], [0, 1]);
  const plateY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [scaleFrom, 1.06]);

  /* ---- The metadata: counter-travels, and resolves earlier -------------- */
  const metaOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const metaY = useTransform(scrollYProgress, [0, 1], [counter, -counter]);

  /* ---- The light: present, but barely --------------------------------- */
  /* Build 12B: on a LIGHT surface this is omitted entirely. LightPool paints
     an ivory glow, which cannot be seen on ivory or stone; and it is not
     needed there either, because the plate is a near-black rectangle that
     already separates from a pale ground. Nothing is inverted or tinted. */
  const poolY = useTransform(scrollYProgress, [0, 1], [
    parallax * 0.4,
    -parallax * 0.4,
  ]);
  const poolScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.08]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${gridClassName}`}>
      {children}

      {/* Absolutely positioned, so it is out of grid flow and never becomes a
          track of its own.

          overflow-hidden on the wrapper above is LOAD-BEARING, not decoration.
          The light field is deliberately wider than the plate (132-146%) and
          Motion additionally scales it up to 1.08, so without clipping it
          extends past the viewport and produces 35-169px of horizontal
          overflow at every viewport tested. The two locked sections this
          pattern came from had the same oversized fields and were safe only
          because they sat inside overflow-hidden sticky frames. */}
      {poolPeak ? (
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${poolClassName}`}
          style={animate ? { opacity: plateOpacity, y: poolY, scale: poolScale } : undefined}
        >
          <LightPool className="h-full w-full" peak={poolPeak} />
        </motion.div>
      ) : null}

      {/* THE PLATE IS RENDERED FIRST, THE METADATA SECOND. This is not a
          styling preference, it is a load-bearing DOM order: below lg the grid
          is a single column, so whichever child comes first renders on top.
          Rendering the metadata first put the heading above the artwork on
          every mobile viewport, which is the opposite of the required
          ARTWORK -> METADATA sequence.

          From lg up the grid placement classes override the source order, and
          both children carry an explicit lg:row-start-1 so the sparse
          placement algorithm cannot drop the second child into a new row. */}
      <motion.div
        className={plateClassName}
        style={animate ? { opacity: plateOpacity, y: plateY, scale: plateScale } : undefined}
      >
        {plate}
      </motion.div>

      <motion.div
        className={metaClassName}
        style={animate ? { opacity: metaOpacity, y: metaY } : undefined}
      >
        {meta}
      </motion.div>
    </div>
  );
}