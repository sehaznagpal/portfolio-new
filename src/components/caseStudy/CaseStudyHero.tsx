import type { ReactNode } from 'react';
import styles from './CaseStudyHero.module.css';

/* Shared hero shell for the Dr Cuterus and Moolroop case-study pages (the
   site nav lives in CaseStudyLayout) — the case-study's own poster visual,
   title, and the Role/Duration + tag summary row. Only the poster content
   (children) and the four text props differ per case study. */
export default function CaseStudyHero({
  title,
  role,
  duration,
  tags,
  children,
}: {
  title: string;
  role: string;
  duration: string;
  tags: string[];
  children: ReactNode;
}) {
  return (
    <header className={styles.hero}>
      {/* Source order matches the mobile Figma frames (title before the
          poster) — all three case studies agree on this. Desktop swaps the
          two via CSS `order` (see .module.css) rather than duplicating the
          markup, since nothing else about them differs by breakpoint. */}
      <p className={styles.title}>{title}</p>

      <div className={styles.poster}>{children}</div>

      <div className={styles.summary}>
        <div className={styles.points}>
          <p className={styles.point}>
            <span className={styles.pointLabel}>Role:</span>
            <span className={styles.pointValue}>{role}</span>
          </p>
          <p className={styles.point}>
            <span className={styles.pointLabel}>Duration:</span>
            <span className={styles.pointValue}>{duration}</span>
          </p>
        </div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.pill}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
