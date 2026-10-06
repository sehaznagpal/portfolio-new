import { ABOUT_TICKER_ITEMS } from '../../data/about';
import styles from './AboutTicker.module.css';

const SEPARATOR = ' · ';
// Copies of the item list in each half of the track: enough that one half
// is always wider than the band, even on very wide screens.
const COPIES_PER_HALF = 2;
const HALF_TEXT = Array.from({ length: COPIES_PER_HALF }, () => ABOUT_TICKER_ITEMS.join(SEPARATOR)).join(SEPARATOR) + SEPARATOR;

/* Tilted green band of skills. The track holds two identical halves and
   slides left by exactly one half, so the loop is seamless. CSS only. */
export default function AboutTicker({ className }: { className?: string }) {
  return (
    <div className={`${styles.band} ${className ?? ''}`} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.half}>{HALF_TEXT}</span>
        <span className={styles.half}>{HALF_TEXT}</span>
      </div>
    </div>
  );
}
