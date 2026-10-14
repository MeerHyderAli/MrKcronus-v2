"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * LEVEL 01 / THE ARCHITECT
 *
 * The first room beyond the hero threshold. One artifact in a dark chamber,
 * revealed by light the page supplies, then examined.
 *
 * THE LIGHTING PROBLEM
 * The supplied artwork is extremely low key: a median luminance of 3, with
 * 92.7% of its pixels below luminance 40, on a background of pure black.
 * Against #050505 its silhouette reads as nothing. No amount of scroll
 * choreography will help if the object has no edge against its ground.
 *
 * So the artifact is NOT brightened, recoloured, filtered or masked. It is
 * BACKLIT: a restrained elliptical light field sits behind the garment so the
 * shoulder line, hood and edges separate as a dark shape against light, the
 * way an object reads in a vitrine. A soft vignette holds the corners down and
 * a second dim pool catches the lower silhouette.
 *
 * All lighting is CSS gradients on aria-hidden planes. No blur, no filter, no
 * mix-blend-mode, no animated anything but opacity and transform.
 *
 * THE MOTION MODEL
 * Native scroll through Motion useScroll/useTransform, exactly as the Hero
 * does. No wheel or touch listeners, no preventDefault, no window.scrollTo,
 * no scroll-driven React state, nothing time-driven. Every scroll position
 * therefore resolves to one visual state and forward and backward scrolling
 * are exact mirrors.
 *
 * MOBILE IS A DIFFERENT COMPOSITION
 * Vertical: type above, artifact centred beneath, with the rotation, the
 * depth push and the parallax reduced to a hint. The desktop camera approach
 * is deliberately not reproduced at small sizes.
 *
 * PERSPECTIVE PLACEMENT
 * `perspective` sits on the artifact's own wrapper, not on the sticky frame.
 * Perspective applies to an element's direct children; because the animated
 * artifact is a grandchild of the sticky container, a perspective there would
 * be flattened by the wrapper's default transform-style and the translateZ
 * would do nothing at all.
 *
 * RESTORED IN BUILD 12A
 * This file was deleted in Build 11C and is reconstructed here from the
 * approved Build 4 specification: the compiled Turbopack output retained every
 * transform range, breakpoint endpoint, gradient, class string and source line
 * number, and all of those are reproduced verbatim. Nothing about the section
 * is newly designed - it is the same chamber with the same staging.
 */

const ART = "/brand/artifact-architect.png";

/**
 * Describes what is visible on the garment. The words printed on the artwork
 * are part of the artwork and are not transcribed here.
 */
const ART_ALT =
  "MR.KCRONUS Level 01, The Architect: a dark garment presented frontally, " +
  "printed with a hooded figure, a numeral clock face, a distant city skyline " +
  "and an hourglass. The words appearing on the garment are part of the artwork.";

/** Page-supplied light. Ivory at very low alpha, never neon, never a flare. */
const RAKING_LIGHT =
  "radial-gradient(ellipse 50% 42% at 50% 34%, rgba(245,245,240,0.13) 0%, rgba(245,245,240,0.055) 44%, transparent 76%)";
const LOWER_LIGHT =
  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(245,245,240,0.06) 0%, transparent 72%)";
const VITRINE =
  "radial-gradient(ellipse 46% 40% at 50% 44%, transparent 34%, rgba(5,5,5,0.9) 100%)";
const CHAMBER =
  "radial-gradient(ellipse 78% 66% at 52% 42%, rgba(245,245,240,0.035) 0%, transparent 70%)";

/**
 * Breakpoint state only, and only so the depth endpoints differ between the
 * two compositions. Updated on breakpoint crossings, never during scroll, so
 * it cannot make the sequence non-deterministic. The thresholds match the
 * layout's `lg:` boundary at 1024px.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}

export default function ArchitectSection() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const trackRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* ---- Typography. Stable, archival, never shouts. ---------------------
     0.00-0.15 ROOM ENTRY  the level and the name arrive, then stop.
     Deliberately NOT dimmed again later: the brief asks for stable
     typography, and LEVEL 01 is set in Stone, which already sits at about
     3.2:1 against Obsidian at full strength. Easing it further would only
     degrade it. Every range below clamps by 0.85, so 0.85-1.00 is exactly
     still and the artifact is never upstaged by moving type.            */
  const typeOpacity = useTransform(scrollYProgress, [0.02, 0.14], [0, 1]);
  const typeY = useTransform(scrollYProgress, [0.02, 0.16], [18, 0]);

  /* ---- The artifact ----------------------------------------------------
     0.05-0.32  ROOM ENTRY / REVEAL  opacity resolves out of the dark
     0.40       established size
     0.40-0.70  EXAMINATION  the camera closes in: scale, depth and a
                 slight turn together, so it reads as approach rather than
                 as an image being resized
     0.70-0.85  SETTLE  movement slows to a crawl
     0.85-1.00  HOLD  completely still

     Input ranges are identical at every breakpoint; only the endpoints
     differ, so resolving the breakpoint cannot make anything jump.        */
  const artOpacity = useTransform(scrollYProgress, [0.05, 0.32], [0, 1]);
  const artY = useTransform(scrollYProgress, [0, 0.7, 0.85], [10, 0, 0]);
  const artScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 0.85],
    isDesktop ? [0.72, 1, 1.22, 1.235] : [0.72, 0.96, 1.06, 1.07],
  );
  const artZ = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 0.85],
    isDesktop ? [-180, -40, 40, 46] : [-140, -30, 20, 22],
  );
  const artRotateY = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.7, 0.85],
    isDesktop ? [-3.5, 0, 1.8, 1.9] : [0, 0, 0.5, 0.55],
  );

  /* ---- Page-supplied light. The light moves too, not just the object. -- */
  const lightOpacity = useTransform(scrollYProgress, [0.02, 0.32], [0, 1]);
  const lightX = useTransform(
    scrollYProgress,
    [0, 0.7, 0.85],
    isDesktop ? [0, -18, -19] : [0, -8, -8],
  );
  const lightScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 0.85],
    isDesktop ? [0.86, 1, 1.06, 1.065] : [0.9, 1, 1.02, 1.02],
  );
  const lowerLightOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.3], [0.35, 1]);

  /* ---- Background planes: parallax, not decoration. -------------------- */
  const datumY = useTransform(
    scrollYProgress,
    [0, 0.7, 0.85],
    isDesktop ? [30, -18, -19] : [14, -8, -8],
  );
  const chamberOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85],
    [0, 1, 0.7],
  );

  /* ---- Reduced motion: a deliberate static room -------------------------
     The artifact is never hidden. Level, name, object and stable lighting
     are all present and all reachable. */
  if (reduced) {
    return (
      <section
        aria-labelledby="architect-heading"
        className="mx-auto flex max-w-[104rem] flex-col gap-14 px-5 py-24 md:px-10 md:py-32 lg:px-14"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="meta meta-stone">Level 01</p>
            <h2
              id="architect-heading"
              className="display mt-6 text-[clamp(2rem,5vw,3.5rem)] text-ivory"
            >
              The Architect
            </h2>
            <div aria-hidden="true" className="mt-8 h-px w-16 bg-[--rule]" />
          </div>

          <div className="relative flex justify-center lg:col-span-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: RAKING_LIGHT }}
            />
            <Image
              src={ART}
              alt={ART_ALT}
              width={730}
              height={1024}
              sizes="(max-width: 1024px) 46vw, 34vw"
              className="relative h-auto max-h-[62svh] w-auto max-w-[86vw]"
            />
          </div>
        </div>
      </section>
    );
  }

  /* ---- Scroll-driven chamber ------------------------------------------ */
  return (
    <section
      ref={trackRef}
      aria-labelledby="architect-heading"
      className="relative h-[170svh] md:h-[200svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ opacity: chamberOpacity }}
        >
          <div className="absolute inset-0" style={{ background: CHAMBER }} />
        </motion.div>

        {/* The datum. The single architectural rule the room is built on. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-[62svh] flex justify-center"
          style={{ y: datumY, opacity: 0.5 }}
        >
          <div className="h-px w-[62vw] max-w-[46rem] bg-[--rule]" />
        </motion.div>

        {/* Type: upper left on desktop, centred above on mobile. */}
        <div className="absolute inset-x-0 top-[10svh] px-5 md:top-[8svh] lg:left-0 lg:top-1/2 lg:w-[26rem] lg:-translate-y-1/2 lg:px-14">
          <motion.div
            className="text-center lg:text-left"
            style={{ opacity: typeOpacity, y: typeY }}
          >
            <p className="meta meta-stone">Level 01</p>
            <h2
              id="architect-heading"
              className="display mt-6 text-[clamp(2rem,5.4vw,4rem)] leading-[0.95] text-ivory"
            >
              The Architect
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-8 h-px w-16 bg-[--rule] lg:mx-0"
            />
          </motion.div>
        </div>

        {/* The artifact, and the light that separates it from the ground. */}
        <div
          className="absolute left-1/2 top-[38svh] -translate-x-1/2 lg:left-[61%] lg:top-1/2 lg:-translate-y-1/2"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
        >
          {/* Raking light behind the garment: the vitrine separation. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[124%] w-[124%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full"
              style={{
                opacity: lightOpacity,
                scale: lightScale,
                x: lightX,
              }}
            >
              <div className="h-full w-full" style={{ background: RAKING_LIGHT }} />
            </motion.div>
          </div>

          {/* Vitrine vignette: holds the corners without veiling the print. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[172%] w-[172%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full"
              style={{ opacity: vignetteOpacity }}
            >
              <div className="h-full w-full" style={{ background: VITRINE }} />
            </motion.div>
          </div>

          {/* Lower pool: catches the hem so the silhouette closes. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[46%] w-[76%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full"
              style={{ opacity: lowerLightOpacity }}
            >
              <div className="h-full w-full" style={{ background: LOWER_LIGHT }} />
            </motion.div>
          </div>

          <motion.div
            style={{
              opacity: artOpacity,
              scale: artScale,
              y: artY,
              z: artZ,
              rotateY: artRotateY,
            }}
          >
            <Image
              src={ART}
              alt={ART_ALT}
              width={730}
              height={1024}
              sizes="(max-width: 1024px) 46vw, 34vw"
              className="h-auto max-h-[46svh] w-auto max-w-[86vw] md:max-h-[54svh]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}