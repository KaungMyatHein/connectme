import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function OfflinePage() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-[#f0e6d3] flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c8a96e]">No connection</p>
        <h1 className="mt-3 text-3xl font-bold">You are offline</h1>
        <p className="mt-3 text-sm text-[#f0e6d3]/60">
          Reconnect to view cards and edit your profile.
        </p>
      </div>
    </main>
  );
}
