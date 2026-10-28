'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { ForgeStack } from '@/components/flows/ForgeStack';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { clamp } from '@/lib/env';
import { getLenis } from '@/lib/scroll';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

const PROJECTS = [
  { slug: 'brand-site', title: 'Brand website', line: "The org's home: rosters, matches, partners, shop." },
  { slug: 'tournament', title: 'Tournament platform', line: 'Registration, brackets, results, admin.' },
  { slug: 'merch-store', title: 'Merch store', line: 'Drops, sizes, checkout, inventory.' },
  { slug: 'microsite', title: 'Campaign microsite', line: 'Season launches, player reveals, sponsor activations.' },
  { slug: 'web-app', title: 'Internal web app', line: 'Scrim schedulers, VOD queues, payouts — staff tools.' },
];
const N = PROJECTS.length;
const ARRIVE = [-0.22, 0.13]; // when, within its turn, a card slides in…
const SCAN = [0.18, 0.7]; // …and scans from blueprint to live, before the next one comes

type Props = { headingLevel?: 'h1' | 'h2' };

/** Paint how far a card has turned from blueprint into the live site (0–100). */
function setLive(card: Element, live: number) {
  const wipe = card.querySelector<HTMLElement>('[data-wipe]')!;
  wipe.style.setProperty('--live', live + '%');
  wipe.style.setProperty('--scan', live > 0.5 && live < 99.5 ? '1' : '0');
}

/** 06 Forge (concept pp.19–20): the five things we build arrive one by one as you scroll,
 *  each stacking over the last, and a scan line turns its blueprint into the finished
 *  site — the "print" in Sharkprint, made literal. Then the stack: one base under every surface. */
export function ForgeRoom({ headingLevel = 'h2' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const cards = q('[data-card]');
    const mm = gsap.matchMedia();

    // Desktop: pin the room; each card takes one "turn" of the timeline.
    mm.add('(min-width: 768px)', () => {
      const [stage] = q('[data-stage]');
      const [deck] = q('[data-deck]');
      // Waiting cards sit just below the stage, out of sight.
      const below = () => stage.getBoundingClientRect().bottom - deck.getBoundingClientRect().top + 24;
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const live = cards.map(() => ({ v: 0 }));
      const span = ARRIVE[1] - ARRIVE[0];
      cards.forEach((card, i) => {
        if (i > 0) {
          tl.fromTo(card, { y: below, rotation: 1.5 }, { y: 0, rotation: 0, duration: span, ease: 'power3.out' }, i + ARRIVE[0]);
          // Everything underneath steps back into the deck and dims (a shade, not opacity,
          // so nothing ghosts through); three deep, it's gone.
          for (let j = 0; j < i; j++) {
            const depth = i - j;
            tl.to(cards[j], { scale: 1 - depth * 0.05, yPercent: -depth * 5.5, autoAlpha: depth > 2 ? 0 : 1, duration: span, ease: 'power3.out' }, i + ARRIVE[0])
              .to(cards[j].querySelector('[data-shade]'), { opacity: Math.min(depth * 0.32, 0.64), duration: span, ease: 'power3.out' }, i + ARRIVE[0]);
          }
        }
        tl.to(live[i], { v: 100, duration: SCAN[1] - SCAN[0], ease: 'power1.inOut', onUpdate: () => setLive(card, live[i].v) }, i + SCAN[0]);
      });
      tl.to({}, { duration: 0.35 }); // a beat on the last card before the room lets go

      trigger.current = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: () => '+=' + innerHeight * 0.62 * N,
        pin: true,
        scrub: 0.5,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const t = self.progress * tl.duration();
          const i = clamp(Math.floor(t + 0.1), 0, N - 1);
          const scanned = clamp((t - i - SCAN[0]) / (SCAN[1] - SCAN[0]), 0, 1);
          setActive(i);
          // Each list item's hairline fills as its card scans (painted directly, not via React).
          bars.current.forEach((bar, j) => {
            if (!bar) return;
            bar.style.width = (j < i ? 100 : j === i ? scanned * 100 : 0) + '%';
            bar.style.opacity = j < i ? '.35' : '1';
          });
          if (self.progress > 0.95) trackOnce('forge-deck', { type: 'forge_scroll', room: 'forge' });
        },
      });
      return () => {
        trigger.current = null;
        cards.forEach((c) => setLive(c, 0));
      };
    });

    // Phones: no pin; each card scans as it passes through the viewport.
    mm.add('(max-width: 767px)', () => {
      cards.forEach((card) => {
        const s = { v: 0 };
        gsap.to(s, {
          v: 100, ease: 'none', onUpdate: () => setLive(card, s.v),
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'center 45%', scrub: 0.4 },
        });
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  // The list jumps to a card's finished state.
  const jump = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const anim = st.animation!;
    const y = st.start + (st.end - st.start) * ((i + SCAN[1] + 0.03) / anim.duration());
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const H = headingLevel;
  return (
    <Room ref={ref} tone="trench" room="forge" id="forge" pad={false} labelledBy="forge-title" className="overflow-hidden">
      {/* The blueprint grid as a quiet ground: low contrast, fading out toward the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[url(/assets/texture/blueprint-grid.svg)] bg-[length:640px_640px] opacity-[.16] [mask-image:radial-gradient(ellipse_70%_65%_at_62%_50%,#000_20%,transparent_100%)]"
      />
      <div data-stage="" className="relative flex min-h-svh items-center py-[88px] md:h-svh md:py-0">
        <div className="wrap grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] md:gap-[clamp(32px,4vw,72px)] md:pt-16">
          <div className="grid content-center gap-6">
            <Eyebrow>Forge</Eyebrow>
            <Heading as={H} id="forge-title" size="h1">
              Built to carry<br /><Accent touch="forge">your name.</Accent>
            </Heading>
            <Lead>The website that carries your brand, and the tools that run your org.</Lead>

            <ol aria-label="Five things we build" className="mt-2 hidden border-t border-rule-dark md:block">
              {PROJECTS.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.slug}>
                    <button
                      type="button"
                      onClick={() => jump(i)}
                      aria-current={on ? 'step' : undefined}
                      className={cn('group relative grid w-full grid-cols-[36px_1fr] items-baseline gap-x-3 border-b border-rule-dark py-3.5 text-left transition-colors duration-500', on ? 'text-white' : 'text-fog/55 hover:text-fog')}
                    >
                      <span className={cn('label transition-colors duration-500', on ? 'text-mist' : '')}>0{i + 1}</span>
                      <span className="font-display text-[18px] leading-tight font-semibold tracking-[-0.01em]">{p.title}</span>
                      <span className={cn('col-start-2 overflow-hidden text-[14px] text-fog transition-[max-height,opacity] duration-500 ease-out-expo', on ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0')}>
                        {p.line}
                      </span>
                      <span ref={(el) => { bars.current[i] = el; }} aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-0 bg-mist" />
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="[container-type:inline-size]">
            <div data-deck="" className="relative grid gap-6 md:block md:h-[calc(63.33cqw+66px)]">
              {PROJECTS.map((p, i) => (
                <article
                  key={p.slug}
                  data-card=""
                  aria-label={`${i + 1} of ${N}: ${p.title}`}
                  className="relative overflow-hidden rounded-[18px] border border-mist/20 bg-abyss shadow-[0_50px_90px_-50px_rgba(0,0,0,.9)] will-change-transform md:absolute md:inset-0 md:origin-top"
                  style={{ zIndex: i + 1 } as CSSProperties}
                >
                  <div data-wipe="" className="wipe relative aspect-[1200/760] overflow-hidden">
                    <Asset src={`forge/${p.slug}-blueprint.svg`} label={`${p.title}, blueprint`} className="absolute inset-0" />
                    <Asset src={`forge/${p.slug}.svg`} label={`${p.title}, finished`} className="wipe__live absolute inset-0" />
                    <span aria-hidden="true" className="wipe__scan absolute inset-y-0 w-0.5 bg-paper" />
                    <span aria-hidden="true" className="wipe__tag label absolute top-3 rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold text-ink">
                      Blueprint → Live
                    </span>
                  </div>
                  <footer className="flex h-[66px] items-center justify-between gap-4 border-t border-mist/15 px-[22px]">
                    <h3 className="font-display text-[19px] font-bold tracking-[-0.01em]">{p.title}</h3>
                    <p className="hidden text-[14px] text-fog sm:block">{p.line}</p>
                  </footer>
                  <span data-shade="" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-abyss opacity-0" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Under the pinned stage: it scrolls in once the last card is built. The Lateral
          Line leaves the room from under it. */}
      <div className="wrap pb-[clamp(88px,12vh,150px)] md:pt-4">
        <ForgeStack />
      </div>
    </Room>
  );
}
