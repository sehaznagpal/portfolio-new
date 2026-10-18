import Reveal from './Reveal';
import styles from './InfoCard.module.css';

/* A soft card of labelled facts (role, timeline, method...), two by two on
   wider screens. Each value is its own line. */
export default function InfoCard({ items }: { items: { label: string; values: string[] }[] }) {
  return (
    <Reveal>
      <dl className={styles.card}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <dt className={styles.label}>{item.label}</dt>
            {item.values.map((value) => (
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
