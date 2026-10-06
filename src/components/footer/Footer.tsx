import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CV_URL, LINKEDIN_URL, MAILTO_URL } from '../../data/contact';
import PunchArea from './PunchArea';
import styles from './Footer.module.css';

interface FooterProps {
  /* On Home, in-page section moves instead of route links. */
  onHome?: () => void;
  onWork?: () => void;
  /* Home passes whether the footer is the current section; elsewhere the
     punch area works that out itself. */
  shapeKeysActive?: boolean;
}

function InternalLink({ to, onNavigate, children }: { to: string; onNavigate?: () => void; children: ReactNode }) {
  if (!onNavigate) {
    return (
      <Link className={styles.link} to={to}>
        {children}
      </Link>
    );
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Modified clicks (new tab etc.) behave like a normal link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate?.();
  }

  return (
    <a className={styles.link} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/* Shared by Home (section 3) and every case study page. Sticky-bottom so on
   the case study pages it sits underneath the page content and is revealed
   as that content scrolls off it (see CaseStudyPage.module.css). */
export default function Footer({ onHome, onWork, shapeKeysActive }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <p className={styles.name}>
          <span className={styles.nameItalic}>Sehaz</span>
          <span className={styles.nameBold}>Nagpal</span>
        </p>

        <div className={styles.columns}>
          <nav className={styles.column} aria-label="Footer">
            <p className={styles.columnLabel}>navigate</p>
            <InternalLink to="/" onNavigate={onHome}>
              (home)
            </InternalLink>
            <Link className={styles.link} to="/experiment-zone">
              (playground)
            </Link>
            <InternalLink to="/#work" onNavigate={onWork}>
              (selected work)
            </InternalLink>
          </nav>
          <div className={styles.column}>
            <p className={styles.columnLabel}>let&rsquo;s talk</p>
            <ExternalLink href={LINKEDIN_URL}>(linkedin)</ExternalLink>
            <a className={styles.link} href={MAILTO_URL}>
              (mail)
            </a>
            <ExternalLink href={CV_URL}>(download cv)</ExternalLink>
          </div>
        </div>
      </div>

      <div className={styles.punch}>
        <PunchArea keysActive={shapeKeysActive} />
      </div>

      <div className={styles.bottom}>
        <p className={styles.tagline}>*built with Figma, Claude &amp; coffee</p>
        <p className={styles.copyright}>&copy; 2026 Sehaz. All rights reserved.</p>
      </div>
    </footer>
  );
}
