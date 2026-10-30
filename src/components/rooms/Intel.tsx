import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { IntelFunnel } from '@/components/flows/IntelFunnel';
import { Gets } from '@/components/ui/Gets';
import { Glance } from '@/components/ui/Glance';
import { Eyebrow, Heading, Lead, Micro, Accent } from '@/components/ui/type';

// The desk's two jobs, and what each hands back.
const PREP: [string, string][] = [
  ['Opponent packs', 'The maps they pick and ban, how they open, how they adjust, and who to watch.'],
  ['Scrim reviews', 'What worked and what broke, ready the morning after.'],
  ['Your own habits', 'How your rosters look to an opponent, so the next team can’t read them as easily.'],
];
const SCOUT: [string, string][] = [
  ['Players', 'Role fit, consistency and comms, from match data and VOD.'],
  ['Teams', 'Scrim partners at your level, and who’s rising.'],
  ['Staff', 'Coaches, analysts and managers, judged on their track record.'],
  ['Creators', 'Audience match, reach, and how they talk to their fans.'],
];

type Props = { headingLevel?: 'h1' | 'h2' };

/** 04 Intel: one analyst desk doing two jobs. The funnel shows how it works (the whole
 *  scene narrowed to a shortlist); under it, what each job hands back. */
export function IntelRoom({ headingLevel = 'h2' }: Props) {
  const H = headingLevel;
  return (
    <Room tone="abyss" room="intel" id="intel" labelledBy="intel-title" className="overflow-hidden">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
          <Heading data-line="in" as={H} id="intel-title" size="h1">
            Prep to win.<br /><Accent touch="scan">Scout to grow.</Accent>
          </Heading>
          <Lead className="lg:pb-3">
            <b className="font-semibold text-white">Intel</b> is one analyst desk with two jobs: opponent prep for every match your rosters play, and scouting across players, teams, staff and creators.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <IntelFunnel />
        </div>

        <div data-line="foot" className="mt-[clamp(48px,7vh,72px)] grid gap-x-[clamp(32px,5vw,80px)] gap-y-12 lg:grid-cols-2">
          <section aria-labelledby="intel-prep" data-reveal="" className="grid content-start gap-5">
            <h3 id="intel-prep" className="text-balance font-display text-h3 font-bold text-white">Before every match</h3>
            <Gets items={PREP} cols="" />
          </section>
          <section aria-labelledby="intel-scout" data-reveal="" className="grid content-start gap-5">
            <h3 id="intel-scout" className="text-balance font-display text-h3 font-bold text-white">When you’re building the org</h3>
            <Gets items={SCOUT} />
          </section>
        </div>
        {H === 'h2' && <Glance pillar="intel" />}
      </div>
    </Room>
  );
}

const QUAD: [string, string][] = [
  ['Scout', 'Scene scouting reports: players, staff and creators in the scenes you care about, shortlisted by fit.'],
  ['Prep', 'Opponent packs per roster: map tendencies, comps, habits, pistol and clutch patterns.'],
  ['Market', 'Who the orgs at your level partner with, what content wins in your scene, where the gaps are.'],
  ['Analyst', 'One analyst desk serving every team, instead of an analyst per roster and a scout for the org.'],
];

export function IntelDeep() {
  return (
    <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,88px)] lg:grid-cols-2">
      <div className="grid content-start gap-6">
        <Eyebrow>Your analyst, for every roster</Eyebrow>
        <Heading size="h2">
          Take decisions with data.<br /><Accent>Get the edge.</Accent>
        </Heading>
        <dl className="grid gap-x-7 gap-y-[22px] sm:grid-cols-2">
          {QUAD.map(([k, v]) => (
            <div key={k} className="border-t border-rule-dark pt-3.5">
              <dt className="mb-1 font-display text-[20px] font-bold text-white">{k}</dt>
              <dd className="text-[15px] text-fog">{v}</dd>
            </div>
          ))}
        </dl>
        <Micro>Data shortlists. Scouts who know the scene decide.</Micro>
      </div>
      <Asset src="intel/radar-player-dark.svg" label="Player radar: aim, utility, comms, consistency, clutch, role fit" className="w-full max-w-[460px] justify-self-center" />
    </div>
  );
}
