import type { ReactNode, Ref } from 'react';
import { cn } from '@/lib/cn';
import { LineSvg } from './LineSvg';

export type Tone = 'creme' | 'deep' | 'abyss' | 'trench' | 'ink';

const TONES: Record<Tone, string> = {
  creme: 'bg-creme',
  deep: 'bg-creme-deep',
  abyss: 'bg-abyss text-white',
  trench: 'bg-trench text-white',
  ink: 'bg-ink text-white',
};

export const isDark = (tone: Tone) => tone === 'abyss' || tone === 'trench' || tone === 'ink';

type Props = {
  tone?: Tone;
  room: string;
  id?: string;
  className?: string;
  pad?: boolean;
  labelledBy?: string;
  label?: string;
  as?: 'section' | 'footer';
  ref?: Ref<HTMLElement>;
  children: ReactNode;
};

/** A room on the page: its background, its tone, and its stretch of the Lateral Line. */
export function Room({ tone = 'creme', room, id, className, pad = true, labelledBy, label, as: Tag = 'section', ref, children }: Props) {
  return (
    <Tag
      ref={ref as Ref<HTMLElement & HTMLDivElement>}
      id={id}
      data-room={room}
      data-tone={isDark(tone) ? 'dark' : 'light'}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn('relative overflow-x-clip', pad && 'py-[72px] md:py-[clamp(88px,12vh,150px)]', TONES[tone], className)}
    >
      <LineSvg announce={Tag !== 'footer'} />
      {children}
    </Tag>
  );
}
