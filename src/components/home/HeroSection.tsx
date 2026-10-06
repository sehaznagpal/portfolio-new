import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Stage from '../viewport/Stage';
import Hero from '../hero/Hero';
import SweepButton from '../chrome/SweepButton';
import styles from './HeroSection.module.css';

const CONTENT_FADE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] } as const;

export default function HeroSection({
  nav,
  backgroundVisible,
  ready,
  onOpenAbout,
  onExplore,
}: {
  nav: ReactNode;
  /* False only while the loader is still on screen: the grid fades in once it clears. */
  backgroundVisible: boolean;
  /* Mounts the content (and plays the card entrance) after the post-loader pause. */
  ready: boolean;
  onOpenAbout: () => void;
  onExplore: () => void;
}) {
  return (
    <Stage dark={!backgroundVisible}>
      {ready && (
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={CONTENT_FADE}
        >
          {nav}
          <div className={styles.cardArea}>
            <Hero onOpenAbout={onOpenAbout} />
          </div>
          <SweepButton className={styles.cue} onClick={onExplore}>
            <span className={styles.cueText}>scroll down to explore work</span>
            <ArrowDown className={styles.cueText} size={12} strokeWidth={1.75} aria-hidden="true" />
          </SweepButton>
        </motion.div>
      )}
    </Stage>
  );
}
