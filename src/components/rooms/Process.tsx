'use client';

import { useRef, type CSSProperties } from 'react';
import { Room } from '@/components/site/Room';
import { Heading, Lead, Accent } from '@/components/ui/type';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const STEPS: [string, string][] = [
  ['Discovery', 'We map your tools, your spend and what you want next season to look like.'],
  ['Blueprint', 'A plan for what to build first and why, with the cost before anything starts.'],
  ['Build & automate', 'We build it and wire up the automations. Insiders review every piece.'],
  ['Launch', 'Your staff trained on it, and the docs handed over.'],
  ['Optimise', 'A report every month, and changes based on what it shows.'],
];

// The deck's four outcomes, said in the terms the page opened with: each one answers a
// problem from the Grind. No invented stats.
const OUTCOMES = [
  { big: 'Hours back', sub: 'every week', body: 'The clip queue, the scrim sheet and the sponsor report stop landing on the same three people.', tone: 'strike' },
  { big: 'Lower', sub: 'running costs', body: 'One partner in place of an agency, freelancers and a pile of seats, and a monthly report on where the money goes.', tone: 'paper' },
  { big: 'Sharper', sub: 'decisions', body: 'Signings made on scout notes, not one highlight reel. Sponsor renewals argued with real numbers, not a weekend of screenshots.', tone: 'paper' },
  { big: 'Faster', sub: 'growth', body: "Clips out while the moment's still hot, pitches built on your own numbers, and a site and Discord that keep up with your roster.", tone: 'trench' },
];

/** One outcome card. */
function Outcome({ o, i }: { o: (typeof OUTCOMES)[number]; i: number }) {
  const soft = o.tone === 'paper' ? 'text-ink-60' : 'text-white/80';
  return (
    <article
      style={{ '--i': i } as CSSProperties}
      className={cn(
        'ocard sticky mb-[12vh] grid grid-cols-1 items-end gap-x-8 gap-y-2 rounded-[24px] border px-[clamp(24px,3.5vw,44px)] py-7 shadow-2 last:mb-0 md:mb-[18vh] md:min-h-[200px] md:grid-cols-2 md:content-end',
        o.tone === 'strike' && 'border-strike bg-strike text-white',
        o.tone === 'trench' && 'border-trench bg-trench text-white',
        o.tone === 'paper' && 'border-hairline bg-paper',
      )}
    >
      <h3 className="font-display text-[clamp(40px,5vw,72px)] leading-[.95] font-bold tracking-[-0.028em]">{o.big}</h3>
      <p className={cn('text-[17px] md:col-start-1', soft)}>{o.sub}</p>
      <p className={cn('max-w-[26em] self-end text-[17px] text-pretty max-md:mt-3 md:col-start-2 md:row-span-2 md:row-start-1', soft)}>{o.body}</p>
    </article>
  );
}

/** 10 Process (concept p.23): five steps as cards on one track. A bar fills along it as you
 *  scroll, each step completes as the bar reaches it, and the last one switches autopilot
 *  on. Then four outcome cards rise and stack with a 40px offset. */
export function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const track = ref.current!.querySelector<HTMLElement>('[data-steps]')!;
    const steps = Array.from(track.querySelectorAll<HTMLElement>('[data-step]'));
    const p = { v: 0 };
    gsap.to(p, {
      v: 1, ease: 'none',
      onUpdate: () => {
        track.style.setProperty('--p', p.v.toFixed(4));
        steps.forEach((s, i) => s.toggleAttribute('data-on', p.v >= (i + 0.35) / steps.length));
      },
      scrollTrigger: { trigger: track, start: 'top 72%', end: 'bottom 45%', scrub: 0.5 },
    });
  }, { scope: ref });

  return (
    <Room
      ref={ref}
      tone="deep"
      room="process"
      id="process"
      labelledBy="process-title"
    >
      <div className="wrap">
        <div className="mb-[clamp(40px,6vh,64px)] grid gap-6">
          <Heading data-line="in" id="process-title" size="h1">
            Kickoff to <Accent touch="route">autopilot.</Accent>
          </Heading>
          <Lead>
            Five steps from the first call to systems that run on their own. You see the plan and the cost before we build anything.
          </Lead>
        </div>
        <div data-steps="" className="steps">
          <span aria-hidden="true" className="steps-bar"><i /></span>
          <ol className="steps-row">
            {STEPS.map(([title, line], i) => {
              const last = i === STEPS.length - 1;
              return (
                <li key={title} data-step="" className={cn('step', last && 'step--last')} style={{ '--i': i } as CSSProperties}>
                  <span aria-hidden="true" className="step-tick" />
                  <span className="step-top">
                    <span className="step-n">0{i + 1}</span>
                    {last && (
                      <span aria-hidden="true" className="step-state"><i className="step-live" />Autopilot on</span>
                    )}
                  </span>
                  <h3 className="step-title">{title}</h3>
                  <p className="step-line">{line}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div data-line="foot" className="mx-auto mt-[clamp(56px,8vh,96px)] grid max-w-[980px]">
          {OUTCOMES.map((o, i) => <Outcome key={o.big} o={o} i={i} />)}
        </div>
      </div>
    </Room>
  );
}
