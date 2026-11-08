import type { CSSProperties, ElementType } from 'react';
import { SharkMark } from '@/components/ui/Icon';

/** The nav and footer lockup: the shark mark, then FINISHERS SHARKPRINT in Michroma. The
 *  mark's dot takes the light blue. */
export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <a href={href} className="logo" aria-label="Finishers Sharkprint, back to the top">
      <SharkMark className="logo__mark" />
      <span className="logo__words"><span>Finishers</span> Sharkprint</span>
    </a>
  );
}

/** The footer's sign-off: SHARKPRINT across the full width, signed by Finishers. */
export function FooterMark() {
  return (
    <div className="fmark" data-draw="">
      <p className="fmark__word" aria-label="Sharkprint">SHARKPRINT</p>
      <p className="fmark__by"><SharkMark className="fmark__shark" />By Finishers</p>
    </div>
  );
}

/** A heading whose words rise into place, one after another, as it comes into view. */
export function Rise({ as: Tag = 'h2', text, ...rest }: { as?: ElementType; text: string; id?: string; className?: string }) {
  const words = text.split(' ');
  return (
    <Tag data-rise="" {...rest}>
      {words.map((w, n) => (
        <span key={n}>
          <span className="rw"><span style={{ '--i': n } as CSSProperties}>{w}</span></span>
          {n < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
