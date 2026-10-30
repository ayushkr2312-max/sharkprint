'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Arrow } from '@/components/ui/buttons';
import type { Pillar } from '@/components/ui/Icon';
import { useSeen } from '@/components/ui/useSeen';
import { PILLAR_CONTENT } from '@/content/pillars';

/** The foot of a pillar room on the homepage: what we need from you, how long it takes and
 *  what stays yours, taken from the pillar's own page, with the way through to it. The
 *  values rise out of their baselines one after another as it scrolls into view. */
export function Glance({ pillar }: { pillar: Pillar }) {
  const c = PILLAR_CONTENT[pillar];
  const facts: [string, string, string][] = [
    ['From you', ...c.glance.from],
    ...(c.glance.time === false ? [] : [c.workflow.time]),
    ['In your hands', ...c.glance.yours],
  ];
  const name = pillar[0].toUpperCase() + pillar.slice(1);
  const [ref, seen] = useSeen<HTMLDivElement>();

  return (
    <div ref={ref} data-line="foot" data-on={seen.on || undefined} className="glance">
      <dl className="glance-facts">
        {facts.map(([label, value, note], i) => (
          <div key={label} className="glance-fact" style={{ '--i': i } as CSSProperties}>
            <dt className="glance-label">{label}</dt>
            <dd>
              <span className="glance-value"><span>{value}</span></span>
              <span className="glance-note">{note}</span>
            </dd>
          </div>
        ))}
      </dl>
      <Link href={`/${pillar}`} className="glance-go group">
        How {name} works
        <span aria-hidden="true" className="glance-ring"><Arrow /></span>
      </Link>
    </div>
  );
}
