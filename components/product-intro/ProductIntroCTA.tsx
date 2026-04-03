'use client';

export default function ProductIntroCTA() {
  return (
    <div className="cta-block relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,35,60,0.06),transparent_60%)]"
        aria-hidden="true"
      />

      <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-[#ef233c] mb-6">
        Private Beta
      </p>
      <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
        Ready to write<br />differently?
      </h2>
      <p className="font-inter max-w-md text-base text-zinc-500 leading-relaxed mb-10">
        Join the early access program and be among the first to experience the future of writing.
      </p>

      <div className="border-gradient-spin">
        <button className="cursor-pointer py-4 px-10 bg-[#ef233c] text-white font-inter text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-[#ef233c] transition-all duration-200">
          Join the Private Beta
        </button>
      </div>

      <p className="font-inter mt-6 text-xs text-zinc-700 uppercase tracking-widest">
        Limited spots available. Early access waves closing soon.
      </p>
    </div>
  );
}
