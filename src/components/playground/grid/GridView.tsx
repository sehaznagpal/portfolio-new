import { PLAYGROUND_ITEMS, type PlaygroundItem } from '../../../data/playgroundItems';
import PlaygroundCard from '../cards/PlaygroundCard';
import styles from './GridView.module.css';

/* One note explaining everything, then the things it talks about: the
   Drafts note as a full-width banner, every item as a small card in a tidy
   grid (in group order), and the letter as a full-width sign-off. Calm by
   design: no canvas interactions, just a lift on hover. */
export default function GridView({ onOpenModal }: { onOpenModal: (item: PlaygroundItem) => void }) {
  const banner = PLAYGROUND_ITEMS.find((item) => item.card === 'intro');
  const signOff = PLAYGROUND_ITEMS.find((item) => item.card === 'letter');
  const cards = PLAYGROUND_ITEMS.filter((item) => item !== banner && item !== signOff);

  return (
    <div className={styles.page}>
      {banner && (
        <div className={styles.banner}>
          <PlaygroundCard item={banner} onOpenModal={onOpenModal} variant="banner" />
        </div>
      )}
      <div className={styles.grid}>
        {cards.map((item) => (
          <PlaygroundCard key={item.id} item={item} onOpenModal={onOpenModal} variant="tile" />
        ))}
      </div>
      {signOff && (
        <div className={styles.signOff}>
          <PlaygroundCard item={signOff} onOpenModal={onOpenModal} variant="banner" />
        </div>
      )}
    </div>
  );
}
