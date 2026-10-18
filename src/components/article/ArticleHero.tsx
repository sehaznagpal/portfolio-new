import type { ReactNode } from 'react';
import ArticleButton from './ArticleButton';
import type { ArticleData } from './types';
import styles from './ArticleHero.module.css';

type HeroData = Pick<ArticleData, 'title' | 'subtitle' | 'tags' | 'links'> &
  Partial<Pick<ArticleData, 'role' | 'duration' | 'tldr'>> & {
    context?: string;
  };

/* Article opener: an optional context line, title, subtitle, wide image,
   Role/Duration (when given) + tags, outbound links and the TL;DR (when
   given; story case studies have their own TL;DR section). The image is
   supplied by the case study. `spacing="story"` applies the story case
   studies' spacing system. */
export default function ArticleHero({
  article,
  image,
  spacing,
}: {
  article: HeroData;
  image: ReactNode;
  spacing?: 'story';
}) {
  const title = <h1 className={styles.title}>{article.title}</h1>;

  return (
    <header className={styles.hero} data-spacing={spacing}>
      <div className={styles.heading}>
        {article.context ? (
          <div className={styles.titleGroup}>
            <p className={styles.context}>{article.context}</p>
            {title}
          </div>
        ) : (
          title
        )}
        <p className={styles.subtitle}>{article.subtitle}</p>
      </div>

      <div className={styles.image}>{image}</div>

      <div className={styles.meta}>
        <div className={styles.summary}>
          {article.role && article.duration && (
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
          )}
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
      </div>

      {article.tldr && (
        <section id="tldr" className={styles.tldr} aria-label="TL;DR">
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
      )}
    </header>
  );
}
