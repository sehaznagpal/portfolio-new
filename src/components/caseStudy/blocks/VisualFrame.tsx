import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import styles from './VisualFrame.module.css';

/* A big visual (flowchart, sitemap, interactive flow, charts) in the story
   card language: an eyebrow title above, a full-width card holding the
   visual centred on a panel in the case's colour (--story-panel), and a
   small centred caption below. */
export default function VisualFrame({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className={styles.frame}>
      <Eyebrow className={styles.title}>{title}</Eyebrow>
      <Reveal className={styles.card}>
        <div className={styles.panel}>{children}</div>
      </Reveal>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
