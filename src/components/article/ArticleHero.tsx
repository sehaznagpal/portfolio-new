import type { ReactNode } from 'react';
import ArticleButton from './ArticleButton';
import type { ArticleLink } from './types';
import styles from './ArticleHero.module.css';

interface HeroData {
  context?: string;
  title: string;
  subtitle: string;
  tags: string[];
  links: ArticleLink[];
}

/* Case study opener: a context line, title, subtitle, wide image (supplied
   by the case study), tags and outbound links, spaced by the story spacing
   tokens: context to title 2xs, title to subtitle sm, subtitle to image and
   image to tags md, tags to buttons sm. */
export default function ArticleHero({ article, image }: { article: HeroData; image: ReactNode }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heading}>
        <div className={styles.titleGroup}>
          {article.context && <p className={styles.context}>{article.context}</p>}
          <h1 className={styles.title}>{article.title}</h1>
        </div>
        <p className={styles.subtitle}>{article.subtitle}</p>
      </div>

      <div className={styles.image}>{image}</div>

      <div className={styles.meta}>
        <ul className={styles.tags}>
          {article.tags.map((tag) => (
            <li key={tag} className={styles.pill}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={styles.links}>
          {article.links.map((link) => (
            <ArticleButton key={link.href} link={link} />
          ))}
        </div>
      </div>
    </header>
  );
}
