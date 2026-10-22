import { routeMetadata } from "@/app/routeMetadata";

export const metadata = routeMetadata(
  "Story",
  "/story",
  "MR.KCRONUS. The story.",
);

/**
 * Structural shell only. The visual-first chronicle is built in a later
 * phase. No invented chronology, no fabricated history, no dates.
 *
 * THE PARAGRAPH WAS CUT, NOT REWRITTEN
 *
 * This route previously read "The chronicle foundation is established.
 * Editorial sequence follows in a later phase." That is production language,
 * and AboutSection.tsx already rules it out on the homepage: internal
 * production language does not belong on a finished page. There is also nothing
 * honest to replace it with - AGENTS.md forbids inventing a chronology, dates,
 * history or a byline, and no chronicle copy has been supplied. So the sentence
 * is removed rather than dressed up. The route now says its name and stops,
 * which is truthful and leaves the editorial phase room to fill it.
 */
export default function StoryPage() {
  return (
    <section
      aria-labelledby="story-heading"
      className="mx-auto min-h-[70svh] max-w-[104rem] px-5 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <p className="meta meta-stone">Chronicle</p>

      <h1 id="story-heading" className="display mt-8 text-[clamp(2.5rem,8vw,6rem)] text-ivory">
        STORY
      </h1>
    </section>
  );
}