import type { Sample } from '@/content/pillars';
import { cn } from '@/lib/cn';
import { Asset } from './Asset';
import { DragRail } from './DragRail';

const WIDTH: Record<NonNullable<Sample['size']> | 'default', string> = {
  default: 'w-[76vw] md:w-[520px]',
  tall: 'w-[52vw] md:w-[220px]',
  wide: 'w-[86vw] md:w-[680px]',
  report: 'w-[76vw] md:w-[330px]',
  square: 'w-[76vw] md:w-[420px]',
};

/** Real artefacts on an inertia rail: clips, reports, dashboards, sites. */
export function SampleRail({ items, label, className }: { items: Sample[]; label: string; className?: string }) {
  return (
    <DragRail label={label} className={cn('mt-[clamp(32px,5vh,56px)]', className)}>
      {items.map((s) => (
        <figure key={s.src} className={cn('grid gap-3', WIDTH[s.size ?? 'default'])}>
          <Asset src={s.src} label={s.label} className={s.size === 'tall' ? '' : 'overflow-hidden rounded-[18px]'} />
          <figcaption className="label text-[12px] font-semibold text-muted on-dark:text-mist">{s.caption}</figcaption>
        </figure>
      ))}
    </DragRail>
  );
}
