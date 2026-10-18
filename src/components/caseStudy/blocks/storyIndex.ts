import type { RailItem } from '../CaseStudyRail';
import type { StoryData } from './types';

/* The section index for a story case study: each section by its short
   label, linked to its anchor. */
export function storyIndex(story: StoryData): RailItem[] {
  return story.sections.map((section) => ({ id: section.id, label: section.shortLabel }));
}
