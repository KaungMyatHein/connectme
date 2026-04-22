"use client";

import { useEffect, useState } from "react";
import { StyledQR, type QRStyle } from "@/components/StyledQR";

export function QRClient({ username, qrStyle }: { username: string; qrStyle: QRStyle }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const base = `${window.location.protocol}//${window.location.host}`;
    setUrl(`${base}/${username}`);
  }, [username]);

  return (
    <>
      <div className="glass p-6 rounded-2xl print:bg-white print:shadow-none print:ring-1 print:ring-neutral-200">
        {url ? (
          <StyledQR value={url} size={288} style={qrStyle} fgColor="#f0e6d3" bgColor="transparent" />
        ) : (
          <div className="h-72 w-72" />
        )}
      </div>
      <button
        onClick={() => window.print()}
        className="glass-chip print:hidden px-5 py-2 rounded-lg text-sm font-medium text-[#f0e6d3] hover:bg-[#f0e6d3]/10 transition-colors"
      >
        Print QR
      </button>
    </>
  );
}
