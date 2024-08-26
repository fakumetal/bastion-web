'use client';

import { Button, ImageWithFallback, Typography } from '@/components/common';
import styles from './PortfolioResume.module.scss';

const GALERIES = [
  {
    title: '15 Años',
    imgSrc: '/img/home/portfolio/15a.png',
  },
  {
    title: '18 Años',
    imgSrc: '/img/home/portfolio/18a.png',
  },
  {
    title: 'Bodas',
    imgSrc: '/img/home/portfolio/bodas.png',
  },
  {
    title: 'Sesiones',
    imgSrc: '/img/home/portfolio/sesiones.png',
  },
  {
    title: 'Corporativa',
    imgSrc: '/img/home/portfolio/corporativa.png',
  },
  {
    title: 'Productos',
    imgSrc: '/img/home/portfolio/productos.png',
  },
  {
    title: 'Naturaleza',
    imgSrc: '/img/home/portfolio/naturaleza.png',
  },
  {
    title: 'Moda',
    imgSrc: '/img/home/portfolio/moda.png',
  },
  {
    title: 'Infantil',
    imgSrc: '/img/home/portfolio/infantiles.png',
  },
  {
    title: 'Egresados',
    imgSrc: '/img/home/portfolio/egresados.png',
  },
  {
    title: 'Espectáculo',
    imgSrc: '/img/home/portfolio/espectaculo.png',
  },
  {
    title: 'Restauraciones',
    imgSrc: '/img/home/portfolio/restauracion.png',
  },
];

export default function PortfolioResume() {
  return (
    <div
      id="portfolio"
      className={styles.portafolioContainer}
    >
      <Typography
        variant="h1"
        className={styles.portafolioTitle}
      >
        Portafolio
      </Typography>
      <div className={styles.galeries}>
        {GALERIES.map(galery => (
          <div
            key={galery.title}
            className={styles.galery}
          >
            <ImageWithFallback
              src={galery.imgSrc}
              alt={galery.title}
              className={styles.galeryImage}
              width={361}
              height={255}
            />
            <Typography
              variant="h3"
              className={styles.galeryTitle}
            >
              {galery.title}
            </Typography>
            <Button
              className={styles.galeryButton}
              variant="primary"
              buttonSize="small"
              rounded
            >
              <Typography
                className={styles.buttonText}
                variant="h6"
              >
                VER GALERÍA
              </Typography>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
