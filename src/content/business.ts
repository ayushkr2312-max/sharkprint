// For businesses: the same systems, offered to small and growing businesses of any kind.
// Businesses, rivals and numbers shown are samples. To confirm before relying on them: the
// free first call, the fixed-price blueprint, the three ways to start (and the quarterly
// planning session), the founding-client offer and the tools listed as connectable.
// Sent to people directly; not linked from the main site.

export const BUSINESS_META = {
  title: 'For business: run the business, not the admin',
  description: 'For growing teams of 5 to 50 people: we connect your tools, build your website and bookings, keep your content going out and report your numbers every month.',
};

export const ASSURANCES = ['A free first call', 'A fixed price before any work starts', 'Your accounts and data stay yours'];

/** Tools a business already pays for that Command connects to (names only, no logos). */
export const TOOLS = ['Shopify', 'Square', 'WooCommerce', 'Stripe', 'PayPal', 'Xero', 'QuickBooks', 'Google Sheets', 'Google Calendar', 'Calendly', 'HubSpot', 'Mailchimp', 'Instagram', 'TikTok', 'WhatsApp Business'];

/** What changes, area by area. */
export const COMPARE: [string, string, string][] = [
  ['Reporting', 'Numbers pulled together by hand, usually late', 'A live dashboard, and a plain report every month'],
  ['Website', 'Updated when someone finds the time', 'Prices, hours and offers you change yourselves, from one place'],
  ['Orders and bookings', 'Taken by phone, DM and email', 'Taken online, confirmed and reminded automatically'],
  ['Content', 'Posted when there’s a spare hour', 'Short videos every week, on a plan you approve'],
  ['Software', 'Subscriptions that nobody reviews', 'Audited once a quarter, with overlaps cut'],
  ['The market', 'Noticed when a customer mentions it', 'A monthly note on rivals, prices and gaps'],
];

export type Service = { id: string; tab: string; tag: string; title: string; body: string; gets: string[] };

export const SERVICES: Service[] = [
  { id: 'dashboard', tab: 'Dashboard & reporting', tag: 'Command', title: 'See the whole business on one screen.',
    body: 'We connect the tools you already use, your shop, payments, accounting, calendar and socials, clean what comes out of them, and build a dashboard around the questions you actually ask.',
    gets: ['A live dashboard for owners and managers', 'Reminders for invoices, renewals and low stock', 'A monthly report: what grew, what slipped, what’s next', 'The numbers that need judgement, checked by a person'] },
  { id: 'web', tab: 'Website, shop & tools', tag: 'Forge', title: 'A website and tools that fit how you work.',
    body: 'Every build starts as a blueprint you approve. Then we build the site your customers use and the tools your team uses on one base, so orders, bookings and stock land in one place.',
    gets: ['A website your team can update', 'An online shop or booking system', 'Client portals and team tools: rotas, job sheets, stock', 'Training and documentation at handover'] },
  { id: 'content', tab: 'Content', tag: 'Engine', title: 'Stay visible without a content team.',
    body: 'You already film demos, events and day-to-day work. We cut it into short videos with captions, plan the month and post on a schedule you approve.',
    gets: ['Short videos for Reels, TikTok, Shorts and LinkedIn', 'A monthly content plan', 'Captions and subtitles in your brand style', 'Creator partnerships when you want more reach'] },
  { id: 'market', tab: 'Market insight', tag: 'Intel', title: 'Know what your market is doing.',
    body: 'Each month we read what competitors post, launch and charge, and what their customers say, and turn it into a short note with one thing to try.',
    gets: ['A monthly market note', 'Competitor tracking: offers, prices, content', 'A summary of what customers say in reviews', 'Opportunities, ranked by effort'] },
  { id: 'efficiency', tab: 'Spend & automation', tag: 'Efficiency', title: 'Pay for less. Copy and paste less.',
    body: 'We audit every subscription and the manual steps between them, cut what overlaps, and automate the repetitive work your team does every week.',
    gets: ['A software and subscription audit', 'Automations between the apps you use', 'Clean customer and product data', 'A quarterly review of what you pay for'] },
];

/** Who it's for, and where each usually starts. */
export const SECTORS: [string, string][] = [
  ['Retail and e-commerce', 'Shop, stock and payments on one dashboard, with product videos every week.'],
  ['Hospitality and cafés', 'Bookings and deposits online, offers on the site, and a steady feed of short videos.'],
  ['Clinics, salons and studios', 'Appointments, reminders and client records in one place.'],
  ['Professional services', 'A client portal for quotes, files and invoices, and a monthly report.'],
  ['Trades and field services', 'Quotes, job sheets and scheduling that work from a phone.'],
  ['Agencies and creative teams', 'Projects, time and billing in one view, and content for your own channels.'],
];

export type Phase = { when: string; title: string; body: string; get: string };

export const PROCESS: Phase[] = [
  { when: 'Step 1', title: 'Discovery', body: 'A conversation about how the business runs today and what’s slowing it down.', get: 'A short list of priorities' },
  { when: 'Step 2', title: 'Blueprint', body: 'A written plan: what we connect, build and automate, who does what, and what it costs.', get: 'Scope, timeline and price, before any work starts' },
  { when: 'Step 3', title: 'Build', body: 'We connect, build and test on your real data, in your own accounts.', get: 'Working systems, reviewed with you' },
  { when: 'Step 4', title: 'Handover', body: 'Your team is trained on everything we set up, with written guides to keep.', get: 'Training and documentation' },
  { when: 'Every month', title: 'Run', body: 'Automations keep it running and people check the details.', get: 'A monthly report and review' },
];

export const PRINCIPLES: [string, string][] = [
  ['You own everything', 'Sites, data and accounts are set up in your name. Nothing is locked to us.'],
  ['Your tools stay', 'We connect what you already use and only replace what isn’t working.'],
  ['People check the work', 'Automation does the repetitive part. A person reviews every report and build.'],
  ['Plain reporting', 'One monthly report in plain language: what changed, what it means, what’s next.'],
  ['A trained team', 'Every handover includes training and written guides for your staff.'],
  ['Start small', 'One service is a fine start. Add more when it’s worth it.'],
];

export const ENGAGE: { name: string; line: string; fits: string; priced: string; cta: string }[] = [
  { name: 'Project', line: 'One build or setup, scoped and priced up front in the blueprint.', fits: 'A new website, a booking system or a dashboard.', priced: 'The size of the build: pages, connections and tools.', cta: 'Scope a project' },
  { name: 'Monthly', line: 'Services that keep running: reporting, content, market notes and support.', fits: 'Teams that want it kept current without managing it.', priced: 'What’s included each month: videos, reports, support.', cta: 'Start monthly' },
  { name: 'Partner', line: 'All five services, with a planning session every quarter.', fits: 'Businesses growing across several areas at once.', priced: 'One quarterly fee for everything, agreed in the blueprint.', cta: 'Talk about partnering' },
];

export const FOUNDING = 'We’re taking on our first business clients now. You work directly with the people who build and run your systems, and your feedback shapes what we build next.';

export const BUSINESS_FAQ: [string, string][] = [
  ['Do we need to replace the tools we use?', 'No. We connect what you already have, and only suggest replacing something when it costs more than it gives.'],
  ['Who owns the website, the data and the accounts?', 'You do. Everything is set up in your accounts, and your team gets the documentation.'],
  ['We’re a small team. Is this for us?', 'Yes. Most work starts with one service, scoped to what you need now.'],
  ['Why aren’t prices listed?', 'Because every business starts somewhere different. The first call is free, and the blueprint gives you a fixed price before any work starts, so you never pay for anything you haven’t seen priced.'],
  ['How long does setup take?', 'A dashboard usually takes two to four weeks. Websites and tools are scheduled in the blueprint.'],
  ['Is this AI?', 'Automation handles the repetitive work. People check every report, video and build before it reaches you.'],
];
