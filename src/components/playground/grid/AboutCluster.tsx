import MePhoto from '../items/MePhoto';
import SayHelloItem from '../items/SayHelloItem';
import LetterNote from '../cards/LetterNote';
import { morphName } from '../morph';
import styles from './AboutCluster.module.css';

/* Who made all this, after the work: the polaroid with Say hello over its
   top-right corner, and the letter beside them, straight on the ground.
   Say hello keeps its hover; it is the grid's one animation besides the lift. */
export default function AboutCluster() {
  return (
    <section className={styles.cluster} aria-label="About me">
      <div className={styles.pair}>
        <div className={styles.photo} style={{ viewTransitionName: morphName('me') }}>
          <MePhoto />
        </div>
        <div className={styles.hello} style={{ viewTransitionName: morphName('hello') }}>
          <SayHelloItem autoHover={false} />
        </div>
      </div>
      <div className={styles.letter} style={{ viewTransitionName: morphName('letter') }}>
        <LetterNote />
      </div>
    </section>
  );
}
