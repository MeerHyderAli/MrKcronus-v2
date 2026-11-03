"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  COLLECTION,
  getColourway,
  getColourwayImage,
  getDesignColourways,
  type CollectionDesign,
  type HouseColour,
} from "@/components/collection/collectionData";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * THE COLLECTION
 *
 * Drop 1, shown as clothing. Every design comes in the same five house colours,
 * so there is one colour control rather than six: choose a colour and all six
 * garments change, and the room takes that colour with them.
 *
 * WHY IT OPENS ON STONE BEIGE
 * Its room is the same --surface-ivory the Gateway lands on, so the crossing still
 * hands over without a seam. It also follows three dark sections and a run of black
 * garments, so the first thing the visitor learns here is that there are colours.
 *
 * THE IMAGES ARE PER COLOUR
 * Each one is cut from the matching colourway sheet by scripts/crop-colourways.mjs,
 * at the client's instruction. See AGENTS.md, Colourway Canon.
 *
 * PHONES SWIPE
 * An image holds both views, so fitting it to a phone's width leaves each garment
 * too small to read. There it runs wider than the screen: the front first, the back
 * showing at the edge, a native swipe to reach it. The alt text describes both.
 *
 * ONLY WHAT IS NEEDED LOADS
 * One image per design until the visitor reaches for the control. Then the other
 * colours come in behind it, so a change has something to fade to.
 *
 * NOT ECOMMERCE
 * Choosing a colour names a colour. No prices, sizes, stock or links.
 */

const OPENING_COLOUR: HouseColour = "stone-beige";
const COLOURS = getDesignColourways(COLLECTION[0].slug);
const IMAGE_SIZES = "(min-width: 64rem) 75vw, (min-width: 48rem) 100vw, 185vw";

function ColourControl({
  colour,
  onChange,
  onReach,
}: {
  colour: HouseColour;
  onChange: (colour: HouseColour) => void;
  onReach: () => void;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = COLOURS.findIndex((option) => option.colour === colour);

  const selectAt = (index: number) => {
    onChange(COLOURS[index].colour);
    buttons.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = COLOURS.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectAt(next);
  };

  return (
    <div className="collection-bar">
      <div className="mx-auto flex w-full max-w-[104rem] items-center justify-between gap-4 px-5 md:px-10 lg:px-14">
        {/* The name in words, so a choice is never carried by the chip alone. */}
        <p className="collection-active">{COLOURS[activeIndex].name}</p>
        <div
          role="radiogroup"
          aria-label="Colour"
          className="flex items-center"
          onPointerEnter={onReach}
          onTouchStart={onReach}
          onFocus={onReach}
        >
          {COLOURS.map((option, index) => (
            <button
              key={option.colour}
              ref={(element) => {
                buttons.current[index] = element;
              }}
              type="button"
              role="radio"
              aria-checked={option.colour === colour}
              aria-label={option.name}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => onChange(option.colour)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="collection-swatch"
            >
              <span aria-hidden="true" className="cw-swatch__chip" data-colour={option.colour} />
              <span aria-hidden="true" className="collection-swatch-name">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Design({
  design,
  index,
  colour,
  reached,
}: {
  design: CollectionDesign;
  index: number;
  colour: HouseColour;
  reached: boolean;
}) {
  const variant = getColourway(design.slug, colour);
  const { front, back } = design.artwork;
  const { width, height } = design.stage;

  return (
    <li className="collection-item" data-side={index % 2 ? "right" : "left"}>
      <div className="collection-frame">
        <div className="collection-stage" style={{ aspectRatio: `${width} / ${height}` }}>
          <Reveal pattern="settle" scaleFrom={0.04} className="absolute inset-0">
          {COLOURS.filter((option) => reached || option.colour === colour).map((option) => {
            const active = option.colour === colour;
            return (
              <Image
                key={option.colour}
                src={getColourwayImage(design.slug, option.colour).src}
                alt={
                  active
                    ? `${design.name} in ${option.name}, front and back. Front: ${front}. Back: ${back}.`
                    : ""
                }
                fill
                sizes={IMAGE_SIZES}
                className={`collection-layer object-cover${active ? " is-active" : ""}`}
              />
            );
          })}
          </Reveal>
        </div>
      </div>

      <Reveal pattern="rise" className="collection-caption">
        <h3 className="collection-name">{design.name}</h3>
        <p className="meta meta-stone mt-3">{design.code}</p>
        <p className="mt-6 font-medium">{variant.name}</p>
        {variant.sourceName ? (
          <p className="meta meta-stone mt-2">{variant.sourceName}</p>
        ) : null}
        <p className="collection-note mt-6">
          Front: {front}.
          <br />
          Back: {back}.
        </p>
      </Reveal>
    </li>
  );
}

export default function TheCollection() {
  const [colour, setColour] = useState<HouseColour>(OPENING_COLOUR);
  const [reached, setReached] = useState(false);

  return (
    <Section id="collection" surface="ivory" labelledBy="collection-heading">
      <noscript>
        <style>{"#collection .collection-bar{display:none}"}</style>
      </noscript>
      <div className="collection" data-field={colour}>
        <header className="mx-auto w-full max-w-[104rem] px-5 pb-12 pt-24 md:px-10 lg:px-14 lg:pb-16 lg:pt-32">
          <Reveal pattern="rise">
            <h2 id="collection-heading" className="display-editorial">
              Drop 1. Six designs, five colours.
            </h2>
          </Reveal>
        </header>

        <ColourControl
          colour={colour}
          onChange={setColour}
          onReach={() => setReached(true)}
        />

        <ol className="mx-auto grid w-full max-w-[104rem] grid-cols-[minmax(0,1fr)] gap-20 px-5 pb-28 pt-12 md:px-10 lg:gap-32 lg:px-14 lg:pb-40 lg:pt-20">
          {COLLECTION.map((design, index) => (
            <Design
              key={design.slug}
              design={design}
              index={index}
              colour={colour}
              reached={reached}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}
