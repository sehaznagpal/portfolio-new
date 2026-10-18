import type { CSSProperties, ReactNode } from 'react';
import Reveal from './Reveal';
import type { OptionData } from './types';
import styles from './OptionsCompare.module.css';

/* Two or three options side by side (stacked on mobile): a mini
   illustration, a name, and an optional pro and con. A chosen option gets
   the accent border and a "Chosen" label. */
export default function OptionsCompare({ items, minis = {} }: { items: OptionData[]; minis?: Record<string, ReactNode> }) {
  return (
    <div className={styles.grid} style={{ '--count': items.length } as CSSProperties}>
      {items.map((item, i) => (
        <Reveal key={item.name} index={i} className={styles.card} data-chosen={item.chosen}>
          {item.chosen && <span className={styles.chosen}>Chosen</span>}
          {item.visual && (
            <div className={styles.visual} aria-hidden="true">
              {minis[item.visual]}
            </div>
          )}
          <h3 className={styles.name}>{item.name}</h3>
          {(item.pro || item.con) && (
            <dl className={styles.points}>
              {item.pro && (
                <div className={styles.point}>
                  <dt className={styles.pointLabel}>Pro</dt>
                  <dd className={styles.pointText}>{item.pro}</dd>
                </div>
              )}
              {item.con && (
                <div className={styles.point}>
                  <dt className={styles.pointLabel}>Con</dt>
                  <dd className={styles.pointText}>{item.con}</dd>
                </div>
              )}
            </dl>
          )}
        </Reveal>
      ))}
    </div>
  );
}
