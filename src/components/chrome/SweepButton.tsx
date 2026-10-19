import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './SweepButton.module.css';

/* Text button with the site's brand-colour fill-sweep hover. Text color and the
   resting chip color (--chip-bg) come from the caller's className, so the
   same button works on the light hero and the dark index. With `href` it
   renders as a link that opens in a new tab; with `to`, an in-app link. */
export default function SweepButton({
  children,
  className,
  style,
  onClick,
  href,
  to,
}: {
  children: ReactNode;
  className?: string;
  /* For custom properties a caller sets per instance (e.g. --chip-bg). */
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
  to?: string;
}) {
  const classes = `${styles.button} ${className ?? ''}`;
  const content = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link className={classes} style={style} to={to}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} style={style} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} style={style} onClick={onClick}>
      {content}
    </button>
  );
}
