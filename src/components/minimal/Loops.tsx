'use client';

import { useRef, type ReactNode } from 'react';
import { SharkMark, type Pillar } from '@/components/ui/Icon';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-core';

// How each pillar works, as a short loop: four steps, played over and over while the panel is
// on screen and paused when it isn't. Ink, paper and light blue only; transform and opacity
// only. Without a script each scene shows finished. Every name and number is a sample.

const D = 2.4; // seconds per step
type Q = (s: string) => Element[];
type Spec = { steps: string[]; caption: string; label: string; scene: ReactNode; build: (q: Q, tl: gsap.core.Timeline) => void };

const r1 = (n: number) => Math.round(n * 10) / 10;
const text = (els: Element[], v: string[] | string) => els.forEach((el, k) => { el.textContent = typeof v === 'string' ? v : v[k]; });

/** A source chip: outlined, with a blue copy on top that lights it. */
function Chip({ x, y, w, label, cls }: { x: number; y: number; w: number; label: string; cls: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="32" rx="8" className="f-paper s-rule" />
      <text x={x + 12} y={y + 21} className="t t-ink">{label}</text>
      <g className={cls}>
        <rect x={x} y={y} width={w} height="32" rx="8" className="f-blue" />
        <text x={x + 12} y={y + 21} className="t t-on-blue">{label}</text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ Analyst
   Ask a question, gather the data, build the report, reach a verdict. Each loop asks about
   something else: a player, a roster, a coach, an opponent. */
const A_SUBJECTS = [
  { q: 'Should we sign Nexo?', title: 'Player report', sub: 'Nexo, duelist', rows: [['Form', 0.86], ['Role fit', 0.9], ['Clutch', 0.78], ['Comms', 0.82]], v: 'Recommend: sign' },
  { q: 'Is Team Vanta worth acquiring?', title: 'Roster report', sub: 'Team Vanta', rows: [['Results', 0.74], ['Trajectory', 0.88], ['Depth', 0.66], ['Fit', 0.8]], v: 'Worth a bid' },
  { q: 'Who should coach our roster?', title: 'Staff report', sub: 'Three coaches', rows: [['Results', 0.84], ['Growth', 0.9], ['Comms', 0.76], ['Fit', 0.86]], v: 'Shortlist: 2 of 3' },
  { q: 'How do we beat Orca on Saturday?', title: 'Opponent prep', sub: 'Orca, last 20', rows: [['Map pool', 0.7], ['Openings', 0.82], ['Clutch', 0.64], ['Weak spots', 0.9]], v: 'Game plan ready' },
] as const;
const A_SRC = ['Results', 'VODs', 'Stats', 'The scene'];
const aY = (k: number) => 58 + k * 44;

const analyst: Spec = {
  steps: ['Ask', 'Gather', 'Analyse', 'Decide'],
  caption: 'Sample reports on fictional players, rosters, coaches and opponents.',
  label: 'A question about a player, roster, coach or opponent; data gathered from results, VODs, stats and the scene; a report built; a verdict reached',
  scene: (
    <>
      <g className="a-q">
        <rect x="0.75" y="0.75" width="478.5" height="36" rx="18" className="f-paper s-ink" />
        <text x="20" y="24" className="t t-ink a-qt">{A_SUBJECTS[0].q}</text>
      </g>
      {A_SRC.map((s, k) => (
        <g key={s}>
          <line x1="110" y1={aY(k) + 16} x2="200" y2="139" className="s-rule" />
          <Chip x={0} y={aY(k)} w={110} label={s} cls="a-lit" />
        </g>
      ))}
      {A_SRC.map((s, k) => <circle key={s} cx="110" cy={aY(k) + 16} r="4.5" className="f-blue a-pk" data-dy={139 - aY(k) - 16} />)}
      <circle cx="232" cy="139" r="40" className="s-blue a-ring" />
      <rect x="200" y="107" width="64" height="64" rx="16" className="f-blue" />
      <SharkMark x="210" y="125" width="44" height="26.4" className="loop__shark" />
      <line x1="264" y1="139" x2="288" y2="139" className="s-rule" />
      <g className="a-card">
        <rect x="288.75" y="52.75" width="190.5" height="216.5" rx="12" className="f-paper s-ink" />
        <text x="304" y="80" className="t t-ink a-title">{A_SUBJECTS[0].title}</text>
        <text x="304" y="99" className="t a-sub">{A_SUBJECTS[0].sub}</text>
        <line x1="304" x2="464" y1="111.5" y2="111.5" className="s-rule" />
        {A_SUBJECTS[0].rows.map(([l, v], k) => (
          <g key={k} className="a-row">
            <text x="304" y={136 + k * 26} className="t a-lab">{l}</text>
            <rect x="400" y={127 + k * 26} width="64" height="6" rx="3" className="f-rule" />
            <rect x="400" y={127 + k * 26} width={r1(64 * v)} height="6" rx="3" className="f-blue a-bar" />
          </g>
        ))}
        <g className="a-v">
          <rect x="304" y="232" width="160" height="28" rx="14" className="f-blue" />
          <text x="384" y="251" textAnchor="middle" className="t t-on-blue a-vt">{A_SUBJECTS[0].v}</text>
        </g>
      </g>
    </>
  ),
  build(q, tl) {
    let n = 0;
    const apply = () => {
      const s = A_SUBJECTS[n % A_SUBJECTS.length];
      text(q('.a-qt'), s.q); text(q('.a-title'), s.title); text(q('.a-sub'), s.sub); text(q('.a-vt'), s.v);
      text(q('.a-lab'), s.rows.map((r) => r[0]));
      q('.a-bar').forEach((b, k) => b.setAttribute('width', String(r1(64 * s.rows[k][1]))));
    };
    apply();
    tl.eventCallback('onRepeat', () => { n++; apply(); });
    tl.set(q('.a-q'), { opacity: 0, y: -6 }, 0)
      .set(q('.a-lit'), { opacity: 0 }, 0)
      .set(q('.a-pk'), { opacity: 0, x: 0, y: 0 }, 0)
      .set(q('.a-ring'), { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' }, 0)
      .set(q('.a-card'), { opacity: 0, y: 10 }, 0)
      .set(q('.a-row'), { opacity: 0 }, 0)
      .set(q('.a-bar'), { scaleX: 0, transformOrigin: '0% 50%' }, 0)
      .set(q('.a-v'), { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' }, 0)
      // Ask
      .to(q('.a-q'), { opacity: 1, y: 0, duration: 0.6 }, 0.15)
      // Gather
      .to(q('.a-lit'), { opacity: 1, duration: 0.3, stagger: 0.18 }, D + 0.05);
    q('.a-pk').forEach((pk, k) => {
      const t = D + 0.2 + k * 0.18;
      tl.to(pk, { opacity: 1, duration: 0.12 }, t)
        .to(pk, { x: 90, y: +(pk as HTMLElement).dataset.dy!, duration: 0.7, ease: 'power1.inOut' }, t)
        .to(pk, { opacity: 0, duration: 0.12 }, t + 0.62);
    });
    tl.to(q('.a-ring'), { opacity: 1, scale: 1.15, duration: 0.5 }, D + 1.05)
      .to(q('.a-ring'), { opacity: 0, duration: 0.4 }, D + 1.6)
      // Analyse
      .to(q('.a-card'), { opacity: 1, y: 0, duration: 0.5 }, 2 * D)
      .to(q('.a-row'), { opacity: 1, duration: 0.3, stagger: 0.12 }, 2 * D + 0.2)
      .to(q('.a-bar'), { scaleX: 1, duration: 0.7, stagger: 0.14 }, 2 * D + 0.35)
      // Decide
      .to(q('.a-v'), { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 3 * D + 0.1)
      .to([...q('.a-q'), ...q('.a-lit'), ...q('.a-card')], { opacity: 0, duration: 0.35 }, 4 * D - 0.45);
  },
};

/* ------------------------------------------------------------------ HQ
   Sync everything public, track it live, turn it into a report, share it. Alternates between a
   partner recap and an investor update. */
const H_SRC = ['Socials', 'Streams', 'Results', 'Partners'];
const H_REPORTS = ['Partner recap', 'Investor update'];
const hY = (k: number) => 52 + k * 46;
const H_LINE = [168, 171, 170, 176, 181, 180, 187, 193, 196, 203, 208, 214.8]
  .map((v, i) => `${i ? 'L' : 'M'}${r1(128 + (i * 158) / 11)},${r1(150 - ((v - 164) / 52) * 30)}`).join(' ');

const hq: Spec = {
  steps: ['Sync', 'Track', 'Report', 'Share'],
  caption: 'Sample numbers for a fictional org.',
  label: 'Socials, streams, results and partners synced into one live dashboard, turned into a partner recap or an investor update, and shared',
  scene: (
    <>
      {H_SRC.map((s, k) => (
        <g key={s}>
          <line x1="92" y1={hY(k) + 16} x2="112" y2="140" className="s-rule" />
          <Chip x={0} y={hY(k)} w={92} label={s} cls="h-lit" />
        </g>
      ))}
      {H_SRC.map((s, k) => <circle key={s} cx="92" cy={hY(k) + 16} r="4.5" className="f-blue h-pk" data-dy={140 - hY(k) - 16} />)}
      <rect x="112.75" y="30.75" width="188.5" height="218.5" rx="12" className="f-paper s-ink" />
      <text x="128" y="56" className="t t-ink">HQ</text>
      <text x="286" y="56" textAnchor="end" className="t">Live</text>
      <text x="128" y="84" className="t">Followers</text>
      <text x="128" y="111" className="t-big h-val">214.8K</text>
      <path d={H_LINE} className="s-ink s-thick" />
      <rect x="126" y="116" width="164" height="38" className="f-paper h-cover" />
      <text x="128" y="182" className="t">Delivered</text>
      <text x="286" y="182" textAnchor="end" className="t t-ink h-del">12/14</text>
      {Array.from({ length: 14 }, (_, k) => {
        const w = (158 - 13 * 3) / 14, x = r1(128 + k * (w + 3));
        return (
          <g key={k}>
            <rect x={x} y="192" width={r1(w)} height="8" rx="2" className="f-rule" />
            {k < 12 && <rect x={x} y="192" width={r1(w)} height="8" rx="2" className={k < 8 ? 'f-blue' : 'f-blue h-seg'} />}
          </g>
        );
      })}
      <text x="128" y="230" className="t">Win rate</text>
      <text x="286" y="230" textAnchor="end" className="t t-ink">64%</text>
      <line x1="301" y1="140" x2="322" y2="140" className="s-rule" />
      <g className="h-page">
        <rect x="322.75" y="44.75" width="156.5" height="194.5" rx="10" className="f-paper s-ink" />
        <text x="338" y="72" className="t t-ink h-pt">{H_REPORTS[0]}</text>
        <rect x="338" y="86" width="96" height="5" rx="2.5" className="f-rule" />
        <rect x="338" y="98" width="118" height="5" rx="2.5" className="f-rule" />
        <rect x="338" y="110" width="78" height="5" rx="2.5" className="f-rule" />
        {[22, 32, 46].map((h, k) => <rect key={k} x={338 + k * 20} y={168 - h} width="12" height={h} rx="2" className="f-blue h-mb" />)}
        <line x1="338" x2="464" y1="168.5" y2="168.5" className="s-rule" />
        <g className="h-chip">
          <rect x="338" y="196" width="126" height="28" rx="14" className="f-blue" />
          <text x="401" y="215" textAnchor="middle" className="t t-on-blue">Shared</text>
        </g>
      </g>
    </>
  ),
  build(q, tl) {
    let n = 0;
    tl.eventCallback('onRepeat', () => { n++; text(q('.h-pt'), H_REPORTS[n % 2]); });
    const val = q('.h-val')[0], del = q('.h-del')[0], count = { v: 184 };
    tl.set(q('.h-lit'), { opacity: 0 }, 0)
      .set(q('.h-pk'), { opacity: 0, x: 0, y: 0 }, 0)
      .set(q('.h-cover'), { scaleX: 1, transformOrigin: '100% 50%' }, 0)
      .set(q('.h-seg'), { opacity: 0 }, 0)
      .set(count, { v: 184 }, 0)
      .call(() => { val.textContent = '184.0K'; del.textContent = '8/14'; }, [], 0)
      .set(q('.h-page'), { opacity: 0, x: -36 }, 0)
      .set(q('.h-mb'), { scaleY: 0, transformOrigin: '50% 100%' }, 0)
      .set(q('.h-chip'), { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' }, 0)
      // Sync
      .to(q('.h-lit'), { opacity: 1, duration: 0.3, stagger: 0.18 }, 0.15);
    q('.h-pk').forEach((pk, k) => {
      const t = 0.3 + k * 0.18;
      tl.to(pk, { opacity: 1, duration: 0.12 }, t)
        .to(pk, { x: 20, y: +(pk as HTMLElement).dataset.dy!, duration: 0.5, ease: 'power1.inOut' }, t)
        .to(pk, { opacity: 0, duration: 0.12 }, t + 0.42);
    });
    // Track
    tl.to(count, { v: 214.8, duration: 1.3, ease: 'power2.out', onUpdate: () => { val.textContent = `${count.v.toFixed(1)}K`; } }, D + 0.1)
      .to(q('.h-cover'), { scaleX: 0, duration: 1.3, ease: 'power2.out' }, D + 0.1)
      .to(q('.h-seg'), { opacity: 1, duration: 0.2, stagger: 0.22 }, D + 0.4)
      .call(() => { del.textContent = '12/14'; }, [], D + 1.3)
      // Report
      .to(q('.h-page'), { opacity: 1, x: 0, duration: 0.6 }, 2 * D)
      .to(q('.h-mb'), { scaleY: 1, duration: 0.6, stagger: 0.12 }, 2 * D + 0.4)
      // Share
      .to(q('.h-chip'), { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, 3 * D + 0.15)
      .to([...q('.h-lit'), ...q('.h-page')], { opacity: 0, duration: 0.35 }, 4 * D - 0.45);
  },
};

/* ------------------------------------------------------------------ Content
   Find the moments in a stream, make them into pieces, post them everywhere, watch reach grow. */
const C_TICKS = [64, 176, 300, 412];
const C_CH = ['YouTube', 'TikTok', 'Instagram', 'X', 'Discord'];
const C_GROW = [10, 13, 12, 17, 20, 19, 24, 28, 27, 33, 38, 44];

const content: Spec = {
  steps: ['Find', 'Make', 'Post', 'Grow'],
  caption: 'A sample stream, cut and posted for a fictional org.',
  label: 'A stream with four moments found, each made into short videos, posted across five channels, and followers growing',
  scene: (
    <>
      <text x="0" y="14" className="t t-ink">Stream</text>
      <text x="480" y="14" textAnchor="end" className="t">3h 12m</text>
      <rect x="0" y="26" width="480" height="6" rx="3" className="f-rule" />
      <rect x="0" y="26" width="480" height="6" rx="3" className="f-ink c-prog" />
      {C_TICKS.map((x) => <rect key={x} x={x - 2} y="18" width="4" height="22" rx="2" className="f-blue c-tick" />)}
      {C_TICKS.map((x) => (
        <g key={x} className="c-card">
          <rect x={x - 22} y="52" width="44" height="78" rx="6" className="f-ink" />
          <rect x={x - 14} y="110" width="28" height="4" rx="2" className="f-paper" />
          <rect x={x - 14} y="118" width="18" height="4" rx="2" className="f-blue" />
        </g>
      ))}
      {C_CH.map((c, k) => (
        <g key={c}>
          <rect x={k * 98 + 0.75} y="154.75" width="86.5" height="28.5" rx="14" className="f-paper s-rule" />
          <text x={k * 98 + 44} y="174" textAnchor="middle" className="t t-ink">{c}</text>
          <g className="c-lit">
            <rect x={k * 98} y="154" width="88" height="30" rx="15" className="f-blue" />
            <text x={k * 98 + 44} y="174" textAnchor="middle" className="t t-on-blue">{c}</text>
          </g>
        </g>
      ))}
      <text x="0" y="214" className="t">Followers, all platforms</text>
      {C_GROW.map((h, k) => <rect key={k} x={k * 40 + 6} y={266 - h} width="28" height={h} rx="3" className="f-blue c-bar" />)}
    </>
  ),
  build(q, tl) {
    const ticks = q('.c-tick'), cards = q('.c-card'), F = D - 0.3;
    tl.set(q('.c-prog'), { scaleX: 0, opacity: 1, transformOrigin: '0% 50%' }, 0)
      .set(ticks, { scaleY: 0, opacity: 1, transformOrigin: '50% 50%' }, 0)
      .set(cards, { opacity: 0, x: 0, y: -12, scale: 1, transformOrigin: '50% 50%' }, 0)
      .set(q('.c-lit'), { opacity: 0 }, 0)
      .set(q('.c-bar'), { scaleY: 0, opacity: 1, transformOrigin: '50% 100%' }, 0)
      // Find
      .to(q('.c-prog'), { scaleX: 1, duration: F, ease: 'none' }, 0.1);
    ticks.forEach((t, k) => tl.to(t, { scaleY: 1, duration: 0.3, ease: 'power3.out' }, 0.1 + (C_TICKS[k] / 480) * F));
    // Make
    tl.to(cards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.16 }, D + 0.1);
    // Post: each piece flies to a channel, and every channel lights
    cards.forEach((c, k) => {
      tl.to(c, { x: k * 98 + 44 - C_TICKS[k], y: 77, scale: 0.35, duration: 0.7, ease: 'power2.in' }, 2 * D + 0.1 + k * 0.14)
        .to(c, { opacity: 0, duration: 0.15 }, 2 * D + 0.68 + k * 0.14);
    });
    tl.to(q('.c-lit'), { opacity: 1, duration: 0.25, stagger: 0.12 }, 2 * D + 0.7)
      // Grow
      .to(q('.c-bar'), { scaleY: 1, duration: 0.5, stagger: 0.06 }, 3 * D + 0.1)
      .to([...q('.c-prog'), ...ticks, ...q('.c-lit'), ...q('.c-bar')], { opacity: 0, duration: 0.35 }, 4 * D - 0.45);
  },
};

/* ------------------------------------------------------------------ Creators
   Scout the scene for creators who fit, sign them, put their week on one schedule, and watch the
   combined reach grow. */
const K_DOTS = [[40, 64], [92, 54], [150, 60], [190, 78], [62, 100], [120, 94], [172, 112], [34, 140], [86, 134], [140, 142], [196, 148], [58, 176], [112, 172], [162, 180], [198, 112], [118, 124]];
const K_FIT = [12, 9, 2, 6]; // in the order the scan reaches them
const K_NAMES = ['Kai', 'Mira', 'Juno', 'Rhea'];
const kRow = (k: number) => 52 + k * 22;
const K_SEGS = [70, 54, 46, 38];

const creators: Spec = {
  steps: ['Scout', 'Sign', 'Schedule', 'Grow'],
  caption: 'Sample creators and a sample week.',
  label: 'Creators in the scene scouted for fit, four signed, their streams scheduled around a match-day watch party, and their combined reach growing',
  scene: (
    <>
      <rect x="0.75" y="0.75" width="218.5" height="194.5" rx="12" className="s-rule" />
      <text x="14" y="24" className="t">Creators in your scene</text>
      {K_DOTS.map(([x, y], k) => <circle key={k} cx={x} cy={y} r="7" className="f-rule" />)}
      <circle cx="40" cy="112" r="34" className="s-blue k-ring" />
      <rect x="248.75" y="0.75" width="230.5" height="130.5" rx="12" className="f-paper s-ink" />
      <text x="264" y="28" className="t t-ink">Your creators</text>
      {K_NAMES.map((name, k) => (
        <g key={name} className="k-row">
          <text x="288" y={kRow(k)} className="t t-ink">{name}</text>
          <text x="464" y={kRow(k)} textAnchor="end" className="t">Signed</text>
        </g>
      ))}
      <text x="248" y="162" className="t">This week</text>
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, k) => (
        <g key={k}>
          <rect x={248 + k * 34} y="172" width="28" height="40" rx="6" className="f-rule" />
          <rect x={248 + k * 34} y="172" width="28" height="40" rx="6" className={k === 5 ? 'f-ink k-cell' : 'f-blue k-cell'} />
          <text x={262 + k * 34} y="230" textAnchor="middle" className={k === 5 ? 't t-ink' : 't'}>{d}</text>
        </g>
      ))}
      <text x="248" y="256" className="t">Saturday: watch party</text>
      {K_FIT.map((k, n) => <circle key={k} cx={K_DOTS[k][0]} cy={K_DOTS[k][1]} r="7" className="f-blue k-fit" data-dx={272 - K_DOTS[k][0]} data-dy={kRow(n) - 4 - K_DOTS[k][1]} />)}
      <text x="0" y="226" className="t">Combined reach</text>
      <rect x="0" y="238" width="220" height="10" rx="5" className="f-rule" />
      {K_SEGS.map((w, k) => {
        const x = K_SEGS.slice(0, k).reduce((a, b) => a + b + 2, 0);
        return <rect key={k} x={x} y="238" width={w} height="10" rx="5" className="f-blue k-seg" />;
      })}
    </>
  ),
  build(q, tl) {
    const fits = q('.k-fit'), S = D - 0.5;
    tl.set(q('.k-ring'), { opacity: 0, x: 0 }, 0)
      .set(fits, { opacity: 0, x: 0, y: 0 }, 0)
      .set(q('.k-row'), { opacity: 0, x: 10 }, 0)
      .set(q('.k-cell'), { scaleY: 0, opacity: 1, transformOrigin: '50% 100%' }, 0)
      .set(q('.k-seg'), { scaleX: 0, opacity: 1, transformOrigin: '0% 50%' }, 0)
      // Scout: the ring sweeps the scene; creators who fit light up as it passes
      .to(q('.k-ring'), { opacity: 1, duration: 0.25 }, 0.1)
      .to(q('.k-ring'), { x: 140, duration: S, ease: 'power1.inOut' }, 0.1);
    fits.forEach((f, n) => tl.to(f, { opacity: 1, duration: 0.25 }, 0.1 + ((K_DOTS[K_FIT[n]][0] - 40) / 140) * S));
    // Sign: each one moves into your roster
    tl.to(q('.k-ring'), { opacity: 0, duration: 0.3 }, D);
    fits.forEach((f, n) => {
      tl.to(f, { x: +(f as HTMLElement).dataset.dx!, y: +(f as HTMLElement).dataset.dy!, duration: 0.7, ease: 'power2.inOut' }, D + 0.1 + n * 0.15);
    });
    tl.to(q('.k-row'), { opacity: 1, x: 0, duration: 0.4, stagger: 0.15 }, D + 0.6)
      // Schedule
      .to(q('.k-cell'), { scaleY: 1, duration: 0.4, stagger: 0.08 }, 2 * D + 0.1)
      // Grow
      .to(q('.k-seg'), { scaleX: 1, duration: 0.5, stagger: 0.2 }, 3 * D + 0.1)
      .to([...fits, ...q('.k-row'), ...q('.k-cell'), ...q('.k-seg')], { opacity: 0, duration: 0.35 }, 4 * D - 0.45);
  },
};

/* ------------------------------------------------------------------ Platforms
   Plan the pages, build them, launch the site with its store, tournaments and tools, and keep it
   running: results and drops update on their own. */
const P_BLOCKS: [string, number, number, number, number][] = [
  ['nav', 16, 16, 268, 18], ['hero', 16, 46, 268, 86], ['c1', 16, 144, 84, 62], ['c2', 108, 144, 84, 62], ['c3', 200, 144, 84, 62], ['res', 16, 218, 268, 36],
];
const P_PAGES = ['Store', 'Tournament', 'Staff tools'];

const platforms: Spec = {
  steps: ['Plan', 'Build', 'Launch', 'Run'],
  caption: 'A sample site, store and tools for a fictional org.',
  label: 'A site planned as a wireframe, built, launched with a store, tournament platform and staff tools, then kept running with live results and drops',
  scene: (
    <>
      <rect x="0.75" y="0.75" width="298.5" height="268.5" rx="12" className="f-paper s-ink" />
      {P_BLOCKS.map(([k, x, y, w, h]) => <rect key={k} x={x} y={y} width={w} height={h} rx="4" className="s-ink s-dash p-wire" />)}
      <rect x="16" y="16" width="268" height="18" rx="4" className="f-rule p-fill" />
      <g className="p-fill">
        <rect x="16" y="46" width="268" height="86" rx="8" className="f-ink" />
        <text x="32" y="84" className="t t-on-ink">Season 4 starts Friday</text>
        <rect x="32" y="98" width="72" height="18" rx="9" className="f-blue" />
      </g>
      {P_BLOCKS.slice(2, 5).map(([k, x, y, w, h]) => <rect key={k} x={x} y={y} width={w} height={h} rx="6" className="f-rule p-fill" />)}
      <g className="p-fill">
        <rect x="16.75" y="218.75" width="266.5" height="34.5" rx="6" className="f-paper s-rule" />
        <text x="32" y="241" className="t t-ink p-res">Next: Orca, Saturday</text>
      </g>
      <g className="p-live">
        <rect x="232" y="226" width="44" height="20" rx="10" className="f-blue" />
        <text x="254" y="240" textAnchor="middle" className="t t-on-blue" style={{ fontSize: 11 }}>Live</text>
      </g>
      {P_PAGES.map((t, k) => (
        <g key={t} className="p-page">
          <rect x="318.75" y={14.75 + k * 86} width="160.5" height="70.5" rx="10" className="f-paper s-ink" />
          <text x="334" y={38 + k * 86} className="t t-ink">{t}</text>
          <rect x="334" y={50 + k * 86} width="100" height="5" rx="2.5" className="f-rule" />
          <rect x="334" y={62 + k * 86} width="64" height="5" rx="2.5" className="f-rule" />
        </g>
      ))}
      <g className="p-drop">
        <rect x="384" y="23" width="84" height="22" rx="11" className="f-blue" />
        <text x="426" y="38" textAnchor="middle" className="t t-on-blue" style={{ fontSize: 12 }}>Drop live</text>
      </g>
    </>
  ),
  build(q, tl) {
    const res = q('.p-res')[0];
    tl.set(q('.p-wire'), { opacity: 0 }, 0)
      .set(q('.p-fill'), { opacity: 0, y: 6 }, 0)
      .set(q('.p-page'), { opacity: 0, x: -36 }, 0)
      .set([...q('.p-live'), ...q('.p-drop')], { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' }, 0)
      .call(() => { res.textContent = 'Next: Orca, Saturday'; }, [], 0)
      // Plan
      .to(q('.p-wire'), { opacity: 1, duration: 0.35, stagger: 0.12 }, 0.1)
      // Build
      .to(q('.p-fill'), { opacity: 1, y: 0, duration: 0.45, stagger: 0.14 }, D + 0.1)
      .to(q('.p-wire'), { opacity: 0, duration: 0.4 }, D + 1.3)
      // Launch
      .to(q('.p-page'), { opacity: 1, x: 0, duration: 0.55, stagger: 0.2 }, 2 * D + 0.1)
      .to(q('.p-live'), { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, 2 * D + 0.9)
      // Run: the result comes in and a drop goes live, with no one touching the site
      .to(res, { opacity: 0, duration: 0.2 }, 3 * D + 0.2)
      .call(() => { res.textContent = 'Won 2:1 against Orca'; }, [], 3 * D + 0.42)
      .to(res, { opacity: 1, duration: 0.3 }, 3 * D + 0.45)
      .to(q('.p-drop'), { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, 3 * D + 0.8)
      .to([...q('.p-fill'), ...q('.p-page'), ...q('.p-live'), ...q('.p-drop')], { opacity: 0, duration: 0.35 }, 4 * D - 0.45);
  },
};

const SPECS: Record<Pillar, Spec> = { intel: analyst, command: hq, engine: content, studio: creators, forge: platforms };

/** One pillar's loop: the scene, and a strip of its four steps whose bars fill as it plays. */
export function Loop({ id }: { id: Pillar }) {
  const ref = useRef<HTMLElement>(null);
  const spec = SPECS[id];

  useGSAP(() => {
    const root = ref.current!;
    const q: Q = gsap.utils.selector(root);
    // Built the first time the panel comes on screen, not at load, so five loops don't all set
    // themselves up while the page is still starting.
    let tl: gsap.core.Timeline | null = null;
    const build = () => {
      tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'power2.out', duration: 0.5 } });
      const steps = q('.loop__step');
      steps.forEach((s, k) => {
        tl!.set(s.querySelector('i'), { scaleX: 0 }, 0)
          .call(() => steps.forEach((x, j) => x.toggleAttribute('data-on', j === k)), [], k * D + 0.001)
          .to(s.querySelector('i'), { scaleX: 1, duration: D, ease: 'none' }, k * D);
      });
      spec.build(q, tl);
      tl.set({}, {}, steps.length * D);
      return tl;
    };
    // It plays only while it's on screen.
    const st = ScrollTrigger.create({
      trigger: root, start: 'top bottom', end: 'bottom top',
      onToggle: (s) => { if (s.isActive) (tl ?? build()).play(); else tl?.pause(); },
    });
    return () => { st.kill(); tl?.kill(); };
  }, { scope: ref });

  return (
    <figure ref={ref} className="loop">
      <svg className="loop__stage" viewBox="0 0 480 270" role="img" aria-label={`How it works: ${spec.label} (sample)`}>{spec.scene}</svg>
      <ol className="loop__steps" aria-hidden="true">
        {spec.steps.map((s, k) => (
          <li key={s} className="loop__step" data-on={k === 0 ? '' : undefined}><span>{String(k + 1).padStart(2, '0')}</span>{s}<i /></li>
        ))}
      </ol>
      <figcaption>{spec.caption}</figcaption>
    </figure>
  );
}
