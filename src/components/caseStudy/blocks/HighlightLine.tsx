import styles from './HighlightLine.module.css';

/* One standout sentence in the large italic serif. Use sparingly. */
export default function HighlightLine({ text }: { text: string }) {
  return <p className={styles.line}>{text}</p>;
}
