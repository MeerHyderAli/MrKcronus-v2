import ArchivePlate from "@/components/archive/ArchivePlate";
import { getArchivePlate } from "@/components/archive/archiveData";
import { ChapterMeta } from "@/components/home/chapters/chapterParts";
import ChapterMotion from "@/components/home/chapters/ChapterMotion";

/**
 * CHAPTER 5 / THE GODS  -  AXIAL, MONUMENTAL
 *
 * The one symmetrical chapter in the set, and the only one composed on both
 * axes. Every other chapter is weighted to a side; this one is not, which is
 * what makes it read as elevated rather than merely large.
 *
 * MOTION (Build 11C) - fluid, but axial
 * Symmetry rules out the counter-travel the off-axis chapters use: a plate
 * moving up while its metadata moves down would pull a centred composition off
 * its axis. So here both travel TOGETHER upward, plate at 90px and metadata at
 * 28px, and the composition holds its centre while rising as one object. Scale
 * is the only other change.
 *
 * SIZE: 620px from lg up. Uncapped at 68% of the container this plate reached
 * 893px wide and the chapter ran to 169svh, which broke the page-length budget
 * for a chapter whose whole argument is space.
 *
 * No vertical edge label here. A rotated label would fight the axis, which is
 * the whole point of the chapter.
 *
 * No Gods lore. Server component; motion lives in the shared wrapper.
 */
export default function GodsChapter() {
  const plate = getArchivePlate("the-gods");

  return (
    <section
      aria-labelledby="chapter-gods-heading"
      data-surface="stone"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-16 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <ChapterMotion
        /* Positive counter: same direction as the plate, so the centred
           composition rises as one object instead of separating. */
        parallax={90}
        counter={28}
        scaleFrom={0.95}
        poolPeak={null}
        poolClassName="h-[92%] w-[108%]"
        gridClassName="grid grid-cols-1 justify-items-center gap-7 text-center lg:gap-9"
        plateClassName="w-full lg:w-[620px]"
        metaClassName="flex flex-col items-center [&_div]:mx-auto"
        plate={
          <ArchivePlate
            plate={plate}
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 620px"
          />
        }
        meta={
          <ChapterMeta name={plate.name} headingId="chapter-gods-heading" />
        }
      />
    </section>
  );
}