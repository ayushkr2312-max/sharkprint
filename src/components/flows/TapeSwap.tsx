'use client';

import { useRef, type CSSProperties } from 'react';
import { Icon, type Pillar } from '@/components/ui/Icon';
import { gsap, useGSAP } from '@/lib/gsap';
import { clamp } from '@/lib/env';

// Each pillar, the duct tape it replaces (the notes from the Grind), and what goes in its place.
const ROWS: { p: Pillar; name: string; kind: string; get: string; tape: string[] }[] = [
  { p: 'engine', name: 'Engine', kind: 'Clips & content', get: 'Every stream and match cut into clips, subtitled and ready to post.', tape: ['VODs to cut: 19', 'Clip ideas.txt'] },
  { p: 'intel', name: 'Intel', kind: 'Prep & scouting', get: 'Opponent prep before every match, and a shortlist for every hire.', tape: ['Scrim sheet (old)', 'roster_final_v7.xlsx'] },
  { p: 'command', name: 'Command', kind: 'Live dashboard', get: 'One screen for socials, stats, sponsors and money, kept up to date.', tape: ['Sponsor DMs (43)', 'Who paid for this?', 'Invoices / misc'] },
  { p: 'forge', name: 'Forge', kind: 'Sites & tools', get: 'A website and staff tools on one base, built to carry your name.', tape: ['Bot broke again', 'Canva, 3 seats'] },
];
// Where each strip of tape sits over its row's answer, and its tilt.
const SPOTS = [
  { x: '-1%', y: '-10%', r: -3 },
  { x: '33%', y: '38%', r: 2.5 },
  { x: '61%', y: '-4%', r: -1.5 },
];

/** The bridge's flow, "Peel off the tape": each pillar's answer starts taped over with the
 *  notes it replaces. As you scroll, row by row, the tape peels away and the answer comes
 *  through. Without script there is no tape, only the answers. */
export function TapeSwap() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(() => {
    const list = ref.current!;
    const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-row]'));
    const tapes = rows.map((r) => Array.from(r.querySelectorAll<HTMLElement>('[data-tape]')));
    const draw = (p: number) => {
      const t = p * (rows.length + 0.4);
      rows.forEach((row, i) => {
        const q = clamp(t - i, 0, 1);
        row.style.setProperty('--q', q.toFixed(3));
        if (row.hasAttribute('data-on') !== q > 0.6) row.toggleAttribute('data-on', q > 0.6);
        tapes[i].forEach((el, k) => {
          const s = SPOTS[k];
          const e = clamp(q * 1.7 - k * 0.35, 0, 1);
          // Peeled from its left end: it lifts, swings up and right, and drops away.
          el.style.transform = `translate(${(e * 46).toFixed(1)}px, ${(-e * 90).toFixed(1)}px) rotate(${(s.r - e * 16).toFixed(2)}deg)`;
          el.style.opacity = (1 - e * e).toFixed(3);
        });
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
          <div className="swap-fix">
            <p className="swap-get">{r.get}</p>
            <p className="sr-only">Replaces: {r.tape.join(', ')}.</p>
            <span aria-hidden="true" className="swap-tapes">
              {r.tape.map((t, k) => (
                <i key={t} data-tape="" className="swap-tape" style={{ left: SPOTS[k].x, top: SPOTS[k].y, transform: `rotate(${SPOTS[k].r}deg)` } as CSSProperties}>
                  {t}
                </i>
              ))}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
