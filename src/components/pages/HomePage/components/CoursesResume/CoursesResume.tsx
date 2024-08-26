'use client';

import { Button, Icon, ImageWithFallback, Typography } from '@/components/common';
import styles from './CoursesResume.module.scss';
import Link from 'next/link';

export default function CoursesResume() {
  return (
    <div
      id="courses"
      className={styles.container}
    >
      <Typography variant="h1">Cursos de Fotografía</Typography>
      <div className={styles.content}>
        <ImageWithFallback
          src="/img/home/courses/course-picture.png"
          alt="Foto Curso"
          width={548}
          height={478}
        />
        <div className={styles.infoContainer}>
          <Typography
            className={styles.text}
            variant="normal"
          >
            En nuestros cursos de fotografía y videografía, ofrecemos un aprendizaje completo tanto para principiantes
            como para profesionales que buscan perfeccionar sus habilidades. Desde los fundamentos básicos hasta
            técnicas avanzadas, cada nivel incluye prácticas intensivas que te permitirán aplicar lo aprendido en
            situaciones reales. Al finalizar, recibirás una certificación que avala tus conocimientos y te prepara para
            enfrentar el mundo de la fotografía con confianza.
          </Typography>
          <Typography
            className={styles.subtitle}
            variant="h3"
          >
            ¡No esperes más para convertir tu pasión en una habilidad profesional!
          </Typography>
          <div className={styles.buttonGroup}>
            <Link
              className={styles.wppButton}
              href="https://wa.me/5492995048219"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon
                iconId="whatsapp"
                width={50}
                height={50}
              />
            </Link>
            <Button
              className={styles.button}
              variant="primary"
              buttonSize="large"
            >
              VER GALERIA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
