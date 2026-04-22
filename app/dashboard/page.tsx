import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { parseSocial } from "@/lib/card-data";
import { DashboardForm } from "./DashboardForm";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LogoutButton } from "./LogoutButton";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user || !user.card) redirect("/login");

  const card = {
    firstName: user.card.firstName,
    lastName: user.card.lastName,
    title: user.card.title,
    organization: user.card.organization,
    tagline: user.card.tagline,
    email: user.card.email,
    phone: user.card.phone,
    website: user.card.website,
    address: user.card.address,
    social: parseSocial(user.card.social),
    qrStyle: user.card.qrStyle,
  };

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your card</h1>
            <p className="mt-1 text-sm text-[#f0e6d3]/60">
              Public URL:{" "}
              <Link href={`/${user.username}`} className="text-[#c8a96e] hover:underline">
                /{user.username}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/qr"
              className="glass-chip px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f0e6d3]/10 transition-colors"
            >
              Show QR
            </Link>
            <LogoutButton />
          </div>
        </header>
        <DashboardForm initial={card} />
      </div>
    </main>
  );
}
