import type { Metadata, Viewport } from 'next';
import { DM_Sans, JetBrains_Mono, Michroma, Saira } from 'next/font/google';
import { Behaviours } from '@/components/site/Behaviours';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { FLAGS_SCRIPT, HtmlFlags } from '@/components/site/HtmlFlags';
import { LateralLine } from '@/components/site/LateralLine';
import { SmoothScroll } from '@/components/site/SmoothScroll';
import { share } from '@/lib/share';
import { SITE_URL } from '@/lib/site';
import './globals.css';

// Variable, with its width axis: the homepage hero sets it condensed.
const saira = Saira({ subsets: ['latin'], axes: ['wdth'], variable: '--font-saira' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', axes: ['opsz'] });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-jetbrains' });
const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma' });

const title = "Finishers Sharkprint: your org's edge, engineered";
const description = 'Clips, scouting, a live command centre and the sites that carry your name. One partner, built for esports orgs.';

export const metadata: Metadata = {
  // Share cards need an absolute address.
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s · Finishers Sharkprint' },
  description,
  ...share(title, description),
};

export const viewport: Viewport = {
  themeColor: '#F4F0E6',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const fonts = [saira, dmSans, jetbrains, michroma].map((f) => f.variable).join(' ');
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FLAGS_SCRIPT }} />
      </head>
      <body className="font-sans">
        <HtmlFlags />
        <Header />
        {children}
        <Footer />
        {/* Returning visits get a 300ms line wipe instead of the preloader (pure CSS). */}
        <div aria-hidden="true" className="wipe-in pointer-events-none fixed inset-0 z-[100]">
          <span className="absolute inset-0 bg-abyss after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-strike after:content-['']" />
        </div>
        <SmoothScroll />
        <LateralLine />
        <Behaviours />
      </body>
    </html>
  );
}
