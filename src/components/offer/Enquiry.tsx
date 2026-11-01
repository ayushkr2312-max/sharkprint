'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { track } from '@/lib/track';

// What each audience is asked. Field names must match public/__forms.html, which is what
// Netlify reads at deploy time to accept the submissions.
const KINDS = {
  business: {
    org: 'Business name or website',
    interests: ['Dashboard & reporting', 'Website & tools', 'Content', 'Market insight', 'Spend & automation', 'Not sure yet'],
    plans: ['Project', 'Monthly', 'Partner', 'Not sure yet'],
    message: 'What takes up the most time right now?',
  },
  school: {
    org: 'School or college',
    interests: ['Starting a program', 'Tryouts & coaching', 'A league', 'Staff dashboard', 'Media & broadcast', 'Not sure yet'],
    plans: null,
    message: 'Anything we should know? Students, games, timing.',
  },
};

type State = 'idle' | 'sending' | 'sent' | 'error';

/** The enquiry form at the foot of a page we send: name, email and organisation, with
 *  optional picks, posted to Netlify Forms. A "Start" button on a plan card fills in the
 *  plan before the visitor arrives here. */
export function Enquiry({ kind }: { kind: keyof typeof KINDS }) {
  const k = KINDS[kind];
  const [state, setState] = useState<State>('idle');
  const [name, setName] = useState('');
  const [picks, setPicks] = useState<string[]>([]);
  const [plan, setPlan] = useState('');

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest('[data-plan]');
      if (a) setPlan(a.getAttribute('data-plan')!);
    };
    // On window, in the capture phase, beside the smooth-scroll handler: it stops in-page
    // link clicks from going any further, but listeners on the same target still hear them.
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    const data = new FormData(e.currentTarget);
    try {
      const r = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams([...data.entries()].map(([key, v]) => [key, String(v)])).toString(),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState('sent');
      track('generate_lead', { form: 'enquiry', page: kind });
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="enquiry grid content-center justify-items-start gap-4" role="status">
        <svg viewBox="0 0 28 28" aria-hidden="true" className="offer-tick size-11!"><circle cx="14" cy="14" r="14" /><path d="M8.5 14.5l3.8 3.8 7.4-8" /></svg>
        <p className="font-display text-[30px] leading-tight font-bold">Thanks{name ? `, ${name.trim().split(/\s+/)[0]}` : ''}.</p>
        <p className="max-w-[28em] text-[16.5px] text-ink-60">Your enquiry is with the Sharkprint team. We’ll reply by email to find a time for your call.</p>
      </div>
    );
  }

  const toggle = (v: string) => setPicks((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  return (
    <form name="enquiry" onSubmit={onSubmit} className="enquiry grid gap-5">
      <input type="hidden" name="form-name" value="enquiry" />
      <input type="hidden" name="page" value={kind} />
      <p hidden><label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <input type="hidden" name="interest" value={picks.join(', ')} />
      {k.plans && <input type="hidden" name="plan" value={plan} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="enquiry-field">
          <span>Your name</span>
          <input name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="enquiry-field">
          <span>Work email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="enquiry-field">
        <span>{k.org}</span>
        <input name="organisation" required autoComplete="organization" />
      </label>

      <fieldset className="enquiry-field">
        <legend>What would you like help with? <small>Optional</small></legend>
        <div className="flex flex-wrap gap-2">
          {k.interests.map((v) => (
            <button key={v} type="button" aria-pressed={picks.includes(v)} onClick={() => toggle(v)} className="enquiry-chip">{v}</button>
          ))}
        </div>
      </fieldset>

      {k.plans && (
        <fieldset className="enquiry-field">
          <legend>How would you like to start? <small>Optional</small></legend>
          <div className="flex flex-wrap gap-2">
            {k.plans.map((v) => (
              <button key={v} type="button" aria-pressed={plan === v} onClick={() => setPlan(plan === v ? '' : v)} className="enquiry-chip">{v}</button>
            ))}
          </div>
        </fieldset>
      )}

      <label className="enquiry-field">
        <span>{k.message} <small>Optional</small></span>
        <textarea name="message" rows={3} />
      </label>

      <div className="grid gap-3">
        <button type="submit" disabled={state === 'sending'} className="h-[54px] rounded-full bg-strike text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-strike-hover disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Book my free call'}
        </button>
        <p className="text-[13px] text-ink-60" aria-live="polite">
          {state === 'error' ? 'That didn’t send. Please try again in a moment.' : 'We only use these details to reply to you.'}
        </p>
      </div>
    </form>
  );
}
