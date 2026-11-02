import { Room } from '@/components/site/Room';
import { PillarFeed } from '@/components/flows/PillarFeed';
import { Heading, Lead, Accent } from '@/components/ui/type';

/** 02b The stack: the bridge from the org's numbers to the pillars. Five pillars, each
 *  running part of the org and each adding its numbers to the same report, before each one
 *  gets its own room below. */
export function Stack() {
  return (
    <Room tone="abyss" room="stack" id="stack" labelledBy="stack-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Heading data-line="in" id="stack-title" size="h1">
            Five pillars,<br /><Accent touch="stack">one system.</Accent>
          </Heading>
          <Lead className="lg:max-w-[25em] lg:pb-2">
            Each pillar runs part of the org, and all five feed the same numbers: the ones your staff work from every day, and the ones you show partners. One team, one automation core.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <PillarFeed />
        </div>

        <p data-line="foot" data-reveal="" className="mt-[clamp(32px,5vh,48px)] max-w-[40em] text-[17px] text-fog">
          Each pillar gets its own look below, starting with the one your fans see first.
        </p>
      </div>
    </Room>
  );
}
