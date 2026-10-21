import { useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { DRAFTS_BODY, DRAFTS_HIGHLIGHT } from '../../../data/playground';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import { MOBILE_QUERY } from '../mobileQuery';
import notes from '../cards/notes.module.css';
import WorkCard from './WorkCard';
import ColumnSwitcher, { type Columns } from './ColumnSwitcher';
import AboutCluster from './AboutCluster';
import styles from './GridView.module.css';
import cardStyles from './WorkCard.module.css';

// The work: everything that opens a modal or a site.
const WORK = PLAYGROUND_ITEMS.filter((item) => item.action);
// Tiles glide to their new places and sizes when the column count changes.
const LAYOUT_TRANSITION = { duration: 0.5, ease: [0.65, 0, 0.35, 1] } as const;

/* The page heading, the work as equal tiles in 1, 2 or 3 columns (blank
   tiles complete the last row), then who made it: the polaroid, Say hello
   and the letter. Calm by design: the tiles only lift on hover. */
export default function GridView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  // Starts at 1 column on phones and 2 elsewhere; a pick lasts for this visit.
  const [picked, setPicked] = useState<Columns | null>(null);
  // Phones offer 1 or 2 columns (a 3 picked on a wider screen shows as 2).
  const options: Columns[] = isMobile ? [1, 2] : [1, 2, 3];
  const columns: Columns = picked === null ? (isMobile ? 1 : 2) : isMobile && picked === 3 ? 2 : picked;
  const blanks = (columns - (WORK.length % columns)) % columns;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={notes.italic}>More from my</span> <span className={notes.bold}>Drafts</span>
        </h1>
        <p className={styles.body}>{DRAFTS_BODY}</p>
        <p className={styles.highlightLine}>
          <span className={styles.highlight}>{DRAFTS_HIGHLIGHT}</span>
        </p>
      </header>
      <MotionConfig reducedMotion="user" transition={LAYOUT_TRANSITION}>
        <LayoutGroup>
          <div className={styles.grid} data-columns={columns}>
            {WORK.map((item) => (
              <WorkCard key={item.id} item={item} onOpenModal={onOpenModal} />
            ))}
            <AnimatePresence mode="popLayout" initial={false}>
              {Array.from({ length: blanks }, (_, i) => (
                <motion.div
                  key={`blank-${i}`}
                  layout
                  className={cardStyles.tile}
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </MotionConfig>
      <AboutCluster />
      <ColumnSwitcher value={columns} options={options} onChange={setPicked} />
    </div>
  );
}
