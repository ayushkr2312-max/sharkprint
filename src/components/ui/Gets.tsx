import { cn } from '@/lib/cn';

/** A deliverables list: title + one plain-language line each. */
export function Gets({ items, className }: { items: [string, string][]; className?: string }) {
  return (
    <ul className={cn('grid gap-x-7 gap-y-[22px] sm:grid-cols-2', className)}>
      {items.map(([title, line]) => (
        <li key={title} className="grid gap-1 border-t border-hairline pt-3.5 on-dark:border-rule-dark">
          <strong className="font-display text-[18px] font-semibold tracking-[-0.01em]">{title}</strong>
          <span className="text-[15px] text-ink-60 on-dark:text-fog">{line}</span>
        </li>
      ))}
    </ul>
  );
}
