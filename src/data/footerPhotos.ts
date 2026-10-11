import me from '../assets/images/footer/me.webp';
import meTight from '../assets/images/footer/me-tight.webp';
import brewhouse from '../assets/images/footer/brewhouse.webp';
import christmasCafe from '../assets/images/footer/christmas-cafe.webp';
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
  drCuterus: {
    src: christmasCafe,
    width: 960,
    height: 1280,
    alt: 'Sehaz Nagpal smiling in a café decorated for Christmas',
    position: 'center 60%',
  },
  fraud: {
    src: brewhouse,
    width: 986,
    height: 1310,
    alt: 'Sehaz Nagpal smiling under a yellow Teavaro sign',
    position: 'center 50%',
  },
  moolroop: {
    src: lawn,
    width: 960,
    height: 1280,
    alt: 'Sehaz Nagpal on a campus lawn under a large tree',
    position: 'center bottom',
  },
} satisfies Record<string, FooterPhoto>;
