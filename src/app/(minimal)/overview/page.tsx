import type { CSSProperties } from 'react';
import { FooterMark, Logo, Rise } from '@/components/minimal/Brand';
import { Climb } from '@/components/minimal/Climb';
import { FaqToggle } from '@/components/minimal/FaqToggle';
import { Finder } from '@/components/minimal/Finder';
import { Loop } from '@/components/minimal/Loops';
import { Menu } from '@/components/minimal/Menu';
import { ModeToggle } from '@/components/minimal/ModeToggle';
import { Motion } from '@/components/minimal/Motion';
import { Sources } from '@/components/minimal/Sources';
import { SharkMark } from '@/components/ui/Icon';
import { DAYS, FAQ, HERO, INSIDERS, MATCH_DAY, NAV, PILLARS, STATEMENT, STEPS, WEEK } from '@/content/minimal';

const i = (n: number) => ({ '--i': n }) as CSSProperties;
const count = (p: (typeof PILLARS)[number]) => p.caps.reduce((n, g) => n + g.items.length, 0);
// A pillar's place on the page (#analyst, #hq…) follows its name; its id stays an internal key.
const slug = (p: (typeof PILLARS)[number]) => p.name.toLowerCase();

/** Sharkprint on one page: two colours, ten bands, over a sculpted-rib texture. In the nav,
 *  four corner marks lock onto the chapter you're in like a sight. */
export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="nav band">
        <div className="container nav__inner">
          <Logo />
          <nav aria-label="Sections" className="nav__deck">
            <span aria-hidden="true" className="nav__lock"><i /><i /><i /><i /></span>
            <ul className="nav__links">
              {NAV.map(([label, href], n) => (
                <li key={href}><a href={href}><span>{String(n + 1).padStart(2, '0')}</span>{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="nav__end">
            <ModeToggle />
            <Menu links={NAV} />
          </div>
        </div>
      </header>
      <span aria-hidden="true" className="texture" />

      <main id="main">
        {/* The portal: the hero and the statement share one frame. Scrolling zooms the
            headline through the "o" of its first line, which is a window onto the statement
            (blue, its ribs and the black Finishers shark), lands you there, lights the words up
            and only then lets the page move on (Motion.tsx). */}
        <div className="portal">
        {/* Hero: the headline centred in the screen, its second line set to the right, over a
            base row: one sentence, and the five pillars it names. */}
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
            {/* The base of the hero: the sentence, and the five pillars it names, in order. */}
            <div className="hero__foot">
              <p className="hero__lead">{HERO.lead}</p>
              <ol className="hero__index" aria-label="The five pillars">
                {PILLARS.map((p, n) => (
                  <li key={p.id}><a href={'#' + slug(p)}><span>{String(n + 1).padStart(2, '0')}</span>{p.name}</a></li>
                ))}
              </ol>
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

        {/* The walls growing orgs hit on the way up, each a reason a partner or investor waits,
            drawn as one climb that the walls hold back until each pillar splits one open. */}
        <section id="walls" className="section band invert walls" aria-labelledby="walls-title">
          <span aria-hidden="true" className="texture" />
          <div className="container">
            <div className="head head--split">
              <Rise id="walls-title" className="display" text="Why partners and investors wait." />
              <p className="lead" data-reveal="" style={i(1)}>Most growing orgs hit the same five walls on the way up. Each pillar is built to take one down.</p>
            </div>
            <Climb />
          </div>
        </section>

        {/* The five pillars: each with what it is, what it changes, a loop of how it works, and
            everything it can run. The index follows along, and the finder lights up the options
            that match a need. */}
        <section id="pillars" className="section band sheet" aria-labelledby="pillars-title">
          <span aria-hidden="true" className="texture" />
          <div className="container pillars__grid">
            <div className="pillars__aside">
              <Rise id="pillars-title" text="What Sharkprint runs for you." />
              <p className="lead">Five pillars, each running one part of the org, mostly from public data. All five share the same numbers.</p>
              <ol className="index">
                {PILLARS.map((p) => (
                  <li key={p.id}>
                    <a href={'#' + slug(p)}>
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
                <article key={p.id} id={slug(p)} className="pillar" aria-labelledby={`${p.id}-name`}>
                  <p className="pillar__kind"><span className="pillar__n">{String(n + 1).padStart(2, '0')}</span>{p.kind}</p>
                  <h3 id={`${p.id}-name`} className="pillar__name" data-parallax="0.18">{p.name}</h3>
                  <div className="pillar__about">
                    <p className="pillar__line" data-reveal="">{p.line}</p>
                    <ul className="pillar__gains" data-reveal="" style={i(1)}>
                      {p.gains.map((g) => <li key={g}>{g}</li>)}
                    </ul>
                  </div>
                  <Loop id={p.id} />
                  <div className="caps">
                    <p className="caps__title"><b>What’s included</b><span>{count(p)} options</span></p>
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

        {/* Where the work comes from: public sources, through Sharkprint, into the pillars. */}
        <section id="sources" className="section band invert" aria-labelledby="sources-title">
          <span aria-hidden="true" className="texture texture--own" />
          <div className="container">
            <div className="head head--split">
              <Rise id="sources-title" className="display" text="Built from what’s already out there." />
              <p className="lead" data-reveal="" style={i(1)}>Most of what we work from is public: results, VODs, streams and socials. We turn it into prep, numbers and content. Anything private joins only if you choose to add it.</p>
            </div>
            <Sources />
          </div>
        </section>

        {/* A match week, day by day, with a line sweeping across it as you scroll. */}
        <section id="week" className="section band" aria-labelledby="week-title">
          <span aria-hidden="true" className="slats">
            {DAYS.map((d, n) => <i key={d} style={{ '--n': n } as CSSProperties}><span className="texture texture--own" /></i>)}
          </span>
          <div className="container">
            <div className="head">
              <Rise id="week-title" className="display" text="One match week, day by day." />
              <p className="lead" data-reveal="" style={i(1)}>What each of the five pillars hands over before and after a Saturday match.</p>
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
              <Rise id="process-title" className="display" text="From first call to monthly reports." />
              <p className="lead" data-reveal="" style={i(1)}>There are five steps, and you see the plan and its cost before anything is built.</p>
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
              <p className="lead" data-reveal="" style={i(1)}>How Sharkprint works, what it needs from you and what stays yours.</p>
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
