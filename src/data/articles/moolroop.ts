import type { StoryData } from '../../components/caseStudy/blocks/types';
import { LINKS } from '../links';
import type { ImageSetData } from '../../components/article/ImageSet';
import type { SitemapNode } from '../../components/caseStudy/moolroop/SitemapTree';
import type { ScreenRowData } from '../../components/caseStudy/moolroop/ScreenRow';
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

const PROTOTYPE_LINK = { label: 'Try the Prototype →', href: LINKS.moolroopPrototype };

/* Copy, order, components, table data and index labels follow
   moolroop-case-study-v2.md exactly. Items marked [CONFIRM] there are left
   out: Reflections, the "Two layers" con, the two "what it would mean"
   lines and the measurement note. "Verification shouldn't be a research
   project" returns from the previous case study as a highlight line. */
export const MOOLROOP_STORY: StoryData = {
  context: 'Self-initiated project · Mobile app · 2026',
  title: 'Making authenticity as easy to verify as price',
  subtitle: 'A buyer-side app that brings government craft certification into the shopping journey',
  tags: ['Buyer-side Mobile App', 'UX Research', 'Information Architecture', 'Figma Prototype'],
  links: [PROTOTYPE_LINK],
  sections: [
    {
      id: 'tldr',
      eyebrow: 'TL;DR',
      shortLabel: 'TL;DR',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'Proof that an Indian craft is genuine already exists in government records, but it sits several clicks away from where people actually shop.',
            'I mapped how authenticity is communicated today, then designed a buyer-side app where verification is part of browsing, not a detour from it. The result is a two-layer verification system, a quick summary for everyone and the full record for anyone who wants it, inside a shopping flow that stays familiar.',
          ],
        },
        {
          type: 'infoCard',
          items: [
            { label: 'My role', values: ['Solo designer and researcher'] },
            { label: 'Duration', values: ['1 month (2026)'] },
            { label: 'Methods', values: ['Desk research, community listening', 'Competitive audit, information architecture'] },
            { label: 'Deliverable', values: ['Interactive Figma prototype'] },
          ],
        },
      ],
    },
    {
      id: 'problem',
      eyebrow: 'Problem',
      heading: 'The proof exists. Nobody uses it.',
      shortLabel: 'Problem',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'A GI tag (Geographical Indication) is a government-issued legal certification that ties a craft to a specific place, process and community of makers: a Kashmiri Pashmina, a Sanganeri block print. In theory, a buyer can check whether a product is genuine. In practice, almost nobody does.',
          ],
        },
        {
          type: 'stats',
          stats: [
            { value: '400+', label: 'GI-registered products in India' },
            { value: '0', label: 'of five craft platforms reviewed link to the official registry' },
          ],
        },
        {
          type: 'insights',
          compact: true,
          cards: [
            { title: 'Fragmented', text: 'spread across registry pages, not one place', visual: 'scattered-docs' },
            { title: 'Hard to access', text: 'built for applications, not shoppers', visual: 'dense-row' },
            { title: 'Disconnected from buying', text: 'nowhere near a buy button', visual: 'broken-link' },
          ],
        },
        { type: 'highlight', text: 'The problem was never missing information. It was the effort it takes to use it.' },
        {
          type: 'frame',
          id: 'official-record',
          title: 'The official record',
          caption: "GI Search, the government's registered applications database. Accurate, public and nowhere near a buy button.",
        },
        {
          type: 'note',
          lead: 'How I found it:',
          text: 'while freelance-writing product descriptions for craft sellers, I sourced details from these same government databases. The records were detailed and public. They just lived in a registry no shopper would open in the middle of a purchase.',
        },
      ],
    },
    {
      id: 'research',
      eyebrow: 'Research',
      heading: "Buyers keep asking if it's real",
      shortLabel: 'Research',
      blocks: [
        {
          type: 'body',
          paragraphs: ['Before proposing anything, I looked at how authenticity is communicated today across three sources.'],
        },
        {
          type: 'miniCards',
          cards: [
            {
              title: 'Official GI databases',
              text: "what the records contain and how they're accessed",
              visual: 'registry-row',
            },
            { title: 'Community discussions', text: 'what buyers ask, on forums such as Reddit', visual: 'forum-post' },
            { title: 'Craft marketplaces', text: 'how platforms communicate authenticity', visual: 'vague-label' },
          ],
        },
        {
          type: 'insights',
          label: 'Key insights',
          compact: true,
          cards: [
            {
              title: 'Doubt is common',
              text: 'buyers frequently ask whether a product is genuine, especially for high-value handicrafts bought online.',
              visual: 'question-product',
            },
            {
              title: 'Even the biggest programme struggles',
              text: "Amazon Karigar, India's largest artisan programme, has been reported to fail at telling authentic craft apart from mass-produced imitations.",
              visual: 'lookalikes',
            },
            {
              title: 'Origin is shown, proof is not',
              text: 'platforms let you browse by region, but none prove where a product comes from.',
              visual: 'pin-no-cert',
            },
          ],
        },
      ],
    },
    {
      id: 'audit',
      eyebrow: 'Competitive audit',
      heading: 'Discovery by origin is common. Proof of origin is not.',
      shortLabel: 'Audit',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'I compared five platforms that sell Indian handicrafts against six authenticity criteria. Most cleared one or two at best. None showed a GI registration number or linked to the official registry.',
          ],
        },
        {
          type: 'comparison',
          table: {
            columns: [
              { name: 'Amazon Karigar' },
              { name: 'GiTagged' },
              { name: 'GoSwadeshi' },
              { name: 'India Handmade' },
              { name: 'iTokri' },
              { name: 'MoolRoop', note: '(proposal)', highlight: true },
            ],
            rows: [
              { label: 'Mobile app', marks: ['yes', 'yes', 'no', 'yes', 'no', 'yes'] },
              { label: 'GI-certified products only', marks: ['no', 'yes', 'no', 'no', 'no', 'yes'] },
              { label: 'Shows GI registration number', marks: ['no', 'no', 'no', 'no', 'no', 'yes'] },
              { label: 'Links to official registry', marks: ['no', 'no', 'no', 'no', 'no', 'yes'] },
              { label: 'Shows authorised seller info', marks: ['no', 'no', 'no', 'no', 'partial', 'yes'] },
              { label: 'Discovery by geographic origin', marks: ['partial', 'partial', 'yes', 'partial', 'yes', 'yes'] },
            ],
          },
        },
        {
          type: 'note',
          lead: 'What this ruled out:',
          text: 'not another craft marketplace, but a shopping experience where verification is built in.',
        },
      ],
    },
    {
      id: 'opportunity',
      eyebrow: 'Opportunity',
      heading: 'Turning six steps into one tap',
      shortLabel: 'Opportunity',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'Today, a careful buyer has to leave the shopping journey to verify anything. Most people stop at step two.',
          ],
        },
        {
          type: 'journey',
          caption: 'Six steps, most of them outside the app, become four inside it.',
          journeys: [
            {
              label: 'Today',
              dropAfter: 2,
              steps: [
                { text: 'Browse product' },
                { text: 'Notice GI tag' },
                { text: 'Search government website', outside: true },
                { text: 'Find registration', outside: true },
                { text: 'Compare seller details', outside: true },
                { text: 'Trust (?) and decide' },
              ],
            },
            {
              label: 'MoolRoop',
              accent: true,
              steps: [
                { text: 'Browse product' },
                { text: 'Tap Verify' },
                { text: 'Verification summary and records' },
                { text: 'Decide' },
              ],
            },
          ],
        },
        { type: 'highlight', text: "Verification shouldn't be a research project." },
        {
          type: 'callout',
          icon: 'target',
          label: 'Design goal',
          text: 'Reduce the effort required to verify authenticity, without replacing the official source.',
        },
        {
          type: 'insights',
          label: 'Design principles',
          compact: true,
          cards: [
            {
              title: 'Trust should be immediate',
              text: 'a buyer should understand whether a product is authentic within seconds, without reading official documents.',
              visual: 'stopwatch-tick',
            },
            {
              title: 'Verification should stay transparent',
              text: 'the app summarises official records but never replaces them; every summary links to the government source.',
              visual: 'summary-link',
            },
            {
              title: 'Provenance is part of discovery',
              text: "knowing where a craft comes from and how it's made is part of why it's worth buying.",
              visual: 'pin-product',
            },
          ],
        },
      ],
    },
    {
      id: 'scope',
      eyebrow: 'Scope',
      heading: 'Deliberately buyer-side',
      shortLabel: 'Scope',
      blocks: [
        {
          type: 'body',
          paragraphs: ['The prototype focuses on the journey that matters, from discovery to verification.'],
        },
        {
          type: 'scope',
          inScope: [
            'Discovery by category and state',
            'Craft and product pages',
            'Verification and provenance',
            'Search, wishlist, bag',
          ],
          outOfScope: ['Login and signup', 'Checkout', 'Seller flows'],
        },
      ],
    },
    {
      id: 'structure',
      eyebrow: 'Information architecture',
      heading: 'Structure before screens',
      shortLabel: 'Structure',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'I mapped the full app before designing a single screen: home, categories, states, product pages, and exactly where verification and provenance would sit. Three structural decisions came out of that map, each a choice between the obvious pattern and the one this problem needed.',
          ],
        },
        {
          type: 'frame',
          id: 'app-structure',
          title: 'App structure',
          caption: 'Two entry points, one product page, and verification exactly one tap deep.',
        },
        {
          type: 'decisions',
          label: 'Key decisions',
          items: [
            {
              title: 'One craft, many products',
              obvious: 'one listing per product',
              needed: 'every craft gets its own page, with all its SKUs underneath',
              why: 'a single craft like Pashmina can be a shawl, a kurta or a saree, each possibly from a different seller. Verification stays tied to the craft while sellers and formats vary below it.',
              visual: 'craft-branch',
            },
            {
              title: 'Two independent ways in',
              obvious: 'one browsing path done well',
              needed: 'geography (state) and use (type) as two independent filters',
              why: '"what\'s made in Rajasthan?" and "I need a gift" are genuinely different searches, so both paths stay equally short.',
              visual: 'two-entries',
            },
            {
              title: 'Search that never hides',
              obvious: 'search behind its own tap',
              needed: 'a search bar visible on every browsing screen',
              why: "the app's whole purpose is reducing effort.",
              visual: 'search-grid',
            },
          ],
        },
      ],
    },
    {
      id: 'design',
      eyebrow: 'Design',
      heading: 'Familiar where it should be. Different only where it matters.',
      shortLabel: 'Design',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'GI-certified crafts sit inside the layouts people already know, so discovery never feels like a detour into paperwork.',
          ],
        },
        {
          type: 'step',
          number: '01',
          title: 'A short welcome, then straight to shopping',
          text: 'The app opens with a three-screen welcome sequence that sets the promise, then drops the buyer into a familiar shopping experience.',
        },
        {
          type: 'frame',
          id: 'first-impression',
          title: 'First impression',
          caption: 'A short welcome sequence before the shopping begins.',
        },
        {
          type: 'step',
          number: '02',
          title: 'Two ways in, one craft page',
          text: 'Home offers both entry points side by side. Category and state pages lead to the same craft page, where every SKU sits under one verified craft.',
        },
        { type: 'frame', id: 'two-ways-in', title: 'Two ways in' },
        {
          type: 'step',
          number: '03',
          title: 'Every product tells two stories',
          text: 'Every product page carries the item for sale and the place it comes from. The origin sits beside the price, not behind a separate link.',
        },
        { type: 'frame', id: 'two-stories', title: 'Two stories' },
      ],
    },
    {
      id: 'verification',
      eyebrow: 'Verification',
      heading: 'The hardest design problem',
      shortLabel: 'Verification',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            "Verification had to be fast enough that people actually use it, and honest enough that it's worth using.",
          ],
        },
        {
          type: 'options',
          items: [
            {
              name: 'A trust badge',
              visual: 'badge',
              pro: 'fast, readable at a glance',
              con: "asks the buyer to take the app's word for it",
            },
            {
              name: 'The full registry record',
              visual: 'dense-doc',
              pro: 'honest and complete',
              con: 'no one can read it at a glance',
            },
            {
              name: 'Two layers',
              visual: 'two-layers',
              pro: 'a plain summary for everyone, the full record for anyone who wants proof',
              chosen: true,
            },
          ],
        },
        {
          type: 'findings',
          items: [
            {
              title: 'Layer 1: the summary',
              text: 'a plain-language check that confirms the seller is authorised, the GI registration is active, the product is eligible and official details are available.',
            },
            {
              title: 'Layer 2: the full record',
              text: 'seller details, GI registration and certificate numbers, what the GI protects and who tests and certifies it, with a link to the original government record.',
            },
          ],
        },
        {
          type: 'frame',
          id: 'verify',
          title: 'Verify in one tap',
          caption: 'Quick for most people, complete for anyone who wants proof. The buyer decides how deep to go.',
        },
        {
          type: 'subsection',
          title: 'Kept plain on purpose',
          paragraphs: [
            'Menu, wishlist and bag do their job and get out of the way, so verification is the one thing in the app that stands out.',
          ],
        },
        { type: 'frame', id: 'kept-plain', title: 'Kept plain on purpose' },
      ],
    },
    {
      id: 'visual-language',
      eyebrow: 'Visual language',
      heading: 'Rooted in craft, without looking like a government website',
      shortLabel: 'Visual language',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'The visual language had to feel trustworthy without feeling official, and warm without becoming decorative.',
          ],
        },
        {
          type: 'miniCards',
          cards: [
            { title: 'Fletcha M', text: 'headings: a crafted, editorial character', visual: 'aa-standin' },
            {
              title: 'Open Sans',
              text: 'body: product details, prices and verification text stay readable at small sizes',
              visual: 'aa-open-sans',
            },
          ],
        },
        {
          type: 'swatches',
          caption: 'Two typefaces, five colours, one job: make verification feel trustworthy, not bureaucratic.',
          swatches: [
            { hex: '#D9CE6A' },
            { hex: '#BF393C' },
            { hex: '#2B4C5F' },
            { hex: '#F3B5C0' },
            { hex: '#24211F', note: 'near-black that keeps it grounded' },
          ],
        },
      ],
    },
    {
      id: 'impact',
      eyebrow: 'Impact and limits',
      heading: "This doesn't end counterfeiting. It makes honesty easier to prove.",
      shortLabel: 'Impact',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'MoolRoop started as a question about trust and became an exercise in making public information usable.',
          ],
        },
        {
          type: 'findings',
          items: [
            { title: 'What it does:', text: 'makes fraud more visible and more effortful.' },
            { title: 'Who it helps:', text: 'gives honest sellers a way to show proof.' },
            { title: "What it doesn't:", text: "it doesn't solve counterfeiting on its own." },
          ],
        },
      ],
    },
    {
      id: 'testing',
      eyebrow: "What I'd test first",
      heading: "Do buyers open the trail, or just trust it's there?",
      shortLabel: 'Testing',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            "Those are two different UX outcomes, and they would lead the design in different directions. That is the first thing I'd test with real users.",
          ],
        },
        { type: 'options', items: [{ name: 'They open it' }, { name: "They trust it's there" }] },
      ],
    },
    {
      id: 'whats-next',
      eyebrow: "What's next",
      heading: 'Where it could go',
      shortLabel: "What's next",
      blocks: [
        {
          type: 'miniCards',
          cards: [
            {
              title: 'Live registry integration',
              text: 'syncing authorised seller information from official databases automatically',
              visual: 'sync',
            },
            { title: 'QR verification', text: 'scan a GI label in a shop and check it instantly', visual: 'qr' },
            { title: 'Artisan profiles', text: 'introduce the people behind each craft', visual: 'profile' },
            {
              title: 'Seller dashboard',
              text: 'verified sellers manage products and certification details',
              visual: 'dashboard',
            },
          ],
        },
      ],
    },
  ],
  closingLink: PROTOTYPE_LINK,
  accent: 'var(--accent-moolroop)',
  framePanel: 'var(--moolroop-poster-maroon)',
  framePanelInk: 'var(--case-study-white)',
  lampColor: 'var(--moolroop-poster-maroon)',
  tagColor: 'var(--moolroop-poster-maroon)',
  accentInk: { dark: 'var(--moolroop-red-light)', light: 'var(--moolroop-red-deep)' },
};

export const MOOLROOP_RECORD: ImageSetData = {
  layout: 'single',
  images: [
    {
      src: giSearch,
      width: 1600,
      height: 963,
      alt: "GI Search Version 2.0, the government's Registered Applications table: application numbers alongside registered indications such as Darjeeling Tea, Pochampally Ikat, Chanderi Sarees and Mysore Silk, each with a View link.",
    },
  ],
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

export const MOOLROOP_SITEMAP: { root: SitemapNode } = {
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
};

/* Phone-framed screen rows for the VisualFrames, keyed by frame id. */
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
