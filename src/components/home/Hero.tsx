"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Symbol from "@/components/brand/Symbol";
import Wordmark from "@/components/brand/Wordmark";
import ConstructionField from "@/components/home/ConstructionField";
import LightPool from "@/components/home/LightPool";
import { useCompactMotion } from "@/components/motion/motionEnv";

/**
 * HERO — THE THRESHOLD
 *
 * Restored in Build 13 Phase 17 at client instruction, after Phase 3 replaced
 * it. The client asked for the logo scroll animation back, and was right to:
 * it is the signature motion of this brand and removing it cost the homepage
 * something the section list alone could not replace.
 *
 * WHAT CAME BACK
 * The full symbol choreography, layer for layer, from the retired Hero:
 *
 *   0.00-0.10  VOID            the construction field resolves out of nothing
 *   0.08-0.22  MR.KCRONUS      the wordmark masks in from the left
 *   0.20-0.40  THE SYMBOL      the canonical mark arrives out of the depth
 *   0.30-0.72  ASSEMBLY        the field expands and turns to frame it
 *   0.40-0.68  LIGHT           the page supplies the light the mark needs
 *   0.46-0.66  ACTIVATION      the single gold cast
 *   0.62-0.94  RECEDING        the mark returns to depth as a watermark and
 *                              the front door resolves over it
 *
 * WHAT DID NOT COME BACK, AND WHY
 * The exploded archive plate and the THE ARCHIVE IS OPEN statement. Those are
 * not the logo animation - they were the miniature archive film that the whole
 * Build 13 rearchitecture was commissioned to remove, and both now belong to
 * the Archive Teaser, which is where the mythology lives. Restoring them here
 * would put the archive crawl back on the homepage.
 *
 * The Hero is pinned for ONE viewport of scroll rather than the retired seven.
 * All seven beats are preserved; they are simply resolved across 140svh of
 * runway instead of 660svh. The page gains roughly 800px and stays a fraction
 * of its former 21,251px.
 *
 * THE MARK IS NEVER TRANSFORMED OUT OF SHAPE
 * The symbol is never scaled non-uniformly, skewed, rotated or split. It travels
 * in z-depth and settles in scale, and the field supplies the movement. Its
 * fused core stays fused and its geometry stays canonical.
 *
 * THE GOLD BEAT IS THE ONLY GOLD
 * One occurrence, from p 0.46 to p 0.66, peaking at 0.85 alpha and gone by
 * 0.66. Antique Gold is documented as extremely restrained and this is the one
 * place it earns its place: the activation. It is a cast over the ivory mark,
 * not a replacement, so the canonical geometry is never recoloured.
 *
 * THE FRONT DOOR STILL EXISTS
 * The film does not swallow the homepage. From p 0.62 the identity resolves
 * under the receding mark, and by p 0.94 there is a single clear action - the
 * Collection - plus the highest-resolution garment render in the corpus. The
 * garment sits here as a HERO / BRAND VISUAL only; collection-board.png remains
 * the canonical collection specification and the two are never conflated.
 *
 * DETERMINISM
 * Every value is a pure transform of scroll progress. No React state during
 * scroll, no scroll-jacking, no time-driven loop. Backwards scrolling is an
 * exact mirror. All input ranges lie inside [0, 1] and are non-decreasing,
 * because Motion consumes them directly as WAAPI keyframe offsets.
 *
 * REDUCED MOTION
 * A static dark stage: field, mark, wordmark, action and garment all present and
 * fully visible, with no transforms and no choreography. The single action is
 * reachable immediately rather than after any scroll.
 */

const MARK_CLASS = "max-w-[30vw] md:h-[300px] md:max-w-none";

export default function Hero() {
  const reduced = useReducedMotion();
  const compact = useCompactMotion();
  const trackRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* ---- THE HERO OPENS ON VOID ----------------------------------------
     The first frame is black and that is correct. The mark is assembled,
     the field expands, the light is supplied, the gold fires and the front
     door resolves - all of it driven by scroll across one viewport of
     runway. A threshold should feel like a threshold.

     (Reverted at client instruction after a composed-rest-state experiment.
     The visitor is meant to arrive at nothing and then watch the house
     declare itself.) */
  const fieldOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.55, 0.72, 0.94],
    [0, 0.5, 0.82, 0.28, 0.12],
  );
  const fieldRotate = useTransform(scrollYProgress, [0.3, 0.8], [0, 12]);
  const fieldScale = useTransform(
    scrollYProgress,
    [0, 0.58, 0.8, 1],
    [1.04, 0.92, 1.06, 1],
  );

  /* ---- MR.KCRONUS: masks in from the left, early ---------------------- */
  const wordOpacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);
  const wordY = useTransform(scrollYProgress, [0.08, 0.22], [26, 0]);
  const wordReveal = useTransform(
    scrollYProgress,
    [0.08, 0.2],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  /* ---- THE SYMBOL arrives out of the depth and returns to it ---------- */
  const markOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.32, 0.62, 0.88, 1],
    [0, 1, 1, 0.5, 0.26],
  );
  const markScale = useTransform(
    scrollYProgress,
    [0.2, 0.38, 0.88, 1],
    [0.84, 1, 1.06, 0.82],
  );
  const markZ = useTransform(scrollYProgress, [0.2, 0.4, 0.88, 1], [-170, 10, 90, -140]);
  const markY = useTransform(scrollYProgress, [0.2, 0.38, 1], [14, 0, -50]);

  /* ---- LIGHT: the page supplies it ----------------------------------- */
  const poolOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.54, 0.68, 0.9],
    [0, 1, 0.6, 0.2],
  );
  const poolScale = useTransform(scrollYProgress, [0.4, 0.62], [0.7, 1.05]);

  /* ---- ACTIVATION: the one gold cast, the only gold on the site ------ */
  const goldOpacity = useTransform(scrollYProgress, [0.46, 0.56, 0.66], [0, 0.85, 0]);

  /* ---- THE FRONT DOOR resolves under the receding mark ---------------- */
  const doorOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
  const doorY = useTransform(scrollYProgress, [0.62, 0.86], [22, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const vitrineOpacity = useTransform(scrollYProgress, [0.76, 0.94], [0, 1]);
  const vitrineY = useTransform(scrollYProgress, [0.76, 0.96], [30, 0]);
  /* ---- REDUCED MOTION ---------------------------------------------------
     The whole composition, simply present. No field, no depth travel, no
     mask, no activation: a static threshold with the mark seated, the identity
     legible and one clear action reachable without scrolling anything.

     This branch was deleted by accident when the transform table above was
     rewritten. It is not optional - AGENTS.md requires a deliberately
     simplified reduced-motion experience, and this is the one place on the site
     that a reader arrives at before doing anything at all. */
  if (reduced) {
    return (
      <section
        data-surface="dark"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden pt-16 md:pt-20"
      >
        <h1 id="hero-heading" className="sr-only">
          MR.KCRONUS
        </h1>

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[104rem] flex-col items-center justify-center gap-8 px-5 py-12 text-center md:min-h-[calc(102svh-5rem)] md:px-10 lg:px-14">
          <Symbol height={190} className="max-w-[38vw]" />
          <Wordmark
            width={420}
            className="max-w-[80vw]"
            decorative={false}
            label="MR.KCRONUS"
          />
          <p className="meta meta-stone">Six designs</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="#collection" className="cta-solid">
              The Collection
            </Link>
            <Link href="/archive" className="cta-invitation">
              Enter the Archive
            </Link>
          </div>
          <div className="vitrine image-frame mt-2 w-full max-w-[280px]">
            <Image
              src="/brand/artifact-architect.png"
              alt="THE ARCHITECT: a black short-sleeve MR.KCRONUS tee printed with a cracked clock face, a hooded figure and a ruined city beneath it."
              width={730}
              height={1024}
              sizes="(max-width: 1023px) 86vw, 280px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>
    );
  }
  const runway = compact ? "200vh" : "240vh";

  return (
    <section
      ref={trackRef}
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="relative"
    >
      <h1 id="hero-heading" className="sr-only">
        MR.KCRONUS
      </h1>

      <div className="relative" style={{ height: runway }}>
        <div
          className="sticky top-0 h-svh overflow-hidden"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
        >
          <div className="absolute inset-0 bg-obsidian" aria-hidden="true" />

          {/* Layer 1 - the construction field: assembly geometry that expands
              and turns to frame the mark. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{
              opacity: fieldOpacity,
              rotate: fieldRotate,
              scale: fieldScale,
              transformStyle: "preserve-3d",
            }}
          >
            <ConstructionField className="h-[86svh] w-[86svh] max-h-[720px] max-w-[720px] text-ivory" />
          </motion.div>

          {/* Layer 2 - the page supplies the light the mark needs. A single
              radial gradient, no filter, no blur. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ opacity: poolOpacity, scale: poolScale }}
          >
            <LightPool
              className="h-[70svh] w-[70svh] max-h-[620px] max-w-[620px]"
              peak={0.3}
            />
          </motion.div>

          {/* Layer 3 - the canonical symbol, intact, arriving out of the depth
              and returning to it. Never split, never deformed. */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: markOpacity,
              scale: markScale,
              y: markY,
              z: markZ,
            }}
          >
            <Symbol height={300} className={MARK_CLASS} />
          </motion.div>

          {/* Layer 4 - the activation cast. The one gold moment on the site. */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: goldOpacity, scale: markScale, z: markZ }}
          >
            <Symbol
              height={300}
              className={MARK_CLASS}
              color="var(--gold)"
            />
          </motion.div>

          {/* The front door. Sits above the receding mark and resolves as it
              returns to depth, so the two read as one continuous move. */}
          <div className="relative z-10 mx-auto flex h-full max-w-[104rem] flex-col px-5 md:px-10 lg:px-14">
            <motion.div
              className="flex flex-1 flex-col items-center justify-center text-center"
              style={{ opacity: doorOpacity, y: doorY }}
            >
              {/* The wordmark masks in from the left at p 0.08 - 0.22, part
                  of the same scroll-driven sequence as the mark and the
                  field. It is not on a timer: nothing in this Hero resolves
                  on its own clock, so the whole threshold is one gesture the
                  reader performs. */}
              <motion.div style={{ opacity: wordOpacity, y: wordY }}>
                <motion.div style={{ clipPath: wordReveal }}>
                  <Wordmark
                    width={420}
                    className="max-w-[80vw]"
                    decorative={false}
                    label="MR.KCRONUS"
                  />
                </motion.div>
              </motion.div>

              <motion.p
                className="meta meta-stone mt-10"
                style={{ opacity: ctaOpacity }}
              >
                Six designs
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
                style={{ opacity: ctaOpacity }}
              >
                <Link href="#collection" className="cta-solid">
                  The Collection
                </Link>
                <Link href="/archive" className="cta-invitation">
                  Enter the Archive
                </Link>
              </motion.div>
            </motion.div>

            {/* The garment. A hero / brand visual, never the canonical
                collection specification. */}
            <motion.div
              className="flex shrink-0 justify-center pb-8 md:pb-10"
              style={{ opacity: vitrineOpacity, y: vitrineY }}
            >
              <div className="vitrine image-frame w-full max-w-[300px]">
                <Image
                  src="/brand/artifact-architect.png"
                  alt="THE ARCHITECT: a black short-sleeve MR.KCRONUS tee printed with a cracked clock face, a hooded figure and a ruined city beneath it."
                  width={730}
                  height={1024}
                  sizes="(max-width: 1023px) 86vw, 300px"
                  className="h-auto max-h-[30svh] w-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
