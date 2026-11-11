'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { PILLARS, WALLS } from '@/content/minimal';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-core';

// The walls section as one picture: an org's climb, drawn as a light-blue line that five walls
// hold back. Scrolling through it, each wall splits open where the line meets it, the pillar
// that takes it down lights up beneath, and the line climbs on to the next. A readout under the
// picture gives the wall you're at, or the one you point to or tap: what it costs, and the fix.
// It plays once the panel is in view (about five seconds), not tied to the scroll position.
// Wide screens climb left to right; phones climb up the screen. Transform and opacity only:
// the line is revealed by a cover in the panel's own colour sliding off it.

type Pt = [number, number];
type Geo = {
  kind: 'h' | 'v';
  w: number; h: number;
  walls: number[];            // each wall's place along the climb: x when wide, y on phones
  across: [number, number];   // how far each wall reaches across the climb
  pts: Pt[];                  // the line: its start, where it meets each wall, its end
  ground: [Pt, Pt];
};

// Wide: left to right, rising. The walls run from the ground (y 420) up to y 96; the names sit
// above them, the pillars below, and the end of the line is labelled at top right.
const H: Geo = {
  kind: 'h', w: 1200, h: 500,
  walls: [180, 350, 520, 690, 860], across: [96, 420],
  pts: [[40, 410], [180, 378], [350, 330], [520, 272], [690, 210], [860, 148], [1160, 70]],
  ground: [[40, 420], [1160, 420]],
};
// Phones: bottom to top. The walls run across the panel; each one's name sits above it on the
// left, its pillar on the right, and the line climbs up the gap between them.
const V: Geo = {
  kind: 'v', w: 360, h: 720,
  walls: [600, 490, 380, 270, 160], across: [20, 340],
  pts: [[190, 710], [196, 600], [214, 490], [192, 380], [214, 270], [198, 160], [206, 64]],
  ground: [[20, 712], [340, 712]],
};

const T = 10;   // a wall's thickness
const GAP = 26; // how far each half moves when a wall splits
const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;
const pad = (n: number) => String(n).padStart(2, '0');
const smooth = (x: number) => x * x * (3 - 2 * x);

/** A smooth line through every point (Catmull-Rom, as cubic curves). */
function curve(p: Pt[]) {
  const f = (n: number) => +n.toFixed(1);
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i], b = p[i], c = p[i + 1], e = p[i + 2] ?? c;
    d += ` C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${c[0]} ${c[1]}`;
  }
  return d;
}

/** Scroll progress to the picture: the line's tip waits at each wall while the wall splits,
 *  then travels on to the next. Returns where the tip is and how far each wall has split. */
function plan(g: Geo) {
  const dir = g.kind === 'h' ? 1 : -1;
  const face = (at: number) => at - dir * (T / 2 + 3);
  const end = g.kind === 'h' ? g.pts[g.pts.length - 1][0] : g.pts[g.pts.length - 1][1];
  const stops = [...g.walls.map(face), end];
  const BREAK = 0.07;
  const dist = g.walls.map((_, k) => Math.abs(stops[k + 1] - stops[k]));
  const unit = (1 - BREAK * g.walls.length) / dist.reduce((a, b) => a + b, 0);
  return (p: number) => {
    const splits = g.walls.map(() => 0);
    let tip = stops[0], t = p;
    for (let k = 0; k < g.walls.length && t > 0; k++) {
      splits[k] = Math.min(1, t / BREAK);
      t -= BREAK;
      if (t <= 0) break;
      const f = Math.min(1, t / (dist[k] * unit));
      tip = stops[k] + (stops[k + 1] - stops[k]) * f;
      t -= dist[k] * unit;
    }
    return { tip, splits };
  };
}

function Stage({ g, shown, choose }: { g: Geo; shown: number; choose: (k: number, sticky?: boolean) => void }) {
  const wide = g.kind === 'h';
  const at = (x: number, y: number, extra?: CSSProperties): CSSProperties => ({ left: pct(x, g.w), top: pct(y, g.h), ...extra });
  const hover = (k: number) => (e: React.PointerEvent) => { if (e.pointerType === 'mouse') choose(k); };
  return (
    <div className={`climb__stage climb__stage--${g.kind}`} data-kind={g.kind}>
      <svg className="climb__svg" viewBox={`0 0 ${g.w} ${g.h}`} aria-hidden="true">
        <path d={curve(g.pts)} className="climb__line" />
        {wide
          ? <rect className="climb__cover" x="0" y="0" width={g.w + 40} height={g.across[1] - 2} />
          : <rect className="climb__cover" x="0" y={-g.h} width={g.w} height={g.h} />}
        <path d={`M${g.ground[0].join(' ')}L${g.ground[1].join(' ')}`} className="climb__ground" />
        {g.walls.map((w, k) => {
          // Each wall in two halves that meet where the line crosses it.
          const cross = wide ? g.pts[k + 1][1] : g.pts[k + 1][0];
          const [a, b] = g.across;
          return (
            <g key={w} className="climb__wall" data-k={k}>
              {wide ? (
                <>
                  <rect x={w - T / 2} y={a} width={T} height={cross - a} />
                  <rect x={w - T / 2} y={cross} width={T} height={b - cross} />
                </>
              ) : (
                <>
                  <rect x={a} y={w - T / 2} width={cross - a} height={T} />
                  <rect x={cross} y={w - T / 2} width={b - cross} height={T} />
                </>
              )}
            </g>
          );
        })}
      </svg>
      <p className="climb__end" style={wide ? at(1160, 8, { width: '16%' }) : at(20, 22, { width: '48%' })}>Ready for partners and investors</p>
      {WALLS.map((w, k) => {
        const p = PILLARS.find((x) => x.id === w.pillar)!;
        const pos = g.walls[k];
        return (
          <div key={w.pillar} className="climb__mark">
            <p className="climb__name" style={wide ? at(pos, 0, { width: '12.5%' }) : at(20, pos - 52, { width: '44%' })} onPointerEnter={hover(k)}>
              <span>{pad(k + 1)}</span>{w.name}
            </p>
            <button type="button" className="climb__chip" aria-pressed={shown === k} onClick={() => choose(k, true)} onPointerEnter={hover(k)}
              style={wide ? at(pos, 436) : at(340, pos - 46)}>
              {p.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function Climb() {
  const ref = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const shown = pick ?? at;
  const wall = WALLS[shown], pillar = PILLARS.find((x) => x.id === wall.pillar)!;

  useGSAP(() => {
    const root = ref.current!;
    const rigs = Array.from(root.querySelectorAll<HTMLElement>('.climb__stage')).map((st) => {
      const g = st.dataset.kind === 'v' ? V : H;
      return {
        st, g, run: plan(g),
        cover: st.querySelector<SVGRectElement>('.climb__cover')!,
        halves: Array.from(st.querySelectorAll('.climb__wall')).map((w) => Array.from(w.querySelectorAll<SVGRectElement>('rect'))),
        names: Array.from(st.querySelectorAll<HTMLElement>('.climb__name')),
        chips: Array.from(st.querySelectorAll<HTMLElement>('.climb__chip')),
        end: st.querySelector<HTMLElement>('.climb__end')!,
      };
    });
    let last = -1;
    const draw = (p: number) => {
      let reached = 0;
      rigs.forEach(({ st, g, run, cover, halves, names, chips, end }) => {
        const { tip, splits } = run(p);
        const wide = g.kind === 'h';
        cover.style.transform = wide ? `translate(${tip.toFixed(1)}px, 0px)` : `translate(0px, ${tip.toFixed(1)}px)`;
        splits.forEach((s, k) => {
          const b = smooth(s), d = (GAP * b).toFixed(1), [one, two] = halves[k];
          one.style.transform = wide ? `translate(0px, -${d}px)` : `translate(-${d}px, 0px)`;
          two.style.transform = wide ? `translate(0px, ${d}px)` : `translate(${d}px, 0px)`;
          one.style.opacity = two.style.opacity = (1 - 0.8 * b).toFixed(3);
          names[k].toggleAttribute('data-on', b > 0.5);
          chips[k].toggleAttribute('data-on', b > 0.5);
        });
        end.toggleAttribute('data-on', p > 0.97);
        // The readout follows the picture on screen: the last wall the line has reached.
        if (st.offsetParent) reached = Math.max(0, splits.reduce((n, s, k) => (s > 0.02 ? k : n), 0));
      });
      if (reached !== last) { last = reached; setAt(reached); }
    };
    draw(0);
    // The climb plays through on its own once most of the panel is on screen, so it's always
    // seen from the first wall however fast you scroll. Scrolling back above it resets it.
    const o = { p: 0 };
    const run = gsap.to(o, { p: 1, duration: 5.2, ease: 'none', paused: true, onUpdate: () => draw(o.p) });
    const st = ScrollTrigger.create({
      trigger: root, start: 'center 72%',
      onEnter: () => run.play(), onEnterBack: () => run.play(),
      onLeaveBack: () => { run.pause(0); draw(0); },
    });
    return () => { st.kill(); run.kill(); };
  }, { scope: ref });

  // Pointing at a wall shows it in the readout until the pointer leaves the picture; a tap
  // keeps it there.
  const choose = (k: number) => setPick(k);
  return (
    <div ref={ref} className="climb" onPointerLeave={(e) => { if (e.pointerType === 'mouse') setPick(null); }}>
      <Stage g={H} shown={shown} choose={choose} />
      <Stage g={V} shown={shown} choose={choose} />
      <div key={shown} className="climb__read" aria-live="polite">
        <p className="climb__cost"><span>{pad(shown + 1)}</span>{wall.cost}</p>
        <p className="climb__fix"><b>{pillar.name}</b>{wall.fix}</p>
      </div>
    </div>
  );
}
