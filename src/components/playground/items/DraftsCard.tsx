import { DRAFTS_BODY, DRAFTS_HIGHLIGHT } from '../../../data/playground';
import styles from './DraftsCard.module.css';

const CORNERS = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;

/* The "More from my Drafts" card the canvas opens centred on. */
export default function DraftsCard() {
  return (
    <div className={styles.card}>
      {CORNERS.map((corner) => (
        <span key={corner} className={`${styles.corner} ${styles[corner]}`} aria-hidden="true" />
      ))}
      <h1 className={styles.heading}>
        <span className={styles.headingItalic}>More from my</span>{' '}
        <span className={styles.headingBold}>Drafts</span>
      </h1>
      <div className={styles.body}>
        <p>{DRAFTS_BODY}</p>
        <p>
          <span className={styles.highlight}>{DRAFTS_HIGHLIGHT}</span>
        </p>
      </div>
    </div>
  );
}
