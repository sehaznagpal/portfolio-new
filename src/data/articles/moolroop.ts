import type { ArticleData } from '../../components/article/types';
import type { ImageSetData } from '../../components/article/ImageSet';
import type { ComparisonData } from '../../components/caseStudy/moolroop/ComparisonTable';
import type { StepFlowData } from '../../components/caseStudy/moolroop/StepFlow';
import type { SitemapNode } from '../../components/caseStudy/moolroop/SitemapTree';
import type { ScreenRowData } from '../../components/caseStudy/moolroop/ScreenRow';
import type { VisualLanguageData } from '../../components/caseStudy/moolroop/VisualLanguage';
import giSearch from '../../assets/images/moolroop/article/gi-search-registered-applications.webp';
import loader1 from '../../assets/images/moolroop/article/loader-1.webp';
import loader2 from '../../assets/images/moolroop/article/loader-2.webp';
import loader3 from '../../assets/images/moolroop/article/loader-3.webp';
import home from '../../assets/images/moolroop/article/home.webp';
import handicrafts from '../../assets/images/moolroop/article/handicrafts.webp';
import rajasthan from '../../assets/images/moolroop/article/rajasthan.webp';
import pashminaList from '../../assets/images/moolroop/article/pashmina-list.webp';
import pashminaProduct from '../../assets/images/moolroop/article/pashmina-product.webp';
import pashminaProduct1 from '../../assets/images/moolroop/article/pashmina-product-1.webp';
import provenance1 from '../../assets/images/moolroop/article/pashmina-provenance-1.webp';
import provenance2 from '../../assets/images/moolroop/article/pashmina-provenance-2.webp';
import searchBar from '../../assets/images/moolroop/article/search-bar.webp';
import menu from '../../assets/images/moolroop/article/menu.webp';
import wishlist from '../../assets/images/moolroop/article/wishlist.webp';
import bag from '../../assets/images/moolroop/article/bag.webp';

const PROTOTYPE_LINK = { label: 'Try the Prototype →', href: 'https://bit.ly/moolroop-casestudy-prototype-sehaz' };

/* Copy and order follow docs/case-studies/moolroop-case-study.md exactly. */
export const MOOLROOP_ARTICLE: ArticleData = {
  title: 'Making authenticity as easy to verify as price',
  subtitle: 'A buyer-side app that brings government craft certification into the shopping journey',
  role: 'Solo designer and researcher',
  duration: '1 month (2026)',
  tags: ['Buyer-side Mobile App', 'Information Architecture', 'Figma Prototype'],
  links: [PROTOTYPE_LINK],
  tldr: [
    {
      label: 'Problem:',
      text: 'Proof that an Indian craft is genuine already exists in government records, but it sits several clicks away from where people actually shop.',
    },
    {
      label: 'What I did:',
      text: 'Mapped how authenticity is communicated today, then designed a buyer-side app where verification is part of browsing, not a detour from it.',
    },
    {
      label: 'What I designed:',
      text: 'A two-layer verification system, a quick summary for everyone and the full record for anyone who wants it, inside a shopping flow that stays familiar.',
    },
  ],
  sections: [
    {
      number: '01',
      title: 'The proof exists. Nobody uses it.',
      blocks: [
        {
          type: 'group',
          quote: 'The problem was never missing information. It was the effort it takes to use it.',
          content: [
            {
              type: 'paragraph',
              text: 'A GI tag (Geographical Indication) is a government-issued legal certification that ties a craft to a specific place, process and community of makers: a Kashmiri Pashmina, a Sanganeri block print. India has over 400 of them. In theory, a buyer can check whether a product is genuine. In practice, almost nobody does, because the information is fragmented, hard to access and completely disconnected from the buying journey.',
            },
            {
              type: 'paragraph',
              text: 'I noticed the gap while freelance-writing product descriptions for craft sellers, sourcing details from the same government databases. The records were detailed and public. They just lived in a registry that no shopper would ever open in the middle of a purchase.',
            },
          ],
        },
        { type: 'visual', id: 'official-record', heading: 'The Official Record', tone: 'sky' },
      ],
    },
    {
      number: '02',
      title: 'Understanding the existing experience',
      blocks: [
        {
          type: 'group',
          quote: "Buyers keep asking if it's real. No platform makes it easy to answer.",
          content: [
            {
              type: 'paragraph',
              text: 'Before proposing anything, I looked at how authenticity is communicated today across three sources: the official GI databases, community discussions such as Reddit, and existing craft marketplaces.',
            },
            {
              type: 'paragraph',
              text: "Buyers frequently ask whether a product is genuine, especially for high-value handicrafts bought online. Even Amazon Karigar, India's largest artisan programme, has been reported to fail at telling authentic craft apart from mass-produced imitations.",
            },
            {
              type: 'paragraph',
              text: 'I then compared five platforms that sell Indian handicrafts against six authenticity criteria. Most cleared one or two at best. None showed a GI registration number or linked to the official registry. That made the direction clear: not another craft marketplace, but a shopping experience where verification is built in.',
            },
          ],
        },
        { type: 'visual', id: 'competitive-landscape', heading: 'Competitive Landscape', tone: 'dark' },
      ],
    },
    {
      number: '03',
      title: 'Turning six steps into one tap',
      blocks: [
        {
          type: 'group',
          quote: "Verification shouldn't be a research project.",
          content: [
            {
              type: 'paragraph',
              text: 'Today, a careful buyer has to browse a product, notice a GI claim, search a government website, find the registration, compare it with the seller\'s details and then decide whether to trust it. Most people stop at step two.',
            },
            {
              type: 'paragraph',
              text: 'MoolRoop collapses that into a single action. Browse, tap Verify, read a summary of the official record, decide. The design goal was specific: reduce the effort required to verify authenticity without replacing the official source.',
            },
            {
              type: 'paragraph',
              text: 'Three principles followed from that goal and guided every screen:',
            },
            {
              type: 'list',
              items: [
                [
                  { bold: 'Trust should be immediate.' },
                  ' A buyer should understand whether a product is authentic within seconds, without reading official documents.',
                ],
                [
                  { bold: 'Verification should stay transparent.' },
                  ' The app summarises official records but never replaces them. Every summary links directly to the original government source.',
                ],
                [
                  { bold: 'Provenance is part of discovery.' },
                  " Authenticity isn't only a certificate. Knowing where a craft comes from and how it's made is part of why it's worth buying.",
                ],
              ],
            },
          ],
        },
        { type: 'visual', id: 'opportunity', heading: 'The Opportunity', tone: 'brand' },
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: [
                { bold: 'Scope.' },
                ' MoolRoop is deliberately buyer-side: no login, no checkout and no seller flows. The prototype focuses on the journey that matters, from discovery to verification.',
              ],
            },
          ],
        },
      ],
    },
    {
      number: '04',
      title: 'Structure before screens',
      blocks: [
        {
          type: 'group',
          quote: 'I mapped the whole app before designing a single screen.',
          content: [
            {
              type: 'paragraph',
              text: 'I mapped the full structure first: home, categories, states, product pages, and exactly where verification and provenance would sit inside them. Three structural decisions came out of that map, and each one is a choice between the obvious pattern and the one this problem needed.',
            },
            {
              type: 'list',
              items: [
                [
                  { bold: 'One craft, many products.' },
                  ' The obvious pattern is one listing per product. But a single craft like Pashmina can be sold as a shawl, a kurta or a saree, each possibly from a different seller. So every craft has its own page with all its SKUs underneath. Verification stays tied to the craft, while sellers and formats vary below it.',
                ],
                [
                  { bold: 'Two independent ways in.' },
                  ' Most marketplaces support one browsing path well. But "what\'s made in Rajasthan?" and "I need a gift" are genuinely different searches. MoolRoop treats geography (state) and use (type) as two independent filters, so both paths stay equally short.',
                ],
                [
                  { bold: 'Search that never hides.' },
                  " Search usually lives behind its own tap. Since the app's whole purpose is reducing effort, the search bar stays visible across every browsing screen.",
                ],
              ],
            },
          ],
        },
        { type: 'visual', id: 'app-structure', heading: 'App Structure', tone: 'dark' },
      ],
    },
    {
      number: '05',
      title: 'Designing the journey',
      blocks: [
        {
          type: 'group',
          quote: 'Familiar where it should be. Different only where it matters.',
          content: [
            {
              type: 'paragraph',
              text: 'The app opens with a short welcome sequence, then drops the buyer into a shopping experience that looks deliberately familiar. GI-certified crafts sit inside the layouts people already know, so discovery never feels like a detour into paperwork.',
            },
          ],
        },
        { type: 'visual', id: 'first-impression', heading: 'First Impression', tone: 'sky' },
        { type: 'visual', id: 'two-ways-in', heading: 'Two Ways In', tone: 'brand' },
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Every product page carries two stories at once: the item for sale and the place it comes from. The origin sits beside the price, not behind a separate link a buyer has to go looking for.',
            },
          ],
        },
        { type: 'visual', id: 'two-stories', heading: 'Two Stories', tone: 'dark' },
        {
          type: 'group',
          quote: 'A badge asks for trust. A record earns it. I needed both.',
          content: [
            {
              type: 'paragraph',
              text: "Verification was the hardest design problem. A trust badge alone is fast, but it asks the buyer to take the app's word for it. The full registry record is honest, but no one can read it at a glance. So verification works in two layers. The first is a plain-language summary that confirms whether the seller is authorised. The second is the full GI registration and seller detail, with a link to the original government record. The buyer decides how deep to go.",
            },
          ],
        },
        { type: 'visual', id: 'verify', heading: 'Verify in One Tap', tone: 'brand' },
        {
          type: 'group',
          content: [
            {
              type: 'paragraph',
              text: 'Everything else stays deliberately plain. Menu, wishlist and bag do their job and get out of the way, so verification is the one thing in the app that stands out.',
            },
          ],
        },
        { type: 'visual', id: 'kept-plain', heading: 'Kept Plain on Purpose', tone: 'sky' },
      ],
    },
    {
      number: '06',
      title: 'Visual language',
      blocks: [
        {
          type: 'group',
          quote: 'Rooted in craft, without looking like a government website.',
          content: [
            {
              type: 'paragraph',
              text: 'The visual language had to feel trustworthy without feeling official, and warm without becoming decorative. Fletcha M gives headings a crafted, editorial character. Open Sans keeps product details, prices and verification text easy to read at small sizes. Five colours carry the app, with a near-black to keep it grounded.',
            },
          ],
        },
        { type: 'visual', id: 'visual-language', heading: 'Visual Language', tone: 'dark' },
      ],
    },
    {
      number: '07',
      title: "What this does, and doesn't, solve",
      blocks: [
        {
          type: 'group',
          quote: "This doesn't end counterfeiting. It makes honesty easier to prove.",
          content: [
            {
              type: 'paragraph',
              text: "MoolRoop started as a question about trust and became an exercise in making public information usable. It doesn't solve counterfeiting. What the provenance trail does is make fraud more visible and more effortful, and give honest sellers a way to show proof.",
            },
            {
              type: 'paragraph',
              text: "The most important open question is one only real users can answer: do buyers actually open the verification trail, or do they simply trust that it's there? Those are two different UX outcomes, and they would lead the design in different directions. That is the first thing I'd test.",
            },
            { type: 'paragraph', text: 'Where it could go next:' },
            {
              type: 'list',
              items: [
                [
                  { bold: 'Live registry integration' },
                  ', syncing authorised seller information from official databases automatically.',
                ],
                [
                  { bold: 'QR verification' },
                  ', so a buyer can scan a GI label in a shop and check it instantly.',
                ],
                [{ bold: 'Artisan profiles' }, ' that introduce the people behind each craft.'],
                [
                  { bold: 'A seller dashboard' },
                  ' for verified sellers to manage products and certification details.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
  closingLink: PROTOTYPE_LINK,
};

export const MOOLROOP_RECORD: ImageSetData = {
  layout: 'single',
  images: [
    {
      src: giSearch,
      width: 1600,
      height: 963,
      alt: "GI Search Version 2.0, the government's Registered Applications table: application numbers alongside registered indications such as Darjeeling Tea, Pochampally Ikat, Chanderi Sarees and Mysore Silk, each with a View link.",
      caption: "GI Search, the government's registered applications database. Accurate, public and nowhere near a buy button.",
    },
  ],
};

export const MOOLROOP_COMPARISON: ComparisonData = {
  columns: [
    { name: 'Amazon Karigar' },
    { name: 'GiTagged' },
    { name: 'GoSwadeshi' },
    { name: 'India Handmade' },
    { name: 'iTokri' },
    { name: 'MoolRoop', note: 'My proposal', highlight: true },
  ],
  rows: [
    { label: 'Mobile app', marks: ['yes', 'yes', 'no', 'yes', 'no', 'yes'] },
    { label: 'GI-certified products only', marks: ['no', 'yes', 'no', 'no', 'no', 'yes'] },
    { label: 'Shows GI registration number', marks: ['no', 'no', 'no', 'no', 'no', 'yes'] },
    { label: 'Links to official registry', marks: ['no', 'no', 'no', 'no', 'no', 'yes'] },
    { label: 'Shows authorised seller info', marks: ['no', 'no', 'no', 'no', 'partial', 'yes'] },
    { label: 'Discovery by geographic origin', marks: ['partial', 'partial', 'yes', 'partial', 'yes', 'yes'] },
  ],
  caption: 'Discovery by origin is common. Proof of origin is not.',
};

export const MOOLROOP_FLOW: StepFlowData = {
  before: {
    label: 'TODAY',
    steps: [
      'Browse product',
      'Notice GI tag',
      'Search government website',
      'Find registration',
      'Compare seller details',
      'Trust (?) and decide',
    ],
  },
  after: {
    label: 'MOOLROOP',
    steps: ['Browse product', 'Tap Verify', 'Verification summary and records', 'Decide'],
  },
  caption: 'Six steps, most of them outside the app, become four inside it.',
};

const PRODUCT_FLOW: SitemapNode = {
  label: 'Category page',
  children: [
    {
      label: 'Product type page',
      children: [
        {
          label: 'Product page',
          children: [
            { label: "How it's made" },
            { label: 'Provenance trail' },
            { label: 'Bag', children: [{ label: 'Checkout (future scope)', future: true }] },
            { label: 'Wishlist' },
          ],
        },
      ],
    },
  ],
};

export const MOOLROOP_SITEMAP: { root: SitemapNode; caption: string } = {
  root: {
    label: 'Welcome carousel',
    children: [
      {
        label: 'Explore / Home',
        children: [
          { label: 'Search' },
          { label: 'Categories', children: [PRODUCT_FLOW] },
          {
            label: 'Explore by State',
            children: [{ label: 'State page', children: [{ label: '(same flow as Categories)' }] }],
          },
          { label: 'Most Popular' },
          { label: 'Recommended' },
          { label: 'Wishlist' },
          { label: 'Bag' },
          {
            label: 'Menu',
            children: [{ label: 'About' }, { label: 'Help & Support' }, { label: 'Language (future)', future: true }],
          },
        ],
      },
    ],
  },
  caption: 'Two entry points, one product page, and verification exactly one tap deep.',
};

/* Phone-framed screen bands, keyed by visual id. */
export const MOOLROOP_SCREENS: Record<string, ScreenRowData> = {
  'first-impression': {
    screens: [
      {
        src: loader1,
        alt: 'Welcome screen one: the MoolRoop wordmark over a collage of a silk saree, a carved metal cup and a painted plate, with "discover where goods are really from" and a Start Exploring button.',
      },
      {
        src: loader2,
        alt: 'Welcome screen two: "India\'s finest, with proof, not just a promise" beside photos of craft objects.',
      },
      {
        src: loader3,
        alt: 'Welcome screen three: "with the authenticity it deserves" over a photo of hands embroidering, captioned "every region tells on itself".',
      },
    ],
    caption: 'A short welcome sequence before the shopping begins.',
  },
  'two-ways-in': {
    screens: [
      {
        src: home,
        alt: 'Home screen: "Welcome, Sehaz", a search bar, four product categories, states to explore by and a Most Popular grid.',
        caption: 'Home',
      },
      {
        src: handicrafts,
        alt: 'Handicrafts category page: a short definition of handicrafts above a Most Popular grid of Kathputlis, Blue Pottery Jaipur, Makrana Marble and Pokaran Pottery.',
        caption: 'Browse by category',
      },
      {
        src: rajasthan,
        alt: 'Rajasthan state page: a note on its 18 GI-registered products above popular crafts such as Sanganeri hand block printing and Kathputlis.',
        caption: 'Browse by state',
      },
      {
        src: pashminaList,
        alt: 'Pashmina craft page from Jammu and Kashmir, listing a Pashmina shawl, kurta and suit with their prices.',
        caption: 'Every SKU under one craft',
      },
    ],
  },
  'two-stories': {
    screens: [
      {
        src: pashminaProduct,
        alt: 'Pashmina Kurta product page: ₹35,000, a star rating, "Learn how it\'s made" and "Verify this piece" links, specifications and Add to Cart and Buy Now buttons.',
        caption: 'The product',
      },
      {
        src: pashminaProduct1,
        alt: 'How it\'s made: a map of the Changthang region beside a note that each shawl is hand-cleaned, hand-spun and handwoven on pit looms.',
        caption: "How it's made",
      },
    ],
  },
  verify: {
    screens: [
      {
        src: provenance1,
        alt: 'Verification summary over the Pashmina Kurta: "Confirm this seller is authorised" with ticks for seller authorised, GI registration active, product eligible and official registration details available.',
        tag: 'Layer 1: the summary',
      },
      {
        src: provenance2,
        alt: 'Full verification record: seller details, GI registration and certificate numbers, what the GI protects and who tests and certifies it.',
        tag: 'Layer 2: the full record',
      },
    ],
    caption: 'Quick for most people, complete for anyone who wants proof.',
  },
  'kept-plain': {
    screens: [
      {
        src: searchBar,
        alt: 'Search screen with recent searches: Moradabad Craft, Banarasi Saree, Blue Pottery Vase and Pokaran Pottery.',
        caption: 'Search',
      },
      {
        src: menu,
        alt: 'Menu screen: "India\'s finest crafts. Verified, not just labelled." above My Orders, Coupons and account links.',
        caption: 'Menu',
      },
      {
        src: wishlist,
        alt: 'Favourites screen listing a Sea Green Saree, a Blue Pottery vase and an unavailable metal bowl.',
        caption: 'Wishlist',
      },
      {
        src: bag,
        alt: 'My bag screen with a Banarsi Saree and a Blue Pottery Vase, a promo code field, a ₹28,000 total and Continue to Checkout.',
        caption: 'Bag',
      },
    ],
  },
};

export const MOOLROOP_VISUAL_LANGUAGE: VisualLanguageData = {
  typefaces: [
    /* Not available to load here, so it's shown in a stand-in. */
    { name: 'Fletcha M', role: 'Headings' },
    { name: 'Open Sans', role: 'Body', fontFamily: "'Open Sans Variable', sans-serif" },
  ],
  colours: ['#D9CE6A', '#BF393C', '#2B4C5F', '#F3B5C0', '#24211F'],
  caption: 'Two typefaces, five colours, one job: make verification feel trustworthy, not bureaucratic.',
};
