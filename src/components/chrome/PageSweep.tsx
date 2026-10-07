import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './PageSweep.module.css';

/* The two halves of the grid sweep into the playground, which read as one
   downward motion across the route change:
   - PageSweepIn, on the page being left, slides a grid curtain down from
     above until it covers the screen; it unmounts with that page.
   - PageSweepOut, on the playground, starts covering the screen and keeps
     sliding down and off, uncovering it. A direct load plays it too. */
export function PageSweepIn() {
  return createPortal(<div className={`${styles.sweep} ${styles.in}`} aria-hidden="true" />, document.body);
}

export function PageSweepOut() {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Two frames so the covering state paints before the slide starts.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setLeaving(true));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className={`${styles.sweep} ${styles.out} ${leaving ? styles.gone : ''}`} aria-hidden="true" />;
}
