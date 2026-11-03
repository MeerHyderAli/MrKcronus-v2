"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * THE CHRONICLE — SIX PERSPECTIVES. ONE TRUTH.
 *
 * Added 2026-11-03 at client instruction, from their reference and their image.
 * It replaces the colonnade, which is preserved as TheWorld.tsx. It keeps the id
 * "the-world" because that is where the Hero's action leads.
 *
 * THE GOLD RUNS DOWN THE CRACK
 * The head arrives with its cracks dark. As the reader scrolls, the light travels
 * down them from the brow to the collar. Base and cracks are the supplied image
 * split in two by scripts/prepare-hero-art.mjs, so the finished frame is the
 * picture the client supplied, and the ring is lit from the start.
 *
 * Not pinned. The words and the action are readable at every point of the reveal.
 */

const IMAGE_SIZES = "(min-width: 64rem) 104vw, 215vw";
const ALT =
  "A cracked marble head with curled hair looks up and to the left. Gold light runs through a crack from the brow down the neck, in front of the burning rim of an eclipse.";

export default function Chronicle() {
  const art = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: art,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(progress, [0, 0.58], [1.09, 1]);
  const y = useTransform(progress, [0, 1], ["3%", "-3%"]);
  // The crack spans 11% to 91% of the image's height.
  const unlit = useTransform(progress, [0.3, 0.62], [89, 8]);
  const lit = useMotionTemplate`inset(0 0 ${unlit}% 0)`;

  return (
    <Section id="the-world" surface="dark" labelledBy="chronicle-heading" className="chronicle">
      <div className="chronicle-words">
        <Reveal pattern="rise">
          <p className="meta meta-stone chronicle-eyebrow">A wearable universe</p>
          <h2 id="chronicle-heading" className="chronicle-title">
            <span>Six</span> <span>Perspectives.</span> <span className="chronicle-title-end">One truth.</span>
          </h2>
          <p className="chronicle-body">
            A clothing archive inspired by characters, conflict and the unseen architecture of time.
          </p>
          <Link href="#collection" className="cta-line">
            Explore the Collection
            <svg aria-hidden="true" viewBox="0 0 34 10" className="cta-arrow">
              <path d="M0 5h33M28 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </Reveal>
      </div>

      <div ref={art} className="chronicle-art">
        <motion.div className="chronicle-head" style={{ scale, y }}>
          <Image
            src="/brand/hero/chronicle-base.jpg"
            alt={ALT}
            fill
            sizes={IMAGE_SIZES}
            className="chronicle-img"
          />
          <motion.div className="chronicle-cracks" style={{ clipPath: lit }}>
            <Image
              src="/brand/hero/chronicle-cracks.jpg"
              alt=""
              fill
              sizes={IMAGE_SIZES}
              className="chronicle-img"
            />
          </motion.div>
        </motion.div>
        <div aria-hidden="true" className="chronicle-shade" />
      </div>
    </Section>
  );
}
