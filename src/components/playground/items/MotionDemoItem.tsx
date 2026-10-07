import disc from '../../../assets/images/playground/disc.webp';
import focus from './focus.module.css';
import styles from './MotionDemoItem.module.css';

/* Motion Graphic Demo: a record slides out from behind on hover. */
export default function MotionDemoItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      data-auto-hover={autoHover || undefined}
      aria-haspopup="dialog"
      aria-label="Motion Graphic Demo, watch video"
      onClick={onOpen}
    >
      <img src={disc} alt="" width={585} height={571} loading="lazy" decoding="async" className={styles.disc} />
      <span className={styles.box} aria-hidden="true">
        Motion
        <br />
        Graphic
        <br />
        Demo
      </span>
    </button>
  );
}
