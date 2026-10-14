"use client";

import { Children, type ReactNode } from "react";
import Reveal, { type RevealPattern } from "./Reveal";

/**
 * STAGGER — ORCHESTRATED ENTRANCE GROUPS
 *
 * Composes one-shot Reveals into a single ordered entrance.
 *
 * WHY THIS EXISTS
 * Entrance choreography was previously hand-rolled per section with an inline
 * `delay={index * 0.06}` at each call site. That is how a page ends up with
 * eight different stagger intervals, three of them overlapping. Centralising it
 * means there is exactly one place that decides how a group enters, and the
 * limit below is enforceable rather than aspirational.
 *
 * THE LIMIT IS THE POINT
 * Staggering every element is the fastest way to make an editorial page look
 * like a component-library demo. `max` caps how many steps any one group may
 * take; beyond that, the remaining children share the final step so the group
 * still resolves as a whole. Motion that scales with content stops reading as
 * deliberate.
 *
 * step 0.06s reads as one continuous gesture at 60fps. Larger steps read as
 * separate animations arriving one after another, which is the thing to avoid.
 *
 * REDUCED MOTION
 * Reveal renders a plain element per child, so a reduced-motion reader gets the
 * same DOM and the same content with no motion at all.
 */
export default function Stagger({
  children,
  step = 0.06,
  max = 4,
  pattern = "rise",
  className = "",
  itemClassName = "",
  amount = 0.25,
}: {
  children?: ReactNode;
  /** Seconds between steps. */
  step?: number;
  /** Hard cap on the number of delay steps in this group. */
  max?: number;
  pattern?: RevealPattern;
  className?: string;
  itemClassName?: string;
  amount?: number;
}) {
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal
          key={index}
          pattern={pattern}
          delay={Math.min(index, max - 1) * step}
          className={itemClassName}
          amount={amount}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}