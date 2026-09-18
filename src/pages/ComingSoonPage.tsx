import { Link } from 'react-router-dom';
import styles from './ComingSoonPage.module.css';

/* Placeholder destination for routes this section links to (individual case
   study pages, the experiment zone) that haven't been built yet in this
   rebuild — keeps navigation from the case studies index honest (a real
   route change, not a dead link) without getting ahead of scope. */
export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className={styles.page}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>This page hasn&rsquo;t been rebuilt here yet.</p>
      <Link className={styles.link} to="/">
        &larr; back home
      </Link>
    </div>
  );
}
