import { LINKS } from '../../../data/links';
import linkedinIcon from '../../../assets/images/playground/linkedin-icon.svg';
import mailIcon from '../../../assets/images/playground/mail-icon.svg';
import phoneIcon from '../../../assets/images/playground/phone-icon.svg';
import grain from './grain.module.css';
import styles from './SayHelloItem.module.css';

// `newTab` for web pages; mail opens the mail client in place.
const CONTACT_LINKS = [
  { href: LINKS.linkedin, label: 'LinkedIn', icon: linkedinIcon, className: styles.linkedin, newTab: true },
  { href: LINKS.mail, label: 'Email', icon: mailIcon, className: styles.mail, newTab: false },
  { href: LINKS.whatsapp, label: 'WhatsApp', icon: phoneIcon, className: styles.phone, newTab: true },
];

/* Contact card: a "looking forward" tag rises from behind it on hover. */
export default function SayHelloItem({ autoHover }: { autoHover: boolean }) {
  return (
    <div className={styles.root} data-auto-hover={autoHover || undefined}>
      <p className={styles.tag}>
        Looking forward to
        <br />
        connecting with you!
      </p>
      <div className={`${styles.card} ${grain.grain}`}>
        <p className={styles.heading}>Say hello!</p>
        <p className={styles.name}>Sehaz Nagpal</p>
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            className={`${styles.icon} ${link.className}`}
            href={link.href}
            {...(link.newTab && { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={link.label}
          >
            <img src={link.icon} alt="" width={31} height={31} />
          </a>
        ))}
      </div>
    </div>
  );
}
