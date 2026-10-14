import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story",
  description: "MR.KCRONUS. The story.",
};

/**
 * Structural shell only. The visual-first chronicle is built in a later
 * phase. No invented chronology, no fabricated history, no dates.
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

      <p className="prose-archive mt-8 text-stone">
        The chronicle foundation is established. Editorial sequence follows in
        a later phase.
      </p>
    </section>
  );
}