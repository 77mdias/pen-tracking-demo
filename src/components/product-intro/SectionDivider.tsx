export default function SectionDivider() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 w-full overflow-hidden" aria-hidden="true">
      {/* Gradient line */}
      <div className="relative w-full max-w-2xl flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ef233c] to-transparent opacity-60" />
      </div>

      {/* Animated center dot */}
      <div className="absolute flex items-center justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef233c] opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef233c]" />
        </span>
      </div>
    </div>
  );
}
