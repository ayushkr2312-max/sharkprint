import type { CSSProperties } from 'react';
import { Rise } from '@/components/minimal/Brand';
import { Roster } from '@/components/minimal/Showcase';
import type { PillarPage as Page } from '@/content/pillarPages';
import { Faq, Options, Pairs, Sources, Wall } from './Common';
import { i, pad, pillarOf, PillarShell } from './Shell';

// Creators reads like a scouting board: a field of creators with a lens picking the ones who fit,
// a big creator with the wrong audience set against a smaller one with the right one, the offer
// sheet in your name, the program at a glance, and their reach adding up to yours.

const v = (n: number) => ({ '--v': n }) as CSSProperties;
// The field: where each creator sits (percent of the field), and which four fit.
const FIELD: [number, number][] = [
  [8, 18], [19, 62], [27, 30], [34, 80], [41, 12], [46, 48], [55, 72], [61, 24], [68, 56], [74, 86], [80, 36], [88, 64], [93, 14],
  [13, 88], [23, 46], [37, 58], [50, 90], [58, 40], [71, 8], [84, 78], [90, 44], [4, 52], [31, 6], [64, 94],
];
const FIT = [5, 8, 15, 19];
const NAMES = ['Kai', 'Mira', 'Juno', 'Rhea'];
const PERKS = ['Your kit and jersey', 'A slot at every watch party', 'Shout-outs from the org’s channels', 'Their clips in your posting calendar'];
const REACH: [string, number][] = [['Juno', 210], ['Mira', 120], ['Kai', 48], ['Rhea', 36]];

export function CreatorsPage({ page }: { page: Page }) {
  const p = pillarOf(page);
  const total = REACH.reduce((n, [, r]) => n + r, 0);
  return (
    <PillarShell page={page}>
      {/* A field of creators, and a lens moving between the four who fit. */}
      <section id="top" className="cr-hero band" aria-labelledby="cr-title">
        <div className="container cr-hero__grid">
          <div className="cr-hero__text">
            <p className="cr-kind"><span>{pad(4)}</span>{p.kind}</p>
            <h1 id="cr-title" className="cr-name">{p.name}</h1>
            <p className="cr-head">{page.headline}</p>
            <p className="cr-lead">{page.lead}</p>
          </div>
          <div className="cr-field" aria-hidden="true">
            <span className="cr-field__label">Creators in your scene</span>
            {FIELD.map(([x, y], k) => {
              const f = FIT.indexOf(k);
              return (
                <span key={k} className="cr-dot" data-fit={f >= 0 ? f : undefined} style={{ left: `${x}%`, top: `${y}%`, ...i(k) }}>
                  {f >= 0 && <b>{NAMES[f]}</b>}
                </span>
              );
            })}
            <span className="cr-lens" />
          </div>
        </div>
      </section>

      {/* Fit over size: who watches decides what a creator brings you. */}
      <section className="section band invert cr-fit" aria-labelledby="cr-fit-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="cr-fit-title" className="display" text="Who watches matters more than how many." />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[0]}</p>
          </div>
          <div className="cr-vs">
            <div className="cr-vs__card s-card surface" data-reveal="">
              <span className="cr-vs__who">Creator A</span>
              <b className="cr-vs__big">120K</b>
              <span className="cr-vs__sub">followers</span>
              <span className="cr-vs__row"><span>Watch your games</span><i><em style={v(0.09)} /></i><b>9%</b></span>
              <span className="cr-vs__fans">About <b>10.8K</b> viewers who could become your fans</span>
            </div>
            <span className="cr-vs__vs" aria-hidden="true">vs</span>
            <div className="cr-vs__card s-card surface" data-on="" data-reveal="" style={i(1)}>
              <span className="cr-vs__who">Creator B</span>
              <b className="cr-vs__big">36K</b>
              <span className="cr-vs__sub">followers</span>
              <span className="cr-vs__row"><span>Watch your games</span><i><em style={v(0.84)} /></i><b>84%</b></span>
              <span className="cr-vs__fans">About <b>30.2K</b> viewers who could become your fans</span>
            </div>
          </div>
          <p className="cr-note">Sample creators. Every number is illustrative.</p>
        </div>
      </section>

      {/* The offer, under your name. */}
      <section className="section band cr-offer" aria-labelledby="cr-offer-title">
        <div className="container cr-offer__grid">
          <div className="head">
            <Rise id="cr-offer-title" className="display" text="Your offer, under your name." />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[2]}</p>
          </div>
          <div className="cr-sheet s-card surface" data-reveal="">
            <div className="s-bar"><span className="s-brand">Creator offer</span><span className="s-aside">Your org, season 4</span></div>
            <div className="cr-sheet__body">
              <h3 className="s-h">What they get</h3>
              <ul className="cr-sheet__perks">{PERKS.map((x, k) => <li key={x} style={i(k)}>{x}</li>)}</ul>
              <h3 className="s-h">Agreed up front</h3>
              <p className="cr-sheet__terms">Rights and usage, the streams they commit to, and how the program reports on them.</p>
              <p className="cr-sheet__sign"><span>Your org</span><span>Creator</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* The program at a glance: the roster, a media kit and their week. */}
      <section className="section band field cr-program" aria-labelledby="cr-program-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="cr-program-title" className="display" text={page.sample.title} />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[1]}</p>
          </div>
          <figure className="show" data-reveal="">
            <Roster />
            <figcaption>{page.sample.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* Their reach adds up to yours: one bar, a segment per creator. */}
      <section className="section band invert cr-reach" aria-labelledby="cr-reach-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="cr-reach-title" className="display" text="Their reach adds up to yours." />
            <p className="lead" data-reveal="" style={i(1)}>Each month the program report shows how far it reaches, and what to try next.</p>
          </div>
          <div className="cr-stack show" data-reveal="">
            <p className="cr-stack__total"><b>{total}K</b>combined followers across four creators</p>
            <div className="cr-stack__bar">
              {REACH.map(([n, r], k) => <span key={n} data-on={k === 0 ? '' : undefined} style={{ ...v(r / total), ...i(k) }}><b>{n}</b><small>{r}K</small></span>)}
            </div>
            <p className="cr-note">Sample creators. Every number is illustrative.</p>
          </div>
        </div>
      </section>

      {/* Scout, sign, schedule, grow. */}
      <section className="section band cr-steps" aria-labelledby="cr-steps-title">
        <div className="container">
          <div className="head">
            <Rise id="cr-steps-title" className="display" text="How the program runs." />
          </div>
          <ol className="cr-steps__list">
            {page.steps.map(([k, s], n) => (
              <li key={k} data-reveal="" style={i(n)}>
                <span className="cr-steps__n">{pad(n + 1)}</span>
                <h3>{k}</h3>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Wall page={page} />
      <Options page={page} title="Everything Creators runs." lead="Signing creators and running the program, under your name." band="field" />
      <Sources page={page} title="Built from what’s already out there." />
      <Pairs page={page} />
      <Faq page={page} />
    </PillarShell>
  );
}
