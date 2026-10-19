import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import { useMediaQuery } from '../../../lib/useMediaQuery';
import { itemSize } from '../playgroundLayout';
import PlaygroundCard from '../cards/PlaygroundCard';
import styles from './GridView.module.css';

function useColumnCount() {
  const four = useMediaQuery('(min-width: 1280px)');
  const three = useMediaQuery('(min-width: 1025px)');
  const two = useMediaQuery('(min-width: 481px)');
  return four ? 4 : three ? 3 : two ? 2 : 1;
}

/* Deals items into columns in data order, each onto the currently shortest
   column (by its estimated aspect), so the masonry still reads across. */
function toColumns(items: PlaygroundItem[], count: number) {
  const columns: PlaygroundItem[][] = Array.from({ length: count }, () => []);
  const heights = Array.from({ length: count }, () => 0);
  items.forEach((item) => {
    const { w, h } = itemSize(item);
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(item);
    heights[shortest] += h / w;
  });
  return columns;
}

/* Every item as a card in a masonry, in data order, with normal page
   scroll. The intro note sits above it as a header. */
export default function GridView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const columnCount = useColumnCount();
  const header = PLAYGROUND_ITEMS.find((item) => item.note === 'intro');
  const rest = PLAYGROUND_ITEMS.filter((item) => item !== header);

  return (
    <div className={styles.grid}>
      {header && (
        <div className={styles.header}>
          <PlaygroundCard item={header} onOpenModal={onOpenModal} />
        </div>
      )}
      <div className={styles.columns}>
        {toColumns(rest, columnCount).map((column, i) => (
          <div key={i} className={styles.column}>
            {column.map((item) => (
              <PlaygroundCard key={item.id} item={item} onOpenModal={onOpenModal} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
