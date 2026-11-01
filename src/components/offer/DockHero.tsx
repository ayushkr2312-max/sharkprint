'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { Room } from '@/components/site/Room';
import { Arrow } from '@/components/ui/buttons';
import { gsap, useGSAP } from '@/lib/gsap';

export type DockTile = {
  id: string;
  name: string;
  kind: string;
  /** The section it leads to on the page. */
  href: string;
  tone: 'strike' | 'trench' | 'paper' | 'ink' | 'mist';
  art: ReactNode;
  /** The art's width as a share of the tile, how far it sinks below the tile's foot, and its
   *  centre (as on the homepage dock). */
  w: string;
  sink: string;
  left?: string;
};

type Props = {
  id: string;
  /** The headline as it reads; then its two lines, set in capitals, the second drafted. */
  title: string;
  lines: [string, string];
  lead: ReactNode;
  cta: { label: string; href: string; down?: boolean };
  tiles: DockTile[];
  label: string;
};

/** A word whose letters rise out of its own baseline. */
function Word({ children }: { children: string }) {
  return (
    <span className="hx-word">
      {children.split('').map((c, i) => <span key={i} data-char="" className="will-change-transform">{c}</span>)}
    </span>
  );
}

const words = (line: string) => line.split(' ').flatMap((w, i) => (i ? [' ', <Word key={w + i}>{w}</Word>] : [<Word key={w + i}>{w}</Word>]));

/** The homepage hero's shape for the pages we send: the line set big and condensed with
 *  the second half drafted, one sentence and one button, and the page's parts docked along
 *  the bottom edge of the first screen, each with a real output rising out of it. With no
 *  preloader to hand over, the letters rise as soon as the page has wiped in. */
export function DockHero({ id, title, lines, lead, cta, tiles, label }: Props) {
  const root = useRef<HTMLElement>(null);
  // Sized so the longer line fills the column like the homepage's sixteen characters do.
  const n = Math.max(16, ...lines.map((l) => l.length));
  const longestWord = Math.max(11, ...lines.flatMap((l) => l.split(' ').map((w) => w.length)));
  const fit = { '--fd': `${((12.8 * 16) / n).toFixed(2)}cqw`, '--fm': `${((24 * 11) / longestWord).toFixed(2)}cqw` } as CSSProperties;

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const chars = q('[data-char]');
    const dock = q('[data-tile]');
    const rest = q('[data-rest]');
    const mark = q('[data-mark]')[0];
    gsap.set(chars, { yPercent: 118 });
    gsap.set(dock, { yPercent: 70 });
    gsap.set(rest, { opacity: 0, y: 26 });

    q('[data-art]').forEach((el, i) => gsap.to(el, {
      y: -40 - (i % 2) * 24, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    }));

    gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.35 })
      .to(chars, { yPercent: 0, duration: 1.25, stagger: 0.026 }, 0)
      .call(() => mark.setAttribute('data-on', 'true'), undefined, 0.9)
      .to(rest, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.45)
      .to(dock, { yPercent: 0, duration: 1.5, stagger: 0.09 }, 0.55);
  }, { scope: root });

  return (
    <Room ref={root} tone="creme" room={id} id={id} pad={false} labelledBy={`${id}-title`} className="flex min-h-svh flex-col overflow-hidden pt-[104px] md:pt-[112px]">
      <div className="wrap flex flex-1 flex-col">
        <div className="hx hx--fit" style={fit}>
          <h1 id={`${id}-title`} className="hx-title">
            <span className="sr-only text-[16px]">{title}</span>
            <span aria-hidden="true" className="hx-l1">{words(lines[0])}</span>
            <span aria-hidden="true" className="hx-l2">
              <span data-mark="" className="hx-mark">
                {words(lines[1])}
                <span className="hx-corners" />
                <span className="hx-dim" />
              </span>
            </span>
          </h1>

          <p data-rest="" className="hx-lead">{lead}</p>
          <div data-rest="" data-line="foot" className="hx-cta-row">
            <a href={cta.href} className="hx-cta">
              {cta.label}
              <span aria-hidden="true" className="hx-cta__ring"><Arrow dir={cta.down ? 'down' : 'right'} className="size-[18px]" /></span>
            </a>
          </div>

          <nav aria-label={label} className="hx-dock" style={{ gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))` }}>
            {tiles.map((t) => (
              <a key={t.id} href={t.href} data-tile="" className={`hx-tile hx-tile--${t.tone}`}>
                <span className="hx-tile-head">
                  <span>
                    <span className="hx-tile-name">{t.name}</span>
                    <span className="hx-tile-kind">{t.kind}</span>
                  </span>
                </span>
                <span aria-hidden="true" className="hx-tile-go"><Arrow dir="down" className="size-[14px]" /></span>
                <span aria-hidden="true" className="hx-tile-art" style={{ '--w': t.w, '--sink': t.sink, left: t.left } as CSSProperties}>
                  <span data-art="" className="block">{t.art}</span>
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </Room>
  );
}
