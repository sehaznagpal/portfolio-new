import { LETTER_TEXT } from '../../../data/playground';
import paper from '../paper/notebookPaper.module.css';
import styles from './notes.module.css';

/* The letter as a plain card for the grid (the canvas has the typed-out one). */
export default function LetterNote() {
  return (
    <span className={`${styles.note} ${styles.letter} ${paper.paper} ${paper.white}`}>
      <span className={`${styles.letterText} ${paper.writing}`}>{LETTER_TEXT}</span>
    </span>
  );
}
