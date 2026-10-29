import type { Metadata } from 'next';
import card from '@/app/share-card.png';

// The link preview card: the hero's headline over the four pillar tiles. It's imported, so its
// URL carries a content hash and chat apps fetch the new card whenever it changes.
const IMAGE = {
  url: card.src,
  width: card.width,
  height: card.height,
  alt: "Finishers Sharkprint: your org's edge, engineered. Engine, Intel, Command and Forge, each with a sample of its work.",
};

/** What a page shows when its link is shared: its own title and description on the shared card.
 *  Every page goes through here, because a page's openGraph replaces the layout's as a whole. */
export function share(title: string, description: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: { type: 'website', siteName: 'Finishers Sharkprint', title, description, images: [IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [IMAGE] },
  };
}
