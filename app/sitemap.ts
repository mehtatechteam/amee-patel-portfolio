import type { MetadataRoute } from "next";
import { SITE_URL, SITE_LAST_MODIFIED } from "@/lib/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
