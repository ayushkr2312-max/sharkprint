import { Room, type Tone } from '@/components/site/Room';
import { CommandDeep, CommandRoom } from '@/components/rooms/Command';
import { EngineDeep, EngineRoom } from '@/components/rooms/Engine';
import { ForgeRoom } from '@/components/rooms/Forge';
import { IntelDeep, IntelRoom } from '@/components/rooms/Intel';
import { SampleRail } from '@/components/ui/SampleRail';
import type { Pillar } from '@/components/ui/Icon';
import { Eyebrow, Heading, Accent } from '@/components/ui/type';
import { FORGE_FIVE, PILLAR_CONTENT } from '@/content/pillars';
import { Stepper } from './Stepper';

const ROOMS = { engine: EngineRoom, intel: IntelRoom, command: CommandRoom, forge: ForgeRoom };
const NAMES: Record<Pillar, string> = { engine: 'Engine', intel: 'Intel', command: 'Command', forge: 'Forge' };

export function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: [string, string]; id: string }) {
  return (
    <>
      <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
      <Heading id={id} size="h2">
        {title[0]} <Accent>{title[1]}</Accent>
      </Heading>
    </>
  );
}

/** One template, four rooms (concept p.26). Each page keeps its room's background
 *  so clicking through from the homepage feels continuous. */
export function PillarPage({ pillar }: { pillar: Pillar }) {
  const c = PILLAR_CONTENT[pillar];
  const [a, b]: [Tone, Tone] = c.tones;
  const PillarRoom = ROOMS[pillar];

  return (
    <main id="main">
      <PillarRoom headingLevel="h1" />

      <Room tone={a} room="words" labelledBy="words-title">
        <div className="wrap">
          <Eyebrow id="words-title" className="mb-7">In your words</Eyebrow>
          <blockquote data-reveal="">
            <p className="max-w-[18em] text-balance font-display text-[clamp(32px,4.4vw,64px)] leading-[1.02] font-bold tracking-[-0.028em]">
              {c.words[0]}<br />{c.words[1]}<br /><Accent>{c.words[2]}</Accent>
            </p>
          </blockquote>
        </div>
      </Room>

      <Room tone={b} room="how" labelledBy="how-title">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title={c.how.title} id="how-title" />
          <Stepper steps={c.how.steps} label={`${NAMES[pillar]} steps`} />
        </div>
      </Room>

      <Room tone={a} room="gets" label={pillar === 'forge' ? undefined : 'What you get'} labelledBy={pillar === 'forge' ? 'gets-title' : undefined}>
        {pillar === 'engine' && <EngineDeep />}
        {pillar === 'intel' && <IntelDeep />}
        {pillar === 'command' && <CommandDeep />}
        {pillar === 'forge' && (
          <div className="wrap">
            <SectionHead eyebrow="What you get" title={c.getsTitle!} id="gets-title" />
            <dl className="mt-[clamp(32px,5vh,56px)] grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {FORGE_FIVE.map(([k, v]) => (
                <div key={k} className="grid content-start gap-2.5 rounded-[18px] border border-rule-dark bg-white/3 p-[22px]">
                  <dt className="label font-bold text-mist">{k}</dt>
                  <dd className="text-[15px] text-fog">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Room>

      <Room tone={b} room="samples" labelledBy="samples-title">
        <div className="wrap">
          <SectionHead eyebrow="Sample outputs" title={c.samples.title} id="samples-title" />
        </div>
        <SampleRail items={c.samples.items} label={`Sample ${NAMES[pillar]} outputs`} />
        {c.samples.fineprint && <p className="wrap mt-[18px] text-[13px] text-muted on-dark:text-mist/60">{c.samples.fineprint}</p>}
      </Room>

      <Room tone={a} room="workflow" labelledBy="wf-title">
        <div className="wrap">
          <SectionHead eyebrow="Workflow" title={['Who does', 'what.']} id="wf-title" />
          <div className="mt-[clamp(32px,5vh,56px)] grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_.8fr]">
            <div className="grid content-start gap-3.5 rounded-[22px] border border-hairline bg-paper p-7 on-dark:border-rule-dark on-dark:bg-white/4">
              <p className="label text-muted on-dark:text-mist">Automation</p>
              <ul>{c.workflow.automation.map((t) => <li key={t} className="border-t border-hairline py-2.5 on-dark:border-rule-dark">{t}</li>)}</ul>
            </div>
            <div className="grid content-start gap-3.5 rounded-[22px] border border-strike bg-strike p-7 text-white">
              <p className="label text-ice">Insiders</p>
              <ul>{c.workflow.insiders.map((t) => <li key={t} className="border-t border-white/25 py-2.5">{t}</li>)}</ul>
            </div>
            <div className="grid content-start gap-3.5 rounded-[22px] border border-hairline p-7 on-dark:border-rule-dark">
              <p className="label text-muted on-dark:text-mist">{c.workflow.time[0]}</p>
              <p className="font-display text-[clamp(40px,4.4vw,64px)] leading-[.95] font-bold tracking-[-0.03em] text-strike on-dark:text-mist">{c.workflow.time[1]}</p>
              <p>{c.workflow.time[2]}</p>
            </div>
          </div>
        </div>
      </Room>

      <Room tone={b} room="faq" labelledBy="faq-title">
        <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[.8fr_1.4fr]">
          <div>
            <Eyebrow className="mb-5">FAQ</Eyebrow>
            <Heading id="faq-title" size="h2" reveal={false}>
              Questions, <Accent>answered.</Accent>
            </Heading>
          </div>
          <div className="faq border-t border-hairline on-dark:border-rule-dark">
            {c.faq.map(([q, ans]) => (
              <details key={q} className="border-b border-hairline on-dark:border-rule-dark">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-3.5 font-display text-[clamp(18px,1.6vw,22px)] font-semibold tracking-[-0.01em]">
                  {q}
                </summary>
                <p className="max-w-[40em] pb-5 text-ink-60 on-dark:text-fog">{ans}</p>
              </details>
            ))}
          </div>
        </div>
      </Room>
    </main>
  );
}
