import type { Metadata } from 'next';
import { Michroma, Orbitron, Rethink_Sans } from 'next/font/google';
import { Flags } from '@/components/minimal/Flags';
import { SmoothScroll } from '@/components/site/SmoothScroll';
import { share, UNLISTED } from '@/lib/share';
import { SITE_URL } from '@/lib/site';
import './minimal.css';

// The one-page site at /overview, with its own root layout: its own fonts, styles and chrome,
// and nothing linking it to the rest of the site or back. Unlisted, like the pages we send.

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
  ...share(title, description),
  ...UNLISTED,
};

// Before first paint: the saved page mode, if any (otherwise the OS decides), and the flag
// that lets reveals start hidden only when a script is there to show them.
const MODE_SCRIPT = `try{var m=localStorage.getItem('mode');if(m==='light'||m==='dark')document.documentElement.dataset.mode=m}catch(e){}document.documentElement.classList.add('js')`;

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
