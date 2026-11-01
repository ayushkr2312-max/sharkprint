'use client';

import { useId, useState, type ReactNode } from 'react';
import { useRoving } from '@/components/ui/useRoving';
import { trackOnce } from '@/lib/track';

const WAYS = ['The old way', 'The Sharkprint way'];

/** One job shown two ways: how it runs in most orgs today, and how it runs with Sharkprint.
 *  Opens on the Sharkprint way; the other is a tap away to compare. */
export function OldNew({ label, old, next }: { label: string; old: ReactNode; next: ReactNode }) {
  const [way, setWay] = useState(1);
  const id = useId();
  const select = (i: number) => {
    setWay(i);
    trackOnce('oldnew-' + label, { type: 'oldnew', room: label });
  };
  const item = useRoving(WAYS.length, way, select);

  return (
    <div className="oldnew" data-way={way ? 'new' : 'old'}>
      <div role="tablist" aria-label={label} className="oldnew-tabs">
        {WAYS.map((w, i) => (
          <button key={w} type="button" role="tab" id={`${id}-t${i}`} aria-selected={i === way} aria-controls={`${id}-p${i}`} onClick={() => select(i)} {...item(i)} className="oldnew-tab">
            {w}
          </button>
        ))}
      </div>
      {[old, next].map((panel, i) => (
        <div key={i} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={i !== way} className="oldnew-panel">
          {panel}
        </div>
      ))}
    </div>
  );
}
