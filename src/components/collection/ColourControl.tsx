"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import type { ColourwayVariant, HouseColour } from "./collectionData";

/**
 * One colour control for a collection room: a sticky radio group whose chosen
 * colour the room takes on. Arrow keys move the choice, as a radio group should.
 * `onReach` fires on the first pointer, touch or focus, so the other colours can
 * start loading before they are chosen.
 */
export default function ColourControl({
  options,
  colour,
  onChange,
  onReach,
}: {
  options: readonly ColourwayVariant[];
  colour: HouseColour;
  onChange: (colour: HouseColour) => void;
  onReach: () => void;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = options.findIndex((option) => option.colour === colour);

  const selectAt = (index: number) => {
    onChange(options[index].colour);
    buttons.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
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
        <p className="collection-active">{options[activeIndex].name}</p>
        <div
          role="radiogroup"
          aria-label="Colour"
          className="flex items-center"
          onPointerEnter={onReach}
          onTouchStart={onReach}
          onFocus={onReach}
        >
          {options.map((option, index) => (
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
