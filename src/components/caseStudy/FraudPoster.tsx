import blueImg from '../../assets/images/fraud/fraud-blue.jpg';
import greenImg from '../../assets/images/fraud/fraud-green.jpg';
import redImg from '../../assets/images/fraud/fraud-red.jpg';
import styles from './FraudPoster.module.css';

/* Three-panel triptych at desktop (blue/green/red signs), collapsing to
   just the red "punchline" panel on mobile — matching the two Figma frames
   exactly rather than naively scaling the triptych down. */
export default function FraudPoster() {
  return (
    <div className={styles.poster}>
      <div className={styles.frame}>
        <img src={blueImg} alt="" />
      </div>
      <div className={styles.frame}>
        <img src={greenImg} alt="" />
      </div>
      <div className={`${styles.frame} ${styles.frameRed}`}>
        <img
          src={redImg}
          alt="A person holds a red sign reading 'Do not share your OTP with strangers' in front of their face"
        />
      </div>
    </div>
  );
}
