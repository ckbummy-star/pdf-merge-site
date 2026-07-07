import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/split", priority: 0.9 },
    { path: "/guide", priority: 0.8 },
    { path: "/how-to-use", priority: 0.7 },
    { path: "/faq", priority: 0.7 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/terms", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
    }),
  );

  const guideEntries: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE_URL}/guide/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...guideEntries];
}
