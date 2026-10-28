# Finishers Sharkprint — Next.js

The site from *Website Flow & Concept v1.0*, on Next.js 16 (App Router, TypeScript) + Tailwind v4, with GSAP (ScrollTrigger, Draggable, Inertia) and Lenis. Ported from the static build in `../website`, same design and interactions.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

`predev`/`prebuild` regenerate `src/lib/asset-ratios.ts` from `public/assets` so every inlined SVG reserves its space.

## Where things live

| Path | What |
| --- | --- |
| `src/app/globals.css` | Tailwind `@theme` tokens (colour, type scale, easing, shadows) + state hooks for JS-driven pieces |
| `src/app/{engine,intel,command,forge}` | Pillar routes, one `PillarPage` template fed by `src/content/pillars.ts` |
| `src/app/work/[slug]` | Case studies from `src/content/cases.ts` (the two included are labelled samples, `noindex`, not in the sitemap) |
| `src/app/insiders` | The human layer: who reviews what, and the review loop |
| `src/components/rooms/` | One component per homepage room; pillar rooms double as their page's hero |
| `src/components/site/` | Layout systems: header, footer, preloader, Lenis, Lateral Line, reveals |
| `src/components/ui/` | `Asset` (lazy inline SVG), `DragRail`, `MailTabs`, type components |

## Notes

- **Cache Components is on**, so Next keeps up to 3 visited routes in the DOM, hidden. The Lateral Line and anchors only use the visible page.
- **Layout systems wait for the page to hydrate**: each room's `<LineSvg>` announces itself (`src/lib/page-ready.ts`) before anything draws into it.
- **Environment** (see `.env.example`): `SITE_URL` for the sitemap and OG URLs.
- **Analytics**: `demo_interact` events go to `window.dataLayer`.
- **Placeholders**: footer socials, fictional names, the two sample case studies, turnaround figures to confirm.
- **Motion is always on**, whatever the OS "reduce motion" setting says (a deliberate choice for this site).
- **The Lateral Line** runs in a lane 40px outside the content column with a marker beside each room's eyebrow (`data-eyebrow`), and ends by turning into the footer wordmark's underline.
