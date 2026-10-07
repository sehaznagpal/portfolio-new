import sipBadge from '../../../assets/images/playground/sip-badge-hover.svg';
import sipCloud from '../../../assets/images/playground/sip-bg-hover.svg';
import focus from './focus.module.css';
import styles from './SipStudioItem.module.css';

/* SiP Studio badge: slides aside on hover to reveal "a branding project". */
export default function SipStudioItem({ autoHover, onOpen }: { autoHover: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className={`${styles.root} ${focus.focusable}`}
      data-auto-hover={autoHover || undefined}
      aria-haspopup="dialog"
      aria-label="SiP Studio, a branding project"
      onClick={onOpen}
    >
      <img src={sipCloud} alt="" width={275} height={268} loading="lazy" className={styles.cloud} />
      <span className={styles.label} aria-hidden="true">
        a branding
        <br />
        project
      </span>
      <img src={sipBadge} alt="" width={275} height={268} loading="lazy" className={styles.badge} />
    </button>
  );
}
