'use client';

import { useState } from 'react';
import { Asset } from '@/components/ui/Asset';
import { Icon, PILLARS, type Pillar } from '@/components/ui/Icon';
import { useRoving } from '@/components/ui/useRoving';
import { cn } from '@/lib/cn';

type Piece = { pillar: Pillar; src: string; title: string; line: string; shape?: 'wide' | 'tall' | 'report' };

// Sample artefacts on fictional teams; client case studies are added with permission.
const PIECES: Piece[] = [
  { pillar: 'forge', src: 'forge/brand-site.svg', title: 'Brand website', line: 'Rosters, matches, partners and shop in one home.', shape: 'wide' },
  { pillar: 'engine', src: 'engine/clip-arena.svg', title: 'Grand final clip', line: '9:16, karaoke subtitles, shipped same week.', shape: 'tall' },
  { pillar: 'intel', src: 'intel/scouting-report.svg', title: 'Scouting report', line: "Fit score, role stats and a scout's note.", shape: 'report' },
  { pillar: 'command', src: 'command/dashboard-light.svg', title: 'Org dashboard', line: 'Followers, win rates, clips and deliverables on one screen.', shape: 'wide' },
  { pillar: 'forge', src: 'forge/tournament.svg', title: 'Tournament platform', line: 'Registration, brackets and results with an admin view.', shape: 'wide' },
  { pillar: 'intel', src: 'intel/heatmap-opponent.svg', title: 'Opponent prep', line: 'Map tendencies over the last 20 maps.' },
  { pillar: 'engine', src: 'engine/clip-tactical.svg', title: 'Clutch clip', line: 'Tactical overlay, hook in the first second.', shape: 'tall' },
  { pillar: 'command', src: 'command/widget-followers.svg', title: 'Followers widget', line: 'All platforms, synced every few minutes.' },
  { pillar: 'forge', src: 'forge/merch-store.svg', title: 'Merch store', line: 'Limited drops with sizes and checkout.', shape: 'wide' },
  { pillar: 'engine', src: 'engine/clip-calendar.svg', title: 'Clip calendar', line: 'A sample month, every day filled.' },
  { pillar: 'intel', src: 'intel/radar-player.svg', title: 'Player radar', line: 'Six traits, one shape per player.' },
  { pillar: 'forge', src: 'forge/microsite.svg', title: 'Season launch microsite', line: 'Countdown, reveals and a watch party.', shape: 'wide' },
  { pillar: 'command', src: 'command/sources-stack.svg', title: 'Source map', line: 'From scattered tools to one live dashboard.' },
  { pillar: 'engine', src: 'engine/clip-stat.svg', title: 'Stat card clip', line: 'Four down in nine seconds, told in numbers.', shape: 'tall' },
  { pillar: 'forge', src: 'forge/web-app.svg', title: 'Scrim scheduler', line: 'An internal tool your staff actually use.', shape: 'wide' },
];

const FILTERS = ['all', ...PILLARS] as const;
type Filter = (typeof FILTERS)[number];

/** Work, filterable by pillar (concept p.09). */
export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const select = (i: number) => setFilter(FILTERS[i]);
  const item = useRoving(FILTERS.length, FILTERS.indexOf(filter), select);
  const shown = PIECES.filter((p) => filter === 'all' || p.pillar === filter);

  return (
    <>
      <div role="radiogroup" aria-label="Filter by pillar" className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={f === filter}
            onClick={() => select(i)}
            {...item(i)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-paper px-4 text-[14px] font-semibold capitalize transition-colors duration-200 aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper"
          >
            {f !== 'all' && <Icon name={f} strokeWidth={7} className="size-[18px]" />}
            {f}
          </button>
        ))}
      </div>
      <p className="label text-muted" aria-live="polite">{shown.length} {shown.length === 1 ? 'piece' : 'pieces'}</p>
      <ul className="mt-2 grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li
            key={p.src}
            className={cn(
              'grid animate-[route-in_.5s_var(--ease-out-expo)_both] content-start gap-2 rounded-[22px] border border-hairline bg-paper px-3.5 pt-3.5 pb-5 transition-[translate,box-shadow] duration-[450ms] ease-out-expo hover:-translate-y-1 hover:shadow-2',
              p.shape === 'wide' && 'md:col-span-2',
              p.shape === 'tall' && 'md:row-span-2',
            )}
          >
            <Asset
              src={p.src}
              label={p.title}
              className={cn(
                'mb-2 w-full overflow-hidden rounded-[14px]',
                p.shape === 'tall' && 'max-w-[220px] justify-self-center overflow-visible drop-shadow-[0_20px_24px_rgba(7,18,43,.25)]',
                p.shape === 'report' && 'max-w-[320px] justify-self-center',
              )}
            />
            <p className="label px-1.5 text-strike capitalize">{p.pillar}</p>
            <h2 className="px-1.5 font-display text-[22px] leading-[1.1] font-bold tracking-[-0.01em]">{p.title}</h2>
            <p className="px-1.5 text-[15px] text-ink-60">{p.line}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
