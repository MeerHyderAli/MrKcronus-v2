"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Section from "./Section";

/**
 * SECTION 02 - BRAND INTRODUCTION
 *
 * "Enter the Chronicle." The house introduces itself before the visitor is
 * asked to look at a garment.
 *
 * WHERE IT SITS, AND WHY IT DOES NOT BREAK ANYTHING
 *
 * It sits between the Hero and the Gateway. That placement looks risky and is
 * not: both neighbours derive their scroll behaviour from their own elements
 * and nothing else. The Hero is `offset: ["start start", "end end"]` on its own
 * 200/240vh runway and the Gateway is `offset: ["start end", "start start"]`
 * on its own 100/112svh stage, so inserting a block between them only delays
 * when the Gateway's progress begins. Neither was touched.
 *
 * It adds NO pinned track. There is no useScroll, no position: sticky and no
 * scroll listener anywhere in this file. The page still has exactly two pinned
 * tracks: the Hero and Movement B.
 *
 * WHY IT IS DARK AND THE GATEWAY IS ALSO DARK
 *
 * The Hero resolves to obsidian and the Gateway then crosses to ivory. A light
 * section here would break that crossing in half. This section continues the
 * dark ground instead, so the Hero's resolution has somewhere to settle before
 * the crossing begins.
 *
 * ALL TYPOGRAPHY IS REAL TEXT
 *
 * The headline and the supporting statement are HTML. The plate is background
 * artwork and contributes no lettering of its own - the supplied file has none.
 * The headline is a real <h2>, so it is selectable, searchable, translatable
 * and reachable by a screen reader, and it is the element the section's
 * aria-labelledby points at.
 *
 * THE SCRIM IS A GRADIENT, NOT A FILTER
 *
 * One inline background gradient per breakpoint, and nothing else. No filter,
 * no blur, no brightness or contrast adjustment. AGENTS.md prohibits expensive
 * continuous filters, and the plate is already correctly exposed - contrast is
 * bought by laying darkness over the left of the frame, not by degrading the
 * bitmap. This is the same restraint LightPool.tsx already uses.
 *
 * WHY TWO SCRIMS
 *
 * Below md the crop is portrait and the bright part of the plate - the cloud
 * break and the reflective floor - sits above and below the type, so the
 * gradient runs bottom-to-top and the type is anchored to the bottom edge.
 * From md up the crop is far wider and the darkness is a left-hand mass, so the
 * gradient runs left-to-right and the type is vertically centred. Each scrim is
 * display:none at the other breakpoint, so only one ever paints.
 *
 * OBJECT-POSITION, AND WHAT IT ACTUALLY DOES
 *
 * At lg the frame's aspect ratio is about 1.82 and the plate is 1.777, so the
 * image is barely cropped and the horizontal position is close to a no-op -
 * the whole composition is visible. Focal control only matters where the crop
 * is severe: at md roughly a third of the width is cut, and below md roughly
 * two thirds. Mobile is positioned to hold the figure, which is the subject;
 * the stone head and the wider architecture are allowed to leave the frame.
 *
 * WHY min-h AND NEVER h
 *
 * The section's height is a minimum, and the type sits in normal flow inside
 * it. Nothing can be clipped at any font size, zoom level or text length, and
 * there is no sticky frame to overflow.
 *
 * NO HOOKS BEYOND WHAT Reveal ITSELF USES
 *
 * useCompactMotion is deliberately not called here. Every value in this
 * component is a static per-breakpoint Tailwind class rather than something
 * derived in JavaScript, so this section adds nothing to the compact-geometry
 * reflow that Hero and Gateway already have on first paint.
 */

/** The plate. Native 1672 x 941, AR 1.777 - the corpus's first landscape asset. */
const PLATE = {
  src: "/brand/section-02-world-introduction.png",
  width: 1672,
  height: 941,
} as const;

export default function BrandIntroduction() {
  return (
    <Section
      id="brand-introduction"
      surface="dark"
      labelledBy="brand-introduction-heading"
      className="overflow-hidden"
    >
      <div className="relative flex min-h-[70svh] items-end overflow-hidden md:min-h-[64svh] md:items-center lg:min-h-[88svh]">
        {/* THE PLATE.

            fill + a parent whose height comes from min-h means the image
            contributes nothing to layout, so there is no CLS when it decodes.

            NO width / height ON THE ELEMENT, and that is not an omission. fill
            and width are mutually exclusive in next/image and passing both is a
            hard runtime error, not a warning - the plate's native 1672 x 941
            stays documented in PLATE above, where it belongs, and the element
            itself is sized entirely by its positioned parent. This previously
            carried all three and took the homepage down.

            priority is deliberately absent. This section is below the fold and
            must not compete with the Hero for LCP; Next's lazy default applies.

            sizes="100vw" is literally true - the image is full-bleed - and is
            what every other raster in this project does. */}
        <Image
          src={PLATE.src}
          alt="A lone figure in black MR.KCRONUS clothing stands among ruined classical arches and scattered rubble, beneath a large cracked stone head, against a breaking sky."
          fill
          sizes="100vw"
          className="object-cover object-[62%_38%] md:object-[62%_50%] lg:object-[68%_50%]"
        />

        {/* Bottom-to-top scrim. Mobile only.

            Verified at 390x844: the first pass was NOT strong enough. The
            "Enter the Chronicle" label sits about 42% up the section and was
            under only 0.62 alpha there, which read as a mistake rather than as
            deliberate restraint. These stops hold 0.80 out to 48%, so the
            label and the whole headline sit on at least 0.61, while the cloud
            break above 70% still carries the plate's drama. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.92) 32%, rgba(5,5,5,0.80) 48%, rgba(5,5,5,0.50) 62%, rgba(5,5,5,0.16) 76%, rgba(5,5,5,0) 90%)",
          }}
        />

        {/* Left-to-right scrim. md and up.

            Its reach is set by the HEADLINE'S ACTUAL WIDTH, not by a guess.
            Measured in Bodoni Moda at 104px: 1ch is 73px, so .title-statement's
            13ch measure is 949px, and the three lines measure 559 / 758 / 657.
            The widest line therefore reaches about 49% across the frame, so the
            scrim holds 0.80 out to 46% - the type never sits on unlit plate -
            and releases to nothing by 78%, before the figure has finished. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.91) 28%, rgba(5,5,5,0.80) 46%, rgba(5,5,5,0.42) 58%, rgba(5,5,5,0.10) 68%, rgba(5,5,5,0) 78%)",
          }}
        />

        {/* THE TYPE.

            One Reveal for the whole block, so the three lines arrive as a
            single gesture rather than three separate animations. The children
            keep their own spacing and nothing else. */}
        <div className="relative z-10 mx-auto w-full max-w-[104rem] px-5 pb-10 md:px-10 md:py-0 lg:px-14">
          <Reveal pattern="rise" className="max-w-[48rem]">
            <p className="meta meta-stone">Enter the Chronicle</p>

            {/* NOT text-balance, DELIBERATELY, AND THE WRAPPER WIDTH IS WHY.

                At 1920 the display size is 104px and the headline wraps
                greedily. The wrapper is 48rem = 768px, which is chosen to sit
                just above the measured width of "BEYOND THE" (758px) and well
                below "A WORLD BEYOND" (1080px). That yields three lines at
                EVERY breakpoint:

                  A WORLD / BEYOND THE / ORDINARY.

                A narrower wrapper - 42rem was the first attempt - makes
                "BEYOND THE" 758px too wide to fit, and the block breaks to four
                lines with THE orphaned on a line of its own at 104px, which
                reads as a mistake. text-balance does not fix it either; it
                simply balances the four. Balance is not a default on this site
                and has to earn its place. */}
            <h2 id="brand-introduction-heading" className="title-statement mt-6">
              A WORLD BEYOND THE ORDINARY.
            </h2>

            {/* The measure is set inline on purpose. .prose-archive declares
                max-width: 62ch and globals.css is unlayered, so it beats any
                Tailwind layered utility - an arbitrary max-w-* class would
                silently do nothing here. Inline settles it. The approved copy
                then breaks across two lines instead of running as one long
                ribbon under a 104px headline. */}
            <p className="prose-archive mt-7" style={{ maxWidth: "34ch" }}>
              A world built through symbols, architecture and form.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}