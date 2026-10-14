/**
 * MOTION VOCABULARY
 *
 * The numeric mirror of the motion tokens declared in src/app/globals.css.
 *
 * WHY A TypeScript COPY OF THE CSS TOKENS
 * Motion animates through inline styles, not through CSS custom properties, so
 * it cannot read --dur-image or --ease-editorial at runtime. These constants
 * exist so the client layer and the stylesheet speak the same numbers.
 *
 * They are kept adjacent to the tokens by comment, not by build step, and the
 * matching block in globals.css is the authority. If a value here is ever
 * changed without changing the token, the page develops two motion dialects -
 * which is the single failure this system exists to prevent.
 *
 * THE GOVERNING IDEA
 * Duration scales with perceived mass. Metadata moves fast. Imagery moves
 * slowly. A whole scene resolves last. Every value below follows from that one
 * rule, which is what lets nine differently-composed sections read as one
 * system rather than nine unrelated demos.
 *
 * THREE LEVELS, AND ONLY THREE
 *   L1 MICRO          hover, colour, underline, small state
 *   L2 CHOREOGRAPHY   section elements: type, imagery, masks, rules
 *   L3 CINEMATIC      full-scene and veil transitions
 *
 * THREE EASINGS, AND ONLY THREE
 *   archive    exponential-out. The default. Fast commitment, long settle.
 *   editorial  a longer tail. Reserved for display type and imagery.
 *   drape      symmetric and therefore reversible. Hover only.
 *
 * No spring and no bounce: fabric does not bounce. No linear, no bare ease-in.
 */

export type CubicBezier = [number, number, number, number];

export const EASE: Record<"archive" | "editorial" | "drape", CubicBezier> = {
  archive: [0.22, 1, 0.36, 1],
  editorial: [0.16, 1, 0.3, 1],
  drape: [0.62, 0, 0.38, 1],
};

export type EaseName = keyof typeof EASE;

/** Seconds. Mirrors the --dur-* tokens in globals.css. */
export const DUR = {
  /** L1 - hover, colour, underline. */
  micro: 0.22,
  /** L1 - controls and settled state changes. */
  firm: 0.42,
  /** L2 - the standard element reveal. Was declared but never consumed before Build 13. */
  reveal: 0.9,
  /** L2 - display typography. */
  type: 1.2,
  /** L2 - imagery, and the slowest mask sweep. */
  image: 1.4,
  /** L3 - section veil and surface transitions. */
  veil: 1.9,
  /** L3 - a whole scene resolving. */
  scene: 2.4,
} as const;

export type DurName = keyof typeof DUR;

/**
 * Maximum parallax displacement in px, mirroring --parallax-* in globals.css.
 *
 * Three rates and never more. A fourth depth plane reads as gimmick rather
 * than depth. Drift halves all three below the lg breakpoint; see
 * useCompactMotion.
 */
export const DRIFT = {
  /** Background fields, atmospheric layers. */
  slow: 60,
  /** The default for imagery. */
  mid: 110,
  /** Foreground objects. Use sparingly. */
  fast: 180,
} as const;

/**
 * The only sanctioned stagger steps in the whole build.
 *
 * Staggering every element is the fastest way to make an editorial page look
 * like a component library demo. Four places are permitted to stagger and no
 * others; every other reveal fires as a single group.
 */
export const STAGGER = {
  /** Hero entrance. */
  entrance: 0.12,
  /** The six-row Collection manifest. */
  manifest: 0.06,
} as const;

/** Never more than this many steps in any one staggered group. */
export const STAGGER_MAX_STEPS = 4;