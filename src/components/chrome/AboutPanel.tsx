import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import styles from './AboutPanel.module.css';
import aboutPhoto from '../../assets/images/chrome/about-photo.png';

/* Matches .panel's transform transition duration in AboutPanel.module.css —
   keeps this in sync any time that duration changes so the close animation
   finishes before the component unmounts. */
const EXIT_MS = 300;

const CV_FILE_ID = '1Z8gec-K0UeJ7NIbiG6K-sQZn48nakXn0';
const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/sehaznagpal';
const MAIL_SUBJECT = 'Re-directed from your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

/* Lowercase per the new Figma reference (was title-case "Sehaz Nagpal ·
   Product Designer" before the auto-layout correction). */
const TICKER_PHRASE = 'sehaz nagpal · product designer';
const TICKER_REPEATS = 10;
const TICKER_TEXT = `${Array.from({ length: TICKER_REPEATS }, () => TICKER_PHRASE).join(' · ')} · `;

const BULLETS = [
  'UI/UX design & prototyping',
  'Product thinking & scoping',
  'UX research',
  'Content strategy & writing',
  'Front-end coding assistance (vibe coding)',
];

export default function AboutPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

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
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rendered, onClose]);

  if (!rendered) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${visible ? styles.panelVisible : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="About Me"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
          X
        </button>

        <div className={styles.scroll}>
          <p className={`${styles.heading} ${styles.hpad}`}>
            <span className={styles.headingItalic}>About</span>
            <span className={styles.headingBold}>Me</span>
          </p>

          <div className={styles.tickerViewport} aria-hidden="true">
            <div className={styles.tickerTrack}>
              <span className={styles.tickerCopy}>{TICKER_TEXT}</span>
              <span className={styles.tickerCopy}>{TICKER_TEXT}</span>
            </div>
          </div>

          <div className={`${styles.body} ${styles.hpad}`}>
            <p className={styles.paragraph}>
              Good design, to me, is just good thinking made visible. I'm a product designer who
              cares about the reasoning behind a screen as much as the screen itself. Right now I'm
              looking for my first full-time role, though I'm open to good collaborations and work
              along the way too. Here's what I bring to that:
            </p>

            <ul className={styles.bullets}>
              {BULLETS.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <img className={styles.photo} src={aboutPhoto} alt="Sehaz Nagpal" />

          <div className={`${styles.contactRow} ${styles.hpad}`}>
            <p className={styles.contactLine}>For work, queries, feedback or just a hi!</p>
            <div className={styles.contactLinks}>
              <a
                className={styles.contactLink}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                (linkedin)
              </a>
              <a
                className={styles.contactLink}
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                (mail)
              </a>
              <a
                className={styles.contactLink}
                href={CV_URL}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                (download CV)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
