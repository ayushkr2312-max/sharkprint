import type { Pillar } from '@/components/ui/Icon';

// Each pillar's own page (/pillars/[slug]): the words that sell it on its own. The pillar's name,
// kind, line, gains and options come from PILLARS in minimal.ts; this adds what a page of its own
// needs. Same rules as the main page: no invented proof, every number on a sample is labelled as
// one, most of the work comes from public data, and nothing promises a sponsor.

export type PillarPage = {
  id: Pillar;
  slug: string;
  /** The page's own sentence, under the pillar's name. */
  headline: string;
  lead: string;
  /** One sentence for each of the pillar's three gains, in the same order. */
  gains: string[];
  /** The four steps of its flow, as in its loop, each with what happens. */
  steps: [string, string][];
  /** The sample deliverable shown on the page. */
  sample: { title: string; lead: string; caption: string };
  /** How it works with each of the other four. */
  pairs: Partial<Record<Pillar, string>>;
  faq: [string, string][];
};

export const PILLAR_PAGES: PillarPage[] = [
  {
    id: 'intel', slug: 'analyst',
    headline: 'Know before you sign, hire or play.',
    lead: 'Analyst gathers the data on any roster, player, staff member or opponent you’re weighing and writes it up as a report with a recommendation. Most of it comes from public results, VODs and stats, so you don’t have to hand anything over to start.',
    gains: [
      'Each report weighs results, form, depth and how a team holds up under pressure, and ends with a recommendation you can defend to your staff or your investors.',
      'Before every match your coach gets the opponent broken down: how they play, who to watch, what they pick and ban, and where they’ve lost before.',
      'Market and competitor reports show which games and regions are worth entering, who’s rising and what rival orgs are signing, so you see the ground before you spend on it.',
    ],
    steps: [
      ['Ask', 'You bring the question: a roster, a player, a coach, an opponent or a market.'],
      ['Gather', 'We pull results, VODs, stats and scene news, plus anything private you choose to add, like scrim footage.'],
      ['Analyse', 'Software runs the first pass on the numbers. An analyst who has worked inside an org watches the footage and writes it up.'],
      ['Decide', 'You get the report: a recommendation up front, the evidence behind it, and what to keep an eye on.'],
    ],
    sample: {
      title: 'A roster report, start to finish.',
      lead: 'What lands on your desk before a signing: the call first, then the evidence, with timestamps where the footage makes the point.',
      caption: 'Sample report on a fictional team. Every number is illustrative.',
    },
    pairs: {
      command: 'Every report is filed in HQ, next to the results that followed.',
      engine: 'Opponent prep gives match day its storylines: the rivalry, the player to watch.',
      studio: 'The scouting that weighs rosters also weighs creators.',
      forge: 'Rosters and results keep your site’s player and match pages current.',
    },
    faq: [
      ['What does a report look like?', 'A written document, usually a few pages. The summary and recommendation come first, then the numbers behind them, with VOD timestamps where footage makes the point. You can ask follow-up questions on any of it.'],
      ['Do we have to share our own data?', 'No. Most reports run on public results, VODs, stats and scene news. Scrim footage or internal notes make reviews sharper if you choose to add them, and they stay yours.'],
      ['Which games do you cover?', 'Any title with public results and VODs. Tell us your games when we scope the work and we’ll be straight about how deep the data goes for each.'],
      ['How fast does a report arrive?', 'It depends on the question. Opponent prep is planned around your match schedule so it lands before you play. Bigger reports get a date when we scope them.'],
    ],
  },
  {
    id: 'command', slug: 'hq',
    headline: 'Every number, ready before they ask.',
    lead: 'HQ puts every public number about your org on one live screen, from socials and streams to results, and keeps the reports partners and investors expect ready to send.',
    gains: [
      'When a partner asks for your reach, the answer is already on screen and the recap is written. Nobody spends a weekend on screenshots.',
      'Socials, streams, results, content and partner deliverables sit side by side, so your staff stop chasing each other for numbers.',
      'Spend reports show what each month cost and what it brought in, from the costs you choose to share, with a note on what to cut.',
    ],
    steps: [
      ['Sync', 'Your public accounts and results connect once. Partner contracts and costs join only if you add them.'],
      ['Track', 'The dashboard updates as you post, stream and play, with a reminder before any deliverable is due.'],
      ['Report', 'Each month the numbers become a partner recap, an investor update or a board report.'],
      ['Share', 'Reports go out as clean documents or live links, checked by someone who knows what partners look for.'],
    ],
    sample: {
      title: 'Your org on one screen.',
      lead: 'The dashboard your staff open every morning, and the update it writes for your investors at the end of the month.',
      caption: 'Sample numbers for a fictional org.',
    },
    pairs: {
      intel: 'Analyst’s reports are filed here, next to the results that followed.',
      engine: 'Every post’s reach lands here as it grows.',
      studio: 'Creator reach and deliverables count toward your totals.',
      forge: 'Site and store traffic feeds the same dashboard.',
    },
    faq: [
      ['Which numbers can HQ track?', 'Anything public about your org: followers and engagement across socials, stream viewership, match results and rankings. Partner deliverables, costs and contracts join only if you add them.'],
      ['Is it something our staff log into?', 'Yes. The dashboard is set up in your own accounts, so your staff use it day to day, and the monthly reports come out of it.'],
      ['Can it build our pitch decks?', 'Yes. Decks are built from your live numbers, so the figures in them are current on the day you send them.'],
      ['Do you find sponsors or investors for us?', 'No. HQ gets you the numbers, decks and updates they ask for, and the pitching stays with you.'],
    ],
  },
  {
    id: 'engine', slug: 'content',
    headline: 'Keep growing between matches.',
    lead: 'Content cuts every match and stream into posts for every channel, in your colours, and keeps them going out all week, so your audience doesn’t drift off the day after a game.',
    gains: [
      'Matches give you a few big days a month. Clips, shorts and highlights from every stream fill the days in between.',
      'Each platform gets its own cut: vertical shorts with subtitles for TikTok, Reels and Shorts, and full highlights for YouTube, edited in your style.',
      'Your players get versions for their own accounts, so their reach and the org’s grow together.',
    ],
    steps: [
      ['Find', 'Software logs every stream and match and flags the moments. Editors pick the ones worth posting.'],
      ['Make', 'Shorts and highlights are cut in your style, with subtitles.'],
      ['Post', 'A calendar built around your matches, captions written, posted to every platform.'],
      ['Grow', 'Each month you see what worked, and the plan changes with it.'],
    ],
    sample: {
      title: 'One stream, a week of posts.',
      lead: 'A Saturday match turned into the shorts and highlights that keep your feeds busy until the next one.',
      caption: 'Sample posts for a fictional org.',
    },
    pairs: {
      intel: 'Analyst’s prep gives match day its storylines.',
      command: 'Every post’s reach shows up in HQ.',
      studio: 'Your creators’ clips go into the same library and calendar.',
      forge: 'Highlights fill your site’s match pages.',
    },
    faq: [
      ['Do you need our raw footage?', 'No. Streams and VODs are public, so most clips come from there. Raw footage or behind-the-scenes material is welcome if you have it.'],
      ['Who decides what gets posted?', 'You set the rules: what’s on brand, what needs your approval and what can go straight out. Editors work inside them.'],
      ['Which platforms do you post to?', 'YouTube, TikTok, Instagram and your Discord, and any other platform your audience is on.'],
      ['Is it made by AI?', 'Software finds the moments and handles the repetitive edits. People who know your scene choose the clips and check every post.'],
    ],
  },
  {
    id: 'studio', slug: 'creators',
    headline: 'Sign creators who bring their audience.',
    lead: 'Creators finds creators whose audience looks like your fans, helps you sign them under your name, plans their streams around your matches and keeps everything they make in one library.',
    gains: [
      'Scouting looks at who watches as well as how many, so the creators you sign reach people likely to become your fans.',
      'Streams, watch parties and match days sit on one calendar, with go-live alerts in your Discord.',
      'Your offer is packaged under your name, with its perks and rights agreed up front, so creators know what they get before they sign.',
    ],
    steps: [
      ['Scout', 'We map the creators in your scene and score how closely each audience matches yours.'],
      ['Sign', 'Your offer, perks and rights are packaged under your name, with a media kit for each creator.'],
      ['Schedule', 'Streams are planned around your matches, with watch parties on match day.'],
      ['Grow', 'A monthly report shows how the program is growing and what to try next.'],
    ],
    sample: {
      title: 'Your creator program at a glance.',
      lead: 'Who’s signed, how well each audience fits yours, and the week they’re streaming.',
      caption: 'Sample creators for a fictional org. Every number is illustrative.',
    },
    pairs: {
      intel: 'The scouting that weighs players also weighs creators.',
      command: 'Creator reach counts toward your totals in HQ.',
      engine: 'Their clips go into the same library and posting calendar.',
      forge: 'Their schedules and streams can sit on your site.',
    },
    faq: [
      ['Do creators have to be big?', 'No. Fit matters more than size. A smaller creator whose viewers play your games can do more for you than a large one whose viewers don’t.'],
      ['Who owns what they make?', 'Rights are agreed up front in each creator’s terms, and everything they make for you is filed in your library.'],
      ['Can our players join the program?', 'Yes. Players who stream can sit on the same schedule as your creators.'],
      ['What does it cost?', 'It depends on how many creators you sign and what you offer them. You get a written plan with the cost before anything starts.'],
    ],
  },
  {
    id: 'forge', slug: 'platforms',
    headline: 'Look as big as you play.',
    lead: 'Platforms builds your website, merch store, tournament platform and staff tools on one setup in your own accounts, and keeps them current as you play.',
    gains: [
      'Partners and players look you up before they reply. Current rosters, results and partners tell them they’re dealing with a serious org.',
      'Drops, sizes, checkout and stock live on your own store, linked to your site, so merch sells where your fans already are.',
      'Registration, brackets, results and admin run under your name, so every community event builds your brand.',
    ],
    steps: [
      ['Plan', 'We map what you need, page by page and tool by tool, and what each one has to do.'],
      ['Build', 'Everything is built on one base, in your accounts, in your colours and type.'],
      ['Launch', 'Your staff are trained on it and the documentation is handed over.'],
      ['Run', 'Match pages, results and drops update as you play.'],
    ],
    sample: {
      title: 'An org site that keeps up.',
      lead: 'Your season, roster, next match and store on one site that updates itself as results come in.',
      caption: 'Sample site for a fictional org.',
    },
    pairs: {
      intel: 'Rosters and results feed your player and match pages.',
      command: 'Site and store traffic shows up in HQ.',
      engine: 'Highlights fill your match pages.',
      studio: 'Your creators’ schedules can sit on your site.',
    },
    faq: [
      ['Do we own the site?', 'Yes. It’s set up in your accounts, with the documentation, so nothing is locked to us.'],
      ['Can you work with the site we have?', 'Yes. We extend what you have when that works, and only suggest rebuilding when it costs you more than it gives.'],
      ['How do the store’s payments and stock work?', 'Checkout and inventory run on a store platform in your name, linked to your site.'],
      ['Who keeps it up to date?', 'Results and rosters update from your matches. Your staff are trained for the rest, and every month you get a report with what to change.'],
    ],
  },
];

export const pillarPage = (slug: string) => PILLAR_PAGES.find((p) => p.slug === slug);
export const pageFor = (id: Pillar) => PILLAR_PAGES.find((p) => p.id === id)!;
