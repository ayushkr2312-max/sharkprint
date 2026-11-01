'use client';

import type { CSSProperties } from 'react';
import { useSeen } from '@/components/ui/useSeen';
import type { Phase } from '@/content/business';

/** A process as a line of stages, each with what it hands over. The line draws across and
 *  the stages land one after another as it scrolls into view; on phones it runs down. */
export function Phases({ phases, label }: { phases: Phase[]; label: string }) {
  const [ref, seen] = useSeen<HTMLOListElement>();
  return (
    <ol ref={ref} data-on={seen.on || undefined} aria-label={label} className="phases" style={{ '--n': phases.length } as CSSProperties}>
      {phases.map((p, i) => (
        <li key={p.title} style={{ '--i': i } as CSSProperties}>
          <span aria-hidden="true" className="phases-dot" />
          <p className="phases-when">{p.when}</p>
          <h3 className="font-display text-[clamp(22px,2vw,28px)] leading-tight font-bold">{p.title}</h3>
          <p className="phases-body">{p.body}</p>
          <p className="phases-get"><span>You get</span>{p.get}</p>
        </li>
      ))}
    </ol>
  );
}
