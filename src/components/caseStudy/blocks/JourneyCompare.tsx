import { Fragment } from 'react';
import Reveal from './Reveal';
import type { JourneyData } from './types';
import styles from './JourneyCompare.module.css';

/* Journeys side by side (stacked on mobile), each a list of numbered step
   chips. Steps that happen outside the product are muted and tagged, a
   drop-off can be marked after a step, and an accent journey (the
   proposal) takes the case accent. */
export default function JourneyCompare({ journeys, caption }: { journeys: JourneyData[]; caption?: string }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.grid}>
        {journeys.map((journey, j) => (
          <Reveal key={journey.label} index={j} className={styles.journey}>
            <p className={styles.label} data-accent={journey.accent}>
              {journey.label}
            </p>
            <ol className={styles.steps}>
              {journey.steps.map((step, i) => (
                <Fragment key={step.text}>
                  <li className={styles.step} data-outside={step.outside} data-accent={journey.accent}>
                    <span className={styles.number}>{i + 1}</span>
                    <span className={styles.text}>{step.text}</span>
                    {step.outside && <span className={styles.outside}>outside the app</span>}
                  </li>
                  {journey.dropAfter === i + 1 && (
                    <li className={styles.drop} aria-label="Most people drop off here">
                      <span className={styles.dropLine} aria-hidden="true" />
                      <span className={styles.dropText}>Drop-off</span>
                      <span className={styles.dropLine} aria-hidden="true" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
