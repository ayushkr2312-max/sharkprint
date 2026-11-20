import type { Metadata, Viewport } from 'next';
import { Michroma, Orbitron, Rethink_Sans } from 'next/font/google';
import card from '@/app/cards/home.png';
import { Flags } from '@/components/minimal/Flags';
import { SmoothScroll } from '@/components/site/SmoothScroll';
import { share } from '@/lib/share';
import { SITE_URL } from '@/lib/site';
import './minimal.css';

// The main site: one page at the main address, with its own root layout (its own fonts, styles
// and chrome). The original homepage now lives at /overview; nothing links between the two.

// One family for display and body, at two weights; Michroma only for the wordmark.
const rethink = Rethink_Sans({ subsets: ['latin'], variable: '--font-rethink' });
const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma' });
// The hero headline's own face: wide, engineered letterforms.
const orbitron = Orbitron({ subsets: ['latin'], weight: '800', variable: '--font-orbitron' });

const title = 'Finishers Sharkprint: the team behind your team';
const description = 'Player and opponent reports, live numbers, content, creator programs and sites for esports orgs, built mostly from public data.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  // The link preview: the hero's headline, its blue O with the shark, the wordmark and the five
  // pillars, on black. Imported, so its URL changes with it and chat apps fetch the new one.
  ...share(title, description, { image: card, alt: 'Play above your weight. Finishers Sharkprint, the team behind your team: Analyst, HQ, Content, Creators and Platforms.' }),
};

// Light blue: the browser bar on phones, and the strip down the side of a link preview in Discord.
export const viewport: Viewport = { themeColor: '#94d4fb' };

// Before first paint: the saved page mode, if any (otherwise the OS decides), and the flag
// that lets reveals start hidden only when a script is there to show them. On the main page it
// also starts the intro (Intro.tsx), unless you came in on a #link or reloaded part-way down.
const MODE_SCRIPT = `try{var m=localStorage.getItem('mode');if(m==='light'||m==='dark')document.documentElement.dataset.mode=m}catch(e){}document.documentElement.classList.add('js');try{var d=document.documentElement,n=performance.getEntriesByType('navigation')[0],go=location.pathname==='/'&&!location.hash;if(go&&n&&n.type==='reload'&&+sessionStorage.getItem('sy')>40)go=false;if(go){window.__intro=1;d.classList.add('intro-on','intro-win','intro-hold');window.__introT=setTimeout(function(){d.classList.remove('intro-on','intro-win','intro-hold')},8000)}}catch(e){}`;

export default function MinimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rethink.variable} ${michroma.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MODE_SCRIPT }} />
      </head>
      <body className="band">
        <Flags />
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
