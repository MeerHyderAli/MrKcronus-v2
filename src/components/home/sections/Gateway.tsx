"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import ConstructionField from "@/components/home/ConstructionField";
import LightPool from "@/components/home/LightPool";
import { useCompactMotion } from "@/components/motion/motionEnv";
import { getLevelEntries, getUniverseLevel } from "@/components/universe/universe";

/**
 * ACT II - THE GATEWAY
 *
 * The threshold between the Hero's threshold and the Collection's floor.
 *
 * WHAT THIS IS FOR
 *
 * The Hero resolves on Obsidian with the canonical mark returning to depth. The
 * Collection opens on ivory with the ordered manifest. Between those two states
 * there was a hard tonal cut: the visitor left a dark room and arrived in a
 * bright one with nothing in between. That cut is the reason the homepage read
 * as two pages that happened to be adjacent.
 *
 * The Gateway is that missing movement. It is not a section with content of its
 * own so much as a crossing: the same architecture the Hero ended on is carried
 * forward through depth, the narrative chapter is named, and the ivory floor is
 * approached until it fills the frame and becomes the Collection's own ground.
 * Because the approaching plane is the exact --surface-ivory that Movement A
 * sits on, the handoff is invisible rather than announced.
 *
 * WHY IT IS NOT PINNED
 *
 * The Hero already owns one pinned track and Movement B owns a second. A third
 * pin would make the page feel like a corridor of waiting rooms and would
 * compete with the Collection sequence, which is the page's one true pinned
 * set-piece. The Gateway instead derives everything from its own scroll
 * progress while it is simply in view, which is enough to carry a camera
 * because the camera here is a set of transform changes, not a held frame.
 *
 * THE ARCHITECTURE IS THE HERO'S, CONTINUED
 *
 * Three ConstructionField planes recede on z under a single CSS perspective,
 * exactly as the Hero's field already does. Three is the number the motion
 * vocabulary permits for depth and a fourth reads as gimmick rather than depth.
 * The nearest plane passes the camera and leaves frame; the far plane is almost
 * gone by the time the ivory arrives. No geometry was invented: the field is
 * the same approved component the Hero draws, transformed in depth and nothing
 * else.
 *
 * THERE IS NO GOLD IN HERE, DELIBERATELY
 *
 * AGENTS.md records Antique Gold as extremely restrained, and the Hero already
 * spends it on the single activation cast, documenting that cast as the only
 * gold moment on the site. Adding a second gold event to the very next section
 * would devalue the first. The Gateway therefore uses ivory, stone and obsidian
 * only. Gold still appears here exactly once and for an unrelated, necessary
 * reason: as the focus ring, via the existing --surface-focus token.
 *
 * NOTHING IS ASSUMED ABOUT LEVEL 01
 *
 * The chapter label is read from the universe model rather than typed here, and
 * no entry is enumerated in this section. Movement A is the ordered index and
 * it owns that job; repeating six names here would duplicate it and would bake
 * a count into the page that a future level might not share.
 *
 * WHAT IS ANIMATED, AND WHY IT IS PROMOTED
 *
 * Every animated layer here moves on transform and opacity only, which is what
 * lets the compositor animate them without repainting. The corridor's planes are
 * the exception that proves the rule: a ConstructionField is live vector SVG, not
 * a bitmap, so an UNPROMOTED plane re-rasterises its strokes on every frame of a
 * scale change. That is the most expensive thing this section could ask for, and
 * it is invisible in the DOM and in a screenshot. Each plane and the portal
 * therefore carry an explicit will-change so they are promoted once and their
 * scale and travel are composited rather than redrawn.
 *
 * will-change is applied to exactly four elements and no more. It is a standing
 * claim on compositor memory, so it is spent only where a frame is genuinely at
 * risk and not as a blanket hint.
 *
 * The individual planes no longer declare transformStyle: preserve-3d. Only the
 * shared parent needs it, to give the corridor a single 3D context; repeating it
 * on every child just nests 3D contexts and makes layer promotion harder to
 * reason about.
 *
 * The chapter's bottom-up wipe is deliberately still a clip-path. It is bounded
 * to a narrow range of the scroll, it covers one heading-sized box, and it is
 * part of the typography language the Hero established. It is not worth trading
 * visual intent for.
 *
 * DETERMINISM
 *
 * Every value is a pure transform of scroll progress. No React state during
 * scroll, no timer, no loop. All input ranges are non-decreasing and lie inside
 * [0, 1], because Motion consumes them directly as keyframe offsets.
 *
 * REDUCED MOTION
 *
 * A static dark plate: the field, the light and the chapter name, all present
 * and legible, with no depth travel, no portal and no scroll dependency. The
 * Collection follows immediately afterwards exactly as it does on the full
 * version, so nothing downstream is ever withheld.
 */

const LEVEL_ID = "level-01";

export default function Gateway() {
  const reduced = useReducedMotion();
  const compact = useCompactMotion();
  const trackRef = useRef<HTMLElement>(null);

  /* Chapter identity comes from the universe model, never from a literal. */
  const level = getUniverseLevel(LEVEL_ID);
  const entries = getLevelEntries(LEVEL_ID);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.2"],
  });

  /* Mobile halves the travel rather than removing the movement, per
     useCompactMotion. The narrative crossing is the point of the section, so
     what is reduced is distance, never meaning. */
  const travel = compact ? 0.5 : 1;

  /* ---- THE FAR PLANE ---------------------------------------------------- */
  const farOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.62, 0.9],
    [0.26, 0.3, 0.1, 0],
  );
  const farZ = useTransform(scrollYProgress, [0, 1], [-620 * travel, -980 * travel]);
  const farScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.06]);
  const farY = useTransform(scrollYProgress, [0, 1], [-10 * travel, 26 * travel]);

  /* ---- THE MID PLANE ---------------------------------------------------- */
  const midOpacity = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 0.9],
    [0.34, 0.38, 0.12, 0],
  );
  const midZ = useTransform(scrollYProgress, [0, 1], [-300 * travel, -560 * travel]);
  const midScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const midY = useTransform(scrollYProgress, [0, 1], [8 * travel, -18 * travel]);

  /* ---- THE NEAR PLANE: it passes the camera ----------------------------- */
  const nearOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.5, 0.82],
    [0.5, 0.46, 0.16, 0],
  );
  const nearZ = useTransform(scrollYProgress, [0, 1], [40 * travel, -300 * travel]);
  const nearScale = useTransform(scrollYProgress, [0, 1], [1.15, 2.05]);
  const nearY = useTransform(scrollYProgress, [0, 1], [-6 * travel, 30 * travel]);

  /* ---- THE CHAPTER ------------------------------------------------------ */
  const labelOpacity = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.16, 0.36], [16 * travel, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.24, 0.44], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.24, 0.52], [28 * travel, 0]);
  /* A wipe up from the floor, delivered as a style MotionValue. This is the
     form the Hero already uses for its wordmark; the inset() form does not
     interpolate through whileInView variants. */
  const titleReveal = useTransform(
    scrollYProgress,
    [0.24, 0.56],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );
  /* Type clears before the ivory arrives, so it is never mid-transition
     between ivory-on-dark and ink-on-ivory - a contrast problem rather than a
     stylistic one. */
  const typeFade = useTransform(scrollYProgress, [0.62, 0.8], [1, 0]);

  /* ---- THE LIGHT EVENT -------------------------------------------------- */
  const poolOpacity = useTransform(scrollYProgress, [0.32, 0.56, 0.84], [0, 0.26, 0]);
  const poolScale = useTransform(scrollYProgress, [0.32, 0.86], [0.72, 1.12]);

  /* ---- THE IVORY PORTAL -------------------------------------------------
     The Collection's own ground, approached down the same perspective until it
     fills the frame at z 0. It is the destination the Hero's CTA already
     pointed at, so the section resolves rather than announces. */
  const portalZ = useTransform(scrollYProgress, [0.52, 0.9], [-900 * travel, 0]);
  const portalOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);

  /* ---- REDUCED MOTION ----------------------------------------------------
     Present, not performed. One field, one pool of light, the chapter named.
     No pin, no travel, no portal - and the Collection immediately after, so the
     reader is never held behind an animation to reach the designs. */
  if (reduced) {
    return (
      <section
        data-surface="dark"
        aria-labelledby="gateway-heading"
        className="relative overflow-hidden"
      >
        <div className="relative flex min-h-[78svh] items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <ConstructionField className="h-[68svh] w-[68svh] max-h-[560px] max-w-[560px] text-ivory" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <LightPool className="h-[62svh] w-[62svh] max-h-[520px] max-w-[520px]" peak={0.22} />
          </div>

          <div className="relative mx-auto w-full max-w-[104rem] px-5 text-center md:px-10 lg:px-14">
            <p className="meta meta-stone">{level.label}</p>
            <h2 id="gateway-heading" className="display-editorial mt-5">
              The first chapter
            </h2>
            <p className="meta meta-stone mt-6">
              {entries.length} entries
            </p>
          </div>
        </div>
      </section>
    );
  }

  const stageHeight = compact ? "92svh" : "112svh";

  /* PLANE RASTER SIZE
     The corridor must keep THREE planes at every breakpoint - that is the
     architecture, not decoration. What changes on a small screen is how much
     ink each plane asks the rasteriser for.

     Desktop is sized against svh because the frame is viewport-tall and the
     planes are meant to overfill it. A phone is narrow and tall, so svh sizing
     asks for a huge square on a small screen: at 390x844 the far plane was
     requesting roughly 945px of SVG to be rasterised for a 390px-wide
     viewport. Sizing the same three planes against vw instead keeps the
     corridor's proportions while cutting the raster area a phone actually
     pays for. */
  const planeSize = compact
    ? ["h-[122vw] w-[122vw] max-h-[540px] max-w-[540px]",
       "h-[104vw] w-[104vw] max-h-[460px] max-w-[460px]",
       "h-[84vw] w-[84vw] max-h-[380px] max-w-[380px]"]
    : ["h-[112svh] w-[112svh] max-h-[900px] max-w-[900px]",
       "h-[96svh] w-[96svh] max-h-[780px] max-w-[780px]",
       "h-[74svh] w-[74svh] max-h-[620px] max-w-[620px]"];

  return (
    <section
      ref={trackRef}
      data-surface="dark"
      aria-labelledby="gateway-heading"
      className="relative overflow-hidden"
    >
      <div className="relative" style={{ height: stageHeight }}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 48%" }}
        >
          <div className="absolute inset-0 bg-obsidian" aria-hidden="true" />

          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {/* The three planes of the corridor. Same approved component, three
                depths, nothing redrawn. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                opacity: farOpacity,
                z: farZ,
                scale: farScale,
                y: farY,
                willChange: "transform, opacity",
              }}
            >
              <ConstructionField className={planeSize[0] + " text-ivory"} />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                opacity: midOpacity,
                z: midZ,
                scale: midScale,
                y: midY,
                willChange: "transform, opacity",
              }}
            >
              <ConstructionField className={planeSize[1] + " text-ivory"} />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                opacity: nearOpacity,
                z: nearZ,
                scale: nearScale,
                y: nearY,
                willChange: "transform, opacity",
              }}
            >
              <ConstructionField className={planeSize[2] + " text-ivory"} />
            </motion.div>

            {/* The ivory portal: Movement A's own ground, approached down the
                corridor until it fills the frame. */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                z: portalZ,
                opacity: portalOpacity,
                willChange: "transform, opacity",
                background: "var(--surface-ivory)",
              }}
            />
          </div>
        </div>

        {/* The light event. One gradient, no filter, no blur - the same
            restraint the Hero's light pool uses. */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.div
            className="flex h-full w-full items-center justify-center"
            style={{ opacity: poolOpacity, scale: poolScale }}
          >
            <LightPool className="h-[74svh] w-[74svh] max-h-[640px] max-w-[640px]" peak={0.26} />
          </motion.div>
        </div>

        {/* The chapter. Establishes Level 01 and then clears before the ivory
            arrives, so contrast is never ambiguous. The container fades as one
            group; the children keep their own staggered arrivals inside it. */}
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-[104rem] flex-col items-center justify-center px-5 text-center md:px-10 lg:px-14"
          style={{ opacity: typeFade }}
        >
          <motion.p className="meta meta-stone" style={{ opacity: labelOpacity, y: labelY }}>
            {level.label}
          </motion.p>

          <motion.h2
            id="gateway-heading"
            className="display-editorial mt-6"
            style={{ opacity: titleOpacity, y: titleY, clipPath: titleReveal }}
          >
            The first chapter
          </motion.h2>

          <motion.p
            className="meta meta-stone mt-7"
            style={{ opacity: labelOpacity, y: labelY }}
          >
            {entries.length} entries
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}