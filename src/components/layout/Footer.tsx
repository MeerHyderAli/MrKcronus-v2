import Link from "next/link";
import Symbol from "@/components/brand/Symbol";
import Wordmark, { WORDMARK_MAX_WIDTH } from "@/components/brand/Wordmark";

/**
 * Institutional footer. The page's last frame: the mark and the name, then the way
 * back in.
 *
 * The wordmark is shown as large as its asset allows and no larger, because the
 * canonical file is downscale-only.
 *
 * Nothing here is invented. There is no year, address, founder information, press or
 * contact detail, and no social links, because no verified account has been supplied.
 */

const LINKS = [
  { href: "/archive", label: "ARCHIVE" },
  { href: "/story", label: "STORY" },
  { href: "/about", label: "ABOUT" },
] as const;

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-[104rem] px-5 pb-10 pt-16 md:px-10 md:pt-24 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-12">
          <div className="flex w-full max-w-[44rem] items-end gap-5 md:gap-8">
            <Symbol height="clamp(3.5rem, 8vw, 6.5rem)" />
            <Wordmark width={`min(100%, ${WORDMARK_MAX_WIDTH}px)`} className="min-w-0 flex-1" />
          </div>

          <nav aria-label="Footer">
            <h2 className="sr-only">MR.KCRONUS</h2>
            <ul className="flex flex-wrap gap-x-8">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="meta inline-flex min-h-11 items-center text-ivory/55 transition-colors duration-200 ease-archive hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="meta mt-10 text-ivory/55 md:mt-14">© MR.KCRONUS</p>
      </div>
    </footer>
  );
}
