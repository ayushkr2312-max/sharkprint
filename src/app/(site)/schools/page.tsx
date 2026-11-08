import type { Metadata } from 'next';
import card from '@/app/cards/schools.png';
import { share, UNLISTED } from '@/lib/share';
import { Room } from '@/components/site/Room';
import { Closing } from '@/components/offer/Closing';
import { DockHero } from '@/components/offer/DockHero';
import { Explorer } from '@/components/offer/Explorer';
import { Phases } from '@/components/offer/Phases';
import { SchoolDash } from '@/components/schools/SchoolDash';
import { BlueprintMock, ClipTrio, StaffThumb } from '@/components/schools/Mocks';
import { Asset } from '@/components/ui/Asset';
import { Heading, Lead, Accent } from '@/components/ui/type';
import { ACCESS, CONTROLS, OUTCOMES, PATHWAY, PROGRAM, ROLES, SCHOOL_FAQ, SCHOOLS_META, SHAPES, TERM, WHO } from '@/content/schools';

const { title, description } = SCHOOLS_META;
export const metadata: Metadata = { title, description, ...share(title, description, { image: card, alt: 'Sharkprint for schools and colleges: school esports, done properly. Tryouts, leagues, match clips and a staff view.' }), ...UNLISTED };

const STRONG = new Set(['Approve', 'Full', 'All, with logs']);

/** For schools and colleges: the pillars as the systems behind an esports program.
 *  The promise over the program docked → what a program gives the school → the five parts → the
 *  student pathway → safeguarding → a term, start to end → schools and colleges →
 *  questions → the next step. Sent directly, never linked from the main site. Never two
 *  dark rooms in a row. */
export default function SchoolsPage() {
  return (
    <main id="main">
      <DockHero
        id="schools"
        title="School esports, done properly."
        lines={['SCHOOL ESPORTS,', 'DONE PROPERLY.']}
        lead="We design, set up and run the systems behind a school or college esports program, so students compete safely and staff stay in control."
        cta={{ label: 'Book a free call', href: '#contact' }}
        label="The program"
        tiles={[
          { id: 'tryouts', name: 'Tryouts', kind: 'Fair, scouted, noted', href: '#program', tone: 'trench', art: <Asset src="intel/scouting-report.svg" eager label="A tryout report" />, w: '82%', sink: '30%' },
          { id: 'league', name: 'League', kind: 'Brackets and results', href: '#program', tone: 'paper', art: <Asset src="forge/tournament.svg" eager label="A league bracket" />, w: '150%', sink: '12%', left: '74%' },
          { id: 'clips', name: 'Match clips', kind: 'Approved by staff', href: '#program', tone: 'strike', art: <Asset src="engine/clip-arena.svg" eager label="A match clip" />, w: '46%', sink: '26%' },
          { id: 'staff', name: 'Staff view', kind: 'Teams, forms, approvals', href: '#safeguarding', tone: 'ink', art: <StaffThumb />, w: '88%', sink: '8%' },
        ]}
      />

      <Room tone="deep" room="s-why" labelledBy="why-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="why-title" size="h1">
              What a program<br /><Accent touch="stack">gives your school.</Accent>
            </Heading>
            <Lead className="lg:max-w-[23em] lg:pb-2">
              Esports is a team activity with a timetable, a coach and a league table. Run well, it gives a school more than a club.
            </Lead>
          </div>
          <ol data-line="foot" className="mt-[clamp(40px,6vh,64px)] grid grid-cols-1 gap-x-[clamp(32px,5vw,80px)] md:grid-cols-2">
            {OUTCOMES.map(([k, v], i) => (
              <li key={k} data-reveal="" className="grid grid-cols-[clamp(64px,7vw,96px)_minmax(0,1fr)] items-start gap-4 border-t border-hairline py-7">
                <span className="stroke-numeral font-display text-[clamp(48px,5vw,72px)] leading-[.8] font-extrabold tracking-[-0.04em]">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid gap-2">
                  <b className="font-display text-[clamp(22px,2vw,28px)] leading-tight font-bold">{k}</b>
                  <span className="text-[16.5px] text-ink-60">{v}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Room>

      <Room tone="abyss" room="s-program" id="program" labelledBy="program-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="program-title" size="h1">
              Five parts,<br /><Accent touch="screen">one program.</Accent>
            </Heading>
            <Lead className="lg:max-w-[25em] lg:pb-2">
              Everything the program runs on, set up before the first sign-up and kept running all year.
            </Lead>
          </div>
          <div data-line="foot" className="mt-[clamp(40px,6vh,64px)]">
            <Explorer
              label="The program"
              services={PROGRAM}
              visuals={{
                plan: <BlueprintMock />,
                coach: <Asset src="intel/scouting-report.svg" label="A tryout report: a player shortlisted with a fit score and a scout note" className="mx-auto w-full max-w-[400px] overflow-hidden rounded-[22px]" />,
                league: <Asset src="forge/tournament.svg" label="A tournament platform: registration, brackets, match pages and results" className="overflow-hidden rounded-[22px]" />,
                staff: <SchoolDash />,
                media: <ClipTrio />,
              }}
            />
            <p className="mt-6 text-[13px] text-fog">Screens show sample data, not a real school.</p>
          </div>
        </div>
      </Room>

      <Room tone="creme" room="s-path" labelledBy="path-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="path-title" size="h1">
              A pathway,<br /><Accent touch="route">not just a club.</Accent>
            </Heading>
            <Lead className="lg:max-w-[24em] lg:pb-2">
              Every student can find a role, and leave with work they can show a college or an employer.
            </Lead>
          </div>
          <ol className="path mt-[clamp(48px,7vh,80px)]">
            {PATHWAY.map(([k, v], i) => (
              <li key={k} data-reveal="">
                <span aria-hidden="true" className="path-dot">{i + 1}</span>
                <b className="font-display text-[clamp(22px,2vw,26px)] leading-tight font-bold">{k}</b>
                <p className="text-[15.5px] text-ink-60">{v}</p>
              </li>
            ))}
          </ol>
          <div data-line="foot" className="mt-[clamp(48px,7vh,72px)] rounded-[22px] border border-hairline bg-paper p-[clamp(20px,2.4vw,30px)]">
            <p className="mb-4 text-[14px] font-semibold text-muted">Roles students take on, and what they learn</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
              {ROLES.map(([k, v]) => (
                <li key={k} data-reveal="" className="grid gap-1 border-t border-hairline pt-3">
                  <b className="font-display text-[19px] font-bold">{k}</b>
                  <span className="text-[14.5px] text-ink-60">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Room>

      <Room tone="trench" room="s-safe" id="safeguarding" labelledBy="safe-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="safe-title" size="h1">
              Safeguarding,<br /><Accent>built in.</Accent>
            </Heading>
            <Lead className="lg:max-w-[25em] lg:pb-2">
              Every system is set up for students under 18 first. Staff decide what goes public, who can talk to whom, and who sees what.
            </Lead>
          </div>
          <div data-reveal="" className="matrix-wrap mt-[clamp(40px,6vh,64px)]">
            <table className="matrix">
              <caption className="sr-only">Who sees what in the program</caption>
              <thead>
                <tr><th scope="col">What</th>{WHO.map((w) => <th key={w} scope="col">{w}</th>)}</tr>
              </thead>
              <tbody>
                {ACCESS.map(([k, cells]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    {cells.map((c, i) => (
                      <td key={WHO[i]}><span data-v={c === 'No' ? 'none' : STRONG.has(c) ? 'strong' : undefined}>{c}</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul data-line="foot" className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3">
            {CONTROLS.map(([k, v]) => (
              <li key={k} data-reveal="" className="grid gap-1 border-t border-rule-dark pt-3.5">
                <strong className="font-display text-[19px] font-semibold text-white">{k}</strong>
                <span className="text-[15.5px] text-fog">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </Room>

      <Room tone="creme" room="s-term" id="term" labelledBy="term-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="term-title" size="h1">
              How a term<br /><Accent touch="week">comes together.</Accent>
            </Heading>
            <Lead className="lg:max-w-[24em] lg:pb-2">
              Leadership signs off the plan before term, and gets a report at the end of it.
            </Lead>
          </div>
          <div data-line="foot" className="mt-[clamp(48px,7vh,80px)]">
            <Phases phases={TERM} label="A term, start to end" />
          </div>
        </div>
      </Room>

      <Room tone="abyss" room="s-shapes" labelledBy="shapes-title">
        <div className="wrap">
          <Heading data-line="in" id="shapes-title" size="h1">
            For schools,<br /><Accent>and for colleges.</Accent>
          </Heading>
          <div data-line="foot" className="mt-[clamp(40px,6vh,64px)] grid grid-cols-1 gap-5 lg:grid-cols-2">
            {SHAPES.map((s, i) => (
              <section key={s.name} data-reveal="" aria-labelledby={`shape-${i}`} className={i === 1 ? 'plan plan--mid' : 'plan'}>
                <h3 id={`shape-${i}`} className="font-display text-[clamp(28px,2.6vw,38px)] leading-none font-bold tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-3 text-[16px] text-fog">{s.line}</p>
                <ul className="mt-6">
                  {s.items.map((t) => (
                    <li key={t} className="flex gap-3 border-t border-rule-dark py-3 text-[16px] text-white">
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 size-4 flex-none text-mist"><path d="M3 8.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Room>

      <Room tone="deep" room="s-faq" id="faq" labelledBy="s-faq-title">
        <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[.8fr_1.4fr]">
          <Heading data-line="in" id="s-faq-title" size="h2">
            Questions, <Accent>answered.</Accent>
          </Heading>
          <div data-line="foot" className="faq border-t border-hairline">
            {SCHOOL_FAQ.map(([q, ans]) => (
              <details key={q} className="border-b border-hairline">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-3.5 font-display text-[clamp(18px,1.6vw,22px)] font-semibold tracking-[-0.01em]">
                  {q}
                </summary>
                <p className="max-w-[40em] pb-5 text-ink-60">{ans}</p>
              </details>
            ))}
          </div>
        </div>
      </Room>

      <Closing
        kind="school"
        body="Tell us a little about your school and we’ll reply by email to find a time with your staff lead. After the call you get a written program blueprint, with scope, timeline and budget, for leadership to review."
        steps={[
          ['A free call', 'With your staff lead, about students, space and the timetable.'],
          ['A program blueprint', 'Games, teams, policies and budget, in writing.'],
          ['Leadership review', 'Sign it off, change it, or keep it for next year.'],
        ]}
      />
    </main>
  );
}
