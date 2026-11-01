import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#090a0b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          color: "#f59e0b",
          fontSize: "18px",
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
