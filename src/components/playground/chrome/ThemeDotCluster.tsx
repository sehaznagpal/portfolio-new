import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { THEME_CYCLE, themeOption, type ThemeName } from '../theme/themes';
import styles from './ThemeDotCluster.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const DOT_TRANSITION = { duration: 0.3, ease: EASE };
const SPIN_TRANSITION = { duration: 0.3, ease: EASE };
// Each step of the cycle turns the cluster a quarter anticlockwise.
const SPIN_DEG = 90;
/* Dots are cyclic clockwise from top-left, but the 2x2 grid fills row by
   row, so the last two swap to land in the right corners. */
const SLOT_RENDER_ORDER = [0, 1, 3, 2] as const;
const ACTIVE_SLOT = 0;

/* Four theme dots, the active theme top-left. Two separate animations:
   - the top-left dot slides its new colour in whenever the theme changes;
   - the whole cluster spins a quarter turn only when `spinSignal` bumps (a
     click on the cluster, never a pick from the list). It jumps to +90deg
     with the new arrangement already in place, which looks exactly like
     the old one, then unwinds to 0, so it reads as the dots rotating. */
export default function ThemeDotCluster({ activeTheme, spinSignal }: { activeTheme: ThemeName; spinSignal: number }) {
  const spin = useAnimationControls();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    spin.set({ rotate: SPIN_DEG });
    spin.start({ rotate: 0, transition: SPIN_TRANSITION });
  }, [spinSignal, spin]);

  const activeIndex = Math.max(0, THEME_CYCLE.indexOf(activeTheme as (typeof THEME_CYCLE)[number]));

  return (
    <motion.span className={styles.cluster} animate={spin}>
      {SLOT_RENDER_ORDER.map((slot) => {
        const option = themeOption(THEME_CYCLE[(activeIndex + slot) % THEME_CYCLE.length])!;
        const dotStyle = { background: option.swatchFill, borderColor: option.swatchStroke };
        return (
          <span key={slot} className={styles.slot}>
            {slot === ACTIVE_SLOT ? (
              <AnimatePresence initial={false}>
                <motion.span
                  key={option.id}
                  className={styles.dot}
                  style={dotStyle}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 8, opacity: 0 }}
                  transition={DOT_TRANSITION}
                />
              </AnimatePresence>
            ) : (
              <span className={styles.dot} style={dotStyle} />
            )}
          </span>
        );
      })}
    </motion.span>
  );
}
