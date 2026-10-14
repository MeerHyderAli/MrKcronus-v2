import type { ReactNode } from "react";

/**
 * SECTION FRAME
 *
 * The semantic shell every Build 13 homepage section sits in.
 *
 * WHY THIS EXISTS
 * Seven new sections were added in Build 13. Each one needs three things that
 * must not vary: a stable anchor id, a declared surface so the Build 12B
 * light/dark system applies, and an accessible name bound to its own heading.
 * Written seven times by hand they would drift within one build; written here
 * they cannot.
 *
 * Attribute selectors rather than colour utilities are inherited from Build
 * 12B: the section declares which surface it sits on and the whole light/dark
 * editorial system resolves beneath it, so no component decides its own
 * colours.
 *
 * The heading is NOT rendered here. Each section owns its own h2 - its scale,
 * tracking and reveal are part of that section's art direction, and several of
 * them animate. This primitive only guarantees that the id the section points
 * aria-labelledby at is the one its heading actually carries.
 */
export default function Section({
  id,
  surface,
  labelledBy,
  className = "",
  children,
}: {
  /** Stable anchor. Used by the Hero CTA and by in-page navigation. */
  id: string;
  /** Build 12B surface scope: dark | charcoal | ivory | stone | stone-deep. */
  surface: "dark" | "charcoal" | "ivory" | "stone" | "stone-deep";
  /** id of the h2 this section is named by. */
  labelledBy: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-labelledby={labelledBy}
      className={`relative w-full ${className}`}
    >
      {children}
    </section>
  );
}