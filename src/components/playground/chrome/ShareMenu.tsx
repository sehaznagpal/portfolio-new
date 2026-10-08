import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { THEME_CYCLE, THEME_OPTIONS } from '../theme/themes';
import avatar from '../../../assets/images/playground/avatar.webp';
import ThemeDotCluster from './ThemeDotCluster';
import styles from './ShareMenu.module.css';

type ShareState = 'idle' | 'copied' | 'manual';

const COPIED_MS = 1500;
// Lets the pointer cross the gap between the dots and the list without it closing.
const MENU_CLOSE_DELAY_MS = 120;

function legacyCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  textarea.remove();
  return copied;
}

/* Fixed top-right pill: avatar, Share (the native share sheet, or copies
   the page link) and the theme switcher. Clicking the dots steps to the next
   theme with a spin; hovering them opens the full list. */
export default function ShareMenu() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareState, setShareState] = useState<ShareState>('idle');
  // Bumped only by a click on the dots, so a pick from the list never spins them.
  const [spinSignal, setSpinSignal] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(closeTimerRef.current);
      clearTimeout(copiedTimerRef.current);
    },
    [],
  );

  function openMenu() {
    clearTimeout(closeTimerRef.current);
    setMenuOpen(true);
  }

  function scheduleCloseMenu() {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setMenuOpen(false), MENU_CLOSE_DELAY_MS);
  }

  /* One step through the cycle from whatever is top-left. The first click
     with no theme yet picks the one already shown there. */
  function cycleTheme() {
    const index = THEME_CYCLE.indexOf(theme as (typeof THEME_CYCLE)[number]);
    setTheme(index === -1 ? THEME_CYCLE[0] : THEME_CYCLE[(index + 1) % THEME_CYCLE.length]);
    setSpinSignal((signal) => signal + 1);
  }

  useEffect(() => {
    if (!menuOpen && shareState !== 'manual') return;
    function dismiss() {
      setMenuOpen(false);
      setShareState('idle');
    }
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) dismiss();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss();
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen, shareState]);

  async function share() {
    const url = window.location.href;
    // The device's own share sheet where there is one; copying otherwise.
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch (error) {
        // Dismissing the sheet is a choice, not a failure.
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    let copied = false;
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
    } catch {
      copied = legacyCopy(url);
    }
    if (copied) {
      setShareState('copied');
      clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setShareState('idle'), COPIED_MS);
    } else {
      // Clipboard blocked: show the link to copy by hand rather than doing nothing.
      setShareState('manual');
    }
  }

  return (
    <div ref={rootRef} className={`${styles.pill} ${menuOpen ? styles.pillOpen : ''}`}>
      <div className={styles.row}>
        <img src={avatar} alt="Sehaz Nagpal" width={240} height={240} className={styles.avatar} />
        <button type="button" className={styles.share} onClick={share}>
          {shareState === 'copied' ? 'Copied!' : 'Share'}
        </button>
        <button
          type="button"
          className={styles.themeToggle}
          aria-label="Change theme"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onClick={cycleTheme}
          onMouseEnter={openMenu}
          onMouseLeave={scheduleCloseMenu}
          onFocus={openMenu}
          onBlur={scheduleCloseMenu}
        >
          <ThemeDotCluster activeTheme={theme} spinSignal={spinSignal} />
        </button>
      </div>

      {menuOpen && (
        <div
          className={styles.dropdown}
          role="menu"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleCloseMenu}
          onFocus={openMenu}
          onBlur={scheduleCloseMenu}
        >
          <p className={styles.dropdownLabel}>Theme</p>
          <div className={styles.divider} />
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === option.id}
              className={styles.option}
              onClick={() => {
                setTheme(option.id);
                setMenuOpen(false);
              }}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              <span
                className={`${styles.swatch} ${theme === option.id ? styles.swatchActive : ''}`}
                style={{ background: option.swatchFill, borderColor: option.swatchStroke }}
              />
            </button>
          ))}
        </div>
      )}

      {shareState === 'manual' && (
        <div className={styles.manualCopy} role="dialog" aria-label="Copy link">
          <p className={styles.manualCopyLabel}>Copy this link:</p>
          <input
            type="text"
            readOnly
            className={styles.manualCopyInput}
            value={window.location.href}
            ref={(input) => input?.select()}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
}
