import type { CSSProperties, ReactNode } from 'react';
import { TOOLS } from '@/content/creators';
import { cn } from '@/lib/cn';

const Play = () => <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 text-white"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>;
const Line = ({ className, children }: { className?: string; children: ReactNode }) => (
  <span className={cn('flex items-center justify-between gap-3 text-[13px]', className)}>{children}</span>
);

// A glimpse of each tool as it looks in the hub (sample numbers and names).
const GLIMPSE: Record<string, ReactNode> = {
  clips: (
    <span className="flex items-end gap-2">
      {['bg-strike', 'bg-trench', 'bg-navy'].map((bg) => (
        <span key={bg} className={cn('grid h-[74px] w-[42px] place-items-center rounded-[8px]', bg)}><Play /></span>
      ))}
      <span className="ml-1 grid leading-tight"><b className="font-display text-[26px] font-bold">6</b><span className="text-[12.5px] text-ink-60">waiting for you</span></span>
    </span>
  ),
  schedule: (
    <span className="grid gap-1.5">
      <Line className="rounded-[9px] bg-ice px-2.5 py-2 text-strike"><b>Tue 20:00</b><span>Ranked grind</span></Line>
      <Line className="px-2.5 py-1"><b>Thu 20:00</b><span className="text-ink-60">Viewer games</span></Line>
      <Line className="px-2.5 py-1"><b>Sun 18:00</b><span className="text-ink-60">Community night</span></Line>
    </span>
  ),
  long: (
    <span className="grid gap-2">
      <span className="relative grid h-[58px] place-items-center rounded-[8px] bg-abyss font-display text-[15px] font-bold text-white">Week 44 highlights</span>
      <span className="h-1.5 overflow-hidden rounded-full bg-creme-deep"><span className="block h-full w-[72%] rounded-full bg-strike" /></span>
      <Line><span className="text-ink-60">Rendering</span><b>11:40</b></Line>
    </span>
  ),
  look: (
    <span className="grid gap-2.5">
      <span className="flex gap-1.5">{['bg-strike', 'bg-ink', 'bg-mist', 'bg-creme-deep', 'bg-signal'].map((c) => <span key={c} className={cn('size-7 rounded-full border border-black/5', c)} />)}</span>
      <span className="relative h-[46px] rounded-[8px] border border-hairline bg-creme">
        <span className="absolute right-2 bottom-2 h-[26px] w-[40px] rounded-[5px] border-2 border-strike" />
        <span className="absolute bottom-2 left-2 h-2 w-16 rounded-full bg-ink/80" />
      </span>
    </span>
  ),
  kit: (
    <span className="grid gap-1">
      <b className="font-display text-[30px] leading-none font-bold">48.2K</b>
      <span className="text-[13px] text-ink-60">followers, updated today</span>
      <span className="mt-2 inline-flex h-8 items-center justify-self-start rounded-full bg-ink px-3.5 text-[12.5px] font-semibold text-paper">Send to a brand</span>
    </span>
  ),
  deals: (
    <span className="grid gap-1.5">
      <Line className="rounded-[9px] border border-hairline bg-white px-2.5 py-2"><b>Volt Energy</b><span className="rounded-full bg-ice px-2 py-0.5 text-[11.5px] font-semibold text-strike">Agreed</span></Line>
      <Line className="px-2.5 py-1"><span className="text-ink-60">Short due</span><b>Fri</b></Line>
      <Line className="px-2.5 py-1"><span className="text-ink-60">Invoice</span><b>Sent</b></Line>
    </span>
  ),
  numbers: (
    <span className="grid gap-2">
      <span className="flex h-[54px] items-end gap-1.5">
        {[38, 52, 44, 66, 58, 82, 100].map((h, i) => <span key={i} className={cn('flex-1 rounded-t-[4px]', i === 6 ? 'bg-strike' : 'bg-mist')} style={{ height: h + '%' }} />)}
      </span>
      <Line><span className="text-ink-60">This week</span><b className="text-strike">+1.2K followers</b></Line>
    </span>
  ),
  community: (
    <span className="grid gap-2">
      <span className="text-[12.5px] font-semibold text-muted">#live</span>
      <span className="rounded-[10px] rounded-tl-[3px] bg-white px-3 py-2 text-[13px] shadow-[0_0_0_1px_var(--color-hairline)]"><b>Kairo is live:</b> Ranked grind</span>
      <Line><span className="text-ink-60">Members</span><b>1,240</b></Line>
    </span>
  ),
  trends: (
    <span className="grid gap-2">
      <span className="text-[12.5px] font-semibold text-muted">Rising in Valorant</span>
      <span className="flex flex-wrap gap-1.5">
        {['1v1 challenges', 'Tier lists', 'Clutch reacts'].map((t) => <span key={t} className="rounded-full border border-hairline bg-white px-2.5 py-1 text-[12.5px] font-medium">{t}</span>)}
      </span>
    </span>
  ),
};

/** Everything around the stream, in one hub: each tool with a glimpse of how it looks. */
export function Hub() {
  return (
    <figure className="hub" aria-label="The creator hub: nine tools around the stream. Names and numbers are fictional examples.">
      <div className="hub-bar">
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-[10px] bg-strike font-display text-[17px] font-bold text-white">K</span>
        <span className="grid leading-tight">
          <b className="font-display text-[18px] font-bold">Kairo’s hub</b>
          <span className="text-[13px] text-ink-60">Everything around the stream</span>
        </span>
        <span className="ml-auto flex items-center gap-2 text-[13px] font-semibold text-ink-60 max-sm:hidden"><i className="size-2 rounded-full bg-signal" />Synced 2 min ago</span>
      </div>
      <ul className="hub-grid">
        {TOOLS.map((t, i) => (
          <li key={t.id} data-reveal="" className="hub-cell" style={{ '--i': i } as CSSProperties}>
            <span aria-hidden="true" className="hub-glimpse">{GLIMPSE[t.id]}</span>
            <h3 className="font-display text-[20px] leading-tight font-bold tracking-[-0.01em]">{t.title}</h3>
            <p className="text-[15px] text-ink-60">{t.line}</p>
          </li>
        ))}
      </ul>
    </figure>
  );
}
