import photoboothPhoto from '../../../assets/images/playground/photobooth-photo.webp';
import photoboothFlash from '../../../assets/images/playground/photobooth-flash.svg';
import focus from './focus.module.css';
import styles from './PhotoboothItem.module.css';

/* The camera: pops with a flash burst on hover, opens the photobooth on click. */
export default function PhotoboothItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      data-auto-hover={autoHover || undefined}
      aria-haspopup="dialog"
      aria-label="Photobooth, open camera"
      onClick={onOpen}
    >
      <img
        src={photoboothPhoto}
        alt=""
        width={405}
        height={275}
        loading="lazy"
        decoding="async"
        className={styles.photo}
      />
      <span className={styles.flashPulse} aria-hidden="true" />
      <img src={photoboothFlash} alt="" width={225} height={225} loading="lazy" className={styles.flashStar} />
      <span className={styles.flashLabel} aria-hidden="true">
        photobooth
      </span>
    </button>
  );
}
