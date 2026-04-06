import Link from 'next/link';
import {
  TECH_STACK_CARDS,
  PROJECT_STATS,
  PRODUCT_HIGHLIGHTS,
  GITHUB_URL,
  PRODUCT_DESCRIPTION,
} from '@/lib/about/aboutData';

export default function AboutSection() {
  const codestats = PROJECT_STATS.filter((s) => s.category === 'codebase');
  const productstats = PROJECT_STATS.filter((s) => s.category === 'product');
  const descParagraphs = PRODUCT_DESCRIPTION.trim().split('\n\n');

  return (
    <section
      id="about"
      className="relative w-full bg-[#050a14] py-24 lg:py-32 scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center">
          {/* Chip tag */}
          <span className="glass-panel mb-6 inline-block rounded-full border border-[#007bff]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#007bff]">
            Smart Pen Platform
          </span>

          {/* H2 heading */}
          <h2 className="font-manrope mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            About the{' '}
            <span className="text-[#007bff]">Project</span>
          </h2>

          {/* Subheadline */}
          <p className="font-inter max-w-2xl text-lg leading-relaxed text-white/70">
            A full-stack showcase of modern web tech — AI, 3D, and buttery
            animations wrapped around a smart pen product concept.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* LEFT: description + highlights */}
          <div className="flex flex-col gap-8">
            {/* Description paragraphs */}
            <div className="flex flex-col gap-4">
              {descParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-inter text-base leading-7 text-white/70"
                >
                  {para.trim()}
                </p>
              ))}
            </div>

            {/* Product highlights */}
            <ul className="flex flex-col gap-3">
              {PRODUCT_HIGHLIGHTS.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#007bff]/20 text-xs text-[#007bff]">
                    ✓
                  </span>
                  <span className="font-inter text-sm leading-6 text-white/80">
                    {highlight.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: tech stack cards + stats */}
          <div className="flex flex-col gap-8">
            {/* Tech stack cards grid */}
            <div>
              <h3 className="font-manrope mb-4 text-sm font-semibold uppercase tracking-widest text-[#007bff]">
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {TECH_STACK_CARDS.map((card) => (
                  <div
                    key={card.name}
                    className="glass-panel flex flex-col gap-2 rounded-xl border border-[#007bff]/20 p-4"
                  >
                    <span className="text-2xl leading-none">{card.icon}</span>
                    <span className="font-manrope text-sm font-semibold text-white">
                      {card.name}
                    </span>
                    <span className="font-inter text-xs leading-5 text-white/55">
                      {card.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div className="glass-panel rounded-2xl border border-[#007bff]/20 p-6">
              {/* Codebase stats */}
              <p className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-[#007bff]">
                Codebase
              </p>
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {codestats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-manrope text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="font-inter text-xs text-white/50">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-5 h-px bg-white/10" />

              {/* Product stats */}
              <p className="font-manrope mb-3 text-xs font-semibold uppercase tracking-widest text-[#007bff]">
                Product
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {productstats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-manrope text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="font-inter text-xs text-white/50">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/beta"
            className="inline-flex items-center gap-2 rounded-full bg-[#007bff] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join Private Beta
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#007bff]/60 px-7 py-3 text-sm font-semibold text-[#007bff] transition-colors hover:border-[#007bff] hover:bg-[#007bff]/10"
          >
            View on GitHub
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
