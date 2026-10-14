"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  COLLECTION,
  type CollectionDesign,
  type SequenceMask,
} from "@/components/collection/collectionData";
import { DRIFT } from "@/components/motion/vocabulary";
import { useCompactMotion } from "@/components/motion/motionEnv";
import Section from "./Section";

/**
 * MOVEMENT B — THE SEQUENCE
 *
 * The approved 360vh cinematic examination of the six designs. ONE pinned
 * track on the whole Build 13 homepage, against three on the previous one.
 *
 * WHY A SEQUENCE AND NOT SIX CHAPTERS
 * The retired archive crawl was eight SECTIONS, each a complete scene with its
 * own narrative, totalling roughly 1,520svh of scroll. This is one section, one
 * gesture, six entries, 360vh. Six things examined in sequence is not the same
 * as six chapters, and that difference is the entire point of Build 13.
 *
 * THE SIX PERSONALITIES
 * Each design enters through its own mask, declared as data in
 * collectionData.ts so the choreography is reviewable rather than buried:
 *
 *   01 ARCHITECT  grows from the bottom edge   monumental, ascending
 *   02 SIGIL      opens centre-outward        symmetric geometry
 *   03 WITNESS    wipes laterally             a portrait subject
 *   04 FRACTURE   splits open from the centre something coming apart
 *   05 ENEMY      dissolves through black      the darkest plate in the set
 *   06 UNKNOWN    irises from the centre      the ritual-circle motif
 *
 * All six share one easing ladder, one duration ladder and one drift rate.
 * That shared vocabulary is what keeps six different masks reading as one
 * sequence rather than six unrelated demos.
 *
 * NO REACT STATE IS WRITTEN DURING SCROLL
 * Every value is a pure transform of one scroll progress. There is no
 * activeIndex state, no setState in a scroll handler, no scroll or wheel
 * listener of our own, no preventDefault, no scroll-jacking. The rail's active
 * design is expressed by transforming opacity and scale from that same
 * progress, so it is a function of scroll position and nothing else. Scrolling
 * backwards runs the whole thing in exact reverse.
 *
 * WHY THE STAGE IS SQUARE AND WHY NOTHING UPSCALES
 * collection-board.png is 1024 x 1536 in a 3 x 2 grid, so each design occupies
 * a 512 x 512 square cell. The stage is capped at that native 512px, which is
 * what lets a garment read as an object examined at true scale instead of a
 * crop blown up to fill a viewport. On small screens the stage gets smaller and
 * is never larger than the cell.
 *
 * The board is NOT re-encoded, cropped to disk, or otherwise derived. Each
 * panel is a CSS viewport onto the unmodified approved file: the image is
 * rendered at 200% x 300% of the square stage and offset by percentage, so the
 * cell lands exactly without a single derived file existing. Movement C
 * additionally shows the board whole.
 *
 * SIX <img> ELEMENTS, ONE REQUEST
 * All six panels share one source, so the browser fetches and decodes it once
 * and paints it six times at different offsets. Background images would avoid
 * the extra nodes but would bypass next/image and serve the 2.8MB original
 * unoptimised, which is a far worse trade.
 *
 * REDUCED MOTION
 * The pin is removed and the six become a static grid at natural size, in
 * order, with no masks, scale or drift. The order stays fully readable without
 * any choreography, because the order is carried by the markup rather than by
 * the animation.
 */

const BOARD = {
  src: "/brand/collection-board.png",
  width: 1024,
  height: 1536,
} as const;

export default function CollectionSequence() {
  const reduced = useReducedMotion();
  const compact = useCompactMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  /* ONE scroll subscription for the whole section. The rail and the stage are
     both pure functions of this value, so they cannot drift out of step with
     each other, and the page carries exactly one pinned track.

     Declared above the reduced-motion branch deliberately: a hook called on
     only one branch is a rules-of-hooks violation. When reduced, trackRef never
     attaches and Motion resolves the value to zero. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* The runway carries a 100svh pinned stage, so the stage is pinned for the
     remainder of the runway. Shorter on small screens: the six masks all still
     play, they simply travel less far. */
  const runway = compact ? "300vh" : "400vh";

  /* ---- Reduced motion: static, ordered, complete ---------------------- */
  if (reduced) {
    return (
      <Section
        id="collection-sequence"
        surface="ivory"
        labelledBy="collection-sequence-heading"
        className="py-20 md:py-28"
      >
        <h2 id="collection-sequence-heading" className="sr-only">
          The six designs, in order
        </h2>
        <div className="mx-auto max-w-[104rem] px-5 md:px-10 lg:px-14">
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTION.map((design) => (
              <li key={design.slug} className="flex flex-col">
                <span className="meta meta-stone mb-3">{design.order}</span>
                <div className="vitrine image-frame relative aspect-square w-full overflow-hidden">
                  <BoardImage design={design} alt={`MR.KCRONUS ${design.name}: a black short-sleeve tee printed with this design, front view, as presented in the collection board.`} />
                </div>
                <span className="meta mt-4 text-ink">{design.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="collection-sequence"
      surface="ivory"
      labelledBy="collection-sequence-heading"
      className="relative"
    >
      <h2 id="collection-sequence-heading" className="sr-only">
        The six designs, in order
      </h2>

      <div ref={trackRef} className="relative" style={{ height: runway }}>
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[104rem] grid-cols-1 items-center gap-8 px-5 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14">
            <Readout progress={scrollYProgress} />

            <div className="lg:col-span-2 lg:col-start-5">
              <p className="meta meta-stone mb-6">The six, in order</p>
              <Rail progress={scrollYProgress} />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Stage progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * The rail.
 *
 * Takes the progress as a prop rather than owning the scroll subscription, so
 * the six rows can each derive their own active window without any of them
 * calling a hook inside a loop at the call site.
 */
/**
 * The lit band for one design's slice.
 *
 * It deliberately OVERLAPS its neighbours - from 30% before the slice to 30%
 * after its end - so the rail and the readout are never simultaneously dark
 * between two designs. Bounding each to exactly its own slice leaves a point
 * where the outgoing design has finished and the incoming has not begun.
 *
 * BOTH ENDS ARE CLAMPED TO [0, 1]. Motion consumes the input range of a
 * scroll-driven transform directly as WAAPI keyframe offsets, so an offset
 * outside [0, 1] - or a descending one - throws at mount and takes the whole
 * page's render down with it. Overlapping therefore widens bands inward,
 * never past the ends of the progress value.
 */
function bandFor(from: number, to: number): [number, number, number, number] {
  const width = to - from;
  return [
    Math.max(0, from - width * 0.3),
    from + width * 0.15,
    to - width * 0.15,
    Math.min(1, to + width * 0.3),
  ];
}

/**
 * THE READOUT
 *
 * Which design is on the stage, at display scale, plus the sentence describing
 * how it enters.
 *
 * This column existed as data and never as layout: the "entrance" field in
 * collectionData.ts was written during the plan and then never rendered. On a
 * 1916px screen the stage previously sat alone with a small rail beside it and
 * a field of empty ivory between them, which is most of why the section read as
 * unfinished rather than composed.
 *
 * The six entries are stacked and cross-faded from the same scroll progress that
 * drives the plates and the rail, so all three readouts agree by construction -
 * there is no shared state to fall out of sync.
 */
function Readout({ progress }: { progress: MotionValue<number> }) {
  const slice = 1 / COLLECTION.length;

  return (
    <div className="lg:col-span-4">
      <p className="meta meta-stone mb-6">Now showing</p>
      <div className="relative min-h-[9rem]">
        {COLLECTION.map((design, index) => {
          const from = index * slice;
          const to = (index + 1) * slice;
          return (
            <ReadoutItem
              key={design.slug}
              design={design}
              progress={progress}
              band={bandFor(from, to)}
              isLast={index === COLLECTION.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}

function ReadoutItem({
  design,
  progress,
  band,
  isLast,
}: {
  design: CollectionDesign;
  progress: MotionValue<number>;
  band: [number, number, number, number];
  isLast: boolean;
}) {
  const falls = useTransform(progress, band, [0, 1, 1, 0]);
  const holds = useTransform(progress, band, [0, 1, 1, 1]);
  const active = isLast ? holds : falls;

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity: active }}>
      <p className="display text-[length:var(--type-numeral)] leading-none text-ink">
        {design.order}
      </p>
      <p className="display mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-tight text-ink">
        {design.name}
      </p>
      <div aria-hidden="true" className="mt-5 h-px w-full bg-[--surface-rule]" />
      <p className="mt-5 text-[0.8125rem] leading-relaxed tracking-[0.08em] text-[--surface-ink-muted] uppercase">
        {design.entrance}
      </p>
    </motion.div>
  );
}

function Rail({ progress }: { progress: MotionValue<number> }) {
  const slice = 1 / COLLECTION.length;

  return (
    <ol className="flex flex-wrap gap-x-8 gap-y-4 lg:flex-col lg:gap-y-5">
      {COLLECTION.map((design, index) => (
        <RailItem
          key={design.slug}
          design={design}
          progress={progress}
          from={index * slice}
          to={(index + 1) * slice}
          isLast={index === COLLECTION.length - 1}
        />
      ))}
    </ol>
  );
}

function RailItem({
  design,
  progress,
  from,
  to,
  isLast,
}: {
  design: CollectionDesign;
  progress: MotionValue<number>;
  from: number;
  to: number;
  isLast: boolean;
}) {
  /* The row lights while its own design is being shown and dims again once it
     has passed. A two-point range would be wrong here: useTransform CLAMPS
     outside its range, so every row the reader had already scrolled past would
     stay lit at full strength for the rest of the runway. Rising and falling
     across the row's own slice is what makes the rail a position readout
     rather than a checklist. */
  const width = to - from;

  /* The lit band deliberately OVERLAPS its neighbours: from 15% before the row's
     own slice to 15% past its end. Banding each row to exactly its own slice
     leaves a point where the outgoing row has finished fading and the incoming
     row has not begun, and the rail goes momentarily dark between every pair of
     designs. Overlapping guarantees at least one row is lit at all times.

     BOTH ENDS ARE CLAMPED TO [0, 1]. Motion consumes the input range of a
     scroll-driven transform directly as WAAPI keyframe offsets, so an offset
     outside [0, 1] - or a descending one - throws at mount and takes the whole
     page's render down with it. Overlapping the bands therefore has to widen
     them inward, never past the ends of the progress value. */
  const band: [number, number, number, number] = [
    Math.max(0, from - width * 0.3),
    from + width * 0.15,
    to - width * 0.15,
    Math.min(1, to + width * 0.3),
  ];
  const activeFalls = useTransform(progress, band, [0, 1, 1, 0]);
  const activeHolds = useTransform(progress, band, [0, 1, 1, 1]);

  /* The LAST row holds lit, for the same reason the last plate holds: it has
     no successor to hand over to, and dimming it would leave the reader at a
     dark rail while the sixth design is still on the stage. */
  const active = isLast ? activeHolds : activeFalls;
  const rule = useTransform(progress, band, [0, 1, 1, 0]);

  return (
    <li className="relative flex items-baseline gap-3 pl-4">
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-px w-3 origin-left -translate-y-1/2 bg-ink"
        style={{ scaleX: rule }}
      />
      <span className="display text-[clamp(1rem,1.6vw,1.35rem)] text-ink-muted">
        {design.order}
      </span>
      <span className="meta relative block text-ink-muted">
        {design.name}
        {/* The active state is a crossfade between two stacked labels rather
            than a colour swap, so no React state is written during scroll and
            each label sits at its own full-contrast rest value: ink-muted
            measures 5.67:1 on ivory, ink 16.58:1. Neither state can fail. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 text-ink"
          style={{ opacity: active }}
        >
          {design.name}
        </motion.span>
      </span>
    </li>
  );
}

/**
 * The stage: six plates stacked in one window, each owning a slice of the
 * runway.
 */
/**
 * The stage: six plates stacked in one window, each owning a slice of the
 * shared runway.
 *
 * It owns NO track of its own. It used to carry a second 400vh runway and a
 * second sticky frame, which would have nested two pinned tracks and left the
 * rail reading a different scroll range than the stage it annotates. It now
 * renders only the window, and every plate is a function of the one progress
 * value passed in.
 */
function Stage({ progress }: { progress: MotionValue<number> }) {
  const slice = 1 / COLLECTION.length;

  return (
    <div className="vitrine image-frame relative mx-auto aspect-square w-full max-w-[512px] overflow-hidden">
      {COLLECTION.map((design, index) => (
        <Plate
          key={design.slug}
          design={design}
          progress={progress}
          from={index * slice}
          to={(index + 1) * slice}
          isLast={index === COLLECTION.length - 1}
        />
      ))}
    </div>
  );
}

function Plate({
  design,
  progress,
  from,
  to,
  isLast,
}: {
  design: CollectionDesign;
  progress: MotionValue<number>;
  from: number;
  to: number;
  isLast: boolean;
}) {
  /* ---- THE CROSS-DISSOLVE (Build 13.1) ---------------------------------
     The previous ranges were the cause of the "empty black stage, then a thin
     sliver, then empty again" problem, and the arithmetic is worth stating
     because it is not obvious from reading the numbers:

       opacity reached 1 at +0.14w and left 1 at -0.18w, while the mask only
       finished at +0.42w.

       So at a slice boundary the outgoing plate had fallen to about 0.36,
       the incoming had reached about 0.42, and the incoming was still masked
       to a third of its width. Two dim half-images and a sliver. Exactly what
       was reported.

     Three changes fix it without touching the runway, the order or the
     masks:

       1. OPACITY OVERLAPS BY A THIRD OF A SLICE on each side. At every
          boundary the outgoing and incoming plates now both sit near 0.74,
          so the handover is a genuine cross-dissolve between two complete
          garments. The stage is never empty and never holds a sliver.
       2. THE MASK COMPLETES EARLY, at +0.20w, BEFORE opacity reaches full
          at +0.12w. Each mask personality is still clearly visible while the
          plate is semi-transparent, but the reveal is always finished by the
          time the garment is at full strength.
       3. Every range is clamped to [0, 1]. Motion consumes a scroll-driven
          input range directly as WAAPI keyframe offsets, and an offset
          outside [0, 1] throws at mount and takes the whole page down.
          Overlap therefore widens inward, never past the ends. */
  const sliceWidth = to - from;

  const fadeInStart = Math.max(0, from - sliceWidth * 0.34);
  const fadeInEnd = from + sliceWidth * 0.12;
  const fadeOutStart = to - sliceWidth * 0.12;
  const fadeOutEnd = Math.min(1, to + sliceWidth * 0.34);

  const fading = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0],
  );

  /* Design 06 has no successor, so it holds rather than handing over. Without
     this the last stretch of the runway shows an empty stage. */
  const holding = useTransform(
    progress,
    [fadeInStart, fadeInEnd, to],
    [0, 1, 1],
  );
  const opacity = isLast ? holding : fading;

  /* ---- THE MASK -------------------------------------------------------
     Runs from 0.22w BEFORE the design's own slice to 0.20w into it, so it is
     already fully open by the time opacity tops out. This is what turns a
     growing sliver into a garment that resolves. */
  const window: [number, number] = [
    Math.max(0, from - sliceWidth * 0.22),
    from + sliceWidth * 0.2,
  ];
  const entrance = useTransform(progress, window, [0, 1]);

  /* Derived DIRECTLY from progress rather than from `entrance`. clipPath is a
     string-valued, non-composited property, so Motion drives it through WAAPI
     rather than through a MotionValue chain; chaining a string transform on
     top of another is what produced the "offsets must be monotonically
     non-decreasing" failure at mount. One hop, one source. */
  const clipPath = useTransform(progress, window, clipFor(design.mask));

  /* Drift is deliberately small: the garment is being examined, not thrown
     past the reader. The foreground rate is used nowhere on this page. */
  const y = useTransform(entrance, [0, 1], [DRIFT.slow * 0.5, -DRIFT.slow * 0.5]);
  const scale = useTransform(entrance, [0, 1], [1.03, 1]);

  /* ---- THE ENEMY ------------------------------------------------------
     THE ENEMY stays the darkest plate in the sequence, but it must not
     disappear. The dip used to reach zero, which emptied the stage entirely
     on the one design whose artwork is already near-black. It now floors at
     0.3: the garment dims and recovers, and reads as passing through the
     dark without the stage ever going black.

     Called unconditionally then selected, because a conditional hook is a
     rules-of-hooks violation. */
  const dip = useTransform(entrance, [0, 0.4, 1], [0.3, 0.3, 1]);
  const throughBlack = design.mask === "fade-through";

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        clipPath: throughBlack ? undefined : clipPath,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: throughBlack ? dip : 1, y, scale }}
      >
        <BoardImage design={design} alt="" />
      </motion.div>
    </motion.div>
  );
}

/**
 * A CSS viewport onto one cell of the board.
 *
 * The image is rendered at 200% x 300% of the square stage and offset by
 * percentage, because a percentage offset resolves against the containing
 * block - which is the square stage, exactly one cell wide. No measurement, no
 * derived file, no re-encoding.
 */
function BoardImage({ design, alt }: { design: CollectionDesign; alt: string }) {
  return (
    <Image
      src={BOARD.src}
      alt={alt}
      width={BOARD.width}
      height={BOARD.height}
      /* `sizes` MUST describe the rendered width of the <img> itself, not the
         size of the clip viewport that shows part of it. This element is
         rendered at 200% x 300% of the square stage and then offset, so the
         stage is up to 620px but the bitmap has to be at least the board's
         native 1024px for a cell to stay pixel-exact.

         The previous value asked for 512px. The browser was served a 455 x 682
         variant and CSS stretched it to roughly 1055 x 1582 - every design was
         a 2.3x upscale from a 227px source, which is why the garments read as
         murky silhouettes. Over-requesting here costs nothing: it is one file,
         fetched once and cached. */
      sizes="(max-width: 1023px) 220vw, 1300px"
      className="absolute h-[300%] w-[200%] max-w-none"
      style={{
        left: `${design.cell.col * -100}%`,
        top: `${design.cell.row * -100}%`,
      }}
    />
  );
}

/**
 * The six clip paths, declared once.
 *
 * inset() takes top right bottom left, so:
 *   0 0 100% 0   a zero-height box at the BOTTOM, growing upward
 *   0 50% 0 50%  a zero-width box at the CENTRE, opening sideways
 *   0 0 0 100%   a zero-width box at the LEFT, growing rightward
 *   50% 0 50% 0  a zero-height box at the CENTRE, opening vertically
 *
 * The iris radius passes 75% so the circle fully contains the square by the end
 * of its travel; anything smaller would leave the corners permanently cut.
 */
function clipFor(mask: SequenceMask): [string, string] {
  switch (mask) {
    case "mask-up":
      return ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"];
    case "mask-horizontal":
      return ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"];
    case "mask-left":
      return ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"];
    case "mask-vertical":
      return ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)"];
    case "iris":
      return ["circle(0% at 50% 50%)", "circle(78% at 50% 50%)"];
    case "fade-through":
    default:
      return ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"];
  }
}
