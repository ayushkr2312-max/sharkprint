'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { clamp } from '@/lib/env';
import { finishIntro } from '@/lib/intro';
import { getLenis } from '@/lib/scroll';
import { SharkMark } from '@/components/ui/Icon';

const WORD = 'Finishers Sharkprint';

/** First visit only, ≤ 1.6s, skippable (concept p.10):
 *  01 the shark fades in · 02 it streaks into a full-width line, the wordmark tracks in ·
 *  03 counter hits 100, the line drops, the page wipes up · 04 the headline rises. */
export function Preloader() {
  // Decided once: plays only while hydrating the server's HTML (its markup is in the DOM),
  // never when the homepage is reached by client-side navigation.
  const [play] = useState(() => typeof document === 'undefined' || !!document.querySelector('[data-preloader]'));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pre = ref.current;
    // Not the initial load, or already played (Next re-runs effects when a kept route is shown again).
    if (!play || !pre || pre.hidden) { finishIntro(); return; }
    if (window.__spVisit !== 'first') {
      pre.hidden = true;
      finishIntro();
      return;
    }
    // The preloader owns the screen now; cancel the CSS safety timeout.
    pre.style.animation = 'none';
    const lockRaf = requestAnimationFrame(() => getLenis()?.stop());

    const q = gsap.utils.selector(pre);
    const count = q('[data-count]')[0] as HTMLElement;
    let loaded = false;
    Promise.all([document.fonts?.ready, new Promise((r) => setTimeout(r, 300))]).then(() => { loaded = true; });
    const t0 = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - t0) / 1000;
      const cap = loaded || elapsed > 1.4 ? 1 : 0.67;
      count.textContent = String(Math.floor(100 * Math.min(clamp(elapsed / 1.4, 0, 1), cap))).padStart(3, '0');
    };
    gsap.ticker.add(tick);

    const end = () => {
      gsap.ticker.remove(tick);
      getLenis()?.start();
      pre.hidden = true;
    };
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(q('[data-glyph]'), { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      .to(q('[data-glyph]'), { scaleX: 4, opacity: 0, duration: 0.5, ease: 'expo.in' }, 0.4)
      .to(q('[data-line]'), { scaleX: 1, duration: 0.6, ease: 'expo.inOut' }, 0.45)
      .to(q('[data-letter]'), { opacity: 1, duration: 0.3, stagger: 0.022, ease: 'none' }, 0.5)
      .fromTo(q('[data-word]'), { letterSpacing: '0.6em' }, { letterSpacing: '0.32em', duration: 0.7 }, 0.5)
      .to([q('[data-word]'), count], { opacity: 0, duration: 0.2 }, 1.05)
      .to(q('[data-line]'), { y: () => innerHeight / 2 - 15, duration: 0.25, ease: 'expo.in' }, 1.0)
      .to(pre, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.4, ease: 'expo.inOut' }, 1.2)
      .call(finishIntro, undefined, 1.32)
      .call(end, undefined, 1.62);

    const skip = () => { if (tl.progress() < 1) tl.progress(1); };
    pre.addEventListener('click', skip);
    addEventListener('keydown', skip, { once: true });
    return () => {
      cancelAnimationFrame(lockRaf);
      pre.removeEventListener('click', skip);
      removeEventListener('keydown', skip);
      gsap.ticker.remove(tick);
      tl.kill();
      getLenis()?.start();
    };
  }, [play]);

  if (!play) return null;

  return (
    <div ref={ref} data-preloader="" aria-hidden="true" className="preloader fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-abyss text-white">
      <div className="relative grid w-full justify-items-center gap-7">
        <SharkMark data-glyph="" className="h-[54px] w-auto text-white opacity-0 [--dot:var(--color-current-blue)]" />
        <span data-line="" className="absolute left-1/2 top-[27px] -ml-[50vw] h-0.5 w-screen scale-x-0 bg-strike" />
        <p data-word="" className="font-logo text-[clamp(12px,1.4vw,16px)] tracking-[.32em] text-mist uppercase">
          {WORD.split('').map((c, i) => (
            <span key={i} data-letter="" className="inline-block opacity-0">{c === ' ' ? ' ' : c}</span>
          ))}
        </p>
      </div>
      <span data-count="" className="absolute bottom-7 left-[var(--gutter)] font-mono text-[13px] text-mist tabular-nums">000</span>
      <span className="label absolute right-[var(--gutter)] bottom-7 text-[13px] text-mist/75">Click or press any key to skip</span>
    </div>
  );
}
