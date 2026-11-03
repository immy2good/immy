import { ogImage, ogSize } from "@/lib/og";

export const alt = "Immy Yousafzai: trading tools and AI systems that do real work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "MQL5 · Pine Script · AI agent engineering",
    title: "Trading tools & AI systems that do real work.",
    metrics: [
      { value: "2011", label: "building since" },
      { value: "3,000+", label: "customers" },
      { value: "21 + 8", label: "indicators and EAs" },
    ],
  });
}
