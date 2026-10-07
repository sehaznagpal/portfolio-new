import sipFlower from '../../../assets/images/playground/sip-flower.svg';
import sipShape from '../../../assets/images/playground/sip-shape.svg';
import { shapeMask } from './shapeMask';
import focus from './focus.module.css';
import grain from './grain.module.css';
import styles from './SipStudioItem.module.css';

/* SiP Studio badge: on hover it slides down-right while a white scallop
   with "a branding project" slides out up-left from behind it. */
export default function SipStudioItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  const mask = shapeMask(sipShape);
  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      data-auto-hover={autoHover || undefined}
      aria-haspopup="dialog"
      aria-label="SiP Studio, a branding project"
      onClick={onOpen}
    >
      <span className={`${styles.cloud} ${grain.grain} ${grain.shaped}`} style={mask} aria-hidden="true">
        <span className={styles.label}>
          a branding
          <br />
          project
        </span>
      </span>
      <span className={`${styles.badge} ${grain.grain} ${grain.shaped}`} style={mask}>
        <img src={sipFlower} alt="" width={329} height={321} loading="lazy" />
      </span>
    </button>
  );
}
