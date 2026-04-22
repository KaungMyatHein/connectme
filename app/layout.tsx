import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtual Business Card",
  description: "Scan, view, and save a digital business card to your device.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
