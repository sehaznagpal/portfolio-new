import styles from './Footer.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sehaznagpal';
const MAIL_SUBJECT = 'Re-directed from your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

/* Reveal mechanism ported exactly from the pre-rebuild codebase's case-study
   Footer: no scroll observer/JS at all, just position: sticky; bottom: 0 on
   this element sitting *underneath* the page content in normal flow (see
   CaseStudiesIndexPage.module.css's z-index ordering) — scrolling the
   content up and off it is what "reveals" the footer. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.name}>
          <span className={styles.nameItalic}>Sehaz</span>
          <span className={styles.nameBold}>Nagpal</span>
        </p>

        <div className={styles.buttons}>
          <div className={styles.linkGroup}>
            <span className={styles.linkGroupLabel}>navigate</span>
            <a className={styles.link} href="/">
              (home)
            </a>
            <a className={styles.link} href="/experiment-zone">
              (playground)
            </a>
            <a className={styles.link} href="#featured-work">
              (selected work)
            </a>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.linkGroupLabel}>let&rsquo;s talk</span>
            <a
              className={styles.link}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              (linkedin)
            </a>
            <a
              className={styles.link}
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              (mail)
            </a>
          </div>
        </div>
      </div>

      <p className={styles.copyright}>&copy; 2026 Sehaz. All rights reserved.</p>
    </footer>
  );
}
