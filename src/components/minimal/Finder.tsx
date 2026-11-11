'use client';

import { useState } from 'react';
import { CAP_COUNT } from '@/content/minimal';
import { getLenis } from '@/lib/scroll';

const TRY = ['player', 'investors', 'opponent', 'store', 'schedule'];

/** Marks every option ([data-cap]) that holds all the typed words, dims the rest, and updates
 *  each pillar's count in the index. Returns how many matched, and the first match. */
function mark(q: string) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const per: Record<string, number> = {};
  let hits = 0, first: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>('[data-cap]').forEach((el) => {
    const hit = words.length > 0 && words.every((w) => el.dataset.cap!.includes(w));
    el.toggleAttribute('data-hit', hit);
    el.toggleAttribute('data-dim', words.length > 0 && !hit);
    if (hit) {
      hits++;
      first ??= el;
      per[el.dataset.pillar!] = (per[el.dataset.pillar!] ?? 0) + 1;
    }
  });
  document.querySelectorAll<HTMLElement>('[data-count-for]').forEach((el) => {
    const n = per[el.dataset.countFor!] ?? 0;
    el.textContent = words.length ? String(n) : el.dataset.total!;
    el.toggleAttribute('data-hit', words.length > 0 && n > 0);
  });
  return { hits: words.length ? hits : CAP_COUNT, first };
}

function goTo(el: HTMLElement | null) {
  if (!el) return;
  const nav = document.querySelector<HTMLElement>('.nav')?.offsetHeight ?? 0;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -(nav + 96), duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** "Find what you need": type a need and every option across the five pillars that matches it
 *  lights up while the rest step back; the index shows how many each pillar has. Enter, or a
 *  suggestion, takes you to the first match. It works on the server-rendered option lists, so
 *  they read in full without it. */
export function Finder() {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState(CAP_COUNT);
  const search = (next: string) => {
    setQ(next);
    const r = mark(next);
    setHits(r.hits);
    return r.first;
  };

  return (
    <div className="finder" role="search">
      <label htmlFor="finder-q" className="finder__label">Find what you need</label>
      <div className="finder__field">
        <input
          id="finder-q" type="search" value={q} autoComplete="off" spellCheck={false}
          placeholder="Try player, investors or store"
          onChange={(e) => search(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); goTo(mark(q).first); }
            if (e.key === 'Escape') search('');
          }}
        />
        {q && <button type="button" className="finder__clear" onClick={() => search('')} aria-label="Clear the search">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
        </button>}
      </div>
      <div className="finder__try">
        {TRY.map((t) => (
          <button key={t} type="button" className="finder__chip" aria-pressed={q.toLowerCase() === t.toLowerCase()} onClick={() => goTo(search(t))}>{t}</button>
        ))}
      </div>
      <p className="finder__status" role="status">
        {!q ? `${CAP_COUNT} options across five pillars.` : hits ? `${hits} ${hits === 1 ? 'option matches' : 'options match'}. Press Enter to go to the first.` : 'Nothing matches that yet. Try a broader word.'}
      </p>
    </div>
  );
}
