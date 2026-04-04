import { Zap, Brain, Shield } from 'lucide-react';
import FloatingBadges, { type BadgeData } from './FloatingBadges';

const aiWritingBadges: BadgeData[] = [
  { icon: Zap, value: '<200ms', label: 'AI Response', description: 'Real-time inference' },
  { icon: Brain, value: '64KB', label: 'Style Memory', description: 'Context-aware patterns' },
  { icon: Shield, value: 'Local', label: 'Processing', description: 'Words never leave the pen' },
];

export default function FeatureAIWriting() {
  return (
    <div
      data-scroll-section="aiWriting"
      className="relative w-full min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Ambient glow behind the card */}
      <div
        className="section-glow pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#ef233c]/6 blur-[120px] opacity-0"
        aria-hidden="true"
      />

      {/* Floating spec badges — center gap, staggered entrance */}
      <FloatingBadges badges={aiWritingBadges} side="right" className="floating-badge-group" />

      <div className="editorial-card corner-accent p-10 md:p-12 max-w-md w-full relative z-10">
        <p className="section-label font-inter text-[10px] uppercase tracking-[0.2em] text-[#ef233c] mb-5 opacity-0">
          AI Writing Assist
        </p>
        <h3 className="section-headline-line font-manrope text-3xl md:text-4xl font-bold text-white mb-5 leading-tight opacity-0">
          Write. Refine.<br />Evolve.
        </h3>
        <p className="section-body font-inter text-base text-zinc-500 leading-relaxed mb-8 opacity-0">
          Intelligent suggestions that sharpen your clarity without breaking your
          flow. The pen learns your style, suggests refinements, and keeps your
          voice intact.
        </p>

        {/* Feature bullets */}
        <ul className="section-details space-y-4 opacity-0">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#ef233c]" />
            <span className="font-inter text-sm text-zinc-500 leading-relaxed">
              <span className="text-white/80 font-medium">Context-aware grammar</span> — fixes that respect your tone and intent
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#ef233c]" />
            <span className="font-inter text-sm text-zinc-500 leading-relaxed">
              <span className="text-white/80 font-medium">Style memory</span> — adapts to your unique writing patterns over time
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#ef233c]" />
            <span className="font-inter text-sm text-zinc-500 leading-relaxed">
              <span className="text-white/80 font-medium">Privacy-first</span> — on-device processing, your words never leave the pen
            </span>
          </li>
        </ul>

        {/* Stat accent */}
        <div className="section-stat mt-8 pt-6 border-t border-zinc-800 flex items-baseline gap-2 opacity-0">
          <span className="font-manrope text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff6b6b]">3×</span>
          <span className="font-inter text-xs text-zinc-600 uppercase tracking-wider">faster editing workflow</span>
        </div>
      </div>
    </div>
  );
}
