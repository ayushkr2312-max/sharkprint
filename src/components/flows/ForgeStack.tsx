'use client';

import { useRef, type CSSProperties } from 'react';
import { Icon } from '@/components/ui/Icon';
import { gsap, useGSAP } from '@/lib/gsap';

const BASE = ['Brand', 'Rosters', 'Results', 'Merch', 'Partners', 'Socials'];
const SURFACES = ['Brand site', 'Tournament', 'Store', 'Microsite', 'Staff tools'];
const KEY: [string, string, string][] = [
  ['03', 'Every surface', 'Your site, tournament platform, store, campaign microsites and staff tools.'],
  ['02', 'One build', 'Blueprint, build, launch: one system under all of it, so nothing drifts.'],
  ['01', 'What you already have', 'Brand, rosters, results, merch and partners, entered once and used everywhere.'],
];
// Pulses rising from the base to the surfaces, at a few points across the plates.
const RISERS = [[18, 30], [42, 62], [66, 26], [80, 70], [30, 82], [58, 44]];

/** Forge's flow, "One base, every surface": three plates stacked in perspective. What
 *  the org already has at the bottom, one build in the middle, every surface on top. The
 *  plates come apart as it scrolls through, and pulses rise from the base to the top. */
export function ForgeStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const stack = ref.current!.querySelector('[data-stack]');
    gsap.fromTo(stack, { '--gap': '20px' }, {
      '--gap': '92px', ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'center 45%', scrub: 0.6 },
    });
  }, { scope: ref });

  return (
    <figure
      ref={ref}
      data-line="foot"
      aria-label="How Forge works: what you already have (brand, rosters, results, merch, partners) goes into one build system, which puts it on every surface: your site, tournament platform, store, microsites and staff tools."
      className="fstack"
    >
      <div className="fstack-scene" aria-hidden="true">
        <div data-stack="" className="fstack-stack">
          <div className="fstack-plate fstack-base" style={{ '--z': 0 } as CSSProperties}>
            <p className="fstack-tag">What you have</p>
            <ul>{BASE.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div className="fstack-plate fstack-core" style={{ '--z': 1 } as CSSProperties}>
            <Icon name="forge" strokeWidth={6} className="fstack-icon" />
            <p className="fstack-name">Forge</p>
            <p className="fstack-steps">Blueprint, build, launch</p>
          </div>
          <div className="fstack-plate fstack-top" style={{ '--z': 2 } as CSSProperties}>
            {SURFACES.map((s) => (
              <span key={s} className="fstack-surface"><i /><b>{s}</b></span>
            ))}
          </div>
          {RISERS.map(([x, y], i) => (
            <span key={i} className="fstack-rise" style={{ left: x + '%', top: y + '%', '--d': i * 0.45 + 's' } as CSSProperties} />
          ))}
        </div>
      </div>
      <ol className="fstack-key">
        {KEY.map(([n, t, d]) => (
          <li key={n}>
            <span className="fstack-n">{n}</span>
            <span>
              <b>{t}</b>
              {d}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
