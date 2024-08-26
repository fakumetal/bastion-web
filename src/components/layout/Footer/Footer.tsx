'use client';

import { useRouter } from 'next/navigation';
import { Button, ImageWithFallback, Typography } from '@/components/common';
import styles from './Footer.module.scss';

export default function Footer() {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.companyInfo}>
        <Button
          variant="transparent"
          onClick={handleGoToHome}
        >
          <ImageWithFallback
            src="/img/logo.png"
            alt="logo"
            width={350}
            height={180}
          />
        </Button>
        <div className={styles.title}>
          <Typography variant="h2">Oskar Leon</Typography>
          <Typography variant="subtitle">Transformando momentos en recuerdos inolvidables</Typography>
        </div>
      </div>
      <div className={styles.rightsReservedText}>
        <Typography variant="normal">&copy; 2024 Oskar Leon. Todos los derechos reservados.</Typography>
      </div>
    </footer>
  );
}
