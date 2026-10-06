import type { ReactNode } from 'react';
import styles from './Stage.module.css';

/* The hero section's background: fills its section at any aspect ratio, no
   scaled/letterboxed inner canvas. The grid fades in once the loader clears. */
export default function Stage({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={styles.outer}>
      <div className={`${styles.grid} ${dark ? '' : styles.gridVisible}`} />
      <div className={styles.stage}>{children}</div>
    </div>
  );
}
