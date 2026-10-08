import { LINKS } from './links';

/* Home sections a link can move to in place (see useSectionNav). */
export type LinkSection = 'hero' | 'work';

export interface SiteLinkDef {
  label: string;
  href: string;
  // On Home, moves to this section instead of following href.
  section?: LinkSection;
  // Opens in a new tab.
  external?: boolean;
  // Downloads the file in place, without leaving the page.
  download?: boolean;
  // Enters with the playground's grid-sweep transition.
  playground?: boolean;
}

export interface SiteLinkGroup {
  label: string;
  links: SiteLinkDef[];
}

/* The navigate / let's talk link set shared by the footer and About. */
export const SITE_LINK_GROUPS: SiteLinkGroup[] = [
  {
    label: 'navigate',
    links: [
      { label: '(home)', href: LINKS.home, section: 'hero' },
      { label: '(playground)', href: LINKS.playground, playground: true },
      { label: '(selected work)', href: LINKS.work, section: 'work' },
    ],
  },
  {
    label: 'let’s talk',
    links: [
      { label: '(linkedin)', href: LINKS.linkedin, external: true },
      { label: '(mail)', href: LINKS.mail },
      { label: '(download cv)', href: LINKS.cv, download: true },
    ],
  },
];
