import type { Metadata } from 'next';
import Link from 'next/link';
import { share } from '@/lib/share';
import { Room } from '@/components/site/Room';
import { Stepper } from '@/components/pillar/Stepper';
import { Approve } from '@/components/creators/Approve';
import { Deals } from '@/components/creators/Deals';
import { Hub } from '@/components/creators/Hub';
import { Rhythm } from '@/components/creators/Rhythm';
import { Zones } from '@/components/creators/Zones';
import { Asset } from '@/components/ui/Asset';
import { Arrow, btn } from '@/components/ui/buttons';
import { Heading, Lead, Accent } from '@/components/ui/type';
import { CREATOR_FAQ, CREATOR_STEPS, CREATORS_META, PIPELINE, PLANS } from '@/content/creators';

const { title, description } = CREATORS_META;
export const metadata: Metadata = { title, description, ...share(title, description) };

/** Sharkprint for creators: the same team and tools, sold to independent streamers.
 *  Hero (streams in, a week of posts out) → the clip pipeline and the approval queue →
 *  everything else in one hub → the schedule seen from anywhere → brand deals → how it
 *  starts → three ways in → questions, and the door to Studio for creators in an org.
 *  Never two dark rooms in a row. */
export default function CreatorsPage() {
  return (
    <main id="main">
      <Room tone="creme" room="c-hero" id="creators" labelledBy="creators-title" pad={false} className="pt-[124px] pb-[72px] md:pt-[150px] md:pb-[clamp(88px,12vh,150px)]">
        <div className="wrap">
          <div className="grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-16">
            <Heading data-line="in" as="h1" id="creators-title" size="h1">
              Stream once.<br /><Accent touch="live">Post all week.</Accent>
            </Heading>
            <div className="grid gap-7 lg:pb-3">
              <Lead>
                <b className="font-semibold text-ink">Sharkprint for creators</b> turns your streams into Shorts, Reels and TikToks, and keeps your schedule, brand deals and numbers in one place. You stay consistent without editing all night.
              </Lead>
              <p data-reveal="" className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="#how" className={btn('ink', 'lg')}>
                  See how it starts
                  <Arrow dir="down" />
                </a>
                <Link href="/studio" className="group inline-flex items-center gap-2 text-[15.5px] font-semibold text-strike no-underline">
                  Run an org? See Studio
                  <Arrow />
                </Link>
              </p>
            </div>
          </div>
          <div data-line="foot" className="mt-[clamp(40px,6vh,72px)]">
            <Rhythm />
          </div>
        </div>
      </Room>

      <Room tone="abyss" room="c-pipeline" labelledBy="pipeline-title" className="overflow-hidden">
        <div className="wrap">
          <div className="grid gap-6">
            <Heading data-line="in" id="pipeline-title" size="h1">
              Your best moments,<br /><Accent touch="clip">never buried.</Accent>
            </Heading>
            <Lead>
              Hours of stream hide the seconds people share. Software flags them, editors who know your game cut them for every feed, and you approve each one from your phone before it posts.
            </Lead>
          </div>
          <div className="mt-[clamp(40px,6vh,72px)] grid grid-cols-1 items-center gap-[clamp(48px,6vw,96px)] lg:grid-cols-[1.2fr_.8fr]">
            <ol data-line="foot" className="border-t border-rule-dark">
              {PIPELINE.map(([k, v], i) => (
                <li key={k} data-reveal="" className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-2 border-b border-rule-dark py-4 sm:grid-cols-[44px_150px_minmax(0,1fr)]">
                  <span className="font-display text-[18px] font-bold text-mist">{String(i + 1).padStart(2, '0')}</span>
                  <b className="font-display text-[20px] leading-tight font-bold text-white">{k}</b>
                  <span className="text-[15.5px] text-fog max-sm:col-start-2 max-sm:mt-1">{v}</span>
                </li>
              ))}
            </ol>
            <Approve />
          </div>
        </div>
      </Room>

      <Room tone="creme" room="c-hub" labelledBy="hub-title">
        <div className="wrap">
          <div className="grid gap-6">
            <Heading data-line="in" id="hub-title" size="h1">
              The rest of the job,<br /><Accent touch="check">handled.</Accent>
            </Heading>
            <Lead>
              Streaming is the part you love. Here’s everything around it we take off your plate, in one hub you can open on your phone.
            </Lead>
          </div>
          <div data-line="foot" className="mt-[clamp(40px,6vh,64px)]">
            <Hub />
          </div>
        </div>
      </Room>

      <Room tone="trench" room="c-schedule" labelledBy="schedule-title" className="overflow-hidden">
        <div className="wrap grid grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[1fr_minmax(0,500px)]">
          <div className="grid content-start gap-6">
            <Heading data-line="in" id="schedule-title" size="h1">
              On time, in<br /><Accent touch="week">every timezone.</Accent>
            </Heading>
            <Lead>
              One schedule, kept for you on Twitch, YouTube, Kick, your page and your Discord. Go-live posts fire the moment you start, and fans see your times in their own.
            </Lead>
            <ul data-line="foot" className="mt-2 grid gap-x-7 gap-y-5 sm:grid-cols-2">
              {[
                ['Changed your plans?', 'Tell us once. Every platform and your page update together.'],
                ['Going live early?', 'The alert goes out when you actually start, not when you planned to.'],
              ].map(([k, v]) => (
                <li key={k} data-reveal="" className="grid gap-1 border-t border-rule-dark pt-3.5">
                  <strong className="font-display text-[18px] font-semibold text-white">{k}</strong>
                  <span className="text-[15px] text-fog">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <Zones />
        </div>
      </Room>

      <Room tone="deep" room="c-deals" labelledBy="deals-title">
        <div className="wrap">
          <div className="grid grid-cols-1 items-center gap-[clamp(40px,5vw,88px)] lg:grid-cols-[.95fr_1.05fr]">
            <div className="grid content-start gap-6">
              <Heading data-line="in" id="deals-title" size="h1">
                Brands find<br />you <Accent touch="pick">ready.</Accent>
              </Heading>
              <Lead>
                A media kit that keeps its own numbers current, a rate card you set, and every deal tracked from brief to payout, so nothing is promised twice or paid late.
              </Lead>
            </div>
            <Asset src="studio/media-kit.svg" label="A creator media kit: platform numbers, audience age and regions, and past partners" className="overflow-hidden rounded-[24px] shadow-[0_40px_80px_-52px_rgba(7,18,43,.55)]" />
          </div>
          <div data-line="foot" className="mt-[clamp(40px,6vh,72px)]">
            <Deals />
            <p className="mt-4 text-[13px] text-muted">Creators, brands and numbers shown are fictional examples.</p>
          </div>
        </div>
      </Room>

      <Room tone="creme" room="c-how" id="how" labelledBy="how-title">
        <div className="wrap">
          <Heading data-line="in" id="how-title" size="h2">
            Plug in once,<br /><Accent touch="route">then just stream.</Accent>
          </Heading>
          <div data-line="foot">
            <Stepper steps={CREATOR_STEPS} label="How it starts" />
          </div>
        </div>
      </Room>

      <Room tone="abyss" room="c-plans" labelledBy="plans-title">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Heading data-line="in" id="plans-title" size="h1">
              Clips first.<br /><Accent>The rest later.</Accent>
            </Heading>
            <Lead className="lg:max-w-[24em] lg:pb-2">
              Three ways in, each priced on how much you stream and how often you post.
            </Lead>
          </div>
          <ol data-line="foot" className="mt-[clamp(40px,6vh,64px)] grid grid-cols-1 gap-5 lg:grid-cols-3">
            {PLANS.map((p, i) => (
              <li key={p.name} data-reveal="" className={i === 1 ? 'plan plan--mid' : 'plan'}>
                <p className="font-display text-[clamp(34px,3.2vw,46px)] leading-none font-bold tracking-[-0.02em]">{p.name}</p>
                <p className="mt-2 text-[16px] text-fog">{p.for}</p>
                {p.lead && <p className="mt-6 text-[14px] font-semibold text-mist">{p.lead}</p>}
                <ul className={p.lead ? 'mt-2' : 'mt-6'}>
                  {p.items.map((t) => (
                    <li key={t} className="flex gap-3 border-t border-rule-dark py-3 text-[15.5px] text-white">
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 size-4 flex-none text-mist"><path d="M3 8.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Room>

      <Room tone="deep" room="c-faq" labelledBy="c-faq-title">
        <div className="wrap grid grid-cols-1 items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[.8fr_1.4fr]">
          <div className="grid content-start gap-8">
            <Heading data-line="in" id="c-faq-title" size="h2">
              Questions, <Accent>answered.</Accent>
            </Heading>
            <aside data-reveal="" className="grid gap-3 rounded-[22px] bg-ink p-7 text-white">
              <p className="font-display text-[24px] leading-tight font-bold">Signed to an org?</p>
              <p className="text-[15.5px] text-fog">Orgs that run Sharkprint Studio can offer all of this to the creators they sign, under the org’s name. Ask yours, or send them this.</p>
              <Link href="/studio" className="group mt-2 inline-flex items-center gap-2 justify-self-start text-[15.5px] font-semibold text-mist no-underline">
                How Studio works
                <Arrow />
              </Link>
            </aside>
          </div>
          <div data-line="foot" className="faq border-t border-hairline">
            {CREATOR_FAQ.map(([q, ans]) => (
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
    </main>
  );
}
