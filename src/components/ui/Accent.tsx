'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** What a headline's accent does as it comes into view, each drawn from what it says. */
export type Touch = 'tape' | 'clip' | 'scan' | 'screen' | 'forge' | 'orbit' | 'check' | 'pick' | 'route';

/** The second voice in a headline: set in Michroma, the wordmark's face, in Strike. With a
 *  touch it plays one small act as the heading scrolls in (globals.css, "Accents"). */
export function Accent({ touch, className, children }: { touch?: Touch; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!touch) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setOn(true);
      io.disconnect();
    }, { rootMargin: '0px 0px -16% 0px' });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [touch]);

  return (
    <em ref={ref} data-touch={touch} data-on={touch ? on : undefined} className={cn('acc text-strike on-dark:text-mist', className)}>
      <span className="acc-txt">{children}</span>
      {touch === 'clip' && (
        <>
          <span aria-hidden="true" className="acc-br acc-br--l" />
          <span aria-hidden="true" className="acc-br acc-br--r" />
        </>
      )}
      {touch === 'scan' && (
        <>
          <span aria-hidden="true" className="acc-frame" />
          <span aria-hidden="true" className="acc-sweep" />
        </>
      )}
      {touch === 'screen' && <span aria-hidden="true" className="acc-screen" />}
      {touch === 'orbit' && (
        <span aria-hidden="true" className="acc-ring">
          <span className="acc-orbx"><i /></span>
        </span>
      )}
      {touch === 'check' && (
        <span aria-hidden="true" className="acc-check">
          <svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" /></svg>
        </span>
      )}
      {touch === 'route' && (
        <>
          <span aria-hidden="true" className="acc-route" />
          <span aria-hidden="true" className="acc-dot" />
        </>
      )}
    </em>
  );
}
