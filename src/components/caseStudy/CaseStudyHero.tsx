import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './CaseStudyHero.module.css';

/* Shared hero shell for every individual case-study page — nav, the
   case-study's own poster visual, title, and the Role/Duration + tag
   summary row. Only the poster content (children) and the four text props
   differ per case study; everything else (layout, type, spacing) is one
   Figma spec shared by all three. */
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
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
          <span className={styles.brandItalic}>Sehaz</span> Nagpal
        </Link>
        <a className={styles.playground} href="/experiment-zone">
          <span className={styles.playgroundFill} aria-hidden="true" />
          <span className={styles.playgroundLabel}>
            playground
            <ArrowUpRight size={14} strokeWidth={2} />
          </span>
        </a>
      </nav>

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
