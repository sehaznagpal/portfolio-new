import ArticleButton from '../article/ArticleButton';
import type { ArticleLink } from '../article/types';
import { CASE_STUDIES, type CaseStudyId } from '../../data/caseStudies';
import styles from './CaseStudyEnd.module.css';

/* The end of a case study: its own outbound link (live site, prototype or
   dissertation) first, then the other case studies in Home index order. */
export default function CaseStudyEnd({ current, link }: { current: CaseStudyId; link: ArticleLink }) {
  const others = CASE_STUDIES.filter((study) => study.id !== current);

  return (
    <nav className={styles.end} aria-label="Keep reading">
      <ArticleButton link={link} className={styles.button} />
      {others.map((study) => (
        <ArticleButton
          key={study.id}
          link={{ label: `See ${study.shortTitle} →`, href: study.href }}
          className={styles.button}
        />
      ))}
    </nav>
  );
}
