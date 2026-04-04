import { CloudSync, MonitorSmartphone, PenLine, Zap, BatteryCharging, Feather } from 'lucide-react';
import FloatingBadges, { type BadgeData } from './FloatingBadges';

const smartSyncBadges: BadgeData[] = [
  { icon: Zap, value: 'BLE 5.3', label: 'Connectivity', description: 'Low-latency bridge' },
  { icon: BatteryCharging, value: '10h+', label: 'Battery Life', description: '45-min full charge' },
  { icon: Feather, value: '15g', label: 'Weight', description: 'Featherlight precision' },
];

export default function FeatureSmartSync() {
  return (
    <div
      data-scroll-section="smartSync"
      className="relative w-full min-h-screen flex items-center justify-start px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Ambient glow behind the card */}
      <div
        className="section-glow pointer-events-none absolute left-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#ef233c]/5 blur-[120px] opacity-0"
        aria-hidden="true"
      />

      {/* Floating spec badges — center gap, staggered entrance */}
      <FloatingBadges badges={smartSyncBadges} side="left" className="floating-badge-group" />

      <div className="editorial-card corner-accent p-10 md:p-12 max-w-md w-full relative z-10">
        <p className="section-label font-inter text-[10px] uppercase tracking-[0.2em] text-[#ef233c] mb-5 opacity-0">
          Smart Sync
        </p>
        <h3 className="section-headline-line font-manrope text-3xl md:text-4xl font-bold text-white mb-5 leading-tight opacity-0">
          Every stroke,<br />everywhere.
        </h3>
        <p className="section-body font-inter text-base text-zinc-500 leading-relaxed mb-8 opacity-0">
          Your writing lives across every device, in real time. Capture a thought
          on the pen, find it on your laptop seconds later.
        </p>

        {/* Sync flow visualization */}
        <div className="section-details opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-[#ef233c]/30 to-transparent" />
            <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-zinc-600">Sync pipeline</span>
            <div className="flex-1 h-px bg-gradient-to-l from-[#ef233c]/30 to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="editorial-border-dashed bg-white/2 p-4 text-center hover:border-[#ef233c]/30 transition-colors duration-300">
              <div className="mb-1 flex justify-center text-[#ef233c]" aria-hidden="true">
                <PenLine className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>
              <p className="font-inter text-[10px] uppercase tracking-wider text-zinc-500">Capture</p>
              <p className="font-inter text-xs text-zinc-700 mt-1">On pen</p>
            </div>
            <div className="editorial-border-dashed bg-white/2 p-4 text-center hover:border-[#ef233c]/30 transition-colors duration-300">
              <div className="mb-1 flex justify-center text-[#ef233c]" aria-hidden="true">
                <CloudSync className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>
              <p className="font-inter text-[10px] uppercase tracking-wider text-zinc-500">Sync</p>
              <p className="font-inter text-xs text-zinc-700 mt-1">&lt;2s</p>
            </div>
            <div className="editorial-border-dashed bg-white/2 p-4 text-center hover:border-[#ef233c]/30 transition-colors duration-300">
              <div className="mb-1 flex justify-center text-[#ef233c]" aria-hidden="true">
                <MonitorSmartphone className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>
              <p className="font-inter text-[10px] uppercase tracking-wider text-zinc-500">Access</p>
              <p className="font-inter text-xs text-zinc-700 mt-1">Any device</p>
            </div>
          </div>
        </div>

        {/* Stat accent */}
        <div className="section-stat mt-8 pt-6 border-t border-zinc-800 flex items-baseline gap-2 opacity-0">
          <span className="font-manrope text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ef233c] to-[#ff6b6b]">∞</span>
          <span className="font-inter text-xs text-zinc-600 uppercase tracking-wider">devices connected seamlessly</span>
        </div>
      </div>
    </div>
  );
}
