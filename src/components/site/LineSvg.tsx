'use client';

import { useEffect } from 'react';
import { announcePageReady } from '@/lib/page-ready';

/** The room's piece of the Lateral Line. <LateralLine> draws into it, but only after
 *  the page's rooms have hydrated and said so. The footer's piece lives in the layout,
 *  which hydrates before the page, so it never speaks for the page. */
export function LineSvg({ announce = true }: { announce?: boolean }) {
  useEffect(() => { if (announce) announcePageReady(); }, [announce]);
  return <svg className="lline" aria-hidden="true" focusable="false" />;
}
