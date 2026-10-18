import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import StoryIcon from './StoryIcon';
import type { StoryIcon as StoryIconName } from './types';
import styles from './Callout.module.css';

/* A bordered card that sets one statement apart: an icon, an uppercase
   label and a single sentence (e.g. the research question). */
export default function Callout({ icon, label, text }: { icon: StoryIconName; label: string; text: string }) {
  return (
    <Reveal>
      <aside className={styles.callout}>
        <div className={styles.head}>
          <StoryIcon name={icon} className={styles.icon} />
          <Eyebrow>{label}</Eyebrow>
        </div>
        <p className={styles.text}>{text}</p>
      </aside>
    </Reveal>
  );
}
