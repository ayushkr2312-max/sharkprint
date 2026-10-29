import { Room } from '@/components/site/Room';
import { TapeSwap } from '@/components/flows/TapeSwap';
import { Heading, Lead, Accent } from '@/components/ui/type';

/** 02b The stack: the bridge from the grind to the pillars. The answer to the duct tape,
 *  in one screen: four pillars, each peeling away the notes it replaces, before each one
 *  gets its own room below. */
export function Stack() {
  return (
    <Room tone="abyss" room="stack" id="stack" labelledBy="stack-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Heading data-line="in" id="stack-title" size="h1">
            Swap the tape<br />for <Accent touch="stack">one system.</Accent>
          </Heading>
          <Lead className="lg:max-w-[25em] lg:pb-2">
            Sharkprint replaces the patchwork with four pillars, run by one team on one automation core. Each one takes a pile of tape off your staff.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <TapeSwap />
        </div>

        <p data-line="foot" data-reveal="" className="mt-[clamp(32px,5vh,48px)] max-w-[40em] text-[17px] text-fog">
          Each pillar gets its own look below, starting with the one your fans see first.
        </p>
      </div>
    </Room>
  );
}
