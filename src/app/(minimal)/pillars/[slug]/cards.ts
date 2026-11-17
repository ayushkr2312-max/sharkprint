import type { StaticImageData } from 'next/image';
import type { Pillar } from '@/components/ui/Icon';
import analyst from '@/app/cards/pillar-analyst.png';
import content from '@/app/cards/pillar-content.png';
import creators from '@/app/cards/pillar-creators.png';
import hq from '@/app/cards/pillar-hq.png';
import platforms from '@/app/cards/pillar-platforms.png';

// Each pillar page's link preview: its name in Orbitron, its line, the blue window with the
// shark, and the five pillars along the base with this one lit. Imported, so the URL changes
// with the image and chat apps fetch the new one.
export const CARDS: Record<Pillar, StaticImageData> = { intel: analyst, command: hq, engine: content, studio: creators, forge: platforms };
