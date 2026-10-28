'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Room } from '@/components/site/Room';
import { useSeen } from '@/components/ui/useSeen';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';

// The reps: what the machines turn out, all day.
const LOG = [
  'vod_0412 logged', '6 moments found', 'clip_07 drafted', 'subtitles generated', 'fit_score nexo 91',
  'opponent pack orca drafted', 'socials synced', 'deliverable volt_02 drafted', 'post time set 14:00',
  'scrim log parsed', 'clip_08 drafted', 'roster stats refreshed',
];
const ROLES = ['Ex-org managers', 'Analysts', 'Coaches', 'Editors', 'Partnerships leads'];

/** Something the machine wrote, which an insider then struck through. */
function Struck({ children, at }: { children: ReactNode; at: number }) {
  return <s className="mk-strike" style={{ '--t': at } as CSSProperties}>{children}</s>;
}
/** An insider's correction or note, written in after a beat. */
function Note({ children, at, block }: { children: ReactNode; at: number; block?: boolean }) {
  return <ins className={block ? 'mk-note mk-note--block' : 'mk-note'} style={{ '--t': at } as CSSProperties}>{children}</ins>;
}

/** One machine draft and the call made on it. */
function Draft({ i, kind, title, stamp, by, children }: { i: number; kind: string; title: string; stamp: string; by: string; children: ReactNode }) {
  return (
    <article className="mk-card" style={{ '--c': i } as CSSProperties}>
      <header className="mk-head">
        <span className="mk-kind">Machine draft · {kind}</span>
        <span className="mk-auto">Auto</span>
      </header>
      <h3 className="mk-title">{title}</h3>
      <dl className="mk-rows">{children}</dl>
      <footer className="mk-foot">
        <span className="mk-stamp" style={{ '--t': 2.1 } as CSSProperties}>{stamp}</span>
        <span className="mk-by" style={{ '--t': 2.4 } as CSSProperties}>
          <i>{by.split(' ')[0].slice(0, 1)}</i>
          {by}
        </span>
      </footer>
    </article>
  );
}

/** 08 Humans: the machines turn out drafts all day (the log running across the top); an
 *  insider who has done the job takes each one, marks it up and signs it off. The markup
 *  writes itself in as the drafts come into view. */
export function Humans({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const [ref, { on, live }] = useSeen<HTMLDivElement>('0px 0px -18% 0px');

  return (
    <Room tone="ink" room="humans" id="insiders" labelledBy="humans-title" className="overflow-hidden">
      <div className="wrap grid justify-items-center gap-5 text-center">
        <Eyebrow>The human layer</Eyebrow>
        <Heading as={headingLevel} id="humans-title" size="h1">
          Machines do the reps.<br /><Accent touch="check">Insiders make the calls.</Accent>
        </Heading>
        <Lead className="mx-auto">Every clip, report and dashboard is checked by people who&apos;ve worked inside esports orgs.</Lead>
      </div>

      <div aria-hidden="true" data-live={live} className="mk-log">
        <span className="mk-log-tag">The reps</span>
        <div className="mk-log-win">
          <div className="mk-log-run">
            {[0, 1].map((k) => (
              <span key={k} className="mk-log-set">
                {LOG.map((l) => <span key={l}><i />{l}</span>)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="mk-key" aria-hidden="true">
          <span><i className="mk-key-m" />Machine draft</span>
          <span><i className="mk-key-h" />Insider call</span>
        </div>

        <div ref={ref} data-on={on} className="mk-grid">
          <Draft i={0} kind="Clip" title="Clip 07 · Grand final, map 3" stamp="Approved" by="Mira · Editor">
            <div><dt>In / out</dt><dd><Struck at={0.4}>00:14:30</Struck> <Note at={0.7}>00:14:28</Note> → 00:14:52</dd></div>
            <div><dt>Caption</dt><dd><Struck at={0.6}>&ldquo;insane play&rdquo;</Struck> <Note at={0.9}>&ldquo;1v3 on 9 HP&rdquo;</Note></dd></div>
            <div><dt>Format</dt><dd>9:16 · subtitles on</dd></div>
            <Note at={1.3} block>Start 2s earlier. Keep the call that sets it up.</Note>
          </Draft>

          <Draft i={1} kind="Scouting" title="Nexo · IGL / Support" stamp="Shortlisted" by="Theo · Analyst">
            <div><dt>Fit score</dt><dd><Struck at={0.4}>91</Struck> <Note at={0.7}>87</Note></dd></div>
            <div><dt>Call</dt><dd><Struck at={0.6}>Sign now</Struck> <Note at={0.9}>Trial scrims first</Note></dd></div>
            <div><dt>Scene</dt><dd>India · BGMI · Tier 2</dd></div>
            <Note at={1.3} block>Utility timings drop late in a series. Watch two more.</Note>
          </Draft>

          <Draft i={2} kind="Sponsor" title="Volt Energy · deliverable 02" stamp="Signed off" by="Ana · Partnerships">
            <div><dt>Due</dt><dd>2 reels by Friday <Note at={0.7}>+1 story</Note></dd></div>
            <div><dt>Post at</dt><dd><Struck at={0.5}>14:00</Struck> <Note at={0.8}>19:00</Note></dd></div>
            <div><dt>Tag</dt><dd>@voltenergy</dd></div>
            <Note at={1.3} block>Tag them in the first 3s. 19:00 is when your fans are on.</Note>
          </Draft>
        </div>

        <p data-line="foot" className="mk-roles">
          <span>Signed off by</span>
          {ROLES.map((r) => <b key={r}>{r}</b>)}
        </p>
      </div>
    </Room>
  );
}
