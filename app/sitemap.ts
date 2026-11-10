import type { MetadataRoute } from "next";
import { pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: pageUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: pageUrl("/shows"), changeFrequency: "daily", priority: 0.9 },
    { url: pageUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
