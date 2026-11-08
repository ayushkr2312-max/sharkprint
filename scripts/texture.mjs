// Run: node scripts/texture.mjs public/assets/minimal/texture.svg
// The page texture: flowing ribs that converge into a twisting fold, like sculpted white panels.
// Drawn in black on transparent; the site uses it as a mask, so its colour comes from the
// page's tokens. Lines are solid; each rib between two lines is one flat tone, stepping darker
// across the fold as if lit from the left. No gradients anywhere.
import { writeFileSync } from 'node:fs';

const W = 1600, H = 1000, N = 96, STEPS = 40;
const fold = (y) => W * 0.55 + 150 * Math.sin((y / H) * Math.PI * 1.25 - 0.5);
const spread = (y) => 1150 + 170 * Math.cos((y / H) * Math.PI * 1.1 + 0.3);
// Lines bunch towards the fold and open out at the edges.
const offset = (t) => Math.sign(t - 0.5) * Math.pow(Math.abs(2 * t - 1), 1.45);
// The outer ribs swing a little more than the inner ones.
const swing = (t, y) => 55 * Math.abs(2 * t - 1) * Math.sin((y / H) * Math.PI * 1.8 + t * 2.2);

const line = (t) => Array.from({ length: STEPS + 1 }, (_, k) => {
  const y = -80 + ((H + 160) * k) / STEPS;
  return [fold(y) + offset(t) * spread(y) + swing(t, y), y];
});
const r = (n) => Math.round(n);
const pts = (p) => p.map(([x, y]) => `${r(x)},${r(y)}`);

const lines = Array.from({ length: N }, (_, i) => line(i / (N - 1)));
let ribs = '', strokes = '';
for (let i = 0; i < N - 1; i++) {
  const t = (i + 0.5) / (N - 1);
  // Light side left of the fold, shadow side right of it, a step deeper on every other rib.
  const shade = 0.05 + 0.3 * Math.max(0, (t - 0.42) / 0.58) + (i % 2 ? 0.05 : 0);
  ribs += `<path fill-opacity="${Math.round(shade * 100) / 100}" d="M${pts(lines[i]).join('L')}L${pts([...lines[i + 1]].reverse()).join('L')}Z"/>`;
}
lines.forEach((p, i) => {
  const t = Math.abs(2 * (i / (N - 1)) - 1);
  // Near the fold: fine and firm. Towards the edges: a touch wider and softer.
  strokes += `<path d="M${pts(p).join('L')}" stroke-width="${Math.round((0.8 + t * 1.2) * 10) / 10}" stroke-opacity="${Math.round((0.95 - t * 0.5) * 100) / 100}"/>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><g fill="#000">${ribs}</g><g fill="none" stroke="#000" stroke-linejoin="round">${strokes}</g></svg>`;
writeFileSync(process.argv[2], svg);
console.log(`${(svg.length / 1024).toFixed(1)} KB`);
