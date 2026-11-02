import { ogImage, ogSize } from "@/lib/og";

export const alt = "Immy Yousafzai: trading tools and AI systems that do real work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "MQL5 · Pine Script · AI agent engineering",
    title: "I build trading tools and AI systems that do real work.",
    footer: "imyousafzai.com",
  });
}
