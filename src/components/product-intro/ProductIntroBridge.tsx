export default function ProductIntroBridge() {
  return (
    <div
      data-scroll-section="bridge"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Ambient background pulse */}
      <div
        className="section-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#ef233c]/5 blur-[140px] opacity-0"
        aria-hidden="true"
      />

      <p className="section-label font-inter text-[10px] uppercase tracking-[0.2em] text-[#ef233c] mb-6 opacity-0">
        The Ecosystem
      </p>
      <h2 className="font-manrope text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.85] tracking-tight text-white">
        <span className="section-headline-line block opacity-0">More than</span>
        <span className="section-headline-line block opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">a pen.</span>
      </h2>
      <p
        className="section-body font-inter mt-8 max-w-2xl rounded-sm border border-white/10 bg-black/35 px-5 py-3 text-lg leading-relaxed text-zinc-200 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-sm md:text-xl opacity-0"
      >
        A new kind of writing experience — where premium hardware meets an
        intelligent digital layer.
      </p>

      {/* Feature pillars preview — dashed border cards with corner accents */}
      <div className="section-details mt-16 grid grid-cols-3 gap-4 max-w-lg w-full opacity-0">
        <div className="editorial-card corner-accent text-center p-5">
          <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center border border-[#ef233c]/30 bg-[#ef233c]/5">
            <span className="text-[#ef233c] text-sm font-bold">✦</span>
          </div>
          <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">AI Assist</p>
        </div>
        <div className="editorial-card corner-accent text-center p-5">
          <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center border border-zinc-700/50 bg-white/3">
            <span className="text-zinc-400 text-sm">⟳</span>
          </div>
          <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Smart Sync</p>
        </div>
        <div className="editorial-card corner-accent text-center p-5">
          <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center border border-zinc-700/50 bg-white/3">
            <span className="text-zinc-400 text-sm">◉</span>
          </div>
          <p className="font-inter text-[10px] uppercase tracking-widest text-zinc-500">Focus</p>
        </div>
      </div>
    </div>
  );
}
