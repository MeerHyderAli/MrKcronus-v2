import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/* Display / editorial face.
   High-contrast didone. Variable weight axis retained; the display range
   (500-600) is enforced via the .display utility in globals.css because
   hairline strokes disappear against Obsidian at lighter weights. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

/* Meta / institutional face.
   Used ONLY as uppercase wide-tracked small metadata, never as a
   general-purpose interface typeface. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://mrkcronus.com";
const DESCRIPTION =
  "MR.KCRONUS. A world built through symbols, architecture and form.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MR.KCRONUS",
    template: "%s — MR.KCRONUS",
  },
  description: DESCRIPTION,
  applicationName: "MR.KCRONUS",
  keywords: [
    "MR.KCRONUS",
    "the archive",
    "the architect",
    "the sigil",
    "the enemy",
    "symbol",
    "archival",
  ],
  openGraph: {
    type: "website",
    siteName: "MR.KCRONUS",
    title: "MR.KCRONUS",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "MR.KCRONUS",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

/**
 * VIEWPORT
 *
 * Declared separately from `metadata` because Next owns this key: putting
 * `viewport` inside the metadata object is ignored, and a hand-written
 * <meta viewport> in the tree would be emitted twice. This export is the
 * supported API for the installed Next 16 App Router and emits exactly one tag.
 *
 * `viewportFit: "cover"` lets the layout extend under a display notch or a
 * rounded corner, which is what makes the safe-area insets Nav.tsx reads
 * meaningful. Without it the browser letterboxes to the safe area and those
 * insets are always zero, so the header could still sit under a cutout.
 *
 * `themeColor` is scoped to the default (light) scheme because MR.KCRONUS
 * presents an editorial page that can legitimately be viewed either way; the
 * dark variant is declared for dark mode below rather than forced everywhere.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link meta">
          Skip to content
        </a>
        <Nav />
        {/* pt offsets the fixed header so no route starts underneath it */}
        <main id="main" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}