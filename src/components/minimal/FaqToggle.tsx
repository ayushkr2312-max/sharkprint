'use client';

import { useEffect, useState } from 'react';

/** Opens or closes every answer in the questions at once, and keeps its label true when the
 *  visitor opens or closes them one by one. */
export function FaqToggle() {
  const [allOpen, setAllOpen] = useState(false);

  useEffect(() => {
    const items = () => Array.from(document.querySelectorAll<HTMLDetailsElement>('#faq details'));
    const sync = () => setAllOpen(items().every((d) => d.open));
    sync();
    const faq = document.getElementById('faq');
    // "toggle" doesn't bubble; listen in the capture phase instead.
    faq?.addEventListener('toggle', sync, true);
    return () => faq?.removeEventListener('toggle', sync, true);
  }, []);

  const flip = () => {
    const next = !allOpen;
    document.querySelectorAll<HTMLDetailsElement>('#faq details').forEach((d) => { d.open = next; });
    setAllOpen(next);
  };

  return (
    <button type="button" className="faq__all" aria-pressed={allOpen} onClick={flip}>
      {allOpen ? 'Close all answers' : 'Open all answers'}
    </button>
  );
}
