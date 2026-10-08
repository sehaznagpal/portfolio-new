/* Every destination on the site: in-app routes and every external, mail,
   message and download link. Components and data files take their links
   from here only, never as literals. */

const CV_FILE_ID = '1Z8gec-K0UeJ7NIbiG6K-sQZn48nakXn0';
const WHATSAPP_NUMBER = '919971159640';
const WHATSAPP_MESSAGE = 'Hey, I was redirected from your portfolio';

export const LINKS = {
  // Routes
  home: '/',
  work: '/#work',
  playground: '/playground',
  // The old site's address for the playground, redirected to it.
  legacyPlayground: '/experiment-zone',
  drCuterus: '/case-study/dr-cuterus',
  fraud: '/case-study/designing-against-fraud',
  moolroop: '/case-study/moolroop',

  // Contact
  linkedin: 'https://www.linkedin.com/in/sehaznagpal',
  mail: 'mailto:sehaznagpal@gmail.com',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  // Served by Drive as an attachment (CV_Sehaz.pdf), so it downloads in place.
  cv: `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`,
  // Drive's own viewer, if the direct download ever stops working.
  cvView: `https://drive.google.com/file/d/${CV_FILE_ID}/view`,

  // Project links
  dissertation: 'https://drive.google.com/file/d/1T56QgmpiWvsrGIZ_S_NUWQY2uyhiHzYm/view?usp=share_link',
  experimentPrototype: 'https://bit.ly/dissertation-experiment-prototype',
  drCuterusSite: 'https://drcuterus.com',
  moolroopPrototype: 'https://bit.ly/moolroop-casestudy-prototype-sehaz',
  rewired: 'https://www.re-wired.tech',
  amora: 'https://amora-j1u8.vercel.app',
} as const;
