export default function FeatureFocusMode() {
  return (
    <div
      data-scroll-section="focusMode"
      className="relative w-full min-h-screen flex flex-col items-center justify-end pb-20 px-6 overflow-hidden"
    >
      {/* Ambient glow — subtle vignette from below */}
      <div
        className="section-glow pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#ef233c]/4 blur-[100px] opacity-0"
        aria-hidden="true"
      />

      <div className="editorial-card corner-accent p-10 md:p-12 max-w-lg w-full text-center relative z-10">
        <p className="section-label font-inter text-[10px] uppercase tracking-[0.2em] text-[#ef233c] mb-5 opacity-0">
          Focus Mode
        </p>
        <h3 className="section-headline-line font-manrope text-3xl md:text-4xl font-bold text-white mb-5 leading-tight opacity-0">
          Silence the noise.
        </h3>
        <p className="section-body font-inter text-base text-zinc-500 leading-relaxed mb-8 opacity-0">
          A distraction-free writing mode that strips away everything but you and
          the page. Deep work, protected.
        </p>

        {/* Focus features grid */}
        <div className="section-details grid grid-cols-2 gap-3 opacity-0">
          <div className="editorial-border-dashed bg-white/2 p-4 text-left">
            <p className="font-inter text-xs text-white/70 font-medium mb-1">No notifications</p>
            <p className="font-inter text-[11px] text-zinc-700">Every alert silenced</p>
          </div>
          <div className="editorial-border-dashed bg-white/2 p-4 text-left">
            <p className="font-inter text-xs text-white/70 font-medium mb-1">Haptic timer</p>
            <p className="font-inter text-[11px] text-zinc-700">Gentle pulse every 25 min</p>
          </div>
          <div className="editorial-border-dashed bg-white/2 p-4 text-left">
            <p className="font-inter text-xs text-white/70 font-medium mb-1">Ambient breathing</p>
            <p className="font-inter text-[11px] text-zinc-700">LED soft rhythm cue</p>
          </div>
          <div className="editorial-border-dashed bg-white/2 p-4 text-left">
            <p className="font-inter text-xs text-white/70 font-medium mb-1">Session reports</p>
            <p className="font-inter text-[11px] text-zinc-700">Words, pace, flow score</p>
          </div>
        </div>

        {/* Stat accent */}
        <div className="section-stat mt-8 pt-6 border-t border-zinc-800 flex items-center justify-center gap-2 opacity-0">
          <span className="font-manrope text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff6b6b]">87%</span>
          <span className="font-inter text-xs text-zinc-600 uppercase tracking-wider">of users report deeper focus</span>
        </div>
      </div>
    </div>
  );
}
