import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/split", priority: 0.9 },
    { path: "/how-to-use", priority: 0.7 },
    { path: "/faq", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
