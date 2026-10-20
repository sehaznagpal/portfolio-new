import PlaygroundModal from './PlaygroundModal';
import styles from './MotionDemoModal.module.css';

export default function MotionDemoModal({ open, onClose, note }: { open: boolean; onClose: () => void; note?: string }) {
  return (
    <PlaygroundModal
      open={open}
      note={note}
      onClose={onClose}
      label="Motion Graphic Demo"
      frameClassName={styles.frame}
      closeClassName={styles.close}
    >
      <video className={styles.video} src="/videos/motion-graphic-demo.mp4" controls playsInline preload="metadata" />
    </PlaygroundModal>
  );
}
