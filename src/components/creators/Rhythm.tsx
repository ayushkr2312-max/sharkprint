'use client';

import { useState, type CSSProperties } from 'react';
import { useRoving } from '@/components/ui/useRoving';
import { useSeen } from '@/components/ui/useSeen';
import { trackOnce } from '@/lib/track';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const RATES = [1, 2, 3] as const;
type Rate = (typeof RATES)[number];
// When the posts go out at each rhythm, and which feed each one lands on.
const TIMES: Record<Rate, string[]> = { 1: ['18:00'], 2: ['12:00', '19:00'], 3: ['09:00', '14:00', '20:00'] };
const FEEDS = ['Shorts', 'TikTok', 'Reels'];
// A sample week of streams: the day, its length, and its bar's share of the longest.
const STREAMS: [string, string, number][] = [['Mon', '3h 40m', 0.9], ['Wed', '4h 05m', 1], ['Fri', '2h 50m', 0.7]];

/** Where the k-th picked moment sits: which stream, and how far into it (0 to 1). */
function moment(k: number): [number, number] {
  const s = k % STREAMS.length;
  const f = ((k + 1) * 0.618034 + s * 0.27) % 1;
  return [s, 0.05 + f * 0.9];
}

/** The creators hero's live thing, "This week's streams, next week's posts": choose how many
 *  posts a day and the moments get picked out of the week's streams and land on next
 *  week's calendar, each on its feed and time. */
export function Rhythm() {
  const [rate, setRate] = useState<Rate>(2);
  const [ref, seen] = useSeen<HTMLElement>();
  const n = rate * 7;
  const select = (i: number) => {
    setRate(RATES[i]);
    trackOnce('rhythm', { type: 'rhythm', room: 'creators' });
  };
  const item = useRoving(RATES.length, RATES.indexOf(rate), select);

  return (
    <figure ref={ref} data-on={seen.on || undefined} className="rhythm">
      <div className="rhythm-top">
        <p className="rhythm-cap">This week’s streams, <b>next week’s posts</b></p>
        <div className="rhythm-rate">
          <span id="rhythm-label" className="text-[14px] font-medium text-ink-60">Posts a day</span>
          <div role="radiogroup" aria-labelledby="rhythm-label" className="rhythm-seg">
            {RATES.map((r, i) => (
              <button key={r} type="button" role="radio" aria-checked={r === rate} onClick={() => select(i)} {...item(i)}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rhythm-body">
        <div className="rhythm-streams">
          {STREAMS.map(([day, len, w], s) => (
            <div key={day} className="rhythm-stream">
              <span className="rhythm-day">{day}</span>
              <span className="rhythm-vod" style={{ '--w': w } as CSSProperties}>
                {Array.from({ length: n }, (_, k) => moment(k)).map(([at, x], k) => at === s && (
                  <i key={`${rate}-${k}`} style={{ left: `${x * 100}%`, '--i': k } as CSSProperties} />
                ))}
              </span>
              <span className="rhythm-len">{len}</span>
            </div>
          ))}
          <p className="rhythm-count"><b>{n}</b> moments picked for next week</p>
        </div>

        <svg viewBox="0 0 64 16" aria-hidden="true" className="rhythm-arrow">
          <path d="M0 8h60M52 2l8 6-8 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <ol className="rhythm-week" aria-label={`Next week: ${n} posts, ${rate} a day`}>
          {DAYS.map((d, i) => (
            <li key={d} className="rhythm-col">
              <span className="rhythm-dh">{d}</span>
              {TIMES[rate].map((t, k) => {
                const feed = FEEDS[(i + k) % FEEDS.length];
                return (
                  <span key={`${rate}-${k}`} className="rhythm-post" data-feed={feed} style={{ '--i': i * rate + k } as CSSProperties}>
                    <b>{t}</b>
                    <span><i aria-hidden="true" />{feed}</span>
                  </span>
                );
              })}
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="rhythm-foot">
        You choose how often you post. Every clip is cut from your own streams, and nothing goes out without your OK.
      </figcaption>
    </figure>
  );
}
