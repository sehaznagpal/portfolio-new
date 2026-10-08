import bezel from '../../../assets/images/moolroop/phone-bezel.png';
import styles from './PhoneScreen.module.css';

// Prototype screens are exported at 430x932.
const SCREEN_WIDTH = 430;
const SCREEN_HEIGHT = 932;

/* A MoolRoop app screen in the same phone bezel as the home index card
   (MoolroopVisual), shown whole: the bezel's screen window matches the
   export's aspect ratio, so nothing is cropped. Sized by its container's
   width. */
export default function PhoneScreen({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <img src={src} alt={alt} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} loading="lazy" decoding="async" />
      </div>
      <img className={styles.bezel} src={bezel} alt="" aria-hidden="true" />
    </div>
  );
}
