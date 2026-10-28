'use client';

import type { CSSProperties } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useSeen } from '@/components/ui/useSeen';

// Landscape footage in, from four kinds of source…
const FEEDS = [
  { name: 'Player POVs', note: 'Streams & scrims' },
  { name: 'Team streams', note: 'Your channels' },
  { name: 'Creator streams', note: 'Co-streams' },
  { name: 'Broadcasts', note: 'Tournament feeds' },
];
// …run down one reel…
const STAGES = ['Log', 'Find', 'Clip', 'Subtitle', 'Edit'];
const REEL = [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0]; // 1: a moment worth clipping
// …and vertical clips out, to every platform.
const OUTS = [
  { name: 'Shorts', note: 'YouTube · 9:16' },
  { name: 'Reels', note: 'Instagram · 9:16' },
  { name: 'TikTok', note: 'TikTok · 9:16' },
  { name: 'Highlights', note: 'Long-form · 16:9' },
];
const ROWS = [50, 150, 250, 350]; // the four rows' centres in the wires' 0–400 box

/** Engine's flow, "16:9 in, 9:16 out": a wall of live feeds runs onto one reel, through
 *  the five steps to the cut, and comes out as stacks of vertical clips per platform.
 *  The reel rolls and the clips land only while it's on screen. */
export function EngineCut() {
  const [ref, { on, live }] = useSeen<HTMLElement>();
  return (
    <figure
      ref={ref}
      data-on={on}
      data-live={live}
      aria-label="How Engine works: landscape footage from player POVs, team streams, creator streams and tournament broadcasts is logged, searched for moments, clipped, subtitled and edited, and comes out as vertical clips for Shorts, Reels and TikTok, plus long-form highlights."
      className="cut"
    >
      <p className="cut-cap" aria-hidden="true"><span>16:9 in</span><span>9:16 out</span></p>

      <div className="cut-feeds" aria-hidden="true">
        {FEEDS.map((f, i) => (
          <div key={f.name} className="cut-feed" style={{ '--i': i } as CSSProperties}>
            <span className="cut-screen"><i>Live</i></span>
            <span className="cut-label">{f.name}<small>{f.note}</small></span>
          </div>
        ))}
      </div>

      <svg className="cut-wires" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
        {ROWS.map((y) => <path key={y} d={`M0 ${y}C55 ${y} 45 200 100 200`} />)}
      </svg>

      <div className="cut-line" aria-hidden="true">
        <ol className="cut-stages">{STAGES.map((s) => <li key={s}>{s}</li>)}</ol>
        <div className="cut-run">
          <div className="cut-strip">
            <div className="cut-reel">
              {[...REEL, ...REEL].map((m, i) => <i key={i} data-moment={m ? '' : undefined} />)}
            </div>
          </div>
          <div className="cut-head">
            <Icon name="engine" strokeWidth={7} className="size-6" />
            <span>Engine</span>
          </div>
        </div>
      </div>

      <svg className="cut-wires" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
        {ROWS.map((y) => <path key={y} d={`M0 200C55 200 45 ${y} 100 ${y}`} />)}
      </svg>

      <div className="cut-outs" aria-hidden="true">
        {OUTS.map((o, i) => (
          <div key={o.name} className="cut-out" style={{ '--i': i } as CSSProperties}>
            <span className="cut-stack">
              {[0, 1, 2].map((k) => <span key={k} className="cut-clip" style={{ '--k': k } as CSSProperties}><b /></span>)}
            </span>
            <span className="cut-label">{o.name}<small>{o.note}</small></span>
          </div>
        ))}
      </div>
    </figure>
  );
}
