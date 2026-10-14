import Link from "next/link";
import Flow from "@/components/motion/Flow";
import Reveal from "@/components/motion/Reveal";

/**
 * STORY / JOURNAL
 *
 * The Journal entry point on the homepage.
 *
 * WHAT CHANGED IN BUILD 13.1 AND WHY
 *
 * This rendered as a very large double-framed box containing four short words -
 * FILE 001, ARCHIVE RECORD, STORY, READ THE STORY. On a wide screen the frame
 * was far larger than its contents, which reads as an unfilled wireframe rather
 * than as a record.
 *
 * The brief for this pass was explicit: do not invent article content, and if
 * none exists, reduce the visual footprint rather than fabricating it. So the
 * footprint is what changed. The panel is now a compact horizontal record, the
 * type is larger relative to its container, and the section reserves less
 * vertical space. There is still no excerpt, still no date, still no headline
 * and still no byline, because none of those exists.
 *
 * 19-07 is a graphic motif and is never a date. "12 APR 2025", which appeared
 * on the client reference's record card, has never been copied here and never
 * will be.
 *
 * THE FOUR APPROVED WORDS
 * FILE 001, ARCHIVE RECORD, STORY and READ THE STORY are unchanged. READ THE
 * STORY is the existing supplied route label, not invented editorial copy.
 */
export default function StoryFragment() {
  return (
    <section
      aria-labelledby="story-fragment-heading"
      data-surface="ivory"
      data-intensity="story"
      className="relative w-full px-5 py-16 md:px-10 md:py-20 lg:px-14"
    >
      {/* The filing label. Editorial furniture: it names the record, so it is
          exposed to assistive technology rather than hidden. */}
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden items-center lg:flex">
        <span className="meta-vertical meta-vertical--stone">Archive Record</span>
      </div>

      {/* Deliberately capped rather than full-bleed. A record is a document with
          an edge, and an edge is what stops this reading as a wireframe. */}
      <Flow fade={false} rise={16} className="mx-auto w-full max-w-[68rem] lg:pl-[4%]">
        <div className="archival-border archival-border--datum px-6 py-8 md:px-10 md:py-10">
          <Reveal pattern="rise">
            <div className="flex items-baseline justify-between gap-4">
              <span className="meta meta-stone">File 001</span>
              <span className="meta meta-stone">Archive Record</span>
            </div>
          </Reveal>

          <Reveal pattern="rise" delay={0.1}>
            <div aria-hidden="true" className="mt-5 h-px w-full bg-[--surface-rule]" />
          </Reveal>

          <Reveal pattern="mask" delay={0.2}>
            <h2
              id="story-fragment-heading"
              className="display mt-7 text-[clamp(3rem,9vw,6.5rem)] leading-[0.86] text-[--surface-ink]"
            >
              Story
            </h2>
          </Reveal>

          <Reveal pattern="rise" delay={0.34}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-[--surface-rule] pt-6">
              <span className="meta meta-stone">Journal</span>
              <Link href="/story" className="cta-invitation">
                Read the Story
              </Link>
            </div>
          </Reveal>
        </div>
      </Flow>
    </section>
  );
}