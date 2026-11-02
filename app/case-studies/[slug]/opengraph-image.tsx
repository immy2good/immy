import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study by Immy Yousafzai";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  return ogImage({
    eyebrow: study ? `Case study · ${study.category}` : "Case study",
    title: study?.cardTitle ?? "Case study",
    footer: "imyousafzai.com",
  });
}
