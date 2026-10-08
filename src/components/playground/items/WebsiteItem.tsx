import type { ReactNode } from 'react';
import { LINKS } from '../../../data/links';
import websiteShape from '../../../assets/images/playground/website-shape.svg';
import { shapeMask } from './shapeMask';
import focus from './focus.module.css';
import grain from './grain.module.css';
import styles from './WebsiteItem.module.css';

/* re-wired website: its edges glow white on hover while it flips to a
   second face, holds, and flips back. */
export default function WebsiteItem({ autoHover }: { autoHover: boolean }) {
  const face = (label: ReactNode, className = '') => (
    <span className={`${styles.face} ${className}`}>
      <span className={`${styles.shape} ${grain.grain} ${grain.shaped}`} style={shapeMask(websiteShape)}>
        <span className={styles.glow} />
        {label}
      </span>
    </span>
  );

  return (
    <a
      className={`${styles.root} ${focus.focusable}`}
      href={LINKS.rewired}
      target="_blank"
      rel="noopener noreferrer"
      data-auto-hover={autoHover || undefined}
      aria-label="re-wired, web design project for an agency"
    >
      <span className={styles.flip} aria-hidden="true">
        {face(
          <span className={styles.frontLabel}>
            re-wired
            <br />
            website
          </span>,
        )}
        {face(
          <span className={styles.backLabel}>
            web design
            <br />
            project for an
            <br />
            agency
          </span>,
          styles.back,
        )}
      </span>
    </a>
  );
}
