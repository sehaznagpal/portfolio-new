import { useEffect, useReducer, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import styles from './HeroSection.module.css';

const LABEL = 'scroll down to explore work';

/* `run` keys the animated overlay, so bumping it remounts that element and
   its CSS animation begins again from the start (with its own start delay). */
interface CueState {
  run: number;
  stopped: boolean;
}

function reduce(state: CueState, action: 'stop' | 'restart'): CueState {
  if (action === 'stop') return state.stopped ? state : { ...state, stopped: true };
  return { run: state.run + 1, stopped: false };
}

/* The hero's "scroll down to explore work" button. Its ambient loop is one
   pure CSS animation (see HeroSection.module.css): a brand fill sweeps in
   from the left, holds, then leaves to the right, with a dark copy of the
   label inside the same clipped overlay so the text darkens exactly where
   the fill's edge passes.

   The stop state belongs to each arrival at the hero, not to the visit: it
   lives only in this component, so it resets whenever Home mounts, and it
   follows `active` (the section controller's "hero is the current section"):
   - active again: a fresh run, the overlay remounted so the loop restarts
     from the beginning after its delay;
   - the first scroll, swipe, key press or click while active, or leaving the
     hero: stopped, which fades the overlay out and pauses the loop.
   The stop listeners exist only while the hero is mounted, active and not yet
   stopped. */
export default function ScrollCue({ active, onExplore }: { active: boolean; onExplore: () => void }) {
  const [{ run, stopped }, dispatch] = useReducer(reduce, undefined, () => ({ run: 0, stopped: !active }));

  // Follows the controller: render-time sync, so a change in `active` and the
  // restart it causes land in the same render (no frame of the old state).
  const [wasActive, setWasActive] = useState(active);
  if (active !== wasActive) {
    setWasActive(active);
    dispatch(active ? 'restart' : 'stop');
  }

  useEffect(() => {
    if (!active || stopped) return;
    const stop = () => dispatch('stop');
    const windowEvents = ['wheel', 'touchmove', 'keydown'] as const;
    windowEvents.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    // Scroll doesn't bubble, so it's caught on the way down from any scroller.
    document.addEventListener('scroll', stop, { capture: true, passive: true });
    return () => {
      windowEvents.forEach((type) => window.removeEventListener(type, stop));
      document.removeEventListener('scroll', stop, { capture: true });
    };
  }, [active, stopped]);

  return (
    <button
      type="button"
      className={`${styles.cue} ${stopped ? styles.cueDone : ''}`}
      onClick={() => {
        dispatch('stop');
        onExplore();
      }}
    >
      <span className={styles.cueLabel}>
        {LABEL}
        <ArrowDown size={12} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span key={run} className={styles.cueSweep} aria-hidden="true">
        <span className={styles.cueFill} />
        <span className={styles.cueInk}>
          {LABEL}
          <ArrowDown size={12} strokeWidth={1.75} />
        </span>
      </span>
    </button>
  );
}
