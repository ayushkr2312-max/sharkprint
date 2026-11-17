import { Rise } from '@/components/minimal/Brand';
import { Site } from '@/components/minimal/Showcase';
import { SharkMark } from '@/components/ui/Icon';
import type { PillarPage as Page } from '@/content/pillarPages';
import { Faq, Options, Pairs, Sources, Wall } from './Common';
import { i, pad, pillarOf, PillarShell } from './Shell';

// Platforms reads like a site going live: the hero is a browser with the page's own words in it,
// then one site is built in front of you (it holds while it goes from wireframe to design to
// launch to live results), then the map of everything on one base, and the finished site.

const MAP: [string, string[]][] = [
  ['Website', ['Home', 'Roster', 'Matches', 'Partners']],
  ['Merch store', ['Drops', 'Sizes', 'Checkout', 'Stock']],
  ['Tournaments', ['Registration', 'Brackets', 'Results', 'Admin']],
  ['Staff tools', ['Scrim scheduler', 'VOD queue', 'Payouts']],
  ['Discord bots', ['Match alerts', 'Roles', 'Tickets', 'Stats']],
];

// What the staff get behind the site, docked in once it launches.
const TOOLS = ['Store admin', 'Tournament admin', 'Scrim scheduler'];

/** The site that gets built: the same frame in four states (data-state 0 to 3). */
function Build() {
  return (
    <div className="pf-browser s-card surface" data-build="">
      <div className="pf-browser__chrome"><span className="site__url">yourorg.gg</span><span className="pf-live s-live">Live</span></div>
      <div className="pf-browser__body">
        <div className="pf-blk pf-blk--nav"><span className="s-brand"><SharkMark className="s-mark" />Your org</span><span className="pf-ghost">Roster  Matches  Store  Tournaments</span></div>
        <div className="pf-blk pf-blk--hero">
          <span className="pf-fill">
            <span className="pf-hero__k">Season 4</span>
            <span className="pf-hero__t">Starts Friday.</span>
          </span>
        </div>
        <div className="pf-blk pf-blk--next">
          <span className="pf-fill">
            <span className="s-h"><span className="pf-next__la">Next match</span><span className="pf-next__lb">Result</span></span>
            <span className="pf-next__a">Orca, Saturday</span>
            <span className="pf-next__b">Won 2:1</span>
          </span>
        </div>
        <div className="pf-blk pf-blk--roster"><span className="pf-fill"><span className="s-h">Roster</span><span className="pf-faces">{['N', 'K', 'J', 'T', 'R'].map((x) => <i key={x}>{x}</i>)}</span></span></div>
        <div className="pf-blk pf-blk--store"><span className="pf-fill"><span className="s-h">Store</span><span className="pf-items"><i /><i /><i /></span><span className="pf-drop s-pill">Drop live</span></span></div>
        {TOOLS.map((x, k) => (
          <div key={x} className="pf-blk pf-blk--tool"><span className="pf-fill" style={i(k)}><b>{x}</b><span className="s-h">Staff</span><i /><i /></span></div>
        ))}
      </div>
    </div>
  );
}

export function PlatformsPage({ page }: { page: Page }) {
  const p = pillarOf(page);
  return (
    <PillarShell page={page}>
      {/* The hero is a browser, with this page's own words as the org's site. */}
      <section id="top" className="pf-hero band" aria-labelledby="pf-title">
        <div className="container">
          <div className="pf-frame s-card surface">
            <div className="pf-browser__chrome"><span className="site__url">yourorg.gg</span><span className="s-live">Live</span></div>
            <div className="pf-frame__body">
              <p className="pf-kind"><span>{pad(5)}</span>{p.kind}</p>
              <h1 id="pf-title" className="pf-name">{p.name}</h1>
              <div className="pf-frame__row">
                <p className="pf-head">{page.headline}</p>
                <p className="pf-lead">{page.lead}</p>
              </div>
              <ul className="pf-frame__tiles" aria-hidden="true">
                {['Roster', 'Matches', 'Store', 'Tournaments'].map((x, k) => <li key={x} style={i(k)}><span>{x}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* One site, built in front of you: it holds while it goes through the four steps. */}
      <section className="pf-build band invert" aria-labelledby="pf-build-title">
        <span aria-hidden="true" className="texture" />
        <div className="pf-build__pin">
          <div className="container pf-build__grid">
            <div className="pf-build__text">
              <Rise id="pf-build-title" className="display" text="Built in front of you." />
              <ol className="pf-build__steps">
                {page.steps.map(([k, s], n) => (
                  <li key={k} data-step={n}>
                    <span>{pad(n + 1)}</span>
                    <b>{k}</b>
                    <p>{s}</p>
                  </li>
                ))}
              </ol>
            </div>
            <Build />
          </div>
        </div>
      </section>

      {/* One base, everything on it. */}
      <section className="section band pf-map" aria-labelledby="pf-map-title">
        <div className="container">
          <div className="head head--split">
            <Rise id="pf-map-title" className="display" text="One base, everything on it." />
            <p className="lead" data-reveal="" style={i(1)}>Your site, store, tournaments and staff tools share one setup in your own accounts, so they stay in step and nothing is locked to us.</p>
          </div>
          <div className="pf-tree">
            <p className="pf-tree__root" data-reveal=""><SharkMark className="s-mark" />Your accounts</p>
            <ul className="pf-tree__branches">
              {MAP.map(([name, leaves], k) => (
                <li key={name} data-reveal="" style={i(k)}>
                  <b>{name}</b>
                  <ul>{leaves.map((l) => <li key={l}>{l}</li>)}</ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The finished site. */}
      <section className="section band field pf-done" aria-labelledby="pf-done-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head head--split">
            <Rise id="pf-done-title" className="display" text={page.sample.title} />
            <p className="lead" data-reveal="" style={i(1)}>{page.gains[0]}</p>
          </div>
          <figure className="show" data-reveal="">
            <Site />
            <figcaption>{page.sample.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* What changes. */}
      <section className="section band invert pf-gains" aria-labelledby="pf-gains-title">
        <span aria-hidden="true" className="texture" />
        <div className="container">
          <div className="head">
            <Rise id="pf-gains-title" className="display" text="What changes for your org." />
          </div>
          <ol className="pf-gains__list">
            {p.gains.map((g, k) => (
              <li key={g} data-reveal="" style={i(k)}>
                <span>{pad(k + 1)}</span>
                <h3>{g}</h3>
                <p>{page.gains[k]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Wall page={page} band="" />
      <Options page={page} title="Everything Platforms runs." lead="For your fans and for your staff, on one setup you own." band="invert" />
      <Sources page={page} title="Built from what’s already out there." />
      <Pairs page={page} />
      <Faq page={page} />
    </PillarShell>
  );
}
