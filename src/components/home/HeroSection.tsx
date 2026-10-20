import { motion } from 'framer-motion';
import Stage from '../viewport/Stage';
import Hero from '../hero/Hero';
import ScrollCue from './ScrollCue';
import styles from './HeroSection.module.css';

const CONTENT_FADE = { duration: 0.55, ease: [0.16, 1, 0.3, 1] } as const;

export default function HeroSection({
  backgroundVisible,
  ready,
  onOpenAbout,
  onExplore,
  cueActive,
}: {
  /* False only while the loader is still on screen: the grid fades in once it clears. */
  backgroundVisible: boolean;
  /* Mounts the content (and plays the card entrance) after the post-loader pause. */
  ready: boolean;
  onOpenAbout: () => void;
  onExplore: () => void;
  /* Whether the hero is the current section: the cue's loop runs, stops and restarts with it. */
  cueActive: boolean;
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
          {/* Holds the fixed nav's place (see HomePage). */}
          <div className={styles.navSpace} aria-hidden="true" />
          <div className={styles.cardArea}>
            <Hero onOpenAbout={onOpenAbout} />
          </div>
          <ScrollCue active={cueActive} onExplore={onExplore} />
        </motion.div>
      )}
    </Stage>
  );
}
