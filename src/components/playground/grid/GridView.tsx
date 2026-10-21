import { useState } from 'react';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { DRAFTS_BODY, DRAFTS_HIGHLIGHT } from '../../../data/playground';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import notes from '../cards/notes.module.css';
import WorkCard from './WorkCard';
import ColumnSwitcher, { type Columns } from './ColumnSwitcher';
import AboutCluster from './AboutCluster';
import styles from './GridView.module.css';
import cardStyles from './WorkCard.module.css';

// The work: everything that opens a modal or a site.
const WORK = PLAYGROUND_ITEMS.filter((item) => item.action);
const COLUMNS_KEY = 'portfolio:playground-columns';
const MOBILE_QUERY = '(max-width: 640px)';
// Tiles glide to their new places and sizes when the column count changes.
const LAYOUT_TRANSITION = { duration: 0.5, ease: [0.65, 0, 0.35, 1] } as const;

function readColumns(): Columns | null {
  try {
    const stored = Number(localStorage.getItem(COLUMNS_KEY));
    return stored === 1 || stored === 2 || stored === 3 ? stored : null;
  } catch {
    return null;
  }
}

function storeColumns(columns: Columns) {
  try {
    localStorage.setItem(COLUMNS_KEY, String(columns));
  } catch {
    // Storage unavailable: the choice lasts for this visit only.
  }
}

/* The page heading, the work as equal tiles in 1, 2 or 3 columns (blank
   tiles complete the last row), then who made it: the polaroid, Say hello
   and the letter. Calm by design: the tiles only lift on hover. */
export default function GridView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [stored, setStored] = useState<Columns | null>(readColumns);
  // Phones offer 1 or 2 columns (a stored 3 shows as 2) and start at 1.
  const options: Columns[] = isMobile ? [1, 2] : [1, 2, 3];
  const columns: Columns = stored === null ? (isMobile ? 1 : 2) : isMobile && stored === 3 ? 2 : stored;
  const blanks = (columns - (WORK.length % columns)) % columns;

  function changeColumns(next: Columns) {
    setStored(next);
    storeColumns(next);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={notes.italic}>More from my</span> <span className={notes.bold}>Drafts</span>
        </h1>
        <p className={styles.body}>{DRAFTS_BODY}</p>
        <p className={styles.highlight}>{DRAFTS_HIGHLIGHT}</p>
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
      <ColumnSwitcher value={columns} options={options} onChange={changeColumns} />
    </div>
  );
}
