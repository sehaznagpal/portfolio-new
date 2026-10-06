import SweepButton from '../chrome/SweepButton';
import type { ArticleLink } from './types';
import styles from './ArticleButton.module.css';

/* White chip link with the site's sweep hover; opens in a new tab. */
export default function ArticleButton({ link }: { link: ArticleLink }) {
  return (
    <SweepButton className={styles.button} href={link.href}>
      {link.label}
    </SweepButton>
  );
}
