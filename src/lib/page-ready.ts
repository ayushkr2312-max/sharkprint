// Next hydrates the root layout before the page, so layout-level systems (the Lateral
// Line, reveals) must not touch page DOM until the page's own effects have run.
// Each room's <LineSvg> announces itself after hydrating; listeners batch to one frame.
//
// The order isn't guaranteed: if hydration fails (a host that injects markup, like
// Netlify's comment in <head>, makes React render the whole page on the client), the
// page's effects run before the layout's, and the first announcement goes out before
// anyone is listening. So the announcement is remembered: a late listener runs at once.
// Every listener is safe to run again; each page announces afresh as it mounts.

const EVENT = 'sp:page-ready';
let announced = false;

export function announcePageReady() {
  announced = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onPageReady(cb: () => void) {
  let raf = 0;
  const handler = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(cb);
  };
  window.addEventListener(EVENT, handler);
  if (announced) handler();
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener(EVENT, handler);
  };
}
