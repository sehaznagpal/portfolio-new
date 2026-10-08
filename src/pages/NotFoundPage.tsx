import ArticleButton from '../components/article/ArticleButton';
import { LINKS } from '../data/links';
import styles from './NotFoundPage.module.css';

/* Any address the site doesn't have: says so and links home. */
export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>[COPY: page not found]</h1>
      <ArticleButton link={{ label: '[COPY: back home] →', href: LINKS.home }} />
    </main>
  );
}
