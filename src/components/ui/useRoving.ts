'use client';

import { useRef, type KeyboardEvent } from 'react';

/** Arrow-key navigation for radio groups and tab lists: arrows move and select,
 *  Home/End jump, only the selected item is in the tab order. */
export function useRoving(count: number, index: number, select: (i: number) => void) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  const onKeyDown = (i: number) => (e: KeyboardEvent) => {
    let n: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % count;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + count) % count;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = count - 1;
    if (n === null) return;
    e.preventDefault();
    select(n);
    refs.current[n]?.focus();
  };

  const item = (i: number) => ({
    ref: (el: HTMLElement | null) => { refs.current[i] = el; },
    tabIndex: i === index ? 0 : -1,
    onKeyDown: onKeyDown(i),
  });

  return item;
}
