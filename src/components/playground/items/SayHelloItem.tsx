import { GMAIL_COMPOSE_URL, LINKEDIN_URL, WHATSAPP_URL } from '../../../data/contact';
import linkedinIcon from '../../../assets/images/playground/linkedin-icon.svg';
import mailIcon from '../../../assets/images/playground/mail-icon.svg';
import phoneIcon from '../../../assets/images/playground/phone-icon.svg';
import styles from './SayHelloItem.module.css';

const CONTACT_LINKS = [
  { href: LINKEDIN_URL, label: 'LinkedIn', icon: linkedinIcon, className: styles.linkedin },
  { href: GMAIL_COMPOSE_URL, label: 'Email', icon: mailIcon, className: styles.mail },
  { href: WHATSAPP_URL, label: 'WhatsApp', icon: phoneIcon, className: styles.phone },
];

/* Contact card: a "looking forward" tag peeks out from behind on hover. */
export default function SayHelloItem({ autoHover }: { autoHover: boolean }) {
  return (
    <div className={styles.root} data-auto-hover={autoHover || undefined}>
      <p className={styles.tag}>
        Looking Forward to
        <br />
        connect with you!
      </p>
      <div className={styles.card}>
        <p className={styles.heading}>Say hello!</p>
        <p className={styles.name}>Sehaz Nagpal</p>
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            className={`${styles.icon} ${link.className}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            <img src={link.icon} alt="" width={30} height={30} />
          </a>
        ))}
      </div>
    </div>
  );
}
