'use client';

import { useId, useState } from 'react';
import { useRoving } from '@/components/ui/useRoving';

/** "How it works": the pillar's steps as a vertical tab list beside a big outlined numeral. */
export function Stepper({ steps, label }: { steps: [string, string, string][]; label: string }) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const item = useRoving(steps.length, index, setIndex);

  return (
    <div className="mt-[clamp(40px,6vh,64px)] grid grid-cols-1 items-start gap-[clamp(28px,5vw,80px)] lg:grid-cols-[minmax(220px,300px)_1fr]">
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2 lg:grid lg:gap-1.5 lg:border-l-2 lg:border-hairline lg:on-dark:border-rule-dark">
        {steps.map(([tab], i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === index}
            aria-controls={`${id}-p${i}`}
            onClick={() => setIndex(i)}
            {...item(i)}
            className="label min-h-11 rounded-full border border-hairline px-4 text-left font-semibold text-muted transition-colors duration-200 hover:text-ink aria-selected:border-strike aria-selected:text-strike on-dark:border-rule-dark on-dark:text-fog/70 on-dark:hover:text-white on-dark:aria-selected:border-mist on-dark:aria-selected:text-mist lg:-ml-0.5 lg:min-h-12 lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:px-[18px] lg:on-dark:border-transparent lg:aria-selected:border-strike lg:on-dark:aria-selected:border-mist"
          >
            {tab}
          </button>
        ))}
      </div>
      {steps.map(([, title, body], i) => (
        <div key={title} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={i !== index} className="grid max-w-[34em] gap-3.5">
          <p aria-hidden="true" className="stroke-numeral font-display text-[clamp(80px,10vw,150px)] leading-[.8] font-extrabold tracking-[-0.04em]">
            {String(i + 1).padStart(2, '0')}
          </p>
          <h3 className="font-display text-h3 font-bold">{title}</h3>
          <p className="text-lead text-ink-60 on-dark:text-fog">{body}</p>
        </div>
      ))}
    </div>
  );
}
