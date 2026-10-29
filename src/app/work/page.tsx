import type { Metadata } from 'next';
import Link from 'next/link';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { Icon } from '@/components/ui/Icon';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { WorkGrid } from '@/components/work/WorkGrid';
import { CASES } from '@/content/cases';

const title = 'Work';
const description = 'Case studies and the artefacts behind the four pillars: clips, scouting reports, dashboards and sites, filterable by pillar.';
export const metadata: Metadata = { title, description, openGraph: { title, description } };

export default function WorkPage() {
  return (
    <main id="main">
      <Room tone="creme" room="work" labelledBy="work-title" className="pt-40!">
        <div className="wrap grid gap-6">
          <Eyebrow>Work</Eyebrow>
          <Heading as="h1" id="work-title" size="h1">
            The artefacts, <Accent>not the adjectives.</Accent>
          </Heading>
          <Lead>Case studies and the clips, reports, dashboards and builds behind them. Samples use fictional teams and &ldquo;Your Org&rdquo; placeholders; client work is published with permission.</Lead>

          <h2 className="mt-6 font-display text-h3 font-bold">Case studies</h2>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {CASES.map((c) => {
              const art = c.artefacts.find((a) => a.size === 'wide') ?? c.artefacts[0];
              return (
                <li key={c.slug}>
                  <Link href={`/work/${c.slug}`} className="group grid gap-4 rounded-[24px] border border-hairline bg-paper p-4 pb-6 text-ink no-underline transition-[translate,box-shadow] duration-[450ms] ease-out-expo hover:-translate-y-1 hover:shadow-2">
                    <Asset src={art.src} label={art.label} className="overflow-hidden rounded-[16px]" />
                    <div className="grid gap-2 px-2">
                      <h3 className="font-display text-[clamp(24px,2.4vw,32px)] leading-[1.05] font-bold tracking-[-0.02em]">
                        {c.title[0]} <Accent>{c.title[1]}</Accent>
                      </h3>
                      <p className="label flex flex-wrap items-center gap-3 text-strike">
                        {c.pillars.map((p) => (
                          <span key={p} className="inline-flex items-center gap-1.5 capitalize"><Icon name={p} strokeWidth={8} className="size-4" />{p}</span>
                        ))}
                        {c.sample && <span className="rounded-full bg-creme-deep px-2.5 py-1 text-[12px] text-muted">Sample</span>}
                      </p>
                      <p className="text-[15px] text-ink-60">{c.summary}</p>
                      <span className="mt-1 font-semibold text-strike group-hover:text-ink">Read the case</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <h2 className="label mt-10 text-muted">Artefacts</h2>
          <WorkGrid />
        </div>
      </Room>
    </main>
  );
}
