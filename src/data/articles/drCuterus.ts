import type { ArticleData } from '../../components/article/types';
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

const LIVE_SITE_URL = 'https://drcuterus.com';

/* Copy and order follow docs/case-studies/dr-cuterus-case-study.md exactly.
   This case study has no left-column pull quotes. */
export const DR_CUTERUS_ARTICLE: ArticleData = {
  title: 'Creating an identity which is unmistakably her',
  subtitle: 'A bilingual website for a doctor, author and sex educator with millions of followers',
  role: 'Design Lead',
  duration: '4 months (2026)',
  tags: ['Client Project', 'Website Design', 'Design System'],
  links: [{ label: 'Visit Live Site →', href: LIVE_SITE_URL }],
  tldr: [
    {
      label: 'The brief:',
      text: 'One website for patients, followers, brands and organisations that felt as credible as a doctor and as unmistakably her as her feed.',
    },
    {
      label: 'What I did:',
      text: 'Led the design end to end, built the visual and bilingual system, structured the site around its audiences, and built about 40% of the live site alongside a developer.',
    },
    {
      label: 'What shipped:',
      text: 'A four-page site in English and Hinglish, live at drcuterus.com across mobile, tablet and desktop.',
    },
  ],
  sections: [
    {
      number: '01',
      title: 'The brief',
      blocks: [
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Dr Tanaya Narendra, known online as Dr Cuterus, is an Oxford-trained doctor, author and sex educator with 1.9 million followers on Instagram and 834K on YouTube. Her brand runs on one line, said in English and Hinglish: 100% science, 0% sharam.',
            },
            {
              type: 'paragraph',
              text: 'She needed one website for four very different visitors: patients booking appointments, followers looking for her content, brands wanting to collaborate and organisations booking workshops. A generic clinic site would lose her voice. A link-in-bio would lose her authority.',
            },
            {
              type: 'paragraph',
              text: 'That tension shaped the whole project. Every decision that follows balances medical credibility against a personality that is warm, loud and a little cheeky on purpose.',
            },
          ],
        },
        { type: 'visual', id: 'homepage-hero', heading: 'Homepage Hero', tone: 'brand' },
      ],
    },
    {
      number: '02',
      title: 'Structure before screens',
      blocks: [
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Before designing anything, I went through her Instagram, YouTube and Spotify to understand how she actually talks. She simplifies without dumbing down, stays playful without losing the science, and Hinglish is native to her rather than a stylistic add-on. That gave the site its tone before it had a single screen.',
            },
            {
              type: 'paragraph',
              text: 'The structure keeps the most important things at the top, so no visitor has to dig for what they came for. Four pages cover the four audiences: Home, Appointments, Blog and Corporate Workshops. The blog exists because the same few questions kept resurfacing in her DMs and comments. Instead of answering them one at a time forever, they now have a permanent home.',
            },
            {
              type: 'paragraph',
              text: "One page didn't survive. An early version had a full page cataloguing her achievements and press, newsletter-style. When she reviewed it, she pointed out that it wasn't doing anything a visitor actually needed. It became the Corporate Workshops page, and the press moved into a scrolling ticker on the homepage. The credibility stayed. The page asking people to read through it went.",
            },
          ],
        },
        { type: 'visual', id: 'site-structure', heading: 'Site Structure', tone: 'dark' },
      ],
    },
    {
      number: '03',
      title: 'A system that sounds like her',
      blocks: [
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'She wanted purple and yellow, bright rather than muted, playful without becoming unserious for a practising doctor, and deliberately no pink. Purple appeared far more often across her existing content, so it became the base. Yellow is reserved for accents: loud where it counts, not everywhere.',
            },
          ],
        },
        { type: 'visual', id: 'colour-system', heading: 'Colour System', tone: 'sky' },
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Headings run in Sentient, a serif with enough personality to feel human rather than clinical. Body text sits in Cabinet Grotesk, a clean sans that stays readable across long blog answers and dense appointment details.',
            },
            {
              type: 'paragraph',
              text: 'Language went deeper than a toggle. Nearly every headline was written as two real sentences, "Hey, I\'m Dr Tanaya Narendra" and "Hi, main hoon Dr Tanaya Narendra", rather than one translated from the other after the fact. The toggle sits in the header and switches the whole site, so neither audience reads as an afterthought.',
            },
          ],
        },
        { type: 'visual', id: 'type-and-language', heading: 'Type and Language', tone: 'dark' },
      ],
    },
    {
      number: '04',
      title: 'Pages that act like her, not like a clinic',
      blocks: [
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: [
                'The homepage reads like her feed, just organised. Her book, ',
                { italic: 'Everything Nobody Tells You About Your Body' },
                ', sits there with its GoodReads rating, available in English, Hindi, Punjabi and Marathi. A few sections down, her bra collaboration, FURSAT, sits next to her podcast, Breast Friends. Her Instagram, YouTube and Spotify presence is pulled into one place instead of asking visitors to go and find it.',
              ],
            },
            {
              type: 'paragraph',
              text: "Beneath the hero, nearly thirty names run past in a continuous ticker: Forbes India, Vogue, CNN, The Economist, the World Health Organization, India's Ministry of Health. Credibility is felt in seconds instead of read in paragraphs.",
            },
          ],
        },
        { type: 'visual', id: 'homepage', heading: 'Homepage', tone: 'brand' },
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Booking a sexual health appointment is rarely a simple decision, so the Appointments page opens by naming the worries people usually keep to themselves: pain during sex, irregular periods, PCOD, discharge, not being able to orgasm. Seeing the question written plainly, instead of hidden behind clinical language, does most of the persuading before the booking button has to.',
            },
          ],
        },
        { type: 'visual', id: 'appointments', heading: 'Appointments', tone: 'sky' },
        { type: 'visual', id: 'blog', heading: 'Blog', tone: 'dark' },
      ],
    },
    {
      number: '05',
      title: 'Built for the phone first',
      blocks: [
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Her own homepage copy says it: "How you will find me while scrolling on your phone." Most of her audience meets her mid-scroll, between reels, on a screen the size of their palm. The site had to hold up there first, and on a desktop pitch second.',
            },
          ],
        },
        { type: 'visual', id: 'on-mobile', heading: 'On Mobile', tone: 'brand' },
      ],
    },
    {
      number: '06',
      title: 'The outcome',
      blocks: [
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'The site is live at drcuterus.com, built in Astro. It holds her tone in English and Hinglish across mobile, tablet and desktop. Patients can book, followers land on content that looks like her, and organisations have a clear page to reach out from. The blog is live and growing, one question at a time.',
            },
            {
              type: 'paragraph',
              text: 'I led the design end to end and built about 40% of the site alongside a developer, including the full component styling.',
            },
          ],
        },
        { type: 'visual', id: 'live-site', heading: 'Live Site', tone: 'dark' },
      ],
    },
  ],
  closingLink: { label: 'Visit drcuterus.com →', href: LIVE_SITE_URL },
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
  caption: "Four pages for four audiences. The cut page is part of the structure's story.",
};

/* Image bands, keyed by visual id. */
export const DR_CUTERUS_IMAGE_SETS: Record<string, ImageSetData> = {
  'homepage-hero': {
    layout: 'single',
    images: [
      {
        src: homepageHero,
        width: 2000,
        height: 1136,
        alt: 'Dr Cuterus homepage on desktop: a polaroid mosaic of Dr Tanaya Narendra beside the headline "100% Science. 0% Sharam." with Book An Appointment and Work With Me buttons, above a yellow press ticker.',
        caption:
          'The homepage opens with her, not a headshot and a designation. A polaroid mosaic shows her in a saree, mid scuba dive, on a public health billboard, recording her podcast and in her white coat, before any button asks for a click.',
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
        caption: 'Purple carries the site, yellow marks what matters. Each pairing is checked for contrast.',
      },
    ],
  },
  'type-and-language': {
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
      {
        src: languageToggle,
        width: 170,
        height: 29,
        alt: 'The header language toggle, switching between English and Hinglish.',
        caption: 'English and Hinglish, one tap apart',
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
        caption: 'Name the fear first. The booking button comes second.',
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
        caption: 'The questions she was answering one DM at a time, now answered once, for everyone.',
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
        caption: 'Your next door sexpert, live.',
      },
    ],
  },
};
