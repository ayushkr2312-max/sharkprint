import type { SVGProps } from 'react';

// Pillar icons from assets/icons/*.svg, recoloured to currentColor so they
// follow the surface they sit on; plus the small UI icons used by tabs.
const PATHS = {
  engine: (
    <>
      <rect x="30" y="14" width="36" height="64" rx="7" />
      <path d="M44 38 L56 46 L44 54 Z" />
      <path d="M14 30h10M14 46h10M14 62h10M72 30h10M72 46h10M72 62h10" />
      <path d="M36 70h24" />
    </>
  ),
  intel: (
    <>
      <circle cx="48" cy="48" r="32" />
      <circle cx="48" cy="48" r="18" strokeDasharray="4 5" />
      <path d="M48 48 L72 26" />
      <path d="M48 10v8M48 78v8M10 48h8M78 48h8" />
      <circle cx="62" cy="38" r="4" fill="currentColor" stroke="none" />
    </>
  ),
  command: (
    <>
      <rect x="12" y="14" width="72" height="68" rx="8" />
      <path d="M12 32h72" />
      <rect x="20" y="40" width="24" height="16" rx="3" />
      <rect x="52" y="40" width="24" height="34" rx="3" />
      <polyline points="20,72 27,64 33,69 44,60" />
    </>
  ),
  forge: (
    <>
      <rect x="10" y="16" width="76" height="62" rx="8" />
      <path d="M10 30h76" />
      <circle cx="19" cy="23" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="26" cy="23" r="1.5" fill="currentColor" stroke="none" />
      <path d="M38 44 L28 54 L38 64M58 44 L68 54 L58 64M52 42 L44 66" />
    </>
  ),
  scout: (<><circle cx="42" cy="42" r="24" /><path d="M60 60 L80 80" /></>),
  prep: (<><rect x="14" y="14" width="68" height="68" rx="8" /><path d="M14 37h68M14 60h68M37 14v68M60 14v68" /></>),
  market: (<><polyline points="12,72 34,48 50,60 82,24" /><path d="M64 24h18v18" /></>),
  analyst: (<><circle cx="48" cy="34" r="16" /><path d="M18 82c4-18 16-26 30-26s26 8 30 26" /></>),
  blueprint: (<><rect x="12" y="16" width="72" height="64" rx="6" /><path d="M12 38h72M40 38v42" strokeDasharray="5 5" /></>),
  live: (<><rect x="12" y="16" width="72" height="64" rx="6" /><circle cx="48" cy="48" r="10" fill="currentColor" stroke="none" /></>),
  sync: (<><path d="M78 40a32 32 0 0 0-58-8M18 56a32 32 0 0 0 58 8" /><path d="M20 18v14h14M76 78V64H62" /></>),
  check: <polyline points="20,50 40,68 76,28" />,
} as const;

export type IconName = keyof typeof PATHS;
export const PILLARS = ['engine', 'intel', 'command', 'forge'] as const;
export type Pillar = (typeof PILLARS)[number];

export function Icon({ name, strokeWidth = 6, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {PATHS[name]}
    </svg>
  );
}

/** The Finishers shark's outline in a 2000 × 1200 box: the head, the "i" and the body spell
 *  "Fin"; the i's dot is its own path so Sharkprint can colour it. */
export const SHARK = {
  body: 'M0 493L596 353Q790 140 1127 0Q945 165 845 415L178 572Q245 668 328 745L428 654L526 702L587 646L694 698L781 661L676 758L603 723L539 783L472 752L410 810Q540 895 682 932Q692 1000 712 1062C440 1020 170 840 0 493ZM960 474Q1030 457 1108 452L919 973Q985 1095 1117 1197Q930 1105 779 973ZM1249 452Q1380 460 1503 503L1360 537L1306 688L1694 550Q1830 440 1998 397C1870 470 1790 660 1906 858Q1760 830 1713 681Q1370 735 1055 986Z',
  dot: 'M1030 282L1206 241L1170 341L994 381Z',
};

/** The Finishers shark: its head, the "i" and the body spell "Fin". Sharkprint's mark is
 *  the same shark with the i's dot in blue (set --dot on it or a parent to recolour). */
export function SharkMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 2000 1200" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={SHARK.body} />
      <path d={SHARK.dot} style={{ fill: 'var(--dot, currentColor)' }} />
    </svg>
  );
}
