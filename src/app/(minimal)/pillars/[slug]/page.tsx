import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PillarPage } from '@/components/minimal/PillarPage';
import { PILLARS } from '@/content/minimal';
import { PILLAR_PAGES, pillarPage } from '@/content/pillarPages';
import { share } from '@/lib/share';
import { CARDS } from './cards';
import './pillars.css';

// A page for each pillar, to send or link on its own: /pillars/analyst, /pillars/hq,
// /pillars/content, /pillars/creators, /pillars/platforms.
// Each page is built ahead for its pillar and links to the others with plain links (a full load),
// so instant client navigation isn't expected here.
export const instant = false;

export function generateStaticParams() {
  return PILLAR_PAGES.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pillarPage((await params).slug);
  if (!page) return {};
  const p = PILLARS.find((x) => x.id === page.id)!;
  const title = `${p.name}: ${page.headline.replace(/\.$/, '')} | Finishers Sharkprint`;
  return {
    title,
    description: page.lead,
    alternates: { canonical: `/pillars/${page.slug}` },
    ...share(title, page.lead, { image: CARDS[page.id], alt: `${p.name}, ${p.kind.toLowerCase()}. ${page.headline} Finishers Sharkprint.` }),
  };
}

export default async function Page({ params }: Props) {
  const page = pillarPage((await params).slug);
  if (!page) notFound();
  return <PillarPage page={page} />;
}
