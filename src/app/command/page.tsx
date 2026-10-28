import type { Metadata } from 'next';
import { PillarPage } from '@/components/pillar/PillarPage';
import { PILLAR_CONTENT } from '@/content/pillars';

const { title, description } = PILLAR_CONTENT.command;
export const metadata: Metadata = { title, description, openGraph: { title, description } };

export default function CommandPage() {
  return <PillarPage pillar="command" />;
}
