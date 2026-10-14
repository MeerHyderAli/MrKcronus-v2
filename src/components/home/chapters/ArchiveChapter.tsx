import ArchivePlate from "@/components/archive/ArchivePlate";
import { getArchivePlate } from "@/components/archive/archiveData";
import { ChapterMeta } from "@/components/home/chapters/chapterParts";
import ChapterMotion from "@/components/home/chapters/ChapterMotion";

/**
 * CHAPTER 1 / THE ARCHIVE  -  THRESHOLD
 *
 * The opening narrative chapter after the Hero. It establishes that the archive
 * has entered and the sequence has begun, without competing with the Hero for
 * scale.
 *
 * Composition: a large plate held near-centred, with the filing metadata
 * reduced to a single small line above it. The negative space either side is
 * the point - this is a threshold, not a climax.
 *
 * MOTION (Build 11C) - fluid
 * The opening move of the sequence, so it gets the largest travel in the set:
 * the plate crosses 110px while the metadata counter-travels 30px the other
 * way. It arrives as one object and separates into two as it passes. The light
 * field travels at 0.4x so it stays with the plate.
 *
 * The plate is supplied as a bare ArchivePlate rather than LitPlate, because
 * ChapterMotion now owns the travelling light field. Using both would stack two
 * light fields.
 *
 * SIZE
 * The plate is capped at 600px wide from lg up rather than filling its grid
 * column; uncapped it ran to 862px and the chapter reached 153svh, well past
 * the 80-110svh budget. Below lg it fills the column at 92vw.
 *
 * ORDER
 * The plate leads in the DOM so mobile shows artwork before the heading. Both
 * children carry an explicit lg:row-start-1 - without it the sparse grid
 * placement algorithm advances past the plate and drops the metadata into a
 * second row underneath it.
 *
 * No level number. Server component; the motion lives in the shared wrapper.
 */
export default function ArchiveChapter() {
  const plate = getArchivePlate("the-archive");

  return (
    <section
      aria-labelledby="chapter-archive-heading"
      data-surface="ivory"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <div className="border-b border-[--surface-rule] pb-4">
        <p className="meta meta-stone">Archive</p>
      </div>

      <ChapterMotion
        parallax={110}
        counter={-30}
        scaleFrom={0.95}
        poolPeak={null}
        gridClassName="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8"
        plateClassName="w-full lg:col-span-8 lg:col-start-3 lg:row-start-1 lg:w-[600px]"
        metaClassName="lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-end lg:pb-2"
        plate={
          <ArchivePlate
            plate={plate}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 600px"
          />
        }
        meta={
          <ChapterMeta name={plate.name} headingId="chapter-archive-heading" />
        }
      />
    </section>
  );
}