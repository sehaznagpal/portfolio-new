import type { ArticleData } from '../../components/article/types';
import { LINKS } from '../links';

/* Copy and order follow dissertation-case-study.md exactly. */
export const FRAUD_ARTICLE: ArticleData = {
  title: "A security problem that isn't really about security",
  subtitle: "Testing whether Western anti-fraud design works for India's UPI users",
  role: 'Sole researcher and author',
  duration: '1 year (2025 to 26)',
  tags: ['Choice Architecture', 'RCT Experiment', 'Payment Simulation'],
  links: [
    { label: 'Visit Experiment Prototype →', href: LINKS.experimentPrototype },
    { label: 'Read Dissertation →', href: LINKS.dissertation },
  ],
  tldr: [
    {
      label: 'Problem:',
      text: "Anti-fraud designs from the West assume users who read, trust the platform and push back against authority. Many Indian UPI users don't fit that profile.",
    },
    {
      label: 'What I did:',
      text: 'Built a simulated UPI app and tested a warning and a choice architecture redesign against three types of scams with 116 users.',
    },
    {
      label: 'What I found:',
      text: 'The redesign nearly doubled safe choices, but only when the scam relied on authority or urgency, not when it looked like a deal other people trusted.',
    },
  ],
  sections: [
    {
      number: '01',
      title: 'The contextual transfer problem',
      shortLabel: 'Context',
      blocks: [
        {
          type: 'group',
          quote: "Most fraud in India doesn't breach the system. It persuades the person holding the phone.",
          content: [
            {
              type: 'paragraph',
              text: 'India lost over ₹22,495 crore to digital fraud in 2025, nearly three times the figure from 2023. Very little of it involved hacking. In a fake police fine, a "digital arrest" call or a too-good-to-be-true listing, the victim enters their own PIN and authorises the payment. No security layer can step in when the user makes the choice willingly, which makes fraud a problem of decision-making, and so a problem of design.',
            },
            {
              type: 'paragraph',
              text: 'Fraudsters engineer that decision. Fear, urgency and borrowed authority push people into System 1 thinking: fast, automatic and emotional. The slower System 2 reasoning that a warning depends on rarely gets a turn.',
            },
          ],
        },
        {
          type: 'group',
          quote: 'A design that protects one user can be invisible to another.',
          content: [
            {
              type: 'paragraph',
              text: 'Banks in the UK, Singapore and Australia respond with choice architecture: intentional friction at risky moments, and a cancel option that is the most salient thing on the screen. In UK trials, one such redesign cut fraudulent payments by up to 94%. But these designs assume a digitally mature user who reads the interface fluently, trusts the platform and feels free to refuse authority. Many Indian UPI users learned payments as a sequence of taps rather than text to read, and a strong cultural deference to authority makes refusing "the police" feel like no option at all. A warning translated into Hindi or Tamil changes little if it was never going to be read.',
            },
            {
              type: 'paragraph',
              text: 'Indian fraud research mostly documents what scams look like. This study set out to test what actually stops them.',
            },
          ],
        },
      ],
    },
    {
      number: '02',
      title: 'Two halves of one question',
      shortLabel: 'Two halves',
      blocks: [
        {
          type: 'group',
          quote: 'The full research had two halves. This is the one you can click through.',
          content: [
            {
              type: 'paragraph',
              text: 'The dissertation asked whether international anti-fraud designs transfer to India. The first half analysed six interventions from the UK, China, Singapore, Australia, Nigeria and a five-country study, extracting what each design quietly assumes about its user. In India, those assumptions break down along four dimensions: literacy access, typological fit, authority dynamics and linguistic reach.',
            },
            {
              type: 'paragraph',
              text: 'The second half tested one of them empirically: does the type of fraud change whether a design protects? This case study is about that experiment.',
            },
          ],
        },
        { type: 'visual', id: 'research-structure', heading: 'Dissertation Structure', tone: 'sky' },
      ],
    },
    {
      number: '03',
      title: 'A fraud you can safely fall for',
      shortLabel: 'The experiment',
      blocks: [
        {
          type: 'group',
          quote: 'I built a payment app where falling for a scam costs nothing.',
          content: [
            {
              type: 'paragraph',
              text: '116 university students made payment decisions on a simulated UPI interface. Every request was fraudulent, though no one was told, and no one learned whether they chose correctly. Each scam exploited a different cognitive bias common in Indian fraud: authority (a traffic police fine with a legal threat), urgency (a friend who has "lost his phone") and social proof (an Instagram deal backed by glowing comments).',
            },
            {
              type: 'paragraph',
              text: 'Participants were randomly assigned to one of three conditions, held constant across all three scams: a standard payment flow (control), the same flow with a fraud warning on the PIN screen, or a CTA redesign where a red "Cancel Payment" became the primary action and paying was demoted to a secondary "Continue anyway". The outcome was a single behavioural measure: did the person cancel or pay.',
            },
            {
              type: 'paragraph',
              text: 'The simulator was built in HTML, CSS and vanilla JavaScript and hosted on Netlify, with a Google Apps Script backend logging every decision, response time and confidence rating in real time. Assignment happened invisibly in code, and scam order was shuffled for each participant to neutralise order effects.',
            },
            {
              type: 'paragraph',
              text: 'Every detail was designed to keep behaviour natural and the comparison clean:',
            },
            {
              type: 'list',
              items: [
                [
                  { bold: 'Familiar but unbranded:' },
                  " Indian UPI conventions so people acted on habit, without borrowing any real app's identity.",
                ],
                [{ bold: 'Non-round amounts' }, ' (₹4,500, ₹1,499, ₹3,000) so the number itself raised no suspicion.'],
                [
                  { bold: 'An exit on every screen' },
                  ', as in real apps, so backing out at any point counted as protection.',
                ],
                [
                  { bold: 'One variable at a time:' },
                  ' each intervention changes a single screen and nothing else.',
                ],
              ],
            },
          ],
        },
        { type: 'visual', id: 'experiment-sitemap', heading: 'Experiment Sitemap', tone: 'dark' },
        {
          type: 'group',
          quote: 'The warning asks the user to think. The CTA changes what is easiest to do.',
          content: [
            {
              type: 'paragraph',
              text: 'The two interventions test two different theories of protection. The warning is informational: it relies on the user noticing, reading and reasoning under pressure. The CTA is architectural: it reorders the choice so that cancelling becomes the default and the path of least resistance, with no reading required.',
            },
          ],
        },
        { type: 'visual', id: 'user-journey', heading: 'User Journey Flow', tone: 'brand' },
      ],
    },
    {
      number: '04',
      title: 'What happened',
      shortLabel: 'What happened',
      blocks: [
        {
          type: 'group',
          quote: 'Changing the path nearly doubled safe choices. Adding words barely moved them.',
          content: [
            {
              type: 'table',
              label: 'Share of participants who cancelled the scam, by group',
              columns: ['', 'Cancelled the scam'],
              rows: [
                ['Control', '36.4%'],
                ['Warning', '47.2%'],
                ['CTA redesign', '68.5%'],
              ],
            },
            {
              type: 'paragraph',
              text: "The CTA lifted safe decisions by 32 percentage points over control. The warning added 11, a gain too small to be statistically reliable. The CTA also added no hesitation: median decision time was 4 seconds in every group. People weren't deliberating more. The safer option had simply become the easier one, which is exactly how choice architecture is meant to work, inside System 1 rather than against it.",
            },
          ],
        },
        {
          type: 'group',
          quote: 'Then the scam looked like a deal other people trusted.',
          content: [
            {
              type: 'table',
              label: 'Share of participants who cancelled the scam, by group and scam type',
              columns: ['', 'Authority', 'Urgency', 'Social proof'],
              rows: [
                ['Control', '40.9%', '31.8%', '36.4%'],
                ['Warning', '52.8%', '52.8%', '36.1%'],
                ['CTA', '77.8%', '75.0%', '52.8%'],
              ],
            },
            {
              type: 'paragraph',
              text: "Against authority and urgency scams, the CTA roughly doubled cancellations. Against social proof, the warning had no effect at all, and the CTA's advantage shrank to a 16-point gain that was no longer reliable. Same people, same designs. Only the bias changed.",
            },
          ],
        },
        { type: 'visual', id: 'results', heading: 'Results as Graphs', tone: 'dark' },
        {
          type: 'group',
          quote: 'Feeling safe and being safe turned out to be unrelated.',
          content: [
            {
              type: 'paragraph',
              text: 'How confident participants felt about spotting fraud had no relationship with whether they actually cancelled. This mirrors a false confidence effect seen in a Nigerian field study, where fraud training raised confidence without improving accuracy. For India\'s largely awareness-based prevention efforts, that is an uncomfortable signal.',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      title: 'The fix depends on the fraud',
      shortLabel: 'The fix',
      blocks: [
        {
          type: 'group',
          quote: "There's no universal fix. The real question is: against which fraud?",
          content: [
            {
              type: 'paragraph',
              text: 'The type of fraud, not the user\'s profile, decided whether a design protected anyone. That makes "does this design work?" an incomplete question.',
            },
            {
              type: 'paragraph',
              text: 'Social proof is the blind spot. The international playbook was built for impersonation and urgency, where pressure peaks at the moment of payment. Social proof scams work earlier: perceived legitimacy is manufactured by a crowd of apparent buyers long before the payment screen appears. A design at the payment gate cannot repair trust that was built at the marketing gate. In India, where e-commerce fraud is the largest category by victim reports and social selling runs through Instagram and WhatsApp, this gap matters.',
            },
            {
              type: 'paragraph',
              text: "This was an exploratory study, and every participant was a student: young, urban, digitally fluent and comfortable in English. That is the best case for these designs, so the results are best read as upper limits. If one design can't perform consistently for this group, it is unlikely to for users facing language, literacy or authority barriers on top of it.",
            },
          ],
        },
      ],
    },
    {
      number: '06',
      title: 'What this means for design',
      shortLabel: 'For design',
      blocks: [
        {
          type: 'group',
          quote: 'Design for vulnerability, not literacy.',
          content: [
            {
              type: 'list',
              items: [
                [
                  { bold: 'Friction as a feature.' },
                  " Under cognitive load, people don't read. Protection should reshape the choice, not explain it. Making cancellation the default did more than any message.",
                ],
                [
                  { bold: 'Intervene where the bias is triggered.' },
                  ' A payment-screen fix assumes persuasion happens at payment. For social commerce, protection has to move upstream, into the feed, the listing and the chat.',
                ],
                [
                  { bold: 'Measure behaviour, not confidence.' },
                  ' Awareness and self-reported confidence can rise while protective behaviour stays flat.',
                ],
                [
                  { bold: 'A protective nudge is still a nudge.' },
                  ' A red cancel button works on the same fast thinking fraudsters exploit. Designers should be able to defend why theirs is protection and not just a different push.',
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      number: '07',
      title: "What's next",
      shortLabel: "What's next",
      blocks: [
        {
          type: 'group',
          quote: "Next: the users this study couldn't reach.",
          content: [
            {
              type: 'list',
              items: [
                [
                  { bold: 'Test with the people most at risk:' },
                  ' older, rural and lower-literacy users, ideally on a live interface with a UPI partner.',
                ],
                [
                  { bold: 'Design for the social proof gap:' },
                  ' flags on suspicious sellers, counter-signals from real peers, or a short delay that lets manufactured urgency fade.',
                ],
                [
                  { bold: 'Go beyond translation:' },
                  ' test whether symbol-dominant design, using icons, colour and audio, protects users for whom any written warning, in any language, is a barrier.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
  closingLink: { label: 'Read the full dissertation →', href: LINKS.dissertation },
};
