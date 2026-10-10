import { Link } from 'react-router-dom';
import { LINKS } from '../../data/links';
import styles from './BackLink.module.css';

/* "← Back" pill from a case study to the Home index section. */
export default function BackLink({ className }: { className?: string }) {
  return (
    <Link className={`${styles.back} ${className ?? ''}`} to={LINKS.work}>
      ← Back
    </Link>
  );
}
