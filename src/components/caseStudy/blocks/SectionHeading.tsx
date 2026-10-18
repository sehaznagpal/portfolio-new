import styles from './SectionHeading.module.css';

/* A section's takeaway heading: one idea, large and bold. */
export default function SectionHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className={styles.heading}>
      {children}
    </h2>
  );
}
