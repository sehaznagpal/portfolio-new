import PlaygroundModal from './PlaygroundModal';
import styles from './MotionDemoModal.module.css';

export default function MotionDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <PlaygroundModal
      open={open}
      onClose={onClose}
      label="Motion Graphic Demo"
      frameClassName={styles.frame}
      closeClassName={styles.close}
    >
      <video className={styles.video} src="/videos/motion-graphic-demo.mp4" controls playsInline preload="metadata" />
      <div className={styles.footer}>
        <p className={styles.tag}>My first attempt at using Figma Motion.</p>
      </div>
    </PlaygroundModal>
  );
}
