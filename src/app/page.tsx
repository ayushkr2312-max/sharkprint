import { CommandRoom } from '@/components/rooms/Command';
import { EngineRoom } from '@/components/rooms/Engine';
import { ForgeRoom } from '@/components/rooms/Forge';
import { Grind } from '@/components/rooms/Grind';
import { Hero } from '@/components/rooms/Hero';
import { Humans } from '@/components/rooms/Humans';
import { IntelRoom } from '@/components/rooms/Intel';
import { Orbit } from '@/components/rooms/Orbit';
import { Process } from '@/components/rooms/Process';
import { Stack } from '@/components/rooms/Stack';
import { Week } from '@/components/rooms/Week';
import { Preloader } from '@/components/site/Preloader';

/** The tour (concept p.09), on one page: the four product rooms, then the proof.
 *  Never two dark rooms in a row. */
export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <Grind />
        <Stack />
        <EngineRoom />
        <IntelRoom />
        <CommandRoom />
        <ForgeRoom />
        <Orbit />
        <Humans />
        <Week />
        <Process />
      </main>
    </>
  );
}
