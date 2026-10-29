import { Room } from '@/components/site/Room';
import { Heading, Lead, Accent } from '@/components/ui/type';

// Who an org would hire instead, and an honest read of each: where they're the better
// call, it says so.
const RIVALS = [
  {
    name: 'An agency',
    good: 'Polished campaigns and big launch moments, with a full team behind them.',
    short: 'Few know esports from the inside, most cover one or two of the four pillars, and every new ask is a new quote.',
    us: 'People who have worked inside orgs, all four pillars under one plan, and one point of contact.',
  },
  {
    name: 'Freelancers',
    good: 'The lowest price per task. If you need one thing done once, hire one.',
    short: 'One skill each, nobody joins the pieces up, and you end up managing all of them.',
    us: 'One team across tech, data and content, with automation doing the repetitive work.',
  },
  {
    name: 'An in-house hire',
    good: 'Someone in the room every day who knows your rosters and your people.',
    short: 'One person and one role on a full salary, and the right hire can take months to find.',
    us: 'A whole desk from the first month. If you do hire, they work alongside it.',
  },
];

/** 09 Compare: the other ways an org could go, each read the same way across: what it
 *  does well, where it runs out, and what changes with Sharkprint. */
export function Compare() {
  return (
    <Room tone="creme" room="compare" id="compare" labelledBy="compare-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Heading data-line="in" id="compare-title" size="h1">
            Pick your <Accent touch="pick">rival.</Accent>
          </Heading>
          <Lead className="lg:max-w-[24em] lg:pb-2">
            Who would you hire instead? What each option does well, where it runs out, and what changes with us.
          </Lead>
        </div>

        <div data-line="foot" className="rivals mt-[clamp(40px,6vh,64px)]">
          {RIVALS.map((r) => (
            <article key={r.name} data-reveal="" className="rival">
              <h3 className="rival-name">{r.name}</h3>
              <dl>
                <div>
                  <dt>Good at</dt>
                  <dd>{r.good}</dd>
                </div>
                <div>
                  <dt>Where it runs out</dt>
                  <dd>{r.short}</dd>
                </div>
                <div className="rival-us">
                  <dt>With Sharkprint</dt>
                  <dd>{r.us}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </Room>
  );
}
