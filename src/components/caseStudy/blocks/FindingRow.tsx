import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import styles from './FindingRow.module.css';

/* Findings as a stacked list: a bold title and one supporting line each,
   under an optional sub-label. */
export default function FindingRows({ label, items }: { label?: string; items: { title: string; text: string }[] }) {
  return (
    <div className={styles.block}>
      {label && <Eyebrow tone="muted">{label}</Eyebrow>}
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal index={i} className={styles.row}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.text}>{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
