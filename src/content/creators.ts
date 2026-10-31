// Sharkprint for creators: the page for independent streamers and creators.
// Creators, brands and numbers are fictional examples. The plans and their contents
// are proposals; confirm them before publishing.

export const CREATORS_META = {
  title: 'For creators: stream once, post all week',
  description: 'Clips from every stream, posted on a rhythm you choose, plus your schedule, media kit, brand deals and numbers in one place. Sharkprint for streamers and creators.',
};

/** From stream to scroll, the five things that happen to every moment. */
export const PIPELINE: [string, string][] = [
  ['Flagged', 'Clutches, laughs, rage quits and chat pops are marked in every VOD, so nothing worth posting stays buried.'],
  ['Picked', 'An editor who knows your game picks the ones worth posting, and the second they start.'],
  ['Cut', 'Vertical, with a hook in the first second, subtitles burned in and your colours on it.'],
  ['Approved', 'A queue on your phone. Post it, skip it, or ask for a change.'],
  ['Posted', 'Out on Shorts, TikTok and Reels when your fans are on, captions written.'],
];

/** The approval queue's sample clips (asset-kit art from Engine). */
export const QUEUE = [
  { src: 'engine/clip-tactical.svg', label: 'Clip: no way he clutched that', title: 'No way that worked', from: 'Tue stream, 1:42:10', slot: 'Shorts · Wed 18:00' },
  { src: 'engine/clip-arena.svg', label: 'Clip: the crowd went full volume', title: 'Chat lost it here', from: 'Tue stream, 2:58:31', slot: 'TikTok · Thu 19:00' },
  { src: 'engine/clip-stat.svg', label: 'Clip: four down in nine seconds', title: 'Four in nine seconds', from: 'Fri stream, 0:37:04', slot: 'Reels · Sat 12:00' },
];

/** The hub: everything around the stream, each with a glimpse of what it looks like. */
export const TOOLS: { id: string; title: string; line: string }[] = [
  { id: 'clips', title: 'Clips', line: 'Shorts, Reels and TikToks from every stream, posted on your rhythm.' },
  { id: 'schedule', title: 'Schedule', line: 'One schedule, kept on Twitch, YouTube, Kick, your page and Discord.' },
  { id: 'long', title: 'Long-form', line: 'A weekly highlights video for YouTube, with its title and thumbnail.' },
  { id: 'look', title: 'Your look', line: 'Overlays, alerts, panels and thumbnails that all match.' },
  { id: 'kit', title: 'Media kit', line: 'Your numbers, audience and past partners, always current.' },
  { id: 'deals', title: 'Brand deals', line: 'Briefs, deadlines, deliverables and invoices, tracked to payout.' },
  { id: 'numbers', title: 'Numbers', line: 'Every platform on one screen, and which clips actually grew you.' },
  { id: 'community', title: 'Community', line: 'Discord set up with roles, go-live alerts and bots that moderate.' },
  { id: 'trends', title: 'Trend watch', line: 'What’s working in your game this week: formats, sounds and topics.' },
];

/** A creator streaming from Berlin, in the first week of November (UTC instants). */
export const STREAMS: [string, string][] = [
  ['2026-11-02T19:00:00Z', 'Ranked grind'],
  ['2026-11-04T19:00:00Z', 'Ranked grind'],
  ['2026-11-06T20:30:00Z', 'Viewer games'],
  ['2026-11-08T17:00:00Z', 'Community night'],
];
export const ZONES: [string, string][] = [
  ['Europe/Berlin', 'Berlin'],
  ['Europe/London', 'London'],
  ['America/New_York', 'New York'],
  ['America/Sao_Paulo', 'São Paulo'],
  ['Asia/Kolkata', 'Mumbai'],
  ['Asia/Manila', 'Manila'],
];

/** Deals from brief to payout. */
export const DEALS: { stage: string; items: [string, string, string][] }[] = [
  { stage: 'Brief in', items: [['Arc Peripherals', 'Mouse review, one video', 'Reply by Thu']] },
  { stage: 'Agreed', items: [['Volt Energy', 'Three Shorts and a stream segment', 'First post Fri'], ['Northpeak', 'Two Reels', 'Drafts Mon']] },
  { stage: 'Posted', items: [['Kitebyte', 'Stream segment', 'Invoice sent']] },
  { stage: 'Paid', items: [['Volt Energy', 'October segment', 'Paid 30 Oct']] },
];

export const CREATOR_STEPS: [string, string, string][] = [
  ['01 Connect', 'Connect', 'Link your channels and socials with their own permissions: Twitch, YouTube, Kick, TikTok, Instagram and X. Your accounts stay yours.'],
  ['02 Brief us', 'Brief us', 'What to clip, what never to post, your colours, the jokes that are yours and the fans you want to reach.'],
  ['03 First batch', 'First batch', 'Your first clips arrive in your approval queue, with next week’s posting plan beside them.'],
  ['04 Every week', 'Every week', 'Clips go out on your rhythm, your schedule stays in sync everywhere and go-live alerts fire on their own.'],
  ['05 Every month', 'Every month', 'A report on what grew you, what fell flat and what to try next. Then we tune the plan together.'],
];

export const PLANS: { name: string; for: string; lead?: string; items: string[] }[] = [
  { name: 'Clips', for: 'For getting consistent.', items: ['Clips from every stream', 'Hooks, subtitles and your colours', 'Posted on your rhythm to Shorts, TikTok and Reels', 'Every clip approved by you, from your phone'] },
  { name: 'Channel', for: 'For growing a channel.', lead: 'Everything in Clips, plus:', items: ['A weekly highlights video for YouTube', 'Thumbnails and titles', 'Your schedule kept everywhere, with go-live alerts', 'A growth report every month'] },
  { name: 'Career', for: 'For making it the job.', lead: 'Everything in Channel, plus:', items: ['A media kit that updates itself', 'Brand deals tracked, invoices sent', 'Overlays, alerts and panels', 'Your Discord set up and kept tidy'] },
];

export const CREATOR_FAQ: [string, string][] = [
  ['Do I keep the rights to my clips?', 'Yes. Your channels, your content. We post to your accounts with your permission, and nothing goes out without your OK.'],
  ['Do I need a big audience to start?', 'No. The plan is shaped around how much you stream and how often you want to post, whether that’s two nights a week or every night.'],
  ['Which platforms do you work with?', 'Twitch, YouTube and Kick for streams; YouTube Shorts, TikTok, Instagram Reels and X for posts.'],
  ['Will the clips sound like me?', 'You set the tone in your brief: what to clip, words you never want in a caption, your colours and fonts. Every clip comes to you before it posts.'],
  ['Can I approve everything from my phone?', 'Yes. Each batch arrives as a queue. Post a clip, skip it or ask for a change, one tap each.'],
  ['I’m signed to an org. Can they cover this?', 'If your org runs Sharkprint Studio, much of this may already be part of your deal. Ask them, or point them our way.'],
];
