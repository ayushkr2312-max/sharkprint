'use client';

import { useState, type CSSProperties } from 'react';
import { useRoving } from '@/components/ui/useRoving';
import { STREAMS, ZONES } from '@/content/creators';
import { trackOnce } from '@/lib/track';

const HOME = ZONES[0][0];

/** A stream's day and time as seen from a timezone. */
function when(iso: string, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return { day: get('weekday'), time: `${get('hour')}:${get('minute')}` };
}

/** The schedule's live thing, "Seen from anywhere": a creator's week as fans in other
 *  cities see it, converted to their own day and time, with the go-live alert it fires. */
export function Zones() {
  const [zone, setZone] = useState(0);
  const tz = ZONES[zone][0];
  const select = (i: number) => {
    setZone(i);
    trackOnce('zones', { type: 'timezone', room: 'creators' });
  };
  const item = useRoving(ZONES.length, zone, select);

  return (
    <figure className="zones">
      <div className="zones-head">
        <span aria-hidden="true" className="grid size-11 place-items-center rounded-[12px] bg-strike font-display text-[20px] font-bold text-white">K</span>
        <span className="grid leading-tight">
          <b className="font-display text-[20px] font-bold">Kairo’s week</b>
          <span className="text-[14px] text-ink-60">Streams from Berlin</span>
        </span>
      </div>

      <p id="zones-label" className="mt-5 text-[14px] font-medium text-ink-60">See it from</p>
      <div role="radiogroup" aria-labelledby="zones-label" className="zones-pick">
        {ZONES.map(([id, city], i) => (
          <button key={id} type="button" role="radio" aria-checked={i === zone} onClick={() => select(i)} {...item(i)}>
            {city}
          </button>
        ))}
      </div>

      <ul className="zones-list" aria-live="polite">
        {STREAMS.map(([iso, what], i) => {
          const there = when(iso, tz), home = when(iso, HOME);
          return (
            <li key={iso + tz} style={{ '--i': i } as CSSProperties}>
              <span className="zones-day">{there.day}</span>
              <span className="zones-time">{there.time}</span>
              <span className="grid gap-0.5">
                <b className="text-[16px] font-semibold">{what}</b>
                <span className="text-[13px] text-muted">{tz === HOME ? 'Kairo’s own time' : `${home.day} ${home.time} in Berlin`}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="zones-alert">
        <span className="zones-dot" aria-hidden="true" />
        <span className="grid gap-0.5">
          <span className="text-[13px] font-semibold text-muted">#live · as you start</span>
          <span className="text-[15px]"><b>Kairo is live:</b> Ranked grind. Come say hi.</span>
        </span>
      </div>
      <figcaption className="sr-only">Times are converted for the city you pick. Kairo is a fictional example.</figcaption>
    </figure>
  );
}
