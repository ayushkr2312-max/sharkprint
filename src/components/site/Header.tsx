'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SharkMark } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

// The homepage's own rooms. From any other page the same links lead back to them.
const NAV = [
  ['Engine', 'engine'],
  ['Intel', 'intel'],
  ['Command', 'command'],
  ['Forge', 'forge'],
  ['Insiders', 'insiders'],
] as const;

/** One floating capsule: the mark, and the homepage's rooms with a marker that slides to
 *  the one you're in. It steps aside while you scroll down and comes back as soon as you
 *  scroll up. Phones fold the rooms into a sheet. */
export function Header() {
  const pathname = usePathname();
  const home = pathname === '/';
  const [inView, setInView] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const active = home ? inView : null;

  // The room in the middle of the screen (pinned rooms sit inside their pin spacers).
  useEffect(() => {
    if (!home) return;
    const ids = new Set<string>(NAV.map(([, id]) => id));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setInView(ids.has(e.target.id) ? e.target.id : null); });
    }, { rootMargin: '-48% 0px -48% 0px' });
    document.querySelectorAll('main [data-room][id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  // The marker slides under the active link.
  useEffect(() => {
    const m = marker.current;
    const a = active ? list.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!m) return;
    m.style.opacity = a ? '1' : '0';
    if (a) {
      m.style.width = a.offsetWidth + 'px';
      m.style.transform = `translateX(${a.offsetLeft}px)`;
    }
  }, [active]);

  useEffect(() => {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY, dy = y - lastY;
      if (Math.abs(dy) < 6) return;
      setHidden(dy > 0 && y > 160);
      lastY = y;
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('keydown', onKey);
    };
  }, []);

  const href = (id: string) => (home ? '#' : '/#') + id;

  return (
    <>
      <a href="#main" className="fixed -top-16 left-4 z-[200] rounded-[10px] bg-ink px-4 py-2.5 font-semibold text-paper no-underline transition-[top] focus:top-4">
        Skip to content
      </a>
      <header
        onFocus={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-3 z-40 flex justify-center px-3 transition-[translate,opacity] duration-500 ease-out-expo md:top-5',
          hidden && !open && '-translate-y-[150%] opacity-0',
        )}
      >
        <nav
          aria-label="Primary"
          className="relative flex h-14 w-full items-center justify-between gap-6 rounded-full border border-hairline/70 bg-paper/80 pr-2 pl-5 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_18px_40px_-24px_rgba(7,18,43,.45)] backdrop-blur-[14px] backdrop-saturate-[1.4] md:w-auto md:gap-6 lg:gap-10"
        >
          <Link
            href={home ? '#top' : '/'}
            aria-label="Finishers Sharkprint — home"
            className="flex min-h-11 items-center gap-3 text-ink no-underline"
          >
            <SharkMark className="h-6 w-auto text-ink [--dot:var(--color-strike)]" />
            <span className="font-logo text-[10px] leading-none tracking-[.2em] uppercase md:text-[11px] md:whitespace-nowrap">
              Finishers <span className="text-strike">Sharkprint</span>
            </span>
          </Link>

          <div ref={list} className="relative hidden md:block">
            <span ref={marker} aria-hidden="true" className="absolute top-0 left-0 h-10 rounded-full bg-ink opacity-0 transition-[transform,width,opacity] duration-500 ease-out-expo" />
            <ul className="flex items-center">
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <Link
                    href={href(id)}
                    data-id={id}
                    aria-current={active === id ? 'location' : undefined}
                    className={cn(
                      'relative flex h-10 items-center rounded-full px-3 text-[14.5px] font-medium no-underline transition-colors duration-300 lg:px-4',
                      active === id ? 'text-paper' : 'text-ink-60 hover:text-ink',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
            className="flex h-10 items-center rounded-full bg-ink px-4 text-[14px] font-semibold text-paper md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>

        <div
          id="site-menu"
          hidden={!open}
          className="absolute inset-x-3 top-[calc(100%+8px)] rounded-[28px] border border-hairline bg-paper p-2 shadow-2 md:hidden"
        >
          <ul>
            {NAV.map(([label, id]) => (
              <li key={id}>
                <Link
                  href={href(id)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-[20px] px-4 py-3 font-display text-[44px] leading-none font-extrabold tracking-[-0.01em] text-ink no-underline [font-stretch:58%] hover:bg-creme"
                >
                  {label}
                  <span aria-hidden="true" className="text-[22px] text-strike">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
