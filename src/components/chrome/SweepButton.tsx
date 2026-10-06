import type { ReactNode } from 'react';
import styles from './SweepButton.module.css';

/* Text button with the site's brand-colour fill-sweep hover. Text color and the
   resting chip color (--chip-bg) come from the caller's className, so the
   same button works on the light hero and the dark index. */
export default function SweepButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className={`${styles.button} ${className ?? ''}`} onClick={onClick}>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </button>
  );
}
