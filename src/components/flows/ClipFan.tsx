import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

// One grand final, cut into fifteen vertical clips and spread across the org's channels and
// its players' own. Teams, players and numbers are fictional.

const CHANNELS: { who: string; on: string; n: number; status: string; org?: boolean; bg: string }[] = [
  { who: 'Your Org', on: 'TikTok', n: 3, status: 'Posted', org: true, bg: 'bg-strike' },
  { who: 'Your Org', on: 'Shorts', n: 3, status: 'Posted', org: true, bg: 'bg-strike' },
  { who: 'Your Org', on: 'Reels', n: 2, status: 'Scheduled', org: true, bg: 'bg-strike' },
  { who: 'Kai', on: 'TikTok', n: 2, status: 'Approved by Kai', bg: 'bg-trench' },
  { who: 'Mira', on: 'Shorts', n: 2, status: 'Approved by Mira', bg: 'bg-navy' },
  { who: 'Deniz', on: 'Reels', n: 2, status: 'Approved by Deniz', bg: 'bg-current-blue' },
  { who: 'Sami', on: 'X', n: 1, status: 'Waiting for Sami', bg: 'bg-ink-60' },
];

/** The Sharkprint way: the match on the left, wired out to every channel it feeds, each with
 *  its clips and where they stand. */
export function ClipFan() {
  const total = CHANNELS.reduce((a, c) => a + c.n, 0);
  return (
    <figure className="fan" aria-label={`One match cut into ${total} vertical clips across the org’s and players’ channels (sample)`}>
      <div className="fan-src app">
        <div className="app-bar">
          <b className="font-display text-[16px] font-bold">Grand final</b>
          <span className="ml-auto rounded-full bg-creme-deep px-2 py-0.5 text-[11px] font-semibold text-ink-60">Sample</span>
        </div>
        <div className="grid gap-3 p-4">
          <p className="flex items-center justify-between font-display text-[22px] font-bold">
            <span>Your Org</span><span className="text-strike">2 : 1</span><span className="text-ink-60">Orca</span>
          </p>
          <span aria-hidden="true" className="relative grid aspect-video place-items-center overflow-hidden rounded-[10px] bg-abyss">
            <svg viewBox="0 0 24 24" className="size-9 rounded-full bg-white/15 p-2 text-white"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
            <span className="absolute right-2 bottom-2 rounded-[6px] bg-black/40 px-1.5 py-0.5 font-mono text-[11px] font-bold text-white">3:12:06</span>
          </span>
          <p className="text-[13px] text-ink-60">Valorant · best of three · full VOD</p>
          <p className="rounded-[10px] bg-ice px-3 py-2 text-[13px] font-semibold text-strike">{total} moments picked by an editor</p>
        </div>
      </div>
      <svg aria-hidden="true" className="fan-wires" viewBox={`0 0 60 ${CHANNELS.length * 100}`} preserveAspectRatio="none">
        {CHANNELS.map((c, i) => {
          const y = (i + 0.5) * 100, mid = (CHANNELS.length * 100) / 2;
          return <path key={c.who + c.on} d={`M0 ${mid}C30 ${mid} 30 ${y} 60 ${y}`} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <ul className="fan-out">
        {CHANNELS.map((c, i) => (
          <li key={c.who + c.on} className="fan-row" style={{ '--i': i } as CSSProperties}>
            <span aria-hidden="true" className={cn('grid size-8 flex-none place-items-center rounded-[9px] font-display text-[13px] font-bold text-white', c.bg)}>{c.org ? 'YO' : c.who[0]}</span>
            <span className="grid min-w-0 leading-tight">
              <b className="truncate text-[14px] font-semibold">{c.who}</b>
              <span className="text-[12px] text-ink-60">{c.on}</span>
            </span>
            <span aria-label={`${c.n} clips`} className="flex gap-1">
              {Array.from({ length: c.n }, (_, k) => <i key={k} className={cn('h-7 w-[16px] rounded-[4px]', c.bg)} />)}
            </span>
            <span className={cn('justify-self-end rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold whitespace-nowrap', c.status.startsWith('Waiting') ? 'bg-ink text-paper' : 'bg-ice text-strike')}>{c.status}</span>
          </li>
        ))}
      </ul>
      <figcaption className="fan-foot"><b>{total} clips, {CHANNELS.length} channels.</b> Players approve the clips that go out on their own channels.</figcaption>
    </figure>
  );
}

/** The old way: the final sits in a drive while everyone asks for clips. */
export function OldClips() {
  const chat: [string, string][] = [
    ['Kai', 'can someone send me the ace from map 3?'],
    ['Social', 'only had time to cut one highlight today'],
    ['Mira', 'clipped it myself, posted with the old logo, sorry'],
    ['Manager', 'Volt asked why none of the players posted'],
  ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
      <figure className="app" aria-label="The old way: the final’s VOD sitting in a shared drive (sample)">
        <div className="app-bar"><b className="font-display text-[17px] font-bold">Shared drive</b><span className="text-[13px] text-ink-60">/ finals</span></div>
        <ul className="px-4 py-2 text-[14px]">
          {[['grand_final_full.mp4', '3:12:06'], ['map3_FINAL.mp4', '41:20'], ['clip_ace_v1.mp4', '0:52']].map(([f, d]) => (
            <li key={f} className="flex items-center justify-between gap-3 border-b border-hairline py-2.5 last:border-b-0">
              <span className="font-mono text-[13px]">{f}</span><span className="text-ink-60">{d}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-hairline px-4 py-3 text-[13px] text-ink-60">One clip made. Posted on one channel.</p>
      </figure>
      <figure className="app" aria-label="The old way: players asking for clips in a group chat (sample)">
        <div className="app-bar"><b className="font-display text-[17px] font-bold">#content</b><span className="ml-auto rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-semibold text-paper">23 unread</span></div>
        <ul className="grid gap-2.5 p-4">
          {chat.map(([who, msg], i) => (
            <li key={i} className="grid grid-cols-[34px_minmax(0,1fr)] gap-2.5">
              <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-creme-deep font-display text-[13px] font-bold text-ink-60">{who[0]}</span>
              <span className="grid gap-0.5 text-[14px]"><b className="text-[12.5px] font-semibold text-muted">{who}</b>{msg}</span>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
