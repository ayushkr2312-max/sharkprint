'use client';

import { Fragment, useRef } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { iconBtn } from '@/components/ui/buttons';
import { SHARK } from '@/components/ui/Icon';
import { Heading, Lead, Accent } from '@/components/ui/type';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { svgPoint } from '@/lib/env';
import { getLenis, lockScroll } from '@/lib/scroll';
import { cn } from '@/lib/cn';
import { track } from '@/lib/track';

const NS = 'http://www.w3.org/2000/svg';

// The statement you read your way through, word by word. `true` marks the serif phrases.
const STATEMENT: [string, boolean?][] = [
  ['Four pillars on'],
  ['one automation core.', true],
  ['Everything else'],
  ['your org needs'],
  ['moves in orbit around it.', true],
];

// Each service: its name, what it touches, its satellites in the orbit, and what you get.
const ROWS: [string, string, string[], string][] = [
  ['Discord bots', 'Community', ['Discord bots'], 'Match alerts, roles, tickets and stats in your server.'],
  ['Sponsor sourcing & pitch decks', 'Revenue', ['Sponsor sourcing', 'Pitch decks'], 'Brands that fit your fans, pitched with your own numbers.'],
  ['Spend reports & cost audits', 'Money out', ['Cost audits', 'Growth tracking'], 'Where the money goes each month, and what to cut.'],
  ['Merch store setup', 'Revenue', ['Merch setup'], 'A store ready for your first drop, linked to your site.'],
  ['Market & competitor intel', 'Data', ['Market intel'], 'What rival orgs post, sign and launch, read every month.'],
];

// Which pillar each satellite pairs with, and where the pillars sit in orbit-services.svg.
const PAIRS: Record<string, keyof typeof PILLAR_AT> = {
  'Discord bots': 'forge', 'Merch setup': 'forge', 'Tournament ops': 'forge', 'Backends & APIs': 'forge',
  'Sponsor sourcing': 'command', 'Cost audits': 'command', 'Growth tracking': 'command', 'Org reports': 'command',
  'Pitch decks': 'intel', 'Market intel': 'intel', 'Auto-captions': 'engine', 'Content scouting': 'engine',
};
const PILLAR_AT = { engine: [556, 344], intel: [556, 556], command: [344, 556], forge: [344, 344] } as const;

const LANDING: [string, string][] = [
  ['Engine', 'Auto + manual clipping, subtitles, auto posts & captions, trend scouting'],
  ['Intel', 'Player, team & staff scouting, opponent analytics, market intel'],
  ['Command', 'Org reports & databases, dashboards, growth tracking'],
  ['Forge', 'Backends, websites, tournament platforms, merch'],
  ['Orbit', 'Discord bots, sponsor sourcing, pitch decks, spend reports'],
];

// Desktop timeline, in viewport heights of scroll: read → the orbit swings face-on → the list.
const TURN = 1.75; // when the statement clears and the orbit starts turning toward you
const LIST_IN = 2.15; // when the list arrives
const HOLD = 0.25; // a beat with everything in place before the room lets go

/** 07 Orbit (concept p.21): first you read it — the statement lights up word by word
 *  while the orbit lies edge-on beneath it, like a ring seen from the side. Then the
 *  words clear and the orbit swings up to face you: the services orbiting the four
 *  pillars around one automation core. The ring turns once every 120s; hover pauses it. */
export function Orbit() {
  const ref = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const highlight = useRef<(names: string[]) => void>(() => {});
  const spin = useRef<gsap.core.Timeline | null>(null);
  const sheet = useRef<HTMLDialogElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const words = q('[data-word]');
    const [stage] = q('[data-orbit-stage]');
    const [statement] = q('[data-orbit-statement]');
    const [copy] = q('[data-orbit-copy]');
    const [cell] = q('[data-orbit-cell]');
    const [move] = q('[data-orbit-move]');
    const [tilt] = q('[data-orbit-tilt]');
    const items = q('[data-orbit-in]');
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // Where the ring starts: centred beneath the statement, low in the stage. Measured
      // from untransformed boxes, so it holds whatever the timeline is doing.
      const offset = () => {
        const s = stage.getBoundingClientRect(), c = cell.getBoundingClientRect();
        return { x: s.left + s.width / 2 - (c.left + c.width / 2), y: s.top + s.height * 0.9 - (c.top + c.height / 2) };
      };
      const low = { x: () => offset().x, y: () => offset().y, scale: 1.16 };

      const tl = gsap.timeline({ defaults: { ease: 'none' } })
        // Reading: the orbit rises into view edge-on and starts to lean toward you.
        .fromTo(move, { ...low, y: () => offset().y + 90, opacity: 0 }, { ...low, opacity: 0.6, duration: 0.95, ease: 'power1.out' }, 0)
        .fromTo(tilt, { rotationX: 84 }, { rotationX: 74, duration: TURN }, 0)
        // The turn: the words clear, the orbit swings face-on into its place.
        .fromTo(statement, { yPercent: 0, opacity: 1 }, { yPercent: -16, opacity: 0, duration: 0.3, ease: 'power1.in', immediateRender: false }, TURN)
        .fromTo(move, { ...low, opacity: 0.6 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power2.inOut', immediateRender: false }, TURN + 0.08)
        .fromTo(tilt, { rotationX: 74 }, { rotationX: 0, duration: 0.75, ease: 'power2.inOut', immediateRender: false }, TURN + 0.08)
        .fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, LIST_IN)
        .to({}, { duration: HOLD });
      const settled = tl.duration() - HOLD;

      // Nothing to hover or click until it is there to see.
      const interactive = (on: boolean) => {
        copy.style.pointerEvents = on ? '' : 'none';
        move.style.pointerEvents = on ? '' : 'none';
      };
      interactive(false);

      trigger.current = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: () => '+=' + innerHeight * tl.duration(),
        pin: true,
        scrub: 0.5,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => interactive(self.progress * tl.duration() > settled - 0.3),
      });

      // The words light up from just before the room pins until the reading part is done.
      gsap.fromTo(words, { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 62%', end: () => '+=' + innerHeight * (0.62 + TURN - 0.2), scrub: 0.4 },
      });
      return () => {
        trigger.current = null;
        interactive(true);
      };
    });

    // Below 1024px: no pin. The statement reads in as it scrolls through, and the orbit
    // tilts up to face you as it arrives.
    mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(words, { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: statement, start: 'top 78%', end: 'bottom 42%', scrub: 0.4 },
      });
      gsap.fromTo(tilt, { rotationX: 58, opacity: 0.35 }, {
        rotationX: 0, opacity: 1, ease: 'power1.out',
        scrollTrigger: { trigger: cell, start: 'top 95%', end: 'center 55%', scrub: 0.5 },
      });
      gsap.fromTo(items, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out',
        scrollTrigger: { trigger: copy, start: 'top 85%', once: true },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  // Tabbing into the list while it is still on its way in skips ahead to where it is shown.
  const showList = () => {
    const st = trigger.current;
    if (!st) return;
    const total = st.animation!.duration(), settled = (total - HOLD) / total;
    if (st.progress >= settled) return;
    const y = st.start + (st.end - st.start) * settled;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  };

  const onOrbit = (svg: SVGSVGElement) => {
    // The core carries the Finishers mark, white on the deep blue.
    svg.querySelectorAll('text').forEach((t) => { if (/^(AUTOMATION|CORE)$/.test(t.textContent!.trim())) t.remove(); });
    const core = Array.from(svg.querySelectorAll('circle')).find((c) => c.getAttribute('r') === '96' && c.getAttribute('fill') === 'none');
    const mark = document.createElementNS(NS, 'g');
    mark.setAttribute('transform', 'translate(382 409) scale(.068)');
    mark.innerHTML = `<path fill="#fff" d="${SHARK.body}"/><path fill="#fff" d="${SHARK.dot}"/>`;
    core?.after(mark);
    // The pillars' names, a little larger.
    svg.querySelectorAll('text').forEach((t) => { if (t.getAttribute('font-size') === '10') t.setAttribute('font-size', '12'); });

    const lines = document.createElementNS(NS, 'g');
    const rings = Array.from(svg.querySelectorAll('circle')).filter((c) => c.getAttribute('cx') === '450' && c.getAttribute('fill') === 'none');
    rings[rings.length - 1].after(lines);

    const ring = document.createElementNS(NS, 'g');
    svg.querySelectorAll('rect[rx="18"]').forEach((r) => {
      const dot = r.nextElementSibling!, text = dot.nextElementSibling as SVGTextElement;
      // Bigger labels: the pill grows around its own centre to fit them.
      const cx = +r.getAttribute('x')! + +r.getAttribute('width')! / 2, cy = +r.getAttribute('y')! + 18;
      text.setAttribute('font-size', '18');
      const w = text.getComputedTextLength() + 48, x = cx - w / 2;
      Object.entries({ x, y: cy - 22, width: w, height: 44, rx: 22 }).forEach(([k, v]) => r.setAttribute(k, v.toFixed(1)));
      Object.entries({ cx: x + 19, cy, r: 5 }).forEach(([k, v]) => dot.setAttribute(k, v.toFixed(1)));
      text.setAttribute('x', (x + 32).toFixed(1));
      text.setAttribute('y', (cy + 6).toFixed(1));
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'sat');
      g.dataset.name = text.textContent!.trim();
      g.append(r, dot, text);
      ring.appendChild(g);
    });
    svg.appendChild(ring);
    const sats = Array.from(ring.querySelectorAll<SVGGElement>('.sat'));

    highlight.current = (names) => {
      lines.replaceChildren();
      sats.forEach((s) => {
        const on = names.includes(s.dataset.name!);
        s.classList.toggle('is-on', on);
        if (!on) return;
        const r = s.getBoundingClientRect();
        const a = svgPoint(svg, r.left + r.width / 2, r.top + r.height / 2);
        const b = PILLAR_AT[PAIRS[s.dataset.name!]];
        if (!a || !b) return;
        const l = document.createElementNS(NS, 'line');
        l.setAttribute('class', 'pair-line');
        l.setAttribute('x1', a.x.toFixed(1)); l.setAttribute('y1', a.y.toFixed(1));
        l.setAttribute('x2', String(b[0])); l.setAttribute('y2', String(b[1]));
        lines.appendChild(l);
      });
    };
    const enter = (e: Event) => highlight.current([(e.currentTarget as SVGGElement).dataset.name!]);
    const leave = () => highlight.current([]);
    sats.forEach((s) => { s.addEventListener('pointerenter', enter); s.addEventListener('pointerleave', leave); });

    spin.current = gsap.timeline({ repeat: -1 })
      .to(ring, { rotation: 360, svgOrigin: '450 450', duration: 120, ease: 'none' }, 0)
      .to(sats, { rotation: -360, transformOrigin: '50% 50%', duration: 120, ease: 'none' }, 0);
    return () => {
      spin.current?.kill();
      spin.current = null;
      highlight.current = () => {};
    };
  };

  const openSheet = () => {
    const d = sheet.current!;
    d.showModal();
    lockScroll(true);
    gsap.fromTo(d, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(d.firstElementChild, { yPercent: 30 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' });
    track('demo_interact', { type: 'core_open' });
  };

  return (
    <Room ref={ref} tone="creme" room="orbit" id="orbit" pad={false} labelledBy="orbit-title" className="overflow-hidden">
      <div data-orbit-stage="" className="relative py-[72px] md:py-[clamp(88px,12vh,150px)] lg:h-svh lg:py-0">
        <div data-orbit-statement="" className="wrap pointer-events-none lg:absolute lg:inset-x-0 lg:top-[max(104px,13vh)] lg:z-[3]">
          <p data-line="in" className="orbit-say font-display text-[clamp(44px,6vw,104px)] leading-[.98] font-bold tracking-[-0.03em]">
            {STATEMENT.map(([text, em], s) => {
              const words = text.split(' ').map((w, i) => (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <span data-word="" className="[html[data-js]_&]:opacity-[.14]">{w}</span>
                </Fragment>
              ));
              // One phrase per line, the accents tucked in tight; the second half steps across.
              return (
                <span key={s} className={cn('block', em && 'my-[.1em] pl-[.5em] leading-[.7] max-sm:pl-0', s >= 2 && 'lg:ml-[26%]')}>
                  {em ? <Accent className="text-[1.08em]">{words}</Accent> : words}
                  {s < STATEMENT.length - 1 && ' '}
                </span>
              );
            })}
          </p>
        </div>

        <div className="wrap grid grid-cols-1 items-center gap-12 pt-16 lg:h-full lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-[clamp(32px,5vw,88px)]">
          <div data-orbit-copy="" data-line="foot" className="grid content-start gap-6 [@media(min-width:1024px)_and_(max-height:800px)]:gap-4" onFocusCapture={showList}>
            <Heading data-orbit-in="" id="orbit-title" size="h2" reveal={false}>
              Everything else, <Accent touch="orbit">in orbit.</Accent>
            </Heading>
            <Lead data-orbit-in="" reveal={false}>
              The jobs between the pillars, done by the same team.
            </Lead>
            <ul>
              {ROWS.map(([title, tag, sats, line]) => {
                const on = () => { spin.current?.pause(); highlight.current(sats); };
                const off = () => { spin.current?.play(); highlight.current([]); };
                return (
                  <li key={title} data-orbit-in="" className="relative border-hairline first:border-t">
                    <button
                      type="button"
                      onPointerEnter={on}
                      onPointerLeave={off}
                      onFocus={on}
                      onBlur={off}
                      className="group relative grid min-h-12 w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-hairline py-3 text-left [@media(min-width:1024px)_and_(max-height:800px)]:py-2"
                    >
                      <span className="text-[17px] font-semibold transition-colors duration-300 group-hover:text-strike group-focus-visible:text-strike">{title}</span>
                      <span className="text-right text-[14px] text-muted">{tag}</span>
                      <span className="col-span-2 text-[15px] text-ink-60">{line}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <button data-orbit-in="" type="button" onClick={openSheet} aria-haspopup="dialog" className="inline-flex min-h-11 items-center gap-2 self-start justify-self-start border-b-[1.5px] border-current pb-0.5 font-semibold text-strike hover:text-ink">
              See all services
            </button>
          </div>

          <div data-orbit-cell="" className="relative mx-auto aspect-square w-full max-w-[min(640px,74svh)] max-lg:order-first max-lg:max-w-[560px]">
            <div
              data-orbit-move=""
              className="orbit-viz absolute inset-0 [perspective:1400px]"
              onPointerEnter={() => spin.current?.pause()}
              onPointerLeave={() => spin.current?.play()}
            >
              <div data-orbit-tilt="" className="relative size-full will-change-transform">
                <Asset src="sections/orbit-services.svg" label="Twelve services orbiting four pillars around one automation core" className="size-full [&>svg]:overflow-visible" onReady={onOrbit} />
                <button type="button" onClick={openSheet} aria-haspopup="dialog" aria-label="Open: how the automation core works" className="absolute top-1/2 left-1/2 z-[3] aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={sheet}
        aria-labelledby="core-title"
        onClose={() => lockScroll(false)}
        onClick={(e) => { if (e.target === sheet.current) sheet.current.close(); }}
        className="mx-auto mt-auto mb-4 max-h-[88vh] w-[calc(100%-32px)] max-w-[760px] overflow-visible bg-transparent p-0 backdrop:bg-abyss/55"
      >
        <div className="relative grid max-h-[88vh] gap-5 overflow-auto rounded-[28px_28px_20px_20px] bg-paper p-[clamp(24px,4vw,44px)] text-ink shadow-2">
          <button type="button" aria-label="Close" onClick={() => sheet.current?.close()} className={`${iconBtn} absolute top-[18px] right-[18px]`}>✕</button>
          <h3 id="core-title" className="text-balance font-display text-h2 font-bold">
            One engine room <Accent>under every pillar.</Accent>
          </h3>
          <Lead>Workflows run underneath everything we ship. Insiders review what they produce before it reaches you.</Lead>
          <dl className="border-t border-hairline">
            {LANDING.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-4 border-b border-hairline py-3">
                <dt className="pt-0.5 text-[15px] font-semibold text-strike">{k}</dt>
                <dd className="text-[15px] text-ink-60">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </dialog>
    </Room>
  );
}
