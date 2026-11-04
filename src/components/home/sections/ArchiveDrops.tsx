"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "motion/react";
import { COLLECTION, getColourwayImage } from "@/components/collection/collectionData";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * THE ARCHIVE — DROPS BY CATEGORY
 *
 * Revised at client instruction: the plates and mythology moved to /story, and the
 * Archive is now the house's drops, one per category.
 *
 * Rendered on the homepage and at /archive, which is why the heading level is a prop.
 *
 * AN OPEN DROP PARTS ON A SLIT OF LIGHT
 * Revised 2026-11-04: it replaces a door swinging on its hinge. A line of light runs
 * down the dark arch, then parts on what the drop holds. It plays on a CSS animation
 * when the door is in view, not on scroll position, because /archive starts with the
 * doors already on screen. Reduced motion and a <noscript> style show it open at once.
 *
 * A LOCKED DROP IS SEEN THROUGH A VEIL
 * Revised 2026-11-04: a blurred image of the category under a lock, from
 * scripts/prepare-drop-art.mjs. The current images are stand-ins that show what kind of
 * thing is coming and no particular design. It has no link, date or promise, because
 * nothing yet stands behind it. To open a drop, give it an `open` entry below, with a
 * real image and destination.
 *
 * NOT ECOMMERCE
 * An open door leads to the Collection on the homepage. No prices, stock or cart.
 */

type Drop = {
  slug: string;
  name: string;
  open?: { href: string; image: { src: string; alt: string }; note: string };
};

const DROPS: readonly Drop[] = [
  {
    slug: "tees",
    name: "Tees",
    open: {
      href: "/#collection",
      image: {
        src: getColourwayImage("architect", "black").src,
        alt: "The Architect tee in Black, front and back.",
      },
      note: `Drop 1. ${COLLECTION.length} designs.`,
    },
  },
  { slug: "joggers", name: "Joggers" },
  { slug: "shirts", name: "Shirts" },
  { slug: "sunglasses", name: "Sunglasses" },
];

function statusLine(drops: readonly Drop[]) {
  const open = drops.filter((drop) => drop.open).length;
  return open === 1
    ? "One drop is open. The rest are locked."
    : `${open} drops are open. The rest are locked.`;
}

function OpenDrop({ name, open }: { name: string; open: NonNullable<Drop["open"]> }) {
  const door = useRef<HTMLSpanElement>(null);
  const reached = useInView(door, { once: true, amount: 0.6 });

  return (
    <li className="drop drop--open">
      <Link href={open.href} className="block">
        <span ref={door} className={`drop-door${reached ? " is-open" : ""}`}>
          <span className="drop-opening">
            <Image
              src={open.image.src}
              alt={open.image.alt}
              fill
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="drop-interior object-cover"
            />
          </span>
          <span aria-hidden="true" className="drop-edge drop-edge--left" />
          <span aria-hidden="true" className="drop-edge drop-edge--right" />
        </span>
        <span className="drop-name">{name}</span>
        <span className="drop-status">Unlocked</span>
        <span className="drop-status">{open.note}</span>
      </Link>
    </li>
  );
}

function LockedDrop({ slug, name }: { slug: string; name: string }) {
  return (
    <li className="drop drop--locked">
      <span className="drop-door">
        <Image
          src={`/brand/drops/${slug}.jpg`}
          alt=""
          fill
          sizes="(min-width: 64rem) 17vw, 30vw"
          className="drop-veiled object-cover"
        />
        <svg aria-hidden="true" viewBox="0 0 28 36" className="drop-lock">
          <path className="drop-lock-shackle" d="M7 15v-5a7 7 0 0 1 14 0v5" />
          <rect className="drop-lock-body" x="2.5" y="15" width="23" height="19" rx="1.5" />
          <path d="M14 22.5v5" />
        </svg>
      </span>
      <span className="drop-name">{name}</span>
      <span className="drop-status">Locked</span>
    </li>
  );
}

export default function ArchiveDrops({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <Section id="archive" surface="dark" labelledBy="archive-heading" className="py-24 md:py-32">
      <noscript>
        <style>{".drop-opening{clip-path:none}.drop-opening::after{opacity:0}"}</style>
      </noscript>
      <div className="mx-auto w-full max-w-[104rem] px-5 md:px-10 lg:px-14">
        <Reveal pattern="rise">
          <Heading id="archive-heading" className="title-statement">
            The Archive
          </Heading>
          <p className="prose-archive mt-6">{statusLine(DROPS)}</p>
        </Reveal>

        <ul className="drops mt-14 lg:mt-20">
          {DROPS.map(({ slug, name, open }) =>
            open ? (
              <OpenDrop key={slug} name={name} open={open} />
            ) : (
              <LockedDrop key={slug} slug={slug} name={name} />
            ),
          )}
        </ul>
      </div>
    </Section>
  );
}
