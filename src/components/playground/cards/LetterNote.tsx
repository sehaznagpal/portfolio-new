import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LETTER_TEXT } from '../../../data/playground';
import styles from './notes.module.css';

const VISIBLE_THRESHOLD = 0.35;
// The old typewriter added 2 characters every 14ms.
const MS_PER_CHAR = 7;

/* Arms once the letter is at least 35% on screen, on the canvas or in the grid. */
function useLetterReveal() {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return { ref, revealed };
}

/* The letter types itself out once revealed. The full text is laid out
   (invisibly) from the start so the card never changes size while typing. */
export default function LetterNote() {
  const { ref, revealed } = useLetterReveal();
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const shown = reducedMotion && revealed ? LETTER_TEXT.length : typed;

  useEffect(() => {
    if (!revealed || reducedMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const count = Math.min(LETTER_TEXT.length, Math.floor((now - start) / MS_PER_CHAR));
      setTyped(count);
      if (count < LETTER_TEXT.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [revealed, reducedMotion]);

  const typing = revealed && shown < LETTER_TEXT.length;

  return (
    <span ref={ref} className={`${styles.note} ${styles.letter}`}>
      <span className={styles.visuallyHidden}>{LETTER_TEXT}</span>
      <span className={styles.letterText} aria-hidden="true">
        {LETTER_TEXT.slice(0, shown)}
        {typing && <span className={styles.caret}>&nbsp;</span>}
        <span className={styles.untyped}>{LETTER_TEXT.slice(shown)}</span>
      </span>
    </span>
  );
}
