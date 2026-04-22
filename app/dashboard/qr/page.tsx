import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { QRClient } from "./QRClient";
import type { QRStyle } from "@/components/StyledQR";

export default async function DashboardQrPage() {
  const user = await getCurrentUser();
  if (!user || !user.card) redirect("/login");

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] flex flex-col items-center justify-center gap-8 p-6 overflow-hidden print:bg-white print:text-neutral-900 print:p-0">
      <div className="print:hidden">
        <AnimatedBackground />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c8a96e] print:text-neutral-500">Scan to save my contact</p>
          <h1 className="mt-3 text-3xl font-bold text-[#f0e6d3] print:text-neutral-900">
            {user.card.firstName} {user.card.lastName}
          </h1>
          {(user.card.title || user.card.organization) ? (
            <p className="text-sm text-[#f0e6d3]/70 print:text-neutral-600">
              {user.card.title}
              {user.card.title && user.card.organization ? " · " : ""}
              {user.card.organization}
            </p>
          ) : null}
        </div>

        <QRClient username={user.username} qrStyle={user.card.qrStyle as QRStyle} />

        <Link
          href="/dashboard"
          className="glass-chip print:hidden px-5 py-2 rounded-lg text-sm font-medium text-[#f0e6d3] hover:bg-[#f0e6d3]/10 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
