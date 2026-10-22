"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  motion,
  useMotionValueEvent,
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
import Section from "./Section";

/**
 * MOVEMENT B — THE SEQUENCE
 *
 * The approved scroll-linked cinematic examination of the six designs. ONE
 * pinned track on the whole Build 13 homepage, against three on the previous
 * one.
 *
 * WHY A SEQUENCE AND NOT SIX CHAPTERS
 * The retired archive crawl was eight SECTIONS, each a complete scene with its
 * own narrative, totalling roughly 1,520svh of scroll. This is one section, one
 * gesture, six entries, 400vh desktop / 300vh compact. Six things examined in
 * sequence is not the same as six chapters, and that difference is the entire
 * point of Build 13.
 *
 * THE SIX PERSONALITIES
 * Each design enters through its own mask, declared as data in
 * collectionData.ts so the choreography is reviewable rather than buried:
 *
 *   01 ARCHITECT  grows from the bottom edge   monumental, ascending
 *   02 SIGIL      opens centre-outward        symmetric geometry
 *   03 WITNESS    wipes laterally             a portrait subject
 *   04 FRACTURE   splits open from the centre something coming apart
 *   05 ENEMY      dissolves through black     the darkest plate in the set
 *   06 UNKNOWN    irises from the centre      the ritual-circle motif
 *
 * All six share one easing ladder, one duration ladder and one drift rate.
 * That shared vocabulary is what keeps six different masks reading as one
 * sequence rather than six unrelated demos. THE MASKS ARE UNCHANGED BY THE
 * DRUM: every clip window below is exactly the window this section has always
 * used, and the drum moves the cards rather than rescheduling them.
 *
 * ALMOST NO REACT STATE IS WRITTEN DURING SCROLL
 * Every visual value is a pure transform of one scroll progress. There is no
 * setState in a scroll handler, no scroll or wheel listener of our own, no
 * preventDefault, no scroll-jacking. A card's position, tilt, depth, lateral
 * bow and opacity are all functions of scroll position and nothing else, so
 * scrolling backwards runs the whole thing in exact reverse.
 *
 * The single exception is `activeIndex`, which exists ONLY because `aria-current`
 * and a roving `tabIndex` are DOM attributes and cannot be expressed as a
 * transform. It is change-guarded to an integer boundary, so across a 400vh
 * runway it writes at most six times for the entire section. Every transform
 * remains MotionValue-driven and stateless.
 *
 * THE DRUM
 * The six designs hang on a vertical drum inside the stage. The featured
 * garment is the card at the FRONT: flat, centred, unrotated and at the stage's
 * full size. Its neighbours rotate away above and below on `rotateX`, are
 * foreshortened by a single CSS perspective, bow back to the left as they
 * recede, and are clipped by the pinned frame - which is exactly how the
 * reference's cards run off the top and bottom of its own.
 *
 * WHY THE CROSS-DISSOLVE IS GONE
 * The plates used to overlap in opacity by a third of a slice so the stage was
 * never empty. In a drum they do not overlap at all: at a hand-over the two
 * cards sit half a card either side of centre, both fully opaque and a
 * card-height apart. The same defect - an empty stage, then a sliver - is here
 * solved geometrically rather than photometrically.
 *
 * WHY THE THUMBNAIL ARC IS GONE
 * It was a horizontal strip of six equally weighted cells beneath a large
 * featured garment, so the frame had two subjects and neither won. The drum
 * has one: the same six cells, the same board, the same progress value, with a
 * hierarchy that is carried by depth and scale instead of by a 22% size boost.
 *
 * IN REDUCED MOTION THE DRUM IS NOT RENDERED AT ALL
 * The static six-item grid below already carries every ordinal, name and
 * full-size garment, which is a complete and stable presentation; a
 * scroll-linked drum would be meaningless without the scroll that drives it.
 *
 * WHY THE STAGE IS SQUARE AND WHY NOTHING UPSCALES
 * collection-board.png is 1024 x 1536 in a 3 x 2 grid, so each design occupies
 * a 512 x 512 square cell. The front card is capped at that native 512px, which
 * is what lets a garment read as an object examined at true scale instead of a
 * crop blown up to fill a viewport. On small screens the stage gets smaller and
 * is never larger than the cell.
 *
 * The board is NOT re-encoded, cropped to disk, or otherwise derived. Each
 * panel is a CSS viewport onto the unmodified approved file: the image is
 * rendered at 200% x 300% of the square card and offset by percentage, so the
 * cell lands exactly without a single derived file existing. Movement C
 * additionally shows the board whole.
 *
 * TWELVE <img> ELEMENTS, ONE REQUEST
 * All twelve panels share one source, so the browser fetches and decodes it
 * once and paints it twelve times at different offsets - six on the stage and
 * six in the index is not the case any more; there are six cards, each drawn
 * once. Background images would avoid the extra nodes but would bypass
 * next/image and serve the 2.8MB original unoptimised, which is a far worse
 * trade. Every panel carries the same `sizes`, so next/image emits the same URL
 * and the cache holds a single copy.
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

/* ---- The drum ------------------------------------------------------------
   Six square cells lifted from the same canonical board, hung on a vertical
   drum so the collection reads as one object examined from a fixed point
   rather than as a list of six.

   NOTHING BELOW IS A COPIED CONSTANT. The reference wheel is built around
   landscape 1.45 cards that occupy 38% of a 578px-tall frame. Ours are square
   cells occupying up to 72% of a 670-1080px one, and its DRUM of 2.22 card
   heights puts our nearest neighbour 610px from centre - outside a 540px
   half-frame, so the reference geometry would show one card and nothing else.
   Every figure here is therefore derived from the MEASURED stage, and the two
   numbers that are not (the step and the bow) are the two the reference states
   as ratios of the card rather than of the frame. */
const DRUM_STEP = 38; // degrees between adjacent cards on the drum
const DRUM_LENS = 2.6; // perspective distance, in card widths
const DRUM_K_MIN = 1.35; // floor on the drum radius, in card widths
const DRUM_K_MAX = 1.8; // ceiling on the drum radius, in card widths
const DRUM_REACH = 0.34; // how far a neighbour's centre may sit, of the frame
const DRUM_BOW = 1.2; // lateral bow where there is a gutter to bow into
const DRUM_BOW_COMPACT = 0.12; // ... where there is not
const DRUM_CULL = 1.8; // distance past which a card is gone
const DRUM_FADE = 0.8; // the width of that fade, in cards

/* THE DRUM'S TRANSFORM NUMBERS ARE SNAPPED HERE, ONCE, AND NEVER BY THE
   RENDERER.

   A card's position is a chain of trigonometry - `-bow * (1 - cos t)` and
   `-drumR * sin t` - and it lands on values like -54.018687094110724. Motion
   serialises those at full float precision into the server's style attribute,
   but the browser re-serialises the same value at roughly six significant
   figures the moment anything writes to the inline style, so the two sides
   disagree.

   React does not compare styles property by property: `diffHydratedStyles`
   rebuilds the entire declaration string and compares that against the
   attribute, so a precision difference anywhere in one transform fails the
   whole element. The card is in exactly the right place either way - a hundred
   thousandth of a pixel off - and the console still carries a hydration error
   for it.

   Snapping to six significant figures costs at most 0.00005 on a card 320 units
   wide, which is nothing, and it makes both sides emit identical digits. */
const snap = (n: number) => Number(n.toPrecision(6));

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

const rad = (deg: number) => (deg * Math.PI) / 180;

export default function CollectionSequence() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  /* The stage's MEASURED width and the pinned frame's MEASURED height, read
     once per resize. No layout reads happen during scroll; ResizeObserver only
     updates dimensions when the stage or frame actually changes.

     Only the WIDTH of the stage box is observed: its height is written inline
     from this same measurement, so observing it as well would let the two
     chase one another. The frame supplies the height the drum must fit. */
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState({ w: 0, h: 0, wide: false });
  useEffect(() => {
    /* `wide` is the `md:` grid, i.e. whether the readout shares the frame with
       the drum or sits ABOVE it. The observer already provides resize events,
       so the breakpoint is sampled alongside the dimensions rather than via
       another stateful hook. */
    const read = () => {
      const w = stageRef.current?.clientWidth ?? 0;
      const h = frameRef.current?.clientHeight ?? 0;
      const wide = window.matchMedia("(min-width: 768px)").matches;
      setMeasured((prev) =>
        prev.w === w && prev.h === h && prev.wide === wide
          ? prev
          : { w, h, wide },
      );
    };
    read();
    const ro = new ResizeObserver(read);
    if (stageRef.current) ro.observe(stageRef.current);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, []);

  /* ONE scroll subscription for the whole section. The index and the drum are
     both pure functions of this value, so they cannot drift out of step with
     each other, and the motion version carries exactly one pinned track.

     Hooks stay unconditional. CSS selects the static alternate markup for
     reduced-motion users before hydration; that visible version has no track
     or sticky stage. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* The runway carries a 100svh pinned stage, so the stage is pinned for the
     remainder of the runway. Shorter on small screens: the six masks all still
     play, they simply travel less far. */

  /* ---- The index's own state -------------------------------------------
     THE SECTION WRITES REACT STATE DURING SCROLL EXACTLY SIX TIMES.

     Everything visual here is still a pure transform of `scrollYProgress`, as
     it has always been — the drum's position, tilt, depth, bow and opacity are
     all MotionValues and never touch React state. What is new is `activeIndex`,
     which is needed because `aria-current` and a roving `tabIndex` are DOM
     ATTRIBUTES and cannot be expressed as a transform.

     It is guarded so it only changes on an integer boundary, which across a
     400vh runway is at most six re-renders for the whole section — not a
     per-frame write, and not the pattern this file was protecting against. */
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = clamp(
      Math.round(v * (COLLECTION.length - 1)),
      0,
      COLLECTION.length - 1,
    );
    setActiveIndex((prev) => (prev === i ? prev : i));
  });

  /* Scroll to the point in the runway where design `i` is at the front. The
     arithmetic inverts the section's own ["start start", "end end"] offset, so
     clicking a row lands on exactly the frame the scroll would have shown. */
  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = Math.max(1, el.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: top + span * (i / (COLLECTION.length - 1)),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  /* Roving focus: Tab lands on whichever design is currently at the front, and
     the arrow keys, Home and End move between all six. Focus is moved AFTER the
     scroll is issued so the browser does not fight the smooth scroll.

     NAVIGATION IS DRIVEN BY A FOCUS TRACKER, NOT BY `activeIndex`.

     Deriving the next index from `activeIndex` - which is scroll-derived state -
     made the arrow keys a function of where the reader had SCROLLED rather than
     where their FOCUS is. Press ArrowRight twice from row 01 and the second
     press recomputed the same target as the first, because the scroll that
     would have advanced `activeIndex` had not been applied yet. Tracking focus
     itself means the keys always move relative to the row the reader is actually
     standing on. */
  const indexRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = useRef(0);
  const onIndexKey = (event: ReactKeyboardEvent<HTMLOListElement>) => {
    const last = COLLECTION.length - 1;
    const from = focusIndex.current;
    let next: number;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = Math.max(0, from - 1);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = Math.min(last, from + 1);
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    focusIndex.current = next;
    jumpTo(next);
    const node = indexRefs.current[next];
    if (node) node.focus();
  };

  /* Drum geometry, derived from the measurements above.

     THE RADIUS HAS TWO BOUNDS AND BOTH ARE REAL. A FLOOR, because below
     DRUM_K_MIN card widths the neighbours come far enough back to overlap the
     featured garment they are supposed to be behind. A CEILING, because on a
     short frame a generous radius pushes them clean out of view and the section
     collapses back to a single card. The target between them is expressed as a
     share of the frame's own height, so the same rule holds at 670px and at
     1080px without a breakpoint written by hand. */
  const drum = useMemo(() => {
    const S = measured.w || 320;
    const H = measured.h || 700;
    const sin = Math.sin(rad(DRUM_STEP));
    const cos = Math.cos(rad(DRUM_STEP));

    /* The frame-based target only makes sense where the drum owns the frame's
       height. In the ONE-COLUMN stack the frame's height is not the drum's
       room - the readout and the index have already taken the top third of it -
       so the rule is inverted: the radius sits at its floor, which is the
       tightest packing in which neighbours still clear the card in front of
       them, and the stage's own reserve below is what makes it fit. */
    const k = measured.wide
      ? clamp((H * DRUM_REACH) / (S * sin || 1), DRUM_K_MIN, DRUM_K_MAX)
      : DRUM_K_MIN;
    const drumR = k * S;

    /* How far a neighbour's own edge reaches from the centre once perspective
       has shrunk it.

       WIDE: the stage reserves this much above and below its square. The drum
       is symmetric and the featured card lands on the frame's vertical centre.

       ONE-COLUMN: only the half the drum actually uses is reserved. The
       featured card is centred at `extent` from the top of the box, the box
       occupies the bottom `S` of it, and the trailing cards below simply run
       off the bottom of the pinned frame - which is what the reference does
       with them too. Reserving both halves here instead cost 0.61 of a card
       height for room the drum never reaches, and it was that figure, not the
       card, that pushed the readout out of the frame at 390x844. */
    const shrunk = (S * cos) / 2 / (DRUM_LENS + k * cos);
    const extent = drumR * sin + shrunk;

    return {
      S,
      drumR,
      extent,
      lens: DRUM_LENS * S,
      /* The bow only exists where there is somewhere to bow INTO. Below md the
         readout sits in the next row over, so the bow is a hint; from md the
         gutter and the empty columns beside the stage are its room. It is
         bounded by how far the FADING far cards may travel - at the reference's
         own ratio a card at 1.7 cards away crossed the whole gutter and put a
         12%-opacity edge over the readout at 1024px, so the ratio is 1.2. */
      bow: (measured.wide ? DRUM_BOW : DRUM_BOW_COMPACT) * S,
      height: measured.wide ? extent * 2 : extent + S / 2,
    };
  }, [measured.w, measured.h, measured.wide]);

  /* ---- Reduced motion: static, ordered, complete ---------------------- */
  const staticMarkup = (
    <Section
      id="collection-sequence-static"
      surface="dark"
      labelledBy="collection-sequence-heading-static"
      className="py-20 md:py-28"
    >
      <h2 id="collection-sequence-heading-static" className="sr-only">
        The six designs, in order
      </h2>
      {/* Same matched ground as the animated branch. The static grid is the
          same six designs and must present them the same way: a framed
          catalogue here and a floating one there would make motion preference
          change the COLLECTION, not just its movement. Absolute against the
          section; the grid below is relative and later, so it paints above. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: "var(--surface-vitrine)" }}
      />
      <div className="relative mx-auto max-w-[104rem] px-5 md:px-10 lg:px-14">
        <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTION.map((design) => (
            <li key={design.slug} className="flex flex-col">
              <span className="meta meta-stone mb-3">{design.order}</span>
              <div className="relative aspect-square w-full overflow-hidden">
                <BoardImage design={design} alt={`MR.KCRONUS ${design.name}: a black short-sleeve tee printed with this design, front view, as presented in the collection board.`} />
              </div>
              <span className="meta mt-4 text-ink">{design.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );

  /* WHY THIS SECTION HAS NO CARD, AND WHY ITS GROUND IS MEASURED RATHER THAN
     PICKED.
     The drum carries no card: the cell viewport is a bare crop of the board with
     no ground, no hairline and no frame, because the thing that made a rotating
     3D drum read as flat panels on a belt was the artwork arriving as a
     well-lit RECTANGLE rather than as a garment turning in space.

     That rectangle cannot be removed in code. collection-board.png is fully
     opaque - every one of its 1024 x 1536 pixels carries alpha 255 - and the
     studio ground behind each tee is baked in at about #080808. A blend mode
     was tried against the stone surface and measured: `lighten` keeps whichever
     pixel is LIGHTER, and stone (#e6e1d7) is lighter than nearly every pixel of
     a black-on-black print, so the stage came out EMPTY - the artwork went, not
     just its background. There is no compositing mode that drops a dark ground
     while keeping dark artwork on a light page.

     So the page meets the artwork instead. The data-surface scope is `dark`,
     because this section wants the whole light/dark editorial system that
     implies - ivory type, muted ivory metadata, gold focus - and --surface-dark is
     obsidian. But the GROUND is set separately, to --surface-vitrine, because
     the two are not the same colour and the difference is visible. MEASURED on
     the asset, over the outer 24px ring of all six cells (31,296 samples, never
     garment): median rgb(10,10,10), p10 6, p90 13. Obsidian is rgb(5,5,5) - five
     parts in 255 lighter than the median ground, which on a stage this large
     reads as a soft panel and therefore as a card. --surface-vitrine is
     rgb(11,11,11), one part from the median, and it is the token globals.css
     already defined for precisely this: the tile that matches the board's own
     ground until transparent-ground renders are supplied. Ground and artwork
     then resolve to the same value and the crop stops reading as a card at all,
     so what turns on the drum is the design. No derived asset, no re-encode, no
     approximation of approved artwork: the board is served exactly as supplied.

     Text follows the surface automatically. The semantic `text-ink` and
     `text-ink-muted` classes map to --surface-ink and --surface-muted in
     globals.css, so active and inactive index states now resolve to real,
     contrast-safe colours. The cross-faded readout is visual-only; the ordered
     index carries each design name, current-step state and entrance description
     for assistive technology. The Gateway still completes its dark-to-ivory
     crossing on its own floor before the Collection opens on the vitrine ground. */
  return (
    <>
      <div className="motion-preference-reduced">{staticMarkup}</div>
      {/* Keep the pinned track above the following section's isolated image
          stack so it cannot paint through the collection frame on release. */}
      <Section
        id="collection-sequence"
        surface="dark"
        labelledBy="collection-sequence-heading"
        className="motion-preference-full relative z-10"
      >
        {/* THE GROUND IS PAINTED HERE, NOT BY data-surface.
           Section is a fixed primitive that forwards no style, and widening it to
           do so would change every section on the page for one section's need. So
           the matched ground is this backdrop instead. It is absolute against the
           section's own relative box, and the track below is itself relative and
           later in DOM order, so it paints above this rather than under it.

           aria-hidden because it is pure ground: it carries no content and must
           never be announced. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: "var(--surface-vitrine)" }}
        />

        <h2 id="collection-sequence-heading" className="sr-only">
          The six designs, in order
        </h2>

        <div ref={trackRef} className="relative h-[300vh] lg:h-[400vh]">
          {/* THE HEADER IS FIXED AND THE FRAME IS PINNED UNDER IT.

             `h-svh` measures the whole viewport, header included, so centring the
             frame's content in it slides the readout up behind a bar that never
             moves. Measured at 392px wide: the readout's top edge landed at 25px
             on a 650px frame and 31px on 667px, against a header 65px deep - so
             the design numeral the whole section is named for was cut off across
             its top, and a phone with browser chrome cut off more of it still.
             Only the mobile stack is affected; from `md` the column is beside the
             drum rather than above it and the inset would be wasted height. */}
          <div
            ref={frameRef}
            className="sticky top-0 flex h-svh items-center overflow-hidden pt-16 md:pt-0"
          >
            <div className="mx-auto grid w-full max-w-[104rem] grid-cols-1 items-center gap-6 px-5 md:grid-cols-2 md:gap-8 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14">
              {/* THE READOUT AND THE INDEX SHARE ONE COLUMN.
                  The index replaced the old full-width thumbnail arc and took over
                  its job: the ordinal and name of all six designs, which one is at
                  the front, and every keyboard affordance the section offers.

                  It sits UNDER the readout rather than where the reference puts it,
                  top-right. Across cols 5-6 the same names measured 98px against a
                  125px column at 1024px - the collision that made the arc move
                  rows in the first place - and cols 1-4 are wide enough at every
                  breakpoint from 390px up that no name has to be shrunk or hidden
                  to fit. */}
              <div className="lg:col-span-4 md:col-start-1 md:row-start-1 lg:col-start-auto lg:row-start-auto">
                <p className="sr-only" aria-live="polite" aria-atomic="true">
                  Now showing {COLLECTION[activeIndex].order}: {COLLECTION[activeIndex].name}. {COLLECTION[activeIndex].entrance}.
                </p>
                <Readout progress={scrollYProgress} />

                <div className="mt-4 sm:mt-6 lg:mt-9">
                  <p className="meta meta-stone mb-3">The six, in order</p>
                  {/* ONE ROW ON A PHONE, ONE COLUMN FROM `sm` UP.

                        The mobile stack has to hold a readout, an index and the
                        drum inside one pinned viewport, and stacked vertically
                        the six rows took more height than the frame could spare -
                        which pushed the readout up under the fixed header. A
                        single row of ordinals costs one line instead of six, and
                        below `sm` the ordinal is the only label the row carries
                        anyway, so nothing that was on screen is lost. */}
                  <ol
                    className="grid grid-cols-6 sm:block"
                    aria-label="The six designs, in order"
                    onKeyDown={onIndexKey}
                  >
                    {COLLECTION.map((design, index) => (
                      <IndexRow
                        key={design.slug}
                        design={design}
                        index={index}
                        isActive={index === activeIndex}
                        onJump={jumpTo}
                        onFocus={(i) => {
                          focusIndex.current = i;
                        }}
                        register={(node) => {
                          indexRefs.current[index] = node;
                        }}
                      />
                    ))}
                  </ol>
                </div>
              </div>

              {/* THE DRUM.

                  The stage box is sized by CSS - the same 512px native cap the
                  section has always had, bounded by viewport HEIGHT below md so
                  the one-column stack always fits - and only its WIDTH is read
                  back, because every other dimension below is expressed against
                  that one number. Its HEIGHT is written inline as the drum's
                  reach, which is what reserves room for a card to bleed above the
                  stage without landing on the readout and index above it. */}
              <div className="md:col-start-2 md:row-start-1 lg:col-span-5 lg:col-start-8 lg:row-start-auto">
                <div
                  ref={stageRef}
                  className="relative mx-auto w-full max-w-[min(512px,30svh)] md:max-w-[min(512px,72svh)] lg:max-w-[512px]"
                  style={{
                    height: drum.height,
                    perspective: `${drum.lens}px`,
                    /* The vanishing point is the featured card's own centre, which
                       in the one-column stack sits at `extent` rather than at the
                       middle of the box. Getting this wrong skews every card in
                       the stack away from the column it belongs to. */
                    perspectiveOrigin: `50% ${drum.extent}px`,
                  }}
                >
                  {/* The wheel is pulled back by one drum radius so the front face
                      lands on the picture plane. That set-back is constant, so it
                      is a plain transform and never a MotionValue: a card at
                      distance zero ends at z = drumR - drumR = exactly the plane
                      the perspective is measured from, and therefore renders at
                      its full native size.

                      It hangs from `extent` rather than filling the box, so the
                      cards' centre line - and with it the vanishing point above -
                      is the drum's own centre and not the box's. */}
                  <div
                    className="absolute inset-x-0"
                    style={{
                      top: drum.extent,
                      height: 0,
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${-drum.drumR}px)`,
                    }}
                  >
                    {COLLECTION.map((design, index) => (
                      <DrumCard
                        key={design.slug}
                        design={design}
                        index={index}
                        progress={scrollYProgress}
                        drum={drum}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* A short vitrine pause separates the pinned frame from the next
            section without adding a full blank viewport. */}
        <div aria-hidden="true" className="h-[12svh]" />
      </Section>
    </>
  );
}

/* The lit band for ONE readout entry.
 *
 * THIS IS A HAND-OVER, NOT A CROSS-DISSOLVE, AND THE DIFFERENCE IS THE WHOLE
 * POINT.
 *
 * The band used to overlap its neighbour by 30% of a slice on each side, so at
 * every one of the five boundaries two entries were visible at once. That is
 * correct for a list of identical words - there a cross-fade is invisible - and
 * it is wrong for the READOUT, whose stacked entries carry DIFFERENT words at
 * the same coordinates. Measured, the two opacities summed to as much as 1.334:
 * "THE WITNESS" printed through "THE SIGIL", and the entrance sentence through
 * the one beneath it, across roughly a third of the runway.
 *
 * These ranges are deliberately shaped so the outgoing entry is already
 * fading while the incoming one is still faint. The two therefore overlap only
 * at LOW opacity - a maximum combined strength of about a third - so the hand-
 * over reads as one name replacing another rather than as two names fighting.
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
    Math.max(0, from - width * 0.05),
    from + width * 0.25,
    to - width * 0.25,
    Math.min(1, to + width * 0.05),
  ];
}

/**
 * THE READOUT
 *
 * Which design is on the stage, at display scale, plus the sentence describing
 * how it enters.
 *
 * The six entries are stacked and cross-faded from the same scroll progress
 * that drives the cards and the index, so all three agree by construction -
 * there is no shared state to fall out of sync.
 */
function Readout({ progress }: { progress: MotionValue<number> }) {
  const slice = 1 / COLLECTION.length;

  return (
    <div aria-hidden="true">
      <p className="meta meta-stone mb-5 md:mb-6">Now showing</p>
      <div className="relative min-h-[8rem] lg:min-h-[9rem]">
        {COLLECTION.map((design, index) => {
          const from = index * slice;
          const to = (index + 1) * slice;
          return (
            <ReadoutItem
              key={design.slug}
              design={design}
              progress={progress}
              band={bandFor(from, to)}
              /* THE FIRST ENTRY IS LIT FROM THE START, and it is the only one
                 that is. Every card's mask is closed at progress zero by
                 design - that is what makes the reveal a reveal - so for the
                 length of the section's approach the stage is genuinely empty.
                 With the Manifest no longer sitting between the Gateway and
                 this section, that empty stage is the first thing the reader
                 meets: they arrive on a "Now showing" label over nothing, and
                 the Hero's CTA drops them straight into it.

                 Naming the design from the first frame turns the wait into an
                 anticipation rather than a gap. Its FADE is untouched - it still
                 hands over to 02 on exactly the same band - so the six-entry
                 choreography below is unchanged. */
              lit={index === 0}
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
  lit,
  isLast,
}: {
  design: CollectionDesign;
  progress: MotionValue<number>;
  band: [number, number, number, number];
  lit: boolean;
  isLast: boolean;
}) {
  /* The band's own offsets stay where they are for every entry, including the
     first: band[0] already clamps to 0, so `lit` changes only the VALUE at
     progress zero and never the shape of the hand-over. Offsets remain
     non-decreasing, which is what Motion's WAAPI path requires at mount. */
  const falls = useTransform(progress, band, lit ? [1, 1, 1, 0] : [0, 1, 1, 0]);
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
      {/* The colour is set through the surface token directly. This used to be
          `text-[--surface-ink-muted]`, and --surface-ink-muted is declared
          nowhere in globals.css - only --surface-ink, --surface-ink-soft and
          --surface-muted exist. The class silently resolved to nothing and the
          sentence inherited full --ink, so 13px tertiary metadata rendered at
          16.58:1 and competed with the 64px design name instead of supporting
          it. --surface-muted is the token that actually exists. */}
      <p className="mt-5 text-[0.8125rem] leading-relaxed tracking-[0.08em] uppercase" style={{ color: "var(--surface-muted)" }}>
        {design.entrance}
      </p>
    </motion.div>
  );
}

/**
 * ONE ROW OF THE INDEX
 *
 * The section's only interactive control set. It carries the ordinal and the
 * name of every design, which one is at the front, and the roving tabindex the
 * keyboard walks.
 *
 * The name is hidden below `sm` and kept in the accessibility tree by an
 * `sr-only` twin, for the same reason the old arc hid it: at 390px six names
 * stacked this tightly run to three lines, and the readout in the same frame is
 * already printing the active design's name at display scale. The ordinal
 * stays visible at every width, so the row is never anonymous.
 *
 * The card stack beside it carries no accessible name of its own. It is the
 * same six designs, in the same order, and announcing them twice would make a
 * screen reader walk the collection twice.
 */
function IndexRow({
  design,
  index,
  isActive,
  onJump,
  onFocus,
  register,
}: {
  design: CollectionDesign;
  index: number;
  isActive: boolean;
  onJump: (i: number) => void;
  onFocus: (i: number) => void;
  register: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <li>
      <button
        type="button"
        ref={register}
        aria-current={isActive ? "step" : undefined}
        aria-describedby={`collection-entrance-${design.slug}`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => onJump(index)}
        onFocus={() => onFocus(index)}
        className="flex min-h-11 w-full items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-current"
      >
        <span
          className={`display shrink-0 text-[0.95rem] leading-none ${
            isActive ? "text-ink" : "text-ink-muted"
          }`}
        >
          {design.order}
        </span>
        <span aria-hidden="true" className={`meta hidden sm:block ${isActive ? "text-ink" : "text-ink-muted"}`}>
          {design.name}
        </span>
        <span className="sr-only">{design.name}</span>
      </button>
      <span id={`collection-entrance-${design.slug}`} className="sr-only">
        {design.entrance}
      </span>
    </li>
  );
}

/**
 * ONE CARD OF THE DRUM
 *
 * Every value is a transform of the SAME `progress` the readout and the index
 * consume, so a card cannot drift out of step with the name beside it and the
 * section still owns exactly one scroll subscription.
 *
 * Nothing here writes React state on scroll.
 */
function DrumCard({
  design,
  index,
  progress,
  drum,
}: {
  design: CollectionDesign;
  index: number;
  progress: MotionValue<number>;
  drum: { S: number; drumR: number; bow: number };
}) {
  const count = COLLECTION.length;

  /* Distance, in cards, between this one and the one at the front. Zero when
     this design is the one being shown. */
  const distance = useTransform(progress, (v) => index - v * (count - 1));

  /* THE DRUM'S OWN PLACEMENT
     `rotateX(a) translateZ(r)` is not the same as `translateZ(r) rotateX(a)`,
     and the difference is the whole drum: rotated first, the push along z
     travels down the card's own tilted normal, which is what separates the
     neighbours VERTICALLY. Motion composes translate before rotate, so the
     offset is resolved into world space first and handed back as x, y and z —
     at which point Motion's own ordering produces the same matrix exactly.

       rotateX(a) . translateZ(r)  ==  translate3d(0, -r·sin a, r·cos a) . rotateX(a)

     which is what the three transforms below compute. */
  const theta = useTransform(distance, (d) => rad(d * DRUM_STEP));
  /* The bow. Negative, so every neighbour swings back to the LEFT of the front
     card and the strip reads as one arc rather than a stack: the reference's
     front card sits at the arc's near point and its neighbours have already
     turned away. */
  const x = useTransform(theta, (t) => snap(-drum.bow * (1 - Math.cos(t))));
  const y = useTransform(theta, (t) => snap(-drum.drumR * Math.sin(t)));
  const z = useTransform(theta, (t) => snap(drum.drumR * Math.cos(t)));
  const rotateX = useTransform(distance, (d) => snap(d * DRUM_STEP));

  /* Culled by distance, never by index. Full strength to a card away, then a
     smooth ramp to nothing — the reference hard-cuts at 1.6, which is a
     visible pop on a card that is still large on screen, and a scroll-linked
     value has no frame rate to hide it on. */
  const opacity = useTransform(distance, (d) =>
    clamp(1 - (Math.abs(d) - (DRUM_CULL - DRUM_FADE)) / DRUM_FADE, 0, 1),
  );

  /* ---- THE MASK — UNCHANGED -------------------------------------------
     These windows, and the four values below them, are exactly what this
     section has always used. The drum moves the card; it does not reschedule
     the reveal. A card's mask therefore finishes opening while it is still
     approaching the front, which is the same thing it did when the cards were
     stacked flat.

     BOTH ENDS ARE CLAMPED TO [0, 1]: Motion consumes a scroll-driven input
     range directly as WAAPI keyframe offsets, and an offset outside [0, 1] -
     or a descending one - throws at mount and takes the page down with it. */
  const sliceWidth = 1 / count;
  const from = index * sliceWidth;
  const window: [number, number] = [
    Math.max(0, from - sliceWidth * 0.22),
    from + sliceWidth * 0.2,
  ];

  /* Derived DIRECTLY from progress rather than from `entrance`. clipPath is a
     string-valued, non-composited property, so Motion drives it through WAAPI
     rather than through a MotionValue chain; chaining a string transform on
     top of another is what produced the "offsets must be monotonically
     non-decreasing" failure at mount. One hop, one source. */
  const clipPath = useTransform(progress, window, clipFor(design.mask));

  /* Drift is deliberately small: the garment is being examined, not thrown
     past the reader. The foreground rate is used nowhere on this page. */
  const entrance = useTransform(progress, window, [0, 1]);
  const drift = useTransform(entrance, [0, 1], [DRIFT.slow * 0.5, -DRIFT.slow * 0.5]);
  const scale = useTransform(entrance, [0, 1], [1.03, 1]);

  /* ---- THE ENEMY ------------------------------------------------------
     THE ENEMY stays the darkest card in the drum, but it must not disappear.
     The dip used to reach zero, which emptied the stage entirely on the one
     design whose artwork is already near-black. It now floors at 0.3: the
     garment dims and recovers, and reads as passing through the dark without
     the stage ever going black.

     Called unconditionally then selected, because a conditional hook is a
     rules-of-hooks violation. */
  const dip = useTransform(entrance, [0, 0.4, 1], [0.3, 0.3, 1]);
  const throughBlack = design.mask === "fade-through";

  const S = drum.S;

  return (
    /* Absolute and centred on the wheel's own origin line, then offset by
       margin rather than by a transform so that Motion owns the transform
       outright. */
    <motion.div
      className="absolute top-0 left-1/2"
      style={{
        width: S,
        height: S,
        marginLeft: -S / 2,
        marginTop: -S / 2,
        x,
        y,
        z,
        rotateX,
        opacity,
      }}
    >
      {/* THE MASK LAYER SITS ABOVE THE DRIFT, exactly as it always did: the
          reveal window is fixed to the card's own box and the garment moves
          inside it, rather than the window travelling with the garment.
          THE ENEMY takes no clip at all — its personality is the dip below, and
          a clip on top of a full-frame dissolve would only letterbox it. */}
      <motion.div
        className="absolute inset-0"
        style={{ clipPath: throughBlack ? undefined : clipPath }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: drift, scale, opacity: throughBlack ? dip : 1 }}
        >
          {/* NO GROUND, NO FRAME, NO CARD.
              The board is fully opaque - all 1024 x 1536 pixels carry alpha 255,
              and the studio ground behind each tee is baked in at about #080808
              - so the old .vitrine tile never did any work: the bitmap covered
              it. What read as "a card" was the artwork's OWN black square plus a
              one-pixel hairline, and that is what made a rotating 3D drum look
              like flat panels on a belt. Both are gone here.

              WHAT REMAINS IS THE ASSET, NOT THE CODE. Removing the CSS cannot
              remove a background that is painted into the approved artwork, and
              manufacturing a cut-out from the board is prohibited, so the
              garment still arrives as a dark square until it is shown on a
              surface that matches its own ground - globals.css has always
              flagged .vitrine as exactly that workaround, and retires it the
              moment transparent-ground renders are supplied. */}
          <div className="relative h-full w-full overflow-hidden">
            {/* alt="" — the index row beside this card already carries the
                ordinal and the design, so describing the panel again would make
                a screen reader announce the design twice. The card is the same
                CSS viewport onto the unmodified board that the stage has always
                used: 200% x 300%, offset by the cell's own row and column. */}
            <BoardImage design={design} alt="" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * A CSS viewport onto one cell of the board.
 *
 * The image is rendered at 200% x 300% of the square card and offset by
 * percentage, because a percentage offset resolves against the containing
 * block - which is the square card, exactly one cell wide. No measurement, no
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
         rendered at 200% x 300% of the card and then offset, so the card is up
         to 512px and the bitmap is at most 1024px - which is exactly the
         board's native width.

         MEASURED IN A PRODUCTION BUILD, NOT ASSUMED. This used to be
         "(max-width: 1023px) 220vw, 1300px", which made the browser ask for
         the 3840w candidate for a 1024px source. The optimiser clamps that to
         native, so quality was never harmed, but the over-request was real. A
         flat 1024px is exact at every breakpoint the card can reach 512, and
         never asks the optimiser to build a candidate larger than the file.

         THE RESOLUTION CEILING IS THE ASSET, NOT THIS CODE.
         collection-board.png is 1024 x 1536, so each 512px cell is shown at
         precisely its native size and never enlarged. Verified in production:
         the served bitmap is 1024 x 1536 and the <img> box is smaller than it
         at every breakpoint, so the garments are DOWNSCALED, never upscaled.
         What remains true is the ceiling: on a 2x display the card is still
         only 512 CSS px, which is soft. Fixing that needs a higher-resolution
         board from the brand, and is not a code change. */
      sizes="1024px"
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
