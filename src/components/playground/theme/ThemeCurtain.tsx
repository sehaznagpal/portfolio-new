import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { themeOption, type ThemeName } from './themes';
import styles from './ThemeCurtain.module.css';

const CURTAIN_TRANSITION = { duration: 0.776, ease: [0.32, 1, 0.46, 1] } as const;

/* The canvas fill swaps instantly with data-theme. To make the new colour
   slide in from the left instead, a full-viewport curtain in the outgoing
   colour appears on top the moment the theme changes, slides off to the
   right, then unmounts. */
export default function ThemeCurtain({ theme }: { theme: ThemeName }) {
  const reducedMotion = useReducedMotion();
  const previousRef = useRef(theme);
  const [outgoing, setOutgoing] = useState<{ id: number; color: string } | null>(null);

  useEffect(() => {
    const previous = previousRef.current;
    if (previous === theme) return;
    previousRef.current = theme;
    // 'default' has no swatch: it's whatever the page's own fill resolves to.
    setOutgoing({ id: Date.now(), color: themeOption(previous)?.swatchFill ?? 'var(--bg-canvas)' });
  }, [theme]);

  if (!outgoing) return null;

  return (
    <motion.div
      key={outgoing.id}
      className={styles.curtain}
      style={{ background: outgoing.color }}
      initial={reducedMotion ? { opacity: 1 } : { x: 0 }}
      animate={reducedMotion ? { opacity: 0 } : { x: '100%' }}
      transition={CURTAIN_TRANSITION}
      onAnimationComplete={() => setOutgoing(null)}
      aria-hidden="true"
    />
  );
}
