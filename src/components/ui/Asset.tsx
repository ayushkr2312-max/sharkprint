'use client';

import { useEffect, useEffectEvent, useRef } from 'react';
import { ASSET_RATIOS } from '@/lib/asset-ratios';
import { loadSvg } from '@/lib/svg';

type Props = {
  /** Path under public/assets, e.g. "engine/vod-timeline.svg" */
  src: string;
  label?: string;
  decorative?: boolean;
  /** Load immediately instead of when it comes within 1200px of the viewport. */
  eager?: boolean;
  className?: string;
  /** Called with the inlined <svg>; may return a cleanup. */
  onReady?: (svg: SVGSVGElement) => void | (() => void);
};

/** An asset-kit SVG, inlined so its text uses the site fonts and rooms can drive its parts.
 *  Its slot keeps the asset's aspect ratio, so nothing shifts while it streams in. */
export function Asset({ src, label, decorative, eager, className, onReady }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = useEffectEvent((svg: SVGSVGElement) => onReady?.(svg));

  useEffect(() => {
    const el = ref.current!;
    let cancelled = false;
    let cleanup: void | (() => void);
    let io: IntersectionObserver | undefined;

    const load = () => {
      loadSvg(src, { label, decorative })
        .then((svg) => {
          if (cancelled) return;
          el.replaceChildren(svg);
          cleanup = ready(svg);
        })
        .catch(() => {
          if (cancelled) return;
          const img = new Image();
          img.src = '/assets/' + src;
          img.alt = decorative ? '' : label || '';
          el.replaceChildren(img);
        });
    };

    if (eager) load();
    else {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io!.disconnect();
          load();
        }
      }, { rootMargin: '1200px 0px' });
      io.observe(el);
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      if (typeof cleanup === 'function') cleanup();
      el.replaceChildren();
    };
  }, [src, label, decorative, eager]);

  return <div ref={ref} data-asset={src} className={className} style={{ aspectRatio: ASSET_RATIOS[src] }} />;
}
