export type CaseStudyId = 'dr-cuterus' | 'fraud' | 'moolroop';

export interface CaseStudyDef {
  id: CaseStudyId;
  index: string;
  tag: string;
  titleItalic: string;
  titleBold: string;
  href: string;
}

/* Order and copy match the Figma "case studies index" frames exactly
   (node 1168:56 / 1176:805 / 1180:1519) — Dr Cuterus first, Fraud (the
   dissertation) as the default centered/active card, Moolroop last. This is
   a different order from the old codebase's hero-flip tab order
   (Moolroop, Dr Cuterus, Fraud), which this page replaces rather than
   reuses. */
export const CASE_STUDIES: CaseStudyDef[] = [
  {
    id: 'dr-cuterus',
    index: '(01)',
    tag: 'client project',
    titleItalic: 'Website for',
    titleBold: 'Dr Cuterus',
    href: '/case-study/dr-cuterus',
  },
  {
    id: 'fraud',
    index: '(02)',
    tag: 'dissertation research project',
    titleItalic: 'Designing Against',
    titleBold: 'Fraud',
    href: '/case-study/designing-against-fraud',
  },
  {
    id: 'moolroop',
    index: '(03)',
    tag: 'self-identified problem',
    titleItalic: 'The Moolroop',
    titleBold: 'App',
    href: '/case-study/moolroop',
  },
];

export const DEFAULT_ACTIVE_INDEX = 1;
