import type { Metadata } from "next";

/** Route-specific search and share metadata without inventing page content. */
export function routeMetadata(
  title: string,
  canonicalPath: `/${string}`,
  description: string,
): Metadata {
  const pageTitle = `${title} — MR.KCRONUS`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      siteName: "MR.KCRONUS",
      title: pageTitle,
      locale: "en",
      description,
      url: canonicalPath,
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description,
    },
  };
}
