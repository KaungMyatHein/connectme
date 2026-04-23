import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 110,
            height: 78,
            background: "#c8a96e",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 12,
            gap: 6,
          }}
        >
          <div style={{ width: "55%", height: 6, background: "#181614", borderRadius: 3 }} />
          <div style={{ width: "75%", height: 6, background: "#181614", borderRadius: 3 }} />
          <div style={{ width: "40%", height: 6, background: "#181614", borderRadius: 3 }} />
        </div>
      </div>
    ),
    size,
  );
}
