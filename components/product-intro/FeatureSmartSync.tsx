export default function FeatureSmartSync() {
  return (
    <div
      data-scroll-section="smartSync"
      className="relative w-full min-h-screen flex items-center justify-start px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Ambient glow behind the card */}
      <div
        className="section-glow pointer-events-none absolute left-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#00bfff]/8 blur-[120px] opacity-0"
        aria-hidden="true"
      />

      <div className="glass-panel rounded-3xl p-10 md:p-12 max-w-md w-full relative z-10">
        <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-5 opacity-0">
          Smart Sync
        </p>
        <h3 className="section-headline-line font-heading text-3xl md:text-4xl font-semibold text-white mb-5 leading-tight opacity-0">
          Every stroke,<br />everywhere.
        </h3>
        <p className="section-body text-base text-white/55 leading-relaxed mb-8 opacity-0">
          Your writing lives across every device, in real time. Capture a thought
          on the pen, find it on your laptop seconds later.
        </p>

        {/* Sync flow visualization */}
        <div className="section-details opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-[#00bfff]/40 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#00bfff]/70">Sync pipeline</span>
            <div className="flex-1 h-px bg-gradient-to-l from-[#00bfff]/40 to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel rounded-xl p-4 text-center border-[#00bfff]/10">
              <div className="text-lg mb-1">✍️</div>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Capture</p>
              <p className="text-xs text-white/30 mt-1">On pen</p>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center border-[#00bfff]/10">
              <div className="text-lg mb-1">☁️</div>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Sync</p>
              <p className="text-xs text-white/30 mt-1">&lt;2s</p>
            </div>
            <div className="glass-panel rounded-xl p-4 text-center border-[#00bfff]/10">
              <div className="text-lg mb-1">💻</div>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Access</p>
              <p className="text-xs text-white/30 mt-1">Any device</p>
            </div>
          </div>
        </div>

        {/* Stat accent */}
        <div className="section-stat mt-8 pt-6 border-t border-white/5 flex items-baseline gap-2 opacity-0">
          <span className="text-3xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#00bfff] to-[#007bff]">∞</span>
          <span className="text-xs text-white/40 uppercase tracking-wider">devices connected seamlessly</span>
        </div>
      </div>
    </div>
  );
}
