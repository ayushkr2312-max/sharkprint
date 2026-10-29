'use client';

import { useRef, type CSSProperties } from 'react';
import { Icon, PILLARS, type Pillar } from '@/components/ui/Icon';
import { gsap, useGSAP } from '@/lib/gsap';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MATCH_DAY = 5;
const LANES: Record<Pillar, string> = { engine: 'Engine', intel: 'Intel', command: 'Command', forge: 'Forge' };

// A sample week for an org with a final on Saturday: what each pillar hands over, and when.
const ITEMS: { lane: Pillar; day: number; what: string }[] = [
  { lane: 'engine', day: 0, what: 'Weekend VODs logged' },
  { lane: 'engine', day: 1, what: 'Shorts batch out' },
  { lane: 'engine', day: 5, what: 'Match clips out' },
  { lane: 'engine', day: 6, what: 'Highlights video' },
  { lane: 'intel', day: 0, what: 'Scrim review' },
  { lane: 'intel', day: 2, what: 'Opponent pack: Orca' },
  { lane: 'intel', day: 4, what: 'Pre-match brief' },
  { lane: 'command', day: 0, what: 'Socials synced' },
  { lane: 'command', day: 3, what: 'Sponsor post reminder' },
  { lane: 'command', day: 5, what: 'Match-day dashboard' },
  { lane: 'command', day: 6, what: 'Week in numbers' },
  { lane: 'forge', day: 1, what: 'Roster page updated' },
  { lane: 'forge', day: 3, what: 'Match page live' },
  { lane: 'forge', day: 6, what: 'Results on the site' },
];

/** The week's flow, "Match week, handled": the four pillars as lanes across seven days. As
 *  you scroll, a playhead runs through the week and each piece of work lands on its day,
 *  from queued (dashed) to out (solid, ticked). On phones the week reads as a list of days. */
export function MatchWeek() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const fig = ref.current!;
    const items = Array.from(fig.querySelectorAll<HTMLElement>('[data-item]'));
    const days = Array.from(fig.querySelectorAll<HTMLElement>('[data-day-head]'));
    const count = fig.querySelector<HTMLElement>('[data-count]')!;
    let shown = -1;
    const draw = (p: number) => {
      fig.style.setProperty('--p', p.toFixed(4));
      const t = p * DAYS.length; // how far into the week, in days
      let out = 0;
      items.forEach((el) => {
        const on = t >= Number(el.dataset.day) + 0.55;
        if (on) out++;
        if (el.hasAttribute('data-on') !== on) el.toggleAttribute('data-on', on);
      });
      days.forEach((d, i) => {
        d.toggleAttribute('data-past', t >= i + 1);
        d.toggleAttribute('data-now', t >= i && t < i + 1);
      });
      if (out !== shown) {
        shown = out;
        count.textContent = String(out);
      }
    };
    const prog = { p: 0 };
    draw(0);
    gsap.to(prog, {
      p: 1, ease: 'none',
      onUpdate: () => draw(prog.p),
      // The week runs while the board is on screen, and ends before it leaves.
      scrollTrigger: { trigger: fig, start: 'top 70%', end: 'bottom 45%', scrub: 0.6 },
    });
  }, { scope: ref });

  return (
    <figure
      ref={ref}
      data-line="foot"
      aria-label="A sample match week: each day, what Engine, Intel, Command and Forge hand over, from logged VODs and the opponent pack to the match-day dashboard and results on the site."
      className="week"
    >
      <div className="week-grid">
        {DAYS.map((d, i) => (
          <span key={d} aria-hidden="true" data-match={i === MATCH_DAY ? '' : undefined} className="week-col" style={{ '--d': i } as CSSProperties} />
        ))}
        {PILLARS.map((p, l) => (
          <span key={p} aria-hidden="true" className="week-rule" style={{ '--l': l } as CSSProperties} />
        ))}
        <span aria-hidden="true" className="week-now"><i /></span>

        {DAYS.map((d, i) => (
          <p key={d} data-day-head="" className="week-day" style={{ '--d': i } as CSSProperties}>
            {d}
            {i === MATCH_DAY && <small>Match day</small>}
          </p>
        ))}
        {PILLARS.map((p, l) => (
          <p key={p} aria-hidden="true" className="week-lane" style={{ '--l': l } as CSSProperties}>
            <Icon name={p} strokeWidth={7} />
            {LANES[p]}
          </p>
        ))}
        {ITEMS.map((it) => (
          <p key={it.what} data-item="" data-day={it.day} className="week-item" style={{ '--d': it.day, '--l': PILLARS.indexOf(it.lane) } as CSSProperties}>
            <span className="week-tag">{LANES[it.lane]}</span>
            {it.what}
            <Icon name="check" strokeWidth={12} className="week-check" />
          </p>
        ))}
      </div>
      <figcaption className="week-foot">
        <span>A sample week for an org with two rosters and a Saturday final. Yours is built around your calendar.</span>
        <span aria-hidden="true" className="week-count">Out so far: <b data-count="">{ITEMS.length}</b> of {ITEMS.length}</span>
      </figcaption>
    </figure>
  );
}
