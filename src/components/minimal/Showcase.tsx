import type { CSSProperties } from 'react';
import { type Pillar, SharkMark } from '@/components/ui/Icon';

// A sample of what each pillar delivers, drawn as the thing itself: a report, a dashboard, a
// week of posts, a creator roster, an org site. Ink, paper and light blue only. Every name and
// number is a sample for a fictional org. Bars and fills grow in once the sample is on screen
// ([data-grow] in minimal.css, started by the figure's reveal).

const v = (n: number) => ({ '--v': n }) as CSSProperties;
const d = (n: number) => ({ '--i': n }) as CSSProperties;

function Bar({ brand, aside }: { brand: string; aside: React.ReactNode }) {
  return (
    <div className="s-bar">
      <span className="s-brand"><SharkMark className="s-mark" />{brand}</span>
      <span className="s-aside">{aside}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ Analyst: a roster report */
const SCORES: [string, number][] = [['Results', 78], ['Trajectory', 91], ['Teamwork', 86], ['Fit', 84], ['Depth', 58]];
const LAST12 = [0.62, 0.8, 0.55, 0.9, 0.74, 0.68, 0.95, 0.58, 0.84, 0.77, 0.88, 0.92];

/** A block that can sit under a redaction bar, lifted as the page scrolls (PillarMotion.tsx). */
function Hide({ on, block, children }: { on?: boolean; block?: boolean; children: React.ReactNode }) {
  if (!on) return <>{children}</>;
  const Tag = block ? 'div' : 'span';
  return <Tag className={`redact${block ? ' redact--block' : ''}`}>{children}<i aria-hidden="true" data-redact="" /></Tag>;
}

export function Report({ redacted = false }: { redacted?: boolean }) {
  const r = redacted;
  return (
    <div className="s-card surface doc">
      <Bar brand="Roster report" aside="Prepared for a fictional org" />
      <div className="doc__head">
        <div>
          <h3 className="doc__name">Team Vanta</h3>
          <p className="doc__sub">Unsigned, five players and a coach, last 12 matches</p>
        </div>
        <Hide on={r}><p className="doc__verdict"><b>Recommend: sign</b><span>All five on one season, with an option for a second.</span></p></Hide>
      </div>
      <div className="doc__grid">
        <div className="doc__col">
          <h4 className="s-h">Summary</h4>
          <Hide on={r} block><p className="doc__p">Won 9 of their last 12 and climbed from ninth to third in their league this split. They’re at their best in set openings, and they’ve lost two of the three series that went the distance.</p></Hide>
          <h4 className="s-h">Watch for</h4>
          <Hide on={r} block><p className="doc__p">There’s one substitute, and results drop when the sub plays. Budget for a sixth player before the next split.</p></Hide>
        </div>
        <div className="doc__col">
          <h4 className="s-h">Scores</h4>
          <ul className="s-bars">
            {SCORES.map(([k, n], i) => <li key={k} style={d(i)}><span>{k}</span><i><em data-grow="" style={v(n / 100)} /></i><b>{n}</b></li>)}
          </ul>
          <h4 className="s-h">Last 12 matches</h4>
          <div className="doc__spark">
            {LAST12.map((h, i) => <i key={i} data-grow="" data-on={i === LAST12.length - 1 ? '' : undefined} style={{ ...v(h), ...d(i) }} />)}
          </div>
        </div>
        <div className="doc__col">
          <h4 className="s-h">Evidence</h4>
          <Hide on={r} block>
            <ul className="doc__clips">
              <li><b>14:22</b>Five-player retake on B, map two</li>
              <li><b>31:05</b>The opening they run every half</li>
              <li><b>47:40</b>Calls breaking down, game three</li>
            </ul>
          </Hide>
          <h4 className="s-h">Built from</h4>
          <p className="s-chips"><span>Results</span><span>VODs</span><span>Stats</span><span>The scene</span></p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ HQ: the dashboard */
const KPIS: [string, string, string][] = [
  ['Followers', '214.8K', '+16.7% this month'], ['Stream views', '1.2M', 'Last 30 days'],
  ['Win rate', '64%', 'Last 20 matches'], ['Partner posts', '12 of 14', 'Due this month'],
];
const REACH = [0.38, 0.42, 0.4, 0.51, 0.48, 0.57, 0.62, 0.6, 0.71, 0.76, 0.84, 0.97];
const DELIVER: [string, number, number][] = [['Headset partner', 4, 4], ['Energy drink partner', 5, 6], ['Apparel partner', 3, 4]];

function Dashboard() {
  return (
    <div className="dash">
      <div className="s-card surface dash__main">
        <Bar brand="HQ" aside={<span className="s-live">Live</span>} />
        <div className="dash__kpis">
          {KPIS.map(([k, n, s], i) => <div key={k} className="kpi" style={d(i)}><span>{k}</span><b>{n}</b><small>{s}</small></div>)}
        </div>
        <div className="dash__grid">
          <div>
            <h4 className="s-h">Reach, last 12 weeks</h4>
            <div className="dash__chart">
              {REACH.map((h, i) => <i key={i} data-grow="" data-on={i === REACH.length - 1 ? '' : undefined} style={{ ...v(h), ...d(i) }} />)}
            </div>
          </div>
          <div>
            <h4 className="s-h">Partner deliverables</h4>
            <ul className="dash__deliver">
              {DELIVER.map(([k, a, b], i) => (
                <li key={k} style={d(i)}>
                  <span>{k}</span><b>{a} of {b}</b>
                  <i><em data-grow="" style={v(a / b)} /></i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="s-card surface dash__doc">
        <Bar brand="Investor update" aside="October" />
        <div className="dash__docbody">
          <p className="doc__p"><b>Reach up 16.7%</b> on the month, driven by match-day clips. Win rate held at 64% across 20 matches.</p>
          <ul className="dash__lines"><li style={v(0.92)} /><li style={v(0.78)} /><li style={v(0.86)} /><li style={v(0.54)} /></ul>
          <p className="s-pill">Ready to send</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Content: a week of posts */
const CLIPS = [
  { t: '0:28', cap: '1v3 to close out map two', ch: 'TikTok', views: '48K views' },
  { t: '0:41', cap: 'Orca on Saturday: last time we met', ch: 'Instagram', views: '22K views' },
  { t: '8:12', cap: 'Highlights: 2:1 against Orca', ch: 'YouTube', views: '31K views', wide: true },
  { t: '0:19', cap: 'Kai calls the final round', ch: 'Shorts', views: '64K views' },
];
const PLAN: [string, string][] = [['Mon', 'Shorts x3'], ['Tue', 'Highlights'], ['Wed', 'Clips x2'], ['Thu', 'Stream clips'], ['Fri', 'Hype short'], ['Sat', 'Live clips'], ['Sun', 'Recap']];

function Posts() {
  return (
    <div className="posts">
      <div className="posts__grid">
        {CLIPS.map((c, i) => (
          <div key={c.cap} className="clip" data-wide={c.wide ? '' : undefined} style={d(i)}>
            <div className="clip__frame" data-on={i === 3 ? '' : undefined}>
              <span className="clip__time">{c.t}</span>
              <svg className="clip__play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
              <p className="clip__cap">{c.cap}</p>
            </div>
            <p className="clip__meta"><b>{c.ch}</b><span>{c.views}</span></p>
          </div>
        ))}
      </div>
      <ol className="posts__plan s-card surface">
        {PLAN.map(([day, what], i) => <li key={day} data-match={day === 'Sat' ? '' : undefined} style={d(i)}><span>{day}</span><b>{what}</b></li>)}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ Creators: the roster */
const CREATORS: [string, string, number, string][] = [['Kai', 'Twitch', 0.96, '48K'], ['Mira', 'YouTube', 0.91, '120K'], ['Juno', 'TikTok', 0.88, '210K'], ['Rhea', 'Twitch', 0.84, '36K']];
const STREAMS: [number, number][] = [[0, 0], [1, 1], [1, 3], [2, 2], [3, 0], [4, 3], [6, 1], [6, 2]];

function Roster() {
  return (
    <div className="roster">
      <div className="s-card surface roster__list">
        <Bar brand="Your creators" aside="Audience fit" />
        <ul>
          {CREATORS.map(([name, where, fit, reach], i) => (
            <li key={name} style={d(i)}>
              <span className="roster__av" data-on={i === 1 ? '' : undefined}>{name[0]}</span>
              <span className="roster__who"><b>{name}</b><small>{where}, {reach} followers</small></span>
              <i className="roster__fit"><em data-grow="" style={v(fit)} /></i>
              <b className="roster__pct">{Math.round(fit * 100)}%</b>
            </li>
          ))}
        </ul>
      </div>
      <div className="s-card surface roster__kit">
        <Bar brand="Media kit" aside="Mira" />
        <div className="roster__kitbody">
          <p className="roster__big">120K<small>followers on YouTube</small></p>
          <h4 className="s-h">Audience</h4>
          <ul className="s-bars">
            <li><span>Aged 18 to 24</span><i><em data-grow="" style={v(0.64)} /></i><b>64%</b></li>
            <li><span>Europe</span><i><em data-grow="" style={v(0.58)} /></i><b>58%</b></li>
            <li><span>Plays your games</span><i><em data-grow="" style={v(0.71)} /></i><b>71%</b></li>
          </ul>
        </div>
      </div>
      <div className="s-card surface roster__week">
        <Bar brand="This week" aside="Match on Saturday" />
        <ol>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, k) => (
            <li key={day} data-match={k === 5 ? '' : undefined}>
              <span>{day}</span>
              {k === 5 ? <b className="roster__party">Watch party</b> : STREAMS.filter(([dd]) => dd === k).map(([, c]) => <em key={c}>{CREATORS[c][0]}</em>)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Platforms: an org site */
function Site() {
  return (
    <div className="site s-card surface">
      <div className="site__chrome"><span className="site__url">yourorg.gg</span><span className="s-live">Live</span></div>
      <div className="site__nav">
        <span className="s-brand"><SharkMark className="s-mark" />Your org</span>
        <span className="site__links"><span>Roster</span><span>Matches</span><span>Store</span><span>Tournaments</span></span>
      </div>
      <div className="site__body">
        <div className="site__hero">
          <p className="site__kicker">Season 4</p>
          <p className="site__title">Starts Friday.</p>
          <p className="site__sub">Opening match against Orca, 18:00</p>
        </div>
        <div className="site__next">
          <h4 className="s-h">Last result</h4>
          <p className="site__score">Won 2:1</p>
          <p className="site__vs">against Orca, Saturday</p>
        </div>
        <div className="site__roster">
          <h4 className="s-h">Roster</h4>
          <p>{['N', 'K', 'J', 'T', 'R'].map((x, i) => <span key={x} style={d(i)}>{x}</span>)}</p>
        </div>
        <div className="site__store">
          <h4 className="s-h">Store</h4>
          <div className="site__items">
            <span><i />Home jersey</span><span><i />Season hoodie</span><span><i />Mousepad</span>
          </div>
          <p className="s-pill">Drop live</p>
        </div>
        <div className="site__bracket">
          <h4 className="s-h">Community cup</h4>
          <svg viewBox="0 0 160 90" aria-hidden="true">
            <path d="M0 10h44v22h44M0 54h44V32M88 32v22h44M0 80h44V58" className="site__lines" />
            <path d="M88 32h28v22h44" className="site__win" />
          </svg>
        </div>
      </div>
    </div>
  );
}

const SAMPLES: Record<Pillar, () => React.ReactElement> = { intel: () => <Report />, command: Dashboard, engine: Posts, studio: Roster, forge: Site };

export { Dashboard, Posts, Roster, Site };

export function Showcase({ id }: { id: Pillar }) {
  const Sample = SAMPLES[id];
  return <Sample />;
}
