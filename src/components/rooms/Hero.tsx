'use client';

import { useRef } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { Arrow } from '@/components/ui/buttons';
import { gsap, useGSAP } from '@/lib/gsap';
import { onIntro } from '@/lib/intro';

// The dock: the four pillars side by side, each with one real output rising out of it,
// and each a way into its room.
const DOCK = [
  { id: 'engine', n: '01', name: 'Engine', kind: 'Clips & content', src: 'engine/clip-tactical.svg', label: 'Engine: a clutch clip, cut for Shorts' },
  { id: 'intel', n: '02', name: 'Intel', kind: 'Prep & scouting', src: 'intel/scouting-report.svg', label: 'Intel: a scouting report' },
  { id: 'command', n: '03', name: 'Command', kind: 'Live dashboard', src: 'command/widget-winrate.svg', label: 'Command: the win-rate widget' },
  { id: 'forge', n: '04', name: 'Forge', kind: 'Sites & tools', src: 'forge/brand-site.svg', label: 'Forge: a brand website' },
];

/** A word whose letters rise out of its own baseline. */
function Word({ children }: { children: string }) {
  return (
    <span className="hx-word">
      {children.split('').map((c, i) => <span key={i} data-char="" className="will-change-transform">{c}</span>)}
    </span>
  );
}

/** 01 Hero: the line, set big and condensed, and the four pillars docked along the bottom
 *  edge of the screen, each with its real output rising out of it. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const room = root.current!;
    const q = gsap.utils.selector(room);
    const chars = q('[data-char]');
    const tiles = q('[data-tile]');
    const rest = q('[data-rest]');
    const mark = q('[data-mark]')[0];
    gsap.set(chars, { yPercent: 118 });
    gsap.set(tiles, { yPercent: 70 });
    gsap.set(rest, { opacity: 0, y: 26 });

    // As the hero scrolls away, each output climbs a little further out of its tile.
    q('[data-art]').forEach((el, i) => gsap.to(el, {
      y: -40 - (i % 2) * 24, ease: 'none',
      scrollTrigger: { trigger: room, start: 'top top', end: 'bottom top', scrub: true },
    }));

    // Picks up from the preloader: the letters rise out of their baselines, then the dock
    // slides up from the bottom edge, one tile after another.
    // (The preloader may start this outside the GSAP context, so it's killed by hand on cleanup.)
    let intro: gsap.core.Timeline | undefined;
    const off = onIntro(() => {
      intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(chars, { yPercent: 0, duration: 1.25, stagger: 0.028 }, 0.05)
        // ENGINEERED. gets its drafting marks once its letters have landed.
        .call(() => mark.setAttribute('data-on', 'true'), undefined, 0.95)
        .to(rest, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.5)
        .to(tiles, { yPercent: 0, duration: 1.5, stagger: 0.09 }, 0.6);
    });
    return () => {
      off();
      intro?.kill();
    };
  }, { scope: root });

  return (
    <Room
      ref={root}
      tone="creme"
      room="hero"
      id="top"
      pad={false}
      labelledBy="hero-title"
      className="flex min-h-svh flex-col overflow-hidden pt-[104px] md:pt-[112px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute top-[30%] left-1/2 z-0 size-[min(1300px,130vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFFFFF_0%,rgba(251,249,243,.7)_35%,transparent_68%)]" />
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0 z-0" />

      <div className="wrap flex flex-1 flex-col">
        <div className="hx">
          <h1 id="hero-title" className="hx-title">
            <span className="sr-only">Your org&apos;s edge, engineered.</span>
            <span aria-hidden="true" className="hx-l1">
              <Word>YOUR</Word> <Word>ORG&apos;S</Word><br className="md:hidden" /> <Word>EDGE,</Word>
            </span>
            <span aria-hidden="true" className="hx-l2">
              <span data-mark="" className="hx-mark">
                <Word>ENGINEERED.</Word>
                <span className="hx-corners" />
                <span className="hx-dim" />
              </span>
            </span>
          </h1>

          <p data-rest="" className="hx-lead">
            We turn your streams into clips, your stats into signings and your name into a brand people follow, so your org plays above its weight.
          </p>
          {/* The Lateral Line is born under the button. */}
          <div data-rest="" data-line="foot" className="hx-cta-row">
            <a href="#engine" className="hx-cta">
              See the stack
              <span aria-hidden="true" className="hx-cta__ring"><Arrow dir="down" className="size-[18px]" /></span>
            </a>
          </div>

          <nav aria-label="The four pillars" className="hx-dock">
            {DOCK.map((d) => (
              <a key={d.id} href={'#' + d.id} data-tile="" className={`hx-tile hx-tile--${d.id}`}>
                <span className="hx-tile-head">
                  <span>
                    <span className="hx-tile-name">{d.name}</span>
                    <span className="hx-tile-kind">{d.kind}</span>
                  </span>
                  <span className="hx-tile-n">{d.n}</span>
                </span>
                <span aria-hidden="true" className="hx-tile-go"><Arrow dir="down" className="size-[14px]" /></span>
                <span data-art="" className="hx-tile-art">
                  <Asset src={d.src} eager label={d.label} />
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </Room>
  );
}
