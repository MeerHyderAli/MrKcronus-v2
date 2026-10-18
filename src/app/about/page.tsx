import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "MR.KCRONUS. A world built through symbols, architecture and form.",
};

/**
 * Structural shell only. No founder biography, dates, locations,
 * manufacturing claims, sustainability claims, press or testimonials.
 *
 * THE PARAGRAPH WAS CUT, NOT REWRITTEN
 *
 * This route previously read "The statement foundation is established.
 * Supporting material follows in a later phase." AboutSection.tsx already
 * rules out exactly this kind of sentence on the homepage - internal
 * production language does not belong on a finished page - and nothing honest
 * can replace it: AGENTS.md forbids inventing founder history, dates,
 * locations, manufacturing or sustainability claims, press and testimonials,
 * and no such material has been supplied. The brand statement above is the
 * approved copy and is the whole of what is known. Cutting the sentence was
 * the only correction that did not fabricate something.
 */
export default function AboutPage() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto min-h-[70svh] max-w-[104rem] px-5 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <p className="meta meta-stone">Statement</p>

      <h1 id="about-heading" className="display mt-8 text-[clamp(2.5rem,8vw,6rem)] text-ivory">
        ABOUT
      </h1>

      <p className="display mt-10 max-w-[18ch] text-[clamp(1.5rem,3.5vw,2.75rem)] leading-tight text-ivory">
        A world built through symbols, architecture and form.
      </p>
    </section>
  );
}