import type { CSSProperties } from 'react';
import { Rise } from '@/components/minimal/Brand';
import type { PillarPage as Page } from '@/content/pillarPages';
import { Clip } from './Clip';
import { Faq, Options, Pairs, Sources, Wall } from './Common';
import { i, pad, pillarOf, PillarShell } from './Shell';

// Content reads like a feed: clips stream across the hero, one stream goes in (a playhead finds
// its moments as you scroll), a week of posts comes out (the page holds while the week slides
// past), every platform gets its own cut, and the four steps run like a strip of film.

const v = (n: number) => ({ '--at': n }) as CSSProperties;
const FEED = [
  ['0:28', '1v3 to close out map two'], ['0:19', 'Kai calls the final round'], ['8:12', 'Highlights: 2:1 against Orca'],
  ['0:41', 'Orca on Saturday: last time we met'], ['0:24', 'The ace nobody saw coming'], ['0:33', 'Comms from the deciding round'],
  ['0:22', 'The opening duel, slowed down'], ['0:37', 'Inside the scrim before Orca'],
];
const MOMENTS: [number, string, string][] = [[0.16, '0:31:05', '1v3 hold'], [0.39, '1:14:40', 'Ace'], [0.62, '1:58:12', 'Comeback'], [0.86, '2:45:30', 'Final round']];
const WEEK: [string, string, [string, string, string][]][] = [
  ['Mon', '', [['TikTok', '0:28', '1v3 to close out map two'], ['Shorts', '0:19', 'Kai calls the final round']]],
  ['Tue', '', [['YouTube', '8:12', 'Highlights: 2:1 against Orca']]],
  ['Wed', '', [['Reels', '0:24', 'The ace nobody saw coming'], ['TikTok', '0:22', 'The opening duel, slowed down']]],
  ['Thu', '', [['Shorts', '0:33', 'Comms from the deciding round']]],
  ['Fri', '', [['Reels', '0:37', 'Inside the scrim before Orca']]],
  ['Sat', 'Match day', [['TikTok', '0:15', 'Live from the server'], ['Shorts', '0:12', 'Round 24']]],
  ['Sun', '', [['YouTube', '6:40', 'The week, in six minutes']]],
];

export function ContentPage({ page }: { page: Page }) {
  const p = pillarOf(page);
  return (
    <PillarShell page={page}>
      {/* Clips stream across under the name, two rows in opposite directions. */}
      <section id="top" className="ct-hero band" aria-labelledby="ct-title">
        <div className="container ct-hero__grid">
          <div>
            <p className="ct-kind"><span>{pad(3)}</span>{p.kind}</p>
            <h1 id="ct-title" className="ct-name">{p.name}</h1>
          </div>
          <div className="ct-hero__side">
            <p className="ct-head">{page.headline}</p>
            <p className="ct-lead">{page.lead}</p>
          </div>
        </div>
        <div className="ct-feed" aria-hidden="true">
          {[0, 1].map((row) => (
            <div key={row} className="ct-feed__row" data-row={row}>
              {[...FEED, ...FEED].map(([t, cap], k) => <Clip key={k} t={t} cap={cap} wide={cap.startsWith('Highlights')} on={(k + row) % 5 === 2} />)}
            </div>
          ))}
        </div>
      </section>

      {/* One stream goes in: a playhead runs along it as you scroll and finds its moments. */}
      <section className="section band invert ct-stream" aria-labelledby="ct-stream-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="ct-stream-title" className="display" text="One stream goes in." />
            <p className="lead" data-reveal="" style={i(1)}>Software logs every minute of a Saturday match and flags the moments. Editors pick the ones worth posting.</p>
          </div>
          <div className="ct-tape" data-tape="">
            <div className="ct-tape__meta"><b>Saturday, against Orca</b><span>3h 12m</span><span className="ct-tape__found">Moments found: <b data-found="">0</b> of 4</span></div>
            <div className="ct-tape__bar">
              <span className="ct-tape__fill" />
              {MOMENTS.map(([at, ts, what]) => (
                <span key={ts} className="ct-tape__mark" data-at={at} style={v(at)}>
                  <i /><b>{what}</b><small>{ts}</small>
                </span>
              ))}
              <span className="ct-tape__head" />
            </div>
            <div className="ct-tape__hours" aria-hidden="true"><span>0:00</span><span>1:00</span><span>2:00</span><span>3:00</span></div>
          </div>
        </div>
      </section>

      {/* A week comes out: the page holds while the week slides past, day by day. */}
      <section className="ct-week band" aria-labelledby="ct-week-title">
        <div className="ct-week__pin">
          <div className="container ct-week__head">
            <Rise id="ct-week-title" className="display" text="A week comes out." />
            <p className="lead" data-reveal="" style={i(1)}>{page.sample.lead}</p>
          </div>
          <div className="ct-week__viewport">
            <ol className="ct-week__track">
              {WEEK.map(([day, tag, posts]) => (
                <li key={day} className="ct-day" data-match={tag ? '' : undefined}>
                  <p className="ct-day__name"><b>{day}</b>{tag && <span>{tag}</span>}</p>
                  {posts.map(([where, t, cap], k) => (
                    <div key={cap} className="ct-day__post">
                      <Clip t={t} cap={cap} wide={where === 'YouTube'} on={!!tag && k === 0} />
                      <span className="ct-day__where">{where}</span>
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </div>
          <p className="container ct-week__note">{page.sample.caption}</p>
        </div>
      </section>

      {/* Every platform, its own cut. */}
      <section className="section band field ct-cuts" aria-labelledby="ct-cuts-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="ct-cuts-title" className="display" text="Every platform gets its own cut." />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[1]}</p>
          </div>
          <div className="ct-cuts__row">
            <figure className="ct-cut" data-reveal="" style={i(0)}>
              <Clip t="0:28" cap="1v3 to close out map two" />
              <figcaption><b>Vertical</b>TikTok, Reels and Shorts, with subtitles</figcaption>
            </figure>
            <figure className="ct-cut ct-cut--wide" data-reveal="" style={i(1)}>
              <Clip t="8:12" cap="Highlights: 2:1 against Orca" wide />
              <figcaption><b>Full highlights</b>YouTube, the match told in minutes</figcaption>
            </figure>
            <figure className="ct-cut" data-reveal="" style={i(2)}>
              <Clip t="0:19" cap="Kai calls the final round" on handle="@kai" />
              <figcaption><b>Player channels</b>{page.gains[2]}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The four steps as frames of a strip. */}
      <section className="section band ct-strip" aria-labelledby="ct-strip-title">
        <div className="container">
          <div className="head">
            <Rise id="ct-strip-title" className="display" text="How it runs." />
          </div>
          <ol className="ct-strip__frames">
            {page.steps.map(([k, s], n) => (
              <li key={k} data-reveal="" style={i(n)}>
                <span className="ct-strip__n">{pad(n + 1)}</span>
                <h3>{k}</h3>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Wall page={page} />
      <Options page={page} title="Everything Content runs." lead="From finding the moments to posting them on every platform, for the org and your players." />
      <Sources page={page} title="Built from what’s already out there." />
      <Pairs page={page} />
      <Faq page={page} />
    </PillarShell>
  );
}
