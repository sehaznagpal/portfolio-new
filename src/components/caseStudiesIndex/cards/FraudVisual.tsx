import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import phoneBezelImg from '../../../assets/images/moolroop/phone-bezel.png';
import styles from './FraudVisual.module.css';

/* Ported verbatim from the pre-rebuild codebase's FraudCard hover effect
   (rotation deltas, 280ms cubic-bezier(0.4,0,0.2,1) timing, bg-color swap) —
   only the phones' resting position/size is new, refit to this smaller
   featured-card visual-clip box per the new Figma frame instead of the old
   full 984x554 case-study card. */
export default function FraudVisual({ interactive }: { interactive: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = interactive && hovered;

  return (
    <div
      className={styles.clip}
      onMouseEnter={interactive ? () => setHovered(true) : undefined}
      onMouseLeave={interactive ? () => setHovered(false) : undefined}
    >
      <div className={`${styles.phonePair} ${active ? styles.hovered : ''}`}>
        <div className={`${styles.phone} ${styles.backPhone}`}>
          <div className={styles.phoneScreen}>
            <div className={styles.alertBanner}>
              <TriangleAlert className={styles.alertIcon} size={16} strokeWidth={2.5} />
              <span className={styles.alertText}>
                Fraudsters may impersonate trusted sources. Please{' '}
                <span className={styles.alertTextBold}>verify</span> before making the payment.
              </span>
            </div>
          </div>
          <div className={styles.phoneBezel}>
            <img src={phoneBezelImg} alt="" />
          </div>
        </div>

        <div className={`${styles.phone} ${styles.frontPhone}`}>
          <div className={`${styles.phoneScreen} ${styles.ctaScreen}`}>
            <div className={styles.ctaButtons}>
              <div className={styles.cancelButton}>
                <span className={styles.cancelButtonLabel}>Cancel Payment</span>
              </div>
              <div className={styles.continueButton}>
                <span className={styles.continueButtonLabel}>Continue anyway</span>
              </div>
            </div>
          </div>
          <div className={styles.phoneBezel}>
            <img src={phoneBezelImg} alt="" />
          </div>
        </div>

        <div className={styles.speechBubble}>
          <span className={styles.speechBubbleLabel}>Which performs better?</span>
        </div>
      </div>
    </div>
  );
}
