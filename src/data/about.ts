export const ABOUT_INTRO =
  "hey there, i'm Sehaz Nagpal. good design, to me, is just good thinking made visible. i'm a product designer who cares about the reasoning behind a screen as much as the screen itself. currently open to full-time roles and meaningful collaborations.";

export const ABOUT_CAPTION = 'a recent graduate in economics (hansraj’26)';

export const ABOUT_TICKER_ITEMS = [
  '(product design)',
  '(ux research)',
  '(prototyping)',
  '(design systems)',
  '(content strategy & writing)',
  '(ai-assisted front-end)',
  '(scoping)',
];

export interface ExperienceRow {
  role: string;
  company: string;
  year: string;
}

// Newest first.
export const ABOUT_EXPERIENCE: ExperienceRow[] = [
  { role: 'website designer', company: 'Dr Cuterus', year: '2026' },
  { role: 'website designer', company: 'Dr Mayank', year: '2026' },
  { role: 'website designer', company: 'Re-Wired Labs', year: '2026' },
  { role: 'freelance designer', company: 'Amora', year: '2026' },
  { role: 'ux & product designer', company: 'Hunger Halt', year: '2025' },
  { role: 'product & design intern', company: 'YouseAI', year: '2025' },
];
