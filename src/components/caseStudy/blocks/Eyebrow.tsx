import styles from './Eyebrow.module.css';

/* Small uppercase label with wide tracking: in the case accent above a
   section heading, or muted as a sub-label inside a section. */
export default function Eyebrow({
  children,
  tone = 'accent',
  className,
}: {
  children: string;
  tone?: 'accent' | 'muted';
  className?: string;
}) {
  return (
    <p className={`${styles.eyebrow} ${className ?? ''}`} data-tone={tone}>
      {children}
    </p>
  );
}
