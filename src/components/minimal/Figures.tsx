import type { CSSProperties, ReactNode } from 'react';
import type { Pillar } from '@/components/ui/Icon';

// Each pillar at a glance: one figure that carries the point, a line on what it means, and a
// small chart that shows the rest. Ink (black or white with the page mode) and light blue only.
// The charts draw themselves once as they come into view ([data-draw], wired in Motion.tsx);
// without a script they show finished. Every number is a labelled sample.

const d = (ms: number) => ({ '--d': ms }) as CSSProperties;
const r1 = (n: number) => Math.round(n * 10) / 10;

function Glance({ big, what, note, view, label, children }: { big: string; what: string; note: string; view: string; label: string; children: ReactNode }) {
  return (
    <figure className="fig glance" data-draw="">
      <div className="glance__read">
        <p className="glance__big">{big}</p>
        <p className="glance__what">{what}</p>
      </div>
      <svg viewBox={view} role="img" aria-label={label}>{children}</svg>
      <figcaption>{note}</figcaption>
    </figure>
  );
}

/** Intel: a shortlisted player's fit, attribute by attribute, against what the roster needs. */
function IntelFig() {
  const rows: [string, number, number][] = [
    ['Aim', 0.88, 0.75], ['Utility', 0.72, 0.8], ['Comms', 0.92, 0.9],
    ['Consistency', 0.84, 0.7], ['Clutch', 0.9, 0.65], ['Role fit', 0.8, 0.85],
  ];
  const x0 = 92, w = 268;
  return (
    <Glance big="87" what="Fit for your roster: Nexo, shortlisted after 42 matches watched." note="Blue: the player. Mark: what your roster needs. Sample."
      view="0 0 360 112" label="Six attributes for a shortlisted player against what the roster needs: aim, utility, comms, consistency, clutch and role fit (sample)">
      {rows.map(([name, v, need], k) => {
        const y = k * 19;
        return (
          <g key={name}>
            <text x="0" y={y + 9} className="t">{name}</text>
            <rect x={x0} y={y + 3} width={w} height="6" rx="3" className="f-rule" />
            <rect x={x0} y={y + 3} width={r1(w * v)} height="6" rx="3" className="f-blue d-span" style={d(k * 70)} />
            <rect x={r1(x0 + w * need - 1)} y={y} width="2" height="12" rx="1" className="f-ink d-grow" style={d(400 + k * 70)} />
          </g>
        );
      })}
    </Glance>
  );
}

/** Command: the org's reach over twelve weeks, and partner deliverables done so far. */
function CommandFig() {
  const vals = [168, 171, 170, 176, 181, 180, 187, 193, 196, 203, 208, 214.8];
  const pts = vals.map((v, i) => [r1((i * 360) / 11), r1(44 - ((v - 164) / 52) * 40)] as const);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const seg = (360 - 13 * 4) / 14;
  return (
    <Glance big="214.8K" what="Followers across every platform, up 6.2% this month." note="Twelve weeks of reach, and this month’s partner deliverables. Sample."
      view="0 0 360 96" label="Followers over twelve weeks, rising to 214.8K, and partner deliverables, 12 of 14 done (sample)">
      <g className="d-wipe">
        <path d={`${line} L360,48 L0,48 Z`} className="f-blue" />
        <path d={line} className="s-ink s-thick" />
      </g>
      <line x1="0" x2="360" y1="48.5" y2="48.5" className="s-rule" />
      <text x="0" y="72" className="t">Partner deliverables</text>
      <text x="360" y="72" textAnchor="end" className="t t-ink">12 of 14</text>
      {Array.from({ length: 14 }, (_, k) => (
        <rect key={k} x={r1(k * (seg + 4))} y="82" width={r1(seg)} height="10" rx="2" className={k < 12 ? 'f-blue d-grow' : 'f-rule'} style={d(500 + k * 40)} />
      ))}
    </Glance>
  );
}

/** Engine: one stream, four moments picked, each turned into several pieces. */
function EngineFig() {
  const moments: [string, number, number][] = [['Clutch', 52, 4], ['Ace', 136, 4], ['Crowd', 226, 4], ['Comms', 306, 3]];
  const bw = 10, gap = 4;
  return (
    <Glance big="15" what="Pieces of content from one stream, posted across seven channels." note="Four moments picked from a 3h 12m stream. Sample."
      view="0 0 360 96" label="A three-hour stream with four moments picked, clutch, ace, crowd and comms, each turned into three or four pieces of content (sample)">
      <text x="0" y="9" className="t">Stream</text>
      <text x="360" y="9" textAnchor="end" className="t">3h 12m</text>
      <rect x="0" y="20" width="360" height="2" rx="1" className="f-rule" />
      {moments.map(([name, x, n], k) => {
        const cw = n * bw + (n - 1) * gap, left = x - cw / 2;
        return (
          <g key={name}>
            <rect x={x - 1.5} y="13" width="3" height="16" rx="1.5" className="f-blue d-grow" style={d(k * 90)} />
            <line x1={x} x2={x} y1="30" y2="44" className="s-ink d-drop" style={d(250 + k * 90)} />
            {Array.from({ length: n }, (_, j) => (
              <rect key={j} x={left + j * (bw + gap)} y="46" width={bw} height="18" rx="2" className="f-ink d-up" style={d(400 + k * 90 + j * 40)} />
            ))}
            <text x={x} y="84" textAnchor="middle" className="t">{name}</text>
          </g>
        );
      })}
    </Glance>
  );
}

/** Forge: six builds, all standing on one base the org owns. */
function ForgeFig() {
  const tiles: [string, boolean][] = [['Website', true], ['Microsites', true], ['Store', true], ['Tournaments', true], ['Staff tools', false], ['Discord bots', false]];
  const tw = 112, th = 26, gx = 12;
  return (
    <Glance big="6" what="Builds your org runs on, all on one base you own." note="Blue: for your fans. Outlined: for your staff. Sample."
      view="0 0 360 100" label="Six builds, website, microsites, store, tournaments, staff tools and Discord bots, on one base for hosting, accounts and data">
      {tiles.map(([name, fans], k) => {
        const x = (k % 3) * (tw + gx), y = Math.floor(k / 3) * (th + 8);
        return (
          <g key={name} className="d-up" style={d(k * 70)}>
            <rect x={x + 0.75} y={y + 0.75} width={tw - 1.5} height={th - 1.5} rx="6" className={fans ? 'f-blue' : 'f-paper s-ink'} />
            <text x={x + tw / 2} y={y + 17} textAnchor="middle" className={fans ? 't t-on-blue' : 't t-ink'}>{name}</text>
          </g>
        );
      })}
      <g className="d-up" style={d(500)}>
        <rect x="0" y="72" width="360" height="26" rx="6" className="f-ink" />
        <text x="180" y="89" textAnchor="middle" className="t t-on-ink">One base: hosting, accounts and data</text>
      </g>
    </Glance>
  );
}

/** Studio: the creator roster's week, a dot per stream, the team's watch party on match day. */
function StudioFig() {
  const days: [string, number][] = [['Mon', 2], ['Tue', 2], ['Wed', 2], ['Thu', 2], ['Fri', 2], ['Sat', 0], ['Sun', 3]];
  const cw = 360 / 7;
  return (
    <Glance big="13" what="Streams across four creators this week, clear of match day, plus a watch party." note="A dot per stream. Saturday is match day. Sample."
      view="0 0 360 92" label="A week of streams: two a day Monday to Friday, three on Sunday, and a team watch party on Saturday, match day (sample)">
      {days.map(([day, n], k) => {
        const cx = r1(cw * k + cw / 2);
        return (
          <g key={day}>
            {day === 'Sat' ? (
              <g className="d-grow" style={d(300)}>
                <rect x={cx - 13} y="4" width="26" height="64" rx="13" className="f-ink" />
                <text transform={`translate(${cx + 4} 36) rotate(-90)`} textAnchor="middle" className="t t-on-ink" style={{ fontSize: 10 }}>Watch party</text>
              </g>
            ) : (
              Array.from({ length: n }, (_, j) => (
                <circle key={j} cx={cx} cy={60 - j * 17} r="7" className="f-blue d-grow" style={d(k * 60 + j * 50)} />
              ))
            )}
            <text x={cx} y="88" textAnchor="middle" className={day === 'Sat' ? 't t-ink' : 't'}>{day}</text>
          </g>
        );
      })}
    </Glance>
  );
}

const FIGS: Record<Pillar, () => ReactNode> = { engine: EngineFig, intel: IntelFig, command: CommandFig, forge: ForgeFig, studio: StudioFig };

export function PillarFig({ id }: { id: Pillar }) {
  const F = FIGS[id];
  return <F />;
}
