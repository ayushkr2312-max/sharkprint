'use client';

import { Children, useEffect, useImperativeHandle, useRef, useState, type KeyboardEvent, type ReactNode, type Ref } from 'react';
import { DragPill } from './DragPill';
import { Draggable, gsap, useGSAP } from '@/lib/gsap';
import { clamp } from '@/lib/env';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

export type RailHandle = { go: (i: number) => void };

type Props = {
  label: string;
  children: ReactNode;
  onChange?: (index: number) => void;
  className?: string;
  ref?: Ref<RailHandle>;
};

/** Inertia carousel (concept p.08): drag or throw, it snaps a card to centre; cards tilt
 *  up to 5° toward travel; neighbours wait at 55% (styled by the cards via data-current). */
export function DragRail({ label, children, onChange, className, ref }: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const positions = useRef<number[]>([]);
  const current = useRef(0);
  const goRef = useRef<(i: number, immediate?: boolean) => void>(() => {});
  const [index, setIndex] = useState(0);
  const changed = useRef(onChange);
  const items = Children.toArray(children);

  useEffect(() => { changed.current = onChange; });

  useImperativeHandle(ref, () => ({ go: (i: number) => goRef.current(i) }), []);

  useGSAP(() => {
    const railEl = rail.current!, trackEl = track.current!;
    const slots = Array.from(trackEl.children) as HTMLElement[];
    const measure = () => {
      positions.current = slots.map((s) => railEl.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2));
    };
    const nearest = (x: number) => {
      let best = 0, bd = Infinity;
      positions.current.forEach((p, i) => { const d = Math.abs(p - x); if (d < bd) { bd = d; best = i; } });
      return best;
    };
    const setCurrent = (i: number) => {
      const n = clamp(i, 0, slots.length - 1);
      if (n === current.current) return;
      current.current = n;
      setIndex(n);
      changed.current?.(n);
    };
    const bounds = () => ({ minX: positions.current[positions.current.length - 1] - 40, maxX: positions.current[0] + 40 });

    measure();
    gsap.set(trackEl, { x: positions.current[0] });
    const tilt = gsap.quickTo(slots, 'rotationY', { duration: 0.6, ease: 'expo.out' });

    goRef.current = (i, immediate) => {
      setCurrent(i);
      gsap.to(trackEl, { x: positions.current[current.current], duration: immediate ? 0 : 0.9, ease: 'expo.out', overwrite: true });
    };

    let lastX = 0, lastT = 0;
    const drag = Draggable.create(trackEl, {
      type: 'x',
      inertia: true,
      edgeResistance: 0.8,
      dragClickables: false,
      allowContextMenu: true,
      bounds: bounds(),
      snap: (x: number) => positions.current[nearest(x)],
      onPress() { railEl.setAttribute('data-dragging', 'true'); lastX = this.x; lastT = performance.now(); },
      onDrag() {
        const now = performance.now();
        const v = (this.x - lastX) / Math.max(1, now - lastT);
        lastX = this.x; lastT = now;
        tilt(clamp(-v * 6, -5, 5));
        setCurrent(nearest(this.x));
      },
      onThrowUpdate() { setCurrent(nearest(this.x)); },
      onRelease() { railEl.removeAttribute('data-dragging'); tilt(0); },
      onDragEnd() { trackOnce('rail:' + label, { type: 'drag', rail: label }); },
      onThrowComplete() { setCurrent(nearest(this.x)); },
    })[0];

    const onResize = () => {
      measure();
      drag.applyBounds(bounds());
      goRef.current(current.current, true);
    };
    addEventListener('resize', onResize);
    return () => {
      removeEventListener('resize', onResize);
      drag.kill();
    };
  }, { scope: rail });

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.target as Element).closest('[data-wipe-handle]')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); goRef.current(current.current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goRef.current(current.current - 1); }
  };

  return (
    <div
      ref={rail}
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn('relative cursor-grab touch-pan-y pt-3 pb-6 select-none perspective-[1400px] data-[dragging=true]:cursor-grabbing', className)}
    >
      <div ref={track} className="flex w-max items-center gap-[clamp(20px,3vw,40px)] will-change-transform">
        {items.map((child, i) => (
          <div
            key={i}
            data-current={i === index}
            aria-hidden={Math.abs(i - index) > 1 ? true : undefined}
            onFocusCapture={() => { if (i !== current.current) goRef.current(i); }}
            className="group flex-none"
          >
            {child}
          </div>
        ))}
      </div>
      <DragPill label="Drag ⟷" />
    </div>
  );
}
