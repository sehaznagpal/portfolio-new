import type { ReactNode } from 'react';
import Reveal from './Reveal';
import styles from './NumberedStep.module.css';

/* A numbered process step: the large accent number to the left on desktop
   (above on mobile), the heading and text beside it, and any extra content
   (mini cards, a visual, a note) underneath at the full column width. */
export default function NumberedStep({
  number,
  title,
  text,
  children,
}: {
  number: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <div className={styles.step}>
      <Reveal>
        <p className={styles.number} aria-hidden="true">
          {number}
        </p>
      </Reveal>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
      {children && <div className={styles.extra}>{children}</div>}
    </div>
  );
}
