import type { Pillar } from '@/components/ui/Icon';

// The minimal one-page site's words. No invented stats, quotes or logos: every number shown is
// a labelled sample for a fictional org.

export const HERO = {
  title: ['Play above', 'your weight.'],
  lead: 'The team behind your team: analysis, numbers, content, creators and sites.',
};

export const STATEMENT =
  'Every match, player, partner and fan your org has is worth more than your numbers show. We measure it and help you use it.';

export type Cap = [string, string];
export type PillarInfo = {
  id: Pillar; name: string; kind: string; line: string;
  // What it changes for the org, in three short lines.
  gains: string[];
  // Everything the pillar can run, in groups. Each option is distinct: anything that was a step
  // inside another, or the same work under a second name, is folded into one.
  caps: { group: string; items: Cap[] }[];
};

// Ordered by what hooks a growing org first: the decisions, then the numbers that back them,
// then the reach, the creators and the presence. Every option is one the site describes.
export const PILLARS: PillarInfo[] = [
  {
    id: 'intel', name: 'Analyst', kind: 'Your data department',
    line: 'We gather data on any player, team, staff member or opponent you’re weighing and turn it into reports you can act on, so your signings, hires and match prep rest on evidence.',
    gains: ['Sign players, rosters and staff on evidence', 'Walk into every match with a plan', 'Know where to grow before you commit'],
    caps: [
      { group: 'Before you sign', items: [
        ['Player reports', 'Any player you’re weighing: form, role fit, consistency and how they hold up under pressure, with a recommendation.'],
        ['Roster reports', 'A whole team you could sign or acquire, measured as a unit: results, trajectory, depth and fit.'],
        ['Staff reports', 'Coaches, analysts and managers, judged on what the teams they’ve run actually did.'],
      ] },
      { group: 'Before you play', items: [
        ['Opponent prep', 'Each opponent broken down into a game plan with your coach: how they play, who to watch, what to pick and ban.'],
        ['Match and scrim reviews', 'What won and lost rounds, with VOD timestamps and what to practise next. Scrims too, whenever you share them.'],
        ['Performance trends', 'Your teams and players across the season: where you’re improving, and where opponents read you.'],
      ] },
      { group: 'Before you grow', items: [
        ['Scene and market reports', 'The games and regions worth entering, who’s rising, and where the talent is.'],
        ['Competitor intel', 'What rival orgs post, sign and launch, tracked month by month.'],
        ['Custom reports', 'Any question the data can answer, from one signing to a new region, answered in a written report.'],
      ] },
    ],
  },
  {
    id: 'command', name: 'HQ', kind: 'Numbers you can stand behind',
    line: 'Every public number about your org, from socials and streams to results, sits on one live screen. When a partner or investor asks for a report, it’s already done.',
    gains: ['Answer partners and investors with live numbers', 'See the whole org on one screen', 'Know where the money goes'],
    caps: [
      { group: 'Run the org', items: [
        ['Live dashboard', 'Socials, results, content and partner deliverables on one screen, always current.'],
        ['One source of truth', 'Your public numbers, plus anything you choose to add, kept as clean, linked data.'],
        ['Calendar and reminders', 'Matches, scrims, drops and travel together, with a nudge before anything’s due.'],
        ['Monthly report', 'What grew, what stalled, and what to do about it.'],
      ] },
      { group: 'Partners and investors', items: [
        ['Partner reporting', 'Every partner post and mention checked against what went live, and a recap ready to send.'],
        ['Pitch decks', 'Built from your own live numbers, for the partners you pitch.'],
        ['Investor updates', 'Reach, results and spend in one clear monthly update, ready for investors or a board.'],
        ['Spend reports', 'Where the money goes each month, and what to cut, from the costs you choose to share.'],
      ] },
    ],
  },
  {
    id: 'engine', name: 'Content', kind: 'Reach that keeps growing',
    line: 'We cut every match and stream into posts for every channel, on brand, so your audience keeps growing between games.',
    gains: ['Keep growing between matches', 'Post on every channel in your own style', 'Give your players channels that grow too'],
    caps: [
      { group: 'Make', items: [
        ['Moment finding', 'Every stream and match logged; software flags the moments, editors pick the best.'],
        ['Short-form video', 'For Shorts, Reels and TikTok, with subtitles and edits in your colours.'],
        ['Highlight videos', 'The match told in minutes, for YouTube.'],
        ['Match-day graphics', 'Line-ups, scores and results, designed and posted as they happen.'],
      ] },
      { group: 'Publish', items: [
        ['Content calendar and posting', 'A month planned around your matches, captions written, posted on every platform.'],
        ['Player channels', 'Versions for your players’ own accounts as well as the org’s.'],
        ['Trend scouting', 'What’s working in your scene’s feeds right now, and how to use it.'],
      ] },
    ],
  },
  {
    id: 'studio', name: 'Creators', kind: 'Your creator program',
    line: 'We find creators whose audience looks like your fans, help you sign them and plan their streams around your matches. Everything they make sits in one library, and a monthly report shows how the program is growing.',
    gains: ['Sign creators who bring their audience', 'Keep every creator’s week on one schedule', 'Give creators perks worth signing for'],
    caps: [
      { group: 'Sign creators', items: [
        ['Creator scouting', 'Creators whose audience looks like your fans, picked by people who watch the scene closely.'],
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
  {
    id: 'forge', name: 'Platforms', kind: 'Look the part',
    line: 'We build your website, merch store, tournament platform and staff tools on one setup, in your own accounts.',
    gains: ['Look as big as you play', 'Sell from your own store', 'Run tournaments on your own platform'],
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
];

// The walls growing orgs hit on the way up, each the reason a partner or investor waits, and
// the pillar that takes it down. In pillar order. Names are short: they label a picture.
export const WALLS: { name: string; cost: string; pillar: Pillar; fix: string }[] = [
  { name: 'Signing off highlight reels', cost: 'One wrong signing can cost a season, and investors want to know how you choose.', pillar: 'intel', fix: 'Every player, roster and staff hire weighed on data.' },
  { name: 'Numbers nobody can find', cost: 'A partner asks for your reach and gets a weekend of screenshots.', pillar: 'command', fix: 'Live numbers, and the report ready before they ask.' },
  { name: 'Reach stalls between games', cost: 'Reach is what partners look at, and it stops growing when your content does.', pillar: 'engine', fix: 'Every match and stream feeding every channel, all week.' },
  { name: 'Creators signing elsewhere', cost: 'Their audiences could be growing your brand instead.', pillar: 'studio', fix: 'A program that makes creators want to sign with you.' },
  { name: 'A site smaller than the team', cost: 'A partner looks you up before replying, and an old site makes a good team look small.', pillar: 'forge', fix: 'A site, store and tools that look the part.' },
];

export const CAP_COUNT = PILLARS.reduce((n, p) => n + p.caps.reduce((m, g) => m + g.items.length, 0), 0);

// What the work is built from. Most of it is public already; the last row only joins if the
// org chooses to add it. Each source says what it becomes, pillar by pillar.
export type Source = { id: string; name: string; line: string; optional?: boolean; feeds: Partial<Record<Pillar, string>> };
export const SOURCES: Source[] = [
  { id: 'results', name: 'Match results', line: 'Every official match, ladder and bracket', feeds: {
    intel: 'Records on every team and player, and your own trends',
    command: 'Results and form, live on one screen',
    forge: 'Match pages and results that update themselves',
  } },
  { id: 'vods', name: 'Match VODs', line: 'Your games, and every opponent’s', feeds: {
    intel: 'Opponent prep, reviews and player reports',
    engine: 'Highlights and short-form video',
  } },
  { id: 'streams', name: 'Streams', line: 'Your players’ and creators’ broadcasts', feeds: {
    engine: 'The best moments, found and cut',
    studio: 'Stream schedules and watch parties',
    command: 'Stream reach, counted as it happens',
  } },
  { id: 'socials', name: 'Socials', line: 'Every public post and profile', feeds: {
    command: 'Reach and growth, kept current',
    engine: 'What’s working in your scene right now',
    studio: 'Creators whose audience looks like your fans',
  } },
  { id: 'scene', name: 'The scene', line: 'Rosters, transfers and rival orgs', feeds: {
    intel: 'Player, roster, staff and competitor reports',
    studio: 'Creators worth signing',
  } },
  { id: 'yours', name: 'Your private data', line: 'Scrims, partner details and costs, only if you add them', optional: true, feeds: {
    intel: 'Scrim reviews',
    command: 'Partner reporting, investor updates and spend',
  } },
];

// What each pillar hands back, in a few words.
export const OUTPUTS: Record<Pillar, string> = {
  intel: 'Reports to sign, hire and prepare',
  command: 'Your org live, and reports to share',
  engine: 'Video and posts for every channel',
  forge: 'Sites that keep themselves current',
  studio: 'Signing and running creators',
};

// A sample match week: what each pillar hands over, by day (0 is Monday). Match on Saturday.
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MATCH_DAY = 5;
export const WEEK: Record<Pillar, [number, string][]> = {
  engine: [[0, 'Weekend VODs logged'], [1, 'Shorts batch out'], [5, 'Match clips out'], [6, 'Highlights video']],
  intel: [[0, 'Scrim review'], [1, 'Player report: Kai'], [3, 'Opponent prep: Orca']],
  command: [[0, 'Socials synced'], [3, 'Partner post reminder'], [5, 'Match-day dashboard'], [6, 'Week in numbers']],
  forge: [[1, 'Roster page updated'], [3, 'Match page live'], [6, 'Results on the site']],
  studio: [[0, 'Creator schedules out'], [4, 'Watch party booked'], [6, 'Creator clips filed']],
};

export const INSIDERS: [string, string][] = [
  ['Software drafts it', 'Automations build the first draft of every report, dashboard and post.'],
  ['An insider checks it', 'Someone who has worked inside an esports org fixes what’s off.'],
  ['You get it, signed', 'Every piece reaches you with the name of the person who checked it.'],
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
      ['What does Sharkprint actually do?', 'It runs the work around your teams that most orgs never have enough people for. Analyst is your data department, with reports on any player, roster, staff member or opponent you’re weighing. HQ keeps your numbers live and your partner and investor reports ready. Content turns every match and stream into posts for every channel. Creators runs your creator program, and Platforms builds your site, store and tools. All five work from the same numbers, and you deal with one partner.'],
      ['Do we need all five pillars?', 'No. Most orgs start with the one that would change the most this season and add others when they pay off. Each pillar works on its own, and each one you add feeds the same numbers, so your reports get more complete.'],
      ['Is this just AI?', 'No. Automation does the repetitive part, like finding the moments in hours of VOD or keeping six social accounts in sync. People who have worked inside esports orgs choose the clips, check the reports and sign off every piece before it reaches you.'],
      ['How is this different from an agency or freelancers?', 'An agency or a freelancer usually covers one job, with its own tools and its own numbers. Sharkprint runs five jobs on one system, so your reports, content, creator program and site all work from the same numbers, and you have one partner to talk to.'],
    ],
  },
  {
    group: 'Working together',
    items: [
      ['We’re a small org. Is this for us?', 'Yes. It’s built for orgs that want to look and play bigger than their headcount. Most start small, with one pillar sized to what they need now, and add the rest when it pays off.'],
      ['Do we have to replace the tools we use?', 'No. We work alongside what you already use, and only suggest replacing something when it costs more than it gives. That decision stays yours.'],
      ['Do we have to hand over our data?', 'No. Most of what we work from is already public: match results, VODs, streams and socials. We turn it into stats, intel and content for you. If you choose to share more, like scrim footage or partner details, it stays yours and is used only for your work.'],
      ['What happens after launch?', 'Your staff are trained on everything and get the documentation. Every month you get a report on what’s working, and we adjust the systems based on what it shows.'],
    ],
  },
  {
    group: 'Ownership and money',
    items: [
      ['Who owns the site, the data and the accounts?', 'You do. Most of the data we use comes from public sources, from match results and VODs to streams and socials, and we turn it into usable stats, intel and content for you. Anything we build is set up in your accounts, not ours, with the documentation, so nothing is ever locked to us.'],
      ['Do you find sponsors or investors for us?', 'No, and we won’t promise to. You get the live numbers, pitch decks, partner recaps and investor updates they ask for, so the figures hold up when you pitch them yourself.'],
      ['Why aren’t prices listed?', 'Because every org starts somewhere different. You get a written plan with the cost before anything is built, so you never pay for work you haven’t seen priced.'],
      ['How does it start?', 'With a conversation about your org: your rosters, your tools and what next season should look like. From that comes a plan for what to build first, and what it costs, in writing.'],
    ],
  },
];

export const NAV: [string, string][] = [
  ['Pillars', '#pillars'],
  ['Sources', '#sources'],
  ['Match week', '#week'],
  ['How we work', '#process'],
  ['Questions', '#faq'],
];
