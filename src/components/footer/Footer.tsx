import { SITE_LINK_GROUPS, type LinkSection } from '../../data/siteLinks';
import SiteLink from '../chrome/SiteLink';
import PunchArea from './PunchArea';
import styles from './Footer.module.css';

interface FooterProps {
  /* On Home, (home) / (selected work) move sections instead of routing. */
  onSection?: (section: LinkSection) => void;
  /* Home passes whether the footer is the current section; elsewhere the
     punch area works that out itself. */
  shapeKeysActive?: boolean;
}

/* Shared by Home (section 3) and every case study page. Sticky-bottom so on
   the case study pages it sits underneath the page content and is revealed
   as that content scrolls off it (see CaseStudyPage.module.css). */
export default function Footer({ onSection, shapeKeysActive }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <p className={styles.name}>
          <span className={styles.nameItalic}>Sehaz</span>
          <span className={styles.nameBold}>Nagpal</span>
        </p>

        <nav className={styles.columns} aria-label="Footer">
          {SITE_LINK_GROUPS.map((group) => (
            <div key={group.label} className={styles.column}>
              <p className={styles.columnLabel}>{group.label}</p>
              {group.links.map((link) => (
                <SiteLink key={link.label} link={link} className={styles.link} onSection={onSection} />
              ))}
            </div>
          ))}
        </nav>
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
