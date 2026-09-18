import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import bezelImg from '../../../assets/images/moolroop/phone-bezel.png';
import screenImg from '../../../assets/images/moolroop/product-screen.jpg';
import stampImg from '../../../assets/images/moolroop/original-stamp.png';
import styles from './MoolroopVisual.module.css';

type Phase = 'idle' | 'scanning' | 'verified';

/* Ported verbatim from the pre-rebuild codebase's MoolroopCard hover effect:
   hover -> scanline sweeps top 0%->100% over 400ms -> a fixed 400ms timeout
   (not tied to the scanline's own completion) swaps in the verified panel,
   250ms fade+slide. Only the phone's resting position/size and the
   surrounding "Vs" + stamp composition are refit to this smaller featured-
   card box per the new Figma frame. */
export default function MoolroopVisual({ interactive }: { interactive: boolean }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (!interactive) return;
    setPhase('scanning');
    timeoutRef.current = setTimeout(() => setPhase('verified'), 400);
  }

  function handleLeave() {
    if (!interactive) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase('idle');
  }

  return (
    <div className={styles.visual}>
      <div className={styles.phone} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <div className={styles.screen}>
          <img src={screenImg} alt="MoolRoop product detail screen" />

          <AnimatePresence>
            {phase === 'scanning' && (
              <motion.div
                className={styles.scanline}
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === 'verified' && (
              <motion.div
                className={styles.verifiedPanel}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className={styles.verifiedHeader}>✓ VERIFIED</p>
                <hr className={styles.verifiedDivider} />
                <p className={styles.verifiedLine}>
                  <span className={styles.verifiedLabel}>GI Tag:</span> KA-2024-0187
                </p>
                <p className={styles.verifiedLine}>
                  <span className={styles.verifiedLabel}>Region:</span> Ladakh, J&amp;K
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.bezel}>
          <img src={bezelImg} alt="" />
        </div>
      </div>

      <p className={styles.vs}>Vs</p>

      <div className={`${styles.stamp} ${phase === 'verified' ? styles.stampDimmed : ''}`}>
        <img src={stampImg} alt="Original stamp" />
      </div>
    </div>
  );
}
