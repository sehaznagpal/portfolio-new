import CursorTooltip from './CursorTooltip';
import styles from './AboutLink.module.css';

export default function AboutLink({ onClick }: { onClick: () => void }) {
  return (
    <CursorTooltip text="Who am I?" variant="dark">
      <button type="button" className={styles.link} onClick={onClick}>
        <span className={styles.fill} aria-hidden="true" />
        <span className={styles.label}>about</span>
      </button>
    </CursorTooltip>
  );
}
