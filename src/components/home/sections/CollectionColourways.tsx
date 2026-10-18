"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  getDesignColourways,
  type HouseColour,
} from "@/components/collection/collectionData";

/**
 * COLOURWAY SELECTOR
 *
 * Names the colour a visitor is looking at. That is the whole job.
 *
 * WHAT THIS IS NOT
 *
 * It is not a purchase control. There is no price, no discount, no availability,
 * no stock state, no cart, no checkout and no order outcome, and none may be
 * added here without a separately approved ecommerce phase. The controls are
 * plain buttons: they are NOT links, they lead nowhere, and nothing about them
 * implies a destination.
 *
 * THE IMAGE NEVER CHANGES
 *
 * No per-colourway production asset exists. The colourway PDFs are composite
 * marketing sheets and are never cropped into production files, exactly as
 * collection-board.png is never cropped. So the board cell shown beside these
 * controls is NOT a photograph of the selected colour, and nothing here may
 * imply that it is. The controls name a colour; they do not render a garment.
 *
 * WHY A RADIO GROUP
 *
 * Five mutually exclusive options in a set, of which exactly one is chosen. That
 * is precisely what role="radio" describes, and it is what a screen reader will
 * announce correctly. Arrow keys move between options, as radios do everywhere
 * else on the platform. Roving tabindex keeps the whole group to one tab stop so
 * keyboard users are not made to walk five stops per design.
 *
 * SELECTION IS NEVER COMMUNICATED BY COLOUR ALONE
 *
 * The selected option carries a ring, a check glyph, a heavier ink weight and a
 * bolder label. A visitor who cannot distinguish the swatches still sees which
 * one is chosen. The chosen colour's name is also always rendered as text beside
 * the group.
 *
 * STATE IS LOCAL AND PER DESIGN
 *
 * Each design keeps its own selection, so moving between rows does not reset a
 * choice. There is no global store and no state-management dependency: this is a
 * disclosure pattern, the same shape MobileMenu already uses.
 *
 * SOURCE METADATA IS SECONDARY OR ABSENT
 *
 * The poetic name printed on a source sheet appears only where one was actually
 * verified, and always beneath the standardized name. The printed label appears
 * only where the sheet genuinely carries one. The Architect's unnumbered cover
 * therefore shows its source name with no number, and The Unknown shows neither,
 * because its sheets print neither.
 */

const DEFAULT_COLOUR: HouseColour = "black";

export default function CollectionColourways({ slug }: { slug: string }) {
  const variants = getDesignColourways(slug);
  const legendId = useId();
  const [selected, setSelected] = useState<HouseColour>(DEFAULT_COLOUR);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = variants.find((v) => v.colour === selected) ?? variants[0];
  const activeIndex = variants.findIndex((v) => v.colour === selected);

  /** Move focus to an option and make it the selection, as a radio group does. */
  const selectAt = (index: number) => {
    const next = variants[index];
    if (!next) return;
    setSelected(next.colour);
    refs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = variants.length - 1;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        selectAt(index === last ? 0 : index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        selectAt(index === 0 ? last : index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectAt(0);
        break;
      case "End":
        event.preventDefault();
        selectAt(last);
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-4 md:mt-5">
      {/*
        The visible label is the chosen colour's standardized name. It is plain
        text, so the choice is never communicated by the swatch alone, and it is
        the accessible name of the group.
      */}
      <p className="meta text-ink" id={legendId}>
        {active.name}
      </p>

      <div
        role="radiogroup"
        aria-labelledby={legendId}
        className="mt-3 flex flex-wrap items-center gap-2 md:gap-2.5"
      >
        {variants.map((variant, index) => {
          const isSelected = variant.colour === selected;
          return (
            <button
              key={variant.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${variant.name}${
                variant.sourceName ? `, ${variant.sourceName}` : ""
              }`}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setSelected(variant.colour)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`cw-swatch${isSelected ? " is-selected" : ""}`}
            >
              <span
                aria-hidden="true"
                className="cw-swatch__chip"
                data-colour={variant.colour}
              />
              {/*
                The colour name is NOT rendered inside the button. It is
                already stated once, in the group's label directly above, and
                repeating it in all five buttons made the widest swatch 237px,
                which forced the group to wrap to four rows at 320px. The
                accessible name is carried by aria-label on the button instead.
              */}
              {isSelected ? (
                <span aria-hidden="true" className="cw-swatch__check">
                  &#10003;
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/*
        Secondary provenance, only where the source genuinely provided it. This
        is metadata about a supplied document, not a commercial claim.
      */}
      {active.sourceName ? (
        <p className="meta meta-stone mt-3">
          {active.sourceName}
          {active.sourceLabel ? ` \u00b7 ${active.sourceLabel}` : ""}
        </p>
      ) : null}
    </div>
  );
}