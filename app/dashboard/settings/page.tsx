import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SettingsForms } from "./SettingsForms";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <header className="mb-8">
          <Link href="/dashboard" className="text-sm text-[#c8a96e] hover:underline">← Dashboard</Link>
          <h1 className="mt-3 text-2xl font-bold">Account settings</h1>
          <p className="mt-1 text-sm text-[#f0e6d3]/60">Signed in as {user.email}</p>
        </header>
        <SettingsForms currentEmail={user.email} />
      </div>
    </main>
  );
}
