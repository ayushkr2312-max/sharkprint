import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

const SIZE = {
  sm: 'h-10 gap-2 px-4 text-[14px]',
  md: 'h-12 gap-2.5 px-6 text-[15px]',
  lg: 'h-[54px] gap-2.5 px-7 text-[15.5px]',
};

const VARIANT = {
  strike:
    'bg-strike text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_12px_26px_-16px_rgba(36,87,245,.95)] hover:bg-strike-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_16px_32px_-14px_rgba(36,87,245,1)]',
  ink: 'bg-ink text-paper hover:bg-[#1c2030]',
  paper: 'bg-paper text-ink hover:bg-white',
  ghost: 'border border-ink/15 bg-paper/60 text-ink hover:border-ink/45 hover:bg-paper',
};

export function btn(variant: keyof typeof VARIANT = 'strike', size: keyof typeof SIZE = 'md', className?: string) {
  return cn(
    'group relative inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold leading-none tracking-[-0.01em] no-underline transition-[background-color,color,border-color,box-shadow] duration-300 ease-out-expo will-change-transform',
    SIZE[size],
    VARIANT[variant],
    className,
  );
}

/** A small arrow that nudges toward where the button goes. */
export function Arrow({ dir = 'right', className }: { dir?: 'right' | 'down'; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={cn(
        'size-[15px] flex-none transition-[translate] duration-300 ease-out-expo',
        dir === 'right' ? 'group-hover:translate-x-[3px]' : 'group-hover:translate-y-[3px]',
        className,
      )}
    >
      <path
        d={dir === 'right' ? 'M2.5 8h10M9 4l4 4-4 4' : 'M8 2.5v10M4 9l4 4 4-4'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: keyof typeof VARIANT;
  size?: keyof typeof SIZE;
  arrow?: 'right' | 'down';
  className?: string;
  children: ReactNode;
};

/** A magnetic CTA. The inner span is the label, which trails the pull slightly. */
export function ButtonLink({ variant, size, arrow, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={btn(variant, size, className)} data-magnetic="" {...rest}>
      <span className="pointer-events-none inline-flex items-center gap-[inherit]">
        {children}
        {arrow && <Arrow dir={arrow} />}
      </span>
    </Link>
  );
}

export function LinkArrow({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      data-magnetic=""
      className={cn(
        'group inline-flex min-h-11 items-center gap-2 self-start border-b border-current/40 pb-1 font-semibold text-strike no-underline transition-colors duration-300 hover:border-current hover:text-ink on-dark:text-mist on-dark:hover:text-white',
        className,
      )}
    >
      <span className="pointer-events-none inline-flex items-center gap-2">
        {String(children).replace(/\s*→\s*$/, '')}
        <Arrow />
      </span>
    </Link>
  );
}

export const iconBtn =
  'inline-grid size-11 place-items-center rounded-full border border-hairline bg-paper text-[18px] text-ink transition-colors duration-300 hover:border-ink/40 on-dark:border-mist/35 on-dark:bg-transparent on-dark:text-white on-dark:hover:border-mist';
