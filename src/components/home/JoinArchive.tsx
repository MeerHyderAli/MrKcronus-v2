"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Symbol from "@/components/brand/Symbol";
import Section from "@/components/home/sections/Section";

/**
 * JOIN THE ARCHIVE — THE LAST DOOR
 *
 * The visitor has just passed a row of doors, most of them locked. The page ends on
 * one lit doorway in the dark: a slit of ivory light opens into a full arch as the
 * section arrives, the form stands inside it, and the light spills across the floor
 * into the footer.
 *
 * THE FORM STILL SENDS NOTHING, AND MUST SAY SO
 *
 * There is no backend, no mailing list, no account and no registration service in
 * this project. Submitting calls preventDefault and announces a plain refusal through
 * a polite live region. That refusal is the honest behaviour: a form that silently
 * swallowed an address and implied a subscription would be worse than no form at all.
 *
 * Do not replace this with a real submission handler, a success state, a "check your
 * inbox" message or any third-party embed unless that service actually exists.
 *
 * THE DOORWAY OPENS ON SCROLL, BUT NEVER HIDES THE FORM FROM A KEYBOARD
 *
 * Tabbing into the field can land before the scroll has opened the arch, so
 * :focus-within in globals.css opens it at once. Reduced motion and no script get it
 * open from the start.
 */
export default function JoinArchive() {
  const [status, setStatus] = useState("");
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: stage,
    offset: ["start end", "center center"],
  });

  const opening = useTransform(
    progress,
    [0.2, 0.8],
    ["inset(0% 47% 0% 47%)", "inset(0% 0% 0% 0%)"],
  );
  const light = useTransform(progress, [0.25, 0.85], [0, 1]);
  const contentOpacity = useTransform(progress, [0.6, 0.95], [0, 1]);
  const contentY = useTransform(progress, [0.6, 0.95], [18, 0]);

  return (
    <Section id="join-archive" surface="dark" labelledBy="join-archive-heading" className="overflow-x-clip pt-16 md:pt-24">
      <noscript>
        <style>
          {".join-arch{clip-path:none!important}.join-content,.join-glow,.join-floor{opacity:1!important;transform:none!important}"}
        </style>
      </noscript>

      <div ref={stage} className="join-stage">
        <motion.div aria-hidden="true" className="join-glow" style={{ opacity: light }} />
        {/* Before the arch, so the floor's soft edge stays behind it. */}
        <motion.div aria-hidden="true" className="join-floor" style={{ opacity: light }} />

        <motion.div data-surface="ivory" className="join-arch" style={{ clipPath: opening }}>
          <motion.div className="join-content" style={{ opacity: contentOpacity, y: contentY }}>
            <Symbol height="5.5rem" color="var(--ink)" className="mx-auto" />
            <h2 id="join-archive-heading" className="display-editorial join-title">
              Join the Archive
            </h2>

            <form
              aria-labelledby="join-archive-heading"
              onSubmit={(event) => {
                event.preventDefault();
                setStatus("Nothing was submitted. Archive registration is not yet available.");
              }}
              className="join-form"
            >
              <label htmlFor="join-archive-email" className="join-label">
                Email address
              </label>
              <input
                id="join-archive-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-describedby="join-archive-status"
                className="join-input"
              />
              <button type="submit" className="cta-solid join-submit">
                Join
              </button>
            </form>

            {/* Announces the refusal politely. Empty until an attempt is made. */}
            <p id="join-archive-status" role="status" aria-live="polite" className="join-status">
              {status}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
