import styles from './PullQuote.module.css';

/* A section's pull quote, between its heading and its paragraphs. */
export default function PullQuote({ text }: { text: string }) {
  return <blockquote className={styles.quote}>&ldquo;{text}&rdquo;</blockquote>;
}
