import type { StoryData } from '../../components/caseStudy/blocks/types';
import { LINKS } from '../links';

/* Copy, order, components and index labels follow
   dissertation-case-study-v2.md exactly. */
export const FRAUD_STORY: StoryData = {
  context: 'Undergraduate dissertation · Hansraj College, University of Delhi',
  title: "A security problem that isn't really about security",
  subtitle: "Testing whether Western anti-fraud design works for India's UPI users",
  tags: ['Choice Architecture', 'RCT Experiment', 'Payment Simulation', 'Behavioural Economics'],
  links: [
    { label: 'Visit Experiment Prototype →', href: LINKS.experimentPrototype },
    { label: 'Read Dissertation →', href: LINKS.dissertation },
  ],
  sections: [
    {
      id: 'tldr',
      eyebrow: 'TL;DR',
      shortLabel: 'TL;DR',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            "Anti-fraud designs from mature markets assume users who read, trust the platform and push back against authority. Many Indian UPI users don't fit that profile.",
            'I built a simulated UPI app and ran a 116-person experiment, testing a warning and a choice architecture redesign against three common scams. The redesign nearly doubled safe choices, but only when the scam relied on authority or urgency.',
          ],
        },
        {
          type: 'infoCard',
          items: [
            { label: 'My role', values: ['Sole researcher and author', 'Designed and built the payment simulator'] },
            { label: 'Timeline', values: ['1 year (2025 to 26)'] },
            {
              label: 'Method',
              values: ['Randomised experiment (3×3 mixed factorial)', 'Case analysis of 6 international interventions'],
            },
            {
              label: 'Tools',
              values: ['Figma', 'AI-assisted front-end development', 'Google Apps Script', 'R'],
            },
          ],
        },
      ],
    },
    {
      id: 'background',
      eyebrow: 'Background',
      heading: 'Fraud in India is a decision problem',
      shortLabel: 'Background',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'India lost over ₹22,495 crore to digital fraud in 2025, nearly three times the figure from 2023. Very little of it involved hacking. The victim enters their own PIN, so no security layer can step in.',
          ],
        },
        {
          type: 'stats',
          stats: [{ value: '₹22,495 crore', label: 'lost to digital fraud in 2025' }],
          bars: {
            items: [
              { label: '2023', value: 7488, display: '₹7,488 crore' },
              { label: '2025', value: 22495, display: '₹22,495 crore' },
            ],
            caption: 'nearly 3× in two years',
          },
        },
        { type: 'highlight', text: "Most fraud doesn't breach the system. It persuades the person holding the phone." },
      ],
    },
    {
      id: 'problem',
      eyebrow: 'Problem',
      heading: 'A playbook built for someone else',
      shortLabel: 'Problem',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'Banks in the UK, Singapore and Australia use choice architecture: friction at risky moments, and a cancel option that is the most visible thing on screen. In UK trials, one redesign cut fraudulent payments by up to 94%. But it assumes a user who reads fluently, trusts the platform and feels free to refuse authority.',
            'Indian fraud research mostly documents what scams look like. This study set out to test what actually stops them.',
          ],
        },
        {
          type: 'callout',
          icon: 'compass',
          label: 'The research question',
          text: "Do international anti-fraud designs transfer to India's UPI users, and does the type of fraud change whether a design protects?",
        },
      ],
    },
    {
      id: 'research',
      eyebrow: 'Research',
      heading: 'Four places the playbook breaks',
      shortLabel: 'Research',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'I analysed six interventions from the UK, China, Singapore, Australia, Nigeria and a five-country study, extracting what each design quietly assumes about its user. In India, those assumptions break along four dimensions.',
          ],
        },
        {
          type: 'insights',
          label: 'Key insights',
          cards: [
            {
              tag: 'Literacy access',
              title: 'A warning only works if it gets read',
              text: 'Many users learned UPI as a sequence of taps, not text to read.',
              visual: 'warning-blur',
            },
            {
              tag: 'Typological fit',
              title: "India's scams look different",
              text: "Most Western evidence covers commercial fraud. India's leans on impersonated authority.",
              visual: 'scam-sms',
            },
            {
              tag: 'Authority dynamics',
              title: 'Refusing "the police" doesn\'t feel like an option',
              text: 'Strong deference to authority makes saying no feel impossible.',
              visual: 'police-call',
            },
            {
              tag: 'Linguistic reach',
              title: 'No single language reaches everyone',
              text: 'A warning translated into Hindi or Tamil changes little if it was never going to be read.',
              visual: 'language-chips',
            },
          ],
        },
        { type: 'frame', id: 'research-structure', title: 'Dissertation structure' },
      ],
    },
    {
      id: 'experiment',
      eyebrow: 'Experiment',
      heading: 'Designing a scam you can safely fall for',
      shortLabel: 'Experiment',
      blocks: [
        {
          type: 'body',
          paragraphs: [
            'The second half tested one dimension directly: does the type of fraud change whether a design protects? Each decision below traded realism against control.',
          ],
        },
        {
          type: 'step',
          number: '01',
          title: 'Testing biases, not just scams',
          text: 'Each scam exploited a different bias common in Indian fraud: authority, urgency and social proof.',
          blocks: [
            {
              type: 'miniCards',
              cards: [
                { title: 'Authority', text: 'traffic police fine', visual: 'scam-authority' },
                { title: 'Urgency', text: 'a friend who "lost his phone"', visual: 'scam-urgency' },
                { title: 'Social proof', text: 'an Instagram deal with glowing comments', visual: 'scam-social' },
              ],
            },
            {
              type: 'note',
              lead: 'Blind by design:',
              text: 'every request was fraudulent, though no one was told, and no one learned whether they chose correctly.',
            },
          ],
        },
        {
          type: 'step',
          number: '02',
          title: 'Two theories of protection',
          text: 'The warning is informational: it relies on people noticing, reading and reasoning under pressure. The CTA is architectural: "Cancel Payment" becomes the primary action, so the safe choice is also the easy one.',
          blocks: [
            {
              type: 'illustration',
              id: 'warning-vs-cta',
              label: 'The warning banner on the PIN screen, beside the CTA redesign: a red Cancel Payment button above an outlined Continue anyway.',
            },
          ],
        },
        {
          type: 'step',
          number: '03',
          title: 'Making it feel real, without being real',
          text: 'Every detail kept behaviour natural and the comparison clean.',
          blocks: [
            {
              type: 'miniCards',
              cards: [
                { title: 'Familiar, not branded', text: "UPI conventions without any real app's identity", visual: 'unbranded' },
                {
                  title: 'Non-round amounts',
                  text: '₹4,500 · ₹1,499 · ₹3,000, so the number raised no suspicion',
                  visual: 'amounts',
                },
                {
                  title: 'An exit on every screen',
                  text: 'backing out at any point counted as protection',
                  visual: 'exit',
                },
                { title: 'One variable at a time', text: 'each design changes a single screen', visual: 'one-variable' },
              ],
            },
          ],
        },
        {
          type: 'step',
          number: '04',
          title: 'Building the simulator',
          text: 'I designed every screen and interaction, then built the simulator in HTML, CSS and vanilla JavaScript using AI-assisted development. AI sped up the build; the experimental logic, conditions and controls were mine to define and verify. Participants were randomly assigned to one of three conditions, and scam order was shuffled for each person.',
          blocks: [
            {
              type: 'dotGrid',
              groups: [
                { label: 'Control', count: 44 },
                { label: 'Warning', count: 36 },
                { label: 'CTA', count: 36 },
              ],
            },
            {
              type: 'note',
              lead: 'Under the hood:',
              text: 'assignment happened invisibly in code, and a Google Apps Script backend logged every decision, response time and confidence rating in real time.',
            },
          ],
        },
        { type: 'frame', id: 'experiment-sitemap', title: 'Experiment sitemap' },
        {
          type: 'frame',
          id: 'user-journey',
          title: 'User journey',
          caption: 'One screen changes. Everything else stays the same.',
        },
      ],
    },
    {
      id: 'results',
      eyebrow: 'Results',
      heading: 'Changing the path beat adding words',
      shortLabel: 'Results',
      blocks: [
        {
          type: 'body',
          paragraphs: ['The primary metric was a single behaviour: did the participant cancel the scam or pay?'],
        },
        {
          type: 'stats',
          stats: [
            { value: '68.5%', label: 'cancelled with the CTA, vs 36.4% in control' },
            { value: '+11 pts', label: 'from the warning, too small to be statistically reliable' },
            { value: '4 s', label: 'median decision time in every group' },
          ],
        },
        {
          type: 'note',
          lead: 'Why it matters:',
          text: "the CTA added no hesitation. People weren't deliberating more; the safer option had simply become the easier one.",
        },
        { type: 'frame', id: 'results', title: 'Results' },
        { type: 'highlight', text: 'Same people, same designs. Only the bias changed.' },
        {
          type: 'findings',
          label: 'What we found',
          items: [
            {
              title: 'Authority and urgency: the CTA roughly doubled cancellations.',
              text: '40.9% → 77.8% and 31.8% → 75.0%.',
            },
            {
              title: 'Social proof broke both designs.',
              text: "The warning had no effect (36.4% → 36.1%) and the CTA's gain shrank to 16 points, no longer reliable.",
            },
            {
              title: 'Feeling safe and being safe were unrelated.',
              text: 'Self-rated confidence in spotting fraud had no link to actually cancelling, mirroring a false-confidence effect seen in a Nigerian field study.',
            },
          ],
        },
      ],
    },
    {
      id: 'implications',
      eyebrow: 'Implications',
      heading: 'Design for vulnerability, not literacy',
      shortLabel: 'Implications',
      blocks: [
        {
          type: 'insights',
          cards: [
            {
              icon: 'hand',
              title: 'Friction as a feature',
              text: "Under cognitive load, people don't read. Reshape the choice instead of explaining it.",
            },
            {
              icon: 'crosshair',
              title: 'Intervene where the bias is triggered',
              text: 'For social commerce, protection has to move upstream into the feed, the listing and the chat.',
            },
            {
              icon: 'gauge',
              title: 'Measure behaviour, not confidence',
              text: 'Confidence can rise while protective behaviour stays flat.',
            },
            {
              icon: 'scale',
              title: 'A protective nudge is still a nudge',
              text: 'A red cancel button works on the same fast thinking fraudsters exploit. Designers should be able to defend the difference.',
            },
          ],
        },
      ],
    },
    {
      id: 'whats-next',
      eyebrow: "What's next",
      heading: "The users this study couldn't reach",
      shortLabel: "What's next",
      blocks: [
        {
          type: 'list',
          items: [
            {
              title: 'Test with the people most at risk:',
              text: 'older, rural and lower-literacy users, ideally on a live interface with a UPI partner.',
            },
            {
              title: 'Design for the social proof gap:',
              text: 'flags on suspicious sellers, counter-signals from real peers, or a short delay that lets manufactured urgency fade.',
            },
            {
              title: 'Go beyond translation:',
              text: 'test whether icons, colour and audio protect users for whom any written warning is a barrier.',
            },
          ],
        },
      ],
    },
    {
      id: 'reflections',
      eyebrow: 'Reflections',
      shortLabel: 'Reflections',
      blocks: [
        {
          type: 'subsection',
          title: 'Best case, by design',
          paragraphs: [
            "Every participant was a student: young, urban, digitally fluent and comfortable in English. That is the most favourable group for these designs, so the results are upper limits. If one design can't perform consistently here, it is unlikely to for users facing language, literacy or authority barriers on top of it.",
          ],
        },
        {
          type: 'subsection',
          title: '"Does it work?" is the wrong question',
          paragraphs: [
            "The type of fraud, not the user's profile, decided whether a design protected anyone. The better question is: against which fraud?",
          ],
        },
        {
          type: 'footnote',
          text: "This paper has been submitted for IIM Bodh Gaya's CIEMC 2.0 post-conference publication.",
        },
      ],
    },
  ],
  closingLink: { label: 'Read the full dissertation →', href: LINKS.dissertation },
  accent: 'var(--accent-dissertation)',
  framePanel: 'var(--accent-dissertation)',
  framePanelInk: 'var(--dissertation-navy)',
  lampColor: 'var(--dissertation-navy)',
  tagColor: 'var(--dissertation-navy)',
  accentInk: { dark: 'var(--dissertation-sky)', light: 'var(--dissertation-navy)' },
};
