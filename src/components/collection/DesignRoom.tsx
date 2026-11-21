"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import ColourControl from "./ColourControl";
import {
  COLLECTION,
  getCollectionDesign,
  getColourway,
  getColourwayImage,
  getDesignColourways,
  type HouseColour,
} from "./collectionData";
import { getLevelOneRecord } from "./levelOneRecords";

/**
 * ONE DESIGN'S COLLECTION
 *
 * Added 2026-11-21 at client instruction: a Level 01 record opens its own design,
 * with the colour control and the room that takes the chosen colour. The homepage
 * no longer carries the Collection (TheCollection.tsx is preserved, unrendered).
 *
 * The record's artwork and the garment stay separate registers: the plate sits with
 * the story, the garment in its colour sits in the room.
 *
 * Opens on Stone Beige, as the homepage Collection did, so the first thing the
 * visitor learns is that there are colours. Only the shown image loads until the
 * visitor reaches for the control.
 *
 * NOT ECOMMERCE
 * Choosing a colour names a colour. No prices, sizes, stock or cart.
 */

const OPENING_COLOUR: HouseColour = "stone-beige";
/** A phone pane shows a little more than half the image, so each sleeve stays whole. */
const VIEW_SHARE = 0.56;
const IMAGE_SIZES = "(min-width: 64rem) 75vw, (min-width: 48rem) 100vw, 180vw";

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 34 10" className={`cta-arrow${back ? " cta-arrow--back" : ""}`}>
      <path d="M0 5h33M28 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function DesignRoom({ slug }: { slug: string }) {
  const design = getCollectionDesign(slug);
  const record = getLevelOneRecord(slug);
  const options = getDesignColourways(slug);
  const [colour, setColour] = useState<HouseColour>(OPENING_COLOUR);
  const [reached, setReached] = useState(false);

  const variant = getColourway(slug, colour);
  const { front, back } = design.artwork;
  const { width, height } = design.stage;
  const index = COLLECTION.findIndex((item) => item.slug === slug);
  const previous = COLLECTION[(index + COLLECTION.length - 1) % COLLECTION.length];
  const next = COLLECTION[(index + 1) % COLLECTION.length];

  return (
    <div className="collection design-room" data-surface="ivory" data-field={colour}>
      <noscript>
        <style>{".design-room .collection-bar{display:none}"}</style>
      </noscript>

      <div className="mx-auto w-full max-w-[104rem] px-5 pt-8 md:px-10 lg:px-14 lg:pt-12">
        <Link href="/#level-01" className="design-back">
          <Arrow back />
          Level 01
        </Link>
      </div>

      <header className="design-head mx-auto w-full max-w-[104rem] px-5 pb-12 pt-10 md:px-10 lg:px-14 lg:pb-16">
        <div>
          <p className="design-kicker">{record.kicker}</p>
          <h1 className="design-title">{design.name}</h1>
          <p className="meta meta-stone mt-4">
            Drop 1 · {design.code}
          </p>
          <p className="design-story">{record.story}</p>
        </div>
        <div className="design-plate">
          <Image
            src={record.image.src}
            alt={record.image.alt}
            fill
            priority
            sizes="(min-width: 64rem) 24rem, (min-width: 48rem) 40vw, 60vw"
            className="object-cover"
          />
        </div>
      </header>

      <ColourControl
        options={options}
        colour={colour}
        onChange={setColour}
        onReach={() => setReached(true)}
      />

      <section
        aria-label={`${design.name} in ${variant.name}`}
        className="mx-auto grid w-full max-w-[104rem] grid-cols-[minmax(0,1fr)] gap-8 px-5 pb-20 pt-10 md:px-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:items-end lg:gap-14 lg:px-14 lg:pb-28 lg:pt-16"
      >
        {/* Each image holds the front and the back side by side. A phone shows them one
            above the other, each pane framing its own half of the same file, so nothing
            has to be scrolled sideways. From md the whole image shows, as supplied. */}
        <div
          className="design-views"
          style={
            {
              "--view-ratio": `${width * VIEW_SHARE} / ${height}`,
              "--full-ratio": `${width} / ${height}`,
            } as CSSProperties
          }
        >
          {(["front", "back"] as const).map((side) => (
            <figure key={side} className={`design-view design-view--${side}`}>
              <div className="design-view-frame">
                {options
                  .filter((option) => reached || option.colour === colour)
                  .map((option) => {
                    const active = option.colour === colour;
                    return (
                      <Image
                        key={option.colour}
                        src={getColourwayImage(slug, option.colour).src}
                        alt={
                          active && side === "front"
                            ? `${design.name} in ${option.name}, front and back. Front: ${front}. Back: ${back}.`
                            : ""
                        }
                        fill
                        sizes={IMAGE_SIZES}
                        className={`collection-layer object-cover${active ? " is-active" : ""}`}
                      />
                    );
                  })}
              </div>
              <figcaption aria-hidden="true" className="design-view-label">
                {side === "front" ? "Front" : "Back"}
              </figcaption>
            </figure>
          ))}
        </div>

        <div aria-live="polite">
          <p className="collection-name">{variant.name}</p>
          {variant.sourceName ? <p className="meta meta-stone mt-2">{variant.sourceName}</p> : null}
          <p className="collection-note mt-6">
            Front: {front}.
            <br />
            Back: {back}.
          </p>
        </div>
      </section>

      <nav aria-label="Other records" className="design-pager mx-auto w-full max-w-[104rem] px-5 md:px-10 lg:px-14">
        <Link href={`/collection/${previous.slug}`} className="design-pager-link">
          <Arrow back />
          <span>{previous.name}</span>
        </Link>
        <Link href={`/collection/${next.slug}`} className="design-pager-link design-pager-link--next">
          <span>{next.name}</span>
          <Arrow />
        </Link>
      </nav>
    </div>
  );
}
