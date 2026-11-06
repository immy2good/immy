import { reports, getReport } from "@/lib/research";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Strategy research by Immy Yousafzai";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const report = getReport((await params).slug);
  return ogImage({
    eyebrow: "Strategy research",
    title: report?.title ?? "Strategy research",
    metrics: report?.metrics,
  });
}
