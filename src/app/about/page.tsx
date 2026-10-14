import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "MR.KCRONUS. A world built through symbols, architecture and form.",
};

/**
 * Structural shell only. No founder biography, dates, locations,
 * manufacturing claims, sustainability claims, press or testimonials.
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

      <p className="prose-archive mt-8 text-stone">
        The statement foundation is established. Supporting material follows
        in a later phase.
      </p>
    </section>
  );
}