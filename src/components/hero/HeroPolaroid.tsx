import { motion } from 'framer-motion';
import photo from '../../assets/images/hero/hero-polaroid.svg';
import styles from './HeroPolaroid.module.css';

/* This SVG is the exact Figma export for the hover photo: the skewed polaroid-frame
   path, the photo pattern fill, the drop shadow, and the film-grain noise texture are
   all baked in as a single vector, so no CSS border/shadow approximation is needed.
   Reused unchanged from the pre-auto-layout build — same asset, same position logic,
   same animation — per the brief (overlapping "Nagpal" and the paragraph is
   intentional, matching Figma).

   The horizontal centering (x: '-50%') is applied here via Framer Motion's own
   transform, not a CSS `transform`, because Framer Motion takes full ownership of the
   `transform` property on an animated element — a separate CSS transform on the same
   element gets silently overwritten. */
export default function HeroPolaroid({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      className={styles.wrapper}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95, rotate: 0, x: '-50%' }}
      animate={{ opacity: 1, scale: 1, rotate: -2, x: '-50%' }}
      exit={{ opacity: 0, scale: 0.95, rotate: 0, x: '-50%' }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      <img className={styles.photo} src={photo} alt="" />
    </motion.div>
  );
}
