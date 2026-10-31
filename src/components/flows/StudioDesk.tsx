'use client';

import { useState, type CSSProperties } from 'react';
import { useRoving } from '@/components/ui/useRoving';
import { useSeen } from '@/components/ui/useSeen';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

// Everyone here is a fictional example: the org's creator roster, and the creators it's scouting.
const CREW = [
  { id: 'kairo', name: 'Kairo', game: 'Valorant', bg: 'bg-strike' },
  { id: 'mel', name: 'Mel', game: 'BGMI', bg: 'bg-trench' },
  { id: 'juno', name: 'Juno', game: 'Variety', bg: 'bg-navy' },
  { id: 'rook', name: 'Rook', game: 'CS2', bg: 'bg-current-blue' },
] as const;
type Who = (typeof CREW)[number]['id'];

const SCOUT = [
  { name: 'Pixelle', where: 'Valorant · EU', on: 'Twitch and Shorts', rhythm: '5 streams a week', match: 81, status: 'Shortlist',
    note: 'Chat stays on the game and stays kind. Shorts already pull new viewers into streams. A fit for community nights with your Valorant roster.' },
  { name: 'Dax', where: 'CS2 · EU', on: 'Twitch', rhythm: '4 streams a week', match: 74, status: 'Watching',
    note: 'Teaching streams with a loyal, regular chat. No short-form yet, so clips would be new reach from day one.' },
  { name: 'Sora', where: 'Valorant · TR', on: 'TikTok and Kick', rhythm: 'Shorts every day', match: 69, status: 'Watching',
    note: 'Strong on short-form, newer to streaming. The audience runs younger than your fans for now.' },
  { name: 'Mika', where: 'Variety · EU', on: 'YouTube', rhythm: '2 streams a week', match: 52, status: 'Not now',
    note: 'Lovely edits, but the games change every week and the audience barely overlaps with yours.' },
];

const LIBRARY: { who: Who; title: string; kind: string; on: string; tall?: boolean; status: string }[] = [
  { who: 'kairo', title: 'Ace on Ascent', kind: 'Clip', on: 'TikTok', tall: true, status: 'Posted' },
  { who: 'mel', title: 'Clutch 1v3, round 24', kind: 'Clip', on: 'Shorts', tall: true, status: 'Scheduled' },
  { who: 'juno', title: 'Stream VOD, 4h 12m', kind: 'VOD', on: 'Kick', status: 'Filed' },
  { who: 'rook', title: 'Rank-up night', kind: 'Thumbnail', on: 'YouTube', status: 'Needs OK' },
  { who: 'kairo', title: 'Crowd pop at the final', kind: 'Clip', on: 'Reels', tall: true, status: 'Posted' },
  { who: 'juno', title: 'Duo night with Mel', kind: 'VOD', on: 'Twitch', status: 'Scheduled' },
  { who: 'mel', title: 'Weekly highlights', kind: 'Edit', on: 'YouTube', status: 'Draft' },
  { who: 'rook', title: 'Sponsor read: Volt', kind: 'Clip', on: 'Shorts', tall: true, status: 'Needs OK' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MATCH_DAY = 5;
// [row, day, time, what]: row 0 is the org's own match, then each creator in CREW order.
const WEEK: [number, number, string, string][] = [
  [0, 5, '18:00', 'Final'],
  [1, 0, '20:00', 'Ranked'], [1, 2, '20:00', 'Ranked'], [1, 5, '18:00', 'Watch party'], [1, 6, '18:00', 'Community'],
  [2, 1, '19:30', 'Scrim review'], [2, 3, '19:30', 'Ranked'], [2, 5, '15:00', 'Pre-show'],
  [3, 0, '22:00', 'Variety'], [3, 3, '21:00', 'Duo with Mel'], [3, 4, '21:00', 'Variety'],
  [4, 1, '20:00', 'Coaching'], [4, 4, '20:00', 'Ranked'], [4, 6, '16:00', 'VOD review'],
];

const TABS = [
  { id: 'scout', label: 'Scout', foot: 'Data shortlists. A scout watches the streams before anyone reaches out.' },
  { id: 'library', label: 'Library', foot: 'Tagged by creator, game, platform and status, and searchable like your own drive.' },
  { id: 'schedule', label: 'Schedule', foot: 'Every stream clear of match days, with go-live alerts posted to your Discord.' },
] as const;

const STATUS: Record<string, string> = {
  Posted: 'bg-ice text-strike',
  Scheduled: 'bg-ice text-navy',
  Filed: 'bg-creme-deep text-ink-60',
  Draft: 'bg-creme-deep text-ink-60',
  'Needs OK': 'bg-ink text-paper',
  Shortlist: 'bg-strike text-white',
  Watching: 'bg-ice text-navy',
  'Not now': 'bg-creme-deep text-ink-60',
};

function Avatar({ name, bg, className }: { name: string; bg: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('grid size-9 flex-none place-items-center rounded-[10px] font-display text-[17px] font-bold text-white', bg, className)}>
      {name[0]}
    </span>
  );
}

/** Studio's flow, "One desk for every creator": the program as the org's staff see it, in
 *  three views. Scout ranks creators worth signing (pick one to read the scout's note),
 *  Library holds everything the roster makes (filter by creator), and Schedule lines up
 *  every stream around match day. Rows rise in as the desk scrolls into view. */
export function StudioDesk() {
  const [tab, setTab] = useState(0);
  const [pick, setPick] = useState(0);
  const [who, setWho] = useState<Who | null>(null);
  const [ref, seen] = useSeen<HTMLElement>();
  const select = (i: number) => {
    setTab(i);
    trackOnce('studio-desk', { type: 'tab', room: 'studio' });
  };
  const tabItem = useRoving(TABS.length, tab, select);
  const scout = SCOUT[pick];
  const shown = LIBRARY.filter((it) => !who || it.who === who);

  return (
    <figure ref={ref} data-on={seen.on || undefined} className="desk" aria-label="Studio, as your staff see it. Creators shown are fictional examples.">
      <div className="desk-bar">
        <p className="desk-org">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-[9px] bg-trench font-display text-[13px] font-bold text-white">YO</span>
          <span><b>Your Org</b> Studio</span>
        </p>
        <div role="tablist" aria-label="Studio views" className="desk-tabs">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`desk-tab-${t.id}`}
              aria-selected={i === tab}
              aria-controls={`desk-panel-${t.id}`}
              onClick={() => select(i)}
              {...tabItem(i)}
              className="desk-tab"
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="desk-live"><i aria-hidden="true" />2 creators live</p>
      </div>

      {/* Scout: a ranked shortlist; picking a row opens its scout note. */}
      <div role="tabpanel" id="desk-panel-scout" aria-labelledby="desk-tab-scout" hidden={tab !== 0} className="desk-panel desk-scout" key={'scout' + (tab === 0)}>
        <div>
          <p className="desk-meta">Shortlist · EU and TR · Valorant and CS2 · ranked by audience match</p>
          <ul className="desk-rows">
            {SCOUT.map((s, i) => (
              <li key={s.name} style={{ '--i': i } as CSSProperties}>
                <button type="button" aria-pressed={i === pick} onClick={() => setPick(i)} className="desk-row">
                  <Avatar name={s.name} bg={['bg-navy', 'bg-strike', 'bg-current-blue', 'bg-ink-60'][i]} />
                  <span className="grid min-w-0 gap-0.5">
                    <b className="font-display text-[18px] leading-tight font-bold">{s.name}</b>
                    <span className="truncate text-[13.5px] text-ink-60">{s.where} · {s.rhythm}</span>
                  </span>
                  <span className="desk-match" aria-label={`Audience match ${s.match} of 100`}>
                    <span aria-hidden="true" className="desk-meter"><i style={{ '--v': s.match / 100 } as CSSProperties} /></span>
                    <b>{s.match}</b>
                  </span>
                  <span className={cn('desk-chip', STATUS[s.status])}>{s.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <article className="desk-note" aria-live="polite" key={scout.name}>
          <p className="desk-meta">Scout note</p>
          <h4 className="font-display text-[26px] leading-none font-bold">{scout.name}</h4>
          <p className="text-[14px] text-ink-60">{scout.where} · {scout.on}</p>
          <p className="text-[15.5px] leading-normal">{scout.note}</p>
        </article>
      </div>

      {/* Library: everything the roster makes, filtered by creator. */}
      <div role="tabpanel" id="desk-panel-library" aria-labelledby="desk-tab-library" hidden={tab !== 1} className="desk-panel" key={'lib' + (tab === 1)}>
        <div className="desk-filters" role="group" aria-label="Filter by creator">
          <button type="button" aria-pressed={!who} onClick={() => setWho(null)} className="desk-filter">All creators</button>
          {CREW.map((c) => (
            <button key={c.id} type="button" aria-pressed={who === c.id} onClick={() => setWho(c.id)} className="desk-filter">
              <i aria-hidden="true" className={c.bg} />{c.name}
            </button>
          ))}
          <span className="desk-meta ml-auto max-md:hidden">{shown.length} of {LIBRARY.length} shown</span>
        </div>
        <ul className="desk-lib">
          {shown.map((it, i) => {
            const c = CREW.find((x) => x.id === it.who)!;
            return (
              <li key={it.title} className="desk-item" style={{ '--i': i } as CSSProperties}>
                <span aria-hidden="true" className={cn('desk-thumb', c.bg)}>
                  {it.tall && <span className="desk-frame" />}
                  <span className="desk-fmt">{it.tall ? '9:16' : '16:9'}</span>
                  <svg viewBox="0 0 24 24" className="desk-play"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
                </span>
                <b className="text-[15px] leading-snug font-semibold">{it.title}</b>
                <span className="text-[13px] text-ink-60">{c.name} · {it.kind} · {it.on}</span>
                <span className={cn('desk-chip justify-self-start', STATUS[it.status])}>{it.status}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Schedule: the roster's week, built around match day. */}
      <div role="tabpanel" id="desk-panel-schedule" aria-labelledby="desk-tab-schedule" hidden={tab !== 2} className="desk-panel" key={'week' + (tab === 2)}>
        <div className="desk-weekwrap">
          <div className="desk-week" role="table" aria-label="This week’s streams">
            <div role="row" className="contents">
              <span role="columnheader" className="desk-wk-corner"><span className="sr-only">Who</span></span>
              {DAYS.map((d, i) => (
                <span key={d} role="columnheader" className={cn('desk-wk-day', i === MATCH_DAY && 'is-match')}>{d}{i === MATCH_DAY && <small>Match</small>}</span>
              ))}
            </div>
            {[{ name: 'Your Org', game: 'Matches', bg: 'bg-trench' }, ...CREW].map((p, row) => (
              <div key={p.name} role="row" className="contents">
                <span role="rowheader" className="desk-wk-who">
                  <Avatar name={row === 0 ? 'Y' : p.name} bg={p.bg} className="size-8 text-[15px]" />
                  <span className="grid leading-tight"><b className="font-display text-[16px] font-bold">{p.name}</b><span className="text-[12.5px] text-ink-60">{p.game}</span></span>
                </span>
                {DAYS.map((d, day) => {
                  const slot = WEEK.find(([r, dd]) => r === row && dd === day);
                  return (
                    <span key={d} role="cell" className={cn('desk-wk-cell', day === MATCH_DAY && 'is-match')}>
                      {slot && (
                        <span className={cn('desk-slot', p.bg)} style={{ '--i': row + day * 0.4 } as CSSProperties}>
                          <b>{slot[2]}</b>{slot[3]}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="desk-foot">
        <span>{TABS[tab].foot}</span>
        <span className="text-muted">Creators shown are fictional examples.</span>
      </figcaption>
    </figure>
  );
}
