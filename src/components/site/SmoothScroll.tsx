'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { findVisible, getLenis, scrollToTarget, setLenis } from '@/lib/scroll';

/** Lenis smooth scroll (a 1.2s expo glide per wheel step) wired to ScrollTrigger, in-page
 *  anchors, and deep links like /#insiders that must wait for pins and fonts to settle. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Always smooth: the site keeps its motion whatever the OS motion setting says.
      respectReducedMotion: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // On the homepage, links to its own rooms scroll instead of navigating
  // (#engine, /#insiders).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const href = a.getAttribute('href')!;
      const home = location.pathname === '/';
      let hash: string | null = null;
      if (href.startsWith('#') && href.length > 1) hash = href;
      else if (home && href.startsWith('/#')) hash = href.slice(1);
      if (!hash || !findVisible(hash)) return;
      e.preventDefault();
      e.stopPropagation();
      scrollToTarget(hash);
      history.replaceState(history.state, '', hash);
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);

  // New page: refresh triggers once fonts and late layout settle, then honour any #hash.
  useEffect(() => {
    let cancelled = false;
    const loaded = document.readyState === 'complete' ? null : new Promise((r) => addEventListener('load', r, { once: true }));
    const hash = location.hash;
    if (!hash) getLenis()?.scrollTo(0, { immediate: true });
    Promise.all([loaded, document.fonts?.ready]).then(() => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      if (hash && findVisible(hash)) requestAnimationFrame(() => scrollToTarget(hash, true));
    });
    return () => { cancelled = true; };
  }, [pathname]);

  return null;
}
