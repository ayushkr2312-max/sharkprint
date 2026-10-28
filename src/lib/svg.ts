// Asset SVGs are inlined (not <img>) so their text uses the site's fonts and
// rooms can drive their parts. IDs are prefixed so two copies never collide.

const cache = new Map<string, Promise<string>>();
let uid = 0;

function fetchText(url: string) {
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then((r) => {
      if (!r.ok) throw new Error(`${url} ${r.status}`);
      return r.text();
    }));
  }
  return cache.get(url)!;
}

// next/font self-hosts the brand fonts under generated family names, so the kit's
// font-family="'JetBrains Mono', …" would never match. Point them at the font variables.
const FONT_VARS: [RegExp, string][] = [
  [/'?JetBrains Mono'?/g, 'var(--font-jetbrains)'],
  [/'?DM Sans'?/g, 'var(--font-dm-sans)'],
  [/\bSaira\b/g, 'var(--font-saira)'],
  [/\bMichroma\b/g, 'var(--font-michroma)'],
];

function mapFonts(svg: Element) {
  svg.querySelectorAll('[font-family]').forEach((el) => {
    let family = el.getAttribute('font-family')!;
    FONT_VARS.forEach(([re, v]) => { family = family.replace(re, v); });
    el.removeAttribute('font-family');
    (el as SVGElement).style.fontFamily = family;
  });
}

export async function loadSvg(src: string, opts: { label?: string; decorative?: boolean } = {}) {
  const text = await fetchText('/assets/' + src);
  const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = doc.documentElement as unknown as SVGSVGElement;
  if (svg.nodeName.toLowerCase() !== 'svg') throw new Error('Not an SVG: ' + src);

  const prefix = `sv${++uid}-`;
  const ids = new Set<string>();
  svg.querySelectorAll('[id]').forEach((n) => {
    ids.add(n.id);
    n.id = prefix + n.id;
  });
  if (ids.size) {
    svg.querySelectorAll('*').forEach((n) => {
      for (const a of Array.from(n.attributes)) {
        if (a.value.includes('url(#')) {
          n.setAttribute(a.name, a.value.replace(/url\(#([^)]+)\)/g, (m, id) => (ids.has(id) ? `url(#${prefix}${id})` : m)));
        } else if ((a.name === 'href' || a.name === 'xlink:href') && a.value[0] === '#' && ids.has(a.value.slice(1))) {
          n.setAttribute(a.name, '#' + prefix + a.value.slice(1));
        }
      }
    });
  }
  mapFonts(svg);
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('focusable', 'false');
  if (opts.decorative) {
    svg.setAttribute('aria-hidden', 'true');
    svg.removeAttribute('role');
  } else if (opts.label) {
    svg.setAttribute('aria-label', opts.label);
  }
  return document.importNode(svg, true) as SVGSVGElement;
}
