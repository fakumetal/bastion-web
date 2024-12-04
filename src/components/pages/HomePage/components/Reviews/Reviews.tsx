'use client';

import { Button, ImageWithFallback, Stars, Typography } from '@/components/common';
import styles from './Reviews.module.scss';

const REVIEWS = [
  {
    stars: 5,
    text: 'Un lugar súper cómodo y mantenido. Las instalaciones están impecables, y la atención de los dueños de primera. Recomendable para pasar unos días geniales.',
    name: 'Romina Laguna',
  },
  {
    stars: 5,
    text: 'Nuestra estadía fue maravillosa. Fuimos dos familias con dos niños y todos disfrutamos la casa. Los juegos del jardín y la amplitud de este nos acomodó mucho.',
    name: 'Macarena',
  },
  {
    stars: 5,
    text: 'Hermoso lugar...siempre es bueno volver. Simpre que venimos a vla venimos a este hogar. Bien equipada y muy cómodas las instalaciones.',
    name: 'Verónica Vivas',
  },
];

export default function Reviews() {
  return (
    <div>

    <div id="reviews" className={styles.portafolioContainer}>
      <Typography variant="h1" className={styles.portafolioTitle}>
        Reseñas
      </Typography>
      <div className={styles.reviews}>
        {REVIEWS.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.stars}>
              <Stars amount={review.stars} />
            </div>
            <Typography variant="normal" className={styles.text}>
              {`"${review.text}"`}
            </Typography>
            <Typography variant="normal" className={styles.name}>
              {review.name}
            </Typography>
          </div>
        ))}
      </div>

      {/* Contenedor para centrar el botón */}
    </div>
      <div className={styles.buttonContainer}>
        <a
          href="https://www.google.com/maps/place/Basti%C3%B3n+Alquiler+Turismo/@-40.773922,-71.6307939,17z/data=!4m14!1m7!3m6!1s0x9610bf1607357c4b:0xfde88ccf796efd7c!2sBasti%C3%B3n+Alquiler+Turismo!8m2!3d-40.773922!4d-71.628219!16s%2Fg%2F11kj4g_yhg!3m5!1s0x9610bf1607357c4b:0xfde88ccf796efd7c!8m2!3d-40.773922!4d-71.628219!16s%2Fg%2F11kj4g_yhg?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleReviewsLink}
        >
          <Button variant="primary">Ver más reseñas en Google</Button>
        </a>
      </div>
    </div>
  );
}
