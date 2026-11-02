"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * THE WORLD — THE COLONNADE
 *
 * The first story beat after the Threshold, and the page's third pinned track.
 *
 * THE IDEA COMES FROM THE PLATE
 * The figure wears a print of the stone head that stands on their horizon. So
 * the camera walks a dark colonnade toward one small figure, and the head is
 * withheld until the walls clear. On desktop both heads then share the frame:
 * the one in the world and the one being worn. A phone's crop cannot hold both,
 * so there the camera turns from the print to the head instead.
 *
 * THE DEPTH IS REAL, AND THE PLATE IS NEVER CUT
 * The plate is a flat raster, so no pieces are lifted out of it. The arches and
 * the floor are separate planes in one CSS 3D scene. A single value moves the
 * camera, so scrolling writes one transform per frame. No WebGL.
 *
 * ALL DEPTHS ARE IN vmin
 * The arch width and the perspective origin are viewport percentages, so the
 * same camera path frames the same shot at every size. PERSPECTIVE mirrors
 * .world-stage in globals.css.
 *
 * WHY THE FOCAL POINT LANDS ON THE VANISHING POINT
 * With object-position equal to the perspective origin, that point of the plate
 * sits at that point of the frame at any aspect ratio, so the figure stays
 * pinned to the vanishing point while the plate grows. --world-arch-drop puts
 * the floor's far edge at the figure's feet for the same reason.
 *
 * WHY THE LAST ARCH FADES
 * On desktop the vanishing point is off-centre, so its left wall would need a
 * far longer flight to leave the frame. That wall dissolves into the plate's own
 * black rock, where the fade is invisible.
 *
 * WHY THE ARCHES WIDEN WITH DEPTH
 * Perspective alone makes the far arch a slit around the figure. Widening each
 * arch keeps sky and ruin either side of them, and still nests when projected.
 */

const PERSPECTIVE = 100;
const PLATE_DEPTH = 196;
const ARCH_THICKNESS = 14;
/** Once a plane is this close it fills the lens, so stop drawing it. */
const NEAR_CLIP = 8;

const ARCHES = [
  { depth: 0, widen: 1, wall: "var(--world-wall-near)", haze: "transparent" },
  { depth: 72, widen: 1.3, wall: "var(--world-wall-mid)", haze: "var(--world-haze-mid)" },
  { depth: 144, widen: 1.6, wall: "var(--world-wall-far)", haze: "var(--world-haze-far)" },
] as const;

const HEADLINE = ["A WORLD", "BEYOND THE", "ORDINARY."] as const;

const PLATE_SRC = "/brand/section-02-world-introduction.png";
/** The plate fills the frame's height below 16:9, so it is far wider than 100vw. */
const PLATE_SIZES = "(max-aspect-ratio: 16/9) 178vh, 100vw";
const PLATE_ALT =
  "A lone figure in black MR.KCRONUS clothing, wearing a print of a stone head on their back, stands among ruined classical arches and scattered rubble, beneath a large cracked stone head, against a breaking sky.";

function ArchPlane({
  depth,
  camera,
  opacity,
  className,
  widen,
  wall,
  haze,
}: {
  depth: number;
  camera: MotionValue<number>;
  opacity?: MotionValue<number>;
  className: string;
  widen: number;
  wall?: string;
  haze?: string;
}) {
  const visibility = useTransform(camera, (c) =>
    c > depth + PERSPECTIVE - NEAR_CLIP ? "hidden" : "visible",
  );
  return (
    <motion.div
      className={className}
      style={{
        transform: `translateZ(${-depth}vmin)`,
        visibility,
        opacity,
        ...({
          "--world-arch-widen": widen,
          "--world-wall": wall,
          "--world-haze": haze,
        } as object),
      }}
    />
  );
}

function HeadlineLine({
  text,
  progress,
  range,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const y = useTransform(progress, range, ["105%", "0%"]);
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span className="block" style={{ y }}>
        {text}
      </motion.span>{" "}
    </span>
  );
}

export default function TheWorld() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const camera = useTransform(
    progress,
    [0, 0.62, 1],
    [0, PLATE_DEPTH, PLATE_DEPTH + 5],
  );
  const cameraTransform = useMotionTemplate`translateZ(${camera}vmin)`;

  const lastArchOpacity = useTransform(
    camera,
    [PLATE_DEPTH - 28, PLATE_DEPTH - 2],
    [1, 0],
  );
  const floorOpacity = useTransform(
    camera,
    [PLATE_DEPTH - 22, PLATE_DEPTH - 2],
    [1, 0],
  );
  const vignetteOpacity = useTransform(
    camera,
    [PLATE_DEPTH - 40, PLATE_DEPTH],
    [1, 0],
  );
  const inscriptionOpacity = useTransform(camera, [10, 36], [1, 0]);

  // Resolves to nothing from lg up, where --world-pan is 0.
  const pan = useTransform(progress, [0.7, 1], [0, 1]);
  const plateTransform = useMotionTemplate`translateX(calc(var(--world-pan) * ${pan}))`;

  const scrimOpacity = useTransform(progress, [0.52, 0.72], [0, 1]);
  const sentenceOpacity = useTransform(progress, [0.76, 0.88], [0, 1]);
  const sentenceY = useTransform(progress, [0.76, 0.88], [18, 0]);

  return (
    <>
      {/* Reduced motion and no script: the whole composition, standing still. */}
      <noscript>
        <style>{"#the-world{display:none}#the-world-static{display:block}"}</style>
      </noscript>
      <Section
        id="the-world-static"
        surface="dark"
        labelledBy="the-world-heading-static"
        className="motion-preference-reduced overflow-hidden"
      >
        <div className="relative flex min-h-[70svh] items-end overflow-hidden md:min-h-[64svh] md:items-center lg:min-h-[88svh]">
          <Image
            src={PLATE_SRC}
            alt={PLATE_ALT}
            fill
            sizes={PLATE_SIZES}
            className="object-cover object-[62%_38%] md:object-[62%_50%] lg:object-[68%_50%]"
          />
          <div aria-hidden="true" className="world-scrim absolute inset-0" />
          <div className="relative z-10 mx-auto w-full max-w-[104rem] px-5 pb-10 md:px-10 md:py-0 lg:px-14">
            <Reveal pattern="rise" className="max-w-[48rem]">
              <h2 id="the-world-heading-static" className="title-statement">
                {HEADLINE.join(" ")}
              </h2>
              <p className="prose-archive mt-7" style={{ maxWidth: "34ch" }}>
                A world built through symbols, architecture and form.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section
        id="the-world"
        surface="dark"
        labelledBy="the-world-heading"
        className="motion-preference-full"
      >
        <div ref={track} className="relative h-[240vh] lg:h-[260vh]">
          <div className="world-stage sticky top-0 h-svh overflow-hidden bg-obsidian">
            <motion.div
              className="absolute inset-0"
              style={{ transform: cameraTransform, transformStyle: "preserve-3d" }}
            >
              {/* The plate, furthest away. Its alt text is the scene's only
                  description, because the planes around it are decorative. */}
              <div
                className="absolute inset-0"
                style={{ transform: `translateZ(${-PLATE_DEPTH}vmin)` }}
              >
                <motion.div
                  className="world-plate-box"
                  style={{ transform: plateTransform }}
                >
                  <Image
                    src={PLATE_SRC}
                    alt={PLATE_ALT}
                    fill
                    sizes={PLATE_SIZES}
                    className="world-plate object-cover"
                  />
                  <motion.div
                    aria-hidden="true"
                    className="world-plate-edge absolute inset-0"
                    style={{ opacity: vignetteOpacity }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="world-reflection"
                    style={{ opacity: floorOpacity }}
                  >
                    <Image
                      src={PLATE_SRC}
                      alt=""
                      fill
                      sizes={PLATE_SIZES}
                      className="world-plate object-cover"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                aria-hidden="true"
                className="world-floor"
                style={{
                  transform: `translateZ(${-PLATE_DEPTH}vmin) rotateX(90deg)`,
                  height: `${PLATE_DEPTH + PERSPECTIVE}vmin`,
                  opacity: floorOpacity,
                }}
              />

              {ARCHES.map(({ depth, widen, wall, haze }, index) => {
                const isLast = index === ARCHES.length - 1;
                return (
                  <div key={depth} aria-hidden="true" className="contents">
                    <ArchPlane
                      depth={depth + ARCH_THICKNESS}
                      camera={camera}
                      opacity={isLast ? lastArchOpacity : undefined}
                      className="world-arch world-arch--reveal"
                      widen={widen}
                    />
                    <ArchPlane
                      depth={depth}
                      camera={camera}
                      opacity={isLast ? lastArchOpacity : undefined}
                      className="world-arch"
                      widen={widen}
                      wall={wall}
                      haze={haze}
                    />
                  </div>
                );
              })}

              {/* The inscription is cut into the first wall, so the camera
                  carries it past rather than a timeline fading it in place. */}
              <motion.p
                className="world-inscription"
                style={{
                  transform: "translateZ(0.2vmin)",
                  opacity: inscriptionOpacity,
                }}
              >
                Enter the Chronicle
              </motion.p>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="world-scrim absolute inset-0"
              style={{ opacity: scrimOpacity }}
            />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-[104rem] items-end px-5 pb-12 md:px-10 lg:items-center lg:px-14 lg:pb-0">
              <div className="max-w-[48rem]">
                <h2 id="the-world-heading" className="title-statement">
                  <HeadlineLine
                    text={HEADLINE[0]}
                    progress={progress}
                    range={[0.56, 0.7]}
                  />
                  <HeadlineLine
                    text={HEADLINE[1]}
                    progress={progress}
                    range={[0.6, 0.74]}
                  />
                  <HeadlineLine
                    text={HEADLINE[2]}
                    progress={progress}
                    range={[0.64, 0.78]}
                  />
                </h2>
                <motion.p
                  className="prose-archive mt-7"
                  style={{
                    maxWidth: "34ch",
                    opacity: sentenceOpacity,
                    y: sentenceY,
                  }}
                >
                  A world built through symbols, architecture and form.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
