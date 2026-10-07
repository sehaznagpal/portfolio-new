import mePhoto from '../../../assets/images/playground/sez-photo.webp';
import styles from './MePhoto.module.css';

export default function MePhoto() {
  return (
    <div className={styles.photo}>
      <img src={mePhoto} alt="Sehaz Nagpal" width={400} height={400} loading="lazy" decoding="async" />
    </div>
  );
}
