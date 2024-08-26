'use client';

import { Button, ImageWithFallback, Stars, Typography } from '@/components/common';
import styles from './Reviews.module.scss';

const REVIEWS = [
  {
    stars: 5,
    text: 'Todo muy hermoso! Y lo que mas a destacar es la calidad humana de los dueños, hacen todo mucho pulmón y corazón ❤️',
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
    <div
      id="portfolio"
      className={styles.portafolioContainer}
    >
      <Typography
        variant="h1"
        className={styles.portafolioTitle}
      >
        Reseñas
      </Typography>
      <div className={styles.reviews}>
        {REVIEWS.map((review, index) => (
          <div
            key={index}
            className={styles.review}
          >
            <div className={styles.stars}>
              <Stars amount={review.stars} />
            </div>
            <Typography
              variant="normal"
              className={styles.text}
            >
              {`"${review.text}"`}
            </Typography>
            <Typography
              variant="normal"
              className={styles.name}
            >
              {review.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
