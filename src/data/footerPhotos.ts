import me from '../assets/images/footer/me.webp';
import meTight from '../assets/images/footer/me-tight.webp';
import sunflower from '../assets/images/footer/sunflower.webp';
import table from '../assets/images/footer/table.webp';
import lawn from '../assets/images/footer/lawn.webp';

export interface FooterPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
  /* object-position. The top of the photo sits under the punch strip, so
     each is set to keep the face fully visible below the strip, with a
     little headroom, at every desktop size (checked 1280x600 to 2560x1440);
     backgrounds are cropped first. */
  position: string;
  /* Optional art-directed crop for short or very wide desktop screens
     (PHOTO_TIGHT_MEDIA in PunchArea), with its own framing. */
  tight?: { src: string; width: number; height: number; position: string };
}

/* Every footer photo: Home's, and one per case study. */
export const FOOTER_PHOTOS = {
  home: {
    src: me,
    width: 843,
    height: 1124,
    alt: 'Sehaz Nagpal',
    position: '65% 10%',
    tight: { src: meTight, width: 843, height: 562, position: '55% 30%' },
  },
  /* The face sits very high in this photo, so the file carries a softened,
     mirrored band of the wall above it (top 320px). That band only ever
     shows through holes punched in the strip, never at rest. */
  drCuterus: {
    src: sunflower,
    width: 960,
    height: 1600,
    alt: 'Sehaz Nagpal smiling, holding a sunflower bouquet',
    position: 'center 19%',
  },
  fraud: {
    src: table,
    width: 912,
    height: 2000,
    alt: 'Sehaz Nagpal smiling at a café table',
    position: 'center 28%',
  },
  moolroop: {
    src: lawn,
    width: 960,
    height: 1280,
    alt: 'Sehaz Nagpal on a campus lawn under a large tree',
    position: 'center bottom',
  },
} satisfies Record<string, FooterPhoto>;
