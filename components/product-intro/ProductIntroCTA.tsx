'use client';

export default function ProductIntroCTA() {
  return (
    <div className="cta-block flex flex-col items-center justify-center text-center mt-24 pt-16 border-t border-white/5">
      <button className="cursor-pointer py-4 px-8 bg-[#007bff] rounded-xl text-white text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-[#007bff] transition-all duration-300 shadow-lg shadow-blue-900/40">
        Join the Private Beta
      </button>
      <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest">
        Limited spots available. Early access waves closing soon.
      </p>
    </div>
  );
}
