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
    <footer className="mt-24 border-t border-[--rule] md:mt-40">
      <div className="mx-auto max-w-[104rem] px-5 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Symbol height={30} />
              <Wordmark width={140} />
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="meta meta-stone mb-5">MR.KCRONUS</h2>
            <ul className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="meta text-stone transition-colors duration-200 ease-archive hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4 md:text-right">
            <h2 className="meta meta-stone mb-5">SOCIAL</h2>
            <p className="meta text-stone">NO VERIFIED ACCOUNT</p>
          </div>
        </div>

        <hr className="rule mt-14 md:mt-20" />

        <p className="meta meta-stone mt-6">© MR.KCRONUS</p>
      </div>
    </footer>
  );
}