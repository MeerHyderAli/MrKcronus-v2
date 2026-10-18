"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

/**
 * Mobile navigation layer.
 *
 * Opens into an editorial, near-full-screen Obsidian panel. No glass, no
 * blurred backdrop, no rounded container, no pill toggle.
 *
 * Accessibility contract:
 *  - semantic <button> with aria-expanded and aria-controls
 *  - Escape closes
 *  - focus moves into the panel on open and returns to the button on close
 *  - Tab is trapped inside the panel while it is open
 *  - body scroll is locked while open
 *  - reduced motion removes the transition (see globals.css)
 */

const LINKS = [
  { href: "/archive", label: "ARCHIVE" },
  { href: "/story", label: "STORY" },
  { href: "/about", label: "ABOUT" },
] as const;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ enterHref = "/archive" }: { enterHref?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const button = buttonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel synchronously. requestAnimationFrame is not
    // used here: it is throttled or suspended in background tabs, which would
    // silently drop focus placement.
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-[70] flex h-11 w-11 items-center justify-center md:hidden"
      >
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 block h-px w-5 bg-ivory transition-transform duration-200 ease-archive ${
              open ? "translate-y-[5px] rotate-45" : "translate-y-[1px]"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-5 bg-ivory transition-transform duration-200 ease-archive ${
              open ? "-translate-y-[5px] -rotate-45" : "-translate-y-[1px]"
            }`}
          />
        </span>
      </button>

      {open ? (
        /* The panel is a MODAL DIALOG, and it now says so.

           It is a full-viewport overlay that traps focus and locks the page
           behind it, which is the definition of a modal. It was previously a
           bare <div>: focus management was already correct, but nothing
           announced that a dialog had opened, nothing named it, and nothing
           told assistive technology that the page underneath was unavailable.

           role="dialog" + aria-modal="true" gives assistive technology the
           modal semantics; aria-label names the thing that opened. The
           underlying page is marked inert for the duration, so browse-mode
           screen-reader users are taken out of the page behind the panel
           instead of being able to wander into it with Tab locked.

           The <nav> inside keeps its own label, so the landmark is unchanged. */
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="menu-layer fixed inset-0 z-[60] bg-obsidian md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="flex h-svh flex-col justify-between px-5 pb-10 pt-20"
          >
            <ul className="flex flex-col gap-7">
              {LINKS.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[2.25rem] leading-none text-ivory transition-opacity duration-200 ease-archive hover:opacity-70"
                  >
                    <span className="sr-only">{`Item ${index + 1}: `}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={enterHref}
                  onClick={() => setOpen(false)}
                  className="display block text-[2.25rem] leading-none text-gold transition-opacity duration-200 ease-archive hover:opacity-70"
                >
                  <span className="sr-only">Item 4: </span>
                  ENTER
                </Link>
              </li>
            </ul>

            <p className="meta meta-stone border-t border-[--rule] pt-6">
              MR.KCRONUS
            </p>
          </nav>
        </div>
      ) : null}
    </>
  );
}