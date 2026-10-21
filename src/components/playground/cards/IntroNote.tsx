import { DRAFTS_BODY, DRAFTS_HIGHLIGHT } from '../../../data/playground';
import styles from './notes.module.css';

/* The canvas opens centred on this. */
export default function IntroNote() {
  return (
    <span className={`${styles.note} ${styles.intro}`}>
      <span className={styles.introHeading}>
        <span className={styles.italic}>More from my</span> <span className={styles.bold}>Drafts</span>
      </span>
      <span className={styles.introBody}>{DRAFTS_BODY}</span>
      <span className={styles.introHighlightLine}>
        <span className={styles.introHighlight}>{DRAFTS_HIGHLIGHT}</span>
      </span>
    </span>
  );
}
