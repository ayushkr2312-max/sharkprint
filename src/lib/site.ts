// The site's public address, for share cards, the sitemap and robots.txt. Netlify sets URL to it
// at build time; SITE_URL overrides it anywhere else.
export const SITE_URL = (process.env.SITE_URL ?? process.env.URL ?? 'https://sharkprint.netlify.app').replace(/\/$/, '');
