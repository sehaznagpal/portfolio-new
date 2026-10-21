import { useLayoutEffect, useRef, useState } from 'react';
import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { DRAFTS_BODY, DRAFTS_HIGHLIGHT_GRID } from '../../../data/playground';
import { ARTWORK_BOXES } from '../canvas/canvasLayout';
import notes from '../cards/notes.module.css';
import WorkCard from './WorkCard';
import AboutCluster from './AboutCluster';
import styles from './GridView.module.css';

// The work: everything that opens a modal or a site.
const WORK = PLAYGROUND_ITEMS.filter((item) => item.action);

interface GridMetrics {
  columns: number;
  column: number;
  gap: number;
  row: number;
  pad: number;
}

/* Reads the grid's live column count and sizes from its CSS, so every
   number lives in the stylesheet and breakpoints. */
function readMetrics(grid: HTMLElement): GridMetrics {
  const style = getComputedStyle(grid);
  const columns = style.gridTemplateColumns.split(' ');
  return {
    columns: columns.length,
    column: parseFloat(columns[0]),
    gap: parseFloat(style.columnGap),
    row: parseFloat(style.gridAutoRows),
    pad: parseFloat(style.getPropertyValue('--pg-grid-pad')),
  };
}

const sameMetrics = (a: GridMetrics | null, b: GridMetrics) =>
  !!a && a.columns === b.columns && a.column === b.column && a.gap === b.gap && a.row === b.row && a.pad === b.pad;

/* A card's width follows its column span; its height follows its artwork's
   shape, rounded up to whole row units (the rows have no gap, so the card
   leaves one gap's worth of its span empty below it). */
function cardLayout(item: PlaygroundItem, metrics: GridMetrics, filledRows?: number) {
  const box = ARTWORK_BOXES[item.id];
  const columns = item.gridSize === 'wide' ? Math.min(2, metrics.columns) : 1;
  const width = metrics.column * columns + metrics.gap * (columns - 1);
  const artWidth = width - metrics.pad * 2;
  const height = (artWidth * box.h) / box.w + metrics.pad * 2;
  return { rows: filledRows ?? Math.ceil((height + metrics.gap) / metrics.row), cu: artWidth / box.w };
}

/* Dense packing can leave a hole too small for any later card (above a
   wide card that needs two free columns at once). Each card with empty
   rows below it grows down to the next card under it instead, its artwork
   staying centred. The cells it takes were empty after packing, so no other
   card moves. Returns each card's row count, by id. */
function fillHoles(grid: HTMLElement, row: number) {
  const cards = [...grid.children] as HTMLElement[];
  const rects = cards.map((card) => card.getBoundingClientRect());
  const rows: Record<string, number> = {};
  cards.forEach((card, i) => {
    const rect = rects[i];
    const below = rects.filter(
      (other) => other.top >= rect.bottom && other.left < rect.right - 1 && other.right > rect.left + 1,
    );
    if (below.length === 0) return;
    const nextTop = Math.min(...below.map((other) => other.top));
    const id = card.dataset.id;
    if (id) rows[id] = Math.round((nextTop - rect.top) / row);
  });
  return rows;
}

/* The page heading, then the work packed into a dense grid of mixed sizes,
   then who made it: the polaroid, Say hello and the letter. Calm by
   design: the cards only lift on hover. */
export default function GridView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<GridMetrics | null>(null);
  const [metrics, setMetrics] = useState<GridMetrics | null>(null);
  const [filled, setFilled] = useState<Record<string, number>>({});

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const next = readMetrics(grid);
      if (sameMetrics(metricsRef.current, next)) return;
      // New column sizes: pack afresh, then fill again.
      metricsRef.current = next;
      setFilled({});
      setMetrics(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  // After each packing, before paint: grow cards into any holes.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || !metrics) return;
    const next = fillHoles(grid, metrics.row);
    setFilled((previous) =>
      Object.keys(next).every((id) => previous[id] === next[id]) &&
      Object.keys(previous).length === Object.keys(next).length
        ? previous
        : next,
    );
  }, [metrics, filled]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={notes.italic}>More from my</span> <span className={notes.bold}>Drafts</span>
        </h1>
        <p className={styles.body}>{DRAFTS_BODY}</p>
        <p className={styles.highlight}>{DRAFTS_HIGHLIGHT_GRID}</p>
      </header>
      <div ref={gridRef} className={styles.grid}>
        {WORK.map((item) => (
          <WorkCard
            key={item.id}
            item={item}
            layout={metrics && cardLayout(item, metrics, filled[item.id])}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
      <AboutCluster />
    </div>
  );
}
