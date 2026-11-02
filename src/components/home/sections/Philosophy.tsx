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
import Symbol from "@/components/brand/Symbol";
import Section from "./Section";

/**
 * THE CREED
 *
 * The approved words, acted out. STAND and APART. part until the first line runs
 * flush with the second. As LEAVE A MARK. lands, the mark opens in the dark wall
 * as a slit of light, from its vertical axis outward, and the hall brightens around
 * it. The type leaves first, so the mark is what is left.
 *
 * NOT PINNED
 * The Hero, The World and Level 01 own the page's three pinned tracks. Here the
 * stage only slows while it fills the frame: it drifts down inside a taller section,
 * so the camera feels weighted without the page ever stopping.
 *
 * THE PLATE AND THE MARK ARE UNTOUCHED
 * The campaign frame is not filtered or cut. The mark is the canonical symbol, placed
 * in plate coordinates so it stays on the same part of the wall at any crop. The
 * darkness the hall brightens from is a separate layer over the plate.
 *
 * WHY overflow-clip, NOT overflow-hidden
 * Motion drives scroll-linked opacity and clip-path from a browser scroll timeline.
 * overflow: hidden makes the section the timeline's scroller, and a section that never
 * scrolls freezes those values at the halfway point. overflow: clip does not.
 *
 * PHONES PAN
 * A portrait crop cannot hold the figure and the wall, so there the camera starts on
 * the figure and turns to the wall as the mark opens.
 */

const PLATE_SRC = "/brand/philosophy-campaign.png";
const PLATE_ALT =
  "A solitary hooded figure stands on the right inside a vast brutalist concrete hall, beneath a shaft of light; the left side recedes into deep shadow.";
/** Capped at the file's own width, so the optimiser is never asked to enlarge it. */
const PLATE_SIZES = "(max-aspect-ratio: 2/1) min(200vh, 1672px), min(100vw, 1672px)";

/** How far APART. travels. In ems, so the two lines end flush at any size. */
const PARTING = "0.53em";

function Word({
  text,
  progress,
  range,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const y = useTransform(progress, range, ["108%", "0%"]);
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      <motion.span className="inline-block" style={{ y }}>
        {text}
      </motion.span>
    </span>
  );
}

export default function Philosophy() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: track,
    offset: ["start end", "end start"],
  });

  const stageY = useTransform(progress, [0.4, 0.6], ["0svh", "42svh"]);

  const firstOpacity = useTransform(progress, [0.16, 0.26, 0.62, 0.74], [0, 1, 1, 0]);
  const firstY = useTransform(progress, [0.16, 0.3, 0.62, 0.8], ["3svh", "0svh", "0svh", "-10svh"]);
  const apartX = useTransform(progress, [0.28, 0.44], ["-0.12em", PARTING]);

  const pan = useTransform(progress, [0.38, 0.54], [0, 1]);
  const plateTransform = useMotionTemplate`translateX(calc(var(--creed-pan) * ${pan}))`;

  const shade = useTransform(progress, [0.4, 0.6], [0.55, 0]);
  const opening = useTransform(
    progress,
    [0.46, 0.58],
    ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"],
  );
  const light = useTransform(progress, [0.46, 0.6], [0, 0.6]);

  const floorLight = useTransform(progress, [0.46, 0.6], [0, 1]);

  const secondOpacity = useTransform(progress, [0.62, 0.74], [1, 0]);

  return (
    <>
      <noscript>
        <style>{"#philosophy{display:none}#philosophy-static{display:block}"}</style>
      </noscript>

      {/* Reduced motion and no script: the finished frame, standing still. */}
      <Section
        id="philosophy-static"
        surface="dark"
        labelledBy="philosophy-heading-static"
        className="motion-preference-reduced overflow-hidden"
      >
        <div className="creed-stage creed-stage--still">
          <div className="creed-plate creed-plate--still">
            <Image src={PLATE_SRC} alt={PLATE_ALT} fill sizes={PLATE_SIZES} className="object-cover" />
            <div aria-hidden="true" className="creed-floorlight" />
            <div className="creed-mark">
              <div aria-hidden="true" className="creed-mark-glow opacity-60">
                <Symbol height="100%" color="var(--gold)" />
              </div>
              <Symbol height="100%" decorative={false} label="The MR.KCRONUS symbol" />
            </div>
          </div>
          <div aria-hidden="true" className="creed-foot" />
          <h2 id="philosophy-heading-static" className="display-editorial creed-title">
            <span className="creed-line creed-line--first">
              STAND <span className="inline-block" style={{ transform: `translateX(${PARTING})` }}>APART.</span>
            </span>{" "}
            <span className="creed-line creed-line--second">LEAVE A MARK.</span>
          </h2>
        </div>
      </Section>

      <Section
        id="philosophy"
        surface="dark"
        labelledBy="philosophy-heading"
        className="motion-preference-full overflow-clip"
      >
        <div ref={track} className="relative h-[150svh]">
          <motion.div className="creed-stage" style={{ y: stageY }}>
            <motion.div className="creed-plate" style={{ transform: plateTransform }}>
              <Image src={PLATE_SRC} alt={PLATE_ALT} fill sizes={PLATE_SIZES} className="object-cover" />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-obsidian"
                style={{ opacity: shade }}
              />
              <motion.div aria-hidden="true" className="creed-floorlight" style={{ opacity: floorLight }} />
              <div className="creed-mark">
                <motion.div aria-hidden="true" className="creed-mark-glow" style={{ opacity: light }}>
                  <Symbol height="100%" color="var(--gold)" />
                </motion.div>
                <motion.div className="h-full" style={{ clipPath: opening }}>
                  <Symbol height="100%" decorative={false} label="The MR.KCRONUS symbol" />
                </motion.div>
              </div>
            </motion.div>
            <div aria-hidden="true" className="creed-foot" />

            <h2 id="philosophy-heading" className="display-editorial creed-title">
              <motion.span
                className="creed-line creed-line--first"
                style={{ opacity: firstOpacity, y: firstY }}
              >
                STAND{" "}
                <motion.span className="inline-block" style={{ x: apartX }}>
                  APART.
                </motion.span>
              </motion.span>{" "}
              <motion.span
                className="creed-line creed-line--second"
                style={{ opacity: secondOpacity }}
              >
                <Word text="LEAVE" progress={progress} range={[0.44, 0.5]} />{" "}
                <Word text="A" progress={progress} range={[0.46, 0.52]} />{" "}
                <Word text="MARK." progress={progress} range={[0.48, 0.55]} />
              </motion.span>
            </h2>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
