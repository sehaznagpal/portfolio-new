import type { CSSProperties, ReactNode } from 'react';
import Reveal from './Reveal';
import type { MiniCardData } from './types';
import styles from './MiniCards.module.css';

/* Three or four small cards in a row (two on tablet, stacked on mobile):
   a tiny UI snippet, a bold title and one line. */
export default function MiniCards({ cards, minis = {} }: { cards: MiniCardData[]; minis?: Record<string, ReactNode> }) {
  return (
    <div className={styles.grid} style={{ '--count': cards.length } as CSSProperties}>
      {cards.map((card, i) => (
        <Reveal key={card.title} index={i} className={styles.card}>
          <div className={styles.visual} aria-hidden="true">
            {minis[card.visual]}
          </div>
          <div className={styles.text}>
            <h4 className={styles.title}>{card.title}</h4>
            <p className={styles.body}>{card.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
