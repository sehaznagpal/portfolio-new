import mePhoto from '../../../assets/images/playground/me.webp';
import styles from './MePhoto.module.css';

export default function MePhoto() {
  return (
    <div className={styles.photo}>
      <img src={mePhoto} alt="Sehaz Nagpal" width={884} height={884} loading="lazy" decoding="async" />
    </div>
  );
}
