"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Symbol from "@/components/brand/Symbol";
import { useCompactMotion } from "@/components/motion/motionEnv";
import Section from "./Section";

/**
 * THE MARK — THE SYMBOL, TAKEN APART
 *
 * The Creed ends on the mark alone. Here that flat mark resolves into the exploded
 * plate, and the camera examines it part by part: each part lights and fills the frame
 * as its name scrolls past. It ends on the whole mark, and the plate's own last line.
 *
 * THE PLATE IS ONE FLAT IMAGE
 * Its parts are not separate layers and do not move apart. The plate is drawn twice: a
 * dim copy, and a bright copy clipped to the part in focus. Nothing is cut or redrawn.
 *
 * THE WORDS ARE SUPPLIED
 * Every name and meaning is printed on archive-plate-full.png. This uses the clean
 * archive-plate.png, so they can be real text and so the full plate's printed "The
 * Archive Is Open" line, no longer true, is left out. Do not add parts or meanings.
 *
 * WHY THE PARTS HAVE EQUAL HEIGHTS
 * The list's scroll progress maps straight onto the camera's keyframes, so part i is in
 * focus at (i + 1.5) / LIST_UNITS on any screen, with no measuring.
 */

const PLATE = {
  src: "/brand/archive-plate.png",
  width: 620,
  height: 975,
  alt: "The MR.KCRONUS symbol in polished metal, separated into its component parts on a black ground, with fine lines running to the right from each part.",
} as const;
// The camera magnifies it, so the full file is always wanted.
const PLATE_SIZES = "620px";

/** rect is [left, top, right, bottom] as a percentage of the plate. */
const PARTS = [
  { name: "Top Point", meaning: "Focus. Ascendance. The starting point.", rect: [44, 7.5, 53, 13], zoom: 2.2 },
  { name: "Circle", meaning: "Unity. Cycle. The eternal loop.", rect: [40, 15, 56, 24.8], zoom: 2 },
  { name: "Horizontal Line", meaning: "Balance. Horizon. The line between.", rect: [39.5, 25.4, 56.5, 29.6], zoom: 1.8 },
  { name: "Central Axis", meaning: "Strength. Alignment. The spine of purpose.", rect: [46, 30, 50, 52], zoom: 1.5 },
  // The arms and the guardians share rows with other parts, so each has its own outline.
  { name: "Triad Arms", meaning: "Creation. Direction. The three paths.", rect: [17, 31, 79.5, 55], zoom: 1.25, outline: [[17, 31], [79.5, 31], [79.5, 37], [50, 55], [46, 55], [17, 37]] },
  { name: "Intersection", meaning: "Convergence. Where intentions meet.", rect: [42, 49.5, 54, 58.5], zoom: 2 },
  { name: "Guardians", meaning: "Protection. Boundaries. The silent watchers.", rect: [6.5, 51, 90, 69.5], zoom: 1.1, outline: [[6.5, 51], [36, 51], [36, 60], [60, 60], [60, 51], [90, 51], [90, 69.5], [60, 69.5], [60, 60], [36, 60], [36, 69.5], [6.5, 69.5]] },
  { name: "Core Diamond", meaning: "Essence. Identity. The heart of the archive.", rect: [37, 58.5, 59, 78], zoom: 1.7, outline: [[48, 58.5], [59, 68], [59, 71], [48, 78], [37, 71], [37, 68]] },
  { name: "Foundation", meaning: "Grounding. Origin. Built to endure.", rect: [45, 76.5, 51, 87], zoom: 1.9 },
  { name: "Base Point", meaning: "Root. Beginning. The mark of existence.", rect: [44.5, 88.5, 52, 94], zoom: 2.2 },
] as const;

/** One unit of padding above and below the ten parts. Mirrored by .mark-list. */
const LIST_UNITS = PARTS.length + 2;

/* The camera holds on each part, and rests on the whole plate at both ends. */
const STOPS = [
  0,
  ...PARTS.flatMap((_, i) => [(i + 1.25) / LIST_UNITS, (i + 1.75) / LIST_UNITS]),
  1,
];
function keyframes<T>(whole: T, forPart: (part: (typeof PARTS)[number]) => T): T[] {
  return [whole, ...PARTS.flatMap((part) => [forPart(part), forPart(part)]), whole];
}
/* Every outline has twelve points, so the light can travel from one to the next. */
const POINTS = 12;
function polygon(points: readonly (readonly [number, number])[]) {
  const padded = Array.from({ length: POINTS }, (_, i) => points[Math.min(i, points.length - 1)]);
  return `polygon(${padded.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;
}
const box = ([l, t, r, b]: readonly [number, number, number, number]) =>
  [[l, t], [r, t], [r, b], [l, b]] as const;
const CLIP = keyframes(polygon(box([0, 0, 100, 100])), (part) =>
  polygon("outline" in part ? part.outline : box(part.rect)),
);
const ZOOM = keyframes(1, (part) => part.zoom);
const CAMERA_X = keyframes("0%", ({ rect: [l, , r], zoom }) => `${(50 - (l + r) / 2) * zoom}%`);
const CAMERA_Y = keyframes("0%", ({ rect: [, t, , b], zoom }) => `${(50 - (t + b) / 2) * zoom}%`);
const TILT = keyframes(0, ({ rect: [, t, , b] }) => (50 - (t + b) / 2) * 0.14);
const TURN = [0, ...PARTS.flatMap((_, i) => [i % 2 ? 3 : -3, i % 2 ? 3 : -3]), 0];
/* The leader starts at the right edge of the part in focus. 63.6 is the plate's width in cqh. */
const LEAD_X = keyframes("0cqh", ({ rect: [l, , r], zoom }) => `${((r - l) / 200) * 63.6 * zoom + 1.5}cqh`);
const LEAD_STOPS = [0, STOPS[1], STOPS[STOPS.length - 2], 1];

function PartLabel({
  part,
  index,
  progress,
}: {
  part: (typeof PARTS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [(index + 1) / LIST_UNITS, (index + 1.25) / LIST_UNITS, (index + 1.75) / LIST_UNITS, (index + 2) / LIST_UNITS],
    [0.4, 1, 1, 0.4],
  );
  return (
    <motion.li className="mark-part" style={{ opacity }}>
      <h3 className="mark-part-name">{part.name}</h3>
      <p className="mark-part-meaning">{part.meaning}</p>
    </motion.li>
  );
}

export default function TheMark() {
  const compact = useCompactMotion();
  const intro = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  // On a phone the plate holds the top of the screen, so a name is read lower down.
  const line = compact ? "78%" : "50%";
  const { scrollYProgress: progress } = useScroll({
    target: list,
    offset: [`start ${line}`, `end ${line}`],
  });
  const { scrollYProgress: resolve } = useScroll({
    target: intro,
    offset: ["end 100%", "end 62%"],
  });

  // One after the other: the two drawings differ, so a crossfade would ghost.
  const flatOpacity = useTransform(resolve, [0, 0.5], [1, 0]);
  const plateOpacity = useTransform(resolve, [0.5, 1], [0, 1]);
  const clipPath = useTransform(progress, STOPS, CLIP);
  const scale = useTransform(progress, STOPS, ZOOM);
  const x = useTransform(progress, STOPS, CAMERA_X);
  const y = useTransform(progress, STOPS, CAMERA_Y);
  const rotateX = useTransform(progress, STOPS, TILT);
  const rotateY = useTransform(progress, STOPS, TURN);
  const leadX = useTransform(progress, STOPS, LEAD_X);
  const leadOpacity = useTransform(progress, LEAD_STOPS, [0, 1, 1, 0]);

  return (
    <>
      <noscript>
        <style>{"#the-mark{display:none}#the-mark-static{display:block}"}</style>
      </noscript>

      {/* Reduced motion and no script: the whole plate, and every part in words. */}
      <Section
        id="the-mark-static"
        surface="dark"
        labelledBy="the-mark-heading-static"
        className="motion-preference-reduced py-24"
      >
        <div className="mx-auto grid w-full max-w-[104rem] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:px-14">
          <div className="mark-plate mark-plate-static mx-auto lg:col-span-6">
            <Image src={PLATE.src} alt={PLATE.alt} fill sizes={PLATE_SIZES} className="object-contain" />
          </div>
          <div className="lg:col-span-6">
            <h2 id="the-mark-heading-static" className="display-editorial">
              The Symbol, Taken Apart
            </h2>
            <p className="prose-archive mt-6">
              Every design in the collection is built from the same canonical geometry.
            </p>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2">
              {PARTS.map((part) => (
                <li key={part.name}>
                  <h3 className="mark-part-name">{part.name}</h3>
                  <p className="mark-part-meaning">{part.meaning}</p>
                </li>
              ))}
            </ol>
            <p className="display-editorial mt-12">Built different. Made timeless.</p>
          </div>
        </div>
      </Section>

      <Section
        id="the-mark"
        surface="dark"
        labelledBy="the-mark-heading"
        className="motion-preference-full"
      >
        <div className="mark-track mx-auto w-full max-w-[104rem] px-5 md:px-10 lg:px-14">
          <div className="mark-stage">
            <motion.div
              className="mark-plate"
              style={{ x, y, scale, rotateX, rotateY, transformPerspective: 1400 }}
            >
              <motion.div className="absolute inset-0" style={{ opacity: plateOpacity }}>
                <Image
                  src={PLATE.src}
                  alt={PLATE.alt}
                  fill
                  sizes={PLATE_SIZES}
                  className="object-contain opacity-30"
                />
                <motion.div aria-hidden="true" className="absolute inset-0" style={{ clipPath }}>
                  <Image src={PLATE.src} alt="" fill sizes={PLATE_SIZES} className="object-contain" />
                </motion.div>
              </motion.div>
              <motion.div aria-hidden="true" className="mark-flat" style={{ opacity: flatOpacity }}>
                <Symbol height="100%" />
              </motion.div>
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="mark-lead"
              style={{ x: leadX, opacity: leadOpacity }}
            />
          </div>

          <div className="mark-copy">
            <div ref={intro} className="mark-intro">
              <h2 id="the-mark-heading" className="display-editorial">
                The Symbol, Taken Apart
              </h2>
              <p className="prose-archive mt-6">
                Every design in the collection is built from the same canonical geometry.
              </p>
            </div>

            <ol ref={list} className="mark-list">
              {PARTS.map((part, index) => (
                <PartLabel key={part.name} part={part} index={index} progress={progress} />
              ))}
            </ol>

            <div className="mark-close">
              <p className="display-editorial">Built different. Made timeless.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
