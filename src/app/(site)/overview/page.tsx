import type { Metadata } from 'next';
import { CommandRoom } from '@/components/rooms/Command';
import { EngineRoom } from '@/components/rooms/Engine';
import { ForgeRoom } from '@/components/rooms/Forge';
import { Hero } from '@/components/rooms/Hero';
import { Humans } from '@/components/rooms/Humans';
import { IntelRoom } from '@/components/rooms/Intel';
import { Orbit } from '@/components/rooms/Orbit';
import { Process } from '@/components/rooms/Process';
import { Reach } from '@/components/rooms/Reach';
import { Stack } from '@/components/rooms/Stack';
import { StudioRoom } from '@/components/rooms/Studio';
import { Week } from '@/components/rooms/Week';
import { Preloader } from '@/components/site/Preloader';
import { UNLISTED } from '@/lib/share';

/** The tour (concept p.09), on one page: the five product rooms, then the proof.
 *  Never two dark rooms in a row. */
// The original homepage, kept at /overview since the one-page site took the main address. Sent to
// people directly: unlisted, out of the sitemap, and nothing on the main page links here.
export const metadata: Metadata = { ...UNLISTED };

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <Reach />
        <Stack />
        <EngineRoom />
        <IntelRoom />
        <CommandRoom />
        <ForgeRoom />
        <StudioRoom />
        <Orbit />
        <Humans />
        <Week />
        <Process />
      </main>
    </>
  );
}
