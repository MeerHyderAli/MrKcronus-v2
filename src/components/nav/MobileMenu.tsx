"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
const HIT_AREA_CLASS =
  "relative after:absolute after:inset-x-0 after:top-1/2 after:h-11 after:-translate-y-1/2 after:content-['']";

export default function MobileMenu({ enterHref = "/archive" }: { enterHref?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);

    // The mobile toggle is hidden at this breakpoint. If the menu was opened
    // just before crossing it, close without acquiring a scroll lock.
    if (desktopQuery.matches) {
      // The open state may commit just before a resize but its effect run just
      // after it. Defer this correction and cancel it if the effect is cleaned
      // up first (including an unmount).
      const closeMenu = window.setTimeout(() => setOpen(false), 0);
      return () => {
        window.clearTimeout(closeMenu);
        desktopQuery.removeEventListener("change", closeOnDesktop);
      };
    }

    wasOpenRef.current = true;

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

    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-modal-background]"),
    );
    const previousInert = backgroundElements.map((element) => [element, element.inert] as const);
    previousInert.forEach(([element]) => {
      element.inert = true;
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel synchronously. requestAnimationFrame is not
    // used here: it is throttled or suspended in background tabs, which would
    // silently drop focus placement.
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      previousInert.forEach(([element, wasInert]) => {
        if (element.isConnected) element.inert = wasInert;
      });
    };
  }, [open]);

  // Focus restoration is a state transition, not effect cleanup: this runs when
  // the open dialog closes, but not when this component itself unmounts.
  useEffect(() => {
    if (open || !wasOpenRef.current) return;

    wasOpenRef.current = false;
    const button = buttonRef.current;
    if (
      !window.matchMedia(DESKTOP_MEDIA_QUERY).matches &&
      button?.isConnected
    ) {
      button.focus();
    }
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
              {LINKS.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`display block ${HIT_AREA_CLASS} text-[2.25rem] leading-none transition-opacity duration-200 ease-archive hover:opacity-70 ${
                        active ? "text-gold" : "text-ivory"
                      }`}
                    >
                      <span className="sr-only">{`Item ${index + 1}: `}</span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={enterHref}
                  onClick={() => setOpen(false)}
                  className={`display block ${HIT_AREA_CLASS} text-[2.25rem] leading-none text-gold transition-opacity duration-200 ease-archive hover:opacity-70`}
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