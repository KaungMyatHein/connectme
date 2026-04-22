"use client";

import { useEffect, useRef } from "react";
import type QRCodeStylingType from "qr-code-styling";

export type QRStyle = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded";

export function StyledQR({
  value,
  size = 288,
  style = "rounded",
  fgColor = "#181614",
  bgColor = "#ffffff",
  logo,
}: {
  value: string;
  size?: number;
  style?: QRStyle;
  fgColor?: string;
  bgColor?: string;
  logo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStylingType | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled) return;

      const options = {
        width: size,
        height: size,
        type: "svg" as const,
        data: value,
        image: logo,
        margin: 0,
        qrOptions: { errorCorrectionLevel: "M" as const },
        dotsOptions: { type: style, color: fgColor },
        cornersSquareOptions: { type: style === "dots" ? "dot" : "extra-rounded", color: fgColor },
        cornersDotOptions: { type: style === "dots" ? "dot" : "square", color: fgColor },
        backgroundOptions: { color: bgColor },
        imageOptions: { crossOrigin: "anonymous", margin: 4, imageSize: 0.3 },
      };

      if (!qrRef.current) {
        qrRef.current = new QRCodeStyling(options);
        if (ref.current) {
          ref.current.innerHTML = "";
          qrRef.current.append(ref.current);
        }
      } else {
        qrRef.current.update(options);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [value, size, style, fgColor, bgColor, logo]);

  return <div ref={ref} style={{ width: size, height: size }} />;
}
