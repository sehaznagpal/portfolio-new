import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import StoryIcon from './StoryIcon';
import type { InsightCardData } from './types';
import styles from './InsightCard.module.css';

/* Cards two by two on wider screens: a mini UI illustration (or a small
   icon) on top, then a bold title and one line. `minis` maps each card's
   illustration id to its component. */
export default function InsightCards({
  label,
  cards,
  minis = {},
}: {
  label?: string;
  cards: InsightCardData[];
  minis?: Record<string, ReactNode>;
}) {
  return (
    <div className={styles.block}>
      {label && <Eyebrow tone="muted">{label}</Eyebrow>}
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <Reveal key={card.title} index={i % 2} className={styles.card}>
            {card.visual && (
              <div className={styles.visual} aria-hidden="true">
                {minis[card.visual]}
              </div>
            )}
            {card.icon && <StoryIcon name={card.icon} className={styles.icon} />}
            <div className={styles.text}>
              {card.tag && <p className={styles.tag}>{card.tag}</p>}
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.body}>{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
