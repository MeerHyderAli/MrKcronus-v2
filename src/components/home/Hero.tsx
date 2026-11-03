"use client";

import Link from "next/link";
import { getImageProps } from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Wordmark from "@/components/brand/Wordmark";

/**
 * HERO — THE ECLIPSE
 *
 * Added 2026-11-03 at client instruction, from their reference and their image.
 * It replaces the particle Threshold, which is preserved as ThresholdHero.tsx.
 *
 * The first screen is complete without scrolling: the mark, the line and the one
 * action. It is not pinned. Scrolling walks the camera toward the slit of light.
 *
 * ONE ENTRANCE, IN CSS
 * The scene starts in the dark, the door lights first and the world resolves after
 * it. It runs from globals.css, so it needs no script and cannot hide content.
 *
 * THE IMAGE IS ONE FLAT PICTURE
 * The light layer is that picture's own brightest pixels on black, from
 * scripts/prepare-hero-art.mjs. Nothing is cut out of it, so nothing separates.
 *
 * THE CRESCENT IS THE ARTWORK'S
 * The crescent on the monolith and the ring on the cloak are part of the supplied
 * image. They are not the logo. The wordmark here is the canonical one.
 */

const ALT =
  "A cloaked figure, seen from behind, stands on wet black stone before a split monolith. A slit of light runs down its centre under a crescent, in front of a vast dark planet and ruined towers.";

/** Below this shape the screen shows the tall slice around the figure. */
const PHONE = "(max-aspect-ratio: 2/3)";
const SIZES_PHONE = "67vh";
const SIZES_WIDE = "max(113vw, 188vh)";

function Art({
  wide,
  phone,
  alt,
  className,
  first = false,
}: {
  wide: { src: string; width: number; height: number };
  phone: { src: string; width: number; height: number };
  alt: string;
  className: string;
  first?: boolean;
}) {
  const {
    props: { srcSet: phoneSet },
  } = getImageProps({ ...phone, alt, sizes: SIZES_PHONE });
  const {
    props: { srcSet: wideSet, ...rest },
  } = getImageProps({ ...wide, alt, sizes: SIZES_WIDE });
  return (
    <picture>
      <source media={PHONE} srcSet={phoneSet} sizes={SIZES_PHONE} />
      <source srcSet={wideSet} sizes={SIZES_WIDE} />
      <img
        {...rest}
        alt={alt}
        className={className}
        loading={first ? "eager" : "lazy"}
        fetchPriority={first ? "high" : "low"}
      />
    </picture>
  );
}

const BASE = {
  wide: { src: "/brand/hero/hero-wide.jpg", width: 1920, height: 819 },
  phone: { src: "/brand/hero/hero-phone.jpg", width: 1700, height: 2048 },
};
const LIGHT = {
  wide: { src: "/brand/hero/hero-light-wide.jpg", width: 1280, height: 546 },
  phone: { src: "/brand/hero/hero-light-phone.jpg", width: 850, height: 1024 },
};

export default function Hero() {
  const stage = useRef<HTMLElement>(null);
  // Measured from the page, not the section: the html scroll-padding shifts Motion's
  // native section timeline, and the first screen has to rest at exactly zero.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (y) => y / (stage.current?.offsetHeight || 1));

  const artScale = useTransform(progress, [0, 1], [1, 1.24]);
  const artY = useTransform(progress, [0, 1], ["0%", "9%"]);
  const lightOpacity = useTransform(progress, [0.05, 0.7], [0, 0.85]);
  const wordsY = useTransform(progress, [0, 0.6], ["0%", "-34%"]);
  const wordsOpacity = useTransform(progress, [0.04, 0.42], [1, 0]);
  const actionOpacity = useTransform(progress, [0, 0.16], [1, 0]);
  const exitOpacity = useTransform(progress, [0.5, 0.98], [0, 1]);

  return (
    <section
      ref={stage}
      id="hero"
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="hero"
    >
      <motion.div className="hero-art" style={{ scale: artScale, y: artY }}>
        <Art {...BASE} alt={ALT} className="hero-img" first />
        <div aria-hidden="true" className="hero-veil" />
        <Art {...LIGHT} alt="" className="hero-img hero-light hero-light--entrance" />
        <motion.div aria-hidden="true" className="hero-light-walk" style={{ opacity: lightOpacity }}>
          <Art {...LIGHT} alt="" className="hero-img hero-light" />
        </motion.div>
        <div aria-hidden="true" className="hero-shade" />
      </motion.div>

      <motion.div className="hero-words" style={{ y: wordsY, opacity: wordsOpacity }}>
        <h1 id="hero-heading" className="hero-mark">
          <span className="sr-only">MR.KCRONUS</span>
          <Wordmark width="100%" style={{ maxWidth: "none" }} />
        </h1>
        <p className="hero-line">
          <span>Time forgets.</span> <span>The archive does not.</span>
        </p>
      </motion.div>

      <motion.div className="hero-action" style={{ opacity: actionOpacity }}>
        <Link href="#the-world" className="cta-outline hero-cta">
          Enter the World
          <svg aria-hidden="true" viewBox="0 0 34 10" className="cta-arrow">
            <path d="M0 5h33M28 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Link>
        <div aria-hidden="true" className="hero-scroll">
          <span className="scroll-hint-line" />
          <span className="meta meta-stone">Scroll</span>
        </div>
      </motion.div>

      <motion.div aria-hidden="true" className="hero-exit" style={{ opacity: exitOpacity }} />
    </section>
  );
}
