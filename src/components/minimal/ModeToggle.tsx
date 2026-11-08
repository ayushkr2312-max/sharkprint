'use client';

/** Switches the page between its white and black modes, and remembers the choice. Until the
 *  visitor picks one, the OS setting decides. */
export function ModeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const now = root.dataset.mode ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = now === 'dark' ? 'light' : 'dark';
    root.dataset.mode = next;
    try { localStorage.setItem('mode', next); } catch {}
  };
  return (
    <button type="button" className="mode" onClick={toggle} aria-label="Switch between light and dark mode">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
