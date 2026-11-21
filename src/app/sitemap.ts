import type { MetadataRoute } from "next";
import { COLLECTION } from "@/components/collection/collectionData";

export default function sitemap(): MetadataRoute.Sitemap {
  const designs = COLLECTION.map(({ slug }) => `/collection/${slug}`);
  return ["", "/archive", "/story", "/about", ...designs].map((path) => ({
    url: `https://www.mrkcronus.com${path}`,
  }));
}
