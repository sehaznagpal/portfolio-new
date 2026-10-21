import styles from './MoolroopPoster.module.css';

/* The hero's vase pattern, drawn entirely by CSS backgrounds (see the module):
   a seamless tile of vases plus a separate grain layer, so it fills any frame
   size without stretching, scaling the grain or cropping the artwork to a few
   big vases. */
export default function MoolroopPoster() {
  return <div className={styles.poster} role="img" aria-label="Repeating pattern of pottery and vase silhouettes" />;
}
