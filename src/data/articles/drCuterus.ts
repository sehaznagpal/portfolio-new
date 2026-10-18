import type { StoryData } from '../../components/caseStudy/blocks/types';
import { LINKS } from '../links';
import type { ImageSetData } from '../../components/article/ImageSet';
import type { SiteStructureData } from '../../components/caseStudy/drCuterus/SiteStructure';
import homepageHero from '../../assets/images/dr-cuterus/article/homepage-hero.webp';
import colours from '../../assets/images/dr-cuterus/article/colours.webp';
import typography1 from '../../assets/images/dr-cuterus/article/typography-1.webp';
import typography2 from '../../assets/images/dr-cuterus/article/typography-2.webp';
import languageToggle from '../../assets/images/dr-cuterus/article/language-toggle.webp';
import brandsTicker from '../../assets/images/dr-cuterus/article/brands-ticker.webp';
import bra from '../../assets/images/dr-cuterus/article/bra.webp';
import social from '../../assets/images/dr-cuterus/article/social.webp';
import appointments from '../../assets/images/dr-cuterus/article/appointments.webp';
import blogLaptop from '../../assets/images/dr-cuterus/article/decisions-laptop-screen.webp';
import homeMobile from '../../assets/images/dr-cuterus/article/about-home-screen.webp';
import footerMobile from '../../assets/images/dr-cuterus/article/outcome-phone-screen.webp';
import liveLaptop from '../../assets/images/dr-cuterus/article/outcome-laptop-screen.webp';

/* Copy, order, components and index labels follow drcuterus-case-study-v2.md
   exactly (Reflections, marked [CONFIRM], is left out). The press ticker
   note also names CNN and The Economist, and the appointment chips add
   discharge and orgasm, both from the previous case study. */
export const DR_CUTERUS_STORY: StoryData = {
  context: 'Client project · Website design · 2026',
  title: 'Creating an identity which is unmistakably her',
  subtitle: 'A bilingual website for a doctor, author and sex educator with millions of followers',
  tags: ['Client Project', 'Website Design', 'Design System', 'Bilingual'],
  links: [{ label: 'Visit Live Site →', href: LINKS.drCuterusSite }],
  sections: [
    {
      id: 'tldr',
      eyebrow: 'TL;DR',
      shortLabel: 'TL;DR',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'One website for patients, followers, brands and organisations that had to feel as credible as a doctor and as unmistakably her as her feed.',
            'I led the design end to end, built the visual and bilingual system, structured the site around its audiences, and built about 40% of the live site alongside a developer. A four-page site in English and Hinglish is now live at drcuterus.com.',
          ],
        },
        {
          type: 'infoCard',
          items: [
            { label: 'My role', values: ['Design lead', 'Built about 40% of the site, including all component styling'] },
            { label: 'Duration', values: ['4 months (2026)'] },
            { label: 'Audiences', values: ['Patients, followers', 'Brands, organisations'] },
            { label: 'Built with', values: ['Figma', 'Astro, alongside a developer'] },
          ],
        },
      ],
    },
    {
      id: 'brief',
      eyebrow: 'Brief',
      heading: 'Credible as a doctor, unmistakably her',
      shortLabel: 'Brief',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'Dr Tanaya Narendra, known online as Dr Cuterus, is an Oxford-trained doctor, author and sex educator. Her brand runs on one line, said in English and Hinglish: 100% science, 0% sharam.',
          ],
        },
        {
          type: 'stats',
          stats: [
            { value: '1.9M', label: 'followers on Instagram' },
            { value: '834K', label: 'subscribers on YouTube' },
            { value: '4', label: 'audiences, one website' },
          ],
        },
        {
          type: 'callout',
          icon: 'target',
          label: 'The design challenge',
          text: 'A generic clinic site would lose her voice. A link-in-bio would lose her authority.',
        },
        {
          type: 'insights',
          label: 'Four visitors',
          cards: [
            { title: 'Patients', text: 'booking an appointment', visual: 'book-whatsapp' },
            { title: 'Followers', text: 'looking for her content', visual: 'video-tile' },
            { title: 'Brands', text: 'wanting to collaborate', visual: 'work-with-me' },
            { title: 'Organisations', text: 'booking workshops', visual: 'enquiry' },
          ],
        },
        {
          type: 'note',
          lead: 'Why it matters:',
          text: 'every decision that follows balances medical credibility against a personality that is warm, loud and a little cheeky on purpose.',
        },
        {
          type: 'frame',
          id: 'homepage-hero',
          title: 'Homepage hero',
          caption: 'A polaroid mosaic of her life comes before any button asks for a click.',
        },
      ],
    },
    {
      id: 'voice',
      eyebrow: 'Research',
      heading: 'Her voice came before any screen',
      shortLabel: 'Her voice',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'Before designing anything, I went through her Instagram, YouTube and Spotify to understand how she actually talks. That gave the site its tone before it had a single screen.',
          ],
        },
        {
          type: 'miniCards',
          cards: [
            {
              title: 'Simple, never dumbed down',
              text: 'she simplifies the science without losing it',
              visual: 'bubble-tick',
            },
            { title: 'Playful, still science', text: 'the humour never undercuts the facts', visual: 'bubble-sparkle' },
            { title: 'Hinglish is native', text: 'not a stylistic add-on', visual: 'hinglish' },
          ],
        },
      ],
    },
    {
      id: 'structure',
      eyebrow: 'Structure',
      heading: 'Four pages for four audiences',
      shortLabel: 'Structure',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'The most important things sit at the top, so no visitor has to dig for what they came for. The blog exists because the same few questions kept resurfacing in her DMs and comments; now they have a permanent home.',
          ],
        },
        {
          type: 'frame',
          id: 'site-structure',
          title: 'Site structure',
          caption: 'Four pages for four audiences. The cut page is part of the story.',
        },
        {
          type: 'note',
          lead: 'What feedback changed:',
          text: "an early version had a full page cataloguing her achievements and press. She pointed out it wasn't doing anything a visitor needed. It became the Corporate Workshops page, and the press moved into a scrolling ticker on the homepage. The credibility stayed; the page asking people to read through it went.",
        },
      ],
    },
    {
      id: 'system',
      eyebrow: 'Visual system',
      heading: 'A system that sounds like her',
      shortLabel: 'System',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'She wanted purple and yellow, bright rather than muted, playful without becoming unserious for a practising doctor, and deliberately no pink.',
          ],
        },
        {
          type: 'miniCards',
          cards: [
            { title: 'Purple is the base', text: 'it appeared far more often across her content', visual: 'swatch-purple' },
            { title: 'Yellow marks what matters', text: 'loud where it counts, not everywhere', visual: 'yellow-accent' },
            { title: 'No pink, on purpose', text: 'a deliberate brief, not an oversight', visual: 'no-pink' },
          ],
        },
        {
          type: 'frame',
          id: 'colour-system',
          title: 'Colour system',
          caption: 'Purple carries the site, yellow marks what matters. Every pairing is contrast-checked.',
        },
        {
          type: 'miniCards',
          cards: [
            {
              title: 'Sentient',
              text: 'headings: a serif with enough personality to feel human, not clinical',
              visual: 'aa-serif',
            },
            {
              title: 'Cabinet Grotesk',
              text: 'body: a clean sans that stays readable across long answers',
              visual: 'aa-sans',
            },
          ],
        },
        { type: 'frame', id: 'typography', title: 'Typography' },
        {
          type: 'subsection',
          title: 'Bilingual by writing, not translating',
          paragraphs: [
            'Nearly every headline was written as two real sentences, rather than one translated from the other. The toggle sits in the header and switches the whole site, so neither audience reads as an afterthought.',
          ],
        },
        {
          type: 'illustration',
          id: 'bilingual-toggle',
          label: 'The same headline written twice, "Hey, I\'m Dr Tanaya Narendra" and "Hi, main hoon Dr Tanaya Narendra", with the language toggle between them.',
        },
        { type: 'frame', id: 'language-toggle', title: 'Language toggle', caption: 'English and Hinglish, one tap apart.' },
      ],
    },
    {
      id: 'pages',
      eyebrow: 'Pages',
      heading: 'Pages that act like her, not like a clinic',
      shortLabel: 'Pages',
      blocks: [
        {
          type: 'step',
          number: '01',
          title: 'The homepage reads like her feed, organised',
          text: [
            'Her book, ',
            { italic: 'Everything Nobody Tells You About Your Body' },
            ', sits there with its GoodReads rating, in English, Hindi, Punjabi and Marathi. Her bra collaboration, FURSAT, sits next to her podcast, Breast Friends, and her Instagram, YouTube and Spotify are pulled into one place.',
          ],
          blocks: [
            {
              type: 'note',
              lead: 'Credibility in seconds:',
              text: "beneath the hero, nearly thirty names run past in a continuous ticker, from Forbes India, Vogue, CNN and The Economist to the World Health Organization and India's Ministry of Health.",
            },
          ],
        },
        { type: 'frame', id: 'homepage', title: 'Homepage' },
        {
          type: 'step',
          number: '02',
          title: 'Appointments name the fear first',
          text: 'Booking a sexual health appointment is rarely simple, so the page opens with the worries people keep to themselves. Seeing the question written plainly does most of the persuading before the button has to.',
          blocks: [
            {
              type: 'illustration',
              id: 'appointment-chips',
              label: 'Worries as tags, "Does sex hurt?", "Irregular periods?", "Have PCOD?", "Discharge?" and "Struggling to orgasm?", above a Book via WhatsApp button.',
            },
          ],
        },
        {
          type: 'frame',
          id: 'appointments',
          title: 'Appointments',
          caption: 'Name the fear first. The booking button comes second.',
        },
        {
          type: 'step',
          number: '03',
          title: 'The blog answers once, for everyone',
          text: 'The questions she was answering one DM at a time now have a permanent home.',
        },
        {
          type: 'frame',
          id: 'blog',
          title: 'Blog',
          caption: 'The questions she was answering one DM at a time, now answered once, for everyone.',
        },
      ],
    },
    {
      id: 'mobile',
      eyebrow: 'Mobile',
      heading: 'Built for the phone first',
      shortLabel: 'Mobile',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'Most of her audience meets her mid-scroll, between reels, on a screen the size of their palm. The site had to hold up there first, and on a desktop pitch second.',
          ],
        },
        { type: 'highlight', text: '"How you will find me while scrolling on your phone."' },
        { type: 'frame', id: 'on-mobile', title: 'On mobile' },
      ],
    },
    {
      id: 'outcome',
      eyebrow: 'Outcome',
      heading: 'Live in two languages, on every screen',
      shortLabel: 'Outcome',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'The site is live at drcuterus.com, built in Astro, and holds her tone in English and Hinglish across mobile, tablet and desktop.',
          ],
        },
        {
          type: 'findings',
          label: 'What shipped',
          items: [
            { title: 'Patients can book.', text: 'Straight from the Appointments page, via WhatsApp.' },
            {
              title: 'Followers land on content that looks like her.',
              text: 'Her book, podcast, merch and platforms in one place.',
            },
            {
              title: 'Organisations have a clear page to reach out from.',
              text: 'Corporate Workshops replaced the old achievements page.',
            },
            { title: 'The blog is live and growing.', text: 'One question at a time.' },
          ],
        },
        {
          type: 'note',
          lead: 'My part:',
          text: 'I led the design end to end and built about 40% of the site alongside a developer, including the full component styling.',
        },
        { type: 'frame', id: 'live-site', title: 'Live site', caption: 'Your next door sexpert, live.' },
      ],
    },
  ],
  closingLink: { label: 'Visit drcuterus.com →', href: LINKS.drCuterusSite },
  accent: 'var(--accent-dr-cuterus)',
  framePanel: 'var(--dr-cuterus-lilac)',
  framePanelInk: 'var(--case-study-grey)',
  lampColor: 'var(--dr-cuterus-lilac)',
  tagColor: 'var(--dr-cuterus-purple)',
  accentInk: { dark: 'var(--dr-cuterus-lilac)', light: 'var(--dr-cuterus-purple)' },
};

export const DR_CUTERUS_SITE_STRUCTURE: SiteStructureData = {
  pages: [
    {
      name: 'Home',
      sections: ['Hero mosaic', 'Press ticker', 'Book', 'Merch and podcast', 'Social presence', 'Footer'],
    },
    { name: 'Appointments', sections: ['"Does any of these sound like you?"', 'Book via WhatsApp'] },
    { name: 'Blog', sections: ['"Have questions?"', 'Answers to recurring questions'] },
    { name: 'Corporate Workshops', sections: ['Enquiries from organisations'] },
  ],
  cut: { name: 'Achievements page', label: 'Cut: replaced by the press ticker and Corporate Workshops' },
};

/* Image sets for the VisualFrames, keyed by frame id. */
export const DR_CUTERUS_IMAGE_SETS: Record<string, ImageSetData> = {
  'homepage-hero': {
    layout: 'single',
    images: [
      {
        src: homepageHero,
        width: 2000,
        height: 1136,
        alt: 'Dr Cuterus homepage on desktop: a polaroid mosaic of Dr Tanaya Narendra beside the headline "100% Science. 0% Sharam." with Book An Appointment and Work With Me buttons, above a yellow press ticker.',
      },
    ],
  },
  'colour-system': {
    layout: 'single',
    images: [
      {
        src: colours,
        width: 2000,
        height: 824,
        alt: 'Colour system: white, black and beige base swatches, purple and yellow brand ramps from 50 to 900, and red, blue and green semantic colours, each labelled with its contrast rating.',
      },
    ],
  },
  typography: {
    layout: 'pair',
    images: [
      {
        src: typography1,
        width: 1821,
        height: 1484,
        alt: 'Sentient type specimen: the alphabet and a scale of display and text sizes from Display 2XL down to Text XS.',
        caption: 'Sentient: the display typeface',
      },
      {
        src: typography2,
        width: 1877,
        height: 1549,
        alt: 'Cabinet Grotesk type specimen: the alphabet and a scale of display and text sizes from Display 2XL down to Text XS.',
        caption: 'Cabinet Grotesk: the text typeface',
      },
    ],
  },
  'language-toggle': {
    layout: 'single',
    images: [
      {
        src: languageToggle,
        width: 170,
        height: 29,
        alt: 'The header language toggle, switching between English and Hinglish.',
        small: true,
      },
    ],
  },
  homepage: {
    layout: 'stack',
    images: [
      {
        src: brandsTicker,
        width: 2000,
        height: 83,
        alt: 'Yellow press ticker with logos including National Geographic, the Bill and Melinda Gates Foundation, Mumbai Mirror, Cosmopolitan, Deccan Herald and Vogue India.',
        caption: 'Press and partners, moving rather than sitting still',
      },
      {
        src: bra,
        width: 2000,
        height: 1133,
        alt: 'Homepage section "Made a bra for you" presenting the FURSAT bra with colour swatches and an order button, above a row of Breast Friends Podcast episodes.',
        caption: "Merch and podcast, in the same confident, slightly cheeky voice",
      },
      {
        src: social,
        width: 2000,
        height: 1132,
        alt: 'Homepage section showing her Instagram, Spotify and YouTube on three phones, titled "How you will find me while scrolling on your phone".',
        caption: "Every platform she's on, in one place",
      },
    ],
  },
  appointments: {
    layout: 'single',
    images: [
      {
        src: appointments,
        width: 2000,
        height: 1133,
        alt: 'Appointments page: "Does Any of These Sound Like You?" surrounded by tags such as "Does sex hurt?", "Struggling to orgasm?" and "Have PCOD/PCOS/PMOS?", above a Book Via WhatsApp button.',
      },
    ],
  },
  blog: {
    layout: 'single',
    images: [
      {
        src: blogLaptop,
        width: 2000,
        height: 1327,
        alt: 'Blog page on a laptop: "Have Questions? Even the awkward ones." beside a framed photo of her, with a Menstrual Health filter and an article titled "A Guide to Menstrual Cups".',
      },
    ],
  },
  'on-mobile': {
    layout: 'pair',
    images: [
      {
        src: homeMobile,
        width: 674,
        height: 1432,
        alt: 'Homepage on a phone: the polaroid mosaic, the headline "100% Science. 0% Sharam." and the appointment buttons.',
        caption: 'Homepage, mobile',
        framed: true,
      },
      {
        src: footerMobile,
        width: 676,
        height: 1424,
        alt: 'Footer on a phone: "Found something you liked? Let\'s talk." with Work With Me and See My Content buttons, above a photo of her reading with her dog.',
        caption: 'The footer keeps her voice to the last line, with a cameo from her dog, Samosa',
        framed: true,
      },
    ],
  },
  'live-site': {
    layout: 'single',
    images: [
      {
        src: liveLaptop,
        width: 2000,
        height: 1329,
        alt: 'Live site on a laptop: "Your Next Door Sexpert." beside a photo of her holding a Mumbai Mirror newspaper, with a Read It Now button.',
      },
    ],
  },
};
