'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Product', href: '/' },
  { label: 'Beta', href: '/beta' },
  { label: 'Sign in', href: '/auth' },
];

function isPathLinkActive(pathname: string, href: string): boolean {
  return pathname === href;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      rafId = window.requestAnimationFrame(updateScrollState);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.removeProperty('overflow');
      return;
    }

    document.body.style.setProperty('overflow', 'hidden');

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const navShellClassName = useMemo(() => {
    const base =
      'ds2-nav-shell relative w-full max-w-6xl rounded-none border px-3 py-2 shadow-2xl backdrop-blur-lg transition-all duration-300';

    if (isScrolled) {
      return `${base} border-zinc-700 bg-black/80 shadow-black/60`;
    }

    return `${base} border-zinc-800 bg-black/50 shadow-black/35`;
  }, [isScrolled]);

  const handleHomeReentry = (event: MouseEvent<HTMLAnchorElement>) => {
    const isPrimaryClick = event.button === 0;
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

    if (!isPrimaryClick || hasModifier) {
      return;
    }

    setIsMobileMenuOpen(false);

    if (pathname !== '/') {
      return;
    }

    event.preventDefault();
    window.location.reload();
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 md:pt-6">
      <nav className={`${navShellClassName} pointer-events-auto`} aria-label="Global">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <Link
            href="/"
            className="justify-self-start flex items-center gap-3"
            aria-label="PenFlow77 home"
            onClick={handleHomeReentry}
          >
            <span className="grid h-6 w-6 grid-cols-2 gap-1 opacity-90" aria-hidden="true">
              <span className="rounded-sm bg-[#ef233c]" />
              <span className="rounded-sm bg-zinc-700" />
              <span className="rounded-sm bg-zinc-800" />
              <span className="rounded-sm bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
            </span>
            <span className="font-manrope text-lg font-semibold tracking-tight text-white md:text-xl">PenFlow77</span>
          </Link>

          <div className="hidden items-center justify-center gap-6 md:flex md:justify-self-center">
            {NAV_ITEMS.map((item) => {
              const active = isPathLinkActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-header-link text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  onClick={item.href === '/' ? handleHomeReentry : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="justify-self-end flex items-center gap-2">
            <Link
              href="/beta"
              className="hidden border border-zinc-700 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white md:inline-flex"
            >
              Join Beta
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-zinc-700 bg-black/20 text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-global-nav"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div id="mobile-global-nav" className="mt-2 border border-zinc-800 bg-black/95 p-4 md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = isPathLinkActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border px-3 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'border-[#ef233c]/60 bg-[#ef233c]/10 text-white'
                        : 'border-zinc-800 text-zinc-300 hover:border-[#ef233c]/40 hover:text-white'
                    }`}
                    onClick={item.href === '/' ? handleHomeReentry : () => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t border-zinc-800 pt-4">
              <Link
                href="/beta"
                className="inline-flex w-full items-center justify-center border border-zinc-700 bg-black/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-300 transition-colors hover:border-[#ef233c] hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Beta
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
