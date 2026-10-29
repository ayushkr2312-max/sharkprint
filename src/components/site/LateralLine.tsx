'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { clamp } from '@/lib/env';
import { TIP_AT } from '@/lib/line';
import { onPageReady } from '@/lib/page-ready';

/* The Lateral Line (concept p.04): one 2px Strike stroke, drawn by scroll with a glowing
   head, that only shows itself between rooms. In each room it:
   - comes down out of the gap above and runs in under the room's label, becoming its
     underline (the label lights up as it arrives), or, where a room has no label, turns
     in and stops just short of its heading ([data-line="in"]);
   - is gone while you read the room;
   - comes back out from under the room's last piece ([data-line="foot"]) and runs down
     through the gap to the next room.
   In the footer it turns into the underline of the SHARKPRINT wordmark. It runs in a lane
   outside the content column and crosses only through empty space. */

const NS = 'http://www.w3.org/2000/svg';
const PACE_DOWN = 0.55; // scroll per px going down while the head catches up after a run
const PACE_ACROSS = 0.4; // scroll per px of a sideways run
const GLOW = 90; // length of the glowing stretch behind the head

type Box = { x: number; y: number; w: number; h: number };
type Mark = { k: number; node: SVGCircleElement; halo: SVGCircleElement; on: boolean };
type Piece = {
  host: HTMLElement;
  path: SVGPathElement;
  glow: SVGPathElement;
  tip: SVGCircleElement;
  len: number;
  n: number;
  ks: Float32Array;
  marks: Mark[];
  label: { el: HTMLElement; k: number; on: boolean } | null;
  shown: number;
  ends: Element | null;
};

/** Layout box of el inside host, ignoring transforms (reveals and parallax move things). */
function boxWithin(el: HTMLElement, host: HTMLElement): Box {
  let x = 0, y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== host) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  if (n === host) return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  const r = el.getBoundingClientRect(), hr = host.getBoundingClientRect();
  return { x: r.left - hr.left, y: r.top - hr.top, w: r.width, h: r.height };
}

const isShown = (el: Element | null): el is HTMLElement => !!el && el.getClientRects().length > 0;
const f = (v: number) => v.toFixed(1);

function svgEl<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number>) {
  const e = document.createElementNS(NS, name);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, String(v)));
  return e;
}

/** A path that only goes down or sideways, turning with rounded corners. */
class Route {
  parts: string[] = [];
  x = 0;
  y = 0;
  constructor(readonly r: number) {}
  move(x: number, y: number) {
    this.parts.push(`M${f(x)} ${f(y)}`);
    this.x = x;
    this.y = y;
  }
  down(y: number) {
    if (y <= this.y + 0.5) return;
    this.parts.push(`L${f(this.x)} ${f(y)}`);
    this.y = y;
  }
  /** Turn sideways at y and run to x (and stop there). */
  runTo(x: number, y: number) {
    const dx = x - this.x;
    const s = Math.sign(dx) || 1, r = Math.min(this.r, Math.abs(dx), Math.max(0, y - this.y));
    this.down(y - r);
    this.parts.push(`Q${f(this.x)} ${f(y)} ${f(this.x + s * r)} ${f(y)} L${f(x)} ${f(y)}`);
    this.x = x;
    this.y = y;
  }
  /** Turn sideways at y, run across to x, and turn down again. */
  cross(x: number, y: number) {
    const dx = x - this.x;
    if (Math.abs(dx) < 1) return this.down(y);
    const s = Math.sign(dx), r = Math.min(this.r, Math.abs(dx) / 2, Math.max(0, y - this.y));
    this.down(y - r);
    this.parts.push(`Q${f(this.x)} ${f(y)} ${f(this.x + s * r)} ${f(y)} L${f(x - s * r)} ${f(y)} Q${f(x)} ${f(y)} ${f(x)} ${f(y + r)}`);
    this.x = x;
    this.y = y + r;
  }
  toString() {
    return this.parts.join(' ');
  }
}

/** How far along the piece the head is when the scroll target is yl px into its room. */
function lengthAt(p: Piece, yl: number) {
  const { ks, n, len } = p;
  if (yl <= ks[0]) return 0;
  if (yl >= ks[n]) return len;
  let lo = 0, hi = n;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ks[mid] <= yl) lo = mid;
    else hi = mid;
  }
  return (len * (lo + (yl - ks[lo]) / (ks[hi] - ks[lo]))) / n;
}

export function LateralLine() {
  // Mount once: every room announces itself after hydrating (also after client-side
  // navigation), and each build re-reads the rooms on the page.
  useEffect(() => {
    let pieces: Piece[] = [];
    let built = false;

    const reset = () => pieces.forEach((p) => { if (p.label) delete p.label.el.dataset.tap; });

    const build = () => {
      // Next keeps recently visited routes in the DOM, hidden; only the visible page counts.
      const hosts = Array.from(document.querySelectorAll<HTMLElement>('[data-room]')).filter((h) => h.offsetWidth > 0);
      const W = document.documentElement.clientWidth;
      if (!W || !hosts.length) return;

      // The lane: 40px outside the content column, never closer than 16px to the edge.
      // Phones keep it 8px in, inside the 24px gutter.
      const wrap = hosts.map((h) => h.querySelector<HTMLElement>('.wrap')).find((w) => w && w.offsetWidth > 0);
      const contentLeft = wrap ? wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft || '0') : 56;
      const mobile = innerWidth < 768;
      const lane = mobile ? 8 : Math.max(16, Math.round(contentLeft - 40));
      const R = mobile ? 14 : 32;
      const nodeR = mobile ? 3 : 3.5;

      reset();
      let last = 0; // the key the previous piece ended on, in the current room's terms

      pieces = hosts.flatMap((host, hi) => {
        const svg = host.querySelector<SVGSVGElement>(':scope > .lline');
        if (!svg) return [];
        const w = host.offsetWidth, h = host.offsetHeight;
        const hostLeft = host.getBoundingClientRect().left;
        const X = lane - hostLeft;
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        svg.replaceChildren();
        if (hi > 0) last = Math.max(0, last - hosts[hi - 1].offsetHeight);

        type Plan = { route: Route; label?: { el: HTMLElement; x: number; y: number }; marks: { x: number; y: number; at: 'start' | 'end' }[]; ends?: Element | null };
        const plans: Plan[] = [];
        const underline = host.querySelector<HTMLElement>('[data-footer-underline]');
        const eyebrow = Array.from(host.querySelectorAll<HTMLElement>('[data-eyebrow]')).find(isShown);
        // A room without a label points at its heading ([data-line="in"]) instead.
        const heading = eyebrow ? undefined : Array.from(host.querySelectorAll<HTMLElement>('[data-line="in"]')).find(isShown);

        if (underline) {
          // The footer: down out of the last room and one rounded turn into the wordmark's underline.
          const u = boxWithin(underline, host);
          const route = new Route(R);
          route.move(X, 0);
          route.runTo(Math.max(X + 8, u.x), u.y + u.h / 2);
          plans.push({ route, marks: [], ends: host.querySelector('[data-footer-mark]') });
        } else {
          if (eyebrow) {
            // In: down out of the gap, then along under the label as its underline.
            const b = boxWithin(eyebrow, host);
            const range = document.createRange();
            range.selectNodeContents(eyebrow);
            const tr = range.getBoundingClientRect();
            const tx = tr.left - hostLeft;
            const y = b.y + Math.min(b.h, 22) + 5;
            const route = new Route(R);
            route.move(X, 0);
            route.runTo(tx + tr.width, y);
            plans.push({ route, label: { el: eyebrow, x: tx, y }, marks: [{ x: tx + tr.width, y, at: 'end' }] });
          } else if (heading) {
            // In: down out of the gap, then a short turn that stops just before the heading's
            // first line, halfway up it.
            const b = boxWithin(heading, host);
            const range = document.createRange();
            range.selectNodeContents(heading);
            const first = Array.from(range.getClientRects()).find((r) => r.width > 0) ?? heading.getBoundingClientRect();
            const x = first.left - hostLeft - (mobile ? 6 : 16);
            const y = b.y + first.height / 2;
            const route = new Route(R);
            route.move(X, 0);
            route.runTo(Math.max(X + 4, x), y);
            plans.push({ route, marks: [{ x: Math.max(X + 4, x), y, at: 'end' }] });
          }
          // Out: from under the room's last piece, back to the lane and down into the next room.
          const marked = Array.from(host.querySelectorAll<HTMLElement>('[data-line="foot"]')).filter(isShown);
          const candidates = marked.length ? marked : Array.from(host.querySelectorAll<HTMLElement>('.wrap > *')).filter(isShown);
          const foot = candidates.map((el) => boxWithin(el, host)).sort((a, b) => b.y + b.h - (a.y + a.h))[0];
          const y0 = foot ? foot.y + foot.h : 0;
          if (foot && h - y0 > 24) {
            // It leaves from under the middle of the piece.
            const x0 = foot.x + foot.w / 2;
            const route = new Route(R);
            route.move(x0, y0);
            route.cross(X, y0 + Math.min(40, (h - y0) * 0.45));
            route.down(h);
            plans.push({ route, marks: [{ x: x0, y: y0, at: 'start' }] });
          } else if (!eyebrow && !heading) {
            const route = new Route(R);
            route.move(X, 0);
            route.down(h);
            plans.push({ route, marks: [] });
          }
        }

        return plans.map((plan): Piece => {
          const d = plan.route.toString();
          const path = svgEl('path', { d, class: 'lline-path' });
          const glow = svgEl('path', { d, class: 'lline-glow' });
          svg.append(glow, path);
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len} ${len + 2}`;
          path.style.strokeDashoffset = String(len);
          glow.style.strokeDasharray = `${GLOW} ${len + GLOW}`;
          glow.style.strokeDashoffset = String(GLOW);

          // Scroll keys: the head draws down at the scroll's pace, takes a little scroll for
          // each pixel it runs sideways, and catches up after.
          const n = Math.max(16, Math.ceil(len / 5));
          const ds = len / n;
          const ks = new Float32Array(n + 1), xs = new Float32Array(n + 1), ys = new Float32Array(n + 1);
          let p = path.getPointAtLength(0);
          xs[0] = p.x; ys[0] = p.y; ks[0] = Math.max(p.y, last);
          for (let i = 1; i <= n; i++) {
            p = path.getPointAtLength(ds * i);
            xs[i] = p.x; ys[i] = p.y;
            ks[i] = Math.max(p.y, ks[i - 1] + (p.y - ys[i - 1] > ds * 0.7 ? PACE_DOWN : PACE_ACROSS) * ds);
          }
          // The footer can only scroll so far: make sure it finishes.
          if (plan.ends && ks[n] > h - 1) {
            const k0 = ks[0], scale = Math.max(0, h - 1 - k0) / (ks[n] - k0);
            for (let i = 0; i <= n; i++) ks[i] = k0 + (ks[i] - k0) * scale;
          }
          last = ks[n];

          const marks: Mark[] = plan.marks.map((m) => {
            const at = { cx: f(m.x), cy: f(m.y), r: nodeR };
            const halo = svgEl('circle', { ...at, class: 'lline-halo' });
            const node = svgEl('circle', { ...at, class: 'lline-node' });
            svg.append(halo, node);
            return { k: m.at === 'start' ? ks[0] : ks[n], node, halo, on: false };
          });
          let label: Piece['label'] = null;
          if (plan.label) {
            const { el, x, y } = plan.label;
            const i = ys.findIndex((yy, j) => Math.abs(yy - y) < 1 && xs[j] >= x - 1);
            label = { el, k: i >= 0 ? ks[i] : ks[n], on: false };
            el.dataset.tap = 'off';
          }
          const tip = svgEl('circle', { cx: xs[0], cy: ys[0], r: 3, class: 'lline-tip' });
          svg.appendChild(tip);
          return { host, path, glow, tip, len, n, ks, marks, label, shown: -1, ends: plan.ends ?? null };
        });
      });
      built = true;
      draw();
    };

    const draw = () => {
      if (!built) return;
      // Near the end of the page the head runs on to the bottom, so the line can finish.
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      const tail = clamp((scrollY - (maxScroll - innerHeight * 0.5)) / (innerHeight * 0.5), 0, 1);
      const target = innerHeight * (TIP_AT + (1 - TIP_AT) * tail);
      let prevDone = true;
      let host: HTMLElement | null = null, top = 0;
      pieces.forEach((p) => {
        if (p.host !== host) {
          host = p.host;
          top = host.getBoundingClientRect().top;
        }
        const live = prevDone;
        const yl = target - top;
        const L = live ? lengthAt(p, yl) : 0;
        prevDone = L >= p.len - 0.5;

        if (Math.abs(L - p.shown) > 0.2) {
          p.path.style.strokeDashoffset = String(p.len - L);
          p.glow.style.strokeDashoffset = String(GLOW - L);
          p.shown = L;
          const drawing = L > 0.5 && L < p.len - 0.5;
          if (drawing) {
            const pt = p.path.getPointAtLength(L);
            p.tip.setAttribute('cx', pt.x.toFixed(1));
            p.tip.setAttribute('cy', pt.y.toFixed(1));
          }
          p.tip.classList.toggle('is-on', drawing);
          p.glow.classList.toggle('is-on', drawing);
        }
        p.marks.forEach((m) => {
          const on = live && L > 0 && yl >= m.k;
          if (on === m.on) return;
          m.on = on;
          m.node.classList.toggle('is-on', on);
          m.halo.classList.toggle('is-on', on);
        });
        if (p.label) {
          const on = live && yl >= p.label.k;
          if (on !== p.label.on) {
            p.label.on = on;
            p.label.el.dataset.tap = on ? 'on' : 'off';
          }
        }
        p.ends?.classList.toggle('is-drawn', L >= p.len - 0.5);
      });
    };

    let t = 0;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(build, 150); };
    // Build once the page's rooms have hydrated (and their pins exist), never before.
    const offReady = onPageReady(build);
    const rebuild = () => { if (built) build(); };
    addEventListener('scroll', draw, { passive: true });
    addEventListener('resize', onResize);
    addEventListener('load', rebuild);
    ScrollTrigger.addEventListener('refresh', rebuild);
    document.fonts?.ready.then(rebuild);

    return () => {
      offReady();
      clearTimeout(t);
      removeEventListener('scroll', draw);
      removeEventListener('resize', onResize);
      removeEventListener('load', rebuild);
      ScrollTrigger.removeEventListener('refresh', rebuild);
      reset();
      built = false;
    };
  }, []);

  return null;
}
