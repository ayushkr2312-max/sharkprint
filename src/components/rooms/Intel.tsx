import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { IntelFunnel } from '@/components/flows/IntelFunnel';
import { Gets } from '@/components/ui/Gets';
import { Glance } from '@/components/ui/Glance';
import { Eyebrow, Heading, Lead, Micro, Accent } from '@/components/ui/type';

// Everything the analyst hands a roster, by when it lands in the season.
const ANALYST: { id: string; when: string; items: [string, string][] }[] = [
  { id: 'before', when: 'Before the match', items: [
    ['Scouting reports', 'Every opponent broken down: how they open, how they adjust, and the players to watch.'],
    ['Team prep reports', 'A game plan for each match, built with your coach, with the counters to drill that week.'],
    ['Pick and ban plan', 'Which maps or picks to take and which to ban against this team, and why.'],
  ] },
  { id: 'after', when: 'After the match', items: [
    ['Match reviews', 'Rounds won and lost and why, with the VOD timestamps to watch together.'],
    ['Scrim reviews', 'What worked and what broke, ready the morning after.'],
    ['What to practise', 'The few things the last games say to work on next, most important first.'],
  ] },
  { id: 'season', when: 'All season', items: [
    ['A file on every opponent', 'Every team you could face, updated after each of their matches, so prep never starts from zero.'],
    ['Your own habits', 'How your rosters look to an opponent, so the next team can’t read them as easily.'],
    ['Player trends', 'Each player’s form across the season, ready for one-to-ones with the coach.'],
  ] },
];
const SCOUT: [string, string][] = [
  ['Players', 'Role fit, consistency and comms, from match data and VOD.'],
  ['Teams', 'Scrim partners at your level, and who’s rising.'],
  ['Staff', 'Coaches, analysts and managers, judged on their track record.'],
  ['Creators', 'Audience match, reach, and how they talk to their fans.'],
];

type Props = { headingLevel?: 'h1' | 'h2' };

/** 04 Intel: the org's own data analyst. The funnel shows how scouting works (the whole
 *  scene narrowed to a shortlist); under it, everything the analyst hands a roster across a
 *  season, then what it scouts when the org is building. */
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
            <b className="font-semibold text-white">Intel</b> is your own data analyst, working for every roster you run: reports before each match, reviews after it, and a file on every opponent all season. When you’re building the org, it scouts players, teams, staff and creators too.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <IntelFunnel />
        </div>

        <div data-line="foot" className="mt-[clamp(48px,7vh,72px)] grid gap-[clamp(56px,8vh,88px)]">
          <section aria-labelledby="intel-analyst" data-reveal="" className="grid content-start gap-[clamp(28px,4vh,40px)]">
            <div className="grid gap-4">
              <h3 id="intel-analyst" className="text-balance font-display text-h3 font-bold text-white">Your personal data analyst</h3>
              <p className="max-w-[30em] text-[17px] text-fog">Everything a full-time analyst does for a team, for every roster you run, without hiring one per team.</p>
            </div>
            <div className="grid gap-x-[clamp(28px,4vw,56px)] gap-y-10 lg:grid-cols-3">
              {ANALYST.map((g) => (
                <section key={g.id} aria-labelledby={`intel-${g.id}`} className="grid content-start gap-4">
                  <h4 id={`intel-${g.id}`} className="font-display text-[22px] font-bold text-ice">{g.when}</h4>
                  <Gets items={g.items} cols="md:grid-cols-3 lg:grid-cols-1" />
                </section>
              ))}
            </div>
          </section>
          <section aria-labelledby="intel-scout" data-reveal="" className="grid content-start gap-5">
            <h3 id="intel-scout" className="text-balance font-display text-h3 font-bold text-white">When you’re building</h3>
            <Gets items={SCOUT} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </section>
        </div>
        {H === 'h2' && <Glance pillar="intel" />}
      </div>
    </Room>
  );
}

const QUAD: [string, string][] = [
  ['Scout', 'Scene scouting reports: players, staff and creators in the scenes you care about, shortlisted by fit.'],
  ['Prep', 'Scouting and prep reports for every match, from a file kept on every opponent: maps, comps, habits, pistol and clutch patterns.'],
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
