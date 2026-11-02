import { ImageResponse } from "next/og";

// Share cards for LinkedIn, Slack, X and the like. Plain dark card, site name, one headline.
export const ogSize = { width: 1200, height: 630 };

export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#a3a3a3" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 68, fontWeight: 700, lineHeight: 1.12 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#d4d4d4" }}>
          <span>Immy Yousafzai</span>
          <span style={{ color: "#a3a3a3" }}>{footer}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
