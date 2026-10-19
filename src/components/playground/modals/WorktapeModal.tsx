import PlaygroundModal from './PlaygroundModal';
import styles from './WorktapeModal.module.css';

export default function WorktapeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <PlaygroundModal open={open} onClose={onClose} label="Worktape" frameClassName={styles.frame} closeClassName={styles.close}>
      <p className={styles.soon}>adding soon</p>
    </PlaygroundModal>
  );
}
