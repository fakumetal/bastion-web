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
            buscan un lugar donde desconectar del mundo y reconectar con lo esencial. Cada cabaña y cada casa que
            ofrecemos ha sido diseñada y equipada pensando en tu comodidad, para que sientas la calidez de un hogar,
            rodeado de la majestuosidad de la naturaleza.
          </p>
          <p>
            Acá en Bastión, nos ocupamos de cada detalle para que tu estadía sea inolvidable. Desde la acogedora sala de
            estar hasta la vista imponente de las montañas, cada elemento está pensado para brindarte una experiencia de
            descanso y tranquilidad. Sabemos que las vacaciones son momentos para disfrutar, relajarse y crear
            recuerdos, por eso nos esmeramos en ofrecerte el mejor servicio y la mejor atención.
          </p>
          <p>
            Elegir Bastión es elegir una escapada perfecta, donde la belleza de la naturaleza se mezcla con la comodidad
            y el confort que merecés. Con nosotros, no solo reservas un lugar para dormir, sino una experiencia que te
            renovará el espíritu. Dejá que el murmullo del viento entre los árboles y la serenidad de los lagos te
            envuelvan, mientras nosotros nos encargamos de que cada segundo de tu estadía sea simplemente perfecto.
            Estamos orgullosos de ser parte de esta comunidad y de poder ofrecerte un refugio en este paraíso
            patagónico. Vení a descubrir por qué Bastión es más que un lugar, es una experiencia que te acompañará mucho
            después de haber regresado a casa.
          </p>
        </Typography>
        <Typography variant="normal">
          <p className={styles.promoText}>
            <b>¡Te esperamos con los brazos abiertos en Bastión, tu hogar en la Patagonia!</b>
          </p>
        </Typography>
      </div>
    </div>
  );
}
