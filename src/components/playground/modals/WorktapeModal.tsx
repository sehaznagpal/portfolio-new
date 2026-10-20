import PlaygroundModal from './PlaygroundModal';
import styles from './WorktapeModal.module.css';

export default function WorktapeModal({ open, onClose, note }: { open: boolean; onClose: () => void; note?: string }) {
  return (
    <PlaygroundModal open={open} note={note} onClose={onClose} label="Worktape" frameClassName={styles.frame} closeClassName={styles.close}>
      <p className={styles.soon}>adding soon</p>
    </PlaygroundModal>
  );
}
