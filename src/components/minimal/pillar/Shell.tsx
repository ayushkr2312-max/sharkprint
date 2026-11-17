import type { CSSProperties, ReactNode } from 'react';
import { FooterMark, Logo } from '@/components/minimal/Brand';
import { Menu } from '@/components/minimal/Menu';
import { ModeToggle } from '@/components/minimal/ModeToggle';
import { PillarMotion } from '@/components/minimal/PillarMotion';
import { PILLARS } from '@/content/minimal';
import { pageFor, type PillarPage as Page } from '@/content/pillarPages';

export const i = (n: number) => ({ '--i': n }) as CSSProperties;
export const pad = (n: number) => String(n).padStart(2, '0');
export const pageHref = (slug: string) => `/pillars/${slug}`;
export const LINKS = PILLARS.map((p) => [p.name, pageHref(pageFor(p.id).slug)] as [string, string]);
export const pillarOf = (page: Page) => PILLARS.find((p) => p.id === page.id)!;
export const numberOf = (page: Page) => PILLARS.findIndex((p) => p.id === page.id) + 1;

/** What every pillar page shares: the nav with the five pillars (the corner marks lock on this
 *  one), the ribs, a closing slide that leads to the next pillar so the five read as one deck,
 *  and the footer. Each page fills the middle with a layout of its own. */
export function PillarShell({ page, children }: { page: Page; children: ReactNode }) {
  const n = numberOf(page);
  const next = PILLARS[n % PILLARS.length];
  const nextPage = pageFor(next.id);
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="nav band">
        <div className="container nav__inner">
          <Logo href="/" label="Finishers Sharkprint, home" />
          <nav aria-label="Pillars" className="nav__deck">
            <span aria-hidden="true" className="nav__lock"><i /><i /><i /><i /></span>
            <ul className="nav__links">
              {PILLARS.map((o, k) => (
                <li key={o.id}><a href={LINKS[k][1]} aria-current={o.id === page.id ? 'page' : undefined}><span>{pad(k + 1)}</span>{o.name}</a></li>
              ))}
            </ul>
          </nav>
          <div className="nav__end">
            <ModeToggle />
            <Menu links={LINKS} />
          </div>
        </div>
      </header>
      <span aria-hidden="true" className="texture" />

      <main id="main" className={`pp pp--${page.slug}`}>
        {children}

        {/* The close: the next pillar, so the five pages read in order like one deck. */}
        <section className="section band invert pnext" aria-label={`Next: ${next.name}`}>
          <span aria-hidden="true" className="texture" />
          <div className="container">
            <a className="pnext__link" href={pageHref(nextPage.slug)}>
              <span className="pnext__label">Next, pillar {pad(PILLARS.indexOf(next) + 1)} of 05</span>
              <span className="pnext__name">{next.name}</span>
              <span className="pnext__line">{nextPage.headline}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer band">
        <div className="container">
          <div className="footer__inner">
            <Logo href="/" label="Finishers Sharkprint, home" />
            <nav aria-label="Footer">
              <ul>
                {/* Plain links: every page loads whole, so its motion starts fresh. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <li><a href="/">Home</a></li>
                {LINKS.map(([label, to]) => <li key={to}><a href={to} aria-current={to === pageHref(page.slug) ? 'page' : undefined}>{label}</a></li>)}
              </ul>
            </nav>
          </div>
          <FooterMark />
          <small>© 2026 Finishers Sharkprint. Every number on this page is a sample for a fictional org.</small>
        </div>
      </footer>
      <PillarMotion />
    </>
  );
}
