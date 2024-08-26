import { ImageWithFallback, Typography } from '@/components/common';
import styles from './IntroBanner.module.scss';

export default function IntroBanner() {
  return (
    <div
      id="intro"
      className={styles.introBanner}
    >
      <div className={styles.introImageContainer}>
        <ImageWithFallback
          className={styles.introImage}
          src={'/img/home/intro/intro.jpg'}
          alt={'Villa La Angostura'}
          width={600}
          height={400}
        />
        <div className={styles.imageTextContainer}>
          <Typography
            className={styles.imageTitle}
            variant="title"
          >
            Bastión Alquileres
          </Typography>
          <Typography
            className={styles.imageSubtitle}
            variant="subtitle"
          >
            Viví el encanto de la Patagonia
          </Typography>
        </div>
      </div>
    </div>
  );
}
