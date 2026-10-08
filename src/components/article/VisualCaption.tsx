import styles from './VisualCaption.module.css';

/* The quiet caption under a band's visual (or one image in it). */
export default function VisualCaption({ children }: { children: string }) {
  return <figcaption className={styles.caption}>{children}</figcaption>;
}
