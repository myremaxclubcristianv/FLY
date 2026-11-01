import { ImageResponse } from "next/og";

export const alt = "AIR — The Easiest Way to Fly";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090a0b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "sans-serif",
          color: "#f5f4f0",
          border: "1px solid #292c2f",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "28px", letterSpacing: "0.25em", fontWeight: 300, color: "#f5f4f0" }}>
            AIR
          </span>
          <span style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#5a8fa8", border: "1px solid #3d6578", padding: "4px 12px" }}>
            AVIATION ACCESS PLATFORM
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1 style={{ fontSize: "64px", fontWeight: 300, margin: 0, letterSpacing: "-0.02em" }}>
            THE EASIEST WAY TO FLY.
          </h1>
          <p style={{ fontSize: "24px", color: "#a7a9ac", margin: 0, fontWeight: 300 }}>
            Tell us where you&apos;re going. We&apos;ll find the right way to fly.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #292c2f", paddingTop: "24px" }}>
          <span style={{ fontSize: "14px", color: "#6b6e72" }}>
            BUCHAREST / ROMANIA // BĂNEASA HUB (LRBS / BBU)
          </span>
          <span style={{ fontSize: "14px", color: "#a7a9ac" }}>
            INDICATIVE DECISION DISCOVERY
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
