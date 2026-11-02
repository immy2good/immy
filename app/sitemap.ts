import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const base = "https://imyousafzai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${base}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/cv/cv.pdf`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
