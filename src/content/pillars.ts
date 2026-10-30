import type { Tone } from '@/components/site/Room';
import type { Pillar } from '@/components/ui/Icon';

// Pillar pages follow one template (concept p.26): room as hero → in your words →
// how it works → what you get → sample outputs → workflow → FAQ.
// Turnaround figures are the concept's suggestions; confirm before publishing.

export type Sample = { src: string; caption: string; label: string; size?: 'tall' | 'wide' | 'report' | 'square' };

export type PillarContent = {
  title: string;
  description: string;
  /** Section backgrounds alternate between these, keeping the room's colour (p.26). */
  tones: [Tone, Tone];
  words: [string, string, string];
  how: { title: [string, string]; steps: [string, string, string][] };
  getsTitle?: [string, string];
  samples: { title: [string, string]; items: Sample[]; fineprint?: string };
  workflow: { automation: string[]; insiders: string[]; time: [string, string, string] };
  /** The homepage room's foot: what we need from you and what stays yours, either side of
   *  workflow.time (`time: false` leaves the timing out). */
  glance: { from: [string, string]; yours: [string, string]; time?: false };
  faq: [string, string][];
};

export const PILLAR_CONTENT: Record<Pillar, PillarContent> = {
  engine: {
    title: 'Engine: every moment, clipped',
    description: 'Hours of VOD in. A month of shorts out: timestamped, cut, subtitled and edited, at whatever volume you need.',
    tones: ['creme', 'deep'],
    words: ['We stream every weekend.', 'We post twice a month.', 'The best moments die in the VOD.'],
    how: {
      title: ['Six steps,', 'one pipeline.'],
      steps: [
        ['01 Timestamp', 'Timestamp', 'Every stream and match is logged and marked by moment type, so nothing worth posting gets lost in an eight-hour VOD.'],
        ['02 Find moments', 'Find moments', 'Clutches, aces, crowd pops and comms gold are flagged automatically. Editors who know the scene pick the ones that ship.'],
        ['03 Clip', 'Clip', 'Each pick is cut for Shorts, Reels and TikTok in 9:16, and 1:1 for feeds.'],
        ['04 Subtitle', 'Subtitle', 'Karaoke subtitles, burned in and on-brand, with word-by-word highlight.'],
        ['05 Edit', 'Edit', 'Hooks, zooms, captions and end cards: the basic edit that makes a clip stop the scroll.'],
        ['06 Ship', 'Ship', 'Posted on your calendar with captions, or handed over ready to post. The month fills itself.'],
      ],
    },
    samples: {
      title: ['What lands', 'in your folder.'],
      items: [
        { src: 'engine/clip-tactical.svg', caption: 'Clutch clip · 9:16', label: 'Clip: no way he clutched that', size: 'tall' },
        { src: 'engine/clip-arena.svg', caption: 'Crowd moment · 9:16', label: 'Clip: the crowd went full volume', size: 'tall' },
        { src: 'engine/clip-stat.svg', caption: 'Stat card · 9:16', label: 'Clip: four down in nine seconds', size: 'tall' },
        { src: 'engine/clip-calendar.svg', caption: 'Month calendar', label: 'Sample month calendar' },
        { src: 'engine/vod-timeline.svg', caption: 'Timestamped VOD log', label: 'Timestamped VOD log', size: 'wide' },
      ],
    },
    workflow: {
      automation: ['Logs and timestamps every VOD', 'Flags candidate moments by type', 'Drafts cuts and subtitles', 'Schedules posts and captions'],
      insiders: ['Pick the moments that ship', 'Write the hooks, tune the edit', 'Approve every clip before it posts'],
      time: ['Turnaround', '48 to 72h', 'per batch, at a monthly volume you set.'],
    },
    glance: { from: ['VOD links', 'wherever your streams and matches already live.'], yours: ['Every clip', 'you can veto anything before it posts.'], time: false },
    faq: [
      ['What do you need from us to start?', 'Links to your stream VODs and match recordings, wherever they already live. We log and timestamp from there.'],
      ['Which formats do you deliver?', '9:16 for Shorts, Reels and TikTok, and 1:1 for feeds. Subtitles are burned in and match your brand.'],
      ['Who decides which moments get clipped?', 'Machines flag the moments. Editors who know your scene pick what ships, and you can veto anything.'],
      ['Can we change volume month to month?', 'Yes. You set the monthly volume; the engine scales and the price is shaped around it.'],
      ['Do you post for us?', 'We can. Auto posts and captions are part of Engine. Or we hand over a ready-to-post folder on schedule.'],
    ],
  },

  intel: {
    title: 'Intel: prep to win, scout to grow',
    description: 'Scouting reports for any scene, prep packs for every roster: your own analyst, without hiring one per team.',
    tones: ['trench', 'abyss'],
    words: ['We sign players off highlight reels.', 'We prep the night before.', 'Half our calls are gut feel.'],
    how: {
      title: ['Pick a scene,', 'get a report.'],
      steps: [
        ['01 Pick a scene', 'Pick a scene', 'Tell us the regions and games you care about: India BGMI, EU Valorant, SEA MLBB, wherever your next roster comes from.'],
        ['02 Shortlist', 'Shortlist', 'Data ranks players, staff and creators in that scene by fit for your roster and your budget.'],
        ['03 Scout', 'Scout', "Scouts who know the scene watch the shortlist and write the notes data can't."],
        ['04 Report', 'Report', 'A fit score, the stats that matter for the role, and a scout note with a clear recommendation.'],
        ['05 Prep', 'Prep', 'Before each match, every roster gets an opponent pack: map tendencies, comps, habits, pistol and clutch patterns.'],
      ],
    },
    samples: {
      title: ['Reports your coaches', 'actually read.'],
      items: [
        { src: 'intel/scouting-report.svg', caption: 'Scouting report', label: 'Scouting report: Nexo, fit score 87', size: 'report' },
        { src: 'intel/heatmap-opponent.svg', caption: 'Opponent prep pack', label: 'Opponent prep heatmap' },
        { src: 'intel/radar-player.svg', caption: 'Player radar', label: 'Player radar', size: 'square' },
        { src: 'intel/world-map-light.svg', caption: 'Scene map', label: 'Scenes under scouting', size: 'wide' },
        { src: 'intel/analyst-hub.svg', caption: 'Analyst desk', label: 'One analyst desk for every roster', size: 'wide' },
      ],
      fineprint: 'Players and teams shown are fictional examples.',
    },
    workflow: {
      automation: ['Pulls match and player stats', 'Tracks the scenes you follow', 'Builds first-draft shortlists and packs'],
      insiders: ['Watch the shortlist and write scout notes', 'Decide who makes the report', 'Brief your coaches before matches'],
      time: ['Cadence', 'Weekly', 'scene reports, plus a prep pack per match.'],
    },
    glance: { from: ['Games & regions', 'and what each roster needs next.'], yours: ['Every signing', 'we shortlist and recommend, your staff decide.'] },
    faq: [
      ["What's in a scouting report?", 'Players, staff or creators shortlisted by fit, each with a fit score, the stats that matter for the role and a written scout note.'],
      ['How does opponent prep work?', 'Each roster gets a pack before a match: map tendencies, comps, habits, pistol and clutch patterns from recent maps.'],
      ['Do we still need our own analyst?', "That's the point of the desk: one analyst team serves every roster, instead of hiring an analyst per team and a scout for the org."],
      ['Which scenes do you cover?', "The ones you care about. Tell us your games and regions and we'll scope from there."],
      ['Who makes the final call on a player?', 'You do. Data shortlists, our scouts recommend, and your staff decide.'],
    ],
  },

  command: {
    title: 'Command: your whole org, one screen',
    description: 'Socials, team stats, calendar and reminders, linked to everything you have, kept true by automation and esports pros.',
    tones: ['deep', 'creme'],
    words: ['Our numbers live in nine tabs and three heads.', "Nobody knows what's due to sponsors.", 'Monday is spent finding things.'],
    how: {
      title: ['Build your dashboard,', 'keep it true.'],
      steps: [
        ['01 Connect', 'Connect', 'Socials, match data, calendar, sponsors, finance and Discord: everything your org already uses.'],
        ['02 Clean', 'Clean', 'We turn scattered sheets and apps into clean, linked databases. One place, one truth.'],
        ['03 Build', 'Build', 'Your dashboard, with the widgets your staff actually check: followers, win rates, clips shipped, deliverables.'],
        ['04 Keep true', 'Keep true', 'Automations keep numbers fresh. Esports pros check the entries that need judgement: sponsors, finance, calendar.'],
        ['05 Remind', 'Remind', "Sponsor deliverables, contracts and payouts surface before they're due, not after."],
      ],
    },
    samples: {
      title: ['A widget for', 'every question.'],
      items: [
        { src: 'command/dashboard-dark.svg', caption: 'Dashboard · dark', label: 'Command dashboard, dark', size: 'wide' },
        { src: 'command/widget-followers.svg', caption: 'Followers widget', label: 'Followers widget' },
        { src: 'command/widget-winrate.svg', caption: 'Win rate widget', label: 'Win rate widget', size: 'square' },
        { src: 'command/sources-stack.svg', caption: 'Source map', label: 'Source map' },
        { src: 'command/dashboard-light.svg', caption: 'Dashboard · light', label: 'Command dashboard, light', size: 'wide' },
      ],
    },
    workflow: {
      automation: ['Syncs socials, match data and calendars', 'Refreshes every tile on schedule', 'Flags anything that stops syncing'],
      insiders: ['Check sponsor, finance and calendar entries', 'Tidy the databases as the org grows', 'Flag what needs a decision this week'],
      time: ['Setup', '2 to 4 weeks', "then it's live and maintained."],
    },
    glance: { from: ['Access', 'to the tools you already run on, no switching.'], yours: ['Who sees what', 'staff, coaches and partners each get their own view.'] },
    faq: [
      ['What can we connect?', 'Socials, match data, calendars, your sponsor tracker, finance sheets and Discord: whatever your org already runs on.'],
      ['Do we have to switch tools?', 'No. Command links what you already use into clean databases and puts it on one screen.'],
      ['Who keeps the numbers accurate?', 'Two ways: automations keep synced sources fresh, and esports pros check the entries that need judgement.'],
      ['How long does setup take?', "Usually two to four weeks, depending on how many sources you have. Then it's live."],
      ['Who can see the dashboard?', 'You decide. Staff, coaches and partners can each get the view they need.'],
    ],
  },

  forge: {
    title: 'Forge: built to carry your name',
    description: 'Brand sites, tournament platforms, merch stores, campaign microsites and the internal tools your staff actually use.',
    tones: ['abyss', 'trench'],
    words: ['Our site still says Season 1.', 'Registrations run through a form.', 'The shop is a DM.'],
    how: {
      title: ['Blueprint first,', 'then live.'],
      steps: [
        ['01 Blueprint', 'Blueprint', 'Every build starts as a wireframe you can read and approve: pages, flows and what each one is for.'],
        ['02 Design', 'Design', 'Your brand, your rosters, your partners. Designed to look like your org, not a template.'],
        ['03 Build', 'Build', 'Brand sites, tournament platforms, merch stores, microsites and staff tools, with the backends behind them.'],
        ['04 Launch', 'Launch', 'Staff trained, docs handed over, so your team can update rosters and drops without us.'],
        ['05 Run', 'Run', "Backends, APIs and bots keep it current. Monthly reports show what's working."],
      ],
    },
    getsTitle: ['Five things we build,', 'two ways to see them.'],
    samples: {
      title: ['Built with', 'your name on it.'],
      items: [
        { src: 'forge/brand-site.svg', caption: 'Brand website', label: 'Brand website', size: 'wide' },
        { src: 'forge/tournament.svg', caption: 'Tournament platform', label: 'Tournament platform', size: 'wide' },
        { src: 'forge/merch-store.svg', caption: 'Merch store', label: 'Merch store', size: 'wide' },
        { src: 'forge/microsite.svg', caption: 'Campaign microsite', label: 'Campaign microsite', size: 'wide' },
        { src: 'forge/web-app.svg', caption: 'Internal web app', label: 'Internal web app', size: 'wide' },
      ],
      fineprint: 'Mockups use "Your Org" placeholders and fictional teams.',
    },
    workflow: {
      automation: ['Backends and APIs that keep data current', 'Bots for registrations, drops and alerts', 'Tests and deploys on every change'],
      insiders: ['Blueprint and design every screen', 'Review the build before launch', 'Train your staff and hand over docs'],
      time: ['Timeline', 'Scoped', 'per project, after the blueprint.'],
    },
    glance: { from: ['Your brand', 'plus rosters, results and merch, entered once.'], yours: ['Every update', 'your staff are trained at launch and get the docs.'] },
    faq: [
      ['What can you build?', 'Brand websites, tournament platforms, merch stores, campaign microsites and internal web apps, plus the backends behind them.'],
      ['How is a project priced?', 'Scoped per project, once the blueprint tells us what you actually need.'],
      ['Can our staff update the site?', 'Yes. We train your team at launch and hand over docs, so rosters, matches and drops stay current without us.'],
      ['Do you handle tournament registration?', 'Yes: registration, brackets, results and an admin view for your ops team.'],
      ['Why start with a blueprint?', "So you can see and approve the structure before anything is designed or built. It's the cheapest point to change your mind."],
    ],
  },
};

export const FORGE_FIVE: [string, string][] = [
  ['Brand', "The org's home: rosters, matches, partners, shop."],
  ['Tournaments', 'Registration, brackets, results, admin.'],
  ['Merch', 'Drops, sizes, checkout, inventory.'],
  ['Microsites', 'Season launches, player reveals, sponsor activations.'],
  ['Web apps', 'Staff tools: scrim schedulers, VOD queues, payouts.'],
];
