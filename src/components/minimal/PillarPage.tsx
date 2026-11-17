import type { ReactElement } from 'react';
import type { Pillar } from '@/components/ui/Icon';
import type { PillarPage as Page } from '@/content/pillarPages';
import { AnalystPage } from './pillar/Analyst';
import { ContentPage } from './pillar/Content';
import { CreatorsPage } from './pillar/Creators';
import { HqPage } from './pillar/Hq';
import { PlatformsPage } from './pillar/Platforms';

// Each pillar has a layout of its own, built from what it does: Analyst a case file, HQ a control
// room, Content a feed, Creators a scouting board, Platforms a site going live.
const PAGES: Record<Pillar, (props: { page: Page }) => ReactElement> = {
  intel: AnalystPage, command: HqPage, engine: ContentPage, studio: CreatorsPage, forge: PlatformsPage,
};

export function PillarPage({ page }: { page: Page }) {
  const Layout = PAGES[page.id];
  return <Layout page={page} />;
}
