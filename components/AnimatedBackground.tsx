export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[55vh] w-[55vh] rounded-full bg-[#c8a96e]/18 blur-[140px] animate-blob" />
      <div className="absolute -bottom-40 -right-32 h-[60vh] w-[60vh] rounded-full bg-[#e8734a]/14 blur-[140px] animate-blob animation-delay-1" />
      <div className="absolute top-1/3 left-1/2 h-[45vh] w-[45vh] -translate-x-1/2 rounded-full bg-[#f0e6d3]/[0.06] blur-[140px] animate-blob animation-delay-2" />
    </div>
  );
}
