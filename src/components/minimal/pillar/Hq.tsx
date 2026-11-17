import type { CSSProperties } from 'react';
import { Rise } from '@/components/minimal/Brand';
import { Dashboard } from '@/components/minimal/Showcase';
import type { PillarPage as Page } from '@/content/pillarPages';
import { Faq, Options, Pairs, Sources, Wall } from './Common';
import { i, pad, pillarOf, PillarShell } from './Shell';

// HQ reads like the control room it is: the hero is a dashboard, numbers counting into place.
// Then the questions partners and investors ask, answered on the spot; one month in HQ on a
// calendar that fills as you scroll; the reports it writes, fanned out; and the full screen.

const v = (n: number) => ({ '--v': n }) as CSSProperties;
const REACH = [0.38, 0.42, 0.4, 0.51, 0.48, 0.57, 0.62, 0.6, 0.71, 0.76, 0.84, 0.97];
const ASKED: [string, string, string, string][] = [
  ['Partner', 'What did our activation reach?', '1.2M views', 'across 14 posts, with the recap attached.'],
  ['Investor', 'How did October go?', '+16.7%', 'reach on the month, and a 64% win rate across 20 matches.'],
  ['Staff', 'What’s due this week?', '2 posts', 'for partners on Thursday, and a stream on Friday.'],
  ['Board', 'Where does the money go?', '6 lines', 'of spend by month, from the costs you added.'],
];
// One month: what HQ does on which day (1 to 30).
const MONTH: Record<number, [string, 'step' | 'note']> = {
  1: ['Sync', 'step'], 4: ['Post live', 'note'], 9: ['Reminder', 'note'], 12: ['Post live', 'note'],
  16: ['Match', 'note'], 20: ['Reminder', 'note'], 23: ['Post live', 'note'], 28: ['Report', 'step'], 30: ['Share', 'step'],
};
const DOCS: [string, string][] = [
  ['Partner recap', 'Every post and mention checked against what went live.'],
  ['Investor update', 'Reach, results and spend, in one clear page.'],
  ['Pitch deck', 'Built from your live numbers, for the partner you’re pitching.'],
  ['Spend report', 'Where the money went, and what to cut.'],
];

export function HqPage({ page }: { page: Page }) {
  const p = pillarOf(page);
  return (
    <PillarShell page={page}>
      {/* The hero is the dashboard: its tiles count into place. */}
      <section id="top" className="hq-hero band" aria-labelledby="hq-title">
        <div className="container">
          <div className="hq-bento">
            <div className="hq-tile hq-tile--title">
              <p className="hq-kind"><span>{pad(2)}</span>{p.kind}</p>
              <h1 id="hq-title" className="hq-name">{p.name}</h1>
              <p className="hq-head">{page.headline}</p>
              <p className="hq-lead">{page.lead}</p>
            </div>
            <div className="hq-tile hq-tile--big">
              <span className="hq-label">Followers, all platforms</span>
              <b className="hq-count" data-count="184.0" data-to="214.8" data-dp="1" data-suffix="K">214.8K</b>
              <span className="hq-up">+16.7% this month</span>
            </div>
            <div className="hq-tile hq-tile--live"><span className="s-live">Live</span><span className="hq-label">Synced a minute ago</span></div>
            <div className="hq-tile hq-tile--win">
              <span className="hq-label">Win rate</span>
              <b className="hq-count" data-count="51" data-to="64" data-dp="0" data-suffix="%">64%</b>
              <span className="hq-label">Last 20 matches</span>
            </div>
            <div className="hq-tile hq-tile--chart">
              <span className="hq-label">Reach, last 12 weeks</span>
              <div className="hq-bars">{REACH.map((h, k) => <i key={k} data-on={k === REACH.length - 1 ? '' : undefined} style={{ ...v(h), ...i(k) }} />)}</div>
            </div>
            <div className="hq-tile hq-tile--deliver">
              <span className="hq-label">Partner posts</span>
              <b className="hq-count" data-count="0" data-to="12" data-dp="0" data-suffix=" of 14">12 of 14</b>
              <i className="hq-meter"><em style={v(12 / 14)} /></i>
            </div>
            <div className="hq-tile hq-tile--report">
              <span className="hq-label">Investor update, October</span>
              <span className="s-pill">Ready to send</span>
            </div>
          </div>
          <p className="hq-note">Sample numbers for a fictional org.</p>
        </div>
      </section>

      {/* Asked, answered: the questions partners and investors ask, with the number HQ gives. */}
      <section className="section band invert hq-ask" aria-labelledby="hq-ask-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="hq-ask-title" className="display" text="Asked, and answered on the spot." />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[0]}</p>
          </div>
          <ol className="hq-ask__list">
            {ASKED.map(([who, q, n, rest], k) => (
              <li key={who} data-reveal="" style={i(k)}>
                <p className="hq-ask__q"><span>{who}</span>{q}</p>
                <p className="hq-ask__a"><b>{n}</b>{rest}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* One month in HQ: the calendar fills as you scroll, with the four steps on their days. */}
      <section className="section band hq-month" aria-labelledby="hq-month-title">
        <div className="container hq-month__grid">
          <div className="head">
            <Rise id="hq-month-title" className="display" text="One month in HQ." />
            <ol className="hq-month__steps">
              {page.steps.map(([k, s], n) => (
                <li key={k} data-reveal="" style={i(n)}><span>{pad(n + 1)}</span><b>{k}</b><p>{s}</p></li>
              ))}
            </ol>
          </div>
          <ol className="hq-cal" data-cal="">
            {Array.from({ length: 30 }, (_, d) => {
              const at = MONTH[d + 1];
              return (
                <li key={d} data-kind={at?.[1]}>
                  <span>{d + 1}</span>
                  {at && <b>{at[0]}</b>}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* The reports it writes, fanned out like documents on a desk. */}
      <section className="section band field hq-docs" aria-labelledby="hq-docs-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="hq-docs-title" className="display" text="The reports it writes." />
            <p className="lead" data-reveal="" style={i(1)}>Each month, checked by someone who knows what partners look for, and ready to send.</p>
          </div>
          <ul className="hq-docs__fan">
            {DOCS.map(([t, l], k) => (
              <li key={t} className="s-card surface" data-reveal="" style={i(k)}>
                <span className="hq-docs__n">{pad(k + 1)}</span>
                <b>{t}</b>
                <p>{l}</p>
                <span className="hq-docs__lines"><i style={v(0.9)} /><i style={v(0.7)} /><i style={v(0.82)} /><i style={v(0.5)} /></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The full screen. */}
      <section className="section band hq-screen" aria-labelledby="hq-screen-title">
        <div className="container">
          <div className="head head--split">
            <Rise id="hq-screen-title" className="display" text={page.sample.title} />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[1]}</p>
          </div>
          <figure className="show hq-screen__frame" data-reveal="">
            <Dashboard />
            <figcaption>{page.sample.caption}</figcaption>
          </figure>
        </div>
      </section>

      <Wall page={page} />
      <Options page={page} title="Everything HQ runs." lead="Run the org from one screen, and keep partners and investors informed from the same numbers." band="invert" />
      <Sources page={page} title="Built from what’s already out there." />
      <Pairs page={page} />
      <Faq page={page} />
    </PillarShell>
  );
}
