import { Room } from '@/components/site/Room';
import { ReviewLine } from '@/components/flows/ReviewLine';
import { Heading, Lead, Accent } from '@/components/ui/type';

/** 08 Humans: the human layer. Machine drafts travel a review line as you scroll; each stops
 *  with an insider, takes a correction and a signature, and only then goes out to you. */
export function Humans({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <Room tone="ink" room="humans" id="insiders" labelledBy="humans-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <Heading data-line="in" as={headingLevel} id="humans-title" size="h1">
            Drafted by machines.<br /><Accent touch="check">Signed by insiders.</Accent>
          </Heading>
          <Lead className="lg:max-w-[24em] lg:pb-3">
            Software drafts the repetitive work. Before any of it reaches you, someone who has worked inside an esports org checks it, fixes what&apos;s off and signs it off.
          </Lead>
        </div>

        <div className="mt-[clamp(40px,6vh,64px)]">
          <ReviewLine />
        </div>
      </div>
    </Room>
  );
}
