import Link from 'next/link';
import {
  TECH_STACK_CARDS,
  PROJECT_STATS,
  PRODUCT_HIGHLIGHTS,
  GITHUB_URL,
  PRODUCT_DESCRIPTION,
} from '@/lib/about/aboutData';

type AboutSectionProps = {
  /**
   * `"home"` — compact single-fold, red accent (#ef233c), transparent bg (video shows through), integrates with pen scroll narrative.
   * `"alias"` — full DS2 blue (#007bff), bg-black, standalone.
   */
  variant?: 'home' | 'alias';
};

function TechIcon({ path, accent }: { path: string; accent: string }) {
  return (
    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function CornerMarkers({ color }: { color: string }) {
  const cls = `absolute w-2 h-2`;
  return (
    <>
      <div className={`${cls} top-0 left-0 border-t border-l`} style={{ borderColor: color }} />
      <div className={`${cls} top-0 right-0 border-t border-r`} style={{ borderColor: color }} />
      <div className={`${cls} bottom-0 left-0 border-b border-l`} style={{ borderColor: color }} />
      <div className={`${cls} bottom-0 right-0 border-b border-r`} style={{ borderColor: color }} />
    </>
  );
}

export default function AboutSection({ variant = 'home' }: AboutSectionProps) {
  const isHome = variant === 'home';
  const accent = isHome ? '#ef233c' : '#007bff';
  const codestats = PROJECT_STATS.filter((s) => s.category === 'codebase');
  const productstats = PROJECT_STATS.filter((s) => s.category === 'product');
  const descParagraphs = PRODUCT_DESCRIPTION.trim().split('\n\n');

  if (isHome) {
    return (
      <section
        id="about"
        className="relative flex min-h-screen w-full items-center py-12 lg:py-16 scroll-mt-28"
      >
        <div className="mx-auto w-full max-w-7xl px-6">
          {/* Compact header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="editorial-border-dashed mb-4 inline-block px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest font-bold" style={{ color: accent }}>
              [ Smart Pen Platform ]
            </span>
            <h2 className="font-manrope mb-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              About the{' '}
              <span style={{ color: accent }}>Project</span>
            </h2>
            <p className="font-inter max-w-2xl text-base leading-relaxed text-white/70">
              A full-stack showcase of modern web tech — AI, 3D, and buttery
              animations wrapped around a smart pen product concept.
            </p>
          </div>

          {/* Two-column grid — compact for single fold */}
          <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
            {/* LEFT: condensed description + highlights */}
            <div className="flex flex-col gap-4">
              <p className="font-inter text-sm leading-6 text-white/70">
                {descParagraphs[0]?.trim()}
              </p>
              <ul className="flex flex-col gap-2">
                {PRODUCT_HIGHLIGHTS.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-xs" style={{ color: accent }}>✓</span>
                    <span className="font-inter text-sm leading-5 text-white/80">{highlight.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: tech stack + stats — compact */}
            <div className="flex flex-col gap-4">
              {/* Tech stack */}
              <div>
                <h3 className="font-mono mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: accent }}>[ Tech Stack ]</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {TECH_STACK_CARDS.map((card) => (
                    <div
                      key={card.name}
                      className="corner-accent editorial-card flex flex-col gap-1.5 p-3 transition-all duration-500"
                    >
                      <TechIcon path={card.iconPath} accent={accent} />
                      <span className="font-manrope text-xs font-semibold text-white">{card.name}</span>
                      <span className="font-inter text-[10px] leading-4 text-white/50">{card.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats — single row, compact */}
              <div className="corner-accent editorial-card p-4">
                <div className="mb-3 grid grid-cols-4 gap-3">
                  {codestats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="font-manrope text-3xl font-medium text-white tracking-tighter">{stat.value}</span>
                      <span className="font-inter text-[10px] text-zinc-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-zinc-800/60" />
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {productstats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <span className="font-manrope text-3xl font-medium text-white tracking-tighter">{stat.value}</span>
                      <span className="font-inter text-[10px] text-zinc-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/beta"
              className="border-gradient-spin inline-flex items-center gap-2 px-7 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-all"
              style={{ backgroundColor: accent }}
            >
              Join Private Beta
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-zinc-700 px-7 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:text-white"
              style={{ ['--hover-border' as string]: accent }}
            >
              View on GitHub
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ── Alias variant (DS2 blue, full-height, standalone) ──
  return (
    <section
      id="about"
      className="relative w-full bg-black py-24 lg:py-32 scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-6 inline-block bg-black border border-zinc-800 border-dashed rounded-none px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#007bff] font-bold">[ Smart Pen Platform ]</span>
          <h2 className="font-manrope mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            About the{' '}
            <span className="text-[#007bff]">Project</span>
          </h2>
          <p className="font-inter max-w-2xl text-lg leading-relaxed text-white/70">
            A full-stack showcase of modern web tech — AI, 3D, and buttery
            animations wrapped around a smart pen product concept.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* LEFT: description + highlights */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {descParagraphs.map((para, i) => (
                <p key={i} className="font-inter text-base leading-7 text-white/70">{para.trim()}</p>
              ))}
            </div>
            <ul className="flex flex-col gap-3">
              {PRODUCT_HIGHLIGHTS.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-[#007bff]/20 text-xs text-[#007bff]">✓</span>
                  <span className="font-inter text-sm leading-6 text-white/80">{highlight.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: tech stack cards + stats */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-mono mb-4 text-[10px] font-bold uppercase tracking-widest text-[#007bff]">[ Tech Stack ]</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {TECH_STACK_CARDS.map((card) => (
                  <div
                    key={card.name}
                    className="relative flex flex-col gap-2 bg-black border border-zinc-800 border-dashed rounded-none p-4 group hover:border-[#007bff]/50 transition-all duration-500"
                  >
                    <CornerMarkers color="#007bff" />
                    <TechIcon path={card.iconPath} accent="#007bff" />
                    <span className="font-manrope text-sm font-semibold text-white">{card.name}</span>
                    <span className="font-inter text-xs leading-5 text-white/55">{card.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div className="relative bg-black border border-zinc-800 border-dashed rounded-none p-6">
              <CornerMarkers color="#007bff" />
              <p className="font-mono mb-3 text-[10px] font-bold uppercase tracking-widest text-[#007bff]">[ Codebase ]</p>
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {codestats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-manrope text-5xl font-medium text-white tracking-tighter">{stat.value}</span>
                    <span className="font-inter text-xs text-zinc-400">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="mb-5 h-px bg-zinc-800" />
              <p className="font-mono mb-3 text-[10px] font-bold uppercase tracking-widest text-[#007bff]">[ Product ]</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {productstats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-manrope text-5xl font-medium text-white tracking-tighter">{stat.value}</span>
                    <span className="font-inter text-xs text-zinc-400">{stat.label}</span>
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
            className="inline-flex items-center gap-2 rounded-none bg-transparent border border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white px-7 py-4 text-[11px] font-bold uppercase tracking-widest transition-all"
          >
            Join Private Beta
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-none border border-zinc-700 px-7 py-4 text-[11px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#007bff] hover:text-white"
          >
            View on GitHub
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
