import type Lenis from 'lenis';

// The one Lenis instance, owned by <SmoothScroll /> in the root layout.
let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { lenis = l; };
export const getLenis = () => lenis;

/** The visible match for a selector: Next keeps recently visited routes in the DOM,
 *  hidden, so ids like #engine can exist twice. */
export function findVisible(selector: string) {
  try {
    return Array.from(document.querySelectorAll<HTMLElement>(selector)).find((el) => el.getClientRects().length > 0) ?? null;
  } catch {
    return null;
  }
}

export function scrollToTarget(target: string | Element, immediate = false) {
  const el = typeof target === 'string' ? findVisible(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, immediate, duration: 1.4 });
  else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
}

export function lockScroll(on: boolean) {
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = on ? 'hidden' : '';
}
