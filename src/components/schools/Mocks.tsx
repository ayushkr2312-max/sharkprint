import { Asset } from '@/components/ui/Asset';
import { cn } from '@/lib/cn';

// Product screens for the schools page. Every school, team and number is a fictional example.

/** The hero dock's staff view: who's clear to play, and what's waiting for a staff OK. */
export function StaffThumb() {
  return (
    <div className="app">
      <div className="app-bar py-2.5!">
        <b className="font-display text-[15px] font-bold">Staff view</b>
        <span className="ml-auto rounded-full bg-ice px-2 py-0.5 text-[11px] font-semibold text-strike">This week</span>
      </div>
      <ul className="px-3 pt-1 text-[12.5px]">
        {[['Valorant A', 'All clear'], ['Valorant B', '1 form missing'], ['Rocket League', 'All clear']].map(([t, st]) => (
          <li key={t} className="flex items-center justify-between gap-2 border-b border-hairline py-2">
            <b className="font-semibold">{t}</b>
            <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap', st === 'All clear' ? 'bg-ice text-strike' : 'bg-ink text-paper')}>{st}</span>
          </li>
        ))}
      </ul>
      <p className="m-2.5 flex items-center justify-between rounded-[10px] bg-creme px-3 py-2 text-[12px]"><span>3 clips waiting for your OK</span><b className="font-semibold text-strike">Review</b></p>
    </div>
  );
}

/** The program blueprint: the plan leadership signs before anything is set up. */
export function BlueprintMock() {
  const rows: [string, string][] = [
    ['Games and teams', 'Valorant (2 teams), Rocket League, EA FC'],
    ['Schedule', 'Practice Mon and Wed after school; league matches on Wednesdays'],
    ['People', 'A staff lead, two coaches, five student roles'],
    ['Policies', 'Code of conduct, parent consent, streaming and media'],
    ['Budget', 'Costed per term, with what to add in year two'],
  ];
  return (
    <figure className="app" aria-label="A program blueprint for a school esports program (fictional example)">
      <div className="app-bar">
        <b className="font-display text-[18px] font-bold">Program blueprint</b>
        <span className="text-[13px] text-ink-60">Your School</span>
        <span className="ml-auto rounded-full bg-creme-deep px-3 py-1 text-[12.5px] font-semibold text-ink-60">For leadership</span>
      </div>
      <ol className="px-5">
        {rows.map(([k, v], i) => (
          <li key={k} className="grid grid-cols-[28px_120px_minmax(0,1fr)] items-baseline gap-2 border-b border-hairline py-3 text-[14px] max-sm:grid-cols-[28px_minmax(0,1fr)]">
            <span className="font-display font-bold text-strike">{i + 1}</span>
            <b className="font-semibold">{k}</b>
            <span className="text-ink-60 max-sm:col-start-2">{v}</span>
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-2 gap-6 px-5 pt-5 pb-5">
        {['Staff lead', 'Head of school'].map((who, i) => (
          <div key={who} className="grid gap-1.5">
            <span className="relative h-9 border-b border-ink/40">
              {i === 0 && <svg viewBox="0 0 160 36" aria-hidden="true" className="absolute bottom-0 left-0 h-9 w-40 text-strike"><path d="M6 28c10-16 18-20 22-10s-4 18 4 12 12-22 20-14-2 16 8 10 14-14 22-8 6 10 16 4 18-6 30-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            <span className="text-[12.5px] text-ink-60">{who}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

/** Media: three match clips, each cleared by staff before it posts. */
export function ClipTrio() {
  const clips = [
    ['engine/clip-tactical.svg', 'A clutch round, cut vertical with subtitles'],
    ['engine/clip-arena.svg', 'The crowd at a league final'],
    ['engine/clip-stat.svg', 'Four eliminations in nine seconds'],
  ];
  return (
    <div className="flex items-start justify-center gap-[clamp(10px,1.6vw,20px)] py-4">
      {clips.map(([src, label], i) => (
        <Asset key={src} src={src} label={label} className={cn('w-[30%] max-w-[190px]', i === 1 ? 'md:-mt-6' : 'md:mt-6')} />
      ))}
    </div>
  );
}
