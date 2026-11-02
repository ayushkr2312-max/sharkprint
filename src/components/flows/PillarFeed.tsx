'use client';

import { useRef, type CSSProperties } from 'react';
import { Icon, type Pillar } from '@/components/ui/Icon';
import { gsap, useGSAP } from '@/lib/gsap';
import { clamp } from '@/lib/env';

// Each pillar, what it runs, and the numbers it adds to the org's live report.
const ROWS: { p: Pillar; name: string; kind: string; get: string; feeds: string[] }[] = [
  { p: 'engine', name: 'Engine', kind: 'Clips & content', get: 'Every stream and match cut into clips, subtitled and ready to post.', feeds: ['Clip views', 'Impressions'] },
  { p: 'intel', name: 'Intel', kind: 'Prep & scouting', get: 'Opponent prep before every match, and a shortlist for every hire.', feeds: ['Audience profile', 'Market rates'] },
  { p: 'command', name: 'Command', kind: 'Live dashboard', get: 'One screen for socials, stats, sponsors and money, kept up to date.', feeds: ['Live numbers', 'Deliverable proof'] },
  { p: 'forge', name: 'Forge', kind: 'Sites & tools', get: 'A website and staff tools on one base, built to carry your name.', feeds: ['Site traffic', 'Store sales'] },
  { p: 'studio', name: 'Studio', kind: 'Creator programs', get: 'Creators worth signing, everything they make in one library, every stream on one schedule.', feeds: ['Creator reach', 'Stream hours'] },
];

/** The bridge's flow, "Five pillars, one system": a row per pillar, each lighting up in turn
 *  as you scroll, with what it runs and the numbers it adds to the live report. */
export function PillarFeed() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(() => {
    const list = ref.current!;
    const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-row]'));
    const draw = (p: number) => {
      const t = p * (rows.length + 0.4);
      rows.forEach((row, i) => {
        const q = clamp(t - i, 0, 1);
        row.style.setProperty('--q', q.toFixed(3));
        if (row.hasAttribute('data-on') !== q > 0.6) row.toggleAttribute('data-on', q > 0.6);
      });
    };
    const prog = { p: 0 };
    draw(0);
    gsap.to(prog, {
      p: 1, ease: 'none',
      onUpdate: () => draw(prog.p),
      scrollTrigger: { trigger: list, start: 'top 72%', end: 'bottom 50%', scrub: 0.6 },
    });
  }, { scope: ref });

  return (
    <ol ref={ref} className="swap">
      {ROWS.map((r) => (
        <li key={r.p} data-row="" className="swap-row">
          <p className="swap-pillar">
            <Icon name={r.p} strokeWidth={7} />
            <span>
              <b>{r.name}</b>
              {r.kind}
            </span>
          </p>
          <p className="swap-get">{r.get}</p>
          <div className="swap-feeds">
            <p className="text-[13px] font-medium text-mist">Feeds the report</p>
            <ul className="flex flex-wrap gap-1.5">
              {r.feeds.map((f, i) => <li key={f} className="swap-chip" style={{ '--c': i } as CSSProperties}>{f}</li>)}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
