import { ImageResponse } from "next/og";

// Share cards for LinkedIn, Slack, X and the like, in the site's palette: eyebrow, headline, up to three numbers.
export const ogSize = { width: 1200, height: 630 };

type Metric = { value: string; label: string };

export function ogImage({ eyebrow, title, metrics = [] }: { eyebrow: string; title: string; metrics?: Metric[] }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#08090b",
          color: "#f2f2f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#4d8dff" }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderTop: "1px solid #1c1f24", paddingTop: 28 }}>
          <div style={{ display: "flex", gap: 56 }}>
            {metrics.slice(0, 3).map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 44, fontFamily: "monospace", color: "#f2f2f0" }}>{m.value}</span>
                <span style={{ fontSize: 20, color: "#8a8f98", marginTop: 4 }}>{m.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: 24 }}>
            <span style={{ fontWeight: 700 }}>Immy Yousafzai</span>
            <span style={{ color: "#8a8f98", marginTop: 4 }}>imyousafzai.com</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
