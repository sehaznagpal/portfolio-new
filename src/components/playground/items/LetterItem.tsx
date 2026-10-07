import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LETTER_TEXT } from '../../../data/playground';
import { useSubscribePan } from '../canvasContext';
import styles from './LetterItem.module.css';

const VISIBLE_THRESHOLD = 0.35;
// The old typewriter added 2 characters every 14ms.
const MS_PER_CHAR = 7;

/* Arms once the letter is at least 35% on screen AND the visitor pans toward
   it (content moving up or left, i.e. heading to the bottom-right corner).
   Visibility alone isn't enough: the canvas can open with it already in view. */
function useLetterReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const subscribePan = useSubscribePan();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    let visible = false;
    let pannedToward = false;

    const check = () => {
      if (visible && pannedToward) setRevealed(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        check();
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(el);

    // Only the dominant axis counts, so a sideways swipe's cross-axis noise can't arm it.
    const unsubscribe = subscribePan((dx, dy) => {
      const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (dominant < 0) {
        pannedToward = true;
        check();
      }
    });

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [revealed, subscribePan]);

  return { ref, revealed };
}

/* The letter types itself out once revealed. The full text is laid out
   (invisibly) from the start so the card never changes size while typing. */
export default function LetterItem() {
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
    <div ref={ref} className={styles.letter}>
      <p className={styles.visuallyHidden}>{LETTER_TEXT}</p>
      <p className={styles.text} aria-hidden="true">
        {LETTER_TEXT.slice(0, shown)}
        {typing && <span className={styles.caret}>&nbsp;</span>}
        <span className={styles.untyped}>{LETTER_TEXT.slice(shown)}</span>
      </p>
    </div>
  );
}
