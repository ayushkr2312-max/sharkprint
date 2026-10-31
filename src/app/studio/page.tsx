import type { Metadata } from 'next';
import { share } from '@/lib/share';
import { PillarPage } from '@/components/pillar/PillarPage';
import { PILLAR_CONTENT } from '@/content/pillars';

const { title, description } = PILLAR_CONTENT.studio;
export const metadata: Metadata = { title, description, ...share(title, description) };

export default function StudioPage() {
  return <PillarPage pillar="studio" />;
}
