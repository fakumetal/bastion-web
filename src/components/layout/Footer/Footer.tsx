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
            width={110}
            height={120}
          />
        </Button>
        <div className={styles.title}>
          <Typography variant="h1">Bastión</Typography>
          <Typography variant="h3">Viví el encanto de la Patagonia</Typography>
        </div>
      </div>
      <div className={styles.rightsReservedText}>
        <Typography variant="normal">
          <b>&copy; 2024 Bastión. Todos los derechos reservados.</b>
        </Typography>
      </div>
    </footer>
  );
}
