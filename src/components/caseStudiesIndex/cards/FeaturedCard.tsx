import type { CaseStudyDef } from '../../../data/caseStudies';
import DrCuterusVisual from './DrCuterusVisual';
import FraudVisual from './FraudVisual';
import MoolroopVisual from './MoolroopVisual';
import styles from './FeaturedCard.module.css';

/* Every inner size here is a fixed cqw fraction of the card's OWN width
   (see FeaturedCard.module.css) — verified against the Figma frames that
   every one of these ratios (title size, header size, radius, border,
   padding, internal gaps) is numerically constant across 393/1280/1440 AND
   between the active and side card sizes. So the only thing that actually
   needs to vary by breakpoint/active-state is the card's outer width
   (handled by the carousel), not any of these inner rules. */
export default function FeaturedCard({
  study,
  active,
  plain,
}: {
  study: CaseStudyDef;
  active: boolean;
  /* Desktop carousel drives opacity/blur/scale itself every frame from the
     continuous rotation angle — this skips the card's own binary
     active/inactive CSS (dim+blur+transition), which is otherwise for
     mobile's discrete slide-snap crossfade. */
  plain?: boolean;
}) {
  return (
    <div
      className={`${styles.card} ${active ? styles.active : styles.inactive} ${plain ? styles.plain : ''}`}
    >
      <div className={styles.header}>
        <p className={styles.headerIndex}>{study.index}</p>
        <p className={styles.headerTag}>{study.tag}</p>
      </div>

      {study.id === 'dr-cuterus' && (
        <div className={`${styles.box} ${styles.boxDrCuterus}`}>
          <p className={styles.title}>
            <span className={styles.titleItalic}>{study.titleItalic}</span>
            <span className={styles.titleBold}>{study.titleBold}</span>
          </p>
          <div className={styles.purpleBand}>India&rsquo;s favourite gynaecologist</div>
          <DrCuterusVisual />
        </div>
      )}

      {study.id === 'fraud' && (
        <div className={`${styles.box} ${styles.boxFraud}`}>
          <p className={styles.title}>
            <span className={styles.titleItalic}>{study.titleItalic} </span>
            <span className={styles.titleBold}>{study.titleBold}</span>
          </p>
          <FraudVisual interactive={active} />
        </div>
      )}

      {study.id === 'moolroop' && (
        <div className={`${styles.box} ${styles.boxMoolroop}`}>
          <div className={styles.moolroopVisualWrap}>
            <MoolroopVisual interactive={active} />
          </div>
          <p className={styles.title}>
            {/* One flex item spanning both lines (relying on .title's own
                white-space: pre to render the \n) rather than a sibling
                <br> — .boxMoolroop .title is flex-direction: column, where a
                <br> becomes its own empty flex item instead of a soft break,
                which was opening an unintended gap between "The" and
                "Moolroop". */}
            <span className={styles.titleItalic}>{'The\nMoolroop'}</span>
            <span className={styles.titleBold}>App</span>
          </p>
        </div>
      )}
    </div>
  );
}
