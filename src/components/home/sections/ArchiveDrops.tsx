"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "motion/react";
import Symbol from "@/components/brand/Symbol";
import { COLLECTION, getColourwayImage } from "@/components/collection/collectionData";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * THE ARCHIVE — DROPS BY CATEGORY
 *
 * Revised at client instruction: the plates and mythology moved to /story, and the
 * Archive is now the house's drops, one per category. Each drop is a door. An open
 * drop swings open onto what it holds. A locked one stays shut, sealed with the mark,
 * and only gives slightly on its hinge when pressed.
 *
 * Rendered on the homepage and at /archive, which is why the heading level is a prop.
 *
 * A LOCKED DROP SHOWS NOTHING BEHIND ITS DOOR
 * No imagery exists for the locked categories and none may be faked. It has no link,
 * date or promise either, because nothing yet stands behind it. To open a drop, give
 * it an `open` entry below, with a real image and destination.
 *
 * NOT ECOMMERCE
 * An open door leads to the Collection on the homepage. No prices, stock or cart.
 *
 * THE DOOR OPENS ON A CSS TRANSITION
 * Not on scroll position, because /archive starts with the doors already on screen.
 * The global reduced-motion rules therefore open it at once, and a <noscript> style
 * leaves it open without JavaScript.
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

export default function ArchiveDrops({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  const doors = useRef<HTMLUListElement>(null);
  const reached = useInView(doors, { once: true, amount: 0.35 });

  return (
    <Section id="archive" surface="dark" labelledBy="archive-heading" className="py-24 md:py-32">
      <noscript>
        <style>{".drop-leaf--open{transform:rotateY(86deg)}"}</style>
      </noscript>
      <div className="mx-auto w-full max-w-[104rem] px-5 md:px-10 lg:px-14">
        <Reveal pattern="rise">
          <Heading id="archive-heading" className="title-statement">
            The Archive
          </Heading>
          <p className="prose-archive mt-6">{statusLine(DROPS)}</p>
        </Reveal>

        <ul ref={doors} className="drops mt-14 lg:mt-20">
          {DROPS.map(({ slug, name, open }) =>
            open ? (
              <li key={slug} className="drop drop--open">
                <Link href={open.href} className="block">
                  <span className="drop-door">
                    <Image
                      src={open.image.src}
                      alt={open.image.alt}
                      fill
                      sizes="(min-width: 64rem) 50vw, 100vw"
                      className="drop-interior object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className={`drop-leaf drop-leaf--open${reached ? " is-open" : ""}`}
                    >
                      <Symbol height="34%" className="drop-seal" />
                    </span>
                  </span>
                  <span className="drop-name">{name}</span>
                  <span className="drop-status">Unlocked</span>
                  <span className="drop-status">{open.note}</span>
                </Link>
              </li>
            ) : (
              <li key={slug} className="drop">
                <span className="drop-door">
                  <span aria-hidden="true" className="drop-leaf">
                    <Symbol height="34%" className="drop-seal" />
                  </span>
                </span>
                <span className="drop-name">{name}</span>
                <span className="drop-status">Locked</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </Section>
  );
}
