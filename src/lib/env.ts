// Client-side environment checks. Only call these from effects or event handlers.

export const isMobile = () => matchMedia('(max-width: 767px)').matches;
export const isFinePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

export const MOBILE_QUERY = '(max-width: 767px)';

export function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Small seeded random so generated layouts are stable between visits. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export function svgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const m = svg.getScreenCTM();
  if (!m) return null;
  const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
  return { x: p.x, y: p.y };
}

export function onceInView(el: Element, cb: () => void, rootMargin = '100px') {
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      cb();
    }
  }, { rootMargin });
  io.observe(el);
  return () => io.disconnect();
}

export function inView(el: Element, cb: (on: boolean) => void, rootMargin = '100px') {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => cb(e.isIntersecting)), { rootMargin });
  io.observe(el);
  return () => io.disconnect();
}
