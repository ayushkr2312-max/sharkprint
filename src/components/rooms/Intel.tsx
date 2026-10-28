'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { IntelFunnel } from '@/components/flows/IntelFunnel';
import { Icon } from '@/components/ui/Icon';
import { Eyebrow, Heading, Lead, Micro, Accent } from '@/components/ui/type';
import { useRoving } from '@/components/ui/useRoving';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

// A sample prep pack for the next match (Team Orca and Kyro are fictional).
const PREP: [string, string][] = [
  ['How they open', 'Fast A executes on pistol rounds'],
  ['How they adjust', 'Stack B after two lost rounds'],
  ['Who to watch', 'Kyro on entry, always first through A main'],
  ['Our plan', 'Delay A, punish the late rotate'],
];

// Who the desk scouts for, with one sample from each shortlist (all fictional).
const SCOUT = [
  {
    id: 'players', label: 'Players', name: 'Nexo', meta: 'IGL / Support · Tier 2 · 19', fit: 87,
    bars: [['Consistency', 90], ['Clutch rate', 82], ['Comms', 78], ['Utility', 64]],
    note: 'Calm mid-game calls; carries a young lineup. Recommend trial scrims.',
    more: [['Halden', 'Initiator · Tier 2', 81], ['Pike', 'AWPer · Tier 2', 79]],
  },
  {
    id: 'teams', label: 'Teams', name: 'Vanta Academy', meta: 'Scrim partner · Challengers', fit: 81,
    bars: [['Level match', 84], ['Schedule overlap', 92], ['Style contrast', 76], ['Reliability', 88]],
    note: 'Plays the fast executes your roster struggles with. Book them for prep week.',
    more: [['Rook Esports', 'Scrim partner · Tier 2', 77], ['North Five', 'Next opponent', 72]],
  },
  {
    id: 'staff', label: 'Staff', name: 'Mira Sato', meta: 'Assistant coach · 4 seasons', fit: 84,
    bars: [['Structure', 88], ['Comms', 86], ['Results', 74], ['Culture fit', 90]],
    note: 'Took two academy rosters up a tier. Strong on review routines.',
    more: [['Theo Brandt', 'Performance coach', 80], ['Ana Ruiz', 'Analyst', 76]],
  },
  {
    id: 'creators', label: 'Creators', name: 'Kayo', meta: 'Valorant creator · co-streams', fit: 79,
    bars: [['Audience match', 86], ['Engagement', 81], ['Brand safety', 92], ['Growth', 70]],
    note: 'Audience overlaps your home region. A fit for a co-stream series.',
    more: [['Lumi', 'Variety streamer', 75], ['Drift', 'Clip creator', 71]],
  },
] as const;

type Props = { headingLevel?: 'h1' | 'h2' };

/** 04 Intel: one analyst desk doing two jobs. What it works from and what it hands back
 *  (the funnel, from the whole scene down to a shortlist), then both jobs side by side: the prep pack for the next match, and the
 *  shortlist for whoever you're looking for, from players to creators. */
export function IntelRoom({ headingLevel = 'h2' }: Props) {
  const H = headingLevel;
  return (
    <Room tone="abyss" room="intel" id="intel" labelledBy="intel-title" className="overflow-hidden">
      {/* Quiet range rings behind the board. */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-[12%] -right-[28%] z-0 aspect-square w-[min(1200px,110vw)] rounded-full [background:repeating-radial-gradient(circle,transparent_0_62px,rgba(175,198,255,.09)_62px_63px)] [mask-image:radial-gradient(circle,#000_25%,transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-[20%] -left-[15%] z-0 size-[900px] rounded-full bg-[radial-gradient(circle,rgba(22,51,127,.45),transparent_65%)]" />

      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
          <div className="grid gap-6">
            <Eyebrow>Intel</Eyebrow>
            <Heading as={H} id="intel-title" size="h1">
              Prep to win.<br /><Accent touch="scan">Scout to grow.</Accent>
            </Heading>
          </div>
          <Lead className="lg:pb-3">
            Opponent prep for every match your rosters play, and scouting across players, teams, staff and creators. One analyst desk does both.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <IntelFunnel />
        </div>

        <div data-line="foot" className="mt-5 grid gap-5 lg:grid-cols-2">
          <PrepPack />
          <Shortlist />
        </div>
      </div>
    </Room>
  );
}

/** Job one: the pack your roster gets before a match. */
function PrepPack() {
  return (
    <article aria-labelledby="prep-title" className="grid content-start gap-5 rounded-[24px] border border-mist/15 bg-white/[.04] p-[clamp(20px,2.4vw,28px)]">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="label text-[10px] text-mist/75">Match prep · Grand final</p>
          <h3 id="prep-title" className="mt-2 font-display text-[clamp(24px,2.2vw,30px)] leading-none font-bold text-white">vs Team Orca</h3>
        </div>
        <span className="label shrink-0 rounded-full bg-strike px-2.5 py-1.5 text-[10px] font-bold text-white">2 days out</span>
      </header>
      <Asset src="intel/heatmap-opponent-dark.svg" label="Opponent heatmap: Team Orca, last 20 maps" className="overflow-hidden rounded-[16px] border border-mist/10" />
      <dl className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
        {PREP.map(([k, v]) => (
          <div key={k} className="border-t border-rule-dark pt-3">
            <dt className="label text-[10px] font-semibold text-mist">{k}</dt>
            <dd className="mt-1.5 text-[15px] leading-snug text-fog">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Job two: a shortlist for whoever the org is looking for. */
function Shortlist() {
  const ref = useRef<HTMLElement>(null);
  const [cat, setCat] = useState(0);
  const [on, setOn] = useState(false);
  const pick = (i: number) => {
    setCat(i);
    trackOnce('scout', { type: 'scout', room: 'intel' });
  };
  const item = useRoving(SCOUT.length, cat, pick);
  const s = SCOUT[cat];

  // The bars fill the first time the card is seen, and again for every new shortlist.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setOn(true);
      io.disconnect();
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <article ref={ref} aria-labelledby="scout-title" className="grid content-start gap-5 rounded-[24px] border border-mist/15 bg-white/[.04] p-[clamp(20px,2.4vw,28px)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="label text-[10px] text-mist/75">Scouting · Shortlist</p>
          <h3 id="scout-title" className="mt-2 font-display text-[clamp(24px,2.2vw,30px)] leading-none font-bold text-white">Who&apos;s next</h3>
        </div>
        <div role="tablist" aria-label="Scouting for" className="inline-flex flex-wrap gap-1 rounded-full border border-mist/20 bg-white/6 p-1">
          {SCOUT.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`scout-tab-${c.id}`}
              aria-selected={i === cat}
              aria-controls="scout-card"
              onClick={() => pick(i)}
              {...item(i)}
              className="h-9 rounded-full px-3.5 text-[13px] font-semibold text-fog transition-colors duration-300 hover:text-white aria-selected:bg-strike aria-selected:text-white"
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      <div
        key={s.id}
        role="tabpanel"
        id="scout-card"
        aria-labelledby={`scout-tab-${s.id}`}
        data-on={on}
        className="report rounded-[20px] bg-paper p-[clamp(20px,2.2vw,26px)] text-ink shadow-deep"
      >
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="grid size-[60px] flex-none place-items-center rounded-2xl bg-trench font-logo text-[15px] text-mist">
            {s.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[26px] leading-none font-extrabold tracking-[-0.02em]">{s.name}</p>
            <p className="mt-1.5 text-[14px] text-ink-60">{s.meta}</p>
          </div>
          <p className="grid shrink-0 justify-items-end leading-none">
            <span className="label text-[10px] text-muted">Fit</span>
            <span className="mt-1 font-display text-[32px] font-extrabold text-strike">{s.fit}</span>
          </p>
        </div>
        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {s.bars.map(([k, v]) => (
            <li key={k} className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-[5px] text-[14px]">
              <span>{k}</span>
              <b className="font-mono font-medium tabular-nums">{v}</b>
              <span className="report-bar col-span-full h-[7px] overflow-hidden rounded bg-creme-deep">
                <i className={v < 70 ? 'bg-current-blue' : 'bg-strike'} style={{ '--v': v / 100 } as CSSProperties} />
              </span>
            </li>
          ))}
        </ul>
        <p className="label mt-5 border-t border-hairline pt-3.5 text-muted">Scout note</p>
        <p className="mt-1.5 text-[15px] text-ink-60">{s.note}</p>
        <p className={cn('mt-4 flex items-center gap-2 rounded-[10px] bg-creme px-3 py-[9px] text-[13px] text-ink-60')}>
          <Icon name="check" strokeWidth={12} className="size-4 text-strike" /> Reviewed by the Sharkprint scout desk
        </p>
      </div>

      <div className="grid gap-2.5">
        <p className="label text-[10px] text-mist/75">Also on the list</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {s.more.map(([n, m, fit]) => (
            <li key={n} className="flex items-center justify-between gap-3 rounded-[14px] border border-mist/15 bg-white/[.04] px-4 py-3">
              <span className="grid">
                <b className="text-[15px] font-semibold text-white">{n}</b>
                <span className="text-[13px] text-fog">{m}</span>
              </span>
              <span className="font-display text-[22px] font-extrabold text-mist">{fit}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

const QUAD: [string, string][] = [
  ['Scout', 'Scene scouting reports — players, staff and creators in the scenes you care about, shortlisted by fit.'],
  ['Prep', 'Opponent packs per roster: map tendencies, comps, habits, pistol and clutch patterns.'],
  ['Market', 'Who the orgs at your level partner with, what content wins in your scene, where the gaps are.'],
  ['Analyst', 'One analyst desk serving every team — instead of hiring an analyst per roster and a scout for the org.'],
];

export function IntelDeep() {
  return (
    <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,88px)] lg:grid-cols-2">
      <div className="grid content-start gap-6">
        <Eyebrow>Your analyst, for every roster</Eyebrow>
        <Heading size="h2">
          Take decisions with data.<br /><Accent>Get the edge.</Accent>
        </Heading>
        <dl className="grid gap-x-7 gap-y-[22px] sm:grid-cols-2">
          {QUAD.map(([k, v]) => (
            <div key={k} className="border-t border-rule-dark pt-3.5">
              <dt className="mb-1 font-display text-[20px] font-bold text-white">{k}</dt>
              <dd className="text-[15px] text-fog">{v}</dd>
            </div>
          ))}
        </dl>
        <Micro>Data shortlists. Scouts who know the scene decide.</Micro>
      </div>
      <Asset src="intel/radar-player-dark.svg" label="Player radar: aim, utility, comms, consistency, clutch, role fit" className="w-full max-w-[460px] justify-self-center" />
    </div>
  );
}
