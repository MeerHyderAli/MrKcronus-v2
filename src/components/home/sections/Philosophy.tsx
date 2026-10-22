import Image from "next/image";
import Flow from "@/components/motion/Flow";
import Section from "./Section";

/**
 * PHILOSOPHY — THE CINEMATIC PAUSE
 *
 * The approved campaign frame is kept intact. The figure and concrete hall are
 * the image's own composition; responsive object positioning keeps that scene
 * legible while the headline occupies the dark negative space.
 */
export default function Philosophy() {
  return (
    <Section
      id="philosophy"
      surface="dark"
      labelledBy="philosophy-heading"
      className="overflow-hidden"
    >
      <div className="relative isolate flex min-h-[78svh] items-end overflow-hidden md:min-h-[70svh] md:items-center lg:min-h-[78svh]">
        <Image
          src="/brand/philosophy-campaign.png"
          alt="A solitary hooded figure stands on the right inside a vast brutalist concrete hall, beneath a shaft of light; the left side recedes into deep shadow."
          fill
          sizes="100vw"
          className="object-cover object-[76%_50%] md:object-[72%_50%] lg:object-center"
        />

        {/* The source is already dark on the left. These restrained page-level
            gradients only reinforce text contrast; the image is not filtered. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(0deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.62) 26%, rgba(5,5,5,0.12) 60%, rgba(5,5,5,0) 82%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,0.24) 0%, rgba(5,5,5,0.10) 40%, rgba(5,5,5,0) 68%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[104rem] px-5 pb-12 pt-36 md:px-10 md:py-16 lg:px-14">
          <Flow rise={12} fade={false} className="max-w-[42rem]">
            <h2 id="philosophy-heading" className="display-editorial text-ivory">
              <span className="block">STAND APART.</span>
              <span className="block">LEAVE A MARK.</span>
            </h2>
          </Flow>
        </div>
      </div>
    </Section>
  );
}
