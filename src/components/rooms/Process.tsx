'use client';

import { useRef, type CSSProperties } from 'react';
import { Room } from '@/components/site/Room';
import { Icon } from '@/components/ui/Icon';
import { Eyebrow, Heading, Accent } from '@/components/ui/type';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const STEPS: [string, string][] = [
  ['Discovery', 'We map your tools, spend and goals.'],
  ['Blueprint', 'A plan for what to build first, and why.'],
  ['Build & automate', 'We build it; insiders review all of it.'],
  ['Launch', 'Your staff trained, the docs handed over.'],
  ['Optimise', 'Monthly reports and tweaks, from then on.'],
];

// Outcome copy straight from the deck: no invented stats.
const OUTCOMES = [
  { big: 'Hours back', sub: 'every week', body: 'Automations take repetitive admin off your staff.', tone: 'strike' },
  { big: 'Lower', sub: 'running costs', body: 'Leaner tooling, clear spend reports.', tone: 'paper' },
  { big: 'Sharper', sub: 'decisions', body: 'Scouting, sponsor and content calls backed by data.', tone: 'paper' },
  { big: 'Faster', sub: 'growth', body: 'Steady content, stronger pitches, sharper brand.', tone: 'trench' },
];

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
        <Eyebrow className="mb-5">How we work</Eyebrow>
        <Heading id="process-title" size="h1" className="mb-[clamp(40px,6vh,64px)]">
          Kickoff to <Accent touch="route">autopilot.</Accent>
        </Heading>
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
                    <span aria-hidden="true" className="step-state">
                      {last ? <><i className="step-live" />Autopilot on</> : <><Icon name="check" strokeWidth={14} className="size-3" />Done</>}
                    </span>
                  </span>
                  <h3 className="step-title">{title}</h3>
                  <p className="step-line">{line}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div data-line="foot" className="mx-auto mt-[clamp(56px,8vh,96px)] grid max-w-[980px]">
          {OUTCOMES.map((o, i) => (
            <article
              key={o.big}
              style={{ '--i': i } as CSSProperties}
              className={cn(
                'ocard sticky mb-[12vh] grid grid-cols-1 items-end gap-x-8 gap-y-2 rounded-[24px] border px-[clamp(24px,3.5vw,44px)] py-7 shadow-2 last:mb-0 md:mb-[18vh] md:min-h-[200px] md:grid-cols-2 md:content-end',
                o.tone === 'strike' && 'border-strike bg-strike text-white',
                o.tone === 'trench' && 'border-trench bg-trench text-white',
                o.tone === 'paper' && 'border-hairline bg-paper',
              )}
            >
              <h3 className="font-display text-[clamp(40px,5vw,72px)] leading-[.95] font-bold tracking-[-0.028em]">{o.big}</h3>
              <p className={cn('text-[17px] md:col-start-1', o.tone === 'paper' ? 'text-ink-60' : 'text-white/80')}>{o.sub}</p>
              <p className={cn('max-w-[26em] self-end text-[17px] md:col-start-2 md:row-span-2 md:row-start-1', o.tone === 'paper' ? 'text-ink-60' : 'text-white/80')}>{o.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Room>
  );
}
