import styles from './Body.module.css';

/* Short paragraphs of body copy, justified like the rest of the site. */
export default function Body({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={styles.body}>
      {paragraphs.map((text) => (
        <p key={text} className={styles.paragraph}>
          {text}
        </p>
      ))}
    </div>
  );
}
