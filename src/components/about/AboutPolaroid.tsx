import type { CSSProperties, ReactNode } from 'react';
import photo from '../../assets/images/about/polaroid.webp';
import paperclip from '../../assets/images/about/paperclip.webp';
import { ABOUT_CAPTION } from '../../data/about';
import styles from './AboutPolaroid.module.css';

const PHOTO_WIDTH = 425;
const PHOTO_HEIGHT = 466;
const CLIP_WIDTH = 83;
const CLIP_HEIGHT = 178;

// Figma 1312:200 rotations.
const POLAROID_TILT = -5.16;
const GLASS_TILT = -8.15;

/* A box in the polaroid's own coordinates (Figma px, scaled by --p). x/y/w/h
   are the un-rotated bounding box from Figma; `inner` is the real size of a
   rotated element, centred in that box. */
function Part({
  x,
  y,
  w,
  h,
  inner,
  rotate = 0,
  className,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  inner?: { w: number; h: number };
  rotate?: number;
  className?: string;
  children?: ReactNode;
}) {
  const vars = {
    '--x': x,
    '--y': y,
    '--w': w,
    '--h': h,
    '--iw': inner?.w,
    '--ih': inner?.h,
    '--r': `${rotate}deg`,
  } as CSSProperties;
  return (
    <div className={`${styles.part} ${className ?? ''}`} style={vars}>
      <div className={`${styles.rotated} ${inner ? styles.sized : ''}`}>{children}</div>
    </div>
  );
}

/* Photo in a cream polaroid frame with a paper clip and caption. On desktop
   it also carries the "a little about me" heading on a frosted glass layer;
   those parts are hidden below 900px. Positions are the Figma desktop frame's
   (1312:200), relative to the polaroid group's top-left corner. */
export default function AboutPolaroid() {
  return (
    <div className={styles.polaroid}>
      <Part x={12.12} y={32.5} w={519.78} h={586.6} inner={{ w: 472.57, h: 546.34 }} rotate={POLAROID_TILT}>
        <div className={styles.frame}>
          <div className={styles.window}>
            <img src={photo} alt="Sehaz Nagpal" width={PHOTO_WIDTH} height={PHOTO_HEIGHT} decoding="async" />
          </div>
        </div>
      </Part>

      <Part x={94.2} y={535} w={403.3} h={58.2} rotate={POLAROID_TILT}>
        <p className={styles.caption}>{ABOUT_CAPTION}</p>
      </Part>

      <Part
        x={0}
        y={28}
        w={535.3}
        h={538.4}
        inner={{ w: 472.57, h: 476.19 }}
        rotate={GLASS_TILT}
        className={styles.desktopOnly}
      >
        <div className={styles.glass} />
      </Part>

      <Part x={397.1} y={0} w={CLIP_WIDTH} h={CLIP_HEIGHT}>
        <img className={styles.clip} src={paperclip} alt="" width={CLIP_WIDTH} height={CLIP_HEIGHT} decoding="async" />
      </Part>

      <Part
        x={288.2}
        y={464}
        w={103.4}
        h={51.65}
        inner={{ w: 100, h: 42.83 }}
        rotate={POLAROID_TILT}
        className={styles.desktopOnly}
      >
        <div className={styles.highlight} />
      </Part>

      <Part x={59.2} y={108} w={148.9} h={128} rotate={POLAROID_TILT} className={styles.desktopOnly}>
        <p className={`${styles.heading} ${styles.headingTop}`}>
          <span>a</span>
          <span>little</span>
        </p>
      </Part>

      <Part x={284.2} y={403} w={195.7} h={110.5} rotate={POLAROID_TILT} className={styles.desktopOnly}>
        <p className={`${styles.heading} ${styles.headingBottom}`}>
          <span>about</span>
          <span className={styles.headingItalic}>me</span>
        </p>
      </Part>
    </div>
  );
}
