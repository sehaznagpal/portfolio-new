import type { CSSProperties } from 'react';
import Reveal from './Reveal';
import styles from './Swatches.module.css';

/* A row of colour swatches, each with its hex (and an optional note),
   wrapping on narrow screens, with a centred caption below. */
export default function Swatches({ swatches, caption }: { swatches: { hex: string; note?: string }[]; caption?: string }) {
  return (
    <Reveal>
      <figure className={styles.figure}>
        <ul className={styles.row}>
          {swatches.map((swatch) => (
            <li key={swatch.hex} className={styles.swatch}>
              <span className={styles.chip} style={{ '--swatch': swatch.hex } as CSSProperties} />
              <span className={styles.hex}>{swatch.hex}</span>
              {swatch.note && <span className={styles.note}>{swatch.note}</span>}
            </li>
          ))}
        </ul>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
