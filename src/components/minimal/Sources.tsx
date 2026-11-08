'use client';

import { useState, type CSSProperties, type PointerEvent } from 'react';
import { SharkMark } from '@/components/ui/Icon';
import type { Pillar } from '@/components/ui/Icon';
import { OUTPUTS, PILLARS, SOURCES } from '@/content/minimal';
import { trackOnce } from '@/lib/track';

type Pick = { kind: 'src'; id: string } | { kind: 'out'; id: Pillar };

/** Built from what's already out there: the public sources on the left, Sharkprint in the
 *  middle, the five pillars on the right. Pick a source to see what it becomes, or a pillar to
 *  see what it's built from; the lines between them light up and the readout spells it out. */
export function Sources() {
  const [pick, setPick] = useState<Pick>({ kind: 'src', id: SOURCES[0].id });
  const choose = (p: Pick) => {
    setPick(p);
    trackOnce('sources-pick', { type: 'sources_pick', room: 'sources' });
  };
  // Hovering previews on a mouse; touch and keyboard choose with a tap or Enter.
  const hover = (p: Pick) => (e: PointerEvent) => { if (e.pointerType === 'mouse') setPick(p); };

  const src = pick.kind === 'src' ? SOURCES.find((s) => s.id === pick.id)! : null;
  const onSrc = new Set(src ? [src.id] : SOURCES.filter((s) => s.feeds[pick.id as Pillar]).map((s) => s.id));
  const onOut = new Set<Pillar>(src ? (Object.keys(src.feeds) as Pillar[]) : [pick.id as Pillar]);
  const name = (id: Pillar) => PILLARS.find((p) => p.id === id)!.name;

  // The readout: what this source becomes, or what this pillar is built from.
  const lines: [string, string][] = src
    ? PILLARS.filter((p) => src.feeds[p.id]).map((p) => [p.name, src.feeds[p.id]!])
    : SOURCES.filter((s) => s.feeds[pick.id as Pillar]).map((s) => [s.name, s.feeds[pick.id as Pillar]!]);
  const title = src ? <>From <b>{src.name}</b></> : <>What goes into <b>{name(pick.id as Pillar)}</b></>;

  const nS = SOURCES.length, nO = PILLARS.length;
  return (
    <figure className="flow" data-draw="" aria-label="What Sharkprint builds from public sources, and what each one becomes">
      <div className="flow__map">
        <p className="flow__head flow__head--src">Public sources</p>
        <p className="flow__head flow__head--out">What you get</p>

        <ul className="flow__col flow__col--src" style={{ '--n': nS } as CSSProperties}>
          {SOURCES.map((s, k) => (
            <li key={s.id} data-reveal="" style={{ '--i': k } as CSSProperties}>
              <button type="button" className="flow__item" data-optional={s.optional ? '' : undefined}
                aria-pressed={pick.kind === 'src' && pick.id === s.id} data-on={onSrc.has(s.id) ? '' : undefined}
                onClick={() => choose({ kind: 'src', id: s.id })} onPointerEnter={hover({ kind: 'src', id: s.id })}>
                <b>{s.name}</b><span>{s.line}</span>
              </button>
            </li>
          ))}
        </ul>

        <svg aria-hidden="true" className="flow__wires flow__wires--src" viewBox={`0 0 100 ${nS * 100}`} preserveAspectRatio="none">
          <g className="d-wipe">
            {[false, true].map((lit) => (
              <g key={String(lit)} className={lit ? 'flow__lit' : undefined}>
                {SOURCES.map((s, k) => {
                  if (lit && !onSrc.has(s.id)) return null;
                  const y = (k + 0.5) * 100, m = (nS * 100) / 2;
                  return <path key={s.id} d={`M0 ${y}C55 ${y} 45 ${m} 100 ${m}`} vectorEffect="non-scaling-stroke" data-optional={s.optional ? '' : undefined} />;
                })}
              </g>
            ))}
          </g>
        </svg>

        <div className="flow__hub">
          <SharkMark className="flow__shark" />
          <b>Sharkprint</b>
          <span>Software drafts it. Insiders check it.</span>
        </div>

        <svg aria-hidden="true" className="flow__wires flow__wires--out" viewBox={`0 0 100 ${nO * 100}`} preserveAspectRatio="none">
          <g className="d-wipe">
            {[false, true].map((lit) => (
              <g key={String(lit)} className={lit ? 'flow__lit' : undefined}>
                {PILLARS.map((p, k) => {
                  if (lit && !onOut.has(p.id)) return null;
                  const y = (k + 0.5) * 100, m = (nO * 100) / 2;
                  return <path key={p.id} d={`M0 ${m}C55 ${m} 45 ${y} 100 ${y}`} vectorEffect="non-scaling-stroke" />;
                })}
              </g>
            ))}
          </g>
        </svg>

        <ul className="flow__col flow__col--out" style={{ '--n': nO } as CSSProperties}>
          {PILLARS.map((p, k) => (
            <li key={p.id} data-reveal="" style={{ '--i': k } as CSSProperties}>
              <button type="button" className="flow__item flow__item--out"
                aria-pressed={pick.kind === 'out' && pick.id === p.id} data-on={onOut.has(p.id) ? '' : undefined}
                onClick={() => choose({ kind: 'out', id: p.id })} onPointerEnter={hover({ kind: 'out', id: p.id })}>
                <b>{p.name}</b><span>{OUTPUTS[p.id]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="flow__read" aria-live="polite">
        <p key={`${pick.kind}-${pick.id}`} className="flow__title">{title}</p>
        <ul key={`${pick.kind}-${pick.id}-l`} className="flow__lines">
          {lines.map(([k, v], n) => (
            <li key={k} style={{ '--i': n } as CSSProperties}><b>{k}</b><span>{v}</span></li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
