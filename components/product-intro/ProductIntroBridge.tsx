export default function ProductIntroBridge() {
  return (
    <div
      data-scroll-section="bridge"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Ambient background pulse */}
      <div
        className="section-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#007bff]/6 blur-[140px] opacity-0"
        aria-hidden="true"
      />

      <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-6 opacity-0">
        The Ecosystem
      </p>
      <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.85] tracking-tight text-white">
        <span className="section-headline-line block opacity-0">More than</span>
        <span className="section-headline-line block opacity-0">a pen.</span>
      </h2>
      <p className="section-body mt-8 max-w-xl text-lg md:text-xl text-white/50 leading-relaxed opacity-0">
        A new kind of writing experience — where premium hardware meets an
        intelligent digital layer.
      </p>

      {/* Feature pillars preview */}
      <div className="section-details mt-16 grid grid-cols-3 gap-6 max-w-lg w-full opacity-0">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#ffbb33]/20 to-transparent border border-[#ffbb33]/15 flex items-center justify-center">
            <span className="text-[#ffbb33] text-sm">✦</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">AI Assist</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#00bfff]/20 to-transparent border border-[#00bfff]/15 flex items-center justify-center">
            <span className="text-[#00bfff] text-sm">⟳</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Smart Sync</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
            <span className="text-white/60 text-sm">◉</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Focus</p>
        </div>
      </div>
    </div>
  );
}
