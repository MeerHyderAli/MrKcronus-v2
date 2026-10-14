import ArchivePlate from "@/components/archive/ArchivePlate";
import { getArchivePlate } from "@/components/archive/archiveData";
import {
  ChapterEdgeLabel,
  ChapterMeta,
} from "@/components/home/chapters/chapterParts";
import ChapterMotion from "@/components/home/chapters/ChapterMotion";

/**
 * CHAPTER 2 / THE ARCHITECT  -  ORIGIN, ARCHIVE RECORD
 *
 * This is the archive record for The Architect. The locked ArchitectSection
 * above it presented the garment artifact and has been removed in Build 11C,
 * so this chapter now carries the identity on its own. It asserts nothing: no
 * level number, no explanation, no connective copy.
 *
 * It stays visually distinct from the former artifact section by scale, type
 * size, framing and which edge carries the filing label - and now also by
 * motion: the artifact section travelled, this plate approaches and drifts.
 *
 * MOTION (Build 11C) - fluid
 * Plate right, metadata left, so the counter-travel pulls them further apart
 * through the passage. The plate crosses 100px while the metadata moves 28px
 * the other way.
 *
 * SIZE: 560px from lg up, giving a 700px plate and a chapter near 106svh.
 * Below lg it fills the column at 92vw.
 *
 * The plate leads in the DOM so mobile shows artwork before metadata.
 * Server component; motion lives in the shared wrapper.
 */
export default function ArchitectArchiveChapter() {
  const plate = getArchivePlate("the-architect");

  return (
    <section
      aria-labelledby="chapter-architect-heading"
      data-surface="ivory"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20"
    >
      <ChapterEdgeLabel>Archive</ChapterEdgeLabel>

      <ChapterMotion
        parallax={100}
        counter={-28}
        scaleFrom={0.94}
        poolPeak={null}
        gridClassName="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8"
        plateClassName="w-full lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:w-[560px]"
        metaClassName="lg:col-span-3 lg:col-start-1 lg:row-start-1"
        plate={
          <ArchivePlate
            plate={plate}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 560px"
          />
        }
        meta={
          <ChapterMeta name={plate.name} headingId="chapter-architect-heading" />
        }
      />
    </section>
  );
}