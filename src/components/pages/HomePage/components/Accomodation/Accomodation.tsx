'use client';

import { useEffect, useMemo, useState } from 'react';
import { Carousel, ImageWithFallback, Typography } from '@/components/common';
import { SocialNetworks } from '@/components/layout';
import styles from './Accomodation.module.scss';
import Link from 'next/link';
 
const bannerImages = [
  {
    src: '/img/banner/slide1.png',
    alt: 'Slide 1',
  },
  {
    src: '/img/banner/slide2.png',
    alt: 'Slide 2',
  },
  {
    src: '/img/banner/slide3.png',
    alt: 'Slide 3',
  },
  {
    src: '/img/banner/slide4.png',
    alt: 'Slide 4',
  },
  {
    src: '/img/banner/slide5.png',
    alt: 'Slide 5',
  },
  {
    src: '/img/banner/slide6.png',
    alt: 'Slide 6',
  },
  {
    src: '/img/banner/slide7.png',
    alt: 'Slide 7',
  },
];

export default function Accomodation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showArrows = useMemo(() => isClient && window.innerWidth > 768, [isClient]);

  return (
    <div
      id="accommodation"
      className={styles.accomodationContainer}
    >
      <Typography
        className={styles.accomodationTitle}
        variant="title"
      >
        Alojamientos
      </Typography>
      <Typography
        className={styles.accomodationSubtitle}
        variant="subtitle"
      >
        Casa en Villa la Angostura
      </Typography>
      
      {isClient ? (
        <Carousel
          className={styles.carousel}
          plugins={{ autoplay: true, fade: true, arrows: showArrows }}
          options={{
            duration: 1000,
            cameraClass: styles.camera,
            align: 'center',
            circular: true,
            bound: false,
            panelsPerView: 0,
            inputType: ['touch', 'mouse'],
            moveType: ['strict', { count: 1 }],
            preventClickOnDrag: false,
            disableOnInit: false,
          }}
        >
          {bannerImages.map((image, index) => (
            <div
              className={styles.slide}
              key={index}
            >
              <ImageWithFallback
                className={styles.image}
                src={image.src}
                alt={image.alt}
                width={600}
                height={435}
              />
            </div>
          ))}
        </Carousel>
      ) : null}
 
      <Typography
        className={styles.accomodationText}
        variant="normal"
      >
  <p>
  <b>Capacidad:</b> Hasta 8 personas. <br />
  <b>Ubicación:</b> Barrio Las Balsas, cerca de Playa Pública Las Balsas. <br />
  <b>Comodidades:</b> 3 habitaciones, cocina con barra, amplio living comedor con TV y WiFi, baño con bañera, espacio para 3 autos, chulengo y portón eléctrico. <br />
  <b>Mascotas:</b> Se aceptan hasta 2 mascotas pequeñas. <br />
  <b>Accesibilidad:</b> El establecimiento es inclusivo y cuenta con instalaciones adaptadas para garantizar comodidad a todos los huéspedes, incluyendo a aquellos con movilidad reducida.</p>
      </Typography>
      <div className={styles.imageContainer}>
  <ImageWithFallback
    src="/img/accesibilidad.png"
    alt="accesibilidad logo"
    width={70}
    height={70}
  />
  <ImageWithFallback
    src="/img/pet.png"
    alt="pet logo"
    width={70}
    height={70}
  />
</div>

      <div className={styles.buttonContainer}>
    <Link href="/reservas">
    <button className={styles.reserveButton}>
    <Typography variant="subtitle">Reservá y desconectá</Typography>
    </button>
  </Link>  
  
</div>
      {/* <SocialNetworks title="¡Reservá y desconectá!" /> */}
      
    </div>
  );
}
