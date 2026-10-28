'use client';

import { useEffect, useRef } from 'react';
import { isFinePointer } from '@/lib/env';

/** The DRAG pill (concept p.08): follows the pointer over a draggable stage on desktop;
 *  on touch it shows once as a hint on first touch. Attach it inside the stage. */
export function DragPill({ label = 'Drag' }: { label?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pill = ref.current!;
    const stage = pill.parentElement!;
    const place = (x: number, y: number) => {
      const r = stage.getBoundingClientRect();
      pill.style.left = x - r.left + 'px';
      pill.style.top = y - r.top + 'px';
    };
    if (isFinePointer()) {
      const move = (e: PointerEvent) => {
        if ((e.target as Element).closest('button, a, [data-wipe-handle], [data-no-drag]')) {
          pill.classList.remove('is-on');
          return;
        }
        place(e.clientX, e.clientY);
        pill.classList.add('is-on');
      };
      const leave = () => pill.classList.remove('is-on');
      stage.addEventListener('pointermove', move);
      stage.addEventListener('pointerleave', leave);
      return () => {
        stage.removeEventListener('pointermove', move);
        stage.removeEventListener('pointerleave', leave);
      };
    }
    let t = 0;
    const touch = (e: TouchEvent) => {
      place(e.touches[0].clientX, e.touches[0].clientY - 48);
      pill.classList.add('is-on');
      t = window.setTimeout(() => pill.classList.remove('is-on'), 1400);
    };
    stage.addEventListener('touchstart', touch, { once: true, passive: true });
    return () => {
      clearTimeout(t);
      stage.removeEventListener('touchstart', touch);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="drag-pill pointer-events-none absolute top-0 left-0 z-[6] -translate-x-1/2 -translate-y-1/2 scale-[.6] rounded-full bg-paper px-3.5 py-2 font-mono text-[11px] font-bold tracking-[.16em] text-ink uppercase opacity-0 transition-[opacity,scale] duration-200 ease-out-expo"
    >
      {label}
    </span>
  );
}
