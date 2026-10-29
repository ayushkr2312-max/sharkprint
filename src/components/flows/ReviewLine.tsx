'use client';

import { useRef, type CSSProperties } from 'react';
import { Icon } from '@/components/ui/Icon';
import { gsap, useGSAP } from '@/lib/gsap';
import { clamp } from '@/lib/env';

// Sample drafts (names are illustrative): what the machine made, and the call an insider made on it.
const DRAFTS = [
  { kind: 'Clip', title: 'Grand final, map 3', note: 'Start 2s earlier: keep the call that sets it up.', by: 'Mira', role: 'Editor' },
  { kind: 'Scouting report', title: 'Nexo, IGL', note: 'Trial scrims before any offer.', by: 'Theo', role: 'Analyst' },
  { kind: 'Dashboard', title: 'Win rate, last 30 days', note: 'Leave the forfeit out of it.', by: 'Sam', role: 'Team manager' },
  { kind: 'Sponsor post', title: 'Volt Energy, reel 2', note: 'Post at 19:00, when your fans are on.', by: 'Ana', role: 'Partnerships' },
];
const N = DRAFTS.length;
const AT = [0.14, 0.5, 0.86]; // the three stations, as a share of the line's width
const GAP = 1.2; // how far behind the one before each draft sets off: it leaves as the last one clears the desk

/** Where a draft is on the line at u (0 drafted … 1 at the desk … 2 out to you), with a
 *  pause at the desk while it's checked. */
function along(u: number) {
  const ease = (t: number) => t * t * (3 - 2 * t);
  if (u <= 0.8) return AT[0] + (AT[1] - AT[0]) * ease(u / 0.8);
  if (u <= 1.2) return AT[1];
  return AT[1] + (AT[2] - AT[1]) * ease((u - 1.2) / 0.8);
}

/** The Insiders flow, "Drafted, checked, signed off": four machine drafts travel the line as
 *  you scroll. Each stops at the insider's desk, takes one correction and a signature, and
 *  joins the pile that goes out to you. On phones the drafts sit in a list and sign off in turn. */
export function ReviewLine() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const fig = ref.current!;
    const stage = fig.querySelector<HTMLElement>('[data-stage]')!;
    const cards = Array.from(fig.querySelectorAll<HTMLElement>('[data-card]'));
    const desk = fig.querySelector<HTMLElement>('[data-desk]')!;
    const count = fig.querySelector<HTMLElement>('[data-count]')!;
    const wide = window.matchMedia('(min-width: 900px)');
    let w = stage.clientWidth, shown = -1;

    const draw = (p: number) => {
      const s = p * (2 + GAP * (N - 1));
      let signed = 0, busy = false;
      cards.forEach((el, i) => {
        const u = clamp(s - GAP * i, 0, 2);
        const done = u >= 1;
        if (done) signed++;
        if (u > 0.75 && u < 1.25) busy = true;
        if (el.hasAttribute('data-signed') !== done) el.toggleAttribute('data-signed', done);
        if (!wide.matches) {
          el.style.transform = '';
          return;
        }
        // Waiting drafts fan out behind the first; signed ones pile up, the newest on top.
        const queue = u === 0 ? i : 0, pile = u === 2 ? N - 1 - i : 0;
        const x = along(u) * w - el.offsetWidth / 2 - queue * 14 + pile * 10;
        const y = queue * 12 - pile * 8;
        el.style.transform = `translate(${x.toFixed(1)}px, calc(-50% + ${y}px)) rotate(${((queue - pile) * 1.6).toFixed(1)}deg)`;
        el.style.zIndex = String(u === 0 ? N - i : u === 2 ? i + 1 : N + 2);
      });
      desk.toggleAttribute('data-busy', busy);
      if (signed !== shown) {
        shown = signed;
        count.textContent = String(signed);
      }
    };

    const prog = { p: 0 };
    draw(0);
    gsap.to(prog, {
      p: 1, ease: 'none',
      onUpdate: () => draw(prog.p),
      scrollTrigger: { trigger: fig, start: 'top 68%', end: 'bottom 40%', scrub: 0.6 },
    });
    const ro = new ResizeObserver(() => { w = stage.clientWidth; draw(prog.p); });
    ro.observe(stage);
    return () => ro.disconnect();
  }, { scope: ref });

  return (
    <figure
      ref={ref}
      data-line="foot"
      aria-label="How review works: the machine drafts a clip, a scouting report, a dashboard number and a sponsor post; an insider checks each one, makes a correction and signs it off before it reaches you."
      className="review"
    >
      <div data-stage="" className="review-stage">
        <p aria-hidden="true" className="review-heads">
          <span>The machine drafts</span>
          <span>An insider checks</span>
          <span>Out to you</span>
        </p>
        <span aria-hidden="true" className="review-track" />
        {AT.map((a) => (
          <span key={a} aria-hidden="true" className="review-stop" style={{ '--at': a } as CSSProperties} />
        ))}
        <span data-desk="" aria-hidden="true" className="review-desk"><Icon name="check" strokeWidth={10} /></span>

        <ol className="review-cards">
          {DRAFTS.map((d) => (
            <li key={d.title} data-card="" className="review-card">
              <span className="review-kind">
                {d.kind}
                <span aria-hidden="true" className="review-state">
                  <em className="review-draft">Draft</em>
                  <em className="review-done">Signed off</em>
                </span>
              </span>
              <b className="review-title">{d.title}</b>
              <span aria-hidden="true" className="review-wait">Waiting for an insider</span>
              <span className="review-note">{d.note}</span>
              <span aria-hidden="true" className="review-auto">Drafted automatically</span>
              <span className="review-by">
                <i aria-hidden="true">{d.by.slice(0, 1)}</i>
                {d.by}, {d.role.toLowerCase()}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="review-foot">
        <span>Sample drafts with illustrative names. Insiders are former org managers, analysts, coaches, editors and partnerships leads.</span>
        <span aria-hidden="true" className="review-count">Signed off: <b data-count="">{N}</b> of {N}</span>
      </figcaption>
    </figure>
  );
}
