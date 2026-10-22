"use client";

import { useState } from "react";
import Symbol from "@/components/brand/Symbol";
import Reveal from "@/components/motion/Reveal";

/**
 * JOIN THE ARCHIVE
 *
 * The closing invitation, and deliberately the last thing on the page before
 * the footer.
 *
 * THE FUNCTIONALITY IS UNTOUCHED AND MUST STAY THAT WAY
 *
 * There is no backend, no mailing list, no account and no registration service
 * in this project. Submitting the form therefore does not send anything and
 * never will. It calls preventDefault and announces a plain refusal through a
 * polite live region. That refusal is the honest behaviour: a form that
 * silently swallowed an address and implied a subscription had occurred would
 * be worse than no form at all, and a fake backend would be a lie.
 *
 * Do not replace this with a real submission handler, a success state, a
 * "check your inbox" message or any third-party embed unless that service
 * actually exists.
 *
 * THE FORM MARKUP IS UNCHANGED FROM THE APPROVED COMPONENT
 *
 * The input's id, name, type, required, autoComplete, placeholder and
 * aria-describedby; the button's classes; and the status paragraph's role,
 * aria-live and min-height are all exactly as approved. This file was
 * reconstructed in Build 13.1 after a scripted edit destroyed the original;
 * the reconstruction restores that markup verbatim and the original doc
 * comment above was rewritten, so the behaviour is preserved and the
 * commentary is not.
 *
 * WHAT CHANGED VISUALLY IN BUILD 13.1
 *
 * The left column previously held a heading, a 64px rule and nothing else,
 * which on a 1916px screen left most of it empty. It now carries the canonical
 * symbol as the closing mark. The space is filled with the brand's own geometry
 * rather than with words, because there is no honest copy to add: the form
 * already states plainly that registration is not available, and inventing a
 * paragraph about joining would be padding.
 *
 * The mark is never transformed - no scale, no rotation, no skew. It is the
 * canonical artwork exactly as approved.
 */
export default function JoinArchive() {
  const [status, setStatus] = useState("");

  return (
    <section
      aria-labelledby="join-archive-heading"
      data-intensity="about"
      className="mx-auto w-full max-w-[104rem] px-5 py-24 md:px-10 md:py-28 lg:px-14 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="h-px w-full origin-left bg-[--rule]"
      />

      <div className="grid grid-cols-1 gap-14 pt-14 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20">
        <div className="lg:col-span-6">
          <Reveal pattern="rise">
            <p className="meta meta-stone">Archive</p>
            <h2
              id="join-archive-heading"
              className="display mt-6 max-w-[14ch] text-[length:var(--type-title)] leading-[0.92] text-ivory"
            >
              Join the Archive
            </h2>
          </Reveal>

          <div
            aria-hidden="true"
            className="mt-10 h-px w-full origin-left bg-[--rule]"
          />

          <div className="mt-12">
            <Symbol height={150} className="max-w-[34vw] opacity-[0.22]" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal pattern="rise" delay={0.12}>
            <form
              /* NAMED, AND NO LONGER CARRYING DEAD ATTRIBUTES.

                 aria-labelledby points at the section's own h2. A form with no
                 accessible name is announced as just "form", and the visible
                 "Email Address" label describes the FIELD, not the form, so a
                 screen-reader user had nothing to tell these two controls apart
                 from any other form on the page.

                 noValidate={false} was the default value written out longhand;
                 it asserted nothing and has been removed. */
              aria-labelledby="join-archive-heading"
              onSubmit={(event) => {
                event.preventDefault();
                setStatus(
                  "Nothing was submitted. Archive registration is not yet available.",
                );
              }}
              className="flex w-full flex-col gap-4 sm:flex-row sm:items-end"
            >
              <div className="flex-1">
                <label
                  htmlFor="join-archive-email"
                  className="meta meta-stone"
                >
                  Email Address
                </label>
                <input
                  id="join-archive-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="—"
                  aria-describedby="join-archive-status"
                  className="mt-3 h-12 w-full border border-[--rule] bg-transparent px-4 font-meta text-sm text-ivory placeholder:text-ivory/55"
                />
              </div>
              <button
                type="submit"
                className="meta h-12 shrink-0 border border-[--rule] px-6 text-ivory transition-colors duration-200 ease-archive hover:border-[--gold] hover:text-gold"
              >
                Join
              </button>
            </form>
          </Reveal>

          {/* Announces the refusal politely. Empty until an attempt is made. */}
          <p
            id="join-archive-status"
            role="status"
            aria-live="polite"
            className="mt-5 min-h-[1.25rem] font-meta text-[0.6875rem] leading-relaxed tracking-[0.14em] text-ivory/55"
          >
            {status}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-16 h-px w-full bg-[--rule] lg:mt-20"
      />
    </section>
  );
}
