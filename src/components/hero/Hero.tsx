import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useMediaQuery } from '../../lib/useMediaQuery';
import HeroItems from './HeroItems';
import HeroName from './HeroName';
import styles from './Hero.module.css';

/* The card itself expands in (scale + fade) once the surrounding chrome has
   faded in (see HeroSection.tsx's own opacity transition), then its content
   settles in just after with a short stagger — a two-stage "card arrives,
   then its content arrives" entrance rather than everything popping in
   flatly at once. Applied to the root so the items tucked behind the card
   scale in with it. Runs once on mount only. */
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

const HOVER_QUERY = '(hover: hover) and (pointer: fine)';

/* Fluid across the whole 393->1440+ range (see Hero.module.css). "I am Sehaz"
   opens About on click/tap everywhere; on hover-capable devices, hovering (or
   focusing) it also brings the "me" items out from behind the card. */
export default function Hero({ onOpenAbout }: { onOpenAbout: () => void }) {
  const canHover = useMediaQuery(HOVER_QUERY);
  const [itemsOut, setItemsOut] = useState(false);
  const showItems = canHover ? () => setItemsOut(true) : undefined;
  const hideItems = canHover ? () => setItemsOut(false) : undefined;

  return (
    <motion.div className={styles.root} variants={cardVariants} initial="hidden" animate="visible">
      {canHover && <HeroItems out={itemsOut} />}

      <div className={styles.card}>
        <div className={styles.heroContent}>
          <motion.p className={styles.title} variants={itemVariants} aria-label="Sehaz Nagpal">
            <HeroName />
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
              onMouseEnter={showItems}
              onMouseLeave={hideItems}
              onFocus={showItems}
              onBlur={hideItems}
              onClick={onOpenAbout}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpenAbout();
                }
              }}
            >
              I am Sehaz
            </span>
            , a product designer.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
