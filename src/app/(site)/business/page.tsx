import type { Metadata } from 'next';
import card from '@/app/cards/business.png';
import { share, UNLISTED } from '@/lib/share';
import { Room } from '@/components/site/Room';
import { AuditThumb, BizHero, BookingThumb, DashThumb, NoteThumb, ReelThumb } from '@/components/business/Mocks';
import { Services } from '@/components/business/Services';
import { Closing } from '@/components/offer/Closing';
import { DockHero } from '@/components/offer/DockHero';
import { Phases } from '@/components/offer/Phases';
import { Arrow, btn } from '@/components/ui/buttons';
import { Heading, Lead, Accent } from '@/components/ui/type';
import { ASSURANCES, BUSINESS_FAQ, BUSINESS_META, COMPARE, ENGAGE, FOUNDING, PRINCIPLES, PROCESS, SECTORS, TOOLS } from '@/content/business';

const { title, description } = BUSINESS_META;
export const metadata: Metadata = { title, description, ...share(title, description, { image: card, alt: 'Sharkprint for business: run the business, not the admin. A dashboard, a website and tools, content, a market note and a spend audit.' }), ...UNLISTED };

const Tick = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** For businesses: the same systems, offered to small and growing businesses of any kind.
 *  The promise over the five services docked → the tools it connects → what changes → all five
 *  services → who it's for → the process → how we work → ways to start → questions → the
 *  enquiry form. Sent directly, never linked from the main site. Never two dark rooms in a row. */
export default function BusinessPage() {
  return (
    <main id="main">
      <DockHero
        id="business"
        title="Run the business, not the admin."
        lines={['RUN THE BUSINESS,', 'NOT THE ADMIN.']}
        lead="For growing teams of 5 to 50 people: your tools connected, your website and bookings built, your content going out and your numbers reported every month."
        cta={{ label: 'Book a free call', href: '#contact' }}
        label="The five services"
        tiles={[
          { id: 'dashboard', name: 'Dashboard', kind: 'Reporting', href: '#svc-dashboard', tone: 'strike', art: <DashThumb />, w: '96%', sink: '8%' },
          { id: 'web', name: 'Website', kind: 'Shop and tools', href: '#svc-web', tone: 'paper', art: <BookingThumb />, w: '84%', sink: '10%' },
          { id: 'content', name: 'Content', kind: 'Short video', href: '#svc-content', tone: 'trench', art: <ReelThumb />, w: '92%', sink: '6%' },
          { id: 'market', name: 'Market', kind: 'Monthly note', href: '#svc-market', tone: 'mist', art: <NoteThumb />, w: '88%', sink: '10%' },
          { id: 'efficiency', name: 'Efficiency', kind: 'Spend and automation', href: '#svc-efficiency', tone: 'ink', art: <AuditThumb />, w: '90%', sink: '8%' },
        ]}
      />

      <Room tone="deep" room="b-connect" labelledBy="connect-title" className="overflow-hidden">
        <div className="wrap grid grid-cols-1 items-center gap-[clamp(40px,5vw,80px)] lg:grid-cols-[.8fr_1.2fr]">
          <div className="grid content-start gap-6">
            <Heading data-line="in" id="connect-title" size="h1">
              Your tools in,<br /><Accent touch="route">one system out.</Accent>
            </Heading>
            <Lead>
              We connect what you already pay for, from the shop and payments to accounting, bookings and socials, and put it to work: one dashboard, reminders that send themselves, bookings confirmed without anyone typing.
            </Lead>
            <ul data-reveal="" className="assure">
              {ASSURANCES.map((a) => <li key={a}><Tick />{a}</li>)}
            </ul>
          </div>
          <div data-line="foot" data-reveal="">
            <BizHero />
          </div>
        </div>
        <div data-reveal="" className="wrap mt-[clamp(48px,7vh,72px)] grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
          <p className="max-w-[16em] font-display text-[22px] leading-tight font-bold">Works with the tools you already pay for</p>
          <div>
            <ul className="flex flex-wrap gap-2">
              {TOOLS.map((t) => <li key={t} className="rounded-full border border-hairline bg-paper px-3.5 py-1.5 text-[14px] font-medium">{t}</li>)}
            </ul>
            <p className="mt-3 text-[14px] text-ink-60">Something else? If it has an export or an API, we can usually connect it.</p>
          </div>
        </div>
      </Room>

      <Room tone="creme" room="b-compare" labelledBy="compare-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="compare-title" size="h1">
              Less admin.<br /><Accent>Better decisions.</Accent>
            </Heading>
            <Lead className="lg:max-w-[25em] lg:pb-2">
              Most growing businesses run on tools added one at a time. We connect them, fill the gaps and keep it all running, so your team spends its time on customers instead of copying numbers between apps.
            </Lead>
          </div>
          <div data-line="foot" data-reveal="" className="mt-[clamp(40px,6vh,64px)]">
            <table className="compare">
              <thead>
                <tr><th scope="col">Area</th><th scope="col">Today</th><th scope="col">With Sharkprint</th></tr>
              </thead>
              <tbody>
                {COMPARE.map(([area, today, after]) => (
                  <tr key={area}>
                    <th scope="row">{area}</th>
                    <td>{today}</td>
                    <td><span><Tick />{after}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Room>

      <Room tone="abyss" room="b-services" id="services" labelledBy="services-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="services-title" size="h1">
              Five services,<br /><Accent touch="screen">one partner.</Accent>
            </Heading>
            <Lead className="lg:max-w-[25em] lg:pb-2">
              Start with one and add the rest as you grow. Everything shares the same data, so each new piece makes the others more useful.
            </Lead>
          </div>
          <div data-line="foot" className="mt-[clamp(40px,6vh,64px)]">
            <Services />
            <p className="mt-5 text-[13px] text-fog">Screens show sample data, not client results.</p>
          </div>
        </div>
      </Room>

      <Room tone="creme" room="b-sectors" labelledBy="sectors-title">
        <div className="wrap">
          <div className="grid gap-6">
            <Heading data-line="in" id="sectors-title" size="h1">
              Built for businesses<br /><Accent touch="route">on the way up.</Accent>
            </Heading>
            <Lead>
              Whatever you sell, the same pressures show up as a business grows. Here’s the project we’d typically start with.
            </Lead>
          </div>
          <ul data-line="foot" className="mt-[clamp(40px,6vh,64px)] grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map(([k, v], i) => (
              <li key={k} data-reveal="" className="grid content-start gap-2.5 border-t border-hairline py-6">
                <span className="font-display text-[15px] font-bold text-strike">{String(i + 1).padStart(2, '0')}</span>
                <b className="font-display text-[clamp(22px,2vw,26px)] leading-tight font-bold">{k}</b>
                <p className="text-[13px] font-semibold text-muted">A typical first project</p>
                <p className="text-[16px] text-ink-60">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </Room>

      <Room tone="trench" room="b-process" id="process" labelledBy="process-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="process-title" size="h1">
              A clear process,<br /><Accent touch="route">start to finish.</Accent>
            </Heading>
            <Lead className="lg:max-w-[24em] lg:pb-2">
              You see the scope, timeline and price in writing before any work starts, and a report every month after.
            </Lead>
          </div>
          <div data-line="foot" className="mt-[clamp(48px,7vh,80px)]">
            <Phases phases={PROCESS} label="How we work" />
          </div>
        </div>
      </Room>

      <Room tone="creme" room="b-principles" labelledBy="principles-title">
        <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,88px)] lg:grid-cols-[.8fr_1.4fr]">
          <div className="grid content-start gap-6 lg:sticky lg:top-28">
            <Heading data-line="in" id="principles-title" size="h2">
              How we work<br /><Accent touch="check">with you.</Accent>
            </Heading>
            <Lead>Six things that hold for every project, whatever its size.</Lead>
            <aside data-reveal="" className="grid gap-2 rounded-[20px] border border-strike/25 bg-ice p-6">
              <p className="font-display text-[22px] leading-tight font-bold text-strike">Founding clients</p>
              <p className="text-[15.5px] text-ink-60">{FOUNDING}</p>
            </aside>
          </div>
          <ul data-line="foot" className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {PRINCIPLES.map(([k, v]) => (
              <li key={k} data-reveal="" className="grid content-start gap-2 border-t border-hairline py-6">
                <b className="font-display text-[22px] leading-tight font-bold">{k}</b>
                <p className="text-[16px] text-ink-60">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </Room>

      <Room tone="abyss" room="b-engage" id="start" labelledBy="engage-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="engage-title" size="h1">
              Three ways<br /><Accent>to start.</Accent>
            </Heading>
            <Lead className="lg:max-w-[25em] lg:pb-2">
              Every option starts with a free call and a written blueprint with a fixed price, so you know the cost before you commit to anything.
            </Lead>
          </div>
          <ol data-line="foot" className="mt-[clamp(40px,6vh,64px)] grid grid-cols-1 gap-5 lg:grid-cols-3">
            {ENGAGE.map((e, i) => (
              <li key={e.name} data-reveal="" className={i === 1 ? 'plan plan--mid' : 'plan'}>
                <p className="font-display text-[clamp(34px,3.2vw,46px)] leading-none font-bold tracking-[-0.02em]">{e.name}</p>
                <p className="mt-4 text-[16.5px] text-white">{e.line}</p>
                <dl className="mt-5 mb-6 grid gap-3 border-t border-rule-dark pt-4 text-[15px]">
                  <div><dt className="font-semibold text-white">A good fit for</dt><dd className="text-fog">{e.fits}</dd></div>
                  <div><dt className="font-semibold text-white">Priced by</dt><dd className="text-fog">{e.priced}</dd></div>
                </dl>
                <a href="#contact" data-plan={e.name} className={btn(i === 1 ? 'paper' : 'strike', 'md', 'mt-auto self-start')}>
                  {e.cta}
                  <Arrow />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Room>

      <Room tone="deep" room="b-faq" id="faq" labelledBy="b-faq-title">
        <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[.8fr_1.4fr]">
          <Heading data-line="in" id="b-faq-title" size="h2">
            Questions, <Accent>answered.</Accent>
          </Heading>
          <div data-line="foot" className="faq border-t border-hairline">
            {BUSINESS_FAQ.map(([q, ans]) => (
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
        kind="business"
        body="Tell us a little about the business and we’ll reply by email to find a time. On the call we’ll look at how things run today, then send a written blueprint with scope, timeline and a fixed price."
        steps={[
          ['A free call', 'How the business runs today, and what’s slowing it down.'],
          ['A written blueprint', 'Scope, timeline and a fixed price, before any work starts.'],
          ['Your decision', 'Start with one service, all five, or none at all.'],
        ]}
      />
    </main>
  );
}
