'use client';

import { Accordion, ImageWithFallback, Typography } from '@/components/common';
import styles from './AboutMe.module.scss';

export default function AboutMe() {
  return (
    <div
      id="aboutMe"
      className={styles.container}
    >
      <Typography
        variant="h1"
        className={styles.title}
      >
        Sobre Mi
      </Typography>
      <div className={styles.content}>
        <Typography
          variant="normal"
          className={styles.text}
        >
          Desde los 13 años, mi vida ha estado dedicada a la fotografía, un arte que me enseñó mi padre y que he
          perfeccionado a lo largo de más de tres décadas. Comencé mi carrera como reportero gráfico en el prestigioso
          Diario "La Mañana del Sur" y desde entonces, mi trabajo ha sido parte de importantes instituciones como Repsol
          Argentina, Fundación YPF, la Municipalidad de Neuquén y diversos sindicatos.
          <br />
          <br />
          Mi experiencia no solo abarca la fotografía social, como bodas y cumpleaños de 15, sino que también incluye la
          fotografía de moda y la comunicación institucional. Mi enfoque es único: combino la precisión del reportero
          gráfico con la sensibilidad del fotógrafo social, capturando momentos irrepetibles con una visión emocional y
          comunicativa. Utilizo el equipo más avanzado, desde iluminación profesional hasta gimbals para video,
          asegurando que cada detalle sea perfecto y que cada cliente reciba una imagen que trascienda el momento.
          <br />
          <br />
          Si buscas un fotógrafo con la experiencia, la pasión y las herramientas para inmortalizar tus momentos más
          importantes, te invito a contactarme. Estoy ubicado en Periodistas Neuquinos 308, NQN Capital, y estaré
          encantado de ayudarte a contar tu historia a través de imágenes que perduren para siempre.
        </Typography>
        <ImageWithFallback
          src={'/img/profile.png'}
          alt={'Profile Picture'}
          width={432}
          height={529}
        />
      </div>
      <div className={styles.accordions}>
        <Accordion
          className={styles.accordion}
          title="Experiencia Laboral"
        >
          <div className={styles.accordionContent}>
            <div className={styles.experience}>
              <Typography variant="normal">
                <p>
                  A lo largo de mi carrera, he trabajado como reportero gráfico en Diario La Mañana del Sur / La Mañana
                  del Neuquén, Diario Ámbito Financiero y Revista Trastienda Neuquén Argentina. Además, he desempeñado
                  roles como fotógrafo institucional en la Municipalidad de Neuquén, Repsol/YPF Argentina, IAPG Comahue,
                  Sindicato de Petróleo y Gas de Neuquén, y la Provincia del Neuquén. También he sido docente en
                  campañas políticas, con 20 años de trayectoria en fotografía. Actualmente, colaboro con Canal 7
                  Noticias y el área de prensa del Municipio de Plottier.
                </p>
              </Typography>
            </div>
          </div>
        </Accordion>
        <Accordion
          className={styles.accordion}
          title="Formación Académica"
        >
          <div className={styles.accordionContent}>
            <div className={styles.education}>
              <Typography variant="normal">
                <ul>
                  <li>Universidad Nacional Comahue ,Neuquén Patagonia Argentina</li>
                  <li>Carrera abogacía 4 años</li>
                  <li>Formación reportero gráfico :AGRA (asociación reporteros gráficos)</li>
                  <li>Diseño y edición de videos</li>
                  <li>Talleres de iluminación, fotografía y video.</li>
                </ul>
              </Typography>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
