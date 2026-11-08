import type { CSSProperties } from 'react';
import { FooterMark, Logo, Rise } from '@/components/minimal/Brand';
import { FaqToggle } from '@/components/minimal/FaqToggle';
import { PillarFig } from '@/components/minimal/Figures';
import { Finder } from '@/components/minimal/Finder';
import { Menu } from '@/components/minimal/Menu';
import { ModeToggle } from '@/components/minimal/ModeToggle';
import { Motion } from '@/components/minimal/Motion';
import { Report } from '@/components/minimal/Report';
import { SharkMark } from '@/components/ui/Icon';
import { DAYS, FAQ, HERO, INSIDERS, MATCH_DAY, NAV, PILLARS, STATEMENT, STEPS, WEEK } from '@/content/minimal';

const i = (n: number) => ({ '--i': n }) as CSSProperties;
const count = (p: (typeof PILLARS)[number]) => p.caps.reduce((n, g) => n + g.items.length, 0);

/** Sharkprint on one page: two colours, nine bands, over a sculpted-rib texture. A light-blue
 *  lateral line runs down the page as you read and ends under the footer's SHARKPRINT. */
export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="nav band">
        <div className="container nav__inner">
          <Logo />
          <nav aria-label="Sections">
            <ul className="nav__links">
              {NAV.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
            </ul>
          </nav>
          <div className="nav__end">
            <ModeToggle />
            <Menu links={NAV} />
          </div>
        </div>
      </header>
      <span aria-hidden="true" className="texture" />
      <span aria-hidden="true" className="spine"><i /></span>

      <main id="main">
        {/* The portal: the hero and the statement share one frame. Scrolling zooms the
            headline through the "o" of its first line, which is a window onto the statement
            (blue, its ribs and the black Finishers shark), lands you there, lights the words up
            and only then lets the page move on (Motion.tsx). */}
        <div className="portal">
        {/* Hero: type alone. The headline spans the full width, its second line set to the
            right, and one sentence sits beneath it. */}
        <section id="top" className="hero band" aria-labelledby="hero-title">
          <div className="container hero__in">
            <span aria-hidden="true" className="hero__window">
              <span className="portal__scene">
                <span className="portal__ribs" />
                <SharkMark className="portal__shark" />
              </span>
            </span>
            <h1 id="hero-title" className="hero__title">
              {HERO.title.map((t, n) => {
                const k = n === 0 ? t.lastIndexOf('o') : -1;
                return (
                  <span key={t} className={`ln ln--${n + 1}`}>
                    <span style={i(n)}>
                      {k < 0 ? t : <>{t.slice(0, k)}<span className="hero__o">o<i className="hero__base" /></span>{t.slice(k + 1)}</>}
                    </span>
                    {n === 0 && ' '}
                  </span>
                );
              })}
            </h1>
            <div className="hero__foot">
              <p className="hero__lead">{HERO.lead}</p>
            </div>
          </div>
        </section>

        {/* Statement: what every org already has, beside the mark. Its words light up once
            you've landed through the portal. */}
        <section className="statement band field" aria-label="What we do">
          <span aria-hidden="true" className="texture texture--own" />
          <div className="container statement__grid">
            <p className="statement__text">
              {STATEMENT.split(' ').map((w, n) => <span key={n} data-w="">{w} </span>)}
            </p>
            <div aria-hidden="true" className="statement__mark"><SharkMark /></div>
          </div>
        </section>
        </div>

        {/* The five pillars: each with what it is, one figure at a glance, and everything it can run.
            The index follows along, and the finder lights up the options that match a need. */}
        <section id="pillars" className="section band sheet" aria-labelledby="pillars-title">
          <span aria-hidden="true" className="texture" />
          <div className="container pillars__grid">
            <div className="pillars__aside">
              <Rise id="pillars-title" text="Five pillars, one system." />
              <p className="lead">Each runs part of the org, mostly from what’s already public. All five feed the same numbers.</p>
              <ol className="index">
                {PILLARS.map((p) => (
                  <li key={p.id}>
                    <a href={'#' + p.id}>
                      {p.name}
                      <span className="index__n" data-count-for={p.id} data-total={count(p)} aria-label={`${count(p)} options`}>{count(p)}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <Finder />
            </div>
            <div>
              {PILLARS.map((p, n) => (
                <article key={p.id} id={p.id} className="pillar" aria-labelledby={`${p.id}-name`}>
                  <p className="pillar__kind"><span className="pillar__n">{String(n + 1).padStart(2, '0')}</span>{p.kind}</p>
                  <h3 id={`${p.id}-name`} className="pillar__name" data-parallax="0.18">{p.name}</h3>
                  <p className="pillar__line" data-reveal="">{p.line}</p>
                  <PillarFig id={p.id} />
                  <div className="caps">
                    <p className="caps__title"><b>Everything {p.name} can run</b><span>{count(p)} options</span></p>
                    <div className="caps__groups">
                      {p.caps.map((g, k) => (
                        <div key={g.group} className="caps__group" data-reveal="" style={i(k)}>
                          <h4>{g.group}<span>{g.items.length}</span></h4>
                          <ul>
                            {g.items.map(([t, l]) => (
                              <li key={t} className="cap" data-pillar={p.id} data-cap={`${t} ${l} ${g.group} ${p.name}`.toLowerCase()}>
                                <b>{t}</b><span>{l}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* The live report. */}
        <section id="report" className="section band invert" aria-labelledby="report-title">
          <span aria-hidden="true" className="texture texture--own" />
          <div className="container">
            <div className="head head--split">
              <Rise id="report-title" className="display" text="Your reach, counted as it happens." />
              <p className="lead" data-reveal="" style={i(1)}>Matches, streams, socials and your site feed one live report, shaped for whoever needs to read it.</p>
            </div>
            <Report />
          </div>
        </section>

        {/* A match week, day by day, with a line sweeping across it as you scroll. */}
        <section id="week" className="section band" aria-labelledby="week-title">
          <span aria-hidden="true" className="slats">
            {DAYS.map((d, n) => <i key={d} style={{ '--n': n } as CSSProperties}><span className="texture texture--own" /></i>)}
          </span>
          <div className="container">
            <div className="head">
              <Rise id="week-title" className="display" text="A match week, handled." />
              <p className="lead" data-reveal="" style={i(1)}>What lands, and when, across all five pillars.</p>
            </div>
            <p className="week__hint" aria-hidden="true">Swipe sideways for the whole week</p>
            <div className="week-wrap" tabIndex={0} role="region" aria-labelledby="week-title">
              <span aria-hidden="true" className="week__now" />
              <table className="week">
                <caption>A sample week, with a match on Saturday.</caption>
                <thead>
                  <tr>
                    <td />
                    {DAYS.map((d, n) => (
                      <th key={d} scope="col" data-day={n} data-match={n === MATCH_DAY ? '' : undefined}>
                        {n === MATCH_DAY ? <span>{d}, match</span> : d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PILLARS.map((p) => (
                    <tr key={p.id}>
                      <th scope="row">{p.name}</th>
                      {DAYS.map((d, n) => {
                        const items = WEEK[p.id].filter(([day]) => day === n);
                        return (
                          <td key={d}>
                            {items.map(([day, what]) => <span key={what} className="wk" data-day={day}>{what}</span>)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Insiders, in the other colour of the pair. The heading holds while the steps pass. */}
        <section id="insiders" className="section band invert" aria-labelledby="insiders-title">
          <span aria-hidden="true" className="texture texture--own" />
          <span aria-hidden="true" className="scan" />
          <div className="container insiders__grid">
            <div className="insiders__head">
              <Rise id="insiders-title" className="display" text="Drafted by software, signed by insiders." />
              <p className="lead" data-reveal="" style={i(1)}>Automation does the repetitive work. Before anything reaches you, someone who has worked inside an esports org checks it and signs it off.</p>
            </div>
            <div className="review">
              <span aria-hidden="true" className="review__track" data-fill=""><i /></span>
              <ol>
                {INSIDERS.map(([k, v], n) => (
                  <li key={k} data-reveal="" style={i(n)}><b>{k}</b><span>{v}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* How we work: on wide screens the steps slide past while the row holds still. */}
        <section id="process" className="section band process" aria-labelledby="process-title">
          <div className="container">
            <div className="head head--split">
              <Rise id="process-title" className="display" text="From first call to autopilot." />
              <p className="lead" data-reveal="" style={i(1)}>Five steps. You see the plan and the cost before anything is built.</p>
            </div>
            <div className="steps">
              <span aria-hidden="true" className="steps__track" data-fill=""><i /></span>
              <ol>
                {STEPS.map(([k, v], n) => (
                  <li key={k} data-step="">
                    <span aria-hidden="true" className="steps__n">{String(n + 1).padStart(2, '0')}</span>
                    <b>{k}</b>
                    <span>{v}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Questions, in light blue: grouped, the first one open, the heading holding still
            while they scroll past. */}
        <section id="faq" className="section band field opens" aria-labelledby="faq-title">
          <span aria-hidden="true" className="field-bg" />
          <span aria-hidden="true" className="texture" />
          <div className="container faq__grid">
            <div className="faq__head">
              <Rise id="faq-title" className="display" text="Questions orgs ask first." />
              <p className="lead" data-reveal="" style={i(1)}>Straight answers about how Sharkprint works, what it needs from you and what stays yours.</p>
              <FaqToggle />
            </div>
            <div className="faq__groups">
              {FAQ.map(({ group, items }, g) => (
                <div key={group} className="faq__group">
                  <h3 data-reveal="">{group}</h3>
                  <div className="faq">
                    {items.map(([q, a], n) => (
                      <details key={q} className="faq__item" open={g === 0 && n === 0} data-reveal="" style={i(n)}>
                        <summary>{q}<span aria-hidden="true" className="faq__icon" /></summary>
                        <p>{a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer band">
        <div className="container">
          <div className="footer__inner">
            <Logo />
            <nav aria-label="Footer">
              <ul>
                {NAV.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}
                <li><a href="#faq">Questions</a></li>
              </ul>
            </nav>
          </div>
          <FooterMark />
          <small>© 2026 Finishers Sharkprint. Every number on this page is a sample for a fictional org.</small>
        </div>
      </footer>
      <Motion />
    </>
  );
}
