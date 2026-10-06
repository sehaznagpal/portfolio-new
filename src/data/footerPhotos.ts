import type { FooterPhoto } from '../components/footer/PunchArea';
import sunflower from '../assets/images/footer/sunflower.webp';
import table from '../assets/images/footer/table.webp';
import lawn from '../assets/images/footer/lawn.webp';

/* Each case study's footer photo (Home keeps its own). */
export const FOOTER_PHOTOS = {
  drCuterus: {
    src: sunflower,
    width: 960,
    height: 1280,
    alt: 'Sehaz Nagpal smiling, holding a sunflower bouquet',
    align: 'center',
  },
  fraud: {
    src: table,
    width: 912,
    height: 2000,
    alt: 'Sehaz Nagpal smiling at a café table',
    align: 'center',
  },
  moolroop: {
    src: lawn,
    width: 960,
    height: 1280,
    alt: 'Sehaz Nagpal on a campus lawn under a large tree',
    align: 'bottom',
  },
} satisfies Record<string, FooterPhoto>;
