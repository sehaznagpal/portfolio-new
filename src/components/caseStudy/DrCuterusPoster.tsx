import ticketFrameSvg from '../../assets/images/dr-cuterus/ticket-frame.svg';
import lanyardImg from '../../assets/images/dr-cuterus/lanyard-hook.png';
import photoImg from '../../assets/images/dr-cuterus/hero-photo.jpg';
import styles from './DrCuterusPoster.module.css';

/* Desktop and mobile are genuinely different concepts here, not one layout
   reflowed (per the brief) — a notched "ticket stub" card at desktop vs. a
   hung, rotated polaroid at mobile — so both are rendered and toggled via
   CSS media query (see .module.css) rather than sharing markup. Both sit on
   the same pink patterned background (a real Figma pattern-fill, which
   doesn't export as an image — approximated here with a small repeating
   tile sampled off the rendered fill). */
export default function DrCuterusPoster() {
  return (
    <div className={styles.poster}>
      <div className={styles.desktop}>
        <div className={styles.ticketFrame}>
          <img className={styles.ticketSvg} src={ticketFrameSvg} alt="" />
          <div className={styles.insides}>
            <div className={styles.photo}>
              <img src={photoImg} alt="Dr Cuterus smiling, holding a magazine" />
            </div>
            <div className={styles.textCol}>
              <p className={styles.headline}>India&rsquo;s favourite embryologist</p>
              <p className={styles.subtitle}>Website Design</p>
              <p className={styles.year}>(2026)</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <div className={styles.lanyard} aria-hidden="true">
          <img src={lanyardImg} alt="" />
        </div>
        <div className={styles.photoWrapMobile}>
          <div className={styles.photoMobile}>
            <img src={photoImg} alt="Dr Cuterus smiling, holding a magazine" />
          </div>
        </div>
        <div className={styles.bannerMobile}>
          <p className={styles.bannerMobileText}>India&rsquo;s favourite embryologist</p>
        </div>
      </div>
    </div>
  );
}
