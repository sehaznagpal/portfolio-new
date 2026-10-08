import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ABOUT_EXPERIENCE, ABOUT_INTRO } from '../../data/about';
import { SITE_LINK_GROUPS, type LinkSection } from '../../data/siteLinks';
import SiteLink from '../chrome/SiteLink';
import AboutPolaroid from './AboutPolaroid';
import AboutTicker from './AboutTicker';
import styles from './AboutPanel.module.css';

/* Matches .panel's transform transition duration in AboutPanel.module.css,
   so the close animation finishes before the component unmounts. */
const EXIT_MS = 300;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Full-screen About sheet. Slides in from the left (up from the bottom on
   phones) and back out the same way on close. Focus moves in on open, is
   trapped while open, and goes back to whatever opened it. */
export default function AboutPanel({
  open,
  onClose,
  onSection,
}: {
  open: boolean;
  onClose: () => void;
  /* (home) / (selected work): close About, then move to that Home section. */
  onSection?: (section: LinkSection) => void;
}) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    if (rendered) {
      setVisible(false);
      const timeout = setTimeout(() => setRendered(false), EXIT_MS);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const panel = panelRef.current;
      const focusable = [...(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];
      if (!panel || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [rendered]);

  if (!rendered) return null;

  function handleSection(section: LinkSection) {
    onClose();
    onSection?.(section);
  }

  return createPortal(
    <div
      ref={panelRef}
      className={`${styles.panel} ${visible ? styles.panelVisible : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="About me"
    >
      <div className={styles.layout}>
        <div className={styles.closeRow}>
          <button ref={closeRef} type="button" className={styles.close} aria-label="Close about" onClick={onClose}>
            X
          </button>
        </div>

        <p className={styles.intro} lang="en">
          {ABOUT_INTRO}
        </p>

        <AboutTicker className={styles.ticker} />

        <div className={styles.polaroidSlot}>
          <AboutPolaroid />
        </div>

        <section className={styles.experience} aria-labelledby="about-experience">
          <h2 id="about-experience" className={styles.experienceHeading}>
            relevant experience
          </h2>
          <ul className={styles.experienceList}>
            {ABOUT_EXPERIENCE.map((row) => (
              <li key={`${row.role}-${row.company}`} className={styles.experienceRow}>
                <span>
                  {row.role} / {row.company}
                </span>
                <span className={styles.year}>{row.year}</span>
              </li>
            ))}
          </ul>
        </section>

        <nav className={styles.links} aria-label="About links">
          {SITE_LINK_GROUPS.map((group) => (
            <div key={group.label} className={styles.linkRow}>
              <span className={styles.linkLabel}>{group.label}</span>
              {group.links.map((link) => (
                <SiteLink
                  key={link.label}
                  link={link}
                  className={styles.link}
                  onSection={handleSection}
                  onNavigate={onClose}
                />
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>,
    document.body,
  );
}
