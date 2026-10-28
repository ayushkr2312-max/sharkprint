'use client';

import { useEffect } from 'react';
import { announcePageReady } from '@/lib/page-ready';

/** The room's piece of the Lateral Line. <LateralLine> draws into it, but only after
 *  this has hydrated and said so. */
export function LineSvg() {
  useEffect(() => { announcePageReady(); }, []);
  return <svg className="lline" aria-hidden="true" focusable="false" />;
}
