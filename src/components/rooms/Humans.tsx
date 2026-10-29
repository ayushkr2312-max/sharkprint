import { Room } from '@/components/site/Room';
import { Icon } from '@/components/ui/Icon';
import { Heading, Lead, Accent } from '@/components/ui/type';

// What the software does all day, beside the call a person makes on each piece of it.
const PAIRS: [string, string][] = [
  ['Logs every VOD and flags the moments worth a look.', 'Picks the one worth posting, and where it starts.'],
  ['Scores every player on the list against your needs.', 'Decides who gets a trial, and who isn’t ready yet.'],
  ['Pulls every number into one dashboard, every day.', 'Checks it against what really happened that week.'],
  ['Drafts sponsor deliverables and the times to post them.', 'Signs them off before anything goes out in your name.'],
];

/** 08 Humans: the reps and the calls, read across. Each row is something the machine
 *  does, then the call an insider makes on it, which writes in a beat later. */
export function Humans({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <Room tone="ink" room="humans" id="insiders" labelledBy="humans-title">
      <div className="wrap">
        <div className="grid gap-6">
          <Heading data-line="in" as={headingLevel} id="humans-title" size="h1">
            Machines do the reps.<br /><Accent touch="check">Insiders make the calls.</Accent>
          </Heading>
          <Lead className="lg:pb-3">
            Software does the repetitive work. Then someone who has worked inside an esports org checks every clip, report and dashboard, and nothing reaches you until they sign it off.
          </Lead>
        </div>

        <div data-line="foot" className="pairs">
          <p aria-hidden="true" className="pairs-head">
            <span>The machine does</span>
            <span>An insider decides</span>
          </p>
          {PAIRS.map(([m, h]) => (
            <div key={m} data-reveal="" className="pair">
              <p className="pair-m"><span className="pair-tag">The machine does</span>{m}</p>
              <p className="pair-h">
                <Icon name="check" strokeWidth={12} />
                <span><span className="pair-tag">An insider decides</span>{h}</span>
              </p>
            </div>
          ))}
          <p data-reveal="" className="pairs-by">
            <b>Who signs off:</b> former org managers, analysts, coaches, editors and partnerships leads.
          </p>
        </div>
      </div>
    </Room>
  );
}
