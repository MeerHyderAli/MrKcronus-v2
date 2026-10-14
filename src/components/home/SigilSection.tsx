"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Symbol from "@/components/brand/Symbol";

/**
 * LEVEL 02 / THE SIGIL
 *
 * The second chamber. The Architect held a physical artifact under
 * examination; this holds a symbolic one. Same archive, same darkness,
 * different object.
 *
 * WHY THIS IS NOT THE HERO AGAIN
 * The Hero tells a narrative: the mark arrives, is assembled, activated,
 * taken apart into the A05 plate, reconstructed and finally titled. Nothing
 * here does any of that. There are no fragments, no assembly, no explosion,
 * no reconstruction, no plate and no gold. The mark is already whole when
 * the section begins, and it never stops being whole.
 *
 * The only thing the scroll changes is the viewer's position relative to it.
 * The dominant motion here is therefore lateral travel through the chamber
 * against counter-moving architectural planes, not a zoom. Total growth from
 * first frame to last is about 1.4x, where the Architect travels 2.0x and
 * the Hero travels far more.
 *
 * WHY THE MARK IS NOT DRAWN
 * mrkcronus-symbol.png is the source of truth: 694x1198 of opaque black ink
 * on white with no alpha channel. CSS luminance masking is inverted for it,
 * alpha masking is impossible on an opaque image, and invert() is prohibited.
 * So the mark is rendered through the existing brand Symbol component, which
 * paints its verified alpha-exact matte with background-color. That is the
 * same path the Hero already uses: identical geometry, identical stroke
 * weights, no filter, no trace, no reinterpretation. Only the ivory ink is
 * used. There is deliberately no gold here, because gold belongs to the
 * Hero's final statement and spending it again would dilute it.
 *
 * THE MOTION MODEL
 * Native scroll through Motion useScroll/useTransform, as in Build 4. No
 * wheel or touch listeners, no preventDefault, no window.scrollTo, no
 * scroll-driven React state, nothing time-driven. Every position resolves to
 * one state, and forward and backward scrolling are exact mirrors. Every
 * range clamps by 0.88, so the final eighth is genuinely still.
 *
 * RESTORED IN BUILD 12A
 * Deleted in Build 11C and reconstructed from the approved Build 5
 * specification. Every transform range, breakpoint endpoint, gradient and
 * class string below is reproduced from the retained compiled output.
 */
const SIGIL = "The MR.KCRONUS canonical symbol";

/** Ambient room. Barely there. The mark supplies the interest, not the page. */
const CHAMBER =
  "radial-gradient(ellipse 76% 68% at 48% 46%, rgba(245,245,240,0.03) 0%, transparent 72%)";
/** Atmospheric separation around the mark. Reveals, never decorates. */
const POOL =
  "radial-gradient(ellipse 50% 46% at 50% 42%, rgba(245,245,240,0.055) 0%, rgba(245,245,240,0.022) 46%, transparent 76%)";
const VITRINE =
  "radial-gradient(ellipse 44% 42% at 50% 46%, transparent 32%, rgba(5,5,5,0.92) 100%)";

/**
 * Breakpoint state only, so the depth endpoints can differ between the two
 * compositions. Updated on breakpoint crossings and never during scroll, so
 * it cannot make the sequence non-deterministic. Threshold matches the
 * layout's `lg:` boundary at 1024px.
 *
 * Duplicated from ArchitectSection rather than extracted: Build 4 is locked,
 * and sharing a hook between them would mean editing an approved file for no
 * gain. The two sections are deliberately independent.
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

export default function SigilSection() {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();
  const trackRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* ---- Entry and presence. Identical at every breakpoint. --------------- */
  const typeOpacity = useTransform(scrollYProgress, [0.02, 0.13], [0, 1]);
  const typeY = useTransform(scrollYProgress, [0.02, 0.15], [16, 0]);
  const markOpacity = useTransform(scrollYProgress, [0.04, 0.26], [0, 1]);
  const poolOpacity = useTransform(scrollYProgress, [0.06, 0.3], [0, 1]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.3], [0.35, 1]);

  /* ---- The chamber itself. Two depths of architectural bay. -------------
     Full-height vertical rules read as wall divisions. They are deliberately
     not brackets, corner marks or anything that could suggest an interface.
     Each layer starts faintly above zero rather than at nothing: the room is
     already standing when the viewer arrives, which is what carries the
     transition out of the Architect without introducing a new visual
     language, and it keeps the opening frame from being empty. */
  const chamberOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.88],
    [0.25, 1, 0.8],
  );
  const farBayX = useTransform(
    scrollYProgress,
    [0, 0.55, 0.88],
    isDesktop ? [0, -12, -14] : [0, -4, -5],
  );
  const farBayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.88],
    [0.06, 0.22, 0.18],
  );
  const nearBayX = useTransform(
    scrollYProgress,
    [0, 0.55, 0.88],
    isDesktop ? [0, -28, -32] : [0, -10, -12],
  );
  const nearBayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.88],
    [0.12, 0.42, 0.34],
  );

  /* ---- The mark. Present from the first frame; never assembled. ----------
     0.04-0.26  ENTRY -> PRESENCE   opacity resolves out of the dark
     0.30       established
     0.30-0.55  EXAMINATION         the viewer closes in
     0.55-0.75  SPATIAL EXAMINATION peak depth, the mark drifting across
                                    the chamber against counter-moving bays
     0.75-0.88  SETTLE              decelerates
     0.88-1.00  STILLNESS          completely still

     Input ranges are identical at every breakpoint and the p=0 endpoints
     match, so resolving the breakpoint cannot make anything jump. */
  const markScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.75, 0.88],
    isDesktop ? [0.86, 0.94, 1.0, 1.06, 1.08] : [0.86, 0.94, 1.0, 1.03, 1.04],
  );
  const markZ = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.75, 0.88],
    isDesktop ? [-120, -80, -20, 50, 58] : [-100, -70, -30, 20, 24],
  );
  const markRotateY = useTransform(
    scrollYProgress,
    [0.12, 0.3, 0.55, 0.75, 0.88],
    isDesktop ? [-1.4, -0.6, 0.4, 1.0, 1.2] : [0, 0, 0.2, 0.4, 0.45],
  );
  const markX = useTransform(
    scrollYProgress,
    [0, 0.55, 0.75, 0.88],
    isDesktop ? [0, -14, 20, 26] : [0, -5, 8, 10],
  );
  const poolScale = useTransform(
    scrollYProgress,
    [0, 0.55, 0.88],
    isDesktop ? [0.9, 1.0, 1.04] : [0.94, 1.0, 1.01],
  );

  /* ---- Reduced motion: a calm, complete static chamber. -----------------
     The mark is never removed. Level, name, symbol and stable light all
     remain present and reachable. */
  if (reduced) {
    return (
      <section
        aria-labelledby="sigil-heading"
        className="mx-auto flex max-w-[104rem] flex-col gap-14 px-5 py-24 md:px-10 md:py-32 lg:px-14"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="meta meta-stone">Level 02</p>
            <h2
              id="sigil-heading"
              className="display mt-5 text-[clamp(1.55rem,3.2vw,2.5rem)] text-ivory"
            >
              The Sigil
            </h2>
            <div aria-hidden="true" className="mt-7 h-px w-12 bg-[--rule]" />
          </div>

          <div className="flex justify-center lg:col-span-8">
            <Symbol
              className="h-[46svh] max-w-[86vw] lg:h-[56svh]"
              decorative={false}
              label={SIGIL}
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
      aria-labelledby="sigil-heading"
      className="relative h-[170svh] lg:h-[200svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ opacity: chamberOpacity }}
        >
          <div className="absolute inset-0" style={{ background: CHAMBER }} />
        </motion.div>

        {/* Two depths of bay, counter-moving against the mark. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ x: farBayX, opacity: farBayOpacity }}
        >
          <div className="absolute inset-y-0 left-[18%] w-px bg-[--rule]" />
          <div className="absolute inset-y-0 right-[18%] w-px bg-[--rule]" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ x: nearBayX, opacity: nearBayOpacity }}
        >
          <div className="absolute inset-y-0 left-[32%] w-px bg-[--rule]" />
          <div className="absolute inset-y-0 right-[32%] w-px bg-[--rule]" />
        </motion.div>

        {/* The mark. Upper centre on mobile, right of centre on desktop. */}
        <div
          className="absolute left-1/2 top-[30svh] -translate-x-1/2 lg:left-[62%] lg:top-1/2 lg:-translate-y-1/2"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[150%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full"
              style={{ opacity: poolOpacity, scale: poolScale }}
            >
              <div className="h-full w-full" style={{ background: POOL }} />
            </motion.div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[190%] w-[200%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full"
              style={{ opacity: vignetteOpacity }}
            >
              <div className="h-full w-full" style={{ background: VITRINE }} />
            </motion.div>
          </div>

          <motion.div
            style={{
              opacity: markOpacity,
              scale: markScale,
              x: markX,
              z: markZ,
              rotateY: markRotateY,
            }}
          >
            <Symbol
              className="h-[56svh] max-w-[86vw] lg:h-[60svh]"
              decorative={false}
              label={SIGIL}
            />
          </motion.div>
        </div>

        {/* Type: upper centre on mobile, left on desktop. */}
        <div className="absolute inset-x-0 top-[9svh] px-5 md:top-[8svh] lg:left-0 lg:top-1/2 lg:w-[24rem] lg:-translate-y-1/2 lg:px-14">
          <motion.div
            className="text-center lg:text-left"
            style={{ opacity: typeOpacity, y: typeY }}
          >
            <p className="meta meta-stone">Level 02</p>
            <h2
              id="sigil-heading"
              className="display mt-5 text-[clamp(1.55rem,3.2vw,2.5rem)] text-ivory"
            >
              The Sigil
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto mt-7 h-px w-12 bg-[--rule] lg:mx-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}