import ArchivePlate from "@/components/archive/ArchivePlate";
import { getArchivePlate } from "@/components/archive/archiveData";
import {
  ChapterEdgeLabel,
  ChapterMeta,
} from "@/components/home/chapters/chapterParts";
import ChapterMotion from "@/components/home/chapters/ChapterMotion";

/**
 * CHAPTER 6 / THE WAR  -  CONFLICT
 *
 * The edge-driven chapter. The plate is pushed hard to one side and given a
 * deliberately tighter frame than any other chapter, while the filing metadata
 * sits against the far opposite margin. The tension is the point: the eye is
 * pulled across a wide, empty middle.
 *
 * ON THE "TIGHTER FRAMING"
 * The tighter frame is achieved with layout - a narrower column than its
 * neighbours - not by cropping into the supplied file. The artwork is contained
 * whole inside its frame.
 *
 * MOTION (Build 11C) - fluid, the deepest in the set
 * Plate right, metadata left, and the widest separation of any chapter: the
 * plate crosses 130px while the metadata moves 38px the other way. Combined
 * with the empty middle, the two travel apart for the whole passage and the
 * composition opens up as you scroll through it. This is the chapter that most
 * needs to feel like movement.
 *
 * SIZE: 520px from lg up, giving a 650px plate and a chapter near 100svh. The
 * wider sizes entry at the mobile end keeps The War the largest plate in the
 * sequence on a phone.
 *
 * No War lore. Server component; motion lives in the shared wrapper.
 */
export default function WarChapter() {
  const plate = getArchivePlate("the-war");

  return (
    <section
      aria-labelledby="chapter-war-heading"
      data-surface="dark"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <ChapterEdgeLabel>Archive</ChapterEdgeLabel>

      <ChapterMotion
        parallax={130}
        counter={-38}
        scaleFrom={0.93}
        poolPeak={plate.lightPeak}
        poolClassName="h-[124%] w-[146%]"
        gridClassName="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8"
        /* Pushed right: columns 5-10, against the far margin. */
        plateClassName="w-full lg:col-span-6 lg:col-start-5 lg:row-start-1 lg:w-[520px]"
        /* Metadata against the opposite margin. */
        metaClassName="lg:col-span-3 lg:col-start-1 lg:row-start-1"
        plate={
          <ArchivePlate
            plate={plate}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 520px"
          />
        }
        meta={
          <ChapterMeta name={plate.name} headingId="chapter-war-heading" />
        }
      />
    </section>
  );
}