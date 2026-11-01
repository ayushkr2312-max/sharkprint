import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';
import card from '@/app/share-card.png';

// The link preview card: the hero's headline over the five pillar tiles. It's imported, so its
// URL carries a content hash and chat apps fetch the new card whenever it changes.
const IMAGE = {
  url: card.src,
  width: card.width,
  height: card.height,
  alt: "Finishers Sharkprint: your org's edge, engineered. Engine, Intel, Command, Forge and Studio, each with a sample of its work.",
};

/** What a page shows when its link is shared: its own title and description on the shared card.
 *  Every page goes through here, because a page's openGraph replaces the layout's as a whole.
 *  Pages sent to a different audience bring their own card (src/app/cards). */
export function share(title: string, description: string, card?: { image: StaticImageData; alt: string }): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = card ? { url: card.image.src, width: card.image.width, height: card.image.height, alt: card.alt } : IMAGE;
  return {
    openGraph: { type: 'website', siteName: 'Finishers Sharkprint', title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

/** For pages that are sent to people directly: reachable by their address, kept out of search
 *  (they're also left out of the sitemap and never linked from the main site). */
export const UNLISTED: Pick<Metadata, 'robots'> = { robots: { index: false, follow: false } };
