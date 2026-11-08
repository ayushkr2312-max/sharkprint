'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { useRoving } from '@/components/ui/useRoving';
import { KPIS, READERS } from '@/content/minimal';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { trackOnce } from '@/lib/track';

const fmt = (v: number, dec: number, suf: string) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-GB')) + suf;

/** The live report, open on the page: four numbers that count up and bars that grow once as
 *  it comes into view, and a "Shaped for" switch that leads with what that reader cares about. */
export function Report() {
  const ref = useRef<HTMLDivElement>(null);
  const [reader, setReader] = useState(0);
  const r = READERS[reader];
  const select = (i: number) => {
    setReader(i);
    trackOnce('min-report-reader', { type: 'report_reader', room: 'report' });
  };
  const item = useRoving(READERS.length, reader, select);

  useGSAP(() => {
    const counts = Array.from(ref.current!.querySelectorAll<HTMLElement>('[data-count]'));
    const p = { v: 0 };
    const draw = () => counts.forEach((el) => { el.textContent = fmt(+el.dataset.to! * p.v, +el.dataset.dec!, el.dataset.suf!); });
    draw();
    ScrollTrigger.create({
      trigger: ref.current, start: 'top 75%', once: true,
      onEnter: () => gsap.to(p, { v: 1, duration: 1.6, ease: 'expo.out', onUpdate: draw }),
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="report" data-reveal="" data-draw="">
      <div className="report__bar">
        <p className="report__name">Live report</p>
        <span className="tag">Sample</span>
        <div role="radiogroup" aria-label="Shaped for" className="seg">
          {READERS.map((x, i) => (
            <button key={x.id} type="button" role="radio" aria-checked={i === reader} onClick={() => select(i)} {...item(i)}>{x.label}</button>
          ))}
        </div>
      </div>
      <dl className="kpis">
        {KPIS.map((k) => (
          <div key={k.id} className="kpi" data-lead={k.id === r.lead ? '' : undefined}>
            <dt>{k.label}</dt>
            <dd data-count="" data-to={k.to} data-dec={k.dec} data-suf={k.suf}>{fmt(k.to, k.dec, k.suf)}</dd>
            <span aria-hidden="true" className="kpi__bars">
              {k.bars.map((h, i) => <i key={i} style={{ '--h': `${h}%`, '--b': i } as CSSProperties} />)}
            </span>
          </div>
        ))}
      </dl>
      <div className="report__note">
        <h3 key={r.id + 't'} data-swap="">{r.title}</h3>
        <div key={r.id} data-swap="">
          <p>{r.note}</p>
          <p className="small">Shared as: {r.as}</p>
        </div>
      </div>
    </div>
  );
}
