'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Icon, type Pillar } from '@/components/ui/Icon';
import { useRoving } from '@/components/ui/useRoving';
import { gsap, useGSAP } from '@/lib/gsap';
import { clamp } from '@/lib/env';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

// What the org already produces, by the pillar that counts it.
const SOURCES: { p: Pillar; name: string; line: string }[] = [
  { p: 'engine', name: 'Clips', line: '184 this month' },
  { p: 'studio', name: 'Streams', line: '12 creators' },
  { p: 'intel', name: 'Audience', line: 'Who watches, and where' },
  { p: 'command', name: 'Socials', line: '6 platforms, live' },
  { p: 'forge', name: 'Site and store', line: 'Visits and sales' },
];

// The report's numbers (a sample month for a fictional org).
const KPIS = [
  { id: 'reach', label: 'Impressions', to: 4.2, dec: 1, suf: 'M', bars: [40, 52, 48, 66, 74, 100] },
  { id: 'hours', label: 'Stream hours', to: 1860, dec: 0, suf: '', bars: [58, 62, 70, 64, 82, 100] },
  { id: 'clips', label: 'Clip views', to: 2.9, dec: 1, suf: 'M', bars: [30, 44, 58, 52, 80, 100] },
  { id: 'eng', label: 'Engagement', to: 6.1, dec: 1, suf: '%', bars: [70, 66, 78, 84, 80, 100] },
] as const;

// Who's reading it: the same numbers, led by what that reader cares about.
const READERS = [
  { id: 'partner', label: 'A partner', for: 'for Volt Energy', lead: 'clips', title: 'What your partnership reached', note: 'Clips and late-night streams reach an audience where 58% are aged 18 to 24.', as: 'A one-page recap, with links to every clip' },
  { id: 'staff', label: 'Your staff', for: 'for the monthly meeting', lead: 'eng', title: 'What changed this month', note: 'Engagement held at 6.1% while stream hours grew, and clips brought in most new followers.', as: 'The monthly report, in Command' },
  { id: 'players', label: 'Your players', for: 'for Kai, Mira and the roster', lead: 'hours', title: 'Your own numbers', note: 'Each player and creator sees their own streams, clips and audience, next to the team’s.', as: 'A personal page for every player' },
] as const;

const fmt = (v: number, dec: number, suf: string) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-GB')) + suf;

/** The org in numbers, in one picture: everything it already makes, counted by the pillars,
 *  flowing into a report that keeps itself current. Its numbers count up and its sources
 *  light one by one as it scrolls through; "Shaped for" leads the report with what that
 *  reader cares about. */
export function LiveDeck() {
  const ref = useRef<HTMLElement>(null);
  const [reader, setReader] = useState(0);
  const b = READERS[reader];
  const select = (i: number) => {
    setReader(i);
    trackOnce('deck-reader', { type: 'deck_reader', room: 'reach' });
  };
  const item = useRoving(READERS.length, reader, select);

  useGSAP(() => {
    const fig = ref.current!;
    const counts = Array.from(fig.querySelectorAll<HTMLElement>('[data-count]'));
    const srcs = Array.from(fig.querySelectorAll<HTMLElement>('[data-src]'));
    const wires = Array.from(fig.querySelectorAll<SVGPathElement>('[data-wire]'));
    const ready = fig.querySelector<HTMLElement>('[data-ready]')!;
    const draw = (p: number) => {
      // Sources plug in over the first half; the numbers climb behind them.
      srcs.forEach((el, i) => {
        const on = p >= 0.08 + i * 0.09;
        if (el.hasAttribute('data-on') !== on) el.toggleAttribute('data-on', on);
        wires[i]?.toggleAttribute('data-on', on);
      });
      const q = clamp((p - 0.15) / 0.75, 0, 1), e = 1 - Math.pow(1 - q, 3);
      counts.forEach((el) => { el.textContent = fmt(+el.dataset.to! * e, +el.dataset.dec!, el.dataset.suf!); });
      ready.toggleAttribute('data-on', p > 0.92);
    };
    const prog = { p: 0 };
    draw(0);
    gsap.to(prog, {
      p: 1, ease: 'none',
      onUpdate: () => draw(prog.p),
      scrollTrigger: { trigger: fig, start: 'top 85%', end: 'center 45%', scrub: 0.6 },
    });
  }, { scope: ref });

  return (
    <figure ref={ref} className="ldeck" aria-label="A live report, fed by the org’s clips, streams, audience, socials, site and store (sample numbers)">
      <div className="ldeck-pick">
        <span id="ldeck-label" className="text-[14px] font-medium text-ink-60">Shaped for</span>
        <div role="radiogroup" aria-labelledby="ldeck-label" className="ldeck-seg">
          {READERS.map((x, i) => (
            <button key={x.id} type="button" role="radio" aria-checked={i === reader} onClick={() => select(i)} {...item(i)}>{x.label}</button>
          ))}
        </div>
      </div>

      <ul className="ldeck-src">
        {SOURCES.map((s) => (
          <li key={s.p} data-src="" className="ldeck-chip">
            <Icon name={s.p} strokeWidth={7} />
            <span className="grid min-w-0 leading-tight">
              <b>{s.name}</b>
              <span>{s.line}</span>
            </span>
            <i aria-hidden="true" />
          </li>
        ))}
      </ul>

      <svg aria-hidden="true" className="ldeck-wires" viewBox="0 0 60 500" preserveAspectRatio="none">
        {SOURCES.map((s, i) => {
          const y = (i + 0.5) * 100;
          return <path key={s.p} data-wire="" d={`M0 ${y}C34 ${y} 26 250 60 250`} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>

      <div className="ldeck-out app">
        <div className="app-bar">
          <b className="font-display text-[17px] font-bold">Live report</b>
          <span className="text-[13px] text-ink-60">Your Org, {b.for}</span>
          <span className="rounded-full bg-creme-deep px-2 py-0.5 text-[11px] font-semibold text-ink-60">Sample</span>
          <span className="ml-auto flex items-center gap-2 text-[12.5px] font-semibold text-ink-60"><i className="size-2 rounded-full bg-signal" />Live</span>
        </div>
        <div className="grid gap-3 p-4">
          <p className="font-display text-[clamp(22px,2vw,28px)] leading-none font-bold">October, in numbers</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {KPIS.map((k) => {
              const lead = k.id === b.lead;
              return (
                <div key={k.id} className={cn('ldeck-kpi', lead && 'is-lead')}>
                  <p className="text-[12.5px] font-medium">{k.label}</p>
                  <b data-count="" data-to={k.to} data-dec={k.dec} data-suf={k.suf} className="font-display text-[clamp(24px,2.2vw,32px)] leading-none font-bold tabular-nums">{fmt(k.to, k.dec, k.suf)}</b>
                  <span aria-hidden="true" className="flex h-6 items-end gap-[3px]">
                    {k.bars.map((h, i) => <i key={i} className="flex-1 rounded-t-[2px]" style={{ height: `${h}%` } as CSSProperties} />)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="grid gap-2 md:grid-cols-[1fr_1.25fr]">
            <div className="app-tile grid content-start gap-2 p-3!">
              <p className="app-label">Audience</p>
              {[['18 to 24', 58], ['25 to 34', 31], ['35 and up', 11]].map(([k, v]) => (
                <p key={k} className="grid grid-cols-[72px_minmax(0,1fr)_36px] items-center gap-2 text-[13px]">
                  <span>{k}</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-creme-deep"><span className="block h-full rounded-full bg-strike" style={{ width: `${v}%` }} /></span>
                  <span className="text-right font-semibold text-ink-60">{v}%</span>
                </p>
              ))}
              <p className="text-[12.5px] text-ink-60">Top markets: Germany, UK, Poland, Türkiye</p>
            </div>
            <div key={b.id} className="ldeck-why">
              <p className="app-label">{b.title}</p>
              <p className="text-[15px] leading-snug font-medium">{b.note}</p>
              <p className="mt-auto border-t border-strike/20 pt-2 text-[13.5px]"><span className="text-ink-60">Shared as: </span><b className="font-semibold">{b.as}</b></p>
            </div>
          </div>
          <p className="flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-ink-60">
            <span>Counted from your streams, matches, socials and store. Synced 2 min ago.</span>
            <span data-ready="" className="ldeck-ready">Ready to share</span>
          </p>
        </div>
      </div>
    </figure>
  );
}
