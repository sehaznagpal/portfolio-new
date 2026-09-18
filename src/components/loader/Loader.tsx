import { useEffect, useRef, useState } from 'react';
import styles from './Loader.module.css';

interface Phase {
  text: string;
  charDelay: number;
  holdAfter: number;
}

/* Sequence per brief: "..." -> "(hey.)" -> "..." -> "(welcome to my portfolio.)".
   Both messages render in accent-green per Figma. Total run time tuned to land
   ~3.3s, within the spec's 2.5-3.5s window including the final hold. Timing is
   unchanged from the pre-auto-layout build — only the type size is now fluid
   (see Loader.module.css) instead of a hard mobile/desktop split. */
const PHASES: Phase[] = [
  { text: '...', charDelay: 70, holdAfter: 250 },
  { text: '(hey.)', charDelay: 50, holdAfter: 400 },
  { text: '...', charDelay: 70, holdAfter: 250 },
  { text: '(welcome to my portfolio.)', charDelay: 38, holdAfter: 700 },
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [display, setDisplay] = useState('');
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeouts.push(setTimeout(resolve, ms));
      });

    async function run() {
      for (const phase of PHASES) {
        if (cancelled) return;
        setDisplay('');
        for (let i = 1; i <= phase.text.length; i++) {
          await wait(phase.charDelay);
          if (cancelled) return;
          setDisplay(phase.text.slice(0, i));
        }
        await wait(phase.holdAfter);
        if (cancelled) return;
      }
      if (!cancelled) doneRef.current();
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.loader}>
      <p className={styles.text}>{display}</p>
    </div>
  );
}
