import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

// The type voices: Saira display, one Michroma accent per headline in Strike (see
// Accent), DM Sans body, JetBrains Mono labels.
// Eyebrow, Heading and Lead reveal together as a staggered group (see Behaviours).

type Reveal = { reveal?: boolean };

/** The room's mono label. The Lateral Line places that room's marker beside it. */
export function Eyebrow({ className, children, reveal = true, ...rest }: ComponentPropsWithoutRef<'p'> & Reveal) {
  return (
    <p data-eyebrow="" data-reveal={reveal ? '' : undefined} className={cn('label font-semibold text-strike on-dark:text-mist', className)} {...rest}>
      {children}
    </p>
  );
}

export { Accent } from './Accent';

export function Lead({ className, children, reveal = true, ...rest }: ComponentPropsWithoutRef<'p'> & Reveal) {
  return (
    <p data-reveal={reveal ? '' : undefined} className={cn('max-w-[34em] text-pretty text-lead text-ink-60 on-dark:text-fog', className)} {...rest}>
      {children}
    </p>
  );
}

const SIZES = {
  mega: 'text-mega',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
} as const;

type HeadingProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof SIZES;
  reveal?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Heading<T extends ElementType = 'h2'>({ as, size = 'h1', reveal = true, className, children, ...rest }: HeadingProps<T>) {
  const Tag = (as || 'h2') as ElementType;
  return (
    <Tag className={cn('text-balance font-display font-bold', SIZES[size], className)} data-reveal={reveal ? '' : undefined} {...rest}>
      {children}
    </Tag>
  );
}

export function Micro({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-[15px] italic text-ink-60 on-dark:text-fog', className)}>{children}</p>;
}
