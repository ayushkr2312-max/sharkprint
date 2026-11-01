import { Room } from '@/components/site/Room';
import { Heading, Accent } from '@/components/ui/type';
import { Enquiry } from './Enquiry';

/** The last room on a page we send: what happens after you get in touch, beside the form
 *  that starts it. Every "Book a free call" button on the page lands here. */
export function Closing({ kind, body, steps }: { kind: 'business' | 'school'; body: string; steps: [string, string][] }) {
  return (
    <Room tone="ink" room="next" id="contact" labelledBy="next-title">
      <div className="wrap grid grid-cols-1 items-start gap-[clamp(40px,5vw,88px)] lg:grid-cols-[.9fr_1.1fr]">
        <div className="grid content-start gap-6 lg:sticky lg:top-28">
          <Heading data-line="in" id="next-title" size="h1">
            Start with<br /><Accent touch="route">a free call.</Accent>
          </Heading>
          <p data-reveal="" className="max-w-[30em] text-lead text-pretty text-fog">{body}</p>
          <ol className="mt-2 grid gap-3">
            {steps.map(([k, v], i) => (
              <li key={k} data-reveal="" className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-x-2 border-t border-rule-dark pt-4">
                <span className="font-display text-[20px] font-bold text-current-blue">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid gap-1">
                  <b className="font-display text-[19px] font-bold text-white">{k}</b>
                  <span className="text-[15.5px] text-fog">{v}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div data-line="foot">
          <Enquiry kind={kind} />
        </div>
      </div>
    </Room>
  );
}
