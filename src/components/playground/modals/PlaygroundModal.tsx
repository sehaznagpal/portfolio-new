import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './PlaygroundModal.module.css';

// Matches --pg-modal-fade-duration: the exit fade before unmounting.
const EXIT_MS = 220;
const FOCUSABLE =
  'a[href], button:not([disabled]), input, video[controls], [tabindex]:not([tabindex="-1"])';

/* Shared shell for the playground's project modals: fades and scales in,
   closes on Escape, backdrop click or the close button, keeps Tab inside,
   and hands focus back to whatever opened it. Each modal supplies its own
   frame size and close-button colours. */
export default function PlaygroundModal({
  open,
  onClose,
  label,
  frameClassName,
  closeClassName,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  frameClassName: string;
  closeClassName: string;
  children: ReactNode;
}) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setRendered(true);
      // Two frames so the hidden state paints before the transition starts.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = setTimeout(() => setRendered(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...(frameRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [rendered]);

  if (!rendered) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={frameRef}
        className={`${styles.frame} ${frameClassName}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={`${styles.close} ${closeClassName}`} aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={1.75} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
