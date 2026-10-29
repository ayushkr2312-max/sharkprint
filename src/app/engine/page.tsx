import type { Metadata } from 'next';
import { share } from '@/lib/share';
import { PillarPage } from '@/components/pillar/PillarPage';
import { PILLAR_CONTENT } from '@/content/pillars';

const { title, description } = PILLAR_CONTENT.engine;
export const metadata: Metadata = { title, description, ...share(title, description) };

export default function EnginePage() {
  return <PillarPage pillar="engine" />;
}
