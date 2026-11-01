import { cn } from '@/lib/cn';

// Product screens for the business page. Every business, post and number is a sample.

export const Sample = ({ className }: { className?: string }) => (
  <span className={cn('rounded-full bg-creme-deep px-2 py-0.5 text-[11px] font-semibold text-ink-60', className)}>Sample</span>
);

// Where a business's numbers already live, and the tools in each.
const SOURCES: [string, string][] = [
  ['Shop', 'Shopify · Square'],
  ['Payments', 'Stripe · PayPal'],
  ['Accounting', 'Xero · QuickBooks'],
  ['Bookings', 'Calendly'],
  ['Sheets', 'Google Sheets'],
  ['Socials', 'Instagram · TikTok'],
];

/** The hero: the tools a business already uses, wired into one dashboard, and the kind of
 *  thing that then happens on its own: a booking confirmed by text. */
export function BizHero() {
  return (
    <figure className="flow" aria-label="Your shop, payments, accounting, bookings, sheets and socials connected into one dashboard, with a booking confirmation sent automatically (sample)">
      <ul className="flow-src">
        {SOURCES.map(([k, v]) => (
          <li key={k} className="flow-chip">
            <b>{k}</b>
            <span>{v}</span>
          </li>
        ))}
      </ul>
      <svg aria-hidden="true" className="flow-wires" viewBox="0 0 60 600" preserveAspectRatio="none">
        {SOURCES.map(([k], i) => {
          const y = (i + 0.5) * 100;
          return <path key={k} d={`M0 ${y}C34 ${y} 26 300 60 300`} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div className="flow-out">
        <span aria-hidden="true" className="flow-port" />
        <div className="app">
          <div className="app-bar">
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-[9px] bg-strike font-display text-[13px] font-bold text-white">YB</span>
            <b className="font-display text-[17px] font-bold">Your Business</b>
            <Sample />
            <span className="ml-auto flex items-center gap-2 text-[12.5px] font-semibold text-ink-60"><i className="size-2 rounded-full bg-signal" />Live</span>
          </div>
          <div className="grid gap-2.5 p-3.5">
            <div className="grid grid-cols-3 gap-2">
              {[['Sales', '+8%', 'vs last week'], ['Orders', '146', 'this week'], ['Bookings', '38', 'Fri nearly full']].map(([k, v, s], i) => (
                <div key={k} className="app-tile grid gap-1 p-2.5!">
                  <p className="app-label">{k}</p>
                  <b className={cn('font-display text-[24px] leading-none font-bold', i === 0 && 'text-strike')}>{v}</b>
                  <p className="text-[11.5px] text-ink-60">{s}</p>
                </div>
              ))}
            </div>
            <div className="app-tile p-2.5!">
              <div className="flex items-end gap-1.5">
                {[52, 61, 48, 70, 88, 100, 64].map((h, i) => (
                  <span key={i} className="flex h-[64px] flex-1 items-end">
                    <span className={cn('block w-full rounded-t-[5px]', i === 5 ? 'bg-strike' : 'bg-mist')} style={{ height: `${h}%` }} />
                  </span>
                ))}
              </div>
            </div>
            <p className="flex items-center justify-between gap-3 rounded-[12px] bg-ice px-3 py-2 text-[12.5px]">
              <span><b className="font-semibold">Reminder sent:</b> invoice #1042, 3 days late</span>
              <span className="font-semibold text-strike">Auto</span>
            </p>
          </div>
        </div>
        <div className="flow-phone">
          <p className="mb-2 flex items-center justify-between text-[11px] font-semibold text-fog"><span>Messages</span><span>10:02</span></p>
          <p className="rounded-[14px] rounded-tl-[4px] bg-white/12 px-3 py-2.5 text-[12.5px] leading-snug text-white">
            Hi Sam, you’re booked for a full session on Tue 5 Nov at 10:30. Reply C to cancel or R to move it.
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-mist"><i className="size-1.5 rounded-full bg-signal" />Sent automatically from your booking page</p>
        </div>
      </div>
    </figure>
  );
}

/** The five services' visuals for the service grid: small, real-looking pieces of each. */
export function DashThumb() {
  return (
    <div className="app">
      <div className="app-bar py-2.5!">
        <b className="font-display text-[15px] font-bold">This week</b>
        <Sample />
        <span className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-ink-60"><i className="size-2 rounded-full bg-signal" />Synced</span>
      </div>
      <div className="grid gap-2.5 p-3">
        <div className="grid grid-cols-4 gap-2">
          {[['Sales', '+8%'], ['Orders', '146'], ['Bookings', '38'], ['Invoices due', '4']].map(([k, v], i) => (
            <div key={k} className="app-tile grid gap-1 p-2.5!">
              <p className="app-label truncate text-[11.5px]!">{k}</p>
              <b className={cn('font-display text-[22px] leading-none font-bold', i === 0 && 'text-strike')}>{v}</b>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.3fr_1fr] gap-2">
          <div className="app-tile flex items-end gap-1.5 p-2.5!">
            {[52, 61, 48, 70, 88, 100, 64].map((h, i) => (
              <span key={i} className="flex h-[70px] flex-1 items-end">
                <span className={cn('block w-full rounded-t-[4px]', i === 5 ? 'bg-strike' : 'bg-mist')} style={{ height: `${h}%` }} />
              </span>
            ))}
          </div>
          <ul className="app-tile grid content-start gap-1.5 p-2.5! text-[12px]">
            {[['Invoice #1042 late', 'Today'], ['Gift box: 6 left', 'Today'], ['Domain renews', 'Fri']].map(([k, w]) => (
              <li key={k} className="flex justify-between gap-2"><span className="truncate">{k}</span><b className="font-semibold text-strike">{w}</b></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function BookingThumb() {
  return (
    <div className="app p-3">
      <p className="mb-2 flex items-center justify-between"><b className="font-display text-[15px] font-bold">Book a session</b><Sample /></p>
      <div className="mb-2 flex gap-1">
        {[['Mon', '4'], ['Tue', '5'], ['Wed', '6'], ['Thu', '7']].map(([d, n], i) => (
          <span key={d} className={cn('grid flex-1 justify-items-center rounded-[9px] border py-1 text-[10.5px]', i === 1 ? 'border-strike bg-strike text-white' : 'border-hairline text-ink-60')}>
            {d}<b className="font-display text-[14px] leading-none">{n}</b>
          </span>
        ))}
      </div>
      <div className="mb-2 grid grid-cols-3 gap-1">
        {['09:00', '10:30', '12:00'].map((t, i) => (
          <span key={t} className={cn('rounded-[8px] border py-1 text-center text-[12px] font-semibold', i === 1 ? 'border-strike bg-ice text-strike' : 'border-hairline')}>{t}</span>
        ))}
      </div>
      <span className="block rounded-full bg-ink py-1.5 text-center text-[12.5px] font-semibold text-paper">Confirm booking</span>
    </div>
  );
}

export function ReelThumb() {
  return (
    <div className="flex items-end justify-center gap-2">
      {[['bg-navy', 'Our new season menu, in 20 seconds', 'Reels · Tue 18:00'], ['bg-trench', 'How we pack an order', 'LinkedIn · Wed 12:00']].map(([bg, cap, when], i) => (
        <div key={cap} className={cn('rounded-[18px] bg-ink p-1.5', i === 0 ? 'w-[46%]' : 'mb-3 w-[40%] opacity-90')}>
          <div className={cn('relative grid aspect-[9/14] place-items-center overflow-hidden rounded-[13px]', bg)}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 rounded-full bg-white/20 p-2 text-white"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
            <p className="absolute inset-x-2.5 bottom-2.5 text-[11.5px] leading-snug font-bold text-white">{cap}</p>
          </div>
          <p className="px-1 pt-1.5 pb-0.5 text-[10px] font-semibold text-fog">{when}</p>
        </div>
      ))}
    </div>
  );
}

export function NoteThumb() {
  return (
    <div className="app">
      <div className="app-bar py-2.5!"><b className="font-display text-[15px] font-bold">Market note</b><Sample /></div>
      <ul className="px-3.5 text-[12.5px]">
        {[['Rival A', 'Launched a loyalty card'], ['Rival B', 'Raised starter prices'], ['The gap', 'No evening bookings nearby']].map(([k, v]) => (
          <li key={k} className="grid grid-cols-[62px_minmax(0,1fr)] gap-2 border-b border-hairline py-2">
            <b className={cn('font-semibold', k === 'The gap' && 'text-strike')}>{k}</b><span>{v}</span>
          </li>
        ))}
      </ul>
      <p className="m-2.5 rounded-[10px] bg-creme px-3 py-2 text-[12px]"><b className="font-semibold text-strike">Try next:</b> evening bookings for a month.</p>
    </div>
  );
}

export function AuditThumb() {
  return (
    <div className="app">
      <div className="app-bar py-2.5!"><b className="font-display text-[15px] font-bold">Software audit</b><Sample /></div>
      <p className="mx-3 mt-3 rounded-[12px] bg-strike px-3 py-2.5 text-[13px] font-semibold text-white">6 unused seats and 2 tools doing the same job</p>
      <ul className="px-3.5 pt-1 pb-2 text-[12.5px]">
        {[['Design tool', '3 seats, 1 used', 'Cut 2'], ['Two chat apps', 'Same job', 'Keep one'], ['Old CRM', '4 seats, unused', 'Cancel']].map(([k, v, c]) => (
          <li key={k} className="flex items-center justify-between gap-2 border-b border-hairline py-2 last:border-b-0">
            <span><b className="font-semibold">{k}</b> <span className="text-ink-60">· {v}</span></span>
            <span className="rounded-full bg-ice px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-strike">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
