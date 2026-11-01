import { cn } from '@/lib/cn';

// The staff lead's week (a fictional school).
const TEAMS: [string, number, string][] = [
  ['Valorant A', 6, 'All clear'],
  ['Valorant B', 5, '1 form missing'],
  ['Rocket League', 3, 'All clear'],
  ['EA FC', 2, 'All clear'],
];
const WEEK: [string, string, string, string][] = [
  ['Mon', '15:30', 'Practice: Valorant A and B', 'Lab'],
  ['Wed', '16:00', 'League match vs Northfield', 'Online'],
  ['Fri', '15:30', 'Tryouts: Rocket League', 'Lab'],
];
const WAITING: [string, string][] = [['Clip', 'Clutch round vs Northfield'], ['Clip', 'Tryout day, in 30 seconds'], ['Stream title', 'Friday league night']];

/** Command for a school: what the staff lead sees on a Monday morning. */
export function SchoolDash() {
  return (
    <figure data-reveal="" className="app" aria-label="The staff lead’s dashboard for a school esports program (fictional example)">
      <div className="app-bar">
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-[10px] bg-trench font-display text-[14px] font-bold text-white">YS</span>
        <span className="grid leading-tight">
          <b className="font-display text-[18px] font-bold">Your School · Esports</b>
          <span className="text-[13px] text-ink-60">Staff view</span>
        </span>
        <span className="ml-auto rounded-full bg-ice px-3 py-1 text-[12.5px] font-semibold text-strike">This week</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="app-tile grid content-start gap-2.5">
          <p className="app-label">Teams</p>
          <ul>
            {TEAMS.map(([t, n, s]) => (
              <li key={t} className="flex items-center justify-between gap-3 border-t border-hairline py-2 text-[14px] first:border-t-0">
                <span><b className="font-semibold">{t}</b> <span className="text-ink-60">· {n} players</span></span>
                <span className={cn('rounded-full px-2.5 py-0.5 text-[12px] font-semibold', s === 'All clear' ? 'bg-ice text-strike' : 'bg-ink text-paper')}>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="app-tile grid content-start gap-2.5">
          <p className="app-label">This week</p>
          <ul>
            {WEEK.map(([d, t, what, where]) => (
              <li key={what} className="grid grid-cols-[38px_48px_minmax(0,1fr)] items-baseline gap-2 border-t border-hairline py-2 text-[14px] first:border-t-0">
                <span className="font-semibold text-muted">{d}</span>
                <b className="font-display text-[16px] font-bold">{t}</b>
                <span className="min-w-0">{what} <span className="text-ink-60">· {where}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="app-tile grid content-start gap-2.5">
          <p className="app-label">Consent forms</p>
          <p className="flex items-baseline gap-2"><b className="font-display text-[30px] leading-none font-bold">42</b><span className="text-[14px] text-ink-60">of 48 back</span></p>
          <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-creme-deep"><span className="block h-full w-[87.5%] rounded-full bg-strike" /></span>
          <p className="text-[13.5px] text-ink-60">Reminder sent to 6 parents this morning.</p>
        </div>
        <div className="app-tile grid content-start gap-2.5">
          <p className="app-label">Waiting for your OK</p>
          <ul>
            {WAITING.map(([k, v]) => (
              <li key={v} className="flex items-center justify-between gap-3 border-t border-hairline py-2 text-[14px] first:border-t-0">
                <span className="min-w-0"><span className="text-ink-60">{k}:</span> {v}</span>
                <span className="rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-semibold text-paper">Review</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
