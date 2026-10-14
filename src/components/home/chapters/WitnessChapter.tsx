import { getArchivePlate } from "@/components/archive/archiveData";
import { ChapterMeta, LitPlate } from "@/components/home/chapters/chapterParts";

/**
 * CHAPTER 4 / THE WITNESS  -  THE PAUSE
 *
 * Strategically the most important chapter in the set, because THE WITNESS is
 * the recurring visual bridge between Instagram, the website, Story and
 * products. That role needs the chapter to READ AS A PAUSE.
 *
 * So this is the smallest plate in the sequence - held off-centre, with wide
 * deliberate negative space on the left and the filing metadata sitting close
 * beneath it. At roughly 72vw on mobile it is visibly narrower than its
 * neighbours. If this chapter were given the same scale as the others the
 * bridge would disappear into the sequence.
 *
 * NO MOTION, DELIBERATELY, CONFIRMED IN BUILD 11C
 * Six of the nine chapters were given fluid scroll motion in Build 11C. This
 * one was explicitly held back, and it is the reason the other six read as
 * movement: THE WITNESS is the pause in the sequence, and the recurring bridge
 * between Instagram, the website, Story and products. A chapter that exists to
 * be a rest cannot itself be travelling.
 *
 * There is no Motion, no hover, no transition and no travelling light field.
 * It uses the static LitPlate for a fixed ambient field. The frame is a bare
 * hairline.
 *
 * SIZE: 440px from lg up, the smallest plate on the page, landing near 89svh.
 * 72vw on mobile.
 *
 * The plate leads in the DOM so mobile shows artwork before metadata; both
 * children carry an explicit lg:row-start-1.
 *
 * No Witness lore, and no text of any kind beyond the canonical identity.
 * Server component.
 */
export default function WitnessChapter() {
  const plate = getArchivePlate("the-witness");

  return (
    <section
      aria-labelledby="chapter-witness-heading"
      data-surface="ivory"
      data-intensity="archive"
      className="relative mx-auto w-full max-w-[104rem] px-5 py-16 md:px-10 md:py-16 lg:px-14 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8">
        {/* Held off-centre: columns 4-8 of twelve, leaving the right third
            empty. The asymmetry is the pause. */}
        <LitPlate
          plate={plate}
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 440px"
          poolClassName="h-[92%] w-[92%]"
          poolPeak={null}
          className="w-[72vw] sm:w-[58vw] lg:w-[440px] lg:col-span-5 lg:col-start-4 lg:row-start-1"
        />
        <ChapterMeta
          name={plate.name}
          headingId="chapter-witness-heading"
          className="w-[72vw] sm:w-[58vw] lg:w-auto lg:col-span-3 lg:col-start-4 lg:row-start-1"
        />
      </div>
    </section>
  );
}