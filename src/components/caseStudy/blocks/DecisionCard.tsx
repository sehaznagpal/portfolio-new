import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import type { DecisionData } from './types';
import styles from './DecisionCard.module.css';

/* Trade-off decisions, stacked: each card shows the obvious pattern
   (muted, struck through), what this problem needed (accent) and why, with
   an optional mini illustration on top. */
export default function DecisionCards({
  label,
  items,
  minis = {},
}: {
  label?: string;
  items: DecisionData[];
  minis?: Record<string, ReactNode>;
}) {
  return (
    <div className={styles.block}>
      {label && <Eyebrow tone="muted">{label}</Eyebrow>}
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.title}>
            <Reveal className={styles.card}>
              {item.visual && (
                <div className={styles.visual} aria-hidden="true">
                  {minis[item.visual]}
                </div>
              )}
              <h3 className={styles.title}>{item.title}</h3>
              <dl className={styles.parts}>
                <div className={styles.part} data-part="obvious">
                  <dt className={styles.partLabel}>The obvious pattern</dt>
                  <dd className={styles.partText}>
                    <s>{item.obvious}</s>
                  </dd>
                </div>
                <div className={styles.part} data-part="needed">
                  <dt className={styles.partLabel}>What this problem needed</dt>
                  <dd className={styles.partText}>{item.needed}</dd>
                </div>
                <div className={styles.part} data-part="why">
                  <dt className={styles.partLabel}>Why</dt>
                  <dd className={styles.partText}>{item.why}</dd>
                </div>
              </dl>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
