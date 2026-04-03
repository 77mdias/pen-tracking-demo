export default function FeatureAIWriting() {
  return (
    <div
      data-scroll-section="aiWriting"
      className="relative w-full min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Ambient glow behind the card */}
      <div
        className="section-glow pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#ffbb33]/8 blur-[120px] opacity-0"
        aria-hidden="true"
      />

      <div className="glass-panel rounded-3xl p-10 md:p-12 max-w-md w-full relative z-10">
        <p className="section-label text-[10px] uppercase tracking-[0.2em] text-[#007bff] mb-5 opacity-0">
          AI Writing Assist
        </p>
        <h3 className="section-headline-line font-heading text-3xl md:text-4xl font-semibold text-white mb-5 leading-tight opacity-0">
          Write. Refine.<br />Evolve.
        </h3>
        <p className="section-body text-base text-white/55 leading-relaxed mb-8 opacity-0">
          Intelligent suggestions that sharpen your clarity without breaking your
          flow. The pen learns your style, suggests refinements, and keeps your
          voice intact.
        </p>

        {/* Feature bullets */}
        <ul className="section-details space-y-4 opacity-0">
          <li className="flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#ffbb33]/30 to-[#ffbb33]/5 border border-[#ffbb33]/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffbb33]" />
            </span>
            <span className="text-sm text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Context-aware grammar</span> — fixes that respect your tone and intent
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#ffbb33]/30 to-[#ffbb33]/5 border border-[#ffbb33]/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffbb33]" />
            </span>
            <span className="text-sm text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Style memory</span> — adapts to your unique writing patterns over time
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#ffbb33]/30 to-[#ffbb33]/5 border border-[#ffbb33]/20 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffbb33]" />
            </span>
            <span className="text-sm text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Privacy-first</span> — on-device processing, your words never leave the pen
            </span>
          </li>
        </ul>

        {/* Stat accent */}
        <div className="section-stat mt-8 pt-6 border-t border-white/5 flex items-baseline gap-2 opacity-0">
          <span className="text-3xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ffbb33] to-[#ff8800]">3×</span>
          <span className="text-xs text-white/40 uppercase tracking-wider">faster editing workflow</span>
        </div>
      </div>
    </div>
  );
}
