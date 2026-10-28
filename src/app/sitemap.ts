import type { MetadataRoute } from 'next';
import { CASES } from '@/content/cases';

const BASE = process.env.SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/engine', '/intel', '/command', '/forge', '/work', '/insiders'];
  return [
    ...pages.map((p) => ({ url: BASE + p, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    // Sample case studies are noindex, so they stay out of the sitemap.
    ...CASES.filter((c) => !c.sample).map((c) => ({ url: `${BASE}/work/${c.slug}`, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
