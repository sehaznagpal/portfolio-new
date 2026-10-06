import { useRef, type RefObject } from 'react';
import { useReadingProgress } from '../../lib/useReadingProgress';
import styles from './ReadingProgress.module.css';

/* Thin brand-yellow bar showing how far the reader is through `targetRef`. */
export default function ReadingProgress({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null);
  useReadingProgress(targetRef, barRef);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
