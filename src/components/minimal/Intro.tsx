'use client';

import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-core';
import { SHARK } from '@/components/ui/Icon';

// The mark's body as its separate pieces (body, fins, gill strokes…), so each traces on its own.
const PARTS = SHARK.body.split(/(?=M)/);
const WORDS = ['Finishers', 'Sharkprint'];

type W = Window & { __intro?: number; __introT?: number };

/** The way in, on the main page only: the shark mark traces itself piece by piece and fills,
 *  the wordmark spells out under it, the mark's blue dot floods the screen, and that blue
 *  shrinks into the "o" of the headline, becoming the window the portal zooms through, while
 *  the headline rises around it. The head script decides whether it runs (not on a deep link
 *  or a reload part-way down) and sets the flags on <html> that hold the hero back:
 *  intro-on shows this layer, intro-win hides the real window, intro-hold pauses the
 *  headline's rise. Any wheel, touch or key speeds it through. */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const w = window as W;
    const d = document.documentElement;
    const save = () => { try { sessionStorage.setItem('sy', String(Math.round(scrollY))); } catch { /* blocked */ } };
    addEventListener('pagehide', save);
    const el = root.current;
    const done = () => { w.__intro = 0; d.classList.remove('intro-on', 'intro-win', 'intro-hold'); };
    // Skipped when there's nothing to play it on, when you're already down the page, or when the
    // script arrived late (a slow phone or network): by then you've waited long enough.
    if (!el || !w.__intro || scrollY > 40 || performance.now() > 3000) { done(); return () => removeEventListener('pagehide', save); }
    clearTimeout(w.__introT);
    // A re-render of <html> (see Flags.tsx) can drop the flags; put them back while this runs.
    d.classList.add('intro-on', 'intro-win', 'intro-hold');

    const svg = el.querySelector<SVGSVGElement>('.intro__shark')!;
    const parts = Array.from(el.querySelectorAll<SVGPathElement>('.intro__part'));
    const dot = el.querySelector<SVGPathElement>('.intro__dot')!;
    const flood = el.querySelector<HTMLElement>('.intro__flood')!;
    const chars = Array.from(el.querySelectorAll<HTMLElement>('.intro__word i'));
    const win = document.querySelector<HTMLElement>('.hero__window');
    const mark = document.querySelector<SVGSVGElement>('.portal__shark');
    const lines = Array.from(document.querySelectorAll<HTMLElement>('.hero__title .ln > span'));
    const foot = document.querySelector<HTMLElement>('.hero__foot');

    // A hairline at any size: the stroke is in the mark's own units.
    const sw = (1.6 * 2000) / (svg.getBoundingClientRect().width || 600);
    parts.forEach((p) => p.style.setProperty('stroke-width', sw.toFixed(2)));

    // Where the dot sits on screen, for the flood to start from.
    const s0 = svg.getBoundingClientRect();
    const db = dot.getBBox();
    const k0 = s0.width / 2000;
    const fx = s0.left + (db.x + db.width / 2) * k0, fy = s0.top + (db.y + db.height / 2) * k0;
    const far = Math.hypot(Math.max(fx, innerWidth - fx), Math.max(fy, innerHeight - fy)) + 4;

    // Where it all lands: the real window in the "o", and the shark sitting in it.
    let to = { l: 0, t: 0, w: 0, h: 0 }, sk = { x: 0, y: 0, s: 1 };
    const measure = () => {
      if (win) { const r = win.getBoundingClientRect(); to = { l: r.left, t: r.top, w: r.width, h: r.height }; }
      if (mark) { const r = mark.getBoundingClientRect(); sk = { x: r.left - s0.left, y: r.top - s0.top, s: r.width / s0.width }; }
    };

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    // Trace: each piece draws its outline, one after another, then fills.
    tl.to(parts, { strokeDashoffset: 0, duration: 0.85, stagger: 0.07, ease: 'power2.inOut' }, 0.15)
      .to(parts, { fillOpacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }, 0.75)
      .to(parts, { strokeOpacity: 0, duration: 0.3 }, 1.2)
      .fromTo(dot, { scale: 0, rotation: -90, opacity: 1, svgOrigin: `${db.x + db.width / 2} ${db.y + db.height / 2}` }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.2)' }, 0.95)
      .fromTo(chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.025, ease: 'power3.out' }, 0.85)
      // Flood: the dot spreads until the screen is the statement's blue, and the shark turns black on it.
      .to(chars, { yPercent: -110, opacity: 0, duration: 0.35, stagger: 0.012, ease: 'power2.in' }, 1.75)
      .fromTo(flood, { clipPath: `circle(0px at ${fx}px ${fy}px)` }, { clipPath: `circle(${far}px at ${fx}px ${fy}px)`, duration: 0.75, ease: 'power3.in' }, 1.85)
      .call(() => el.classList.add('is-flood'), [], 1.9)
      .call(() => { measure(); el.style.background = 'transparent'; flood.style.clipPath = 'none'; }, [], 2.62)
      // Into the "o": the blue and the shark shrink onto the window and its shark, exactly.
      .to(flood, { left: () => to.l, top: () => to.t, width: () => to.w, height: () => to.h, borderRadius: '28%', duration: 1.05, ease: 'expo.inOut' }, 2.65)
      .to(svg, { x: () => sk.x, y: () => sk.y, scale: () => sk.s, duration: 1.05, ease: 'expo.inOut' }, 2.65)
      // The headline rises behind the blue, so it's in place when the blue docks in its "o". It
      // runs on this timeline rather than its own CSS clock, so a slow phone that drops frames
      // can't land the blue before the word is there. intro-done keeps the CSS rise off for good.
      .call(() => { if (foot) gsap.set(foot, { opacity: 0, '--draw': 0 }); d.classList.add('intro-done'); d.classList.remove('intro-hold'); }, [], 2.45)
      .fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 1, stagger: 0.11, ease: 'expo.out', immediateRender: false }, 2.45)
      .fromTo(foot, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', immediateRender: false }, 3.1)
      .fromTo(foot, { '--draw': 0 }, { '--draw': 1, duration: 1.4, ease: 'expo.out', immediateRender: false }, 3.25)
      .call(() => d.classList.remove('intro-win'), [], 3.68)
      .to(el, { opacity: 0, duration: 0.3, ease: 'power1.out' }, 3.7)
      .call(done, [], 4);

    // Hold the page still while it plays; any attempt to scroll hurries it along.
    const hurry = (e: Event) => {
      if (e.type === 'keydown' && ['Tab', 'Shift', 'Alt', 'Control', 'Meta'].includes((e as KeyboardEvent).key)) return;
      e.preventDefault();
      e.stopPropagation();
      tl.timeScale(5);
    };
    const opts = { capture: true, passive: false } as const;
    const evs = ['wheel', 'touchmove', 'keydown'] as const;
    evs.forEach((t) => addEventListener(t, hurry, opts));
    // Turning the phone or resizing the window moves the "o": skip to the end, where the real
    // window takes over at its new place.
    const w0 = innerWidth;
    const resized = () => { if (innerWidth !== w0) tl.progress(1); };
    addEventListener('resize', resized);
    // Opened in a background tab: wait, and play from the start once it's in front.
    const shown = () => { if (!document.hidden && tl.paused()) tl.play(0); };
    if (document.hidden) tl.pause(0);
    document.addEventListener('visibilitychange', shown);
    const off = () => {
      evs.forEach((t) => removeEventListener(t, hurry, opts));
      removeEventListener('resize', resized);
      document.removeEventListener('visibilitychange', shown);
    };
    tl.eventCallback('onComplete', off);

    return () => {
      tl.kill();
      off();
      removeEventListener('pagehide', save);
    };
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <span className="intro__flood" />
      <svg className="intro__shark" viewBox="0 0 2000 1200" fill="currentColor" focusable="false">
        {PARTS.map((p, n) => <path key={n} className="intro__part" d={p} pathLength={1} />)}
        <path className="intro__dot" d={SHARK.dot} />
      </svg>
      <p className="intro__word">
        {WORDS.map((word, n) => (
          <Fragment key={word}>
            {n > 0 && ' '}
            <span>{[...word].map((c, k) => <i key={k}>{c}</i>)}</span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
