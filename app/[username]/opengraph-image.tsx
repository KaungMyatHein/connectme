import { ImageResponse } from "next/og";
import { db } from "@/lib/db";
import { isReservedUsername } from "@/lib/auth";

export const alt = "Business card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const uname = username.toLowerCase();
  if (isReservedUsername(uname)) {
    return new ImageResponse(<div style={{ display: "flex" }} />, size);
  }
  const user = await db.user.findUnique({
    where: { username: uname },
    include: { card: true },
  });

  const firstName = user?.card?.firstName ?? "";
  const lastName = user?.card?.lastName ?? "";
  const title = user?.card?.title ?? "";
  const org = user?.card?.organization ?? "";
  const tagline = user?.card?.tagline ?? "";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(200,169,110,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(232,115,74,0.3), transparent 55%), #080808",
          color: "#f0e6d3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 28,
              background: "#c8a96e",
              color: "#181614",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: 700,
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.1 }}>
              {`${firstName} ${lastName}`.trim()}
            </div>
            {(title || org) && (
              <div style={{ marginTop: 8, fontSize: 36, color: "#c8a96e" }}>
                {[title, org].filter(Boolean).join(" · ")}
              </div>
            )}
            {tagline && (
              <div style={{ marginTop: 6, fontSize: 28, fontStyle: "italic", color: "rgba(240,230,211,0.6)" }}>
                {tagline}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 24,
            color: "rgba(240,230,211,0.5)",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {`/${uname}`}
        </div>
      </div>
    ),
    size,
  );
}
