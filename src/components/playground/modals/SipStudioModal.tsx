import PlaygroundModal from './PlaygroundModal';
import sublogo from '../../../assets/images/playground/sip-modal/sublogo.svg';
import flower from '../../../assets/images/playground/sip-modal/flower.svg';
import mug from '../../../assets/images/playground/sip-modal/mug.svg';
import stickerPlain from '../../../assets/images/playground/sip-modal/sticker-black-1.svg';
import stickerLeft from '../../../assets/images/playground/sip-modal/sticker-black-2.svg';
import stickerRight from '../../../assets/images/playground/sip-modal/sticker-black-3.svg';
import introPhoto from '../../../assets/images/playground/sip-modal/intro-photo.webp';
import mockupPottery from '../../../assets/images/playground/sip-modal/mockup-pottery.webp';
import mockupSign from '../../../assets/images/playground/sip-modal/mockup-cup1.webp';
import mockupBag from '../../../assets/images/playground/sip-modal/mockup-frame.webp';
import mockupTote from '../../../assets/images/playground/sip-modal/mockup-tote.webp';
import mockupBox from '../../../assets/images/playground/sip-modal/mockup-box.webp';
import mockupCup from '../../../assets/images/playground/sip-modal/mockup-cup2.webp';
import styles from './SipStudioModal.module.css';

const SWATCHES = [
  { hex: '#A3A380', light: false, outlined: true },
  { hex: '#F3F1ED', light: true, outlined: true },
  { hex: '#AE7373', light: false, outlined: true },
  { hex: '#445569', light: false, outlined: false },
  { hex: '#D98E73', light: false, outlined: true },
  { hex: '#2E2E2E', light: false, outlined: false },
];

const GALLERY = [
  { src: mockupPottery, alt: 'SiP Studio branded espresso cup' },
  { src: mockupSign, alt: 'SiP Studio framed wall sign', sticker: stickerLeft },
  { src: mockupBag, alt: 'SiP Studio coffee bean bag' },
  { src: mockupTote, alt: 'SiP Studio tote bag' },
  { src: mockupBox, alt: 'SiP Studio takeaway box', sticker: stickerRight },
  { src: mockupCup, alt: 'SiP Studio patterned cup' },
];

export default function SipStudioModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <PlaygroundModal
      open={open}
      onClose={onClose}
      label="SiP Studio, brand concept case study"
      frameClassName={styles.frame}
      closeClassName={styles.close}
    >
      <div className={styles.scroll}>
        <section className={styles.hero}>
          <p className={styles.heroLabel}>Brand Concept</p>
          <div className={styles.heroLogoRow}>
            <div>
              <h2 className={styles.heroTitle}>SiP Studio</h2>
              <p className={styles.heroSubtitle}>clay, coffee and calm</p>
            </div>
            <img src={sublogo} alt="" className={styles.heroSublogo} />
          </div>
          <p className={styles.heroScrollHint}>Scroll to explore more</p>
        </section>

        <section className={styles.intro}>
          <h3 className={styles.sectionHeading}>Introduction &amp; Briefing</h3>
          <p className={styles.introBody}>
            Sip Studio is a calm cafe-meets-creative-space where you sip coffee while shaping clay. The branding is
            designed to feel peaceful, handmade, and deeply human; mirroring the imperfect charm of pottery itself. I
            focused on evoking a sense of warmth, play, and minimalism, with visual elements that invite people to pause
            and engage.
          </p>
          <div className={styles.introPhotoRow}>
            <img
              src={introPhoto}
              alt="Shelves of handmade ceramic pottery"
              width={700}
              height={700}
              loading="lazy"
              decoding="async"
              className={styles.introPhoto}
            />
            <img src={stickerPlain} alt="" className={styles.introSticker} />
          </div>
        </section>

        <section className={styles.typography}>
          <div className={styles.typeCols}>
            <div className={styles.typeCol}>
              <span className={styles.typeNumber}>01</span>
              <p className={styles.typeName}>Canela</p>
              <p className={styles.typeCaption}>brings warmth and elegance</p>
            </div>
            <div className={styles.typeCol}>
              <span className={styles.typeNumber}>02</span>
              <p className={styles.typeName}>Source Code Pro</p>
              <p className={styles.typeCaption}>adds modern contrast and structure</p>
            </div>
          </div>
          <p className={styles.typeBalance}>Together, they balance handcrafted charm with digital clarity.</p>
          <p className={styles.typeWordmark}>SiP Studio</p>
        </section>

        <section className={styles.palette}>
          <div className={styles.swatchRow}>
            {SWATCHES.map((swatch) => (
              <div
                key={swatch.hex}
                className={`${styles.swatch} ${swatch.light ? styles.swatchLight : ''} ${swatch.outlined ? styles.swatchOutlined : ''}`}
                style={{ background: swatch.hex }}
              >
                {swatch.hex}
              </div>
            ))}
          </div>
          <p className={styles.paletteCaption}>
            A fresh, non-cliché palette was chosen to reflect both the earthiness of clay and the creativity of calm
            spaces.
          </p>
        </section>

        <section className={styles.logoConcept}>
          <div className={styles.logoRow}>
            <img src={flower} alt="" className={styles.logoIcon} />
            <p className={styles.logoText}>
              The flower represents both calm and creativity, and its form is inspired by the kind of flower people
              instinctively doodle. Here, it also doubles as a vase, hinting at the pottery experience.
            </p>
          </div>
          <div className={styles.logoRow}>
            <img src={mug} alt="" className={styles.logoIcon} />
            <p className={styles.logoText}>
              The mug is for coffee, but its shape isn&rsquo;t perfectly symmetrical: reflecting the kind of ceramic
              piece a first-timer might shape during a session.
            </p>
          </div>
        </section>

        <section className={styles.gallery}>
          {GALLERY.map((item) => (
            <div key={item.alt} className={styles.galleryCell}>
              <img src={item.src} alt={item.alt} width={600} height={600} loading="lazy" decoding="async" />
              {item.sticker && (
                <div className={styles.gallerySticker}>
                  <img src={item.sticker} alt="" />
                  <span className={styles.stickerLabel}>
                    SiP
                    <br />
                    Studio
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>

        <p className={styles.footerNote}>
          Note: These are mockups created to showcase the feel and personality of the Sip Studio brand (hypothetical).
        </p>
      </div>
    </PlaygroundModal>
  );
}
