'use client';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-core';

const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));
const c01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

/** The pillar pages' motion, transform and opacity only:
 *  - [data-reveal] settles in once as it enters; [data-rise] headings lift in word by word, and
 *    a sample's bars grow in with its reveal (minimal.css).
 *  - In the nav, four corner marks lock onto the pillar you're on, follow the pointer or the
 *    keyboard along the others, and come back when it leaves.
 *  - The wall is struck through, line by line, as it reaches the middle of the screen.
 *  - The line over the four steps fills as they scroll past.
 *  - The ribs drift slowly up as you read. */
export function PillarMotion() {
  useGSAP(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -12%' });
    $$('[data-reveal], [data-rise]').forEach((el) => io.observe(el));
    // Drawings (the footer's mark) draw once a quarter of them is in view.
    const drawIo = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-drawn');
      drawIo.unobserve(e.target);
    }), { threshold: 0.25 });
    $$('[data-draw]').forEach((el) => drawIo.observe(el));

    // Nav: a hairline once the page moves, and the sight on the current pillar.
    const nav = document.querySelector<HTMLElement>('.nav');
    if (nav) ScrollTrigger.create({ start: 8, end: 'max', onToggle: (s) => nav.toggleAttribute('data-scrolled', s.isActive) });
    const deck = document.querySelector<HTMLElement>('.nav__deck');
    const ticks = deck ? $$('.nav__lock i', deck) : [];
    const TICK = 10, WIDE = 5;
    let aimed: HTMLElement | null = null, lockTl: gsap.core.Timeline | null = null;
    const corners = (a: HTMLElement, w: number) => {
      const x0 = a.offsetLeft - w, y0 = a.offsetTop - w, x1 = a.offsetLeft + a.offsetWidth - TICK + w, y1 = a.offsetTop + a.offsetHeight - TICK + w;
      return [[x0, y0], [x1, y0], [x0, y1], [x1, y1]];
    };
    const aim = (a: HTMLElement | null, snap = false) => {
      if (ticks.length !== 4 || !a || (a === aimed && !snap)) return;
      const from = aimed;
      aimed = a;
      lockTl?.kill();
      gsap.killTweensOf(ticks);
      const at = corners(a, 0), wide = corners(a, WIDE);
      if (snap || !from) {
        if (!from && !snap) {
          const far = corners(a, WIDE * 3);
          gsap.set(ticks, { x: (i) => far[i][0], y: (i) => far[i][1], opacity: 0 });
          lockTl = gsap.timeline({ delay: 0.3 })
            .to(ticks, { x: (i) => wide[i][0], y: (i) => wide[i][1], opacity: 1, duration: 0.45, ease: 'power3.out' })
            .to(ticks, { x: (i) => at[i][0], y: (i) => at[i][1], duration: 0.24, ease: 'power2.inOut' });
          return;
        }
        gsap.set(ticks, { x: (i) => at[i][0], y: (i) => at[i][1], opacity: 1 });
        return;
      }
      lockTl = gsap.timeline()
        .to(ticks, { x: (i) => wide[i][0], y: (i) => wide[i][1], opacity: 1, duration: 0.42, ease: 'power3.out' })
        .to(ticks, { x: (i) => at[i][0], y: (i) => at[i][1], duration: 0.24, ease: 'power2.inOut' });
    };
    const current = () => deck?.querySelector<HTMLElement>('a[aria-current]') ?? null;
    const onOver = (e: Event) => { const a = (e.target as Element).closest<HTMLElement>('a'); if (a) aim(a); };
    const onOut = (e: FocusEvent) => { if (!deck?.contains(e.relatedTarget as Node | null)) aim(current()); };
    const onLeave = () => { if (!deck?.matches(':focus-within')) aim(current()); };
    const reaim = () => { if (aimed) aim(aimed, true); };
    if (deck) {
      deck.addEventListener('pointerover', onOver);
      deck.addEventListener('focusin', onOver);
      deck.addEventListener('focusout', onOut);
      deck.addEventListener('pointerleave', onLeave);
      ScrollTrigger.addEventListener('refresh', reaim);
      (document.fonts?.ready ?? Promise.resolve()).then(() => aim(current()));
    }

    // A scrubbed move between two scroll positions.
    const tie = (trigger: Element, start: string, end: string, draw: (p: number) => void) => {
      const o = { p: 0 };
      gsap.to(o, { p: 1, ease: 'none', onUpdate: () => draw(o.p), scrollTrigger: { trigger, start, end, scrub: 0.4 } });
    };

    // The wall, struck through as it reaches the middle of the screen: a copy of it set with a
    // line through every line of text fades in over it while the words dim.
    const wall = document.querySelector<HTMLElement>('.pwall__wall');
    const strike = wall?.querySelector<HTMLElement>('.pwall__strike');
    const words = wall?.querySelector<HTMLElement>('span');
    if (wall && strike && words) {
      tie(wall, 'top 80%', 'top 40%', (p) => {
        const k = smooth(c01(p / 0.75));
        strike.style.opacity = k.toFixed(3);
        words.style.opacity = (1 - 0.5 * k).toFixed(3);
      });
    }

    const navH = () => nav?.offsetHeight ?? 0;
    const wide = matchMedia('(min-width: 48.01rem)').matches;
    const timers: number[] = [];

    // Analyst: the question in the hero types itself out, holds, clears, and the next one comes.
    const ask = document.querySelector<HTMLElement>('[data-cycle]');
    const askText = ask?.querySelector<HTMLElement>('.an-ask__text');
    if (ask && askText) {
      const lines: string[] = JSON.parse(ask.dataset.cycle!);
      let n = 0;
      const type = (line: string, k: number) => {
        askText.textContent = line.slice(0, k);
        if (k < line.length) { timers.push(window.setTimeout(() => type(line, k + 1), 42)); return; }
        timers.push(window.setTimeout(() => clear(line, line.length), 2200));
      };
      const clear = (line: string, k: number) => {
        askText.textContent = line.slice(0, k);
        if (k > 0) { timers.push(window.setTimeout(() => clear(line, k - 1), 16)); return; }
        n = (n + 1) % lines.length;
        timers.push(window.setTimeout(() => type(lines[n], 0), 260));
      };
      timers.push(window.setTimeout(() => clear(lines[0], lines[0].length), 2600));
    }

    // Analyst: the evidence lifts out from under its redaction bars as the report comes up.
    const doc = document.querySelector('.an-ev__doc');
    const bars = doc ? $$('[data-redact]', doc) : [];
    if (doc && bars.length) {
      tie(doc, wide ? 'top 75%' : 'top 95%', wide ? 'center 45%' : 'top 30%', (p) => {
        bars.forEach((b, k) => { b.style.transform = `scaleX(${(1 - smooth(c01(p * 1.7 - k * 0.18))).toFixed(4)})`; });
      });
    }

    // Analyst: each step lights up as it passes the middle, beside the loop held still.
    $$('.an-steps__list [data-step]').forEach((li) => {
      ScrollTrigger.create({ trigger: li, start: 'top 62%', end: 'bottom 62%', onToggle: (s) => li.toggleAttribute('data-on', s.isActive) });
    });

    // HQ: the numbers count up into place when they come on screen.
    const counters = $$('[data-count]');
    const countIo = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIo.unobserve(e.target);
      const el = e.target as HTMLElement;
      const from = parseFloat(el.dataset.count!), to = parseFloat(el.dataset.to!), dp = Number(el.dataset.dp ?? 0), suffix = el.dataset.suffix ?? '';
      const o = { v: from };
      gsap.to(o, { v: to, duration: 1.8, ease: 'power3.out', delay: 0.3, onUpdate: () => { el.textContent = o.v.toFixed(dp) + suffix; } });
    }), { threshold: 0.4 });
    counters.forEach((el) => { el.textContent = parseFloat(el.dataset.count!).toFixed(Number(el.dataset.dp ?? 0)) + (el.dataset.suffix ?? ''); countIo.observe(el); });

    // HQ: the month fills in, day by day, as it scrolls past.
    const cal = document.querySelector('[data-cal]');
    const days = cal ? $$('li', cal) : [];
    if (cal && days.length) {
      tie(cal, 'top 80%', 'bottom 55%', (p) => {
        const n = Math.round(p * days.length);
        days.forEach((d, k) => d.toggleAttribute('data-done', k < n));
      });
    }

    // Content: a playhead runs along the stream as you scroll and finds its moments.
    const tape = document.querySelector<HTMLElement>('[data-tape]');
    if (tape) {
      const bar = tape.querySelector<HTMLElement>('.ct-tape__bar')!, head = tape.querySelector<HTMLElement>('.ct-tape__head')!;
      const marks = $$('.ct-tape__mark', tape), found = tape.querySelector<HTMLElement>('[data-found]')!;
      tie(tape, 'top 78%', 'bottom 45%', (p) => {
        tape.style.setProperty('--p', p.toFixed(4));
        head.style.transform = `translateX(${(p * bar.clientWidth).toFixed(1)}px)`;
        let n = 0;
        marks.forEach((m) => { const on = p >= Number(m.dataset.at); m.toggleAttribute('data-on', on); if (on) n++; });
        found.textContent = String(n);
      });
    }

    // Content: the page holds while the week slides past, Monday to Sunday (wide screens; on a
    // phone the week scrolls sideways under your thumb).
    const weekPin = document.querySelector<HTMLElement>('.ct-week__pin');
    const track = weekPin?.querySelector<HTMLElement>('.ct-week__track');
    const view = weekPin?.querySelector<HTMLElement>('.ct-week__viewport');
    if (wide && weekPin && track && view) {
      const dist = () => Math.max(0, track.scrollWidth - view.clientWidth);
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: weekPin, start: () => `top ${navH()}px`, end: () => `+=${dist() * 1.1}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, refreshPriority: 1 },
      });
    }

    // Platforms: the page holds while one site is built, step by step.
    const buildPin = document.querySelector<HTMLElement>('.pf-build__pin');
    const browser = buildPin?.querySelector<HTMLElement>('[data-build]');
    const buildSteps = buildPin ? $$('.pf-build__steps li', buildPin) : [];
    if (buildPin && browser) {
      const show = (k: number) => {
        browser.dataset.state = String(k);
        buildSteps.forEach((s, j) => s.toggleAttribute('data-on', j <= k));
      };
      const onUpdate = (s: ScrollTrigger) => show(Math.min(3, Math.floor(s.progress * 4.2)));
      show(0);
      // Side by side it holds the page; stacked (taller than a phone screen) it builds as it passes.
      if (matchMedia('(min-width: 64.01rem)').matches) {
        ScrollTrigger.create({ trigger: buildPin, start: () => `top ${navH()}px`, end: '+=260%', pin: true, refreshPriority: 1, onUpdate });
      } else {
        ScrollTrigger.create({ trigger: browser, start: 'top 85%', end: 'bottom 75%', onUpdate });
      }
    }

    // The ribs drift up as you read.
    gsap.to($$('.texture'), { yPercent: -5, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });

    return () => {
      io.disconnect();
      drawIo.disconnect();
      countIo.disconnect();
      timers.forEach((t) => clearTimeout(t));
      lockTl?.kill();
      if (!deck) return;
      deck.removeEventListener('pointerover', onOver);
      deck.removeEventListener('focusin', onOver);
      deck.removeEventListener('focusout', onOut);
      deck.removeEventListener('pointerleave', onLeave);
      ScrollTrigger.removeEventListener('refresh', reaim);
    };
  });
  return null;
}
