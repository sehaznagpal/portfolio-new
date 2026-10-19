import { LINKS } from '../../../data/links';
import linkedinIcon from '../../../assets/images/playground/linkedin-icon.svg';
import mailIcon from '../../../assets/images/playground/mail-icon.svg';
import phoneIcon from '../../../assets/images/playground/phone-icon.svg';
import styles from './notes.module.css';

// `newTab` for web pages; mail opens the mail client in place.
const CONTACT_LINKS = [
  { href: LINKS.linkedin, label: 'LinkedIn', icon: linkedinIcon, newTab: true },
  { href: LINKS.mail, label: 'Email', icon: mailIcon, newTab: false },
  { href: LINKS.whatsapp, label: 'WhatsApp', icon: phoneIcon, newTab: true },
];

export default function ContactNote() {
  return (
    <span className={`${styles.note} ${styles.contact}`}>
      <span className={styles.contactHeading}>Say hello!</span>
      <span className={styles.contactRow}>
        <span className={styles.contactName}>Sehaz Nagpal</span>
        <span className={styles.contactLinks}>
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              className={styles.contactLink}
              href={link.href}
              {...(link.newTab && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={link.label}
            >
              <img src={link.icon} alt="" width={31} height={31} draggable={false} />
            </a>
          ))}
        </span>
      </span>
    </span>
  );
}
