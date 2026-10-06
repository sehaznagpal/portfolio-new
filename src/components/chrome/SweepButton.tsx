import type { ReactNode } from 'react';
import styles from './SweepButton.module.css';

/* Text button with the site's brand-colour fill-sweep hover. Text color and the
   resting chip color (--chip-bg) come from the caller's className, so the
   same button works on the light hero and the dark index. With `href` it
   renders as a link that opens in a new tab. */
export default function SweepButton({
  children,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const classes = `${styles.button} ${className ?? ''}`;
  const content = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
