import type { Pillar } from '@/components/ui/Icon';
import type { Sample } from './pillars';

// Case studies for /work/[slug]. The concept's next steps (p.32) say to pick 2–3 real
// ones; until then these two samples show the template. `sample: true` labels them on
// the page, keeps them out of search (noindex) and out of the sitemap.

export type CaseStudy = {
  slug: string;
  sample: boolean;
  org: string;
  title: [string, string];
  summary: string;
  pillars: Pillar[];
  brief: [string, string, string];
  built: { pillar: Pillar; title: string; line: string }[];
  artefacts: Sample[];
  timeline: [string, string][];
  outcomes: [string, string, string][];
};

export const CASES: CaseStudy[] = [
  {
    slug: 'season-launch',
    sample: true,
    org: 'Your Org',
    title: ['A season launch,', 'end to end.'],
    summary: 'A campaign microsite, a player-reveal clip run and a refreshed brand site, shipped as one launch.',
    pillars: ['engine', 'forge'],
    brief: ['The season started in three weeks.', 'The site still showed last year’s roster.', 'Clips went out whenever someone had time.'],
    built: [
      { pillar: 'forge', title: 'Campaign microsite', line: 'Countdown, player reveals and a watch party, on its own subdomain.' },
      { pillar: 'engine', title: 'Reveal clip run', line: 'Player reveals and last season’s best moments, cut to 9:16 with karaoke subs.' },
      { pillar: 'forge', title: 'Brand site refresh', line: 'New roster pages and a partner wall the staff can update themselves.' },
      { pillar: 'engine', title: 'Launch calendar', line: 'Every drop scheduled across the launch window, captions included.' },
    ],
    artefacts: [
      { src: 'forge/microsite.svg', caption: 'Campaign microsite', label: 'Season launch microsite', size: 'wide' },
      { src: 'engine/clip-arena.svg', caption: 'Reveal clip · 9:16', label: 'Grand final crowd clip', size: 'tall' },
      { src: 'engine/clip-tactical.svg', caption: 'Moment clip · 9:16', label: 'Clutch clip', size: 'tall' },
      { src: 'engine/clip-calendar.svg', caption: 'Launch calendar', label: 'Month of scheduled clips' },
      { src: 'forge/brand-site.svg', caption: 'Brand site', label: 'Refreshed brand website', size: 'wide' },
    ],
    timeline: [
      ['Discovery', 'Mapped launch dates, partners and what had to be live on day one.'],
      ['Blueprint', 'Microsite and roster pages wireframed and approved before design.'],
      ['Build & automate', 'Clips cut from scrims and last season’s VODs; every post scheduled.'],
      ['Launch', 'Staff trained to post reveals and update the roster themselves.'],
      ['Optimise', 'A monthly report on which clips and pages brought people in.'],
    ],
    outcomes: [
      ['Hours back', 'every week', 'Clipping and posting ran on the engine, not on the social lead’s evenings.'],
      ['Sharper', 'brand', 'The site, the reveals and the clips told the same story on the same day.'],
      ['Faster', 'next launch', 'The microsite is a template now, ready for the next season.'],
    ],
  },
  {
    slug: 'one-analyst-desk',
    sample: true,
    org: 'Your Org',
    title: ['One analyst desk,', 'three rosters.'],
    summary: 'Scouting reports, opponent prep and a live dashboard shared across a Valorant, a BGMI and an academy roster.',
    pillars: ['intel', 'command'],
    brief: ['Each coach kept their own spreadsheet.', 'Trials were picked from highlight reels.', 'Nobody could say which roster was improving.'],
    built: [
      { pillar: 'intel', title: 'Scene scouting', line: 'Shortlists by fit for the BGMI trial, each with a scout’s note.' },
      { pillar: 'intel', title: 'Opponent prep', line: 'A pack before every match, for every roster: maps, comps, habits.' },
      { pillar: 'command', title: 'Roster dashboard', line: 'Win rates, form and scrim results per roster on one screen.' },
      { pillar: 'command', title: 'Linked databases', line: 'Players, scrims and sponsors in one place instead of three sheets.' },
    ],
    artefacts: [
      { src: 'intel/scouting-report.svg', caption: 'Scouting report', label: 'Scouting report with fit score', size: 'report' },
      { src: 'intel/heatmap-opponent.svg', caption: 'Opponent prep', label: 'Opponent prep heatmap' },
      { src: 'intel/radar-player.svg', caption: 'Player radar', label: 'Player radar', size: 'square' },
      { src: 'command/dashboard-light.svg', caption: 'Roster dashboard', label: 'Command dashboard', size: 'wide' },
      { src: 'intel/analyst-hub.svg', caption: 'One desk, every roster', label: 'Analyst desk serving every roster', size: 'wide' },
    ],
    timeline: [
      ['Discovery', 'Collected every coach’s sheet and the questions they were trying to answer.'],
      ['Blueprint', 'Agreed the stats that matter per role and the dashboard each coach needs.'],
      ['Build & automate', 'Stat pulls and scene tracking automated; first shortlists reviewed by scouts.'],
      ['Launch', 'Coaches walked through reports and prep packs before the next match week.'],
      ['Optimise', 'Weekly scene reports; prep packs tuned to what coaches actually used.'],
    ],
    outcomes: [
      ['Sharper', 'decisions', 'Trials picked from shortlists and scout notes, not highlight reels.'],
      ['Lower', 'running costs', 'One analyst desk instead of hiring one per roster.'],
      ['One', 'source of truth', 'Coaches, managers and partners read the same numbers.'],
    ],
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);
