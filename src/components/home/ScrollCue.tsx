import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import styles from './HeroSection.module.css';

const LABEL = 'scroll down to explore work';
// Once a visitor has scrolled (or clicked the cue) the loop has done its job:
// it stays off for the rest of the visit, including later returns to home.
const DONE_KEY = 'portfolio:cue-done';
let doneThisVisit = false;

function isDone(): boolean {
  if (doneThisVisit) return true;
  try {
    return sessionStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}

function markDone(): void {
  doneThisVisit = true;
  try {
    sessionStorage.setItem(DONE_KEY, '1');
  } catch {
    // sessionStorage unavailable: the module flag still covers this visit
  }
}

/* The hero's "scroll down to explore work" button. Its ambient loop is one
   pure CSS animation (see HeroSection.module.css): a brand fill sweeps in
   from the left, holds, then leaves to the right, with a dark copy of the
   label inside the same clipped overlay so the text darkens exactly where
   the fill's edge passes. Nothing here drives or restarts it. The only JS is
   a one-shot stop: the first scroll, swipe, key press or click adds a single
   class (never removed) that fades the overlay out and pauses the loop. The
   class goes straight onto the element, not through React state, so no
   render can touch the animation. */
export default function ScrollCue({ active, onExplore }: { active: boolean; onExplore: () => void }) {
  const cueRef = useRef<HTMLButtonElement>(null);
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => {
    const cue = cueRef.current;
    if (!cue) return;
    if (isDone()) {
      cue.classList.add(styles.cueDone);
      return;
    }

    let stopped = false;
    function stop() {
      if (stopped) return;
      stopped = true;
      markDone();
      cue!.classList.add(styles.cueDone);
      removeListeners();
    }
    stopRef.current = stop;

    const windowEvents = ['wheel', 'touchmove', 'keydown'] as const;
    windowEvents.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    // Scroll doesn't bubble, so it's caught on the way down from any scroller.
    document.addEventListener('scroll', stop, { capture: true, passive: true });

    function removeListeners() {
      windowEvents.forEach((type) => window.removeEventListener(type, stop));
      document.removeEventListener('scroll', stop, { capture: true });
    }

    return () => {
      removeListeners();
      stopRef.current = () => {};
    };
  }, []);

  // Leaving the hero any other way (the nav's "work", say) ends it too.
  useEffect(() => {
    if (!active) stopRef.current();
  }, [active]);

  return (
    <button
      ref={cueRef}
      type="button"
      className={styles.cue}
      onClick={() => {
        stopRef.current();
        onExplore();
      }}
    >
      <span className={styles.cueLabel}>
        {LABEL}
        <ArrowDown size={12} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className={styles.cueSweep} aria-hidden="true">
        <span className={styles.cueFill} />
        <span className={styles.cueInk}>
          {LABEL}
          <ArrowDown size={12} strokeWidth={1.75} />
        </span>
      </span>
    </button>
  );
}
