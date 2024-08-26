'use client';

import { ImageWithFallback, Typography } from '@/components/common';
import styles from './AboutMe.module.scss';

export default function AboutMe() {
  return (
    <section
      id="aboutMe"
      className={styles.aboutMe}
    >
      <div className={styles.container}>
        <Typography
          className={styles.title}
          variant="h1"
        >
          Detrás de Bastión
        </Typography>
        <div className={styles.content}>
          <Typography
            variant="normal"
            className={styles.text}
          >
            <p>
              Soy <b>Lucía Padilla</b>, neuquina de nacimiento y apasionada por el arte, la educación y el desarrollo
              humano. Egresé del colegio secundario Pablo VI en 2006, y desde entonces he seguido mi vocación por las
              artes visuales, obteniendo un profesorado en esta disciplina que me ha permitido explorar mi creatividad y
              desarrollar una visión única para el diseño y la estética. Cada rincón de Bastión refleja esta pasión,
              donde busco crear espacios que no solo sean visualmente atractivos, sino que también ofrezcan una
              experiencia de tranquilidad y conexión con la naturaleza.
            </p>
            <p>
              He complementado mi formación con capacitaciones en Recursos Humanos y Filosofía, lo que me ha brindado
              una perspectiva integral para gestionar Bastión. Mi enfoque holístico busca siempre crear un ambiente que
              promueva el bienestar de nuestros huéspedes, cuidando cada detalle para garantizar una estancia
              inolvidable.
            </p>
            <p>
              Además, formo parte de la comunidad de mujeres empresarias "Labor Mujer", donde comparto experiencias y
              aprendo de otras líderes. Me apasiona el empoderamiento femenino y contribuir al desarrollo de una
              sociedad más inclusiva. En Bastión, mi objetivo es ofrecer más que un alojamiento: un refugio donde la
              naturaleza y el arte de vivir se encuentran en perfecta armonía.
            </p>
          </Typography>
          <div className={styles.img}>
            <ImageWithFallback
              className={styles.profileImage}
              src="/img/profile.png"
              alt="About me"
              width={377}
              height={394}
            />
            <Typography
              className={styles.name}
              variant="h2"
            >
              Lucía Padilla
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
