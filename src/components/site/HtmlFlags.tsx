'use client';

import { useEffect, useLayoutEffect } from 'react';

declare global {
  interface Window {
    __spVisit?: 'first' | 'returning';
  }
}

// Runs synchronously in <head>, before first paint:
//  data-js      → JS-dependent CSS (reveals, hero intro) may hide things it will animate in
//  data-visit   → first visit gets the preloader, returning visits a 300ms line wipe
export const FLAGS_SCRIPT = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{var v=sessionStorage.getItem('sp_seen')?'returning':'first';window.__spVisit=v;d.setAttribute('data-visit',v);}catch(e){window.__spVisit='returning';d.setAttribute('data-visit','returning');}})();`;

/** Re-applies the flags after React mounts: in development Strict Mode remounts
 *  <html> and resets attributes the inline script set. */
export function HtmlFlags() {
  useLayoutEffect(() => {
    const d = document.documentElement;
    d.setAttribute('data-js', '');
    d.setAttribute('data-visit', window.__spVisit || 'returning');
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem('sp_seen', '1'); } catch { /* private mode */ }
  }, []);

  return null;
}
