import type { Metadata } from 'next';
import Link from 'next/link';
import { Room } from '@/components/site/Room';
import { Asset } from '@/components/ui/Asset';
import { btn } from '@/components/ui/buttons';
import { Eyebrow, Heading, Lead, Accent } from '@/components/ui/type';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main id="main">
      <Room tone="creme" room="not-found" labelledBy="nf-title" pad={false} className="flex min-h-svh items-center overflow-hidden py-32">
        <div className="wrap relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div className="grid gap-6">
            <Eyebrow>404 · No signal</Eyebrow>
            <Heading as="h1" id="nf-title" size="h1" reveal={false}>
              This page is <Accent>off the map.</Accent>
            </Heading>
            <Lead>The link may be old, or the page moved. The four pillars are a tap away in the menu above.</Lead>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className={btn('ink', 'lg')}><span className="pointer-events-none inline-block">Back to the start</span></Link>
            </div>
          </div>
          <Asset src="hero/sonar-light.svg" decorative className="w-full max-w-[520px] justify-self-center opacity-60" />
        </div>
      </Room>
    </main>
  );
}
