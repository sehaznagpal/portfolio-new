import { CV_URL, LINKEDIN_URL, MAILTO_URL } from './contact';

/* Home sections a link can move to in place (see useSectionNav). */
export type LinkSection = 'hero' | 'work';

export interface SiteLinkDef {
  label: string;
  href: string;
  // On Home, moves to this section instead of following href.
  section?: LinkSection;
  // Opens in a new tab.
  external?: boolean;
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
      { label: '(home)', href: '/', section: 'hero' },
      { label: '(playground)', href: '/experiment-zone' },
      { label: '(selected work)', href: '/#work', section: 'work' },
    ],
  },
  {
    label: 'let’s talk',
    links: [
      { label: '(linkedin)', href: LINKEDIN_URL, external: true },
      { label: '(mail)', href: MAILTO_URL },
      { label: '(download cv)', href: CV_URL, external: true },
    ],
  },
];
