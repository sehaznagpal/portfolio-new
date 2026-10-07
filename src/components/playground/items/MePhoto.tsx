import mePhoto from '../../../assets/images/playground/me.webp';
import grain from './grain.module.css';
import styles from './MePhoto.module.css';

export default function MePhoto() {
  return (
    <div className={`${styles.photo} ${grain.grain}`}>
      <img src={mePhoto} alt="Sehaz Nagpal" width={884} height={884} loading="lazy" decoding="async" />
    </div>
  );
}
