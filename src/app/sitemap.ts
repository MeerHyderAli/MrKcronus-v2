import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/archive", "/story", "/about"].map((path) => ({
    url: `https://www.mrkcronus.com${path}`,
  }));
}
