 
'use-client'
import { ImageWithFallback } from '@/components/common';
import styles from './ComingSoon.module.scss';

const ComingSoon = () => {
  return (
    <div className={styles.comingSoonContainer}>
          <ImageWithFallback
    src="/img/logo.png"
    alt="accesibilidad logo"
    width={70}
    height={70}
  />
      <h2 className={styles.title}>Estamos trabajando en esta sección</h2>
      <p className={styles.message}>En breve estará disponible.</p>
    </div>
  );
};

export default ComingSoon;
