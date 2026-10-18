import { Check, Minus } from 'lucide-react';
import Reveal from './Reveal';
import styles from './ScopeList.module.css';

/* What's in scope (ticks) and what's out of scope on purpose (muted
   dashes), in two short columns. */
export default function ScopeList({ inScope, outOfScope }: { inScope: string[]; outOfScope: string[] }) {
  return (
    <Reveal className={styles.card}>
      <div className={styles.column}>
        <p className={styles.label}>In scope</p>
        <ul className={styles.list}>
          {inScope.map((item) => (
            <li key={item} className={styles.item}>
              <Check className={styles.tick} size={14} strokeWidth={2.5} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.column} data-muted="true">
        <p className={styles.label}>Out of scope, on purpose</p>
        <ul className={styles.list}>
          {outOfScope.map((item) => (
            <li key={item} className={styles.item}>
              <Minus className={styles.dash} size={14} strokeWidth={2.5} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
