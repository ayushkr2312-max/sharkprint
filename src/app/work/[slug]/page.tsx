import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionHead } from '@/components/pillar/PillarPage';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { Icon } from '@/components/ui/Icon';
import { SampleRail } from '@/components/ui/SampleRail';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { CASES, getCase } from '@/content/cases';
import { cn } from '@/lib/cn';

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const c = getCase((await params).slug);
  if (!c) return {};
  const title = `${c.title[0]} ${c.title[1]}`;
  return {
    title,
    description: c.summary,
    openGraph: { title, description: c.summary },
    // Samples show the template; they shouldn't be indexed as real client work.
    robots: c.sample ? { index: false, follow: true } : undefined,
  };
}

/** A case study (concept p.09, /work/[case]): brief → what we built → how it ran → outcomes. */
export default async function CasePage({ params }: PageProps<'/work/[slug]'>) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  const i = CASES.indexOf(c);
  const next = CASES[(i + 1) % CASES.length];
  const lead = c.artefacts.find((a) => a.size === 'wide') ?? c.artefacts[0];

  return (
    <main id="main">
      <Room tone="abyss" room="case" labelledBy="case-title" className="pt-[clamp(120px,16vh,170px)]!">
        <div className="wrap grid gap-6">
          <Eyebrow>
            <Link href="/work" className="no-underline hover:text-white">Work</Link> · Case study
            {c.sample && <span className="ml-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-fog">Sample · fictional org</span>}
          </Eyebrow>
          <Heading as="h1" id="case-title" size="h1" reveal={false}>
            {c.title[0]}<br /><Accent>{c.title[1]}</Accent>
          </Heading>
          <Lead>{c.summary}</Lead>
          <ul className="flex flex-wrap gap-2" aria-label="Pillars used">
            {c.pillars.map((p) => (
              <li key={p}>
                <Link href={'/' + p} className="label inline-flex min-h-11 items-center gap-2 rounded-full border border-rule-dark px-4 font-semibold text-mist no-underline transition-colors hover:border-mist hover:text-white">
                  <Icon name={p} strokeWidth={7} className="size-[18px]" />
                  {p}
                </Link>
              </li>
            ))}
          </ul>
          <Asset src={lead.src} label={lead.label} className="mt-[clamp(24px,4vh,48px)] overflow-hidden rounded-[22px] shadow-deep" />
        </div>
      </Room>

      <Room tone="creme" room="brief" labelledBy="brief-title">
        <div className="wrap">
          <Eyebrow id="brief-title" className="mb-7">The brief, in their words</Eyebrow>
          <blockquote data-reveal="">
            <p className="max-w-[18em] text-balance font-display text-[clamp(32px,4.4vw,64px)] leading-[1.02] font-bold tracking-[-0.028em]">
              {c.brief[0]}<br />{c.brief[1]}<br /><Accent>{c.brief[2]}</Accent>
            </p>
          </blockquote>
        </div>
      </Room>

      <Room tone="deep" room="built" labelledBy="built-title">
        <div className="wrap">
          <SectionHead eyebrow="What we built" title={['Four pieces,', 'one system.']} id="built-title" />
          <ul className="mt-[clamp(32px,5vh,56px)] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {c.built.map((b) => (
              <li key={b.title} className="grid content-start gap-2.5 rounded-[20px] border border-hairline bg-paper p-6">
                <span className="label inline-flex items-center gap-1.5 font-semibold text-strike">
                  <Icon name={b.pillar} strokeWidth={8} className="size-4" />
                  {b.pillar}
                </span>
                <strong className="font-display text-[22px] leading-[1.1] font-bold">{b.title}</strong>
                <p className="text-[15px] text-ink-60">{b.line}</p>
              </li>
            ))}
          </ul>
        </div>
        <SampleRail items={c.artefacts} label="What shipped" />
      </Room>

      <Room tone="creme" room="ran" labelledBy="ran-title">
        <div className="wrap">
          <SectionHead eyebrow="How it ran" title={['Kickoff to', 'autopilot.']} id="ran-title" />
          <ol className="mt-[clamp(32px,5vh,56px)] grid grid-cols-1 border-l-2 border-strike md:grid-cols-5 md:border-t-2 md:border-l-0">
            {c.timeline.map(([step, line], n) => (
              <li key={step} className="relative grid content-start gap-2 pb-7 pl-7 md:pt-7 md:pr-6 md:pb-0 md:pl-0">
                <span aria-hidden="true" className="absolute top-0 -left-[15px] grid size-7 place-items-center rounded-full border-2 border-strike bg-paper font-mono text-[10px] font-bold text-strike md:-top-[15px] md:left-0">
                  0{n + 1}
                </span>
                <strong className="font-display text-[20px] font-bold">{step}</strong>
                <p className="text-[15px] text-ink-60">{line}</p>
              </li>
            ))}
          </ol>
        </div>
      </Room>

      <Room tone="deep" room="outcomes" labelledBy="outcomes-title">
        <div className="wrap">
          <SectionHead eyebrow="What changed" title={['The outcome,', 'not the adjectives.']} id="outcomes-title" />
          <div className="mt-[clamp(32px,5vh,56px)] grid grid-cols-1 gap-4 md:grid-cols-3">
            {c.outcomes.map(([big, sub, body], n) => (
              <article key={big} className={cn('grid content-start gap-2 rounded-[24px] border p-7 shadow-1', n === 0 ? 'border-strike bg-strike text-white' : 'border-hairline bg-paper')}>
                <h3 className="font-display text-[clamp(36px,4vw,56px)] leading-[.95] font-bold tracking-[-0.028em]">{big}</h3>
                <p className={n === 0 ? 'text-white/80' : 'text-ink-60'}>{sub}</p>
                <p className={cn('mt-3 text-[16px]', n === 0 ? 'text-white/85' : 'text-ink-60')}>{body}</p>
              </article>
            ))}
          </div>
          <Link href={`/work/${next.slug}`} className="mt-10 inline-flex min-h-11 items-center gap-3 font-display text-[clamp(20px,2vw,26px)] font-semibold no-underline hover:text-strike">
            <span className="label text-muted">Next case</span> {next.title[0]} {next.title[1]} →
          </Link>
        </div>
      </Room>
    </main>
  );
}
