/* Shared shapes for case study copy and links. */

/* Plain text, or runs where some are bold (e.g. a lead-in) or italic (e.g.
   a book title). */
export type RichText = string | Array<string | { bold: string } | { italic: string }>;

export interface ArticleLink {
  label: string;
  href: string;
}
