"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      }}
      className="glass-chip px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f0e6d3]/10 transition-colors"
    >
      Log out
    </button>
  );
}
