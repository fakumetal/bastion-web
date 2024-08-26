'use client';

import { Typography } from '@/components/common';
import styles from './ServiceProposal.module.scss';

export default function ServiceProposal() {
  return (
    <div
      id="proposal"
      className={styles.container}
    >
      <Typography
        variant="h1"
        className={styles.title}
      >
        Propuesta de Intercambio
      </Typography>
      <Typography
        variant="subtitle"
        className={styles.title}
      >
        Simplificando la Vida, Enriqueciendo Experiencias
      </Typography>
      <div className={styles.content}>
        <Typography
          variant="normal"
          className={styles.text}
        >
          <p>
            En <b>Bastión</b>, creemos en el valor de las relaciones auténticas y en la simplicidad de la vida. Por eso,
            hemos desarrollado una innovadora propuesta de intercambio que no solo simplifica el día a día, sino que
            también enriquece las experiencias de quienes eligen ser parte de nuestra comunidad.
          </p>
          <p>
            <b>¿Cómo funciona?</b> <br /> Nuestra metodología es simple y adaptable, dependiendo del rubro de cada
            participante. Un ejemplo concreto es el acuerdo que tenemos con una familia que se dedica a la entrega de
            box de alimentos frescos, como frutas y verduras. Ellos seleccionan y preparan cuidadosamente cada box,
            llevándolos directamente a la puerta de nuestros hogares. ¿Qué reciben a cambio? Hospedaje en nuestras
            cabañas en Villa La Angostura.
          </p>
          <p>
            <b>Transformando el Trueque en Valor</b> <br /> Lo que comenzó como una iniciativa lúdica y experimental, ha
            evolucionado hasta convertirse en el 85% de nuestro modelo de trabajo actual. Sin embargo, no buscamos que
            las personas participen a costo o sacrificando sus productos o servicios. Entendemos que esto es una venta,
            y en cierto modo, un financiamiento mutuo. Es un intercambio justo, donde ambas partes obtienen un valor
            real y significativo.
          </p>
          <p>
            <b>Un Modelo Sostenible y Humano</b> <br /> En Bastión, valoramos la conexión humana y la sustentabilidad.
            Este modelo de intercambio no solo nos permite diversificar y optimizar nuestros recursos, sino que también
            refuerza nuestra filosofía de vida: simplificar lo complejo y construir relaciones que trascienden lo
            comercial.
          </p>
          <p>
            Si tenés un producto o servicio que creés que podría encajar en nuestra propuesta, nos encantaría escuchar
            tus ideas y explorar juntos nuevas formas de intercambio que beneficien a todos.
          </p>
        </Typography>
        <Typography variant="normal">
          <p className={styles.promoText}>
            <b>
              ¡Sumate a esta iniciativa y descubrí cómo podés disfrutar de <br /> Villa La Angostura a través del
              intercambio justo y significativo!
            </b>
          </p>
        </Typography>
      </div>
    </div>
  );
}
