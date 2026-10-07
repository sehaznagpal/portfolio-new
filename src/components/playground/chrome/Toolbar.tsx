import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, Pencil, Star } from 'lucide-react';
import { CV_URL, GMAIL_COMPOSE_URL } from '../../../data/contact';
import { PLAYGROUND_PATH } from '../../../data/playground';
import styles from './Toolbar.module.css';

type ToolKey = 'home' | 'playground' | 'contact' | 'cv';

const ICON = { size: 18, strokeWidth: 1.75 };

/* Fixed bottom dock. The hovered icon lifts into a bubble above the bar
   with its label. */
export default function Toolbar() {
  const [hovered, setHovered] = useState<ToolKey | null>(null);

  function slot(key: ToolKey, label: string, link: ReactNode) {
    const active = hovered === key;
    return (
      <div className={styles.slot} onMouseEnter={() => setHovered(key)} onMouseLeave={() => setHovered(null)}>
        <span className={`${styles.icon} ${active ? styles.iconActive : ''}`}>{link}</span>
        {active && <span className={styles.bubble} />}
        <span className={`${styles.dot} ${active ? styles.dotActive : ''}`} />
        {active && <span className={styles.label}>{label}</span>}
      </div>
    );
  }

  return (
    <nav className={styles.toolbar} aria-label="Playground">
      {slot(
        'home',
        'Home',
        <Link aria-label="Home" to="/">
          <Star {...ICON} />
        </Link>,
      )}
      {slot(
        'playground',
        'Experiment Zone',
        <Link aria-label="Experiment Zone" to={PLAYGROUND_PATH}>
          <Pencil {...ICON} />
        </Link>,
      )}
      {slot(
        'contact',
        'Contact',
        <a aria-label="Contact" href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer">
          <Mail {...ICON} />
        </a>,
      )}
      {slot(
        'cv',
        'Download my CV',
        <a aria-label="Download my CV" href={CV_URL} download target="_blank" rel="noopener noreferrer">
          <Download {...ICON} />
        </a>,
      )}
    </nav>
  );
}
