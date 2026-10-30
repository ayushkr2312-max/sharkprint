'use client';

import { useEffect, useRef, useState } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { Gets } from '@/components/ui/Gets';
import { Glance } from '@/components/ui/Glance';
import { Icon } from '@/components/ui/Icon';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { Draggable, gsap, useGSAP } from '@/lib/gsap';
import { isFinePointer, isMobile } from '@/lib/env';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

// Tile boxes over dashboard-light.svg (1280×800), in percent.
const TILES: { id: string; x: number; y: number; w: number; h: number }[] = [
  { id: 'followers', x: 20.5, y: 14, w: 18.25, h: 16 },
  { id: 'winrate', x: 40.2, y: 14, w: 18.25, h: 16 },
  { id: 'clips', x: 59.85, y: 14, w: 18.25, h: 16 },
  { id: 'deliverables', x: 79.5, y: 14, w: 18.25, h: 16 },
  { id: 'growth', x: 20.5, y: 32.2, w: 46.8, h: 37.4 },
  { id: 'rosters', x: 68.75, y: 32.2, w: 29, h: 37.4 },
  { id: 'week', x: 20.5, y: 72, w: 46.8, h: 25 },
  { id: 'sources', x: 68.75, y: 72, w: 29, h: 25 },
];

// What a client gets, in plain words, to close the room.
const OFFER: [string, string][] = [
  ['Every source in one place', 'Socials, team stats, the calendar, sponsors and finance, pulled in on their own.'],
  ['Kept right', 'Automations keep it fresh. People who know esports check that it adds up.'],
  ['Out to your staff', 'A live dashboard, reminders before deadlines, and a report at the end of each month.'],
];

const CHIPS: [string, string[]][] = [
  ['Socials', ['followers', 'growth']],
  ['Team stats', ['winrate', 'rosters']],
  ['Calendar', ['week']],
  ['Reminders', ['deliverables', 'week']],
  ['Sponsors', ['deliverables', 'sources']],
  ['Finance', ['sources']],
];

const WIDGETS = [
  { src: 'command/widget-winrate.svg', label: 'Win rate, last 30 days: 63%', source: 'Team stats · synced 4 min ago', speed: 0.9, place: 'md:left-0 md:top-[24%] w-[42%] md:w-[clamp(150px,16vw,220px)]' },
  { src: 'command/widget-followers.svg', label: 'Followers across platforms: 214.8K, up 6.2%', source: 'Socials · synced 2 min ago', speed: 1.1, place: 'md:right-0 md:top-1/2 ml-[2%] w-[54%] md:ml-0 md:w-[clamp(210px,22vw,310px)]' },
];

type Props = { headingLevel?: 'h1' | 'h2' };

/** 05 Command (concept pp.17–18): every number has a source. The sources sit above the
 *  dashboard and wire down through Command's sync bar (grey and raw going in, blue and
 *  clean coming out) into the tiles they feed; picking one lights its wire and its tiles.
 *  The dashboard tilts flat over ~60vh of scroll; real widgets float, drag and spring back. */
export function CommandRoom({ headingLevel = 'h2' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<string[] | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const wires = useRef<SVGSVGElement>(null);
  const lit = preview && !pinned ? preview : pinned ? CHIPS.find(([c]) => c === pinned)![1] : [];
  const hot = hover ?? (pinned ? CHIPS.findIndex(([c]) => c === pinned) : null);

  // The wires follow the pills, the sync bar and the dashboard (which tilts as it
  // arrives), so they're re-measured every frame it scrolls while on screen.
  useEffect(() => {
    const svg = wires.current!, wrap = svg.parentElement!;
    let raf = 0, live = false;
    const f = (n: number) => n.toFixed(1);
    const layout = () => {
      raf = 0;
      if (!svg.getClientRects().length) return;
      const wr = wrap.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${f(wr.width)} ${f(wr.height)}`);
      const band = wrap.querySelector('[data-band]')!.getBoundingClientRect();
      const dash = wrap.querySelector('[data-dash]')!.getBoundingClientRect();
      const srcs = Array.from(wrap.querySelectorAll('[data-src]'));
      const bt = band.top - wr.top, bb = band.bottom - wr.top, ty = dash.top - wr.top;
      srcs.forEach((el, i) => {
        const s = el.getBoundingClientRect();
        const x0 = s.left + s.width / 2 - wr.left, y0 = s.bottom - wr.top;
        const px = band.left - wr.left + (band.width * (i + 0.5)) / srcs.length;
        const t = TILES.find((tile) => tile.id === CHIPS[i][1][0])!;
        const tx = dash.left - wr.left + (dash.width * (t.x + t.w / 2)) / 100;
        const g = svg.querySelector(`[data-wire="${i}"]`)!;
        g.querySelector('.wiring-raw')!.setAttribute('d', `M${f(x0)} ${f(y0)}C${f(x0)} ${f(y0 + 34)} ${f(px)} ${f(bt - 34)} ${f(px)} ${f(bt)}`);
        g.querySelector('.wiring-clean')!.setAttribute('d', `M${f(px)} ${f(bb)}C${f(px)} ${f(bb + 40)} ${f(tx)} ${f(ty - 40)} ${f(tx)} ${f(ty)}`);
        const port = g.querySelector('.wiring-port')!;
        port.setAttribute('cx', f(tx));
        port.setAttribute('cy', f(ty));
      });
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(layout); };
    const onScroll = () => { if (live) kick(); };
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting;
      if (live) {
        kick();
        svg.unpauseAnimations();
      } else svg.pauseAnimations();
    });
    io.observe(wrap);
    const ro = new ResizeObserver(kick);
    ro.observe(wrap);
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, []);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const stage = q('[data-dash-stage]')[0];
    const mm = gsap.matchMedia();
    mm.add('all', () => {
      gsap.fromTo(q('[data-dash]'), { rotationX: 16, scale: 0.94, transformPerspective: 1800 }, {
        rotationX: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top 95%', end: 'top 35%', scrub: 0.5 },
      });
    });
    mm.add('(min-width: 768px)', () => {
      q('[data-widget]').forEach((w) => {
        const k = (parseFloat(w.getAttribute('data-speed')!) - 1) * 500;
        gsap.fromTo(w, { y: k }, { y: -k, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
    // Widgets drag on desktop and spring back.
    const drags = isFinePointer() && !isMobile()
      ? q('[data-widget-body]').flatMap((body) => Draggable.create(body, {
        type: 'x,y',
        onPress: () => body.parentElement!.setAttribute('data-dragging', 'true'),
        onRelease: () => {
          body.parentElement!.removeAttribute('data-dragging');
          gsap.to(body, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.55)' });
        },
        onDragEnd: () => trackOnce('widget', { type: 'widget_drag', room: 'command' }),
      }))
      : [];
    return () => {
      mm.revert();
      drags.forEach((d) => d.kill());
    };
  }, { scope: ref });

  const H = headingLevel;
  return (
    <Room
      ref={ref}
      tone="creme"
      room="command"
      id="command"
      labelledBy="command-title"
    >
      <div className="wrap">
        <header className="grid justify-items-center gap-5 text-center">
          <Heading data-line="in" as={H} id="command-title" size="h1">
            Your whole org, <Accent touch="screen">one screen.</Accent>
          </Heading>
          <Lead className="mx-auto">
            <b className="font-semibold text-ink">Command</b> puts socials, team stats, the calendar and reminders on one live dashboard, so nobody has to ask where a number came from.
          </Lead>
        </header>

        <div className="relative z-[4] mt-[clamp(40px,6vh,64px)] grid justify-items-center gap-4">
          <p className="text-[15px] text-ink-60">Pick a source to see what it feeds.</p>
          <ul aria-label="Sources. Pick one to find what it feeds on the dashboard." className="flex flex-wrap justify-center gap-2.5">
            {CHIPS.map(([chip, tiles], i) => {
              const on = pinned === chip;
              const show = () => { setPreview(tiles); setHover(i); };
              const hide = () => { setPreview(null); setHover(null); };
              return (
                <li key={chip}>
                  <button
                    type="button"
                    data-src=""
                    aria-pressed={on}
                    onPointerEnter={show}
                    onPointerLeave={hide}
                    onFocus={show}
                    onBlur={hide}
                    onClick={() => {
                      setPinned(on ? null : chip);
                      trackOnce('chip', { type: 'chip', room: 'command' });
                    }}
                    className="inline-flex min-h-11 items-center rounded-full border border-hairline bg-paper px-4 text-[15px] font-semibold text-ink shadow-1 transition-colors duration-200 hover:border-strike aria-pressed:border-strike aria-pressed:bg-strike aria-pressed:text-white"
                  >
                    {chip}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Command itself: what comes in raw goes out clean. */}
        <div data-band="" className="relative z-[4] mx-auto mt-[clamp(48px,7vh,72px)] flex max-w-[1080px] flex-wrap items-center justify-between gap-x-6 gap-y-2 overflow-hidden rounded-[20px] bg-ink px-6 py-4 text-paper md:w-[86%] md:rounded-full">
          <span className="flex items-center gap-3 font-display text-[22px] font-bold"><Icon name="command" strokeWidth={7} className="size-6 text-current-blue" />Command</span>
          <span className="text-[15px] font-medium text-mist">Synced, cleaned and checked</span>
          <span className="text-[15px] text-fog">Out: the dashboard, reminders and a monthly report</span>
          <span aria-hidden="true" className="wiring-scan" />
        </div>

        <svg ref={wires} aria-hidden="true" data-hot={hot ?? undefined} className="wiring pointer-events-none absolute inset-0 z-[3] hidden size-full overflow-visible md:block">
          {CHIPS.map(([chip], i) => (
            <g key={chip} data-wire={i} className={cn(hot === i && 'is-hot')}>
              <path id={`cw-raw-${i}`} className="wiring-raw" />
              <path id={`cw-clean-${i}`} className="wiring-clean" />
              <circle r="2.5" className="wiring-p wiring-p--raw">
                <animateMotion dur="1.6s" begin={`-${i * 0.27}s`} repeatCount="indefinite"><mpath href={`#cw-raw-${i}`} /></animateMotion>
              </circle>
              <circle r="3.5" className="wiring-p wiring-p--clean">
                <animateMotion dur="2s" begin={`-${i * 0.33}s`} repeatCount="indefinite"><mpath href={`#cw-clean-${i}`} /></animateMotion>
              </circle>
              <circle r="4" className="wiring-port" />
            </g>
          ))}
        </svg>

        <div data-dash-stage="" className="relative mt-[clamp(48px,7vh,80px)] perspective-[1800px] md:px-[7%]">
          <div data-dash="" className="relative mx-auto max-w-[1080px] origin-top overflow-hidden rounded-[22px] shadow-[0_60px_100px_-50px_rgba(7,18,43,.55),0_1px_2px_rgba(10,12,17,.06)] will-change-transform">
            <Asset
              src="command/dashboard-light.svg"
              label="Command dashboard: followers, win rate, clips shipped, sponsor deliverables, audience growth, roster win rates, this week and sources of truth"
            />
            <div aria-hidden="true" className="absolute inset-0">
              {TILES.map((t) => {
                const on = lit.includes(t.id);
                return (
                  <span
                    key={t.id}
                    className={cn(
                      'absolute rounded-[14px] border-2 border-strike bg-strike/7 transition-[opacity,scale] duration-200 ease-out-expo',
                      on ? 'scale-100 opacity-100' : 'scale-[.98] opacity-0',
                    )}
                    style={{ left: t.x + '%', top: t.y + '%', width: t.w + '%', height: t.h + '%' }}
                  />
                );
              })}
            </div>
          </div>

          {WIDGETS.map((w) => (
            <Widget key={w.src} {...w} />
          ))}
        </div>

        <div data-line="foot" data-reveal="" className="mt-[clamp(56px,8vh,88px)]">
          <Gets items={OFFER} cols="md:grid-cols-3" />
        </div>
        {H === 'h2' && <Glance pillar="command" />}
      </div>
    </Room>
  );
}

/** A real widget card: hover draws its sparkline and shows its source. */
function Widget({ src, label, source, speed, place }: (typeof WIDGETS)[number]) {
  const draw = useRef<(() => void) | null>(null);
  return (
    <figure
      data-widget=""
      data-speed={speed}
      onPointerEnter={() => draw.current?.()}
      className={cn('group relative z-[4] mt-4 inline-block cursor-grab touch-none align-top will-change-transform data-[dragging=true]:cursor-grabbing md:absolute md:mt-0', place)}
    >
      <div data-widget-body="" className="rounded-[24px] shadow-2 transition-[translate] duration-[450ms] ease-out-expo group-hover:-translate-y-1">
        <Asset
          src={src}
          label={label}
          onReady={(svg) => {
            const spark = Array.from(svg.querySelectorAll('path')).find((p) => p.getAttribute('fill') === 'none' && p.getAttribute('stroke') === '#2457F5');
            const ring = Array.from(svg.querySelectorAll('circle')).find((c) => c.getAttribute('stroke') === '#2457F5' && c.getAttribute('stroke-dasharray'));
            if (spark) {
              const len = spark.getTotalLength();
              spark.style.strokeDasharray = String(len);
              draw.current = () => gsap.fromTo(spark, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: 'expo.out' });
            } else if (ring) {
              const [on, total] = ring.getAttribute('stroke-dasharray')!.split(' ').map(parseFloat);
              draw.current = () => gsap.fromTo(ring, { attr: { 'stroke-dasharray': `0 ${total}` } }, { attr: { 'stroke-dasharray': `${on} ${total}` }, duration: 1.1, ease: 'expo.out' });
            }
            return () => { draw.current = null; };
          }}
        />
      </div>
      <figcaption aria-hidden="true" className="label absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 -translate-y-1 rounded-full bg-ink px-2.5 py-1.5 text-[12px] whitespace-nowrap text-paper opacity-0 transition-[opacity,translate] duration-200 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-data-[dragging=true]:opacity-100">
        {source}
      </figcaption>
    </figure>
  );
}

const GETS: [string, string][] = [
  ['Social numbers', 'Followers, reach, engagement across platforms.'],
  ['Team performance', 'Win rates, form, scrim results per roster.'],
  ['Calendar', 'Matches, scrims, content drops, travel.'],
  ['Reminders', 'Sponsor deliverables, contracts, payouts.'],
  ['Linked databases', 'Everything your org already has, in one place, with one truth.'],
  ['Maintained two ways', 'Automations keep it fresh; esports pros keep it right.'],
];

export function CommandDeep() {
  return (
    <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,88px)] lg:grid-cols-2">
      <Asset src="command/sources-stack.svg" label="Three layers: everything you use, clean linked databases, your live dashboard" className="w-full max-w-[560px] justify-self-center" />
      <div className="grid content-start gap-6">
        <Eyebrow>Sources of truth, kept true</Eyebrow>
        <Heading size="h2">
          What lives in <Accent>Command.</Accent>
        </Heading>
        <Gets items={GETS} />
      </div>
    </div>
  );
}
