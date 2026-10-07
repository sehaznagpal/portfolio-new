import { Link } from 'react-router-dom';
import styles from './PortfolioButton.module.css';

/* Fixed top-left way back to the portfolio. A plain route link with no
   transition, as in the old repo. */
export default function PortfolioButton() {
  return (
    <Link to="/" className={styles.pill} aria-label="Back to portfolio">
      Sehaz Nagpal
    </Link>
  );
}
