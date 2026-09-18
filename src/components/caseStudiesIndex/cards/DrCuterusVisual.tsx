import laptopBezelImg from '../../../assets/images/dr-cuterus/laptop-bezel.png';
import homepageScreenshotImg from '../../../assets/images/dr-cuterus/homepage-screenshot.jpg';
import styles from './DrCuterusVisual.module.css';

/* Static per the Figma reference and the old codebase (DrCuterusCard has no
   hover interaction at all) — just the laptop mockup, matching this
   featured-card frame's simpler composition (no phone/plush, those only
   appeared on the old full-size case-study card). */
export default function DrCuterusVisual() {
  return (
    <div className={styles.laptop}>
      <div className={styles.laptopScreen}>
        <img src={homepageScreenshotImg} alt="Dr Cuterus homepage" />
      </div>
      <div className={styles.laptopBezel}>
        <img src={laptopBezelImg} alt="" />
      </div>
    </div>
  );
}
