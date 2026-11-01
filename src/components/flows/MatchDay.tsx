import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

// A sample match day for a Valorant roster spread over four timezones, and the sponsor
// deliverables due the same night. Teams, players and brands are fictional.

const ZONES = [['London', 'Kai', -1], ['Helsinki', 'Sami', 1], ['Istanbul', 'Deniz', 2]] as const;
const SHEET: [string, string, string][] = [
  ['16:30', 'Warm-up scrim', 'Done'],
  ['17:45', 'Comms and tech check', 'Done'],
  ['18:30', 'Opponent brief from Intel', 'Now'],
  ['19:00', 'Match vs Orca, best of three', 'Next'],
  ['21:30', 'Clips, player posts, sponsor shout', 'Queued'],
];
const at = (t: string, dh: number) => {
  const [h, m] = t.split(':').map(Number);
  return `${String((h + dh + 24) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const CHIP: Record<string, string> = {
  Done: 'bg-creme-deep text-ink-60',
  Now: 'bg-strike text-white',
  Next: 'bg-ice text-strike',
  Queued: 'bg-ice text-navy',
};

/** The Sharkprint way: one run-sheet, each time in every player's own zone, beside the
 *  sponsor deliverables due tonight. */
export function RunSheet() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.45fr_1fr]">
      <figure className="app" aria-label="Match-day run-sheet with every time shown in each player’s timezone (sample)">
        <div className="app-bar">
          <b className="font-display text-[18px] font-bold">Match day</b>
          <span className="text-[13px] text-ink-60">Sat 9 Nov · Valorant · vs Orca</span>
          <span className="ml-auto rounded-full bg-creme-deep px-2 py-0.5 text-[11px] font-semibold text-ink-60">Sample</span>
        </div>
        <p className="px-4 pt-2.5 text-[12.5px] font-semibold text-strike md:hidden">Swipe for each player’s local time →</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-[14px]">
            <thead>
              <tr className="text-[12.5px] text-muted">
                <th scope="col" className="px-4 pt-3 pb-2 font-medium">Berlin <span className="block text-[11.5px]">Org, Mira, Leo</span></th>
                <th scope="col" className="px-2 pt-3 pb-2 font-medium">What</th>
                {ZONES.map(([city, who]) => <th key={city} scope="col" className="px-2 pt-3 pb-2 font-medium">{city} <span className="block text-[11.5px]">{who}</span></th>)}
                <th scope="col" className="px-4 pt-3 pb-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {SHEET.map(([t, what, st], i) => (
                <tr key={what} className={cn('border-t border-hairline', st === 'Now' && 'bg-ice/60')} style={{ '--i': i } as CSSProperties}>
                  <td className="px-4 py-2.5 font-display text-[17px] font-bold">{t}</td>
                  <td className="px-2 py-2.5 font-medium">{what}</td>
                  {ZONES.map(([city, , dh]) => <td key={city} className="px-2 py-2.5 font-display text-[15px] font-semibold text-ink-60">{at(t, dh)}</td>)}
                  <td className="px-4 py-2.5 text-right"><span className={cn('rounded-full px-2.5 py-0.5 text-[12px] font-semibold', CHIP[st])}>{st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-hairline px-4 py-2.5 text-[13px] text-ink-60">Every player sees their own times. Change one row and everyone’s calendar moves with it.</p>
      </figure>

      <figure className="app" aria-label="Sponsor deliverables due tonight (sample)">
        <div className="app-bar">
          <b className="font-display text-[18px] font-bold">Sponsors tonight</b>
          <span className="ml-auto rounded-full bg-creme-deep px-2 py-0.5 text-[11px] font-semibold text-ink-60">Sample</span>
        </div>
        <div className="grid gap-3 p-4">
          <p className="text-[13px] font-semibold text-muted">Volt Energy · Finals campaign</p>
          <div className="app-tile grid gap-2 p-3!">
            <p className="flex items-baseline justify-between text-[14px]"><span className="font-semibold">Player posts live</span><b className="font-display text-[22px] font-bold text-strike">12/14</b></p>
            <span className="h-2 overflow-hidden rounded-full bg-creme-deep"><span className="block h-full w-[86%] rounded-full bg-strike" /></span>
            <p className="text-[12.5px] text-ink-60">Waiting on Sami and Deniz, reminded at 18:00</p>
          </div>
          <ul className="grid gap-2 text-[14px]">
            {[['Stream overlay', 'Active', true], ['Logo in post-match interview', 'Booked', false], ['Recap report to Volt', 'Due Mon', false]].map(([k, v, live]) => (
              <li key={k as string} className="flex items-center justify-between gap-3 border-b border-hairline pb-2">
                <span>{k}</span>
                <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-strike">{live && <i className="size-2 rounded-full bg-signal" />}{v}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] font-semibold text-muted">Arc Peripherals</p>
          <p className="flex items-center justify-between text-[14px]"><span>Giveaway post</span><span className="text-[12.5px] font-semibold text-strike">Scheduled 20:30</span></p>
        </div>
      </figure>
    </div>
  );
}

/** The old way: the same night run out of a group chat and a spreadsheet nobody trusts. */
export function OldMatchDay() {
  const chat: [string, string][] = [
    ['Coach', 'warm-up is 16:30 for Deniz too? Istanbul is +2 or +3 now??'],
    ['Manager', 'has everyone posted the Volt tweet'],
    ['Manager', 'Volt want proof the overlay was up. anyone screenshot it?'],
    ['Analyst', 'opponent notes are in the drive, v3 or v4, not sure'],
    ['Coach', 'Sami thought 19:00 was his time'],
  ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
      <figure className="app" aria-label="The old way: match day run from a group chat (sample)">
        <div className="app-bar">
          <b className="font-display text-[17px] font-bold">#staff</b>
          <span className="text-[13px] text-ink-60">Saturday</span>
          <span className="ml-auto rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-semibold text-paper">47 unread</span>
        </div>
        <ul className="grid gap-2.5 p-4">
          {chat.map(([who, msg], i) => (
            <li key={i} className="grid grid-cols-[34px_minmax(0,1fr)] gap-2.5">
              <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-creme-deep font-display text-[13px] font-bold text-ink-60">{who[0]}</span>
              <span className="grid gap-0.5 text-[14px]"><b className="text-[12.5px] font-semibold text-muted">{who}</b>{msg}</span>
            </li>
          ))}
        </ul>
      </figure>
      <figure className="app" aria-label="The old way: a match-day spreadsheet (sample)">
        <div className="app-bar">
          <b className="font-display text-[17px] font-bold">matchday_FINAL_v2.xlsx</b>
        </div>
        <table className="w-full text-left text-[14px]">
          <tbody>
            {[['16:30', 'warmup', ''], ['17:45?', 'tech check', 'who?'], ['19:00', 'MATCH', 'CET or local?'], ['after', 'clips + volt tweet', 'someone']].map(([t, what, note]) => (
              <tr key={what} className="border-b border-hairline">
                <td className="px-4 py-2.5 font-mono text-[13px]">{t}</td>
                <td className="px-2 py-2.5">{what}</td>
                <td className="px-4 py-2.5 text-right text-[13px] font-semibold text-strike">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-3 text-[13px] text-ink-60">Last edited by three people, one of them on the wrong timezone.</p>
      </figure>
    </div>
  );
}
