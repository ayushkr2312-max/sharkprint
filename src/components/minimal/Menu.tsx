'use client';

import { useEffect, useRef, useState } from 'react';

/** The section menu on screens too narrow for the nav's links: a sheet that drops under the
 *  nav. A link, Esc, a tap outside or widening the screen closes it. */
export function Menu({ links }: { links: [string, string][] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // On window, in the capture phase: the smooth-scroll handler stops in-page link clicks
    // there, but listeners on the same target still hear them.
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest('.menu__sheet a') || !root.current?.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const wide = matchMedia('(min-width: 60.01rem)');
    const onWide = () => { if (wide.matches) setOpen(false); };
    window.addEventListener('click', onClick, true);
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <div ref={root} className="menu">
      <button type="button" className="menu__btn" aria-expanded={open} aria-controls="menu-sheet" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Menu'}
        <span aria-hidden="true" className="ticks"><i /><i /><i /><i /></span>
      </button>
      <nav id="menu-sheet" aria-label="Sections" className="menu__sheet" data-open={open ? '' : undefined} inert={!open}>
        <ul>
          {links.map(([label, href], n) => (
            <li key={href} style={{ '--i': n } as React.CSSProperties}><a href={href}><span>{String(n + 1).padStart(2, '0')}</span>{label}</a></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
