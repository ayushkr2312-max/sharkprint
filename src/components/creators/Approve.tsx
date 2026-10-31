'use client';

import { useState, type CSSProperties } from 'react';
import { Asset } from '@/components/ui/Asset';
import { QUEUE } from '@/content/creators';
import { trackOnce } from '@/lib/track';

type Call = 'post' | 'skip' | null;

/** The approval queue, on a phone: each clip waits on top of the stack. Post it and it
 *  flies off to its feed, skip it and it slides away, and the next one steps up. */
export function Approve() {
  const [calls, setCalls] = useState<Call[]>(() => QUEUE.map(() => null));
  const current = calls.indexOf(null);
  const left = calls.filter((c) => c === null).length;
  const posted = calls.filter((c) => c === 'post').length;
  const decide = (c: Exclude<Call, null>) => {
    setCalls((cs) => cs.map((v, i) => (i === current ? c : v)));
    trackOnce('approve', { type: 'approve', room: 'creators' });
  };
  const clip = current >= 0 ? QUEUE[current] : null;

  return (
    <div className="phone" role="group" aria-label="Your approval queue (sample clips)">
      <p className="phone-top">
        <span>Clips to approve</span>
        <b>{left}</b>
      </p>
      <div className="phone-deck">
        {QUEUE.map((q, i) => (
          <div
            key={q.src}
            aria-hidden={i !== current}
            data-out={calls[i] ?? undefined}
            className="phone-card"
            style={{ '--d': Math.max(i - (current < 0 ? QUEUE.length : current), 0), zIndex: QUEUE.length - i } as CSSProperties}
          >
            <Asset src={q.src} label={q.label} />
          </div>
        ))}
        {!clip && (
          <div className="phone-done">
            <svg viewBox="0 0 28 28" aria-hidden="true" className="offer-tick"><circle cx="14" cy="14" r="14" /><path d="M8.5 14.5l3.8 3.8 7.4-8" /></svg>
            <p className="font-display text-[22px] font-bold">All caught up</p>
            <button type="button" onClick={() => setCalls(QUEUE.map(() => null))} className="text-[14px] font-semibold text-strike underline underline-offset-4">
              Run it again
            </button>
          </div>
        )}
      </div>
      <p className="phone-info" aria-live="polite">
        {clip ? (
          <>
            <b>{clip.title}</b>
            <span>{clip.from} · {clip.slot}</span>
          </>
        ) : (
          <>
            <b>{posted} posting, {QUEUE.length - posted} skipped</b>
            <span>Each goes out on its feed and time.</span>
          </>
        )}
      </p>
      <div className="phone-actions">
        <button type="button" disabled={!clip} onClick={() => decide('skip')} className="phone-btn">Skip</button>
        <button type="button" disabled={!clip} onClick={() => decide('post')} className="phone-btn phone-btn--post">Post it</button>
      </div>
    </div>
  );
}
