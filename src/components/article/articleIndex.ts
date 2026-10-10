import type { RailItem } from '../caseStudy/CaseStudyRail';
import type { ArticleData } from './types';

/* The section index for an article: the TL;DR first, then each section by
   its short label. Ids match ArticleHero's TL;DR and ArticleSection's
   headings. */
export function articleIndex(article: ArticleData): RailItem[] {
  return [
    { id: 'tldr', label: 'TL;DR' },
    ...article.sections.map((section) => ({ id: `section-${section.number}`, label: section.shortLabel })),
  ];
}
