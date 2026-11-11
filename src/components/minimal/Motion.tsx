'use client';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-core';
import { clamp } from '@/lib/env';

const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));
const c01 = (x: number) => clamp(x, 0, 1);
const smooth = (x: number) => x * x * (3 - 2 * x);

/** Where the hero's "o" has its hole: the centre of the counter and the radii halfway through
 *  the letter's stroke, in the hero stage's own pixels (offsets, so transforms don't move them).
 *  Read off the real glyph, drawn once to a scratch canvas: from the middle outwards it's empty
 *  counter, then stroke, then outside the letter. */
function measureO(stage: HTMLElement, o: HTMLElement, base: HTMLElement) {
  const cs = getComputedStyle(o);
  const size = parseFloat(cs.fontSize);
  // Nothing to measure while the letter isn't laid out (detached mid re-render, or hidden).
  if (!o.isConnected || !(size > 0)) return null;
  const pad = Math.ceil(size * 0.4);
  const c = document.createElement('canvas');
  c.width = c.height = Math.ceil(size * 1.2) + pad * 2;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
  // The letter as shown: an "O" when the heading is set in capitals.
  const ch = cs.textTransform === 'uppercase' ? 'O' : 'o';
  const m = ctx.measureText(ch);
  const by = pad + Math.ceil(m.actualBoundingBoxAscent);
  ctx.fillText(ch, pad, by);
  const { data, width } = ctx.getImageData(0, 0, c.width, c.height);
  const ink = (x: number, y: number) => x >= 0 && y >= 0 && x < width && y < width && data[(y * width + x) * 4 + 3] > 127;
  const gx = Math.round(pad + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2);
  const gy = Math.round(by - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
  const walk = (dx: number, dy: number) => {
    let x = gx, y = gy;
    while (!ink(x, y) && Math.abs(x - gx) + Math.abs(y - gy) < size) { x += dx; y += dy; }
    const inner = Math.abs(x - gx) + Math.abs(y - gy);
    while (ink(x, y)) { x += dx; y += dy; }
    return { inner, outer: Math.abs(x - gx) + Math.abs(y - gy) };
  };
  const r = walk(1, 0), l = walk(-1, 0), d = walk(0, 1), u = walk(0, -1);
  const at = (el: HTMLElement) => {
    let x = 0, y = 0, n: HTMLElement | null = el;
    while (n && n !== stage) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
    return { x, y };
  };
  return {
    // The glyph's origin is the span's left edge; its baseline is the marker's top.
    cx: at(o).x + gx + (r.inner - l.inner) / 2 - pad,
    cy: at(base).y + gy + (d.inner - u.inner) / 2 - by,
    rx: (r.inner + r.outer + l.inner + l.outer) / 4,
    ry: (d.inner + d.outer + u.inner + u.outer) / 4,
    // The hole itself, which is what has to cover the screen at the end.
    hx: (r.inner + l.inner) / 2,
    hy: (d.inner + u.inner) / 2,
  };
}

/** Every scroll behaviour on the page, in one place. All of it moves transform and opacity
 *  only, and the page reads complete before any of it runs.
 *  - [data-reveal] settles in once as it enters; [data-rise] headings lift in word by word.
 *  - [data-draw] diagrams draw once as they enter.
 *  - [data-parallax="n"] drifts by n of its height while its band crosses the screen (wide
 *    screens only, display type only); the background texture drifts with the page.
 *  - Leaving the hero, you zoom through the "o" of its headline and land in the statement,
 *    whose words then light up before the page moves on.
 *  - In the nav, four corner marks lock onto the chapter you're in, or the one under the pointer.
 *  - The walls of the climb split one by one as you scroll through them (Climb.tsx).
 *  - The match week plays out day by day under a sweeping line; the pillar index follows the
 *    pillar in view; on wide screens the five steps slide past while their row holds still.
 *  - Every boundary between sections has its own transition (see "Section transitions"). */
export function Motion() {
  useGSAP(() => {
    // The portal, first, so everything below is measured with its scroll room in place.
    // The hero and the statement are stacked and pinned together. Scrolling zooms the headline
    // into the "o" of its first line, whose hole shows light blue and the shark from the start.
    // The hole is a window onto a scene held still on screen:
    // the statement's blue, its ribs (fading in early) and the black Finishers shark, which
    // grows and glides to the very spot the statement's own shark sits. When the hole fills the
    // screen the scene is the statement, pixel for pixel, so the hero simply lifts away. You
    // land on a page at rest; its words light up; only then does the page move on.
    const portal = document.querySelector<HTMLElement>('.portal');
    const hero = portal?.querySelector<HTMLElement>('.hero');
    const next = portal?.querySelector<HTMLElement>('.statement');
    const stage = hero?.querySelector<HTMLElement>('.hero__in');
    const o = hero?.querySelector<HTMLElement>('.hero__o');
    const base = hero?.querySelector<HTMLElement>('.hero__base');
    const win = hero?.querySelector<HTMLElement>('.hero__window');
    const scene = hero?.querySelector<HTMLElement>('.portal__scene');
    const ribs = hero?.querySelector<HTMLElement>('.portal__ribs');
    const shark = hero?.querySelector<SVGSVGElement>('.portal__shark');
    const foot = hero?.querySelector<HTMLElement>('.hero__foot');
    const mark = next?.querySelector<SVGSVGElement>('.statement__mark svg');
    const nextRibs = next?.querySelector<HTMLElement>(':scope > .texture--own');
    const nav = document.querySelector<HTMLElement>('.nav');
    let unPortal = () => {};
    if (portal && hero && next && stage && o && base && win && scene && ribs && shark && foot && mark && nextRibs && nav) {
      const words = $$('[data-w]', next);
      // Along the pin: the zoom ends and you land at LAND; the words light up from WORDS to
      // READ; the rest is a beat at rest before the page moves on.
      const LAND = 0.6, WORDS = 0.64, READ = 0.88, FADE = 0.02;
      const inOut = gsap.parseEase('power2.inOut'), accel = gsap.parseEase('power3.in');
      type Geo = { ax: number; ay: number; nav: number; dx: number; dy: number; s1: number; hx: number; lx: number; ly: number; lw: number; lh: number; ribs: number };
      let G: Geo | null = null;

      const place = () => {
        const doc = document.documentElement;
        const navH = nav.offsetHeight, w = doc.clientWidth, vh = doc.clientHeight, h = vh - navH;
        const m = measureO(stage, o, base);
        if (!m) return;
        // While pinned, the hero sits right under the nav: the stage's corner and the hole's
        // centre on screen.
        const sx = stage.offsetLeft, sy = navH + stage.offsetTop;
        const ax = sx + m.cx, ay = sy + m.cy;
        Object.assign(win.style, { left: `${m.cx - m.rx}px`, top: `${m.cy - m.ry}px`, width: `${m.rx * 2}px`, height: `${m.ry * 2}px` });
        stage.style.transformOrigin = `${m.cx}px ${m.cy}px`;
        // The scene covers the screen below the nav, which is exactly where the statement sits.
        Object.assign(scene.style, {
          left: `${-(sx + m.cx - m.rx)}px`, top: `${navH - (sy + m.cy - m.ry)}px`, width: `${w}px`, height: `${h}px`,
          transformOrigin: `${ax}px ${ay - navH}px`,
        });
        // Its ribs copy the statement's own texture: as wide as the section, 12% beyond its
        // top and bottom.
        const hs = next.offsetHeight;
        Object.assign(ribs.style, { top: `${-0.12 * hs}px`, height: `${1.24 * hs}px` });
        // The shark is laid out where the statement's own shark sits.
        const nr = next.getBoundingClientRect(), mr = mark.getBoundingClientRect();
        const lx = mr.left - nr.left, ly = mr.top - nr.top;
        Object.assign(shark.style, { left: `${lx}px`, top: `${ly}px`, width: `${mr.width}px` });
        G = {
          ax, ay, nav: navH, dx: w / 2 - ax, dy: navH + h / 2 - ay,
          // Big enough that the hole itself covers every corner.
          s1: 1.12 * Math.hypot(w / 2 / m.hx, h / 2 / m.hy), hx: m.hx,
          lx, ly, lw: mr.width, lh: mr.height,
          ribs: parseFloat(getComputedStyle(nextRibs).opacity) || 0.1,
        };
      };

      const render = (p: number) => {
        if (!G) return;
        const q = c01(p / LAND);
        // Towards the "o": it slides to the middle of the screen while the zoom builds, slowly
        // at first and faster as you near it.
        const tp = inOut(c01(q / 0.5)), s = 1 + (G.s1 - 1) * accel(q);
        const tx = G.dx * tp, ty = G.dy * tp;
        stage.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
        // The scene undoes the stage's move, so it stays put on screen behind the hole.
        scene.style.transform = `translate3d(${(-tx / s).toFixed(3)}px, ${(-ty / s).toFixed(3)}px, 0) scale(${(1 / s).toFixed(5)})`;
        const f = c01(q / 0.15);
        foot.style.opacity = (1 - f).toFixed(3);
        foot.style.transform = `translate3d(0, ${(f * 40).toFixed(1)}%, 0)`;
        win.style.opacity = '1';
        // The next section's ribs come in early, through the window.
        ribs.style.opacity = (G.ribs * smooth(c01((q - 0.1) / 0.35))).toFixed(3);
        // The shark: small and centred in the hole, then growing and gliding to its place.
        const k = smooth(c01((q - 0.58) / 0.42));
        const fit = s * G.hx;
        const cw = fit + (G.lw - fit) * k;
        const hcx = G.ax + tx, hcy = G.ay + ty - G.nav;
        const ccx = hcx + (G.lx + G.lw / 2 - hcx) * k, ccy = hcy + (G.ly + G.lh / 2 - hcy) * k;
        const sc = cw / G.lw;
        shark.style.transform = `translate3d(${(ccx - cw / 2 - G.lx).toFixed(2)}px, ${(ccy - (G.lh * sc) / 2 - G.ly).toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;
        shark.style.opacity = '1';
        // Through: the statement takes over from the identical scene, and the hero lifts away.
        const landed = p >= LAND;
        next.style.opacity = landed ? '1' : '0';
        hero.style.opacity = (1 - c01((p - LAND) / FADE)).toFixed(3);
        hero.style.visibility = p >= LAND + FADE ? 'hidden' : 'visible';
        // Landed: the words light up one after another.
        const wp = c01((p - WORDS) / (READ - WORDS));
        words.forEach((el, n) => { el.style.opacity = c01((wp * (words.length + 3) - n) / 3).toFixed(3); });
      };

      const pin = { p: 0 };
      const refresh = () => render(pin.p);
      place();
      render(0);
      ScrollTrigger.addEventListener('refreshInit', place);
      ScrollTrigger.addEventListener('refresh', refresh);
      unPortal = () => {
        ScrollTrigger.removeEventListener('refreshInit', place);
        ScrollTrigger.removeEventListener('refresh', refresh);
      };
      gsap.to(pin, {
        p: 1, ease: 'none', onUpdate: refresh,
        scrollTrigger: {
          trigger: portal, start: () => `top ${nav.offsetHeight}px`, end: '+=200%',
          pin: true, anticipatePin: 1, scrub: 0.5, refreshPriority: 10,
        },
      });
    }

    // Reveals and rising headings
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -12%' });
    $$('[data-reveal], [data-rise]').forEach((el) => io.observe(el));

    // Diagrams draw once, when a quarter of them is in view
    const drawIo = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-drawn');
      drawIo.unobserve(e.target);
    }), { threshold: 0.25 });
    $$('[data-draw]').forEach((el) => drawIo.observe(el));

    // A coloured band's texture layer only exists for the browser while that band is on screen.
    $$('.field > .texture:not(.texture--own), .invert > .texture:not(.texture--own), .sheet > .texture').forEach((el) => {
      el.style.visibility = 'hidden';
      ScrollTrigger.create({
        // Measured after the pinned steps above have added their scroll room.
        // A band inside the pinned portal is on screen for as long as the pin's own scroll room
        // is: the spacer the pin wraps around it.
        trigger: el.closest('.portal')?.parentElement ?? el.parentElement, start: 'top bottom', end: 'bottom top', refreshPriority: -1,
        onToggle: (s) => { el.style.visibility = s.isActive ? 'visible' : 'hidden'; },
      });
    });

    // The nav (and the phone menu) marks the chapter you're in. In the nav, four corner marks
    // lock onto it like a sight: they glide over, land a touch wide and close in. Hovering or
    // tabbing along the chapters moves them too; leaving puts them back on the chapter.
    const navLinks = $$<HTMLAnchorElement>('.nav__links a, .menu__sheet a');
    const deck = document.querySelector<HTMLElement>('.nav__deck');
    const ticks = deck ? $$('.nav__lock i', deck) : [];
    const TICK = 10, WIDE = 5;
    let aimed: HTMLElement | null = null, lockTl: gsap.core.Timeline | null = null;
    const corners = (a: HTMLElement, w: number) => {
      const x0 = a.offsetLeft - w, y0 = a.offsetTop - w, x1 = a.offsetLeft + a.offsetWidth - TICK + w, y1 = a.offsetTop + a.offsetHeight - TICK + w;
      return [[x0, y0], [x1, y0], [x0, y1], [x1, y1]];
    };
    const aim = (a: HTMLElement | null, snap = false) => {
      if (ticks.length !== 4 || (a === aimed && !snap)) return;
      const from = aimed;
      aimed = a;
      lockTl?.kill();
      gsap.killTweensOf(ticks);
      if (!a) { gsap.to(ticks, { opacity: 0, duration: 0.3, ease: 'power2.out' }); return; }
      const at = corners(a, 0), wide = corners(a, WIDE);
      if (snap) { gsap.set(ticks, { x: (i) => at[i][0], y: (i) => at[i][1], opacity: 1 }); return; }
      if (!from) { const far = corners(a, WIDE * 3); gsap.set(ticks, { x: (i) => far[i][0], y: (i) => far[i][1] }); }
      lockTl = gsap.timeline()
        .to(ticks, { x: (i) => wide[i][0], y: (i) => wide[i][1], opacity: 1, duration: from ? 0.42 : 0.3, ease: 'power3.out' })
        .to(ticks, { x: (i) => at[i][0], y: (i) => at[i][1], duration: 0.24, ease: 'power2.inOut' });
    };
    const current = () => deck?.querySelector<HTMLElement>('a[aria-current]') ?? null;
    // Several chapters toggle in one scroll step (one leaves, the next arrives): aim once, after.
    let aimFrame = 0;
    const aimCurrent = () => {
      cancelAnimationFrame(aimFrame);
      aimFrame = requestAnimationFrame(() => { if (!deck?.matches(':hover, :focus-within')) aim(current()); });
    };
    new Set(navLinks.map((a) => a.getAttribute('href')!)).forEach((href) => {
      const target = document.querySelector(href);
      if (!target) return;
      const mine = navLinks.filter((a) => a.getAttribute('href') === href);
      ScrollTrigger.create({
        trigger: target, start: 'top 45%', end: 'bottom 45%', refreshPriority: -1,
        onToggle: (s) => {
          mine.forEach((a) => { if (s.isActive) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
          aimCurrent();
        },
      });
    });
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
      document.fonts?.ready.then(reaim);
    }
    const unNav = () => {
      cancelAnimationFrame(aimFrame);
      lockTl?.kill();
      if (!deck) return;
      deck.removeEventListener('pointerover', onOver);
      deck.removeEventListener('focusin', onOver);
      deck.removeEventListener('focusout', onOut);
      deck.removeEventListener('pointerleave', onLeave);
      ScrollTrigger.removeEventListener('refresh', reaim);
    };

    // A hairline under the nav once the page has moved.
    if (nav) ScrollTrigger.create({ start: 8, end: 'max', onToggle: (s) => nav.toggleAttribute('data-scrolled', s.isActive) });

    // The review's rule fills as its steps scroll through
    $$('.review [data-fill]').forEach((track) => {
      gsap.fromTo(track, { '--p': 0 }, {
        '--p': 1, ease: 'none',
        scrollTrigger: { trigger: track.parentElement, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
      });
    });

    // The match week, one day at a time, under a line that sweeps across the days
    const week = document.querySelector<HTMLElement>('.week');
    const wrap = document.querySelector<HTMLElement>('.week-wrap');
    const now = document.querySelector<HTMLElement>('.week__now');
    if (week && wrap && now) {
      const items = $$('.wk', week);
      const days = $$('thead th[data-day]', week);
      week.setAttribute('data-armed', '');
      // Where the sweep starts and ends, in the table's own coordinates: read once per refresh.
      let a = 0, b = 0;
      const measure = () => {
        const base = wrap.getBoundingClientRect().left - wrap.scrollLeft;
        a = days[0].getBoundingClientRect().left - base;
        b = days[6].getBoundingClientRect().right - base;
      };
      measure();
      ScrollTrigger.create({
        trigger: week, start: 'top 70%', end: 'bottom 55%', scrub: true,
        onRefresh: measure,
        onUpdate: (s) => {
          const d = s.progress * 7;
          items.forEach((el) => el.toggleAttribute('data-on', +el.dataset.day! < d));
          days.forEach((el) => el.toggleAttribute('data-on', +el.dataset.day! < d));
          now.style.transform = `translateX(${(a + (b - a) * s.progress).toFixed(1)}px)`;
          now.toggleAttribute('data-on', s.progress > 0.01 && s.progress < 0.99);
        },
      });
    }

    // The pillar index follows the pillar in view
    const links = $$('.index a');
    $$('.pillar').forEach((p) => {
      ScrollTrigger.create({
        trigger: p, start: 'top 55%', end: 'bottom 55%',
        onToggle: (s) => { if (s.isActive) links.forEach((a) => a.toggleAttribute('data-active', a.getAttribute('href') === '#' + p.id)); },
      });
    });

    const steps = document.querySelector<HTMLElement>('.steps');
    const stepTrack = steps?.querySelector<HTMLElement>('.steps__track');
    const stepItems = steps ? $$('li', steps) : [];
    const markSteps = (p: number) => {
      stepTrack?.style.setProperty('--p', p.toFixed(4));
      stepItems.forEach((li, n) => li.toggleAttribute('data-on', p >= n / (stepItems.length - 1) - 0.04));
    };

    const mm = gsap.matchMedia();

    // Wide screens: the steps slide sideways while their row holds still
    mm.add('(min-width: 1024px)', () => {
      if (!steps) return;
      const list = steps.querySelector<HTMLElement>('ol')!;
      // Exactly far enough to bring the last step in. Measured from layout: the steps' own
      // transforms (their deal-in) would otherwise count as width and double the slide.
      const last = list.lastElementChild as HTMLElement;
      const dist = () => Math.max(last.offsetLeft + last.offsetWidth - steps.clientWidth, 0);
      // The pin is the slide, then a short hold once "Optimise" is in (42% of the screen's
      // height), so the reader settles before the page moves on. `slid` is the share of the
      // pin the slide takes; the ease finishes the slide there and holds after it.
      let slid = 1;
      gsap.to(list, {
        x: () => -dist(), ease: (p: number) => Math.min(1, p / slid),
        scrollTrigger: {
          trigger: steps, start: 'center 55%',
          end: () => {
            const slide = Math.max(dist() * 1.3, 500), hold = innerHeight * 0.42;
            slid = slide / (slide + hold);
            return '+=' + (slide + hold);
          },
          pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: (s) => markSteps(Math.min(1, s.progress / slid)),
        },
      });
    });
    // Narrower: the steps stack, and their rule fills down the side
    mm.add('(max-width: 1023px)', () => {
      if (!steps) return;
      ScrollTrigger.create({ trigger: steps, start: 'top 75%', end: 'bottom 60%', scrub: 0.6, onUpdate: (s) => markSteps(s.progress) });
    });

    // Parallax and the drifting texture, on wide screens
    mm.add('(min-width: 768px)', () => {
      $$('[data-parallax]').forEach((el) => {
        const n = clamp(parseFloat(el.dataset.parallax!), -0.4, 0.4) * 100;
        gsap.fromTo(el, { yPercent: n / 2 }, {
          yPercent: -n / 2, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      // The texture drifts slowly up as you read, behind the page and inside every band at once.
      const textures = $$('.texture:not(.texture--own)');
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (s) => { const t = `translate3d(0, ${(-8 * s.progress).toFixed(2)}%, 0)`; textures.forEach((el) => { el.style.transform = t; }); },
      });
    });


    // ---------------------------------------------------------------- Section transitions
    // Each boundary between sections moves in its own way, scrubbed by the scroll, transform
    // and opacity only. All are measured after the pins above them.
    const vw = () => document.documentElement.clientWidth;
    const vh = () => document.documentElement.clientHeight;
    const navH = () => nav?.offsetHeight ?? 0;
    const out2 = gsap.parseEase('power2.out'), out3 = gsap.parseEase('power3.out');
    const in2 = gsap.parseEase('power2.in'), inOut2 = gsap.parseEase('power2.inOut');
    const tie = (trigger: Element, start: string | (() => string), end: string | (() => string), draw: (p: number) => void, scrub: number | true = 0.4) => {
      const o = { p: 0 };
      draw(0);
      gsap.to(o, {
        p: 1, ease: 'none', onUpdate: () => draw(o.p),
        scrollTrigger: { trigger, start, end, scrub, refreshPriority: -1, invalidateOnRefresh: true },
      });
    };
    const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);

    // 1. Statement into the walls: the blue statement sinks back into the page, shrinking like a
    //    card set down, while the walls slide over it like a sheet.
    const statement = $('.statement'), walls = $('#walls'), pillars = $('#pillars');
    if (statement && walls) {
      tie(walls, 'top bottom', () => `top ${navH()}px`, (p) => {
        const d = vh() - navH();
        statement.style.transform = p > 0 ? `translate3d(0, ${(p * d * 0.6).toFixed(1)}px, 0) scale(${(1 - 0.1 * smooth(p)).toFixed(4)})` : '';
      });
    }

    // 2. Walls into the pillars: as the pillars rise, the walls of the climb fall, one after
    //    another from the left, and the line is left standing where it got to.
    const fallen = walls ? $$<SVGGElement>('.climb__wall', walls) : [];
    if (pillars && fallen.length) {
      tie(pillars, 'top 88%', 'top 30%', (p) => {
        fallen.forEach((el) => {
          const e = in2(c01((p - Number(el.dataset.k) * 0.09) / 0.6));
          el.style.transform = e > 0.001 ? `translate(0px, ${(e * 140).toFixed(1)}px)` : '';
          el.style.opacity = (1 - e).toFixed(3);
        });
      });
    }

    // 3. Pillars into the sources: the band arrives tilted back like a screen on its hinge and
    //    swings upright to face you as it lands.
    const report = $('#sources');
    if (report) {
      tie(report, 'top bottom', 'top 15%', (p) => {
        const a = (vw() < 768 ? 6 : 10) * (1 - out2(p));
        report.style.transform = a > 0.01 ? `perspective(1400px) rotateX(${a.toFixed(3)}deg)` : '';
      });
    }

    // 4. Sources into the week: the week's background is seven day columns that come up ahead of
    //    it at different heights, like a chart, and settle flush one after another.
    const weekBand = $('#week'), slats = weekBand ? $$('.slats i', weekBand) : [];
    if (weekBand && slats.length) {
      const lead = [0.55, 0.9, 0.4, 0.75, 1, 0.5, 0.7], settle = [0.7, 0.95, 0.6, 0.85, 1, 0.65, 0.8];
      tie(weekBand, 'top bottom', 'top 30%', (p) => {
        const l = Math.min(vh() * 0.2, 200);
        slats.forEach((el, n) => {
          const y = -l * lead[n] * (1 - smooth(c01(p / settle[n])));
          el.style.transform = y < -0.05 ? `translate3d(0, ${y.toFixed(1)}px, 0)` : '';
        });
      });
    }

    // 5. Week into insiders: the dark band rises with a light-blue scan line on its edge, over
    //    content that holds still on screen, so the content is uncovered rather than moved.
    const insiders = $('#insiders'), insBody = insiders && $('.insiders__grid', insiders), scan = insiders && $('.scan', insiders);
    if (insiders && insBody && scan) {
      tie(insiders, 'top bottom', () => `top ${navH()}px`, (p) => {
        const d = vh() - navH();
        insBody.style.transform = p < 1 ? `translate3d(0, ${(-(1 - p) * d).toFixed(1)}px, 0)` : '';
        scan.style.opacity = (c01(p / 0.04) * (1 - c01((p - 0.94) / 0.06))).toFixed(3);
      }, true);
    }

    // 6. Insiders into the process: insiders drifts away to the left as the process arrives, and
    //    its heading and five steps are dealt in from the right, each as it comes into view.
    const process = $('#process'), procHead = process && $('.head', process), procSteps = process ? $$('.steps li', process) : [];
    const procList = process && $('.steps', process);
    if (insiders && process && procHead && procList) {
      tie(process, 'top bottom', 'top 25%', (p) => {
        insiders.style.transform = p > 0 ? `translate3d(${(-0.35 * vw() * in2(p)).toFixed(1)}px, 0, 0)` : '';
      });
      tie(procHead, 'top bottom', 'top 50%', (p) => {
        const x = (1 - out3(p)) * 0.25 * vw();
        procHead.style.transform = x > 0.5 ? `translate3d(${x.toFixed(1)}px, 0, 0)` : '';
        procHead.style.opacity = (0.1 + 0.9 * smooth(p)).toFixed(3);
      });
      tie(procList, 'top bottom', 'top 50%', (p) => {
        procSteps.forEach((li, n) => {
          const q = c01((p - n * 0.1) / 0.6), x = (1 - out3(q)) * (0.35 + 0.08 * n) * vw();
          li.style.transform = x > 0.5 ? `translate3d(${x.toFixed(1)}px, 0, 0)` : '';
          li.style.opacity = smooth(q).toFixed(3);
        });
      });
    }

    // 7. Process into the questions: a light-blue line appears at the band's edge and opens
    //    downward into the whole field; the questions and the ribs come in once it has.
    const faq = $('#faq'), fieldBg = faq && $('.field-bg', faq), faqBody = faq && $('.faq__grid', faq), faqRibs = faq && $(':scope > .texture', faq);
    if (faq && fieldBg && faqBody && faqRibs) {
      const ribsTo = parseFloat(getComputedStyle(faqRibs).opacity) || 0.1;
      tie(faq, 'top bottom', () => `top ${navH()}px`, (p) => {
        const line = 3 / Math.max(faq.offsetHeight, 1);
        const open = inOut2(c01((p - 0.1) / 0.75));
        fieldBg.style.transform = `scaleY(${(line + (1 - line) * open).toFixed(5)})`;
        fieldBg.style.opacity = c01(p / 0.06).toFixed(3);
        const c = c01((p - 0.4) / 0.45);
        faqBody.style.opacity = smooth(c).toFixed(3);
        faqBody.style.transform = c < 1 ? `translate3d(0, ${((1 - smooth(c)) * 48).toFixed(1)}px, 0)` : '';
        faqRibs.style.opacity = (ribsTo * smooth(c01((p - 0.55) / 0.45))).toFixed(3);
      });
    }

    // 8. Questions into the footer: the page lifts off a footer that was waiting underneath.
    const footer = $('.footer'), footIn = footer && $(':scope > .container', footer);
    if (footer && footIn) {
      tie(footer, 'top bottom', 'bottom bottom', (p) => {
        footer.style.transform = p < 1 ? `translate3d(0, ${(-(1 - p) * footer.offsetHeight).toFixed(1)}px, 0)` : '';
        const e = smooth(p);
        footIn.style.opacity = (0.3 + 0.7 * e).toFixed(3);
        footIn.style.transform = e < 1 ? `scale(${(0.96 + 0.04 * e).toFixed(4)})` : '';
      }, true);
    }

    return () => { io.disconnect(); drawIo.disconnect(); unPortal(); unNav(); };
  });
  return null;
}
