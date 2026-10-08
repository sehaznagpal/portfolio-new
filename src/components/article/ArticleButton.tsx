import SweepButton from '../chrome/SweepButton';
import type { ArticleLink } from './types';
import styles from './ArticleButton.module.css';

/* White chip link with the site's sweep hover. In-app paths stay in the tab;
   anything else opens in a new one. */
export default function ArticleButton({ link }: { link: ArticleLink }) {
  const internal = link.href.startsWith('/');
  return (
    <SweepButton className={styles.button} {...(internal ? { to: link.href } : { href: link.href })}>
      {link.label}
    </SweepButton>
  );
}
