import type { Metadata } from 'next';
import { share } from '@/lib/share';
import { Room } from '@/components/site/Room';
import { Humans } from '@/components/rooms/Humans';
import { Icon, type Pillar } from '@/components/ui/Icon';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';

const title = 'Insiders: who reviews what';
const description = 'Drafted by machines, signed by insiders: every clip, report, dashboard and build is checked by people who’ve worked inside esports orgs.';
export const metadata: Metadata = { title, description, ...share(title, description) };

// The human layer (concept pp.09, 22): which insider signs off which output.
const ROLES: { role: string; reviews: string; pillars: Pillar[] }[] = [
  { role: 'Ex-org managers', reviews: 'Dashboards, sponsor deliverables and finance entries in Command; the blueprint of every Forge build.', pillars: ['command', 'forge'] },
  { role: 'Analysts', reviews: 'Scene shortlists, fit scores and opponent packs in Intel; roster stats in Command.', pillars: ['intel', 'command'] },
  { role: 'Coaches', reviews: 'Prep packs before they reach your rosters, and the scout notes behind every recommendation.', pillars: ['intel'] },
  { role: 'Editors', reviews: 'Which moments ship, the hook, the subtitles and the final cut of every Engine clip.', pillars: ['engine'] },
  { role: 'Partnerships leads', reviews: 'Sponsor sourcing and pitch decks, and the deliverables you owe partners.', pillars: ['command'] },
];

const LOOP: [string, string][] = [
  ['Machine draft', 'Automations log VODs, pull stats, sync sources and draft the first cut, shortlist or dashboard.'],
  ['Insider review', 'Someone who has done the job in an org checks it, fixes it and decides what goes forward.'],
  ['Your call', 'You see it before it ships, and you can veto anything. Data shortlists; your staff decide.'],
  ['Ship, then learn', 'It goes live on your calendar, and the monthly report tells us what to keep, change or cut.'],
];

export default function InsidersPage() {
  return (
    <main id="main">
      <Humans headingLevel="h1" />

      <Room tone="creme" room="roles" labelledBy="roles-title">
        <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[.8fr_1.4fr]">
          <div className="grid gap-5 lg:sticky lg:top-24">
            <Eyebrow>Who reviews what</Eyebrow>
            <Heading id="roles-title" size="h2">
              People who&apos;ve <Accent>done the job.</Accent>
            </Heading>
            <Lead>Every output has an insider who signs it off, matched to the work, not to whoever is free.</Lead>
          </div>
          <ul className="border-t border-hairline">
            {ROLES.map((r) => (
              <li key={r.role} className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[220px_1fr] md:gap-8" data-reveal="">
                <div className="grid content-start gap-2.5">
                  <h3 className="font-display text-[22px] leading-[1.1] font-bold tracking-[-0.01em]">{r.role}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {r.pillars.map((p) => (
                      <span key={p} className="label inline-flex items-center gap-1.5 rounded-full bg-ice px-2.5 py-1 text-[12px] font-semibold text-strike capitalize">
                        <Icon name={p} strokeWidth={8} className="size-3.5" />
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[17px] text-ink-60">{r.reviews}</p>
              </li>
            ))}
          </ul>
        </div>
      </Room>

      <Room tone="trench" room="loop" labelledBy="loop-title">
        <div className="wrap">
          <Eyebrow className="mb-5">The review loop</Eyebrow>
          <Heading id="loop-title" size="h2">
            Machines do the reps. <Accent>People sign it off.</Accent>
          </Heading>
          <ol className="mt-[clamp(32px,5vh,56px)] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {LOOP.map(([t, line], i) => (
              <li key={t} className={`grid content-start gap-2 rounded-[20px] border p-6 ${i === 1 ? 'border-strike bg-strike' : 'border-rule-dark bg-white/3'}`}>
                <span className={`label ${i === 1 ? 'text-ice' : 'text-mist'}`}>0{i + 1}</span>
                <strong className="font-display text-[22px] font-bold">{t}</strong>
                <p className={`text-[15px] ${i === 1 ? 'text-white/85' : 'text-fog'}`}>{line}</p>
              </li>
            ))}
          </ol>
        </div>
      </Room>
    </main>
  );
}
