import { LINKS } from './links';

export type CaseStudyId = 'dr-cuterus' | 'fraud' | 'moolroop';

export interface CaseStudyDef {
  id: CaseStudyId;
  index: string;
  tag: string;
  titleItalic: string;
  titleBold: string;
  // How other pages refer to it, e.g. "See MoolRoop →".
  shortTitle: string;
  href: string;
  /* The case accent at full strength, and the text colour that reads on it
     (AA): the fill of the buttons other pages link to it with. */
  accent: string;
  accentText: string;
}

/* Order and copy match the Figma "case studies index" frames exactly
   (node 1168:56 / 1176:805 / 1180:1519) — Dr Cuterus first, Moolroop last.
   This is a different order from the old codebase's hero-flip tab order
   (Moolroop, Dr Cuterus, Fraud), which this page replaces rather than
   reuses. */
export const CASE_STUDIES: CaseStudyDef[] = [
  {
    id: 'dr-cuterus',
    index: '(01)',
    tag: 'client project',
    titleItalic: 'Website for',
    titleBold: 'Dr Cuterus',
    shortTitle: 'Dr Cuterus',
    href: LINKS.drCuterus,
    accent: 'var(--dr-cuterus-lilac)',
    accentText: 'var(--case-study-grey)',
  },
  {
    id: 'fraud',
    index: '(02)',
    tag: 'dissertation research project',
    titleItalic: 'Designing Against',
    titleBold: 'Fraud',
    shortTitle: 'Designing Against Fraud',
    href: LINKS.fraud,
    accent: 'var(--dissertation-sky)',
    accentText: 'var(--case-study-grey)',
  },
  {
    id: 'moolroop',
    index: '(03)',
    tag: 'self-identified problem',
    titleItalic: 'The Moolroop',
    titleBold: 'App',
    shortTitle: 'MoolRoop',
    href: LINKS.moolroop,
    accent: 'var(--moolroop-poster-maroon)',
    accentText: 'var(--case-study-white)',
  },
];

// Dr Cuterus (index 0) is the default centered/active card on both the
// desktop coverflow and the mobile vertical stack.
export const DEFAULT_ACTIVE_INDEX = 0;

// A case study's page title, as its index card names it.
export function caseStudyTitle(id: CaseStudyId): string {
  return CASE_STUDIES.find((study) => study.id === id)!.shortTitle;
}
