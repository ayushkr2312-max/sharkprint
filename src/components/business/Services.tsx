import type { ReactNode } from 'react';
import { SERVICES } from '@/content/business';
import { AuditThumb, BookingThumb, DashThumb, NoteThumb, ReelThumb } from './Mocks';

const THUMBS: Record<string, ReactNode> = {
  dashboard: <DashThumb />,
  web: <BookingThumb />,
  content: <ReelThumb />,
  market: <NoteThumb />,
  efficiency: <AuditThumb />,
};

/** All five services at once: the reporting card runs wide, the rest sit in a row under it,
 *  each with a small piece of what it produces and what you get. */
export function Services() {
  return (
    <ol className="bento">
      {SERVICES.map((s, i) => (
        <li key={s.id} id={`svc-${s.id}`} data-reveal="" className="bento-card" data-wide={i === 0 || undefined}>
          <div aria-hidden="true" className="bento-visual">{THUMBS[s.id]}</div>
          <div className="grid content-start gap-3">
            <p className="text-[13px] font-semibold text-mist">{String(i + 1).padStart(2, '0')} · {s.tab}</p>
            <h3 className="font-display text-[clamp(22px,2vw,28px)] leading-[1.08] font-bold text-balance text-white">{s.title}</h3>
            <ul className="grid gap-1.5">
              {s.gets.slice(0, i === 0 ? 4 : 3).map((g) => (
                <li key={g} className="flex gap-2.5 text-[15px] text-fog">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 size-3.5 flex-none text-current-blue"><path d="M3 8.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
