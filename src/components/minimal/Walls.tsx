import type { CSSProperties } from 'react';
import { PILLARS, WALLS } from '@/content/minimal';

const pad = (n: number) => String(n).padStart(2, '0');

/** The five walls as one staircase, everything on show and nothing moving. Each wall is a step
 *  a little higher than the last: its thick top edge and the riser before it draw one stair
 *  outline up to the goal at the top right. Under every step, in one blue band, is the pillar
 *  that takes that wall down and how. On phones the steps stack, and the bar over each one
 *  grows a fifth longer every step. */
export function Walls() {
  return (
    <div className="stair">
      <p className="stair__goal">Ready for partners and investors</p>
      <ol className="stair__steps">
        {WALLS.map((w, k) => {
          const p = PILLARS.find((x) => x.id === w.pillar)!;
          return (
            <li key={w.pillar} className="stair__step" style={{ '--k': k } as CSSProperties}>
              <div className="stair__wall">
                <span className="stair__n">{pad(k + 1)}</span>
                <h3 className="stair__name">{w.name}</h3>
                <p className="stair__cost">{w.cost}</p>
              </div>
              <div className="stair__fix">
                <a className="stair__pillar" href={'#' + p.name.toLowerCase()}>
                  {p.name}
                  <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M4 3h5v5" /></svg>
                </a>
                <p>{w.fix}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
