'use client';

import { useEffect, useRef, useState } from 'react';

/** `on` turns true the first time the element scrolls into view (to play an entrance);
 *  `live` is true only while it's on screen (to run loops only when someone can see them). */
export function useSeen<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState({ on: false, live: false });

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      setSeen((s) => ({ on: s.on || e.isIntersecting, live: e.isIntersecting }));
    }, { rootMargin });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, seen] as const;
}
