import Link from 'next/link';
import { Room } from './Room';
import { FooterMark } from './FooterMark';

// The homepage's rooms; on the homepage these scroll instead of navigating.
const NAV = [
  ['Engine', '/#engine'],
  ['Intel', '/#intel'],
  ['Command', '/#command'],
  ['Forge', '/#forge'],
  ['Insiders', '/#insiders'],
];

/** The Lateral Line ends by underlining a giant SHARKPRINT wordmark. */
export function Footer() {
  return (
    <Room as="footer" room="footer" pad={false} className="pt-10 pb-10 md:pb-12">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-ink-60">
        <span className="label">© 2026 Finishers Sharkprint</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="label py-2.5 tracking-[.14em] no-underline hover:text-strike">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <FooterMark />
    </Room>
  );
}
