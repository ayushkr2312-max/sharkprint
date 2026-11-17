import { Rise } from '@/components/minimal/Brand';
import { Loop } from '@/components/minimal/Loops';
import { Report } from '@/components/minimal/Showcase';
import { SharkMark } from '@/components/ui/Icon';
import type { PillarPage as Page } from '@/content/pillarPages';
import { Faq, Options, Pairs, Sources, Wall } from './Common';
import { i, pad, pillarOf, PillarShell } from './Shell';

// Analyst reads like a case file on your next decision: the question being typed, the kinds of
// question it takes, the report with its evidence lifted out from under redaction bars, the
// four steps from question to call beside its loop, and the reports by when you need them.

const QUESTIONS = ['Should we sign Team Vanta?', 'How do we beat Orca on Saturday?', 'Who should coach our roster?', 'Who fills the open spot on our team?', 'Where should we expand next?'];
const KINDS: [string, string, string][] = [
  ['Roster report', 'Should we sign Team Vanta?', 'Results, trajectory, depth and how the five play together, with a recommendation.'],
  ['Opponent prep', 'How do we beat Orca on Saturday?', 'How they play, who to watch, and what to pick and ban.'],
  ['Staff report', 'Who should coach our roster?', 'Each candidate judged on what their teams actually did.'],
  ['Player report', 'Who fills the open spot on our team?', 'Candidates weighed on form, role and how they’d fit the four you have.'],
  ['Market report', 'Where should we expand next?', 'The games and regions worth entering, and who’s rising in them.'],
];
const FILE: [string, string][] = [
  ['Subject', 'Any roster, player, coach, opponent or market'],
  ['Built from', 'Public results, VODs, stats and scene news'],
  ['Written by', 'An analyst who has worked inside an org'],
  ['You get', 'A report with the call up front'],
];

export function AnalystPage({ page }: { page: Page }) {
  const p = pillarOf(page);
  const reports = p.caps.reduce((m, g) => m + g.items.length, 0);
  return (
    <PillarShell page={page}>
      {/* The case file opens on the question, typed out and changing. */}
      <section id="top" className="an-hero band" aria-labelledby="an-title">
        <div className="container">
          <p className="an-hero__tab"><span>File {pad(1)}</span>{p.kind}</p>
          <h1 id="an-title" className="an-hero__name"><span>{p.name}</span></h1>
          <div className="an-hero__grid">
            <div className="an-hero__main">
              <p className="an-ask" data-cycle={JSON.stringify(QUESTIONS)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7" /><path d="M16 16l5 5" /></svg>
                <span className="an-ask__text">{QUESTIONS[0]}</span><i aria-hidden="true" className="an-ask__caret" />
              </p>
              <p className="an-hero__head">{page.headline}</p>
            </div>
            <div className="an-hero__side">
              <p className="an-hero__lead">{page.lead}</p>
              <dl className="an-file">
                {FILE.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Any question you're weighing: five kinds, the first one large. */}
      <section className="section band invert an-qs" aria-labelledby="an-qs-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="an-qs-title" className="display" text="Bring any question you’re weighing." />
            <p className="lead" data-reveal="" style={i(1)}>Signings, hires, match prep and where to grow next all start the same way: with a question.</p>
          </div>
          <ol className="an-qs__grid">
            {KINDS.map(([kind, q, a], k) => (
              <li key={kind} data-reveal="" style={i(k)}>
                <span className="an-qs__kind"><b>{pad(k + 1)}</b>{kind}</span>
                <p className="an-qs__q">{q}</p>
                <p className="an-qs__a">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The report: the call first, the evidence lifted out from under redaction as you read. */}
      <section className="section band field an-ev" aria-labelledby="an-ev-title">
        <span aria-hidden="true" className="texture" />
        <div className="container an-ev__grid">
          <div className="an-ev__head">
            <Rise id="an-ev-title" className="display" text="Every call comes with its evidence." />
            <p className="lead" data-reveal="" style={i(1)}>{page.sample.lead}</p>
            <p className="an-ev__note" data-reveal="" style={i(2)}>{page.sample.caption}</p>
          </div>
          <figure className="show an-ev__doc" data-reveal="">
            <Report redacted />
          </figure>
        </div>
      </section>

      {/* From question to call: the four steps scroll past the loop, held still beside them. */}
      <section className="section band an-steps" aria-labelledby="an-steps-title">
        <div className="container">
          <div className="head">
            <Rise id="an-steps-title" className="display" text="From question to call." />
          </div>
          <div className="an-steps__grid">
            <div className="an-steps__film"><Loop id={page.id} /></div>
            <ol className="an-steps__list">
              {page.steps.map(([k, v], s) => (
                <li key={k} data-step="">
                  <span className="an-steps__n">{pad(s + 1)}</span>
                  <h3>{k}</h3>
                  <p>{v}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Wall page={page} title="The case it closes" />

      <Options page={page} index title="Every report, by when you need it." lead={`${reports} reports across three moments: before you sign, before you play and before you grow.`} />

      <Sources page={page} title="Built from public evidence." label={(n) => `Exhibit ${'ABCDE'[n]}`} />

      {/* What changes, as findings. */}
      <section className="section band invert an-find" aria-labelledby="an-find-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head">
            <Rise id="an-find-title" className="display" text="What changes for your org." />
          </div>
          <ol className="an-find__list">
            {p.gains.map((g, k) => (
              <li key={g} data-reveal="" style={i(k)}>
                <span className="an-find__n">Finding {pad(k + 1)}</span>
                <h3>{g}</h3>
                <p>{page.gains[k]}</p>
              </li>
            ))}
          </ol>
          <p className="an-find__sign" data-reveal=""><SharkMark className="an-find__mark" />Checked and signed by an analyst before it reaches you.</p>
        </div>
      </section>

      <Pairs page={page} band="" />
      <Faq page={page} />
    </PillarShell>
  );
}
