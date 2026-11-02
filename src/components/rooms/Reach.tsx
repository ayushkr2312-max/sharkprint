import { Room } from '@/components/site/Room';
import { LiveDeck } from '@/components/flows/LiveDeck';
import { Gets } from '@/components/ui/Gets';
import { Heading, Lead, Accent } from '@/components/ui/type';

// What that gives the org. No invented stats, and no promise of new sponsors: the org does
// its own selling, with numbers it can stand behind.
const OUTCOMES: [string, string][] = [
  ['Numbers that never go stale', 'They flow in from streams, matches and socials, so every report is current the day it’s shared.'],
  ['Shaped for the reader', 'The same numbers, framed for a partner, for your staff or for your players.'],
  ['Proof for every deliverable', 'Partner deliverables are tracked live, and a recap is written for you at the end of each month.'],
  ['Fewer tools to pay for', 'One system in place of the spreadsheets, design files and separate apps reports used to be built in.'],
];

/** 02 Reach: straight after the promise, what the org is already worth in numbers. Everything
 *  it puts out (matches, streams, clips, creators) adds up; the pillars count it and keep a
 *  live report ready to show whoever needs to see it. */
export function Reach() {
  return (
    <Room tone="deep" room="reach" id="reach" labelledBy="reach-title" className="overflow-hidden">
      <div className="wrap">
        <div className="grid gap-6">
          <Heading data-line="in" id="reach-title" size="h1">
            Know your reach.<br /><Accent touch="check">Show it anywhere.</Accent>
          </Heading>
          <Lead>
            Every match, stream and clip your rosters and creators put out adds up. Intel and Command count it as it happens and keep it in one live report you can share with partners, your staff or your players, whenever you need it.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <LiveDeck />
        </div>

        <div data-line="foot" data-reveal="" className="mt-[clamp(48px,7vh,72px)]">
          <Gets items={OUTCOMES} cols="sm:grid-cols-2 lg:grid-cols-4" />
        </div>
      </div>
    </Room>
  );
}
