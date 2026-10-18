"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Symbol from "@/components/brand/Symbol";
import Wordmark from "@/components/brand/Wordmark";
import MobileMenu from "@/components/nav/MobileMenu";

/**
 * Global navigation.
 *
 * [SYMBOL] MR.KCRONUS        ARCHIVE  STORY  ABOUT  ENTER
 *
 * Institutional / editorial register. Hairlines only, zero border radius,
 * no glass, no shadow, no pill. Ivory is primary, Stone is secondary, Gold
 * appears only as a restrained active state and on ENTER.
 *
 * Fixed, so navigation is available immediately. The cinematic sequence
 * never has to be completed to reach another page.
 */

const LINKS = [
  { href: "/archive", label: "ARCHIVE" },
  { href: "/story", label: "STORY" },
  { href: "/about", label: "ABOUT" },
] as const;

export default function Nav() {
  const pathname = usePathname();

  // ENTER points at the archive threshold. From inside the archive it
  // returns to the root threshold rather than linking to itself.
  const enterHref = pathname === "/archive" ? "/" : "/archive";

  // Build 12B: the header now crosses light surfaces as well as dark ones.
// It was tested translucent (Obsidian at 80% plus a light blur) so it would
// not read as a heavy slab over ivory, and that was reverted: compositing
// Obsidian over ivory lightens the bar to roughly #353432, which dropped
// these links from 3.17:1 to 1.94:1 - effectively invisible over every light
// chapter. The bar therefore stays solid Obsidian, which is the pre-existing
// state rather than a new opaque slab.
//
// The link register was corrected at the same time. Inactive links were Stone,
// which measures 3.17:1 on Obsidian - below AA for 11px text, and impossible
// to raise against any dark ground, since even pure black only gives Stone
// 3.17:1. text-ivory/55 uses an existing brand token with an alpha modifier
// rather than introducing a new colour, measures 5.81:1, and stays dimmer than
// the active gold at 7.63:1, so the active state still reads as the brighter.
  return (
    <header className="nav-bar fixed inset-x-0 top-0 z-50 border-b border-[--surface-rule] bg-obsidian">
      <div className="mx-auto flex h-16 max-w-[104rem] items-center justify-between px-5 md:h-20 md:px-10 lg:px-14">
        <Link
          href="/"
          className="flex items-center gap-3 md:gap-4"
          aria-label="MR.KCRONUS, home"
        >
          <Symbol height={26} className="md:h-8" />
          <Wordmark width={112} className="md:w-[132px]" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-11">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`meta transition-colors duration-200 ease-archive ${
                      active ? "text-gold" : "text-ivory/55 hover:text-ivory"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2 lg:ml-4">
              <Link
                href={enterHref}
                className="meta border border-[--surface-rule] px-4 py-2 text-ivory transition-colors duration-200 ease-archive hover:border-[--gold] hover:text-gold"
              >
                ENTER
              </Link>
            </li>
          </ul>
        </nav>

        <MobileMenu enterHref={enterHref} />
      </div>
    </header>
  );
}