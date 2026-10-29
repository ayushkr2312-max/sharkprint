import { Room } from '@/components/site/Room';
import { MatchWeek } from '@/components/flows/MatchWeek';
import { Heading, Lead, Accent } from '@/components/ui/type';

/** 09 Week: what one partner looks like in a match week. The four pillars run as lanes,
 *  and each piece of work lands on its day as the week plays through. */
export function Week() {
  return (
    <Room tone="creme" room="week" id="week" labelledBy="week-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Heading data-line="in" id="week-title" size="h1">
            Match week,<br /><Accent touch="week">handled.</Accent>
          </Heading>
          <Lead className="lg:max-w-[26em] lg:pb-2">
            One partner across all four pillars. Clips, prep, numbers and site updates land on the days you need them, with no agency, freelancers or new hire to manage.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <MatchWeek />
        </div>
      </div>
    </Room>
  );
}
