import type { Pillar } from '@/components/ui/Icon';

// The minimal one-page site's words. No invented stats, quotes or logos: every number shown is
// a labelled sample for a fictional org.

export const HERO = {
  title: ['Play above', 'your weight.'],
  lead: 'The team behind your team: analysis, numbers, content, sites and creators.',
};

export const STATEMENT =
  'Every match, player, partner and fan your org has is worth more than it shows. We find it, measure it, build on it and put it to work.';

export type Cap = [string, string];
export type PillarInfo = {
  id: Pillar; name: string; kind: string; line: string;
  // Everything the pillar can run, in two groups. Each option is distinct: anything that was
  // a step inside another, or the same work under a second name, is folded into one.
  caps: { group: string; items: Cap[] }[];
};

// Led by the analyst and the numbers, so the page reads as a whole agency rather than a clip
// shop. Every option here is one the rest of the site already describes.
export const PILLARS: PillarInfo[] = [
  {
    id: 'intel', name: 'Intel', kind: 'Your personal data analyst',
    line: 'Scouting and prep before every match, reviews after it, a file on every opponent, and scouting for when you’re building, mostly from public match data.',
    caps: [
      { group: 'To compete', items: [
        ['Match prep', 'Each opponent broken down into a game plan with your coach: how they play, who to watch, what to pick and ban.'],
        ['Match and scrim reviews', 'What won and lost rounds, with VOD timestamps and what to practise next. Scrims too, whenever you choose to share them.'],
        ['Opponent database', 'A file on every team you could face, updated after each of their matches.'],
        ['Team and player trends', 'How your roster looks to opponents, and each player’s form across the season.'],
      ] },
      { group: 'To build', items: [
        ['Player and staff scouting', 'Shortlists by role fit and track record, with a scout’s note on each.'],
        ['Scene reports', 'The games and regions you care about: who’s rising, and teams to scrim.'],
        ['Competitor intel', 'What rival orgs post, sign and launch, read every month.'],
      ] },
    ],
  },
  {
    id: 'command', name: 'Command', kind: 'Your org, live',
    line: 'Your public numbers, from socials, results and streams, on one screen, always current, with a report every month. Anything private joins only if you add it.',
    caps: [
      { group: 'Run the org', items: [
        ['Live dashboard', 'Socials, results, content and partner deliverables on one screen, always current.'],
        ['One source of truth', 'Your public numbers, plus anything you choose to add, kept as clean, linked data.'],
        ['Calendar and reminders', 'Matches, scrims, drops and travel together, with a nudge before anything’s due.'],
        ['Monthly report', 'What grew, what stalled, and what to do about it.'],
      ] },
      { group: 'Partners and money', items: [
        ['Partner reporting', 'Every partner post and mention checked against what went live, and a recap ready to send.'],
        ['Pitch decks', 'Built from your own live numbers, for the partners you pitch.'],
        ['Spend reports', 'Where the money goes each month, and what to cut, from the costs you choose to share.'],
      ] },
    ],
  },
  {
    id: 'engine', name: 'Engine', kind: 'Content and media',
    line: 'Every match and stream turned into content for every channel: found, made, captioned and posted on brand.',
    caps: [
      { group: 'Make', items: [
        ['Moment finding', 'Every stream and match logged; software flags the moments, editors pick the best.'],
        ['Short-form video', 'For Shorts, Reels and TikTok, with subtitles and edits in your colours.'],
        ['Highlight videos', 'The match told in minutes, for YouTube.'],
      ] },
      { group: 'Publish', items: [
        ['Content calendar and posting', 'A month planned around your matches, captions written, posted on every platform.'],
        ['Player channels', 'Versions for your players’ own accounts as well as the org’s.'],
        ['Trend scouting', 'What’s working in your scene’s feeds right now, and how to use it.'],
      ] },
    ],
  },
  {
    id: 'forge', name: 'Forge', kind: 'Sites, stores and tools',
    line: 'Your website, store, tournaments and staff tools on one base, built to carry your name.',
    caps: [
      { group: 'For your fans', items: [
        ['Org website', 'Rosters, matches, results and partners, updated as you play.'],
        ['Microsites', 'Season launches, player reveals and partner activations.'],
        ['Merch store', 'Drops, sizes, checkout and inventory, linked to your site.'],
        ['Tournament platforms', 'Registration, brackets, results and admin.'],
      ] },
      { group: 'For your staff', items: [
        ['Staff tools', 'Scrim schedulers, VOD queues and payouts, built for how you work.'],
        ['Discord bots', 'Match alerts, roles, tickets and stats in your server.'],
      ] },
    ],
  },
  {
    id: 'studio', name: 'Studio', kind: 'Creator programs',
    line: 'Creators worth signing, everything they make in one library, every stream on one schedule.',
    caps: [
      { group: 'Sign creators', items: [
        ['Creator scouting', 'Audiences that look like your fans, and streams watched by people who know the scene.'],
        ['Offer and onboarding', 'Your perks packaged under your name, and rights agreed up front.'],
        ['Media kits', 'Each creator’s reach and audience on one page.'],
      ] },
      { group: 'Run the program', items: [
        ['Content library', 'Everything they make, tagged by creator, game and platform.'],
        ['Stream schedules', 'Every creator’s week, clear of match days, with go-live alerts in your Discord.'],
        ['Watch parties', 'Your creators streaming your matches.'],
        ['Program reports', 'How your creator program is growing each month, and what to try next.'],
      ] },
    ],
  },
];

export const CAP_COUNT = PILLARS.reduce((n, p) => n + p.caps.reduce((m, g) => m + g.items.length, 0), 0);

// The live report (a sample month for a fictional org).
export const KPIS = [
  { id: 'reach', label: 'Impressions', to: 4.2, dec: 1, suf: 'M', bars: [40, 52, 48, 66, 74, 100] },
  { id: 'hours', label: 'Stream hours', to: 1860, dec: 0, suf: '', bars: [58, 62, 70, 64, 82, 100] },
  { id: 'clips', label: 'Clip views', to: 2.9, dec: 1, suf: 'M', bars: [30, 44, 58, 52, 80, 100] },
  { id: 'eng', label: 'Engagement', to: 6.1, dec: 1, suf: '%', bars: [70, 66, 78, 84, 80, 100] },
] as const;

export const READERS = [
  { id: 'partner', label: 'A partner', lead: 'clips', title: 'What your partnership reached', note: 'Clips and late-night streams reach an audience where 58% are aged 18 to 24.', as: 'A one-page recap, with links to every clip' },
  { id: 'staff', label: 'Your staff', lead: 'eng', title: 'What changed this month', note: 'Engagement held at 6.1% while stream hours grew, and clips brought in most new followers.', as: 'The monthly report, in Command' },
  { id: 'signing', label: 'A new signing', lead: 'reach', title: 'What they’d be joining', note: 'Your reach and audience, ready to show the player or creator you want to sign.', as: 'A one-page sheet for your next signing' },
] as const;

// A sample match week: what each pillar hands over, by day (0 is Monday). Match on Saturday.
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MATCH_DAY = 5;
export const WEEK: Record<Pillar, [number, string][]> = {
  engine: [[0, 'Weekend VODs logged'], [1, 'Shorts batch out'], [5, 'Match clips out'], [6, 'Highlights video']],
  intel: [[0, 'Scrim review'], [2, 'Scouting report: Orca'], [4, 'Team prep report']],
  command: [[0, 'Socials synced'], [3, 'Partner post reminder'], [5, 'Match-day dashboard'], [6, 'Week in numbers']],
  forge: [[1, 'Roster page updated'], [3, 'Match page live'], [6, 'Results on the site']],
  studio: [[0, 'Creator schedules out'], [4, 'Watch party booked'], [6, 'Creator clips filed']],
};

export const INSIDERS: [string, string][] = [
  ['Software drafts it', 'Reports, dashboards and content, built by automations.'],
  ['An insider checks it', 'Someone who has worked inside an esports org fixes what’s off.'],
  ['You get it, signed', 'Nothing reaches you without a name on it.'],
];

export const STEPS: [string, string][] = [
  ['Discovery', 'We learn how your org runs today, from what’s public and what you choose to tell us, and what next season should look like.'],
  ['Blueprint', 'A plan for what to build first and why, with the cost before anything starts.'],
  ['Build and automate', 'We build it and wire up the automations. Insiders review every piece.'],
  ['Launch', 'Your staff trained on it, and the docs handed over.'],
  ['Optimise', 'A report every month, and changes based on what it shows.'],
];

// The questions an org asks first, grouped. Answers stay inside what the rest of the site
// already promises; nothing here commits to a price, a turnaround or a sponsor.
export const FAQ: { group: string; items: [string, string][] }[] = [
  {
    group: 'What it is',
    items: [
      ['What does Sharkprint actually do?', 'It runs the work around your teams that most orgs never have enough people for. Intel is your data analyst: scouting, prep and reviews. Command keeps your numbers live on one screen. Engine turns every match and stream into content for every channel. Forge builds your site, store and staff tools. Studio runs your creator program. One partner, five pillars, all working from the same numbers.'],
      ['Do we need all five pillars?', 'No. Most orgs start with the one that would change the most this season and add others when they pay off. Each pillar works on its own, and they get sharper together, because each one feeds the same report.'],
      ['Is this just AI?', 'No. Automation does the repetitive part, like finding the moments in hours of VOD or keeping six social accounts in sync. People who have worked inside esports orgs choose the clips, check the reports and sign off every piece before it reaches you.'],
      ['How is this different from an agency or freelancers?', 'An agency or a freelancer usually covers one job, with its own tools and its own numbers. Sharkprint runs five jobs on one system, so your clips, scouting, numbers, site and creators all add up to one picture of the org, with one partner to talk to.'],
    ],
  },
  {
    group: 'Working together',
    items: [
      ['We’re a small org. Is this for us?', 'Yes. It’s built for orgs that want to look and play bigger than their headcount. Starting small is normal: one pillar, scoped to what you need now, with room to grow into the rest.'],
      ['Do we have to replace the tools we use?', 'No. We work alongside what you already use, and only suggest replacing something when it costs more than it gives. That decision stays yours.'],
      ['Do we have to hand over our data?', 'No. Most of what we work from is already public: match results, VODs, streams and socials. We turn it into stats, intel and content for you. If you choose to share more, like scrim footage or partner details, it stays yours and is used only for your work.'],
      ['What happens after launch?', 'Your staff are trained on everything and get the documentation. Every month you get a report on what’s working, and the systems are adjusted based on what it shows.'],
    ],
  },
  {
    group: 'Ownership and money',
    items: [
      ['Who owns the site, the data and the accounts?', 'You do. Most of the data we use comes from public sources, from match results and VODs to streams and socials, and we turn it into usable stats, intel and content for you. Anything we build is set up in your accounts, not ours, with the documentation, so nothing is ever locked to us.'],
      ['Do you find sponsors for us?', 'No, and we won’t promise to. You get live numbers, pitch decks built from them, partner recaps and proof of every deliverable, so your own conversations with partners rest on figures you can stand behind. The selling stays yours.'],
      ['Why aren’t prices listed?', 'Because every org starts somewhere different. You get a written plan with the cost before anything is built, so you never pay for work you haven’t seen priced.'],
      ['How does it start?', 'With a conversation about your org: your rosters, your tools and what next season should look like. From that comes a plan for what to build first, and what it costs, in writing.'],
    ],
  },
];

export const NAV: [string, string][] = [
  ['Pillars', '#pillars'],
  ['Report', '#report'],
  ['Match week', '#week'],
  ['How we work', '#process'],
  ['Questions', '#faq'],
];
