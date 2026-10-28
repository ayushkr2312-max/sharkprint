import { useSyncExternalStore } from 'react';

/** A tiny shared value, for state that crosses sections (the Engine volume selector
 *  in the room drives the calendar, which lives further down on the pillar page). */
export function createStore<T>(initial: T) {
  let value = initial;
  const subs = new Set<() => void>();
  return {
    get: () => value,
    set(next: T) {
      if (next === value) return;
      value = next;
      subs.forEach((fn) => fn());
    },
    subscribe(fn: () => void) {
      subs.add(fn);
      return () => { subs.delete(fn); };
    },
  };
}

export function useStore<T>(store: ReturnType<typeof createStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

export type Volume = '30' | '60' | '120' | 'inf';
export const engineVolume = createStore<Volume>('120');
