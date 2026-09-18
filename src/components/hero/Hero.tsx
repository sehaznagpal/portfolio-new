import { useRef, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { useHasFinePointer } from '../../lib/useHasFinePointer';
import HeroPolaroid from './HeroPolaroid';
import styles from './Hero.module.css';

/* The card itself expands in (scale + fade) once the surrounding chrome has
   faded in (see HomePage.tsx's own opacity transition), then its content
   settles in just after with a short stagger — a two-stage "card arrives,
   then its content arrives" entrance rather than everything popping in
   flatly at once. Runs once on mount only; nothing about the hover/click
   interactions below is affected. */
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delayChildren: 0.15,
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

// The whole card scales up slightly while fading out, on a wrapper OUTSIDE
// the motion.div below — never touching `opacity`/`scale` on .card itself,
// since those are already owned by cardVariants' own entrance animation and
// fighting the two over the same property is what caused the card to
// visibly stall on an earlier attempt. Driven by GSAP (not a CSS
// transition) so the easing matches the calm, non-bouncy feel the
// Featured Work crossfade in HomePage.tsx uses.
const EXIT_DURATION = 0.5;
const EXIT_SCALE = 1.08;

/* Fluid across the whole 393->1440+ range (see Hero.module.css) instead of the
   old separate mobile/desktop components. Interaction still branches on real
   pointer capability, exactly as the two old components did: a mouse hovering
   "I am Sehaz" peeks the photo and a click opens About; a touch tap (no hover)
   just toggles the photo peek on its own, with About reachable via the
   top-left "about" link instead. */
export default function Hero({
  onOpenAbout,
  onExplore,
}: {
  onOpenAbout: () => void;
  onExplore: () => void;
}) {
  const hasFinePointer = useHasFinePointer();
  const [photoVisible, setPhotoVisible] = useState(false);
  const exitRef = useRef<HTMLDivElement>(null);

  function handleExplore() {
    if (exitRef.current) {
      gsap.to(exitRef.current, {
        scale: EXIT_SCALE,
        opacity: 0,
        duration: EXIT_DURATION,
        ease: 'power2.out',
      });
    }
    onExplore();
  }

  function handleHighlightClick() {
    if (hasFinePointer) {
      onOpenAbout();
    } else {
      setPhotoVisible((v) => !v);
    }
  }

  return (
    <div ref={exitRef}>
      <motion.div className={styles.card} variants={cardVariants} initial="hidden" animate="visible">
        <div className={styles.heroContent}>
          <motion.p className={styles.title} variants={itemVariants}>
            <span className={styles.titleItalic}>Sehaz</span>
            <span className={styles.titleBold}>Nagpal</span>
          </motion.p>

          <motion.p className={styles.paragraph} variants={itemVariants}>
            Since I was a kid, I have always been intrigued by the question:{' '}
            <span className={styles.question}>
              <span className={styles.openQuote}>&lsquo;</span>Why do people do what they do?&rsquo;
            </span>{' '}
            This question stayed along me as I got through an economics degree, a dissertation, and,
            now, as I design.{' '}
            <span
              className={styles.highlight}
              role="button"
              tabIndex={0}
              aria-label="Open about"
              onMouseEnter={hasFinePointer ? () => setPhotoVisible(true) : undefined}
              onMouseLeave={hasFinePointer ? () => setPhotoVisible(false) : undefined}
              onClick={handleHighlightClick}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleHighlightClick();
                }
              }}
            >
              I am Sehaz
            </span>
            , a UI-UX designer.
          </motion.p>

          <motion.button className={styles.button} onClick={handleExplore} variants={itemVariants}>
            <span className={styles.buttonLabel}>Explore Work</span>
            <span className={styles.sweep} aria-hidden="true">
              <span className={styles.sweepLabel}>Explore Work</span>
            </span>
          </motion.button>

          <AnimatePresence>{photoVisible && <HeroPolaroid />}</AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
