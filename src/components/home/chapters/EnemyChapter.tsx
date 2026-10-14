import ArchivePlate from "@/components/archive/ArchivePlate";
import { getArchivePlate } from "@/components/archive/archiveData";
import {
  ChapterEdgeLabel,
  ChapterMeta,
} from "@/components/home/chapters/chapterParts";
import ChapterMotion from "@/components/home/chapters/ChapterMotion";

/**
 * CHAPTER 7 / THE ENEMY  -  CONFRONTATION
 *
 * THE STRONGEST ARCHIVE CHAPTER.
 *
 * WHICH ENEMY THIS IS
 * This is TheEnemy.png, the narrative archive plate. It is NOT
 * artifact-enemy.png.
 *
 *   artifact-enemy.png  500x1254   the Enemy GARMENT - a production product
 *                                  render. It appears exactly once on this site,
 *                                  in Featured Products.
 *   TheEnemy.png        1254x1254  this chapter - the Enemy ARCHIVE RECORD.
 *
 * The two are deliberately kept apart: garment in the commerce grid, archive
 * plate in the narrative.
 *
 * THE SQUARE IS HONOUST
 * The Enemy plate is natively 1254x1254, so it is given a true 1:1 frame
 * instead of the 4:5 frame the portraits use. That means it is cropped by
 * NOTHING - no pixels are removed - and the wide dark margins that are part of
 * the artwork are preserved as negative space around the figure. The frame is a
 * fixed aspect box, so the correct space is reserved before the bytes arrive
 * and nothing shifts when a 1.44MB plate lands. Verified at 1440: 675x675,
 * ratio exactly 1.0000.
 *
 * MOTION (Build 11C) - fluid, the closest approach in the set
 * The plate starts further back than any other chapter (scaleFrom 0.90) and
 * travels 120px, so the confrontation resolves as the largest single movement
 * in the sequence - and because it is square it reads as a figure advancing
 * head-on rather than sliding past. Metadata counter-travels 34px the other
 * way.
 *
 * LIGHTING
 * Darkest plate in the corpus at median luminance 7, 97.5% of pixels below
 * L40, so it carries the second-highest lightPeak in the set. That light sits
 * BEHIND an oversized field and reads as atmosphere in the void around the
 * plate. There is no glow on the figure, no wash over the artwork, and nothing
 * is brightened or recoloured.
 *
 * LEVEL 05
 * The existing approved identifier for The Enemy, previously carried by the
 * removed FeaturedArtifact section. Restated here, once. No other chapter
 * invents a level.
 *
 * SIZE: 700px square from lg up - the largest single object in the narrative,
 * and still only 78svh tall because it is square.
 *
 * Server component; motion lives in the shared wrapper.
 */
export default function EnemyChapter() {
  const plate = getArchivePlate("the-enemy");

  return (
    <section
      aria-labelledby="chapter-enemy-heading"
      data-surface="dark"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-16 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <ChapterEdgeLabel>Archive</ChapterEdgeLabel>

      <ChapterMotion
        parallax={120}
        counter={-34}
        scaleFrom={0.9}
        poolPeak={plate.lightPeak}
        poolClassName="h-[84%] w-[84%]"
        gridClassName="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8"
        plateClassName="w-[86vw] sm:w-[70vw] lg:w-[700px] lg:col-span-8 lg:col-start-1 lg:row-start-1"
        metaClassName="lg:col-span-3 lg:col-start-10 lg:row-start-1"
        plate={
          <ArchivePlate
            plate={plate}
            ratio="square"
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 52vw, 700px"
          />
        }
        meta={
          <ChapterMeta
            name={plate.name}
            headingId="chapter-enemy-heading"
            level="Level 05"
          />
        }
      />
    </section>
  );
}