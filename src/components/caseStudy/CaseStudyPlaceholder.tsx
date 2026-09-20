import { Link } from 'react-router-dom';
import styles from './CaseStudyPlaceholder.module.css';

/* Stands in for the rest of the case study (process, outcomes, etc.), which
   isn't built yet — only the hero above this is real content for now. */
export default function CaseStudyPlaceholder() {
  return (
    <div className={styles.placeholder}>
      <p className={styles.text}>The rest of this case study is still being written up.</p>
      <Link className={styles.link} to="/#featured-work">
        &larr; back to featured work
      </Link>
    </div>
  );
}
