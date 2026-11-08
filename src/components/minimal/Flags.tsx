'use client';

import { useLayoutEffect } from 'react';

/** Re-applies what the head script put on <html> (the js flag, the saved page mode) once React
 *  has mounted. On Netlify a script is injected after </html>; the browser moves it into <body>,
 *  React finds a node it didn't render, re-renders the whole page and resets <html>, dropping
 *  both. Without the flag the portal can't stack the statement behind the hero, and the screen
 *  goes blank between them. Rendered first in <body>, so this runs before anything that
 *  measures. */
export function Flags() {
  useLayoutEffect(() => {
    const d = document.documentElement;
    d.classList.add('js');
    try {
      const m = localStorage.getItem('mode');
      if (m === 'light' || m === 'dark') d.dataset.mode = m;
    } catch { /* storage blocked */ }
  }, []);
  return null;
}
