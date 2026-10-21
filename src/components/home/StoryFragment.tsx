import Image from "next/image";
import Link from "next/link";
import { getArchivePlate } from "@/components/archive/archiveData";
import Flow from "@/components/motion/Flow";
import Reveal from "@/components/motion/Reveal";

/**
 * STORY / JOURNAL
 *
 * The homepage entry point to /story. The existing Witness archive plate is
 * reused as the visual lead; this section does not reproduce the Archive
 * chapter or invent article copy. Its embedded statement is exposed to screen
 * readers as a text equivalent without being repeated visibly.
 */
export default function StoryFragment() {
  const plate = getArchivePlate("the-witness");

  return (
    <section
      aria-labelledby="story-fragment-heading"
      data-surface="ivory"
      data-intensity="story"
      className="relative w-full px-5 py-16 md:px-10 md:py-20 lg:px-14"
    >
      <div className="mx-auto grid w-full max-w-[104rem] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Image first in the DOM and on narrow screens; placed on the right
            at desktop so the figure looks inward toward the text rail. */}
        <Flow
          fade={false}
          rise={16}
          className="lg:col-span-7 lg:col-start-6 lg:row-start-1"
        >
          <figure className="image-frame mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-[42rem]">
            <Image
              src={plate.src}
              alt={plate.alt}
              aria-describedby="story-witness-statement"
              width={plate.width}
              height={plate.height}
              sizes="(max-width: 767px) min(calc(100vw - 2.5rem), 34rem), (max-width: 1023px) min(calc(100vw - 5rem), 34rem), (max-width: 1304px) calc(58.333vw - 5.54rem), 42rem"
              className="h-auto w-full"
            />
            <span id="story-witness-statement" className="sr-only">
              The plate is marked WITNESS 003 and reads: “I saw the timeline
              break. I saw him rewrite it. I chose to witness.”
            </span>
          </figure>
        </Flow>

        <Reveal
          pattern="rise"
          className="w-full max-w-[30rem] lg:col-span-4 lg:col-start-1 lg:row-start-1"
        >
          <p className="meta meta-stone">Journal</p>
          <h2
            id="story-fragment-heading"
            className="display mt-6 text-[clamp(3rem,9vw,6.5rem)] leading-[0.86] text-[--surface-ink]"
          >
            Story
          </h2>
          <Link href="/story" className="cta-invitation mt-8">
            Read the Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
