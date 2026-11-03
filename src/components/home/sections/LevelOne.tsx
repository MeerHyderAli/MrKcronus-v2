"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { getArchivePlate } from "@/components/archive/archiveData";
import Symbol from "@/components/brand/Symbol";
import {
  getCollectionDesign,
  getColourway,
  getColourwayImage,
  type CollectionDesign,
  type HouseColour,
} from "@/components/collection/collectionData";
import {
  getLevelEntries,
  getUniverseLevel,
  type UniverseEntry,
} from "@/components/universe/universe";
import { BoardImage } from "./CollectionSequence";
import Section from "./Section";

/**
 * LEVEL 01 — THE TIMELINE
 *
 * One pinned track, one sideways camera, every entry in the level. Each entry
 * pairs its story plate with the garment that carries it.
 *
 * THE IDEA COMES FROM THE ARTWORK
 * The plates and garments already tell this story in their own printed words:
 * "I saw the timeline break", "Timeline 01: Collapsed", "The next timeline
 * awaits". So the section is that timeline. One line runs through every entry,
 * snaps at The Fracture and comes back off-axis, the camera rolls with it and
 * never levels out, and the line runs out at The Unknown.
 *
 * THE WORDS ARE SUPPLIED, NOT WRITTEN
 * LINES below reproduces lines printed on the supplied artwork as real text.
 * They live here rather than in universe.ts because that model holds no lore.
 * An entry without a line, a plate or a garment still renders.
 *
 * GARMENT AND PLATE STAY SEPARATE REGISTERS
 * A plate is editorial artwork and is never presented as clothing. The Sigil has
 * no character plate, so the canonical symbol stands in its place, as itself.
 *
 * THE DEPTH IS REAL
 * Plates hang behind the type and garments in front of it, so one camera value
 * gives true parallax. --level-e is an entry's width, so the camera is expressed
 * in entries and no length is measured in JS.
 *
 * THE CAMERA DWELLS
 * `path` slows to a quarter speed on each entry and carries the distance in
 * between, so every line can be read without the scroll ever snapping.
 */

/** How strongly the camera slows on each entry. 0 is linear, 1 is a full stop. */
const DWELL = 0.72;
const FRACTURE_ID = "the-fracture";
/** How far the world rolls at the break, and never recovers from. */
const ROLL_DEGREES = -1.6;

const LINES: Readonly<Record<string, string>> = {
  "the-architect": "Time is my blueprint. Reality is my design.",
  "the-sigil": "Control the flow. Control everything.",
  "the-witness": "I saw the timeline break. I saw him rewrite it. I chose to witness.",
  "the-fracture": "Timeline 01: Collapsed",
  "the-enemy":
    "He seeks order. He fears chaos. He wants a timeline that never changes. I want freedom.",
  "the-unknown": "Something is approaching. The next timeline awaits.",
};

const LAYOUTS: Readonly<Record<string, "left" | "right" | "centre">> = {
  "the-sigil": "centre",
  "the-witness": "right",
  "the-enemy": "right",
};

/** The Enemy stays classified: it lights later and goes dark sooner. */
const LIGHT_REACH: Readonly<Record<string, number>> = { "the-enemy": 0.5 };

const PLATE_SIZES = "(min-width: 64rem) 66vh, 86vw";

/**
 * The crack in The Fracture's plate. It leaves the standing figure whole, and
 * both shards pivot on its lower end, so it opens as a wedge from the top.
 */
const SHARD_PIVOT = "36% 100%";
const SHARD_LEFT =
  "polygon(0 0, 53% 0, 49% 16%, 55% 30%, 47% 45%, 50% 58%, 40% 70%, 33% 84%, 36% 100%, 0 100%)";
const SHARD_RIGHT =
  "polygon(53% 0, 100% 0, 100% 100%, 36% 100%, 33% 84%, 40% 70%, 50% 58%, 47% 45%, 55% 30%, 49% 16%)";

/**
 * Where each board row's printed label ends, as a share of the card. The board's
 * rows are not equal cells, so this differs by row. The Enemy's card also catches
 * the rule beside it, which sits further in than the column line.
 */
const ROW_LABEL_END = ["6%", "13.7%", "13%"];

/**
 * Garments shown from a colourway sheet rather than the board, and in which colour.
 * The board's Architect cell has the obsolete clock print, so at the client's
 * instruction this one shows the correct print. The image holds both views, and
 * object-right frames the back, where the print is.
 */
const COLOURWAY_GARMENTS: Readonly<Record<string, HouseColour>> = { architect: "black" };

function garmentMask(design: CollectionDesign) {
  return {
    // A colourway image has no printed label to hide, so its top edge stays whole.
    "--garment-top": COLOURWAY_GARMENTS[design.slug] ? "-2%" : ROW_LABEL_END[design.cell.row],
    ...(design.slug === "enemy" ? { "--garment-right": "87%" } : null),
  } as object;
}

function garmentAlt(name: string) {
  return `MR.KCRONUS ${name}: a black short-sleeve tee printed with this design, front view, as presented in the collection board.`;
}

function Garment({
  design,
  loading,
}: {
  design: CollectionDesign;
  loading?: "lazy" | "eager";
}) {
  const colour = COLOURWAY_GARMENTS[design.slug];
  if (!colour) {
    return <BoardImage design={design} alt={garmentAlt(design.name)} loading={loading} />;
  }
  return (
    <Image
      src={getColourwayImage(design.slug, colour).src}
      alt={`${design.name} tee in ${getColourway(design.slug, colour).name}, back view: ${design.artwork.back}.`}
      fill
      sizes="(min-width: 64rem) 80vh, 76vw"
      loading={loading}
      className="object-cover object-right"
    />
  );
}

function Shard({
  src,
  alt,
  clipPath,
  rotate,
  sizes,
  loading,
}: {
  src: string;
  alt: string;
  clipPath: string;
  rotate: MotionValue<number>;
  sizes: string;
  loading: "lazy" | "eager";
}) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ clipPath, rotate, transformOrigin: SHARD_PIVOT }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} loading={loading} className="object-contain" />
    </motion.div>
  );
}

function FracturedPlate({
  entry,
  distance,
  loading,
}: {
  entry: UniverseEntry;
  distance: MotionValue<number>;
  loading: "lazy" | "eager";
}) {
  const plate = getArchivePlate(entry.plateId as string);
  const leftRotate = useTransform(distance, [-0.55, 0.15], [0, -2]);
  const rightRotate = useTransform(distance, [-0.55, 0.15], [0, 1.5]);
  return (
    <>
      <Shard
        src={plate.src}
        alt={plate.alt}
        clipPath={SHARD_LEFT}
        rotate={leftRotate}
        sizes={PLATE_SIZES}
        loading={loading}
      />
      <Shard
        src={plate.src}
        alt=""
        clipPath={SHARD_RIGHT}
        rotate={rightRotate}
        sizes={PLATE_SIZES}
        loading={loading}
      />
    </>
  );
}

function Entry({
  entry,
  index,
  path,
  loading,
  afterBreak,
}: {
  entry: UniverseEntry;
  index: number;
  path: MotionValue<number>;
  loading: "lazy" | "eager";
  afterBreak: boolean;
}) {
  const plate = entry.plateId ? getArchivePlate(entry.plateId) : null;
  const design = entry.designSlug ? getCollectionDesign(entry.designSlug) : null;
  const line = LINES[entry.id];
  const reach = LIGHT_REACH[entry.id] ?? 1;

  const distance = useTransform(path, (v) => v - index);
  const visibility = useTransform(distance, (d) =>
    Math.abs(d) > 1.8 ? "hidden" : "visible",
  );
  const plateOpacity = useTransform(
    distance,
    [-reach, -reach * 0.35, reach * 0.35, reach],
    [reach < 1 ? 0 : 0.1, 1, 1, reach < 1 ? 0 : 0.1],
  );
  const garmentOpacity = useTransform(distance, [-0.8, -0.25, 0.25, 0.8], [0, 1, 1, 0]);
  const textOpacity = useTransform(distance, [-0.6, -0.22, 0.22, 0.6], [0, 1, 1, 0]);
  const textY = useTransform(distance, [-0.6, -0.1], [26, 0]);
  // Both turn to face the viewer, so the line of entries reads as a curved wall.
  const plateTurn = useTransform(distance, [-1, 1], [-9, 9]);
  const garmentTurn = useTransform(distance, [-1, 1], [-20, 20]);

  return (
    <motion.article
      className="level-entry"
      data-layout={LAYOUTS[entry.id] ?? "left"}
      style={{ visibility }}
    >
      <div className="level-plane level-plane--plate">
        <motion.div
          className="level-plate-art"
          style={{
            opacity: plateOpacity,
            rotateY: plateTurn,
            aspectRatio: plate ? `${plate.width} / ${plate.height}` : undefined,
          }}
        >
          {entry.id === FRACTURE_ID && plate ? (
            <FracturedPlate entry={entry} distance={distance} loading={loading} />
          ) : plate ? (
            <Image
              src={plate.src}
              alt={plate.alt}
              fill
              sizes={PLATE_SIZES}
              loading={loading}
              className="object-contain"
            />
          ) : entry.kind === "symbol" ? (
            <Symbol height="100%" className="mx-auto" decorative={false} label="The MR.KCRONUS symbol" />
          ) : null}
        </motion.div>
      </div>

      {design ? (
        <div className="level-plane level-plane--garment">
          <motion.div
            className="level-garment"
            style={{ opacity: garmentOpacity, rotateY: garmentTurn, ...garmentMask(design) }}
          >
            <Garment design={design} loading={loading} />
          </motion.div>
        </div>
      ) : null}

      <motion.div className="level-text" style={{ opacity: textOpacity, y: textY }}>
        <h3 className="level-name">{entry.name}</h3>
        {line ? <p className="level-line mt-4">{line}</p> : null}
      </motion.div>

      <div className="level-mark" data-after-break={afterBreak || undefined}>
        <span className="meta meta-stone">{entry.order}</span>
      </div>
    </motion.article>
  );
}

export default function LevelOne() {
  const level = getUniverseLevel("level-01");
  const entries = getLevelEntries("level-01");
  const count = entries.length;
  const breakAt = entries.findIndex((entry) => entry.id === FRACTURE_ID);

  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // Off-screen plates sit inside a clipped stage, so native lazy loading would
  // only fetch each one as it enters the frame. Fetch them as the track nears.
  const near = useInView(track, { once: true, margin: "100% 0px" });
  const loading = near ? "eager" : "lazy";

  // Entries travelled: -1 is the opening frame, n - 1 is the last entry.
  const path = useTransform(progress, (p) => {
    const s = p * count - 1;
    return s - (DWELL / (2 * Math.PI)) * Math.sin(2 * Math.PI * s);
  });
  const shift = useTransform(path, (v) => 1 + v);
  const camera = useMotionTemplate`translate3d(calc(var(--level-e) * -${shift}), 0, 0)`;
  const roll = useTransform(
    path,
    [breakAt - 0.6, breakAt + 0.05],
    breakAt < 0 ? [0, 0] : [0, ROLL_DEGREES],
  );
  const introOpacity = useTransform(path, [-0.72, -0.28], [1, 0]);

  return (
    <>
      <noscript>
        <style>{"#level-01{display:none}#level-01-static{display:block}"}</style>
      </noscript>

      {/* Reduced motion and no script: every entry in order, standing still. */}
      <Section
        id="level-01-static"
        surface="dark"
        labelledBy="level-01-heading-static"
        className="motion-preference-reduced"
      >
        <div className="mx-auto w-full max-w-[104rem] px-5 py-24 md:px-10 lg:px-14">
          <h2 id="level-01-heading-static" className="level-title">
            {level.label}
          </h2>
          <p className="level-line mt-6">The first chapter. {count} entries.</p>

          <ol className="mt-20 grid gap-24">
            {entries.map((entry) => {
              const plate = entry.plateId ? getArchivePlate(entry.plateId) : null;
              const design = entry.designSlug ? getCollectionDesign(entry.designSlug) : null;
              return (
                <li key={entry.id} className="grid gap-10 md:grid-cols-2 md:items-center">
                  {plate ? (
                    <Image
                      src={plate.src}
                      alt={plate.alt}
                      width={plate.width}
                      height={plate.height}
                      sizes="(min-width: 48rem) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                  ) : entry.kind === "symbol" ? (
                    <Symbol
                      height="60svh"
                      className="mx-auto"
                      decorative={false}
                      label="The MR.KCRONUS symbol"
                    />
                  ) : null}
                  <div>
                    <h3 className="level-name">
                      {entry.order}. {entry.name}
                    </h3>
                    {LINES[entry.id] ? (
                      <p className="level-line mt-4">{LINES[entry.id]}</p>
                    ) : null}
                    {design ? (
                      <div className="level-garment mt-8 max-w-[24rem]" style={garmentMask(design)}>
                        <Garment design={design} />
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      <Section
        id="level-01"
        surface="dark"
        labelledBy="level-01-heading"
        className="motion-preference-full"
      >
        <div
          ref={track}
          className="level-track relative"
          style={{ height: `calc(100vh + ${count} * var(--level-step))` }}
        >
          <div className="level-stage sticky top-0 h-svh overflow-clip bg-obsidian">
            <motion.div
              className="absolute inset-0"
              style={{ rotateZ: roll, transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="level-world"
                style={
                  {
                    transform: camera,
                    "--level-n": count,
                    "--level-break": breakAt < 0 ? count : breakAt,
                  } as object
                }
              >
                <div aria-hidden="true" className="level-axis" />
                {breakAt >= 0 ? (
                  <div aria-hidden="true" className="level-axis level-axis--after" />
                ) : null}

                <motion.div className="level-intro" style={{ opacity: introOpacity }}>
                  <h2 id="level-01-heading" className="level-title">
                    {level.label}
                  </h2>
                  <p className="level-line mt-6">The first chapter. {count} entries.</p>
                </motion.div>

                {entries.map((entry, index) => (
                  <Entry
                    key={entry.id}
                    entry={entry}
                    index={index}
                    path={path}
                    loading={loading}
                    afterBreak={breakAt >= 0 && index > breakAt}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
