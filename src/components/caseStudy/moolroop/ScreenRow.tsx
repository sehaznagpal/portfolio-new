import { Fragment } from 'react';
import VisualCaption from '../../article/VisualCaption';
import PhoneScreen from './PhoneScreen';
import styles from './ScreenRow.module.css';

export interface RowScreen {
  src: string;
  alt: string;
  caption?: string;
  /* A small label above the screen (e.g. "Layer 1: the summary"). Tagged
     screens are joined by a thin arrow, reading as going one level deeper. */
  tag?: string;
}

export interface ScreenRowData {
  screens: RowScreen[];
  caption?: string;
}

/* Phone-framed screens in a row, each with an optional caption, plus an
   optional caption for the whole band. Rows of three or more become a
   horizontal scroll-snap strip on mobile; a pair stacks on narrow screens. */
export default function ScreenRow({ screens, caption }: ScreenRowData) {
  const layered = screens.some((screen) => screen.tag);

  return (
    <figure className={styles.band}>
      <div className={styles.row} data-count={screens.length}>
        {screens.map((screen, i) => (
          <Fragment key={screen.src}>
            {layered && i > 0 && <span className={styles.arrow} aria-hidden="true" />}
            <figure className={styles.item}>
              {screen.tag && <span className={styles.tag}>{screen.tag}</span>}
              <PhoneScreen src={screen.src} alt={screen.alt} />
              {screen.caption && <VisualCaption>{screen.caption}</VisualCaption>}
            </figure>
          </Fragment>
        ))}
      </div>
      {caption && <VisualCaption>{caption}</VisualCaption>}
    </figure>
  );
}
