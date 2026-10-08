/* Content schema for long-form case study articles. A case study is one data
   file of these shapes, rendered by the generic article components. */

/* Plain text, or runs where some are bold (e.g. a list item's lead-in) or
   italic (e.g. a book title). */
export type RichText = string | Array<string | { bold: string } | { italic: string }>;

export type ContentBlock =
  | { type: 'paragraph'; text: RichText }
  | { type: 'list'; items: RichText[] }
  | { type: 'table'; label: string; columns: string[]; rows: string[][] };

export type VisualTone = 'sky' | 'dark' | 'brand';

export type ArticleBlock =
  /* Paragraphs introduced by an optional left-column pull quote. */
  | { type: 'group'; quote?: string; content: ContentBlock[] }
  /* A full-bleed visual band; `id` picks the page's visual component. */
  | { type: 'visual'; id: string; heading: string; tone: VisualTone };

export interface ArticleSectionData {
  number: string;
  title: string;
  blocks: ArticleBlock[];
}

export interface ArticleLink {
  label: string;
  href: string;
}

export interface ArticleData {
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  tags: string[];
  links: ArticleLink[];
  tldr: { label: string; text: string }[];
  sections: ArticleSectionData[];
  closingLink: ArticleLink;
}
