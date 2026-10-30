'use client';

import { useEffect, useRef, useState } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { EngineCut } from '@/components/flows/EngineCut';
import { Gets } from '@/components/ui/Gets';
import { Glance } from '@/components/ui/Glance';
import { Eyebrow, Heading, Lead, Micro, Accent } from '@/components/ui/type';
import { useRoving } from '@/components/ui/useRoving';
import { gsap, useGSAP } from '@/lib/gsap';
import { clamp, rng } from '@/lib/env';
import { engineVolume, useStore, type Volume } from '@/lib/store';
import { trackOnce } from '@/lib/track';
import { cn } from '@/lib/cn';

const NS = 'http://www.w3.org/2000/svg';
const VOLUMES: { v: Volume; label: string; aria?: string }[] = [
  { v: '30', label: '30' },
  { v: '60', label: '60' },
  { v: '120', label: '120' },
  { v: 'inf', label: '∞', aria: 'As many as you need' },
];
const PHONES = [
  { src: 'engine/clip-tactical.svg', label: 'Vertical clip: a clutch play with karaoke subtitles', speed: 0.9, offset: '' },
  { src: 'engine/clip-arena.svg', label: 'Vertical clip: grand final crowd moment', speed: 1.04, offset: 'md:-mt-9' },
  { src: 'engine/clip-stat.svg', label: 'Vertical clip: four eliminations stat card', speed: 1.12, offset: 'md:mt-9' },
];

const OFFER: [string, string][] = [
  ['Every VOD logged', 'Each stream and match gets timestamps for the moments worth a look.'],
  ['Picked by people', 'Software flags clutches, aces and crowd pops. An editor picks the ones worth posting.'],
  ['Cut for every feed', 'Vertical for Shorts, Reels and TikTok, with subtitles burned in, in your colours.'],
  ['As many as you need', 'Thirty clips a month or a few hundred. The engine scales and the price follows.'],
];

type Props = { headingLevel?: 'h1' | 'h2' };

/** 03 Engine (concept pp.13–14): scroll-scrubbed VOD and staggered phones with karaoke subs. */
export function EngineRoom({ headingLevel = 'h2' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const phones = q('[data-phone]');
      gsap.from(phones, { yPercent: 14, opacity: 0, duration: 1.1, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: q('[data-phones]')[0], start: 'top 80%' } });
      phones.forEach((p) => {
        const k = (parseFloat(p.getAttribute('data-speed')!) - 1) * 420;
        gsap.fromTo(p, { y: k }, { y: -k, ease: 'none', scrollTrigger: { trigger: q('[data-phones]')[0], start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  const H = headingLevel;
  return (
    <Room
      ref={ref}
      tone="creme"
      room="engine"
      id="engine"
      labelledBy="engine-title"
    >
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(24px,4vw,72px)] lg:grid-cols-[1fr_1.05fr]">
        <div className="grid content-start gap-6">
          <Heading data-line="in" as={H} id="engine-title" size="h1">
            Every moment,<br /><Accent touch="clip">clipped.</Accent>
          </Heading>
          <Lead>
            <b className="font-semibold text-ink">Engine</b> turns your streams and matches into short clips, every month: found, cut, subtitled and ready to post.
          </Lead>
        </div>

        <div data-phones="" className="relative -mx-[var(--gutter)] flex snap-x snap-mandatory items-start justify-start gap-3.5 overflow-x-auto px-[var(--gutter)] pt-6 pb-10 md:mx-0 md:justify-center md:gap-[clamp(10px,1.6vw,22px)] md:overflow-visible md:px-0 md:pb-16">
          {PHONES.map((p) => <Phone key={p.src} {...p} />)}
        </div>
      </div>

      <div className="wrap mt-[clamp(40px,6vh,72px)]">
        <EngineCut />
      </div>

      <div data-line="foot" data-reveal="" className="wrap mt-[clamp(48px,7vh,72px)]">
        <Gets items={OFFER} cols="sm:grid-cols-2 lg:grid-cols-4" />
      </div>
      {/* On the homepage only: the pillar's own page is the way through. */}
      {H === 'h2' && <div className="wrap"><Glance pillar="engine" /></div>}
    </Room>
  );
}

function VolumeSelector() {
  const value = useStore(engineVolume);
  const index = VOLUMES.findIndex((o) => o.v === value);
  const select = (i: number) => {
    engineVolume.set(VOLUMES[i].v);
    trackOnce('volume', { type: 'volume', room: 'engine' });
  };
  const item = useRoving(VOLUMES.length, index, select);
  return (
    <div className="grid gap-2.5">
      <p className="label text-muted" id="vol-label">Clips a month</p>
      <div role="radiogroup" aria-labelledby="vol-label" className="inline-flex gap-1 justify-self-stretch rounded-2xl border border-hairline bg-paper p-1 md:justify-self-start">
        {VOLUMES.map((o, i) => (
          <button
            key={o.v}
            type="button"
            role="radio"
            aria-checked={o.v === value}
            aria-label={o.aria}
            onClick={() => select(i)}
            {...item(i)}
            className="h-[50px] min-w-0 flex-1 rounded-xl font-display text-[20px] font-bold transition-colors duration-200 hover:bg-creme-deep aria-checked:bg-ink aria-checked:text-paper md:min-w-[68px] md:flex-none"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Hover plays a muted loop: word-by-word karaoke subtitles on the real clip. */
function Phone({ src, label, speed, offset }: (typeof PHONES)[number]) {
  const words = useRef<SVGTSpanElement[]>([]);
  const original = useRef<(string | null)[]>([]);
  const timer = useRef(0);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    if (!words.current.length || timer.current) return;
    setPlaying(true);
    let i = 0;
    const step = () => {
      words.current.forEach((w, j) => w.setAttribute('fill', j < i ? '#FFFFFF' : j === i ? '#AFC6FF' : 'rgba(255,255,255,.32)'));
      i = (i + 1) % (words.current.length + 2);
    };
    step();
    timer.current = window.setInterval(step, 340);
    trackOnce('clip:' + src, { type: 'clip_hover', room: 'engine' });
  };
  const stop = () => {
    clearInterval(timer.current);
    timer.current = 0;
    setPlaying(false);
    words.current.forEach((w, j) => w.setAttribute('fill', original.current[j] ?? '#fff'));
  };

  return (
    <figure
      data-phone=""
      data-speed={speed}
      data-playing={playing}
      tabIndex={0}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
      className={cn('group relative w-[58vw] flex-none cursor-pointer snap-center will-change-transform md:w-[clamp(130px,13.5vw,196px)]', offset)}
    >
      <Asset
        src={src}
        label={label}
        className="drop-shadow-[0_26px_30px_rgba(7,18,43,.28)] transition-transform duration-[450ms] ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.02]"
        onReady={(svg) => {
          words.current = Array.from(svg.querySelectorAll('tspan'));
          original.current = words.current.map((w) => w.getAttribute('fill'));
          return () => clearInterval(timer.current);
        }}
      />
      <span className="label absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-1.5 rounded-full bg-ink px-2.5 py-1.5 text-[12px] whitespace-nowrap text-paper opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-data-[playing=true]:translate-y-0 group-data-[playing=true]:opacity-100">
        Muted loop
      </span>
    </figure>
  );
}

const GETS: [string, string][] = [
  ['Timestamped VOD logs', 'Every stream and match logged with moments, by type.'],
  ['Moment finding', 'Clutches, aces, crowd pops and comms gold: flagged by software, picked by people.'],
  ['Clipping in 9:16 and 1:1', 'Cut for Shorts, Reels and TikTok formats.'],
  ['Karaoke subtitles', 'Burned-in, on-brand, word-by-word highlight.'],
  ['Basic editing', 'Hooks, zooms, captions, end cards.'],
  ['As much as you need', 'Monthly volume set by you; the engine scales, the price is shaped around it.'],
];

const COLORS = ['#2457F5', '#5E8BFF', '#16337F'];
const TOTALS: Record<Volume, number> = { '30': 30, '60': 60, '120': 120, inf: 30 * 7 };

type Calendar = {
  cells: { r: SVGRectElement; x: number; y: number; dots: SVGCircleElement[] }[];
  headline?: SVGTextElement;
  shown: Volume | null;
};

/** Spread the month's clips across the days, weekends a little heavier; at most 7 dots a day. */
function fillCalendar(c: Calendar, v: Volume, animate: boolean) {
  if (c.shown === v) return;
  c.shown = v;
  const total = TOTALS[v];
  const rand = rng(7 + total);
  const weights = c.cells.map((_, i) => 0.7 + rand() * 0.6 + (i % 7 >= 5 ? 0.35 : 0));
  const sum = weights.reduce((a, b) => a + b, 0);
  let left = total;
  const counts = weights.map((w, i) => {
    const n = i === c.cells.length - 1 ? left : Math.max(0, Math.round((w / sum) * total));
    left -= n;
    return n;
  });
  c.cells.forEach((cell, i) => {
    cell.dots.forEach((d) => d.remove());
    cell.dots = [];
    for (let k = 0; k < clamp(counts[i], 0, 7); k++) {
      const d = document.createElementNS(NS, 'circle');
      d.setAttribute('cx', String(cell.x + 14 + k * 9));
      d.setAttribute('cy', String(cell.y + 38));
      d.setAttribute('r', '3.4');
      d.setAttribute('fill', COLORS[(i + k) % 3]);
      cell.r.after(d);
      cell.dots.push(d);
    }
    if (animate) gsap.from(cell.dots, { scale: 0, transformOrigin: '50% 50%', duration: 0.5, delay: i * 0.012, ease: 'back.out(3)' });
  });
  if (c.headline) c.headline.textContent = v === 'inf' ? 'Every moment, shipped' : `${total} clips shipped`;
}

/** What the client gets, beside the month calendar the volume selector refills. */
export function EngineDeep() {
  const volume = useStore(engineVolume);
  const cal = useRef<Calendar | null>(null);

  useEffect(() => {
    if (cal.current) fillCalendar(cal.current, volume, true);
  }, [volume]);

  return (
    <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,88px)] lg:grid-cols-2">
      <Asset
        src="engine/clip-calendar.svg"
        label="Sample month of shipped clips"
        className="rounded-[20px] shadow-1 [&>svg]:rounded-[20px]"
        onReady={(svg) => {
          const cells = Array.from(svg.querySelectorAll('rect'))
            .filter((r) => r.getAttribute('width') === '78' && r.getAttribute('height') === '54')
            .map((r) => {
              const dots: SVGCircleElement[] = [];
              let n = r.nextElementSibling;
              while (n && n.tagName !== 'rect') {
                if (n.tagName === 'circle') dots.push(n as SVGCircleElement);
                n = n.nextElementSibling;
              }
              return { r, x: +r.getAttribute('x')!, y: +r.getAttribute('y')!, dots };
            });
          const headline = Array.from(svg.querySelectorAll('text')).find((t) => /clips shipped/.test(t.textContent || '')) as SVGTextElement | undefined;
          cal.current = { cells, headline, shown: null };
          fillCalendar(cal.current, engineVolume.get(), false);
          return () => { cal.current = null; };
        }}
      />
      <div className="grid content-start gap-6">
        <Eyebrow>What the client gets</Eyebrow>
        <Heading size="h2">
          Hours of VOD in.<br /><Accent>A month of shorts out.</Accent>
        </Heading>
        <VolumeSelector />
        <Gets items={GETS} />
        <Micro>Machines find the moments. Editors who know the scene pick them.</Micro>
      </div>
    </div>
  );
}
