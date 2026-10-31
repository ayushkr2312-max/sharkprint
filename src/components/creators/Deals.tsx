'use client';

import type { CSSProperties } from 'react';
import { useSeen } from '@/components/ui/useSeen';
import { DEALS } from '@/content/creators';

/** Brand deals from brief to payout, as four columns. The cards land column by column
 *  as the board scrolls into view. */
export function Deals() {
  const [ref, seen] = useSeen<HTMLOListElement>();
  let n = 0;
  return (
    <ol ref={ref} data-on={seen.on || undefined} className="deals" aria-label="Brand deals by stage (fictional examples)">
      {DEALS.map((col) => (
        <li key={col.stage} className="deals-col">
          <p className="deals-stage">{col.stage}<span>{col.items.length}</span></p>
          <ul className="grid gap-2.5">
            {col.items.map(([brand, what, next]) => (
              <li key={brand + what} className="deals-card" style={{ '--i': n++ } as CSSProperties}>
                <b className="font-display text-[17px] leading-tight font-bold">{brand}</b>
                <span className="text-[14px] text-ink-60">{what}</span>
                <span className="deals-next">{next}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
