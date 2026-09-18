import type { ReactNode } from 'react';
import AboutLink from '../chrome/AboutLink';
import PlaygroundLink from '../chrome/PlaygroundLink';
import styles from './HomeChrome.module.css';

export default function HomeChrome({
  onOpenAbout,
  children,
}: {
  onOpenAbout: () => void;
  children: ReactNode;
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.aboutRow}>
        <AboutLink onClick={onOpenAbout} />
      </div>
      <div className={styles.cardWrap}>{children}</div>
      <div className={styles.playgroundRow}>
        <PlaygroundLink />
      </div>
    </div>
  );
}
