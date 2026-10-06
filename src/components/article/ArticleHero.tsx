import type { ReactNode } from 'react';
import ArticleButton from './ArticleButton';
import type { ArticleData } from './types';
import styles from './ArticleHero.module.css';

/* Article opener: title, subtitle, wide image, Role/Duration + tags, outbound
   links and the TL;DR. The image is supplied by the case study. */
export default function ArticleHero({
  article,
  image,
}: {
  article: Pick<ArticleData, 'title' | 'subtitle' | 'role' | 'duration' | 'tags' | 'links' | 'tldr'>;
  image: ReactNode;
}) {
  return (
    <header className={styles.hero}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.subtitle}>{article.subtitle}</p>
      </div>

      <div className={styles.image}>{image}</div>

      <div className={styles.summary}>
        <div className={styles.points}>
          <p className={styles.point}>
            <span className={styles.pointLabel}>Role:</span>
            <span className={styles.pointValue}>{article.role}</span>
          </p>
          <p className={styles.point}>
            <span className={styles.pointLabel}>Duration:</span>
            <span className={styles.pointValue}>{article.duration}</span>
          </p>
        </div>
        <ul className={styles.tags}>
          {article.tags.map((tag) => (
            <li key={tag} className={styles.pill}>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.links}>
        {article.links.map((link) => (
          <ArticleButton key={link.href} link={link} />
        ))}
      </div>

      <section className={styles.tldr} aria-label="TL;DR">
        {article.tldr.map((item, i) => (
          <p key={item.label} className={styles.tldrItem}>
            <span className={styles.tldrLabel}>
              {i === 0 && 'TL;DR '}
              {item.label}
            </span>{' '}
            {item.text}
          </p>
        ))}
      </section>
    </header>
  );
}
