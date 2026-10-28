'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { clamp, isFinePointer } from '@/lib/env';
import { onPageReady } from '@/lib/page-ready';

/** Page-wide behaviours that apply to plain markup:
 *  [data-reveal]   sibling groups (eyebrow → heading → lead) rise together, 90ms apart
 *  [data-magnetic] CTAs lean toward the pointer: a soft falloff, a few pixels at most,
 *                  and the label trails the button slightly. */
export function Behaviours() {
  const pathname = usePathname();

  // Reveals: scan once the page has hydrated (classes added earlier would not match the server HTML).
  useEffect(() => {
    const groups = new Map<Element, HTMLElement[]>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        groups.get(e.target)?.forEach((el, i) => {
          el.style.setProperty('--ri', String(i));
          el.classList.add('is-in');
        });
        groups.delete(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    const off = onPageReady(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => {
        const parent = el.parentElement!;
        const list = groups.get(parent);
        if (!list) {
          groups.set(parent, [el]);
          io.observe(parent);
        } else if (!list.includes(el)) list.push(el);
      });
    });
    return () => {
      off();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer()) return;
    const R = 72;
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]')).map((el) => {
      const label = el.firstElementChild as HTMLElement | null;
      return {
        el,
        x: gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' }),
        lx: label ? gsap.quickTo(label, 'x', { duration: 0.9, ease: 'power3.out' }) : null,
        ly: label ? gsap.quickTo(label, 'y', { duration: 0.9, ease: 'power3.out' }) : null,
        active: false,
      };
    });
    let px = -1e4, py = -1e4, raf = 0;
    const frame = () => {
      raf = 0;
      items.forEach((it) => {
        const r = it.el.getBoundingClientRect();
        if (r.bottom < -R || r.top > innerHeight + R || !r.width) return;
        const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
        // Distance to the button's edge; strength fades from 1 (on it) to 0 at 72px away.
        const edge = Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2));
        const f = edge >= R ? 0 : 1 - edge / R;
        if (f === 0 && !it.active) return;
        it.active = f > 0;
        const tx = clamp(dx * 0.16, -10, 10) * f;
        const ty = clamp(dy * 0.26, -7, 7) * f;
        it.x(tx); it.y(ty);
        it.lx?.(tx * 0.35); it.ly?.(ty * 0.35);
      });
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    addEventListener('pointermove', onMove, { passive: true });
    return () => {
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      items.forEach((it) => gsap.set([it.el, it.el.firstElementChild], { clearProps: 'transform' }));
    };
  }, [pathname]);

  return null;
}
