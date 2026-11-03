"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import Symbol from "@/components/brand/Symbol";
import Wordmark from "@/components/brand/Wordmark";
import ConstructionField from "@/components/home/ConstructionField";
import LightPool from "@/components/home/LightPool";
import ParticleMorph from "@/components/home/ParticleMorph";

/**
 * HERO — THE THRESHOLD
 *
 * Restored in Build 13 Phase 17 at client instruction, after Phase 3 replaced
 * it. The client asked for the logo scroll animation back, and was right to:
 * it is the signature motion of this brand and removing it cost the homepage
 * something the section list alone could not replace.
 *
 * THE SEQUENCE
 * Opening revised 2026-10-31 at client instruction (the particle threshold,
 * see AGENTS.md). The first screen is no longer void:
 *
 *   0.00-0.08  MR.KCRONUS      the wordmark, held in shimmering particles
 *   0.08-0.38  THE MORPH       the particles release and re-gather as the symbol
 *   0.32-0.46  THE SYMBOL      the canonical mark resolves over them
 *   0.20-0.60  ASSEMBLY        the field expands and turns to frame it
 *   0.36-0.62  LIGHT           the page supplies the light the mark needs
 *   0.44-0.56  ACTIVATION      the single gold cast
 *   0.56-0.86  PASSAGE         the mark dissolves back into particles and the
 *                              camera passes through it and the field
 *   0.78-1.00  THE DOOR        what lies behind the symbol resolves
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
 * WHY THE ALT TEXT NAMES NO DESIGN
 *
 * The alt describes the pixels and stops there: it does not name THE
 * ARCHITECT or any other design. That is deliberate on two counts. It is a hero
 * brand visual, never a canonical collection specification, so asserting a
 * design identity in its accessible name would promote it into one. And
 * artifact-architect.png depicts the OBSOLETE cracked-clock Architect, which the
 * approved colourway PDF contradicts - 001 is a crescent moon and star on the
 * front and a cathedral corridor on the back. Describing the render truthfully
 * while declining to call it the design keeps the alt accurate to the image and
 * silent on canon the corpus cannot currently support. The asset itself was not
 * altered; see the known discrepancy recorded in collectionData.ts.
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

// Mobile keeps its 300px mark; desktop gets a larger one.
const MARK_CLASS = "h-[300px] max-w-[30vw] md:max-w-none lg:h-[min(52svh,460px)]";

export default function ThresholdHero() {
  const trackRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* ---- THE HERO OPENS ON MR.KCRONUS ----------------------------------
     The DOM wordmark is server-rendered, so the first frame is never empty.
     Once the particle scene is ready it takes over that exact box and the DOM
     wordmark steps back; without WebGL the DOM wordmark simply scrolls away. */
  const markRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [particlesReady, setParticlesReady] = useState(false);
  const onParticlesReady = useCallback(() => setParticlesReady(true), []);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0.03, 0.12], [1, 0]);
  const particleMorph = useTransform(scrollYProgress, [0.06, 0.34], [0, 1]);
  /* The particles settle away under the crisp mark, then return at 0.56 when
     the mark dissolves back into them for the passage. */
  const particleFade = useTransform(
    scrollYProgress,
    [0.34, 0.44, 0.56, 0.62],
    [1, 0, 0, 1],
  );
  const particleExit = useTransform(scrollYProgress, [0.6, 0.86], [0, 1]);

  /* The field assembles around the mark, then the camera passes through it:
     it scales past the viewer and is gone with the particles. */
  const fieldOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.36, 0.5, 0.6, 0.84],
    [0, 0, 0.5, 0.82, 0.82, 0],
  );
  const fieldRotate = useTransform(scrollYProgress, [0.3, 0.84], [0, 24]);
  const fieldScale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.84],
    [1.04, 0.94, 1, 2.6],
  );

  /* ---- MR.KCRONUS returns with the front door, masked in from the left */
  const wordOpacity = useTransform(scrollYProgress, [0.78, 0.86], [0, 1]);
  const wordY = useTransform(scrollYProgress, [0.78, 0.9], [26, 0]);
  const wordReveal = useTransform(
    scrollYProgress,
    [0.78, 0.9],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  /* ---- THE SYMBOL resolves over the particle symbol and later dissolves
     back into it. It never moves: the particles carry all the travel, so the
     two always coincide. */
  const markOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.42, 0.56, 0.64],
    [0, 1, 1, 0],
  );

  /* ---- LIGHT: the page supplies it ----------------------------------- */
  const poolOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.5, 0.62, 0.8],
    [0, 1, 0.6, 0],
  );
  const poolScale = useTransform(scrollYProgress, [0.36, 0.56, 0.8], [0.7, 1.05, 1.8]);

  /* ---- ACTIVATION: the one gold cast, the only gold on the site ------ */
  const goldOpacity = useTransform(scrollYProgress, [0.44, 0.5, 0.56], [0, 0.85, 0]);

  /* ---- THE FRONT DOOR is what lies behind the symbol ------------------ */
  const doorOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const doorY = useTransform(scrollYProgress, [0.78, 0.94], [22, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.84, 0.95], [0, 1]);
  const vitrineOpacity = useTransform(scrollYProgress, [0.86, 0.98], [0, 1]);
  const vitrineY = useTransform(scrollYProgress, [0.86, 1], [30, 0]);
  /* ---- REDUCED MOTION ---------------------------------------------------
     The whole composition, simply present. No field, no depth travel, no
     mask, no activation: a static threshold with the mark seated, the identity
     legible and one clear action reachable without scrolling anything.

     The static markup is present in both server and client output. A CSS
     prefers-reduced-motion query selects it before hydration, so reduced-motion
     users never receive the pinned choreography or a client-side tree swap. */
  const staticMarkup = (
    <section
      data-surface="dark"
      aria-labelledby="hero-heading-static"
      className="relative overflow-hidden pt-16 md:pt-20"
    >
      <h1 id="hero-heading-static" className="sr-only">
        MR.KCRONUS
      </h1>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[104rem] flex-col items-center justify-center gap-8 px-5 py-12 text-center md:min-h-[calc(102svh-5rem)] md:px-10 lg:px-14">
        <Symbol height={190} className="max-w-[38vw]" />
        <Wordmark
          width={420}
          style={{ maxWidth: "80vw" }}
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
            alt="MR.KCRONUS garment brand visual: a black short-sleeve tee printed with the house wordmark above a hooded figure framed inside a cracked clock face, above a ruined city."
            width={730}
            height={1024}
            sizes="(max-width: 1023px) 86vw, 280px"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );

  return (
    <>
      <div className="motion-preference-reduced">{staticMarkup}</div>
      <section
        ref={trackRef}
        data-surface="dark"
        aria-labelledby="hero-heading"
        className="motion-preference-full relative"
      >
        <h1 id="hero-heading" className="sr-only">
          MR.KCRONUS
        </h1>

        <div className="relative h-[200vh] lg:h-[280vh]">
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

            {/* Layer 2b - the opening. The DOM wordmark holds the first frame;
                the particle scene replaces it, carries it into the symbol and
                settles away under the canonical mark. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ opacity: introOpacity }}
            >
              <div
                ref={introRef}
                className={`transition-opacity duration-700 ${particlesReady ? "opacity-0" : ""}`}
              >
                <Wordmark width="min(80vw, 880px)" style={{ maxWidth: "none" }} />
              </div>
            </motion.div>
            <ParticleMorph
              morph={particleMorph}
              exit={particleExit}
              fade={particleFade}
              fromRef={introRef}
              toRef={markRef}
              onReady={onParticlesReady}
              className="pointer-events-none absolute inset-0 h-full w-full"
            />

            {/* Layer 3 - the canonical symbol, intact, arriving out of the depth
                and returning to it. Never split, never deformed. */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: markOpacity }}
            >
              <div ref={markRef}>
                <Symbol className={MARK_CLASS} />
              </div>
            </motion.div>

            {/* Layer 4 - the activation cast. The one gold moment on the site. */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: goldOpacity }}
            >
              <Symbol
                className={MARK_CLASS}
                color="var(--gold)"
              />
            </motion.div>

            {/* The scroll hint. Gone as soon as the reader begins. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 md:bottom-10"
              style={{ opacity: hintOpacity }}
            >
              <span className="meta meta-stone">Scroll</span>
              <span className="scroll-hint-line" />
            </motion.div>

            {/* The front door. Sits above the receding mark and resolves as it
                returns to depth, so the two read as one continuous move. */}
            <div className="relative z-10 mx-auto flex h-full max-w-[104rem] flex-col px-5 md:px-10 lg:px-14">
              <motion.div
                className="flex flex-1 flex-col items-center justify-center text-center"
                style={{ opacity: doorOpacity, y: doorY }}
              >
                {/* The wordmark masks in from the left at p 0.62 - 0.78, part
                    of the same scroll-driven sequence as the mark and the
                    field. It is not on a timer: nothing in this Hero resolves
                    on its own clock, so the whole threshold is one gesture the
                    reader performs. */}
                <motion.div style={{ opacity: wordOpacity, y: wordY }}>
                  <motion.div style={{ clipPath: wordReveal }}>
                    <Wordmark
                      width={420}
                      style={{ maxWidth: "80vw" }}
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
                    alt="MR.KCRONUS garment brand visual: a black short-sleeve tee printed with the house wordmark above a hooded figure framed inside a cracked clock face, above a ruined city."
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
    </>
  );
}
