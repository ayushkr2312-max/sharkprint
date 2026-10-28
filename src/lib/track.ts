// Analytics events from the concept's build notes: demo_interact (scrub, drag,
// switch…). Pushed to the dataLayer so any tag manager can pick them up.

type Payload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Payload[];
  }
}

export function track(event: string, data: Payload = {}) {
  (window.dataLayer = window.dataLayer || []).push({ event, ...data });
}

const sent = new Set<string>();

/** Fire a demo_interact event at most once per page view for a given key. */
export function trackOnce(key: string, data: Payload) {
  const id = location.pathname + '|' + key;
  if (sent.has(id)) return;
  sent.add(id);
  track('demo_interact', data);
}
