import type { CSSProperties, ReactNode } from 'react';
import { useRevealOnce } from '../../../lib/useRevealOnce';
import styles from './Reveal.module.css';

/* Fades and rises its content in once, the first time it scrolls into
   view. `index` staggers siblings in a row or grid. */
export default function Reveal({
  children,
  className,
  index = 0,
  ...data
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  /* data-* attributes for the caller's own styling */
  [data: `data-${string}`]: string | boolean | undefined;
}) {
  const [ref, revealed] = useRevealOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className ?? ''}`}
      {...data}
      data-revealed={revealed}
      style={{ '--reveal-index': index } as CSSProperties}
    >
      {children}
    </div>
  );
}
