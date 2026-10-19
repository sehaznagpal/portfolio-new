import Reveal from './Reveal';
import ToolLogos from './ToolLogos';
import type { InfoItemData } from './types';
import styles from './InfoCard.module.css';

/* A soft card of labelled facts (role, timeline, method...), two by two on
   wider screens. Each value is its own line; tools show as a logo row. */
export default function InfoCard({ items }: { items: InfoItemData[] }) {
  return (
    <Reveal>
      <dl className={styles.card}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <dt className={styles.label}>{item.label}</dt>
            {item.tools && (
              <dd className={styles.tools}>
                <ToolLogos tools={item.tools} />
              </dd>
            )}
            {item.values?.map((value) => (
              <dd key={value} className={styles.value}>
                {value}
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
