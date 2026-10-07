import camera from '../../../assets/images/playground/camera.webp';
import flashStar from '../../../assets/images/playground/flash-star.svg';
import { shapeMask } from './shapeMask';
import focus from './focus.module.css';
import grain from './grain.module.css';
import styles from './PhotoboothItem.module.css';

/* The camera: a gradient flash star with "photobooth" pops over it on
   hover, and a click opens the photobooth. */
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
      <span className={styles.camera}>
        <img src={camera} alt="" width={410} height={284} loading="lazy" decoding="async" />
      </span>
      <span className={styles.flash} aria-hidden="true">
        <span className={styles.star}>
          <span className={`${styles.starShape} ${grain.grain} ${grain.shaped}`} style={shapeMask(flashStar)}>
            <img src={flashStar} alt="" width={263} height={184} loading="lazy" />
          </span>
        </span>
        <span className={styles.label}>photobooth</span>
      </span>
    </button>
  );
}
