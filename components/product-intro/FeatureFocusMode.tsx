export default function FeatureFocusMode() {
  return (
    <div
      data-scroll-section="focusMode"
      className="relative w-full min-h-screen flex flex-col items-center justify-end pb-20 px-6 overflow-hidden"
    >
      {/* Ambient glow — subtle vignette from below */}
      <div
        className="section-glow pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/3 blur-[100px] opacity-0"
        aria-hidden="true"
      />

      <div className="glass-panel rounded-3xl p-10 md:p-12 max-w-lg w-full text-center relative z-10">
        <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-5 opacity-0">
          Focus Mode
        </p>
        <h3 className="section-headline-line font-heading text-3xl md:text-4xl font-semibold text-white mb-5 leading-tight opacity-0">
          Silence the noise.
        </h3>
        <p className="section-body text-base text-white/55 leading-relaxed mb-8 opacity-0">
          A distraction-free writing mode that strips away everything but you and
          the page. Deep work, protected.
        </p>

        {/* Focus features grid */}
        <div className="section-details grid grid-cols-2 gap-4 opacity-0">
          <div className="glass-panel rounded-xl p-4">
            <p className="text-xs text-white/70 font-medium mb-1">No notifications</p>
            <p className="text-[11px] text-white/30">Every alert silenced</p>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <p className="text-xs text-white/70 font-medium mb-1">Haptic timer</p>
            <p className="text-[11px] text-white/30">Gentle pulse every 25 min</p>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <p className="text-xs text-white/70 font-medium mb-1">Ambient breathing</p>
            <p className="text-[11px] text-white/30">LED soft rhythm cue</p>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <p className="text-xs text-white/70 font-medium mb-1">Session reports</p>
            <p className="text-[11px] text-white/30">Words, pace, flow score</p>
          </div>
        </div>

        {/* Stat accent */}
        <div className="section-stat mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 opacity-0">
          <span className="text-3xl font-heading font-semibold text-white/90">87%</span>
          <span className="text-xs text-white/40 uppercase tracking-wider">of users report deeper focus</span>
        </div>
      </div>
    </div>
  );
}
