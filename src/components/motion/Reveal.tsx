"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE, type EaseName } from "./vocabulary";

/**
 * REVEAL
 *
 * One-shot viewport reveal. The ordinary entrance for section elements.
 *
 * WHY A WRAPPER RATHER THAN MAKING SECTIONS CLIENT COMPONENTS
 * Section components stay Server Components and pass their markup in as
 * children. Only this file carries "use client", so giving the entire homepage
 * an entrance choreography costs exactly ONE small client component per
 * grouping rather than converting nine sections. Alt text, plate data and
 * heading structure are still server-rendered.
 *
 * This is the pattern ChapterMotion proved in Build 11C, where six archive
 * chapters gained fluid motion off a single wrapper.
 *
 * WHY ONE-SHOT AND NOT SCRUB
 * whileInView with once:true uses IntersectionObserver: no scroll listener, no
 * React state written during scroll, no replay on scroll-up. Element state is
 * therefore a function of intersection, not of scroll position. Scroll-linked
 * camera movement is a separate, deliberate decision made per section - never
 * the default. See Drift and the section components.
 *
 * THE PATTERNS
 * Three families, eight patterns. The point of naming them is that a section
 * chooses a pattern the way it chooses a colour, so the page cannot drift into
 * eight unrelated animation styles.
 *
 *   entrance   fade, rise, slide-left, slide-right  metadata, rules, captions
 *   imagery    settle, depth                      plates and imagery
 *   masked     mask, iris                          reveals with a character
 *
 * DISTANCE DISCIPLINE
 * 16px of travel and 1.5% of scale. Larger values stop reading as arrival and
 * start reading as a zoom effect, which is not this brand. Override per call
 * site only where composition demands it.
 *
 * PROGRESSIVE ENHANCEMENT / REDUCED MOTION
 * The server and first hydration render use the same native tag and class with
 * no hidden initial values. Motion is enabled only after the client has checked
 * whether the element was already visible, so hydration cannot hide content a
 * reader has already reached. With reduced motion, a plain tag is rendered with
 * no animated values or inline transform.
 */
export type RevealPattern =
  | "fade"
  | "rise"
  | "slide-left"
  | "slide-right"
  | "settle"
  | "depth"
  | "mask"
  | "iris";

type Values = {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  clipPath?: string;
};

type Spec = {
  from: Values;
  to: Values;
  ease: EaseName;
  duration: number;
};

const PATTERNS: Record<RevealPattern, (distance: number, scaleFrom: number) => Spec> = {
  /* ---- entrance --------------------------------------------------------- */
  fade: () => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    ease: "archive",
    duration: DUR.reveal,
  }),
  rise: (d) => ({
    from: { opacity: 0, y: d },
    to: { opacity: 1, y: 0 },
    ease: "archive",
    duration: DUR.reveal,
  }),
  "slide-left": (d) => ({
    from: { opacity: 0, x: d },
    to: { opacity: 1, x: 0 },
    ease: "archive",
    duration: DUR.reveal,
  }),
  "slide-right": (d) => ({
    from: { opacity: 0, x: -d },
    to: { opacity: 1, x: 0 },
    ease: "archive",
    duration: DUR.reveal,
  }),

  /* ---- imagery ---------------------------------------------------------- */
  settle: (_d, s) => ({
    from: { opacity: 0, scale: s },
    to: { opacity: 1, scale: 1 },
    ease: "editorial",
    duration: DUR.image,
  }),
  depth: (_d, s) => ({
    from: { opacity: 0, scale: 1 + s },
    to: { opacity: 1, scale: 1 },
    ease: "editorial",
    duration: DUR.image,
  }),

  /* ---- masked ------------------------------------------------------------
     IMPLEMENTATION NOTE, BUILD 13.1. These two patterns were originally
     expressed as clip-path strings - inset() for the wipe and circle() for the
     iris. That does not work through whileInView variants: Motion does not
     interpolate the value and the element sits permanently at its INITIAL
     state.

     This was live on the site through Build 13 and was not caught, because
     every heading using the mask pattern - THE ARCHIVE IS OPEN, Story, The
     house, Join the Archive - rendered as an invisible, zero-height clipped
     box while still occupying layout. It surfaced the moment the browser
     could actually run animation frames.

     Both patterns are therefore expressed as TRANSFORMS, which Motion handles
     reliably and which are also GPU-friendly: a scaleY wipe from the baseline
     for mask, and a scale-up for the iris. The Collection sequence keeps its
     real clip-path masks, because those are driven by scroll progress on a
     MotionValue rather than by a variant, and interpolation works there. */
  mask: (d) => ({
    from: { opacity: 0, scaleY: 0.24, y: d * 0.4 },
    to: { opacity: 1, scaleY: 1, y: 0 },
    ease: "editorial",
    duration: DUR.image,
  }),
  iris: (_d, s) => ({
    from: { opacity: 0, scale: 1 + s * 8 },
    to: { opacity: 1, scale: 1 },
    ease: "editorial",
    duration: DUR.image,
  }),
};

const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
} as const;

const PLAIN_TAGS = {
  div: "div",
  span: "span",
  li: "li",
} as const;

function intersectsViewport(element: HTMLElement | null): boolean {
  if (!element || typeof window === "undefined") return false;

  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return false;

  const visibleWidth = Math.max(
    0,
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0),
  );
  const visibleHeight = Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
  );

  // Any visible pixels must stay visible when hydration activates motion. The
  // configured `amount` remains the threshold for the existing whileInView.
  return visibleWidth > 0 && visibleHeight > 0;
}

export default function Reveal({
  pattern = "rise",
  delay = 0,
  duration,
  ease,
  distance = 16,
  scaleFrom = 0.015,
  className = "",
  as = "div",
  amount = 0.2,
  children,
}: {
  pattern?: RevealPattern;
  /** Seconds. Only four staggered groups are sanctioned in the whole build. */
  delay?: number;
  /** Seconds. Defaults to the pattern's own mass-appropriate duration. */
  duration?: number;
  /** Overrides the pattern's easing. Rarely needed. */
  ease?: EaseName;
  /** px of travel for rise and slide. */
  distance?: number;
  /** Fraction of scale for settle and depth. */
  scaleFrom?: number;
  className?: string;
  as?: keyof typeof MOTION_TAGS;
  /** IntersectionObserver threshold before the reveal fires. */
  amount?: number;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const elementRef = useRef<HTMLElement | null>(null);
  const [clientReady, setClientReady] = useState(false);
  const [visibleAtActivation, setVisibleAtActivation] = useState(false);
  const captureRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  useEffect(() => {
    if (reduced) return;

    // Wait one frame for layout and scroll restoration, keeping the server and
    // hydration output visible while we establish the initial reveal state.
    const frame = window.requestAnimationFrame(() => {
      setVisibleAtActivation(intersectsViewport(elementRef.current));
      setClientReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [amount, reduced]);

  if (reduced) {
    const Plain = PLAIN_TAGS[as];
    return <Plain className={className}>{children}</Plain>;
  }

  const spec = PATTERNS[pattern](distance, scaleFrom);
  const Tag = MOTION_TAGS[as];
  const animate = clientReady;

  /* A wipe reveals upward from the baseline, so the element has to be scaled
     about its bottom edge rather than its centre. Without this the mask
     pattern grows out of the middle of the heading and reads as a zoom. */
  const origin =
    animate && pattern === "mask"
      ? { transformOrigin: "bottom center" }
      : undefined;

  return (
    <Tag
      ref={captureRef}
      className={className}
      style={origin}
      initial={false}
      animate={
        animate
          ? visibleAtActivation
            ? spec.to
            : spec.from
          : undefined
      }
      whileInView={animate ? spec.to : undefined}
      viewport={animate ? { once: true, amount } : undefined}
      transition={
        animate
          ? {
              duration: duration ?? spec.duration,
              delay,
              ease: EASE[ease ?? spec.ease],
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
