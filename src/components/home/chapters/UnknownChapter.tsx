import { getArchivePlate } from "@/components/archive/archiveData";
import { ChapterMeta, LitPlate } from "@/components/home/chapters/chapterParts";

/**
 * CHAPTER 8 / THE UNKNOWN  -  STILLNESS, RESOLUTION
 *
 * The final narrative chapter, and the one that has to let go.
 *
 * It is the darkest plate in the entire corpus - measured median luminance 6,
 * the lowest of the eight - so it carries the highest lightPeak of the set at
 * 0.22, placed as ambient space around the plate rather than as a wash over it.
 * Without that, this is the chapter most likely to render as a black rectangle.
 *
 * Composed to resolve rather than announce: artwork left, metadata right,
 * generous negative space, and no motion of any kind. There is no reveal, no
 * parallax, no scale and no dramatic transition after it - the sequence steps
 * down from the Enemy chapter into this and then straight into Featured
 * Products.
 *
 * NO MOTION, DELIBERATELY, CONFIRMED IN BUILD 11C
 * Six of the nine chapters were given fluid scroll motion in Build 11C. This
 * one was explicitly held back. The Unknown is the stillness that closes the
 * narrative, and it is the hand-off into commerce: if it were travelling, the
 * page would never actually come to rest before asking the visitor to look at
 * products. It uses the static LitPlate for a fixed ambient field.
 *
 * No Unknown lore. Server component.
 *
 * SIZE: 560px from lg up, giving a 700px plate and a chapter near 106svh.
 * The plate leads in the DOM so mobile shows artwork before metadata.
 */
export default function UnknownChapter() {
  const plate = getArchivePlate("the-unknown");

  return (
    <section
      aria-labelledby="chapter-unknown-heading"
      data-surface="ivory"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-16 md:px-10 md:py-16 lg:px-14 lg:py-24"
    >
      <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8">
        <LitPlate
          plate={plate}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 560px"
          poolClassName="h-[94%] w-[94%]"
          poolPeak={null}
          className="w-full lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:w-[560px]"
        />
        <ChapterMeta
          name={plate.name}
          headingId="chapter-unknown-heading"
          className="lg:col-span-3 lg:col-start-10 lg:row-start-1"
        />
      </div>
    </section>
  );
}