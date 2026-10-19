import { LETTER_TEXT } from '../../../data/playground';
import styles from './notes.module.css';

/* The letter as a plain card for the grid (the canvas has the typed-out one). */
export default function LetterNote() {
  return (
    <span className={`${styles.note} ${styles.letter}`}>
      <span className={styles.letterText}>{LETTER_TEXT}</span>
    </span>
  );
}
