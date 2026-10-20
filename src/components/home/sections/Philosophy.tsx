import Flow from "@/components/motion/Flow";
import Symbol from "@/components/brand/Symbol";
import Section from "./Section";

/**
 * PHILOSOPHY — EDITORIAL BRAND STATEMENT
 *
 * The triptych condenses existing brand language; it is not a new slogan.
 * The canonical mark stays static and subordinate to the typography.
 */
export default function Philosophy() {
  return (
    <Section
      id="philosophy"
      surface="ivory"
      labelledBy="philosophy-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[104rem] grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14">
        <Flow rise={18} fade={false} className="lg:col-span-7">
          <p className="meta meta-stone">Philosophy</p>

          <h2
            id="philosophy-heading"
            className="display-editorial mt-8 max-w-[24ch] text-ink md:mt-12 md:max-w-[22ch]"
          >
            <span className="block">SYMBOLS.</span>
            <span className="block">ARCHITECTURE.</span>
            <span className="block">FORM.</span>
          </h2>

          <div
            aria-hidden="true"
            className="mt-8 h-px w-24 bg-[--surface-rule] md:mt-10"
          />
        </Flow>

        {/* The canonical mark is a still, secondary counterweight; its width
            scales down on mobile so the triptych remains the dominant mass. */}
        <div className="flex justify-center lg:col-span-4 lg:col-start-9">
          <Symbol
            width="clamp(4.5rem, 14vw, 11.625rem)"
            color="var(--ink)"
            className="opacity-[0.07]"
          />
        </div>
      </div>
    </Section>
  );
}
