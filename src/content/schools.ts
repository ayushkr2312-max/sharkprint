import type { Phase, Service } from '@/content/business';

// For schools and colleges: the systems behind a school or college esports program, built
// from the same pillars. Schools, teams and numbers shown are samples. To confirm: the free
// first call, the conduct and consent templates, and the term report.
// Sent to people directly; not linked from the main site.

export const SCHOOLS_META = {
  title: 'For schools and colleges: esports, done properly',
  description: 'We design, set up and run the systems behind a school or college esports program: safe and supervised, built around the timetable, and run by your students with staff in control.',
};

/** What a program gives the school. */
export const OUTCOMES: [string, string][] = [
  ['Students who find their place', 'Esports gives students who don’t join other clubs a team, a schedule and a reason to show up.'],
  ['Skills beyond the game', 'Communication, teamwork and leadership in every match, and real roles in media, analysis and events.'],
  ['A program you can show', 'Results, highlights and events to share with families, at open days and on your channels.'],
  ['A community around it', 'Inter-school leagues and end-of-term events that bring students, staff and families together.'],
];

export const PROGRAM: Service[] = [
  { id: 'plan', tab: 'Plan & policy', tag: 'Blueprint', title: 'A program plan your leadership can sign off.',
    body: 'We start with a written blueprint: games, teams, schedule, staff roles, policies and budget, matched to your age policy and timetable.',
    gets: ['A program blueprint and budget', 'Code of conduct and consent templates', 'Staff roles and responsibilities', 'Games matched to your age policy'] },
  { id: 'coach', tab: 'Tryouts & coaching', tag: 'Intel', title: 'Fair tryouts and real coaching support.',
    body: 'Structured tryouts by game and role, then opponent notes and replay reviews your coach can use with students who are still learning.',
    gets: ['Online sign-ups and skill checks', 'Shortlists with notes for coaches', 'Opponent notes before league matches', 'Replay reviews after key matches'] },
  { id: 'league', tab: 'Competition', tag: 'Forge', title: 'A league to enter, or one to host.',
    body: 'A tournament platform for inter-school leagues and in-house events: registration with consent checks, brackets, schedules and results.',
    gets: ['Registration with consent and eligibility checks', 'Brackets and schedules that update with results', 'Match pages with the stream and the result', 'An admin view for disputes and rescheduling'] },
  { id: 'staff', tab: 'Staff dashboard', tag: 'Command', title: 'Staff in control, without the paperwork.',
    body: 'One dashboard for the staff lead: rosters, eligibility, consent forms, the match calendar and anything waiting for approval, with a moderated Discord from day one.',
    gets: ['Rosters and eligibility at a glance', 'Consent tracking with automatic reminders', 'A moderated Discord with staff-only channels', 'An approval queue for anything public'] },
  { id: 'media', tab: 'Media & broadcast', tag: 'Engine', title: 'Every match on record, with staff sign-off.',
    body: 'Match highlights and a season recap for your school’s channels, and a student broadcast team that casts and streams on a schedule.',
    gets: ['Match highlight clips', 'An end-of-term season recap', 'Student casting and streaming setup', 'Everything approved by staff before it posts'] },
];

/** The student pathway, and the roles students can take on. */
export const PATHWAY: [string, string][] = [
  ['Join', 'Open sessions and online sign-ups, for any level.'],
  ['Try out', 'Skill checks by game and role, with notes for coaches.'],
  ['Compete', 'A team, a practice schedule and a league to play in.'],
  ['Lead', 'Captain, analyst, caster, editor or event crew.'],
  ['Leave with', 'A portfolio of real work: clips, broadcasts, events.'],
];
export const ROLES: [string, string][] = [
  ['Editors', 'Video editing and social media'],
  ['Analysts', 'Research, data and match preparation'],
  ['Team managers', 'Organisation and leadership'],
  ['Event crew', 'Operations, brackets and the program’s page'],
  ['Casters', 'Presenting and live broadcasting'],
];

/** Who sees what. */
export const WHO = ['Students', 'Coaches', 'Staff lead', 'Leadership', 'Parents'];
export const ACCESS: [string, string[]][] = [
  ['Team chat', ['Own team', 'Their teams', 'All, with logs', 'No', 'No']],
  ['Clips before they post', ['No', 'Review', 'Approve', 'No', 'No']],
  ['Consent and eligibility', ['Own record', 'No', 'Full', 'Summary', 'Own child']],
  ['Schedule and results', ['Yes', 'Yes', 'Yes', 'Yes', 'Yes']],
  ['Term report', ['No', 'Yes', 'Yes', 'Yes', 'No']],
];
export const CONTROLS: [string, string][] = [
  ['Nothing posts without staff', 'Clips, streams and posts wait in a queue for a staff OK.'],
  ['Moderated, logged channels', 'Roles by year group, staff-only channels and bots that filter and log.'],
  ['Consent tracked per student', 'Reminders go out before anything lapses.'],
];

export const TERM: Phase[] = [
  { when: 'Before term', title: 'Blueprint', body: 'Games, teams, schedule, policies and budget, in one plan for leadership.', get: 'A signed-off program plan' },
  { when: 'Before term', title: 'Set up', body: 'Discord, the staff dashboard, consent forms and the program’s page.', get: 'Everything ready before sign-ups open' },
  { when: 'Start of term', title: 'Tryouts', body: 'Sign-ups, skill checks by game and role, and shortlists for coaches.', get: 'Teams picked fairly, with notes' },
  { when: 'During term', title: 'Season', body: 'Practice slots, league matches, opponent notes and weekly highlights.', get: 'A season your students can share' },
  { when: 'End of term', title: 'Report', body: 'Participation, results and what to grow next term.', get: 'A term report for leadership' },
];

export const SHAPES: { name: string; line: string; items: string[] }[] = [
  { name: 'Schools', line: 'Clubs that grow into teams, with parents and staff close by.', items: ['Clubs that grow into competitive teams', 'Inter-school leagues and an end-of-term event', 'Parent consent built into every step', 'Staff approve everything that goes public'] },
  { name: 'Colleges and universities', line: 'Varsity programs that recruit, compete and broadcast.', items: ['Varsity rosters across several games', 'Recruiting, with shortlists and scout notes', 'Opponent prep before every league match', 'A student creator and broadcast program'] },
];

export const SCHOOL_FAQ: [string, string][] = [
  ['Do we need gaming PCs before we start?', 'No. We plan around what you have, whether that’s a lab, a few consoles or students playing from home, and the blueprint says what to add and when.'],
  ['Which games should we offer?', 'The ones your students already play that fit your age policy. The blueprint lists the options and the leagues each one opens up.'],
  ['Is it safe for students under 18?', 'It’s set up for them: staff approve everything that goes public, channels are moderated and logged, and consent is tracked for every student.'],
  ['Who runs it day to day?', 'Your staff lead and your students. We set the systems up, keep them running and check the work, so the program doesn’t depend on one teacher’s evenings.'],
  ['Can we start small?', 'Yes. One game, one team and one term is a good start, and everything is built to add teams later.'],
  ['How is it funded?', 'The blueprint includes a costed plan for leadership. We can also prepare a pitch for local sponsors and a spend report each term.'],
];
