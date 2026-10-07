import { REWIRED_URL } from '../../../data/playground';
import starCard from '../../../assets/images/playground/star-card.svg';
import focus from './focus.module.css';
import styles from './WebsiteItem.module.css';

/* re-wired website: flips to a second face on hover, holds, flips back. */
export default function WebsiteItem({ autoHover }: { autoHover: boolean }) {
  return (
    <a
      className={`${styles.root} ${focus.focusable}`}
      href={REWIRED_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-auto-hover={autoHover || undefined}
      aria-label="re-wired, web design project for an agency"
    >
      <span className={styles.flip} aria-hidden="true">
        <span className={styles.face}>
          <img src={starCard} alt="" width={302} height={302} loading="lazy" className={styles.star} />
          <span className={styles.frontLabel}>
            re-wired
            <br />
            website
          </span>
        </span>
        <span className={`${styles.face} ${styles.back}`}>
          <img src={starCard} alt="" width={302} height={302} loading="lazy" className={styles.star} />
          <span className={styles.backLabel}>
            web design
            <br />
            project for an
            <br />
            agency
          </span>
        </span>
      </span>
    </a>
  );
}
