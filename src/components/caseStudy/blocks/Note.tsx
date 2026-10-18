import styles from './Note.module.css';

/* An inline aside with a bold lead-in ("Under the hood:"). */
export default function Note({ lead, text }: { lead: string; text: string }) {
  return (
    <p className={styles.note}>
      <strong className={styles.lead}>{lead}</strong> {text}
    </p>
  );
}
