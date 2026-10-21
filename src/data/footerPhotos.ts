import me from '../assets/images/footer/me.webp';
import meTight from '../assets/images/footer/me-tight.webp';
import readingNook from '../assets/images/footer/reading-nook.webp';

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

/* Every footer photo: Home's, and one shared by all the case studies. */
export const FOOTER_PHOTOS = {
  home: {
    src: me,
    width: 843,
    height: 1124,
    alt: 'Sehaz Nagpal',
    position: '65% 10%',
    tight: { src: meTight, width: 843, height: 562, position: '55% 30%' },
  },
  caseStudy: {
    src: readingNook,
    width: 1200,
    height: 1600,
    alt: 'Sehaz Nagpal smiling on a bench in a reading nook',
    position: 'center 45%',
  },
} satisfies Record<string, FooterPhoto>;
