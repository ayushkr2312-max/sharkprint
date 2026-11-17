import type { CSSProperties } from 'react';

// A clip as it shows up on a phone or a player: a frame from the match (a corridor, cover, an
// enemy in the doorway, the crosshair and the kill feed), the burned-in subtitle, and the
// platform's own chrome around it. Every frame is drawn, and every clip is a sample.

type Box = { s: number; u: number; w: number; h: number };
type Scene = { vx: number; vy?: number; size?: number; ex: number; boxes: Box[] };

// vx, vy: where the doorway sits; size: how big it is; ex: where the enemy stands in it.
// Boxes: s is how far toward the camera (0 = the doorway, 1 = the lens), u where across the floor.
const SCENES: Scene[] = [
  { vx: 0.5, ex: 0.4, boxes: [{ s: 0.5, u: 0.02, w: 0.26, h: 0.22 }] },
  { vx: 0.34, ex: -0.35, boxes: [{ s: 0.42, u: 0.66, w: 0.28, h: 0.26 }] },
  { vx: 0.64, ex: 0.05, boxes: [{ s: 0.58, u: 0.03, w: 0.24, h: 0.3 }, { s: 0.28, u: 0.08, w: 0.2, h: 0.18 }] },
  { vx: 0.5, ex: -0.45, boxes: [{ s: 0.36, u: 0.22, w: 0.56, h: 0.1 }] },
  { vx: 0.5, vy: 0.38, size: 1.7, ex: 0.5, boxes: [{ s: 0.3, u: 0, w: 0.18, h: 0.2 }, { s: 0.3, u: 0.82, w: 0.18, h: 0.2 }] },
  { vx: 0.3, vy: 0.48, size: 0.8, ex: 0.3, boxes: [{ s: 0.62, u: 0.6, w: 0.32, h: 0.34 }] },
];

// What each clip shows: the scene, and the subtitle with the word the edit lands on.
const CLIPS: Record<string, [number, [string, string, string]?]> = {
  '1v3 to close out map two': [0, ['One left, ', 'three', ' on him']],
  'Kai calls the final round': [4, ['Everyone on ', 'B', '']],
  'Highlights: 2:1 against Orca': [3],
  'Orca on Saturday: last time we met': [5, ['Last time: ', '13', ' to 11']],
  'The ace nobody saw coming': [1, ['That’s ', 'five', '']],
  'Comms from the deciding round': [2, ['Hold. Hold. ', 'Go', '']],
  'The opening duel, slowed down': [5, ['Watch the ', 'crosshair', '']],
  'Inside the scrim before Orca': [4, ['Run it ', 'again', '']],
  'Live from the server': [1, ['We’re ', 'live', '']],
  'Round 24': [3, ['Round ', '24', '']],
  'The week, in six minutes': [0],
};
const COMMS = new Set(['Kai calls the final round', 'Comms from the deciding round']);
const CHAPTERS = [0.17, 0.42, 0.63, 0.86];

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const pts = (a: number[][]) => a.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');

function Frame({ k, wide }: { k: number; wide?: boolean }) {
  const W = wide ? 160 : 90;
  const H = wide ? 90 : 160;
  const sc = SCENES[k % SCENES.length];
  const vx = W * sc.vx;
  const vy = H * (sc.vy ?? (wide ? 0.44 : 0.42));
  const fw = (wide ? 15 : 10) * (sc.size ?? 1);
  const fh = (wide ? 11 : 13) * Math.min(sc.size ?? 1, 1.2);
  const [x0, y0, x1, y1] = [vx - fw, vy - fh, vx + fw, vy + fh];
  // The frame at depth s, between the far doorway (0) and the edges of the screen (1).
  const ring = (s: number) => [x0 * (1 - s), y0 * (1 - s), x1 + (W - x1) * s, y1 + (H - y1) * s];
  const toV = (p: number[], t: number) => [p[0] + (vx - p[0]) * t, p[1] + (vy - p[1]) * t];

  // The enemy stands in the doorway; the crosshair sits at the centre of the screen, at head height.
  const eh = (y1 - y0) * 0.64;
  const ex = vx + sc.ex * fw;
  const r = eh * 0.12;
  const headY = y1 - eh + r;
  const cx = W / 2;
  const g = wide ? 1.3 : 1.4;
  const len = wide ? 2.6 : 2.8;
  const cross = [[cx, headY - g, cx, headY - g - len], [cx, headY + g, cx, headY + g + len], [cx - g, headY, cx - g - len, headY], [cx + g, headY, cx + g + len, headY]];

  // The kill feed, top right: ours first.
  const kw = wide ? 30 : 26;
  const kh = wide ? 3.6 : 4.2;
  const feed = [0, 1].map((n) => ({ x: W - 3 - kw, y: (wide ? 3.5 : 4) + n * (kh + 1.4), ours: n === 0 }));

  return (
    <svg className="ct-frame" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <polygon className="fr-c" points={pts([[0, 0], [W, 0], [x1, y0], [x0, y0]])} />
      <polygon className="fr-l" points={pts([[0, 0], [x0, y0], [x0, y1], [0, H]])} />
      <polygon className="fr-r" points={pts([[W, 0], [W, H], [x1, y1], [x1, y0]])} />
      <polygon className="fr-f" points={pts([[0, H], [x0, y1], [x1, y1], [W, H]])} />
      <rect className="fr-o" x={x0} y={y0} width={fw * 2} height={fh * 2} />
      <g className="fr-ln">
        {[0.16, 0.38, 0.66].map((s) => {
          const [a, b, c, d] = ring(s);
          return <rect key={s} x={a} y={b} width={c - a} height={d - b} />;
        })}
        <polyline points={pts([[0, 0], [x0, y0]])} />
        <polyline points={pts([[W, 0], [x1, y0]])} />
        <polyline points={pts([[0, H], [x0, y1]])} />
        <polyline points={pts([[W, H], [x1, y1]])} />
        <polyline points={pts([[W * 0.3, H], [x0 + fw * 0.6, y1]])} />
        <polyline points={pts([[W * 0.7, H], [x1 - fw * 0.6, y1]])} />
      </g>
      <g className="fr-fig">
        <circle cx={ex} cy={headY} r={r} />
        <rect x={ex - eh * 0.2} y={headY + r * 1.25} width={eh * 0.4} height={eh * 0.42} rx={eh * 0.08} />
        <rect x={ex - eh * 0.14} y={headY + r * 1.25 + eh * 0.4} width={eh * 0.28} height={y1 - (headY + r * 1.25 + eh * 0.4)} />
        <rect x={ex - eh * 0.36} y={headY + r * 1.25 + eh * 0.1} width={eh * 0.3} height={eh * 0.07} />
      </g>
      {sc.boxes.map((b, n) => {
        const [a, , c, d] = ring(b.s);
        const fwid = c - a;
        const x = a + fwid * b.u;
        const w = fwid * b.w;
        const h = fwid * b.h;
        const front = [[x, d - h], [x + w, d - h], [x + w, d], [x, d]];
        const back = front.map((p) => toV(p, 0.16));
        const side = x + w < vx ? [front[1], front[2], back[2], back[1]] : x > vx ? [front[0], front[3], back[3], back[0]] : null;
        return (
          <g key={n} className="fr-box">
            {side && <polygon className="fr-box__s" points={pts(side)} />}
            <polygon className="fr-box__t" points={pts([front[0], front[1], back[1], back[0]])} />
            <polygon className="fr-box__f" points={pts(front)} />
          </g>
        );
      })}
      <g className="fr-x">
        {cross.map((l, n) => <line key={`o${n}`} className="fr-x__o" x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}
        {cross.map((l, n) => <line key={`i${n}`} className="fr-x__i" x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}
      </g>
      {feed.map((f) => (
        <g key={f.y} className="fr-kf" data-ours={f.ours ? '' : undefined}>
          <rect className="fr-kf__bg" x={f.x} y={f.y} width={kw} height={kh} rx={0.8} />
          <rect className="fr-kf__a" x={f.x + 1.2} y={f.y + kh * 0.3} width={kw * 0.34} height={kh * 0.4} rx={0.4} />
          <rect className="fr-kf__w" x={f.x + kw * 0.44} y={f.y + kh * 0.3} width={kw * 0.12} height={kh * 0.4} rx={0.4} />
          <rect className="fr-kf__b" x={f.x + kw * 0.62} y={f.y + kh * 0.3} width={kw * 0.34} height={kh * 0.4} rx={0.4} />
        </g>
      ))}
      {wide && (
        <g className="fr-score">
          <rect className="fr-score__us" x={W / 2 - 22} y={3.5} width={12} height={7} rx={1} />
          <rect className="fr-score__clock" x={W / 2 - 9} y={3.5} width={18} height={7} rx={1} />
          <rect className="fr-score__them" x={W / 2 + 10} y={3.5} width={12} height={7} rx={1} />
          <text x={W / 2 - 16} y={8.6}>12</text>
          <text x={W / 2} y={8.6}>1:24</text>
          <text x={W / 2 + 16} y={8.6}>11</text>
        </g>
      )}
    </svg>
  );
}

const ICONS = [
  'M12 20.3s-7.6-4.6-7.6-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.6 2.7c0 5.6-7.6 10.2-7.6 10.2z',
  'M4 4.5h16v11.5H9.5L4 20.5z',
  'M13.5 4.5 21 12l-7.5 7.5v-4.3c-5.4 0-8.4 1.6-10.5 4.8.8-6.1 4-9.8 10.5-10.5z',
];

export function Clip({ t, cap, wide, on, style, handle = '@yourteam' }: { t: string; cap: string; wide?: boolean; on?: boolean; style?: CSSProperties; handle?: string }) {
  const k = hash(cap);
  const [scene, sub] = CLIPS[cap] ?? [k];
  return (
    <span className="ct-card" data-wide={wide ? '' : undefined} data-on={on ? '' : undefined} style={{ ...style, '--d': `${-(k % 90) / 10}s` } as CSSProperties}>
      <Frame k={scene} wide={wide} />
      <span className="ct-card__t">{t}</span>
      {COMMS.has(cap) && <span className="ct-card__voice" aria-hidden="true">Kai<i /><i /><i /><i /></span>}
      {sub && !wide && <span className="ct-card__sub" aria-hidden="true">{sub[0]}<mark>{sub[1]}</mark>{sub[2]}</span>}
      {!wide && (
        <span className="ct-card__rail" aria-hidden="true">
          {ICONS.map((d) => <svg key={d} viewBox="0 0 24 24"><path d={d} /></svg>)}
        </span>
      )}
      <span className="ct-card__cap">{!wide && <b>{handle}</b>}{cap}</span>
      <span className="ct-card__bar" aria-hidden="true">
        <i />
        {wide && CHAPTERS.map((c) => <b key={c} style={{ left: `${c * 100}%` }} />)}
      </span>
    </span>
  );
}
