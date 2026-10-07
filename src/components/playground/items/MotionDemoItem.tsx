import vinyl from '../../../assets/images/playground/vinyl.webp';
import { shapeMask } from './shapeMask';
import focus from './focus.module.css';
import grain from './grain.module.css';
import styles from './MotionDemoItem.module.css';

/* Motion Graphic Demo: a vinyl rolls out from behind on hover. */
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
      <span className={`${styles.vinyl} ${grain.grain} ${grain.shaped}`} style={shapeMask(vinyl)}>
        <img src={vinyl} alt="" width={589} height={572} loading="lazy" decoding="async" />
      </span>
      <span className={`${styles.box} ${grain.grain}`} aria-hidden="true">
        Motion
        <br />
        Graphic
        <br />
        Demo
      </span>
    </button>
  );
}
