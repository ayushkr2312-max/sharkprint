'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { clamp, rng } from '@/lib/env';

const TYPES = [
  { label: 'Players', slot: 'Player' },
  { label: 'Teams', slot: 'Team' },
  { label: 'Staff', slot: 'Coach' },
  { label: 'Creators', slot: 'Creator' },
];
const GATES = [
  { name: 'Watch', note: 'Every match & stream' },
  { name: 'Tag', note: 'By role & style' },
  { name: 'Score', note: 'Against what you need' },
  { name: 'Review', note: 'By a scout who knows' },
];
const GX = [31, 48, 65, 80]; // where the gates stand, % across
const SLOT_X = 93;
const SLOT_Y = [22, 41, 60, 79];

// The scene: a cloud of people, teams and channels. Each drops out at a gate (life 2–4);
// the first of each type gets through and lands in its shortlist slot.
const DOTS = (() => {
  const r = rng(29);
  return Array.from({ length: 72 }, (_, i) => {
    const a = r() * Math.PI * 2, d = Math.sqrt(r());
    const roll = r();
    return {
      type: i % 4,
      // Rounded: trig can differ in the last digits between server and browser.
      x: Math.round((13 + Math.cos(a) * d * 10) * 100) / 100,
      y: Math.round((50 + Math.sin(a) * d * 38) * 100) / 100,
      life: i < 4 ? 5 : roll < 0.45 ? 2 : roll < 0.8 ? 3 : 4,
      lag: r(),
    };
  });
})();

/** Where a dot is at stage s (0: in the scene … 4: at Review, 5: in its slot). */
function place(d: (typeof DOTS)[number], s: number) {
  const pts: [number, number][] = [[d.x, d.y]];
  GX.forEach((gx, k) => pts.push([gx - 2.5, 50 + (d.y - 50) * (1 - 0.2 * (k + 1))]));
  pts.push([SLOT_X - 1.5, SLOT_Y[d.type]]);
  const stop = Math.min(s, d.life);
  const k = Math.min(Math.floor(stop), pts.length - 2), t = stop - k;
  const e = t * t * (3 - 2 * t);
  const x = pts[k][0] + (pts[k + 1][0] - pts[k][0]) * e;
  let y = pts[k][1] + (pts[k + 1][1] - pts[k][1]) * e;
  // Filtered out: it stops at its gate, sinks a little and fades.
  const out = d.life < 5 ? clamp((s - d.life) / 0.6, 0, 1) : 0;
  y += out * 6;
  return { x, y, o: 1 - out };
}

/** Intel's flow, "Narrowing the field": everyone in the scene goes in; as you scroll they
 *  pass the desk's four gates and most fall away, until one player, one team, one coach
 *  and one creator reach the shortlist. */
export function IntelFunnel() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const fig = ref.current!;
    const field = fig.querySelector<HTMLElement>('[data-field]')!;
    const dots = Array.from(field.querySelectorAll<HTMLElement>('[data-dot]'));
    const gates = Array.from(fig.querySelectorAll<HTMLElement>('[data-gate]'));
    const slots = Array.from(fig.querySelectorAll<HTMLElement>('[data-slot]'));
    let w = field.clientWidth, h = field.clientHeight;
    const draw = (p: number) => {
      const s = p * 5.4;
      dots.forEach((el, i) => {
        const d = DOTS[i];
        const at = place(d, clamp(s - d.lag * 0.7, 0, 5));
        el.style.transform = `translate(${(((at.x - d.x) / 100) * w).toFixed(1)}px, ${(((at.y - d.y) / 100) * h).toFixed(1)}px)`;
        el.style.opacity = at.o.toFixed(2);
      });
      gates.forEach((g, k) => g.toggleAttribute('data-lit', s > k + 0.6));
      slots.forEach((sl) => sl.toggleAttribute('data-lit', s > 5.1));
    };
    const prog = { p: 0 };
    gsap.to(prog, {
      p: 1, ease: 'none',
      onUpdate: () => draw(prog.p),
      // Plays while the whole field is on screen, and finishes before it leaves.
      scrollTrigger: { trigger: fig, start: 'top 65%', end: 'bottom 62%', scrub: 0.6 },
    });
    const ro = new ResizeObserver(() => { w = field.clientWidth; h = field.clientHeight; draw(prog.p); });
    ro.observe(field);
    return () => ro.disconnect();
  }, { scope: ref });

  return (
    <figure
      ref={ref}
      aria-label="How Intel works: everyone in the scene is watched, tagged by role and style, scored against what you need and reviewed by a scout; one player, one team, one coach and one creator reach the shortlist."
      className="funnel"
    >
      <div data-field="" className="funnel-field" aria-hidden="true">
        <p className="funnel-scene">The scene</p>
        {GATES.map((g, k) => (
          <div key={g.name} data-gate="" className="funnel-gate" style={{ left: GX[k] + '%' }}>
            <b>{g.name}</b>
            <small>{g.note}</small>
          </div>
        ))}
        {TYPES.map((t, i) => (
          <div key={t.slot} data-slot="" data-type={i} className="funnel-slot" style={{ left: SLOT_X + '%', top: SLOT_Y[i] + '%' }}>
            <i />
            <span>{t.slot}</span>
          </div>
        ))}
        {DOTS.map((d, i) => (
          <i key={i} data-dot="" data-type={d.type} className="funnel-dot" style={{ left: d.x + '%', top: d.y + '%' }} />
        ))}
      </div>
      <figcaption className="funnel-legend">
        <span className="funnel-say">The whole scene goes in. Only the ones who fit reach you.</span>
        <span className="funnel-key">
          {TYPES.map((t, i) => <span key={t.label} data-type={i}><i />{t.label}</span>)}
        </span>
      </figcaption>
    </figure>
  );
}
