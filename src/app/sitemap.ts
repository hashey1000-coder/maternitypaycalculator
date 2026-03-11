import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides-data";
import { CALCULATORS, SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const guideUrls = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}/`,
    lastModified: new Date(guide.updatedDate),
    changeFrequency: "monthly" as const,
    priority: guide.featured ? 0.8 : 0.7,
  }));

  const calculatorUrls = CALCULATORS.filter((c) => c.href !== "/").map(
    (calc) => ({
      url: `${baseUrl}${calc.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/calculators/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...calculatorUrls,
    ...guideUrls,
  ];
}
