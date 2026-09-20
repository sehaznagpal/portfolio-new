import posterDesktop from '../../assets/images/moolroop/hero-poster-desktop.svg';
import posterMobile from '../../assets/images/moolroop/hero-poster-mobile.svg';
import styles from './MoolroopPoster.module.css';

/* A single flat vector pattern (pottery silhouettes + grain, baked in by
   Figma) rather than a raster image — desktop and mobile use different
   crops/aspect ratios of the same pattern, swapped at the breakpoint. Both
   SVGs are authored with preserveAspectRatio="none" (they're designed to
   fill their frame exactly), so stretching to 100%/100% here matches the
   Figma intent rather than fighting it with object-fit. */
export default function MoolroopPoster() {
  return (
    <div className={styles.poster}>
      <img className={styles.mobileImg} src={posterMobile} alt="Repeating pattern of pottery and vase silhouettes" />
      <img className={styles.desktopImg} src={posterDesktop} alt="Repeating pattern of pottery and vase silhouettes" />
    </div>
  );
}
