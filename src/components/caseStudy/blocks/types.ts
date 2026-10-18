import type { ArticleLink, RichText } from '../../article/types';

/* Content schema for skimmable, component-based case studies: each section
   is an eyebrow, an optional takeaway heading and a list of typed blocks,
   rendered by the components in this folder. Mini illustrations and big
   visuals are referenced by id; the page maps ids to its own components. */

export type StoryIcon = 'compass' | 'hand' | 'crosshair' | 'gauge' | 'scale' | 'target';

export interface MiniCardData {
  title: string;
  text: string;
  /* Id of a mini illustration supplied by the page. */
  visual: string;
}

export interface InsightCardData {
  /* Small label above the title (e.g. the dimension it belongs to). */
  tag?: string;
  title: string;
  text: string;
  /* A mini illustration (by id) or a small icon above the title. */
  visual?: string;
  icon?: StoryIcon;
}

export interface StatData {
  value: string;
  label: string;
}

export type StoryBlock =
  | { type: 'body'; paragraphs: string[] }
  | { type: 'infoCard'; items: { label: string; values: string[] }[] }
  | { type: 'callout'; icon: StoryIcon; label: string; text: string }
  /* A row of stats, optionally with a two-bar comparison under it. */
  | {
      type: 'stats';
      stats: StatData[];
      bars?: { items: { label: string; value: number; display: string }[]; caption: string };
    }
  | { type: 'dotGrid'; groups: { label: string; count: number }[] }
  | { type: 'insights'; label?: string; cards: InsightCardData[] }
  | { type: 'miniCards'; cards: MiniCardData[] }
  /* A single mini illustration (by id), full column width. */
  | { type: 'illustration'; id: string; label: string }
  | {
      type: 'step';
      number: string;
      title: string;
      text: RichText;
      /* Shown under the step's text: mini cards, a dot grid, a note... */
      blocks?: StoryBlock[];
    }
  /* A compact numbered list: bold lead-in, then the rest of the line. */
  | { type: 'list'; items: { title: string; text: string }[] }
  | { type: 'note'; lead: string; text: string }
  | { type: 'highlight'; text: string }
  | { type: 'findings'; label?: string; items: { title: string; text: string }[] }
  | { type: 'subsection'; title: string; paragraphs: string[] }
  | { type: 'footnote'; text: string }
  /* A big visual in a VisualFrame: `id` picks the page's visual component. */
  | { type: 'frame'; id: string; title: string; caption?: string };

export interface StorySectionData {
  /* Anchor for the section index. */
  id: string;
  eyebrow: string;
  heading?: string;
  /* Label in the section index beside the article. */
  shortLabel: string;
  blocks: StoryBlock[];
}

export interface StoryData {
  context?: string;
  title: string;
  subtitle: string;
  tags: string[];
  links: ArticleLink[];
  sections: StorySectionData[];
  closingLink: ArticleLink;
  /* Colour tokens: the visual box fill, the lamp, light-mode tags, the
     accent for text and marks in each reading mode, and the panel the big
     visuals sit on. */
  accent: string;
  framePanel: string;
  /* Text and line colour for visuals drawn directly on the frame panel. */
  framePanelInk: string;
  lampColor: string;
  tagColor: string;
  accentInk: { dark: string; light: string };
}
