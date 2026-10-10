import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import moneyTransfer from '../../../assets/images/fraud/journey/money-transfer.webp';
import selectAccount from '../../../assets/images/fraud/journey/select-account.webp';
import selectAccountCta from '../../../assets/images/fraud/journey/select-account-cta.webp';
import pin from '../../../assets/images/fraud/journey/pin.webp';
import pinWarning from '../../../assets/images/fraud/journey/pin-warning.webp';
import transferring from '../../../assets/images/fraud/journey/transferring.webp';
import success from '../../../assets/images/fraud/journey/success.webp';
import styles from './UserJourney.module.css';

type Mode = 'control' | 'warning' | 'cta';

const MODES: { id: Mode; label: string }[] = [
  { id: 'control', label: 'Control' },
  { id: 'warning', label: 'Warning' },
  { id: 'cta', label: 'CTA' },
];

interface Face {
  src: string;
  alt: string;
}

interface Screen {
  front: Face;
  /* The intervention's version of this screen, shown flipped. */
  back?: Face & { mode: Exclude<Mode, 'control'> };
}

const SCREENS: Screen[] = [
  {
    front: {
      src: moneyTransfer,
      alt: 'Step 1, money transfer: paying Delhi Traffic Police ₹4,500, with a next arrow.',
    },
  },
  {
    front: {
      src: selectAccount,
      alt: 'Step 2, select account: choose ICICI Bank savings account, with a blue "Pay ₹4,500" button.',
    },
    back: {
      mode: 'cta',
      src: selectAccountCta,
      alt: 'Step 2, select account, CTA version: a red "Cancel Payment" primary button above an outlined "Continue anyway".',
    },
  },
  {
    front: {
      src: pin,
      alt: 'Step 3, enter PIN: sending ₹4,500 to Delhi Traffic Police, with empty PIN fields.',
    },
    back: {
      mode: 'warning',
      src: pinWarning,
      alt: 'Step 3, enter PIN, warning version: a yellow banner reads "Fraudsters may impersonate trusted sources. Please verify before making the payment."',
    },
  },
  {
    front: {
      src: transferring,
      alt: 'Step 4, transferring: "Transferring ₹4,500" to Delhi Traffic Police.',
    },
  },
  {
    front: {
      src: success,
      alt: 'Step 5, success: ₹4,500.00 paid to Delhi Traffic Police, with a blue tick.',
    },
  },
];

const SCREEN_W = 393;
const SCREEN_H = 852;

// Gives up waiting for `scrollend` (unsupported, or no scroll happened).
const SCROLL_SETTLE_MS = 500;

const affectedIndex = (mode: Mode) => SCREENS.findIndex((screen) => screen.back?.mode === mode);

/* Visual 3: the authority scenario's five screens. The toggle flips only
   the screen each intervention changes. Flips are CSS transitions on a
   boolean per card, so a new toggle mid-flip simply retargets the running
   transition from wherever it is: nothing queues, stacks or skips. */
export default function UserJourney() {
  // `selected` drives the toggle at once; `shown` drives the flips, and can
  // lag behind while a narrow row scrolls the changed screen into view.
  const [selected, setSelected] = useState<Mode>('control');
  const [shown, setShown] = useState<{ mode: Mode; from: Mode }>({ mode: 'control', from: 'control' });
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cancelPendingRef = useRef<(() => void) | null>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => () => cancelPendingRef.current?.(), []);

  function select(mode: Mode) {
    if (mode === selected) return;
    setSelected(mode);
    cancelPendingRef.current?.();
    cancelPendingRef.current = null;

    const apply = () => setShown((current) => ({ mode, from: current.mode }));
    const row = rowRef.current;
    const card = cardRefs.current[affectedIndex(mode === 'control' ? shown.mode : mode)];
    if (!row || !card || row.scrollWidth <= row.clientWidth) {
      apply();
      return;
    }

    const rowRect = row.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    if (cardRect.left >= rowRect.left && cardRect.right <= rowRect.right) {
      apply();
      return;
    }

    // Scroll the changed screen into view first, then flip it.
    row.scrollTo({
      left: card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
    const finish = () => {
      cancelPendingRef.current?.();
      cancelPendingRef.current = null;
      apply();
    };
    const timer = setTimeout(finish, SCROLL_SETTLE_MS);
    row.addEventListener('scrollend', finish, { once: true });
    cancelPendingRef.current = () => {
      clearTimeout(timer);
      row.removeEventListener('scrollend', finish);
    };
  }

  // Warning <-> CTA flips one screen back and another in: the incoming one
  // starts a beat later so the pair reads as one motion.
  const staggerIn = shown.from !== 'control' && shown.mode !== 'control';

  return (
    <div className={styles.journey}>
      <div className={styles.toggle} role="group" aria-label="Show the flow for">
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={styles.option}
            aria-pressed={selected === id}
            onClick={() => select(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={rowRef} className={styles.row}>
        {SCREENS.map((screen, i) => {
          const flipped = screen.back?.mode === shown.mode;
          return (
            <div
              key={screen.front.src}
              ref={(element) => {
                cardRefs.current[i] = element;
              }}
              className={styles.card}
              data-flipped={flipped}
              data-stagger={flipped && staggerIn}
            >
              <span className={styles.changed} aria-hidden="true">
                changed
              </span>
              <div className={styles.inner}>
                <img
                  className={styles.face}
                  src={screen.front.src}
                  alt={screen.front.alt}
                  width={SCREEN_W}
                  height={SCREEN_H}
                  aria-hidden={flipped}
                />
                {screen.back && (
                  <img
                    className={`${styles.face} ${styles.back}`}
                    src={screen.back.src}
                    alt={screen.back.alt}
                    width={SCREEN_W}
                    height={SCREEN_H}
                    aria-hidden={!flipped}
                  />
                )}
              </div>
              <span className={styles.notch} aria-hidden="true" />
            </div>
          );
        })}
      </div>

    </div>
  );
}
