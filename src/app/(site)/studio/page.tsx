import type { Metadata } from 'next';
import card from '@/app/cards/studio.png';
import { share, UNLISTED } from '@/lib/share';
import { PillarPage } from '@/components/pillar/PillarPage';
import { PILLAR_CONTENT } from '@/content/pillars';

const { title, description } = PILLAR_CONTENT.studio;
export const metadata: Metadata = { title, description, ...share(title, description, { image: card, alt: 'Finishers Sharkprint Studio: creators sign where they grow. Scout, library, schedule and the perks offer.' }), ...UNLISTED };

export default function StudioPage() {
  return <PillarPage pillar="studio" />;
}
