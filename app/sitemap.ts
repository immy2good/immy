import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { reports } from "@/lib/research";

const base = "https://imyousafzai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${base}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/research`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research/log`, changeFrequency: "weekly", priority: 0.7 },
    ...reports.map((r) => ({
      url: `${base}/research/${r.slug}`,
      lastModified: r.date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/cv/cv.pdf`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
