import Link from "next/link";
import Symbol from "@/components/brand/Symbol";
import Wordmark from "@/components/brand/Wordmark";

/**
 * Institutional footer.
 *
 * Asymmetric editorial layout rather than an ecommerce footer. No
 * newsletter, no email capture, no invented contact details, address,
 * founder information, press or testimonials.
 *
 * SOCIAL is rendered as a plain label with no link, because no verified
 * account URL has been supplied. Inventing one would be fabrication.
 */

const LINKS = [
  { href: "/archive", label: "ARCHIVE" },
  { href: "/story", label: "STORY" },
  { href: "/about", label: "ABOUT" },
] as const;

export default function Footer() {
  return (
    /* The margin above the rule was md:mt-40 on top of JoinArchive's own
       lg:py-32, which measured as a 288px band of unbroken #050505 between the
       last section hairline and the footer border. The rule now sits directly
       above the footer's own padding, and the single mt-14 is the whole gap. */
    <footer className="border-t border-[--rule]">
      <div className="mx-auto max-w-[104rem] px-5 py-14 md:px-10 md:py-20 lg:px-14">
        {/* items-center so the short logo column is optically centred against
            the taller link column instead of hanging at the top of its cell. */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Symbol height={30} />
              <Wordmark width={140} />
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            {/* The footer stays on Obsidian. text-ivory/55 is the same
                palette treatment Nav.tsx uses, with 5.81:1 contrast, while
                remaining quieter than the gold active state. */}
            <h2 className="meta text-ivory/55 mb-5">MR.KCRONUS</h2>
            <ul className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="meta text-ivory/55 transition-colors duration-200 ease-archive hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL WAS CUT, NOT REWRITTEN.

              This previously read "NO VERIFIED ACCOUNT". Not inventing a social
              URL was correct; printing the absence of one was not - it is
              production language on a finished page, and it left the closing
              frame with a third of its width carrying nothing but a refusal.
              Nothing has been supplied to replace it with, and inventing a
              handle would be fabrication. The column is removed rather than
              filled, and the link column is allowed to breathe. */}
        </div>

        <hr className="rule mt-14 md:mt-20" />

        <p className="meta text-ivory/55 mt-6">© MR.KCRONUS</p>
      </div>
    </footer>
  );
}