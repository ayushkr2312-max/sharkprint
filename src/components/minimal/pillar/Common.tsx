import { Rise } from '@/components/minimal/Brand';
import { FaqToggle } from '@/components/minimal/FaqToggle';
import { PILLARS, SOURCES, WALLS } from '@/content/minimal';
import { pageFor, type PillarPage as Page } from '@/content/pillarPages';
import { i, LINKS, pad, pillarOf } from './Shell';

// Sections every pillar page has, each given its page's own dress by a class (pp--<slug> in
// pillars.css): the wall it takes down, everything it runs, what it's built from, how it works
// with the other four, and its questions.

/** The wall it takes down: struck through as it reaches the middle, and the fix beside it. */
export function Wall({ page, band = 'invert', title = 'What it fixes' }: { page: Page; band?: string; title?: string }) {
  const p = pillarOf(page);
  const wall = WALLS.find((w) => w.pillar === page.id)!;
  return (
    <section className={`section band ${band} pwall`} aria-labelledby="pwall-title">
      <span aria-hidden="true" className="texture" />
      <div className="container pwall__grid">
        <div className="pwall__what">
          <h2 id="pwall-title" className="pwall__label">{title}</h2>
          <p className="pwall__wall"><span>{wall.name}.</span><span aria-hidden="true" className="pwall__strike">{wall.name}.</span></p>
          <p className="pwall__cost">{wall.cost}</p>
        </div>
        <p className="pwall__fix" data-reveal=""><b>{p.name}</b><span>{wall.fix}</span></p>
      </div>
    </section>
  );
}

/** Everything it runs, in its groups. Numbered like the index of a report when `index` is set. */
export function Options({ page, title, lead, band = '', index = false }: { page: Page; title: string; lead: string; band?: string; index?: boolean }) {
  const p = pillarOf(page);
  return (
    <section className={`section band ${band} popts`} aria-labelledby="popts-title">
      {band && <span aria-hidden="true" className="texture" />}
      <div className="container">
        <div className="head head--split">
          <Rise id="popts-title" className="display" text={title} />
          <p className="lead" data-reveal="" style={i(1)}>{lead}</p>
        </div>
        <div className="popts__groups">
          {p.caps.map((g, k) => (
            <div key={g.group} className="popts__group" data-reveal="" style={i(k)}>
              <h3><span>{index ? `${k + 1}.` : pad(k + 1)}</span>{g.group}</h3>
              <ul>
                {g.items.map(([t, l], j) => (
                  <li key={t}>
                    {index && <span className="popts__n">{k + 1}.{j + 1}</span>}
                    <b>{t}</b><span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** What it's built from: each public source, and what it becomes for this pillar. */
export function Sources({ page, title, label }: { page: Page; title: string; label?: (n: number) => string }) {
  const p = pillarOf(page);
  const sources = SOURCES.filter((s) => s.feeds[page.id]);
  return (
    <section className="section band psources" aria-labelledby="psources-title">
      <div className="container psources__grid">
        <div className="head">
          <Rise id="psources-title" className="display" text={title} />
          <p className="lead" data-reveal="" style={i(1)}>Most of what {p.name} works from is public. Anything private joins only if you choose to add it.</p>
        </div>
        <ul className="psources__list">
          {sources.map((s, k) => (
            <li key={s.id} data-reveal="" style={i(k)} data-optional={s.optional ? '' : undefined}>
              {label && <span className="psources__tag">{label(k)}</span>}
              <div><b>{s.name}</b><span>{s.line}</span></div>
              <p>{s.feeds[page.id]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** How it works with the other four, each leading to its page. */
export function Pairs({ page, band = 'invert' }: { page: Page; band?: string }) {
  const others = PILLARS.filter((o) => o.id !== page.id);
  return (
    <section className={`section band ${band} ppairs`} aria-labelledby="ppairs-title">
      <span aria-hidden="true" className="texture" />
      <div className="container">
        <div className="head head--split">
          <Rise id="ppairs-title" className="display" text="How it works with the other four." />
          <p className="lead" data-reveal="" style={i(1)}>Each pillar works on its own, and every one you add feeds the same numbers.</p>
        </div>
        <ul className="ppairs__list">
          {others.map((o, k) => {
            const at = PILLARS.indexOf(o);
            return (
              <li key={o.id} data-reveal="" style={i(k)}>
                <a href={LINKS[at][1]}>
                  <span className="ppairs__n">{pad(at + 1)}</span>
                  <b>{o.name}</b>
                  <span className="ppairs__kind">{o.kind}</span>
                  <span className="ppairs__line">{page.pairs[o.id] ?? pageFor(o.id).headline}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Its own questions, on light blue. */
export function Faq({ page }: { page: Page }) {
  const p = pillarOf(page);
  return (
    <section id="faq" className="section band field pfaq" aria-labelledby="faq-title">
      <span aria-hidden="true" className="texture" />
      <div className="container faq__grid">
        <div className="faq__head">
          <Rise id="faq-title" className="display" text={`Questions about ${p.name}.`} />
          <FaqToggle />
        </div>
        <div className="faq">
          {page.faq.map(([q, a], k) => (
            <details key={q} className="faq__item" open={k === 0} data-reveal="" style={i(k)}>
              <summary>{q}<span aria-hidden="true" className="faq__icon" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
