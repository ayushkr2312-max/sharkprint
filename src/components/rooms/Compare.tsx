'use client';

import { useState, type CSSProperties } from 'react';
import { Room } from '@/components/site/Room';
import { SharkMark } from '@/components/ui/Icon';
import { useRoving } from '@/components/ui/useRoving';
import { useSeen } from '@/components/ui/useSeen';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { track } from '@/lib/track';

type Call = 'us' | 'them' | 'draw';

// Each criterion is a round. Where the alternative is as good (or better), it says so.
const ROUNDS = [
  { name: 'Esports experience in-house', us: 'Yes' },
  { name: 'Covers tech, data & content', us: 'All four pillars' },
  { name: 'Automation-first', us: 'Built in' },
  { name: 'Priced for growing orgs', us: 'Flexible' },
  { name: 'One point of contact', us: 'Yes' },
  { name: 'Human-reviewed work', us: 'Always' },
];
const RIVALS = {
  agency: {
    name: 'Agency', tag: 'Full-service agency',
    cells: ['Rarely', 'One or two', 'Sometimes', 'Retainer-heavy', 'Account manager', 'Yes'],
    calls: ['us', 'us', 'us', 'us', 'draw', 'draw'] as Call[],
  },
  freelancers: {
    name: 'Freelancers', tag: 'A few freelancers',
    cells: ['Varies', 'One skill each', 'Rarely', 'Cheapest per task', 'No', 'Varies'],
    calls: ['us', 'us', 'us', 'them', 'us', 'us'] as Call[],
  },
  inhouse: {
    name: 'In-house hire', tag: 'One new hire',
    cells: ['If you find them', 'One role', 'Depends on the hire', 'A full salary', 'Yes', 'Self-reviewed'],
    calls: ['us', 'us', 'us', 'us', 'draw', 'us'] as Call[],
  },
};
type Rival = keyof typeof RIVALS;
const ORDER: Rival[] = ['agency', 'freelancers', 'inhouse'];

/** 09 Compare: a head-to-head. Pick who you'd hire otherwise; the six criteria play out as
 *  rounds, one after another, and the score adds up. */
export function Compare() {
  const [rival, setRival] = useState<Rival>('freelancers');
  const [ref, { on }] = useSeen<HTMLDivElement>('0px 0px -20% 0px');
  const select = (i: number) => {
    const next = ORDER[i];
    if (next === rival) return;
    setRival(next);
    track('demo_interact', { type: 'rival', rival: next });
  };
  const item = useRoving(ORDER.length, ORDER.indexOf(rival), select);
  const r = RIVALS[rival];
  const us = r.calls.filter((c) => c === 'us').length, them = r.calls.filter((c) => c === 'them').length;

  return (
    <Room tone="creme" room="compare" id="compare" labelledBy="compare-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-5">
            <Eyebrow>Why Sharkprint</Eyebrow>
            <Heading id="compare-title" size="h1">
              Pick your <Accent touch="pick">rival.</Accent>
            </Heading>
          </div>
          <Lead className="lg:max-w-[22em] lg:pb-2">Who would you hire otherwise? Six rounds, head to head.</Lead>
        </div>

        <div ref={ref} data-on={on} data-line="foot" className="vs mt-[clamp(36px,5vh,56px)]">
          <header className="vs-top">
            <div className="vs-team">
              <span className="vs-crest vs-crest--us"><SharkMark className="h-[22px] w-auto text-white [--dot:var(--color-mist)]" /></span>
              <span>
                <b>Sharkprint</b>
                <small>Four pillars, one partner</small>
              </span>
            </div>

            <div className="vs-score" aria-live="polite">
              <span className="sr-only">Score: Sharkprint {us}, {r.name} {them}, {6 - us - them} drawn.</span>
              <span aria-hidden="true" key={rival} className="vs-nums"><b>{us}</b><i>:</i><b>{them}</b></span>
              <small aria-hidden="true">Best of 6</small>
            </div>

            <div className="vs-team vs-team--them">
              <span>
                <b key={rival} className="vs-swap">{r.name}</b>
                <small>{r.tag}</small>
              </span>
              <span className="vs-crest">{r.name.slice(0, 1)}</span>
            </div>
          </header>

          <div role="radiogroup" aria-label="Compare against" className="vs-pick">
            <span aria-hidden="true">Opponent</span>
            {ORDER.map((id, i) => (
              <button key={id} type="button" role="radio" aria-checked={id === rival} onClick={() => select(i)} {...item(i)}>
                {RIVALS[id].name}
              </button>
            ))}
          </div>

          <ol key={rival} className="vs-rounds">
            {ROUNDS.map((round, i) => {
              const call = r.calls[i];
              return (
                <li key={round.name} data-call={call} className="vs-round" style={{ '--i': i } as CSSProperties}>
                  <span className="vs-val vs-val--us">{round.us}</span>
                  <span className="vs-mid">
                    <small>Round {i + 1}</small>
                    {round.name}
                    <em className="vs-call">{call === 'draw' ? 'Draw' : call === 'us' ? 'Sharkprint' : r.name}</em>
                  </span>
                  <span className="vs-val vs-val--them">{r.cells[i]}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Room>
  );
}
