// Next hydrates the root layout before the page, so layout-level systems (the Lateral
// Line, reveals) must not touch page DOM until the page's own effects have run.
// Each room's <LineSvg> announces itself after hydrating; listeners batch to one frame.

const EVENT = 'sp:page-ready';

export function announcePageReady() {
  window.dispatchEvent(new Event(EVENT));
}

export function onPageReady(cb: () => void) {
  let raf = 0;
  const handler = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(cb);
  };
  window.addEventListener(EVENT, handler);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener(EVENT, handler);
  };
}
