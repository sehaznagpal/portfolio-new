import styles from './PullQuote.module.css';

/* Left-column quote that introduces the paragraph group beside it. */
export default function PullQuote({ text }: { text: string }) {
  return <blockquote className={styles.quote}>&ldquo;{text}&rdquo;</blockquote>;
}
