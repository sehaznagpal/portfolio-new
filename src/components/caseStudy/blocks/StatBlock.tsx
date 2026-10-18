import type { CSSProperties } from 'react';
import Reveal from './Reveal';
import type { StatData } from './types';
import styles from './StatBlock.module.css';

/* A row of one to four big numbers with short labels, optionally with a
   simple bar comparison under them (bars scaled to the largest value). */
export default function StatBlock({
  stats,
  bars,
}: {
  stats: StatData[];
  bars?: { items: { label: string; value: number; display: string }[]; caption: string };
}) {
  const max = bars ? Math.max(...bars.items.map((item) => item.value)) : 0;

  return (
    <div className={styles.block}>
      <div className={styles.row} style={{ '--count': stats.length } as CSSProperties}>
        {stats.map((stat, i) => (
          <Reveal key={stat.value} index={i} className={styles.stat}>
            <p className={styles.value}>{stat.value}</p>
            <p className={styles.label}>{stat.label}</p>
          </Reveal>
        ))}
      </div>

      {bars && (
        <Reveal index={stats.length}>
          <figure className={styles.bars}>
            {bars.items.map((item) => (
              <div key={item.label} className={styles.barRow}>
                <span className={styles.barLabel}>{item.label}</span>
                <span className={styles.track}>
                  <span className={styles.bar} style={{ '--share': item.value / max } as CSSProperties} />
                </span>
                <span className={styles.barValue}>{item.display}</span>
              </div>
            ))}
            <figcaption className={styles.caption}>{bars.caption}</figcaption>
          </figure>
        </Reveal>
      )}
    </div>
  );
}
