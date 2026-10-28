'use client';

import { useRef } from 'react';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { Icon, PILLARS, type Pillar } from '@/components/ui/Icon';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';
import { gsap, useGSAP } from '@/lib/gsap';

const TOOLS: { label: string; to: Pillar; x: string; y: string; r: number; c: string }[] = [
  { label: 'roster_final_v7.xlsx', to: 'intel', x: '2%', y: '12%', r: -6, c: '#7B808C' },
  { label: 'Sponsor DMs (43)', to: 'command', x: '50%', y: '6%', r: 5, c: '#E4705A' },
  { label: 'Who paid for this?', to: 'command', x: '8%', y: '30%', r: 4, c: '#5E8BFF' },
  { label: 'Canva · 3 seats', to: 'forge', x: '55%', y: '27%', r: -7, c: '#7B808C' },
  { label: 'Clip ideas.txt', to: 'engine', x: '0%', y: '48%', r: -3, c: '#E4705A' },
  { label: 'Scrim sheet (old)', to: 'intel', x: '48%', y: '46%', r: 8, c: '#5E8BFF' },
  { label: 'Bot broke again', to: 'forge', x: '10%', y: '66%', r: 6, c: '#7B808C' },
  { label: 'Notion?', to: 'command', x: '62%', y: '64%', r: -5, c: '#E4705A' },
  { label: 'Invoices / misc', to: 'command', x: '2%', y: '84%', r: -4, c: '#5E8BFF' },
  { label: 'VODs to cut: 19', to: 'engine', x: '50%', y: '82%', r: 3, c: '#7B808C' },
];

const SYS_BG: Record<Pillar, string> = { engine: 'bg-strike', intel: 'bg-navy', command: 'bg-trench', forge: 'bg-abyss' };

/** 02 The Grind (concept p.12): pins for ~150vh; scroll magnetises each tool into the
 *  pillar that fixes it and the status dots light up in sequence. */
export function Grind() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const sec = ref.current!;
    const q = gsap.utils.selector(sec);

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const sys = Object.fromEntries(q('[data-sys]').map((el) => [el.getAttribute('data-sys'), el])) as Record<Pillar, HTMLElement>;
      const center = (el: Element) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
      const arrive: Partial<Record<Pillar, number>> = {};
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top top', end: '+=150%', pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      // Each tool glides to the pillar that fixes it, fades only at the end of its path,
      // and the pillar answers with a small pulse as it lands.
      q('[data-tool]').forEach((t, i) => {
        const to = t.getAttribute('data-tool') as Pillar;
        const at = 0.1 + i * 0.07;
        tl.to(t, {
          x: () => center(sys[to]).x - center(t).x - 70,
          y: () => center(sys[to]).y - center(t).y,
          rotation: 0, scale: 0.62, duration: 0.46, ease: 'power2.inOut',
        }, at)
          .to(t, { opacity: 0, duration: 0.12, ease: 'power1.in' }, at + 0.36)
          .to(sys[to], { scale: 1.035, duration: 0.05, yoyo: true, repeat: 1, ease: 'power1.inOut' }, at + 0.42);
        arrive[to] = Math.max(arrive[to] || 0, at + 0.46);
      });
      tl.to({}, { duration: 0.15 });
      tl.eventCallback('onUpdate', () => {
        const t = tl.time();
        PILLARS.forEach((p) => sys[p].setAttribute('data-lit', String(t >= (arrive[p] || 0))));
      });
      return () => PILLARS.forEach((p) => sys[p].setAttribute('data-lit', 'false'));
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <Room ref={ref} tone="deep" room="grind" id="grind" pad={false} labelledBy="grind-title" className="overflow-hidden">
      <div className="relative flex flex-col justify-center py-[88px] md:min-h-svh md:pt-[120px]">
        <div className="wrap grid grid-cols-1 items-center gap-[clamp(24px,4vw,64px)] lg:grid-cols-[.9fr_1.5fr]">
          <div className="grid content-start gap-6">
            <Eyebrow>The grind</Eyebrow>
            <Heading id="grind-title" size="h1">
              Growing orgs<br />run on <Accent touch="tape">duct tape.</Accent>
            </Heading>
            <Lead>Spreadsheets, DMs and a dozen apps, and big calls made on gut feel.</Lead>
          </div>

          <div className="hidden grid-cols-[1fr_40px_200px] items-center gap-4 md:grid min-[1101px]:grid-cols-[1fr_64px_minmax(200px,250px)]">
            <div className="relative h-[min(440px,52vh)]">
              {TOOLS.map((t, i) => (
                <div key={t.label} data-tool={t.to} className="absolute will-change-transform" style={{ left: t.x, top: t.y, transform: `rotate(${t.r}deg)` }}>
                  <span
                    className="inline-flex animate-drift items-center gap-2.5 whitespace-nowrap rounded-[10px] border border-hairline bg-paper px-3 py-[9px] text-[13px] font-medium text-ink-60 shadow-1 min-[1101px]:px-4 min-[1101px]:py-[11px] min-[1101px]:text-[14px]"
                    style={i % 2 ? { animationDelay: `${-1.7 - (i % 3)}s`, animationDuration: `${5 + (i % 3) * 0.6}s` } : undefined}
                  >
                    <i className="size-2.5 flex-none rounded-full" style={{ background: t.c }} />
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
            <svg viewBox="0 0 64 16" aria-hidden="true" className="h-4 w-full max-w-16">
              <path d="M0 8h60M52 2l8 6-8 6" fill="none" stroke="#2457F5" strokeWidth="1.5" />
            </svg>
            {/* The Lateral Line leaves from under the stack, below Forge. */}
            <div data-line="foot" className="grid gap-2.5">
              {PILLARS.map((p) => (
                <div key={p} data-sys={p} data-lit="false" className={`group flex h-[54px] items-center gap-3 rounded-xl px-4 font-mono text-[12px] font-semibold tracking-[.16em] text-white uppercase ${SYS_BG[p]}`}>
                  <Icon name={p} className="size-[22px]" />
                  <span className="flex-1">{p}</span>
                  <i className="size-2 rounded-full bg-white/20 transition-[background-color,box-shadow] duration-[450ms] group-data-[lit=true]:bg-signal group-data-[lit=true]:shadow-[0_0_0_4px_rgba(63,208,143,.2)]" />
                </div>
              ))}
            </div>
          </div>

          <Asset
            src="sections/chaos-to-order.svg"
            label="Scattered tools collapse into one system: Engine, Intel, Command, Forge"
            className="mt-4 md:hidden"
          />
        </div>
      </div>
    </Room>
  );
}
