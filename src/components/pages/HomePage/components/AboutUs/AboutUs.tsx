'use client';

import { Typography } from '@/components/common';
import styles from './AboutUs.module.scss';

export default function AboutUs() {
  return (
    <div
      id="aboutUs"
      className={styles.container}
    >
      <Typography
        variant="h1"
        className={styles.title}
      >
        Sobre Nosotros
      </Typography>
      <div className={styles.content}>
        <Typography
          variant="normal"
          className={styles.text}
        >
          <p>
            En <b>Bastión</b>, creemos que el verdadero lujo está en la simplicidad de lo natural. Somos una familia
            apasionada por la Patagonia y comprometida con ofrecerte una experiencia única en uno de los rincones más
            mágicos de Argentina: Villa La Angostura.
          </p>
          <p>
            Nuestro proyecto nació del amor por esta tierra y del deseo de compartirla con aquellos que, como vos,
            buscan un lugar donde desconectar del mundo y reconectar con lo esencial, para que sientas la calidez de un hogar,
            rodeado de la majestuosidad de la naturaleza.
          </p>
          <p>
            En <b>Bastión</b> nos ocupamos de cada detalle para que tu estadía sea inolvidable. Desde la acogedora sala de
            estar hasta la vista imponente de las montañas. Sabemos que las vacaciones son momentos para disfrutar, relajarse.
          </p>
          <p>
            Elegir <b>Bastión</b> es elegir una escapada perfecta, donde la belleza de la naturaleza se mezcla con la comodidad
            y el confort que merecés. Con nosotros, no solo reservas un lugar para dormir, sino una experiencia que te
            renovará el espíritu. Vení a descubrir por qué Bastión es más que un lugar, es una experiencia que te acompañará mucho
            después de haber regresado a casa.
          </p>
        </Typography>
        <Typography variant="normal">
          <p className={styles.promoText}>
            <b>¡Te esperamos en Bastión, tu hogar en la Patagonia!</b>
          </p>
        </Typography>
      </div>
    </div>
  );
}
