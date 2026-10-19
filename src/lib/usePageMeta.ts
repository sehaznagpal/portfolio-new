import { useEffect } from 'react';

export const SITE_NAME = 'Sehaz Nagpal';
// Also written out in index.html's description tags; keep the two in sync.
export const HOME_DESCRIPTION =
  'Why do people do what they do? A question carried through an economics degree, a dissertation and now design.';

/* Every route's title: the name alone, or "Sehaz Nagpal | <page>". */
export function pageTitle(page?: string) {
  return page ? `${SITE_NAME} | ${page}` : SITE_NAME;
}

interface PageMeta {
  // Omit for the bare site name (home).
  page?: string;
  description: string;
  // Kept out of search results while the route is shown.
  noindex?: boolean;
}

/* Sets the title and the description, Open Graph and Twitter tags that
   index.html declares, so they follow the route. The About overlay calls
   nothing, so it keeps the title of the page it opens on. */
export function usePageMeta({ page, description, noindex }: PageMeta) {
  useEffect(() => {
    const title = pageTitle(page);
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    if (!noindex) return;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [page, description, noindex]);
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}
