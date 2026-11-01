'use client';

import type { CSSProperties } from 'react';
import { Room } from '@/components/site/Room';
import { ClipFan, OldClips } from '@/components/flows/ClipFan';
import { StudioDesk } from '@/components/flows/StudioDesk';
import { Gets } from '@/components/ui/Gets';
import { Glance } from '@/components/ui/Glance';
import { OldNew } from '@/components/ui/OldNew';
import { useSeen } from '@/components/ui/useSeen';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { STUDIO_PROGRAM } from '@/content/pillars';

// What signing with an org that runs Studio means, from each side.
const SIDES: [string, string][] = [
  ['For the creator', 'Clips, a schedule page, a media kit and brand deals, without hiring an editor or a manager.'],
  ['For your org', 'Every creator’s content in one place, on one calendar, under your brand, and a reason to renew.'],
];

// The offer a creator reads before signing (the name is a fictional example).
const PERKS: [string, string][] = [
  ['Clips from every stream', 'Cut, subtitled and posted on their rhythm.'],
  ['A schedule page', 'Kept in sync everywhere, with go-live alerts.'],
  ['A media kit that updates itself', 'Live numbers, ready for any brand.'],
  ['Brand deals brought to them', 'Tracked from the brief to the payout.'],
  ['A report every month', 'What grew, and what to try next.'],
];

type Props = { headingLevel?: 'h1' | 'h2' };

/** The offer sheet: what a creator gets for joining, under the org's name. Its ticks land
 *  one after another as it scrolls into view. */
function Offer() {
  const [ref, seen] = useSeen<HTMLElement>();
  return (
    <article ref={ref} data-on={seen.on || undefined} className="offer" aria-label="A sample creator offer">
      <header className="offer-head">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-[13px] bg-trench font-display text-[17px] font-bold text-white">YO</span>
        <span className="grid leading-tight">
          <b className="font-display text-[20px] font-bold">Your Org</b>
          <span className="text-[14px] text-ink-60">Creator program</span>
        </span>
        <span className="offer-tag">Creator offer</span>
      </header>
      <p className="font-display text-[clamp(30px,3vw,40px)] leading-none font-bold tracking-[-0.02em]">For Pixelle</p>
      <p className="mt-2 text-[16px] text-ink-60">Join Your Org and you get:</p>
      <ul className="offer-list">
        {PERKS.map(([k, v], i) => (
          <li key={k} style={{ '--i': i } as CSSProperties}>
            <svg viewBox="0 0 28 28" aria-hidden="true" className="offer-tick"><circle cx="14" cy="14" r="14" /><path d="M8.5 14.5l3.8 3.8 7.4-8" /></svg>
            <span className="grid gap-0.5">
              <b className="text-[16.5px] font-semibold">{k}</b>
              <span className="text-[14px] text-ink-60">{v}</span>
            </span>
          </li>
        ))}
      </ul>
      <footer className="offer-foot">
        <span><small>Starts</small><b>The day they sign</b></span>
        <span><small>Runs</small><b>Under your name</b></span>
      </footer>
    </article>
  );
}

/** 06b Studio: the creator program. One desk for scouting, the library and the roster's
 *  schedule; then the angle that sells it, the perks package an org offers every creator
 *  it signs, shown as the offer sheet the creator reads. */
export function StudioRoom({ headingLevel = 'h2' }: Props) {
  const H = headingLevel;
  return (
    <Room tone="deep" room="studio" id="studio" labelledBy="studio-title" className="overflow-hidden">
      <div className="wrap">
        <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-end xl:gap-12">
          <Heading data-line="in" as={H} id="studio-title" size="h1">
            Creators sign<br />where they <Accent touch="grow">grow.</Accent>
          </Heading>
          <Lead className="xl:max-w-[21em] xl:pb-3">
            <b className="font-semibold text-ink">Studio</b> runs your creator program: scouting creators worth signing, one library for everything they make, one schedule for every stream, and a perks package that makes your org the one to join.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <StudioDesk />
        </div>

        {/* One match, every channel: the org's and each player's, from the same final. */}
        <section aria-labelledby="fan-title" className="mt-[clamp(72px,10vh,120px)]">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading as={H === 'h1' ? 'h2' : 'h3'} id="fan-title" size="h2">
              One match,<br /><Accent>fifteen clips.</Accent>
            </Heading>
            <p data-reveal="" className="max-w-[28em] text-[17px] text-pretty text-ink-60 lg:pb-1.5">
              A final becomes clips for the org’s channels and every player’s own, cut to each feed and approved by the player whose channel it’s on.
            </p>
          </div>
          <div data-reveal="" className="mt-8">
            <OldNew label="One match, every channel" old={<OldClips />} next={<ClipFan />} />
          </div>
        </section>

        <div data-line="foot" className="mt-[clamp(64px,9vh,112px)] grid items-center gap-[clamp(40px,5vw,88px)] lg:grid-cols-[.95fr_1.05fr]">
          <div className="grid content-start gap-6">
            <Heading as={H === 'h1' ? 'h2' : 'h3'} size="h2">
              The perk that<br /><Accent touch="check">signs them.</Accent>
            </Heading>
            <p data-reveal="" className="max-w-[34em] text-[17px] text-pretty text-ink-60">
              A jersey and a shoutout don’t keep a creator. A team behind their channel does. Studio runs under your org’s name, so everything in it becomes part of your offer when you sign someone, and a reason to stay after.
            </p>
            <Gets items={SIDES} className="mt-2" />
          </div>
          <Offer />
        </div>
        {/* /studio is only sent to people, so the homepage doesn't link to it. */}
        {H === 'h2' && <Glance pillar="studio" link={false} />}
      </div>
    </Room>
  );
}

/** The pillar page's "what you get": the whole program, ten parts, pick what you offer. */
export function StudioDeep() {
  return (
    <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,88px)] lg:grid-cols-[.8fr_1.4fr]">
      <div className="grid content-start gap-6 lg:sticky lg:top-28">
        <Eyebrow>What you get</Eyebrow>
        <Heading size="h2">
          Everything in<br /><Accent>the program.</Accent>
        </Heading>
        <Lead>Choose the parts you offer. Every creator you sign sees them under your org’s name, and your staff see all of it in one place.</Lead>
      </div>
      <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {STUDIO_PROGRAM.map(([k, v], i) => (
          <li key={k} data-reveal="" className="grid grid-cols-[44px_1fr] border-t border-hairline pt-4">
            <span className="font-display text-[20px] leading-none font-bold text-strike">{String(i + 1).padStart(2, '0')}</span>
            <span className="grid gap-1.5">
              <strong className="font-display text-[19px] leading-tight font-semibold tracking-[-0.01em]">{k}</strong>
              <span className="text-[15px] text-ink-60">{v}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
