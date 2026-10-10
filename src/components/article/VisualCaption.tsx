import styles from './VisualCaption.module.css';

/* A caption as a dark highlight label: under a band's box (as="p") or under
   one image inside it (the default figcaption). */
export default function VisualCaption({
  children,
  as: Tag = 'figcaption',
  className,
}: {
  children: string;
  as?: 'figcaption' | 'p';
  className?: string;
}) {
  return (
    <Tag className={`${styles.caption} ${className ?? ''}`}>
      <span className={styles.label}>{children}</span>
    </Tag>
  );
}
