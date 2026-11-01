'use client';

import { useId, useState, type ReactNode } from 'react';
import { useRoving } from '@/components/ui/useRoving';
import type { Service } from '@/content/business';
import { trackOnce } from '@/lib/track';

/** The service tour on the pages we send to schools and businesses: one tab per service,
 *  each opening onto what it is, what you get, and the real screen it produces. */
export function Explorer({ services, visuals, label }: { services: Service[]; visuals: Record<string, ReactNode>; label: string }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const select = (i: number) => {
    setIndex(i);
    trackOnce('explorer-' + label, { type: 'tab', room: label });
  };
  const item = useRoving(services.length, index, select);

  return (
    <div className="explorer">
      <div role="tablist" aria-label={label} className="explorer-tabs">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === index}
            aria-controls={`${id}-p${i}`}
            onClick={() => select(i)}
            {...item(i)}
            className="explorer-tab"
          >
            <span className="explorer-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="grid gap-0.5">
              <b>{s.tab}</b>
              <small>{s.tag}</small>
            </span>
          </button>
        ))}
      </div>
      {services.map((s, i) => (
        <div key={s.id} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={i !== index} className="explorer-panel">
          <div className="grid content-start gap-5">
            <h3 className="font-display text-[clamp(28px,2.8vw,40px)] leading-[1.05] font-bold tracking-[-0.02em] text-balance text-white">{s.title}</h3>
            <p className="text-[17px] text-pretty text-fog">{s.body}</p>
            <div>
              <p className="mb-2 text-[13px] font-semibold text-mist">What you get</p>
              <ul className="border-t border-rule-dark">
                {s.gets.map((g) => (
                  <li key={g} className="flex gap-3 border-b border-rule-dark py-3 text-[15.5px] text-white">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 size-4 flex-none text-current-blue"><path d="M3 8.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="explorer-visual">{visuals[s.id]}</div>
        </div>
      ))}
    </div>
  );
}
